/* Carrega o catálogo publicado (fonte única: src/chiqcell/data/catalogo.json) ou o rascunho salvo
   neste navegador, expõe LOJA/VENDEDORES/PRODUTOS para o painel e só então inicia js/admin.js. */
import publicado from '../../src/chiqcell/data/catalogo.json';

const CHAVE = 'chiqcell_dados';

function lerRascunho() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const d = JSON.parse(bruto);
    // formato legado do painel antigo: { LOJA, VENDEDORES, PRODUTOS }
    return 'LOJA' in d ? { loja: d.LOJA, vendedores: d.VENDEDORES, produtos: d.PRODUTOS } : d;
  } catch {
    return null;
  }
}

const dados = structuredClone(lerRascunho() ?? publicado);
Object.assign(window, { LOJA: dados.loja, VENDEDORES: dados.vendedores ?? [], PRODUTOS: dados.produtos ?? [] });

await import('./admin.js');
