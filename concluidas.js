// concluidas.js - Leva 32
// Modulo standalone para a aba "Concluidas": lista somente tarefas com
// status === 'concluida', exporta PDF/Excel.
//
// Le tarefas e objetivos do localStorage (chave 'cebraspe_tarefas_v3'),
// mesmo padrao que decisoes-pessoas.js usa.

(function () {
  'use strict';

  const KEY_TAR = 'cebraspe_tarefas_v3';

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtBR(iso) {
    if (!iso) return '—';
    const s = String(iso);
    if (s.length >= 10 && s[4] === '-') return `${s.slice(8,10)}/${s.slice(5,7)}/${s.slice(0,4)}`;
    return s;
  }
  function dataConclusaoEfetiva(t) {
    // Aceita tanto atualizadaEm (feminino, usado pelo app principal) quanto atualizadoEm
    // e tanto criadaEm quanto criadoEm.
    return t.concluidaEm
      || t.atualizadaEm || t.atualizadoEm
      || t.criadaEm || t.criadoEm
      || null;
  }

  // OBJETIVOS é exposto via app.js (const global no script clássico).
  function getObjetivos() {
    try { if (typeof OBJETIVOS !== 'undefined' && Array.isArray(OBJETIVOS)) return OBJETIVOS; } catch (e) {}
    return [];
  }

  function rotuloOE(id) {
    if (id == null || id === '') return 'Sem objetivo estratégico';
    const objs = getObjetivos();
    // Compara numericamente e como string, pois oeId pode vir como '1' ou 1.
    const obj = objs.find(o => o.id === id || String(o.id) === String(id));
    if (!obj) return 'Sem objetivo estratégico';
    return `OE${obj.id} — ${obj.curto || obj.texto || ''}`.trim();
  }

  function carregarTarefas() {
    try {
      const raw = localStorage.getItem(KEY_TAR);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function listaConcluidas() {
    return carregarTarefas().filter(t => t && t.status === 'concluida');
  }

  function preencherOpcoesOE() {
    const sel = $('#concluidas-oe');
    if (!sel) return;
    const valorAtual = sel.value;
    const oesUsados = new Set(
      listaConcluidas()
        .map(t => (t.oeId !== undefined && t.oeId !== null) ? t.oeId : t.objetivoId)
        .filter(v => v !== undefined && v !== null && v !== '')
        .map(v => String(v))
    );
    const objs = getObjetivos().filter(o => oesUsados.has(String(o.id)));
    let html = '<option value="">Todos os objetivos estratégicos</option>';
    for (const o of objs) {
      html += `<option value="${esc(o.id)}">OE${esc(o.id)} — ${esc(o.curto || '')}</option>`;
    }
    sel.innerHTML = html;
    if (valorAtual) sel.value = valorAtual;
  }

  function filtrar(lista) {
    const q = ($('#concluidas-busca')?.value || '').trim().toLowerCase();
    const oe = $('#concluidas-oe')?.value || '';
    const per = parseInt($('#concluidas-periodo')?.value || '0', 10);
    const limite = per > 0 ? Date.now() - per * 24 * 60 * 60 * 1000 : 0;
    return lista.filter(t => {
      if (q) {
        const blob = [t.titulo, t.responsavel, t.descricao, t.resultado, rotuloOE(t.oeId || t.objetivoId)]
          .filter(Boolean).join(' ').toLowerCase();
        if (!blob.includes(q)) return false;
      }
      if (oe) {
        const tid = (t.oeId !== undefined && t.oeId !== null) ? t.oeId : t.objetivoId;
        if (String(tid) !== String(oe)) return false;
      }
      if (limite > 0) {
        const dc = dataConclusaoEfetiva(t);
        const ts = typeof dc === 'number' ? dc : (dc ? new Date(dc).getTime() : 0);
        if (!ts || ts < limite) return false;
      }
      return true;
    });
  }

  function ordenar(lista) {
    return lista.slice().sort((a, b) => {
      const da = dataConclusaoEfetiva(a);
      const db = dataConclusaoEfetiva(b);
      const ta = typeof da === 'number' ? da : (da ? new Date(da).getTime() : 0);
      const tb = typeof db === 'number' ? db : (db ? new Date(db).getTime() : 0);
      return tb - ta; // mais recente primeiro
    });
  }

  // Rotulo amigavel da prioridade (capitalizado).
  function rotuloPrioridade(p) {
    const s = String(p || '').toLowerCase();
    if (s === 'alta') return 'Alta';
    if (s === 'baixa') return 'Baixa';
    if (s === 'media' || s === 'média') return 'Média';
    return '';
  }

  function renderItem(t) {
    const dc = dataConclusaoEfetiva(t);
    let dataStr = '';
    if (dc) {
      if (typeof dc === 'number') dataStr = new Date(dc).toISOString().slice(0,10);
      else if (typeof dc === 'string') dataStr = dc.slice(0,10);
    }
    const dataExibida = dataStr ? fmtBR(dataStr) : 'data não registrada';
    const prioCls = t.prioridade === 'alta' ? 'badge--alta' : t.prioridade === 'baixa' ? 'badge--baixa' : 'badge--media';
    const prioLabel = rotuloPrioridade(t.prioridade);
    const oeIdRaw = (t.oeId !== undefined && t.oeId !== null) ? t.oeId : t.objetivoId;
    const oeLabel = rotuloOE(oeIdRaw);
    const responsavel = (t.responsavel || '').trim();
    const idEsc = esc(t.id || '');
    return `
      <article class="task task--done" data-id="${idEsc}" style="display:grid;grid-template-columns:1fr auto;gap:0.4rem 0.8rem;padding:0.7rem 0.9rem;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;margin-bottom:0.5rem;">
        <div>
          <div style="font-weight:600;color:#1e293b;">${esc(t.titulo || '(sem título)')}</div>
          <div class="muted" style="font-size:0.85em;margin-top:0.2rem;">
            <span>${esc(oeLabel)}</span>
            ${responsavel ? ` · <span>Responsável: ${esc(responsavel)}</span>` : ''}
            ${prioLabel ? ` · <span class="badge ${prioCls}" style="margin-left:0.2rem;">${esc(prioLabel)}</span>` : ''}
          </div>
          ${t.resultado ? `<div style="font-size:0.88em;margin-top:0.3rem;color:#334155;"><strong>Resultado:</strong> ${esc(t.resultado)}</div>` : ''}
        </div>
        <div style="text-align:right;font-size:0.82em;color:#475569;white-space:nowrap;">
          <div>Concluída em</div>
          <div style="font-weight:600;">${esc(dataExibida)}</div>
          <div style="margin-top:0.45rem;display:flex;gap:0.3rem;justify-content:flex-end;">
            <button type="button" data-acao="reabrir" data-id="${idEsc}" title="Reabrir (volta para A fazer)" style="border:1px solid #cbd5e1;background:#fff;color:#1e40af;padding:0.25rem 0.55rem;border-radius:6px;font-size:0.82em;cursor:pointer;">Reabrir</button>
            <button type="button" data-acao="apagar" data-id="${idEsc}" title="Excluir tarefa permanentemente" style="border:1px solid #fecaca;background:#fff;color:#b91c1c;padding:0.25rem 0.55rem;border-radius:6px;font-size:0.82em;cursor:pointer;">Excluir</button>
          </div>
        </div>
      </article>
    `;
  }

  // -----------------------------------------------------------------
  // Ações (Leva 34.10c)
  // -----------------------------------------------------------------

  function _commitTarefas(arr) {
    // Atualiza o estado em memória do app principal e persiste (carimba _lwm).
    if (Array.isArray(window.tarefas)) {
      // substitui in-place para não quebrar referências
      window.tarefas.length = 0;
      for (const x of arr) window.tarefas.push(x);
    }
    if (typeof window.salvarTarefas === 'function') {
      window.salvarTarefas();
    } else {
      try { localStorage.setItem(KEY_TAR, JSON.stringify(arr)); } catch (e) {}
    }
    if (typeof window.renderTudo === 'function') window.renderTudo();
    window.dispatchEvent(new Event('cebraspe:tarefas-atualizadas'));
    render();
  }

  function apagarItem(id) {
    const todas = carregarTarefas();
    const t = todas.find(x => x && x.id === id);
    if (!t) return;
    const ok = window.confirm(`Excluir definitivamente:\n\n"${t.titulo || '(sem título)'}"?\n\nEssa ação não pode ser desfeita.`);
    if (!ok) return;
    const filtradas = todas.filter(x => x && x.id !== id);
    if (typeof window.adicionarTombstone === 'function') {
      window.adicionarTombstone(id);
    }
    _commitTarefas(filtradas);
  }

  function reabrirItem(id) {
    const todas = carregarTarefas();
    const t = todas.find(x => x && x.id === id);
    if (!t) return;
    const ok = window.confirm(`Reabrir tarefa:\n\n"${t.titulo || '(sem título)'}"?\n\nEla volta para "A fazer".`);
    if (!ok) return;
    const agoraIso = new Date().toISOString();
    const novas = todas.map(x => {
      if (!x || x.id !== id) return x;
      const c = Object.assign({}, x);
      c.status = 'a-fazer';
      delete c.concluidaEm;
      c.atualizadaEm = agoraIso;
      // força _lwm novo para vencer o snapshot remoto
      c._lwm = Date.now();
      return c;
    });
    _commitTarefas(novas);
  }

  function apagarTodasConcluidas() {
    const concl = listaConcluidas();
    if (concl.length === 0) {
      window.alert('Não há tarefas concluídas para apagar.');
      return;
    }
    const ok1 = window.confirm(`Apagar ${concl.length} tarefa(s) concluída(s)?\n\nEssa ação não pode ser desfeita.`);
    if (!ok1) return;
    const palavra = window.prompt('Para confirmar, digite APAGAR (em maiúsculas):');
    if (palavra !== 'APAGAR') {
      window.alert('Cancelado.');
      return;
    }
    const todas = carregarTarefas();
    const idsAlvo = new Set(concl.map(x => x.id));
    const filtradas = todas.filter(x => x && !idsAlvo.has(x.id));
    if (typeof window.adicionarTombstone === 'function') {
      for (const id of idsAlvo) window.adicionarTombstone(id);
    }
    _commitTarefas(filtradas);
  }

  function injetarBotaoLimparTudo() {
    // Adiciona um botão "Apagar todas" ao lado dos botões de exportar.
    const bExp = $('#btn-exp-concluidas-pdf') || $('#btn-exp-concluidas-xlsx');
    if (!bExp) return;
    if (document.getElementById('btn-concluidas-apagar-tudo')) return;
    const btn = document.createElement('button');
    btn.id = 'btn-concluidas-apagar-tudo';
    btn.type = 'button';
    btn.textContent = 'Apagar todas';
    btn.title = 'Excluir definitivamente todas as tarefas concluídas';
    btn.style.cssText = 'border:1px solid #fecaca;background:#fff;color:#b91c1c;padding:0.45rem 0.8rem;border-radius:6px;font-size:0.9em;cursor:pointer;margin-left:0.5rem;';
    btn.addEventListener('click', apagarTodasConcluidas);
    bExp.parentNode.insertBefore(btn, bExp.nextSibling);
  }

  function bindAcoesLista() {
    const lista = $('#concluidas-lista');
    if (!lista || lista.dataset.bindAcoes === '1') return;
    lista.dataset.bindAcoes = '1';
    lista.addEventListener('click', (ev) => {
      const b = ev.target.closest('button[data-acao]');
      if (!b) return;
      const id = b.dataset.id;
      if (!id) return;
      if (b.dataset.acao === 'apagar') apagarItem(id);
      else if (b.dataset.acao === 'reabrir') reabrirItem(id);
    });
  }

  function render() {
    preencherOpcoesOE();
    const todas = listaConcluidas();
    const filtradas = ordenar(filtrar(todas));
    const lista = $('#concluidas-lista');
    const cont = $('#concluidas-contagem');
    if (cont) {
      cont.textContent = todas.length === 0
        ? 'Nenhuma tarefa concluída ainda.'
        : (filtradas.length === todas.length
            ? `${todas.length} tarefa(s) concluída(s) no total.`
            : `Exibindo ${filtradas.length} de ${todas.length} tarefa(s) concluída(s).`);
    }
    if (!lista) return;
    if (filtradas.length === 0) {
      lista.innerHTML = '<p class="muted">Nenhuma tarefa concluída corresponde aos filtros.</p>';
      return;
    }
    lista.innerHTML = filtradas.map(renderItem).join('');
  }

  // -----------------------------------------------------------------
  // Exportações
  // -----------------------------------------------------------------

  function dadosExport() {
    return ordenar(filtrar(listaConcluidas())).map(t => {
      const dc = dataConclusaoEfetiva(t);
      let dataStr = '';
      if (dc) {
        if (typeof dc === 'number') dataStr = new Date(dc).toISOString().slice(0,10);
        else if (typeof dc === 'string') dataStr = dc.slice(0,10);
      }
      const oeIdRaw = (t.oeId !== undefined && t.oeId !== null) ? t.oeId : t.objetivoId;
      return {
        'Título': t.titulo || '',
        'Objetivo Estratégico': rotuloOE(oeIdRaw),
        'Responsável': t.responsavel || '',
        'Prioridade': rotuloPrioridade(t.prioridade),
        'Prazo': t.prazo ? fmtBR(t.prazo) : '',
        'Concluída em': dataStr ? fmtBR(dataStr) : 'data não registrada',
        'Resultado': t.resultado || '',
        'Descrição': t.descricao || '',
      };
    });
  }

  function exportarPDF() {
    if (typeof window.jspdf === 'undefined') {
      alert('Biblioteca PDF não disponível.');
      return;
    }
    const { jsPDF } = window.jspdf;
    const dados = dadosExport();
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margem = 40;
    const larg = doc.internal.pageSize.getWidth() - margem * 2;
    let y = margem;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
    doc.text('Tarefas concluídas', margem, y); y += 22;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    doc.text(`Gerado em ${new Date().toLocaleString('pt-BR')} · ${dados.length} registro(s)`, margem, y);
    y += 18;

    doc.setDrawColor(220); doc.line(margem, y, margem + larg, y); y += 8;

    for (const r of dados) {
      if (y > 760) { doc.addPage(); y = margem; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      const titulo = doc.splitTextToSize(r.Título || '(sem título)', larg);
      doc.text(titulo, margem, y); y += titulo.length * 13;

      doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
      const linhaMeta = [
        r.OE,
        r.Responsável ? `Responsável: ${r.Responsável}` : '',
        r.Prioridade ? `Prioridade: ${r.Prioridade}` : '',
        r.ConcluídaEm ? `Concluída em ${fmtBR(r.ConcluídaEm)}` : '',
        r.Prazo ? `Prazo: ${fmtBR(r.Prazo)}` : '',
      ].filter(Boolean).join(' · ');
      const meta = doc.splitTextToSize(linhaMeta, larg);
      doc.setTextColor(90);
      doc.text(meta, margem, y); y += meta.length * 11;
      doc.setTextColor(0);

      if (r.Resultado) {
        doc.setFontSize(10);
        const res = doc.splitTextToSize(`Resultado: ${r.Resultado}`, larg);
        doc.text(res, margem, y); y += res.length * 12;
      }
      y += 6;
      doc.setDrawColor(235); doc.line(margem, y, margem + larg, y); y += 8;
    }

    const nome = `tarefas-concluidas-${new Date().toISOString().slice(0,10)}.pdf`;
    doc.save(nome);
  }

  function exportarXLSX() {
    if (typeof XLSX === 'undefined') {
      alert('Biblioteca Excel não disponível.');
      return;
    }
    const dados = dadosExport();
    const ws = XLSX.utils.json_to_sheet(dados, {
      header: ['Título', 'OE', 'Responsável', 'Prioridade', 'Prazo', 'ConcluídaEm', 'Resultado', 'Descrição'],
    });
    // Larguras razoaveis
    ws['!cols'] = [
      { wch: 40 }, { wch: 30 }, { wch: 24 }, { wch: 12 },
      { wch: 12 }, { wch: 14 }, { wch: 40 }, { wch: 40 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Concluídas');
    const nome = `tarefas-concluidas-${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(wb, nome);
  }

  // -----------------------------------------------------------------
  // Bindings
  // -----------------------------------------------------------------

  function bind() {
    const busca = $('#concluidas-busca');
    const oe = $('#concluidas-oe');
    const per = $('#concluidas-periodo');
    if (busca && !busca.dataset.bound) { busca.dataset.bound = '1'; busca.addEventListener('input', render); }
    if (oe && !oe.dataset.bound) { oe.dataset.bound = '1'; oe.addEventListener('change', render); }
    if (per && !per.dataset.bound) { per.dataset.bound = '1'; per.addEventListener('change', render); }
    const bPdf = $('#btn-exp-concluidas-pdf');
    const bXls = $('#btn-exp-concluidas-xlsx');
    if (bPdf && !bPdf.dataset.bound) { bPdf.dataset.bound = '1'; bPdf.addEventListener('click', exportarPDF); }
    if (bXls && !bXls.dataset.bound) { bXls.dataset.bound = '1'; bXls.addEventListener('click', exportarXLSX); }
    // Leva 34.10c
    injetarBotaoLimparTudo();
    bindAcoesLista();
  }

  function init() {
    bind();
    render();
    // Re-renderiza quando o Firebase atualizar tarefas via firebase-sync.
    window.addEventListener('storage', (e) => {
      if (e && e.key === KEY_TAR) render();
    });
    // Listener customizado emitido pelo firebase-sync (in-tab updates).
    window.addEventListener('cebraspe:tarefas-atualizadas', render);
  }

  // Exposição pública
  window.renderConcluidas = function () {
    bind();
    render();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
