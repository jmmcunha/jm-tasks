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

  // Chave de tombstones de tarefas excluídas (sincronizada à parte)
  const TOMBSTONES_KEY = 'cebraspe_tarefas_v3_tombstones';
  const TOMBSTONES_DOC = 'cebraspe_tarefas_v3_tombstones';

  // Chaves que usam merge inteligente por id (em vez de overwrite)
  const MERGE_KEYS = new Set(['cebraspe_tarefas_v3']);

  // Modo equipe compartilhada: TODAS as usuárias logadas leem/escrevem no mesmo doc.
  // Caminho: shared/team/data/{key}
  const TEAM_ID = 'team';
  function dataDocRef(key) {
    return db.collection('shared').doc(TEAM_ID).collection('data').doc(key);
  }
  function dataColRef() {
    return db.collection('shared').doc(TEAM_ID).collection('data');
  }

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
      #fb-userbar #fb-resync{padding:0 6px;border-left:1px solid #e3e7ef;}
      #fb-userbar #fb-logout{padding-left:6px;border-left:1px solid #e3e7ef;}
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
    el.innerHTML = `<span>☁️ ${email}</span><button id="fb-resync" title="Buscar atualizações da equipe agora">Resincronizar</button><button id="fb-logout">Sair</button>`;
    el.classList.add('show');
    el.querySelector('#fb-resync').addEventListener('click', async () => {
      showStatus('☁️ buscando atualizações…');
      try {
        const snapshot = await pullSnapshot();
        // Faz merge entre local e remoto (não sobrescreve)
        let localList = [];
        try {
          const raw = localStorage.getItem('cebraspe_tarefas_v3');
          localList = raw ? JSON.parse(raw) : [];
          if (!Array.isArray(localList)) localList = [];
        } catch { localList = []; }
        const localTombs = lerTombstones();
        const remoteList = snapshot['cebraspe_tarefas_v3'] && Array.isArray(snapshot['cebraspe_tarefas_v3'].value)
          ? snapshot['cebraspe_tarefas_v3'].value : [];
        const remoteTombs = snapshot[TOMBSTONES_KEY] && Array.isArray(snapshot[TOMBSTONES_KEY].value)
          ? snapshot[TOMBSTONES_KEY].value : [];
        const merged = mergeTarefas(localList, remoteList, localTombs, remoteTombs);
        const mergedTombs = mergeTombstones(localTombs, remoteTombs);
        try {
          hydrating = true;
          localStorage.setItem('cebraspe_tarefas_v3', JSON.stringify(merged));
          localStorage.setItem(TOMBSTONES_KEY, JSON.stringify(mergedTombs));
          // Também hidrata as outras chaves (config, reunioes, revisoes) cegamente
          SYNC_KEYS.forEach(k => {
            if (k === 'cebraspe_tarefas_v3') return;
            const cloud = snapshot[k];
            if (cloud && Object.prototype.hasOwnProperty.call(cloud, 'value')) {
              try { localStorage.setItem(k, JSON.stringify(cloud.value)); } catch {}
            }
          });
        } finally { hydrating = false; }
        // Recarrega no app
        if (typeof window.carregarTarefas === 'function') window.carregarTarefas();
        if (typeof window.carregarRevisoes === 'function') window.carregarRevisoes();
        if (typeof window.carregarReunioes === 'function') window.carregarReunioes();
        if (typeof window.carregarConfig === 'function') window.carregarConfig();
        if (typeof window.carregarTombstones === 'function') window.carregarTombstones();
        if (typeof window.renderTudo === 'function') window.renderTudo();
        showStatus('☁️ atualizado');
      } catch (e) {
        console.error('[firebase-sync] resync falhou', e);
        showStatus('⚠ falha ao buscar');
      }
    });
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

  /* ---------- Sincronização Firestore <-> localStorage (modo equipe) ---------- */

  async function pullSnapshot() {
    // Lê todos os docs em shared/team/data
    const snap = await dataColRef().get();
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
          try {
            localStorage.setItem(key, JSON.stringify(cloud.value));
          } catch {}
        }
      });
    } finally {
      hydrating = false;
    }
  }

  async function mergeFirstTime(snapshot) {
    // Se a nuvem da equipe está vazia para alguma chave e o local tem dados,
    // sobe o local (semente inicial da agenda compartilhada).
    const ops = [];
    SYNC_KEYS.forEach(key => {
      const inCloud = !!snapshot[key];
      let localRaw = null;
      try { localRaw = localStorage.getItem(key); } catch {}
      if (!inCloud && localRaw) {
        try {
          const value = JSON.parse(localRaw);
          ops.push(
            dataDocRef(key).set({
              value,
              updatedAt: Date.now(),
              updatedBy: (currentUser && currentUser.email) || (currentUser && currentUser.uid) || 'desconhecido'
            })
          );
        } catch {}
      }
    });
    if (ops.length) await Promise.all(ops);
  }

  // ---------- Merge por id (tarefas) ----------

  // Lê tombstones locais.
  function lerTombstones() {
    try {
      const raw = localStorage.getItem(TOMBSTONES_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }

  // Faz merge entre lista local e lista remota usando _lwm (last-write-marker).
  // Tombstones (de qualquer lado) vão ser respeitados: id presente em tombstone
  // posterior a _lwm da tarefa significa que ela foi excluída.
  function mergeTarefas(localList, remoteList, localTombs, remoteTombs) {
    const porId = new Map();
    // Index remote primeiro
    for (const t of (remoteList || [])) {
      if (t && t.id) porId.set(t.id, { ...t, _origin: 'remote' });
    }
    // Sobrepõe local só quando local é mais novo
    for (const t of (localList || [])) {
      if (!t || !t.id) continue;
      const r = porId.get(t.id);
      if (!r) {
        porId.set(t.id, { ...t, _origin: 'local' });
      } else {
        const lLwm = typeof t._lwm === 'number' ? t._lwm : 0;
        const rLwm = typeof r._lwm === 'number' ? r._lwm : 0;
        if (lLwm > rLwm) {
          porId.set(t.id, { ...t, _origin: 'local' });
        }
      }
    }
    // Aplica tombstones: id em tombstone com _del > _lwm da tarefa => remove
    const allTombs = new Map();
    for (const x of (remoteTombs || [])) {
      if (x && x.id) allTombs.set(x.id, x._del || 0);
    }
    for (const x of (localTombs || [])) {
      if (x && x.id) {
        const prev = allTombs.get(x.id) || 0;
        if ((x._del || 0) > prev) allTombs.set(x.id, x._del);
      }
    }
    for (const [id, delTs] of allTombs) {
      const t = porId.get(id);
      if (!t) continue;
      const lwm = typeof t._lwm === 'number' ? t._lwm : 0;
      if (delTs > lwm) porId.delete(id);
    }
    // Limpa marcador de origem antes de retornar
    return Array.from(porId.values()).map(t => {
      const { _origin, ...rest } = t;
      return rest;
    });
  }

  // Merge entre duas listas de tombstones, mantendo o _del mais recente por id.
  function mergeTombstones(a, b) {
    const m = new Map();
    for (const arr of [a || [], b || []]) {
      for (const x of arr) {
        if (!x || !x.id) continue;
        const prev = m.get(x.id);
        if (!prev || (x._del || 0) > (prev._del || 0)) m.set(x.id, { id: x.id, _del: x._del || 0 });
      }
    }
    return Array.from(m.values());
  }

  async function pushTarefasComMerge() {
    if (!currentUser) return;
    let localList = [];
    let localTombs = [];
    try {
      const raw = localStorage.getItem('cebraspe_tarefas_v3');
      localList = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(localList)) localList = [];
    } catch { localList = []; }
    localTombs = lerTombstones();

    // Tenta uma transação: lê remoto, faz merge, escreve.
    const tarefasRef = dataDocRef('cebraspe_tarefas_v3');
    const tombsRef = dataDocRef(TOMBSTONES_DOC);
    try {
      const ts = Date.now();
      lastLocalSetByUs['cebraspe_tarefas_v3'] = ts;
      lastLocalSetByUs[TOMBSTONES_DOC] = ts;

      await db.runTransaction(async (tx) => {
        const [snapTar, snapTomb] = await Promise.all([tx.get(tarefasRef), tx.get(tombsRef)]);
        const remoteList = snapTar.exists && snapTar.data() && Array.isArray(snapTar.data().value)
          ? snapTar.data().value : [];
        const remoteTombs = snapTomb.exists && snapTomb.data() && Array.isArray(snapTomb.data().value)
          ? snapTomb.data().value : [];

        const merged = mergeTarefas(localList, remoteList, localTombs, remoteTombs);
        const mergedTombs = mergeTombstones(localTombs, remoteTombs);

        tx.set(tarefasRef, {
          value: merged,
          updatedAt: ts,
          updatedBy: (currentUser && currentUser.email) || currentUser.uid
        });
        tx.set(tombsRef, {
          value: mergedTombs,
          updatedAt: ts,
          updatedBy: (currentUser && currentUser.email) || currentUser.uid
        });

        // Atualiza local com o resultado do merge para evitar perder tarefas remotas
        try {
          hydrating = true;
          localStorage.setItem('cebraspe_tarefas_v3', JSON.stringify(merged));
          localStorage.setItem(TOMBSTONES_KEY, JSON.stringify(mergedTombs));
        } finally {
          hydrating = false;
        }
      });
      showStatus('☁️ sincronizado');
      // Pede ao app pra recarregar/redesenhar (caso merge tenha trazido novidades)
      try {
        if (typeof window.carregarTarefas === 'function') window.carregarTarefas();
        if (typeof window.renderTudo === 'function') window.renderTudo();
      } catch {}
    } catch (e) {
      console.error('[firebase-sync] falha no merge de tarefas', e);
      showStatus('⚠ falha ao sincronizar');
    }
  }

  function pushKey(key) {
    if (!currentUser || hydrating) return;
    // Tarefas usam merge transacional (não sobrescreve array inteiro)
    if (MERGE_KEYS.has(key)) {
      clearTimeout(pushTimers[key]);
      pushTimers[key] = setTimeout(() => { pushTarefasComMerge(); }, 800);
      return;
    }
    // Caso especial: chave de tombstones é sempre sincronizada junto com tarefas
    if (key === TOMBSTONES_KEY) {
      clearTimeout(pushTimers['cebraspe_tarefas_v3']);
      pushTimers['cebraspe_tarefas_v3'] = setTimeout(() => { pushTarefasComMerge(); }, 800);
      return;
    }
    clearTimeout(pushTimers[key]);
    pushTimers[key] = setTimeout(async () => {
      let value;
      try {
        const raw = localStorage.getItem(key);
        if (raw == null) return;
        value = JSON.parse(raw);
      } catch { return; }
      try {
        const ts = Date.now();
        lastLocalSetByUs[key] = ts;
        await dataDocRef(key).set({
          value,
          updatedAt: ts,
          updatedBy: (currentUser && currentUser.email) || currentUser.uid
        });
        showStatus('☁️ salvo (equipe)');
      } catch (e) {
        console.error('[firebase-sync] falha ao salvar', key, e);
        showStatus('⚠ falha ao salvar');
      }
    }, 800);
  }

  /* ---------- Tempo real: ouve mudanças de outras usuárias ---------- */

  let realtimeUnsub = null;
  let lastLocalSetByUs = {}; // key -> timestamp da última vez que ESTA aba salvou

  function startRealtime() {
    stopRealtime();
    realtimeUnsub = dataColRef().onSnapshot(snap => {
      let changedAny = false;
      // Acumula remoto de tarefas + tombstones para merge unificado
      let remoteTarefas = null;
      let remoteTombs = null;
      let tarefasFromOther = false;

      snap.docChanges().forEach(change => {
        const key = change.doc.id;
        const data = change.doc.data();
        if (!data || !Object.prototype.hasOwnProperty.call(data, 'value')) return;
        const myId = (currentUser && currentUser.email) || (currentUser && currentUser.uid) || '';
        const isMine = data.updatedBy === myId && lastLocalSetByUs[key] && Math.abs(data.updatedAt - lastLocalSetByUs[key]) < 4000;

        // Tarefas e tombstones: tratamos com merge especial
        if (key === 'cebraspe_tarefas_v3') {
          remoteTarefas = Array.isArray(data.value) ? data.value : [];
          if (!isMine) tarefasFromOther = true;
          return;
        }
        if (key === TOMBSTONES_KEY) {
          remoteTombs = Array.isArray(data.value) ? data.value : [];
          if (!isMine) tarefasFromOther = true;
          return;
        }

        // Demais chaves seguem comportamento antigo (sobrescrever)
        if (SYNC_KEYS.indexOf(key) === -1) return;
        if (isMine) return;
        try {
          hydrating = true;
          localStorage.setItem(key, JSON.stringify(data.value));
        } finally {
          hydrating = false;
        }
        changedAny = true;
      });

      // Se chegou snapshot de tarefas/tombstones de outra pessoa, faz merge
      if (remoteTarefas !== null || remoteTombs !== null) {
        let localList = [];
        try {
          const raw = localStorage.getItem('cebraspe_tarefas_v3');
          localList = raw ? JSON.parse(raw) : [];
          if (!Array.isArray(localList)) localList = [];
        } catch { localList = []; }
        const localTombs = lerTombstones();

        const merged = mergeTarefas(
          localList,
          remoteTarefas !== null ? remoteTarefas : localList,
          localTombs,
          remoteTombs !== null ? remoteTombs : localTombs
        );
        const mergedTombs = mergeTombstones(
          localTombs,
          remoteTombs !== null ? remoteTombs : []
        );

        try {
          hydrating = true;
          localStorage.setItem('cebraspe_tarefas_v3', JSON.stringify(merged));
          localStorage.setItem(TOMBSTONES_KEY, JSON.stringify(mergedTombs));
        } finally {
          hydrating = false;
        }
        if (tarefasFromOther) changedAny = true;
      }

      if (changedAny) {
        try {
          if (typeof window.carregarTarefas === 'function') window.carregarTarefas();
          if (typeof window.carregarRevisoes === 'function') window.carregarRevisoes();
          if (typeof window.carregarReunioes === 'function') window.carregarReunioes();
          if (typeof window.carregarConfig === 'function') window.carregarConfig();
          if (typeof window.carregarTombstones === 'function') window.carregarTombstones();
          if (typeof window.renderTudo === 'function') window.renderTudo();
          showStatus('☁️ atualizado por outra pessoa');
        } catch (e) { console.warn('[firebase-sync] erro ao re-renderizar', e); }
      }
    }, err => {
      console.error('[firebase-sync] realtime err', err);
      showStatus('⚠ sync offline');
    });
  }

  function stopRealtime() {
    if (realtimeUnsub) { try { realtimeUnsub(); } catch {} realtimeUnsub = null; }
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
    showStatus('☁️ baixando dados da equipe…');
    let snapshot = {};
    try {
      snapshot = await pullSnapshot();
    } catch (e) {
      console.error('[firebase-sync] erro ao baixar snapshot', e);
      alert('Falha ao baixar dados da equipe: ' + (e && e.message ? e.message : e));
    }
    hydrateLocal(snapshot);
    // Semente inicial: se a nuvem da equipe estava vazia mas existem dados locais,
    // os dados locais sobem como base compartilhada.
    try { await mergeFirstTime(snapshot); } catch (e) { console.warn(e); }

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

    // Liga sincronização em tempo real (depois de initApp para pegar referências)
    setTimeout(() => startRealtime(), 500);
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
