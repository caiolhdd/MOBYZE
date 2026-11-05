# Mobyze · página principal

Página inicial da Mobyze (sites e aplicativos), em React + TypeScript + Tailwind, com Vite.
As decisões visuais estão em [`DESIGN.md`](DESIGN.md).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # checa tipos e gera dist/
```

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
└── styles.css         tokens de cor e movimento
```

## Skills do projeto

`.claude/skills/ui-humanizer` e `.claude/skills/revenue-centric-design`.
Auditoria de interface: `python3 -I .claude/skills/ui-humanizer/scripts/audit.py index.html src`

## Site anterior

O site estático da CHIQ CELL (HTML/CSS/JS e a versão em React) foi arquivado em `legacy/chiq-cell/`, com o histórico preservado.
