/* quick-capture.js — Captura rápida em linguagem natural (pt-BR) + voz
   Adiciona um painel acima do formulário de tarefas. A usuária digita ou dita
   uma frase, o parser local extrai título, datas, OE, prioridade e responsável,
   mostra um preview e permite salvar direto OU abrir o formulário tradicional
   já preenchido pra ajustar.

   Sem dependências externas. Reusa funções globais do app.js:
   - tarefas, salvarTarefas, uid, popularResponsaveis, renderTudo
*/

(function () {
  'use strict';

  /* ========== CSS injetado ========== */

  function injectStyles() {
    if (document.getElementById('qc-styles')) return;
    const css = [
      '.qc-card{background:linear-gradient(135deg,#f0f5ff 0%,#e8f0fe 100%);',
      '  border:1px solid #c7d8f5;border-radius:12px;padding:14px 16px;margin-bottom:14px;}',
      '.qc-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}',
      '.qc-head h3{margin:0;font-size:15px;color:#0a3d7a;font-weight:700;}',
      '.qc-head .qc-tag{background:#0a3d7a;color:#fff;font-size:10px;font-weight:700;',
      '  padding:2px 7px;border-radius:10px;letter-spacing:.04em;}',
      '.qc-row{display:flex;gap:8px;align-items:stretch;}',
      '.qc-row textarea{flex:1;min-height:42px;max-height:120px;resize:vertical;',
      '  padding:10px 12px;border:1px solid #b9cae6;border-radius:8px;',
      "  font:14px/1.4 'General Sans',system-ui,sans-serif;background:#fff;",
      '  box-sizing:border-box;}',
      '.qc-row textarea:focus{outline:none;border-color:#0a3d7a;',
      '  box-shadow:0 0 0 3px rgba(10,61,122,.15);}',
      '.qc-btn{padding:0 14px;border:0;border-radius:8px;cursor:pointer;',
      "  font:600 13px 'General Sans',system-ui,sans-serif;display:flex;",
      '  align-items:center;justify-content:center;gap:6px;}',
      '.qc-btn--mic{background:#fff;border:1px solid #b9cae6;color:#0a3d7a;width:46px;font-size:18px;}',
      '.qc-btn--mic:hover{background:#e8f0fe;}',
      '.qc-btn--mic.is-rec{background:#b00020;color:#fff;border-color:#b00020;animation:qc-pulse 1.2s infinite;}',
      '@keyframes qc-pulse{0%,100%{opacity:1;}50%{opacity:.55;}}',
      '.qc-btn--go{background:#0a3d7a;color:#fff;}',
      '.qc-btn--go:hover{background:#0d4a91;}',
      '.qc-btn--go:disabled{opacity:.5;cursor:not-allowed;}',
      '.qc-help{margin-top:8px;font-size:11.5px;color:#5a6677;line-height:1.5;}',
      '.qc-help code{background:#fff;padding:1px 5px;border-radius:3px;border:1px solid #d4dae3;}',
      '.qc-preview{margin-top:12px;background:#fff;border:1px solid #c7d8f5;',
      '  border-radius:8px;padding:12px 14px;}',
      '.qc-preview h4{margin:0 0 8px;font-size:13px;color:#0a3d7a;font-weight:700;}',
      '.qc-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));',
      '  gap:8px 16px;margin-bottom:10px;}',
      '.qc-field{font-size:12.5px;}',
      '.qc-field-label{color:#5a6677;font-weight:600;display:block;margin-bottom:1px;}',
      '.qc-field-value{color:#1a2333;}',
      '.qc-field-value.is-empty{color:#a0a8b3;font-style:italic;}',
      '.qc-field-conf{font-size:10px;font-weight:700;padding:1px 5px;border-radius:3px;',
      '  margin-left:5px;vertical-align:middle;}',
      '.qc-conf-high{background:#d4f4dd;color:#0a7a3d;}',
      '.qc-conf-mid{background:#fff3cd;color:#856404;}',
      '.qc-actions{display:flex;gap:8px;flex-wrap:wrap;}',
      '.qc-actions button{padding:8px 14px;border:0;border-radius:6px;cursor:pointer;',
      "  font:600 12.5px 'General Sans',system-ui,sans-serif;}",
      '.qc-act-save{background:#0a7a3d;color:#fff;}',
      '.qc-act-save:hover{background:#0c8845;}',
      '.qc-act-edit{background:#f08000;color:#fff;}',
      '.qc-act-edit:hover{background:#d97200;}',
      '.qc-act-cancel{background:#fff;color:#5a6677;border:1px solid #d4dae3;}',
      '.qc-mic-status{font-size:11px;color:#b00020;margin-top:6px;font-weight:600;}',
      '.qc-mic-status.ok{color:#0a7a3d;}'
    ].join('\n');
    const s = document.createElement('style');
    s.id = 'qc-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ========== Parser de português ========== */

  // Limites de "palavra" tolerantes a acentos (\b nativo NÃO funciona com ã, ç, é etc.)
  const W = '(?:^|[\\s,;.!?])';
  const Z = '(?=[\\s,;.!?]|$)';

  // OE → palavras-chave
  const OE_KW = {
    1: ['faturamento', 'faturar', 'financeir', 'receita', 'sustentável'],
    2: ['cliente', 'diversific', 'mercado', 'prospec'],
    3: ['educação', 'pesquisa', 'capacita', 'formação', 'curso', 'estudo'],
    4: ['reconhecimento', 'excelência', 'iso', 'premia', 'certificação'],
    5: ['ágil', 'leve', 'processo'],
    6: ['equanimidade', 'inclusão', 'diversidade', 'gênero', 'igualdade'],
    7: ['ambiente', 'qualidade de vida', 'clima', 'bem-estar', 'cultura'],
    8: ['governança', 'planejamento estratégico', 'liderança']
  };

  const DIAS_SEMANA = {
    'domingo': 0, 'dom': 0,
    'segunda': 1, 'seg': 1, 'segunda-feira': 1,
    'terça': 2, 'ter': 2, 'terça-feira': 2,
    'quarta': 3, 'qua': 3, 'quarta-feira': 3,
    'quinta': 4, 'qui': 4, 'quinta-feira': 4,
    'sexta': 5, 'sex': 5, 'sexta-feira': 5,
    'sábado': 6, 'sáb': 6, 'sabado': 6
  };

  const MESES = {
    'janeiro': 0, 'jan': 0,
    'fevereiro': 1, 'fev': 1,
    'março': 2, 'mar': 2, 'marco': 2,
    'abril': 3, 'abr': 3,
    'maio': 4, 'mai': 4,
    'junho': 5, 'jun': 5,
    'julho': 6, 'jul': 6,
    'agosto': 7, 'ago': 7,
    'setembro': 8, 'set': 8,
    'outubro': 9, 'out': 9,
    'novembro': 10, 'nov': 10,
    'dezembro': 11, 'dez': 11
  };

  function startOfDay(d) { d.setHours(0, 0, 0, 0); return d; }
  function fmtISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    return y + '-' + m + '-' + dd;
  }

  function parseDate(text) {
    const out = { iso: null, hora: null, label: null, removed: [] };
    const lower = text.toLowerCase();
    const today = startOfDay(new Date());
    let m;

    // 1. "hoje" / "amanhã" / "depois de amanhã"
    const reHoje = new RegExp(W + '(depois de amanhã|amanhã|hoje)' + Z);
    if ((m = lower.match(reHoje))) {
      const tok = m[1];
      const d = new Date(today);
      if (tok === 'amanhã') d.setDate(d.getDate() + 1);
      else if (tok === 'depois de amanhã') d.setDate(d.getDate() + 2);
      out.iso = fmtISO(d); out.label = tok; out.removed.push(tok);
    }

    // 2. "em N dias"
    if (!out.iso) {
      const reDias = new RegExp(W + '(?:em|daqui a)\\s+(\\d{1,2})\\s+dias?' + Z);
      if ((m = lower.match(reDias))) {
        const n = parseInt(m[1], 10);
        const d = new Date(today); d.setDate(d.getDate() + n);
        out.iso = fmtISO(d); out.label = 'em ' + n + ' dias';
        out.removed.push(m[0].trim());
      }
    }

    // 3. "próxima semana"
    if (!out.iso) {
      const re = new RegExp(W + 'próxima semana' + Z);
      if ((m = lower.match(re))) {
        const d = new Date(today); d.setDate(d.getDate() + 7);
        out.iso = fmtISO(d); out.label = 'próxima semana';
        out.removed.push('próxima semana');
      }
    }

    // 4. DD/MM[/YYYY]
    if (!out.iso) {
      const re = /(?:^|[\s,;.!?])(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?(?=[\s,;.!?]|$)/;
      m = text.match(re);
      if (m) {
        const dia = parseInt(m[1],10), mes = parseInt(m[2],10) - 1;
        let ano = m[3] ? parseInt(m[3],10) : today.getFullYear();
        if (ano < 100) ano += 2000;
        const d = new Date(ano, mes, dia);
        if (!isNaN(d.getTime())) {
          if (!m[3] && d < today) d.setFullYear(ano + 1);
          out.iso = fmtISO(d); out.label = m[0].trim();
          out.removed.push(m[0].trim());
        }
      }
    }

    // 5. "dia DD" ou "dia DD de MES"
    if (!out.iso) {
      const re = new RegExp(W + 'dia\\s+(\\d{1,2})(?:\\s+de\\s+([a-zàáâãéêíóôõúç]+))?' + Z);
      if ((m = lower.match(re))) {
        const dia = parseInt(m[1],10);
        let mes = today.getMonth();
        let mesExplicito = false;
        if (m[2] && MESES[m[2]] !== undefined) {
          mes = MESES[m[2]];
          mesExplicito = true;
        }
        let ano = today.getFullYear();
        const d = new Date(ano, mes, dia);
        if (d < today) {
          if (mesExplicito) d.setFullYear(ano + 1);
          else d.setMonth(mes + 1);
        }
        if (!isNaN(d.getTime())) {
          out.iso = fmtISO(d); out.label = m[0].trim();
          out.removed.push(m[0].trim());
        }
      }
    }

    // 6. "DD de MES"
    if (!out.iso) {
      const re = new RegExp(W + '(\\d{1,2})\\s+de\\s+([a-zàáâãéêíóôõúç]+)' + Z);
      if ((m = lower.match(re))) {
        const dia = parseInt(m[1],10);
        if (MESES[m[2]] !== undefined) {
          const mes = MESES[m[2]];
          const ano = today.getFullYear();
          const d = new Date(ano, mes, dia);
          if (d < today) d.setFullYear(ano + 1);
          out.iso = fmtISO(d); out.label = m[0].trim();
          out.removed.push(m[0].trim());
        }
      }
    }

    // 7. dia da semana
    if (!out.iso) {
      for (const k in DIAS_SEMANA) {
        // escape de hífen no token (ex: "segunda-feira")
        const safe = k.replace(/[-]/g, '\\-');
        const re = new RegExp(W + '(?:próxima\\s+|na\\s+|essa\\s+)?' + safe + Z, 'i');
        const mm = lower.match(re);
        if (mm) {
          const target = DIAS_SEMANA[k];
          const cur = today.getDay();
          let diff = target - cur;
          if (diff <= 0) diff += 7;
          const d = new Date(today); d.setDate(d.getDate() + diff);
          out.iso = fmtISO(d); out.label = mm[0].trim();
          out.removed.push(mm[0].trim());
          break;
        }
      }
    }

    // Hora "14h" / "14h30" / "às 9" / "às 9h30"
    const reHora = /(?:^|[\s,;.!?])(?:às\s+)?(\d{1,2})(?:h|:)(\d{2})?(?=[\s,;.!?]|$)/;
    const hm = lower.match(reHora);
    if (hm) {
      const h = parseInt(hm[1],10);
      const min = hm[2] ? parseInt(hm[2],10) : 0;
      if (h >= 0 && h <= 23 && min >= 0 && min < 60) {
        out.hora = String(h).padStart(2,'0') + ':' + String(min).padStart(2,'0');
        out.removed.push(hm[0].trim());
      }
    }

    return out;
  }

  function parsePriority(text) {
    const lower = text.toLowerCase();
    const out = { prioridade: null, importante: null, urgente: null, removed: [] };
    if (/(?:^|[\s,;.!?])urgent[ei](?=[\s,;.!?]|$)/.test(lower)) {
      out.prioridade = 'alta'; out.urgente = true; out.removed.push('urgente'); out.removed.push('urgentes');
    }
    if (/(?:^|[\s,;.!?])important[ei](?=[\s,;.!?]|$)/.test(lower)) {
      out.importante = true; out.removed.push('importante');
    }
    if (/(?:^|[\s,;.!?])(?:alta\s+prioridade|prioridade\s+alta|alta)(?=[\s,;.!?]|$)/.test(lower)) {
      out.prioridade = out.prioridade || 'alta';
      out.removed.push('alta prioridade'); out.removed.push('prioridade alta'); out.removed.push('alta');
    } else if (/(?:^|[\s,;.!?])(?:média\s+prioridade|prioridade\s+média|média)(?=[\s,;.!?]|$)/.test(lower)) {
      out.prioridade = out.prioridade || 'media';
      out.removed.push('média prioridade'); out.removed.push('prioridade média'); out.removed.push('média');
    } else if (/(?:^|[\s,;.!?])(?:baixa\s+prioridade|prioridade\s+baixa|baixa)(?=[\s,;.!?]|$)/.test(lower)) {
      out.prioridade = 'baixa';
      out.removed.push('baixa prioridade'); out.removed.push('prioridade baixa'); out.removed.push('baixa');
    }
    return out;
  }

  function parseOe(text) {
    const lower = text.toLowerCase();
    const out = { oeId: null, removed: [] };
    // "OE 3" / "OE3" / "objetivo 3"
    const m = lower.match(/(?:^|[\s,;.!?])o\.?e\.?\s*(\d)(?=[\s,;.!?]|$)|(?:^|[\s,;.!?])objetivo\s+(?:estratégico\s+)?(\d)(?=[\s,;.!?]|$)/);
    if (m) {
      const id = parseInt(m[1] || m[2], 10);
      if (id >= 1 && id <= 8) {
        out.oeId = id;
        out.removed.push(m[0].trim());
        return out;
      }
    }
    // por palavra-chave
    for (const id in OE_KW) {
      for (const kw of OE_KW[id]) {
        if (lower.indexOf(kw) !== -1) { out.oeId = parseInt(id,10); break; }
      }
      if (out.oeId) break;
    }
    return out;
  }

  function parseResponsavel(text) {
    const out = { responsavel: '', removed: [] };
    let candidatos = [];
    try {
      candidatos = (window.tarefas || [])
        .map(t => t.responsavel).filter(Boolean)
        .filter((v,i,a) => a.indexOf(v) === i);
    } catch {}
    // "com NOME" — NOME começa com maiúscula (acentuada também)
    const m = text.match(/(?:^|\s)com\s+([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)*)/);
    if (m) {
      const nome = m[1];
      const primeiro = nome.toLowerCase().split(' ')[0];
      const match = candidatos.find(c => c.toLowerCase().includes(primeiro));
      out.responsavel = match || nome;
      out.removed.push('com ' + nome);
    }
    return out;
  }

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function limparTitulo(text, removidos) {
    let t = text;
    // remove cada trecho consumido
    removidos.sort((a,b) => b.length - a.length);
    removidos.forEach(r => {
      if (!r) return;
      const re = new RegExp('(?:^|\\s)' + escapeRe(r) + '(?=\\s|$)', 'gi');
      t = t.replace(re, ' ');
    });
    // remove conectores comuns soltos
    t = t.replace(/(?:^|\s)(até|no|na|nos|nas|em|para|prazo|com|de|do|da|sobre|pra|às|a)(?=\s|$)/gi, ' ');
    // espaços/pontuação
    t = t.replace(/\s+/g, ' ').replace(/^[\s,.;:-]+|[\s,.;:-]+$/g, '');
    if (t) t = t[0].toUpperCase() + t.slice(1);
    return t || '(sem título)';
  }

  function parseFrase(text) {
    if (!text || !text.trim()) return null;
    const dt = parseDate(text);
    const pr = parsePriority(text);
    const oe = parseOe(text);
    const re = parseResponsavel(text);

    const removidos = [].concat(dt.removed, pr.removed, oe.removed, re.removed);
    const titulo = limparTitulo(text, removidos);

    const sinais = [
      dt.iso,
      pr.prioridade || pr.urgente || pr.importante,
      oe.oeId,
      re.responsavel
    ].filter(Boolean).length;
    const confianca = sinais >= 2 ? 'alta' : (sinais >= 1 ? 'media' : 'baixa');

    return {
      titulo,
      prazo: dt.iso,
      hora: dt.hora,
      dataLabel: dt.label,
      oeId: oe.oeId,
      prioridade: pr.prioridade || 'media',
      importante: pr.importante,
      urgente: pr.urgente,
      responsavel: re.responsavel,
      confianca,
      original: text
    };
  }

  /* ========== UI ========== */

  function nomeOe(id) {
    if (!id) return null;
    const map = {
      1: 'Faturamento sustentável',
      2: 'Diversificar clientes',
      3: 'Educação e pesquisa',
      4: 'Reconhecimento por excelência',
      5: 'Organização leve e ágil',
      6: 'Equanimidade e inclusão',
      7: 'Ambiente de qualidade',
      8: 'Excelência da gestão'
    };
    return map[id] || ('OE ' + id);
  }

  function fmtData(iso) {
    if (!iso) return null;
    const p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  function buildPanel() {
    const target = document.getElementById('panel-tarefas');
    if (!target) return false;
    if (document.getElementById('qc-card')) return true;

    const card = document.createElement('section');
    card.className = 'qc-card';
    card.id = 'qc-card';
    card.innerHTML = ''
      + '<div class="qc-head">'
      +   '<h3>⚡ Captura rápida</h3>'
      +   '<span class="qc-tag">NOVO</span>'
      + '</div>'
      + '<div class="qc-row">'
      +   '<textarea id="qc-input" rows="1" '
      +     'placeholder="Ex.: amanhã 14h reunião com Maria sobre OE3 alta prioridade"></textarea>'
      +   '<button class="qc-btn qc-btn--mic" id="qc-mic" type="button" title="Falar">🎤</button>'
      +   '<button class="qc-btn qc-btn--go" id="qc-go" type="button">Analisar</button>'
      + '</div>'
      + '<div id="qc-mic-status"></div>'
      + '<div class="qc-help">'
      +   'Entende: datas (<code>amanhã</code>, <code>sexta</code>, <code>15/05</code>, <code>dia 20</code>), '
      +   'horas (<code>14h</code>), OE (<code>OE3</code> ou palavra-chave como "faturamento"), '
      +   'prioridade (<code>urgente</code>, <code>alta</code>, <code>importante</code>), '
      +   'responsável (<code>com Maria</code>).'
      + '</div>'
      + '<div id="qc-preview"></div>';
    const firstCard = target.querySelector('.form-card');
    if (firstCard) target.insertBefore(card, firstCard);
    else target.prepend(card);

    bindPanel();
    return true;
  }

  function bindPanel() {
    const input = document.getElementById('qc-input');
    const btnGo = document.getElementById('qc-go');
    const btnMic = document.getElementById('qc-mic');

    btnGo.addEventListener('click', analisar);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        analisar();
      }
    });
    bindMic(btnMic, input);
  }

  function analisar() {
    const input = document.getElementById('qc-input');
    const text = input.value.trim();
    if (!text) return;
    const parsed = parseFrase(text);
    if (!parsed) return;
    renderPreview(parsed);
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function renderPreview(p) {
    const wrap = document.getElementById('qc-preview');
    const isHigh = p.confianca === 'alta';
    const confClass = isHigh ? 'qc-conf-high' : 'qc-conf-mid';
    const confLabel = isHigh ? '✓ alta' : '? talvez';

    function field(label, value, hasConf) {
      const empty = !value;
      const shown = empty ? '(em branco)' : escapeHtml(value);
      return ''
        + '<div class="qc-field">'
        +   '<span class="qc-field-label">' + label + '</span>'
        +   '<span class="qc-field-value' + (empty ? ' is-empty' : '') + '">' + shown + '</span>'
        +   ((!empty && hasConf) ? ('<span class="qc-field-conf ' + confClass + '">' + confLabel + '</span>') : '')
        + '</div>';
    }

    let prioTxt = p.prioridade || 'média';
    if (p.urgente && p.importante) prioTxt += ' · urgente + importante';
    else if (p.urgente) prioTxt += ' · urgente';
    else if (p.importante) prioTxt += ' · importante';

    const dataTxt = p.prazo ? (fmtData(p.prazo) + (p.hora ? (' ' + p.hora) : '')) : '';
    const oeTxt = p.oeId ? (p.oeId + ' — ' + nomeOe(p.oeId)) : '';

    wrap.innerHTML = ''
      + '<div class="qc-preview">'
      +   '<h4>Entendi assim:</h4>'
      +   '<div class="qc-fields">'
      +     field('Título', p.titulo, true)
      +     field('Prazo', dataTxt, !!p.prazo)
      +     field('OE', oeTxt, !!p.oeId)
      +     field('Prioridade', prioTxt, p.prioridade !== 'media' || !!p.urgente || !!p.importante)
      +     field('Responsável', p.responsavel, !!p.responsavel)
      +   '</div>'
      +   '<div class="qc-actions">'
      +     '<button class="qc-act-save" id="qc-save">✓ Salvar tarefa</button>'
      +     '<button class="qc-act-edit" id="qc-edit">✎ Editar antes (preencher formulário)</button>'
      +     '<button class="qc-act-cancel" id="qc-cancel">Cancelar</button>'
      +   '</div>'
      + '</div>';

    document.getElementById('qc-save').addEventListener('click', () => salvarDireto(p));
    document.getElementById('qc-edit').addEventListener('click', () => preencherFormulario(p));
    document.getElementById('qc-cancel').addEventListener('click', () => {
      wrap.innerHTML = '';
      document.getElementById('qc-input').value = '';
    });
  }

  function salvarDireto(p) {
    if (typeof window.tarefas === 'undefined' || typeof window.salvarTarefas !== 'function') {
      alert('App ainda carregando, tente em 1 segundo.');
      return;
    }
    const tarefa = {
      id: window.uid ? window.uid() : ('t_' + Date.now()),
      titulo: p.titulo,
      oeId: p.oeId || null,
      importante: p.importante === null ? null : (p.importante === true),
      urgente: p.urgente === null ? null : (p.urgente === true),
      responsavel: p.responsavel || '',
      dataInicio: new Date().toISOString().slice(0,10),
      prazo: p.prazo || '',
      prioridade: p.prioridade || 'media',
      status: 'a-fazer',
      resultado: '',
      criadaEm: new Date().toISOString(),
      atualizadaEm: new Date().toISOString()
    };
    window.tarefas.unshift(tarefa);
    window.salvarTarefas();
    if (typeof window.popularResponsaveis === 'function') window.popularResponsaveis();
    if (typeof window.renderTudo === 'function') window.renderTudo();

    document.getElementById('qc-preview').innerHTML =
      '<div class="qc-preview" style="background:#d4f4dd;border-color:#0a7a3d;">' +
      '<strong style="color:#0a7a3d;">✓ Tarefa criada e sincronizada com a equipe.</strong>' +
      '</div>';
    document.getElementById('qc-input').value = '';
    setTimeout(() => {
      const wrap = document.getElementById('qc-preview');
      if (wrap) wrap.innerHTML = '';
    }, 2500);
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val != null) el.value = val;
  }
  function setCk(id, val) {
    const el = document.getElementById(id);
    if (el) el.checked = !!val;
  }

  function preencherFormulario(p) {
    setVal('f-titulo', p.titulo);
    setVal('f-objetivo', p.oeId ? String(p.oeId) : '');
    setVal('f-responsavel', p.responsavel || '');
    setVal('f-prazo', p.prazo || '');
    setVal('f-prioridade', p.prioridade || 'media');

    if (p.importante !== null || p.urgente !== null) {
      setCk('f-naoclass', false);
      setCk('f-importante', p.importante === true);
      setCk('f-urgente', p.urgente === true);
    }
    ['f-naoclass','f-importante','f-urgente','f-objetivo'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    document.getElementById('qc-preview').innerHTML = '';
    document.getElementById('qc-input').value = '';
    const tit = document.getElementById('f-titulo');
    if (tit) {
      tit.scrollIntoView({ behavior:'smooth', block:'center' });
      tit.focus();
    }
  }

  /* ========== Voz (Web Speech API) ========== */

  let recognizer = null;
  let isRecording = false;

  function bindMic(btn, input) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      btn.disabled = true;
      btn.title = 'Seu navegador não suporta reconhecimento de voz. No celular, use o microfone do teclado.';
      btn.style.opacity = '.5';
      return;
    }
    btn.addEventListener('click', () => {
      if (isRecording) { stopRec(); return; }
      startRec(input, btn);
    });
  }

  function startRec(input, btn) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognizer = new SR();
    recognizer.lang = 'pt-BR';
    recognizer.interimResults = true;
    recognizer.continuous = false;
    recognizer.maxAlternatives = 1;

    const baseText = input.value.trim();

    recognizer.onresult = (e) => {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      const head = baseText ? (baseText + ' ') : '';
      input.value = (head + (final + interim)).trim();
    };

    recognizer.onerror = (e) => {
      const status = document.getElementById('qc-mic-status');
      let msg = 'Erro: ' + e.error;
      if (e.error === 'not-allowed') msg = 'Permissão de microfone negada. Libere nas configurações do site.';
      else if (e.error === 'no-speech') msg = 'Não ouvi nada. Tente de novo.';
      else if (e.error === 'audio-capture') msg = 'Microfone não encontrado.';
      else if (e.error === 'network') msg = 'Falha de rede no reconhecimento.';
      if (status) { status.className = 'qc-mic-status'; status.textContent = msg; }
      stopRec();
    };

    recognizer.onend = () => { stopRec(); };

    try {
      recognizer.start();
      isRecording = true;
      btn.classList.add('is-rec');
      btn.textContent = '⏹';
      btn.title = 'Parar';
      const status = document.getElementById('qc-mic-status');
      if (status) {
        status.className = 'qc-mic-status ok';
        status.textContent = '🎤 Ouvindo... fale agora.';
      }
    } catch (err) {
      console.error('SpeechRecognition start failed', err);
    }
  }

  function stopRec() {
    isRecording = false;
    const btn = document.getElementById('qc-mic');
    if (btn) {
      btn.classList.remove('is-rec');
      btn.textContent = '🎤';
      btn.title = 'Falar';
    }
    const status = document.getElementById('qc-mic-status');
    if (status) {
      const txt = status.textContent || '';
      const isErr = /Erro|Permissão|Não ouvi|Microfone|Falha/.test(txt);
      if (!isErr) {
        setTimeout(() => { if (status) status.textContent = ''; }, 800);
      }
    }
    try { if (recognizer) recognizer.stop(); } catch {}
    recognizer = null;
  }

  /* ========== Inicialização ========== */

  function tryInit() {
    injectStyles();
    return buildPanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!tryInit()) setTimeout(tryInit, 1500);
    });
  } else {
    if (!tryInit()) setTimeout(tryInit, 1500);
  }
  // Retry depois do login Firebase
  setTimeout(tryInit, 4000);

  // Expõe parser pra debug
  window.QC = { parseFrase };
})();
