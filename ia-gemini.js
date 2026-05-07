// ============================================================
// IA Gemini — refinamento de e-mails e despachos (Leva 12)
// Provedor: Google Gemini API (free tier — sem custo)
// Modelo padrão: gemini-2.5-flash (10 RPM, 250/dia, ~1M ctx)
// ============================================================
(function () {
  'use strict';

  const MODELOS = {
    flash: 'gemini-2.5-flash',
    flashLite: 'gemini-2.5-flash-lite'
  };
  const ENDPOINT = (modelo) =>
    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`;

  // Chave de configuração local (cache do Firestore)
  const KEY_CONFIG = 'cebraspe_ia_config';
  // Seed para ofuscação (não é segurança forte — só evita exposição em logs)
  const XOR_SEED = 'cebraspe-pa-2026-ia';

  // ---------- Ofuscação Base64+XOR ----------
  function ofuscar(texto) {
    if (!texto) return '';
    let out = '';
    for (let i = 0; i < texto.length; i++) {
      out += String.fromCharCode(texto.charCodeAt(i) ^ XOR_SEED.charCodeAt(i % XOR_SEED.length));
    }
    return btoa(unescape(encodeURIComponent(out)));
  }
  function desofuscar(ofuscado) {
    if (!ofuscado) return '';
    try {
      const dec = decodeURIComponent(escape(atob(ofuscado)));
      let out = '';
      for (let i = 0; i < dec.length; i++) {
        out += String.fromCharCode(dec.charCodeAt(i) ^ XOR_SEED.charCodeAt(i % XOR_SEED.length));
      }
      return out;
    } catch (_) { return ''; }
  }

  // ---------- Persistência da config ----------
  function _read(key, fb) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fb;
    } catch { return fb; }
  }
  function _write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function getConfig() {
    return _read(KEY_CONFIG, { chaveOfuscada: '', modelo: 'flash', configuradoPor: '', configuradoEm: '' });
  }
  function setConfig(novoConfig) {
    const atual = getConfig();
    const merged = { ...atual, ...novoConfig };
    _write(KEY_CONFIG, merged);
    // Sinaliza ao firebase-sync para empurrar pro Firestore
    try {
      window.dispatchEvent(new StorageEvent('storage', {
        key: KEY_CONFIG, newValue: JSON.stringify(merged)
      }));
    } catch {}
    return merged;
  }
  function getChave() {
    const cfg = getConfig();
    return desofuscar(cfg.chaveOfuscada);
  }
  function temChave() {
    return !!getChave();
  }

  // ---------- Chamada à API ----------
  async function _chamar(prompt, opts) {
    const cfg = getConfig();
    const chave = desofuscar(cfg.chaveOfuscada);
    if (!chave) {
      throw new Error('Chave da IA não configurada. Vá em Configurações → IA.');
    }
    const modelo = MODELOS[cfg.modelo] || MODELOS.flash;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: opts?.temperature ?? 0.4,
        maxOutputTokens: opts?.maxOutputTokens ?? 2048,
        responseMimeType: opts?.json ? 'application/json' : 'text/plain'
      }
    };
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), opts?.timeoutMs ?? 30000);
    let resp;
    try {
      resp = await fetch(`${ENDPOINT(modelo)}?key=${encodeURIComponent(chave)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ctrl.signal
      });
    } catch (e) {
      clearTimeout(timer);
      if (e.name === 'AbortError') throw new Error('Tempo limite excedido (30s).');
      throw new Error('Falha de rede ao chamar a IA.');
    }
    clearTimeout(timer);
    if (!resp.ok) {
      const txt = await resp.text().catch(() => '');
      if (resp.status === 401 || resp.status === 403) {
        throw new Error('Chave inválida ou sem permissão. Verifique em Configurações → IA.');
      }
      if (resp.status === 429) {
        throw new Error('Limite de uso atingido. Aguarde alguns segundos e tente novamente.');
      }
      throw new Error(`Erro ${resp.status} da IA. ${txt.slice(0, 200)}`);
    }
    const data = await resp.json();
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!texto) throw new Error('Resposta vazia da IA.');
    return String(texto).trim();
  }

  async function testarChave(chaveCandidata) {
    if (!chaveCandidata || !String(chaveCandidata).trim()) {
      return { ok: false, erro: 'Chave em branco.' };
    }
    // Salva temporariamente, testa, restaura se falhar
    const antes = getConfig();
    setConfig({ chaveOfuscada: ofuscar(String(chaveCandidata).trim()) });
    try {
      const r = await _chamar('Responda apenas com a palavra: OK', { maxOutputTokens: 10, temperature: 0 });
      const ok = /\bOK\b/i.test(r);
      if (!ok) {
        setConfig({ chaveOfuscada: antes.chaveOfuscada });
        return { ok: false, erro: 'A IA respondeu, mas de forma inesperada. Verifique se a chave tem permissão para o modelo.' };
      }
      return { ok: true };
    } catch (e) {
      setConfig({ chaveOfuscada: antes.chaveOfuscada });
      return { ok: false, erro: e.message || String(e) };
    }
  }

  // ---------- Diretrizes de estilo (sempre embutidas) ----------
  const DIRETRIZES = `## DIRETRIZES OBRIGATÓRIAS DE REDAÇÃO

[A] TOM E FORMA
- Manual de Redação da Presidência: voz ativa, formal-objetiva, impessoalidade.
- PROIBIDO: itálico, emojis, markdown decorativo, aspas decorativas, ponto de exclamação.
- PROIBIDO usar QUALQUER uma destas aberturas/fórmulas (lista negra absoluta):
  * "A presente comunicação visa…"
  * "Vimos por meio desta…" / "Venho por meio deste…"
  * "É fundamental para…" / "Esta ação contribui diretamente para…"
  * "No âmbito do supra…" / "Em atenção ao supracitado…"
  * "Cabe ressaltar que…" / "É importante destacar que…"
  * "Esperamos contar com a sua colaboração…"
- Em vez disso: comece pelo VERBO ou pelo OBJETO da ação.

[B] PROVIDÊNCIAS NUMERADAS — OBRIGATÓRIO QUANDO HÁ PEDIDO
Quando o objetivo for solicitar, cobrar ou lembrar ações, a saída DEVE conter um parágrafo com providências numeradas (1., 2., 3.), entre 2 e 4 itens, cada um começando por VERBO DE AÇÃO concreto.
Verbos preferidos: Apresentar, Encaminhar, Confirmar, Validar, Designar, Assinar, Publicar, Convocar, Agendar, Reunir, Elaborar minuta de, Instaurar, Abrir processo no SEI para, Formalizar, Consolidar, Atualizar planilha de, Levantar dados sobre, Submeter à aprovação de.
NUNCA começar providência com "Solicitamos" ou "Pedimos" — isso é enunciação do pedido, não a ação em si.
O ÚLTIMO item deve trazer o prazo ("… até [DATA]"), quando houver.

[C] EXEMPLO DE PROVIDÊNCIAS (BOM vs RUIM)
RUIM (genérico):
  Solicitamos a apresentação do levantamento referente ao retorno financeiro por evento. Este insumo é crucial para as atividades de prospecção.
BOM (substantivo, numerado, com prazo):
  1. Consolidar planilha com receita por evento (2024-2026), separando custos diretos e líquido por edição.
  2. Validar com a equipe financeira a metodologia de rateio dos custos compartilhados.
  3. Encaminhar o material consolidado até 8/5/2026, em formato editorável.

[D] APROVEITAMENTO DAS PROVIDÊNCIAS PLAUSÍVEIS
Quando o contexto trouxer "Providências plausíveis derivadas do título", USE-AS como ponto de partida obrigatório. Refine a redação, complete com verbo de ação se vier truncada, mas não as descarte. Se houver Resultado Esperado, transforme-o também em providência numerada.

[E] FUNDAMENTO CURTO E SEM REPETIÇÃO
- O parágrafo de fundamento tem NO MÁXIMO 1 frase (2 se imprescindível).
- Não repita o título da tarefa em mais de um parágrafo.
- Cite o OE em UMA única menção, integrada ao fundamento. Nunca em parágrafo separado.

[F] FIDELIDADE
- Preservar com exatidão: nomes, cargos, siglas, datas, números, valores monetários.
- Preservar marcadores existentes ([NOME], [DATA], […]).
- Não inventar fatos. Se faltar dado crítico, use [ESPECIFICAR] ou [confirmar] como marcador.

[G] FECHAMENTO E ASSINATURA
- Fechamento curto: "Atenciosamente," para e-mail; "Respeitosamente," ou "Atenciosamente," para despacho conforme hierarquia.
- Assinatura: use EXATAMENTE o conteúdo fornecido em ASSINATURA INSTITUCIONAL no contexto, em duas linhas (nome / cargo). Não invente.`;

  // ---------- Detecção automática de intenção ----------
  // Retorna: 'conclusao' | 'cobranca' | 'lembrete' | 'solicitacao'
  function detectarIntencao(ctx) {
    if (!ctx) return 'solicitacao';
    const status = String(ctx.status || '').toLowerCase();
    if (status === 'concluida' || status === 'concluída') return 'conclusao';
    if (ctx._atrasada === true) return 'cobranca';
    if (ctx._diasAteVenc != null && ctx._diasAteVenc >= 0 && ctx._diasAteVenc <= 5) return 'lembrete';
    return 'solicitacao';
  }

  function _instrucoesPorIntencao(intencao, tipo) {
    const eDespacho = (tipo || '').toLowerCase() === 'despacho';
    if (intencao === 'conclusao') {
      return eDespacho
        ? `INTENÇÃO: COMUNICAÇÃO DE CONCLUSÃO. Estrutura obrigatória do despacho:
- Vocativo institucional.
- Parágrafo 1 (fato): comunique a conclusão, identificando objetivamente a tarefa e a entrega realizada.
- Parágrafo 2 (resultado): registre o produto/efeito alcançado (cite o resultado esperado se constar no contexto).
- Parágrafo 3 (encaminhamento): proponha o próximo destino do processo (arquivar, dar ciência, encaminhar para X) ou registre que o feito permanece sob acompanhamento.
- Fechamento e assinatura.`
        : `INTENÇÃO: COMUNICAÇÃO DE CONCLUSÃO. Estrutura obrigatória do e-mail:
- Saudação ao destinatário.
- 1º parágrafo: comunique a conclusão de forma direta, citando a tarefa e o resultado entregue.
- 2º parágrafo (só se pertinente): aponte impactos positivos para o OE ou próximos passos já contratados.
- Fechamento agradecendo o apoio recebido, se houve articulação externa, e colocando-se à disposição.
- Assinatura institucional.`;
    }
    if (intencao === 'cobranca') {
      return eDespacho
        ? `INTENÇÃO: COBRANÇA FORMAL POR ATRASO. Estrutura obrigatória do despacho:
- Vocativo institucional.
- Parágrafo 1 (fato): registre o vencimento do prazo da tarefa, citando a data e o responsável apontado.
- Parágrafo 2 (efeitos): aponte os impactos do atraso para o OE e para o cronograma (sem dramatizar).
- Parágrafo 3 (providências): determine objetivamente: (1) regularização imediata; (2) entrega de plano de ação com novo prazo até [DATA, derivar do contexto]; (3) ciência obrigatória no processo.
- Fechamento exigindo retorno e assinatura.
- Tom firme, formal, sem agressão.`
        : `INTENÇÃO: COBRANÇA POR ATRASO. Estrutura obrigatória do e-mail:
- Saudação cordial e formal.
- 1º parágrafo: registre o vencimento do prazo, citando data e tarefa.
- 2º parágrafo: solicite, com numeração (1., 2., 3.): (1) confirmação do status atual; (2) plano de regularização com novo prazo proposto; (3) sinalização de bloqueios, se houver.
- Defina prazo de resposta curto (48h ou conforme criticidade).
- Fechamento cordial mas firme.
- Assinatura institucional.`;
    }
    if (intencao === 'lembrete') {
      return eDespacho
        ? `INTENÇÃO: LEMBRETE INSTITUCIONAL DE PRAZO PRÓXIMO. Estrutura obrigatória do despacho:
- Vocativo institucional.
- Parágrafo 1: lembre o prazo iminente da tarefa, citando a data.
- Parágrafo 2: relacione providências pendentes, numeradas (1., 2., 3.).
- Parágrafo 3: solicite confirmação de cumprimento até a data.
- Fechamento e assinatura.`
        : `INTENÇÃO: LEMBRETE DE PRAZO PRÓXIMO. Estrutura obrigatória do e-mail:
- Saudação cordial.
- 1º parágrafo: lembre o prazo, citando a data.
- 2º parágrafo: providências pendentes em itens numerados.
- 3º parágrafo: peça confirmação do cumprimento.
- Fechamento cordial e assinatura.`;
    }
    // solicitacao (padrão)
    return eDespacho
      ? `INTENÇÃO: SOLICITAÇÃO DE PROVIDÊNCIAS — Despacho.

ESTRUTURA OBRIGATÓRIA (siga exatamente nesta ordem):
[1] Vocativo institucional ("Senhor(a) [Cargo]," ou "À [Área]," quando não houver pessoa nominada).
[2] OBJETO — 1 frase substantiva: o que se quer e em relação a quê. Pode integrar a menção ao OE.
[3] FUNDAMENTO — 1 frase, no máximo 2: por que essa providência é necessária agora, ancorada no resultado esperado.
[4] PROVIDÊNCIAS — parágrafo iniciado por: "Diante do exposto, determino:" seguido de 2 a 4 itens numerados (1., 2., 3.) começando por VERBO DE AÇÃO concreto. Último item traz o prazo explícito.
[5] ENCAMINHAMENTO — 1 frase: o que se espera de retorno (ciência, manifestação, devolução ao gabinete).
[6] Fechamento ("Respeitosamente," ou "Atenciosamente,") e linha de assinatura usando o ASSINANTE do contexto.

EXEMPLO DE BLOCO [4] (modelo de boa redação, NUNCA copiar literalmente):
  Diante do exposto, determino:
  1. Consolidar planilha de retorno financeiro por evento (2024-2026), com receita, custos diretos e líquido por edição.
  2. Validar com a área financeira a metodologia de rateio dos custos compartilhados.
  3. Encaminhar o material a este gabinete até 8/5/2026, em formato editorável.`
      : `INTENÇÃO: SOLICITAÇÃO DE PROVIDÊNCIAS — E-mail.

ESTRUTURA OBRIGATÓRIA (siga exatamente nesta ordem, com parágrafos curtos):
[1] SAUDAÇÃO — "Prezado(a) [Nome ou Cargo]," usando os destinatários do contexto. Se houver mais de um, agrupe ("Prezados Professor X, Pablo e Isabella,").
[2] OBJETO — 1 frase: o que se está pedindo, sobre o quê, ancorado na tarefa. Pode integrar uma única menção ao OE.
[3] FUNDAMENTO — 1 frase (no máximo 2): por que isso importa agora, ancorado no Resultado Esperado se houver.
[4] PROVIDÊNCIAS — parágrafo iniciado por uma frase curta como "Para que possamos avançar, peço:" e em seguida 2 a 4 itens numerados (1., 2., 3.) começando por VERBO DE AÇÃO concreto. Último item traz o prazo ("… até [DATA]").
[5] RETORNO — 1 frase: defina retorno esperado e disponibilidade (ex.: "Sigo à disposição para alinhamento. Aguardo o retorno na semana corrente.").
[6] FECHAMENTO + ASSINATURA — "Atenciosamente," + linha em branco + nome em uma linha + cargo em outra (use o ASSINANTE do contexto).

EXEMPLO DE E-MAIL DE BOA REDAÇÃO (modelo, NUNCA copiar literalmente — ajuste ao contexto):
  Prezados Professor José Augusto, Pablo e Isabella,

  Em preparação à reunião de 8/5, relativa ao OE 1 — Faturamento sustentável, precisamos consolidar o insumo de prospecção de receita por evento.

  O material orientará a tomada de decisão sobre o redirecionamento de esforços comerciais no segundo semestre.

  Para que possamos avançar, peço:
  1. Consolidar planilha de retorno financeiro por evento (2024-2026), com receita, custos diretos e líquido por edição.
  2. Validar com a área financeira a metodologia de rateio dos custos compartilhados.
  3. Encaminhar a versão consolidada até 8/5/2026, em formato editorável.

  Sigo à disposição para alinhamento e agradeço o retorno na semana corrente.

  Atenciosamente,

  João Marcelo Marques Cunha
  Diretor-Executivo`;
  }

  // ---------- Gerar do zero a partir do contexto ----------
  async function gerar({ contexto, tipo, instrucao, intencao }) {
    const ctxObj = contexto || {};
    const ctxStr = formatarContexto(ctxObj);
    const tipoStr = (tipo || 'e-mail').toLowerCase();
    const intencaoFinal = intencao || detectarIntencao(ctxObj);
    const instr = _instrucoesPorIntencao(intencaoFinal, tipoStr);
    const eDespacho = tipoStr === 'despacho';
    const cabecalho = eDespacho
      ? 'Você é chefe de gabinete redator do Cebraspe. Redija um DESPACHO institucional completo, em português formal-objetivo, a partir SOMENTE do contexto da tarefa abaixo.'
      : 'Você é chefe de gabinete redator do Cebraspe. Redija um E-MAIL institucional completo, em português formal-objetivo, a partir SOMENTE do contexto da tarefa abaixo.';

    const prompt =
`${cabecalho}

${instr}

${DIRETRIZES}

## Contexto da tarefa
${ctxStr || '(sem contexto)'}
${instrucao ? `\n## Instrução adicional do solicitante\n${instrucao}\n` : ''}
## Resposta
Devolva APENAS o ${tipoStr} pronto, sem comentários, sem título, sem markdown, sem explicações, sem cercas de código. Use quebras de linha e parágrafos. ${eDespacho ? 'Não inclua linha de "Assunto:" — esta é fornecida pelo cabeçalho do despacho.' : 'Não inclua linha de "Assunto:" no corpo — ela vai à parte.'}`;
    return _chamar(prompt, { temperature: 0.35, maxOutputTokens: 4096 });
  }

  // ---------- Gerar lote (vários e-mails / despachos) ----------
  async function gerarLote(itens, contextoComum) {
    if (!Array.isArray(itens) || !itens.length) return [];
    const tipo = (itens[0]?.tipo || 'e-mail').toLowerCase();
    const eDespacho = tipo === 'despacho';
    const blocos = itens.map((it, i) => {
      const intencao = it.intencao || detectarIntencao(it.contexto || {});
      return `### ITEM ${i + 1} — intenção: ${intencao}\n${formatarContexto(it.contexto || {})}`;
    }).join('\n\n');
    const prompt =
`Você é chefe de gabinete redator do Cebraspe. Redija ${itens.length} ${tipo}s independentes, um para cada item abaixo, a partir SOMENTE do contexto fornecido. Para cada item, siga rigorosamente a intenção indicada (solicitacao, cobranca, lembrete ou conclusao) e a estrutura correspondente.

INTENÇÕES:
- solicitacao: ${eDespacho ? 'despacho de solicitação de providências com objeto, fundamento, providências numeradas (1., 2., 3.) com verbos de ação, encaminhamento, fechamento.' : 'e-mail de solicitação com objeto, fundamento curto, providências numeradas (1., 2., 3.) com verbos de ação, prazo no último item, fechamento cordial.'}
- cobranca: ${eDespacho ? 'despacho de cobrança por atraso, tom firme, com fato, efeitos, providências numeradas e exigência de retorno.' : 'e-mail de cobrança por atraso, com vencimento citado, providências numeradas e prazo de resposta curto.'}
- lembrete: ${eDespacho ? 'despacho lembrando prazo iminente, com providências pendentes numeradas.' : 'e-mail lembrando prazo iminente, com providências pendentes numeradas.'}
- conclusao: ${eDespacho ? 'despacho comunicando conclusão com fato, resultado e encaminhamento.' : 'e-mail comunicando conclusão com tarefa, resultado entregue e fechamento.'}

${DIRETRIZES}

Cada ${tipo} deve ser autônomo e completo (vocativo/saudação, corpo estruturado, fechamento, assinatura), sem markdown e sem cercas de código.
${contextoComum ? '\n## Contexto comum a todos\n' + contextoComum + '\n' : ''}
## Itens

${blocos}

## Resposta
Devolva APENAS um JSON válido, sem markdown, no formato:
{ "itens": [ { "indice": 1, "texto": "<${tipo} pronto>" }, { "indice": 2, "texto": "<${tipo} pronto>" } ] }
A ordem do array deve corresponder à ordem dos ITENS.`;
    const raw = await _chamar(prompt, { temperature: 0.35, maxOutputTokens: 8192, json: true });
    let obj;
    try { obj = JSON.parse(raw); }
    catch {
      const i = raw.indexOf('{'); const j = raw.lastIndexOf('}');
      if (i < 0 || j < i) throw new Error('Resposta da IA não veio em JSON válido.');
      obj = JSON.parse(raw.slice(i, j + 1));
    }
    const arr = Array.isArray(obj?.itens) ? obj.itens : [];
    return itens.map((_, idx) => {
      const m = arr.find(x => Number(x.indice) === idx + 1);
      return m?.texto || '';
    });
  }

  // ---------- Refinar texto avulso ----------
  async function refinar({ texto, contexto, tipo }) {
    const ctxStr = contexto ? formatarContexto(contexto) : '';
    const tipoStr = (tipo || 'texto').toLowerCase();
    const prompt =
`Você é redator institucional do Cebraspe. Refine o ${tipoStr} a seguir conforme as diretrizes.

${DIRETRIZES}

## Contexto da tarefa
${ctxStr || '(sem contexto adicional)'}

## ${tipoStr.charAt(0).toUpperCase() + tipoStr.slice(1)} original
${texto || ''}

## Resposta
Devolva APENAS o ${tipoStr} refinado, sem comentários, sem markdown, sem explicações. Mantenha quebras de linha e parágrafos.`;
    return _chamar(prompt, { temperature: 0.3, maxOutputTokens: 4096 });
  }

  // ---------- Refinar lote (e-mails ou despachos) ----------
  async function refinarLote(itens, contextoComum) {
    if (!Array.isArray(itens) || !itens.length) return [];
    const tipo = itens[0]?.tipo || 'e-mail';
    const blocos = itens.map((it, i) =>
      `### ITEM ${i + 1}\n## Contexto\n${formatarContexto(it.contexto || {})}\n## Original\n${it.texto || ''}`
    ).join('\n\n');

    const prompt =
`Você é redator institucional do Cebraspe. Refine cada um dos ${itens.length} ${tipo}s abaixo conforme as diretrizes.

${DIRETRIZES}

${contextoComum ? '## Contexto comum a todos\n' + contextoComum + '\n' : ''}
## Itens a refinar

${blocos}

## Resposta
Devolva APENAS um JSON válido, sem markdown, no formato:
{ "itens": [ { "indice": 1, "texto": "<refinado>" }, { "indice": 2, "texto": "<refinado>" } ] }
A ordem do array deve corresponder à ordem dos ITENS.`;
    const raw = await _chamar(prompt, { temperature: 0.3, maxOutputTokens: 8192, json: true });
    let obj;
    try { obj = JSON.parse(raw); }
    catch {
      const i = raw.indexOf('{'); const j = raw.lastIndexOf('}');
      if (i < 0 || j < i) throw new Error('Resposta da IA não veio em JSON válido.');
      obj = JSON.parse(raw.slice(i, j + 1));
    }
    const arr = Array.isArray(obj?.itens) ? obj.itens : [];
    // Mapeia por índice para garantir alinhamento
    return itens.map((_, idx) => {
      const m = arr.find(x => Number(x.indice) === idx + 1);
      return m?.texto || itens[idx].texto;
    });
  }

  function formatarContexto(ctx) {
    if (!ctx || typeof ctx !== 'object') return '';
    const linhas = [];
    if (ctx.titulo) linhas.push(`Tarefa: ${ctx.titulo}`);
    if (ctx.quadrante) linhas.push(`Quadrante: ${ctx.quadrante}`);
    if (ctx.oe) linhas.push(`Objetivo Estratégico: ${ctx.oe}`);
    if (ctx.destinatario) linhas.push(`Destinatário: ${ctx.destinatario}`);
    if (ctx.responsavel && ctx.responsavel !== ctx.destinatario) linhas.push(`Responsável apontado: ${ctx.responsavel}`);
    if (ctx.prazo) linhas.push(`Prazo: ${ctx.prazo}`);
    if (ctx._diasAteVenc != null) linhas.push(`Dias até o vencimento: ${ctx._diasAteVenc}`);
    if (ctx._atrasada) linhas.push(`Situação: tarefa em atraso`);
    if (ctx.status) linhas.push(`Status: ${ctx.status}`);
    if (ctx.prioridade) linhas.push(`Prioridade: ${ctx.prioridade}`);
    if (ctx.resultado) linhas.push(`Resultado esperado: ${ctx.resultado}`);
    if (ctx.descricao) linhas.push(`Descrição/observações: ${ctx.descricao}`);
    if (ctx.assunto) linhas.push(`Assunto sugerido: ${ctx.assunto}`);
    if (Array.isArray(ctx.providenciasSugeridas) && ctx.providenciasSugeridas.length) {
      linhas.push('Providências plausíveis derivadas do título (use, descarte ou ajuste):');
      ctx.providenciasSugeridas.forEach((p, i) => linhas.push(`  ${i+1}. ${p}`));
    }
    if (ctx.tratamento) linhas.push(`Tratamento ao destinatário: ${ctx.tratamento}`);
    if (ctx.assinante) linhas.push(`ASSINATURA INSTITUCIONAL (use exatamente como remetente, em duas linhas no final): ${ctx.assinante}`);
    return linhas.join('\n');
  }

  // ---------- API pública ----------
  window.IAGemini = {
    gerar,
    gerarLote,
    refinar,
    refinarLote,
    testarChave,
    detectarIntencao,
    getChave,
    temChave,
    getConfig,
    setConfig,
    ofuscar,
    desofuscar,
    KEY_CONFIG
  };
})();
