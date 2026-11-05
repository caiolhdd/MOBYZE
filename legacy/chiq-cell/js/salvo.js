/* Carrega as alterações feitas no painel (admin.html) e salvas neste navegador.
   Se não houver nada salvo, o site usa os dados do arquivo js/dados.js. */
(function () {
  try {
    const bruto = localStorage.getItem('chiqcell_dados');
    if (!bruto) return;
    const d = JSON.parse(bruto);
    if (d.LOJA) LOJA = d.LOJA;
    if (Array.isArray(d.VENDEDORES)) VENDEDORES = d.VENDEDORES;
    if (Array.isArray(d.PRODUTOS)) PRODUTOS = d.PRODUTOS;
  } catch (e) { /* sem dados salvos ou navegador bloqueou o armazenamento */ }
})();
