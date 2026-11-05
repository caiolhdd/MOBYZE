# CHIQ CELL — site

Site em React + Vite + Tailwind.

## Como rodar
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ para publicar
```

## Onde editar
- `src/config.ts` — número do WhatsApp, endereço e horário da loja. **Os valores atuais são de exemplo: troque antes de publicar.**
- `src/data/products.ts` — catálogo (nome, preço, características e foto). Fotos ficam em `public/img/`; sem foto, o card mostra um placeholder.
- `src/App.tsx` — estrutura e textos da página.
- `tailwind.config.js` — cores (`ink`), raios e fonte.
- Skills do Claude Code (design e vídeo) ficam versionadas em `.claude/skills/`.

## Versão estática anterior (legado)
Os arquivos abaixo (`admin.html`, `css/`, `js/`, `img/`) são da versão anterior em HTML puro e **não são usados pelo site React**. O `admin.html` edita `js/dados.js`, que o React não lê.

### Estrutura (legado)
```
chiq-cell/
├── index.html        estrutura da página
├── admin.html        PAINEL de edição (loja, vendedores e produtos)
├── css/style.css     visual do site (cores no topo, em :root)
├── css/admin.css     visual do painel
├── js/dados.js       DADOS: loja, vendedores e produtos
├── js/salvo.js       lê o que foi salvo pelo painel neste navegador
├── js/main.js        funcionamento do site (filtros, janela de características, WhatsApp)
├── js/admin.js       funcionamento do painel
└── img/              fotos dos aparelhos
```

## Painel de edição (admin.html)
Abra `admin.html` no navegador. Nele você:
- edita endereço e horário da loja;
- adiciona, edita, reordena e exclui vendedores (nome, WhatsApp e foto);
- adiciona, edita, duplica e exclui produtos (textos, preço, características e foto). As fotos enviadas são reduzidas e comprimidas automaticamente.

As alterações ficam salvas no navegador e já aparecem no `index.html` aberto no mesmo navegador.
**Para publicar:** clique em **Baixar dados.js** e substitua o arquivo `js/dados.js` do projeto por ele. Depois suba a pasta para a hospedagem.

**Segurança:** o painel não tem senha. NÃO envie `admin.html`, `css/admin.css` e `js/admin.js` para a hospedagem pública. Use o painel só no seu computador e publique apenas o site.

## Edição manual (js/dados.js)
- **LOJA**: endereço e horário.
- **VENDEDORES**: nome, telefone (55 + DDD + número, só números) e foto opcional.
- **PRODUTOS**: um bloco `{ ... }` por aparelho. Para adicionar, copie um bloco, cole depois da vírgula e troque os dados.
  - `foto: 'img/iphone-12.jpg'` — coloque a imagem na pasta `img/` e escreva o caminho.
  - `preco: 'R$ 2.999'` — opcional; se ficar vazio, o preço não aparece.
  - `grupo` define o filtro (`'11'`, `'12'`, ..., `'SE'`, `'Xiaomi'`).

## Cores
No começo de `css/style.css`, em `:root`, ficam as cores (`--blue`, `--cyan`, `--bg`...).

## Textos fixos (garantia, 21x, frete, sobre nós)
Estão em `index.html`. Procure o texto e troque.

## Colocar no ar (grátis)
Suba a pasta inteira em Netlify Drop (app.netlify.com/drop), Vercel, GitHub Pages ou Cloudflare Pages. Ou envie por FTP para sua hospedagem, mantendo as pastas.

## Importante
- Os telefones dos vendedores são de exemplo. Troque antes de publicar.
- Confira as características de cada modelo no site da Apple Brasil.
- Use apenas fotos que você tenha direito de usar comercialmente (fotos próprias ou do fornecedor).
