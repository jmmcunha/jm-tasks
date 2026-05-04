/* firebase-sync.js — login Firebase + sincronização Firestore <-> localStorage
   Substitui o "cadeado local" (window.Sec) por autenticação real na nuvem.
   Estratégia:
     1. Carrega Firebase SDK (compat) via CDN.
     2. Substitui init() do app.js: em vez de abrir tela de cadeado, mostra tela de login.
     3. Após login: baixa snapshot do Firestore -> popula localStorage -> chama initApp().
     4. Hooka _write para sincronizar (debounced) com Firestore.
   Doc Firestore: users/{uid}/data/{key}  (1 doc por chave: tarefas, revisoes, reunioes, config)
*/

(function () {
  'use strict';

  // Chaves que devem ser sincronizadas (mesmas do app.js)
  const SYNC_KEYS = [
    'cebraspe_tarefas_v3',
    'cebraspe_revisoes_v1',
    'cebraspe_config_v1',
    'cebraspe_reunioes_v1'
  ];

  const FB_VERSION = '10.13.2';
  const SDK_URLS = [
    `https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-app-compat.js`,
    `https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-auth-compat.js`,
    `https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-firestore-compat.js`
  ];

  let app = null;
  let auth = null;
  let db = null;
  let currentUser = null;
  // Flag para evitar push enquanto estamos hidratando a partir do Firestore
  let hydrating = false;
  // Debounce timers por chave
  const pushTimers = {};

  /* ---------- Carregamento do SDK ---------- */

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false; // preserva ordem
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Falha ao carregar ' + src));
      document.head.appendChild(s);
    });
  }

  async function loadFirebaseSDK() {
    for (const url of SDK_URLS) {
      // se já estiver disponível, pula (ex.: cache)
      // eslint-disable-next-line no-await-in-loop
      await loadScript(url);
    }
  }

  /* ---------- UI de login ---------- */

  function injectLoginStyles() {
    if (document.getElementById('fb-login-styles')) return;
    const css = `
      #fb-overlay{position:fixed;inset:0;background:linear-gradient(135deg,#0a3d7a 0%,#1f4e89 100%);
        display:flex;align-items:center;justify-content:center;z-index:99999;font-family:'General Sans',system-ui,sans-serif;}
      #fb-card{background:#fff;border-radius:14px;padding:32px 28px;width:min(380px,92vw);
        box-shadow:0 20px 60px rgba(0,0,0,.3);}
      #fb-card h1{margin:0 0 6px;font-size:22px;color:#0a3d7a;font-weight:700;}
      #fb-card .sub{margin:0 0 22px;color:#5a6677;font-size:13px;}
      #fb-card label{display:block;font-size:12px;font-weight:600;color:#3a4654;margin:12px 0 6px;}
      #fb-card input{width:100%;padding:11px 13px;border:1px solid #d4dae3;border-radius:8px;
        font-size:15px;font-family:inherit;box-sizing:border-box;}
      #fb-card input:focus{outline:none;border-color:#0a3d7a;box-shadow:0 0 0 3px rgba(10,61,122,.12);}
      #fb-card button{width:100%;margin-top:18px;padding:12px;background:#0a3d7a;color:#fff;border:0;
        border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;}
      #fb-card button:hover{background:#0d4a91;}
      #fb-card button:disabled{opacity:.6;cursor:wait;}
      #fb-card .err{margin-top:12px;color:#b00020;font-size:13px;min-height:18px;}
      #fb-card .foot{margin-top:14px;font-size:12px;color:#5a6677;text-align:center;}
      #fb-card .foot a{color:#0a3d7a;cursor:pointer;text-decoration:underline;}
      #fb-status{position:fixed;top:8px;right:8px;z-index:99998;background:#0a3d7a;color:#fff;
        padding:6px 10px;border-radius:6px;font:600 11px/1 'General Sans',system-ui,sans-serif;
        opacity:0;transition:opacity .25s;pointer-events:none;}
      #fb-status.show{opacity:.92;}
      #fb-userbar{position:fixed;top:8px;right:8px;z-index:99997;display:none;
        background:#fff;border:1px solid #d4dae3;border-radius:8px;padding:6px 10px;
        font:500 12px 'General Sans',system-ui,sans-serif;color:#3a4654;
        box-shadow:0 4px 12px rgba(0,0,0,.08);align-items:center;gap:8px;}
      #fb-userbar.show{display:flex;}
      #fb-userbar button{background:transparent;border:0;color:#0a3d7a;cursor:pointer;
        font:600 12px 'General Sans',system-ui,sans-serif;padding:0;}
      #fb-userbar button:hover{text-decoration:underline;}
    `;
    const style = document.createElement('style');
    style.id = 'fb-login-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function showOverlay() {
    injectLoginStyles();
    if (document.getElementById('fb-overlay')) return;
    const ov = document.createElement('div');
    ov.id = 'fb-overlay';
    ov.innerHTML = `
      <div id="fb-card">
        <h1>Tarefas Estratégicas</h1>
        <p class="sub">Acesse com o e-mail e senha cadastrados.</p>
        <form id="fb-form" autocomplete="on">
          <label for="fb-email">E-mail</label>
          <input id="fb-email" type="email" autocomplete="username" required />
          <label for="fb-pass">Senha</label>
          <input id="fb-pass" type="password" autocomplete="current-password" required />
          <button type="submit" id="fb-submit">Entrar</button>
          <div class="err" id="fb-err"></div>
        </form>
        <div class="foot">
          <a id="fb-reset">Esqueci minha senha</a>
        </div>
      </div>
    `;
    document.body.appendChild(ov);

    const form = ov.querySelector('#fb-form');
    const errEl = ov.querySelector('#fb-err');
    const btn = ov.querySelector('#fb-submit');
    const emailEl = ov.querySelector('#fb-email');
    const passEl = ov.querySelector('#fb-pass');

    // Lembra último e-mail
    try {
      const last = localStorage.getItem('fb_last_email');
      if (last) emailEl.value = last;
    } catch {}

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errEl.textContent = '';
      btn.disabled = true;
      btn.textContent = 'Entrando…';
      try {
        await auth.signInWithEmailAndPassword(emailEl.value.trim(), passEl.value);
        try { localStorage.setItem('fb_last_email', emailEl.value.trim()); } catch {}
        // onAuthStateChanged cuidará do resto
      } catch (err) {
        errEl.textContent = traduzirErro(err);
        btn.disabled = false;
        btn.textContent = 'Entrar';
      }
    });

    ov.querySelector('#fb-reset').addEventListener('click', async () => {
      const e = emailEl.value.trim();
      if (!e) { errEl.textContent = 'Digite seu e-mail acima primeiro.'; return; }
      try {
        await auth.sendPasswordResetEmail(e);
        errEl.style.color = '#0a7a3d';
        errEl.textContent = 'Enviamos um link de redefinição para ' + e;
      } catch (err) {
        errEl.style.color = '#b00020';
        errEl.textContent = traduzirErro(err);
      }
    });
  }

  function hideOverlay() {
    const ov = document.getElementById('fb-overlay');
    if (ov) ov.remove();
  }

  function traduzirErro(err) {
    const code = err && err.code ? err.code : '';
    const map = {
      'auth/invalid-email': 'E-mail inválido.',
      'auth/user-disabled': 'Usuário desativado.',
      'auth/user-not-found': 'Usuário não encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-credential': 'E-mail ou senha incorretos.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
      'auth/network-request-failed': 'Falha de rede. Verifique sua conexão.'
    };
    return map[code] || (err && err.message) || 'Não foi possível entrar.';
  }

  function showStatus(msg) {
    let el = document.getElementById('fb-status');
    if (!el) {
      el = document.createElement('div');
      el.id = 'fb-status';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showStatus._t);
    showStatus._t = setTimeout(() => el.classList.remove('show'), 1500);
  }

  function showUserBar(email) {
    let el = document.getElementById('fb-userbar');
    if (!el) {
      el = document.createElement('div');
      el.id = 'fb-userbar';
      document.body.appendChild(el);
    }
    el.innerHTML = `<span>☁️ ${email}</span><button id="fb-logout">Sair</button>`;
    el.classList.add('show');
    el.querySelector('#fb-logout').addEventListener('click', async () => {
      if (!confirm('Sair da conta? Os dados sincronizados ficarão na nuvem.')) return;
      try { await auth.signOut(); } catch {}
      // limpa localStorage local pra não vazar pro próximo usuário
      try {
        SYNC_KEYS.forEach(k => localStorage.removeItem(k));
      } catch {}
      location.reload();
    });
  }

  /* ---------- Sincronização Firestore <-> localStorage ---------- */

  async function pullSnapshot(uid) {
    // Lê todos os docs em users/{uid}/data
    const snap = await db.collection('users').doc(uid).collection('data').get();
    const out = {};
    snap.forEach(doc => { out[doc.id] = doc.data(); });
    return out;
  }

  function hydrateLocal(snapshot) {
    hydrating = true;
    try {
      SYNC_KEYS.forEach(key => {
        const cloud = snapshot[key];
        if (cloud && Object.prototype.hasOwnProperty.call(cloud, 'value')) {
          // Sobrescreve local com nuvem (fonte de verdade = nuvem após login)
          try {
            localStorage.setItem(key, JSON.stringify(cloud.value));
          } catch {}
        }
      });
    } finally {
      hydrating = false;
    }
  }

  async function mergeFirstTime(uid, snapshot) {
    // Se a nuvem está vazia para alguma chave e o local tem dados, sobe o local.
    const ops = [];
    SYNC_KEYS.forEach(key => {
      const inCloud = !!snapshot[key];
      let localRaw = null;
      try { localRaw = localStorage.getItem(key); } catch {}
      if (!inCloud && localRaw) {
        try {
          const value = JSON.parse(localRaw);
          ops.push(
            db.collection('users').doc(uid).collection('data').doc(key)
              .set({ value, updatedAt: Date.now() })
          );
        } catch {}
      }
    });
    if (ops.length) await Promise.all(ops);
  }

  function pushKey(key) {
    if (!currentUser || hydrating) return;
    clearTimeout(pushTimers[key]);
    pushTimers[key] = setTimeout(async () => {
      let value;
      try {
        const raw = localStorage.getItem(key);
        if (raw == null) return;
        value = JSON.parse(raw);
      } catch { return; }
      try {
        await db.collection('users').doc(currentUser.uid)
          .collection('data').doc(key)
          .set({ value, updatedAt: Date.now() });
        showStatus('☁️ salvo');
      } catch (e) {
        console.error('[firebase-sync] falha ao salvar', key, e);
        showStatus('⚠ falha ao salvar');
      }
    }, 800);
  }

  function hookWrites() {
    // Substitui window._write por wrapper que dispara push
    if (typeof window._write !== 'function' || window._write.__fbHooked) return;
    const original = window._write;
    function hooked(key, value) {
      const out = original.apply(this, arguments);
      if (SYNC_KEYS.indexOf(key) !== -1) pushKey(key);
      return out;
    }
    hooked.__fbHooked = true;
    window._write = hooked;
  }

  /* ---------- Marcação de controle do boot ---------- */

  // Sinaliza ao app.js que o firebase-sync está cuidando do bootstrap.
  // O bootstrap em app.js verifica window.__firebaseSyncActive e não chama init().
  function claimBoot() {
    window.__firebaseSyncActive = true;
  }

  async function bootApp(user) {
    currentUser = user;
    showStatus('☁️ baixando dados…');
    let snapshot = {};
    try {
      snapshot = await pullSnapshot(user.uid);
    } catch (e) {
      console.error('[firebase-sync] erro ao baixar snapshot', e);
      alert('Falha ao baixar dados da nuvem: ' + (e && e.message ? e.message : e));
    }
    hydrateLocal(snapshot);
    // Migração inicial: se a nuvem estava vazia mas existem dados locais
    try { await mergeFirstTime(user.uid, snapshot); } catch (e) { console.warn(e); }

    hideOverlay();
    showUserBar(user.email || '(usuário)');

    // Sobe hook de write ANTES do initApp (que vai chamar carregarTarefas etc)
    hookWrites();

    // Inicia o app real
    if (typeof window.initApp === 'function') {
      try { window.initApp(); } catch (e) { console.error(e); }
    } else {
      console.error('[firebase-sync] initApp() não existe — app.js carregou?');
    }
  }

  /* ---------- Bootstrap ---------- */

  async function start() {
    try {
      claimBoot();
      await loadFirebaseSDK();
      if (!window.firebase) throw new Error('Firebase SDK não inicializou');
      if (!window.FIREBASE_CONFIG) throw new Error('FIREBASE_CONFIG ausente');

      app = window.firebase.initializeApp(window.FIREBASE_CONFIG);
      auth = window.firebase.auth();
      db = window.firebase.firestore();
      // persistência local de auth (já é default, mas explicitamos)
      try {
        await auth.setPersistence(window.firebase.auth.Auth.Persistence.LOCAL);
      } catch {}

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await bootApp(user);
        } else {
          // Se já tinha userbar de sessão anterior, esconde
          const ub = document.getElementById('fb-userbar');
          if (ub) ub.classList.remove('show');
          showOverlay();
        }
      });
    } catch (e) {
      console.error('[firebase-sync] falha no boot', e);
      alert('Não foi possível inicializar o login na nuvem. Recarregue a página.\n\n' + (e && e.message ? e.message : e));
    }
  }

  // Executa imediatamente (script é carregado antes do app.js? sim, ver index.html)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
