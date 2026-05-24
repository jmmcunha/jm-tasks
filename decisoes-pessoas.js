// decisoes-pessoas.js — Leva 31
// Modulo standalone para os modulos "Decisoes" e "Pessoas (CRM)".
// Le do localStorage (preenchido pelo firebase-sync.js) e escreve no
// Firestore via transacao com merge por id, mesmo padrao do app mobile.
//
// Auto-registra:
//   - render dos paineis #panel-pessoas e #panel-decisoes
//   - bindings de UI (busca, filtros, formularios)
//   - exportacao PDF/DOCX no padrao das outras abas do site
//
// Dependencias globais ja carregadas pelo index.html:
//   firebase (compat 10.13.2), window.jspdf (jsPDF), window.docx
//
// IDs Firestore: shared/team/data/decisoes_v1 e .../cebraspe_pessoas_v1

(function () {
  'use strict';

  const KEY_DEC = 'decisoes_v1';
  const KEY_PES = 'cebraspe_pessoas_v1';
  const TEAM_ID = 'team';

  // -----------------------------------------------------------------
  // Utilidades
  // -----------------------------------------------------------------

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function hojeISO() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  function fmtData(iso) {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }
  function fmtDataExtenso(iso) {
    if (!iso) return '';
    const meses = ['janeiro','fevereiro','marco','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    const [y, m, d] = iso.split('-').map(Number);
    return `${d} de ${meses[m-1]} de ${y}`;
  }
  function fmtTimestamp(ms) {
    if (!ms) return '';
    const d = new Date(Number(ms));
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  function gerarId() {
    const ms = Date.now();
    const rnd = Math.floor(Math.random() * 1e6).toString(36);
    return `${ms}-${rnd}`;
  }
  function meuId() {
    try {
      const u = firebase.auth().currentUser;
      return (u && (u.email || u.uid)) || '';
    } catch (_) { return ''; }
  }
  function lerArray(key) {
    try {
      const raw = localStorage.getItem(key);
      const v = raw ? JSON.parse(raw) : [];
      return Array.isArray(v) ? v : [];
    } catch (_) { return []; }
  }
  function baixar(blob, nome) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = nome;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function flash(msg, erro) {
    try {
      if (typeof window.mostrarFlash === 'function' && !erro) {
        window.mostrarFlash(msg);
        return;
      }
      if (typeof window.mostrarMsg === 'function') {
        window.mostrarMsg(msg, !!erro);
        return;
      }
    } catch (_) {}
    // Fallback: toast proprio
    try {
      const el = document.createElement('div');
      el.className = 'dp-flash' + (erro ? ' is-error' : '');
      el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(() => { try { el.remove(); } catch(_){} }, 2400);
    } catch (_) {
      console.log(msg);
    }
  }

  // -----------------------------------------------------------------
  // Persistencia (transacao Firestore + merge por id)
  // -----------------------------------------------------------------

  function docRef(key) {
    return firebase.firestore()
      .collection('shared').doc(TEAM_ID).collection('data').doc(key);
  }

  async function upsertItem(key, item) {
    if (!firebase.auth().currentUser) {
      flash('Voce precisa estar autenticado.', true); return;
    }
    const ref = docRef(key);
    const ts = Date.now();
    const novo = Object.assign({}, item, {
      criadaEm: item.criadaEm || ts,
      atualizadaEm: ts,
      _lwm: ts
    });
    await firebase.firestore().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      let lista = [];
      if (snap.exists && snap.data() && Array.isArray(snap.data().value)) {
        lista = snap.data().value.slice();
      }
      let achou = false;
      lista = lista.map((it) => {
        if (it && it.id === novo.id) { achou = true; return novo; }
        return it;
      });
      if (!achou) lista.push(novo);
      tx.set(ref, { value: lista, updatedAt: ts, updatedBy: meuId() });
    });
    // Atualiza local imediatamente (o onSnapshot do firebase-sync tambem vai
    // chegar, mas isso evita esperar o round-trip).
    const localList = lerArray(key).slice();
    let achou = false;
    const novaLocal = localList.map((it) => {
      if (it && it.id === novo.id) { achou = true; return novo; }
      return it;
    });
    if (!achou) novaLocal.push(novo);
    try { localStorage.setItem(key, JSON.stringify(novaLocal)); } catch (_) {}
  }

  async function deletarItem(key, id) {
    if (!firebase.auth().currentUser) {
      flash('Voce precisa estar autenticado.', true); return;
    }
    const ref = docRef(key);
    const ts = Date.now();
    await firebase.firestore().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      let lista = [];
      if (snap.exists && snap.data() && Array.isArray(snap.data().value)) {
        lista = snap.data().value.slice();
      }
      lista = lista.filter((it) => !(it && it.id === id));
      tx.set(ref, { value: lista, updatedAt: ts, updatedBy: meuId() });
    });
    const localList = lerArray(key).filter((it) => !(it && it.id === id));
    try { localStorage.setItem(key, JSON.stringify(localList)); } catch (_) {}
  }

  // -----------------------------------------------------------------
  // ===================== MODULO DECISOES ===========================
  // -----------------------------------------------------------------

  const CATEGORIAS = {
    contrato: 'Contrato',
    pessoal: 'Pessoal',
    orcamento: 'Orcamento',
    editorial: 'Editorial',
    operacional: 'Operacional',
    institucional: 'Institucional',
    outro: 'Outro'
  };
  const COR_CAT = {
    contrato: '#1565C0',
    pessoal: '#C0392B',
    orcamento: '#2E7D32',
    editorial: '#E65100',
    operacional: '#455A64',
    institucional: '#6A1B9A',
    outro: '#607D8B'
  };

  const stateDec = { busca: '', categoria: 'todas', selId: null };

  function lerDecisoes() { return lerArray(KEY_DEC); }
  function lerPessoas() { return lerArray(KEY_PES); }

  function filtrarDecisoes(lista) {
    let seq = lista.slice();
    if (stateDec.categoria !== 'todas') {
      seq = seq.filter((d) => d.categoria === stateDec.categoria);
    }
    const q = stateDec.busca.trim().toLowerCase();
    if (q) {
      seq = seq.filter((d) =>
        (d.assunto || '').toLowerCase().includes(q) ||
        (d.decisao || '').toLowerCase().includes(q) ||
        (d.fundamentacao || '').toLowerCase().includes(q) ||
        (Array.isArray(d.partes) ? d.partes.join(' ').toLowerCase().includes(q) : false)
      );
    }
    seq.sort((a, b) => (b.criadaEm || 0) - (a.criadaEm || 0));
    return seq;
  }

  function renderDecisoes() {
    const painel = $('#panel-decisoes');
    if (!painel) return;
    const todas = lerDecisoes();
    const filtradas = filtrarDecisoes(todas);

    // Atualiza apenas a lista e o detalhe se ja existe estrutura.
    const lista = $('#decisoes-lista', painel);
    if (!lista) return; // primeira chamada antes do mount

    if (!filtradas.length) {
      lista.innerHTML = `<p class="muted" style="padding:14px">${
        todas.length === 0 ? 'Nenhuma decisao registrada ainda.'
        : 'Nenhuma decisao corresponde aos filtros.'
      }</p>`;
    } else {
      lista.innerHTML = filtradas.map((d) => {
        const cor = COR_CAT[d.categoria] || '#607D8B';
        const rotulo = CATEGORIAS[d.categoria] || 'Outro';
        const data = fmtTimestamp(d.criadaEm);
        const sel = stateDec.selId === d.id ? ' is-selected' : '';
        return `
          <button type="button" class="dp-item${sel}" data-id="${esc(d.id)}">
            <div class="dp-item__head">
              <span class="dp-tag" style="background:${cor}1a;color:${cor}">${esc(rotulo)}</span>
              <span class="dp-item__date">${esc(data)}</span>
            </div>
            <div class="dp-item__title">${esc(d.assunto)}</div>
            <div class="dp-item__sub">${esc(d.decisao)}</div>
          </button>`;
      }).join('');
      $$('.dp-item', lista).forEach((el) => {
        el.addEventListener('click', () => {
          stateDec.selId = el.dataset.id;
          renderDecisoes();
        });
      });
    }

    const contador = $('#decisoes-contador', painel);
    if (contador) contador.textContent = `${filtradas.length} resultado${filtradas.length === 1 ? '' : 's'}`;

    renderDetalheDecisao();
  }

  function renderDetalheDecisao() {
    const painel = $('#panel-decisoes');
    if (!painel) return;
    const det = $('#decisao-detalhe', painel);
    if (!det) return;
    const todas = lerDecisoes();
    const d = todas.find((x) => x.id === stateDec.selId);
    if (!d) {
      det.innerHTML = '<p class="muted">Selecione uma decisao a esquerda, ou clique em "Nova decisao".</p>';
      return;
    }
    const pessoas = lerPessoas();
    const pessoa = d.pessoaId ? pessoas.find((p) => p.id === d.pessoaId) : null;
    const cor = COR_CAT[d.categoria] || '#607D8B';
    const rotulo = CATEGORIAS[d.categoria] || 'Outro';
    det.innerHTML = `
      <div class="dp-detail">
        <div class="dp-detail__head">
          <span class="dp-tag" style="background:${cor}1a;color:${cor}">${esc(rotulo)}</span>
          <span class="muted">${esc(fmtTimestamp(d.criadaEm))}</span>
        </div>
        <h3 class="dp-detail__title">${esc(d.assunto)}</h3>
        <p class="dp-detail__decisao"><strong>Decisao:</strong> ${esc(d.decisao)}</p>
        ${d.fundamentacao ? `<p><strong>Fundamentacao:</strong> ${esc(d.fundamentacao)}</p>` : ''}
        ${Array.isArray(d.partes) && d.partes.length ? `
          <p><strong>Partes:</strong> ${d.partes.map(p => `<span class="badge">${esc(p)}</span>`).join(' ')}</p>` : ''}
        ${pessoa ? `<p><strong>Pessoa vinculada:</strong> ${esc(pessoa.nome)}${pessoa.cargo ? ' - ' + esc(pessoa.cargo) : ''}</p>` : ''}
        ${d.textoOriginal ? `<details class="dp-orig"><summary>Texto original (voz)</summary><p>${esc(d.textoOriginal)}</p></details>` : ''}
        <div class="dp-actions">
          <button class="btn btn--sm" id="btn-editar-decisao">Editar</button>
          <button class="btn btn--ghost btn--sm" id="btn-excluir-decisao">Excluir</button>
        </div>
      </div>`;
    $('#btn-editar-decisao', det).addEventListener('click', () => abrirEditorDecisao(d));
    $('#btn-excluir-decisao', det).addEventListener('click', async () => {
      if (!confirm('Excluir esta decisao?')) return;
      try {
        await deletarItem(KEY_DEC, d.id);
        stateDec.selId = null;
        renderDecisoes();
        flash('Decisao excluida.');
      } catch (e) { flash('Falha ao excluir: ' + e.message, true); }
    });
  }

  function abrirEditorDecisao(decisao) {
    const overlay = construirOverlay('Editar decisao');
    const pessoas = lerPessoas().slice().sort((a, b) => a.nome.localeCompare(b.nome));
    const partesStr = Array.isArray(decisao && decisao.partes) ? decisao.partes.join(', ') : '';
    overlay.body.innerHTML = `
      <div class="dp-form">
        <label>Assunto<input type="text" id="d-assunto" value="${esc(decisao ? decisao.assunto : '')}" maxlength="200" /></label>
        <label>Decisao<textarea id="d-decisao" rows="3">${esc(decisao ? decisao.decisao : '')}</textarea></label>
        <label>Fundamentacao<textarea id="d-fund" rows="3">${esc(decisao ? decisao.fundamentacao : '')}</textarea></label>
        <label>Partes (separadas por virgula)<input type="text" id="d-partes" value="${esc(partesStr)}" /></label>
        <label>Categoria
          <select id="d-cat">
            ${Object.entries(CATEGORIAS).map(([k, v]) =>
              `<option value="${k}"${(decisao && decisao.categoria === k) ? ' selected' : ''}>${v}</option>`
            ).join('')}
          </select>
        </label>
        <label>Pessoa vinculada
          <select id="d-pessoa">
            <option value="">— sem vinculo —</option>
            ${pessoas.map((p) =>
              `<option value="${esc(p.id)}"${(decisao && decisao.pessoaId === p.id) ? ' selected' : ''}>${esc(p.nome)}${p.cargo ? ' - ' + esc(p.cargo) : ''}</option>`
            ).join('')}
          </select>
        </label>
      </div>`;
    overlay.btnSalvar.addEventListener('click', async () => {
      const assunto = $('#d-assunto', overlay.body).value.trim();
      const dec = $('#d-decisao', overlay.body).value.trim();
      if (!assunto || !dec) { flash('Assunto e decisao sao obrigatorios.', true); return; }
      const partes = $('#d-partes', overlay.body).value.split(',').map(s => s.trim()).filter(Boolean);
      const cat = $('#d-cat', overlay.body).value;
      const pid = $('#d-pessoa', overlay.body).value || null;
      const novo = Object.assign({}, decisao || { id: gerarId() }, {
        assunto, decisao: dec,
        fundamentacao: $('#d-fund', overlay.body).value.trim(),
        partes, categoria: cat, pessoaId: pid
      });
      try {
        await upsertItem(KEY_DEC, novo);
        stateDec.selId = novo.id;
        overlay.fechar();
        renderDecisoes();
        flash('Decisao salva.');
      } catch (e) { flash('Falha ao salvar: ' + e.message, true); }
    });
  }

  // ----- Exportacao Decisoes -----

  function _exportarDecPDF() {
    const lista = filtrarDecisoes(lerDecisoes());
    if (!lista.length) { flash('Nada para exportar.', true); return; }
    if (!window.jspdf || !window.jspdf.jsPDF) { flash('PDF indisponivel.', true); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margemL = 25, margemR = 20, larg = 210 - margemL - margemR;
    let y = 25;
    doc.setFont('times', 'bold'); doc.setFontSize(16);
    doc.text('Registro de decisoes', margemL, y); y += 8;
    doc.setFont('times', 'normal'); doc.setFontSize(11);
    doc.text(`Emitido em ${fmtDataExtenso(hojeISO())} - ${lista.length} decisao(oes)`, margemL, y); y += 10;
    const pessoas = lerPessoas();
    lista.forEach((d, i) => {
      if (y > 260) { doc.addPage(); y = 25; }
      doc.setFont('times', 'bold'); doc.setFontSize(12);
      const cabec = `${i + 1}. ${d.assunto} - ${CATEGORIAS[d.categoria] || 'Outro'} - ${fmtTimestamp(d.criadaEm)}`;
      const linhasCab = doc.splitTextToSize(cabec, larg);
      for (const ln of linhasCab) {
        if (y > 280) { doc.addPage(); y = 25; }
        doc.text(ln, margemL, y); y += 5;
      }
      doc.setFont('times', 'normal'); doc.setFontSize(11);
      const blocos = [
        ['Decisao', d.decisao],
        ['Fundamentacao', d.fundamentacao],
        ['Partes', Array.isArray(d.partes) ? d.partes.join(', ') : '']
      ];
      const pessoa = d.pessoaId ? pessoas.find((p) => p.id === d.pessoaId) : null;
      if (pessoa) blocos.push(['Pessoa vinculada', pessoa.nome + (pessoa.cargo ? ' - ' + pessoa.cargo : '')]);
      for (const [rot, val] of blocos) {
        if (!val) continue;
        if (y > 270) { doc.addPage(); y = 25; }
        const seg = doc.splitTextToSize(`${rot}: ${val}`, larg);
        for (const ln of seg) {
          if (y > 280) { doc.addPage(); y = 25; }
          doc.text(ln, margemL, y); y += 5;
        }
      }
      y += 4;
    });
    doc.save(`decisoes_${hojeISO()}.pdf`);
  }

  async function _exportarDecDOCX() {
    const lista = filtrarDecisoes(lerDecisoes());
    if (!lista.length) { flash('Nada para exportar.', true); return; }
    if (!window.docx) { flash('Word indisponivel.', true); return; }
    const D = window.docx;
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = D;
    const pessoas = lerPessoas();
    const elementos = [];
    elementos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Registro de decisoes' })] }));
    elementos.push(new Paragraph({ children: [new TextRun({ text: `Emitido em ${fmtDataExtenso(hojeISO())} - ${lista.length} decisao(oes)` })] }));
    elementos.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
    lista.forEach((d, i) => {
      elementos.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: `${i + 1}. ${d.assunto}` })]
      }));
      elementos.push(new Paragraph({ children: [new TextRun({ text: `Categoria: ${CATEGORIAS[d.categoria] || 'Outro'} - ${fmtTimestamp(d.criadaEm)}`, italics: false })] }));
      elementos.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
      elementos.push(new Paragraph({ children: [new TextRun({ text: `Decisao: ${d.decisao}` })] }));
      if (d.fundamentacao) elementos.push(new Paragraph({ children: [new TextRun({ text: `Fundamentacao: ${d.fundamentacao}` })] }));
      if (Array.isArray(d.partes) && d.partes.length) {
        elementos.push(new Paragraph({ children: [new TextRun({ text: `Partes: ${d.partes.join(', ')}` })] }));
      }
      const pessoa = d.pessoaId ? pessoas.find((p) => p.id === d.pessoaId) : null;
      if (pessoa) {
        elementos.push(new Paragraph({ children: [new TextRun({ text: `Pessoa vinculada: ${pessoa.nome}${pessoa.cargo ? ' - ' + pessoa.cargo : ''}` })] }));
      }
      elementos.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
    });
    const doc = new Document({
      styles: { default: { document: { run: { font: 'Times New Roman', size: 24 } } } },
      sections: [{ properties: { page: { margin: { top: 1700, right: 1133, bottom: 1133, left: 1700 } } }, children: elementos }]
    });
    const blob = await Packer.toBlob(doc);
    baixar(blob, `decisoes_${hojeISO()}.docx`);
  }

  // -----------------------------------------------------------------
  // ===================== MODULO PESSOAS (CRM) ======================
  // -----------------------------------------------------------------

  const statePes = { busca: '', selId: null };

  function filtrarPessoas(lista) {
    let seq = lista.slice();
    const q = statePes.busca.trim().toLowerCase();
    if (q) {
      seq = seq.filter((p) =>
        (p.nome || '').toLowerCase().includes(q) ||
        (p.cargo || '').toLowerCase().includes(q) ||
        (p.instituicao || '').toLowerCase().includes(q) ||
        (p.email || '').toLowerCase().includes(q) ||
        (p.telefone || '').toLowerCase().includes(q) ||
        (Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase().includes(q) : false)
      );
    }
    seq.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
    return seq;
  }

  function iniciais(nome) {
    const partes = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return '?';
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }

  function renderPessoas() {
    const painel = $('#panel-pessoas');
    if (!painel) return;
    const lista = $('#pessoas-lista', painel);
    if (!lista) return;
    const todas = lerPessoas();
    const filtradas = filtrarPessoas(todas);
    if (!filtradas.length) {
      lista.innerHTML = `<p class="muted" style="padding:14px">${
        todas.length === 0 ? 'Nenhuma pessoa cadastrada ainda.'
        : 'Nenhuma pessoa corresponde ao filtro.'
      }</p>`;
    } else {
      lista.innerHTML = filtradas.map((p) => {
        const sel = statePes.selId === p.id ? ' is-selected' : '';
        const sub = [p.cargo, p.instituicao].filter(Boolean).join(' - ');
        return `
          <button type="button" class="dp-item has-avatar${sel}" data-id="${esc(p.id)}">
            <div class="dp-item__avatar">${esc(iniciais(p.nome))}</div>
            <div class="dp-item__body">
              <div class="dp-item__title">${esc(p.nome)}</div>
              ${sub ? `<div class="dp-item__sub">${esc(sub)}</div>` : ''}
            </div>
          </button>`;
      }).join('');
      $$('.dp-item', lista).forEach((el) => {
        el.addEventListener('click', () => {
          statePes.selId = el.dataset.id;
          renderPessoas();
        });
      });
    }
    const contador = $('#pessoas-contador', painel);
    if (contador) contador.textContent = `${filtradas.length} pessoa${filtradas.length === 1 ? '' : 's'}`;
    renderDetalhePessoa();
  }

  function renderDetalhePessoa() {
    const painel = $('#panel-pessoas');
    if (!painel) return;
    const det = $('#pessoa-detalhe', painel);
    if (!det) return;
    const todas = lerPessoas();
    const p = todas.find((x) => x.id === statePes.selId);
    if (!p) {
      det.innerHTML = '<p class="muted">Selecione uma pessoa a esquerda, ou clique em "Nova pessoa".</p>';
      return;
    }
    const decisoes = lerDecisoes()
      .filter((d) => d.pessoaId === p.id)
      .sort((a, b) => (b.criadaEm || 0) - (a.criadaEm || 0));
    const tarefas = (lerArray('cebraspe_tarefas_v3') || []).filter((t) => {
      const r = (t.responsavel || '').trim().toLowerCase();
      const n = (p.nome || '').trim().toLowerCase();
      if (!r || !n) return false;
      const primeiro = n.split(' ')[0];
      return r === n || r.includes(primeiro) || n.includes(r);
    }).sort((a, b) => (a.prazo || '').localeCompare(b.prazo || ''));

    det.innerHTML = `
      <div class="dp-detail">
        <div class="dp-detail__head">
          <div class="dp-detail__avatar">${esc(iniciais(p.nome))}</div>
          <div>
            <h3 class="dp-detail__title">${esc(p.nome)}</h3>
            ${(p.cargo || p.instituicao) ? `<p class="muted" style="margin:2px 0 0">${esc([p.cargo, p.instituicao].filter(Boolean).join(' - '))}</p>` : ''}
          </div>
        </div>
        <div class="dp-grid2">
          ${p.telefone ? `<div><strong>Telefone:</strong><br>${esc(p.telefone)}</div>` : ''}
          ${p.email ? `<div><strong>E-mail:</strong><br>${esc(p.email)}</div>` : ''}
        </div>
        ${Array.isArray(p.tags) && p.tags.length ? `<p>${p.tags.map(t => `<span class="badge">${esc(t)}</span>`).join(' ')}</p>` : ''}
        ${p.observacoes ? `<p><strong>Observacoes:</strong><br>${esc(p.observacoes).replace(/\n/g,'<br>')}</p>` : ''}

        <h4 class="dp-detail__h4">Decisoes vinculadas (${decisoes.length})</h4>
        ${decisoes.length === 0 ? '<p class="muted">Nenhuma decisao vinculada.</p>'
          : '<ul class="dp-history">' + decisoes.slice(0, 20).map((d) => `
            <li><strong>${esc(d.assunto)}</strong> - ${esc(d.decisao)} <span class="muted">(${esc(fmtTimestamp(d.criadaEm))})</span></li>
          `).join('') + '</ul>'}

        <h4 class="dp-detail__h4">Tarefas em que e responsavel (${tarefas.length})</h4>
        ${tarefas.length === 0 ? '<p class="muted">Nenhuma tarefa.</p>'
          : '<ul class="dp-history">' + tarefas.slice(0, 20).map((t) => `
            <li>${t.status === 'concluida' ? '✓ ' : ''}${esc(t.titulo)} <span class="muted">(prazo ${esc(fmtData(t.prazo))})</span></li>
          `).join('') + '</ul>'}

        <div class="dp-actions">
          <button class="btn btn--sm" id="btn-editar-pessoa">Editar</button>
          <button class="btn btn--ghost btn--sm" id="btn-excluir-pessoa">Excluir</button>
        </div>
      </div>`;
    $('#btn-editar-pessoa', det).addEventListener('click', () => abrirEditorPessoa(p));
    $('#btn-excluir-pessoa', det).addEventListener('click', async () => {
      if (!confirm(`Excluir ${p.nome}? As decisoes e tarefas vinculadas serao mantidas, sem vinculo.`)) return;
      try {
        await deletarItem(KEY_PES, p.id);
        statePes.selId = null;
        renderPessoas();
        flash('Pessoa excluida.');
      } catch (e) { flash('Falha ao excluir: ' + e.message, true); }
    });
  }

  function abrirEditorPessoa(pessoa) {
    const overlay = construirOverlay(pessoa ? 'Editar pessoa' : 'Nova pessoa');
    const tagsStr = Array.isArray(pessoa && pessoa.tags) ? pessoa.tags.join(', ') : '';
    overlay.body.innerHTML = `
      <div class="dp-form">
        <label>Nome*<input type="text" id="p-nome" value="${esc(pessoa ? pessoa.nome : '')}" required /></label>
        <label>Cargo / funcao<input type="text" id="p-cargo" value="${esc(pessoa ? pessoa.cargo : '')}" /></label>
        <label>Instituicao<input type="text" id="p-inst" value="${esc(pessoa ? pessoa.instituicao : '')}" /></label>
        <div class="dp-grid2">
          <label>Telefone<input type="text" id="p-tel" value="${esc(pessoa ? pessoa.telefone : '')}" /></label>
          <label>E-mail<input type="email" id="p-email" value="${esc(pessoa ? pessoa.email : '')}" /></label>
        </div>
        <label>Tags (separadas por virgula)<input type="text" id="p-tags" value="${esc(tagsStr)}" /></label>
        <label>Observacoes<textarea id="p-obs" rows="4">${esc(pessoa ? pessoa.observacoes : '')}</textarea></label>
      </div>`;
    overlay.btnSalvar.addEventListener('click', async () => {
      const nome = $('#p-nome', overlay.body).value.trim();
      if (!nome) { flash('Nome e obrigatorio.', true); return; }
      const tags = $('#p-tags', overlay.body).value.split(',').map(s => s.trim()).filter(Boolean);
      const novo = Object.assign({}, pessoa || { id: gerarId() }, {
        nome,
        cargo: $('#p-cargo', overlay.body).value.trim(),
        instituicao: $('#p-inst', overlay.body).value.trim(),
        telefone: $('#p-tel', overlay.body).value.trim(),
        email: $('#p-email', overlay.body).value.trim(),
        observacoes: $('#p-obs', overlay.body).value.trim(),
        tags
      });
      try {
        await upsertItem(KEY_PES, novo);
        statePes.selId = novo.id;
        overlay.fechar();
        renderPessoas();
        flash('Pessoa salva.');
      } catch (e) { flash('Falha ao salvar: ' + e.message, true); }
    });
  }

  // ----- Exportacao Pessoas -----

  function _exportarPesPDF() {
    const lista = filtrarPessoas(lerPessoas());
    if (!lista.length) { flash('Nada para exportar.', true); return; }
    if (!window.jspdf || !window.jspdf.jsPDF) { flash('PDF indisponivel.', true); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margemL = 25, margemR = 20, larg = 210 - margemL - margemR;
    let y = 25;
    doc.setFont('times', 'bold'); doc.setFontSize(16);
    doc.text('Cadastro de pessoas (CRM)', margemL, y); y += 8;
    doc.setFont('times', 'normal'); doc.setFontSize(11);
    doc.text(`Emitido em ${fmtDataExtenso(hojeISO())} - ${lista.length} pessoa(s)`, margemL, y); y += 10;
    lista.forEach((p, i) => {
      if (y > 250) { doc.addPage(); y = 25; }
      doc.setFont('times', 'bold'); doc.setFontSize(12);
      doc.text(`${i + 1}. ${p.nome}`, margemL, y); y += 6;
      doc.setFont('times', 'normal'); doc.setFontSize(11);
      const linhas = [];
      if (p.cargo || p.instituicao) linhas.push([p.cargo, p.instituicao].filter(Boolean).join(' - '));
      if (p.telefone) linhas.push('Telefone: ' + p.telefone);
      if (p.email) linhas.push('E-mail: ' + p.email);
      if (Array.isArray(p.tags) && p.tags.length) linhas.push('Tags: ' + p.tags.join(', '));
      if (p.observacoes) linhas.push('Observacoes: ' + p.observacoes);
      for (const l of linhas) {
        const seg = doc.splitTextToSize(l, larg);
        for (const ln of seg) {
          if (y > 280) { doc.addPage(); y = 25; }
          doc.text(ln, margemL, y); y += 5;
        }
      }
      y += 4;
    });
    doc.save(`pessoas_${hojeISO()}.pdf`);
  }

  async function _exportarPesDOCX() {
    const lista = filtrarPessoas(lerPessoas());
    if (!lista.length) { flash('Nada para exportar.', true); return; }
    if (!window.docx) { flash('Word indisponivel.', true); return; }
    const D = window.docx;
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = D;
    const elementos = [];
    elementos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Cadastro de pessoas (CRM)' })] }));
    elementos.push(new Paragraph({ children: [new TextRun({ text: `Emitido em ${fmtDataExtenso(hojeISO())} - ${lista.length} pessoa(s)` })] }));
    elementos.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
    lista.forEach((p, i) => {
      elementos.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: `${i + 1}. ${p.nome}` })]
      }));
      const linhas = [];
      if (p.cargo || p.instituicao) linhas.push([p.cargo, p.instituicao].filter(Boolean).join(' - '));
      if (p.telefone) linhas.push('Telefone: ' + p.telefone);
      if (p.email) linhas.push('E-mail: ' + p.email);
      if (Array.isArray(p.tags) && p.tags.length) linhas.push('Tags: ' + p.tags.join(', '));
      if (p.observacoes) linhas.push('Observacoes: ' + p.observacoes);
      for (const l of linhas) {
        elementos.push(new Paragraph({ children: [new TextRun({ text: l })] }));
      }
      elementos.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
    });
    const doc = new Document({
      styles: { default: { document: { run: { font: 'Times New Roman', size: 24 } } } },
      sections: [{ properties: { page: { margin: { top: 1700, right: 1133, bottom: 1133, left: 1700 } } }, children: elementos }]
    });
    const blob = await Packer.toBlob(doc);
    baixar(blob, `pessoas_${hojeISO()}.docx`);
  }

  // -----------------------------------------------------------------
  // Overlay/Modal simples reutilizado para editores
  // -----------------------------------------------------------------

  function construirOverlay(titulo) {
    let overlay = document.getElementById('dp-overlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'dp-overlay';
    overlay.className = 'dp-overlay';
    overlay.innerHTML = `
      <div class="dp-modal" role="dialog" aria-modal="true">
        <div class="dp-modal__head">
          <h3>${esc(titulo)}</h3>
          <button class="dp-modal__close" aria-label="Fechar" type="button">&times;</button>
        </div>
        <div class="dp-modal__body"></div>
        <div class="dp-modal__foot">
          <button class="btn btn--ghost btn--sm dp-modal__cancel" type="button">Cancelar</button>
          <button class="btn btn--primary btn--sm dp-modal__save" type="button">Salvar</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const fechar = () => overlay.remove();
    overlay.querySelector('.dp-modal__close').addEventListener('click', fechar);
    overlay.querySelector('.dp-modal__cancel').addEventListener('click', fechar);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
    return {
      body: overlay.querySelector('.dp-modal__body'),
      btnSalvar: overlay.querySelector('.dp-modal__save'),
      fechar
    };
  }

  // -----------------------------------------------------------------
  // Mounts: injeta paineis se nao existem e liga eventos
  // -----------------------------------------------------------------

  function montarPainelDecisoes() {
    let painel = document.getElementById('panel-decisoes');
    if (!painel) {
      painel = document.createElement('section');
      painel.className = 'tab-panel';
      painel.id = 'panel-decisoes';
      painel.setAttribute('role', 'tabpanel');
      painel.hidden = true;
      const ancora = document.getElementById('panel-config') || document.querySelector('main.container') || document.body;
      ancora.parentNode.insertBefore(painel, ancora);
    }
    painel.innerHTML = `
      <div class="dp-grid">
        <div class="card" style="padding:18px 20px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:8px;flex-wrap:wrap">
            <h2>Decisoes</h2>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button class="btn btn--primary btn--sm" id="btn-nova-decisao" type="button">+ Nova decisao</button>
              <button class="btn btn--export" id="btn-dec-pdf" type="button" title="Exportar PDF">PDF</button>
              <button class="btn btn--export" id="btn-dec-docx" type="button" title="Exportar Word">Word</button>
            </div>
          </div>
          <div class="dp-toolbar">
            <input type="text" id="decisoes-busca" placeholder="Buscar assunto, decisao, parte..." />
            <select id="decisoes-cat">
              <option value="todas">Todas as categorias</option>
              ${Object.entries(CATEGORIAS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
            </select>
          </div>
          <div class="muted" id="decisoes-contador" style="margin:6px 0 10px;font-size:12px">0 resultados</div>
          <div id="decisoes-lista" class="dp-lista"></div>
        </div>
        <div class="card" id="decisao-detalhe" style="padding:18px 20px">
          <p class="muted">Selecione uma decisao a esquerda, ou clique em "Nova decisao".</p>
        </div>
      </div>`;
    $('#btn-nova-decisao', painel).addEventListener('click', () => abrirEditorDecisao(null));
    $('#btn-dec-pdf', painel).addEventListener('click', _exportarDecPDF);
    $('#btn-dec-docx', painel).addEventListener('click', _exportarDecDOCX);
    const busca = $('#decisoes-busca', painel);
    busca.addEventListener('input', () => { stateDec.busca = busca.value; renderDecisoes(); });
    const sel = $('#decisoes-cat', painel);
    sel.addEventListener('change', () => { stateDec.categoria = sel.value; renderDecisoes(); });
  }

  function montarPainelPessoas() {
    let painel = document.getElementById('panel-pessoas');
    if (!painel) {
      painel = document.createElement('section');
      painel.className = 'tab-panel';
      painel.id = 'panel-pessoas';
      painel.setAttribute('role', 'tabpanel');
      painel.hidden = true;
      const ancora = document.getElementById('panel-decisoes') || document.getElementById('panel-config') || document.querySelector('main.container') || document.body;
      ancora.parentNode.insertBefore(painel, ancora);
    }
    painel.innerHTML = `
      <div class="dp-grid">
        <div class="card" style="padding:18px 20px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:8px;flex-wrap:wrap">
            <h2>Pessoas (CRM)</h2>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button class="btn btn--primary btn--sm" id="btn-nova-pessoa" type="button">+ Nova pessoa</button>
              <button class="btn btn--export" id="btn-pes-pdf" type="button" title="Exportar PDF">PDF</button>
              <button class="btn btn--export" id="btn-pes-docx" type="button" title="Exportar Word">Word</button>
            </div>
          </div>
          <div class="dp-toolbar">
            <input type="text" id="pessoas-busca" placeholder="Buscar nome, cargo, instituicao, tag..." />
          </div>
          <div class="muted" id="pessoas-contador" style="margin:6px 0 10px;font-size:12px">0 pessoas</div>
          <div id="pessoas-lista" class="dp-lista"></div>
        </div>
        <div class="card" id="pessoa-detalhe" style="padding:18px 20px">
          <p class="muted">Selecione uma pessoa a esquerda, ou clique em "Nova pessoa".</p>
        </div>
      </div>`;
    $('#btn-nova-pessoa', painel).addEventListener('click', () => abrirEditorPessoa(null));
    $('#btn-pes-pdf', painel).addEventListener('click', _exportarPesPDF);
    $('#btn-pes-docx', painel).addEventListener('click', _exportarPesDOCX);
    const busca = $('#pessoas-busca', painel);
    busca.addEventListener('input', () => { statePes.busca = busca.value; renderPessoas(); });
  }

  // -----------------------------------------------------------------
  // Hook em trocarAba do app.js + storage observer
  // -----------------------------------------------------------------

  function instalarHookAbas() {
    if (typeof window.trocarAba !== 'function') return false;
    const original = window.trocarAba;
    window.trocarAba = function (nome) {
      const r = original.apply(this, arguments);
      if (nome === 'decisoes') renderDecisoes();
      if (nome === 'pessoas') renderPessoas();
      return r;
    };
    return true;
  }

  function instalarStorageObserver() {
    // Eventos 'storage' so disparam entre abas/janelas distintas. Quando o
    // firebase-sync recebe snapshot remoto e atualiza o localStorage na MESMA
    // aba, ele chama window.renderTudo(). Por isso fazemos hook em renderTudo
    // tambem, alem de escutar storage para o caso multi-aba.
    window.addEventListener('storage', (ev) => {
      if (ev.key === KEY_DEC) renderDecisoes();
      if (ev.key === KEY_PES) {
        renderPessoas();
        renderDetalheDecisao();
      }
      if (ev.key === 'cebraspe_tarefas_v3') {
        renderDetalhePessoa();
      }
    });
    instalarHookRenderTudo();
  }

  function instalarHookRenderTudo() {
    const tentar = () => {
      if (typeof window.renderTudo !== 'function' || window.renderTudo.__dpHooked) return false;
      const original = window.renderTudo;
      const wrapper = function () {
        const r = original.apply(this, arguments);
        try { renderDecisoes(); } catch (_) {}
        try { renderPessoas(); } catch (_) {}
        try { renderDetalheDecisao(); } catch (_) {}
        try { renderDetalhePessoa(); } catch (_) {}
        return r;
      };
      wrapper.__dpHooked = true;
      window.renderTudo = wrapper;
      return true;
    };
    if (tentar()) return;
    let tries = 0;
    const t = setInterval(() => {
      tries++;
      if (tentar() || tries > 40) clearInterval(t);
    }, 250);
  }

  function bootstrap() {
    try { montarPainelDecisoes(); } catch (e) { console.error('[decisoes-pessoas] erro mount decisoes', e); }
    try { montarPainelPessoas(); } catch (e) { console.error('[decisoes-pessoas] erro mount pessoas', e); }
    if (!instalarHookAbas()) {
      // app.js ainda nao definiu trocarAba — tenta de novo em breve
      let tries = 0;
      const t = setInterval(() => {
        tries++;
        if (instalarHookAbas() || tries > 40) clearInterval(t);
      }, 250);
    }
    instalarStorageObserver();
    // Render inicial se chave ja esta hidratada
    renderDecisoes();
    renderPessoas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }

  // Exposicao para depuracao manual no console
  window.__dp = { renderDecisoes, renderPessoas, abrirEditorDecisao, abrirEditorPessoa };
})();
