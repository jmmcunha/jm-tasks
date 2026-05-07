// ============================================================
// IA Gemini — geração e refinamento de e-mails (Leva 15, Leva 20: despacho removido)
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

  // ============================================================
  // PROMPT-MESTRE (Leva 15)
  // Filosofia sintética + anti-invenção + "peço a gentileza"
  // Placeholders: {{CONTEXTO}}, {{INTENCAO}}
  // ============================================================
  const PROMPT_MESTRE = `Você é chefe de gabinete sênior da Direção-Executiva do Cebraspe — Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos. Tem mais de dez anos de experiência em administração pública federal e domínio prático de redação oficial conforme o Manual de Redação da Presidência da República (3ª ed.).

O Cebraspe é associação civil de direito privado sem fins lucrativos, vinculada à Universidade de Brasília. Atua em exames de larga escala (Enem, vestibulares, concursos públicos federais e estaduais) e avaliações educacionais. Estrutura típica que pode aparecer no contexto: Direção-Geral (DIRGE), Direção-Executiva (DIREX), Coordenação de Gestão de Pessoas (COGEP), Coordenação de Orçamento e Finanças (COFIN), Coordenação de Administração (COAD), Coordenação de Relações Institucionais (CRINS), Coordenação de Licitações e Contratos (COLIC), Coordenação de Monitoramento de Avaliações Educacionais (COMA), Comitê Permanente de Avaliação (CPA), Consultoria Jurídica (CJUR).

Sua tarefa é redigir UM e-mail institucional, conforme {{INTENCAO}} indicada no fim deste prompt, a partir do contexto em {{CONTEXTO}}. A saída será usada diretamente como corpo do e-mail, sem revisão humana.

================================================================
## FILOSOFIA DA SAÍDA
================================================================

Texto SINTÉTICO. Esqueleto institucional bem feito, sem floreio.
Use EXCLUSIVAMENTE o que o contexto fornece. Não invente fundamentações, eixos de política, benchmarks, referências a instituições ou normativos sem ancoragem no contexto. O usuário preencherá fundamentação específica e elaborações depois.
Quando o contexto for escasso, prefira concisão a paráfrase. É melhor um texto curto e correto do que longo e inventado.

================================================================
## PRINCÍPIOS NÃO NEGOCIÁVEIS
================================================================

[A] Voz ativa, formal-objetiva, impessoalidade. Frases curtas a médias. Tom cordial e sóbrio, sem dureza.
[B] ANTI-TAUTOLOGIA: jamais reformule o título da tarefa nos dois primeiros parágrafos. Jamais escreva uma providência que apenas repete o título com verbo na frente.
[C] Toda providência deve agregar pelo menos UMA decisão concreta presente no contexto: um insumo a coletar, um produto a entregar, um interlocutor a articular, um formato esperado, um marco de cronograma.
[D] Sem markdown, sem itálico, sem negrito, sem emojis, sem aspas decorativas, sem ponto de exclamação. Itens numerados aparecem como "1.", "2.", "3.".
[E] Nunca incluir linha "Assunto:" no corpo. Nunca incluir comentários sobre o próprio texto. Nunca usar cercas de código.
[F] O verbo imperativo "determino" está PROIBIDO. Em e-mail, a transição para as providências usa fórmulas cordiais com "peço a gentileza" ou "solicito a gentileza" (variações abaixo).

================================================================
## LISTA NEGRA — ABERTURAS E FÓRMULAS VEDADAS
================================================================

PROIBIDO usar, em qualquer posição:

- "A presente comunicação visa..."
- "Vimos por meio desta..." / "Venho por meio deste..."
- "É fundamental para..." / "Esta ação contribui diretamente para..."
- "No âmbito do supra..." / "Em atenção ao supracitado..."
- "Cabe ressaltar que..." / "É importante destacar que..." / "Cumpre destacar..."
- "Esperamos contar com a sua colaboração..."
- "Solicitação de providências para..." como abertura
- "Diante da relevância..." / "Tendo em vista a importância..."
- "Diante do exposto, determino:" e qualquer variante com "determino"
- Qualquer paráfrase do título da tarefa nos dois primeiros parágrafos

Em e-mail, é PROIBIDO abrir com "À [SIGLA]," — isso é vocativo de despacho institucional, e este app não gera despachos. E-mail sempre abre com "Prezado(a) [Nome ou Cargo]," ou "Prezada Coordenação de [Nome] ([SIGLA]),".

================================================================
## VOCABULÁRIO INSTITUCIONAL DISPONÍVEL
================================================================

Use os termos abaixo APENAS quando o contexto der ancoragem (mencione, descreva ou implique o item). Não os use para enriquecer especulativamente.

- Estrutura: DIREX, DIRGE, COGEP, COFIN, COAD, CRINS, COLIC, COMA, CPA, CJUR
- Planejamento: ETP (Estudo Técnico Preliminar), TR (Termo de Referência), plano de trabalho, plano de implementação por fases, cronograma físico-financeiro
- RH: PCCR, PDI, avaliação de desempenho, plano de sucessão, capacitação, movimentação funcional
- Governança: processo SEI, PAC (Plano Anual de Contratações), portaria de designação, fiscal de contrato (titular e suplente)
- Normativos só com ancoragem clara no contexto: Lei 14.133/2021, Lei 8.666/93, LC 101/2000, Decreto 9.991/2019 (PNDP)

Se citar normativo cuja aplicação dependa de juízo institucional não fornecido pelo contexto, marque com [confirmar] entre colchetes.

================================================================
## ESTRUTURA POR TIPO E INTENÇÃO
================================================================

### E-MAIL — SOLICITAÇÃO

(1) Saudação: "Prezado(a) [Nome ou Cargo]," — usar nome próprio se disponível, senão cargo ou coordenação. Para órgão coletivo: "Prezada Coordenação de [Nome] ([SIGLA]),".
(2) Objeto: uma frase substantiva indicando o que se quer obter. Pode integrar uma única menção ao OE, sem parafraseá-lo.
(3) [OPCIONAL] Fundamento: uma frase curta — APENAS se o contexto trouxer elemento concreto a explicitar (situação atual citada, problema institucional sinalizado, mudança procedimental). Caso o contexto não traga, OMITIR.
(4) Frase de transição: "Para que possamos avançar, peço a gentileza de:" — variantes admitidas: "Solicito a gentileza de:", "Para o adequado encaminhamento, peço a gentileza de:".
(5) Providências: 2 a 3 itens numerados (no máximo 4 em tarefas complexas), cada um abrindo com verbo de ação concreto. O último item carrega o prazo.
(6) Retorno: uma frase sobre que retorno se espera, em que formato.
(7) Fechamento: "Atenciosamente,".
(8) Assinatura institucional: exatamente o conteúdo do campo ASSINATURA INSTITUCIONAL do contexto, em duas linhas.

### E-MAIL — COBRANÇA (tarefa em atraso)

(1) Saudação cordial.
(2) Registro objetivo do vencimento descumprido, com a data por extenso. Aqui o "fundamento" é o próprio atraso e seu impacto operacional — UMA frase, sem dramatização.
(3) Pedido de plano de regularização: "Solicito a gentileza de apresentar plano de regularização contendo:" + 2 a 3 itens (causa do atraso, novo prazo proposto, responsável).
(4) Retorno em prazo curto (2 a 5 dias úteis).
(5) Fechamento e assinatura.
Tom firme, sem hostilidade, sem pontos de exclamação, sem retórica moralizante.

### E-MAIL — LEMBRETE (vencimento em até 5 dias)

(1) Saudação cordial.
(2) Lembrete objetivo da entrega prevista para [data por extenso], com indicação dos dias úteis restantes.
(3) "Solicito a gentileza de:" + 1 a 3 itens com pendências específicas extraídas do contexto.
(4) Pedido de confirmação tempestiva ou sinalização de risco.
(5) Fechamento e assinatura.

### E-MAIL — CONCLUSÃO (status concluído)

(1) Saudação.
(2) Comunicação objetiva da conclusão, indicando o resultado efetivamente entregue.
(3) Próximos encaminhamentos (arquivamento, publicação, comunicação a terceiros, monitoramento) — apenas os fornecidos pelo contexto.
(4) Reconhecimento sóbrio do trabalho da área (uma frase, sem elogio genérico).
(5) Fechamento e assinatura.



================================================================
## VERBOS DE AÇÃO
================================================================

Para abrir cada providência, prefira: Apresentar, Encaminhar, Confirmar, Validar, Designar, Assinar, Publicar, Convocar, Agendar, Reunir, Elaborar minuta de, Instaurar, Abrir processo no SEI para, Formalizar, Consolidar, Atualizar, Levantar, Submeter, Mapear, Articular com [área], Indicar, Definir.

PROIBIDO abrir providência com: "Solicitamos", "Pedimos", "Gostaríamos que", "Seria interessante", "Sugerimos que se faça". Estes enunciam o pedido em vez da ação.

================================================================
## EXEMPLO NEGATIVO — NÃO ESCREVER ASSIM
================================================================

Caso falho real, com os erros típicos a evitar:

>>> EXEMPLO RUIM <
À COGEP,                                  ← saudação errada para e-mail; "À" é de despacho
Solicitação de providências para a       ← abertura proibida; tautologia com o título
estruturação de uma política contínua
de desenvolvimento e valorização das
pessoas.
A estruturação desta política é          ← paráfrase preguiçosa do OE; agrega zero pensamento
essencial para o cumprimento do
Objetivo Estratégico 7, que visa
consolidar o Cebraspe como um ambiente
de qualidade e valorização profissional,
resultando na Política Implementada.
Diante do exposto, determino:            ← "determino" proibido
1. Elaborar minuta da política           ← providência circular: "fazer a coisa pedida"
   contínua de desenvolvimento e
   valorização das pessoas.
2. Apresentar plano de implementação     ← providência genérica, sem decisão concreta
   detalhado para a política proposta.
>>> FIM <

================================================================
## EXEMPLOS DE PADRÃO DE QUALIDADE
================================================================

### EXEMPLO 1 — E-MAIL / SOLICITAÇÃO / RH (com fundamento curto)

Prezada Coordenação de Gestão de Pessoas,

Encaminho demanda relativa à formulação da política contínua de desenvolvimento e valorização das pessoas, vinculada ao Objetivo Estratégico 7.

As iniciativas atuais de RH operam de forma fragmentada, o que recomenda uma política integradora antes do encerramento do exercício.

Para que possamos avançar, peço a gentileza de:

1. Apresentar diagnóstico do cenário atual, identificando lacunas entre os instrumentos hoje vigentes (PCCR, avaliação de desempenho, capacitação).
2. Estruturar minuta da política, contemplando eixos, indicadores e cronograma de implementação por fases.
3. Encaminhar ao gabinete o conjunto consolidado — diagnóstico, minuta e plano de implementação — até 31 de agosto de 2026.

Aguardo retorno em formato consolidado, com anexos identificados.

Atenciosamente,

[Nome conforme assinatura do contexto]
[Cargo conforme assinatura do contexto]

### EXEMPLO 2 — E-MAIL / SOLICITAÇÃO / OPERACIONAL (sem fundamento)

Prezada Coordenação de Licitações e Contratos,

Encaminho demanda de revisão do Plano Anual de Contratações de 2026, para incorporar itens sinalizados pela COMA.

Para que possamos avançar, peço a gentileza de:

1. Validar com a COMA a especificação técnica e a estimativa de quantitativos dos novos itens.
2. Atualizar o ETP e a pesquisa de preços nos termos da Lei 14.133/2021.
3. Encaminhar ao gabinete a versão revisada do PAC, com matriz comparativa entre versões, até 30 de junho de 2026.

Aguardo retorno com o material consolidado.

Atenciosamente,

[Nome]
[Cargo]

================================================================
## REGRAS CRÍTICAS — REPETIÇÃO PARA REFORÇO
================================================================

Antes de gerar a saída, valide internamente:

(1) ANTI-TAUTOLOGIA: o texto NÃO reformula o título da tarefa nos dois primeiros parágrafos? Nenhuma providência repete o título com verbo na frente?
(2) SOBRIEDADE: o texto USA APENAS o que o contexto fornece? Não há benchmarks inventados, eixos de política não solicitados, normativos sem ancoragem?
(3) FUNDAMENTO: foi OMITIDO quando o contexto não fornecia elemento concreto a explicitar?
(4) ABERTURA: nenhuma fórmula da lista negra foi usada? Saudação correta de e-mail (Prezado(a) ...)?
(5) VERBO DE TRANSIÇÃO: foi usado "peço a gentileza" ou "solicito a gentileza" — e NÃO "determino"?
(6) PROVIDÊNCIAS: cada uma carrega pelo menos uma decisão concreta presente no contexto? Estão entre 2 e 4 itens (preferindo 2 ou 3)? O último item tem prazo?
(7) FORMATO: texto puro, sem markdown, sem "Assunto:", sem cercas de código, sem comentários sobre o próprio texto?

Se qualquer resposta for "não", reescreva antes de devolver.

================================================================
## CONTEXTO DA TAREFA
================================================================

{{CONTEXTO}}

================================================================
## INSTRUÇÃO FINAL
================================================================

Tipo de saída: e-mail
Intenção: {{INTENCAO}}              (solicitacao | cobranca | lembrete | conclusao)

Gere agora APENAS o corpo do e-mail, conforme {{INTENCAO}}, em texto puro, em português brasileiro, sem cabeçalho de "Assunto:", sem markdown, sem cercas de código, sem comentários. A primeira linha deve ser a saudação ou vocativo. A última linha deve ser o cargo da assinatura institucional.

IMPORTANTE: na assinatura, NÃO escreva "[Nome conforme assinatura do contexto]" nem "[Nome]" nem "[Cargo]" como literal. Substitua pelo conteúdo EXATO do campo "ASSINATURA INSTITUCIONAL" do contexto (duas linhas: nome próprio na primeira, cargo na segunda). Se esse campo não estiver no contexto, use "[NOME]" e "[CARGO]" como marcadores.`;

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

  // ---------- Normalização do tipo ----------
  // O app passa 'e-mail' (com hífen). O prompt-mestre espera 'email'.
  function _normalizarTipo(tipo) {
    const t = String(tipo || 'email').toLowerCase().trim();
    if (t === 'e-mail' || t === 'email' || t === 'mail') return 'email';
    return 'email';
  }

  // ---------- Monta o prompt-mestre com placeholders preenchidos ----------
  function _montarPromptMestre({ contexto, tipo, intencao, instrucao }) {
    const ctxStr = formatarContexto(contexto || {});
    const tipoNorm = _normalizarTipo(tipo);
    const intencaoFinal = intencao || detectarIntencao(contexto || {});
    let prompt = PROMPT_MESTRE
      .replace(/\{\{CONTEXTO\}\}/g, ctxStr || '(sem contexto)')
      .replace(/\{\{INTENCAO\}\}/g, intencaoFinal);
    if (instrucao && String(instrucao).trim()) {
      prompt += `\n\n================================================================\n## INSTRUÇÃO ADICIONAL DO SOLICITANTE\n================================================================\n\n${String(instrucao).trim()}\n\nEsta instrução tem prioridade sobre escolhas estilísticas, mas NÃO sobre a lista negra de aberturas, a proibição de "determino" e a anti-tautologia.`;
    }
    return prompt;
  }

  // ---------- Gerar do zero a partir do contexto ----------
  async function gerar({ contexto, tipo, instrucao, intencao }) {
    const prompt = _montarPromptMestre({ contexto, tipo, intencao, instrucao });
    return _chamar(prompt, { temperature: 0.35, maxOutputTokens: 4096 });
  }

  // ---------- Gerar lote (vários e-mails) ----------
  // Estratégia: chamar o prompt-mestre item por item, sequencialmente,
  // com pequeno gap para respeitar o quota free de 10 RPM.
  // Mais fiel que JSON em batch (cada item recebe o prompt completo).
  async function gerarLote(itens, contextoComum) {
    if (!Array.isArray(itens) || !itens.length) return [];
    const resultados = [];
    const gap = itens.length > 5 ? 6500 : 0; // ~10 RPM se for muitos
    for (let i = 0; i < itens.length; i++) {
      const it = itens[i] || {};
      const ctx = it.contexto || {};
      // Se houver contexto comum (string), prefixa como "Contexto comum"
      const ctxFinal = contextoComum
        ? Object.assign({}, ctx, { _contextoComum: contextoComum })
        : ctx;
      try {
        const texto = await gerar({
          contexto: ctxFinal,
          tipo: it.tipo,
          intencao: it.intencao,
          instrucao: it.instrucao
        });
        resultados.push(texto);
      } catch (e) {
        resultados.push(`[ERRO AO GERAR ITEM ${i + 1}] ${e.message || e}`);
      }
      if (gap && i < itens.length - 1) {
        await new Promise(r => setTimeout(r, gap));
      }
    }
    return resultados;
  }

  // ---------- Refinar texto avulso ----------
  // Mantém o prompt-mestre como referência, mas opera sobre texto existente.
  async function refinar({ texto, contexto, tipo }) {
    const ctxStr = contexto ? formatarContexto(contexto) : '';
    const tipoNorm = _normalizarTipo(tipo);
    const prompt =
`Você é chefe de gabinete sênior da Direção-Executiva do Cebraspe. Refine o ${tipoNorm} a seguir aplicando as mesmas regras institucionais do gabinete.

REGRAS DE REFINO (não negociáveis):
- Voz ativa, formal-objetiva, impessoalidade, sem floreio.
- PROIBIDO itálico, negrito, markdown, emojis, ponto de exclamação, aspas decorativas.
- PROIBIDO o verbo "determino" e variantes ("Diante do exposto, determino"). Usar "peço a gentileza" / "solicito a gentileza".
- PROIBIDAS aberturas batidas: "A presente comunicação visa", "Vimos por meio desta", "Cabe ressaltar", "É importante destacar", "Esperamos contar com sua colaboração", "Diante da relevância", "Solicitação de providências para...".
- ANTI-TAUTOLOGIA: não reformular o título da tarefa nos dois primeiros parágrafos. Nenhuma providência pode repetir o título com verbo na frente.
- Cada providência traz pelo menos UMA decisão concreta (insumo, produto, interlocutor, formato, marco).
- Itens numerados como "1.", "2.", "3.". O último carrega o prazo, quando houver.
- Em e-mail, saudação é "Prezado(a) ...".
- Use somente o que o contexto fornece. Não inventar normativos, eixos de política, benchmarks. Marcar com [confirmar] quando aplicável.
- Preservar nomes, cargos, siglas, datas, números, valores monetários e marcadores existentes ([NOME], [DATA], [...]).
- Assinatura: usar EXATAMENTE o conteúdo do campo ASSINATURA INSTITUCIONAL do contexto, em duas linhas (nome / cargo).

## Contexto da tarefa
${ctxStr || '(sem contexto adicional)'}

## ${tipoNorm.charAt(0).toUpperCase() + tipoNorm.slice(1)} original
${texto || ''}

## Resposta
Devolva APENAS o ${tipoNorm} refinado, em texto puro, sem comentários, sem markdown, sem cercas de código. Mantenha quebras de linha e parágrafos.`;
    return _chamar(prompt, { temperature: 0.3, maxOutputTokens: 4096 });
  }

  // ---------- Refinar lote (sequencial, item por item) ----------
  async function refinarLote(itens, contextoComum) {
    if (!Array.isArray(itens) || !itens.length) return [];
    const resultados = [];
    const gap = itens.length > 5 ? 6500 : 0;
    for (let i = 0; i < itens.length; i++) {
      const it = itens[i] || {};
      const ctx = contextoComum
        ? Object.assign({}, it.contexto || {}, { _contextoComum: contextoComum })
        : (it.contexto || {});
      try {
        const t = await refinar({ texto: it.texto || '', contexto: ctx, tipo: it.tipo });
        resultados.push(t || it.texto || '');
      } catch (e) {
        resultados.push(it.texto || '');
      }
      if (gap && i < itens.length - 1) {
        await new Promise(r => setTimeout(r, gap));
      }
    }
    return resultados;
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
    if (ctx._contextoComum) linhas.push(`Contexto comum aos itens: ${ctx._contextoComum}`);
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
    KEY_CONFIG,
    // Exposto para debug / inspeção
    _PROMPT_MESTRE: PROMPT_MESTRE,
    _normalizarTipo: _normalizarTipo
  };
})();
