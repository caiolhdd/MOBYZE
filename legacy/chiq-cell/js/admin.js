/* Painel de edição — CHIQ CELL
   Edita LOJA, VENDEDORES e PRODUTOS (definidos em js/dados.js) e salva no navegador. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const CHAVE = 'chiqcell_dados';

  /* ---------- salvar ---------- */
  const statusEl = $('#status');
  function setStatus(txt, cls) { statusEl.textContent = txt; statusEl.className = 'status ' + (cls || ''); }
  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify({ LOJA, VENDEDORES, PRODUTOS }));
      setStatus('✓ Salvo neste navegador', 'ok');
    } catch (e) {
      setStatus('Memória do navegador cheia. Baixe o dados.js.', 'err');
    }
  }
  let timer;
  function salvarDepois() { clearTimeout(timer); setStatus('Salvando…'); timer = setTimeout(salvar, 350); }

  let toastTimer;
  function aviso(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- imagens: redimensiona e comprime antes de guardar ---------- */
  function lerImagem(arquivo, max = 900) {
    return new Promise((ok, erro) => {
      const fr = new FileReader();
      fr.onerror = erro;
      fr.onload = () => {
        const img = new Image();
        img.onerror = erro;
        img.onload = () => {
          const k = Math.min(1, max / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          const x = c.getContext('2d');
          x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
          x.drawImage(img, 0, 0, c.width, c.height);
          ok(c.toDataURL('image/jpeg', 0.82));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(arquivo);
    });
  }

  /* ---------- abas ---------- */
  $$('.tab').forEach(b => b.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.toggle('active', t === b));
    ['loja', 'vendedores', 'produtos'].forEach(n => { $('#tab-' + n).hidden = n !== b.dataset.tab; });
  }));

  /* ---------- LOJA ---------- */
  $('#loja-endereco').value = LOJA.endereco || '';
  $('#loja-horario').value = LOJA.horario || '';
  $('#loja-endereco').addEventListener('input', e => { LOJA.endereco = e.target.value; salvarDepois(); });
  $('#loja-horario').addEventListener('input', e => { LOJA.horario = e.target.value; salvarDepois(); });

  /* ---------- VENDEDORES ---------- */
  const listaV = $('#lista-vendedores');
  function renderVendedores() {
    listaV.innerHTML = VENDEDORES.map((v, i) => `
      <article class="card" data-i="${i}">
        <div class="avatar">${v.foto ? `<img src="${esc(v.foto)}" alt="">` : esc((v.nome || '?').trim().charAt(0).toUpperCase())}</div>
        <div class="fields">
          <label>Nome<input type="text" data-f="nome" value="${esc(v.nome)}"></label>
          <label>WhatsApp (55 + DDD + número)<input type="text" inputmode="numeric" data-f="telefone" value="${esc(v.telefone)}" placeholder="5521999990000"></label>
          <div class="row">
            <label class="btn ghost file">📷 ${v.foto ? 'Trocar foto' : 'Enviar foto'}<input type="file" accept="image/*" data-foto hidden></label>
            ${v.foto ? '<button class="btn ghost" type="button" data-rmfoto>Remover foto</button>' : ''}
          </div>
        </div>
        <div class="side">
          <button class="icon" type="button" data-up title="Subir" aria-label="Subir">↑</button>
          <button class="icon" type="button" data-down title="Descer" aria-label="Descer">↓</button>
          <button class="icon danger" type="button" data-del title="Excluir" aria-label="Excluir">🗑</button>
        </div>
      </article>`).join('') || '<p class="muted">Nenhum vendedor cadastrado.</p>';
  }
  const idxV = el => Number(el.closest('[data-i]').dataset.i);
  listaV.addEventListener('input', e => {
    const f = e.target.dataset.f; if (!f) return;
    VENDEDORES[idxV(e.target)][f] = e.target.value; salvarDepois();
  });
  listaV.addEventListener('change', async e => {
    const i = e.target.closest('[data-i]') ? idxV(e.target) : -1; if (i < 0) return;
    if (e.target.dataset.f === 'telefone') {
      let d = e.target.value.replace(/\D/g, '');
      if (d.length === 10 || d.length === 11) d = '55' + d;
      e.target.value = d; VENDEDORES[i].telefone = d; salvarDepois();
      if (d.length < 12) aviso('Confira o número: use 55 + DDD + telefone.');
    }
    if (e.target.matches('[data-foto]') && e.target.files[0]) {
      try { VENDEDORES[i].foto = await lerImagem(e.target.files[0], 400); renderVendedores(); salvarDepois(); }
      catch (err) { aviso('Não consegui ler essa imagem.'); }
    }
  });
  listaV.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || !b.closest('[data-i]')) return;
    const i = idxV(b);
    if (b.matches('[data-rmfoto]')) { VENDEDORES[i].foto = ''; }
    else if (b.matches('[data-up]') && i > 0) { [VENDEDORES[i - 1], VENDEDORES[i]] = [VENDEDORES[i], VENDEDORES[i - 1]]; }
    else if (b.matches('[data-down]') && i < VENDEDORES.length - 1) { [VENDEDORES[i + 1], VENDEDORES[i]] = [VENDEDORES[i], VENDEDORES[i + 1]]; }
    else if (b.matches('[data-del]')) { if (!confirm('Excluir "' + (VENDEDORES[i].nome || 'vendedor') + '"?')) return; VENDEDORES.splice(i, 1); }
    else return;
    renderVendedores(); salvarDepois();
  });
  $('#add-vendedor').addEventListener('click', () => {
    VENDEDORES.push({ nome: 'Novo vendedor', telefone: '', foto: '' });
    renderVendedores(); salvarDepois();
    const ultimo = listaV.lastElementChild; if (ultimo) { ultimo.scrollIntoView({ block: 'center' }); $('input', ultimo).select(); }
  });

  /* ---------- PRODUTOS ---------- */
  const listaP = $('#lista-produtos');
  const filtroG = $('#filtro-grupo');
  const rotuloGrupo = g => g === 'SE' ? 'iPhone SE' : (/^\d+$/.test(g) ? 'iPhone ' + g : g);

  function renderFiltroGrupo() {
    const atual = filtroG.value;
    const grupos = [...new Set(PRODUTOS.map(p => p.grupo).filter(Boolean))];
    filtroG.innerHTML = '<option value="">Todas as linhas</option>' + grupos.map(g => `<option value="${esc(g)}">${esc(rotuloGrupo(g))}</option>`).join('');
    filtroG.value = grupos.includes(atual) ? atual : '';
    $('#lista-grupos').innerHTML = grupos.map(g => `<option value="${esc(g)}">`).join('');
  }

  function renderProdutos() {
    renderFiltroGrupo();
    const q = $('#busca').value.trim().toLowerCase();
    const g = filtroG.value;
    const linhas = PRODUTOS.map((p, i) => ({ p, i })).filter(({ p }) =>
      (!g || p.grupo === g) && (!q || [p.nome, p.chip, p.grupo].join(' ').toLowerCase().includes(q)));
    $('#contagem').textContent = '(' + linhas.length + (linhas.length === PRODUTOS.length ? '' : ' de ' + PRODUTOS.length) + ')';
    listaP.innerHTML = linhas.map(({ p, i }) => `
      <article class="item" data-i="${i}">
        <div class="thumb${p.foto ? '' : ' sem'}">${p.foto ? `<img src="${esc(p.foto)}" alt="">` : 'sem foto'}</div>
        <div>
          <h4>${esc(p.nome)}</h4>
          <div class="meta"><span class="tag">${esc(rotuloGrupo(p.grupo || '—'))}</span>${esc([p.lanc, p.chip, p.preco].filter(Boolean).join(' · '))}</div>
        </div>
        <div class="acts">
          <button class="btn ghost" type="button" data-edit>Editar</button>
          <button class="btn ghost" type="button" data-dup>Duplicar</button>
          <button class="icon danger" type="button" data-del aria-label="Excluir" title="Excluir">🗑</button>
        </div>
      </article>`).join('') || '<p class="muted">Nenhum produto encontrado.</p>';
  }
  $('#busca').addEventListener('input', renderProdutos);
  filtroG.addEventListener('change', renderProdutos);
  listaP.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const i = Number(b.closest('[data-i]').dataset.i);
    if (b.matches('[data-edit]')) abrirEditor(i);
    else if (b.matches('[data-dup]')) {
      const copia = JSON.parse(JSON.stringify(PRODUTOS[i])); copia.nome += ' (cópia)';
      PRODUTOS.splice(i + 1, 0, copia); renderProdutos(); salvarDepois(); aviso('Produto duplicado.');
    } else if (b.matches('[data-del]')) {
      if (!confirm('Excluir "' + PRODUTOS[i].nome + '"?')) return;
      PRODUTOS.splice(i, 1); renderProdutos(); salvarDepois();
    }
  });
  $('#add-produto').addEventListener('click', () => abrirEditor(-1));

  /* ---------- editor de produto ---------- */
  const dlg = $('#dlg');
  let editando = -1, fotoAtual = '';
  const CAMPOS = ['nome', 'grupo', 'lanc', 'preco', 'chip', 'arm', 'tela', 'camera', 'frontal', 'cores'];

  function mostrarFoto() {
    $('#foto-prev').innerHTML = fotoAtual ? `<img src="${esc(fotoAtual)}" alt="">` : 'sem foto';
    $('#f-fotourl').value = fotoAtual.startsWith('data:') ? '' : fotoAtual;
    $('#f-rmfoto').hidden = !fotoAtual;
  }
  function abrirEditor(i) {
    editando = i;
    const p = i >= 0 ? PRODUTOS[i] : { grupo: filtroG.value || '' };
    $('#dlg-titulo').textContent = i >= 0 ? 'Editar produto' : 'Novo produto';
    CAMPOS.forEach(c => { $('#f-' + c).value = p[c] || ''; });
    $('#f-cor').value = p.cor || '';
    $('#f-itens').value = (p.itens || []).join('\n');
    fotoAtual = p.foto || ''; mostrarFoto();
    dlg.showModal(); $('#f-nome').focus();
  }
  $('#f-arquivo').addEventListener('change', async e => {
    const f = e.target.files[0]; if (!f) return;
    try { fotoAtual = await lerImagem(f); mostrarFoto(); }
    catch (err) { aviso('Não consegui ler essa imagem.'); }
    e.target.value = '';
  });
  $('#f-fotourl').addEventListener('input', e => { fotoAtual = e.target.value.trim(); $('#foto-prev').innerHTML = fotoAtual ? `<img src="${esc(fotoAtual)}" alt="">` : 'sem foto'; $('#f-rmfoto').hidden = !fotoAtual; });
  $('#f-rmfoto').addEventListener('click', () => { fotoAtual = ''; mostrarFoto(); });
  const fechar = () => dlg.close();
  $('#dlg-fechar').addEventListener('click', fechar);
  $('#dlg-cancelar').addEventListener('click', fechar);
  dlg.addEventListener('click', e => { if (e.target === dlg) fechar(); });

  $('#form-produto').addEventListener('submit', e => {
    e.preventDefault();
    const nome = $('#f-nome').value.trim(), grupo = $('#f-grupo').value.trim();
    if (!nome || !grupo) { aviso('Preencha o nome e a linha do produto.'); return; }
    const novo = {};
    CAMPOS.forEach(c => { novo[c] = $('#f-' + c).value.trim(); });
    novo.cor = $('#f-cor').value;
    novo.foto = fotoAtual;
    novo.itens = $('#f-itens').value.split('\n').map(t => t.trim()).filter(Boolean);
    if (editando >= 0) Object.assign(PRODUTOS[editando], novo); else PRODUTOS.push(novo);
    dlg.close(); renderProdutos(); salvarDepois(); aviso('Produto salvo.');
  });

  /* ---------- baixar dados.js / descartar ---------- */
  function gerarDadosJs() {
    const j = o => JSON.stringify(o, null, 2);
    return `/* =====================================================
   DADOS DO SITE — gerado pelo painel (admin.html) em ${new Date().toLocaleString('pt-BR')}
   Substitua o arquivo js/dados.js do projeto por este.
   ===================================================== */
let LOJA = ${j(LOJA)};

let VENDEDORES = ${j(VENDEDORES)};

let PRODUTOS = ${j(PRODUTOS)};
`;
  }
  $('#btn-baixar').addEventListener('click', () => {
    const blob = new Blob([gerarDadosJs()], { type: 'text/javascript;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'dados.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    aviso('dados.js baixado. Substitua o arquivo na pasta js/.');
  });
  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Descartar tudo o que foi alterado neste navegador e voltar aos dados do arquivo js/dados.js?')) return;
    try { localStorage.removeItem(CHAVE); } catch (e) { /* ignora */ }
    location.reload();
  });

  /* ---------- início ---------- */
  renderVendedores(); renderProdutos();
  try { setStatus(localStorage.getItem(CHAVE) ? 'Alterações salvas neste navegador' : 'Sem alterações', localStorage.getItem(CHAVE) ? 'ok' : ''); } catch (e) { setStatus(''); }
})();
