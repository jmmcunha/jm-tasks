/* reunioes-pdf.js — Gera PDF "Memória de Reunião" (Leva 35)
 *
 * Usa jsPDF + autotable (já carregados em index.html).
 * Estilo austero, conforme Manual da Presidência da República.
 */
(function () {
  'use strict';

  function fmtData(d) { return (window.Reunioes && window.Reunioes.fmtData) ? window.Reunioes.fmtData(d) : d; }
  function fmtDataExtenso(d) { return (window.Reunioes && window.Reunioes.fmtDataExtenso) ? window.Reunioes.fmtDataExtenso(d) : d; }
  function labelCategoria(c) { return (window.Reunioes && window.Reunioes.labelCategoria) ? window.Reunioes.labelCategoria(c) : c; }

  function gerar(reuniao) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert('Biblioteca de PDF não carregada (jsPDF ausente).');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const ML = 20, MR = 20, MT = 22, MB = 22;
    const colW = W - ML - MR;
    let y = MT;

    function quebraPagina(precisa) {
      if (y + precisa > H - MB) {
        rodape();
        doc.addPage();
        y = MT;
        cabecalhoPagina();
      }
    }
    function cabecalhoPagina() {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text('CEBRASPE — DIRETORIA EXECUTIVA · Memória de Reunião nº ' + (reuniao.numero || ''), ML, 12);
      doc.setDrawColor(180);
      doc.line(ML, 14, W - MR, 14);
      doc.setTextColor(0);
    }
    function rodape() {
      const pageNum = doc.internal.getNumberOfPages();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(`Página ${pageNum}`, W - MR, H - 10, { align: 'right' });
      doc.text('Documento interno · Cebraspe', ML, H - 10);
      doc.setTextColor(0);
    }

    // ========== capa / cabeçalho ==========
    cabecalhoPagina();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.text('CEBRASPE — DIRETORIA EXECUTIVA', ML, y);
    y += 6;
    doc.setFontSize(15);
    doc.setTextColor(0);
    doc.text('MEMÓRIA DE REUNIÃO', ML, y);
    y += 8;
    doc.setFontSize(13);
    doc.setFont('helvetica', 'normal');
    const titulo = reuniao.titulo || ('Reunião nº ' + reuniao.numero);
    const tituloLinhas = doc.splitTextToSize(titulo, colW);
    doc.text(tituloLinhas, ML, y);
    y += tituloLinhas.length * 6 + 2;

    // ========== metadados ==========
    doc.setFontSize(10);
    doc.setTextColor(80);
    const metas = [];
    metas.push(['Número', String(reuniao.numero || '—')]);
    metas.push(['Data', fmtDataExtenso(reuniao.data) || '—']);
    if (reuniao.hora) metas.push(['Horário de início', reuniao.hora]);
    if (reuniao.local) metas.push(['Local', reuniao.local]);
    if (reuniao.sensivel) metas.push(['Classificação', 'Reservado']);
    if (reuniao.memoria && reuniao.memoria.aprovada_em) {
      metas.push(['Aprovada em', new Date(reuniao.memoria.aprovada_em).toLocaleString('pt-BR')]);
    }
    if (reuniao.memoria && reuniao.memoria.aprovada_por) {
      metas.push(['Aprovada por', reuniao.memoria.aprovada_por]);
    }

    doc.autoTable({
      startY: y,
      head: [],
      body: metas,
      margin: { left: ML, right: MR },
      styles: { fontSize: 10, cellPadding: 1.5, textColor: 30 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 38, textColor: 80 } },
      theme: 'plain'
    });
    y = doc.lastAutoTable.finalY + 6;
    doc.setTextColor(0);

    // ========== participantes ==========
    if (Array.isArray(reuniao.participantes) && reuniao.participantes.length > 0) {
      quebraPagina(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Participantes', ML, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      reuniao.participantes.forEach(p => {
        quebraPagina(6);
        doc.text('• ' + p, ML + 2, y);
        y += 5;
      });
      y += 3;
    }

    // ========== resumo executivo ==========
    const exec = reuniao.memoria && reuniao.memoria.executivo;
    if (exec) {
      quebraPagina(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Resumo executivo', ML, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const linhas = doc.splitTextToSize(exec, colW);
      linhas.forEach(l => {
        quebraPagina(5);
        doc.text(l, ML, y);
        y += 5;
      });
      y += 4;
    }

    // ========== pauta e tratamento ==========
    const R = window.Reunioes;
    const assuntos = R ? R.assuntosDaReuniao(reuniao.id) : [];
    if (assuntos.length > 0) {
      quebraPagina(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Pauta e deliberações', ML, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      assuntos.forEach((a, idx) => {
        quebraPagina(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`${idx + 1}. ${a.titulo}`, ML, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        const sub = [];
        if (a.dono) sub.push('Responsável: ' + a.dono);
        if (a.urgencia) sub.push('Urgência: ' + a.urgencia);
        const trat = a._tratamento ? `Tratamento: ${({ deliberar: 'Deliberado', adiar: 'Adiado', arquivar: 'Arquivado', continuar: 'Continuar pendente' })[a._tratamento] || a._tratamento}` : '';
        if (trat) sub.push(trat);
        if (sub.length > 0) {
          doc.setTextColor(80);
          doc.setFontSize(9);
          doc.text(sub.join(' · '), ML + 4, y);
          doc.setFontSize(10);
          doc.setTextColor(0);
          y += 4;
        }
        if (a.notas) {
          const ls = doc.splitTextToSize(a.notas, colW - 4);
          ls.forEach(l => {
            quebraPagina(5);
            doc.text(l, ML + 4, y);
            y += 4.5;
          });
        }
        // Decisões deste assunto nesta reunião:
        const decs = (R ? R.decisoesDoAssunto(a.id) : []).filter(d => d.reuniao_id === reuniao.id);
        if (decs.length > 0) {
          y += 1;
          decs.forEach(d => {
            quebraPagina(8);
            const cat = labelCategoria(d.categoria);
            const cabecalhoDec = `→ [${cat}] `;
            doc.setFont('helvetica', 'bold');
            doc.text(cabecalhoDec, ML + 4, y);
            const w = doc.getTextWidth(cabecalhoDec);
            doc.setFont('helvetica', 'normal');
            const txt = doc.splitTextToSize(d.texto, colW - 4 - w);
            doc.text(txt[0] || '', ML + 4 + w, y);
            y += 4.5;
            for (let i = 1; i < txt.length; i++) {
              quebraPagina(5);
              doc.text(txt[i], ML + 4 + w, y);
              y += 4.5;
            }
          });
        }
        y += 3;
      });
    }

    // ========== tarefas geradas ==========
    const tarefasGeradasIds = (reuniao.memoria && Array.isArray(reuniao.memoria.tarefas_geradas_ids)) ? reuniao.memoria.tarefas_geradas_ids : [];
    if (tarefasGeradasIds.length > 0 && Array.isArray(window.tarefas)) {
      quebraPagina(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Tarefas geradas a partir desta reunião', ML, y);
      y += 4;
      const linhas = window.tarefas
        .filter(t => tarefasGeradasIds.includes(t.id))
        .map(t => [
          t.titulo || '—',
          t.responsavel || '—',
          t.prazo ? fmtData(t.prazo) : '—',
          (t.prioridade || '').toString()
        ]);
      doc.autoTable({
        startY: y,
        head: [['Título', 'Responsável', 'Prazo', 'Prioridade']],
        body: linhas,
        margin: { left: ML, right: MR },
        styles: { fontSize: 9, cellPadding: 2, textColor: 30, lineColor: 200 },
        headStyles: { fillColor: [60, 60, 60], textColor: 255, fontStyle: 'bold' },
        theme: 'grid'
      });
      y = doc.lastAutoTable.finalY + 6;
    }

    // ========== assuntos em aberto ==========
    const aberto = (reuniao.memoria && Array.isArray(reuniao.memoria.assuntos_em_aberto_ids)) ? reuniao.memoria.assuntos_em_aberto_ids : [];
    if (aberto.length > 0 && R) {
      quebraPagina(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Assuntos remanescentes (próxima reunião)', ML, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      aberto.forEach(aid => {
        const a = R.getAssunto(aid);
        if (!a) return;
        quebraPagina(6);
        doc.text('• ' + a.titulo, ML + 2, y);
        y += 4.5;
      });
      y += 3;
    }

    // ========== observações ==========
    const obs = reuniao.memoria && reuniao.memoria.observacoes;
    if (obs) {
      quebraPagina(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Observações', ML, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const linhas = doc.splitTextToSize(obs, colW);
      linhas.forEach(l => {
        quebraPagina(5);
        doc.text(l, ML, y);
        y += 5;
      });
      y += 5;
    }

    // ========== assinatura ==========
    quebraPagina(34);
    y += 8;
    doc.setDrawColor(60);
    doc.line(ML + 30, y, ML + 120, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const aprovador = (reuniao.memoria && reuniao.memoria.aprovada_por) || '';
    doc.text(aprovador || 'Diretor-Executivo', ML + 30, y);
    y += 4;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text('Diretoria Executiva — Cebraspe', ML + 30, y);
    doc.setTextColor(0);

    // ========== rodapé última página ==========
    rodape();

    const slug = (reuniao.titulo || ('reuniao-' + reuniao.numero))
      .toString()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      .slice(0, 60);
    const nome = `memoria-reuniao-${reuniao.numero || 's'}-${slug}.pdf`;
    doc.save(nome);
  }

  window.ReunioesPDF = { gerar };
})();
