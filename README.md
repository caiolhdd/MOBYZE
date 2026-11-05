# Mobyze · página principal

Página inicial da Mobyze (sites e aplicativos), em React + TypeScript + Tailwind, com Vite.
O mesmo deploy serve também o site de cliente **CHIQ CELL** em `/chiqcell` (ver abaixo).
As decisões visuais estão em [`DESIGN.md`](DESIGN.md).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # checa tipos e gera dist/
npm test         # unitários (Vitest)
npm run test:e2e # ponta a ponta (Playwright) contra o build de produção
```
O CI (`.github/workflows/ci.yml`) roda typecheck, testes, build e e2e a cada push.

## Rotas

| Caminho | Site |
|---|---|
| `/` (e qualquer outro) | Mobyze |
| `/chiqcell`, `/chiqcell/...` | CHIQ CELL |

`src/main.tsx` decide pelo caminho (`src/rotas.ts`) e carrega **só** o chunk do site pedido, cada um com o próprio CSS e config Tailwind (`tailwind.config.js` / `tailwind.chiqcell.config.js`), para os temas não vazarem um no outro.
O roteamento é no cliente porque a hospedagem faz fallback de SPA para o `index.html`; os e2e validam isso no build de produção.
Para adicionar outro site de cliente: nova pasta em `src/<cliente>/` com `main.tsx` exportando `montar()`, uma regra em `src/rotas.ts` e um config Tailwind próprio.

## Contato

Copie `.env.example` para `.env` e preencha o WhatsApp (país + DDD + número, só dígitos):

```
VITE_WHATSAPP_NUMBER=5511999999999
```

Sem a variável, todos os botões de contato abrem o DM do Instagram `@somosmobyze`.

## Estrutura

```
src/
├── App.tsx            composição da página e estado do serviço escolhido
├── config.ts          Instagram e WhatsApp
├── data/              serviços e caminhos ("por onde começar")
├── lib/contact.ts     monta a mensagem e o link do canal
├── sections/          Header, Hero, Statement, Services, Paths, Contact, Footer
├── components/        Logo, Icons, Button, Reveal
├── styles.css         tokens de cor e movimento
├── mobyze.tsx         boot do site da Mobyze
├── main.tsx, rotas.ts roteador de entrada
└── chiqcell/          site CHIQ CELL (isolado, ver abaixo)
```

## Skills do projeto

`.claude/skills/ui-humanizer` e `.claude/skills/revenue-centric-design`.
Auditoria de interface: `python3 -I .claude/skills/ui-humanizer/scripts/audit.py index.html src`

## CHIQ CELL (`/chiqcell`)

Catálogo de aparelhos com busca, filtros e ordenação na URL, comparação de até 3 modelos e pedido de orçamento pelo WhatsApp já citando o aparelho.

```
src/chiqcell/
├── main.tsx              boot (aplica título/metas próprios)
├── App.tsx               página
├── data/catalogo.json    DADOS: loja, vendedores e produtos (fonte única, validada por data/schema.ts)
├── features/catalogo/    catálogo, comparação, janela de detalhes/orçamento e regras puras
└── components/ui/        botão, card, badge, dialog (<dialog> nativo)
public/chiqcell/img/      fotos (referencie como "/chiqcell/img/arquivo.jpg")
tools/chiqcell-admin/     painel de edição (só em dev; não entra no build)
```

- Campos opcionais por produto: `preco` (sem ele: "Sob consulta"), `foto`, `condicao` (`"novo"`|`"seminovo"`), `bateria` (0–100), `disponivel` (`false` = esgotado).
- **Painel:** com `npm run dev`, abra `/tools/chiqcell-admin/`. As alterações ficam como rascunho no navegador e aparecem em `/chiqcell` no dev server. Para publicar: **Baixar catalogo.json**, substituir `src/chiqcell/data/catalogo.json` e fazer o deploy.
- Antes de publicar: trocar os telefones de exemplo dos vendedores e usar só fotos com direito de uso comercial.
