/* ===================================================================
   Tarefas Estratégicas Cebraspe — Plano Diretor 2023–2026
   Versão 3 — Eisenhower, Agenda, Revisão Executiva, E-mails
   =================================================================== */

/* ===================================================================
   1. CONSTANTES
   =================================================================== */

const OBJETIVOS = [
  {
    id: 1,
    curto: 'Faturamento sustentável',
    texto: 'Alcançar faturamento anual sustentável.',
    descricao: 'Sustentabilidade refere-se à capacidade de gerar faturamento nos próximos anos a partir de contratos avaliados como de baixo risco de extinção e elevada probabilidade de renovação. A meta de longo prazo é o faturamento anual de R$ 400 milhões, com nenhuma fonte individual responsável por mais de 15% e nenhum segmento por mais de 30%. Inclui também a constituição de fundo de contingência suficiente para sustentar operações por pelo menos 12 meses sem receita e capacidade adicional de investimento equivalente a 20% do faturamento.',
    indicadores: [
      'Faturamento sustentável (média móvel de 12 meses dos contratos dentro da faixa de risco aceitável)',
      'Nível de dependência por fonte (% do faturamento por cliente ou contrato)',
      'Nível de dependência por mercado/segmento',
      'Faturamento anual de R$ 400 milhões',
      'Cobertura do fundo de contingência (montante acumulado ÷ custos fixos mensais)'
    ]
  },
  {
    id: 2,
    curto: 'Diversificar clientes',
    texto: 'Diversificar base de clientes — contratos com instituições públicas, privadas, 3º setor e órgãos dos três níveis de governo e três poderes.',
    descricao: 'Reduzir vulnerabilidade ampliando a base de clientes por natureza jurídica e por território. Inclui contratos com instituições públicas, privadas, do 3º setor e órgãos dos três níveis de governo (União, estados e municípios) e dos três poderes (Executivo, Legislativo e Judiciário). A meta é firmar contratos com pelo menos 15 unidades da Federação distintas.',
    indicadores: [
      'Pelo menos 15 UFs distintas com contrato ativo',
      'Índice de diversidade de contratantes (fontes ativas ÷ 192 fontes possíveis)',
      'Índice de diversidade geográfica (UFs e União com diversidade completa de fontes)'
    ]
  },
  {
    id: 3,
    curto: 'Educação e pesquisa em avaliação',
    texto: 'Ser uma instituição de educação e pesquisa em avaliação com estruturas, processos, recursos e pessoas adequados à atuação inovadora e em rede.',
    descricao: 'Consolidar o Cebraspe como instituição de educação e pesquisa em avaliação com estruturas, processos, recursos materiais e financeiros e pessoas adequados à atuação inovadora e em rede, com produção científica relevante e eficiente para o modelo de negócios. Sustenta os três pilares estruturantes: pesquisa em avaliação, produção de itens e instrumentos, e segurança tecnologicamente avançada.',
    indicadores: [
      'Índice de Estruturação — autoavaliação periódica do nível de atendimento dos requisitos definidos para uma instituição plenamente estruturada de educação e pesquisa em avaliação',
      'Patamares gradativos de melhoria nos períodos do ciclo'
    ]
  },
  {
    id: 4,
    curto: 'Reconhecimento por excelência',
    texto: 'Conquistar reconhecimento das partes interessadas pela excelência na execução de processos e na geração e disseminação de conhecimentos.',
    descricao: 'Ser espontaneamente reconhecido pelas partes interessadas pela excelência na execução dos processos, na geração e disseminação de conhecimentos relacionados a educação, pesquisa e avaliação, e pela atuação acadêmica, técnica e tecnológica considerada inovadora. Exige instrumentos de coleta de percepção, estrutura de análise e capacidade de propor melhorias.',
    indicadores: [
      'Índice de Reconhecimento de Excelência (pesquisa periódica com partes interessadas)',
      'Índice de Reconhecimento de Inovação (pesquisa periódica com partes interessadas)'
    ]
  },
  {
    id: 5,
    curto: 'Organização leve, ágil e simples',
    texto: 'Conquistar reconhecimento como organização leve e ágil, com processos internos simples e capacidade de resposta aos fatores ambientais.',
    descricao: 'Ser reconhecido pelas partes interessadas como organização leve e ágil — com processos internos simples e não burocráticos, capacidade de resposta aos fatores ambientais, respeito ao ser humano em todos os momentos de contato e postura de instituição que ouve e dialoga. Não basta ser: é preciso ser percebido como tal.',
    indicadores: [
      'Índice de Reconhecimento LAS — Leve, Ágil e Simples (pesquisa periódica com partes interessadas)',
      'Índice de Reconhecimento Respeito (pesquisa perene com clientes em todos os momentos de contato)'
    ]
  },
  {
    id: 6,
    curto: 'Equanimidade, isonomia e inclusão',
    texto: 'Conquistar reconhecimento das partes interessadas por atividades equânimes, isonômicas e inclusivas.',
    descricao: 'Ser reconhecido pelas partes interessadas por atividades equânimes, isonômicas e inclusivas. Mais do que implementar medidas, exige ações que efetivamente gerem essa percepção nas partes interessadas, mensurada em cada momento de contato com a instituição.',
    indicadores: [
      'Avaliação em Momentos de Contato — associação espontânea pelas partes interessadas dos valores equânime, isonômico e inclusivo (ou conceitos associados), por meio de pesquisas perenes em cada ponto de contato'
    ]
  },
  {
    id: 7,
    curto: 'Ambiente de qualidade e valorização',
    texto: 'Ser reconhecido como um ambiente que propicie condições para qualidade de trabalho, crescimento e valorização profissional.',
    descricao: 'Ser formalmente reconhecido entre os melhores lugares para se trabalhar — ambiente que propicia condições para qualidade de trabalho, crescimento e valorização profissional. Demanda adoção de metodologia certificadora externa, com credibilidade e reconhecimento pelas partes interessadas, e aferição periódica da aderência aos critérios.',
    indicadores: [
      'Nível de Aderência — aferição periódica de aderência aos critérios da metodologia certificadora adotada',
      'Certificação externa entre os melhores lugares para se trabalhar'
    ]
  },
  {
    id: 8,
    curto: 'Excelência da gestão',
    texto: 'Aprimorar o Modelo de Excelência da Gestão no Cebraspe pelo fortalecimento das diretrizes estratégicas e da gestão por processos.',
    descricao: 'Aprimorar o Modelo de Excelência da Gestão (MEG) no Cebraspe por meio do fortalecimento das diretrizes estratégicas e da gestão por processos. Demanda definição detalhada dos requisitos para certificação externa de gestão e autoavaliação contínua do nível de atendimento desses requisitos.',
    indicadores: [
      'Nível de preparação para certificação — autoavaliação do atendimento aos requisitos para certificação externa em excelência da gestão'
    ]
  }
];

const QUADRANTES = {
  Q1: { id: 'Q1', nome: 'Crise', postura: 'atender com prioridade absoluta', cor: '#c0392b', bg: '#fdecea' },
  Q2: { id: 'Q2', nome: 'Estratégia', postura: 'proteger e investir', cor: '#0a3d7a', bg: '#e8f0fb' },
  Q3: { id: 'Q3', nome: 'Interrupção', postura: 'delegar ou recusar', cor: '#e67e22', bg: '#fdf0e2' },
  Q4: { id: 'Q4', nome: 'Trivial', postura: 'eliminar ou postergar', cor: '#7f8c8d', bg: '#eef0f1' },
  NC: { id: 'NC', nome: 'Não classificada', postura: 'classificar depois', cor: '#bdc3c7', bg: '#f3f4f5' }
};

const STATUS_ROTULOS = {
  'a-fazer': 'A fazer',
  'em-andamento': 'Em andamento',
  'concluida': 'Concluída',
  'bloqueada': 'Bloqueada'
};

const PRIORIDADE_ROTULOS = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };

const KEY_TAREFAS_V1 = 'cebraspe_tarefas_v1';
const KEY_TAREFAS_V3 = 'cebraspe_tarefas_v3';
const KEY_REVISOES_V1 = 'cebraspe_revisoes_v1';
const KEY_CONFIG_V1 = 'cebraspe_config_v1';
const KEY_REUNIOES_V1 = 'cebraspe_reunioes_v1';

/* ===================================================================
   2. STORAGE WRAPPER
   =================================================================== */

const _memStores = {};

function _store() {
  try {
    const s = window['local' + 'Storage'];
    s.setItem('__t', '1'); s.removeItem('__t');
    return s;
  } catch { return null; }
}

function _read(key, fallback) {
  try {
    let raw;
    if (window.Sec && window.Sec.isEnabled() && window.Sec.isUnlocked()) {
      raw = window.Sec.cacheGet(key);
    } else {
      const s = _store();
      raw = s ? s.getItem(key) : _memStores[key];
    }
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function _write(key, value) {
  const raw = JSON.stringify(value);
  if (window.Sec && window.Sec.isEnabled() && window.Sec.isUnlocked()) {
    window.Sec.cacheSet(key, raw);
    return;
  }
  const s = _store();
  if (s) { try { s.setItem(key, raw); return; } catch {} }
  _memStores[key] = raw;
}

function _peek(key) {
  // retorna string crua ou null (sem parse) — usado para checar existência v1
  if (window.Sec && window.Sec.isEnabled() && window.Sec.isUnlocked()) {
    return window.Sec.cacheGet(key);
  }
  const s = _store();
  try { return s ? s.getItem(key) : (_memStores[key] || null); } catch { return _memStores[key] || null; }
}

function uid() { return 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

/* ===================================================================
   3. ESTADO
   =================================================================== */

let tarefas = [];
let revisoes = [];
let reunioes = [];
// Mapa OE → bucket sugerido (usuária pode editar na aba Configurações)
const BUCKETS_PADRAO = {
  1: 'Faturamento sustentável',
  2: 'Diversificar clientes',
  3: 'Educação e pesquisa em avaliação',
  4: 'Reconhecimento por excelência',
  5: 'Organização leve, ágil e simples',
  6: 'Equanimidade, isonomia e inclusão',
  7: 'Ambiente de qualidade e valorização',
  8: 'Excelência da gestão',
  semOE: 'Geral'
};
const CONFIG_PADRAO = {
  webhookUrl: '',
  plannerEmail: 'joao.cunha@cebraspe.org.br',
  plannerBuckets: { ...BUCKETS_PADRAO },
  // === Despacho institucional ===
  meuNome: 'João Marcelo Marques Cunha',
  meuCargo: 'Diretor-Executivo',
  despachoCounterAno: null,         // ano em vigor do contador (e.g. 2026)
  despachoCounter: 0,               // último número emitido neste ano
  despachoMap: {}                   // { taskId: { numero, ano } } — fixa o nº por tarefa
};
let config = JSON.parse(JSON.stringify(CONFIG_PADRAO));
let agendaSelecionada = null; // ISO 'YYYY-MM-DD' ou null
let calendarioMes = null;     // { ano, mes }
let revChart = null;
let sparkChart = null;
let agrupamentoModo = 'quadrante'; // quadrante | oe | responsavel
let abaAtiva = 'tarefas';
let reuniaoEmEdicaoId = null;
let selecaoTarefasIds = new Set(); // tarefas marcadas via checkbox para proxima reuniao
let reuniaoAtivaId = null; // reuniao selecionada no painel

/* ===================================================================
   4. UTILS / FUNÇÕES PURAS
   =================================================================== */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

function escapeHTML(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function hojeISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function isoToDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function fmtData(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function fmtDataExtenso(iso) {
  if (!iso) return '';
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${meses[m-1]} de ${y}`;
}

function quadranteDe(t) {
  if (t.importante === null || t.importante === undefined ||
      t.urgente === null || t.urgente === undefined) return 'NC';
  if (t.importante && t.urgente) return 'Q1';
  if (t.importante && !t.urgente) return 'Q2';
  if (!t.importante && t.urgente) return 'Q3';
  return 'Q4';
}

function isAtrasada(t) {
  return t.prazo && t.status !== 'concluida' && t.prazo < hojeISO();
}

function diasEntre(isoA, isoB) {
  const a = isoToDate(isoA), b = isoToDate(isoB);
  if (!a || !b) return null;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function ultimoDiaDoMes(ano, mes /* 0-11 */) {
  return new Date(ano, mes + 1, 0).getDate();
}

function inferirGenero(nome) {
  if (!nome) return null;
  const n = nome.trim().toLowerCase();
  if (!n) return null;
  // usa apenas o primeiro nome para evitar falsos positivos com sobrenomes (ex.: 'Silva')
  const primeiro = n.split(/\s+/)[0];
  if (!primeiro) return null;
  // exceções comuns de nomes masculinos terminados em 'a'
  const masculinosEmA = new Set(['joshua', 'noah', 'isaías', 'isaias', 'elias', 'tobias', 'matias', 'matheus', 'lucas', 'andré', 'andrea']);
  if (masculinosEmA.has(primeiro)) return 'm';
  // heurística simples: primeiro nome termina em 'a' → feminino
  return primeiro.endsWith('a') ? 'f' : 'm';
}

/* ===================================================================
   5. MIGRAÇÃO V1 → V3
   =================================================================== */

function carregarTarefas() {
  const v3 = _read(KEY_TAREFAS_V3, null);
  if (Array.isArray(v3) && v3.length > 0) {
    tarefas = v3.map(normalizarTarefa);
    return;
  }
  // migrar v1 se existir
  const v1raw = _peek(KEY_TAREFAS_V1);
  if (v1raw) {
    try {
      const v1 = JSON.parse(v1raw);
      if (Array.isArray(v1) && v1.length > 0) {
        tarefas = v1.map(t => migrarV1ParaV3(t));
        salvarTarefas();
        return;
      }
    } catch {}
  }
  // verifica se v3 existia (vazio); se sim, mantém vazio
  if (Array.isArray(v3)) { tarefas = []; return; }
  tarefas = [];
}

function migrarV1ParaV3(t) {
  // v1: { id, titulo, objetivoId, responsavel, prazo, prioridade ('Alta'/'Média'/'Baixa'), status ('A fazer'...), resultado, criadoEm, atualizadoEm }
  const prioMap = { 'Alta':'alta','Média':'media','Baixa':'baixa','alta':'alta','media':'media','baixa':'baixa' };
  const stMap = { 'A fazer':'a-fazer','Em andamento':'em-andamento','Concluída':'concluida','Bloqueada':'bloqueada',
                  'a-fazer':'a-fazer','em-andamento':'em-andamento','concluida':'concluida','bloqueada':'bloqueada' };
  return {
    id: t.id || uid(),
    titulo: t.titulo || '',
    oeId: t.objetivoId || t.oeId || null,
    importante: null,
    urgente: null,
    responsavel: t.responsavel || '',
    dataInicio: t.dataInicio || '',
    prazo: t.prazo || '',
    prioridade: prioMap[t.prioridade] || 'media',
    status: stMap[t.status] || 'a-fazer',
    resultado: t.resultado || '',
    criadaEm: t.criadoEm || t.criadaEm || new Date().toISOString(),
    atualizadaEm: t.atualizadoEm || t.atualizadaEm || new Date().toISOString()
  };
}

function normalizarTarefa(t) {
  // garante shape v3 — útil para imports e cargas
  return {
    id: t.id || uid(),
    titulo: t.titulo || '',
    oeId: t.oeId ?? t.objetivoId ?? null,
    importante: (t.importante === true || t.importante === false) ? t.importante : null,
    urgente: (t.urgente === true || t.urgente === false) ? t.urgente : null,
    responsavel: t.responsavel || '',
    dataInicio: t.dataInicio || '',
    prazo: t.prazo || '',
    prioridade: t.prioridade || 'media',
    status: t.status || 'a-fazer',
    resultado: t.resultado || '',
    criadaEm: t.criadaEm || t.criadoEm || new Date().toISOString(),
    atualizadaEm: t.atualizadaEm || t.atualizadoEm || new Date().toISOString()
  };
}

function salvarTarefas() { _write(KEY_TAREFAS_V3, tarefas); }
function carregarRevisoes() { revisoes = _read(KEY_REVISOES_V1, []); }
function salvarRevisoes() { _write(KEY_REVISOES_V1, revisoes); }
function carregarConfig() {
  const lido = _read(KEY_CONFIG_V1, null) || {};
  // Mescla com padrões para garantir que campos novos existam
  config = {
    ...JSON.parse(JSON.stringify(CONFIG_PADRAO)),
    ...lido,
    plannerBuckets: {
      ...BUCKETS_PADRAO,
      ...(lido.plannerBuckets || {})
    }
  };
}
function salvarConfig() { _write(KEY_CONFIG_V1, config); }
function carregarReunioes() { reunioes = _read(KEY_REUNIOES_V1, []); }
function salvarReunioes() { _write(KEY_REUNIOES_V1, reunioes); }

/* ===================================================================
   6. INIT / TABS
   =================================================================== */

function init() {
  // Autenticação delegada ao Firebase (firebase-sync.js).
  // O firebase-sync mostra a tela de login e, após autenticar,
  // hidrata o localStorage com dados do Firestore e chama initApp().
  // Se, por algum motivo, o firebase-sync não tiver carregado, fazemos um
  // fallback que apenas inicializa o app a partir do localStorage.
  if (window.__firebaseSyncActive) {
    // firebase-sync vai assumir o controle
    return;
  }
  if (typeof window.firebase === 'undefined') {
    console.warn('[init] Firebase não carregou — modo fallback (sem nuvem).');
    initApp();
    return;
  }
  // firebase-sync vai chamar initApp() no momento certo
}

function initApp() {
  carregarTarefas();
  carregarRevisoes();
  carregarReunioes();
  carregarConfig();
  popularSelectsOE();
  popularResponsaveis();
  bindTabs();
  bindForm();
  bindFiltros();
  bindAgrupamento();
  bindExports();
  bindExemplosPA2026();
  bindDespachos();
  bindEmail();
  bindAgenda();
  bindRevisao();
  bindConfig();
  bindModaisGlobais();
  bindReunioes();
  bindGuiaOEs();
  bindSecurityConfig();
  preencherDataInicioPadrao();
  renderTudo();
  atualizarStatusSeguranca();
}

function preencherDataInicioPadrao() {
  const el = $('#f-data-inicio');
  if (el && !el.value) el.value = new Date().toISOString().slice(0, 10);
}

function bindTabs() {
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => trocarAba(tab.dataset.tab));
  });
}

function trocarAba(nome) {
  abaAtiva = nome;
  $$('.tab').forEach(t => {
    const ativo = t.dataset.tab === nome;
    t.classList.toggle('is-active', ativo);
    t.setAttribute('aria-selected', ativo ? 'true' : 'false');
  });
  $$('.tab-panel').forEach(p => {
    const ativo = p.id === 'panel-' + nome;
    p.classList.toggle('is-active', ativo);
    p.hidden = !ativo;
  });
  if (nome === 'agenda') renderAgenda();
  if (nome === 'revisao') renderRevisao();
  if (nome === 'config') renderConfig();
  if (nome === 'reunioes') renderReunioes();
}

function popularSelectsOE() {
  const opts = '<option value="">— OE (opcional) —</option>' +
    OBJETIVOS.map(o => `<option value="${o.id}" title="${escapeHTML(o.texto)}">OE ${o.id} · ${escapeHTML(o.curto)}</option>`).join('');
  $('#f-objetivo').innerHTML = opts;
  $('#ef-objetivo').innerHTML = opts;
  $('#filtro-objetivo').innerHTML = '<option value="">Todos os OEs</option>' +
    OBJETIVOS.map(o => `<option value="${o.id}">OE ${o.id} · ${escapeHTML(o.curto)}</option>`).join('');
}

function renderOeDetalhe(selectId, detalheId) {
  const sel = document.getElementById(selectId);
  const det = document.getElementById(detalheId);
  if (!sel || !det) return;
  const id = sel.value ? Number(sel.value) : null;
  if (!id) {
    det.hidden = true;
    det.innerHTML = '';
    return;
  }
  const oe = OBJETIVOS.find(o => o.id === id);
  if (!oe) { det.hidden = true; return; }
  det.hidden = false;
  det.innerHTML = `
    <div class="oe-detalhe__titulo">OE ${oe.id} · ${escapeHTML(oe.curto)}</div>
    <div class="oe-detalhe__desc">${escapeHTML(oe.descricao || oe.texto)}</div>
    <div class="oe-detalhe__indicadores-titulo">Indicadores sugeridos</div>
    <ul class="oe-detalhe__indicadores">${(oe.indicadores || []).map(i => `<li>${escapeHTML(i)}</li>`).join('')}</ul>
  `;
}

function abrirGuiaOEs() {
  const cont = $('#oe-guia-conteudo');
  if (!cont) return;
  cont.innerHTML = OBJETIVOS.map(oe => `
    <div class="oe-guia__card">
      <div class="oe-guia__head">
        <span class="oe-guia__num">OE ${oe.id}</span>
        <span class="oe-guia__curto">${escapeHTML(oe.curto)}</span>
      </div>
      <div class="oe-guia__texto">${escapeHTML(oe.texto)}</div>
      <div class="oe-guia__desc">${escapeHTML(oe.descricao || '')}</div>
      <div class="oe-guia__indicadores-titulo">Indicadores sugeridos</div>
      <ul class="oe-guia__indicadores">${(oe.indicadores || []).map(i => `<li>${escapeHTML(i)}</li>`).join('')}</ul>
    </div>
  `).join('');
  const dlg = $('#dlg-oe-guia');
  if (dlg && !dlg.open) dlg.showModal();
}

function bindGuiaOEs() {
  const dlg = $('#dlg-oe-guia');
  $('#btn-oe-guia')?.addEventListener('click', abrirGuiaOEs);
  $('#btn-oe-guia-edit')?.addEventListener('click', abrirGuiaOEs);
  $('#btn-oe-guia-fechar')?.addEventListener('click', () => dlg?.close());
  $('#f-objetivo')?.addEventListener('change', () => renderOeDetalhe('f-objetivo', 'f-objetivo-detalhe'));
  $('#ef-objetivo')?.addEventListener('change', () => renderOeDetalhe('ef-objetivo', 'ef-objetivo-detalhe'));
}

function popularResponsaveis() {
  const dl = $('#responsaveis');
  if (!dl) return;
  const set = new Set(tarefas.map(t => t.responsavel).filter(Boolean));
  dl.innerHTML = [...set].map(r => `<option value="${escapeHTML(r)}"></option>`).join('');
}

/* ===================================================================
   7. FORMULÁRIO PRINCIPAL
   =================================================================== */

function bindForm() {
  const form = $('#form');
  const ckImp = $('#f-importante');
  const ckUrg = $('#f-urgente');
  const ckNc = $('#f-naoclass');

  function atualizarToggles() {
    const nc = ckNc.checked;
    ckImp.disabled = nc;
    ckUrg.disabled = nc;
    if (nc) { ckImp.checked = false; ckUrg.checked = false; }
    atualizarPreviewQuad();
  }

  function atualizarPreviewQuad() {
    const t = {
      importante: ckNc.checked ? null : ckImp.checked,
      urgente: ckNc.checked ? null : ckUrg.checked
    };
    const q = quadranteDe(t);
    const chip = $('#quad-preview');
    chip.className = 'quad-chip quad-chip--' + q.toLowerCase();
    const info = QUADRANTES[q];
    chip.textContent = q === 'NC'
      ? `Não classificada · ${info.postura}`
      : `${q} — ${info.nome} · ${info.postura}`;
  }

  ckImp.addEventListener('change', atualizarPreviewQuad);
  ckUrg.addEventListener('change', atualizarPreviewQuad);
  ckNc.addEventListener('change', atualizarToggles);
  atualizarToggles();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const titulo = $('#f-titulo').value.trim();
    if (!titulo) { mostrarMsg('Preencha o título da tarefa.', true); return; }

    const id = $('#f-id').value || uid();
    const existente = tarefas.find(t => t.id === id);
    const naoClass = ckNc.checked;

    const tarefa = {
      id,
      titulo,
      oeId: $('#f-objetivo').value ? Number($('#f-objetivo').value) : null,
      importante: naoClass ? null : ckImp.checked,
      urgente: naoClass ? null : ckUrg.checked,
      responsavel: $('#f-responsavel').value.trim(),
      dataInicio: $('#f-data-inicio').value,
      prazo: $('#f-prazo').value,
      prioridade: $('#f-prioridade').value,
      status: $('#f-status').value,
      resultado: $('#f-resultado').value.trim(),
      criadaEm: existente?.criadaEm || new Date().toISOString(),
      atualizadaEm: new Date().toISOString()
    };

    const idx = tarefas.findIndex(t => t.id === id);
    if (idx >= 0) tarefas[idx] = tarefa; else tarefas.unshift(tarefa);
    salvarTarefas();
    popularResponsaveis();
    form.reset();
    $('#f-id').value = '';
    $('#f-prioridade').value = 'media';
    $('#f-status').value = 'a-fazer';
    ckNc.checked = true;
    preencherDataInicioPadrao();
    atualizarToggles();
    renderOeDetalhe('f-objetivo', 'f-objetivo-detalhe');
    $('#btn-cancelar').hidden = true;
    $('#btn-salvar').textContent = 'Salvar tarefa';
    mostrarMsg(idx >= 0 ? 'Tarefa atualizada.' : 'Tarefa cadastrada.');
    renderTudo();
    $('#f-titulo').focus();
  });

  $('#btn-cancelar').addEventListener('click', () => {
    form.reset();
    $('#f-id').value = '';
    $('#f-prioridade').value = 'media';
    $('#f-status').value = 'a-fazer';
    ckNc.checked = true;
    preencherDataInicioPadrao();
    atualizarToggles();
    renderOeDetalhe('f-objetivo', 'f-objetivo-detalhe');
    $('#btn-cancelar').hidden = true;
    $('#btn-salvar').textContent = 'Salvar tarefa';
    mostrarMsg('');
  });

  form.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); form.requestSubmit();
    }
  });
}

function mostrarMsg(txt, erro = false) {
  const el = $('#msg');
  el.textContent = txt;
  el.classList.toggle('error', erro);
  if (txt && !erro) setTimeout(() => { el.textContent = ''; }, 2500);
}

/* ===================================================================
   8. EDIÇÃO EM MODAL
   =================================================================== */

function abrirEdicao(id) {
  const t = tarefas.find(x => x.id === id);
  if (!t) return;
  const dlg = $('#dlg-edit');
  $('#ef-titulo').value = t.titulo;
  $('#ef-objetivo').value = t.oeId || '';
  renderOeDetalhe('ef-objetivo', 'ef-objetivo-detalhe');
  $('#ef-responsavel').value = t.responsavel || '';
  $('#ef-data-inicio').value = t.dataInicio || '';
  $('#ef-prazo').value = t.prazo || '';
  $('#ef-prioridade').value = t.prioridade;
  $('#ef-status').value = t.status;
  $('#ef-resultado').value = t.resultado || '';
  const naoClass = t.importante === null || t.urgente === null;
  $('#ef-importante').checked = !!t.importante;
  $('#ef-urgente').checked = !!t.urgente;
  $('#ef-naoclass').checked = naoClass;

  const ckImp = $('#ef-importante'), ckUrg = $('#ef-urgente'), ckNc = $('#ef-naoclass');
  function upd() {
    const nc = ckNc.checked;
    ckImp.disabled = nc; ckUrg.disabled = nc;
    if (nc) { ckImp.checked = false; ckUrg.checked = false; }
    const q = quadranteDe({ importante: nc ? null : ckImp.checked, urgente: nc ? null : ckUrg.checked });
    const chip = $('#ef-quad-preview');
    chip.className = 'quad-chip quad-chip--' + q.toLowerCase();
    const info = QUADRANTES[q];
    chip.textContent = q === 'NC' ? `Não classificada · ${info.postura}` : `${q} — ${info.nome} · ${info.postura}`;
  }
  // limpa listeners prévios via clone
  ['ef-importante','ef-urgente','ef-naoclass'].forEach(idEl => {
    const el = $('#' + idEl);
    const novo = el.cloneNode(true);
    el.replaceWith(novo);
  });
  $('#ef-importante').addEventListener('change', upd);
  $('#ef-urgente').addEventListener('change', upd);
  $('#ef-naoclass').addEventListener('change', upd);
  upd();

  dlg.dataset.editId = id;
  dlg.showModal();
}

function bindModaisGlobais() {
  // editar
  $('#ef-cancel').addEventListener('click', () => $('#dlg-edit').close());
  $('#dlg-edit-form').addEventListener('submit', e => {
    e.preventDefault();
    const dlg = $('#dlg-edit');
    const id = dlg.dataset.editId;
    const t = tarefas.find(x => x.id === id);
    if (!t) { dlg.close(); return; }
    const nc = $('#ef-naoclass').checked;
    t.titulo = $('#ef-titulo').value.trim() || t.titulo;
    t.oeId = $('#ef-objetivo').value ? Number($('#ef-objetivo').value) : null;
    t.importante = nc ? null : $('#ef-importante').checked;
    t.urgente = nc ? null : $('#ef-urgente').checked;
    t.responsavel = $('#ef-responsavel').value.trim();
    t.dataInicio = $('#ef-data-inicio').value;
    t.prazo = $('#ef-prazo').value;
    t.prioridade = $('#ef-prioridade').value;
    t.status = $('#ef-status').value;
    t.resultado = $('#ef-resultado').value.trim();
    t.atualizadaEm = new Date().toISOString();
    salvarTarefas();
    popularResponsaveis();
    renderTudo();
    dlg.close();
  });
  $('#bilhete-close').addEventListener('click', () => $('#dlg-bilhete').close());
  $('#email-close').addEventListener('click', () => $('#dlg-email').close());
  $('#rev-detail-close').addEventListener('click', () => $('#dlg-rev').close());
}

async function excluirTarefa(id) {
  const t = tarefas.find(x => x.id === id); if (!t) return;
  const ok = await confirmar('Excluir tarefa?', `"${t.titulo}" será removida permanentemente.`);
  if (!ok) return;
  tarefas = tarefas.filter(x => x.id !== id);
  // remove a tarefa de todas as reunioes vinculadas
  reunioes.forEach(r => {
    r.tarefasIds = (r.tarefasIds || []).filter(x => x !== id);
    if (r.encaminhamentos) delete r.encaminhamentos[id];
  });
  salvarTarefas();
  salvarReunioes();
  renderTudo();
  if (reuniaoAtivaId) renderDetalheReuniao(reuniaoAtivaId);
}

function alterarStatus(id, novo) {
  const t = tarefas.find(x => x.id === id); if (!t) return;
  t.status = novo;
  t.atualizadaEm = new Date().toISOString();
  salvarTarefas();
  renderTudo();
}

function confirmar(titulo, msg) {
  return new Promise(resolve => {
    const dlg = $('#dlg');
    $('#dlg-title').textContent = titulo;
    $('#dlg-msg').textContent = msg;
    dlg.showModal();
    dlg.addEventListener('close', () => resolve(dlg.returnValue === 'ok'), { once: true });
  });
}

/* ===================================================================
   9. FILTROS / AGRUPAMENTO / RENDER LISTA
   =================================================================== */

function bindFiltros() {
  ['#busca','#filtro-objetivo','#filtro-status','#filtro-quadrante','#filtro-importante','#filtro-urgente','#ordenacao'].forEach(s => {
    $(s).addEventListener('input', renderTudo);
    $(s).addEventListener('change', renderTudo);
  });
}

function bindAgrupamento() {
  $$('.seg__btn[data-group]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.seg__btn[data-group]').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      agrupamentoModo = btn.dataset.group;
      renderTudo();
    });
  });
}

function aplicarFiltros() {
  const q = $('#busca').value.trim().toLowerCase();
  const fObj = $('#filtro-objetivo').value;
  const fStatus = $('#filtro-status').value;
  const fQuad = $('#filtro-quadrante').value;
  const fImp = $('#filtro-importante').value;
  const fUrg = $('#filtro-urgente').value;

  let lista = tarefas.filter(t => {
    if (fObj && String(t.oeId) !== fObj) return false;
    if (fStatus && t.status !== fStatus) return false;
    if (fQuad && quadranteDe(t) !== fQuad) return false;
    if (fImp === 'sim' && t.importante !== true) return false;
    if (fImp === 'nao' && t.importante !== false) return false;
    if (fUrg === 'sim' && t.urgente !== true) return false;
    if (fUrg === 'nao' && t.urgente !== false) return false;
    if (q) {
      const obj = OBJETIVOS.find(o => o.id === t.oeId);
      const blob = `${t.titulo} ${t.responsavel || ''} ${t.resultado || ''} ${obj?.curto || ''}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });

  const ord = $('#ordenacao').value;
  const pesoQ = { Q1: 1, Q2: 2, Q3: 3, Q4: 4, NC: 5 };
  const pesoPrio = { alta: 1, media: 2, baixa: 3 };

  if (ord === 'quad-prazo') {
    lista.sort((a, b) => {
      const dq = pesoQ[quadranteDe(a)] - pesoQ[quadranteDe(b)];
      if (dq !== 0) return dq;
      if (!a.prazo && !b.prazo) return 0;
      if (!a.prazo) return 1;
      if (!b.prazo) return -1;
      return a.prazo.localeCompare(b.prazo);
    });
  } else if (ord === 'prazo') {
    lista.sort((a, b) => {
      if (!a.prazo && !b.prazo) return 0;
      if (!a.prazo) return 1;
      if (!b.prazo) return -1;
      return a.prazo.localeCompare(b.prazo);
    });
  } else if (ord === 'prioridade') {
    lista.sort((a, b) => (pesoPrio[a.prioridade]||9) - (pesoPrio[b.prioridade]||9));
  } else {
    lista.sort((a, b) => (b.criadaEm || '').localeCompare(a.criadaEm || ''));
  }
  return lista;
}

function renderTudo() {
  renderKPIs();
  renderSparkline();
  const lista = aplicarFiltros();
  renderGrupos(lista);
  if (abaAtiva === 'agenda') renderAgenda();
  if (abaAtiva === 'revisao') renderRevisao();
}

function renderKPIs() {
  $('#k-total').textContent = tarefas.length;
  $('#k-andamento').textContent = tarefas.filter(t => t.status === 'em-andamento').length;
  $('#k-concluidas').textContent = tarefas.filter(t => t.status === 'concluida').length;
  $('#k-atrasadas').textContent = tarefas.filter(isAtrasada).length;
  const cont = { Q1:0, Q2:0, Q3:0, Q4:0, NC:0 };
  for (const t of tarefas) cont[quadranteDe(t)]++;
  $('#k-q1').textContent = cont.Q1;
  $('#k-q2').textContent = cont.Q2;
  $('#k-q3').textContent = cont.Q3;
  $('#k-q4').textContent = cont.Q4;
  $('#k-nc').textContent = cont.NC;
}

function renderGrupos(lista) {
  const cont = $('#grupos');
  const vazio = $('#vazio');
  if (!lista.length) {
    cont.innerHTML = '';
    vazio.hidden = false;
    vazio.querySelector('p').textContent = tarefas.length === 0
      ? 'Nenhuma tarefa por aqui. Cadastre a primeira acima.'
      : 'Nenhuma tarefa corresponde aos filtros aplicados.';
    return;
  }
  vazio.hidden = true;

  let grupos = [];
  if (agrupamentoModo === 'oe') {
    const m = new Map();
    for (const t of lista) {
      const k = t.oeId || 'sem';
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(t);
    }
    const ordenadas = [...m.entries()].sort((a, b) => {
      if (a[0] === 'sem') return 1;
      if (b[0] === 'sem') return -1;
      return a[0] - b[0];
    });
    grupos = ordenadas.map(([k, itens]) => {
      const obj = OBJETIVOS.find(o => o.id === k);
      return {
        id: k,
        classe: '',
        num: obj ? `OE ${obj.id}` : '—',
        titulo: obj?.curto || 'Sem OE',
        sub: obj ? `· ${obj.texto}` : '',
        itens
      };
    });
  } else if (agrupamentoModo === 'responsavel') {
    const m = new Map();
    for (const t of lista) {
      const k = t.responsavel?.trim() || 'Sem responsável';
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(t);
    }
    grupos = [...m.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([k, itens]) => ({
      id: k, classe: '', num: '', titulo: k, itens
    }));
  } else {
    // por quadrante
    const ordemQ = ['Q1','Q2','Q3','Q4','NC'];
    const m = new Map();
    for (const q of ordemQ) m.set(q, []);
    for (const t of lista) m.get(quadranteDe(t)).push(t);
    grupos = ordemQ.filter(q => m.get(q).length).map(q => {
      const info = QUADRANTES[q];
      return {
        id: q,
        classe: 'grupo--' + q.toLowerCase(),
        num: q,
        titulo: q === 'NC' ? 'Não classificadas' : info.nome,
        sub: q === 'NC' ? '· classificar depois' : `· ${info.postura}`,
        itens: m.get(q)
      };
    });
  }

  cont.innerHTML = grupos.map(g => {
    const doneCount = g.itens.filter(t => t.status === 'concluida').length;
    const pct = g.itens.length ? Math.round((doneCount / g.itens.length) * 100) : 0;
    const numHtml = g.num ? `<div class="grupo__num">${escapeHTML(String(g.num))}</div>` : '';
    return `
      <article class="grupo ${g.classe}" data-grupo="${escapeHTML(String(g.id))}">
        <header class="grupo__head" data-toggle>
          ${numHtml}
          <div class="grupo__title">${escapeHTML(g.titulo)}${g.sub ? `<em>${escapeHTML(g.sub)}</em>` : ''}</div>
          <div class="grupo__progress" title="${pct}% concluídas"><span style="width:${pct}%"></span></div>
          <div class="grupo__count">${g.itens.length} ${g.itens.length === 1 ? 'tarefa' : 'tarefas'}</div>
          <svg class="grupo__chev" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>
        </header>
        <div class="grupo__body">
          ${g.itens.map(renderTarefa).join('')}
        </div>
      </article>
    `;
  }).join('');

  $$('.grupo__head').forEach(h => {
    h.addEventListener('click', e => {
      // não colapsa se clicou em controles internos
      if (e.target.closest('button, select, input')) return;
      h.parentElement.classList.toggle('collapsed');
    });
  });

  $$('.tarefa').forEach(el => {
    const id = el.dataset.id;
    el.querySelector('.tarefa__titulo').addEventListener('click', () => abrirEdicao(id));
    el.querySelector('[data-edit]').addEventListener('click', () => abrirEdicao(id));
    el.querySelector('[data-del]').addEventListener('click', () => excluirTarefa(id));
    el.querySelector('[data-bilhete]').addEventListener('click', () => abrirBilheteModal(id));
    el.querySelector('[data-email]').addEventListener('click', () => abrirEmailModal(id));
    const btnPlanner = el.querySelector('[data-planner]');
    if (btnPlanner) btnPlanner.addEventListener('click', () => enviarParaPlanner(id));
    el.querySelector('.tarefa__status-sel').addEventListener('change', e => alterarStatus(id, e.target.value));
    const ck = el.querySelector('.tarefa-select');
    if (ck) ck.addEventListener('change', () => {
      if (ck.checked) selecaoTarefasIds.add(id);
      else selecaoTarefasIds.delete(id);
      atualizarSelecaoBar();
    });
  });
}

function atualizarSelecaoBar() {
  const bar = $('#selecao-bar');
  if (!bar) return;
  const n = selecaoTarefasIds.size;
  bar.hidden = n === 0;
  const cnt = $('#selecao-count');
  if (cnt) cnt.textContent = n;
}

function renderTarefa(t) {
  const atrasada = isAtrasada(t);
  const done = t.status === 'concluida';
  const q = quadranteDe(t);
  const obj = OBJETIVOS.find(o => o.id === t.oeId);
  const prClass = t.prioridade === 'alta' ? 'badge--alta' : t.prioridade === 'media' ? 'badge--media' : 'badge--baixa';
  const stClass = 'badge--' + (t.status === 'em-andamento' ? 'andamento' : t.status === 'concluida' ? 'concluida' : t.status === 'bloqueada' ? 'bloqueada' : '');
  return `
    <div class="tarefa ${done ? 'done' : ''}" data-id="${t.id}">
      <div class="tarefa__main">
        <div style="display:flex;align-items:baseline;gap:6px">
          <input type="checkbox" class="tarefa-select" data-select-id="${t.id}" title="Selecionar para reunião" ${selecaoTarefasIds.has(t.id) ? 'checked' : ''} />
          <div class="tarefa__titulo">${escapeHTML(t.titulo)}</div>
        </div>
        <div class="tarefa__meta">
          <span class="badge badge--${q.toLowerCase()}">${q === 'NC' ? 'Não class.' : q + ' · ' + QUADRANTES[q].nome}</span>
          ${obj ? `<span class="badge">OE ${obj.id}</span>` : ''}
          <span class="badge ${prClass}">${PRIORIDADE_ROTULOS[t.prioridade]}</span>
          ${atrasada ? '<span class="badge badge--atrasada">Atrasada</span>' : ''}
          ${t.prazo ? `<span>📅 <strong>${fmtData(t.prazo)}</strong></span>` : ''}
          ${t.responsavel ? `<span>👤 <strong>${escapeHTML(t.responsavel)}</strong></span>` : ''}
        </div>
        ${t.resultado ? `<div class="tarefa__resultado">→ ${escapeHTML(t.resultado)}</div>` : ''}
      </div>
      <div class="tarefa__actions">
        <select class="tarefa__status-sel" aria-label="Alterar status">
          ${Object.entries(STATUS_ROTULOS).map(([v, r]) => `<option value="${v}" ${t.status === v ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
        <button class="btn btn--ghost btn--sm" data-bilhete title="Gerar despacho desta tarefa">Despacho</button>
        <button class="btn btn--ghost btn--sm" data-email title="Gerar e-mail">E-mail</button>
        <button class="btn btn--ghost btn--sm" data-planner title="Abrir Microsoft Forms pré-preenchido para criar tarefa no Planner">Planner</button>
        <button class="icon-btn" data-edit title="Editar"><svg viewBox="0 0 16 16"><path d="M11 1l4 4-9 9H2v-4l9-9z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn danger" data-del title="Excluir"><svg viewBox="0 0 16 16"><path d="M3 4h10M5 4v9h6V4M6 4V2h4v2M6 7v4M10 7v4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></button>
      </div>
    </div>
  `;
}

/* ===================================================================
   10. SPARKLINE Q2 / 8 SEMANAS
   =================================================================== */

function renderSparkline() {
  const canvas = $('#spark-q2');
  const wrap = $('.spark-wrap');
  if (!canvas) return;
  const dados = serieQ2Semanas(8);
  const total = dados.reduce((a,b) => a+b, 0);
  if (total === 0) {
    if (sparkChart) { sparkChart.destroy(); sparkChart = null; }
    wrap.classList.remove('has-data');
    return;
  }
  wrap.classList.add('has-data');
  if (sparkChart) sparkChart.destroy();
  sparkChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: dados.map((_,i) => i),
      datasets: [{
        data: dados,
        borderColor: '#0a3d7a',
        backgroundColor: 'rgba(10,61,122,.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: false, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false, beginAtZero: true, max: 100 } },
      animation: false
    }
  });
}

function serieQ2Semanas(n) {
  // Usa snapshots existentes — se < n, preenche zeros à esquerda
  const recentes = revisoes.slice(-n);
  const pad = Math.max(0, n - recentes.length);
  const arr = Array(pad).fill(0);
  for (const r of recentes) {
    const d = r.distribuicao || {};
    const total = (d.Q1||0)+(d.Q2||0)+(d.Q3||0)+(d.Q4||0)+(d.NaoClass||0);
    arr.push(total ? Math.round(((d.Q2||0) / total) * 100) : 0);
  }
  return arr;
}

/* ===================================================================
   11. EXPORTS
   =================================================================== */

function bindExports() {
  $('#btn-csv').addEventListener('click', exportarCSV);
  $('#btn-json').addEventListener('click', exportarJSON);
  $('#btn-xlsx').addEventListener('click', exportarXLSX);
  $('#btn-pdf').addEventListener('click', exportarPDF);
  $('#file-import').addEventListener('change', importarJSON);
}

/* ===================================================================
   11.1 EXEMPLOS DO PLANO DE AÇÃO 2026
   =================================================================== */

const EXEMPLOS_PA2026 = [
  { id:'t_pa2026_01', titulo:'Implantar Núcleo de Prospecção formalizado', oeId:2, importante:true, urgente:true, responsavel:'CRI', prazo:'2026-06-30', prioridade:'alta', status:'a-fazer',
    resultado:'Núcleo de Prospecção estruturado e em operação, com rotina de visitas sistemáticas a órgãos públicos (federal, estadual e municipal) iniciada a partir de abril/2026. Indicadores: nº de novos clientes prospectados, nº de contratos originados por prospecção ativa, taxa de conversão proposta → contrato. Eixo: Expansão de Negócios e Atuação Comercial Ativa (OE1 do Plano 2026).' },
  { id:'t_pa2026_02', titulo:'Participar do Congresso dos Secretários de Planejamento (6 e 7 de maio)', oeId:2, importante:true, urgente:true, responsavel:'CRI', prazo:'2026-05-07', prioridade:'alta', status:'a-fazer',
    resultado:'Participação institucional confirmada no Congresso dos Secretários de Planejamento (6 e 7 de maio de 2026), com agenda de reuniões e prospecção alinhada ao plano de visitas sistemáticas. Cumpre a meta anual de presença em pelo menos 2 eventos estratégicos de gestores públicos. Eixo: Expansão de Negócios e Atuação Comercial Ativa.' },
  { id:'t_pa2026_03', titulo:'Instituir Comitê de Avaliação', oeId:3, importante:true, urgente:false, responsavel:'Comitê de Avaliação / CRI / DE', prazo:'2026-06-30', prioridade:'alta', status:'a-fazer',
    resultado:'Comitê de Avaliação formalmente instituído até jun/2026, com mapeamento e priorização dos mercados estratégicos em avaliação educacional concluídos. Inclui planejamento da estruturação do mestrado profissional em avaliação com a UnB (entrega plena em dez/2027). Indicadores: nº de projetos de avaliação contratados; diversificação da carteira; qualidade dos projetos entregues. Eixo: Fortalecimento da Atuação em Avaliações Educacionais e de Políticas Públicas (OE2 do Plano 2026).' },
  { id:'t_pa2026_04', titulo:'Realizar 1º workshop temático de avaliação educacional', oeId:4, importante:true, urgente:false, responsavel:'Comitê de Avaliação / CRI / DE', prazo:'2026-12-15', prioridade:'media', status:'a-fazer',
    resultado:'Workshop anual temático realizado até dez/2026, consolidando posicionamento institucional em avaliação educacional e fortalecendo o reconhecimento por excelência junto a partes interessadas. Eixo: Fortalecimento da Atuação em Avaliações Educacionais e de Políticas Públicas.' },
  { id:'t_pa2026_05', titulo:'Firmar 1º APPD&I e fortalecer Escritório de Gestão com eixo de Pesquisa', oeId:3, importante:true, urgente:false, responsavel:'Escritório de Gestão', prazo:'2026-12-15', prioridade:'alta', status:'a-fazer',
    resultado:'Primeiro Acordo/Plano de PD&I (APPD&I) firmado até dez/2026, com Escritório de Gestão fortalecido pelo eixo de Pesquisa e parcerias formalizadas com universidades e instituições de pesquisa. Início do desenvolvimento de estudos aplicados estratégicos. Indicadores: nº de projetos de pesquisa ativos; montante de recursos captados para PD&I. Eixo: Pesquisa, Inovação e Atuação como ICT (OE3 do Plano 2026).' },
  { id:'t_pa2026_06', titulo:'Revisar processos críticos da Cadeia de Valor de ponta a ponta', oeId:8, importante:true, urgente:false, responsavel:'Escritório de Gestão', prazo:'2026-12-15', prioridade:'alta', status:'a-fazer',
    resultado:'Revisão concluída até dez/2026 dos processos prioritários da Cadeia de Valor (gestão, finalisticos e suporte), com o papel do Escritório de Gestão reforçado e suporte estratégico da TI ampliado às áreas finalisticas. Plano de melhorias estruturado para implementação até 2027. Eixo: Integração Institucional e Governança Interna (OE4 do Plano 2026).' },
  { id:'t_pa2026_07', titulo:'Aprovar política institucional de capacitação revisada', oeId:7, importante:true, urgente:false, responsavel:'COGEP', prazo:'2026-11-30', prioridade:'media', status:'a-fazer',
    resultado:'Política institucional de capacitação revisada e aprovada até 2026, preparando terreno para implantação das trilhas de desenvolvimento por perfil técnico a partir de 2027. Indicadores: % de colaboradores capacitados/ano; retenção de talentos; avaliação de clima organizacional. Eixo: Pessoas, Capacitação e Sustentabilidade do Conhecimento (OE5 do Plano 2026).' },
  { id:'t_pa2026_08', titulo:'Definir modelo de atuação institucional e implantar agenda estratégica', oeId:4, importante:true, urgente:true, responsavel:'CRI / ECI / Direção', prazo:'2026-06-30', prioridade:'alta', status:'a-fazer',
    resultado:'Modelo de atuação institucional definido até jun/2026 e agenda sistemática implantada ainda em 2026, com órgãos públicos, UnB, parlamentares e redes de ensino, unificando frentes institucionais antes dispersas. Indicadores: nº de agendas institucionais realizadas; impacto institucional percebido. Eixo: Atuação Institucional e Diálogo Estratégico (OE6 do Plano 2026).' }
];

function exemplosPA2026Normalizados() {
  const agora = new Date().toISOString();
  return EXEMPLOS_PA2026.map(t => normalizarTarefa({ ...t, criadaEm: agora, atualizadaEm: agora }));
}

function msgExemplos(txt, erro) {
  const el = $('#exemplos-msg'); if (!el) return;
  el.textContent = txt; el.classList.toggle('erro', !!erro);
  setTimeout(() => { el.textContent=''; el.classList.remove('erro'); }, 4500);
}

function acrescentarExemplosPA2026() {
  const existentes = new Set(tarefas.map(t => t.id));
  let novas = 0;
  for (const t of exemplosPA2026Normalizados()) {
    if (existentes.has(t.id)) t.id = uid();
    tarefas.push(t); novas++;
  }
  salvarTarefas(); renderTudo(); popularResponsaveis();
  msgExemplos(`${novas} tarefa(s)-exemplo acrescentadas.`);
}

async function substituirComExemplosPA2026() {
  const ok = await confirmar('Substituir tudo?', `Isto apaga as ${tarefas.length} tarefa(s) atuais e carrega as 8 tarefas-exemplo do Plano 2026. Um backup será salvo automaticamente.`);
  if (!ok) return;
  _write(KEY_TAREFAS_V3 + '_backup', { tarefas, salvoEm: new Date().toISOString() });
  tarefas = exemplosPA2026Normalizados();
  salvarTarefas(); renderTudo(); popularResponsaveis();
  msgExemplos('Tarefas substituídas pelas 8 do Plano 2026 (backup salvo).');
}

function bindExemplosPA2026() {
  const a = $('#btn-exemplos-acrescentar'), s = $('#btn-exemplos-substituir');
  if (a) a.addEventListener('click', acrescentarExemplosPA2026);
  if (s) s.addEventListener('click', substituirComExemplosPA2026);
}

function tarefasParaLinhas() {
  return tarefas.map(t => {
    const obj = OBJETIVOS.find(o => o.id === t.oeId);
    const q = quadranteDe(t);
    return {
      'Tarefa': t.titulo,
      'Quadrante': q === 'NC' ? 'Não classificada' : `${q} — ${QUADRANTES[q].nome}`,
      'Importante': t.importante === null ? '—' : (t.importante ? 'Sim' : 'Não'),
      'Urgente': t.urgente === null ? '—' : (t.urgente ? 'Sim' : 'Não'),
      'Objetivo Estratégico': obj ? `OE ${obj.id} · ${obj.curto}` : '—',
      'Responsável': t.responsavel || '',
      'Prazo': t.prazo ? fmtData(t.prazo) : '',
      'Prioridade': PRIORIDADE_ROTULOS[t.prioridade] || '',
      'Status': STATUS_ROTULOS[t.status] || '',
      'Atrasada': isAtrasada(t) ? 'Sim' : 'Não',
      'Resultado esperado': t.resultado || '',
      'Criada em': (() => {
        const v = t.criadaEm || t.criadoEm;
        if (!v) return '';
        try {
          const iso = (typeof v === 'string' ? v : new Date(v).toISOString());
          return fmtData(iso.slice(0, 10));
        } catch { return ''; }
      })()
    };
  });
}

function baixar(blob, nome) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nome;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportarCSV() {
  if (!tarefas.length) return mostrarMsg('Nada para exportar.', true);
  const linhas = tarefasParaLinhas();
  const cabecalho = Object.keys(linhas[0]);
  const csv = '\uFEFF' + [
    cabecalho.join(';'),
    ...linhas.map(l => cabecalho.map(c => `"${String(l[c] ?? '').replace(/"/g, '""')}"`).join(';'))
  ].join('\n');
  baixar(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `tarefas_cebraspe_${hojeISO()}.csv`);
}

function exportarJSON() {
  if (!tarefas.length) return mostrarMsg('Nada para exportar.', true);
  baixar(new Blob([JSON.stringify(tarefas, null, 2)], { type: 'application/json' }), `tarefas_cebraspe_${hojeISO()}.json`);
}

function exportarXLSX() {
  if (!tarefas.length) return mostrarMsg('Nada para exportar.', true);
  const linhas = tarefasParaLinhas();
  const ws = XLSX.utils.json_to_sheet(linhas);
  ws['!cols'] = [
    { wch: 45 }, { wch: 22 }, { wch: 11 }, { wch: 9 }, { wch: 32 },
    { wch: 22 }, { wch: 12 }, { wch: 11 }, { wch: 14 }, { wch: 10 },
    { wch: 45 }, { wch: 12 }
  ];

  const cont = { Q1:0, Q2:0, Q3:0, Q4:0, NC:0 };
  for (const t of tarefas) cont[quadranteDe(t)]++;
  const resumoQ = ['Q1','Q2','Q3','Q4','NC'].map(q => ({
    'Quadrante': q === 'NC' ? 'Não classificada' : `${q} — ${QUADRANTES[q].nome}`,
    'Postura': QUADRANTES[q].postura,
    'Total': cont[q]
  }));
  const ws2 = XLSX.utils.json_to_sheet(resumoQ);
  ws2['!cols'] = [{wch:24},{wch:32},{wch:8}];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Tarefas');
  XLSX.utils.book_append_sheet(wb, ws2, 'Resumo Eisenhower');
  XLSX.writeFile(wb, `tarefas_cebraspe_${hojeISO()}.xlsx`);
}

function exportarPDF() {
  if (!tarefas.length) return mostrarMsg('Nada para exportar.', true);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const azul = [10, 61, 122], laranja = [240, 128, 0];
  doc.setFillColor(...azul); doc.rect(0, 0, 297, 22, 'F');
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold');
  doc.setFontSize(15); doc.text('Tarefas Estratégicas — Cebraspe', 14, 11);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
  doc.text('Plano Diretor 2023–2026 · Matriz de Eisenhower', 14, 17);
  doc.setFontSize(8);
  doc.text(`Emitido em ${fmtData(hojeISO())}`, 297 - 14, 11, { align: 'right' });
  doc.text(`Total: ${tarefas.length} · Concluídas: ${tarefas.filter(t=>t.status==='concluida').length} · Atrasadas: ${tarefas.filter(isAtrasada).length}`, 297 - 14, 17, { align: 'right' });
  doc.setFillColor(...laranja); doc.rect(0, 22, 297, 1.2, 'F');

  let y = 30;
  const ordemQ = ['Q1','Q2','Q3','Q4','NC'];
  for (const q of ordemQ) {
    const itens = tarefas.filter(t => quadranteDe(t) === q);
    if (!itens.length) continue;
    if (y > 180) { doc.addPage(); y = 18; }
    const info = QUADRANTES[q];
    const rgb = hexToRgb(info.bg);
    doc.setFillColor(...rgb); doc.rect(14, y - 5, 269, 8, 'F');
    doc.setTextColor(...hexToRgb(info.cor));
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5);
    doc.text(`${q === 'NC' ? 'Não classificadas' : q + ' — ' + info.nome} · ${info.postura}`, 16, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(80,80,80);
    doc.text(`${itens.length} tarefa(s)`, 281, y, { align: 'right' });
    y += 4;

    doc.autoTable({
      startY: y,
      head: [['Tarefa','Imp.','Urg.','OE','Responsável','Prazo','Prior.','Status']],
      body: itens.map(t => [
        t.titulo,
        t.importante === null ? '—' : (t.importante ? 'Sim' : 'Não'),
        t.urgente === null ? '—' : (t.urgente ? 'Sim' : 'Não'),
        t.oeId ? 'OE ' + t.oeId : '—',
        t.responsavel || '—',
        t.prazo ? fmtData(t.prazo) + (isAtrasada(t) ? ' (atr.)' : '') : '—',
        PRIORIDADE_ROTULOS[t.prioridade] || '—',
        STATUS_ROTULOS[t.status] || '—'
      ]),
      styles: { fontSize: 8.5, cellPadding: 2.5, valign: 'top', overflow: 'linebreak' },
      headStyles: { fillColor: hexToRgb(info.cor), textColor: 255, fontSize: 8.5, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [247, 249, 252] },
      columnStyles: {
        0: { cellWidth: 100 }, 1: { cellWidth: 14 }, 2: { cellWidth: 14 },
        3: { cellWidth: 18 }, 4: { cellWidth: 38 }, 5: { cellWidth: 28 },
        6: { cellWidth: 20 }, 7: { cellWidth: 30 }
      },
      margin: { left: 14, right: 14 }
    });
    y = doc.lastAutoTable.finalY + 8;
  }

  const total = doc.internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5); doc.setTextColor(120,120,120);
    doc.text(`Página ${i} de ${total}`, 297 - 14, 205, { align: 'right' });
    doc.text('Cebraspe · Tarefas Estratégicas · Plano Diretor 2023–2026', 14, 205);
  }
  doc.save(`tarefas_cebraspe_${hojeISO()}.pdf`);
}

function hexToRgb(hex) {
  const h = hex.replace('#','');
  const n = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function escolherImport(qtd) {
  return new Promise(resolve => {
    const dlg = $('#dlg-import');
    $('#dlg-import-msg').textContent = `Arquivo com ${qtd} tarefa(s). O que você quer fazer?`;
    dlg.showModal();
    dlg.addEventListener('close', () => resolve(dlg.returnValue), { once: true });
  });
}

async function importarJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const txt = await file.text();
  try {
    const dados = JSON.parse(txt);
    if (!Array.isArray(dados)) throw new Error();
    const escolha = await escolherImport(dados.length);
    if (escolha === 'substituir') {
      // backup do estado atual antes de substituir
      _write(KEY_TAREFAS_V3 + '_backup', { tarefas, salvoEm: new Date().toISOString() });
      tarefas = [];
      for (const t of dados) {
        const norm = normalizarTarefa(t);
        if (!norm.id) norm.id = uid();
        tarefas.push(norm);
      }
      salvarTarefas();
      renderTudo();
      popularResponsaveis();
      mostrarMsg(`Substituídas. ${dados.length} tarefa(s) carregadas (backup salvo).`);
    } else if (escolha === 'acrescentar') {
      const existentes = new Set(tarefas.map(t => t.id));
      let novas = 0;
      for (const t of dados) {
        const norm = normalizarTarefa(t);
        if (!norm.id || existentes.has(norm.id)) norm.id = uid();
        tarefas.push(norm);
        novas++;
      }
      salvarTarefas();
      renderTudo();
      popularResponsaveis();
      mostrarMsg(`${novas} tarefa(s) acrescentadas.`);
    }
    // 'cancel' ou qualquer outro: nada a fazer
  } catch {
    mostrarMsg('Arquivo inválido.', true);
  }
  e.target.value = '';
}

/* ===================================================================
   12. BILHETE / DESPACHO — REGISTRO CORPORATIVO CORDIAL
   =================================================================== */

/* ---------- Despacho v2: estado e helpers ---------- */

let _despachoOpts = { tom: 'institucional', destino: 'envio' };

function tratamentoPara(nome) {
  if (!nome || !nome.trim()) return 'Prezado(a)';
  const g = inferirGenero(nome);
  return g === 'f' ? 'Prezada' : 'Prezado';
}

function _hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function _pickStable(arr, seed) {
  if (!arr || !arr.length) return '';
  return arr[_hashStr(String(seed || '')) % arr.length];
}

function primeiroNome(nomeCompleto) {
  if (!nomeCompleto) return '';
  return String(nomeCompleto).trim().split(/\s+/)[0];
}

// (C) Atribui ou recupera número de despacho da tarefa, anual.
function numeroDespachoPara(t) {
  const ano = new Date().getFullYear();
  if (!config.despachoMap) config.despachoMap = {};
  const reg = config.despachoMap[t.id];
  if (reg && reg.ano === ano) return reg;
  // novo ano → zera contador
  if (config.despachoCounterAno !== ano) {
    config.despachoCounterAno = ano;
    config.despachoCounter = 0;
  }
  config.despachoCounter = (config.despachoCounter || 0) + 1;
  const novo = { numero: config.despachoCounter, ano };
  config.despachoMap[t.id] = novo;
  try { salvarConfig(); } catch (e) { /* sync later */ }
  return novo;
}
function fmtNumeroDespacho(reg) {
  if (!reg) return '';
  return `${String(reg.numero).padStart(4, '0')}/${reg.ano}`;
}

// (E) Próximos passos inferidos
function proximosPassos(t) {
  const passos = [];
  const prazoExt = t.prazo ? fmtDataExtenso(t.prazo) : null;
  const atrasada = isAtrasada(t);
  if (t.status === 'concluida') return [];
  if (t.status === 'bloqueada') {
    passos.push('Identificar e formalizar os impedimentos atuais.');
    passos.push('Definir responsável pelo desbloqueio e prazo para retomada.');
    if (prazoExt) passos.push(`Confirmar viabilidade do prazo previsto (${prazoExt}).`);
  } else if (atrasada) {
    passos.push('Apresentar diagnóstico do estágio atual.');
    passos.push('Propor nova projeção de prazo, se cabível.');
    passos.push('Indicar apoios necessários para conclusão.');
  } else if (t.status === 'em-andamento') {
    if (prazoExt) passos.push(`Confirmar conclusão até ${prazoExt}.`);
    passos.push('Sinalizar entraves ou riscos identificados.');
    if (t.resultado) passos.push('Validar entregas parciais frente ao resultado esperado.');
  } else {
    // a-fazer
    if (prazoExt) passos.push(`Iniciar a execução com vistas à conclusão em ${prazoExt}.`);
    else passos.push('Definir prazo de execução em comum acordo.');
    if (t.resultado) passos.push('Alinhar entregas previstas com o resultado esperado.');
  }
  return passos.slice(0, 3);
}

// Limpa pontuação final do conteúdo do usuário antes de aplicar a nossa.
function _trimPunct(s) {
  return String(s || '').trim().replace(/[.;:!?…]+$/u, '').trim();
}

// (H) Constrói estrutura completa do despacho a partir da tarefa + opts.
function despachoEstrutura(t, opts) {
  const o = Object.assign({ tom: 'institucional', destino: 'envio' }, opts || {});
  const atrasada = isAtrasada(t);
  const prazoExt = t.prazo ? fmtDataExtenso(t.prazo) : null;
  const dataExt = fmtDataExtenso(hojeISO());
  const oe = t.oeId ? OBJETIVOS.find(x => x.id === t.oeId) : null;
  const reg = numeroDespachoPara(t);
  const numero = fmtNumeroDespacho(reg);
  const tituloLimpo = _trimPunct(t.titulo);
  const resultadoLimpo = t.resultado ? _trimPunct(t.resultado) : null;
  const seed = `${t.id}-${reg.numero}`;

  // Categoria de tom
  let categoria;
  if (t.status === 'concluida') categoria = 'concluida';
  else if (atrasada) categoria = 'atrasada';
  else if (t.status === 'bloqueada') categoria = 'bloqueada';
  else if (t.prioridade === 'alta') categoria = 'alta';
  else if (t.status === 'em-andamento') categoria = 'andamento';
  else categoria = 'rotina';

  // Variantes (sorteio estável pelo seed) — sempre redondo, sem itálico
  const VAR = {
    concluida: {
      abertura: [
        'Comunico a conclusão da demanda em epígrafe.',
        'Registro a conclusão da demanda em referência.',
        'Informo o encerramento da demanda em epígrafe.'
      ],
      fecho: [
        'Agradeço a colaboração e permaneço à disposição para os próximos encaminhamentos.',
        'Agradeço o empenho e permaneço à disposição para tratativas subsequentes.',
        'Permaneço à disposição para os desdobramentos decorrentes.'
      ]
    },
    atrasada: {
      abertura: [
        'Solicito atenção prioritária à demanda em epígrafe, cujo prazo encontra-se vencido.',
        'Submeto a Vossa apreciação, com caráter prioritário, a demanda em referência, com prazo já expirado.',
        'Reitero a demanda em epígrafe, observando que o prazo previamente fixado foi ultrapassado.'
      ],
      fecho: [
        'Solicito posicionamento sobre o estágio atual e, se cabível, nova projeção de prazo.',
        'Solicito posicionamento e proposta de novo prazo, se for o caso.',
        'Aguardo manifestação quanto ao estágio atual e a possíveis ajustes de prazo.'
      ]
    },
    bloqueada: {
      abertura: [
        'Submeto a Vossa apreciação, para desbloqueio, a demanda em epígrafe.',
        'Encaminho a demanda em referência, atualmente em situação de bloqueio, para deliberação.',
        'Reporto entraves na execução da demanda em epígrafe, requerendo posicionamento.'
      ],
      fecho: [
        'Permaneço à disposição para apoiar na remoção dos impedimentos.',
        'Permaneço à disposição para articular as providências necessárias.',
        'Coloco-me à disposição para tratativas que viabilizem o prosseguimento.'
      ]
    },
    alta: {
      abertura: [
        'Encaminho, com tratamento prioritário, a demanda em epígrafe.',
        'Submeto a Vossa apreciação, em caráter prioritário, a demanda em referência.',
        'Encaminho a demanda em epígrafe, requerendo tratamento prioritário.'
      ],
      fecho: [
        'Permaneço à disposição para esclarecimentos e ajustes que se fizerem necessários.',
        'Permaneço à disposição para o que se fizer necessário.',
        'Aguardo manifestação e permaneço à disposição para ajustes.'
      ]
    },
    andamento: {
      abertura: [
        'Acompanho o andamento da demanda em epígrafe.',
        'Reporto o andamento da demanda em referência.',
        'Atualizo Vossa Senhoria sobre a demanda em epígrafe.'
      ],
      fecho: [
        'Solicito breve sinalização sobre o estágio atual e eventuais entraves.',
        'Solicito atualização quanto ao estágio e a obstáculos identificados.',
        'Permaneço aguardando sinalização sobre o estágio atual.'
      ]
    },
    rotina: {
      abertura: [
        'Encaminho a demanda em epígrafe.',
        'Submeto a Vossa apreciação a demanda em referência.',
        'Encaminho a demanda em epígrafe para conhecimento e providências.'
      ],
      fecho: [
        'Permaneço à disposição para esclarecimentos.',
        'Coloco-me à disposição para esclarecimentos.',
        'Aguardo manifestação e permaneço à disposição.'
      ]
    }
  };

  const abertura = _pickStable(VAR[categoria].abertura, seed + ':a');
  const fechoBase = _pickStable(VAR[categoria].fecho, seed + ':f');

  // Contexto (frase de prazo)
  let contexto = '';
  if (categoria === 'atrasada' && prazoExt) contexto = `O prazo previsto era ${prazoExt}.`;
  else if (categoria === 'bloqueada' && prazoExt) contexto = `O prazo previsto é ${prazoExt}.`;
  else if (categoria === 'alta') contexto = prazoExt ? `Solicito conclusão até ${prazoExt}.` : 'Solicito definição de prazo de execução tão logo possível.';
  else if (categoria === 'andamento' && prazoExt) contexto = `O prazo previsto é ${prazoExt}.`;
  else if (categoria === 'rotina' && prazoExt) contexto = `Sugere-se como prazo ${prazoExt}, passível de revisão de comum acordo.`;

  // Frase de resultado
  let resultadoFrase = '';
  if (resultadoLimpo) {
    resultadoFrase = (categoria === 'concluida')
      ? `Como entrega, registra-se: ${resultadoLimpo}.`
      : `Como entrega prevista, registra-se: ${resultadoLimpo}.`;
  }

  // Próximos passos (E)
  const passos = (categoria === 'concluida' || categoria === 'rotina') ? [] : proximosPassos(t);

  // Vocativo (A)
  const trat = tratamentoPara(t.responsavel);
  const primeiro = primeiroNome(t.responsavel);
  let vocativo;
  if (o.destino === 'registro') {
    vocativo = null; // não há vocativo em registro
  } else if (o.tom === 'institucional') {
    const g = inferirGenero(t.responsavel);
    vocativo = g === 'f' ? 'Prezada Senhora,' : 'Prezado Senhor,';
  } else {
    vocativo = primeiro ? `${trat} ${primeiro},` : `${trat},`;
  }

  // Construção do parágrafo principal
  let paragrafoPrincipal;
  if (o.destino === 'registro') {
    // Relato em 3ª pessoa
    const acoes = {
      concluida: 'concluiu a demanda em epígrafe',
      atrasada: 'reiterou a demanda em epígrafe, com prazo já expirado',
      bloqueada: 'reportou entraves na demanda em epígrafe e solicitou desbloqueio',
      alta: 'encaminhou, em caráter prioritário, a demanda em epígrafe',
      andamento: 'atualizou o andamento da demanda em epígrafe',
      rotina: 'encaminhou a demanda em epígrafe'
    };
    const dest = t.responsavel ? ` ao(à) colega ${t.responsavel}` : '';
    paragrafoPrincipal = `Em ${dataExt}, esta Diretoria-Executiva ${acoes[categoria]}${dest}.`;
  } else {
    paragrafoPrincipal = abertura;
  }

  // Fecho ajustado por destino
  const fecho = (o.destino === 'registro') ? 'Registro lavrado para fins de acompanhamento.' : fechoBase;

  // Referências (F)
  const refs = [];
  refs.push({ rotulo: 'Assunto', valor: tituloLimpo });
  if (oe) refs.push({ rotulo: 'Referência', valor: `OE ${oe.id} — ${oe.curto}` });
  if (prazoExt) refs.push({ rotulo: 'Prazo', valor: prazoExt });
  if (t.responsavel) refs.push({ rotulo: 'Para', valor: t.responsavel });
  refs.push({ rotulo: 'De', valor: `${config.meuNome || ''}${config.meuCargo ? ' — ' + config.meuCargo : ''}`.trim() || '—' });

  // Parágrafos do corpo
  const paragrafos = [];
  paragrafos.push(paragrafoPrincipal + (contexto ? ' ' + contexto : '') + (resultadoFrase ? ' ' + resultadoFrase : ''));

  return {
    numero,
    ano: reg.ano,
    dataExt,
    refs,
    vocativo,
    paragrafos,
    proximosPassos: passos,
    fecho,
    assinatura: { nome: config.meuNome || '', cargo: config.meuCargo || '' },
    categoria,
    destino: o.destino,
    tom: o.tom
  };
}

// (G) Esqueleto de resposta para o destinatário.
function respostaEsqueletoFlat(es, t) {
  const dataExt = es.dataExt;
  const numero = es.numero;
  const remetente = es.assinatura.nome || 'esta Diretoria';
  const linhas = [];
  linhas.push(`Resposta ao Despacho nº ${numero} — [data da resposta]`);
  linhas.push('');
  linhas.push(`Assunto: ${es.refs.find(r => r.rotulo === 'Assunto')?.valor || es.refs[0].valor}`);
  // Inverter Para/De
  const para = es.refs.find(r => r.rotulo === 'De');
  const de = es.refs.find(r => r.rotulo === 'Para');
  if (para) linhas.push(`Para: ${para.valor}`);
  if (de) linhas.push(`De: ${de.valor}`);
  const ref = es.refs.find(r => r.rotulo === 'Referência');
  if (ref) linhas.push(`Referência: ${ref.valor}`);
  linhas.push('');
  linhas.push('Prezado(a) Senhor(a),');
  linhas.push('');
  linhas.push(`Em atenção ao Despacho nº ${numero}, de ${dataExt}, manifesto-me nos termos a seguir.`);
  linhas.push('');
  // Esqueleto sensível à categoria
  if (es.categoria === 'bloqueada') {
    linhas.push('Sobre os impedimentos: [descrever entraves identificados].');
    linhas.push('Sobre as providências: [indicar providências adotadas ou requeridas].');
    linhas.push('Sobre o prazo: [confirmar viabilidade ou propor novo prazo].');
  } else if (es.categoria === 'atrasada') {
    linhas.push('Sobre o estágio atual: [descrever andamento e motivos do atraso].');
    linhas.push('Sobre o novo prazo: [propor data realista].');
    linhas.push('Sobre apoios necessários: [indicar suportes requeridos].');
  } else if (es.categoria === 'andamento') {
    linhas.push('Sobre o estágio atual: [resumir avanços].');
    linhas.push('Sobre entraves: [indicar obstáculos, se houver].');
    linhas.push('Sobre a previsão de conclusão: [confirmar ou ajustar].');
  } else if (es.categoria === 'alta') {
    linhas.push('Sobre a prioridade: [confirmar tratamento prioritário].');
    linhas.push('Sobre o cronograma: [confirmar ou propor prazo].');
    linhas.push('Sobre apoios necessários: [indicar suportes requeridos].');
  } else if (es.categoria === 'concluida') {
    linhas.push('Sobre a entrega: [registrar acolhimento ou observações].');
    linhas.push('Sobre desdobramentos: [indicar próximas etapas, se cabível].');
  } else {
    linhas.push('Sobre o acolhimento da demanda: [manifestar concordância ou ressalvas].');
    linhas.push('Sobre o prazo: [confirmar ou propor ajuste].');
    linhas.push('Sobre apoios necessários: [indicar, se for o caso].');
  }
  linhas.push('');
  linhas.push(`Permaneço à disposição de ${remetente} para os esclarecimentos que se fizerem necessários.`);
  linhas.push('');
  linhas.push('Atenciosamente,');
  linhas.push('');
  linhas.push('[Nome do responsável]');
  linhas.push('[Cargo]');
  return linhas.join('\n');
}

// Saida texto puro (cole em e-mail, WhatsApp etc.)
function despachoTextoFlat(es) {
  const linhas = [];
  linhas.push(`Despacho nº ${es.numero} — ${es.dataExt}`);
  linhas.push('');
  for (const r of es.refs) linhas.push(`${r.rotulo}: ${r.valor}`);
  linhas.push('');
  if (es.vocativo) { linhas.push(es.vocativo); linhas.push(''); }
  for (const p of es.paragrafos) { linhas.push(p); linhas.push(''); }
  if (es.proximosPassos && es.proximosPassos.length) {
    linhas.push('Próximos passos:');
    es.proximosPassos.forEach((p, i) => linhas.push(`  ${i + 1}. ${p}`));
    linhas.push('');
  }
  linhas.push(es.fecho);
  linhas.push('');
  if (es.destino === 'envio') {
    linhas.push('Atenciosamente,');
    linhas.push('');
    if (es.assinatura.nome) linhas.push(es.assinatura.nome);
    if (es.assinatura.cargo) linhas.push(es.assinatura.cargo);
  }
  return linhas.join('\n').trimEnd() + '\n';
}

// Compatibilidade: alguns lugares ainda chamam despachoSemMarcacao(texto).
function despachoSemMarcacao(texto) {
  return String(texto || '').replace(/\*([^*]+)\*/g, '$1');
}

// HTML do modo digital (caixa de texto colorida por quadrante)
function despachoDigitalHTML(es, q) {
  const linhas = [];
  linhas.push(`<div class="bilhete-digital__cab"><strong>Despacho nº ${escapeHTML(es.numero)}</strong> — ${escapeHTML(es.dataExt)}</div>`);
  linhas.push('<dl class="bilhete-digital__refs">');
  for (const r of es.refs) linhas.push(`<dt>${escapeHTML(r.rotulo)}</dt><dd>${escapeHTML(r.valor)}</dd>`);
  linhas.push('</dl>');
  if (es.vocativo) linhas.push(`<p class="bilhete-digital__voc">${escapeHTML(es.vocativo)}</p>`);
  for (const p of es.paragrafos) linhas.push(`<p>${escapeHTML(p)}</p>`);
  if (es.proximosPassos && es.proximosPassos.length) {
    linhas.push('<p class="bilhete-digital__pp-tit"><strong>Próximos passos</strong></p>');
    linhas.push('<ol class="bilhete-digital__pp">');
    for (const p of es.proximosPassos) linhas.push(`<li>${escapeHTML(p)}</li>`);
    linhas.push('</ol>');
  }
  linhas.push(`<p>${escapeHTML(es.fecho)}</p>`);
  if (es.destino === 'envio') {
    linhas.push('<p>Atenciosamente,</p>');
    if (es.assinatura.nome) linhas.push(`<p class="bilhete-digital__sig"><strong>${escapeHTML(es.assinatura.nome)}</strong>${es.assinatura.cargo ? '<br>' + escapeHTML(es.assinatura.cargo) : ''}</p>`);
  }
  return `<div class="bilhete-digital is-${q.toLowerCase()}">${linhas.join('')}</div>`;
}

// HTML do modo papel (padrão ofício austero)
function despachoPapelHTML(es) {
  const refsHtml = es.refs.map(r => `<div class="bilhete-papel__ref"><span class="bilhete-papel__ref-rot">${escapeHTML(r.rotulo)}:</span> <span class="bilhete-papel__ref-val">${escapeHTML(r.valor)}</span></div>`).join('');
  const paragrafosHtml = es.paragrafos.map(p => `<p class="bilhete-papel__paragrafo">${escapeHTML(p)}</p>`).join('');
  const passosHtml = (es.proximosPassos && es.proximosPassos.length)
    ? `<p class="bilhete-papel__pp-tit"><strong>Próximos passos</strong></p><ol class="bilhete-papel__pp">${es.proximosPassos.map(p => `<li>${escapeHTML(p)}</li>`).join('')}</ol>`
    : '';
  const vocHtml = es.vocativo ? `<p class="bilhete-papel__vocativo">${escapeHTML(es.vocativo)}</p>` : '';
  const fechoHtml = `<p class="bilhete-papel__paragrafo">${escapeHTML(es.fecho)}</p>`;
  let assinaturaHtml = '';
  if (es.destino === 'envio') {
    assinaturaHtml = `<p class="bilhete-papel__fecho">Atenciosamente,</p>` +
      `<div class="bilhete-papel__assinatura">` +
      (es.assinatura.nome ? `<div class="bilhete-papel__assinante">${escapeHTML(es.assinatura.nome)}</div>` : '') +
      (es.assinatura.cargo ? `<div class="bilhete-papel__cargo">${escapeHTML(es.assinatura.cargo)}</div>` : '') +
      `</div>`;
  }
  return `
    <div class="bilhete-papel-wrap">
      <div class="bilhete-papel">
        <div class="bilhete-papel__cabecalho">
          <span class="bilhete-papel__rotulo">DESPACHO Nº ${escapeHTML(es.numero)}</span>
          <span class="bilhete-papel__data">${escapeHTML(es.dataExt)}</span>
        </div>
        <div class="bilhete-papel__refs">${refsHtml}</div>
        <div class="bilhete-papel__corpo">
          ${vocHtml}
          ${paragrafosHtml}
          ${passosHtml}
          ${fechoHtml}
          ${assinaturaHtml}
        </div>
      </div>
    </div>`;
}

/* ============ Modal de bilhete único ============ */

let _bilheteAtualId = null;
let _bilheteModo = 'digital';

function abrirBilheteModal(id) {
  const t = tarefas.find(x => x.id === id);
  if (!t) return;
  _bilheteAtualId = id;
  _bilheteModo = 'digital';
  // Reseta toggles para defaults conservadores
  _despachoOpts = { tom: 'institucional', destino: 'envio' };
  $('#bilhete-title').textContent = `Despacho: ${t.titulo}`;
  $$('#dlg-bilhete .seg__btn[data-bmode]').forEach(b => b.classList.toggle('is-active', b.dataset.bmode === 'digital'));
  $$('#dlg-bilhete .seg__btn[data-btom]').forEach(b => b.classList.toggle('is-active', b.dataset.btom === _despachoOpts.tom));
  $$('#dlg-bilhete .seg__btn[data-bdest]').forEach(b => b.classList.toggle('is-active', b.dataset.bdest === _despachoOpts.destino));
  renderBilheteModal(t);
  $('#dlg-bilhete').showModal();
}

function renderBilheteModal(t) {
  const q = quadranteDe(t);
  const es = despachoEstrutura(t, _despachoOpts);
  const textoFlat = despachoTextoFlat(es);
  $('#bilhete-digital').innerHTML = despachoDigitalHTML(es, q);
  $('#bilhete-digital').dataset.texto = textoFlat;
  $('#bilhete-digital').hidden = _bilheteModo !== 'digital';
  $('#bilhete-papel').innerHTML = despachoPapelHTML(es);
  $('#bilhete-papel').hidden = _bilheteModo !== 'papel';
  const parEl = $('#bilhete-par');
  if (parEl) {
    const respostaTxt = respostaEsqueletoFlat(es, t);
    parEl.dataset.envio = textoFlat;
    parEl.dataset.resposta = respostaTxt;
    parEl.innerHTML = `
      <div class="bilhete-par__col">
        <div class="bilhete-par__rotulo">A — Despacho de envio</div>
        <pre class="bilhete-par__pre">${escapeHTML(textoFlat)}</pre>
        <button class="btn btn--ghost btn--sm" data-par-copy="envio" type="button">Copiar A</button>
      </div>
      <div class="bilhete-par__col">
        <div class="bilhete-par__rotulo">B — Esqueleto de resposta (para o destinatário)</div>
        <pre class="bilhete-par__pre">${escapeHTML(respostaTxt)}</pre>
        <button class="btn btn--ghost btn--sm" data-par-copy="resposta" type="button">Copiar B</button>
      </div>`;
    parEl.hidden = _bilheteModo !== 'par';
    parEl.querySelectorAll('[data-par-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const which = btn.dataset.parCopy;
        const txt = which === 'envio' ? parEl.dataset.envio : parEl.dataset.resposta;
        await navigator.clipboard.writeText(txt || '');
        mostrarFlash(which === 'envio' ? 'Copiado: A (envio).' : 'Copiado: B (resposta).');
      });
    });
  }
}

function bindDespachos() {
  // bilhete modal: alternar Modo digital / Modo papel
  $$('#dlg-bilhete .seg__btn[data-bmode]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#dlg-bilhete .seg__btn[data-bmode]').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      _bilheteModo = btn.dataset.bmode;
      const t = tarefas.find(x => x.id === _bilheteAtualId);
      if (t) renderBilheteModal(t);
    });
  });

  // Toggle Tom: pessoal / institucional
  $$('#dlg-bilhete .seg__btn[data-btom]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#dlg-bilhete .seg__btn[data-btom]').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      _despachoOpts.tom = btn.dataset.btom;
      const t = tarefas.find(x => x.id === _bilheteAtualId);
      if (t) renderBilheteModal(t);
    });
  });

  // Toggle Destino: envio / registro
  $$('#dlg-bilhete .seg__btn[data-bdest]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#dlg-bilhete .seg__btn[data-bdest]').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      _despachoOpts.destino = btn.dataset.bdest;
      const t = tarefas.find(x => x.id === _bilheteAtualId);
      if (t) renderBilheteModal(t);
    });
  });

  $('#btn-bilhete-copy').addEventListener('click', async () => {
    const texto = $('#bilhete-digital').dataset.texto || '';
    await navigator.clipboard.writeText(texto);
    mostrarFlash('Copiado.');
  });
  $('#btn-bilhete-copy-plain').addEventListener('click', async () => {
    const texto = despachoSemMarcacao($('#bilhete-digital').dataset.texto || '');
    await navigator.clipboard.writeText(texto);
    mostrarFlash('Copiado (sem marcação).');
  });
  $('#btn-bilhete-print').addEventListener('click', () => {
    // alterna para papel e imprime
    _bilheteModo = 'papel';
    $$('#dlg-bilhete .seg__btn[data-bmode]').forEach(b => b.classList.toggle('is-active', b.dataset.bmode === 'papel'));
    const t = tarefas.find(x => x.id === _bilheteAtualId);
    if (t) renderBilheteModal(t);
    setTimeout(() => window.print(), 50);
  });
  $('#btn-bilhete-pdf').addEventListener('click', exportarBilheteIndividualPDF);
  const btnDocx = $('#btn-bilhete-docx');
  if (btnDocx) btnDocx.addEventListener('click', exportarBilheteDocx);

  // Despachar em lote
  const btnLote = $('#btn-despachar-lote');
  if (btnLote) btnLote.addEventListener('click', abrirDespachoLote);
  const btnLoteClose = $('#lote-close');
  if (btnLoteClose) btnLoteClose.addEventListener('click', () => $('#dlg-despacho-lote').close());
  const btnLoteCopy = $('#btn-lote-copy');
  if (btnLoteCopy) btnLoteCopy.addEventListener('click', async () => {
    const txt = $('#lote-papel').dataset.texto || '';
    await navigator.clipboard.writeText(txt);
    mostrarFlash('Pauta copiada.');
  });
  const btnLotePrint = $('#btn-lote-print');
  if (btnLotePrint) btnLotePrint.addEventListener('click', () => setTimeout(() => window.print(), 50));
  const btnLotePdf = $('#btn-lote-pdf');
  if (btnLotePdf) btnLotePdf.addEventListener('click', exportarLotePDF);
  const btnLoteDocx = $('#btn-lote-docx');
  if (btnLoteDocx) btnLoteDocx.addEventListener('click', exportarLoteDocx);
}

/* ---------- Lazy load da lib `docx` para geração de Word ---------- */
let _docxLibPromise = null;
function carregarLibDocx() {
  if (window.docx) return Promise.resolve(window.docx);
  if (_docxLibPromise) return _docxLibPromise;
  _docxLibPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/docx@8.5.0/build/index.umd.js';
    s.onload = () => resolve(window.docx);
    s.onerror = () => reject(new Error('Não foi possível carregar a biblioteca docx.'));
    document.head.appendChild(s);
  });
  return _docxLibPromise;
}

/* ---------- Helpers para gerar Word ABNT ---------- */
function _docxParagrafosDe(es) {
  // Retorna array de docx.Paragraph
  return carregarLibDocx().then(docx => {
    const { Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle } = docx;
    const ps = [];
    // Cabeçalho
    ps.push(new Paragraph({
      children: [
        new TextRun({ text: `DESPACHO Nº ${es.numero}`, bold: true, size: 26 }),
        new TextRun({ text: '\t' + es.dataExt, size: 22 })
      ],
      tabStops: [{ type: 'right', position: 9000 }],
      spacing: { after: 100 },
      border: { bottom: { color: '888888', size: 6, style: BorderStyle.SINGLE } }
    }));
    // Referências
    for (const r of es.refs) {
      ps.push(new Paragraph({
        children: [
          new TextRun({ text: `${r.rotulo}: `, bold: true, size: 22 }),
          new TextRun({ text: String(r.valor), size: 22 })
        ],
        spacing: { after: 80 }
      }));
    }
    // Vocativo
    if (es.vocativo) {
      ps.push(new Paragraph({
        children: [new TextRun({ text: es.vocativo, size: 22 })],
        spacing: { before: 200, after: 200 }
      }));
    }
    // Parágrafos justificados com indentação
    for (const p of es.paragrafos) {
      ps.push(new Paragraph({
        children: [new TextRun({ text: p, size: 22 })],
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200, line: 360 }
      }));
    }
    // Próximos passos
    if (es.proximosPassos && es.proximosPassos.length) {
      ps.push(new Paragraph({
        children: [new TextRun({ text: 'Próximos passos:', bold: true, size: 22 })],
        spacing: { before: 200, after: 100 }
      }));
      es.proximosPassos.forEach((pp, i) => {
        ps.push(new Paragraph({
          children: [new TextRun({ text: `${i + 1}. ${pp}`, size: 22 })],
          indent: { left: 720 },
          spacing: { after: 80 }
        }));
      });
    }
    // Fecho
    ps.push(new Paragraph({
      children: [new TextRun({ text: es.fecho, size: 22 })],
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 720 },
      spacing: { before: 200, after: 200 }
    }));
    // Assinatura
    if (es.destino === 'envio') {
      ps.push(new Paragraph({
        children: [new TextRun({ text: 'Atenciosamente,', size: 22 })],
        spacing: { before: 200, after: 600 }
      }));
      ps.push(new Paragraph({
        children: [new TextRun({ text: '_________________________________', size: 22 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 }
      }));
      if (es.assinatura.nome) ps.push(new Paragraph({
        children: [new TextRun({ text: es.assinatura.nome, bold: true, size: 22 })],
        alignment: AlignmentType.CENTER
      }));
      if (es.assinatura.cargo) ps.push(new Paragraph({
        children: [new TextRun({ text: es.assinatura.cargo, size: 22 })],
        alignment: AlignmentType.CENTER
      }));
    }
    return ps;
  });
}

async function exportarBilheteDocx() {
  const t = tarefas.find(x => x.id === _bilheteAtualId);
  if (!t) return;
  try {
    mostrarFlash('Gerando Word…');
    const docx = await carregarLibDocx();
    const { Document, Packer } = docx;
    const es = despachoEstrutura(t, _despachoOpts);
    const paragrafos = await _docxParagrafosDe(es);
    const doc = new Document({
      styles: {
        default: {
          document: { run: { font: 'Times New Roman', size: 22 } }
        }
      },
      sections: [{
        properties: {
          page: {
            margin: { top: 1700, right: 1133, bottom: 1133, left: 1700 } // 3-2-2-3 cm em twips
          }
        },
        children: paragrafos
      }]
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `despacho_${es.numero.replace('/', '-')}_${t.id}.docx`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    mostrarFlash('Word baixado.');
  } catch (err) {
    console.error(err);
    mostrarMsg('Falha ao gerar Word.', true);
  }
}

/* ---------- Despacho em lote (J) ---------- */

function abrirDespachoLote() {
  const ids = Array.from(selecaoTarefasIds);
  if (!ids.length) { mostrarMsg('Selecione ao menos uma tarefa.', true); return; }
  const lista = ids.map(id => tarefas.find(t => t.id === id)).filter(Boolean);
  if (!lista.length) return;

  // Calcula um destinatário primário: responsável mais frequente da seleção
  const cont = {};
  for (const t of lista) {
    const r = (t.responsavel || '').trim();
    if (!r) continue;
    cont[r] = (cont[r] || 0) + 1;
  }
  const destinatariosOrdenados = Object.entries(cont).sort((a, b) => b[1] - a[1]).map(e => e[0]);
  const principal = destinatariosOrdenados[0] || null;
  const todosMesmo = destinatariosOrdenados.length === 1;

  const dataExt = fmtDataExtenso(hojeISO());
  const numeroPauta = `PAUTA-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(lista.length).padStart(2,'0')}`;

  // Renderizar HTML da pauta
  const refs = [];
  refs.push({ rotulo: 'Assunto', valor: `Pauta de despachos — ${lista.length} item(ns)` });
  if (principal && todosMesmo) refs.push({ rotulo: 'Para', valor: principal });
  else if (destinatariosOrdenados.length > 1) refs.push({ rotulo: 'Para', valor: destinatariosOrdenados.join(', ') });
  refs.push({ rotulo: 'De', valor: `${config.meuNome || ''}${config.meuCargo ? ' — ' + config.meuCargo : ''}`.trim() || '—' });

  const refsHtml = refs.map(r => `<div class="bilhete-papel__ref"><span class="bilhete-papel__ref-rot">${escapeHTML(r.rotulo)}:</span> <span class="bilhete-papel__ref-val">${escapeHTML(r.valor)}</span></div>`).join('');

  // Para cada tarefa, gera entrada resumida
  const itensHtml = lista.map((t, i) => {
    const es = despachoEstrutura(t, { tom: 'institucional', destino: 'envio' });
    const oe = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
    const meta = [];
    if (oe) meta.push(`OE ${oe.id}`);
    if (t.prazo) meta.push(`prazo ${fmtDataExtenso(t.prazo)}`);
    if (t.prioridade === 'alta') meta.push('prioritária');
    if (isAtrasada(t)) meta.push('em atraso');
    if (t.status === 'bloqueada') meta.push('bloqueada');
    if (t.responsavel && !todosMesmo) meta.push(`a ${t.responsavel}`);
    return `
      <div class="lote-item">
        <div class="lote-item__num">${i + 1}.</div>
        <div class="lote-item__corpo">
          <div class="lote-item__titulo"><strong>Despacho nº ${escapeHTML(es.numero)}</strong> — ${escapeHTML(_trimPunct(t.titulo))}</div>
          ${meta.length ? `<div class="lote-item__meta">${escapeHTML(meta.join(' · '))}</div>` : ''}
          <p class="lote-item__paragrafo">${escapeHTML(es.paragrafos[0])}</p>
        </div>
      </div>`;
  }).join('');

  // Texto puro (para copiar)
  const linhasTxt = [];
  linhasTxt.push(`PAUTA DE DESPACHOS — ${dataExt}`);
  linhasTxt.push('');
  for (const r of refs) linhasTxt.push(`${r.rotulo}: ${r.valor}`);
  linhasTxt.push('');
  if (principal && todosMesmo) {
    const g = inferirGenero(principal);
    linhasTxt.push(g === 'f' ? 'Prezada Senhora,' : 'Prezado Senhor,');
  } else {
    linhasTxt.push('Prezado(a) Senhor(a),');
  }
  linhasTxt.push('');
  linhasTxt.push(`Submeto a Vossa apreciação a pauta com ${lista.length} item(ns) abaixo relacionados.`);
  linhasTxt.push('');
  lista.forEach((t, i) => {
    const es = despachoEstrutura(t, { tom: 'institucional', destino: 'envio' });
    const oe = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
    const meta = [];
    if (oe) meta.push(`OE ${oe.id}`);
    if (t.prazo) meta.push(`prazo ${fmtDataExtenso(t.prazo)}`);
    if (t.prioridade === 'alta') meta.push('prioritária');
    if (isAtrasada(t)) meta.push('em atraso');
    if (t.status === 'bloqueada') meta.push('bloqueada');
    if (t.responsavel && !todosMesmo) meta.push(`a ${t.responsavel}`);
    linhasTxt.push(`${i + 1}. Despacho nº ${es.numero} — ${_trimPunct(t.titulo)}`);
    if (meta.length) linhasTxt.push(`   (${meta.join(' · ')})`);
    linhasTxt.push(`   ${es.paragrafos[0]}`);
    linhasTxt.push('');
  });
  linhasTxt.push('Permaneço à disposição para esclarecimentos.');
  linhasTxt.push('');
  linhasTxt.push('Atenciosamente,');
  linhasTxt.push('');
  if (config.meuNome) linhasTxt.push(config.meuNome);
  if (config.meuCargo) linhasTxt.push(config.meuCargo);

  const vocativoHtml = (principal && todosMesmo)
    ? `<p class="bilhete-papel__vocativo">${escapeHTML(inferirGenero(principal) === 'f' ? 'Prezada Senhora,' : 'Prezado Senhor,')}</p>`
    : `<p class="bilhete-papel__vocativo">Prezado(a) Senhor(a),</p>`;

  const html = `
    <div class="bilhete-papel__cabecalho">
      <span class="bilhete-papel__rotulo">PAUTA DE DESPACHOS</span>
      <span class="bilhete-papel__data">${escapeHTML(dataExt)}</span>
    </div>
    <div class="bilhete-papel__refs">${refsHtml}</div>
    <div class="bilhete-papel__corpo">
      ${vocativoHtml}
      <p class="bilhete-papel__paragrafo">Submeto a Vossa apreciação a pauta com ${lista.length} item(ns) abaixo relacionados.</p>
      <div class="lote-itens">${itensHtml}</div>
      <p class="bilhete-papel__paragrafo">Permaneço à disposição para esclarecimentos.</p>
      <p class="bilhete-papel__fecho">Atenciosamente,</p>
      <div class="bilhete-papel__assinatura">
        ${config.meuNome ? `<div class="bilhete-papel__assinante">${escapeHTML(config.meuNome)}</div>` : ''}
        ${config.meuCargo ? `<div class="bilhete-papel__cargo">${escapeHTML(config.meuCargo)}</div>` : ''}
      </div>
    </div>`;

  const papelEl = $('#lote-papel');
  papelEl.innerHTML = html;
  papelEl.dataset.texto = linhasTxt.join('\n');
  papelEl.dataset.numeroPauta = numeroPauta;
  papelEl.dataset.dataExt = dataExt;
  papelEl.dataset.principal = principal || '';
  papelEl.dataset.todosMesmo = todosMesmo ? '1' : '0';
  papelEl.dataset.qtd = String(lista.length);
  papelEl.dataset.ids = ids.join(',');

  $('#lote-resumo').innerHTML = `${lista.length} tarefa(s) selecionada(s)${principal && todosMesmo ? ` para ${escapeHTML(principal)}` : ''}.`;

  $('#dlg-despacho-lote').showModal();
}

async function exportarLotePDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const cm = 28.3464567;
    const marginTop = 3 * cm;
    const marginBottom = 2 * cm;
    const marginLeft = 3 * cm;
    const marginRight = 2 * cm;
    const fontSize = 12; const lineHeight = 16;
    const maxWidth = pageW - marginLeft - marginRight;

    const papelEl = $('#lote-papel');
    const texto = papelEl.dataset.texto || '';
    const linhas = texto.split('\n');
    let y = marginTop;
    doc.setFont('times', 'normal'); doc.setFontSize(fontSize);
    for (const ln of linhas) {
      const wrapped = doc.splitTextToSize(ln || ' ', maxWidth);
      for (const w of wrapped) {
        if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
        // Negrito para título da pauta e cabeçalho de itens
        if (/^PAUTA DE DESPACHOS/i.test(w) || /^\d+\. Despacho nº/i.test(w)) {
          doc.setFont('times', 'bold');
          doc.text(w, marginLeft, y);
          doc.setFont('times', 'normal');
        } else {
          doc.text(w, marginLeft, y);
        }
        y += lineHeight;
      }
    }
    doc.save(`pauta_${papelEl.dataset.numeroPauta || 'despachos'}.pdf`);
    mostrarFlash('Pauta exportada em PDF.');
  } catch (err) {
    console.error(err);
    mostrarMsg('Falha ao gerar PDF.', true);
  }
}

async function exportarLoteDocx() {
  try {
    mostrarFlash('Gerando Word…');
    const docxLib = await carregarLibDocx();
    const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } = docxLib;
    const papelEl = $('#lote-papel');
    const dataExt = papelEl.dataset.dataExt || fmtDataExtenso(hojeISO());
    const principal = papelEl.dataset.principal;
    const todosMesmo = papelEl.dataset.todosMesmo === '1';
    const ids = (papelEl.dataset.ids || '').split(',').filter(Boolean);
    const lista = ids.map(id => tarefas.find(t => t.id === id)).filter(Boolean);

    const ps = [];
    ps.push(new Paragraph({
      children: [
        new TextRun({ text: 'PAUTA DE DESPACHOS', bold: true, size: 26 }),
        new TextRun({ text: '\t' + dataExt, size: 22 })
      ],
      tabStops: [{ type: 'right', position: 9000 }],
      spacing: { after: 200 },
      border: { bottom: { color: '888888', size: 6, style: BorderStyle.SINGLE } }
    }));
    ps.push(new Paragraph({
      children: [
        new TextRun({ text: 'Assunto: ', bold: true, size: 22 }),
        new TextRun({ text: `Pauta de despachos — ${lista.length} item(ns)`, size: 22 })
      ], spacing: { after: 80 }
    }));
    if (principal && todosMesmo) {
      ps.push(new Paragraph({
        children: [
          new TextRun({ text: 'Para: ', bold: true, size: 22 }),
          new TextRun({ text: principal, size: 22 })
        ], spacing: { after: 80 }
      }));
    }
    ps.push(new Paragraph({
      children: [
        new TextRun({ text: 'De: ', bold: true, size: 22 }),
        new TextRun({ text: `${config.meuNome || ''}${config.meuCargo ? ' — ' + config.meuCargo : ''}`.trim(), size: 22 })
      ], spacing: { after: 200 }
    }));
    const voc = (principal && todosMesmo) ? (inferirGenero(principal) === 'f' ? 'Prezada Senhora,' : 'Prezado Senhor,') : 'Prezado(a) Senhor(a),';
    ps.push(new Paragraph({
      children: [new TextRun({ text: voc, size: 22 })], spacing: { after: 200 }
    }));
    ps.push(new Paragraph({
      children: [new TextRun({ text: `Submeto a Vossa apreciação a pauta com ${lista.length} item(ns) abaixo relacionados.`, size: 22 })],
      alignment: AlignmentType.JUSTIFIED, indent: { firstLine: 720 }, spacing: { after: 200 }
    }));
    lista.forEach((t, i) => {
      const es = despachoEstrutura(t, { tom: 'institucional', destino: 'envio' });
      const oe = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
      const meta = [];
      if (oe) meta.push(`OE ${oe.id}`);
      if (t.prazo) meta.push(`prazo ${fmtDataExtenso(t.prazo)}`);
      if (t.prioridade === 'alta') meta.push('prioritária');
      if (isAtrasada(t)) meta.push('em atraso');
      if (t.status === 'bloqueada') meta.push('bloqueada');
      if (t.responsavel && !todosMesmo) meta.push(`a ${t.responsavel}`);
      ps.push(new Paragraph({
        children: [
          new TextRun({ text: `${i + 1}. Despacho nº ${es.numero} — `, bold: true, size: 22 }),
          new TextRun({ text: _trimPunct(t.titulo), bold: true, size: 22 })
        ], spacing: { before: 160, after: 60 }
      }));
      if (meta.length) ps.push(new Paragraph({
        children: [new TextRun({ text: `(${meta.join(' · ')})`, italics: false, size: 20, color: '555555' })],
        indent: { left: 360 }, spacing: { after: 60 }
      }));
      ps.push(new Paragraph({
        children: [new TextRun({ text: es.paragrafos[0], size: 22 })],
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 360, firstLine: 360 },
        spacing: { after: 100 }
      }));
    });
    ps.push(new Paragraph({
      children: [new TextRun({ text: 'Permaneço à disposição para esclarecimentos.', size: 22 })],
      alignment: AlignmentType.JUSTIFIED, indent: { firstLine: 720 }, spacing: { before: 200, after: 200 }
    }));
    ps.push(new Paragraph({
      children: [new TextRun({ text: 'Atenciosamente,', size: 22 })],
      spacing: { before: 100, after: 600 }
    }));
    ps.push(new Paragraph({
      children: [new TextRun({ text: '_________________________________', size: 22 })],
      alignment: AlignmentType.CENTER, spacing: { after: 60 }
    }));
    if (config.meuNome) ps.push(new Paragraph({
      children: [new TextRun({ text: config.meuNome, bold: true, size: 22 })],
      alignment: AlignmentType.CENTER
    }));
    if (config.meuCargo) ps.push(new Paragraph({
      children: [new TextRun({ text: config.meuCargo, size: 22 })],
      alignment: AlignmentType.CENTER
    }));

    const doc = new Document({
      styles: { default: { document: { run: { font: 'Times New Roman', size: 22 } } } },
      sections: [{
        properties: { page: { margin: { top: 1700, right: 1133, bottom: 1133, left: 1700 } } },
        children: ps
      }]
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pauta_${papelEl.dataset.numeroPauta || 'despachos'}.docx`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    mostrarFlash('Word baixado.');
  } catch (err) {
    console.error(err);
    mostrarMsg('Falha ao gerar Word do lote.', true);
  }
}

function mostrarFlash(txt) {
  // pequeno feedback temporário
  const el = $('#msg');
  el.textContent = txt; el.classList.remove('error');
  setTimeout(() => { el.textContent = ''; }, 1800);
}

// Renderiza um parágrafo com trechos em *negrito* usando jsPDF.
// Quebra linhas dentro do parágrafo e troca de página automaticamente quando estoura.
// Retorna o novo y.
function _pdfDesenharParagrafo(doc, texto, opts) {
  const { x, maxWidth, lineHeight, pageH, marginBottom, fontSize } = opts;
  let y = opts.y;

  // 1) Tokeniza o texto preservando *trechos em negrito*.
  const tokens = []; // { text, bold }
  const re = /\*([^*]+)\*/g;
  let last = 0; let m;
  while ((m = re.exec(texto)) !== null) {
    if (m.index > last) tokens.push({ text: texto.slice(last, m.index), bold: false });
    tokens.push({ text: m[1], bold: true });
    last = re.lastIndex;
  }
  if (last < texto.length) tokens.push({ text: texto.slice(last), bold: false });
  if (tokens.length === 0) tokens.push({ text: texto, bold: false });

  // 2) Quebra cada token em palavras (mantendo o estilo) e monta as linhas.
  const words = []; // { text, bold, isSpace }
  tokens.forEach(tok => {
    const partes = tok.text.split(/(\s+)/);
    partes.forEach(p => {
      if (p === '') return;
      words.push({ text: p, bold: tok.bold, isSpace: /^\s+$/.test(p) });
    });
  });

  // 3) Desenha quebrando ao chegar em maxWidth.
  const setStyle = bold => doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(fontSize);
  let linhaAtual = []; // { text, bold }
  let larguraLinha = 0;

  const flushLinha = () => {
    // Verifica espaço vertical antes de escrever
    if (y + lineHeight > pageH - marginBottom) {
      doc.addPage();
      y = opts.marginTop;
    }
    let cx = x;
    linhaAtual.forEach(seg => {
      setStyle(seg.bold);
      doc.text(seg.text, cx, y);
      cx += doc.getTextWidth(seg.text);
    });
    y += lineHeight;
    linhaAtual = [];
    larguraLinha = 0;
  };

  words.forEach(w => {
    setStyle(w.bold);
    let largura = doc.getTextWidth(w.text);

    // Se for espaço no início da linha, ignora
    if (w.isSpace && larguraLinha === 0) return;

    // Se a palavra (não-espaço) cabe na linha
    if (larguraLinha + largura <= maxWidth) {
      linhaAtual.push({ text: w.text, bold: w.bold });
      larguraLinha += largura;
      return;
    }

    // Não cabe — fecha a linha atual
    if (linhaAtual.length > 0) flushLinha();

    // Se a palavra sozinha for maior que maxWidth, quebra por caractere
    if (largura > maxWidth && !w.isSpace) {
      let buf = '';
      for (const ch of w.text) {
        setStyle(w.bold);
        const candidato = buf + ch;
        if (doc.getTextWidth(candidato) > maxWidth && buf) {
          linhaAtual.push({ text: buf, bold: w.bold });
          flushLinha();
          buf = ch;
        } else {
          buf = candidato;
        }
      }
      if (buf) {
        linhaAtual.push({ text: buf, bold: w.bold });
        larguraLinha = doc.getTextWidth(buf);
      }
    } else if (!w.isSpace) {
      linhaAtual.push({ text: w.text, bold: w.bold });
      larguraLinha = largura;
    }
  });

  if (linhaAtual.length > 0) flushLinha();
  return y;
}

async function exportarBilheteIndividualPDF() {
  const t = tarefas.find(x => x.id === _bilheteAtualId);
  if (!t) return;

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    // Margens A4 ABNT (3-2-3-2 cm) em pt
    const cm = 28.3464567;
    const marginTop = 3 * cm;
    const marginBottom = 2 * cm;
    const marginLeft = 3 * cm;
    const marginRight = 2 * cm;
    const fontSize = 12;
    const lineHeight = 16;
    const maxWidth = pageW - marginLeft - marginRight;

    const es = despachoEstrutura(t, _despachoOpts);

    let y = marginTop;

    // Cabeçalho institucional: Despacho nº ____ — data (Times serif)
    doc.setTextColor(20, 20, 20);
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.text(`DESPACHO Nº ${es.numero}`, marginLeft, y);
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    doc.text(es.dataExt, pageW - marginRight, y, { align: 'right' });
    y += 8;
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, y, pageW - marginRight, y);
    y += 16;

    // Referências (Assunto, Referência OE, Prazo, Para, De)
    doc.setFont('times', 'normal');
    doc.setFontSize(fontSize);
    for (const r of es.refs) {
      const linha = `${r.rotulo}: ${r.valor}`;
      const wrapped = doc.splitTextToSize(linha, maxWidth);
      for (const ln of wrapped) {
        if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
        // rótulo em negrito
        const idx = ln.indexOf(':');
        if (idx > 0) {
          doc.setFont('times', 'bold');
          doc.text(ln.slice(0, idx + 1), marginLeft, y);
          const labelW = doc.getTextWidth(ln.slice(0, idx + 1) + ' ');
          doc.setFont('times', 'normal');
          doc.text(ln.slice(idx + 1).trimStart(), marginLeft + labelW, y);
        } else {
          doc.text(ln, marginLeft, y);
        }
        y += lineHeight;
      }
    }
    y += lineHeight * 0.5;

    // Vocativo
    if (es.vocativo) {
      if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
      doc.setFont('times', 'normal');
      doc.text(es.vocativo, marginLeft, y);
      y += lineHeight * 1.6;
    }

    // Parágrafos justificados com indentação
    const indent = 1 * cm;
    for (const p of es.paragrafos) {
      const wrapped = doc.splitTextToSize(p, maxWidth - indent);
      let isFirst = true;
      for (const ln of wrapped) {
        if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
        doc.text(ln, isFirst ? marginLeft + indent : marginLeft, y);
        isFirst = false;
        y += lineHeight;
      }
      y += lineHeight * 0.4;
    }

    // Próximos passos
    if (es.proximosPassos && es.proximosPassos.length) {
      y += lineHeight * 0.3;
      if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
      doc.setFont('times', 'bold');
      doc.text('Próximos passos:', marginLeft, y);
      y += lineHeight;
      doc.setFont('times', 'normal');
      es.proximosPassos.forEach((p, i) => {
        const wrapped = doc.splitTextToSize(`${i + 1}. ${p}`, maxWidth - indent);
        for (const ln of wrapped) {
          if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
          doc.text(ln, marginLeft + indent, y);
          y += lineHeight;
        }
      });
      y += lineHeight * 0.4;
    }

    // Fecho
    if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
    const fechoLines = doc.splitTextToSize(es.fecho, maxWidth - indent);
    let fechoFirst = true;
    for (const ln of fechoLines) {
      if (y > pageH - marginBottom) { doc.addPage(); y = marginTop; }
      doc.text(ln, fechoFirst ? marginLeft + indent : marginLeft, y);
      fechoFirst = false;
      y += lineHeight;
    }
    y += lineHeight * 1.2;

    // Assinatura (só em modo envio)
    if (es.destino === 'envio') {
      if (y + lineHeight * 4 > pageH - marginBottom) { doc.addPage(); y = marginTop; }
      doc.text('Atenciosamente,', marginLeft, y);
      y += lineHeight * 3;
      // linha de assinatura centralizada
      const lineW = 220;
      const lineX = (pageW - lineW) / 2;
      doc.line(lineX, y, lineX + lineW, y);
      y += lineHeight;
      doc.setFont('times', 'bold');
      doc.text(es.assinatura.nome || '', pageW / 2, y, { align: 'center' });
      y += lineHeight;
      doc.setFont('times', 'normal');
      doc.text(es.assinatura.cargo || '', pageW / 2, y, { align: 'center' });
    }

    doc.save(`despacho_${es.numero.replace('/', '-')}_${t.id}.pdf`);
    mostrarMsg('Despacho exportado em PDF.');
  } catch (err) {
    console.error(err);
    mostrarMsg('Falha ao gerar PDF do despacho.', true);
  }
}

/* ===================================================================
   12-B. PLANNER (via Microsoft Forms pré-preenchido + Power Automate)
   =================================================================== */

// URL base do formulário Microsoft Forms que dispara o fluxo do Power Automate.
// O fluxo lê os campos como dados estruturados (sem HTML) e cria a tarefa
// no Planner DE - Geral, no bucket correto, com prioridade e datas.
const FORMS_BASE_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=Io89vZLkoUa_zg75ooRBVLisUZFFV2pGlQPuEsKY9PhUNVZQQkhPS1dOTlEwRU8xRkI2RTQ5QUVETC4u';

// IDs internos das perguntas do Forms (extraídos do metadata do formulário)
const FORMS_FIELDS = {
  titulo:     're0105dacbe354391aaf6acd4f730c632', // Título da tarefa
  bucket:     'r28b08538730046b9b53370d18d79c8f1', // Bucket (Objetivo Estratégico)
  prioridade: 'r9f66d75317a64880b5460354f8044711', // Prioridade
  inicio:     'r54d41d306c4e4f92abd812690add01d0', // Data de início
  prazo:      'rf1ee4e401a354282b4372224c3a0088a', // Data de conclusão
  anotacoes:  'r964fba1a5ece4f7eab8bdb05758e90d3', // Anotações
  idApp:      're0a63693bcf4485b89730ff419811af9'  // ID interno do app
};

// Opções de Bucket no Forms (texto exato — precisa bater 100% com a opção da pergunta)
const FORMS_BUCKET_POR_OE = {
  1: 'OE 1 — Faturamento sustentável',
  2: 'OE 2 — Diversificar clientes',
  3: 'OE 3 — Educação e pesquisa',
  4: 'OE 4 — Reconhecimento por excelência',
  5: 'OE 5 — Organização leve e ágil',
  6: 'OE 6 — Equanimidade e inclusão',
  7: 'OE 7 — Ambiente de qualidade',
  8: 'OE 8 — Excelência da gestão',
  semOE: 'Sem OE (Geral)'
};

// Mapeamento prioridade interna do app -> opção do Forms
// Como o app só tem 3 níveis (alta/media/baixa) e o Forms tem 4,
// 'alta' vai para 'Importante' por padrão. Tarefas marcadas como
// 'urgente' (no eixo Importância x Urgência) viram 'Urgente'.
function prioridadeForms(t) {
  if (t.urgente === true && t.prioridade === 'alta') return 'Urgente';
  if (t.prioridade === 'alta')  return 'Importante';
  if (t.prioridade === 'media') return 'Média';
  if (t.prioridade === 'baixa') return 'Baixa';
  return 'Média';
}

function bucketDaTarefa(t) {
  // Mantido para compatibilidade com outras telas que mostram o bucket.
  if (t && t.oeId && FORMS_BUCKET_POR_OE[t.oeId]) return FORMS_BUCKET_POR_OE[t.oeId];
  return FORMS_BUCKET_POR_OE.semOE;
}

function montarAnotacoesPlanner(t) {
  const obj = OBJETIVOS.find(o => o.id === t.oeId);
  const linhas = [];
  if (obj) linhas.push(`OE: ${obj.id} — ${obj.curto}`);
  if (t.responsavel) linhas.push(`Responsável: ${t.responsavel}`);
  if (t.status) linhas.push(`Status: ${STATUS_ROTULOS[t.status] || t.status}`);
  if (t.importante !== null || t.urgente !== null) {
    const eixos = [];
    if (t.importante === true) eixos.push('Importante');
    if (t.urgente === true) eixos.push('Urgente');
    if (eixos.length) linhas.push(`Classificação: ${eixos.join(' + ')}`);
  }
  if (t.resultado) {
    if (linhas.length) linhas.push('');
    linhas.push('Resultado esperado:');
    linhas.push(t.resultado);
  }
  return linhas.join('\n');
}

function enviarParaPlanner(id) {
  const t = tarefas.find(x => x.id === id);
  if (!t) return;

  const bucket = bucketDaTarefa(t);
  const inicioIso = t.dataInicio || new Date().toISOString().slice(0, 10);
  const prazoIso = t.prazo || '';
  const anotacoes = montarAnotacoesPlanner(t);

  // Microsoft Forms exige aspas duplas envolvendo os valores das perguntas
  // de escolha (Bucket, Prioridade) e data (Início, Conclusão).
  // Para texto livre (título, anotações, id), envia sem aspas.
  const aspas = (v) => '"' + String(v) + '"';
  const params = new URLSearchParams();
  params.set(FORMS_FIELDS.titulo, t.titulo || '');
  params.set(FORMS_FIELDS.bucket, aspas(bucket));
  params.set(FORMS_FIELDS.prioridade, aspas(prioridadeForms(t)));
  if (inicioIso) params.set(FORMS_FIELDS.inicio, aspas(inicioIso));
  if (prazoIso)  params.set(FORMS_FIELDS.prazo, aspas(prazoIso));
  if (anotacoes) params.set(FORMS_FIELDS.anotacoes, anotacoes);
  params.set(FORMS_FIELDS.idApp, t.id);

  // URLSearchParams codifica espaço como '+', mas o Microsoft Forms exibe
  // o '+' literal em alguns campos. Trocamos por '%20' (espaço universal).
  const url = FORMS_BASE_URL + '&' + params.toString().replace(/\+/g, '%20');
  const w = window.open(url, '_blank', 'noopener');
  if (!w) {
    window.location.href = url;
    return;
  }
  mostrarMsg('Formulário aberto com os dados pré-preenchidos. Toque em Enviar para criar a tarefa no Planner.');
}

/* ===================================================================
   13. E-MAIL — Manual de Redação da Presidência
   =================================================================== */

let _emailTarefaId = null;

// Tom do e-mail (institucional|pessoal). Persiste durante a sessão do modal.
let _emailTom = 'pessoal';

function abrirEmailModal(id) {
  const t = tarefas.find(x => x.id === id);
  if (!t) return;
  _emailTarefaId = id;
  $('#email-template').value = 'auto';
  $('#email-tratamento').value = 'voce';
  $('#email-nome').value = '';
  $('#email-nome-wrap').hidden = true;
  // tom default: pessoal (e-mails internos costumam ser mais cordiais que despachos)
  _emailTom = 'pessoal';
  // sincroniza visual dos botões de tom, se existirem
  $$('#dlg-email [data-etom]').forEach(b => {
    b.classList.toggle('seg__btn--ativo', b.dataset.etom === _emailTom);
  });
  $('#email-tratamento').onchange = () => {
    const v = $('#email-tratamento').value;
    $('#email-nome-wrap').hidden = v !== 'nome';
    atualizarCorpoEmail();
  };
  $('#email-template').onchange = atualizarCorpoEmail;
  $('#email-nome').oninput = atualizarCorpoEmail;
  atualizarCorpoEmail();
  $('#dlg-email').showModal();
}

function inferirTemplate(t) {
  if (t.status === 'concluida') return 'conclusao';
  if (isAtrasada(t)) return 'cobranca';
  if (t.prazo) {
    const dias = diasEntre(hojeISO(), t.prazo);
    if (dias !== null && dias >= 0 && dias <= 5) return 'lembrete';
  }
  return 'solicitacao';
}

// Mapeia template manual -> categoria do despacho (compartilha variações)
function _emailTplToCategoria(tpl, t) {
  if (tpl === 'conclusao') return 'concluida';
  if (tpl === 'cobranca') return 'atrasada';
  if (tpl === 'lembrete') return 'andamento';
  if (tpl === 'reagendamento') return 'andamento';
  if (tpl === 'solicitacao') {
    return (t && t.prioridade === 'alta') ? 'alta' : 'rotina';
  }
  // 'auto' — deixa despachoEstrutura decidir
  return null;
}

function montarTratamento(tarefa) {
  const trat = $('#email-tratamento').value;
  const nomeProprio = $('#email-nome').value.trim();
  const respPrim = (tarefa.responsavel || '').split(/\s+/)[0];
  let alvoNome = '';
  let prefixo = '';
  if (trat === 'voce') {
    alvoNome = respPrim || '';
    const g = inferirGenero(alvoNome);
    prefixo = g === 'f' ? 'Prezada' : (g === 'm' ? 'Prezado' : 'Prezado(a)');
  } else if (trat === 'vsa') {
    alvoNome = respPrim || '';
    const g = inferirGenero(alvoNome);
    prefixo = g === 'f' ? 'Prezada Senhora' : (g === 'm' ? 'Prezado Senhor' : 'Prezado(a) Senhor(a)');
  } else {
    alvoNome = nomeProprio;
    const g = inferirGenero(alvoNome);
    prefixo = g === 'f' ? 'Prezada' : (g === 'm' ? 'Prezado' : 'Prezado(a)');
  }
  return alvoNome ? `${prefixo} ${alvoNome}` : prefixo;
}

// Rótulos de assunto por categoria/template
const _EMAIL_LABELS = {
  concluida: 'Conclusão',
  atrasada: 'Cobrança',
  bloqueada: 'Desbloqueio',
  alta: 'Solicitação prioritária',
  andamento: 'Acompanhamento',
  rotina: 'Solicitação'
};
// override quando o usuário força um template manual
const _EMAIL_LABELS_MANUAL = {
  solicitacao: 'Solicitação',
  lembrete: 'Lembrete',
  cobranca: 'Cobrança',
  conclusao: 'Conclusão',
  reagendamento: 'Reagendamento'
};

function atualizarCorpoEmail() {
  const t = tarefas.find(x => x.id === _emailTarefaId);
  if (!t) return;
  const tplManual = $('#email-template').value; // 'auto' ou um dos 5 manuais
  const cab = montarTratamento(t);
  const tituloLimpo = _trimPunct(t.titulo);
  const resultadoLimpo = t.resultado ? _trimPunct(t.resultado) : null;
  const prazoExt = t.prazo ? fmtDataExtenso(t.prazo) : null;
  const oe = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
  const oeTrecho = oe ? ` (vinculada ao Objetivo Estratégico ${oe.id} — ${oe.curto})` : '';

  // Pega numeração e categoria via despachoEstrutura.
  // (E-mail não "consome" novo número — aproveita o já atribuído à tarefa, se houver,
  //  ou gera um. Mesma lógica de despacho, garante consistência número↔assunto.)
  const es = despachoEstrutura(t, { tom: 'institucional', destino: 'envio' });

  // Categoria efetiva: override manual se o usuário escolheu, senão a do despacho
  const catManual = _emailTplToCategoria(tplManual, t);
  const categoria = catManual || es.categoria;
  const rotuloAss = (tplManual !== 'auto' ? _EMAIL_LABELS_MANUAL[tplManual] : _EMAIL_LABELS[categoria]) || 'Comunicação';

  // Variação estável compartilhada com o despacho
  const seed = `${t.id}-${es.numero}-email`;

  // Frases de abertura específicas para e-mail (mais coloquiais que despacho)
  const VAR_EMAIL = {
    concluida: [
      `comunico a conclusão da demanda ${tituloLimpo}${oeTrecho}`,
      `informo o encerramento da demanda ${tituloLimpo}${oeTrecho}`,
      `registro a conclusão da demanda ${tituloLimpo}${oeTrecho}`
    ],
    atrasada: [
      `registro que a demanda ${tituloLimpo}${oeTrecho} encontra-se com prazo vencido`,
      `retomo a demanda ${tituloLimpo}${oeTrecho}, cujo prazo já se expirou`,
      `reitero a demanda ${tituloLimpo}${oeTrecho}, observando que o prazo previsto foi ultrapassado`
    ],
    bloqueada: [
      `reporto entraves na demanda ${tituloLimpo}${oeTrecho} e solicito apoio para o desbloqueio`,
      `comunico a existência de impedimentos na demanda ${tituloLimpo}${oeTrecho}`,
      `submeto a sua atenção a demanda ${tituloLimpo}${oeTrecho}, atualmente em situação de bloqueio`
    ],
    alta: [
      `encaminho, com tratamento prioritário, a demanda ${tituloLimpo}${oeTrecho}`,
      `solicito atenção prioritária à demanda ${tituloLimpo}${oeTrecho}`,
      `submeto, em caráter prioritário, a demanda ${tituloLimpo}${oeTrecho}`
    ],
    andamento: [
      `atualizo o andamento da demanda ${tituloLimpo}${oeTrecho}`,
      `acompanho com você a demanda ${tituloLimpo}${oeTrecho}`,
      `registro o estágio atual da demanda ${tituloLimpo}${oeTrecho}`
    ],
    rotina: [
      `encaminho a demanda ${tituloLimpo}${oeTrecho}`,
      `submeto à sua apreciação a demanda ${tituloLimpo}${oeTrecho}`,
      `apresento, para conhecimento e providências, a demanda ${tituloLimpo}${oeTrecho}`
    ]
  };

  // Fechos por categoria (variação estável)
  const FECHOS_EMAIL = {
    concluida: [
      'Agradeço a colaboração e permaneço à disposição para os próximos encaminhamentos.',
      'Agradeço o empenho e sigo à disposição para tratativas subsequentes.',
      'Permaneço à disposição para os desdobramentos decorrentes.'
    ],
    atrasada: [
      'Solicito posicionamento sobre o estágio atual e, se cabível, nova projeção de prazo.',
      'Peço, por gentileza, retorno sobre o estágio atual e proposta de novo prazo.',
      'Aguardo manifestação quanto ao estágio atual e a possíveis ajustes de prazo.'
    ],
    bloqueada: [
      'Permaneço à disposição para apoiar na remoção dos impedimentos.',
      'Sigo à disposição para articular as providências necessárias.',
      'Coloco-me à disposição para tratativas que viabilizem o prosseguimento.'
    ],
    alta: [
      'Permaneço à disposição para esclarecimentos e ajustes que se fizerem necessários.',
      'Permaneço à disposição para o que se fizer necessário.',
      'Aguardo manifestação e sigo à disposição para ajustes.'
    ],
    andamento: [
      'Caso já haja avanço a reportar, agradeço breve sinalização.',
      'Peço uma breve sinalização sobre o estágio atual e eventuais entraves.',
      'Aguardo atualização quanto ao estágio e a obstáculos identificados.'
    ],
    rotina: [
      'Permaneço à disposição para esclarecimentos.',
      'Sigo à disposição para esclarecimentos.',
      'Aguardo retorno e permaneço à disposição.'
    ]
  };

  // Vocativo: respeita o seletor existente, mas pode ser refinado pelo tom.
  // Em "institucional" forçamos "Prezado Senhor," / "Prezada Senhora,".
  // Em "pessoal" mantém o cab montado (Prezado <Nome>).
  let voc;
  if (_emailTom === 'institucional') {
    const g = inferirGenero(t.responsavel);
    voc = g === 'f' ? 'Prezada Senhora' : 'Prezado Senhor';
  } else {
    voc = cab;
  }

  const abertura = _pickStable(VAR_EMAIL[categoria], seed + ':a');
  const fechoCat = _pickStable(FECHOS_EMAIL[categoria], seed + ':f');

  // Frase de prazo (contexto)
  let contexto = '';
  if (categoria === 'atrasada' && prazoExt) contexto = ` O prazo previsto era ${prazoExt}.`;
  else if (categoria === 'bloqueada' && prazoExt) contexto = ` O prazo previsto é ${prazoExt}.`;
  else if (categoria === 'alta') contexto = prazoExt ? ` Solicito conclusão até ${prazoExt}.` : ' Solicito definição de prazo de execução tão logo possível.';
  else if (categoria === 'andamento' && prazoExt) contexto = ` O prazo previsto é ${prazoExt}.`;
  else if (categoria === 'rotina' && prazoExt) contexto = ` Sugere-se como prazo ${prazoExt}, passível de revisão de comum acordo.`;

  // Frase de resultado
  let resultadoFrase = '';
  if (resultadoLimpo) {
    resultadoFrase = (categoria === 'concluida')
      ? ` Como entrega, registra-se: ${resultadoLimpo}.`
      : ` Como entrega prevista, registra-se: ${resultadoLimpo}.`;
  }

  // Próximos passos automáticos (somente onde fazem sentido)
  const passos = (categoria === 'concluida' || categoria === 'rotina')
    ? []
    : proximosPassos(t);

  // Assunto: "Despacho nº 0042/2026 — Cobrança — <título>"
  const assunto = `Despacho nº ${es.numero} — ${rotuloAss} — ${tituloLimpo}`;

  // Corpo
  let corpo = `${voc},\n\n`;
  corpo += `${abertura}.${contexto}${resultadoFrase}\n`;
  if (passos.length) {
    corpo += `\nPróximos passos:\n`;
    passos.forEach(p => { corpo += `  • ${p}\n`; });
  }
  corpo += `\n${fechoCat}\n\nAtenciosamente,\n\n`;
  if (config.meuNome) corpo += `${config.meuNome}`;
  if (config.meuCargo) corpo += `\n${config.meuCargo}`;
  corpo += `\n`;

  $('#email-assunto').value = assunto;
  $('#email-corpo').value = corpo;
}

function bindEmail() {
  // Toggle de tom (Pessoal/Institucional) no modal de e-mail
  document.addEventListener('click', e => {
    const btn = e.target.closest('#dlg-email [data-etom]');
    if (!btn) return;
    _emailTom = btn.dataset.etom === 'institucional' ? 'institucional' : 'pessoal';
    $$('#dlg-email [data-etom]').forEach(b => {
      b.classList.toggle('seg__btn--ativo', b.dataset.etom === _emailTom);
    });
    atualizarCorpoEmail();
  });
}

document.addEventListener('click', e => {
  if (e.target.id === 'btn-email-copy') {
    const txt = `Assunto: ${$('#email-assunto').value}\n\n${$('#email-corpo').value}`;
    navigator.clipboard.writeText(txt); mostrarFlash('Copiado.');
  } else if (e.target.id === 'btn-email-copy-body') {
    navigator.clipboard.writeText($('#email-corpo').value); mostrarFlash('Copiado.');
  } else if (e.target.id === 'btn-email-mailto') {
    const url = `mailto:?subject=${encodeURIComponent($('#email-assunto').value)}&body=${encodeURIComponent($('#email-corpo').value)}`;
    window.location.href = url;
  }
});

/* ===================================================================
   14. AGENDA
   =================================================================== */

function bindAgenda() {
  $('#cal-prev').addEventListener('click', () => mudarMes(-1));
  $('#cal-next').addEventListener('click', () => mudarMes(1));
  $('#cal-month-btn').addEventListener('click', () => {
    agendaSelecionada = null;
    renderAgenda();
  });
  $('#btn-agenda-clear').addEventListener('click', () => {
    agendaSelecionada = null;
    renderAgenda();
  });
}

function mudarMes(delta) {
  if (!calendarioMes) {
    const h = new Date();
    calendarioMes = { ano: h.getFullYear(), mes: h.getMonth() };
  }
  let m = calendarioMes.mes + delta;
  let a = calendarioMes.ano;
  if (m < 0) { m = 11; a--; }
  if (m > 11) { m = 0; a++; }
  calendarioMes = { ano: a, mes: m };
  renderAgenda();
}

function renderAgenda() {
  if (!calendarioMes) {
    const h = new Date();
    calendarioMes = { ano: h.getFullYear(), mes: h.getMonth() };
  }
  // resumo 7 dias
  const hoje = hojeISO();
  const seteDias = new Date(); seteDias.setDate(seteDias.getDate() + 7);
  const limite = seteDias.toISOString().slice(0,10);
  const proximas = tarefas.filter(t => t.prazo && t.prazo >= hoje && t.prazo <= limite && t.status !== 'concluida');
  const q1Prox = proximas.filter(t => quadranteDe(t) === 'Q1').length;
  $('#agenda-summary').textContent = `Próximos sete dias: ${proximas.length} ${proximas.length === 1 ? 'tarefa' : 'tarefas'}, sendo ${q1Prox} do Q1.`;

  if (agendaSelecionada) {
    $('#agenda-title').textContent = `Tarefas em ${fmtData(agendaSelecionada)}`;
    $('#btn-agenda-clear').hidden = false;
    renderAgendaDoDia(agendaSelecionada);
  } else {
    $('#agenda-title').textContent = 'Cronograma';
    $('#btn-agenda-clear').hidden = true;
    renderAgendaCronologica();
  }
  renderCalendario();
}

function renderAgendaDoDia(iso) {
  const itens = tarefas.filter(t => t.prazo === iso);
  const cont = $('#agenda-sections');
  if (!itens.length) {
    cont.innerHTML = `<p class="muted">Sem tarefas marcadas para este dia.</p>`;
    return;
  }
  cont.innerHTML = `<div class="agenda-section"><div class="agenda-section__body">${itens.map(renderAgendaItem).join('')}</div></div>`;
  bindAgendaItens();
}

function renderAgendaCronologica() {
  const hoje = hojeISO();
  const dHoje = isoToDate(hoje);
  const fimSemana = new Date(dHoje); fimSemana.setDate(fimSemana.getDate() + (7 - dHoje.getDay())); // até domingo
  const fimSemanaIso = fimSemana.toISOString().slice(0,10);
  const fim2sem = new Date(fimSemana); fim2sem.setDate(fim2sem.getDate() + 7);
  const fim2semIso = fim2sem.toISOString().slice(0,10);
  const ultimoDiaMesIso = new Date(dHoje.getFullYear(), dHoje.getMonth() + 1, 0).toISOString().slice(0,10);
  const amanha = new Date(dHoje); amanha.setDate(amanha.getDate() + 1);
  const amanhaIso = amanha.toISOString().slice(0,10);

  const secoes = [
    { id: 'atrasadas', titulo: 'Atrasadas', fn: t => t.prazo && t.prazo < hoje && t.status !== 'concluida' },
    { id: 'hoje', titulo: 'Hoje', fn: t => t.prazo === hoje },
    { id: 'amanha', titulo: 'Amanhã', fn: t => t.prazo === amanhaIso },
    { id: 'semana', titulo: 'Esta semana', fn: t => t.prazo && t.prazo > amanhaIso && t.prazo <= fimSemanaIso },
    { id: 'duas', titulo: 'Próximas duas semanas', fn: t => t.prazo && t.prazo > fimSemanaIso && t.prazo <= fim2semIso },
    { id: 'mes', titulo: 'Este mês', fn: t => t.prazo && t.prazo > fim2semIso && t.prazo <= ultimoDiaMesIso },
    { id: 'depois', titulo: 'Depois', fn: t => t.prazo && t.prazo > ultimoDiaMesIso },
    { id: 'sem', titulo: 'Sem prazo', fn: t => !t.prazo }
  ];

  const cont = $('#agenda-sections');
  cont.innerHTML = secoes.map(s => {
    const itens = tarefas.filter(s.fn).sort((a, b) => (a.prazo || 'z').localeCompare(b.prazo || 'z'));
    if (!itens.length) return '';
    return `
      <div class="agenda-section" data-sec="${s.id}">
        <div class="agenda-section__head"><span>${s.titulo}</span><span class="count">${itens.length}</span>
          <svg class="grupo__chev" viewBox="0 0 16 16" style="margin-left:auto"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>
        </div>
        <div class="agenda-section__body">
          ${itens.map(renderAgendaItem).join('')}
        </div>
      </div>`;
  }).join('') || '<p class="muted">Nenhuma tarefa cadastrada ainda.</p>';
  $$('.agenda-section__head').forEach(h => {
    h.addEventListener('click', () => h.parentElement.classList.toggle('is-collapsed'));
  });
  bindAgendaItens();
}

function renderAgendaItem(t) {
  const q = quadranteDe(t);
  const dataLabel = t.prazo ? fmtData(t.prazo) : '—';
  return `
    <div class="agenda-item agenda-item--${q.toLowerCase()}" data-id="${t.id}">
      <div class="agenda-item__date">${dataLabel}</div>
      <div>
        <div class="agenda-item__title" data-edit>${escapeHTML(t.titulo)}</div>
        <div class="agenda-item__sub">${t.responsavel ? escapeHTML(t.responsavel) + ' · ' : ''}<span class="badge badge--${q.toLowerCase()}">${q === 'NC' ? 'Não class.' : q}</span></div>
      </div>
      <select class="tarefa__status-sel" aria-label="Alterar status">
        ${Object.entries(STATUS_ROTULOS).map(([v, r]) => `<option value="${v}" ${t.status === v ? 'selected' : ''}>${r}</option>`).join('')}
      </select>
    </div>
  `;
}

function bindAgendaItens() {
  $$('.agenda-item').forEach(el => {
    const id = el.dataset.id;
    el.querySelector('[data-edit]').addEventListener('click', () => abrirEdicao(id));
    el.querySelector('select').addEventListener('change', e => alterarStatus(id, e.target.value));
  });
}

function renderCalendario() {
  const { ano, mes } = calendarioMes;
  const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  $('#cal-title').textContent = `${meses[mes]} ${ano}`;
  const grid = $('#cal-grid');

  const primeiroDia = new Date(ano, mes, 1);
  const inicio = new Date(primeiroDia); inicio.setDate(inicio.getDate() - primeiroDia.getDay());
  const dias = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(inicio); d.setDate(inicio.getDate() + i);
    dias.push(d);
  }
  const hoje = hojeISO();

  const porDia = new Map();
  for (const t of tarefas) {
    if (!t.prazo) continue;
    if (!porDia.has(t.prazo)) porDia.set(t.prazo, []);
    porDia.get(t.prazo).push(t);
  }

  grid.innerHTML = dias.map(d => {
    const iso = d.toISOString().slice(0,10);
    const fora = d.getMonth() !== mes;
    const isToday = iso === hoje;
    const sel = iso === agendaSelecionada;
    const itens = porDia.get(iso) || [];
    const dots = itens.slice(0, 4).map(t => {
      const q = quadranteDe(t);
      return `<span class="cal__dot" style="background:${QUADRANTES[q].cor}"></span>`;
    }).join('');
    const more = itens.length > 4 ? `<span class="cal__more">+${itens.length - 4}</span>` : '';
    return `
      <button class="cal__day ${fora ? 'is-out' : ''} ${isToday ? 'is-today' : ''} ${sel ? 'is-selected' : ''}" data-iso="${iso}" type="button">
        <span>${d.getDate()}</span>
        <span class="cal__dots">${dots}</span>
        ${more}
      </button>`;
  }).join('');

  $$('.cal__day').forEach(b => {
    b.addEventListener('click', () => {
      agendaSelecionada = b.dataset.iso;
      renderAgenda();
    });
  });
}

/* ===================================================================
   15. REVISÃO EXECUTIVA SEMANAL
   =================================================================== */

function bindRevisao() {
  $('#btn-rev-concluir').addEventListener('click', concluirRevisao);
}

function renderRevisao() {
  // Renderiza cards nos 4 quadrantes + área NC
  const ativos = tarefas.filter(t => t.status !== 'concluida');
  const map = { Q1: [], Q2: [], Q3: [], Q4: [], NC: [] };
  for (const t of ativos) map[quadranteDe(t)].push(t);

  for (const q of ['Q1','Q2','Q3','Q4','NC']) {
    const drop = $(`.eisen-drop[data-quad="${q}"]`);
    if (!drop) continue;
    drop.innerHTML = map[q].map(t => `
      <div class="eisen-card" draggable="true" data-id="${t.id}">
        <div class="eisen-card__title">${escapeHTML(t.titulo)}</div>
        <div class="eisen-card__meta">
          ${t.prazo ? `📅 ${fmtData(t.prazo)}` : 'sem prazo'}
          ${t.responsavel ? '· 👤 ' + escapeHTML(t.responsavel) : ''}
          ${isAtrasada(t) ? '<span class="badge badge--atrasada">Atrasada</span>' : ''}
        </div>
      </div>`).join('') || '<p class="muted" style="font-size:0.78rem;padding:6px">—</p>';
  }

  // bind drag-and-drop
  $$('.eisen-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', card.dataset.id);
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });
  $$('.eisen-drop').forEach(drop => {
    drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('is-over'); e.dataTransfer.dropEffect = 'move'; });
    drop.addEventListener('dragleave', () => drop.classList.remove('is-over'));
    drop.addEventListener('drop', e => {
      e.preventDefault(); drop.classList.remove('is-over');
      const id = e.dataTransfer.getData('text/plain');
      const novoQ = drop.dataset.quad;
      reclassificar(id, novoQ);
    });
  });

  renderListaRevisoes();
  renderRevChart();
}

function reclassificar(id, novoQ) {
  const t = tarefas.find(x => x.id === id);
  if (!t) return;
  if (novoQ === 'Q1') { t.importante = true; t.urgente = true; }
  else if (novoQ === 'Q2') { t.importante = true; t.urgente = false; }
  else if (novoQ === 'Q3') { t.importante = false; t.urgente = true; }
  else if (novoQ === 'Q4') { t.importante = false; t.urgente = false; }
  else { t.importante = null; t.urgente = null; }
  t.atualizadaEm = new Date().toISOString();
  salvarTarefas();
  renderTudo();
}

function distribuicaoAtual() {
  const cont = { Q1:0, Q2:0, Q3:0, Q4:0, NaoClass:0 };
  for (const t of tarefas) {
    const q = quadranteDe(t);
    if (q === 'NC') cont.NaoClass++; else cont[q]++;
  }
  return cont;
}

function totaisStatus() {
  return {
    'a-fazer': tarefas.filter(t => t.status === 'a-fazer').length,
    'em-andamento': tarefas.filter(t => t.status === 'em-andamento').length,
    'concluida': tarefas.filter(t => t.status === 'concluida').length,
    'bloqueada': tarefas.filter(t => t.status === 'bloqueada').length
  };
}

function concluirRevisao() {
  const obs = $('#rev-obs').value.trim();
  const snap = {
    id: 'r_' + Date.now().toString(36),
    data: new Date().toISOString(),
    observacoes: obs,
    distribuicao: distribuicaoAtual(),
    totaisStatus: totaisStatus()
  };
  revisoes.push(snap);
  salvarRevisoes();
  $('#rev-obs').value = '';
  renderListaRevisoes();
  renderRevChart();
  renderSparkline();
  mostrarFlash('Revisão registrada.');
}

function renderListaRevisoes() {
  const cont = $('#rev-lista');
  if (!revisoes.length) {
    cont.innerHTML = '<p class="muted">Nenhuma revisão registrada ainda.</p>';
    return;
  }
  const ordenadas = [...revisoes].reverse();
  cont.innerHTML = ordenadas.map(r => {
    const d = new Date(r.data);
    const data = d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const dist = r.distribuicao || {};
    return `
      <div class="rev-item" data-id="${r.id}">
        <div>
          <div class="rev-item__date">${data}</div>
          <div class="rev-item__counts">Q1 ${dist.Q1||0} · Q2 ${dist.Q2||0} · Q3 ${dist.Q3||0} · Q4 ${dist.Q4||0} · NC ${dist.NaoClass||0}</div>
        </div>
        <button class="btn btn--ghost btn--sm" data-rev-detail>Ver detalhes</button>
      </div>`;
  }).join('');
  $$('[data-rev-detail]').forEach(b => {
    b.addEventListener('click', e => {
      const id = e.target.closest('.rev-item').dataset.id;
      mostrarDetalhesRevisao(id);
    });
  });
}

function mostrarDetalhesRevisao(id) {
  const r = revisoes.find(x => x.id === id);
  if (!r) return;
  const d = new Date(r.data);
  const data = d.toLocaleString('pt-BR');
  const dist = r.distribuicao || {};
  const stt = r.totaisStatus || {};
  $('#rev-detail-title').textContent = `Revisão de ${data}`;
  $('#rev-detail-body').innerHTML = `
    <h4>Distribuição por quadrante</h4>
    <ul class="muted-list">
      <li>Q1 — Crise: <strong>${dist.Q1||0}</strong></li>
      <li>Q2 — Estratégia: <strong>${dist.Q2||0}</strong></li>
      <li>Q3 — Interrupção: <strong>${dist.Q3||0}</strong></li>
      <li>Q4 — Trivial: <strong>${dist.Q4||0}</strong></li>
      <li>Não classificada: <strong>${dist.NaoClass||0}</strong></li>
    </ul>
    <h4 style="margin-top:14px">Totais por status</h4>
    <ul class="muted-list">
      <li>A fazer: <strong>${stt['a-fazer']||0}</strong></li>
      <li>Em andamento: <strong>${stt['em-andamento']||0}</strong></li>
      <li>Concluída: <strong>${stt['concluida']||0}</strong></li>
      <li>Bloqueada: <strong>${stt['bloqueada']||0}</strong></li>
    </ul>
    ${r.observacoes ? `<h4 style="margin-top:14px">Observações</h4><p style="white-space:pre-wrap">${escapeHTML(r.observacoes)}</p>` : ''}
  `;
  $('#dlg-rev').showModal();
}

function renderRevChart() {
  const canvas = $('#rev-chart');
  const empty = $('#rev-chart-empty');
  if (!canvas) return;
  if (!revisoes.length) {
    if (revChart) { revChart.destroy(); revChart = null; }
    canvas.style.display = 'none';
    empty.hidden = false;
    return;
  }
  canvas.style.display = '';
  empty.hidden = true;

  const labels = revisoes.map(r => {
    const d = new Date(r.data);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  });
  const totaisPorSnap = revisoes.map(r => {
    const d = r.distribuicao || {};
    return (d.Q1||0)+(d.Q2||0)+(d.Q3||0)+(d.Q4||0)+(d.NaoClass||0);
  });
  const series = (key, color) => ({
    label: key,
    data: revisoes.map((r, i) => totaisPorSnap[i] ? Math.round(((r.distribuicao?.[key === 'Não class.' ? 'NaoClass' : key]||0) / totaisPorSnap[i]) * 100) : 0),
    borderColor: color,
    backgroundColor: color + '22',
    tension: 0.3,
    pointRadius: 3,
    borderWidth: 2
  });

  if (revChart) revChart.destroy();
  revChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        series('Q1', QUADRANTES.Q1.cor),
        series('Q2', QUADRANTES.Q2.cor),
        series('Q3', QUADRANTES.Q3.cor),
        series('Q4', QUADRANTES.Q4.cor)
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
      scales: { y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } } }
    }
  });
}

/* ===================================================================
   16. CONFIGURAÇÕES
   =================================================================== */

// Integração com Planner agora é via Microsoft Forms pré-preenchido
// (constantes e funções na seção 12-B). Não há mais campos de
// configuração de e-mail/buckets na aba Configurações.
function bindConfig() { /* nada a vincular hoje */ }
function renderConfig() { /* nada a renderizar hoje */ }


/* ===================================================================
   17. REUNIÕES
   =================================================================== */

function ruid() { return 'r_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

// ---- Barra de seleção ----
function bindSelecaoBar() {
  const btnLimpar = $('#btn-limpar-selecao');
  const btnCriar = $('#btn-criar-reuniao');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      selecaoTarefasIds.clear();
      $$('.tarefa-select').forEach(ck => { ck.checked = false; });
      atualizarSelecaoBar();
    });
  }
  if (btnCriar) {
    btnCriar.addEventListener('click', () => {
      abrirModalReuniaoNova(Array.from(selecaoTarefasIds));
    });
  }
}

// ---- Bind principal de Reuniões ----
function bindReunioes() {
  bindSelecaoBar();

  // Botão + Nova reunião
  document.addEventListener('click', e => {
    if (e.target.id === 'btn-nova-reuniao') {
      abrirModalReuniaoNova([]);
    }
  });

  // Filtro de status
  const filtro = $('#filtro-reuniao-status');
  if (filtro) filtro.addEventListener('change', renderReunioes);

  // Fechar modal
  const rfCancelar = $('#rf-cancelar');
  if (rfCancelar) rfCancelar.addEventListener('click', () => $('#dlg-reuniao').close());

  // Submit do form de reunião
  const form = $('#dlg-reuniao-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      salvarReuniaoDoModal();
    });
  }

  // Participantes: Enter adiciona chip
  const inputPart = $('#rf-participante-novo');
  if (inputPart) {
    inputPart.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const nome = inputPart.value.trim().replace(/,$/, '');
        if (nome) adicionarChipParticipante(nome);
        inputPart.value = '';
      }
    });
  }

  // Botão vincular outra tarefa
  const rfAddTarefa = $('#rf-add-tarefa');
  if (rfAddTarefa) {
    rfAddTarefa.addEventListener('click', abrirModalVincularTarefa);
  }

  // Confirmar vincular tarefa
  const vtConfirmar = $('#vt-confirmar');
  if (vtConfirmar) {
    vtConfirmar.addEventListener('click', () => {
      const sel = $('#vt-select');
      if (sel && sel.value) {
        adicionarTarefaVinculadaNoModal(sel.value);
        $('#dlg-vincular-tarefa').close();
      }
    });
  }
}

// ---- Participantes (chips no modal) ----
let _rfParticipantes = [];

function renderChipsParticipantes() {
  const cont = $('#rf-participantes-tags');
  if (!cont) return;
  cont.innerHTML = _rfParticipantes.map((n, i) =>
    `<span class="tag-chip">${escapeHTML(n)}<button type="button" data-chip-idx="${i}" title="Remover">&times;</button></span>`
  ).join('');
  cont.querySelectorAll('[data-chip-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      _rfParticipantes.splice(Number(btn.dataset.chipIdx), 1);
      renderChipsParticipantes();
    });
  });
}

function adicionarChipParticipante(nome) {
  if (!_rfParticipantes.includes(nome)) _rfParticipantes.push(nome);
  renderChipsParticipantes();
}

// ---- Tarefas vinculadas no modal ----
let _rfTarefasIds = [];

function renderTarefasVinculadasModal() {
  const cont = $('#rf-tarefas-vinculadas');
  if (!cont) return;
  cont.innerHTML = _rfTarefasIds.map(tid => {
    const t = tarefas.find(x => x.id === tid);
    if (!t) return '';
    return `<div class="tarefa-vinculada" data-tvid="${tid}">
      <span>${escapeHTML(t.titulo)}</span>
      <button type="button" data-remover-tv="${tid}" title="Remover">&times;</button>
    </div>`;
  }).join('');
  cont.querySelectorAll('[data-remover-tv]').forEach(btn => {
    btn.addEventListener('click', () => {
      _rfTarefasIds = _rfTarefasIds.filter(x => x !== btn.dataset.removerTv);
      renderTarefasVinculadasModal();
    });
  });
}

function adicionarTarefaVinculadaNoModal(tid) {
  if (!_rfTarefasIds.includes(tid)) _rfTarefasIds.push(tid);
  renderTarefasVinculadasModal();
}

function abrirModalVincularTarefa() {
  const sel = $('#vt-select');
  if (!sel) return;
  const jaVinculadas = new Set(_rfTarefasIds);
  const disponiveis = tarefas.filter(t => t.status !== 'concluida' && !jaVinculadas.has(t.id));
  sel.innerHTML = disponiveis.length
    ? disponiveis.map(t => `<option value="${t.id}">${escapeHTML(t.titulo)}</option>`).join('')
    : '<option value="">Nenhuma tarefa disponível</option>';
  $('#dlg-vincular-tarefa').showModal();
}

// ---- Abrir modal de nova reunião ----
function abrirModalReuniaoNova(tarefasPreSelecionadas) {
  reuniaoEmEdicaoId = null;
  $('#dlg-reuniao-title').textContent = 'Nova reunião';
  $('#rf-titulo').value = '';
  $('#rf-data').value = hojeISO();
  $('#rf-hora').value = '';
  $('#rf-local').value = '';
  $('#rf-observacoes').value = '';
  _rfParticipantes = [];
  _rfTarefasIds = [...tarefasPreSelecionadas];
  renderChipsParticipantes();
  renderTarefasVinculadasModal();
  $('#dlg-reuniao').showModal();
}

// ---- Abrir modal de edição de reunião ----
function abrirModalReuniaoEditar(id) {
  const r = reunioes.find(x => x.id === id);
  if (!r) return;
  reuniaoEmEdicaoId = id;
  $('#dlg-reuniao-title').textContent = 'Editar reunião';
  $('#rf-titulo').value = r.titulo;
  $('#rf-data').value = r.data;
  $('#rf-hora').value = r.hora || '';
  $('#rf-local').value = r.local || '';
  $('#rf-observacoes').value = r.observacoes || '';
  _rfParticipantes = [...(r.participantes || [])];
  _rfTarefasIds = [...(r.tarefasIds || [])];
  renderChipsParticipantes();
  renderTarefasVinculadasModal();
  $('#dlg-reuniao').showModal();
}

// ---- Salvar reunião do modal ----
function salvarReuniaoDoModal() {
  const titulo = $('#rf-titulo').value.trim();
  const data = $('#rf-data').value;
  if (!titulo || !data) return;

  const agora = new Date().toISOString();
  if (reuniaoEmEdicaoId) {
    const r = reunioes.find(x => x.id === reuniaoEmEdicaoId);
    if (!r) return;
    r.titulo = titulo;
    r.data = data;
    r.hora = $('#rf-hora').value;
    r.local = $('#rf-local').value.trim();
    r.participantes = [..._rfParticipantes];
    r.tarefasIds = [..._rfTarefasIds];
    r.observacoes = $('#rf-observacoes').value.trim();
    r.atualizadaEm = agora;
  } else {
    const nova = {
      id: ruid(),
      titulo,
      data,
      hora: $('#rf-hora').value,
      local: $('#rf-local').value.trim(),
      participantes: [..._rfParticipantes],
      tarefasIds: [..._rfTarefasIds],
      encaminhamentos: {},
      resumoExecutivo: '',
      observacoes: $('#rf-observacoes').value.trim(),
      status: 'planejada',
      criadaEm: agora,
      atualizadaEm: agora,
      realizadaEm: null
    };
    reunioes.unshift(nova);
    reuniaoAtivaId = nova.id;
  }
  salvarReunioes();
  $('#dlg-reuniao').close();
  renderReunioes();
  if (reuniaoAtivaId) renderDetalheReuniao(reuniaoAtivaId);
}

// ---- Render lista de reuniões ----
function renderReunioes() {
  const filtro = $('#filtro-reuniao-status');
  const fStatus = filtro ? filtro.value : '';
  const lista = reunioes.filter(r => !fStatus || r.status === fStatus);
  const cont = $('#reunioes-lista');
  if (!cont) return;
  if (!lista.length) {
    cont.innerHTML = '<p class="muted">Nenhuma reunião encontrada.</p>';
    return;
  }
  cont.innerHTML = lista.map(r => {
    const statusLabel = { planejada: 'Planejada', realizada: 'Realizada', cancelada: 'Cancelada' }[r.status] || r.status;
    const statusClass = 'is-' + r.status;
    const ativa = r.id === reuniaoAtivaId ? ' is-active' : '';
    return `<div class="reuniao-item${ativa}" data-rid="${r.id}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px">
        <strong style="font-size:0.92rem">${escapeHTML(r.titulo)}</strong>
        <span class="reuniao-status ${statusClass}">${statusLabel}</span>
      </div>
      <div style="font-size:0.82rem;color:var(--text-3);margin-top:4px">${fmtData(r.data)}${r.hora ? ' &mdash; ' + escapeHTML(r.hora) : ''}</div>
      <div style="font-size:0.78rem;color:var(--text-3);margin-top:2px">${(r.tarefasIds || []).length} tarefa(s) vinculada(s)</div>
    </div>`;
  }).join('');
  cont.querySelectorAll('.reuniao-item').forEach(el => {
    el.addEventListener('click', () => {
      reuniaoAtivaId = el.dataset.rid;
      renderReunioes();
      renderDetalheReuniao(reuniaoAtivaId);
    });
  });
}

// ---- Render detalhe da reunião selecionada ----
function renderDetalheReuniao(id) {
  const r = reunioes.find(x => x.id === id);
  const ph = $('#reuniao-detalhe-placeholder');
  const cont = $('#reuniao-detalhe-conteudo');
  if (!r) {
    if (ph) ph.hidden = false;
    if (cont) cont.hidden = true;
    return;
  }
  if (ph) ph.hidden = true;
  if (!cont) return;
  cont.hidden = false;

  const statusLabel = { planejada: 'Planejada', realizada: 'Realizada', cancelada: 'Cancelada' }[r.status] || r.status;
  const statusClass = 'is-' + r.status;

  // Encaminhamentos atuais (ou vazio)
  const enc = r.encaminhamentos || {};

  // Pendentes consolidados
  const pendentesHTML = gerarPendentesHTML(r);

  // Tarefas tratadas
  const tarefasHTML = (r.tarefasIds || []).map((tid, idx) => {
    const t = tarefas.find(x => x.id === tid);
    if (!t) return '';
    const e = enc[tid] || {};
    const obj = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
    const q = quadranteDe(t);
    return `<div class="encaminhamento-card" data-etid="${tid}">
      <h4>${escapeHTML(t.titulo)}</h4>
      <div class="meta">
        ${obj ? `OE ${obj.id} — ${escapeHTML(obj.curto)} &nbsp;&middot;&nbsp; ` : ''}Quadrante: ${QUADRANTES[q].nome}
        ${t.responsavel ? ` &nbsp;&middot;&nbsp; Responsável: <strong>${escapeHTML(t.responsavel)}</strong>` : ''}
        ${t.prazo ? ` &nbsp;&middot;&nbsp; Prazo: <strong>${fmtData(t.prazo)}</strong>` : ''}
      </div>
      <label>Decisão da reunião</label>
      <textarea rows="2" data-enc-field="decisao" data-enc-tid="${tid}" maxlength="500">${escapeHTML(e.decisao || '')}</textarea>
      <label>Próximo passo</label>
      <textarea rows="2" data-enc-field="proximoPasso" data-enc-tid="${tid}" maxlength="500">${escapeHTML(e.proximoPasso || '')}</textarea>
      <label>Novo responsável (opcional)</label>
      <input type="text" data-enc-field="novoResponsavel" data-enc-tid="${tid}" value="${escapeHTML(e.novoResponsavel || '')}" maxlength="120" />
      <label>Novo prazo (opcional)</label>
      <input type="date" data-enc-field="novoPrazo" data-enc-tid="${tid}" value="${escapeHTML(e.novoPrazo || '')}" />
      <div style="margin-top:10px">
        <button class="btn btn--ghost btn--sm" data-aplicar-enc="${tid}">Aplicar mudanças à tarefa</button>
      </div>
    </div>`;
  }).join('');

  cont.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      <div>
        <h2 style="margin-bottom:4px">${escapeHTML(r.titulo)}</h2>
        <div style="font-size:0.88rem;color:var(--text-2)">
          ${fmtDataExtenso(r.data)}${r.hora ? ' às ' + escapeHTML(r.hora) : ''}
          ${r.local ? ' &mdash; ' + escapeHTML(r.local) : ''}
        </div>
        <div style="font-size:0.85rem;color:var(--text-2);margin-top:4px">
          Participantes: ${(r.participantes || []).length ? r.participantes.map(p => escapeHTML(p)).join(', ') : '<em>não informados</em>'}
        </div>
        <div style="margin-top:6px">
          <span class="reuniao-status ${statusClass}">${statusLabel}</span>
          <select id="detalhe-status-sel" style="margin-left:8px;width:auto;display:inline-block;padding:4px 28px 4px 8px;font-size:0.82rem">
            <option value="planejada" ${r.status === 'planejada' ? 'selected' : ''}>Planejada</option>
            <option value="realizada" ${r.status === 'realizada' ? 'selected' : ''}>Realizada</option>
            <option value="cancelada" ${r.status === 'cancelada' ? 'selected' : ''}>Cancelada</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn btn--ghost btn--sm" data-editar-reuniao="${r.id}">Editar</button>
        <button class="btn btn--danger btn--sm" data-excluir-reuniao="${r.id}">Excluir</button>
      </div>
    </div>

    <hr style="border:none;border-top:1px solid var(--border);margin:12px 0">

    <h3 style="margin-bottom:8px">Resumo executivo</h3>
    <textarea id="detalhe-resumo" rows="3" style="width:100%;margin-bottom:6px" maxlength="1000">${escapeHTML(r.resumoExecutivo || '')}</textarea>
    <button class="btn btn--ghost btn--sm" id="btn-gerar-resumo">Gerar automaticamente</button>

    <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

    <h3 style="margin-bottom:8px">Tarefas tratadas (${(r.tarefasIds || []).length})</h3>
    <div id="detalhe-tarefas-enc">${tarefasHTML || '<p class="muted">Nenhuma tarefa vinculada.</p>'}</div>

    <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

    <h3 style="margin-bottom:8px">Pendentes consolidados</h3>
    <div id="detalhe-pendentes">${pendentesHTML}</div>

    <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

    <h3 style="margin-bottom:8px">Observações</h3>
    <textarea id="detalhe-obs" rows="3" style="width:100%" maxlength="1000">${escapeHTML(r.observacoes || '')}</textarea>
    <div style="margin-top:6px">
      <button class="btn btn--ghost btn--sm" id="btn-salvar-obs">Salvar observações e resumo</button>
    </div>

    <div class="ata-acoes">
      <button class="btn btn--primary btn--sm" id="btn-marcar-realizada">Marcar como realizada</button>
      <button class="btn btn--ghost btn--sm" id="btn-gerar-ata">Gerar ata</button>
      <button class="btn btn--ghost btn--sm" id="btn-copiar-ata">Copiar ata</button>
      <button class="btn btn--ghost btn--sm" id="btn-pdf-ata">PDF da ata</button>
      <button class="btn btn--ghost btn--sm" id="btn-email-ata">Enviar por e-mail</button>
    </div>
  `;

  bindDetalheReuniaoEventos(r.id);
}

function bindDetalheReuniaoEventos(id) {
  const r = reunioes.find(x => x.id === id);
  if (!r) return;

  // Trocar status
  const statusSel = $('#detalhe-status-sel');
  if (statusSel) {
    statusSel.addEventListener('change', () => {
      r.status = statusSel.value;
      if (r.status === 'realizada' && !r.realizadaEm) r.realizadaEm = new Date().toISOString();
      r.atualizadaEm = new Date().toISOString();
      salvarReunioes();
      renderReunioes();
      renderDetalheReuniao(id);
    });
  }

  // Editar
  const btnEditar = $(`[data-editar-reuniao="${id}"]`);
  if (btnEditar) btnEditar.addEventListener('click', () => abrirModalReuniaoEditar(id));

  // Excluir
  const btnExcluir = $(`[data-excluir-reuniao="${id}"]`);
  if (btnExcluir) {
    btnExcluir.addEventListener('click', async () => {
      const ok = await confirmar('Excluir reunião?', `"${r.titulo}" será removida permanentemente.`);
      if (!ok) return;
      reunioes = reunioes.filter(x => x.id !== id);
      reuniaoAtivaId = null;
      salvarReunioes();
      renderReunioes();
      const ph = $('#reuniao-detalhe-placeholder');
      const cont = $('#reuniao-detalhe-conteudo');
      if (ph) ph.hidden = false;
      if (cont) cont.hidden = true;
    });
  }

  // Gerar resumo automático
  const btnResumo = $('#btn-gerar-resumo');
  if (btnResumo) {
    btnResumo.addEventListener('click', () => {
      const textarea = $('#detalhe-resumo');
      if (textarea) textarea.value = gerarResumoAutomatico(r);
    });
  }

  // Salvar observações e resumo
  const btnSalvarObs = $('#btn-salvar-obs');
  if (btnSalvarObs) {
    btnSalvarObs.addEventListener('click', () => {
      r.observacoes = ($('#detalhe-obs') || {}).value || '';
      r.resumoExecutivo = ($('#detalhe-resumo') || {}).value || '';
      r.atualizadaEm = new Date().toISOString();
      salvarReunioes();
      mostrarFlash('Salvo.');
    });
  }

  // Campos de encaminhamento (input/textarea: salva ao sair)
  $$('[data-enc-field]').forEach(el => {
    el.addEventListener('change', () => {
      const tid = el.dataset.encTid;
      const field = el.dataset.encField;
      if (!r.encaminhamentos) r.encaminhamentos = {};
      if (!r.encaminhamentos[tid]) r.encaminhamentos[tid] = {};
      r.encaminhamentos[tid][field] = el.value.trim();
      r.atualizadaEm = new Date().toISOString();
      salvarReunioes();
    });
  });

  // Aplicar mudanças à tarefa
  $$('[data-aplicar-enc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tid = btn.dataset.aplicarEnc;
      const t = tarefas.find(x => x.id === tid);
      if (!t) return;
      const e = (r.encaminhamentos || {})[tid] || {};
      if (e.novoResponsavel) t.responsavel = e.novoResponsavel;
      if (e.novoPrazo) t.prazo = e.novoPrazo;
      t.atualizadaEm = new Date().toISOString();
      salvarTarefas();
      renderTudo();
      mostrarFlash('Tarefa atualizada.');
    });
  });

  // Marcar como realizada
  const btnRealizada = $('#btn-marcar-realizada');
  if (btnRealizada) {
    btnRealizada.addEventListener('click', () => {
      r.status = 'realizada';
      r.realizadaEm = r.realizadaEm || new Date().toISOString();
      r.atualizadaEm = new Date().toISOString();
      salvarReunioes();
      renderReunioes();
      renderDetalheReuniao(id);
    });
  }

  // Gerar ata (visualizar em alert por ora — pode ser expandido)
  const btnGerarAta = $('#btn-gerar-ata');
  if (btnGerarAta) {
    btnGerarAta.addEventListener('click', () => {
      // Salva observações e resumo antes de gerar
      r.observacoes = ($('#detalhe-obs') || {}).value || r.observacoes;
      r.resumoExecutivo = ($('#detalhe-resumo') || {}).value || r.resumoExecutivo;
      salvarReunioes();
      const ata = gerarAtaTexto(r);
      mostrarAtaModal(ata, r);
    });
  }

  // Copiar ata
  const btnCopiarAta = $('#btn-copiar-ata');
  if (btnCopiarAta) {
    btnCopiarAta.addEventListener('click', () => {
      r.observacoes = ($('#detalhe-obs') || {}).value || r.observacoes;
      r.resumoExecutivo = ($('#detalhe-resumo') || {}).value || r.resumoExecutivo;
      salvarReunioes();
      navigator.clipboard.writeText(gerarAtaTexto(r));
      mostrarFlash('Ata copiada.');
    });
  }

  // PDF da ata
  const btnPdfAta = $('#btn-pdf-ata');
  if (btnPdfAta) {
    btnPdfAta.addEventListener('click', () => {
      r.observacoes = ($('#detalhe-obs') || {}).value || r.observacoes;
      r.resumoExecutivo = ($('#detalhe-resumo') || {}).value || r.resumoExecutivo;
      salvarReunioes();
      exportarAtaPDF(r);
    });
  }

  // Enviar por e-mail
  const btnEmailAta = $('#btn-email-ata');
  if (btnEmailAta) {
    btnEmailAta.addEventListener('click', () => {
      r.observacoes = ($('#detalhe-obs') || {}).value || r.observacoes;
      r.resumoExecutivo = ($('#detalhe-resumo') || {}).value || r.resumoExecutivo;
      salvarReunioes();
      const assunto = encodeURIComponent(`Ata — ${r.titulo}`);
      const corpo = gerarAtaTexto(r).slice(0, 1800);
      window.location.href = `mailto:?subject=${assunto}&body=${encodeURIComponent(corpo)}`;
    });
  }
}

function gerarPendentesHTML(r) {
  const porResp = {};
  (r.tarefasIds || []).forEach(tid => {
    const t = tarefas.find(x => x.id === tid);
    if (!t || t.status === 'concluida') return;
    const e = (r.encaminhamentos || {})[tid] || {};
    const resp = e.novoResponsavel || t.responsavel || 'Sem responsável';
    if (!porResp[resp]) porResp[resp] = [];
    porResp[resp].push(t.titulo);
  });
  if (!Object.keys(porResp).length) return '<p class="muted">Nenhuma pendência registrada.</p>';
  return Object.entries(porResp).map(([resp, lista]) =>
    `<div style="margin-bottom:8px"><strong>${escapeHTML(resp)}</strong><ul style="margin:4px 0 0 16px;padding:0;font-size:0.88rem;color:var(--text-2)">${lista.map(t => `<li>${escapeHTML(t)}</li>`).join('')}</ul></div>`
  ).join('');
}

// ---- Modal simples para exibir ata ----
function mostrarAtaModal(texto, r) {
  // Reutiliza dlg-rev para exibir a ata gerada
  const dlg = $('#dlg-rev');
  if (!dlg) { alert(texto); return; }
  $('#rev-detail-title').textContent = `Ata — ${r.titulo}`;
  $('#rev-detail-body').innerHTML = `<pre style="white-space:pre-wrap;font-size:0.82rem;font-family:inherit;line-height:1.5">${escapeHTML(texto)}</pre>`;
  dlg.showModal();
}

// ---- Gerar ata em texto ----
function gerarAtaTexto(r) {
  const linhas = [];
  linhas.push('ATA DE REUNIÃO');
  linhas.push('');
  linhas.push(`Título: ${r.titulo}`);
  linhas.push(`Data: ${fmtDataExtenso(r.data)}${r.hora ? ' às ' + r.hora : ''}`);
  if (r.local) linhas.push(`Local: ${r.local}`);
  linhas.push(`Participantes: ${(r.participantes || []).join(', ') || '—'}`);
  linhas.push('');
  linhas.push('\u2550\u2550\u2550 RESUMO EXECUTIVO \u2550\u2550\u2550');
  linhas.push('');
  linhas.push(r.resumoExecutivo || '—');
  linhas.push('');
  linhas.push('\u2550\u2550\u2550 TAREFAS TRATADAS \u2550\u2550\u2550');
  linhas.push('');
  (r.tarefasIds || []).forEach((tid, idx) => {
    const t = tarefas.find(x => x.id === tid);
    if (!t) return;
    const e = (r.encaminhamentos || {})[tid] || {};
    const obj = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
    const q = quadranteDe(t);
    linhas.push(`${idx + 1}. ${t.titulo}`);
    if (obj) linhas.push(`   Vínculo estratégico: OE ${obj.id} — ${obj.curto}`);
    linhas.push(`   Quadrante: ${QUADRANTES[q].nome}`);
    if (t.responsavel) linhas.push(`   Responsável: ${t.responsavel}`);
    if (t.prazo) linhas.push(`   Prazo: ${fmtDataExtenso(t.prazo)}`);
    if (e.decisao) linhas.push(`   Decisão: ${e.decisao}`);
    if (e.proximoPasso) linhas.push(`   Próximo passo: ${e.proximoPasso}`);
    const att = [];
    if (e.novoResponsavel) att.push(`novo responsável: ${e.novoResponsavel}`);
    if (e.novoPrazo) att.push(`novo prazo: ${fmtDataExtenso(e.novoPrazo)}`);
    if (att.length) linhas.push(`   Atualizações: ${att.join('; ')}.`);
    linhas.push('');
  });
  linhas.push('\u2550\u2550\u2550 PENDENTES CONSOLIDADOS \u2550\u2550\u2550');
  linhas.push('');
  const porResp = {};
  (r.tarefasIds || []).forEach(tid => {
    const t = tarefas.find(x => x.id === tid);
    if (!t || t.status === 'concluida') return;
    const e = (r.encaminhamentos || {})[tid] || {};
    const resp = e.novoResponsavel || t.responsavel || 'Sem responsável';
    if (!porResp[resp]) porResp[resp] = [];
    porResp[resp].push(t.titulo);
  });
  if (Object.keys(porResp).length) {
    linhas.push('Por responsável:');
    Object.entries(porResp).forEach(([resp, lista]) => {
      linhas.push(`• ${resp}: ${lista.join(', ')}`);
    });
  } else {
    linhas.push('Nenhuma pendência registrada.');
  }
  linhas.push('');
  if (r.observacoes) {
    linhas.push('\u2550\u2550\u2550 OBSERVAÇÕES \u2550\u2550\u2550');
    linhas.push('');
    linhas.push(r.observacoes);
    linhas.push('');
  }
  linhas.push('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  linhas.push(`Ata registrada em ${fmtDataExtenso(hojeISO())} no aplicativo Tarefas Estratégicas Cebraspe.`);
  return linhas.join('\n');
}

// ---- Gerar resumo executivo automático ----
function gerarResumoAutomatico(r) {
  const tarefasObj = (r.tarefasIds || []).map(tid => tarefas.find(x => x.id === tid)).filter(Boolean);
  if (!tarefasObj.length) {
    return `Reunião realizada em ${fmtDataExtenso(r.data)}${r.hora ? ' às ' + r.hora : ''}. Não houve demandas vinculadas.`;
  }
  const oesDistintos = [...new Set(tarefasObj.map(t => t.oeId).filter(Boolean))]
    .map(id => OBJETIVOS.find(o => o.id === id))
    .filter(Boolean)
    .map(o => `OE ${o.id}`);
  const participantes = (r.participantes || []).join(', ') || 'sem registro de participantes';
  const decisoes = tarefasObj
    .map(t => (r.encaminhamentos || {})[t.id]?.decisao)
    .filter(Boolean);
  const pendentes = tarefasObj.filter(t => t.status !== 'concluida').length;

  let resumo = `Reunião realizada em ${fmtDataExtenso(r.data)}${r.hora ? ' às ' + r.hora : ''}, com a participação de ${participantes}. `;
  resumo += `Foram tratadas ${tarefasObj.length} demanda(s)`;
  if (oesDistintos.length) resumo += `, vinculadas a ${oesDistintos.join(', ')}`;
  resumo += `. `;
  if (decisoes.length) {
    resumo += `Principais decisões: ${decisoes.slice(0, 3).join('; ')}. `;
  }
  resumo += `Permanecem ${pendentes} pendência(s) em acompanhamento.`;
  return resumo;
}

// ---- Exportar ata em PDF ----
function exportarAtaPDF(r) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 50;
  const usableW = pageW - margin * 2;
  let y = margin;

  function escreverLinha(texto, opts) {
    const { bold = false, size = 11, espacoApos = 4, indent = 0 } = opts || {};
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    const linhas = doc.splitTextToSize(String(texto || ''), usableW - indent);
    for (const ln of linhas) {
      if (y + size + 2 > pageH - margin) { doc.addPage(); y = margin; }
      doc.text(ln, margin + indent, y);
      y += size + 2;
    }
    y += espacoApos;
  }

  function separador() {
    if (y + 12 > pageH - margin) { doc.addPage(); y = margin; }
    doc.setDrawColor(180);
    doc.line(margin, y, pageW - margin, y);
    y += 14;
  }

  // Cabeçalho
  doc.setTextColor(0);
  escreverLinha('ATA DE REUNIÃO', { bold: true, size: 16, espacoApos: 10 });
  separador();
  escreverLinha(`Título: ${r.titulo}`, { bold: true, size: 12 });
  escreverLinha(`Data: ${fmtDataExtenso(r.data)}${r.hora ? ' às ' + r.hora : ''}`);
  if (r.local) escreverLinha(`Local: ${r.local}`);
  escreverLinha(`Participantes: ${(r.participantes || []).join(', ') || '—'}`);
  separador();

  // Resumo
  escreverLinha('Resumo executivo', { bold: true, size: 13, espacoApos: 6 });
  escreverLinha(r.resumoExecutivo || '—');
  separador();

  // Tarefas
  escreverLinha('Tarefas tratadas', { bold: true, size: 13, espacoApos: 6 });
  (r.tarefasIds || []).forEach((tid, idx) => {
    const t = tarefas.find(x => x.id === tid);
    if (!t) return;
    const enc = (r.encaminhamentos || {})[tid] || {};
    const oe = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
    escreverLinha(`${idx + 1}. ${t.titulo}`, { bold: true, size: 12, espacoApos: 4 });
    if (oe) escreverLinha(`Vínculo estratégico: OE ${oe.id} — ${oe.curto}`, { indent: 14 });
    escreverLinha(`Quadrante: ${QUADRANTES[quadranteDe(t)].nome}`, { indent: 14 });
    if (t.responsavel) escreverLinha(`Responsável: ${t.responsavel}`, { indent: 14 });
    if (t.prazo) escreverLinha(`Prazo: ${fmtDataExtenso(t.prazo)}`, { indent: 14 });
    if (enc.decisao) escreverLinha(`Decisão: ${enc.decisao}`, { indent: 14 });
    if (enc.proximoPasso) escreverLinha(`Próximo passo: ${enc.proximoPasso}`, { indent: 14 });
    if (enc.novoResponsavel || enc.novoPrazo) {
      const att = [];
      if (enc.novoResponsavel) att.push(`novo responsável: ${enc.novoResponsavel}`);
      if (enc.novoPrazo) att.push(`novo prazo: ${fmtDataExtenso(enc.novoPrazo)}`);
      escreverLinha(`Atualizações: ${att.join('; ')}.`, { indent: 14 });
    }
    y += 6;
  });
  separador();

  // Pendentes consolidados
  escreverLinha('Pendentes consolidados', { bold: true, size: 13, espacoApos: 6 });
  const porResp = {};
  (r.tarefasIds || []).forEach(tid => {
    const t = tarefas.find(x => x.id === tid);
    if (!t || t.status === 'concluida') return;
    const enc = (r.encaminhamentos || {})[tid] || {};
    const resp = enc.novoResponsavel || t.responsavel || 'Sem responsável';
    if (!porResp[resp]) porResp[resp] = [];
    porResp[resp].push(t.titulo);
  });
  Object.entries(porResp).forEach(([resp, lista]) => {
    escreverLinha(`• ${resp}:`, { bold: true });
    lista.forEach(tt => escreverLinha(`   – ${tt}`));
  });
  if (!Object.keys(porResp).length) escreverLinha('Nenhuma pendência registrada.');
  separador();

  if (r.observacoes) {
    escreverLinha('Observações', { bold: true, size: 13, espacoApos: 6 });
    escreverLinha(r.observacoes);
  }

  doc.setFontSize(9);
  doc.setTextColor(120);
  if (y + 30 > pageH - margin) { doc.addPage(); y = margin; }
  doc.text(`Ata registrada em ${fmtDataExtenso(hojeISO())} no aplicativo Tarefas Estratégicas Cebraspe.`, margin, pageH - 30);

  doc.save(`ata_${r.id}.pdf`);
}

/* ===================================================================
   18. SEGURANÇA (senha + criptografia local)
   =================================================================== */

function bindLockDialog() {
  const dlg = $('#dlg-lock');
  if (!dlg) return;

  // Bloqueia ESC e clique fora — não permite fechar sem agir
  dlg.addEventListener('cancel', e => e.preventDefault());

  // ----- Setup (cadastro) -----
  const formSetup = $('#lock-setup-form');
  if (formSetup) {
    formSetup.addEventListener('submit', async e => {
      e.preventDefault();
      const p1 = $('#lock-setup-pwd').value;
      const p2 = $('#lock-setup-pwd2').value;
      const msg = $('#lock-setup-msg');
      msg.classList.remove('error');
      if (p1.length < 6) { msg.textContent = 'A senha precisa ter ao menos 6 caracteres.'; msg.classList.add('error'); return; }
      if (p1 !== p2) { msg.textContent = 'As senhas não conferem.'; msg.classList.add('error'); return; }
      msg.textContent = 'Cadastrando...';
      try {
        await window.Sec.setup(p1);
        msg.textContent = 'Senha cadastrada.';
        $('#lock-setup-pwd').value = '';
        $('#lock-setup-pwd2').value = '';
        dlg.close();
        // Inicializa o app pela primeira vez ou apenas recarrega após cadastro tardio
        if (!window.__appInited) {
          window.__appInited = true;
          initApp();
        } else {
          carregarTarefas(); carregarRevisoes(); carregarReunioes(); carregarConfig();
          renderTudo();
          atualizarStatusSeguranca();
        }
      } catch (err) {
        msg.textContent = 'Erro ao cadastrar: ' + (err.message || err);
        msg.classList.add('error');
      }
    });
  }

  // ----- Unlock (desbloqueio) -----
  const formUnlock = $('#lock-unlock-form');
  if (formUnlock) {
    formUnlock.addEventListener('submit', async e => {
      e.preventDefault();
      const senha = $('#lock-unlock-pwd').value;
      const msg = $('#lock-unlock-msg');
      msg.classList.remove('error');
      msg.textContent = 'Verificando...';
      try {
        const ok = await window.Sec.unlock(senha);
        if (!ok) {
          msg.textContent = 'Senha incorreta.';
          msg.classList.add('error');
          $('#lock-unlock-pwd').select();
          return;
        }
        msg.textContent = '';
        $('#lock-unlock-pwd').value = '';
        dlg.close();
        // Inicializa a aplicação pela primeira vez ou apenas recarrega após desbloqueio
        if (!window.__appInited) {
          window.__appInited = true;
          initApp();
        } else {
          carregarTarefas(); carregarRevisoes(); carregarReunioes(); carregarConfig();
          renderTudo();
          atualizarStatusSeguranca();
        }
      } catch (err) {
        msg.textContent = 'Erro: ' + (err.message || err);
        msg.classList.add('error');
      }
    });
  }
  const btnForget = $('#lock-unlock-forget');
  if (btnForget) {
    btnForget.addEventListener('click', async () => {
      const ok = await confirmar(
        'Apagar todos os dados?',
        'Sem a senha não há como recuperar os dados. Esta ação apaga TODAS as tarefas, revisões, reuniões e a senha deste navegador. Não tem volta. Deseja continuar?'
      );
      if (!ok) return;
      window.Sec.reset();
      location.reload();
    });
  }

  // ----- Trocar senha -----
  const formChange = $('#lock-change-form');
  if (formChange) {
    formChange.addEventListener('submit', async e => {
      e.preventDefault();
      const p1 = $('#lock-change-pwd').value;
      const p2 = $('#lock-change-pwd2').value;
      const msg = $('#lock-change-msg');
      msg.classList.remove('error');
      if (p1.length < 6) { msg.textContent = 'A nova senha precisa ter ao menos 6 caracteres.'; msg.classList.add('error'); return; }
      if (p1 !== p2) { msg.textContent = 'As senhas não conferem.'; msg.classList.add('error'); return; }
      msg.textContent = 'Reencriptando...';
      try {
        await window.Sec.changePassword(p1);
        msg.textContent = 'Senha trocada.';
        $('#lock-change-pwd').value = '';
        $('#lock-change-pwd2').value = '';
        setTimeout(() => dlg.close(), 600);
        atualizarStatusSeguranca();
      } catch (err) {
        msg.textContent = 'Erro: ' + (err.message || err);
        msg.classList.add('error');
      }
    });
  }
  const btnChangeCancel = $('#lock-change-cancel');
  if (btnChangeCancel) {
    btnChangeCancel.addEventListener('click', () => $('#dlg-lock').close());
  }
}

function _lockShowMode(modo) {
  // modo: 'setup' | 'unlock' | 'change'
  ['setup', 'unlock', 'change'].forEach(m => {
    const el = document.getElementById('lock-' + m);
    if (el) el.hidden = (m !== modo);
  });
  // limpa mensagens
  ['lock-setup-msg', 'lock-unlock-msg', 'lock-change-msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.classList.remove('error'); }
  });
}

function abrirLockSetup() {
  const dlg = $('#dlg-lock');
  if (!dlg) return;
  _lockShowMode('setup');
  $('#lock-setup-pwd').value = '';
  $('#lock-setup-pwd2').value = '';
  if (!dlg.open) dlg.showModal();
  setTimeout(() => $('#lock-setup-pwd').focus(), 50);
}

function abrirLockUnlock() {
  const dlg = $('#dlg-lock');
  if (!dlg) return;
  _lockShowMode('unlock');
  $('#lock-unlock-pwd').value = '';
  if (!dlg.open) dlg.showModal();
  setTimeout(() => $('#lock-unlock-pwd').focus(), 50);
}

function abrirLockChange() {
  const dlg = $('#dlg-lock');
  if (!dlg) return;
  _lockShowMode('change');
  $('#lock-change-pwd').value = '';
  $('#lock-change-pwd2').value = '';
  if (!dlg.open) dlg.showModal();
  setTimeout(() => $('#lock-change-pwd').focus(), 50);
}

function bindSecurityConfig() {
  const btnTrocar = $('#btn-sec-trocar');
  const btnBloquear = $('#btn-sec-bloquear');
  const btnApagar = $('#btn-sec-apagar');

  // Modo Firebase: cadeado local desativado.
  if (!window.Sec) {
    if (btnTrocar) btnTrocar.hidden = true;
    if (btnBloquear) btnBloquear.hidden = true;
    if (btnApagar) btnApagar.hidden = true;
    return;
  }

  if (btnTrocar) btnTrocar.addEventListener('click', abrirLockChange);
  if (btnBloquear) btnBloquear.addEventListener('click', () => {
    if (!window.Sec.isEnabled()) return;
    window.Sec.lock();
    // Força recarregar a tela de unlock
    location.reload();
  });
  if (btnApagar) btnApagar.addEventListener('click', async () => {
    const ok = await confirmar(
      'Apagar todos os dados?',
      'Esta ação apaga TODAS as tarefas, revisões, reuniões e a senha deste navegador. Não tem volta. Faça backup com Exportar JSON antes, se quiser preservar os dados. Deseja continuar?'
    );
    if (!ok) return;
    window.Sec.reset();
    location.reload();
  });
}

function atualizarStatusSeguranca() {
  const status = $('#sec-status');
  const btnTrocar = $('#btn-sec-trocar');
  const btnBloquear = $('#btn-sec-bloquear');
  const btnApagar = $('#btn-sec-apagar');
  if (!status) return;

  // Modo Firebase: autenticação via nuvem (Google Firebase Auth).
  if (!window.Sec) {
    const email = (window.firebase && window.firebase.auth && window.firebase.auth().currentUser && window.firebase.auth().currentUser.email) || '';
    status.textContent = 'Login em nuvem ativo' + (email ? ' (' + email + ')' : '') + '. Dados sincronizados no Firebase Firestore.';
    status.classList.add('is-on'); status.classList.remove('is-off');
    if (btnTrocar) btnTrocar.hidden = true;
    if (btnBloquear) btnBloquear.hidden = true;
    if (btnApagar) btnApagar.hidden = true;
    return;
  }

  // Senha agora é sempre obrigatória — quando este código roda, ela já está ativa.
  status.textContent = 'Senha ativa. Os dados deste navegador estão criptografados (AES-GCM 256, PBKDF2 200k).';
  status.classList.add('is-on'); status.classList.remove('is-off');
  if (btnTrocar) btnTrocar.hidden = false;
  if (btnBloquear) btnBloquear.hidden = false;
  if (btnApagar) btnApagar.hidden = false;
}

/* ===================================================================
   19. BOOTSTRAP
   =================================================================== */

window.__appInited = false;
// expõe funções para o firebase-sync.js (login + sync da equipe)
window.init = init;
window.initApp = initApp;
window._read = _read;
window._write = _write;
window.carregarTarefas = carregarTarefas;
window.carregarRevisoes = carregarRevisoes;
window.carregarReunioes = carregarReunioes;
window.carregarConfig = carregarConfig;
window.renderTudo = renderTudo;
// para o módulo quick-capture.js
window.salvarTarefas = salvarTarefas;
window.popularResponsaveis = popularResponsaveis;
window.uid = uid;
Object.defineProperty(window, 'tarefas', {
  get(){ return tarefas; },
  set(v){ tarefas = v; }
});
document.addEventListener('DOMContentLoaded', function () {
  // Se firebase-sync já marcou que assumiu o boot, não chama init.
  if (window.__firebaseSyncActive) return;
  // chama via window.init para permitir que firebase-sync interfira se necessário
  (window.init || init)();
});
