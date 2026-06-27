/* reunioes-ia.js — Leva 36
 * IA Gemini multimodal aplicada a anexos de reunião.
 *
 * Capacidades:
 *  - analisarAudio(anexo, ctx)   -> ata estruturada (resumo, transcrição, decisões, tarefas)
 *  - analisarImagem(anexo, ctx)  -> OCR + descrição + assuntos/decisões/tarefas sugeridos
 *  - analisarPDF(anexo, ctx)     -> texto extraído + assuntos sugeridos (mais simples)
 *  - analisarAnexo(anexo, ctx)   -> roteador conforme tipo
 *
 * Todas as funções devolvem o mesmo schema de "sugestões":
 *  {
 *    tipo: 'audio'|'imagem'|'pdf',
 *    resumo: string,
 *    transcricao_ou_texto: string,
 *    descricao: string,         // imagem
 *    assuntos_sugeridos: [{titulo, dono, urgencia, estimativa_min, notas}],
 *    decisoes_sugeridas: [{texto, categoria, assunto_titulo}],
 *    tarefas_sugeridas:  [{titulo, responsavel, prazo, prioridade, notas, assunto_titulo}],
 *    avisos: [string]
 *  }
 *
 * Usa window.IAGemini.getChave() (mesma chave da geração de e-mails).
 * Modelo: gemini-2.5-flash (multimodal completo). Flash-lite NÃO aceita áudio.
 */
(function () {
  'use strict';

  const MODELO = 'gemini-2.5-flash';
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;
  const LIMITE_INLINE = 18 * 1024 * 1024; // 18 MB — limite seguro para inlineData

  function _chave() {
    if (!window.IAGemini || typeof window.IAGemini.getChave !== 'function') {
      throw new Error('Módulo IA Gemini não carregou.');
    }
    const k = window.IAGemini.getChave();
    if (!k) throw new Error('Chave da IA não configurada. Vá em Configurações → IA.');
    return k;
  }

  async function _chamarMultimodal(partes, opts) {
    const chave = _chave();
    const body = {
      contents: [{ parts: partes }],
      generationConfig: {
        temperature: opts?.temperature ?? 0.25,
        maxOutputTokens: opts?.maxOutputTokens ?? 4096,
        responseMimeType: 'application/json'
      }
    };
    const ctrl = new AbortController();
    const timeoutMs = opts?.timeoutMs ?? 90000;
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    let resp;
    try {
      resp = await fetch(`${ENDPOINT}?key=${encodeURIComponent(chave)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ctrl.signal
      });
    } catch (e) {
      clearTimeout(timer);
      if (e.name === 'AbortError') throw new Error(`A IA demorou mais de ${Math.round(timeoutMs/1000)}s. Tente um arquivo menor.`);
      throw new Error('Falha de rede ao chamar a IA.');
    }
    clearTimeout(timer);
    if (!resp.ok) {
      const txt = await resp.text().catch(() => '');
      if (resp.status === 401 || resp.status === 403) {
        throw new Error('Chave inválida ou sem permissão. Verifique em Configurações → IA.');
      }
      if (resp.status === 429) {
        throw new Error('Cota da IA esgotada. Aguarde e tente novamente, ou troque o modelo em Configurações → IA.');
      }
      throw new Error(`Erro ${resp.status} da IA. ${txt.slice(0, 300)}`);
    }
    const data = await resp.json();
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!texto) throw new Error('Resposta vazia da IA.');
    try {
      return JSON.parse(texto);
    } catch (_) {
      // Tenta extrair JSON entre marcadores
      const m = String(texto).match(/\{[\s\S]*\}/);
      if (m) try { return JSON.parse(m[0]); } catch {}
      throw new Error('A IA não devolveu JSON válido.');
    }
  }

  function _baixarBase64(path) {
    if (!window.ReunioesAnexos || !window.ReunioesAnexos.baixarBase64) {
      throw new Error('Módulo ReunioesAnexos não carregou.');
    }
    return window.ReunioesAnexos.baixarBase64(path);
  }

  function _contextoReuniao(reuniao) {
    if (!reuniao) return '';
    const linhas = [];
    if (reuniao.numero) linhas.push(`Reunião nº ${reuniao.numero}`);
    if (reuniao.titulo) linhas.push(`Título: ${reuniao.titulo}`);
    if (reuniao.data) linhas.push(`Data: ${reuniao.data}`);
    if (reuniao.local) linhas.push(`Local: ${reuniao.local}`);
    if (Array.isArray(reuniao.participantes) && reuniao.participantes.length) {
      linhas.push(`Participantes: ${reuniao.participantes.join(', ')}`);
    }
    return linhas.join('\n');
  }

  /* ---------- PROMPT BASE ---------- */

  const REGRAS_INSTITUCIONAIS = `
REGRAS DE REDAÇÃO PARA TODAS AS SUGESTÕES:
- Estilo institucional sóbrio, conforme Manual de Redação da Presidência.
- PROIBIDO o verbo "determino". Use "peço a gentileza" / "solicito a gentileza" quando couber.
- PROIBIDO itálico, markdown, negrito, emojis, ponto de exclamação.
- NÃO use as palavras "cobrar" ou "cobrança" no texto visível.
- Frases curtas e diretas. Voz ativa, impessoalidade.
- Use APENAS o que o anexo e o contexto fornecem. Não invente normativos, datas, valores ou pessoas.
- Em caso de dúvida sobre uma decisão concreta, marque como assunto_sugerido (não como decisão).

CATEGORIAS DE DECISÃO:
- decisao_externa: dirigida a interlocutor fora do Cebraspe (órgãos, fornecedores, parceiros)
- delegacao_interna: dirigida a coordenação/diretoria interna (DIREX, COGEP, COFIN, COAD, COLIC, etc.)
- encaminhamento: providência administrativa (abrir SEI, encaminhar a comitê, etc.)
- informe: registro de informação ou ciência, sem ação.

URGÊNCIA DE ASSUNTO: baixa | media | alta
PRIORIDADE DE TAREFA: baixa | media | alta`;

  const SCHEMA = `{
  "tipo": "audio|imagem|pdf",
  "resumo": "string — 1 a 3 frases",
  "transcricao_ou_texto": "string — transcrição integral (áudio) ou texto extraído (imagem/PDF). Pode ser vazio se irrelevante.",
  "descricao": "string — só para imagem: o que aparece visualmente. Vazio para áudio/PDF.",
  "assuntos_sugeridos": [
    { "titulo": "string curto", "dono": "string ou ''", "urgencia": "baixa|media|alta", "estimativa_min": 0, "notas": "string opcional" }
  ],
  "decisoes_sugeridas": [
    { "texto": "string — uma decisão concreta, em redação oficial", "categoria": "decisao_externa|delegacao_interna|encaminhamento|informe", "assunto_titulo": "string — qual assunto da lista acima isso decide" }
  ],
  "tarefas_sugeridas": [
    { "titulo": "string — verbo no infinitivo + objeto", "responsavel": "string ou ''", "prazo": "YYYY-MM-DD ou ''", "prioridade": "baixa|media|alta", "notas": "string opcional", "assunto_titulo": "string — qual assunto a tarefa atende" }
  ],
  "avisos": ["string — observações sobre limitações da análise"]
}`;

  /* ---------- ÁUDIO → ATA ESTRUTURADA ---------- */

  async function analisarAudio(anexo, reuniao) {
    if (!anexo || !anexo.path) throw new Error('Anexo inválido.');
    const dl = await _baixarBase64(anexo.path);
    if (dl.tamanho > LIMITE_INLINE) {
      throw new Error(`Áudio muito grande (${(dl.tamanho/1024/1024).toFixed(1)} MB). Para arquivos acima de ${(LIMITE_INLINE/1024/1024)|0} MB use a API File do Google.`);
    }

    const ctxStr = _contextoReuniao(reuniao);
    const prompt = `Você é chefe de gabinete da Direção-Executiva do Cebraspe. Recebeu o áudio de uma reunião e deve produzir UMA ATA ESTRUTURADA em JSON.

CONTEXTO DA REUNIÃO:
${ctxStr || '(sem contexto adicional)'}

TAREFAS:
1. Transcreva integralmente a fala em português brasileiro (campo transcricao_ou_texto).
2. Produza um resumo executivo de 1 a 3 frases.
3. Identifique assuntos discutidos (assuntos_sugeridos).
4. Identifique decisões tomadas (decisoes_sugeridas), classificando por categoria.
5. Identifique tarefas resultantes (tarefas_sugeridas), com responsável, prazo e prioridade quando explícitos no áudio.
6. Se a qualidade do áudio impedir transcrição confiável de algum trecho, registre em "avisos".

${REGRAS_INSTITUCIONAIS}

DEVOLVA APENAS UM OBJETO JSON COM ESTE SCHEMA (sem markdown, sem comentários):
${SCHEMA}`;

    const partes = [
      { text: prompt },
      { inlineData: { mimeType: dl.mime || anexo.mime || 'audio/webm', data: dl.base64 } }
    ];
    const out = await _chamarMultimodal(partes, { temperature: 0.2, maxOutputTokens: 8192, timeoutMs: 120000 });
    out.tipo = 'audio';
    return _normalizar(out);
  }

  /* ---------- IMAGEM → OCR + VISÃO + SUGESTÕES ---------- */

  async function analisarImagem(anexo, reuniao) {
    if (!anexo || !anexo.path) throw new Error('Anexo inválido.');
    const dl = await _baixarBase64(anexo.path);
    if (dl.tamanho > LIMITE_INLINE) {
      throw new Error(`Imagem muito grande (${(dl.tamanho/1024/1024).toFixed(1)} MB).`);
    }
    const ctxStr = _contextoReuniao(reuniao);
    const prompt = `Você é chefe de gabinete da Direção-Executiva do Cebraspe. Recebeu uma IMAGEM relacionada a uma reunião (pode ser foto de quadro branco, slide, documento, of\u00edcio, gráfico, etc.) e deve produzir sugestões para a pauta.

CONTEXTO DA REUNIÃO:
${ctxStr || '(sem contexto adicional)'}

TAREFAS:
1. Descreva objetivamente o que aparece na imagem (campo descricao, 1 a 3 frases).
2. Extraia todo o texto legível (OCR) no campo transcricao_ou_texto, preservando estrutura quando possível.
3. Produza um resumo executivo (campo resumo).
4. Proponha assuntos para a pauta (assuntos_sugeridos), com base no conteúdo extraído.
5. Proponha decisões e tarefas resultantes APENAS se forem claramente inferíveis do conteúdo. Quando em dúvida, deixe como assunto.
6. Se houver texto ilegível ou cortado, registre em "avisos".

${REGRAS_INSTITUCIONAIS}

DEVOLVA APENAS UM OBJETO JSON COM ESTE SCHEMA (sem markdown, sem comentários):
${SCHEMA}`;

    const partes = [
      { text: prompt },
      { inlineData: { mimeType: dl.mime || anexo.mime || 'image/jpeg', data: dl.base64 } }
    ];
    const out = await _chamarMultimodal(partes, { temperature: 0.25, maxOutputTokens: 4096, timeoutMs: 90000 });
    out.tipo = 'imagem';
    return _normalizar(out);
  }

  /* ---------- PDF → TEXTO + SUGESTÕES ---------- */

  async function analisarPDF(anexo, reuniao) {
    if (!anexo || !anexo.path) throw new Error('Anexo inválido.');
    const dl = await _baixarBase64(anexo.path);
    if (dl.tamanho > LIMITE_INLINE) {
      throw new Error(`PDF muito grande (${(dl.tamanho/1024/1024).toFixed(1)} MB).`);
    }
    const ctxStr = _contextoReuniao(reuniao);
    const prompt = `Você é chefe de gabinete da Direção-Executiva do Cebraspe. Recebeu um documento PDF relacionado a uma reunião (ofício, despacho, parecer, edital, planilha em PDF, etc.) e deve produzir sugestões para a pauta.

CONTEXTO DA REUNIÃO:
${ctxStr || '(sem contexto adicional)'}

TAREFAS:
1. Resuma o documento em 1 a 3 frases (campo resumo).
2. Extraia o texto relevante no campo transcricao_ou_texto (não precisa ser integral — foque no que serve para deliberação).
3. Proponha assuntos para a pauta (assuntos_sugeridos).
4. Proponha decisões e tarefas APENAS se forem inferíveis. Em dúvida, deixe como assunto.
5. Registre eventuais avisos sobre limitação de leitura.

${REGRAS_INSTITUCIONAIS}

DEVOLVA APENAS UM OBJETO JSON COM ESTE SCHEMA (sem markdown, sem comentários):
${SCHEMA}`;

    const partes = [
      { text: prompt },
      { inlineData: { mimeType: dl.mime || anexo.mime || 'application/pdf', data: dl.base64 } }
    ];
    const out = await _chamarMultimodal(partes, { temperature: 0.25, maxOutputTokens: 6144, timeoutMs: 120000 });
    out.tipo = 'pdf';
    return _normalizar(out);
  }

  /* ---------- ROUTEAMENTO ---------- */

  async function analisarAnexo(anexo, reuniao) {
    if (!anexo) throw new Error('Anexo vazio.');
    if (anexo.tipo === 'audio') return analisarAudio(anexo, reuniao);
    if (anexo.tipo === 'imagem') return analisarImagem(anexo, reuniao);
    if (anexo.tipo === 'pdf') return analisarPDF(anexo, reuniao);
    throw new Error(`Tipo "${anexo.tipo}" não é analisado pela IA nesta versão.`);
  }

  /* ---------- Normalização ---------- */

  function _normalizar(j) {
    const out = {
      tipo: String(j?.tipo || ''),
      resumo: String(j?.resumo || '').trim(),
      transcricao_ou_texto: String(j?.transcricao_ou_texto || j?.transcricao || j?.texto || '').trim(),
      descricao: String(j?.descricao || '').trim(),
      assuntos_sugeridos: Array.isArray(j?.assuntos_sugeridos) ? j.assuntos_sugeridos.map(_normAssunto) : [],
      decisoes_sugeridas: Array.isArray(j?.decisoes_sugeridas) ? j.decisoes_sugeridas.map(_normDecisao) : [],
      tarefas_sugeridas: Array.isArray(j?.tarefas_sugeridas) ? j.tarefas_sugeridas.map(_normTarefa) : [],
      avisos: Array.isArray(j?.avisos) ? j.avisos.map((s) => String(s)).filter(Boolean) : [],
      geradoEm: Date.now()
    };
    return out;
  }
  function _normAssunto(a) {
    return {
      titulo: String(a?.titulo || '').trim(),
      dono: String(a?.dono || '').trim(),
      urgencia: ['baixa','media','alta'].includes(a?.urgencia) ? a.urgencia : 'media',
      estimativa_min: Number.isFinite(+a?.estimativa_min) ? +a.estimativa_min : 0,
      notas: String(a?.notas || '').trim()
    };
  }
  function _normDecisao(d) {
    const cats = ['decisao_externa','delegacao_interna','encaminhamento','informe'];
    return {
      texto: String(d?.texto || '').trim(),
      categoria: cats.includes(d?.categoria) ? d.categoria : 'delegacao_interna',
      assunto_titulo: String(d?.assunto_titulo || '').trim()
    };
  }
  function _normTarefa(t) {
    return {
      titulo: String(t?.titulo || '').trim(),
      responsavel: String(t?.responsavel || '').trim(),
      prazo: String(t?.prazo || '').trim(),
      prioridade: ['baixa','media','alta'].includes(t?.prioridade) ? t.prioridade : 'media',
      notas: String(t?.notas || '').trim(),
      assunto_titulo: String(t?.assunto_titulo || '').trim()
    };
  }

  /* ---------- Export ---------- */
  window.ReunioesIA = {
    analisarAnexo,
    analisarAudio,
    analisarImagem,
    analisarPDF,
    MODELO,
    LIMITE_INLINE
  };
})();
