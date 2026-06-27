/* reunioes-anexos.js — Leva 36
 * Upload/download/delete de anexos (PDF, imagem, áudio) no Firebase Storage.
 * Caminho: team/reunioes/<reuniao_id>/<anexo_id>__<filename>
 * Metadados ficam dentro de reuniao.anexos[] (array no Firestore).
 *
 * API pública: window.ReunioesAnexos
 *   .upload(reuniao, file, opts) -> {id, path, url, ...}
 *   .listar(reuniao) -> Anexo[]
 *   .remover(reuniao, anexoId)
 *   .getURL(path)
 *   .baixarBase64(path) -> {mime, base64}
 *   .gravarAudio() -> Promise<File> (browser MediaRecorder)
 *   .estaGravando() / .pararGravacao()
 *   .formatarTamanho(bytes)
 */
(function () {
  'use strict';

  const STORAGE_ROOT = 'team/reunioes';
  const TIPOS_VALIDOS = {
    pdf: ['application/pdf'],
    imagem: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'],
    audio: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/webm', 'audio/ogg', 'audio/mp4', 'audio/x-m4a', 'audio/aac'],
    documento: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.oasis.opendocument.text'
    ]
  };
  const TAMANHO_MAX = {
    pdf: 25 * 1024 * 1024,       // 25 MB
    imagem: 15 * 1024 * 1024,    // 15 MB
    audio: 50 * 1024 * 1024,     // 50 MB
    documento: 25 * 1024 * 1024  // 25 MB
  };

  function classificarTipo(mime) {
    const m = (mime || '').toLowerCase();
    for (const cat of Object.keys(TIPOS_VALIDOS)) {
      if (TIPOS_VALIDOS[cat].some((x) => x === m)) return cat;
    }
    if (m.startsWith('image/')) return 'imagem';
    if (m.startsWith('audio/')) return 'audio';
    if (m === 'application/pdf') return 'pdf';
    return 'documento';
  }

  function formatarTamanho(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const u = ['B', 'KB', 'MB', 'GB'];
    let i = 0, v = bytes;
    while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
    return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${u[i]}`;
  }

  function _gerarId() {
    return 'anx_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function _sanitizarNome(nome) {
    return String(nome || 'arquivo')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '_')
      .slice(0, 80);
  }

  function _getStorage() {
    if (!window.firebase || !window.firebase.storage) {
      throw new Error('Firebase Storage não foi carregado. Atualize a página.');
    }
    return window.firebase.storage();
  }

  /* ---------- Upload ---------- */

  async function upload(reuniao, file, opts) {
    if (!reuniao || !reuniao.id) throw new Error('Reunião sem id.');
    if (!file) throw new Error('Arquivo vazio.');
    const tipo = classificarTipo(file.type);
    const limite = TAMANHO_MAX[tipo] || TAMANHO_MAX.documento;
    if (file.size > limite) {
      throw new Error(`Arquivo grande demais (${formatarTamanho(file.size)}). Limite: ${formatarTamanho(limite)}.`);
    }

    const anexoId = _gerarId();
    const safeName = _sanitizarNome(file.name || (tipo + '.bin'));
    const path = `${STORAGE_ROOT}/${reuniao.id}/${anexoId}__${safeName}`;
    const ref = _getStorage().ref().child(path);

    const metadata = {
      contentType: file.type || 'application/octet-stream',
      customMetadata: {
        reuniaoId: reuniao.id,
        anexoId,
        tipo,
        nomeOriginal: file.name || ''
      }
    };

    // Sinaliza progresso via onProgress
    const task = ref.put(file, metadata);
    if (typeof opts?.onProgress === 'function') {
      task.on('state_changed', (snap) => {
        const pct = snap.totalBytes ? Math.round((snap.bytesTransferred / snap.totalBytes) * 100) : 0;
        opts.onProgress(pct, snap);
      });
    }
    await task;
    const url = await ref.getDownloadURL();

    const anexo = {
      id: anexoId,
      path,
      url,
      tipo,
      mime: file.type || '',
      nome: file.name || safeName,
      tamanho: file.size || 0,
      criadoEm: Date.now(),
      criadoPor: (window.firebase?.auth?.()?.currentUser?.email) || '',
      assuntoId: opts?.assuntoId || '',
      // Resultado da IA (preenchido depois por reunioes-ia.js)
      ia: null
    };

    // Persiste no Firestore via Reunioes.atualizarReuniao
    if (window.Reunioes && typeof window.Reunioes.atualizarReuniao === 'function') {
      const anexos = Array.isArray(reuniao.anexos) ? reuniao.anexos.slice() : [];
      anexos.push(anexo);
      await window.Reunioes.atualizarReuniao(reuniao.id, { anexos });
    }

    return anexo;
  }

  async function remover(reuniao, anexoId) {
    if (!reuniao || !reuniao.id) throw new Error('Reunião sem id.');
    const anexos = Array.isArray(reuniao.anexos) ? reuniao.anexos.slice() : [];
    const idx = anexos.findIndex((a) => a.id === anexoId);
    if (idx < 0) return false;
    const alvo = anexos[idx];
    // Tenta apagar do Storage; ignora erro 404 (arquivo já sumiu)
    try {
      await _getStorage().ref().child(alvo.path).delete();
    } catch (e) {
      if (!/object-not-found|not.found/i.test(e?.code || e?.message || '')) {
        console.warn('[anexos] falha ao apagar do storage', e);
      }
    }
    anexos.splice(idx, 1);
    if (window.Reunioes && typeof window.Reunioes.atualizarReuniao === 'function') {
      await window.Reunioes.atualizarReuniao(reuniao.id, { anexos });
    }
    return true;
  }

  async function atualizarAnexo(reuniao, anexoId, patch) {
    if (!reuniao || !reuniao.id) throw new Error('Reunião sem id.');
    const anexos = Array.isArray(reuniao.anexos) ? reuniao.anexos.slice() : [];
    const idx = anexos.findIndex((a) => a.id === anexoId);
    if (idx < 0) return false;
    anexos[idx] = Object.assign({}, anexos[idx], patch || {}, { atualizadoEm: Date.now() });
    if (window.Reunioes && typeof window.Reunioes.atualizarReuniao === 'function') {
      await window.Reunioes.atualizarReuniao(reuniao.id, { anexos });
    }
    return anexos[idx];
  }

  function listar(reuniao) {
    return Array.isArray(reuniao?.anexos) ? reuniao.anexos.slice() : [];
  }

  async function getURL(path) {
    return _getStorage().ref().child(path).getDownloadURL();
  }

  // Baixa um anexo do Storage e devolve {mime, base64} para enviar ao Gemini.
  async function baixarBase64(path) {
    const url = await getURL(path);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Não consegui baixar o anexo (${resp.status}).`);
    const blob = await resp.blob();
    const base64 = await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        const s = String(fr.result || '');
        const i = s.indexOf(',');
        resolve(i >= 0 ? s.slice(i + 1) : s);
      };
      fr.onerror = () => reject(new Error('Falha ao ler arquivo.'));
      fr.readAsDataURL(blob);
    });
    return { mime: blob.type || 'application/octet-stream', base64, tamanho: blob.size };
  }

  /* ---------- Gravação de áudio no navegador ---------- */

  let _recorder = null;
  let _chunks = [];
  let _gravandoDesde = 0;

  function estaGravando() {
    return _recorder && _recorder.state === 'recording';
  }

  async function iniciarGravacao(opts) {
    if (estaGravando()) throw new Error('Já está gravando.');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Este navegador não permite captura de microfone.');
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Prefere webm/opus (suporte amplo no Chrome/Firefox). Safari usa mp4.
    let mime = '';
    const candidatos = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
    for (const c of candidatos) {
      if (window.MediaRecorder?.isTypeSupported?.(c)) { mime = c; break; }
    }
    _recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    _chunks = [];
    _gravandoDesde = Date.now();
    _recorder.ondataavailable = (e) => { if (e.data && e.data.size) _chunks.push(e.data); };
    _recorder.start(1000);
    if (typeof opts?.onTick === 'function') {
      const timer = setInterval(() => {
        if (!estaGravando()) { clearInterval(timer); return; }
        opts.onTick(Math.floor((Date.now() - _gravandoDesde) / 1000));
      }, 1000);
    }
    return { iniciada: true, mime: _recorder.mimeType || mime };
  }

  function pararGravacao() {
    return new Promise((resolve, reject) => {
      if (!_recorder) return reject(new Error('Nenhuma gravação ativa.'));
      const stream = _recorder.stream;
      _recorder.onstop = () => {
        try {
          const tipo = _recorder.mimeType || 'audio/webm';
          const ext = tipo.includes('mp4') ? 'm4a' : (tipo.includes('ogg') ? 'ogg' : 'webm');
          const blob = new Blob(_chunks, { type: tipo });
          const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          const file = new File([blob], `gravacao_${ts}.${ext}`, { type: tipo });
          try { stream.getTracks().forEach((t) => t.stop()); } catch {}
          _recorder = null; _chunks = []; _gravandoDesde = 0;
          resolve(file);
        } catch (e) { reject(e); }
      };
      _recorder.stop();
    });
  }

  function tempoGravado() {
    if (!estaGravando()) return 0;
    return Math.floor((Date.now() - _gravandoDesde) / 1000);
  }

  /* ---------- Export ---------- */
  window.ReunioesAnexos = {
    upload,
    listar,
    remover,
    atualizarAnexo,
    getURL,
    baixarBase64,
    iniciarGravacao,
    pararGravacao,
    estaGravando,
    tempoGravado,
    classificarTipo,
    formatarTamanho,
    TIPOS_VALIDOS,
    TAMANHO_MAX
  };
})();
