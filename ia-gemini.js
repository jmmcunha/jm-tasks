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
  const DIRETRIZES = `Diretrizes obrigatórias:

1. Tom institucional Cebraspe — Manual de Redação da Presidência da República:
   - Voz ativa, formal-objetiva, impessoalidade.
   - Sem jargão, sem coloquialismo, sem itálico, sem emojis, sem markdown decorativo.
   - Cabeçalho e fechamento adequados ao destinatário.

2. Concisão e clareza:
   - Frases curtas, uma ideia por frase.
   - Sem redundância, sem qualificadores vazios, sem fórmulas burocráticas ("vimos por meio desta", "em atenção ao supra").
   - Use tópicos quando houver enumeração natural.

3. Contexto estratégico:
   - Cite o Objetivo Estratégico quando houver e for pertinente.
   - Mencione o prazo se for crítico.
   - Aponte dependências apenas se descritas no contexto.

4. Preservar com fidelidade:
   - Nomes próprios, cargos, siglas, datas, números, valores monetários conforme o contexto.
   - Citações textuais de regulamentos, portarias, leis e decisões.
   - Marcadores de placeholder existentes (ex.: [NOME], [DATA]).

5. Não inventar:
   - Não crie fatos, números, datas, nomes ou cargos que não estejam no contexto.
   - Se faltar informação crítica, deixe [ESPECIFICAR] como marcador.`;

  // ---------- Gerar do zero a partir do contexto ----------
  async function gerar({ contexto, tipo, instrucao }) {
    const ctxStr = formatarContexto(contexto || {});
    const tipoStr = (tipo || 'e-mail').toLowerCase();
    const especificacao = tipoStr === 'despacho'
      ? `Você é assessor de redação institucional do Cebraspe. Redija um DESPACHO oficial completo a partir SOMENTE do contexto abaixo.

O despacho deve conter, na ordem:
- Identificação da tarefa (título e, se houver, OE).
- Análise sucinta da situação (o que é, por que importa).
- Encaminhamentos objetivos (o que deve ser feito, por quem, até quando).
- Fechamento institucional padrão.

Não use saudação de e-mail. É documento interno de despacho.`
      : `Você é assessor de redação institucional do Cebraspe. Redija um E-MAIL profissional completo a partir SOMENTE do contexto abaixo.

O e-mail deve conter, na ordem:
- Saudação adequada ao destinatário (se informado).
- Parágrafo de contextualização (o que motiva a comunicação).
- Solicitação ou informação principal, com clareza sobre o que se espera.
- Prazo, se houver.
- Fechamento cordial e assinatura institucional genérica ("Atenciosamente," + linha em branco).

Não inclua linha de "Assunto:" no corpo.`;

    const prompt =
`${especificacao}

${DIRETRIZES}

## Contexto da tarefa
${ctxStr || '(sem contexto)'}
${instrucao ? `\n## Instrução adicional\n${instrucao}\n` : ''}
## Resposta
Devolva APENAS o ${tipoStr} pronto, sem comentários, sem markdown, sem explicações. Mantenha quebras de linha e parágrafos.`;
    return _chamar(prompt, { temperature: 0.5, maxOutputTokens: 4096 });
  }

  // ---------- Gerar lote (vários e-mails / despachos) ----------
  async function gerarLote(itens, contextoComum) {
    if (!Array.isArray(itens) || !itens.length) return [];
    const tipo = (itens[0]?.tipo || 'e-mail').toLowerCase();
    const blocos = itens.map((it, i) =>
      `### ITEM ${i + 1}\n${formatarContexto(it.contexto || {})}`
    ).join('\n\n');
    const prompt =
`Você é assessor de redação institucional do Cebraspe. Redija ${itens.length} ${tipo}s independentes, um para cada item abaixo, a partir SOMENTE do contexto fornecido.

${DIRETRIZES}

Cada ${tipo} deve ser autônomo e completo (saudação/identificação, corpo, fechamento), sem markdown.
${contextoComum ? '\n## Contexto comum a todos\n' + contextoComum + '\n' : ''}
## Itens

${blocos}

## Resposta
Devolva APENAS um JSON válido, sem markdown, no formato:
{ "itens": [ { "indice": 1, "texto": "<${tipo} pronto>" }, { "indice": 2, "texto": "<${tipo} pronto>" } ] }
A ordem do array deve corresponder à ordem dos ITENS.`;
    const raw = await _chamar(prompt, { temperature: 0.5, maxOutputTokens: 8192, json: true });
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
    if (ctx.responsavel) linhas.push(`Responsável: ${ctx.responsavel}`);
    if (ctx.prazo) linhas.push(`Prazo: ${ctx.prazo}`);
    if (ctx.status) linhas.push(`Status: ${ctx.status}`);
    if (ctx.prioridade) linhas.push(`Prioridade: ${ctx.prioridade}`);
    if (ctx.resultado) linhas.push(`Resultado esperado: ${ctx.resultado}`);
    if (ctx.descricao) linhas.push(`Descrição: ${ctx.descricao}`);
    if (ctx.destinatario) linhas.push(`Destinatário: ${ctx.destinatario}`);
    if (ctx.assunto) linhas.push(`Assunto: ${ctx.assunto}`);
    return linhas.join('\n');
  }

  // ---------- API pública ----------
  window.IAGemini = {
    gerar,
    gerarLote,
    refinar,
    refinarLote,
    testarChave,
    getChave,
    temChave,
    getConfig,
    setConfig,
    ofuscar,
    desofuscar,
    KEY_CONFIG
  };
})();
