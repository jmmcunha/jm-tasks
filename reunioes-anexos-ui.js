/* reunioes-anexos-ui.js — Leva 36
 * UI dos anexos: caixa de upload/gravação + painel de sugestões da IA.
 *
 * API:
 *   window.ReunioesAnexosUI.montarBox(container, reuniao, opts)
 *     - opts.assuntoId: se presente, anexo nasce "vinculado" a um assunto (Tela 4)
 *     - opts.onMudou: callback após upload/remoção/análise (re-render externo)
 *   window.ReunioesAnexosUI.toast(msg)
 */
(function () {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function toast(msg) {
    if (typeof window.notify === 'function') return window.notify(msg);
    if (typeof window.toast === 'function') return window.toast(msg);
    console.log('[anexos-ui]', msg);
  }

  function iconePorTipo(t) {
    switch (t) {
      case 'pdf': return '📄';
      case 'imagem': return '🖼️';
      case 'audio': return '🎙️';
      case 'documento': return '📝';
      default: return '📎';
    }
  }

  function montarBox(container, reuniao, opts) {
    opts = opts || {};
    const assuntoId = opts.assuntoId || '';
    const podeAnalisar = !!(window.IAGemini && window.IAGemini.temChave && window.IAGemini.temChave());

    function reler() {
      // pega a versão fresca da reunião do estado (após upload Firestore propaga)
      const r = window.Reunioes && window.Reunioes.getReuniao
        ? window.Reunioes.getReuniao(reuniao.id) || reuniao
        : reuniao;
      const anexos = (window.ReunioesAnexos.listar(r) || [])
        .filter((a) => assuntoId ? a.assuntoId === assuntoId : !a.assuntoId);
      return { r, anexos };
    }

    function render() {
      const { r, anexos } = reler();
      container.innerHTML = `
        <div class="re-anx-box">
          <div class="re-anx-head">
            <strong class="re-anx-title">Anexos${assuntoId ? ' deste assunto' : ' da reunião'}</strong>
            <div class="re-anx-controls">
              <label class="btn btn-sm" title="Subir um PDF, imagem ou áudio">
                <input type="file" class="re-anx-input" hidden accept=".pdf,application/pdf,image/*,audio/*,.doc,.docx">
                + Anexar arquivo
              </label>
              <button class="btn btn-sm re-anx-gravar" type="button" title="Gravar áudio do microfone">
                ● Gravar áudio
              </button>
              <span class="re-anx-rec-status" hidden>
                <span class="re-anx-rec-dot"></span>
                <span class="re-anx-rec-tempo">0s</span>
                <button class="btn btn-sm btn-ghost re-anx-parar" type="button">Parar e enviar</button>
              </span>
            </div>
          </div>
          <div class="re-anx-progresso" hidden>
            <div class="re-anx-progresso-bar"></div>
            <span class="re-anx-progresso-txt"></span>
          </div>
          ${anexos.length === 0
            ? '<p class="re-empty">Nenhum anexo ainda. Você pode subir PDF, imagem ou áudio.</p>'
            : `<ul class="re-anx-lista">${anexos.map((a) => renderItem(a, r)).join('')}</ul>`}
          <div class="re-anx-sugestoes-host"></div>
        </div>`;

      bind(container, r);
    }

    function renderItem(a, r) {
      const data = a.criadoEm ? new Date(a.criadoEm).toLocaleString('pt-BR') : '';
      const tam = window.ReunioesAnexos.formatarTamanho(a.tamanho || 0);
      const podeIa = podeAnalisar && ['audio', 'imagem', 'pdf'].includes(a.tipo);
      const jaAnalisou = a.ia && a.ia.geradoEm;
      return `
        <li class="re-anx-item" data-anx="${esc(a.id)}">
          <span class="re-anx-icone">${iconePorTipo(a.tipo)}</span>
          <div class="re-anx-meta">
            <a href="${esc(a.url)}" target="_blank" rel="noopener" class="re-anx-nome">${esc(a.nome)}</a>
            <div class="re-anx-sub">${esc(a.tipo)} · ${esc(tam)}${data ? ' · ' + esc(data) : ''}${jaAnalisou ? ' · IA analisado' : ''}</div>
          </div>
          <div class="re-anx-acoes">
            ${podeIa ? `<button class="btn btn-sm re-anx-analisar" data-anx="${esc(a.id)}">${jaAnalisou ? 'Reanalisar' : 'Analisar com IA'}</button>` : ''}
            <button class="btn btn-sm btn-ghost re-anx-remover" data-anx="${esc(a.id)}">Remover</button>
          </div>
        </li>`;
    }

    function bind(root, r) {
      // Upload por arquivo
      const inp = $('.re-anx-input', root);
      inp.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        await fazerUpload(file, r);
        inp.value = '';
      });

      // Gravar áudio
      const btnGravar = $('.re-anx-gravar', root);
      const recStatus = $('.re-anx-rec-status', root);
      const recTempo = $('.re-anx-rec-tempo', root);
      const btnParar = $('.re-anx-parar', root);
      btnGravar.addEventListener('click', async () => {
        try {
          await window.ReunioesAnexos.iniciarGravacao({
            onTick: (s) => { recTempo.textContent = `${s}s`; }
          });
          btnGravar.hidden = true;
          recStatus.hidden = false;
        } catch (e) {
          toast('Não foi possível iniciar a gravação: ' + (e.message || e));
        }
      });
      btnParar.addEventListener('click', async () => {
        try {
          const file = await window.ReunioesAnexos.pararGravacao();
          recStatus.hidden = true;
          btnGravar.hidden = false;
          await fazerUpload(file, r);
        } catch (e) {
          toast('Falha ao finalizar gravação: ' + (e.message || e));
        }
      });

      // Análise IA
      $$('.re-anx-analisar', root).forEach((b) => {
        b.addEventListener('click', async () => {
          const anxId = b.getAttribute('data-anx');
          const anx = window.ReunioesAnexos.listar(window.Reunioes.getReuniao(r.id))
            .find((x) => x.id === anxId);
          if (!anx) return;
          await analisarComIA(anx);
        });
      });

      // Remover
      $$('.re-anx-remover', root).forEach((b) => {
        b.addEventListener('click', async () => {
          const anxId = b.getAttribute('data-anx');
          if (!confirm('Remover este anexo? Esta ação não pode ser desfeita.')) return;
          try {
            await window.ReunioesAnexos.remover(window.Reunioes.getReuniao(r.id), anxId);
            toast('Anexo removido.');
            render();
            if (typeof opts.onMudou === 'function') opts.onMudou();
          } catch (e) {
            toast('Falha ao remover: ' + (e.message || e));
          }
        });
      });
    }

    async function fazerUpload(file, r) {
      const prog = $('.re-anx-progresso', container);
      const bar = $('.re-anx-progresso-bar', container);
      const txt = $('.re-anx-progresso-txt', container);
      prog.hidden = false;
      bar.style.width = '0%';
      txt.textContent = `Enviando ${file.name}…`;
      try {
        const anx = await window.ReunioesAnexos.upload(r, file, {
          assuntoId,
          onProgress: (pct) => { bar.style.width = `${pct}%`; }
        });
        prog.hidden = true;
        toast(`Anexo enviado: ${anx.nome}`);
        render();
        if (typeof opts.onMudou === 'function') opts.onMudou();
        // Para áudio/imagem/PDF, oferece analisar de imediato
        if (['audio', 'imagem', 'pdf'].includes(anx.tipo) && window.IAGemini?.temChave?.()) {
          if (confirm(`Analisar "${anx.nome}" com IA agora?`)) {
            await analisarComIA(anx);
          }
        }
      } catch (e) {
        prog.hidden = true;
        toast('Falha no upload: ' + (e.message || e));
      }
    }

    async function analisarComIA(anexo) {
      const host = $('.re-anx-sugestoes-host', container);
      host.innerHTML = `<div class="re-ia-loading">Analisando "${esc(anexo.nome)}" com IA — isso pode levar até 2 minutos…</div>`;
      try {
        const fresh = window.Reunioes.getReuniao(reuniao.id);
        const sug = await window.ReunioesIA.analisarAnexo(anexo, fresh);
        // Persiste resumo da IA junto ao anexo
        await window.ReunioesAnexos.atualizarAnexo(fresh, anexo.id, { ia: sug });
        renderSugestoes(host, sug, anexo);
      } catch (e) {
        host.innerHTML = `<div class="re-ia-erro">Falha na análise: ${esc(e.message || e)}</div>`;
      }
    }

    function renderSugestoes(host, sug, anexo) {
      const r = window.Reunioes.getReuniao(reuniao.id);
      const blocos = [];

      blocos.push(`
        <div class="re-ia-head">
          <strong>Sugestões da IA</strong> · ${esc(anexo.nome)}
          <button class="btn btn-sm btn-ghost re-ia-fechar" type="button">Fechar</button>
        </div>`);

      if (sug.resumo) {
        blocos.push(`<div class="re-ia-resumo"><b>Resumo:</b> ${esc(sug.resumo)}</div>`);
      }
      if (sug.descricao) {
        blocos.push(`<div class="re-ia-resumo"><b>O que aparece:</b> ${esc(sug.descricao)}</div>`);
      }
      if (sug.transcricao_ou_texto) {
        blocos.push(`
          <details class="re-ia-transcricao">
            <summary>${sug.tipo === 'audio' ? 'Transcrição completa' : 'Texto extraído'} (${sug.transcricao_ou_texto.length} caracteres)</summary>
            <pre class="re-ia-pre">${esc(sug.transcricao_ou_texto)}</pre>
          </details>`);
      }
      if (sug.avisos?.length) {
        blocos.push(`<div class="re-ia-avisos"><b>Avisos:</b> <ul>${sug.avisos.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>`);
      }

      // Assuntos sugeridos
      if (sug.assuntos_sugeridos?.length) {
        blocos.push(`
          <div class="re-ia-grupo">
            <h4>Assuntos sugeridos (${sug.assuntos_sugeridos.length})</h4>
            <ul class="re-ia-itens">
              ${sug.assuntos_sugeridos.map((a, i) => `
                <li>
                  <label class="re-ia-check">
                    <input type="checkbox" class="re-ia-ckA" data-idx="${i}" checked>
                    <div>
                      <div class="re-ia-tit">${esc(a.titulo)}</div>
                      <div class="re-ia-sub">${a.dono ? esc(a.dono) + ' · ' : ''}urgência ${esc(a.urgencia)}${a.estimativa_min ? ' · ' + esc(a.estimativa_min) + ' min' : ''}</div>
                      ${a.notas ? `<div class="re-ia-notas">${esc(a.notas)}</div>` : ''}
                    </div>
                  </label>
                </li>`).join('')}
            </ul>
          </div>`);
      }

      // Decisões sugeridas
      if (sug.decisoes_sugeridas?.length) {
        blocos.push(`
          <div class="re-ia-grupo">
            <h4>Decisões sugeridas (${sug.decisoes_sugeridas.length})</h4>
            <ul class="re-ia-itens">
              ${sug.decisoes_sugeridas.map((d, i) => `
                <li>
                  <label class="re-ia-check">
                    <input type="checkbox" class="re-ia-ckD" data-idx="${i}" ${d.categoria !== 'informe' ? 'checked' : ''}>
                    <div>
                      <span class="re-cat re-cat--${esc(d.categoria)}">${esc(rotuloCat(d.categoria))}</span>
                      <div class="re-ia-tit">${esc(d.texto)}</div>
                      ${d.assunto_titulo ? `<div class="re-ia-sub">vinculada ao assunto: ${esc(d.assunto_titulo)}</div>` : ''}
                    </div>
                  </label>
                </li>`).join('')}
            </ul>
          </div>`);
      }

      // Tarefas sugeridas
      if (sug.tarefas_sugeridas?.length) {
        blocos.push(`
          <div class="re-ia-grupo">
            <h4>Tarefas sugeridas (${sug.tarefas_sugeridas.length})</h4>
            <ul class="re-ia-itens">
              ${sug.tarefas_sugeridas.map((t, i) => `
                <li>
                  <label class="re-ia-check">
                    <input type="checkbox" class="re-ia-ckT" data-idx="${i}" checked>
                    <div>
                      <div class="re-ia-tit">${esc(t.titulo)}</div>
                      <div class="re-ia-sub">${t.responsavel ? esc(t.responsavel) + ' · ' : ''}${t.prazo ? 'prazo ' + esc(t.prazo) + ' · ' : ''}prioridade ${esc(t.prioridade)}</div>
                      ${t.notas ? `<div class="re-ia-notas">${esc(t.notas)}</div>` : ''}
                    </div>
                  </label>
                </li>`).join('')}
            </ul>
          </div>`);
      }

      blocos.push(`
        <div class="re-ia-acoes">
          <button class="btn btn-primary re-ia-importar" type="button">Importar selecionados</button>
          <button class="btn btn-ghost re-ia-cancelar" type="button">Descartar sugestões</button>
        </div>`);

      host.innerHTML = `<section class="re-ia-painel">${blocos.join('')}</section>`;

      // Listeners
      $('.re-ia-fechar', host)?.addEventListener('click', () => { host.innerHTML = ''; });
      $('.re-ia-cancelar', host)?.addEventListener('click', () => { host.innerHTML = ''; });
      $('.re-ia-importar', host).addEventListener('click', () => {
        importarSelecionados(host, sug, anexo);
      });
    }

    function rotuloCat(c) {
      return ({
        decisao_externa: 'Decisão',
        delegacao_interna: 'Delegação interna',
        encaminhamento: 'Encaminhamento',
        informe: 'Informe'
      })[c] || c;
    }

    function importarSelecionados(host, sug, anexo) {
      const R = window.Reunioes;
      const r = R.getReuniao(reuniao.id);
      if (!r) return toast('Reunião não encontrada.');

      const assuntosIdx = $$('.re-ia-ckA:checked', host).map((c) => +c.getAttribute('data-idx'));
      const decisoesIdx = $$('.re-ia-ckD:checked', host).map((c) => +c.getAttribute('data-idx'));
      const tarefasIdx = $$('.re-ia-ckT:checked', host).map((c) => +c.getAttribute('data-idx'));

      // 1) Cria assuntos selecionados (e mapeia titulo → id)
      const titParaId = new Map();
      let nAssuntos = 0;
      for (const i of assuntosIdx) {
        const a = sug.assuntos_sugeridos[i];
        if (!a || !a.titulo) continue;
        const novo = R.criarAssunto({
          titulo: a.titulo,
          dono: a.dono,
          urgencia: a.urgencia,
          estimativa_min: a.estimativa_min,
          notas: a.notas,
          reuniao_origem_id: r.id
        });
        // Se a UI atual é Tela 4 (assuntoId presente) o novo entra direto na pauta;
        // se é Tela 3, também adiciona (faz sentido)
        R.adicionarNaPauta(r.id, novo.id);
        titParaId.set(a.titulo, novo.id);
        nAssuntos++;
      }
      // Se a UI é Tela 4 e o assunto-pai já existe, mapeia o assunto atual também
      if (assuntoId) {
        const ap = R.getAssunto(assuntoId);
        if (ap) titParaId.set(ap.titulo, ap.id);
      }

      // 2) Cria decisões selecionadas (precisa de assunto_id)
      let nDecisoes = 0;
      for (const i of decisoesIdx) {
        const d = sug.decisoes_sugeridas[i];
        if (!d || !d.texto) continue;
        let aid = titParaId.get(d.assunto_titulo || '');
        if (!aid && assuntoId) aid = assuntoId;
        if (!aid) {
          // Cria um assunto-órfão para abrigar a decisão
          const orf = R.criarAssunto({
            titulo: d.assunto_titulo || `Assunto da IA: ${d.texto.slice(0, 60)}`,
            urgencia: 'media',
            reuniao_origem_id: r.id
          });
          R.adicionarNaPauta(r.id, orf.id);
          aid = orf.id;
          if (d.assunto_titulo) titParaId.set(d.assunto_titulo, aid);
          nAssuntos++;
        }
        R.criarDecisao({
          texto: d.texto,
          categoria: d.categoria,
          assunto_id: aid,
          reuniao_id: r.id
        });
        nDecisoes++;
      }

      // 3) Cria tarefas selecionadas (vinculadas à reunião)
      let nTarefas = 0;
      if (tarefasIdx.length) {
        if (typeof window.normalizarTarefa !== 'function' || !Array.isArray(window.tarefas) || typeof window.salvarTarefas !== 'function') {
          toast('Atenção: criação de tarefas indisponível neste contexto.');
        } else {
          for (const i of tarefasIdx) {
            const t = sug.tarefas_sugeridas[i];
            if (!t || !t.titulo) continue;
            const id = (window.uid && window.uid()) || ('t_' + Date.now() + Math.random().toString(36).slice(2,6));
            const nova = window.normalizarTarefa({
              id,
              titulo: t.titulo,
              responsavel: t.responsavel || '',
              prazo: t.prazo || '',
              prioridade: t.prioridade || 'media',
              status: 'a-fazer',
              descricao: t.notas || '',
              reuniao_id: r.id,
              _origem_ia: { anexo_id: anexo.id, anexo_nome: anexo.nome, tipo: anexo.tipo }
            });
            window.tarefas.push(nova);
            nTarefas++;
          }
          window.salvarTarefas();
        }
      }

      host.innerHTML = `<div class="re-ia-ok">Importado: ${nAssuntos} assunto(s), ${nDecisoes} decisão(ões), ${nTarefas} tarefa(s).</div>`;
      toast(`IA: ${nAssuntos} assunto(s), ${nDecisoes} decisão(ões), ${nTarefas} tarefa(s) importadas.`);
      if (typeof opts.onMudou === 'function') opts.onMudou();
      if (typeof window.renderTudo === 'function') window.renderTudo();
    }

    render();
  }

  window.ReunioesAnexosUI = { montarBox, toast };
})();
