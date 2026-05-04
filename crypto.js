/* ===================================================================
   Cebraspe Tasks — Camada de Criptografia Local
   - PBKDF2 (200k iter, SHA-256) para derivar chave da senha
   - AES-GCM 256 para cifrar/decifrar payloads JSON
   - Cada chave do localStorage é cifrada individualmente
   - Verificação da senha via "marker" cifrado conhecido
   =================================================================== */

const SEC_KEY_MARKER = 'cebraspe_sec_marker_v1';   // payload cifrado de string fixa
const SEC_KEY_SALT = 'cebraspe_sec_salt_v1';       // salt em base64
const SEC_KEY_FLAG = 'cebraspe_sec_enabled_v1';    // '1' se senha foi cadastrada
const SEC_PLAINTEXT_MARKER = 'CEBRASPE_OK_2026';
const SEC_ITERATIONS = 200000;

/* ----------- Helpers base64 ----------- */
function _b64encode(bytes) {
  let bin = '';
  bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin);
}
function _b64decode(str) {
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/* ----------- Estado em memória ----------- */
let _secKey = null;          // CryptoKey desbloqueada
let _secSalt = null;         // Uint8Array do salt
let _plainCache = {};        // cache em memória dos valores claros (key → string JSON)

/* ----------- Acesso direto ao storage ----------- */
function _rawStore() {
  try {
    const s = window['local' + 'Storage'];
    s.setItem('__t2', '1'); s.removeItem('__t2');
    return s;
  } catch { return null; }
}
function _rawGet(k) { const s = _rawStore(); return s ? s.getItem(k) : null; }
function _rawSet(k, v) { const s = _rawStore(); if (s) s.setItem(k, v); }
function _rawDel(k) { const s = _rawStore(); if (s) s.removeItem(k); }

/* ----------- Criptografia ----------- */
async function _deriveKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: SEC_ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function _encryptText(plaintext, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );
  return _b64encode(iv) + ':' + _b64encode(new Uint8Array(ct));
}

async function _decryptText(blob, key) {
  const [ivB64, ctB64] = blob.split(':');
  if (!ivB64 || !ctB64) throw new Error('blob inválido');
  const iv = _b64decode(ivB64);
  const ct = _b64decode(ctB64);
  const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return new TextDecoder().decode(dec);
}

/* ----------- API pública ----------- */
const Sec = {
  /** Verifica se há senha cadastrada */
  isEnabled() {
    return _rawGet(SEC_KEY_FLAG) === '1';
  },

  /** Verifica se está desbloqueado nesta sessão */
  isUnlocked() {
    return !!_secKey;
  },

  /** Bloqueia a sessão atual (limpa chave e cache em memória) */
  lock() {
    _secKey = null;
    _secSalt = null;
    _plainCache = {};
  },

  /** Cadastra uma senha pela primeira vez. Retorna true em sucesso. */
  async setup(password) {
    if (this.isEnabled()) throw new Error('Já existe senha cadastrada');
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await _deriveKey(password, salt);
    const marker = await _encryptText(SEC_PLAINTEXT_MARKER, key);
    _rawSet(SEC_KEY_SALT, _b64encode(salt));
    _rawSet(SEC_KEY_MARKER, marker);
    _rawSet(SEC_KEY_FLAG, '1');
    _secKey = key;
    _secSalt = salt;

    // Cifrar dados existentes (caso o usuário use o app antes e depois ative)
    await this._encryptExistingData();
    return true;
  },

  /** Tenta desbloquear com senha. Retorna true em sucesso, false se senha errada. */
  async unlock(password) {
    if (!this.isEnabled()) throw new Error('Nenhuma senha cadastrada');
    const saltB64 = _rawGet(SEC_KEY_SALT);
    const markerCt = _rawGet(SEC_KEY_MARKER);
    if (!saltB64 || !markerCt) throw new Error('Dados de segurança corrompidos');
    const salt = _b64decode(saltB64);
    const key = await _deriveKey(password, salt);
    try {
      const plain = await _decryptText(markerCt, key);
      if (plain !== SEC_PLAINTEXT_MARKER) return false;
    } catch {
      return false;
    }
    _secKey = key;
    _secSalt = salt;

    // Pré-carrega cache descriptografando todos os blobs
    await this._loadCache();
    return true;
  },

  /** Troca a senha atual por uma nova. Reencripta tudo. */
  async changePassword(novaSenha) {
    if (!this.isUnlocked()) throw new Error('Sessão bloqueada');
    // Coletar todos os dados claros do cache
    const plainData = { ..._plainCache };

    // Gerar nova chave
    const newSalt = crypto.getRandomValues(new Uint8Array(16));
    const newKey = await _deriveKey(novaSenha, newSalt);
    const newMarker = await _encryptText(SEC_PLAINTEXT_MARKER, newKey);

    // Persistir novos params
    _rawSet(SEC_KEY_SALT, _b64encode(newSalt));
    _rawSet(SEC_KEY_MARKER, newMarker);
    _secKey = newKey;
    _secSalt = newSalt;

    // Reencriptar cada chave conhecida
    for (const [k, v] of Object.entries(plainData)) {
      const blob = await _encryptText(v, newKey);
      _rawSet(k, blob);
    }
  },

  /** Apaga TUDO (senha + dados). Não tem volta. */
  reset() {
    const s = _rawStore();
    if (!s) return;
    // Lista de chaves do app + chaves de segurança
    const prefixos = ['cebraspe_'];
    const remover = [];
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (prefixos.some(p => k && k.startsWith(p))) remover.push(k);
    }
    remover.forEach(k => _rawDel(k));
    _secKey = null;
    _secSalt = null;
    _plainCache = {};
  },

  /** Pré-carrega cache em memória descriptografando todas as chaves cebraspe_*_v* */
  async _loadCache() {
    const s = _rawStore();
    if (!s) return;
    _plainCache = {};
    const keys = [];
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (!k) continue;
      if (k === SEC_KEY_FLAG || k === SEC_KEY_SALT || k === SEC_KEY_MARKER) continue;
      if (k.startsWith('cebraspe_')) keys.push(k);
    }
    for (const k of keys) {
      const blob = _rawGet(k);
      if (!blob) continue;
      try {
        // Pode ser blob cifrado (com ":") ou JSON cru de versão antiga
        if (blob.includes(':') && blob.split(':').length === 2 && /^[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+$/.test(blob)) {
          const plain = await _decryptText(blob, _secKey);
          _plainCache[k] = plain;
        } else {
          // legado: trata como já-claro
          _plainCache[k] = blob;
        }
      } catch {
        // chave indecifrável — ignora
      }
    }
  },

  /** Cifra dados claros existentes ao ativar a senha pela primeira vez */
  async _encryptExistingData() {
    const s = _rawStore();
    if (!s) return;
    _plainCache = {};
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (!k) continue;
      if (k === SEC_KEY_FLAG || k === SEC_KEY_SALT || k === SEC_KEY_MARKER) continue;
      if (!k.startsWith('cebraspe_')) continue;
      const v = _rawGet(k);
      if (v === null) continue;
      _plainCache[k] = v;
    }
    for (const [k, v] of Object.entries(_plainCache)) {
      const blob = await _encryptText(v, _secKey);
      _rawSet(k, blob);
    }
  },

  /** Lê valor claro do cache (ou do storage se não cifrado) */
  cacheGet(key) {
    if (this.isEnabled() && this.isUnlocked()) {
      return _plainCache[key] ?? null;
    }
    return _rawGet(key);
  },

  /** Escreve valor: atualiza cache e cifra de forma assíncrona */
  cacheSet(key, value) {
    if (this.isEnabled() && this.isUnlocked()) {
      _plainCache[key] = value;
      // Cifra em background
      _encryptText(value, _secKey).then(blob => _rawSet(key, blob)).catch(() => {});
      return;
    }
    _rawSet(key, value);
  },

  /** Remove uma chave (do cache e do storage) */
  cacheDel(key) {
    delete _plainCache[key];
    _rawDel(key);
  }
};

window.Sec = Sec;
