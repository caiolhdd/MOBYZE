const esc = t => String(t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selectedProduct = '';
const msg = name => encodeURIComponent(selectedProduct
  ? `Olá, ${name}! Tenho interesse em ${selectedProduct} e gostaria de solicitar um orçamento.`
  : `Olá, ${name}! Acessei o site da CHIQ CELL e gostaria de solicitar um orçamento.`);

document.getElementById('address').textContent = LOJA.endereco;
document.getElementById('hours').textContent = LOJA.horario;

const GRUPOS = ['Todos', ...new Set(PRODUTOS.map(p => p.grupo))];
let grupoAtual = 'Todos';
const grupoLabel = g => g === 'Todos' ? 'Todos' : (g === 'SE' ? 'iPhone SE' : (g === 'Xiaomi' ? 'Xiaomi' : 'iPhone ' + g));
const filtersEl = document.getElementById('filters');
function renderFilters() {
  filtersEl.innerHTML = GRUPOS.map(g => `<button class="chip${g === grupoAtual ? ' active' : ''}" data-grupo="${esc(g)}">${esc(grupoLabel(g))}</button>`).join('');
}
function renderProducts() {
  const lista = PRODUTOS.map((p, i) => ({ p, i })).filter(({ p }) => grupoAtual === 'Todos' || p.grupo === grupoAtual);
  document.getElementById('products').innerHTML = lista.map(({ p, i }) => `
    <article class="product">
      <span class="product-tag">${esc(p.grupo === 'Xiaomi' ? 'Xiaomi' : 'iPhone')}${p.lanc ? ' · ' + esc(p.lanc) : ''}</span>
      <div class="product-art${p.foto ? ' has-photo' : ''}">${p.foto ? `<img src="${esc(p.foto)}" alt="${esc(p.nome)}" loading="lazy">` : `<div class="mini-phone ${esc(p.cor || '')}"></div>`}</div>
      <h3>${esc(p.nome)}</h3><div class="sub">${esc([p.chip, p.arm].filter(Boolean).join(' · ') || 'Consulte os modelos')}</div>
      ${p.preco ? `<div class="price">${esc(p.preco)}</div>` : ''}
      <ul>${(p.itens || []).map(t => `<li>✓ ${esc(t)}</li>`).join('')}</ul>
      <button class="btn btn-outline" data-detail="${i}">Ver características</button>
      <a class="btn" href="#vendedores" data-product="${esc(p.nome)}">◉ Solicitar orçamento</a>
    </article>`).join('');
}
filtersEl.addEventListener('click', e => {
  const b = e.target.closest('[data-grupo]'); if (!b) return;
  grupoAtual = b.dataset.grupo; renderFilters(); renderProducts();
});
renderFilters(); renderProducts();

/* Página de características (janela) */
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
function abrirDetalhe(i) {
  const p = PRODUTOS[i];
  const linhas = [['Lançamento', p.lanc], ['Chip', p.chip], ['Tela', p.tela], ['Câmeras traseiras', p.camera], ['Câmera frontal', p.frontal], ['Armazenamento', p.arm], ['Cores', p.cores]].filter(r => r[1]);
  modalBody.innerHTML = `
    ${p.foto ? `<img class="modal-photo" src="${esc(p.foto)}" alt="${esc(p.nome)}">` : ''}
    <div class="eyebrow">${esc(p.grupo === 'Xiaomi' ? 'Xiaomi' : 'Apple')}</div>
    <h2 id="modal-title">${esc(p.nome)}</h2>
    ${p.preco ? `<div class="price">${esc(p.preco)}</div>` : ''}
    ${linhas.length ? `<dl class="specs-table">${linhas.map(r => `<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl>` : '<p class="muted">Consulte os modelos disponíveis com nossos vendedores.</p>'}
    <h3>Destaques</h3>
    <ul class="modal-list">${(p.itens || []).map(t => `<li>✓ ${esc(t)}</li>`).join('')}</ul>
    <p class="muted small">Disponibilidade, cores, condição do aparelho e valores: confirme com um vendedor.</p>
    <a class="btn" href="#vendedores" data-product="${esc(p.nome)}">◉ Solicitar orçamento</a>`;
  modal.hidden = false; document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-panel').scrollTop = 0;
}
function fecharDetalhe() { modal.hidden = true; document.body.style.overflow = ''; }
modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal-close')) fecharDetalhe(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) fecharDetalhe(); });
document.addEventListener('click', e => {
  const d = e.target.closest('[data-detail]'); if (d) abrirDetalhe(Number(d.dataset.detail));
});

document.getElementById('sellers').innerHTML = VENDEDORES.map(v => `
  <article class="seller reveal">
    <div class="seller-photo">${v.foto ? `<img src="${esc(v.foto)}" alt="${esc(v.nome)}">` : esc(v.nome.trim().charAt(0).toUpperCase())}</div>
    <h3>${esc(v.nome)}</h3><p>Equipe comercial</p>
    <a class="whatsapp seller-link" data-phone="${esc(v.telefone)}" data-name="${esc(v.nome)}" href="https://wa.me/${esc(v.telefone)}">◉ Falar no WhatsApp</a>
  </article>`).join('');

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navlinks');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent='☰';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const parallaxItems = document.querySelectorAll('.parallax');
let ticking = false;
function updateParallax() {
  const y = window.scrollY;
  parallaxItems.forEach(el => {
    const speed = Number(el.dataset.speed || 0.05);
    const rect = el.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      el.style.translate = `0 ${(y * speed) % 28}px`;
    }
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.requestAnimationFrame(updateParallax); ticking = true;
  }
}, {passive:true});

document.addEventListener('click', e => {
  const l = e.target.closest('[data-product]');
  if (l) { selectedProduct = l.dataset.product; if (!modal.hidden) fecharDetalhe(); }
});
document.querySelectorAll('.seller-link').forEach(seller => {
  seller.addEventListener('click', () => {
    seller.href = `https://wa.me/${seller.dataset.phone}?text=${msg(seller.dataset.name)}`;
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
