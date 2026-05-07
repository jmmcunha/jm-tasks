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

// Taxonomia da Camila (Leva 7) — quadrantes redefinidos pela natureza do trabalho
// de liderança, em vez da matriz Eisenhower clássica.
const QUADRANTES = {
  Q1: {
    id: 'Q1',
    nome: 'Crise e Contenção',
    postura: 'decidir rápido e reduzir danos',
    cor: '#c0392b', bg: '#fdecea',
    natureza: ['Alto impacto', 'Alta urgência', 'Pouca margem de escolha'],
    exemplos: ['Crise institucional', 'Conflitos graves', 'Prazos legais iminentes', 'Falhas críticas de execução', 'Exposição política ou administrativa'],
    papel: ['Decidir rápido', 'Reduzir danos', 'Proteger pessoas, resultados e imagem'],
  },
  Q2: {
    id: 'Q2',
    nome: 'Estratégia Direcional',
    postura: 'pensar o futuro e fazer escolhas',
    cor: '#0a3d7a', bg: '#e8f0fb',
    natureza: ['Alto impacto', 'Baixa urgência imediata', 'Exige reflexão e visão sistêmica'],
    exemplos: ['Definição de prioridades estratégicas', 'Redesenho de políticas, processos ou programas', 'Pactuação de diretrizes', 'Planejamento, metas, indicadores', 'Avaliação de cenários'],
    papel: ['Escolher o que NÃO será feito', 'Direcionar recursos e esforços', 'Dar sentido e coerência às ações'],
    nota: 'Aqui nasce a estratégia — mas ela ainda não está em ação.',
  },
  Q3: {
    id: 'Q3',
    nome: 'Deliberação Estratégica Operacional',
    postura: 'traduzir estratégia em decisão concreta',
    cor: '#0e7c66', bg: '#e6f4ef',
    natureza: ['Impacto estratégico indireto', 'Urgência média', 'Forte carga decisória e relacional'],
    exemplos: ['Reuniões decisórias (não informativas)', 'Despachos', 'Pactuação de encaminhamentos', 'Priorização de demandas', 'Autorizações, validações, ajustes de rota', 'Alinhamento entre áreas'],
    papel: ['Traduzir diretrizes em decisões práticas', 'Resolver ambiguidades', 'Garantir coerência entre estratégia e ação', 'Dar fluidez ao sistema'],
    nota: 'Q3 é governança.',
  },
  Q4: {
    id: 'Q4',
    nome: 'Sustentação Operacional',
    postura: 'delegar e proteger a agenda',
    cor: '#7f8c8d', bg: '#eef0f1',
    natureza: ['Baixo impacto estratégico isolado', 'Alta frequência', 'Necessária para a organização não travar'],
    exemplos: ['Demandas rotineiras', 'Acompanhamentos simples', 'Checagens de status', 'Atendimentos rápidos'],
    papel: ['Delegar sempre que possível', 'Criar padrões e rotinas', 'Evitar que o Q4 engula Q2 e Q3'],
    nota: 'Q4 não é trivial — é estrutural, mas não pode dominar a agenda.',
  },
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
  meuNome: 'João Marcelo Marques Cunha',
  meuCargo: 'Diretor-Executivo',
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

// Converte um código de quadrante (Q1–Q4 ou NC) em par {importante, urgente}.
// NC -> {null, null}.
function quadranteParaImpUrg(q) {
  switch (q) {
    case 'Q1': return { importante: true,  urgente: true  };
    case 'Q2': return { importante: true,  urgente: false };
    case 'Q3': return { importante: false, urgente: true  };
    case 'Q4': return { importante: false, urgente: false };
    default:   return { importante: null,  urgente: null  };
  }
}

// Sugere quadrante a partir do título + categoria (Leva 7).
// Retorna { quadrante: 'Q1'|'Q2'|'Q3'|'Q4', importante: bool, urgente: bool, motivo: string }
// ou null se não conseguir inferir com confiança.
function sugerirQuadrante(tarefa) {
  const titulo = (tarefa.titulo || '').toLowerCase();
  const resultado = (tarefa.resultado || '').toLowerCase();
  const texto = `${titulo} ${resultado}`;
  // ordem importa: padrões mais específicos primeiro
  // Q1 — crise, urgência legal, falha crítica
  if (/\bcrise\b|\bfalha cr[ií]tica\b|\burgent[ie]ssim[oa]\b|\bemerg[êée]nci[ao]\b|\bprazo legal\b|\bmandado\b|\bintima[cç]ão\b|\bauditori[ao] urgente\b|\bden[uú]ncia\b|\bauto de infra[cç]ão\b/.test(texto)) {
    return { quadrante: 'Q1', importante: true, urgente: true, motivo: 'contém termo de crise, urgência legal ou falha crítica' };
  }
  // Q3 — governança/deliberação (despacho, reunião decisória, alinhamento, autorização)
  if (/\bdespacho\b|\bdespachar\b|\breuni[ãa]o decis[oó]ria\b|\bpactu[a-z]+\b|\bautoriza[cç][aã]o\b|\bvalida[cç][aã]o\b|\bajuste de rota\b|\balinhamento\b|\balinhar\b|\bencaminhamento\b|\bprioriza[cç][aã]o\b|\bdelibera[cç][aã]o\b/.test(texto)) {
    return { quadrante: 'Q3', importante: false, urgente: true, motivo: 'governança/deliberação (despacho, alinhamento, autorização)' };
  }
  // Q2 — estratégia direcional (planejamento, redesenho, diretriz, cenário, indicador)
  if (/\bplanejamento\b|\bredesenho\b|\bdiretriz(?:es)?\b|\bpol[ií]tica\b|\bestrat[ée]gi[ao]\b|\bplano (?:diretor|estrat[ée]gico|de a[cç][aã]o)\b|\bcen[aá]rio\b|\bvis[aã]o\b|\bproposta estrutur(?:al|ante)\b|\bindicador(?:es)?\b|\bmeta(?:s)?\b/.test(texto)) {
    return { quadrante: 'Q2', importante: true, urgente: false, motivo: 'estratégia direcional (planejamento, diretriz, cenário)' };
  }
  // Q4 — rotina, acompanhamento simples, checagem, atendimento rápido
  if (/\brotina\b|\bacompanhamento\b|\bchecagem\b|\bcheck.?list\b|\batendimento\b|\brelat[oó]rio mensal\b|\binforme\b|\bcomunicado\b|\bnota informativa\b/.test(texto)) {
    return { quadrante: 'Q4', importante: false, urgente: false, motivo: 'rotina/acompanhamento (sustentação operacional)' };
  }
  // Heurísticas auxiliares (peso menor)
  if (/\bparecer\b|\bnota t[ée]cnica\b|\brelat[oó]rio\b|\bdocumento\b/.test(texto)) {
    return { quadrante: 'Q3', importante: false, urgente: true, motivo: 'documento de deliberação (parecer, nota técnica)' };
  }
  if (/\bedital\b|\blicita[cç][aã]o\b|\bcontrata[cç][aã]o\b|\btermo de refer[êée]ncia\b/.test(texto)) {
    return { quadrante: 'Q2', importante: true, urgente: false, motivo: 'instrumento estratégico (edital, TR)' };
  }
  return null;
}

// Aplica sugestão nas tarefas não classificadas; não sobrescreve classificação existente.
async function aplicarSugestoesQuadranteEmLote() {
  const ncs = tarefas.filter(t => quadranteDe(t) === 'NC');
  if (!ncs.length) {
    mostrarFlash('Não há tarefas não classificadas.');
    return;
  }
  const sugestoes = ncs.map(t => ({ t, s: sugerirQuadrante(t) })).filter(x => x.s);
  if (!sugestoes.length) {
    mostrarFlash('Nenhuma sugestão pôde ser inferida pelos títulos.');
    return;
  }
  const cont = { Q1:0, Q2:0, Q3:0, Q4:0 };
  for (const x of sugestoes) cont[x.s.quadrante]++;
  const linhas = [
    `Encontrei sugestão para ${sugestoes.length} de ${ncs.length} tarefa(s) não classificada(s):`,
    `• Q1 — Crise e Contenção: ${cont.Q1}`,
    `• Q2 — Estratégia Direcional: ${cont.Q2}`,
    `• Q3 — Deliberação Estratégica Operacional: ${cont.Q3}`,
    `• Q4 — Sustentação Operacional: ${cont.Q4}`,
    '',
    'Aplicar a classificação sugerida agora?'
  ];
  if (!confirm(linhas.join('\n'))) return;
  for (const { t, s } of sugestoes) {
    t.importante = s.importante;
    t.urgente = s.urgente;
  }
  salvarTarefas();
  renderTudo();
  mostrarFlash(`${sugestoes.length} tarefa(s) classificada(s) automaticamente.`);
}

function isAtrasada(t) {
  return t.prazo && t.status !== 'concluida' && t.prazo < hojeISO();
}

function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
    // Repopula hash anterior para que mudanças recebidas via Firestore
    // não sejam re-carimbadas como modificadas localmente.
    if (typeof _hashTarefa === 'function') {
      _tarefasHashAnterior = new Map(tarefas.map(t => [t.id, _hashTarefa(t)]));
    }
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

// Tombstones de tarefas excluídas: lista de { id, _del: timestamp }
// Mantidas para evitar que a sincronização de outra aba "ressuscite" tarefas apagadas.
const KEY_TAREFAS_TOMBSTONES = 'cebraspe_tarefas_v3_tombstones';
let tarefasTombstones = [];
function carregarTombstones() {
  tarefasTombstones = _read(KEY_TAREFAS_TOMBSTONES, []) || [];
  // Limpeza automática: descarta tombstones com mais de 30 dias
  const limite = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const antes = tarefasTombstones.length;
  tarefasTombstones = tarefasTombstones.filter(x => (x._del || 0) > limite);
  if (tarefasTombstones.length !== antes) _write(KEY_TAREFAS_TOMBSTONES, tarefasTombstones);
}
function salvarTombstones() { _write(KEY_TAREFAS_TOMBSTONES, tarefasTombstones); }
function adicionarTombstone(id) {
  const ts = Date.now();
  // Substitui se já existir tombstone do mesmo id (renova timestamp)
  tarefasTombstones = tarefasTombstones.filter(x => x.id !== id);
  tarefasTombstones.push({ id, _del: ts });
  salvarTombstones();
}

// Mapa id -> hash da última versão salva. Usado para detectar mudanças reais
// e carimbar _lwm apenas em tarefas que de fato mudaram.
let _tarefasHashAnterior = new Map();

function _hashTarefa(t) {
  // Hash leve: campos relevantes que justificam novo carimbo
  // (não inclui _lwm nem atualizadaEm para evitar loop).
  const campos = [
    t.titulo, t.descricao, t.responsavel, t.objetivo,
    t.importante ? 1 : 0, t.urgente ? 1 : 0,
    t.prazo, t.dataInicio, t.status, t.prioridade, t.resultado,
    Array.isArray(t.checklist) ? JSON.stringify(t.checklist) : '',
    Array.isArray(t.tags) ? t.tags.join('|') : ''
  ].join('\u241F');
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < campos.length; i++) {
    h ^= campos.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

// Carimba _lwm só nas tarefas que mudaram (ou são novas) desde o último salvar.
// Tarefas vindas do Firestore mantêm o _lwm original.
function _carimbarLWMSeNecessario() {
  const novoMapa = new Map();
  const agora = Date.now();
  for (const t of tarefas) {
    const hash = _hashTarefa(t);
    novoMapa.set(t.id, hash);
    const hashAntes = _tarefasHashAnterior.get(t.id);
    if (typeof t._lwm !== 'number') {
      // Primeira vez vendo essa tarefa nesta sessão: usa atualizadaEm/criadaEm como base.
      const base = t.atualizadaEm || t.criadaEm || null;
      const ms = base ? Date.parse(base) : 0;
      t._lwm = Number.isFinite(ms) && ms > 0 ? ms : agora;
    } else if (hashAntes !== undefined && hashAntes !== hash) {
      // Mudou de fato nesta sessão: carimba agora.
      t._lwm = agora;
      t.atualizadaEm = new Date(agora).toISOString();
    } else if (hashAntes === undefined) {
      // É nova nesta sessão (criada agora) e ainda não tem hash anterior.
      // Se _lwm é muito antigo (>60s), atualiza; senão respeita (veio do Firestore).
      if (agora - t._lwm > 60000 && !t.criadaEm) {
        t._lwm = agora;
      }
    }
  }
  _tarefasHashAnterior = novoMapa;
}

function salvarTarefas() {
  _carimbarLWMSeNecessario();
  _write(KEY_TAREFAS_V3, tarefas);
}
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
  carregarTombstones();
  // Popula hash anterior das tarefas carregadas para que _carimbarLWMSeNecessario
  // só marque novas mudanças como modificadas nesta sessão.
  _tarefasHashAnterior = new Map(tarefas.map(t => [t.id, _hashTarefa(t)]));
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
  bindEmail();
  bindEmailLote();
  bindPainelExportar();
  bindPainelRevisaoIA();
  bindConfigIA();
  bindBotoesIA();
  bindSobreQuadrantes();
  bindDrucker();
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
  const selQ = $('#f-quadrante');

  function atualizarPreviewQuad() {
    const q = selQ.value || 'NC';
    const chip = $('#quad-preview');
    chip.className = 'quad-chip quad-chip--' + q.toLowerCase();
    const info = QUADRANTES[q];
    chip.textContent = q === 'NC'
      ? `Não classificada · ${info.postura}`
      : `${q} — ${info.nome} · ${info.postura}`;
  }

  selQ.addEventListener('change', atualizarPreviewQuad);
  atualizarPreviewQuad();

  // Botão "Sobre os quadrantes" no formulário (delega para o modal já existente)
  const btnSobre = $('#btn-sobre-quadrantes-form');
  if (btnSobre) btnSobre.addEventListener('click', () => abrirSobreQuadrantes());

  form.addEventListener('submit', e => {
    e.preventDefault();
    const titulo = $('#f-titulo').value.trim();
    if (!titulo) { mostrarMsg('Preencha o título da tarefa.', true); return; }

    const id = $('#f-id').value || uid();
    const existente = tarefas.find(t => t.id === id);
    const par = quadranteParaImpUrg(selQ.value || 'NC');

    const tarefa = {
      id,
      titulo,
      oeId: $('#f-objetivo').value ? Number($('#f-objetivo').value) : null,
      importante: par.importante,
      urgente: par.urgente,
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
    selQ.value = 'NC';
    preencherDataInicioPadrao();
    atualizarPreviewQuad();
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
    selQ.value = 'NC';
    preencherDataInicioPadrao();
    atualizarPreviewQuad();
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
  const qAtual = quadranteDe(t);
  // limpa listeners prévios via clone
  const selQOld = $('#ef-quadrante');
  const selQNovo = selQOld.cloneNode(true);
  selQOld.replaceWith(selQNovo);
  const selQ = $('#ef-quadrante');
  selQ.value = qAtual;
  function upd() {
    const q = selQ.value || 'NC';
    const chip = $('#ef-quad-preview');
    chip.className = 'quad-chip quad-chip--' + q.toLowerCase();
    const info = QUADRANTES[q];
    chip.textContent = q === 'NC' ? `Não classificada · ${info.postura}` : `${q} — ${info.nome} · ${info.postura}`;
  }
  selQ.addEventListener('change', upd);
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
    const par = quadranteParaImpUrg($('#ef-quadrante').value || 'NC');
    t.titulo = $('#ef-titulo').value.trim() || t.titulo;
    t.oeId = $('#ef-objetivo').value ? Number($('#ef-objetivo').value) : null;
    t.importante = par.importante;
    t.urgente = par.urgente;
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
  $('#email-close').addEventListener('click', () => $('#dlg-email').close());
  const btnHistClose = $('#historico-close');
  if (btnHistClose) btnHistClose.addEventListener('click', () => $('#dlg-historico').close());
  $('#rev-detail-close').addEventListener('click', () => $('#dlg-rev').close());
}

async function excluirTarefa(id) {
  const t = tarefas.find(x => x.id === id); if (!t) return;
  const ok = await confirmar('Excluir tarefa?', `"${t.titulo}" será removida permanentemente.`);
  if (!ok) return;
  tarefas = tarefas.filter(x => x.id !== id);
  adicionarTombstone(id);
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
  ['#busca','#filtro-objetivo','#filtro-status','#filtro-quadrante','#ordenacao'].forEach(s => {
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

  let lista = tarefas.filter(t => {
    if (fObj && String(t.oeId) !== fObj) return false;
    if (fStatus && t.status !== fStatus) return false;
    if (fQuad && quadranteDe(t) !== fQuad) return false;
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

/* ===================================================================
   DRUCKER-2: Alertas preventivos de prazo
   - Lembrete: 3 dias antes do prazo (em-andamento)
   - Cobranca: prazo vencido ha pelo menos 1 dia
   =================================================================== */
function tarefasPreventivas() {
  const hoje = hojeISO();
  const lembretes = [];
  const cobrancas = [];
  for (const t of tarefas) {
    if (!t.prazo || t.status === 'concluida' || t.status === 'cancelada') continue;
    const dias = diasEntre(hoje, t.prazo); // positivo: ainda falta; negativo: passou
    if (dias === null) continue;
    if (dias < 0 && Math.abs(dias) >= 1) {
      cobrancas.push({ t, dias });
    } else if (dias >= 0 && dias <= 3) {
      lembretes.push({ t, dias });
    }
  }
  // ordena: cobrancas primeiro pelo mais atrasado; lembretes pelo mais proximo
  cobrancas.sort((a,b) => a.dias - b.dias);
  lembretes.sort((a,b) => a.dias - b.dias);
  return { lembretes, cobrancas };
}

function renderBannerDrucker() {
  const banner = $('#banner-drucker');
  if (!banner) return;
  const { lembretes, cobrancas } = tarefasPreventivas();
  if (!lembretes.length && !cobrancas.length) {
    banner.hidden = true;
    banner.innerHTML = '';
    return;
  }
  const partes = [];
  if (cobrancas.length) {
    partes.push(`<button class="druk__chip druk__chip--alerta" data-druk="cobranca" type="button" title="Ver tarefas com prazo vencido"><strong>${cobrancas.length}</strong> ${cobrancas.length===1?'aguarda cobrança':'aguardam cobrança'}</button>`);
  }
  if (lembretes.length) {
    partes.push(`<button class="druk__chip druk__chip--alerta-leve" data-druk="lembrete" type="button" title="Ver tarefas com prazo nos próximos 3 dias"><strong>${lembretes.length}</strong> ${lembretes.length===1?'cabe lembrete':'cabem lembretes'}</button>`);
  }
  banner.innerHTML = `
    <div class="druk__corpo">
      <span class="druk__hint">Drucker dizia que antecipar a fricção é mais barato que resolvê-la.</span>
      <div class="druk__chips">${partes.join('')}</div>
    </div>
    <button class="druk__close" id="druk-close" type="button" aria-label="Ocultar painel" title="Ocultar nesta sessão">×</button>
  `;
  banner.hidden = false;
}

// abre lista de tarefas elegiveis num popover/modal simples
function abrirDruckerLista(tipo /* 'lembrete' | 'cobranca' */) {
  const { lembretes, cobrancas } = tarefasPreventivas();
  const itens = (tipo === 'cobranca') ? cobrancas : lembretes;
  if (!itens.length) return;
  const dlg = $('#dlg-druk');
  if (!dlg) return;
  $('#druk-titulo').textContent = (tipo === 'cobranca')
    ? 'Tarefas que pedem cobrança'
    : 'Tarefas que pedem lembrete';
  $('#druk-subtitulo').textContent = (tipo === 'cobranca')
    ? 'Prazo já venceu. Um clique abre o e-mail de cobrança.'
    : 'Prazo nos próximos 3 dias. Um clique abre o e-mail de lembrete.';
  const lista = $('#druk-lista');
  lista.innerHTML = '';
  for (const { t, dias } of itens) {
    const li = document.createElement('div');
    li.className = 'druk-item';
    const meta = (tipo === 'cobranca')
      ? `<span class="druk-item__meta druk-item__meta--alerta">Vencida há ${Math.abs(dias)} ${Math.abs(dias)===1?'dia':'dias'}</span>`
      : `<span class="druk-item__meta">${dias===0?'Vence hoje':(dias===1?'Vence amanhã':'Vence em '+dias+' dias')}</span>`;
    const oe = t.oeId ? OBJETIVOS.find(o=>o.id===t.oeId) : null;
    const oeTag = oe ? `<span class="druk-item__oe">OE ${oe.id}</span>` : '';
    li.innerHTML = `
      <div class="druk-item__corpo">
        <div class="druk-item__titulo">${escHtml(t.titulo)}</div>
        <div class="druk-item__rod">${oeTag}<span class="druk-item__resp">${escHtml(t.responsavel || '—')}</span>${meta}</div>
      </div>
      <div class="druk-item__acoes">
        <button class="btn btn--sm" data-druk-act="email" data-tid="${t.id}" type="button">E-mail</button>
      </div>
    `;
    lista.appendChild(li);
  }
  dlg.dataset.druktipo = tipo;
  dlg.showModal();
}

/* ===================================================================
   DRUCKER-3: Retrospectiva semanal
   - Periodo padrao: ultimos 7 dias (sexta a sexta se hoje for sexta)
   - Conta concluidas no periodo, vencidas no periodo, paradas (sem mexer ha 7+ dias)
   - Metricas: tempo medio de ciclo das concluidas no periodo, % no prazo
   - Pergunta semanal rotativa (5 perguntas ao estilo Drucker)
   =================================================================== */
const _DRUCKER_PERGUNTAS = [
  'O que aprendi nesta semana sobre meu trabalho ou minha equipe?',
  'O que devo parar de fazer porque deixou de gerar resultado?',
  'Estou fazendo as coisas certas ou apenas fazendo bem coisas erradas?',
  'Onde concentrei minha atenção esta semana — e onde ela escapou?',
  'Que decisão eu adiei e que precisa de definição agora?'
];

function _addDias(iso, n) {
  const d = isoToDate(iso); if (!d) return iso;
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0,10);
}

function _semanaCorrente() {
  // periodo: ultimos 7 dias inclusive de hoje
  const fim = hojeISO();
  const inicio = _addDias(fim, -6);
  return { inicio, fim };
}

function _periodoDeDias(n) {
  const fim = hojeISO();
  const inicio = _addDias(fim, -(n - 1));
  return { inicio, fim };
}

function _entreISO(iso, ini, fim) {
  return iso && iso >= ini && iso <= fim;
}

// Retorna a melhor data disponível para "quando a tarefa foi concluída".
// Backfill: concluidaEm → atualizadoEm → criadoEm. Não persiste — apenas calcula.
function _dataConclusaoEfetiva(t) {
  return t.concluidaEm || t.atualizadoEm || t.criadoEm || null;
}

function gerarRetrospectiva(periodo) {
  const { inicio, fim } = periodo || _semanaCorrente();
  const concluidasPer = [];
  const vencidasPer = [];
  const paradas = [];
  const novas = [];
  let backfillUsado = 0; // conta quantas concluídas dependeram de fallback
  for (const t of tarefas) {
    if (_entreISO(t.criadoEm, inicio, fim)) novas.push(t);
    if (t.status === 'concluida') {
      const dataConc = _dataConclusaoEfetiva(t);
      if (_entreISO(dataConc, inicio, fim)) {
        concluidasPer.push(t);
        if (!t.concluidaEm) backfillUsado++;
      }
    }
    if (t.status !== 'concluida' && t.status !== 'cancelada' && _entreISO(t.prazo, inicio, fim) && t.prazo < hojeISO()) {
      vencidasPer.push(t);
    }
    if (t.status !== 'concluida' && t.status !== 'cancelada') {
      const ult = t.atualizadoEm || t.criadoEm || null;
      const dias = ult ? diasEntre(ult, hojeISO()) : null;
      if (dias !== null && dias >= 7) paradas.push({ t, dias });
    }
  }
  paradas.sort((a,b) => b.dias - a.dias);

  // metricas
  let tempoMedio = null;
  if (concluidasPer.length) {
    const dias = [];
    for (const t of concluidasPer) {
      const dConc = _dataConclusaoEfetiva(t);
      if (t.criadoEm && dConc) {
        const d = diasEntre(t.criadoEm, dConc);
        if (d !== null) dias.push(d);
      }
    }
    if (dias.length) tempoMedio = Math.round(dias.reduce((a,b)=>a+b,0) / dias.length);
  }
  let pctNoPrazo = null;
  if (concluidasPer.length) {
    let np = 0, com = 0;
    for (const t of concluidasPer) {
      const dConc = _dataConclusaoEfetiva(t);
      if (!t.prazo || !dConc) continue;
      com++;
      if (dConc <= t.prazo) np++;
    }
    if (com) pctNoPrazo = Math.round((np / com) * 100);
  }

  // Distribuição por quadrante (Leva 7) — considera todas as tarefas "ativas no período":
  // novas + tocadas + concluídas + vencidas no recorte. Cada tarefa conta UMA vez.
  const ativasIds = new Set();
  const ativas = [];
  const inclui = (t) => { if (!ativasIds.has(t.id)) { ativasIds.add(t.id); ativas.push(t); } };
  for (const t of concluidasPer) inclui(t);
  for (const t of vencidasPer) inclui(t);
  for (const t of novas) inclui(t);
  for (const { t } of paradas) inclui(t);
  // Também inclui tarefas abertas que tiveram alguma atualização no período
  for (const t of tarefas) {
    if (t.status === 'concluida' || t.status === 'cancelada') continue;
    if (t.atualizadoEm && _entreISO(t.atualizadoEm, inicio, fim)) inclui(t);
  }
  const distQ = { Q1: 0, Q2: 0, Q3: 0, Q4: 0, NC: 0 };
  for (const t of ativas) distQ[quadranteDe(t)]++;
  const distTotal = ativas.length;
  const distPct = { Q1: 0, Q2: 0, Q3: 0, Q4: 0, NC: 0 };
  if (distTotal > 0) {
    for (const k of Object.keys(distQ)) distPct[k] = Math.round((distQ[k] / distTotal) * 100);
  }
  const q4Domina = distTotal > 0 && distPct.Q4 >= 50;
  const q2Anemico = distTotal >= 4 && distPct.Q2 < 10;

  // pergunta rotativa (estavel pela semana)
  const semanaIso = inicio.replace(/-/g,'');
  const idx = parseInt(semanaIso, 10) % _DRUCKER_PERGUNTAS.length;
  const pergunta = _DRUCKER_PERGUNTAS[idx];

  return {
    periodo: { inicio, fim },
    concluidasPer,
    vencidasPer,
    paradas,
    novas,
    distribuicao: { contagem: distQ, percentuais: distPct, total: distTotal, q4Domina, q2Anemico },
    metricas: { tempoMedio, pctNoPrazo, totalConcluidas: concluidasPer.length, totalVencidas: vencidasPer.length, totalParadas: paradas.length, totalNovas: novas.length, backfillUsado },
    pergunta
  };
}

// Mensagens explicativas para listas vazias, sensíveis ao contexto/período
function _retroVazioMsg(tipo, periodoDias, backfillUsado) {
  const cabe = (n) => `nos últimos ${n} dias`;
  if (tipo === 'concluidas') {
    if (backfillUsado === 0 && periodoDias <= 14) {
      return `Nenhuma conclusão registrada ${cabe(periodoDias)}. Tarefas anteriores à introdução do registro de data de conclusão não aparecem aqui mesmo se concluídas — amplie o período para confirmar.`;
    }
    return `Nenhuma conclusão registrada ${cabe(periodoDias)}.`;
  }
  if (tipo === 'vencidas') {
    return `Nenhum prazo venceu ${cabe(periodoDias)}.`;
  }
  if (tipo === 'paradas') {
    return 'Nenhuma tarefa em aberto está sem atualização há 7 dias ou mais.';
  }
  return '— nada a registrar.';
}

function _retroFormatLista(arr, fn, vazioMsg) {
  if (!arr.length) return `<p class="retro__vazio">${escHtml(vazioMsg || '— nada a registrar nesta categoria.')}</p>`;
  return '<ul class="retro__lista">' + arr.map(fn).join('') + '</ul>';
}

// Período selecionado pelo usuário (em dias). Default: 7.
let _retroDias = 7;

function renderRetrospectiva() {
  const periodo = _periodoDeDias(_retroDias);
  const r = gerarRetrospectiva(periodo);
  const { inicio, fim } = r.periodo;
  $('#retro-periodo').textContent = `${fmtDataExtenso(inicio)} a ${fmtDataExtenso(fim)} (últimos ${_retroDias} dias)`;
  // sincroniza visual dos chips de período
  $$('#dlg-retro [data-retdias]').forEach(b => {
    b.classList.toggle('seg__btn--ativo', String(b.dataset.retdias) === String(_retroDias));
  });
  // pergunta no topo
  $('#retro-pergunta').textContent = r.pergunta;
  // metricas
  const m = r.metricas;
  const metricasHtml = `
    <div class="retro-metricas">
      <div class="retro-metrica"><div class="retro-metrica__num">${m.totalConcluidas}</div><div class="retro-metrica__rot">concluídas</div></div>
      <div class="retro-metrica"><div class="retro-metrica__num">${m.totalVencidas}</div><div class="retro-metrica__rot">venceram</div></div>
      <div class="retro-metrica"><div class="retro-metrica__num">${m.totalParadas}</div><div class="retro-metrica__rot">paradas ≥7d</div></div>
      <div class="retro-metrica"><div class="retro-metrica__num">${m.totalNovas}</div><div class="retro-metrica__rot">novas</div></div>
      <div class="retro-metrica"><div class="retro-metrica__num">${m.tempoMedio == null ? '—' : m.tempoMedio + 'd'}</div><div class="retro-metrica__rot">tempo médio</div></div>
      <div class="retro-metrica"><div class="retro-metrica__num">${m.pctNoPrazo == null ? '—' : m.pctNoPrazo + '%'}</div><div class="retro-metrica__rot">no prazo</div></div>
    </div>
  `;
  $('#retro-metricas').innerHTML = metricasHtml;
  // Distribuição por quadrante (Leva 7)
  if (r.distribuicao) {
    const d = r.distribuicao;
    if (d.total === 0) {
      $('#retro-distribuicao').innerHTML = '<p class="retro__vazio">Sem tarefas ativas no período para distribuir.</p>';
    } else {
      const ordem = ['Q1', 'Q2', 'Q3', 'Q4', 'NC'];
      const linhas = ordem.map(qid => {
        const q = QUADRANTES[qid];
        const n = d.contagem[qid];
        const p = d.percentuais[qid];
        const fill = `<span class="retro-dist__fill" style="width:${p}%; background:${q.cor}"></span>`;
        return `
          <div class="retro-dist__linha">
            <span class="retro-dist__id" style="color:${q.cor}">${qid}</span>
            <span class="retro-dist__nome">${escHtml(q.nome)}</span>
            <span class="retro-dist__bar">${fill}</span>
            <span class="retro-dist__num">${n} <span class="retro-dist__pct">(${p}%)</span></span>
          </div>`;
      }).join('');
      let alertas = '';
      if (d.q4Domina) {
        alertas += `<p class="retro-dist__alerta retro-dist__alerta--warn">Q4 — Sustentação Operacional está em ${d.percentuais.Q4}% do período. Pondere delegar acompanhamentos simples e proteger tempo para Q2/Q3.</p>`;
      }
      if (d.q2Anemico) {
        alertas += `<p class="retro-dist__alerta retro-dist__alerta--warn">Q2 — Estratégia Direcional ficou em ${d.percentuais.Q2}%. Considere reservar bloco de tempo para reflexão estratégica.</p>`;
      }
      if (!alertas && d.percentuais.Q3 >= 30 && d.percentuais.Q2 >= 15) {
        alertas = `<p class="retro-dist__alerta retro-dist__alerta--ok">Boa cadência: Q2 (${d.percentuais.Q2}%) e Q3 (${d.percentuais.Q3}%) estão presentes na agenda.</p>`;
      }
      $('#retro-distribuicao').innerHTML = `
        <div class="retro-dist">
          <div class="retro-dist__total">${d.total} tarefa(s) ativa(s) no período</div>
          ${linhas}
          ${alertas}
        </div>`;
    }
  }
  $('#retro-concluidas').innerHTML = _retroFormatLista(r.concluidasPer, t => {
    const oe = t.oeId ? OBJETIVOS.find(o=>o.id===t.oeId) : null;
    const oeTag = oe ? ` <span class="retro-tag">OE ${oe.id}</span>` : '';
    return `<li><strong>${escHtml(t.titulo)}</strong>${oeTag}<span class="retro__resp"> · ${escHtml(t.responsavel || '—')}</span></li>`;
  }, _retroVazioMsg('concluidas', _retroDias, m.backfillUsado));
  $('#retro-vencidas').innerHTML = _retroFormatLista(r.vencidasPer, t => {
    return `<li><strong>${escHtml(t.titulo)}</strong><span class="retro__resp"> · ${escHtml(t.responsavel || '—')}</span><span class="retro__data"> · prazo ${fmtDataExtenso(t.prazo)}</span></li>`;
  }, _retroVazioMsg('vencidas', _retroDias));
  $('#retro-paradas').innerHTML = _retroFormatLista(r.paradas, ({t,dias}) => {
    return `<li><strong>${escHtml(t.titulo)}</strong><span class="retro__resp"> · ${escHtml(t.responsavel || '—')}</span><span class="retro__data"> · sem mexer há ${dias} dias</span></li>`;
  }, _retroVazioMsg('paradas', _retroDias));
  // prévia tipográfica
  const previa = $('#retro-previa');
  if (previa) previa.textContent = _retroTextoPlano(periodo);
  // guarda objeto para exportação
  $('#dlg-retro').dataset.retroJson = JSON.stringify({ periodo: r.periodo, metricas: r.metricas, pergunta: r.pergunta, dias: _retroDias });
}

function abrirRetrospectiva() {
  const dlg = $('#dlg-retro');
  if (!dlg) return;
  renderRetrospectiva();
  dlg.showModal();
}

/* Exporta retrospectiva como texto plano (para copiar) */
function _retroTextoPlano(periodo) {
  const per = periodo || _periodoDeDias(_retroDias);
  const r = gerarRetrospectiva(per);
  const { inicio, fim } = r.periodo;
  const m = r.metricas;
  const linhas = [];
  linhas.push(`Retrospectiva semanal — ${fmtDataExtenso(inicio)} a ${fmtDataExtenso(fim)}`);
  linhas.push('');
  linhas.push('Resumo:');
  linhas.push(`  • ${m.totalConcluidas} concluída(s) | ${m.totalVencidas} venceu/venceram | ${m.totalParadas} parada(s) ≥7d | ${m.totalNovas} nova(s)`);
  linhas.push(`  • tempo médio de ciclo: ${m.tempoMedio == null ? '—' : m.tempoMedio + ' dias'}`);
  linhas.push(`  • % de conclusões no prazo: ${m.pctNoPrazo == null ? '—' : m.pctNoPrazo + '%'}`);
  linhas.push('');
  function bloco(titulo, arr, fn) {
    linhas.push(titulo + ':');
    if (!arr.length) { linhas.push('  — nada a registrar.'); }
    else { for (const x of arr) linhas.push('  • ' + fn(x)); }
    linhas.push('');
  }
  // Distribuição por quadrante (Leva 7)
  if (r.distribuicao && r.distribuicao.total > 0) {
    const d = r.distribuicao;
    linhas.push('Distribuição por quadrante:');
    linhas.push(`  Q1 — Crise e Contenção: ${d.contagem.Q1} (${d.percentuais.Q1}%)`);
    linhas.push(`  Q2 — Estratégia Direcional: ${d.contagem.Q2} (${d.percentuais.Q2}%)`);
    linhas.push(`  Q3 — Deliberação Estratégica Operacional: ${d.contagem.Q3} (${d.percentuais.Q3}%)`);
    linhas.push(`  Q4 — Sustentação Operacional: ${d.contagem.Q4} (${d.percentuais.Q4}%)`);
    if (d.contagem.NC > 0) linhas.push(`  Não classificadas: ${d.contagem.NC} (${d.percentuais.NC}%)`);
    if (d.q4Domina) linhas.push(`  Aviso: Q4 em ${d.percentuais.Q4}% — risco de a sustentação engolir a estratégia.`);
    if (d.q2Anemico) linhas.push(`  Aviso: Q2 em ${d.percentuais.Q2}% — reservar bloco de estratégia.`);
    linhas.push('');
  }
  bloco('Concluídas no período', r.concluidasPer, t => `${t.titulo} (${t.responsavel || '—'})`);
  bloco('Prazos vencidos no período', r.vencidasPer, t => `${t.titulo} (${t.responsavel || '—'}) — prazo ${fmtDataExtenso(t.prazo)}`);
  bloco('Paradas há 7 dias ou mais', r.paradas, ({t,dias}) => `${t.titulo} (${t.responsavel || '—'}) — ${dias} dias sem atualização`);
  linhas.push('Pergunta da semana (Drucker):');
  linhas.push('  ' + r.pergunta);
  return linhas.join('\n');
}

async function exportarRetroDocx() {
  await carregarLibDocx();
  const D = window.docx;
  if (!D) { alert('Não foi possível carregar a biblioteca Word.'); return; }
  const r = gerarRetrospectiva(_periodoDeDias(_retroDias));
  const { inicio, fim } = r.periodo;
  const m = r.metricas;
  const P = D.Paragraph, T = D.TextRun, AL = D.AlignmentType, HL = D.HeadingLevel;
  const elementos = [];
  elementos.push(new P({ heading: HL.HEADING_1, children: [new T({ text: 'Retrospectiva semanal' })] }));
  elementos.push(new P({ children: [new T({ text: `${fmtDataExtenso(inicio)} a ${fmtDataExtenso(fim)}`, italics: false })] }));
  elementos.push(new P({ children: [new T({ text: '' })] }));
  elementos.push(new P({ heading: HL.HEADING_2, children: [new T({ text: 'Resumo' })] }));
  elementos.push(new P({ children: [new T({ text: `${m.totalConcluidas} concluída(s) | ${m.totalVencidas} venceu/venceram | ${m.totalParadas} parada(s) ≥7d | ${m.totalNovas} nova(s)` })] }));
  elementos.push(new P({ children: [new T({ text: `Tempo médio de ciclo: ${m.tempoMedio == null ? '—' : m.tempoMedio + ' dias'}` })] }));
  elementos.push(new P({ children: [new T({ text: `Conclusões no prazo: ${m.pctNoPrazo == null ? '—' : m.pctNoPrazo + '%'}` })] }));
  function secao(titulo, arr, fn) {
    elementos.push(new P({ children: [new T({ text: '' })] }));
    elementos.push(new P({ heading: HL.HEADING_2, children: [new T({ text: titulo })] }));
    if (!arr.length) {
      elementos.push(new P({ children: [new T({ text: '— nada a registrar.' })] }));
    } else {
      for (const x of arr) elementos.push(new P({ bullet: { level: 0 }, children: [new T({ text: fn(x) })] }));
    }
  }
  secao('Concluídas no período', r.concluidasPer, t => `${t.titulo} (${t.responsavel || '—'})`);
  secao('Prazos vencidos no período', r.vencidasPer, t => `${t.titulo} (${t.responsavel || '—'}) — prazo ${fmtDataExtenso(t.prazo)}`);
  secao('Paradas há 7 dias ou mais', r.paradas, ({t,dias}) => `${t.titulo} (${t.responsavel || '—'}) — ${dias} dias sem atualização`);
  elementos.push(new P({ children: [new T({ text: '' })] }));
  elementos.push(new P({ heading: HL.HEADING_2, children: [new T({ text: 'Pergunta da semana' })] }));
  elementos.push(new P({ children: [new T({ text: r.pergunta })] }));
  const doc = new D.Document({
    styles: { default: { document: { run: { font: 'Times New Roman', size: 24 } } } },
    sections: [{ properties: { page: { margin: { top: 1700, right: 1133, bottom: 1133, left: 1700 } } }, children: elementos }]
  });
  const blob = await D.Packer.toBlob(doc);
  baixar(blob, `retrospectiva_${inicio}_${fim}.docx`);
}

function exportarRetroPDF() {
  if (typeof window.jspdf === 'undefined') { alert('PDF não disponível.'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const r = gerarRetrospectiva(_periodoDeDias(_retroDias));
  const { inicio, fim } = r.periodo;
  const m = r.metricas;
  const margemL = 30, margemR = 20, larg = 210 - margemL - margemR;
  let y = 30;
  doc.setFont('times', 'bold'); doc.setFontSize(16);
  doc.text('Retrospectiva semanal', margemL, y); y += 8;
  doc.setFont('times', 'normal'); doc.setFontSize(11);
  doc.text(`${fmtDataExtenso(inicio)} a ${fmtDataExtenso(fim)}`, margemL, y); y += 10;
  doc.setFont('times', 'bold'); doc.setFontSize(12); doc.text('Resumo', margemL, y); y += 6;
  doc.setFont('times', 'normal'); doc.setFontSize(11);
  const linhasResumo = [
    `${m.totalConcluidas} concluida(s) | ${m.totalVencidas} venceu/venceram | ${m.totalParadas} parada(s) >=7d | ${m.totalNovas} nova(s)`,
    `Tempo medio de ciclo: ${m.tempoMedio == null ? '—' : m.tempoMedio + ' dias'}`,
    `Conclusoes no prazo: ${m.pctNoPrazo == null ? '—' : m.pctNoPrazo + '%'}`
  ];
  for (const l of linhasResumo) { doc.text(l, margemL, y); y += 5; }
  y += 4;
  function secao(titulo, arr, fn) {
    if (y > 260) { doc.addPage(); y = 30; }
    doc.setFont('times', 'bold'); doc.setFontSize(12); doc.text(titulo, margemL, y); y += 6;
    doc.setFont('times', 'normal'); doc.setFontSize(11);
    if (!arr.length) { doc.text('— nada a registrar.', margemL, y); y += 6; return; }
    for (const x of arr) {
      const linha = '• ' + fn(x);
      const partidas = doc.splitTextToSize(linha, larg);
      for (const seg of partidas) {
        if (y > 280) { doc.addPage(); y = 30; }
        doc.text(seg, margemL, y); y += 5;
      }
    }
    y += 3;
  }
  secao('Concluidas no periodo', r.concluidasPer, t => `${t.titulo} (${t.responsavel || '—'})`);
  secao('Prazos vencidos no periodo', r.vencidasPer, t => `${t.titulo} (${t.responsavel || '—'}) — prazo ${fmtDataExtenso(t.prazo)}`);
  secao('Paradas ha 7 dias ou mais', r.paradas, ({t,dias}) => `${t.titulo} (${t.responsavel || '—'}) — ${dias} dias sem atualizacao`);
  if (y > 250) { doc.addPage(); y = 30; }
  doc.setFont('times', 'bold'); doc.setFontSize(12); doc.text('Pergunta da semana', margemL, y); y += 6;
  doc.setFont('times', 'normal'); doc.setFontSize(11);
  const pp = doc.splitTextToSize(r.pergunta, larg);
  for (const seg of pp) { doc.text(seg, margemL, y); y += 5; }
  doc.save(`retrospectiva_${inicio}_${fim}.pdf`);
}

function renderTudo() {
  renderKPIs();
  renderSparkline();
  renderBannerDrucker();
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
    el.querySelector('[data-email]').addEventListener('click', () => abrirIAEmailDireto(id));
    const btnHist = el.querySelector('[data-historico]');
    if (btnHist) btnHist.addEventListener('click', () => abrirHistoricoTarefa(id));
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
        <button class="btn btn--ghost btn--sm" data-email title="Gerar e-mail">E-mail</button>
        <button class="btn btn--ghost btn--sm" data-historico title="Histórico de decisões das reuniões">Histórico${reunioesQueTrataramTarefa(t.id).length ? ` (${reunioesQueTrataramTarefa(t.id).length})` : ''}</button>
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
  $('#btn-xlsx').addEventListener('click', () => abrirPainelExportar('xlsx'));
  $('#btn-pdf').addEventListener('click', () => abrirPainelExportar('pdf'));
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

/* ===================================================================
   EXPORTAR — painel inline (Leva 9)
   =================================================================== */

const EXP_CAMPOS_PADRAO = [
  { key: 'titulo',       label: 'Título',           on: true,  pdf: 100 },
  { key: 'quadrante',    label: 'Quadrante',         on: true,  pdf: 28  },
  { key: 'oe',           label: 'Objetivo Estratégico', on: true,  pdf: 28  },
  { key: 'responsavel',  label: 'Responsável',       on: true,  pdf: 38  },
  { key: 'prazo',        label: 'Prazo',             on: true,  pdf: 24  },
  { key: 'status',       label: 'Status',            on: true,  pdf: 26  },
  { key: 'prioridade',   label: 'Prioridade',        on: true,  pdf: 22  },
  { key: 'resultado',    label: 'Resultado esperado',on: false, pdf: 60  },
  { key: 'dataInicio',   label: 'Data de início',    on: false, pdf: 22  },
  { key: 'criadaEm',     label: 'Criada em',         on: false, pdf: 22  },
  { key: 'atualizadaEm', label: 'Atualizada em',     on: false, pdf: 22  },
  { key: 'atrasada',     label: 'Atrasada',          on: false, pdf: 18  }
];

let _expModoSaida = 'pdf'; // 'pdf' | 'xlsx'

// Extrai um valor de tarefa para uma chave de campo.
function _expValor(t, key) {
  switch (key) {
    case 'titulo':       return t.titulo || '';
    case 'quadrante':    {
      const q = quadranteDe(t);
      return q === 'NC' ? 'Não classificada' : `${q} — ${QUADRANTES[q].nome}`;
    }
    case 'oe': {
      const obj = OBJETIVOS.find(o => o.id === t.oeId);
      return obj ? `OE ${obj.id} · ${obj.curto}` : '—';
    }
    case 'responsavel':  return t.responsavel || '—';
    case 'prazo':        return t.prazo ? fmtData(t.prazo) + (isAtrasada(t) ? ' (atr.)' : '') : '—';
    case 'status':       return STATUS_ROTULOS[t.status] || '—';
    case 'prioridade':   return PRIORIDADE_ROTULOS[t.prioridade] || '—';
    case 'resultado':    return t.resultado || '';
    case 'dataInicio':   return t.dataInicio ? fmtData(t.dataInicio) : '';
    case 'criadaEm':     {
      const v = t.criadaEm || t.criadoEm; if (!v) return '';
      try { return fmtData(String(v).slice(0,10)); } catch { return ''; }
    }
    case 'atualizadaEm': {
      const v = t.atualizadaEm; if (!v) return '';
      try { return fmtData(String(v).slice(0,10)); } catch { return ''; }
    }
    case 'atrasada':     return isAtrasada(t) ? 'Sim' : 'Não';
    default: return '';
  }
}

function _expChavesAtivas() {
  const checks = $$('#exp-campos input[type=checkbox]');
  const out = [];
  for (const ck of checks) if (ck.checked) out.push(ck.dataset.campo);
  return out;
}

function _expChipsValores(containerSel) {
  return $$(`${containerSel} input[type=checkbox]:checked`).map(ck => ck.dataset.val);
}

function _expEscopo() {
  const radio = document.querySelector('input[name="exp-escopo"]:checked');
  return radio ? radio.value : 'todas';
}

function _expAplicarOpcoes() {
  const escopo = _expEscopo();
  let base;
  if (escopo === 'filtradas') base = aplicarFiltros();
  else if (escopo === 'selecionadas') base = tarefas.filter(t => selecaoTarefasIds.has(t.id));
  else base = tarefas.slice();

  const fQ = _expChipsValores('#exp-filtro-quad');
  const fR = _expChipsValores('#exp-filtro-resp');
  const fO = _expChipsValores('#exp-filtro-oe');
  const fS = _expChipsValores('#exp-filtro-status');
  const fP = _expChipsValores('#exp-filtro-prio');

  base = base.filter(t => {
    if (fQ.length && !fQ.includes(quadranteDe(t))) return false;
    if (fR.length && !fR.includes((t.responsavel || '').trim() || '—')) return false;
    if (fO.length && !fO.includes(String(t.oeId || ''))) return false;
    if (fS.length && !fS.includes(t.status || '')) return false;
    if (fP.length && !fP.includes(t.prioridade || '')) return false;
    return true;
  });

  // Ordenação
  const ordem = $('#exp-ordem').value;
  const pesoPrio = { alta: 1, media: 2, baixa: 3 };
  base.sort((a, b) => {
    if (ordem === 'prazo') {
      if (!a.prazo && !b.prazo) return (a.titulo || '').localeCompare(b.titulo || '');
      if (!a.prazo) return 1;
      if (!b.prazo) return -1;
      return a.prazo.localeCompare(b.prazo);
    }
    if (ordem === 'prioridade') return (pesoPrio[a.prioridade]||9) - (pesoPrio[b.prioridade]||9);
    if (ordem === 'responsavel') return (a.responsavel || '').localeCompare(b.responsavel || '', 'pt-BR');
    return (a.titulo || '').localeCompare(b.titulo || '', 'pt-BR');
  });

  return base;
}

function _expChaveAgrupamento(t, modo) {
  switch (modo) {
    case 'quadrante': return quadranteDe(t);
    case 'responsavel': return (t.responsavel || '').trim() || '— Sem responsável';
    case 'oe': {
      const obj = OBJETIVOS.find(o => o.id === t.oeId);
      return obj ? `OE ${obj.id} · ${obj.curto}` : '— Sem OE';
    }
    case 'status': return STATUS_ROTULOS[t.status] || '—';
    case 'prioridade': return PRIORIDADE_ROTULOS[t.prioridade] || '—';
    default: return '—';
  }
}

function _expRotuloGrupo(modo, chave) {
  if (modo === 'quadrante') {
    if (chave === 'NC') return 'Não classificadas';
    const info = QUADRANTES[chave];
    return info ? `${chave} — ${info.nome} · ${info.postura}` : chave;
  }
  return chave;
}

function _expAgrupar(lista, modo) {
  if (!modo) return [['', lista]];
  const map = new Map();
  for (const t of lista) {
    const k = _expChaveAgrupamento(t, modo);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(t);
  }
  // Ordenação dos grupos
  const ordemQ = ['Q1','Q2','Q3','Q4','NC'];
  const ordemP = { alta: 1, media: 2, baixa: 3 };
  const arr = Array.from(map.entries());
  if (modo === 'quadrante') {
    arr.sort((a, b) => ordemQ.indexOf(a[0]) - ordemQ.indexOf(b[0]));
  } else if (modo === 'prioridade') {
    arr.sort((a, b) => (ordemP[a[0]]||9) - (ordemP[b[0]]||9));
  } else {
    arr.sort((a, b) => String(a[0]).localeCompare(String(b[0]), 'pt-BR'));
  }
  return arr;
}

function _expAtualizarResumo() {
  const lista = _expAplicarOpcoes();
  const agr = $('#exp-agrupar').value;
  const grupos = _expAgrupar(lista, agr);
  const abas = $$('input[data-aba]:checked').map(ck => ck.dataset.aba);
  const partes = [];
  partes.push(`<strong>${lista.length}</strong> tarefa(s) serão exportadas`);
  if (agr) partes.push(`em <strong>${grupos.length}</strong> grupo(s) por ${$('#exp-agrupar option:checked').textContent.toLowerCase()}`);
  if (_expModoSaida === 'xlsx' && abas.length) partes.push(`com abas extras: ${abas.join(', ')}`);
  $('#exp-resumo').innerHTML = partes.join(' · ');
}

function _expRenderChips(containerSel, items) {
  const html = items.map(it =>
    `<label class="export-chip"><input type="checkbox" data-val="${escHtml(it.val)}" /> ${escHtml(it.label)}</label>`
  ).join('');
  $(containerSel).innerHTML = html;
}

function _expPopularDinamicos() {
  // Quadrantes
  _expRenderChips('#exp-filtro-quad', [
    { val: 'Q1', label: 'Q1 — Crise e Contenção' },
    { val: 'Q2', label: 'Q2 — Estratégia Direcional' },
    { val: 'Q3', label: 'Q3 — Deliberação Estratégica Operacional' },
    { val: 'Q4', label: 'Q4 — Sustentação Operacional' },
    { val: 'NC', label: 'Não classificadas' }
  ]);

  // Responsáveis (apenas os que aparecem nas tarefas)
  const resps = Array.from(new Set(tarefas.map(t => (t.responsavel || '').trim() || '—'))).sort((a,b)=>a.localeCompare(b,'pt-BR'));
  _expRenderChips('#exp-filtro-resp', resps.length ? resps.map(r => ({ val: r, label: r })) : [{ val: '—', label: 'Sem responsável' }]);

  // OEs (apenas os usados)
  const oeIdsUsados = Array.from(new Set(tarefas.map(t => t.oeId).filter(Boolean)));
  const oeItems = oeIdsUsados.map(id => {
    const o = OBJETIVOS.find(x => x.id === id);
    return { val: String(id), label: o ? `OE ${o.id} · ${o.curto}` : `OE ${id}` };
  });
  if (tarefas.some(t => !t.oeId)) oeItems.push({ val: '', label: 'Sem OE' });
  _expRenderChips('#exp-filtro-oe', oeItems);

  // Status
  _expRenderChips('#exp-filtro-status', [
    { val: 'a-fazer', label: 'A fazer' },
    { val: 'em-andamento', label: 'Em andamento' },
    { val: 'concluida', label: 'Concluída' },
    { val: 'bloqueada', label: 'Bloqueada' }
  ]);

  // Prioridade
  _expRenderChips('#exp-filtro-prio', [
    { val: 'alta', label: 'Alta' },
    { val: 'media', label: 'Média' },
    { val: 'baixa', label: 'Baixa' }
  ]);

  // Campos
  $('#exp-campos').innerHTML = EXP_CAMPOS_PADRAO.map(c =>
    `<label><input type="checkbox" data-campo="${c.key}"${c.on ? ' checked' : ''} /> ${escHtml(c.label)}</label>`
  ).join('');
}

function _expResetar() {
  // Restaura padrões
  document.querySelector('input[name="exp-escopo"][value="todas"]').checked = true;
  $('#exp-agrupar').value = 'quadrante';
  $('#exp-ordem').value = 'prazo';
  $$('#panel-exportar .export-chips input[type=checkbox]').forEach(ck => { ck.checked = false; });
  $$('#exp-campos input[type=checkbox]').forEach(ck => {
    const def = EXP_CAMPOS_PADRAO.find(c => c.key === ck.dataset.campo);
    ck.checked = !!(def && def.on);
  });
  _expAtualizarResumo();
}

function abrirPainelExportar(modo) {
  if (!tarefas.length) return mostrarMsg('Nada para exportar.', true);
  _expModoSaida = modo === 'xlsx' ? 'xlsx' : 'pdf';
  _expPopularDinamicos();
  // Título dependendo do modo de origem (mas o painel oferece ambos)
  $('#export-titulo').textContent = _expModoSaida === 'xlsx' ? 'Exportar (Excel → destacado)' : 'Exportar (PDF → destacado)';
  const painel = $('#panel-exportar');
  painel.hidden = false;
  _expAtualizarResumo();
  painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fecharPainelExportar() {
  const p = $('#panel-exportar');
  if (p) p.hidden = true;
}

function bindPainelExportar() {
  const painel = $('#panel-exportar');
  if (!painel) return;
  painel.addEventListener('click', e => {
    if (e.target.id === 'export-close') { fecharPainelExportar(); return; }
    if (e.target.id === 'btn-exp-reset') { _expResetar(); return; }
    if (e.target.id === 'btn-exp-pdf') { exportarPDFCustom(); return; }
    if (e.target.id === 'btn-exp-xlsx') { exportarXLSXCustom(); return; }
  });
  painel.addEventListener('change', () => _expAtualizarResumo());
  painel.addEventListener('input', () => _expAtualizarResumo());
}

/* ---------- Geração PDF custom ---------- */

function exportarPDFCustom() {
  const lista = _expAplicarOpcoes();
  if (!lista.length) return mostrarMsg('Nenhuma tarefa atende aos filtros escolhidos.', true);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const azul = [10, 61, 122], laranja = [240, 128, 0];

  doc.setFillColor(...azul); doc.rect(0, 0, 297, 22, 'F');
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold');
  doc.setFontSize(15); doc.text('Tarefas Estratégicas — Cebraspe', 14, 11);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
  doc.text('Plano Diretor 2023–2026 · Relatório personalizado', 14, 17);
  doc.setFontSize(8);
  doc.text(`Emitido em ${fmtData(hojeISO())}`, 297 - 14, 11, { align: 'right' });
  const concl = lista.filter(t => t.status === 'concluida').length;
  const atras = lista.filter(isAtrasada).length;
  doc.text(`Total: ${lista.length} · Concluídas: ${concl} · Atrasadas: ${atras}`, 297 - 14, 17, { align: 'right' });
  doc.setFillColor(...laranja); doc.rect(0, 22, 297, 1.2, 'F');

  const camposAtivos = _expChavesAtivas();
  if (!camposAtivos.length) return mostrarMsg('Selecione ao menos um campo.', true);
  const camposDef = EXP_CAMPOS_PADRAO.filter(c => camposAtivos.includes(c.key));
  const head = camposDef.map(c => c.label);
  const colunaStyles = {};
  camposDef.forEach((c, i) => { colunaStyles[i] = { cellWidth: c.pdf }; });

  const agr = $('#exp-agrupar').value;
  const grupos = _expAgrupar(lista, agr);

  let y = 30;
  for (const [chave, itens] of grupos) {
    if (y > 180) { doc.addPage(); y = 18; }
    if (agr) {
      let bg = [240, 240, 240], fg = [40, 40, 40];
      if (agr === 'quadrante') {
        const info = QUADRANTES[chave];
        if (info) { bg = hexToRgb(info.bg); fg = hexToRgb(info.cor); }
      }
      doc.setFillColor(...bg); doc.rect(14, y - 5, 269, 8, 'F');
      doc.setTextColor(...fg);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5);
      doc.text(_expRotuloGrupo(agr, chave), 16, y);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(80,80,80);
      doc.text(`${itens.length} tarefa(s)`, 281, y, { align: 'right' });
      y += 4;
    }
    const headColor = (agr === 'quadrante' && QUADRANTES[chave]) ? hexToRgb(QUADRANTES[chave].cor) : azul;
    doc.autoTable({
      startY: y,
      head: [head],
      body: itens.map(t => camposDef.map(c => _expValor(t, c.key))),
      styles: { fontSize: 8.5, cellPadding: 2.5, valign: 'top', overflow: 'linebreak' },
      headStyles: { fillColor: headColor, textColor: 255, fontSize: 8.5, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [247, 249, 252] },
      columnStyles: colunaStyles,
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
  mostrarFlash('PDF gerado.');
}

/* ---------- Geração XLSX custom ---------- */

function _expLinhaParaExcel(t, camposDef) {
  const obj = {};
  for (const c of camposDef) obj[c.label] = _expValor(t, c.key);
  return obj;
}

function _expSheetDeLista(lista, camposDef) {
  const linhas = lista.map(t => _expLinhaParaExcel(t, camposDef));
  const ws = XLSX.utils.json_to_sheet(linhas);
  ws['!cols'] = camposDef.map(c => ({ wch: Math.max(10, Math.min(60, Math.round(c.pdf * 0.6))) }));
  return ws;
}

function _expSafeSheetName(nome) {
  // Excel: max 31 chars, sem caracteres : \\ / ? * [ ]
  return String(nome).replace(/[\\/?*\[\]:]/g, ' ').slice(0, 31).trim() || 'Aba';
}

function exportarXLSXCustom() {
  const lista = _expAplicarOpcoes();
  if (!lista.length) return mostrarMsg('Nenhuma tarefa atende aos filtros escolhidos.', true);
  const camposAtivos = _expChavesAtivas();
  if (!camposAtivos.length) return mostrarMsg('Selecione ao menos um campo.', true);
  const camposDef = EXP_CAMPOS_PADRAO.filter(c => camposAtivos.includes(c.key));

  const wb = XLSX.utils.book_new();

  // Aba principal: lista completa filtrada
  const wsAll = _expSheetDeLista(lista, camposDef);
  XLSX.utils.book_append_sheet(wb, wsAll, 'Tarefas');

  // Aba resumo por quadrante
  const cont = { Q1:0, Q2:0, Q3:0, Q4:0, NC:0 };
  for (const t of lista) cont[quadranteDe(t)]++;
  const resumo = ['Q1','Q2','Q3','Q4','NC'].map(q => ({
    'Quadrante': q === 'NC' ? 'Não classificada' : `${q} — ${QUADRANTES[q].nome}`,
    'Postura': QUADRANTES[q].postura,
    'Total': cont[q]
  }));
  const wsResumo = XLSX.utils.json_to_sheet(resumo);
  wsResumo['!cols'] = [{wch:36},{wch:32},{wch:8}];
  XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo por quadrante');

  // Abas extras
  const abasPedidas = $$('input[data-aba]:checked').map(ck => ck.dataset.aba);
  for (const modo of abasPedidas) {
    const grupos = _expAgrupar(lista, modo);
    for (const [chave, itens] of grupos) {
      if (!itens.length) continue;
      const ws = _expSheetDeLista(itens, camposDef);
      let prefixo = '';
      if (modo === 'quadrante') prefixo = chave === 'NC' ? 'NC' : chave;
      else if (modo === 'responsavel') prefixo = 'R·' + chave;
      else if (modo === 'oe') prefixo = chave;
      else if (modo === 'status') prefixo = 'S·' + chave;
      XLSX.utils.book_append_sheet(wb, ws, _expSafeSheetName(prefixo));
    }
  }

  XLSX.writeFile(wb, `tarefas_cebraspe_${hojeISO()}.xlsx`);
  mostrarFlash('Excel gerado.');
}

// ============================================================
// REVISÃO POR IA (Leva 10)
// Fluxo: exportar tarefas + prompt -> usuário cola em ChatGPT/
// Claude/Gemini/Perplexity -> cola resposta -> diff visual ->
// aplica selecionadas (com backup automático).
// ============================================================
let _riaRevisao = null; // { tarefas: [...], duplicatas: [...], orfas: [...] }
let _riaOriginais = null; // map id -> tarefa original (para diff)

function _riaEscopo() {
  const r = $('input[name="ria-escopo"]:checked');
  return r ? r.value : 'todas';
}

function _riaTarefasEscopo() {
  const escopo = _riaEscopo();
  if (escopo === 'filtradas') return aplicarFiltros();
  if (escopo === 'selecionadas') {
    if (typeof selecaoTarefasIds !== 'undefined' && selecaoTarefasIds instanceof Set) {
      return tarefas.filter(t => selecaoTarefasIds.has(t.id));
    }
    return [];
  }
  return tarefas.slice();
}

function _riaTarefaSlim(t) {
  // Versão enxuta para enviar à IA: só campos relevantes
  return {
    id: t.id,
    titulo: t.titulo || '',
    quadrante: quadranteDe(t),
    oe: t.objetivo || '',
    responsavel: t.responsavel || '',
    prazo: t.prazo || '',
    status: t.status || '',
    prioridade: t.prioridade || '',
    resultado: t.resultado || '',
    dataInicio: t.dataInicio || '',
  };
}

function gerarPromptIA() {
  const lista = _riaTarefasEscopo();
  const fazQuad = $('#ria-rev-quad')?.checked;
  const fazPad = $('#ria-rev-pad')?.checked;
  const fazVazios = $('#ria-rev-vazios')?.checked;
  const fazOrfas = $('#ria-rev-orfas')?.checked;

  const oesRef = (Array.isArray(OBJETIVOS) ? OBJETIVOS : []).map(oe =>
    `OE ${oe.id} — ${oe.curto}: ${oe.texto}`
  ).join('\n');

  const escopoTxt =
    fazQuad ? '- Reclassificar quadrante (Q1–Q4 ou NC) quando o conteúdo não bate com a classificação atual.\n' : '';
  const padTxt =
    fazPad ? '- Padronizar título (verbo no infinitivo, voz ativa, sem redundância, máx 90 caracteres) e resultado esperado (Manual da Presidência: linguagem oficial, objetiva, impessoal).\n' : '';
  const vaziosTxt =
    fazVazios ? '- Sugerir prazo realista (ISO YYYY-MM-DD, considerando hoje = ' + hojeISO() + ') quando vazio. Sugerir OE da lista oficial quando vazio.\n' : '';
  const orfasTxt =
    fazOrfas ? '- Apontar duplicatas (pares com mesmo objeto/propósito) e tarefas órfãs (sem responsável ou sem OE).\n' : '';

  const prompt =
`Você é assistente de análise de tarefas estratégicas do Cebraspe (Plano de Ação 2026).
Revise as tarefas abaixo conforme as regras e devolva APENAS um JSON válido (sem markdown, sem comentários) seguindo o schema indicado.

## Taxonomia de quadrantes (Camila)
- Q1 — Crise e Contenção: decidir rápido, reduzir danos. Importante e urgente.
- Q2 — Estratégia Direcional: pensar o futuro. Importante e não urgente.
- Q3 — Deliberação Estratégica Operacional: traduzir estratégia em operação. Não importante e urgente.
- Q4 — Sustentação Operacional: delegar e proteger agenda. Não importante e não urgente.
- NC — Não classificada.

## Objetivos Estratégicos (lista oficial)
${oesRef}

## Regras de revisão (aplique todas as marcadas)
${escopoTxt}${padTxt}${vaziosTxt}${orfasTxt}
## Diretrizes de redação
- Português brasileiro formal, voz ativa, sem itálico, sem gírias.
- Título começa com verbo no infinitivo (“Elaborar...”, “Revisar...”, “Aprovar...”).
- Resultado esperado descreve o produto final concreto, não a ação.

## Schema da resposta (devolver ESTE JSON, e nada mais)
{
  "tarefas": [
    {
      "id": "<id da tarefa original>",
      "titulo": "<novo ou inalterado>",
      "quadrante": "Q1|Q2|Q3|Q4|NC",
      "oe": "<id do OE ou ''>",
      "responsavel": "<nome ou ''>",
      "prazo": "YYYY-MM-DD ou ''",
      "resultado": "<texto>",
      "_motivo": "<por que mudou, em uma frase>"
    }
  ],
  "duplicatas": [
    ["<id1>", "<id2>", "<motivo curto>"]
  ],
  "orfas": [
    { "id": "<id>", "problema": "sem responsavel|sem oe|sem prazo|..." }
  ]
}

IMPORTANTE: inclua na lista "tarefas" APENAS as tarefas que sofreram alguma alteração. Se nada mudou em uma tarefa, não a inclua. Mantenha o id original. Não invente ids.

## Tarefas atuais (${lista.length})
${JSON.stringify(lista.map(_riaTarefaSlim), null, 2)}
`;

  const ta = $('#ria-prompt');
  if (ta) ta.value = prompt;
  $('#ria-copiar').disabled = false;
  $('#ria-resumo-gerar').textContent = `${lista.length} tarefa(s) incluídas. Cerca de ${prompt.length.toLocaleString('pt-BR')} caracteres.`;
  // Guarda originais (para diff) após gerar
  _riaOriginais = new Map(lista.map(t => [t.id, t]));
}

async function copiarPromptIA() {
  const ta = $('#ria-prompt');
  if (!ta || !ta.value) return;
  try {
    await navigator.clipboard.writeText(ta.value);
    mostrarFlash('Prompt copiado.');
  } catch (_) {
    ta.select();
    document.execCommand('copy');
    mostrarFlash('Prompt copiado.');
  }
}

function _riaExtrairJSON(texto) {
  // Aceita JSON puro ou em bloco de código. Pega do primeiro "{" ao último "}".
  const t = (texto || '').trim();
  if (!t) return null;
  const i = t.indexOf('{');
  const j = t.lastIndexOf('}');
  if (i < 0 || j < i) return null;
  const candidato = t.slice(i, j + 1);
  try { return JSON.parse(candidato); } catch (e) { return null; }
}

function analisarRespostaIA() {
  const errEl = $('#ria-erro');
  errEl.textContent = '';
  const ta = $('#ria-resposta');
  const obj = _riaExtrairJSON(ta?.value || '');
  if (!obj) {
    errEl.textContent = 'JSON inválido. Confira se a IA retornou um objeto começando com { e terminando com }.';
    return;
  }
  const out = {
    tarefas: Array.isArray(obj.tarefas) ? obj.tarefas : [],
    duplicatas: Array.isArray(obj.duplicatas) ? obj.duplicatas : [],
    orfas: Array.isArray(obj.orfas) ? obj.orfas : [],
  };
  if (!_riaOriginais) {
    // Caso o usuário cole resposta sem ter gerado prompt na sessão atual
    _riaOriginais = new Map(tarefas.map(t => [t.id, t]));
  }
  // Filtra tarefas inválidas (sem id ou id desconhecido)
  out.tarefas = out.tarefas.filter(r => r && typeof r.id === 'string' && _riaOriginais.has(r.id));
  _riaRevisao = out;
  renderDiffIA();
}

function _riaCampoDiff(antes, depois) {
  const a = (antes == null ? '' : String(antes)).trim();
  const b = (depois == null ? '' : String(depois)).trim();
  return a !== b;
}

function _riaCamposComparados(orig, rev) {
  // Retorna lista de { campo, label, antes, depois } com diferenças
  const linhas = [];
  const compara = [
    { k: 'titulo',      label: 'Título' },
    { k: 'quadrante',   label: 'Quadrante', antesFn: t => quadranteDe(t) },
    { k: 'oe',          label: 'OE',        antesFn: t => t.objetivo || '' },
    { k: 'responsavel', label: 'Responsável' },
    { k: 'prazo',       label: 'Prazo' },
    { k: 'resultado',   label: 'Resultado' },
  ];
  for (const c of compara) {
    const antes = c.antesFn ? c.antesFn(orig) : (orig[c.k] || '');
    if (rev[c.k] === undefined) continue;
    const depois = rev[c.k] || '';
    if (_riaCampoDiff(antes, depois)) {
      linhas.push({ campo: c.k, label: c.label, antes, depois });
    }
  }
  return linhas;
}

function renderDiffIA() {
  const bloco = $('#ria-diff-bloco');
  const lista = $('#ria-diff-lista');
  const dupBloco = $('#ria-duplicatas-bloco');
  const dupLista = $('#ria-duplicatas-lista');
  const orfBloco = $('#ria-orfas-bloco');
  const orfLista = $('#ria-orfas-lista');
  if (!_riaRevisao) return;

  bloco.hidden = false;

  const cards = [];
  let comMudancas = 0;
  for (const rev of _riaRevisao.tarefas) {
    const orig = _riaOriginais.get(rev.id);
    if (!orig) continue;
    const diffs = _riaCamposComparados(orig, rev);
    if (!diffs.length) continue;
    comMudancas++;
    const motivo = rev._motivo ? `<div class="diff-motivo">${escHtml(rev._motivo)}</div>` : '';
    const linhasHTML = diffs.map(d => `
      <div class="diff-row">
        <div class="diff-row__label">${escHtml(d.label)}</div>
        <div class="diff-old">${escHtml(d.antes) || '<span class="muted">(vazio)</span>'}</div>
        <div class="diff-arrow">→</div>
        <div class="diff-new">${escHtml(d.depois) || '<span class="muted">(vazio)</span>'}</div>
      </div>
    `).join('');
    cards.push(`
      <div class="diff-card" data-id="${escHtml(rev.id)}">
        <div class="diff-card__head">
          <label class="chk">
            <input type="checkbox" class="diff-aceitar" data-id="${escHtml(rev.id)}" checked />
            <strong>${escHtml(orig.titulo || '(sem título)')}</strong>
          </label>
          <span class="diff-quad-chip diff-quad-chip--${escHtml(quadranteDe(orig))}">${escHtml(quadranteDe(orig))}</span>
        </div>
        ${motivo}
        <div class="diff-rows">${linhasHTML}</div>
      </div>
    `);
  }
  lista.innerHTML = cards.length
    ? cards.join('')
    : '<p class="muted">A IA não sugeriu mudanças.</p>';

  // Duplicatas
  if (_riaRevisao.duplicatas.length) {
    dupBloco.hidden = false;
    dupLista.innerHTML = _riaRevisao.duplicatas.map(d => {
      const [id1, id2, motivo] = Array.isArray(d) ? d : [d.id1, d.id2, d.motivo];
      const t1 = _riaOriginais.get(id1) || tarefas.find(x => x.id === id1);
      const t2 = _riaOriginais.get(id2) || tarefas.find(x => x.id === id2);
      if (!t1 || !t2) return '';
      return `<div class="diff-card">
        <div><strong>${escHtml(t1.titulo)}</strong> ↔ <strong>${escHtml(t2.titulo)}</strong></div>
        <div class="diff-motivo">${escHtml(motivo || '')}</div>
      </div>`;
    }).join('');
  } else {
    dupBloco.hidden = true;
  }

  // Órfãs
  if (_riaRevisao.orfas.length) {
    orfBloco.hidden = false;
    orfLista.innerHTML = _riaRevisao.orfas.map(o => {
      const t = _riaOriginais.get(o.id) || tarefas.find(x => x.id === o.id);
      if (!t) return '';
      return `<div class="diff-card">
        <div><strong>${escHtml(t.titulo)}</strong></div>
        <div class="diff-motivo">Problema: ${escHtml(o.problema || '')}</div>
        <button class="btn btn--ghost btn--sm" data-ria-editar="${escHtml(t.id)}" type="button">Editar</button>
      </div>`;
    }).join('');
  } else {
    orfBloco.hidden = true;
  }

  $('#ria-diff-resumo').innerHTML =
    `<strong>${comMudancas}</strong> tarefa(s) com alterações · <strong>${_riaRevisao.duplicatas.length}</strong> duplicata(s) · <strong>${_riaRevisao.orfas.length}</strong> órfã(s).`;
}

async function aplicarRevisaoIA() {
  if (!_riaRevisao) return;
  const aceitos = new Set(
    Array.from(document.querySelectorAll('.diff-aceitar'))
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.id)
  );
  if (aceitos.size === 0) {
    mostrarMsg('Nenhuma tarefa marcada para aplicar.', true);
    return;
  }
  const ok = await confirmar('Aplicar revisão da IA?',
    `Serão atualizadas ${aceitos.size} tarefa(s). Um backup automático será salvo no navegador.`);
  if (!ok) return;

  // Backup
  _write(KEY_TAREFAS_V3 + '_backup_ia', { tarefas, salvoEm: new Date().toISOString() });

  let aplicadas = 0;
  for (const rev of _riaRevisao.tarefas) {
    if (!aceitos.has(rev.id)) continue;
    const idx = tarefas.findIndex(t => t.id === rev.id);
    if (idx < 0) continue;
    const t = tarefas[idx];
    if (rev.titulo !== undefined && rev.titulo !== null && String(rev.titulo).trim()) {
      t.titulo = String(rev.titulo).trim();
    }
    if (rev.quadrante) {
      const iu = quadranteParaImpUrg(rev.quadrante);
      t.importante = iu.importante;
      t.urgente = iu.urgente;
    }
    if (rev.oe !== undefined) t.objetivo = String(rev.oe || '').trim();
    if (rev.responsavel !== undefined) t.responsavel = String(rev.responsavel || '').trim();
    if (rev.prazo !== undefined) t.prazo = String(rev.prazo || '').trim();
    if (rev.resultado !== undefined) t.resultado = String(rev.resultado || '').trim();
    t.atualizadaEm = new Date().toISOString();
    aplicadas++;
  }
  salvarTarefas();
  renderTudo();
  mostrarMsg(`Revisão aplicada a ${aplicadas} tarefa(s). Backup salvo.`);
  fecharPainelRevisaoIA();
}

function abrirPainelRevisaoIA() {
  // Fecha outros painéis
  fecharPainelExportar?.();
  fecharEmailLote?.();
  const p = $('#panel-revisao-ia');
  if (!p) return;
  // Reset estado
  _riaRevisao = null;
  _riaOriginais = null;
  $('#ria-prompt').value = '';
  $('#ria-resposta').value = '';
  $('#ria-erro').textContent = '';
  $('#ria-resumo-gerar').textContent = '';
  $('#ria-copiar').disabled = true;
  $('#ria-diff-bloco').hidden = true;
  $('#ria-diff-lista').innerHTML = '';
  p.hidden = false;
  p.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fecharPainelRevisaoIA() {
  const p = $('#panel-revisao-ia');
  if (p) p.hidden = true;
}

function bindPainelRevisaoIA() {
  $('#btn-revisao-ia')?.addEventListener('click', abrirPainelRevisaoIA);
  $('#ria-close')?.addEventListener('click', fecharPainelRevisaoIA);
  $('#ria-gerar')?.addEventListener('click', gerarPromptIA);
  $('#ria-copiar')?.addEventListener('click', copiarPromptIA);
  $('#ria-analisar')?.addEventListener('click', analisarRespostaIA);
  $('#ria-aplicar')?.addEventListener('click', aplicarRevisaoIA);
  $('#ria-marcar-todas')?.addEventListener('click', () => {
    document.querySelectorAll('.diff-aceitar').forEach(cb => { cb.checked = true; });
  });
  $('#ria-desmarcar-todas')?.addEventListener('click', () => {
    document.querySelectorAll('.diff-aceitar').forEach(cb => { cb.checked = false; });
  });
  // Editar órfã (delegado)
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-ria-editar]');
    if (!b) return;
    const id = b.dataset.riaEditar;
    if (id && typeof abrirEdicao === 'function') abrirEdicao(id);
  });
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

// Helper de categoria para e-mail (Leva 20: bloco de despacho removido)
function _categoriaDeTask(t) {
  if (t.status === 'concluida') return 'concluida';
  if (isAtrasada(t)) return 'atrasada';
  if (t.status === 'bloqueada') return 'bloqueada';
  if (t.prioridade === 'alta') return 'alta';
  if (t.status === 'em-andamento') return 'andamento';
  return 'rotina';
}

let _emailTarefaId = null;

// Tom do e-mail (institucional|pessoal). Persiste durante a sessão do modal.
let _emailTom = 'pessoal';

function abrirEmailModal(id, opts) {
  // Leva 14: o modal antigo dlg-email (Tom/Assunto/templates) foi descontinuado.
  // Qualquer chamada externa é redirecionada ao modal de IA.
  return abrirIAEmailDireto(id);
  // código legado abaixo mantido apenas como referência, nunca executado.
  /* eslint-disable no-unreachable */
  const t = tarefas.find(x => x.id === id);
  if (!t) return;
  _emailTarefaId = id;
  const tplInicial = (opts && opts.template) ? opts.template : 'auto';
  $('#email-template').value = tplInicial;
  $('#email-tratamento').value = 'voce';
  $('#email-nome').value = '';
  $('#email-nome-wrap').hidden = true;
  // tom default: pessoal (e-mails internos costumam ser mais cordiais que despachos)
  _emailTom = 'pessoal';
  // assunto default: curto. Corpo default: normal.
  _emailModoAssunto = 'curto';
  _emailModoCorpo = 'normal';
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

// Estado do modal de e-mail: assunto (curto/completo) e corpo (normal/compacto)
let _emailModoAssunto = 'curto';   // 'curto' (rotulo + titulo truncado) | 'completo' (rotulo + titulo completo)
let _emailModoCorpo = 'normal';    // 'normal' | 'compacto' (apenas para lembrete/cobranca)

// Trunca string a max chars preservando palavra inteira sempre que possível
function _truncSmart(s, max) {
  if (!s) return '';
  if (s.length <= max) return s;
  const corte = s.slice(0, max);
  const ultimoEsp = corte.lastIndexOf(' ');
  // só quebra na palavra se o espaço estiver razoavelmente perto do fim
  const base = (ultimoEsp >= max - 12 ? corte.slice(0, ultimoEsp) : corte).replace(/[\s\u2014,;:.!?-]+$/, '');
  return base + '…';
}

// Próximos passos contextuais por palavras-chave do título (1–2 itens curtos),
// usados quando os próximos passos genéricos não couberem bem.
function _passosContextuaisPorTitulo(titulo) {
  if (!titulo) return [];
  const t = titulo.toLowerCase();
  const matches = [];
  // ordem importa: padrões mais específicos antes
  const regras = [
    // Removido (Leva 6.1): "reunião/alinhamento/agendar" geravam passos genéricos
    // ("Confirmar disponibilidade dos convidados" / "Compartilhar pauta") que o
    // usuário pediu para suprimir. Sem regra → cai no fluxo sem próximos passos.
    { re: /\brelat[óo]rio\b|\bdocumento\b|\bnota t[ée]cnica\b|\bparecer\b/, passos: ['Levantar documentação prévia e referências.', 'Definir responsável pela redação e revisão.'] },
    { re: /\bpainel\b|\bdashboard\b|\bindicador(?:es)?\b/, passos: ['Validar fontes de dados e períodos.', 'Conferir métricas com a área responsável.'] },
    { re: /\bedital\b|\blicitação\b|\bcontratação\b|\btermo de referência\b|\btr\b/, passos: ['Reunir requisitos técnicos atualizados.', 'Confirmar dotação orçamentária.'] },
    { re: /\borçamento\b|\bfinanceiro\b|\bempenho\b/, passos: ['Confirmar disponibilidade orçamentária.', 'Alinhar cronograma de empenho e pagamento.'] },
    { re: /\bvistoria\b|\bvisita técnica\b|\binspeção\b/, passos: ['Confirmar acesso ao local.', 'Definir lista de verificação prévia.'] },
    { re: /\bcontrato\b|\bconvênio\b/, passos: ['Conferir vigência e cláusulas pendentes.', 'Identificar fiscal e gestor responsáveis.'] },
    { re: /\btreinamento\b|\bcapacitação\b|\boficina\b|\bworkshop\b/, passos: ['Definir público-alvo e período.', 'Reservar sala e materiais.'] },
    { re: /\bauditoria\b|\bcontrole interno\b|\bcgu\b|\btcu\b/, passos: ['Reunir documentos solicitados pela equipe.', 'Definir interlocutor técnico para a apuração.'] },
    { re: /\bcorrespondência\b|\bof[íi]cio\b|\bmemorando\b/, passos: ['Conferir destinatário, referências e protocolo.', 'Validar texto antes do envio formal.'] },
    { re: /\bproposta\b|\bplano de trabalho\b/, passos: ['Alinhar escopo e cronograma com a área demandante.'] }
  ];
  for (const r of regras) {
    if (r.re.test(t)) { matches.push(...r.passos); break; }
  }
  // máximo de 2 passos contextuais
  return matches.slice(0, 2);
}

// Mapeia template manual -> categoria de e-mail
function _emailTplToCategoria(tpl, t) {
  if (tpl === 'conclusao') return 'concluida';
  if (tpl === 'cobranca') return 'atrasada';
  if (tpl === 'lembrete') return 'andamento';
  if (tpl === 'reagendamento') return 'andamento';
  if (tpl === 'solicitacao') {
    return (t && t.prioridade === 'alta') ? 'alta' : 'rotina';
  }
  // 'auto' — categoria inferida pela tarefa
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

  // Categoria efetiva: override manual se o usuário escolheu, senão pela tarefa
  const catManual = _emailTplToCategoria(tplManual, t);
  const categoria = catManual || _categoriaDeTask(t);
  const rotuloAss = (tplManual !== 'auto' ? _EMAIL_LABELS_MANUAL[tplManual] : _EMAIL_LABELS[categoria]) || 'Comunicação';

  // Variação estável por tarefa
  const seed = `${t.id}-email`;

  // Frases de abertura específicas para e-mail
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

  // Próximos passos — desativados a pedido do usuário (Leva 6.3): nunca incluir.
  let passos = [];

  // Assunto: dois modos
  //  - 'curto'    : "<Rótulo> — <título truncado a ~50 chars>"
  //  - 'completo' : "<Rótulo> — <título completo>"
  const tituloAssunto = _emailModoAssunto === 'curto' ? _truncSmart(tituloLimpo, 50) : tituloLimpo;
  const assunto = `${rotuloAss} — ${tituloAssunto}`;

  // Modo compacto disponível apenas para lembrete e cobrança (categoria andamento ou atrasada)
  const podeCompacto = (categoria === 'andamento' || categoria === 'atrasada');
  const compacto = podeCompacto && _emailModoCorpo === 'compacto';

  // Corpo
  let corpo = `${voc},\n\n`;
  if (compacto) {
    // 2 parágrafos enxutos: abertura+contexto+fecho condensado, sem próximos passos
    corpo += `${abertura}.${contexto}${resultadoFrase}\n\n`;
    corpo += `${fechoCat}\n\nAtenciosamente,\n\n`;
  } else {
    corpo += `${abertura}.${contexto}${resultadoFrase}\n`;
    if (passos.length) {
      corpo += `\nPróximos passos:\n`;
      passos.forEach(p => { corpo += `  • ${p}\n`; });
    }
    corpo += `\n${fechoCat}\n\nAtenciosamente,\n\n`;
  }
  if (config.meuNome) corpo += `${config.meuNome}`;
  if (config.meuCargo) corpo += `\n${config.meuCargo}`;
  corpo += `\n`;

  $('#email-assunto').value = assunto;
  $('#email-corpo').value = corpo;

  // Sincroniza estado visual dos toggles e visibilidade do toggle compacto
  $$('#dlg-email [data-eassunto]').forEach(b => {
    b.classList.toggle('seg__btn--ativo', b.dataset.eassunto === _emailModoAssunto);
  });
  $$('#dlg-email [data-ecorpo]').forEach(b => {
    b.classList.toggle('seg__btn--ativo', b.dataset.ecorpo === (compacto ? 'compacto' : 'normal'));
  });
  const grpCorpo = $('#dlg-email .email-toggle--corpo');
  if (grpCorpo) grpCorpo.hidden = !podeCompacto;

  // Prévia tipográfica
  const previa = $('#email-previa');
  if (previa) previa.textContent = `Assunto: ${assunto}\n\n${corpo}`;
}

// Versão pura para o lote: gera {assunto, corpo, destinatario} sem mexer no DOM.
// Reaproveita as variações e a lógica de negócio. opts: { tom, assuntoMode, corpoMode, tplManual }
function _montarEmailParaTarefa(t, opts) {
  opts = opts || {};
  const tom = opts.tom || 'institucional';
  const assuntoMode = opts.assuntoMode || 'curto';
  const corpoMode = opts.corpoMode || 'normal';
  const tplManual = opts.tplManual || 'auto';

  const tituloLimpo = _trimPunct(t.titulo || '');
  const resultadoLimpo = t.resultado ? _trimPunct(t.resultado) : null;
  const prazoExt = t.prazo ? fmtDataExtenso(t.prazo) : null;
  const oe = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
  const oeTrecho = oe ? ` (vinculada ao Objetivo Estratégico ${oe.id} — ${oe.curto})` : '';

  const catManual = _emailTplToCategoria(tplManual, t);
  const categoria = catManual || _categoriaDeTask(t);
  const rotuloAss = (tplManual !== 'auto' ? _EMAIL_LABELS_MANUAL[tplManual] : _EMAIL_LABELS[categoria]) || 'Comunicação';
  const seed = `${t.id}-email`;

  // Vocativo
  const respPrim = (t.responsavel || '').split(/\s+/)[0];
  const g = inferirGenero(respPrim);
  let voc;
  if (tom === 'institucional') {
    voc = g === 'f' ? 'Prezada Senhora' : 'Prezado Senhor';
  } else {
    const prefixo = g === 'f' ? 'Prezada' : (g === 'm' ? 'Prezado' : 'Prezado(a)');
    voc = respPrim ? `${prefixo} ${respPrim}` : prefixo;
  }

  // Aberturas / fechos: mesmo catálogo do atualizarCorpoEmail (replicamos para não acoplar)
  const VAR = {
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
  const FECHOS = {
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
  const abertura = _pickStable(VAR[categoria] || VAR.rotina, seed + ':a');
  const fechoCat = _pickStable(FECHOS[categoria] || FECHOS.rotina, seed + ':f');

  // Contexto de prazo
  let contexto = '';
  if (categoria === 'atrasada' && prazoExt) contexto = ` O prazo previsto era ${prazoExt}.`;
  else if (categoria === 'bloqueada' && prazoExt) contexto = ` O prazo previsto é ${prazoExt}.`;
  else if (categoria === 'alta') contexto = prazoExt ? ` Solicito conclusão até ${prazoExt}.` : ' Solicito definição de prazo de execução tão logo possível.';
  else if (categoria === 'andamento' && prazoExt) contexto = ` O prazo previsto é ${prazoExt}.`;
  else if (categoria === 'rotina' && prazoExt) contexto = ` Sugere-se como prazo ${prazoExt}, passível de revisão de comum acordo.`;

  let resultadoFrase = '';
  if (resultadoLimpo) {
    resultadoFrase = (categoria === 'concluida')
      ? ` Como entrega, registra-se: ${resultadoLimpo}.`
      : ` Como entrega prevista, registra-se: ${resultadoLimpo}.`;
  }

  // Próximos passos — desativados a pedido do usuário (Leva 6.3): nunca incluir.
  let passos = [];

  // Assunto
  const tituloAssunto = assuntoMode === 'curto' ? _truncSmart(tituloLimpo, 50) : tituloLimpo;
  const assunto = `${rotuloAss} — ${tituloAssunto}`;

  const podeCompacto = (categoria === 'andamento' || categoria === 'atrasada');
  const compacto = podeCompacto && corpoMode === 'compacto';

  let corpo = `${voc},\n\n`;
  if (compacto) {
    corpo += `${abertura}.${contexto}${resultadoFrase}\n\n`;
    corpo += `${fechoCat}\n\nAtenciosamente,\n\n`;
  } else {
    corpo += `${abertura}.${contexto}${resultadoFrase}\n`;
    if (passos.length) {
      corpo += `\nPróximos passos:\n`;
      passos.forEach(p => { corpo += `  • ${p}\n`; });
    }
    corpo += `\n${fechoCat}\n\nAtenciosamente,\n\n`;
  }
  if (config.meuNome) corpo += `${config.meuNome}`;
  if (config.meuCargo) corpo += `\n${config.meuCargo}`;
  corpo += `\n`;

  return {
    assunto,
    corpo,
    destinatario: t.responsavel || '—',
    categoria,
    rotulo: rotuloAss,
    numero: '',
    titulo: tituloLimpo
  };
}

// Monta UM único e-mail consolidando várias tarefas para o mesmo destinatário.
// Cabeçalho de vocativo, abertura sucinta + seções numeradas por tarefa, fecho único.
function _montarEmailConsolidado(tarefasDoDest, opts) {
  opts = opts || {};
  const tom = opts.tom || 'institucional';
  const assuntoMode = opts.assuntoMode || 'curto';
  const corpoMode = opts.corpoMode || 'normal';
  if (!tarefasDoDest || !tarefasDoDest.length) return null;
  const destinatario = tarefasDoDest[0].responsavel || '—';
  // Vocativo coerente com o modo individual
  const respPrim = (destinatario || '').split(/\s+/)[0];
  const g = inferirGenero(respPrim);
  let voc;
  if (tom === 'institucional') {
    voc = g === 'f' ? 'Prezada Senhora' : 'Prezado Senhor';
  } else {
    const prefixo = g === 'f' ? 'Prezada' : (g === 'm' ? 'Prezado' : 'Prezado(a)');
    voc = (destinatario && destinatario !== '—') ? `${prefixo} ${respPrim}` : prefixo;
  }
  const n = tarefasDoDest.length;
  // Abertura institucional/pessoal padrão, sem listar títulos no início para evitar redundância.
  let abertura;
  if (n === 1) {
    abertura = `submeto à sua apreciação a demanda relacionada a seguir`;
  } else if (n === 2) {
    abertura = `submeto à sua apreciação duas demandas, conforme detalhado a seguir`;
  } else {
    const numExt = ['três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze'][n-3] || `${n}`;
    abertura = `submeto à sua apreciação ${numExt} demandas, conforme detalhado a seguir`;
  }
  // Monta blocos por tarefa (numeração 1, 2, 3...)
  const blocos = [];
  const itensInternos = [];
  tarefasDoDest.forEach((t, i) => {
    const tituloLimpo = _trimPunct(t.titulo || '');
    const resultadoLimpo = t.resultado ? _trimPunct(t.resultado) : null;
    const prazoExt = t.prazo ? fmtDataExtenso(t.prazo) : null;
    const oe = t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
    const oeTrecho = oe ? ` (Objetivo Estratégico ${oe.id} — ${oe.curto})` : '';
    const categoria = _categoriaDeTask(t);
    const rotuloAss = _EMAIL_LABELS[categoria] || 'Comunicação';
    // linha de status amigável
    let statusFrase = '';
    if (categoria === 'concluida') statusFrase = ' Demanda concluída.';
    else if (categoria === 'atrasada' && prazoExt) statusFrase = ` Prazo previsto: ${prazoExt} (vencido).`;
    else if (categoria === 'bloqueada' && prazoExt) statusFrase = ` Prazo previsto: ${prazoExt}. Existem entraves a tratar.`;
    else if (categoria === 'bloqueada') statusFrase = ' Existem entraves a tratar.';
    else if (categoria === 'alta' && prazoExt) statusFrase = ` Trato prioritário. Solicito conclusão até ${prazoExt}.`;
    else if (categoria === 'alta') statusFrase = ' Trato prioritário.';
    else if (categoria === 'andamento' && prazoExt) statusFrase = ` Prazo previsto: ${prazoExt}.`;
    else if (categoria === 'rotina' && prazoExt) statusFrase = ` Sugere-se prazo até ${prazoExt}, passível de revisão de comum acordo.`;
    let resultadoFrase = '';
    if (resultadoLimpo) {
      resultadoFrase = (categoria === 'concluida')
        ? ` Entrega registrada: ${resultadoLimpo}.`
        : ` Entrega prevista: ${resultadoLimpo}.`;
    }
    // Próximos passos — desativados a pedido do usuário (Leva 6.3): nunca incluir.
    let bloco = `${i+1}. ${tituloLimpo}${oeTrecho} — ${rotuloAss}.${statusFrase}${resultadoFrase}`;
    blocos.push(bloco);
    itensInternos.push({ id: t.id, titulo: tituloLimpo, categoria, rotulo: rotuloAss, numero: '' });
  });
  // Fecho único, neutro
  const fecho = 'Permaneço à disposição para esclarecimentos e ajustes que se fizerem necessários.';
  // Assunto consolidado
  let assunto;
  if (assuntoMode === 'curto') {
    assunto = n === 1
      ? `Comunicação — ${_truncSmart(itensInternos[0].titulo, 50)}`
      : `Comunicação consolidada — ${n} demandas`;
  } else {
    assunto = n === 1
      ? `${itensInternos[0].rotulo} — ${itensInternos[0].titulo}`
      : `Comunicação consolidada — ${n} demandas`;
  }
  // Corpo final
  let corpo = `${voc},\n\n`;
  corpo += `${abertura}.\n\n`;
  corpo += blocos.join('\n\n');
  corpo += `\n\n${fecho}\n\nAtenciosamente,\n\n`;
  if (config.meuNome) corpo += `${config.meuNome}`;
  if (config.meuCargo) corpo += `\n${config.meuCargo}`;
  corpo += `\n`;
  return {
    assunto,
    corpo,
    destinatario,
    categoria: 'consolidado',
    rotulo: 'Consolidado',
    numero: '',
    titulo: `${n} demandas`,
    consolidado: true,
    qtdTarefas: n,
    tarefasIds: tarefasDoDest.map(t => t.id)
  };
}

// Estado do modal de e-mail em lote
let _emailLoteTom = 'institucional';
let _emailLoteAssunto = 'curto';
let _emailLoteCorpo = 'normal';
let _emailLoteAgrup = 'destinatario'; // 'destinatario' (consolidado) | 'tarefa' (um por tarefa)

// Agrupa tarefas por destinatário antes de gerar e-mails
function _agruparTarefasPorDest(lista) {
  const grupos = new Map();
  for (const t of lista) {
    const k = (t.responsavel || '—').trim() || '—';
    if (!grupos.has(k)) grupos.set(k, []);
    grupos.get(k).push(t);
  }
  return grupos;
}

// Retorna lista de "itens de e-mail" prontos. Cada item:
//   { destinatario, email: {assunto, corpo, categoria, rotulo, ...}, tarefasIds: [...] , key }
// No modo 'destinatario': 1 item por destinatário (consolidado).
// No modo 'tarefa': 1 item por tarefa.
function _emailsLoteSelecionados() {
  const ids = Array.from(selecaoTarefasIds);
  const lista = ids.map(id => tarefas.find(t => t.id === id)).filter(Boolean);
  const opts = { tom: _emailLoteTom, assuntoMode: _emailLoteAssunto, corpoMode: _emailLoteCorpo };
  if (_emailLoteAgrup === 'destinatario') {
    const grupos = _agruparTarefasPorDest(lista);
    const itens = [];
    let i = 0;
    for (const [dest, ts] of grupos) {
      const email = _montarEmailConsolidado(ts, opts);
      if (!email) continue;
      itens.push({ key: `g${i++}`, destinatario: dest, email, tarefasIds: ts.map(t => t.id) });
    }
    return itens;
  } else {
    return lista.map((t, i) => {
      const email = _montarEmailParaTarefa(t, Object.assign({ tplManual: 'auto' }, opts));
      return { key: `t${i}-${t.id}`, destinatario: t.responsavel || '—', email, tarefasIds: [t.id] };
    });
  }
}

function renderEmailLote() {
  const itens = _emailsLoteSelecionados();
  const totalTarefas = itens.reduce((s, it) => s + it.tarefasIds.length, 0);
  const totalEmails = itens.length;
  const destSet = new Set(itens.map(it => it.destinatario));
  const nDest = destSet.size;
  let resumo;
  if (_emailLoteAgrup === 'destinatario') {
    resumo = `<strong>${totalEmails}</strong> e-mail(s) consolidando <strong>${totalTarefas}</strong> tarefa(s) para <strong>${nDest}</strong> destinatário(s).`;
  } else {
    resumo = `<strong>${totalEmails}</strong> e-mail(s) para <strong>${nDest}</strong> destinatário(s).`;
  }
  $('#email-lote-resumo').innerHTML = resumo;

  // Sincroniza visual dos toggles
  $$('#panel-email-lote [data-eltom]').forEach(b => b.classList.toggle('seg__btn--ativo', b.dataset.eltom === _emailLoteTom));
  $$('#panel-email-lote [data-elassunto]').forEach(b => b.classList.toggle('seg__btn--ativo', b.dataset.elassunto === _emailLoteAssunto));
  $$('#panel-email-lote [data-elcorpo]').forEach(b => b.classList.toggle('seg__btn--ativo', b.dataset.elcorpo === _emailLoteCorpo));
  $$('#panel-email-lote [data-elagrup]').forEach(b => b.classList.toggle('seg__btn--ativo', b.dataset.elagrup === _emailLoteAgrup));

  // Agrupa visualmente por destinatário (mesmo no modo 'tarefa', é mais legível)
  const blocosPorDest = new Map();
  for (const it of itens) {
    const k = it.destinatario;
    if (!blocosPorDest.has(k)) blocosPorDest.set(k, []);
    blocosPorDest.get(k).push(it);
  }

  let html = '';
  let idx = 0;
  for (const [dest, lista] of blocosPorDest) {
    const qtdInfo = (_emailLoteAgrup === 'destinatario')
      ? `${lista[0].tarefasIds.length} tarefa(s) em 1 e-mail`
      : `${lista.length} e-mail(s)`;
    html += `<div class="el-grupo"><div class="el-grupo__head"><span class="el-grupo__dest">${escHtml(dest)}</span><span class="el-grupo__qtd">${escHtml(qtdInfo)}</span></div>`;
    for (const it of lista) {
      idx++;
      const m = it.email;
      const podeEditar = (_emailLoteAgrup === 'tarefa');
      html += `
        <article class="el-item" data-key="${escHtml(it.key)}">
          <header class="el-item__head">
            <span class="el-item__num">${idx}.</span>
            <span class="el-item__assunto">${escHtml(m.assunto)}</span>
            <span class="el-item__cat el-cat--${escHtml(m.categoria)}">${escHtml(m.rotulo)}</span>
          </header>
          <pre class="el-item__corpo">${escHtml(m.corpo)}</pre>
          <div class="el-item__acoes">
            <button type="button" class="btn btn--ghost btn--sm" data-elact="copy" data-key="${escHtml(it.key)}">Copiar</button>
            <button type="button" class="btn btn--ghost btn--sm" data-elact="mailto" data-key="${escHtml(it.key)}">Abrir no cliente</button>
            ${podeEditar ? `<button type="button" class="btn btn--ghost btn--sm" data-elact="editar" data-tid="${escHtml(it.tarefasIds[0])}">Editar individualmente</button>` : ''}
          </div>
        </article>`;
    }
    html += `</div>`;
  }
  $('#email-lote-conteudo').innerHTML = html || '<p class="el-vazio">Selecione tarefas no quadro para gerar os e-mails.</p>';
  // Guarda payload para exportação e ações
  $('#panel-email-lote').dataset.itens = JSON.stringify(itens.map(it => ({
    key: it.key,
    destinatario: it.email.destinatario,
    assunto: it.email.assunto,
    corpo: it.email.corpo
  })));
}

function abrirEmailLote() {
  const ids = Array.from(selecaoTarefasIds);
  if (!ids.length) { mostrarMsg('Selecione ao menos uma tarefa.', true); return; }
  // resets sensatos
  _emailLoteTom = 'institucional';
  _emailLoteAssunto = 'curto';
  _emailLoteCorpo = 'normal';
  _emailLoteAgrup = 'destinatario';
  renderEmailLote();
  const painel = $('#panel-email-lote');
  painel.hidden = false;
  painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fecharEmailLote() {
  const painel = $('#panel-email-lote');
  if (painel) painel.hidden = true;
}

function _emailLoteTextoTudo() {
  const itens = JSON.parse($('#panel-email-lote').dataset.itens || '[]');
  const blocos = itens.map((it, i) => {
    return `=== E-mail ${i+1} — Para: ${it.destinatario} ===\nAssunto: ${it.assunto}\n\n${it.corpo}`;
  });
  return blocos.join('\n\n' + '─'.repeat(60) + '\n\n');
}

async function exportarEmailLoteDocx() {
  await carregarLibDocx();
  const D = window.docx;
  if (!D) { alert('Não foi possível carregar a biblioteca Word.'); return; }
  const itens = JSON.parse($('#panel-email-lote').dataset.itens || '[]');
  if (!itens.length) return;
  const P = D.Paragraph, T = D.TextRun, HL = D.HeadingLevel;
  const elementos = [];
  elementos.push(new P({ heading: HL.HEADING_1, children: [new T({ text: `Lote de e-mails (${itens.length})` })] }));
  elementos.push(new P({ children: [new T({ text: fmtDataExtenso(hojeISO()) })] }));
  elementos.push(new P({ children: [new T({ text: '' })] }));
  itens.forEach((it, i) => {
    elementos.push(new P({ heading: HL.HEADING_2, children: [new T({ text: `E-mail ${i+1} — Para ${it.destinatario}` })] }));
    elementos.push(new P({ children: [new T({ text: `Assunto: ${it.assunto}`, bold: true })] }));
    elementos.push(new P({ children: [new T({ text: '' })] }));
    for (const linha of String(it.corpo).split('\n')) {
      elementos.push(new P({ children: [new T({ text: linha })] }));
    }
    elementos.push(new P({ children: [new T({ text: '' })] }));
  });
  const doc = new D.Document({
    styles: { default: { document: { run: { font: 'Times New Roman', size: 24 } } } },
    sections: [{ properties: { page: { margin: { top: 1700, right: 1133, bottom: 1133, left: 1700 } } }, children: elementos }]
  });
  const blob = await D.Packer.toBlob(doc);
  baixar(blob, `lote_emails_${hojeISO()}.docx`);
}

function bindEmailLote() {
  // botão da toolbar
  document.addEventListener('click', e => {
    if (e.target.id === 'btn-emailar-lote') {
      abrirEmailLote();
      return;
    }
  });
  // ações dentro do painel inline
  document.addEventListener('click', e => {
    if (e.target.id === 'el-close') {
      fecharEmailLote();
      return;
    }
    // toggles
    const tomBtn = e.target.closest('#panel-email-lote [data-eltom]');
    if (tomBtn) { _emailLoteTom = tomBtn.dataset.eltom; renderEmailLote(); return; }
    const assBtn = e.target.closest('#panel-email-lote [data-elassunto]');
    if (assBtn) { _emailLoteAssunto = assBtn.dataset.elassunto; renderEmailLote(); return; }
    const corpoBtn = e.target.closest('#panel-email-lote [data-elcorpo]');
    if (corpoBtn) { _emailLoteCorpo = corpoBtn.dataset.elcorpo; renderEmailLote(); return; }
    const agrupBtn = e.target.closest('#panel-email-lote [data-elagrup]');
    if (agrupBtn) { _emailLoteAgrup = agrupBtn.dataset.elagrup; renderEmailLote(); return; }
    // ações por item
    const actBtn = e.target.closest('#panel-email-lote [data-elact]');
    if (actBtn) {
      const act = actBtn.dataset.elact;
      if (act === 'editar') {
        const tid = actBtn.dataset.tid;
        if (!tid) return;
        fecharEmailLote();
        abrirIAEmailDireto(tid);
        return;
      }
      const key = actBtn.dataset.key;
      const itens = JSON.parse($('#panel-email-lote').dataset.itens || '[]');
      const it = itens.find(x => x.key === key);
      if (!it) return;
      if (act === 'copy') {
        navigator.clipboard.writeText(`Assunto: ${it.assunto}\n\n${it.corpo}`).then(() => mostrarFlash('E-mail copiado.'));
      } else if (act === 'mailto') {
        const url = `mailto:?subject=${encodeURIComponent(it.assunto)}&body=${encodeURIComponent(it.corpo)}`;
        window.location.href = url;
      }
      return;
    }
    // botões do rodapé
    if (e.target.id === 'btn-el-copy-tudo') {
      navigator.clipboard.writeText(_emailLoteTextoTudo()).then(() => mostrarFlash('Lote copiado.'));
    } else if (e.target.id === 'btn-el-docx') {
      exportarEmailLoteDocx();
    } else if (e.target.id === 'btn-el-print') {
      const w = window.open('', '_blank');
      if (w) {
        w.document.write('<pre style="font-family:Times,serif;font-size:13px;white-space:pre-wrap;padding:24px">' + escHtml(_emailLoteTextoTudo()) + '</pre>');
        w.document.close(); w.print();
      }
    } else if (e.target.id === 'btn-el-abrir-todos') {
      // abre até 5 mailto consecutivos (mais que isso fica abusivo)
      const itens = JSON.parse($('#panel-email-lote').dataset.itens || '[]');
      const limite = Math.min(itens.length, 5);
      if (itens.length > 5) {
        if (!confirm(`Você tem ${itens.length} e-mails. Vou abrir os 5 primeiros agora; clique novamente para os próximos.`)) return;
      }
      for (let i = 0; i < limite; i++) {
        const it = itens[i];
        const url = `mailto:?subject=${encodeURIComponent(it.assunto)}&body=${encodeURIComponent(it.corpo)}`;
        // delay leve para não sobrescrever
        setTimeout(() => { window.open(url, '_blank'); }, i * 300);
      }
    }
  });
}

function bindEmail() {
  // Toggle de tom (Pessoal/Institucional) no modal de e-mail
  document.addEventListener('click', e => {
    const tomBtn = e.target.closest('#dlg-email [data-etom]');
    if (tomBtn) {
      _emailTom = tomBtn.dataset.etom === 'institucional' ? 'institucional' : 'pessoal';
      atualizarCorpoEmail();
      return;
    }
    const assBtn = e.target.closest('#dlg-email [data-eassunto]');
    if (assBtn) {
      _emailModoAssunto = assBtn.dataset.eassunto === 'completo' ? 'completo' : 'curto';
      atualizarCorpoEmail();
      return;
    }
    const corpoBtn = e.target.closest('#dlg-email [data-ecorpo]');
    if (corpoBtn) {
      _emailModoCorpo = corpoBtn.dataset.ecorpo === 'compacto' ? 'compacto' : 'normal';
      atualizarCorpoEmail();
      return;
    }
  });
}

// === Modal "Sobre os quadrantes" (Leva 7) =================================
function renderSobreQuadrantes() {
  const ordem = ['Q1', 'Q2', 'Q3', 'Q4'];
  const html = ordem.map(qid => {
    const q = QUADRANTES[qid];
    const liNat = (q.natureza || []).map(x => `<li>${escHtml(x)}</li>`).join('');
    const liEx  = (q.exemplos || []).map(x => `<li>${escHtml(x)}</li>`).join('');
    const liPap = (q.papel || []).map(x => `<li>${escHtml(x)}</li>`).join('');
    const nota  = q.nota ? `<p class="sq-nota">${escHtml(q.nota)}</p>` : '';
    return `
      <article class="sq-card sq-card--${qid.toLowerCase()}">
        <header class="sq-card__head">
          <span class="sq-card__id">${qid}</span>
          <div class="sq-card__titles">
            <h4>${escHtml(q.nome)}</h4>
            <p class="sq-card__sub">${escHtml(q.postura)}</p>
          </div>
        </header>
        <div class="sq-card__cols">
          <section><h5>Natureza</h5><ul>${liNat}</ul></section>
          <section><h5>Exemplos</h5><ul>${liEx}</ul></section>
          <section><h5>Papel da liderança</h5><ul>${liPap}</ul></section>
        </div>
        ${nota}
      </article>`;
  }).join('');
  $('#sq-conteudo').innerHTML = html;
}

function abrirSobreQuadrantes() {
  renderSobreQuadrantes();
  const dlg = $('#dlg-sobre-quadrantes');
  if (dlg && !dlg.open) dlg.showModal();
}

function bindSobreQuadrantes() {
  document.addEventListener('click', e => {
    if (e.target.closest('#btn-sobre-quadrantes')) {
      e.preventDefault();
      abrirSobreQuadrantes();
      return;
    }
    if (e.target.closest('#sq-close, #btn-sq-fechar')) {
      const dlg = $('#dlg-sobre-quadrantes');
      if (dlg && dlg.open) dlg.close();
      return;
    }
    if (e.target.closest('#btn-sugerir-quadrantes')) {
      e.preventDefault();
      aplicarSugestoesQuadranteEmLote();
      return;
    }
  });
}

function bindDrucker() {
  // Banner: chips abrem listagem; botão close oculta na sessão
  document.addEventListener('click', e => {
    const chip = e.target.closest('#banner-drucker [data-druk]');
    if (chip) {
      abrirDruckerLista(chip.dataset.druk);
      return;
    }
    if (e.target.id === 'druk-close') {
      const banner = $('#banner-drucker');
      if (banner) { banner.hidden = true; banner.innerHTML = ''; }
      return;
    }
    if (e.target.id === 'btn-retro') {
      abrirRetrospectiva();
      return;
    }
  });

  // Modal Drucker: ações de despachar/email a partir da lista
  document.addEventListener('click', e => {
    const btn = e.target.closest('#dlg-druk [data-druk-act]');
    if (!btn) return;
    const tid = btn.dataset.tid;
    const act = btn.dataset.druckAct || btn.dataset.drukAct;
    const dlg = $('#dlg-druk');
    if (dlg && dlg.open) dlg.close();
    // Pre-seleciona template conforme tipo do banner Drucker
    const tipoBanner = (dlg && dlg.dataset && dlg.dataset.druktipo) || '';
    const tplPre = tipoBanner === 'cobranca' ? 'cobranca' : (tipoBanner === 'lembrete' ? 'lembrete' : 'auto');
    if (act === 'email') {
      abrirIAEmailDireto(tid);
    }
  });
  // Fechar modal Drucker
  document.addEventListener('click', e => {
    if (e.target.id === 'druk-list-close') {
      const dlg = $('#dlg-druk');
      if (dlg && dlg.open) dlg.close();
    }
  });

  // Modal Retrospectiva: botões de exportação e seletor de período
  document.addEventListener('click', e => {
    if (e.target.id === 'retro-close') {
      const dlg = $('#dlg-retro'); if (dlg && dlg.open) dlg.close();
      return;
    }
    const chipDias = e.target.closest('#dlg-retro [data-retdias]');
    if (chipDias) {
      const n = parseInt(chipDias.dataset.retdias, 10);
      if (n >= 1 && n <= 365) { _retroDias = n; renderRetrospectiva(); }
      return;
    }
    if (e.target.id === 'btn-retro-copy') {
      navigator.clipboard.writeText(_retroTextoPlano()).then(() => mostrarFlash('Retrospectiva copiada.'));
    } else if (e.target.id === 'btn-retro-pdf') {
      exportarRetroPDF();
    } else if (e.target.id === 'btn-retro-docx') {
      exportarRetroDocx();
    } else if (e.target.id === 'btn-retro-print') {
      const w = window.open('', '_blank');
      if (w) { w.document.write('<pre style="font-family:Times,serif;font-size:14px;white-space:pre-wrap;padding:24px">' + escHtml(_retroTextoPlano()) + '</pre>'); w.document.close(); w.print(); }
    }
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
    } else if (e.target.id === 'btn-nova-reuniao-teams') {
      novaReuniaoDiretoNoTeams();
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
  if ($('#rf-hora-fim')) $('#rf-hora-fim').value = '';
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
  if ($('#rf-hora-fim')) $('#rf-hora-fim').value = r.horaFim || '';
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
    r.horaFim = $('#rf-hora-fim') ? $('#rf-hora-fim').value : '';
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
      horaFim: $('#rf-hora-fim') ? $('#rf-hora-fim').value : '',
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

// ---- Deep link: agendar no Teams (Leva 17) ----
// Monta URL https://teams.microsoft.com/l/meeting/new com campos
// pré-preenchidos a partir do objeto reunião. O Teams abre o
// formulário de Nova reunião; usuário revisa e clica Salvar.
// Pauta vai como HTML (Teams renderiza no campo agenda).

function _escTeamsHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Soma horas a uma string "HH:MM" e devolve {data, hora} em ISO local
function _somarHoras(dataYmd, horaHm, deltaHoras) {
  const [hh, mm] = horaHm.split(':').map(Number);
  const dt = new Date(`${dataYmd}T${horaHm}:00`);
  dt.setHours(dt.getHours() + deltaHoras);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  const h = String(dt.getHours()).padStart(2, '0');
  const mi = String(dt.getMinutes()).padStart(2, '0');
  return { data: `${y}-${m}-${d}`, hora: `${h}:${mi}` };
}

function _montarDeepLinkTeams(r) {
  if (!r) return '';
  const subject = (r.titulo || 'Reunião').trim();

  // Data e hora de início
  const dataBase = r.data || new Date().toISOString().slice(0, 10);
  const horaIni = (r.hora && /^\d{2}:\d{2}/.test(r.hora)) ? r.hora.slice(0, 5) : '09:00';
  const startTime = `${dataBase}T${horaIni}:00`;

  // Data e hora de fim — usa r.horaFim se houver, senão início + 1h
  let endData, endHora;
  if (r.horaFim && /^\d{2}:\d{2}/.test(r.horaFim)) {
    endData = dataBase;
    endHora = r.horaFim.slice(0, 5);
    // Se horaFim for menor ou igual à hora início, força +1h
    const [iH, iM] = horaIni.split(':').map(Number);
    const [fH, fM] = endHora.split(':').map(Number);
    if (fH * 60 + fM <= iH * 60 + iM) {
      const inc = _somarHoras(dataBase, horaIni, 1);
      endData = inc.data;
      endHora = inc.hora;
    }
  } else {
    const inc = _somarHoras(dataBase, horaIni, 1);
    endData = inc.data;
    endHora = inc.hora;
  }
  const endTime = `${endData}T${endHora}:00`;

  // ---- Pauta em HTML ----
  const enc = r.encaminhamentos || {};
  const blocos = [];
  blocos.push('<p><strong>Pauta gerada pelo Cebraspe Tasks</strong></p>');

  if (Array.isArray(r.tarefasIds) && r.tarefasIds.length) {
    blocos.push('<p><strong>Tarefas tratadas</strong></p>');
    // Lista plana com supressão de meta repetida (OE/responsável/prazo)
    // O Teams quebra <ol>/<li> com <br>, então usamos <p> com numeração manual.
    let ultimoResp = null, ultimoPrazo = null;
    let idx = 0;
    r.tarefasIds.forEach((tid) => {
      const t = (typeof tarefas !== 'undefined') ? tarefas.find(x => x.id === tid) : null;
      if (!t) return;
      idx += 1;
      const e = enc[tid] || {};
      const respKey = t.responsavel || null;
      const prazoKey = t.prazo || null;
      const meta = [];
      if (respKey && respKey !== ultimoResp) meta.push(`Resp.: ${_escTeamsHtml(respKey)}`);
      if (prazoKey && prazoKey !== ultimoPrazo) meta.push(`Prazo: ${_escTeamsHtml(prazoKey)}`);
      ultimoResp = respKey;
      ultimoPrazo = prazoKey;

      let p = `<p>${idx}. <strong>${_escTeamsHtml(t.titulo)}</strong>`;
      if (meta.length) p += ` &mdash; <span>${meta.join(' &middot; ')}</span>`;
      p += '</p>';
      blocos.push(p);
      if (e.decisao) blocos.push(`<p style="margin-left:18px"><em>Decisão prévia:</em> ${_escTeamsHtml(e.decisao)}</p>`);
      if (e.proximoPasso) blocos.push(`<p style="margin-left:18px"><em>Próximo passo:</em> ${_escTeamsHtml(e.proximoPasso)}</p>`);
    });
  }

  if (r.resumoExecutivo) {
    blocos.push('<p><strong>Resumo executivo</strong></p>');
    blocos.push(`<p>${_escTeamsHtml(r.resumoExecutivo).replace(/\n/g, '<br>')}</p>`);
  }

  if (r.observacoes) {
    blocos.push('<p><strong>Observações</strong></p>');
    blocos.push(`<p>${_escTeamsHtml(r.observacoes).replace(/\n/g, '<br>')}</p>`);
  }

  const content = blocos.join('');

  // ---- Location: separado da pauta ----
  // Se r.local parece URL, deixa apenas como referência textual.
  const location = (r.local || '').trim();

  // ---- Attendees: e-mails diretos OU formato "Nome <email>" ----
  const emails = [];
  (r.participantes || []).forEach(p => {
    if (typeof p !== 'string') return;
    const m = p.match(/<\s*([^<>\s]+@[^<>\s]+)\s*>/);
    if (m) emails.push(m[1].trim());
    else if (/@/.test(p)) emails.push(p.trim());
  });

  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('startTime', startTime);
  params.set('endTime', endTime);
  if (content) params.set('content', content);
  if (location) params.set('location', location);
  if (emails.length) params.set('attendees', emails.join(','));

  return `https://teams.microsoft.com/l/meeting/new?${params.toString()}`;
}

function agendarReuniaoNoTeams(id) {
  const r = reunioes.find(x => x.id === id);
  if (!r) return;
  const url = _montarDeepLinkTeams(r);
  if (!url) return;
  // Avisa quais participantes precisam ser adicionados manualmente
  const naoEmails = (r.participantes || []).filter(p => {
    if (typeof p !== 'string') return false;
    const temEmailNoFormato = /<\s*[^<>\s]+@[^<>\s]+\s*>/.test(p);
    const ehEmailDireto = /@/.test(p);
    return !temEmailNoFormato && !ehEmailDireto;
  });
  if (naoEmails.length) {
    mostrarFlash(`Teams aberto. Adicione manualmente: ${naoEmails.slice(0, 3).join(', ')}${naoEmails.length > 3 ? ' (+' + (naoEmails.length - 3) + ')' : ''}`);
  } else {
    mostrarFlash('Teams aberto com a reunião pré-preenchida.');
  }
  window.open(url, '_blank', 'noopener');
}

// Atalho: abrir Teams direto para Nova reunião em branco
// (sem registrar reunião no app — uso casual)
function novaReuniaoDiretoNoTeams() {
  window.open('https://teams.microsoft.com/l/meeting/new', '_blank', 'noopener');
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
        <button class="btn btn--primary btn--sm" data-teams-reuniao="${r.id}" title="Abrir o Teams com a reunião pré-preenchida">Agendar no Teams</button>
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

  // Agendar no Teams (deep link)
  const btnTeams = $(`[data-teams-reuniao="${id}"]`);
  if (btnTeams) btnTeams.addEventListener('click', () => agendarReuniaoNoTeams(id));

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
   18.B IA — Geração e refinamento (Leva 12)
   =================================================================== */

// ----- Configuração (aba Config → IA) -----
function bindConfigIA() {
  const inp = $('#f-ia-chave');
  const sel = $('#f-ia-modelo');
  const chkMostrar = $('#f-ia-mostrar');
  const btnTestar = $('#btn-ia-testar');
  const btnLimpar = $('#btn-ia-limpar');
  const status = $('#ia-status');
  if (!inp || !btnTestar || !window.IAGemini) return;

  function refletirEstado() {
    const cfg = window.IAGemini.getConfig();
    if (cfg.modelo && sel) sel.value = cfg.modelo;
    if (window.IAGemini.temChave()) {
      const por = cfg.configuradoPor ? ` por ${cfg.configuradoPor}` : '';
      const em = cfg.configuradoEm ? ` em ${cfg.configuradoEm}` : '';
      status.textContent = `Chave configurada${por}${em}. Para trocar, cole uma nova e clique em Testar e salvar.`;
      status.style.color = '#15803d';
    } else {
      status.textContent = 'Sem chave configurada. Cole a chave e clique em Testar e salvar.';
      status.style.color = '#b91c1c';
    }
  }
  refletirEstado();

  if (chkMostrar) chkMostrar.addEventListener('change', () => {
    inp.type = chkMostrar.checked ? 'text' : 'password';
  });

  if (sel) sel.addEventListener('change', () => {
    window.IAGemini.setConfig({ modelo: sel.value });
    refletirEstado();
  });

  btnTestar.addEventListener('click', async () => {
    const chave = (inp.value || '').trim();
    if (!chave && !window.IAGemini.temChave()) {
      status.textContent = 'Cole a chave antes de testar.';
      status.style.color = '#b91c1c';
      return;
    }
    status.textContent = 'Testando chave…';
    status.style.color = '#1d4ed8';
    btnTestar.disabled = true;
    try {
      const chaveTestar = chave || window.IAGemini.getChave();
      const r = await window.IAGemini.testarChave(chaveTestar);
      if (r.ok) {
        const usuario = (window.firebaseSync && window.firebaseSync.usuarioAtual && window.firebaseSync.usuarioAtual()) || (config && config.meuNome) || '';
        const agora = new Date().toLocaleString('pt-BR');
        window.IAGemini.setConfig({
          chaveOfuscada: window.IAGemini.ofuscar(chaveTestar),
          modelo: sel ? sel.value : 'flash',
          configuradoPor: usuario,
          configuradoEm: agora
        });
        inp.value = '';
        if (chkMostrar) { chkMostrar.checked = false; inp.type = 'password'; }
        refletirEstado();
        mostrarFlash('Chave da IA validada e salva.');
      } else {
        status.textContent = `Falha: ${r.erro || 'erro desconhecido.'}`;
        status.style.color = '#b91c1c';
      }
    } catch (e) {
      status.textContent = `Erro: ${e.message || e}`;
      status.style.color = '#b91c1c';
    } finally {
      btnTestar.disabled = false;
    }
  });

  btnLimpar.addEventListener('click', () => {
    if (!confirm('Remover a chave configurada? Sem chave, os botões Gerar com IA não funcionarão.')) return;
    window.IAGemini.setConfig({ chaveOfuscada: '', configuradoPor: '', configuradoEm: '' });
    inp.value = '';
    refletirEstado();
    mostrarFlash('Chave da IA removida.');
  });
}

// ----- Orquestrador do modal #dlg-refinar-ia -----
// modo: 'gerar' (sem original) | 'refinar' (com texto original).
// onAceitar(textoFinal) substitui o destino.
function abrirIAModal({ titulo, subtitulo, modo, contexto, contextoLista, textoOriginal, tipo, onAceitar }) {
  if (!window.IAGemini) { alert('Módulo de IA indisponível.'); return; }
  if (!window.IAGemini.temChave()) {
    if (confirm('Nenhuma chave de IA configurada. Abrir as Configurações agora?')) {
      trocarAba('config');
      setTimeout(() => { const el = $('#sec-ia'); if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); }, 50);
    }
    return;
  }
  const dlg = $('#dlg-refinar-ia');
  if (!dlg) return;
  const mModo = (modo === 'refinar') ? 'refinar' : 'gerar';
  const tipoStr = (tipo || 'e-mail');

  $('#ria12-titulo').textContent = titulo || (mModo === 'gerar' ? `Gerar ${tipoStr} com IA` : `Refinar ${tipoStr} com IA`);
  $('#ria12-subtitulo').textContent = subtitulo ||
    (mModo === 'gerar'
      ? 'A IA escreve do zero a partir do contexto da tarefa, com tom institucional Cebraspe.'
      : 'A IA reescreve o texto atual aplicando tom institucional, concisão e contexto estratégico.');

  // Chip de intenção detectada (cabeçalho)
  let chipHost = $('#ria12-chip-intencao');
  if (!chipHost) {
    const sub = $('#ria12-subtitulo');
    if (sub && sub.parentElement) {
      chipHost = document.createElement('div');
      chipHost.id = 'ria12-chip-intencao';
      chipHost.style.cssText = 'margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;';
      sub.parentElement.insertBefore(chipHost, sub.nextSibling);
    }
  }
  function _intencaoLabel(it) {
    return it === 'cobranca' ? 'Cobrança (atrasada)' :
           it === 'lembrete' ? 'Lembrete (prazo iminente)' :
           it === 'conclusao' ? 'Comunicação de conclusão' :
           'Solicitação de providências';
  }
  function _intencaoCor(it) {
    return it === 'cobranca' ? '#b91c1c' :
           it === 'lembrete' ? '#b45309' :
           it === 'conclusao' ? '#15803d' :
           '#1d4ed8';
  }
  let _intencaoAtual = null;
  let _intencaoMistaInfo = null;
  function _detectarIntencaoAtual() {
    if (!window.IAGemini || !window.IAGemini.detectarIntencao) return 'solicitacao';
    if (Array.isArray(contextoLista) && contextoLista.length) {
      const ints = contextoLista.map(c => window.IAGemini.detectarIntencao(c || {}));
      const cnt = {}; ints.forEach(i => cnt[i] = (cnt[i] || 0) + 1);
      const distintas = Object.keys(cnt);
      _intencaoMistaInfo = (distintas.length > 1) ? cnt : null;
      const ordem = ['cobranca','lembrete','solicitacao','conclusao'];
      for (const k of ordem) if (cnt[k]) return k;
      return 'solicitacao';
    }
    return window.IAGemini.detectarIntencao(contexto || {});
  }
  if (chipHost) {
    _intencaoAtual = _detectarIntencaoAtual();
    const cor = _intencaoCor(_intencaoAtual);
    let detalhe = '';
    if (_intencaoMistaInfo) {
      const partes = Object.entries(_intencaoMistaInfo).map(([k,v]) => `${v} ${_intencaoLabel(k).toLowerCase()}`);
      detalhe = ` <span style="font-weight:400;color:#6b7280;">(lote: ${escHtml(partes.join(', '))})</span>`;
    }
    chipHost.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;background:${cor}15;color:${cor};border:1px solid ${cor}55;font-size:12px;font-weight:600;">Intenção detectada: ${escHtml(_intencaoLabel(_intencaoAtual))}</span>` + detalhe;
  }

  // Contexto visível (uma tarefa ou várias)
  const ctxBox = $('#ria12-contexto-box');
  const ctxPre = $('#ria12-contexto');
  if (Array.isArray(contextoLista) && contextoLista.length) {
    ctxBox.hidden = false;
    ctxPre.textContent = contextoLista.map((c, i) => `[${i+1}] ` + _ctxStrCurto(c)).join('\n');
  } else if (contexto && Object.keys(contexto).length) {
    ctxBox.hidden = false;
    ctxPre.textContent = _ctxStrCurto(contexto);
  } else {
    ctxBox.hidden = true;
    ctxPre.textContent = '';
  }

  // Coluna original
  const colOrig = $('#ria12-col-original');
  const taOrig = $('#ria12-original');
  if (mModo === 'refinar' && textoOriginal) {
    colOrig.hidden = false;
    taOrig.value = textoOriginal;
  } else {
    colOrig.hidden = true;
    taOrig.value = '';
  }

  // Saída
  const taSaida = $('#ria12-refinado');
  const saidaH = $('#ria12-col-saida-h');
  taSaida.value = '';
  saidaH.textContent = mModo === 'gerar' ? 'Gerado pela IA' : 'Refinado pela IA';
  $('#ria12-instrucao').value = '';
  $('#ria12-erro').style.display = 'none';
  $('#ria12-erro').textContent = '';
  $('#ria12-loader').hidden = true;
  const btnAceitar = $('#ria12-aceitar');
  const btnTentar = $('#ria12-tentar');
  const btnCancelar = $('#ria12-cancelar');
  btnAceitar.disabled = true;
  btnTentar.textContent = mModo === 'gerar' ? 'Gerar' : 'Refinar';

  async function executar() {
    btnAceitar.disabled = true;
    btnTentar.disabled = true;
    $('#ria12-loader').hidden = false;
    $('#ria12-loader').textContent = mModo === 'gerar' ? 'Gerando…' : 'Refinando…';
    $('#ria12-erro').style.display = 'none';
    const instrucao = ($('#ria12-instrucao').value || '').trim();
    try {
      let resultado;
      if (Array.isArray(contextoLista) && contextoLista.length) {
        const itens = contextoLista.map(c => ({ contexto: c, tipo: tipoStr }));
        const arr = await window.IAGemini.gerarLote(itens, instrucao || null);
        resultado = arr.map((tx, i) =>
          `=== ${tipoStr.charAt(0).toUpperCase()+tipoStr.slice(1)} ${i+1} — Para: ${contextoLista[i].destinatario || contextoLista[i].responsavel || '—'} ===\n${tx}`
        ).join('\n\n' + '─'.repeat(60) + '\n\n');
      } else if (mModo === 'gerar') {
        resultado = await window.IAGemini.gerar({ contexto: contexto || {}, tipo: tipoStr, instrucao: instrucao || null, intencao: _intencaoAtual });
      } else {
        resultado = await window.IAGemini.refinar({ texto: textoOriginal || '', contexto: contexto || {}, tipo: tipoStr });
      }
      taSaida.value = resultado;
      btnAceitar.disabled = false;
      btnTentar.textContent = 'Gerar de novo';
      _renderAcoesIA();
    } catch (e) {
      $('#ria12-erro').textContent = e.message || String(e);
      $('#ria12-erro').style.display = 'block';
    } finally {
      $('#ria12-loader').hidden = true;
      btnTentar.disabled = false;
    }
  }

  // Ações de exportação aparecem após geração
  function _renderAcoesIA() {
    let host = $('#ria12-acoes-export');
    if (!host) {
      const saidaCol = $('#ria12-col-saida-h');
      const tgt = saidaCol && saidaCol.parentElement;
      if (!tgt) return;
      host = document.createElement('div');
      host.id = 'ria12-acoes-export';
      host.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;';
      tgt.appendChild(host);
    }
    const txt = () => taSaida.value || '';
    const nomeBase = 'email';
    host.innerHTML = '';
    const mk = (rotulo, fn) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn--ghost btn--sm';
      b.textContent = rotulo;
      b.addEventListener('click', fn);
      host.appendChild(b);
    };
    mk('Copiar', () => _iaCopiarTexto(txt()));
    mk('Baixar Word', () => _iaBaixarWord(txt(), nomeBase));
    mk('Baixar PDF', () => _iaBaixarPdf(txt(), nomeBase));
    mk('Imprimir', () => _iaImprimir(txt()));
    if (tipoStr === 'e-mail') mk('Abrir no e-mail', () => _iaAbrirMailto(txt(), contexto || {}));
  }

  // Limpa ações de exportação de gerações anteriores
  const hostExportPrev = $('#ria12-acoes-export');
  if (hostExportPrev) hostExportPrev.innerHTML = '';

  btnTentar.onclick = executar;
  btnCancelar.onclick = () => dlg.close();
  btnAceitar.onclick = () => {
    const txt = taSaida.value;
    if (!txt) return;
    if (typeof onAceitar === 'function') onAceitar(txt);
    dlg.close();
  };

  dlg.showModal();
  // Dispara automaticamente a primeira geração.
  setTimeout(executar, 80);
}

function _ctxStrCurto(c) {
  if (!c) return '';
  const partes = [];
  if (c.titulo) partes.push(`Tarefa: ${c.titulo}`);
  if (c.oe) partes.push(`OE: ${c.oe}`);
  if (c.quadrante) partes.push(`Q: ${c.quadrante}`);
  if (c.responsavel) partes.push(`Resp.: ${c.responsavel}`);
  if (c.destinatario) partes.push(`Para: ${c.destinatario}`);
  if (c.assunto) partes.push(`Assunto: ${c.assunto}`);
  if (c.prazo) partes.push(`Prazo: ${c.prazo}`);
  if (c.status) partes.push(`Status: ${c.status}`);
  if (c.prioridade) partes.push(`Prio.: ${c.prioridade}`);
  if (c.resultado) partes.push(`Resultado esperado: ${c.resultado}`);
  if (c.descricao) partes.push(`Descrição: ${c.descricao}`);
  return partes.join(' · ');
}

// Monta contexto rico de uma tarefa (objeto base) para a IA
function _ctxDeTarefa(t, extras) {
  const oe = t && t.oeId ? OBJETIVOS.find(o => o.id === t.oeId) : null;
  const atrasada = isAtrasada(t);
  let dias = null;
  try { dias = (t && t.prazo) ? diasEntre(hojeISO(), t.prazo) : null; } catch(_) {}
  const passos = _passosContextuaisPorTitulo(t.titulo || '');
  const assinante = ((config && config.meuNome) || '') + (config && config.meuCargo ? '\n' + config.meuCargo : '');
  return Object.assign({
    titulo: t.titulo || '',
    oe: oe ? `OE ${oe.id} — ${oe.curto}: ${oe.texto}` : '',
    quadrante: quadranteDe(t) || '',
    responsavel: t.responsavel || '',
    prazo: t.prazo ? fmtDataExtenso(t.prazo) : '',
    status: t.status || '',
    prioridade: t.prioridade || '',
    resultado: t.resultadoEsperado || t.resultado || '',
    descricao: t.descricao || t.observacoes || '',
    _atrasada: atrasada,
    _diasAteVenc: dias,
    providenciasSugeridas: passos,
    assinante: assinante.trim(),
    tratamento: 'você'
  }, extras || {});
}

// ----- Atalho direto: botão E-mail dos cards vai direto ao modal IA -----
function abrirIAEmailDireto(id) {
  const t = tarefas.find(x => x.id === id);
  if (!t) { mostrarMsg('Tarefa não encontrada.', true); return; }
  const ctx = _ctxDeTarefa(t, { destinatario: t.responsavel || '' });
  abrirIAModal({
    modo: 'gerar',
    tipo: 'e-mail',
    contexto: ctx,
    onAceitar: () => {} // cópia/exportação feita pelas ações do próprio modal
  });
}

/* ===================================================================
   HISTÓRICO DE DECISÕES POR TAREFA (Leva 21)
   Lê reunioes[] e filtra as que têm encaminhamento sobre a tarefa.
   Sem digitação adicional: alimenta-se do que já é registrado nas reuniões.
   =================================================================== */

function reunioesQueTrataramTarefa(taskId) {
  if (!Array.isArray(reunioes)) return [];
  return reunioes
    .filter(r => r && r.encaminhamentos && r.encaminhamentos[taskId])
    .filter(r => {
      const e = r.encaminhamentos[taskId] || {};
      return (e.decisao && e.decisao.trim()) || (e.proximoPasso && e.proximoPasso.trim());
    })
    .sort((a, b) => {
      const da = (a.data || '') + 'T' + (a.hora || '00:00');
      const db = (b.data || '') + 'T' + (b.hora || '00:00');
      return db.localeCompare(da); // mais recente primeiro
    });
}

function abrirHistoricoTarefa(id) {
  const t = tarefas.find(x => x.id === id);
  if (!t) { mostrarMsg('Tarefa não encontrada.', true); return; }
  const dlg = $('#dlg-historico');
  if (!dlg) return;
  const tituloEl = $('#historico-tarefa-titulo');
  if (tituloEl) tituloEl.textContent = t.titulo || '';
  const cont = $('#historico-timeline');
  if (!cont) return;
  const lista = reunioesQueTrataramTarefa(id);
  if (!lista.length) {
    cont.innerHTML = '<p style="color:var(--muted);padding:24px 0;text-align:center">Esta tarefa ainda não foi tema de reuniões registradas com decisão ou próximo passo.</p>';
  } else {
    cont.innerHTML = lista.map(r => {
      const e = (r.encaminhamentos || {})[id] || {};
      const dataFmt = r.data ? fmtData(r.data) : 'sem data';
      const horaFmt = r.hora ? ' · ' + r.hora : '';
      const parts = Array.isArray(r.participantes) ? r.participantes : [];
      const partsLabel = parts.length
        ? parts.map(p => {
            if (typeof p === 'string') return p;
            return p.nome || p.email || '';
          }).filter(Boolean).join(', ')
        : '';
      const decisao = (e.decisao || '').trim();
      const proximo = (e.proximoPasso || '').trim();
      return `
        <article class="hist-entry" style="border-left:3px solid var(--accent);padding:10px 14px;margin-bottom:14px;background:var(--bg-soft);border-radius:6px">
          <header style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:6px">
            <button class="btn btn--ghost btn--sm" data-hist-reuniao="${escapeHTML(r.id)}" style="font-weight:600;text-align:left">${escapeHTML(r.titulo || 'Reunião sem título')}</button>
            <span style="font-size:12px;color:var(--muted);white-space:nowrap">${dataFmt}${horaFmt}</span>
          </header>
          ${decisao ? `<div style="margin-top:6px"><strong style="font-size:12px;text-transform:uppercase;color:var(--muted)">Decisão</strong><br>${escapeHTML(decisao)}</div>` : ''}
          ${proximo ? `<div style="margin-top:6px"><strong style="font-size:12px;text-transform:uppercase;color:var(--muted)">Próximo passo</strong><br>${escapeHTML(proximo)}</div>` : ''}
          ${partsLabel ? `<div style="margin-top:8px;font-size:12px;color:var(--muted)">Participantes: ${escapeHTML(partsLabel)}</div>` : ''}
        </article>
      `;
    }).join('');
    // bind de cliques nos títulos das reuniões
    cont.querySelectorAll('[data-hist-reuniao]').forEach(btn => {
      btn.addEventListener('click', () => {
        const rid = btn.dataset.histReuniao;
        dlg.close();
        if (typeof abrirModalReuniaoEditar === 'function') abrirModalReuniaoEditar(rid);
      });
    });
  }
  if (!dlg.open) dlg.showModal();
}

// ----- Ações de exportação do modal IA -----
function _iaCopiarTexto(texto) {
  if (!texto) return;
  navigator.clipboard.writeText(texto).then(
    () => mostrarFlash('Texto copiado.'),
    () => { try { const ta = document.createElement('textarea'); ta.value = texto; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); mostrarFlash('Texto copiado.'); } catch(_) { mostrarMsg('Falha ao copiar.', true); } }
  );
}

function _iaBaixarTxt(texto, nomeBase) {
  if (!texto) return;
  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
  baixar(blob, (nomeBase || 'texto') + '_' + hojeISO() + '.txt');
}

async function _iaBaixarWord(texto, nomeBase) {
  if (!texto) return;
  try {
    const D = await (typeof carregarLibDocx === 'function' ? carregarLibDocx() : Promise.resolve(window.docx));
    if (!D) throw new Error('docx');
    const { Document, Packer, Paragraph, TextRun } = D;
    const paragrafos = (texto || '').split(/\n/).map(linha => new Paragraph({ children: [new TextRun({ text: linha, italics: false, font: 'Times New Roman', size: 24 })] }));
    const doc = new Document({ sections: [{ properties: {}, children: paragrafos }] });
    const blob = await Packer.toBlob(doc);
    baixar(blob, (nomeBase || 'texto') + '_' + hojeISO() + '.docx');
    mostrarFlash('Word baixado.');
  } catch(e) {
    _iaBaixarTxt(texto, nomeBase);
    mostrarFlash('Word indisponível; baixado como texto.');
  }
}

function _iaBaixarPdf(texto, nomeBase) {
  if (!texto) return;
  try {
    const J = (typeof window !== 'undefined') ? (window.jspdf || null) : null;
    if (!J || !J.jsPDF) { _iaBaixarTxt(texto, nomeBase); mostrarFlash('PDF indisponível; baixado como texto.'); return; }
    const { jsPDF } = J;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    const margem = 20;
    const larg = 210 - margem*2;
    const linhas = doc.splitTextToSize(texto, larg);
    let y = margem;
    const altLinha = 6;
    for (const ln of linhas) {
      if (y > 297 - margem) { doc.addPage(); y = margem; }
      doc.text(ln, margem, y);
      y += altLinha;
    }
    doc.save((nomeBase || 'texto') + '_' + hojeISO() + '.pdf');
  } catch(e) {
    _iaBaixarTxt(texto, nomeBase);
    mostrarFlash('PDF indisponível; baixado como texto.');
  }
}

function _iaAbrirMailto(texto, contexto) {
  if (!texto) return;
  const ass = (contexto && contexto.assunto) || '';
  const url = 'mailto:?subject=' + encodeURIComponent(ass) + '&body=' + encodeURIComponent(texto);
  // mailto: tem limite ~2000 chars em alguns clientes; trunca aviso
  if (url.length > 6000) { mostrarMsg('Texto muito longo para mailto. Copie o conteúdo.', true); return; }
  window.location.href = url;
}

function _iaImprimir(texto) {
  if (!texto) return;
  const w = window.open('', '_blank');
  if (!w) { mostrarMsg('Bloqueio de pop-up impediu a impressão.', true); return; }
  const html = '<!doctype html><html><head><meta charset="utf-8"><title>Impressão</title>' +
    '<style>body{font-family:Times,serif;font-size:14px;line-height:1.6;padding:24px;white-space:pre-wrap;}</style>' +
    '</head><body>' + escHtml(texto) + '</body></html>';
  w.document.open(); w.document.write(html); w.document.close();
  setTimeout(() => { try { w.focus(); w.print(); } catch(_) {} }, 200);
}

// ----- Bind dos 4 botões de IA -----
function bindBotoesIA() {
  // 1) E-mail individual (modal #dlg-email)
  const btnEmail = $('#btn-email-gerar-ia');
  if (btnEmail) {
    btnEmail.addEventListener('click', () => {
      const id = _emailTarefaId;
      const t = tarefas.find(x => x.id === id);
      if (!t) { mostrarMsg('Tarefa não encontrada.', true); return; }
      const trat = $('#email-tratamento') ? $('#email-tratamento').value : 'voce';
      const nomeTrat = $('#email-nome') ? ($('#email-nome').value || '').trim() : '';
      const destinatario = (t.responsavel || nomeTrat || '').trim();
      const assuntoAtual = $('#email-assunto') ? $('#email-assunto').value : '';
      const ctx = _ctxDeTarefa(t, {
        destinatario,
        assunto: assuntoAtual,
        tratamento: trat === 'voce' ? 'você' : (trat === 'senhor' ? 'senhor(a)' : (trat === 'nome' ? `pelo nome (${nomeTrat})` : ''))
      });
      abrirIAModal({
        modo: 'gerar',
        tipo: 'e-mail',
        contexto: ctx,
        onAceitar: (texto) => {
          const ta = $('#email-corpo');
          if (ta) {
            ta.value = texto;
            // Atualiza prévia
            const prev = $('#email-previa');
            if (prev) {
              const ass = $('#email-assunto') ? $('#email-assunto').value : '';
              prev.textContent = (ass ? `Assunto: ${ass}\n\n` : '') + texto;
            }
            mostrarFlash('E-mail gerado pela IA.');
          }
        }
      });
    });
  }

  // 2) E-mail em lote (#panel-email-lote)
  const btnEL = $('#btn-el-gerar-ia');
  if (btnEL) {
    btnEL.addEventListener('click', () => {
      const itens = JSON.parse($('#panel-email-lote').dataset.itens || '[]');
      if (!itens.length) { mostrarMsg('Não há e-mails para gerar.', true); return; }
      // Recompor contexto a partir das tarefas selecionadas
      const sel = _emailsLoteSelecionados();
      const lista = [];
      for (const it of sel) {
        if (_emailLoteAgrup === 'destinatario') {
          const ts = it.tarefasIds.map(id => tarefas.find(x => x.id === id)).filter(Boolean);
          const titulosResumo = ts.map(t => `• ${t.titulo}${t.prazo ? ' (prazo ' + fmtDataExtenso(t.prazo) + ')' : ''}${t.responsavel ? ' — ' + t.responsavel : ''}`).join('\n');
          lista.push({
            titulo: `Pauta consolidada (${ts.length} tarefa${ts.length>1?'s':''})`,
            destinatario: it.destinatario,
            descricao: titulosResumo,
            assunto: it.email && it.email.assunto || ''
          });
        } else {
          const t = tarefas.find(x => x.id === it.tarefasIds[0]);
          if (t) lista.push(_ctxDeTarefa(t, { destinatario: it.destinatario, assunto: it.email && it.email.assunto || '' }));
        }
      }
      abrirIAModal({
        modo: 'gerar',
        tipo: 'e-mail',
        contextoLista: lista,
        onAceitar: (textoTudo) => {
          // Reescreve cada bloco no painel: substitui corpos por novos textos
          // Como o gerarLote retorna concatenado, faz parsing pelos separadores que incluímos.
          const blocos = textoTudo.split(/\n+─{10,}\n+/).map(s => s.trim()).filter(Boolean);
          // Para cada bloco, remove o cabeçalho "=== E-mail N — Para: X ==="
          const corposNovos = blocos.map(b => b.replace(/^===\s*[^=\n]+===\s*\n?/, '').trim());
          const novos = itens.map((it, i) => Object.assign({}, it, { corpo: corposNovos[i] || it.corpo }));
          $('#panel-email-lote').dataset.itens = JSON.stringify(novos);
          // Re-renderiza visualmente substituindo apenas os <pre> de corpo
          const arts = $$('#panel-email-lote .el-item');
          arts.forEach((art, i) => {
            const pre = art.querySelector('.el-item__corpo');
            if (pre && novos[i]) pre.textContent = novos[i].corpo;
          });
          mostrarFlash(`${novos.length} e-mail(is) gerados pela IA.`);
        }
      });
    });
  }

  // (despacho individual e despacho em lote removidos na Leva 20)
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
window.carregarTombstones = carregarTombstones;
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
