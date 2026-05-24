/* revisao-interativa.js — Pop-up de revisão tarefa-a-tarefa
   Botão "Revisar tarefas uma a uma" abre modal sequencial.
   Para cada tarefa pendente: Concluir / Nova data / Editar / Pular.
   Salva via window.salvarTarefas() e window.renderTudo().
*/
(function () {
  'use strict';

  const STATUS_ROTULOS = {
    'a-fazer': 'A fazer',
    'em-andamento': 'Em andamento',
    'em-maturacao': 'Em maturação',
    'concluida': 'Concluída',
    'bloqueada': 'Bloqueada'
  };
  const PRIORIDADES = [
    ['alta', 'Alta'],
    ['media', 'Média'],
    ['baixa', 'Baixa']
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fmtData(iso) {
    if (!iso) return '—';
    const d = new Date(iso + 'T00:00');
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  let overlay = null;
  let idx = 0;
  let lista = [];
  let editandoCampos = false;

  function pendentes() {
    const todas = (window.tarefas || []);
    return todas.filter((t) => t.status !== 'concluida' && t.status !== 'cancelada');
  }

  function abrir() {
    lista = pendentes();
    if (!lista.length) {
      alert('Nenhuma tarefa pendente para revisar.');
      return;
    }
    idx = 0;
    editandoCampos = false;
    montarOverlay();
    renderEtapa();
  }

  function fechar() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
  }

  function montarOverlay() {
    fechar();
    overlay = document.createElement('div');
    overlay.className = 'dp-overlay';
    overlay.innerHTML = `
      <div class="dp-modal" role="dialog" aria-modal="true" aria-label="Revisão tarefa a tarefa">
        <div class="dp-modal__head">
          <h3>Revisão de tarefas pendentes</h3>
          <button class="dp-modal__close" type="button" aria-label="Fechar">×</button>
        </div>
        <div class="dp-modal__body" id="rev-int-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.dp-modal__close').addEventListener('click', fechar);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fechar();
    });
  }

  function renderEtapa() {
    if (!overlay) return;
    const body = overlay.querySelector('#rev-int-body');
    if (idx >= lista.length) {
      body.innerHTML = `
        <p style="margin:18px 0;font-size:15px">Revisão concluída — todas as ${lista.length} tarefas pendentes foram avaliadas.</p>
        <div class="rev-modal__actions">
          <button class="btn btn--primary" id="rev-int-finalizar" type="button">Fechar</button>
        </div>
      `;
      body.querySelector('#rev-int-finalizar').addEventListener('click', fechar);
      return;
    }
    const t = lista[idx];
    const total = lista.length;
    const counter = `Tarefa ${idx + 1} de ${total}`;
    const status = STATUS_ROTULOS[t.status] || t.status || '—';
    const prio = (PRIORIDADES.find((p) => p[0] === t.prioridade) || ['—', '—'])[1];

    if (!editandoCampos) {
      body.innerHTML = `
        <div class="rev-modal__counter">${counter}</div>
        <div class="rev-modal__task">
          <h4>${esc(t.titulo || '(sem título)')}</h4>
          <div class="rev-modal__meta">
            <span><strong>Status:</strong> ${esc(status)}</span>
            <span><strong>Prazo:</strong> ${fmtData(t.prazo)}</span>
            <span><strong>Prioridade:</strong> ${esc(prio)}</span>
            ${t.responsavel ? `<span><strong>Responsável:</strong> ${esc(t.responsavel)}</span>` : ''}
          </div>
          ${t.resultado ? `<div style="margin-top:8px;font-size:13px;color:#555"><strong>Resultado esperado:</strong> ${esc(t.resultado)}</div>` : ''}
        </div>
        <div class="rev-modal__actions">
          <button class="btn btn--primary" id="rev-int-concluir" type="button">Concluir</button>
          <button class="btn btn--secondary" id="rev-int-nova-data" type="button">Nova data</button>
          <button class="btn btn--ghost" id="rev-int-editar" type="button">Editar</button>
          <button class="btn btn--ghost" id="rev-int-pular" type="button">Pular</button>
        </div>
        <div id="rev-int-extra" style="margin-top:10px"></div>
      `;
      body.querySelector('#rev-int-concluir').addEventListener('click', () => acaoConcluir(t));
      body.querySelector('#rev-int-nova-data').addEventListener('click', () => mostrarDatePicker(t));
      body.querySelector('#rev-int-editar').addEventListener('click', () => {
        editandoCampos = true;
        renderEtapa();
      });
      body.querySelector('#rev-int-pular').addEventListener('click', () => avancar());
    } else {
      // Modo edição inline
      body.innerHTML = `
        <div class="rev-modal__counter">${counter} — editando</div>
        <div class="rev-modal__edit">
          <label class="full">Título
            <input type="text" id="rev-edit-titulo" value="${esc(t.titulo || '')}">
          </label>
          <label>Responsável
            <input type="text" id="rev-edit-responsavel" value="${esc(t.responsavel || '')}">
          </label>
          <label>Prazo
            <input type="date" id="rev-edit-prazo" value="${esc(t.prazo || '')}">
          </label>
          <label>Prioridade
            <select id="rev-edit-prioridade">
              ${PRIORIDADES.map((p) => `<option value="${p[0]}" ${t.prioridade === p[0] ? 'selected' : ''}>${p[1]}</option>`).join('')}
            </select>
          </label>
          <label>Status
            <select id="rev-edit-status">
              ${Object.entries(STATUS_ROTULOS).map(([v, r]) => `<option value="${v}" ${t.status === v ? 'selected' : ''}>${r}</option>`).join('')}
            </select>
          </label>
          <label class="full">Resultado esperado
            <textarea id="rev-edit-resultado">${esc(t.resultado || '')}</textarea>
          </label>
        </div>
        <div class="rev-modal__actions">
          <button class="btn btn--primary" id="rev-edit-salvar" type="button">Salvar e seguir</button>
          <button class="btn btn--ghost" id="rev-edit-cancelar" type="button">Cancelar edição</button>
        </div>
      `;
      body.querySelector('#rev-edit-salvar').addEventListener('click', () => salvarEdicao(t));
      body.querySelector('#rev-edit-cancelar').addEventListener('click', () => {
        editandoCampos = false;
        renderEtapa();
      });
    }
  }

  function mostrarDatePicker(t) {
    const extra = overlay.querySelector('#rev-int-extra');
    if (!extra) return;
    const atual = t.prazo || '';
    extra.innerHTML = `
      <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">
        <label style="display:flex;flex-direction:column;font-size:12px;color:#555;gap:3px">
          Nova data de conclusão
          <input type="date" id="rev-int-data-input" value="${esc(atual)}" style="padding:6px 8px;border:1px solid #ccc;border-radius:4px">
        </label>
        <button class="btn btn--primary btn--sm" id="rev-int-data-aplicar" type="button">Aplicar</button>
        <button class="btn btn--ghost btn--sm" id="rev-int-data-cancelar" type="button">Cancelar</button>
      </div>
    `;
    extra.querySelector('#rev-int-data-aplicar').addEventListener('click', () => {
      const val = extra.querySelector('#rev-int-data-input').value;
      if (!val) {
        alert('Selecione uma data.');
        return;
      }
      t.prazo = val;
      t.atualizadaEm = new Date().toISOString();
      persistir();
      avancar();
    });
    extra.querySelector('#rev-int-data-cancelar').addEventListener('click', () => {
      extra.innerHTML = '';
    });
  }

  function acaoConcluir(t) {
    t.status = 'concluida';
    t.concluidaEm = new Date().toISOString();
    t.atualizadaEm = t.concluidaEm;
    persistir();
    avancar();
  }

  function salvarEdicao(t) {
    const titulo = overlay.querySelector('#rev-edit-titulo').value.trim();
    if (!titulo) {
      alert('O título não pode ficar vazio.');
      return;
    }
    t.titulo = titulo;
    t.responsavel = overlay.querySelector('#rev-edit-responsavel').value.trim();
    t.prazo = overlay.querySelector('#rev-edit-prazo').value;
    t.prioridade = overlay.querySelector('#rev-edit-prioridade').value;
    t.status = overlay.querySelector('#rev-edit-status').value;
    t.resultado = overlay.querySelector('#rev-edit-resultado').value.trim();
    t.atualizadaEm = new Date().toISOString();
    persistir();
    editandoCampos = false;
    // Se virou concluída, avança; senão, mostra estado atualizado
    if (t.status === 'concluida') {
      avancar();
    } else {
      renderEtapa();
    }
  }

  function persistir() {
    try {
      if (typeof window.salvarTarefas === 'function') window.salvarTarefas();
      if (typeof window.renderTudo === 'function') window.renderTudo();
    } catch (e) {
      console.error('[revisao-interativa] erro ao salvar', e);
    }
  }

  function avancar() {
    idx += 1;
    editandoCampos = false;
    renderEtapa();
  }

  function instalar() {
    const btn = document.getElementById('btn-revisar-uma');
    if (!btn) return;
    btn.addEventListener('click', abrir);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', instalar);
  } else {
    instalar();
  }
})();
