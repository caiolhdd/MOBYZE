# DESIGN.md · Mobyze

Fonte de verdade das decisões visuais. Skills usadas: `ui-humanizer` (tira a cara de IA) e `revenue-centric-design` (conversão).

## Leitura da página

Página inicial da Mobyze (agência de sites e apps) para donos de pequenos e médios negócios que hoje dependem só de rede social, uma página de **convencer**, com linguagem de marca editorial, em React + Tailwind.
Intensidade: **Variação média-alta · Movimento médio · Densidade baixa-média.**

## Origem visual

Perfil `@somosmobyze` no Instagram: azul-marinho profundo, off-white, Montserrat pesada, corte diagonal do primeiro post, lista fina com divisórias do terceiro post, globo "www".

## Tokens (`src/styles.css`, espelhados em `tailwind.config.js`)

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0d1730` | fundo base, hero, rodapé |
| `--navy` | `#16244a` | superfícies elevadas, seção de serviços |
| `--cream` | `#f0eee6` | texto sobre azul, seções claras, **único acento** (botão principal) |
| `--steel` | `#8ea2cc` | metadado e traço secundário (≥ 5.5:1 sobre navy) |
| `--muted-on-navy` | `#b4bfd6` | texto de apoio sobre azul (≥ 8:1) |
| `--muted-on-cream` | `#4a5675` | texto de apoio sobre off-white (≥ 6:1) |

Tipo: Montserrat variável (a da marca), auto-hospedada via `@fontsource-variable/montserrat`. Escala 1.25; `display` e `title` usam `clamp()`.
Forma: raio `md` (6px) e `xl` (12px). Sem pill, sem sombra decorativa, sem gradiente, sem blur.

## Decisões de conversão

- Hero abre pelo **problema** (comprador consciente do problema), com a frase do post: "Seu cliente pesquisa antes de comprar."
- Gráfico do hero é uma busca **ilustrativa** (marcada como tal): a ideia vira imagem em vez de mockup genérico.
- CTA diz o canal e o que acontece; o texto abaixo responde "o que acontece ao clicar".
- "Por onde começar" faz o visitante se classificar pela situação, não pelo nome do produto.
- Formulário com 1 campo obrigatório (nome); o resto são toques. Abre o WhatsApp com a mensagem pronta.

## Regras que não se quebram

- Nada de cliente, número, depoimento, logo ou prêmio inventado. Só entra prova real.
- Uma assinatura de movimento por página (entrada do hero em ordem de leitura); o resto é revelação única de ≤ 14px, protegida por `prefers-reduced-motion`.
- Hover só em elemento que faz algo.
- Sem eyebrow, sem palavra de título em outra cor ou gradiente, sem emoji como ícone, sem "como funciona" em 3 passos.

## Pendências que dependem da Mobyze

- Número do WhatsApp (`VITE_WHATSAPP_NUMBER`). Sem ele, o contato cai no DM do Instagram.
- Arquivo oficial do logotipo (hoje há um monograma MZ desenhado como stand-in em `src/components/Logo.tsx` e `public/favicon.svg`).
- Cases reais, com nome e permissão do cliente. Quando existirem, criar a seção de prova logo depois de "Só isso não basta".
