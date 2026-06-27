/* reunioes-pdf.js — Memória de Reunião (Leva 36.3, layout executivo refinado)
 *
 * Estilo: austero conforme Manual da Presidência, com hierarquia clara,
 * tipografia maior, decisões destacadas e seções numeradas.
 *
 * Dependências: jsPDF + jsPDF-AutoTable (carregados em index.html).
 */
(function () {
  'use strict';

  // Paleta institucional discreta
  const COR_PRIMARIA = [11, 83, 148];      // azul institucional
  const COR_PRIMARIA_CLARA = [232, 240, 250];
  const COR_TEXTO = [33, 41, 50];
  const COR_SECUNDARIA = [110, 122, 138];
  const COR_BORDA = [210, 217, 224];
  const COR_DESTAQUE_AMARELO = [255, 247, 214];
  const COR_DESTAQUE_AMARELO_BORDA = [240, 215, 122];

  function fmtData(d) { return (window.Reunioes && window.Reunioes.fmtData) ? window.Reunioes.fmtData(d) : d; }
  function fmtDataExtenso(d) { return (window.Reunioes && window.Reunioes.fmtDataExtenso) ? window.Reunioes.fmtDataExtenso(d) : d; }
  function labelCategoria(c) { return (window.Reunioes && window.Reunioes.labelCategoria) ? window.Reunioes.labelCategoria(c) : c; }

  function corCategoria(cat) {
    switch (cat) {
      case 'decisao_externa': return [183, 28, 28];       // vermelho institucional
      case 'delegacao_interna': return [11, 83, 148];     // azul
      case 'encaminhamento': return [29, 107, 44];        // verde
      case 'informe': return [110, 122, 138];             // cinza
      default: return [60, 60, 60];
    }
  }

  function gerar(reuniao) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert('Biblioteca de PDF não carregada (jsPDF ausente).');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const ML = 22, MR = 22, MT = 30, MB = 22;
    const colW = W - ML - MR;
    let y = MT;
    let secao = 0;

    const R = window.Reunioes;
    const assuntos = R ? R.assuntosDaReuniao(reuniao.id) : [];
    const ehPrevia = reuniao._previa === true;
    const aprovada = reuniao.memoria && reuniao.memoria.aprovada_em;

    // ============== utilitários de layout ==============
    function setText(c) { doc.setTextColor(c[0], c[1], c[2]); }
    function setDraw(c) { doc.setDrawColor(c[0], c[1], c[2]); }
    function setFill(c) { doc.setFillColor(c[0], c[1], c[2]); }

    function quebraPagina(precisa) {
      if (y + precisa > H - MB) {
        rodape();
        doc.addPage();
        cabecalhoPagina();
        y = MT;
      }
    }

    function cabecalhoPagina() {
      // Faixa superior fina com cor institucional
      setFill(COR_PRIMARIA);
      doc.rect(0, 0, W, 5, 'F');
      // Texto institucional
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      setText(COR_SECUNDARIA);
      doc.text('CEBRASPE · DIRETORIA EXECUTIVA', ML, 14);
      doc.setFont('helvetica', 'normal');
      doc.text(`Memória de Reunião nº ${reuniao.numero || '—'}`, W - MR, 14, { align: 'right' });
      // Linha separadora
      setDraw(COR_BORDA);
      doc.setLineWidth(0.2);
      doc.line(ML, 18, W - MR, 18);
      setText(COR_TEXTO);
    }

    function rodape() {
      const pageNum = doc.internal.getNumberOfPages();
      const totalPages = doc.internal.getNumberOfPages();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      setText(COR_SECUNDARIA);
      // Linha
      setDraw(COR_BORDA);
      doc.setLineWidth(0.2);
      doc.line(ML, H - 14, W - MR, H - 14);
      doc.text('Documento interno · Cebraspe · Diretoria Executiva', ML, H - 9);
      doc.text(`Página ${pageNum} de ${totalPages}`, W - MR, H - 9, { align: 'right' });
      // Marca-d'água de prévia
      if (ehPrevia) {
        setText([180, 0, 0]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('PRÉVIA — não aprovada', W / 2, H - 9, { align: 'center' });
      }
      setText(COR_TEXTO);
    }

    function tituloSecao(texto, opts) {
      opts = opts || {};
      const numerada = opts.numerada !== false;
      if (numerada) secao += 1;
      quebraPagina(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      setText(COR_PRIMARIA);
      const rotulo = numerada ? `${secao}.  ${texto}` : texto;
      doc.text(rotulo, ML, y);
      y += 2;
      // Linha sob o título
      setDraw(COR_PRIMARIA);
      doc.setLineWidth(0.4);
      doc.line(ML, y, ML + 26, y);
      setDraw(COR_BORDA);
      doc.setLineWidth(0.2);
      doc.line(ML + 26, y, W - MR, y);
      y += 5;
      setText(COR_TEXTO);
    }

    function paragrafo(texto, opts) {
      opts = opts || {};
      const tamanho = opts.tamanho || 10.5;
      const cor = opts.cor || COR_TEXTO;
      const indent = opts.indent || 0;
      doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
      doc.setFontSize(tamanho);
      setText(cor);
      const linhas = doc.splitTextToSize(texto, colW - indent);
      const alturaLinha = tamanho * 0.42;
      linhas.forEach(l => {
        quebraPagina(alturaLinha + 1);
        doc.text(l, ML + indent, y);
        y += alturaLinha;
      });
      setText(COR_TEXTO);
      return alturaLinha;
    }

    // ============== capa / cabeçalho do documento ==============
    cabecalhoPagina();

    // Bloco título com fundo institucional claro
    setFill(COR_PRIMARIA_CLARA);
    doc.rect(ML, y - 2, colW, 26, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setText(COR_PRIMARIA);
    doc.text('CEBRASPE — DIRETORIA EXECUTIVA', ML + 4, y + 4);
    doc.setFontSize(18);
    setText(COR_TEXTO);
    doc.text('Memória de Reunião', ML + 4, y + 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    setText(COR_SECUNDARIA);
    const titulo = reuniao.titulo || ('Reunião nº ' + reuniao.numero);
    const tituloLinhas = doc.splitTextToSize(titulo, colW - 8);
    doc.text(tituloLinhas[0] || '', ML + 4, y + 19);
    y += 30;

    // Tarja de status (rascunho/prévia/encerrada)
    let tarjaTxt = '';
    let tarjaCor = COR_SECUNDARIA;
    if (ehPrevia) {
      tarjaTxt = 'PRÉVIA — sem aprovação';
      tarjaCor = [183, 28, 28];
    } else if (aprovada) {
      tarjaTxt = 'MEMÓRIA APROVADA';
      tarjaCor = [29, 107, 44];
    } else {
      tarjaTxt = 'RASCUNHO';
      tarjaCor = [170, 110, 0];
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    setText(tarjaCor);
    doc.text(tarjaTxt, W - MR, y, { align: 'right' });
    setText(COR_TEXTO);
    y += 6;

    // ============== bloco de metadados ==============
    const metas = [];
    metas.push(['Número', String(reuniao.numero || '—')]);
    metas.push(['Data', fmtDataExtenso(reuniao.data) || '—']);
    if (reuniao.hora) metas.push(['Horário', reuniao.hora]);
    if (reuniao.local) metas.push(['Local', reuniao.local]);
    if (reuniao.sensivel) metas.push(['Classificação', 'Reservado']);
    if (aprovada) {
      metas.push(['Aprovada em', new Date(reuniao.memoria.aprovada_em).toLocaleString('pt-BR')]);
    }
    if (reuniao.memoria && reuniao.memoria.aprovada_por) {
      metas.push(['Aprovada por', reuniao.memoria.aprovada_por]);
    }
    if (reuniao.memoria && reuniao.memoria.reaberta_em) {
      metas.push(['Reaberta em', new Date(reuniao.memoria.reaberta_em).toLocaleString('pt-BR') +
        (reuniao.memoria.reaberta_por ? ' por ' + reuniao.memoria.reaberta_por : '')]);
    }

    doc.autoTable({
      startY: y,
      body: metas,
      margin: { left: ML, right: MR },
      styles: { fontSize: 10, cellPadding: { top: 2, bottom: 2, left: 2, right: 2 }, textColor: COR_TEXTO, lineColor: COR_BORDA, lineWidth: 0.1 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 38, textColor: COR_PRIMARIA, fillColor: [248, 250, 252] },
        1: { textColor: COR_TEXTO }
      },
      theme: 'plain',
      didDrawPage: () => {} // não duplica cabeçalho
    });
    y = doc.lastAutoTable.finalY + 6;

    // ============== sumário ==============
    const itensSum = [];
    if (reuniao.participantes && reuniao.participantes.length > 0) itensSum.push('Participantes');
    if (reuniao.memoria && reuniao.memoria.executivo) itensSum.push('Resumo executivo');
    if (assuntos.length > 0) itensSum.push(`Assuntos e deliberações (${assuntos.length})`);
    const totalDecs = R ? R.decisoesDaReuniao(reuniao.id).length : 0;
    if (totalDecs > 0) itensSum.push(`Decisões e encaminhamentos (${totalDecs})`);
    const tarefasGeradasIds = (reuniao.memoria && Array.isArray(reuniao.memoria.tarefas_geradas_ids)) ? reuniao.memoria.tarefas_geradas_ids : [];
    if (tarefasGeradasIds.length > 0) itensSum.push(`Tarefas geradas (${tarefasGeradasIds.length})`);
    if (reuniao.memoria && reuniao.memoria.observacoes) itensSum.push('Observações');
    if (itensSum.length >= 3) {
      // só vale a pena imprimir sumário se houver pelo menos 3 itens
      quebraPagina(8 + itensSum.length * 5);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      setText(COR_SECUNDARIA);
      doc.text('CONTEÚDO', ML, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      setText(COR_TEXTO);
      itensSum.forEach((it, i) => {
        quebraPagina(5);
        doc.text(`${i + 1}.  ${it}`, ML + 4, y);
        y += 4.5;
      });
      y += 4;
    }

    // ============== participantes ==============
    if (Array.isArray(reuniao.participantes) && reuniao.participantes.length > 0) {
      tituloSecao('Participantes');
      // Lista em duas colunas se for grande
      const ps = reuniao.participantes;
      if (ps.length <= 4) {
        ps.forEach(p => { paragrafo('•  ' + p, { indent: 2 }); });
      } else {
        const meio = Math.ceil(ps.length / 2);
        const yIni = y;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        ps.slice(0, meio).forEach((p, i) => {
          quebraPagina(5);
          doc.text('•  ' + p, ML + 2, yIni + i * 5);
        });
        ps.slice(meio).forEach((p, i) => {
          doc.text('•  ' + p, ML + colW / 2, yIni + i * 5);
        });
        y = yIni + meio * 5;
      }
      y += 3;
    }

    // ============== resumo executivo ==============
    const exec = reuniao.memoria && reuniao.memoria.executivo;
    if (exec) {
      tituloSecao('Resumo executivo');
      paragrafo(exec);
      y += 4;
    }

    // ============== assuntos e deliberações ==============
    if (assuntos.length > 0) {
      tituloSecao('Assuntos e deliberações');
      assuntos.forEach((a, idx) => {
        quebraPagina(18);

        // Numeração do assunto
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        setText(COR_TEXTO);
        const numAss = `${secao}.${idx + 1}`;
        doc.text(numAss, ML, y);
        const offsetTit = ML + 11;
        const tituloAss = doc.splitTextToSize(a.titulo || '(sem título)', colW - 11);
        doc.text(tituloAss, offsetTit, y);
        y += tituloAss.length * 5 + 1;

        // Subinfo
        const sub = [];
        if (a.dono) sub.push('Responsável: ' + a.dono);
        if (a.urgencia) sub.push('Urgência: ' + a.urgencia);
        const trat = a._tratamento ? ({ deliberar: 'Deliberado', adiar: 'Adiado', arquivar: 'Arquivado', continuar: 'Continuar pendente' })[a._tratamento] || a._tratamento : '';
        if (trat) sub.push('Tratamento: ' + trat);
        if (sub.length > 0) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(9);
          setText(COR_SECUNDARIA);
          doc.text(sub.join(' · '), offsetTit, y);
          y += 4;
          setText(COR_TEXTO);
        }

        // Notas do assunto
        if (a.notas) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          const linhas = doc.splitTextToSize(a.notas, colW - 11);
          linhas.forEach(l => {
            quebraPagina(4.5);
            doc.text(l, offsetTit, y);
            y += 4.3;
          });
          y += 1;
        }

        // Decisões deste assunto — em caixas destacadas
        const decs = (R ? R.decisoesDoAssunto(a.id) : []).filter(d => d.reuniao_id === reuniao.id);
        if (decs.length > 0) {
          y += 1;
          decs.forEach(d => {
            const corCat = corCategoria(d.categoria);
            const cat = labelCategoria(d.categoria);
            // Medir altura
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const textoLinhas = doc.splitTextToSize(d.texto || '', colW - 18);
            const alturaTexto = textoLinhas.length * 4.3;
            const alturaCaixa = alturaTexto + 9;
            quebraPagina(alturaCaixa + 2);

            // Caixa de fundo (cinza claro)
            setFill([248, 250, 252]);
            doc.rect(offsetTit, y, colW - 11, alturaCaixa, 'F');
            // Barra colorida lateral
            setFill(corCat);
            doc.rect(offsetTit, y, 1.4, alturaCaixa, 'F');
            // Tag da categoria
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5);
            setText(corCat);
            doc.text(cat.toUpperCase(), offsetTit + 4, y + 4);
            // Texto da decisão
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            setText(COR_TEXTO);
            textoLinhas.forEach((l, i) => {
              doc.text(l, offsetTit + 4, y + 8 + i * 4.3);
            });
            y += alturaCaixa + 2;
          });
        }
        y += 3;
      });
    }

    // ============== tarefas geradas (tabela) ==============
    if (tarefasGeradasIds.length > 0 && Array.isArray(window.tarefas)) {
      tituloSecao('Tarefas geradas');
      const linhas = window.tarefas
        .filter(t => tarefasGeradasIds.includes(t.id))
        .map(t => [
          t.titulo || '—',
          t.responsavel || '—',
          t.prazo ? fmtData(t.prazo) : '—',
          (t.prioridade || 'média').toString()
        ]);
      doc.autoTable({
        startY: y,
        head: [['Tarefa', 'Responsável', 'Prazo', 'Prioridade']],
        body: linhas,
        margin: { left: ML, right: MR },
        styles: {
          fontSize: 9.5, cellPadding: 2.5, textColor: COR_TEXTO, lineColor: COR_BORDA, lineWidth: 0.15
        },
        headStyles: {
          fillColor: COR_PRIMARIA, textColor: 255, fontStyle: 'bold', fontSize: 9.5
        },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        columnStyles: {
          1: { cellWidth: 35 },
          2: { cellWidth: 25, halign: 'center' },
          3: { cellWidth: 22, halign: 'center' }
        },
        theme: 'grid'
      });
      y = doc.lastAutoTable.finalY + 6;
    }

    // ============== assuntos remanescentes ==============
    const aberto = (reuniao.memoria && Array.isArray(reuniao.memoria.assuntos_em_aberto_ids)) ? reuniao.memoria.assuntos_em_aberto_ids : [];
    if (aberto.length > 0 && R) {
      tituloSecao('Assuntos remanescentes para a próxima reunião');
      aberto.forEach(aid => {
        const a = R.getAssunto(aid);
        if (!a) return;
        paragrafo('•  ' + a.titulo, { indent: 2 });
      });
      y += 3;
    }

    // ============== observações ==============
    const obs = reuniao.memoria && reuniao.memoria.observacoes;
    if (obs) {
      tituloSecao('Observações');
      // Caixa amarelo claro
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const linhas = doc.splitTextToSize(obs, colW - 8);
      const altura = linhas.length * 4.5 + 6;
      quebraPagina(altura);
      setFill(COR_DESTAQUE_AMARELO);
      setDraw(COR_DESTAQUE_AMARELO_BORDA);
      doc.setLineWidth(0.2);
      doc.rect(ML, y, colW, altura, 'FD');
      setText(COR_TEXTO);
      linhas.forEach((l, i) => {
        doc.text(l, ML + 4, y + 5 + i * 4.5);
      });
      y += altura + 4;
    }

    // ============== assinatura ==============
    quebraPagina(38);
    y = Math.max(y, H - MB - 40);
    setDraw([60, 60, 60]);
    doc.setLineWidth(0.3);
    doc.line(ML + 20, y, ML + 120, y);
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setText(COR_TEXTO);
    const aprovador = (reuniao.memoria && reuniao.memoria.aprovada_por) || 'Diretor-Executivo';
    doc.text(aprovador, ML + 20, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setText(COR_SECUNDARIA);
    doc.text('Diretoria Executiva · Cebraspe', ML + 20, y);

    rodape();
    // Atualiza contagem de páginas nos rodapés anteriores
    const total = doc.internal.getNumberOfPages();
    for (let p = 1; p <= total; p++) {
      doc.setPage(p);
      // Reescreve o "Página X de Y" correto
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      setFill([255, 255, 255]);
      doc.rect(W - MR - 30, H - 12, 30, 5, 'F');
      setText(COR_SECUNDARIA);
      doc.text(`Página ${p} de ${total}`, W - MR, H - 9, { align: 'right' });
      setText(COR_TEXTO);
    }

    const slug = (reuniao.titulo || ('reuniao-' + reuniao.numero))
      .toString()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      .slice(0, 60);
    const prefixo = ehPrevia ? 'previa-' : 'memoria-';
    const nome = `${prefixo}reuniao-${reuniao.numero || 's'}-${slug}.pdf`;
    doc.save(nome);
  }

  window.ReunioesPDF = { gerar };
})();
