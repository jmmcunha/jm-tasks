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
    return t.concluidaEm || t.atualizadoEm || t.criadoEm || null;
  }

  // OBJETIVOS é exposto via app.js (let global). Tentar acessar com fallback.
  function getObjetivos() {
    try { if (typeof OBJETIVOS !== 'undefined' && Array.isArray(OBJETIVOS)) return OBJETIVOS; } catch (e) {}
    return [];
  }

  function rotuloOE(id) {
    if (!id) return '—';
    const obj = getObjetivos().find(o => o.id === id || o.codigo === id);
    if (!obj) return String(id);
    return `${obj.codigo} — ${obj.titulo}`;
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
    const oesUsados = new Set(listaConcluidas().map(t => t.oeId || t.objetivoId).filter(Boolean));
    const objs = getObjetivos().filter(o => oesUsados.has(o.id) || oesUsados.has(o.codigo));
    let html = '<option value="">Todos os OEs</option>';
    for (const o of objs) {
      html += `<option value="${esc(o.id)}">${esc(o.codigo)} — ${esc(o.titulo)}</option>`;
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
        const tid = t.oeId || t.objetivoId;
        if (tid !== oe) return false;
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

  function renderItem(t) {
    const dc = dataConclusaoEfetiva(t);
    const dataStr = dc ? (typeof dc === 'number' ? new Date(dc).toISOString().slice(0,10) : String(dc).slice(0,10)) : '';
    const prioCls = t.prioridade === 'alta' ? 'badge--alta' : t.prioridade === 'baixa' ? 'badge--baixa' : 'badge--media';
    return `
      <article class="task task--done" style="display:grid;grid-template-columns:1fr auto;gap:0.4rem 0.8rem;padding:0.7rem 0.9rem;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;margin-bottom:0.5rem;">
        <div>
          <div style="font-weight:600;color:#1e293b;">${esc(t.titulo || '(sem título)')}</div>
          <div class="muted" style="font-size:0.85em;margin-top:0.2rem;">
            <span>${esc(rotuloOE(t.oeId || t.objetivoId))}</span>
            ${t.responsavel ? ` · <span>Resp.: ${esc(t.responsavel)}</span>` : ''}
            ${t.prioridade ? ` · <span class="badge ${prioCls}" style="margin-left:0.2rem;">${esc(t.prioridade)}</span>` : ''}
          </div>
          ${t.resultado ? `<div style="font-size:0.88em;margin-top:0.3rem;color:#334155;"><strong>Resultado:</strong> ${esc(t.resultado)}</div>` : ''}
        </div>
        <div style="text-align:right;font-size:0.82em;color:#475569;white-space:nowrap;">
          <div>Concluída em</div>
          <div style="font-weight:600;">${fmtBR(dataStr)}</div>
        </div>
      </article>
    `;
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
      const dataStr = dc ? (typeof dc === 'number' ? new Date(dc).toISOString().slice(0,10) : String(dc).slice(0,10)) : '';
      return {
        Título: t.titulo || '',
        OE: rotuloOE(t.oeId || t.objetivoId),
        Responsável: t.responsavel || '',
        Prioridade: t.prioridade || '',
        Prazo: t.prazo || '',
        ConcluídaEm: dataStr,
        Resultado: t.resultado || '',
        Descrição: t.descricao || '',
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
        r.Responsável ? `Resp.: ${r.Responsável}` : '',
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
