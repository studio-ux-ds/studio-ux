# Project Generator (Épico 4)

Implementa `docs/generation/STUDIO_UX_PROJECT_GENERATOR.md`. Faz um projeto **nascer conforme** (§1): produto (Desktop **OU** Mobile) → arquétipo → **versão declarada** → estrutura pronta. O projeto gerado é **derivado**, não fork (§3): **declara** a dependência `@studio-ux-ds/*`, nunca copia o framework (Art. 1/14). Pontos de conteúdo nascem vazios (Art. 19).

## Rodar

- Direto: `node packages/cli/generator/generate.mjs --product <desktop|mobile> --archetype <id> --name <nome> [--out <dir>]`
- npm: `npm run create -- -p desktop -a crm -n meu-crm`
- Via CLI: `studio create -p mobile -a customer-portal -n portal-cliente`
- Listar arquétipos: `node packages/cli/generator/generate.mjs --list`

## Arquétipos (§2)

| id | bases | classe |
|---|---|---|
| `base` | desktop/mobile | shell nu |
| `portal` | desktop/mobile | porta de entrada / autoatendimento |
| `crm` | desktop | relacionamento (lista+detalhe) |
| `erp` | desktop | operação densa/transacional |
| `analytics` | desktop | leitura de indicadores |
| `ia-studio` | desktop | orquestração de assistentes (P11) |
| `customer-portal` | desktop/mobile | autoatendimento do cliente final |
| `marketplace` | desktop/mobile | catálogo com muitos atores |
| `backoffice` | desktop | administração interna |

## O que ele materializa

- `studio-ux.json` — manifesto: produto, arquétipo, versão declarada (`~x.y.z`), pacotes consumidos.
- `package.json` — dependências **declaradas** com `~` (anda no trem — último dígito; salto de linha é edição deliberada, VERSIONING §2).
- `.npmrc` — escopo `@studio-ux-ds` → GitHub Packages.
- `index.html` — **shell real** com as classes oficiais (`.su-*` desktop / `.su-m-*` mobile), consumindo o CSS de `node_modules` (dependência declarada), com um ponto de conteúdo vazio por tela.
- `src/screens/<rota>.md` — cada tela como ponto de conteúdo, citando o molde a instanciar (dono: `generation/TEMPLATES`).
- `README.md` — como rodar, versão, e a regra derivado-não-fork.

## Moldes de tela — `studio generate` (dono: TEMPLATES)

`packages/cli/generator/templates.mjs` instancia um **molde de tela** num projeto já criado (implementa `STUDIO_UX_TEMPLATES`).

- `studio generate --mold <nome> --into <projeto> [--name <tela>]` — escreve `<projeto>/src/screens/<tela>.html`, uma tela **abrível no navegador** que compõe só classes `.su-*` do catálogo, com pontos de conteúdo vazios (Art. 19).
- `studio generate --list` — os 9 moldes: `login`, `dashboard`, `list`, `detail`, `form`, `search`, `settings`, `wizard`, `empty`.
- Guard: recusa gerar fora de um projeto criado por `studio create` (sem `studio-ux.json`). O molde **compõe**, nunca redefine token/peça (§3); `list` adapta por produto (tabela Desktop / cartões Mobile).

## Fronteiras (o que NÃO faz)

Não define a interface de comando (é a `CLI`), não é dono dos **moldes de tela** (é `generation/TEMPLATES` — o gerador os **cita**, não os duplica), não exporta tokens (é `EXPORTERS`), não define a mecânica de versão (é `VERSIONING`). Não traz dado de negócio (Art. 19).
