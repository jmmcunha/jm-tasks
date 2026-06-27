/* reunioes.js — Sistema de Ciclo de Reuniões (Leva 35)
 *
 * Gerencia reuniões, assuntos e decisões. Integra com tarefas (cebraspe_tarefas_v3)
 * via campos opcionais decisao_id e reuniao_id.
 *
 * Persistência:
 *   cebraspe_reunioes_v2  — lista de reuniões
 *   cebraspe_assuntos_v1  — lista de assuntos (sempre nascem dentro de reunião)
 *   cebraspe_decisoes_v1  — lista de decisões (com categoria)
 *
 * Sincronização via firebase-sync.js (chaves já adicionadas em SYNC_KEYS).
 */
(function () {
  'use strict';

  const KEY_REUNIOES = 'cebraspe_reunioes_v2';
  const KEY_ASSUNTOS = 'cebraspe_assuntos_v1';
  const KEY_DECISOES = 'cebraspe_decisoes_v1';

  // Apenas este email pode encerrar reuniões.
  const EMAIL_ENCERRADOR = 'joaomarcelo2008@gmail.com';

  // ---------- estado em memória ----------
  let reunioes = [];
  let assuntos = [];
  let decisoes = [];

  // ---------- helpers ----------
  function uid(p) { return (p || 'x') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function nowMs() { return Date.now(); }
  function _r(key, fb) { return (typeof window._read === 'function') ? window._read(key, fb) : fb; }
  function _w(key, v) { if (typeof window._write === 'function') window._write(key, v); }
  function emailLogado() {
    // 1) Firebase Auth ao vivo
    try {
      const live = window.firebase && window.firebase.auth && window.firebase.auth().currentUser && window.firebase.auth().currentUser.email;
      if (live) return live;
    } catch {}
    // 2) Fallback: sessão persistida do Firebase no localStorage (sobrevive a hidratação tardia no mobile)
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('firebase:authUser:') === 0) {
          const v = JSON.parse(localStorage.getItem(k) || '{}');
          if (v && v.email) return v.email;
        }
      }
    } catch {}
    // 3) Fallback adicional: e-mail salvo pelo próprio app
    try {
      const u = JSON.parse(localStorage.getItem('cebraspe_user') || 'null');
      if (u && u.email) return u.email;
    } catch {}
    return '';
  }
  function podeEncerrar() {
    const e = (emailLogado() || '').toLowerCase();
    return e === EMAIL_ENCERRADOR.toLowerCase();
  }

  // Re-renderiza quando o Auth resolver (caso a Tela 5 tenha sido pintada antes)
  try {
    if (window.firebase && window.firebase.auth) {
      let _jaRendered = false;
      window.firebase.auth().onAuthStateChanged(function (u) {
        if (_jaRendered) return;
        if (u && u.email) {
          _jaRendered = true;
          if (typeof window.renderReunioes === 'function') {
            try { window.renderReunioes(); } catch {}
          }
        }
      });
    }
  } catch {}

  // ---------- carga / persistência ----------
  function carregar() {
    reunioes = _r(KEY_REUNIOES, []) || [];
    assuntos = _r(KEY_ASSUNTOS, []) || [];
    decisoes = _r(KEY_DECISOES, []) || [];
    if (!Array.isArray(reunioes)) reunioes = [];
    if (!Array.isArray(assuntos)) assuntos = [];
    if (!Array.isArray(decisoes)) decisoes = [];
  }
  function salvarReunioes() { _w(KEY_REUNIOES, reunioes); }
  function salvarAssuntos() { _w(KEY_ASSUNTOS, assuntos); }
  function salvarDecisoes() { _w(KEY_DECISOES, decisoes); }

  // Exposta para firebase-sync acionar reload após pull.
  window.carregarReunioesSistema = carregar;

  // ---------- numeração sequencial ----------
  function proximoNumero() {
    let max = 0;
    for (const r of reunioes) {
      const n = Number(r.numero);
      if (!isNaN(n) && n > max) max = n;
    }
    return max + 1;
  }

  // ---------- CRUD reuniões ----------
  function criarReuniao({ titulo, data, hora, local, participantes, sensivel }) {
    const r = {
      id: uid('r'),
      numero: proximoNumero(),
      titulo: (titulo || '').trim(),
      data: data || '',
      hora: hora || '',
      local: (local || '').trim(),
      participantes: Array.isArray(participantes) ? participantes.slice() : [],
      sensivel: !!sensivel,
      pauta_ids: [],
      status: 'rascunho',
      anexos: [],
      memoria: {
        executivo: '',
        decisoes_ids: [],
        tarefas_geradas_ids: [],
        assuntos_em_aberto_ids: [],
        aprovada_em: null,
        aprovada_por: ''
      },
      criadaEm: nowMs(),
      atualizadaEm: nowMs(),
      _lwm: nowMs()
    };
    reunioes.push(r);
    salvarReunioes();
    return r;
  }
  function atualizarReuniao(id, patch) {
    const idx = reunioes.findIndex(r => r.id === id);
    if (idx === -1) return null;
    reunioes[idx] = Object.assign({}, reunioes[idx], patch, {
      atualizadaEm: nowMs(),
      _lwm: nowMs()
    });
    salvarReunioes();
    return reunioes[idx];
  }
  function excluirReuniao(id) {
    // Só pode excluir rascunho.
    const r = reunioes.find(x => x.id === id);
    if (!r) return false;
    if (r.status !== 'rascunho') return false;
    // Também remove assuntos criados nesta reunião (origem_ref.reuniao_origem_id) que estão em pauta apenas dela.
    const assuntosDaReuniao = assuntos.filter(a => a.origem_ref && a.origem_ref.reuniao_origem_id === id);
    for (const a of assuntosDaReuniao) {
      // Remove o assunto se ele não foi resolvido/arquivado e está apenas neste rascunho.
      const idxA = assuntos.findIndex(x => x.id === a.id);
      if (idxA !== -1) assuntos.splice(idxA, 1);
    }
    salvarAssuntos();
    reunioes = reunioes.filter(x => x.id !== id);
    salvarReunioes();
    return true;
  }
  function getReuniao(id) { return reunioes.find(r => r.id === id) || null; }
  function listaReunioes() { return reunioes.slice().sort((a, b) => (b.numero || 0) - (a.numero || 0)); }

  // ---------- CRUD assuntos ----------
  function criarAssunto({ titulo, dono, urgencia, estimativa_min, notas, reuniao_origem_id, tarefa_id }) {
    const a = {
      id: uid('a'),
      titulo: (titulo || '').trim(),
      dono: (dono || '').trim(),
      urgencia: urgencia || 'media',
      status: 'pendente',
      estimativa_min: Number(estimativa_min) || 0,
      notas: (notas || '').trim(),
      origem: tarefa_id ? 'herdado_tarefa_aberta' : 'criado_em_reuniao',
      origem_ref: {
        reuniao_origem_id: reuniao_origem_id || '',
        tarefa_id: tarefa_id || ''
      },
      historico_pauta: reuniao_origem_id ? [reuniao_origem_id] : [],
      criadaEm: nowMs(),
      atualizadaEm: nowMs(),
      _lwm: nowMs()
    };
    assuntos.push(a);
    salvarAssuntos();
    return a;
  }
  function atualizarAssunto(id, patch) {
    const idx = assuntos.findIndex(a => a.id === id);
    if (idx === -1) return null;
    assuntos[idx] = Object.assign({}, assuntos[idx], patch, {
      atualizadaEm: nowMs(),
      _lwm: nowMs()
    });
    salvarAssuntos();
    return assuntos[idx];
  }
  function excluirAssunto(id) {
    const r = assuntos.find(x => x.id === id);
    if (!r) return false;
    // Só pode excluir se ainda estiver pendente e não vinculado a decisão.
    if (r.status !== 'pendente' && r.status !== 'em_pauta') return false;
    const temDecisao = decisoes.some(d => d.assunto_id === id);
    if (temDecisao) return false;
    assuntos = assuntos.filter(x => x.id !== id);
    salvarAssuntos();
    return true;
  }
  function getAssunto(id) { return assuntos.find(a => a.id === id) || null; }
  function assuntosDaReuniao(reuniaoId) {
    const r = getReuniao(reuniaoId);
    if (!r) return [];
    const ids = Array.isArray(r.pauta_ids) ? r.pauta_ids : [];
    return ids.map(id => getAssunto(id)).filter(Boolean);
  }
  function assuntosAbertos() {
    return assuntos.filter(a => a.status === 'pendente' || a.status === 'em_pauta' || a.status === 'adiado');
  }

  // ---------- pendências herdadas ----------
  // Tarefas em aberto que ainda não estão em nenhum assunto vivo desta reunião.
  function pendenciasHerdadas(reuniaoId) {
    const tarefas = Array.isArray(window.tarefas) ? window.tarefas : [];
    const abertas = tarefas.filter(t => t && t.status && t.status !== 'concluida' && t.status !== 'cancelada');
    const r = getReuniao(reuniaoId);
    const pautaIds = (r && Array.isArray(r.pauta_ids)) ? new Set(r.pauta_ids) : new Set();
    // Não sugere tarefas que já estão na pauta como assunto desta reunião.
    const assuntosNaPauta = assuntos.filter(a => pautaIds.has(a.id));
    const idsTarefasJaNaPauta = new Set(assuntosNaPauta.map(a => a.origem_ref && a.origem_ref.tarefa_id).filter(Boolean));
    return abertas.filter(t => !idsTarefasJaNaPauta.has(t.id));
  }

  // ---------- pauta ----------
  function adicionarNaPauta(reuniaoId, assuntoId) {
    const r = getReuniao(reuniaoId);
    if (!r) return false;
    if (!Array.isArray(r.pauta_ids)) r.pauta_ids = [];
    if (r.pauta_ids.includes(assuntoId)) return false;
    r.pauta_ids.push(assuntoId);
    // atualiza historico do assunto
    const a = getAssunto(assuntoId);
    if (a) {
      if (!Array.isArray(a.historico_pauta)) a.historico_pauta = [];
      if (!a.historico_pauta.includes(reuniaoId)) a.historico_pauta.push(reuniaoId);
      a.status = 'em_pauta';
      a.atualizadaEm = nowMs(); a._lwm = nowMs();
    }
    r.atualizadaEm = nowMs(); r._lwm = nowMs();
    salvarReunioes(); salvarAssuntos();
    return true;
  }
  function removerDaPauta(reuniaoId, assuntoId) {
    const r = getReuniao(reuniaoId);
    if (!r) return false;
    if (!Array.isArray(r.pauta_ids)) r.pauta_ids = [];
    const before = r.pauta_ids.length;
    r.pauta_ids = r.pauta_ids.filter(x => x !== assuntoId);
    if (r.pauta_ids.length === before) return false;
    const a = getAssunto(assuntoId);
    if (a && a.status === 'em_pauta') {
      a.status = 'pendente';
      a.atualizadaEm = nowMs(); a._lwm = nowMs();
    }
    // Se o assunto foi criado nesta reunião e não tem decisões, excluí-lo.
    if (a && a.origem_ref && a.origem_ref.reuniao_origem_id === reuniaoId) {
      const temDec = decisoes.some(d => d.assunto_id === assuntoId);
      if (!temDec) {
        assuntos = assuntos.filter(x => x.id !== assuntoId);
      }
    }
    r.atualizadaEm = nowMs(); r._lwm = nowMs();
    salvarReunioes(); salvarAssuntos();
    return true;
  }
  // Cria um assunto a partir de uma tarefa em aberto e já o coloca na pauta.
  function herdarTarefa(reuniaoId, tarefaId) {
    const t = (Array.isArray(window.tarefas) ? window.tarefas : []).find(x => x.id === tarefaId);
    if (!t) return null;
    // Verifica se já existe assunto aberto para essa tarefa.
    let a = assuntos.find(x => x.origem_ref && x.origem_ref.tarefa_id === tarefaId && (x.status === 'pendente' || x.status === 'em_pauta' || x.status === 'adiado'));
    if (!a) {
      a = criarAssunto({
        titulo: t.titulo || '(tarefa sem título)',
        dono: t.responsavel || '',
        urgencia: t.urgente ? 'alta' : (t.prioridade === 'alta' ? 'alta' : 'media'),
        notas: t.resultado || '',
        reuniao_origem_id: reuniaoId,
        tarefa_id: tarefaId
      });
    }
    adicionarNaPauta(reuniaoId, a.id);
    return a;
  }

  // ---------- decisões ----------
  function criarDecisao({ texto, categoria, assunto_id, reuniao_id }) {
    const d = {
      id: uid('d'),
      texto: (texto || '').trim(),
      categoria: categoria || 'delegacao_interna',
      assunto_id: assunto_id || '',
      reuniao_id: reuniao_id || '',
      tarefas_geradas_ids: [],
      criadaEm: nowMs(),
      atualizadaEm: nowMs(),
      _lwm: nowMs()
    };
    decisoes.push(d);
    salvarDecisoes();
    return d;
  }
  function atualizarDecisao(id, patch) {
    const idx = decisoes.findIndex(d => d.id === id);
    if (idx === -1) return null;
    decisoes[idx] = Object.assign({}, decisoes[idx], patch, {
      atualizadaEm: nowMs(),
      _lwm: nowMs()
    });
    salvarDecisoes();
    return decisoes[idx];
  }
  function excluirDecisao(id) {
    // Só remove se reunião ainda for rascunho.
    const d = decisoes.find(x => x.id === id);
    if (!d) return false;
    const r = getReuniao(d.reuniao_id);
    if (!r || r.status !== 'rascunho') return false;
    decisoes = decisoes.filter(x => x.id !== id);
    salvarDecisoes();
    return true;
  }
  function decisoesDaReuniao(reuniaoId) {
    return decisoes.filter(d => d.reuniao_id === reuniaoId);
  }
  function decisoesDoAssunto(assuntoId) {
    return decisoes.filter(d => d.assunto_id === assuntoId);
  }

  // ---------- tratamento de assuntos ----------
  // Marca o tratamento dado ao assunto no contexto desta reunião.
  // tratamento: 'deliberar' | 'adiar' | 'arquivar' | 'continuar'
  function tratarAssunto(assuntoId, tratamento) {
    const a = getAssunto(assuntoId);
    if (!a) return null;
    let novoStatus = a.status;
    if (tratamento === 'arquivar') novoStatus = 'arquivado';
    else if (tratamento === 'adiar') novoStatus = 'adiado';
    else if (tratamento === 'continuar') novoStatus = 'em_pauta';
    else if (tratamento === 'deliberar') novoStatus = 'resolvido';
    a.status = novoStatus;
    a._tratamento = tratamento;
    a.atualizadaEm = nowMs(); a._lwm = nowMs();
    salvarAssuntos();
    return a;
  }

  // ---------- encerramento transacional ----------
  // Recebe: { reuniaoId, executivo, observacoes, geracoesTarefa (mapa decisao_id -> bool gerarTarefa), tarefaDetalhes (decisao_id -> {responsavel, prazo, prioridade}) }
  // Atualiza reuniao para 'encerrada', cria tarefas e atualiza decisões.
  function encerrarReuniao({ reuniaoId, executivo, observacoes, geracoesTarefa, tarefaDetalhes }) {
    if (!podeEncerrar()) {
      throw new Error('Apenas ' + EMAIL_ENCERRADOR + ' pode encerrar reuniões.');
    }
    const r = getReuniao(reuniaoId);
    if (!r) throw new Error('Reunião não encontrada.');
    if (r.status === 'encerrada') throw new Error('Reunião já encerrada.');

    const tarefasGeradasIds = [];
    const decisoesIds = [];

    // Garante que window.tarefas existe (do app.js)
    if (!Array.isArray(window.tarefas)) window.tarefas = [];

    const decsR = decisoesDaReuniao(reuniaoId);
    for (const d of decsR) {
      decisoesIds.push(d.id);
      const gerar = geracoesTarefa && geracoesTarefa[d.id] === true;
      if (!gerar) continue;
      const det = (tarefaDetalhes && tarefaDetalhes[d.id]) || {};
      const tid = 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      const novaTarefa = {
        id: tid,
        titulo: d.texto || '(sem título)',
        oeId: null,
        importante: null,
        urgente: null,
        responsavel: det.responsavel || '',
        dataInicio: '',
        prazo: det.prazo || '',
        prioridade: det.prioridade || 'media',
        status: 'a-fazer',
        revisitarEm: '',
        resultado: '',
        criadaEm: nowMs(),
        atualizadaEm: nowMs(),
        _lwm: nowMs(),
        andamentos: [],
        // Ligações com a reunião
        decisao_id: d.id,
        reuniao_id: reuniaoId
      };
      window.tarefas.push(novaTarefa);
      tarefasGeradasIds.push(tid);
      // Atualiza a decisão para guardar a tarefa gerada.
      if (!Array.isArray(d.tarefas_geradas_ids)) d.tarefas_geradas_ids = [];
      d.tarefas_geradas_ids.push(tid);
      d.atualizadaEm = nowMs(); d._lwm = nowMs();
    }
    salvarDecisoes();

    // Persiste tarefas geradas.
    if (typeof window.salvarTarefas === 'function') window.salvarTarefas();
    else _w('cebraspe_tarefas_v3', window.tarefas);

    // Marca assuntos sem tratamento como continuar (em_pauta) por padrão.
    const ids = Array.isArray(r.pauta_ids) ? r.pauta_ids : [];
    const assuntosEmAberto = [];
    for (const aid of ids) {
      const a = getAssunto(aid);
      if (!a) continue;
      if (a.status === 'pendente' || a.status === 'em_pauta') {
        a.status = 'em_pauta'; // continua para próxima reunião
        a.atualizadaEm = nowMs(); a._lwm = nowMs();
        assuntosEmAberto.push(aid);
      } else if (a.status === 'adiado') {
        assuntosEmAberto.push(aid);
      }
    }
    salvarAssuntos();

    // Atualiza memoria e marca como encerrada.
    r.memoria = {
      executivo: (executivo || '').trim(),
      observacoes: (observacoes || '').trim(),
      decisoes_ids: decisoesIds,
      tarefas_geradas_ids: tarefasGeradasIds,
      assuntos_em_aberto_ids: assuntosEmAberto,
      aprovada_em: nowMs(),
      aprovada_por: emailLogado() || EMAIL_ENCERRADOR
    };
    r.status = 'encerrada';
    r.atualizadaEm = nowMs(); r._lwm = nowMs();
    salvarReunioes();

    return r;
  }

  // ---------- formatação ----------
  function fmtData(d) {
    if (!d) return '';
    try {
      const [y, m, dd] = String(d).split('-');
      if (y && m && dd) return `${dd}/${m}/${y}`;
    } catch {}
    return String(d);
  }
  function fmtDataExtenso(d) {
    if (!d) return '';
    try {
      const dt = new Date(d + 'T12:00:00');
      const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
      return `${dt.getDate()} de ${meses[dt.getMonth()]} de ${dt.getFullYear()}`;
    } catch { return d; }
  }
  function labelCategoria(c) {
    return ({
      decisao_externa: 'Decisão',
      delegacao_interna: 'Delegação interna',
      encaminhamento: 'Encaminhamento',
      informe: 'Informe'
    })[c] || c;
  }
  function labelStatusAssunto(s) {
    return ({
      pendente: 'Pendente',
      em_pauta: 'Em pauta',
      resolvido: 'Resolvido',
      adiado: 'Adiado',
      arquivado: 'Arquivado'
    })[s] || s;
  }

  // ---------- carga inicial automática ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregar);
  } else {
    carregar();
  }

  // ---------- API pública ----------
  window.Reunioes = {
    // estado
    get reunioes() { return reunioes; },
    get assuntos() { return assuntos; },
    get decisoes() { return decisoes; },
    // ciclo de vida
    carregar,
    podeEncerrar,
    emailLogado,
    EMAIL_ENCERRADOR,
    // CRUD
    criarReuniao, atualizarReuniao, excluirReuniao, getReuniao, listaReunioes, proximoNumero,
    criarAssunto, atualizarAssunto, excluirAssunto, getAssunto, assuntosDaReuniao, assuntosAbertos,
    criarDecisao, atualizarDecisao, excluirDecisao, decisoesDaReuniao, decisoesDoAssunto,
    // pauta
    pendenciasHerdadas, adicionarNaPauta, removerDaPauta, herdarTarefa,
    // tratamento
    tratarAssunto,
    // encerramento
    encerrarReuniao,
    // formatação
    fmtData, fmtDataExtenso, labelCategoria, labelStatusAssunto,
    // chaves persistidas (para firebase-sync)
    KEYS: { REUNIOES: KEY_REUNIOES, ASSUNTOS: KEY_ASSUNTOS, DECISOES: KEY_DECISOES }
  };
})();
