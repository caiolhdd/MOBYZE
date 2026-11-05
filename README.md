# CHIQ CELL — site

Site em React + TypeScript + Tailwind (Vite).

## Rodar
```bash
npm install
npm run dev      # site em http://localhost:5173 e painel em http://localhost:5173/admin.html
npm run build    # gera a pasta dist/ para publicar
```

## Testes
```bash
npm test           # unitários (Vitest): regras do catálogo e schema/dados publicados
npm run test:e2e   # ponta a ponta (Playwright, desktop + mobile): filtros, URL, janela, orçamento, comparação, painel
npm run typecheck
```
O CI (`.github/workflows/ci.yml`) roda tudo isso a cada push.

## Estrutura
```
index.html                     entrada do site (React)
src/App.tsx                    página (topo, catálogo, sobre, vendedores, contato)
src/data/catalogo.json         DADOS: loja, vendedores e produtos (fonte única)
src/data/schema.ts             formato e validação dos dados (zod)
src/features/catalogo/         catálogo: filtros, busca, ordenação, comparação, card, janela de detalhes/orçamento
src/components/ui/             botão, card, badge, dialog (<dialog> nativo)
public/img/                    fotos dos aparelhos (referencie como "/img/arquivo.jpg")
admin.html, js/admin*.js       PAINEL de edição (só em `npm run dev`; não entra no build)
```

## Catálogo
- Filtro por linha, busca e ordenação ficam na URL (`?linha=15&q=pro&ordem=menor-preco`): o link é compartilhável e o botão "voltar" funciona.
- Produto sem preço aparece como **Sob consulta**; sem foto (ou com foto quebrada), aparece a arte da cor escolhida.
- Campos opcionais por produto: `preco`, `foto`, `condicao` (`"novo"` | `"seminovo"`), `bateria` (0–100), `disponivel` (`false` = esgotado).
- **Comparar:** marque até 3 aparelhos (botão "+" na foto) e clique em "Comparar". A tabela tem a opção "Mostrar só as diferenças"; a seleção fica na URL (`?comparar=iphone-15,iphone-16`).
- "Pedir orçamento" abre a janela já na escolha do vendedor; a mensagem do WhatsApp vai com o nome do aparelho.
- O `catalogo.json` é validado ao carregar: dado inválido quebra o build/dev em vez de quebrar o site em silêncio.

## Painel de edição (admin.html)
Com `npm run dev` rodando, abra `/admin.html`. As alterações ficam salvas como rascunho no navegador e aparecem no site **do dev server, no mesmo navegador**.
**Para publicar:** clique em **Baixar catalogo.json**, substitua `src/data/catalogo.json` e rode `npm run build`.

O painel não tem senha e não é incluído no build de produção — publique só a pasta `dist/`.

## Cores
Cores e utilitários estão nas classes Tailwind dos componentes e em `src/styles.css`.

## Textos fixos (garantia, 21x, frete, sobre nós)
Estão em `src/App.tsx`. Procure o texto e troque.

## Colocar no ar (grátis)
Rode `npm run build` e suba a pasta `dist/` em Netlify, Vercel, GitHub Pages ou Cloudflare Pages (ou por FTP).

## Importante
- Os telefones dos vendedores são de exemplo. Troque antes de publicar.
- Confira as características de cada modelo no site da Apple Brasil.
- Use apenas fotos que você tenha direito de usar comercialmente (fotos próprias ou do fornecedor).
