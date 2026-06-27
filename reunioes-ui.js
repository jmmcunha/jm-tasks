/* reunioes-ui.js — UI do Sistema de Ciclo de Reuniões (Leva 35)
 *
 * Renderiza 5 telas dentro de #panel-reunioes:
 *   1) lista (rascunhos/encerradas)
 *   2) novo cabeçalho
 *   3) rascunho (pendências/novos assuntos/pauta)
 *   4) tratar (modal de tratamento de assunto)
 *   5) revisão final + encerrar
 *
 * Depende de window.Reunioes (reunioes.js).
 */
(function () {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }
  function toast(msg) {
    if (typeof window.notify === 'function') { window.notify(msg); return; }
    if (typeof window.toast === 'function') { window.toast(msg); return; }
    console.log('[reunioes]', msg);
  }
  // Estado da UI
  let _vista = 'lista';     // 'lista' | 'cabecalho' | 'rascunho' | 'revisao'
  let _reuniaoAtivaId = null;

  // ===========================================================
  // Render principal
  // ===========================================================
  function render() {
    const panel = $('#panel-reunioes');
    if (!panel) return;
    // Wrapper único
    panel.innerHTML = `
      <div class="reunioes-wrap container">
        <div id="re-screen"></div>
      </div>`;
    const screen = $('#re-screen', panel);
    if (_vista === 'lista') renderLista(screen);
    else if (_vista === 'cabecalho') renderCabecalho(screen);
    else if (_vista === 'rascunho') renderRascunho(screen);
    else if (_vista === 'revisao') renderRevisao(screen);
  }

  // ===========================================================
  // Tela 1 — lista de reuniões
  // ===========================================================
  function renderLista(root) {
    const R = window.Reunioes;
    const lista = R.listaReunioes();
    const rascunhos = lista.filter(r => r.status === 'rascunho');
    const encerradas = lista.filter(r => r.status === 'encerrada');

    root.innerHTML = `
      <header class="re-header">
        <h2 class="re-title">Reuniões</h2>
        <button class="btn btn-primary" id="re-nova">+ Nova reunião</button>
      </header>

      <section class="re-section">
        <h3 class="re-subtitle">Rascunhos <span class="re-count">${rascunhos.length}</span></h3>
        <div class="re-list" id="re-list-rascunhos">
          ${rascunhos.length === 0 ? '<p class="re-empty">Nenhum rascunho.</p>' : rascunhos.map(linhaReuniao).join('')}
        </div>
      </section>

      <section class="re-section">
        <h3 class="re-subtitle">Encerradas <span class="re-count">${encerradas.length}</span></h3>
        <div class="re-list" id="re-list-encerradas">
          ${encerradas.length === 0 ? '<p class="re-empty">Nenhuma reunião encerrada ainda.</p>' : encerradas.map(linhaReuniao).join('')}
        </div>
      </section>`;

    $('#re-nova', root).addEventListener('click', () => {
      _vista = 'cabecalho'; _reuniaoAtivaId = null; render();
    });
    $$('[data-acao]', root).forEach(b => {
      b.addEventListener('click', (e) => {
        const id = b.getAttribute('data-id');
        const acao = b.getAttribute('data-acao');
        if (acao === 'abrir') { _reuniaoAtivaId = id; _vista = 'rascunho'; render(); }
        else if (acao === 'revisar') { _reuniaoAtivaId = id; _vista = 'revisao'; render(); }
        else if (acao === 'ver') { _reuniaoAtivaId = id; _vista = 'revisao'; render(); }
        else if (acao === 'pdf') {
          const r = window.Reunioes.getReuniao(id);
          if (r && window.ReunioesPDF) window.ReunioesPDF.gerar(r);
        }
        else if (acao === 'excluir') {
          if (confirm('Excluir o rascunho desta reunião? Esta ação não pode ser desfeita.')) {
            const ok = window.Reunioes.excluirReuniao(id);
            if (ok) { toast('Rascunho excluído.'); render(); }
            else toast('Não foi possível excluir.');
          }
        }
      });
    });
  }

  function linhaReuniao(r) {
    const R = window.Reunioes;
    const nAss = (Array.isArray(r.pauta_ids) ? r.pauta_ids.length : 0);
    const nDec = R.decisoesDaReuniao(r.id).length;
    const dataFmt = R.fmtData(r.data) || '—';
    const horaFmt = r.hora || '';
    const titulo = esc(r.titulo) || `Reunião nº ${r.numero}`;
    const tag = r.sensivel ? '<span class="re-tag re-tag--sens">Reservado</span>' : '';
    const acoes = r.status === 'rascunho'
      ? `<button class="btn btn-sm" data-acao="abrir" data-id="${r.id}">Continuar</button>
         <button class="btn btn-sm" data-acao="revisar" data-id="${r.id}">Revisar e encerrar</button>
         <button class="btn btn-sm btn-ghost" data-acao="excluir" data-id="${r.id}">Excluir</button>`
      : `<button class="btn btn-sm" data-acao="ver" data-id="${r.id}">Abrir memória</button>
         <button class="btn btn-sm" data-acao="pdf" data-id="${r.id}">PDF</button>`;
    return `
      <article class="re-card">
        <div class="re-card__head">
          <div>
            <div class="re-card__num">Reunião nº ${r.numero}</div>
            <div class="re-card__title">${titulo} ${tag}</div>
            <div class="re-card__meta">${dataFmt}${horaFmt ? ' às ' + esc(horaFmt) : ''}${r.local ? ' · ' + esc(r.local) : ''}</div>
          </div>
          <div class="re-card__stats">
            <span title="Assuntos em pauta">${nAss} assunto${nAss === 1 ? '' : 's'}</span>
            <span title="Decisões registradas">${nDec} decis${nDec === 1 ? 'ão' : 'ões'}</span>
          </div>
        </div>
        <div class="re-card__acoes">${acoes}</div>
      </article>`;
  }

  // ===========================================================
  // Tela 2 — cabeçalho (criar/editar)
  // ===========================================================
  function renderCabecalho(root) {
    const R = window.Reunioes;
    const editando = _reuniaoAtivaId ? R.getReuniao(_reuniaoAtivaId) : null;
    const hoje = new Date().toISOString().slice(0, 10);

    root.innerHTML = `
      <header class="re-header">
        <button class="btn btn-ghost" id="re-voltar">← Voltar</button>
        <h2 class="re-title">${editando ? 'Editar cabeçalho' : 'Nova reunião'}</h2>
      </header>

      <form id="re-form-cab" class="re-form">
        <label class="re-field">
          <span>Título da reunião</span>
          <input type="text" id="re-titulo" required maxlength="200"
                 placeholder="ex.: 6ª reunião estratégica do gabinete"
                 value="${esc(editando ? editando.titulo : '')}">
          <small class="re-hint">Este texto aparece no PDF final como "Memória de Reunião — &lt;título&gt;".</small>
        </label>

        <div class="re-row">
          <label class="re-field">
            <span>Data</span>
            <input type="date" id="re-data" required value="${esc(editando ? editando.data : hoje)}">
          </label>
          <label class="re-field">
            <span>Hora</span>
            <input type="time" id="re-hora" value="${esc(editando ? editando.hora : '14:00')}">
          </label>
        </div>

        <label class="re-field">
          <span>Local</span>
          <input type="text" id="re-local" maxlength="200"
                 placeholder="ex.: Gabinete da Diretoria Executiva — Cebraspe"
                 value="${esc(editando ? editando.local : 'Gabinete da Diretoria Executiva — Cebraspe')}">
        </label>

        <label class="re-field">
          <span>Participantes (um por linha)</span>
          <textarea id="re-participantes" rows="4" placeholder="Nome — Cargo">${esc(editando && Array.isArray(editando.participantes) ? editando.participantes.join('\n') : '')}</textarea>
        </label>

        <label class="re-field re-field--inline">
          <input type="checkbox" id="re-sensivel" ${editando && editando.sensivel ? 'checked' : ''}>
          <span>Reunião reservada (conteúdo sensível)</span>
        </label>

        <div class="re-form__acoes">
          <button type="submit" class="btn btn-primary">${editando ? 'Salvar cabeçalho' : 'Criar e abrir pauta'}</button>
          <button type="button" class="btn btn-ghost" id="re-cancelar">Cancelar</button>
        </div>
      </form>`;

    $('#re-voltar', root).addEventListener('click', () => { _vista = 'lista'; render(); });
    $('#re-cancelar', root).addEventListener('click', () => { _vista = 'lista'; render(); });
    $('#re-form-cab', root).addEventListener('submit', (e) => {
      e.preventDefault();
      const dados = {
        titulo: $('#re-titulo').value.trim(),
        data: $('#re-data').value,
        hora: $('#re-hora').value,
        local: $('#re-local').value.trim(),
        participantes: $('#re-participantes').value.split('\n').map(s => s.trim()).filter(Boolean),
        sensivel: $('#re-sensivel').checked
      };
      if (!dados.titulo) { toast('Informe o título da reunião.'); return; }
      if (!dados.data) { toast('Informe a data da reunião.'); return; }
      if (editando) {
        R.atualizarReuniao(editando.id, dados);
        toast('Cabeçalho atualizado.');
      } else {
        const r = R.criarReuniao(dados);
        _reuniaoAtivaId = r.id;
        toast('Reunião criada. Monte a pauta.');
      }
      _vista = 'rascunho';
      render();
    });
  }

  // ===========================================================
  // Tela 3 — rascunho (pendências + novos assuntos + pauta)
  // ===========================================================
  function renderRascunho(root) {
    const R = window.Reunioes;
    const r = R.getReuniao(_reuniaoAtivaId);
    if (!r) { _vista = 'lista'; render(); return; }

    const pend = R.pendenciasHerdadas(r.id);
    const naPauta = R.assuntosDaReuniao(r.id);

    root.innerHTML = `
      <header class="re-header">
        <button class="btn btn-ghost" id="re-voltar">← Voltar à lista</button>
        <div class="re-title-wrap">
          <h2 class="re-title">Reunião nº ${r.numero} — ${esc(r.titulo)}</h2>
          <p class="re-sub">${R.fmtData(r.data)}${r.hora ? ' às ' + esc(r.hora) : ''}${r.local ? ' · ' + esc(r.local) : ''}</p>
        </div>
        <button class="btn btn-ghost btn-sm" id="re-editar-cab">Editar cabeçalho</button>
      </header>

      <section class="re-block">
        <h3 class="re-subtitle">Pendências herdadas (tarefas em aberto)</h3>
        <p class="re-hint">Marque as tarefas que vão entrar nesta pauta como assuntos.</p>
        <div class="re-pendencias">
          ${pend.length === 0 ? '<p class="re-empty">Sem pendências em aberto. Tudo limpo.</p>' :
            pend.map(t => `
              <label class="re-pend-item">
                <input type="checkbox" class="re-pend-check" data-tid="${esc(t.id)}">
                <div class="re-pend-meta">
                  <div class="re-pend-tit">${esc(t.titulo)}</div>
                  <div class="re-pend-sub">
                    ${t.responsavel ? esc(t.responsavel) + ' · ' : ''}${t.prazo ? 'prazo ' + R.fmtData(t.prazo) : 'sem prazo'} · ${esc(t.status)}
                  </div>
                </div>
              </label>`).join('')}
        </div>
        ${pend.length > 0 ? '<button class="btn btn-sm" id="re-herdar">Trazer selecionadas para a pauta</button>' : ''}
      </section>

      <section class="re-block">
        <h3 class="re-subtitle">Novo assunto</h3>
        <form class="re-form re-form--inline" id="re-form-assunto">
          <input type="text" id="re-novo-titulo" placeholder="Título do assunto" required maxlength="200">
          <input type="text" id="re-novo-dono" placeholder="Responsável (opcional)" maxlength="80">
          <select id="re-novo-urgencia">
            <option value="baixa">Urgência baixa</option>
            <option value="media" selected>Urgência média</option>
            <option value="alta">Urgência alta</option>
          </select>
          <input type="number" id="re-novo-min" placeholder="min" min="0" max="240" style="max-width:80px">
          <button type="submit" class="btn">+ Adicionar</button>
        </form>
        <textarea id="re-novo-notas" placeholder="Notas (opcional)" rows="2" class="re-novo-notas"></textarea>
      </section>

      <section class="re-block">
        <h3 class="re-subtitle">Pauta consolidada <span class="re-count">${naPauta.length}</span></h3>
        ${naPauta.length === 0 ? '<p class="re-empty">A pauta está vazia.</p>' :
          `<ol class="re-pauta">${naPauta.map(a => itemPauta(a, r)).join('')}</ol>`}
      </section>

      <section class="re-block">
        <h3 class="re-subtitle">Anexos da reunião</h3>
        <p class="re-hint">Suba PDFs, imagens ou áudios. A IA pode propor assuntos, decisões e tarefas a partir do conteúdo.</p>
        <div id="re-anexos-box"></div>
      </section>

      <div class="re-acoes-fim">
        <button class="btn btn-primary" id="re-ir-revisao" ${naPauta.length === 0 ? 'disabled' : ''}>
          Ir para revisão e encerramento →
        </button>
      </div>`;

    $('#re-voltar', root).addEventListener('click', () => { _vista = 'lista'; render(); });
    $('#re-editar-cab', root).addEventListener('click', () => { _vista = 'cabecalho'; render(); });
    $('#re-ir-revisao', root).addEventListener('click', () => { _vista = 'revisao'; render(); });

    const btnHerdar = $('#re-herdar', root);
    if (btnHerdar) btnHerdar.addEventListener('click', () => {
      const sel = $$('.re-pend-check:checked', root).map(c => c.getAttribute('data-tid'));
      if (sel.length === 0) { toast('Selecione pelo menos uma pendência.'); return; }
      for (const tid of sel) R.herdarTarefa(r.id, tid);
      toast(`${sel.length} pendência(s) trazida(s) para a pauta.`);
      render();
    });

    $('#re-form-assunto', root).addEventListener('submit', (e) => {
      e.preventDefault();
      const tit = $('#re-novo-titulo').value.trim();
      if (!tit) return;
      const a = R.criarAssunto({
        titulo: tit,
        dono: $('#re-novo-dono').value.trim(),
        urgencia: $('#re-novo-urgencia').value,
        estimativa_min: Number($('#re-novo-min').value) || 0,
        notas: $('#re-novo-notas').value.trim(),
        reuniao_origem_id: r.id
      });
      R.adicionarNaPauta(r.id, a.id);
      toast('Assunto adicionado à pauta.');
      render();
    });

    // Caixa de anexos (nível reunião)
    const boxAnx = $('#re-anexos-box', root);
    if (boxAnx && window.ReunioesAnexosUI) {
      window.ReunioesAnexosUI.montarBox(boxAnx, r, { onMudou: () => render() });
    }

    $$('[data-pauta-acao]', root).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-aid');
        const acao = btn.getAttribute('data-pauta-acao');
        if (acao === 'remover') {
          if (confirm('Remover este assunto da pauta?')) {
            R.removerDaPauta(r.id, id);
            render();
          }
        } else if (acao === 'tratar') {
          abrirModalTratar(r.id, id);
        }
      });
    });
  }

  function itemPauta(a, r) {
    const R = window.Reunioes;
    const decs = R.decisoesDoAssunto(a.id).filter(d => d.reuniao_id === r.id);
    const trat = a._tratamento ? `<span class="re-tag">${labelTrat(a._tratamento)}</span>` : '';
    const urg = a.urgencia ? `<span class="re-urg re-urg--${esc(a.urgencia)}">${esc(a.urgencia)}</span>` : '';
    const tarefaOrigem = a.origem === 'herdado_tarefa_aberta' ? '<span class="re-tag re-tag--orig">vinda de tarefa</span>' : '';
    return `
      <li class="re-pauta-item">
        <div class="re-pauta-head">
          <div>
            <div class="re-pauta-tit">${esc(a.titulo)} ${urg} ${trat} ${tarefaOrigem}</div>
            <div class="re-pauta-sub">${a.dono ? esc(a.dono) + ' · ' : ''}${a.estimativa_min ? esc(a.estimativa_min) + ' min · ' : ''}${R.labelStatusAssunto(a.status)}</div>
          </div>
          <div class="re-pauta-acoes">
            <button class="btn btn-sm" data-pauta-acao="tratar" data-aid="${a.id}">Tratar</button>
            <button class="btn btn-sm btn-ghost" data-pauta-acao="remover" data-aid="${a.id}">Remover</button>
          </div>
        </div>
        ${a.notas ? `<div class="re-pauta-notas">${esc(a.notas)}</div>` : ''}
        ${decs.length > 0 ? `<ul class="re-pauta-decs">${decs.map(d => `<li><span class="re-cat re-cat--${esc(d.categoria)}">${R.labelCategoria(d.categoria)}</span> ${esc(d.texto)}</li>`).join('')}</ul>` : ''}
      </li>`;
  }
  function labelTrat(t) {
    return ({ deliberar: 'Deliberado', adiar: 'Adiado', arquivar: 'Arquivado', continuar: 'Continuar' })[t] || t;
  }

  // ===========================================================
  // Modal — tratar assunto (Tela 4)
  // ===========================================================
  function abrirModalTratar(reuniaoId, assuntoId) {
    const R = window.Reunioes;
    const a = R.getAssunto(assuntoId);
    if (!a) return;

    const decsExistentes = R.decisoesDoAssunto(assuntoId).filter(d => d.reuniao_id === reuniaoId);

    const modal = document.createElement('div');
    modal.className = 're-modal';
    modal.innerHTML = `
      <div class="re-modal__bg"></div>
      <div class="re-modal__box" role="dialog" aria-modal="true">
        <header class="re-modal__head">
          <h3>Tratar assunto</h3>
          <button class="btn btn-ghost btn-sm" id="re-modal-fechar">✕</button>
        </header>
        <div class="re-modal__body">
          <div class="re-modal-assunto">
            <div class="re-modal-tit">${esc(a.titulo)}</div>
            <div class="re-modal-sub">${a.dono ? 'Responsável: ' + esc(a.dono) : 'Sem responsável'} · Urgência ${esc(a.urgencia)}</div>
          </div>

          <fieldset class="re-modal-grupo">
            <legend>Tratamento</legend>
            <label class="re-radio"><input type="radio" name="trat" value="deliberar" checked> Deliberar (gera decisões)</label>
            <label class="re-radio"><input type="radio" name="trat" value="adiar"> Adiar para próxima reunião</label>
            <label class="re-radio"><input type="radio" name="trat" value="continuar"> Continuar pendente</label>
            <label class="re-radio"><input type="radio" name="trat" value="arquivar"> Arquivar (sem ação)</label>
          </fieldset>

          <fieldset class="re-modal-grupo">
            <legend>Anexos deste assunto</legend>
            <div id="re-modal-anexos"></div>
          </fieldset>

          <fieldset class="re-modal-grupo" id="re-grupo-decisoes">
            <legend>Decisões deste assunto</legend>
            <div id="re-decs-lista">
              ${decsExistentes.map(d => renderDecisaoLinha(d)).join('') || '<p class="re-empty">Nenhuma decisão ainda.</p>'}
            </div>
            <div class="re-add-dec">
              <select id="re-nova-cat">
                <option value="delegacao_interna">Delegação interna</option>
                <option value="decisao_externa">Decisão (externa à organização)</option>
                <option value="encaminhamento">Encaminhamento</option>
                <option value="informe">Informe</option>
              </select>
              <input type="text" id="re-nova-texto" placeholder="Texto da decisão" maxlength="300">
              <button class="btn btn-sm" id="re-nova-add">+ Adicionar decisão</button>
            </div>
          </fieldset>
        </div>
        <footer class="re-modal__foot">
          <button class="btn btn-primary" id="re-modal-salvar">Salvar tratamento</button>
          <button class="btn btn-ghost" id="re-modal-cancelar">Cancelar</button>
        </footer>
      </div>`;
    document.body.appendChild(modal);

    function fechar() { document.body.removeChild(modal); }
    $('#re-modal-fechar', modal).addEventListener('click', fechar);
    $('#re-modal-cancelar', modal).addEventListener('click', fechar);
    $('.re-modal__bg', modal).addEventListener('click', fechar);

    // toggle decisões: só visível se "deliberar"
    function atualizarVisibilidade() {
      const sel = $('input[name=trat]:checked', modal).value;
      $('#re-grupo-decisoes', modal).style.display = (sel === 'deliberar') ? '' : 'none';
    }
    $$('input[name=trat]', modal).forEach(r => r.addEventListener('change', atualizarVisibilidade));
    atualizarVisibilidade();

    $('#re-nova-add', modal).addEventListener('click', () => {
      const cat = $('#re-nova-cat', modal).value;
      const txt = $('#re-nova-texto', modal).value.trim();
      if (!txt) { toast('Informe o texto da decisão.'); return; }
      const d = R.criarDecisao({ texto: txt, categoria: cat, assunto_id: assuntoId, reuniao_id: reuniaoId });
      const cont = $('#re-decs-lista', modal);
      // Remove "nenhuma decisão" se estava
      const vazio = cont.querySelector('.re-empty');
      if (vazio) vazio.remove();
      cont.insertAdjacentHTML('beforeend', renderDecisaoLinha(d));
      bindDecisaoLinhas(modal);
      $('#re-nova-texto', modal).value = '';
    });
    bindDecisaoLinhas(modal);

    // Caixa de anexos vinculados a este assunto
    const boxAnxModal = $('#re-modal-anexos', modal);
    if (boxAnxModal && window.ReunioesAnexosUI) {
      const r = R.getReuniao(reuniaoId);
      window.ReunioesAnexosUI.montarBox(boxAnxModal, r, { assuntoId, onMudou: () => {} });
    }

    $('#re-modal-salvar', modal).addEventListener('click', () => {
      const sel = $('input[name=trat]:checked', modal).value;
      R.tratarAssunto(assuntoId, sel);
      fechar();
      render();
    });
  }

  function renderDecisaoLinha(d) {
    const R = window.Reunioes;
    return `
      <div class="re-dec-linha" data-did="${d.id}">
        <span class="re-cat re-cat--${esc(d.categoria)}">${R.labelCategoria(d.categoria)}</span>
        <input type="text" class="re-dec-text" value="${esc(d.texto)}" maxlength="300">
        <button class="btn btn-sm btn-ghost" data-dec-acao="excluir">✕</button>
      </div>`;
  }
  function bindDecisaoLinhas(modal) {
    $$('.re-dec-linha', modal).forEach(linha => {
      if (linha._bound) return;
      linha._bound = true;
      const did = linha.getAttribute('data-did');
      const inp = $('.re-dec-text', linha);
      inp.addEventListener('change', () => {
        window.Reunioes.atualizarDecisao(did, { texto: inp.value.trim() });
      });
      $('[data-dec-acao=excluir]', linha).addEventListener('click', () => {
        if (confirm('Excluir esta decisão?')) {
          window.Reunioes.excluirDecisao(did);
          linha.remove();
        }
      });
    });
  }

  // ===========================================================
  // Tela 5 — revisão final + encerrar
  // ===========================================================
  function renderRevisao(root) {
    const R = window.Reunioes;
    const r = R.getReuniao(_reuniaoAtivaId);
    if (!r) { _vista = 'lista'; render(); return; }

    const assuntosP = R.assuntosDaReuniao(r.id);
    const decs = R.decisoesDaReuniao(r.id);
    const encerrada = r.status === 'encerrada';
    const podeEncer = R.podeEncerrar();

    // Lista de decisões com checkbox "gerar tarefa?" + campos responsável/prazo/prioridade.
    // Padrão: marcado para delegacao_interna, desmarcado para informe; demais marcado.
    function defaultGerar(d) {
      if (d.categoria === 'informe') return false;
      return true;
    }

    root.innerHTML = `
      <header class="re-header">
        <button class="btn btn-ghost" id="re-voltar">← Voltar</button>
        <div class="re-title-wrap">
          <h2 class="re-title">Revisão — Reunião nº ${r.numero}</h2>
          <p class="re-sub">${esc(r.titulo)} · ${R.fmtData(r.data)}</p>
        </div>
        ${encerrada ? '<span class="re-tag re-tag--ok">Encerrada</span>' : ''}
      </header>

      <section class="re-block">
        <h3 class="re-subtitle">Resumo executivo</h3>
        <textarea id="re-executivo" rows="4" placeholder="Breve resumo do que foi discutido (aparece no PDF)." ${encerrada ? 'readonly' : ''}>${esc(r.memoria && r.memoria.executivo || '')}</textarea>
      </section>

      <section class="re-block">
        <h3 class="re-subtitle">Assuntos tratados (${assuntosP.length})</h3>
        ${assuntosP.length === 0 ? '<p class="re-empty">Sem assuntos.</p>' :
          `<ul class="re-rev-assuntos">${assuntosP.map(a => `
            <li>
              <strong>${esc(a.titulo)}</strong>
              <span class="re-tag">${labelTrat(a._tratamento) || R.labelStatusAssunto(a.status)}</span>
              ${a.notas ? `<div class="re-rev-notas">${esc(a.notas)}</div>` : ''}
            </li>`).join('')}</ul>`}
      </section>

      <section class="re-block">
        <h3 class="re-subtitle">Decisões e geração de tarefas (${decs.length})</h3>
        ${decs.length === 0 ? '<p class="re-empty">Nenhuma decisão registrada.</p>' :
          `<div class="re-rev-decs">${decs.map(d => decisaoRev(d, defaultGerar(d), encerrada)).join('')}</div>`}
      </section>

      <section class="re-block">
        <h3 class="re-subtitle">Observações adicionais</h3>
        <textarea id="re-obs" rows="3" placeholder="Observações livres (aparece no PDF)." ${encerrada ? 'readonly' : ''}>${esc(r.memoria && r.memoria.observacoes || '')}</textarea>
      </section>

      ${!encerrada && decs.length === 0 ? `
        <div class="re-aviso-amarelo">
          <strong>Nenhuma decisão registrada.</strong>
          Encerrar agora gera memória sem tarefas. Volte aos assuntos da pauta para registrar decisões antes.
          <button class="btn btn-sm" id="re-voltar-tratar">Voltar para tratar assuntos</button>
        </div>
      ` : ''}

      <div class="re-acoes-fim">
        ${!encerrada ? `
          <button class="btn btn-secondary" id="re-previa-pdf" title="Visualiza o PDF sem encerrar">Prévia do PDF</button>
          <button class="btn btn-primary" id="re-encerrar" ${podeEncer ? '' : 'disabled title="Apenas o e-mail autorizado pode encerrar reuniões"'}>
            ${podeEncer ? 'Encerrar reunião e gerar memória' : 'Encerrar (acesso restrito)'}
          </button>
          ${!podeEncer ? `<p class="re-hint">Acesso restrito a ${esc(R.EMAIL_ENCERRADOR)}. Detectado: <strong>${esc(R.emailLogado && R.emailLogado() || 'não detectado')}</strong></p>` : ''}
        ` : `
          <button class="btn btn-primary" id="re-pdf">Gerar PDF da memória</button>
          <span class="re-hint">Aprovada em ${r.memoria && r.memoria.aprovada_em ? new Date(r.memoria.aprovada_em).toLocaleString('pt-BR') : '—'} por ${esc(r.memoria && r.memoria.aprovada_por || '—')}</span>
        `}
      </div>`;

    $('#re-voltar', root).addEventListener('click', () => {
      _vista = encerrada ? 'lista' : 'rascunho'; render();
    });
    const btnVoltarTratar = $('#re-voltar-tratar', root);
    if (btnVoltarTratar) btnVoltarTratar.addEventListener('click', () => {
      _vista = 'rascunho'; render();
    });
    const btnPdf = $('#re-pdf', root);
    if (btnPdf) btnPdf.addEventListener('click', () => {
      if (window.ReunioesPDF) window.ReunioesPDF.gerar(r);
      else toast('Módulo de PDF não carregado.');
    });
    const btnPrevia = $('#re-previa-pdf', root);
    if (btnPrevia) btnPrevia.addEventListener('click', () => {
      if (!window.ReunioesPDF) { toast('Módulo de PDF não carregado.'); return; }
      // Monta uma cópia temporária com executivo/observações do formulário (sem persistir)
      const previa = JSON.parse(JSON.stringify(r));
      previa.memoria = previa.memoria || {};
      previa.memoria.executivo = ($('#re-executivo', root) || {}).value || previa.memoria.executivo || '';
      previa.memoria.observacoes = ($('#re-obs', root) || {}).value || previa.memoria.observacoes || '';
      previa._previa = true;
      window.ReunioesPDF.gerar(previa);
    });

    const btnEnc = $('#re-encerrar', root);
    if (btnEnc) btnEnc.addEventListener('click', () => {
      if (!R.podeEncerrar()) { toast('Sem permissão para encerrar.'); return; }
      const geracoes = {};
      const detalhes = {};
      $$('.re-dec-rev', root).forEach(box => {
        const did = box.getAttribute('data-did');
        geracoes[did] = $('.re-dec-rev-gerar', box).checked;
        detalhes[did] = {
          responsavel: $('.re-dec-rev-resp', box).value.trim(),
          prazo: $('.re-dec-rev-prazo', box).value,
          prioridade: $('.re-dec-rev-prio', box).value
        };
      });
      const executivo = $('#re-executivo', root).value.trim();
      const observacoes = $('#re-obs', root).value.trim();
      if (!confirm('Encerrar a reunião e criar as tarefas marcadas? Esta ação não pode ser desfeita.')) return;
      try {
        R.encerrarReuniao({
          reuniaoId: r.id,
          executivo,
          observacoes,
          geracoesTarefa: geracoes,
          tarefaDetalhes: detalhes
        });
        toast('Reunião encerrada. Memória gerada.');
        // Sincroniza UI de tarefas se existir.
        if (typeof window.renderTudo === 'function') window.renderTudo();
        if (window.ReunioesPDF) {
          // Abre PDF automaticamente após encerrar.
          setTimeout(() => window.ReunioesPDF.gerar(window.Reunioes.getReuniao(r.id)), 300);
        }
        render();
      } catch (err) {
        alert(err.message || 'Falha ao encerrar.');
      }
    });
  }

  function decisaoRev(d, gerarPadrao, encerrada) {
    const R = window.Reunioes;
    const tarefasJaCriadas = Array.isArray(d.tarefas_geradas_ids) ? d.tarefas_geradas_ids.length : 0;
    return `
      <div class="re-dec-rev" data-did="${d.id}">
        <div class="re-dec-rev-head">
          <span class="re-cat re-cat--${esc(d.categoria)}">${R.labelCategoria(d.categoria)}</span>
          <span class="re-dec-rev-texto">${esc(d.texto)}</span>
        </div>
        ${encerrada ? `
          <div class="re-dec-rev-info">
            ${tarefasJaCriadas > 0 ? `<span class="re-tag re-tag--ok">${tarefasJaCriadas} tarefa(s) criada(s)</span>` : '<span class="re-tag">sem tarefa</span>'}
          </div>
        ` : `
          <div class="re-dec-rev-form">
            <label class="re-radio">
              <input type="checkbox" class="re-dec-rev-gerar" ${gerarPadrao ? 'checked' : ''}>
              Gerar tarefa
            </label>
            <input type="text" class="re-dec-rev-resp" placeholder="Responsável" maxlength="80">
            <input type="date" class="re-dec-rev-prazo">
            <select class="re-dec-rev-prio">
              <option value="baixa">prioridade baixa</option>
              <option value="media" selected>prioridade média</option>
              <option value="alta">prioridade alta</option>
            </select>
          </div>
        `}
      </div>`;
  }

  // ===========================================================
  // Entrada — chamada ao trocar para a aba "reunioes"
  // ===========================================================
  window.renderReunioes = render;

  // Quando o app trocar de aba para reunioes, ele dispara um evento.
  document.addEventListener('reunioes:reset', () => { _vista = 'lista'; _reuniaoAtivaId = null; render(); });

  // Abre uma reunião específica (usado pelo rótulo nas tarefas).
  window.abrirReuniao = function (reuniaoId) {
    const r = window.Reunioes && window.Reunioes.getReuniao(reuniaoId);
    if (!r) return;
    _reuniaoAtivaId = reuniaoId;
    _vista = (r.status === 'encerrada') ? 'revisao' : 'rascunho';
    if (typeof window.trocarAba === 'function') window.trocarAba('reunioes');
    else {
      const tab = document.querySelector('.tab[data-tab="reunioes"]');
      if (tab) tab.click();
    }
    setTimeout(render, 50);
  };
})();
