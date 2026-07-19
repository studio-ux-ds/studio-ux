# @studio-ux-ds/cli

CLI oficial do Studio UX (`studio`). Implementa `docs/tools/STUDIO_UX_CLI.md`. **Verbo, não regra:** cada comando reúne argumentos, **aciona o domínio dono** e apresenta o resultado — nunca reimplementa a lógica do dono (SSOT, Art. 10).

Este pacote é a **casa física do ferramental da plataforma**: além do orquestrador `studio.mjs`, traz as ferramentas que ele aciona.

- `bin: studio` → `studio.mjs`. Rodar: `studio <comando>` (após instalar/`npm link`), `node packages/cli/studio.mjs <comando>`, ou os scripts do root (`npm run studio -- …`).

## Estrutura

| Caminho | Dono / função |
|---|---|
| `studio.mjs` | orquestrador (11 comandos) |
| `linter/lint.mjs` (+ `fixtures/`) | `quality/LINTER` — detecção estática |
| `exporters/export-tokens.mjs` | `generation/EXPORTERS` — exporta tokens (10 alvos) |
| `generator/generate.mjs` | `generation/PROJECT_GENERATOR` — cria projeto |
| `generator/templates.mjs` | `generation/TEMPLATES` — instancia molde de tela |
| `certification/certify.mjs` | `CERTIFICATION` — gradua (consome o Linter) |
| `devtools/index.html` | `tools/DEVTOOLS` — 9 inspetores (abrir no navegador) |

## Os 11 comandos

`create · generate · doctor · lint · audit · upgrade · tokens · theme · docs · playground · export` — todos delegam de verdade ao dono (nenhum "não construído").

## Consumer-side (instalado num projeto)

Todo o CLI funciona **instalado** num projeto consumidor, não só no monorepo. As ferramentas são acionadas por caminho **self-relativo** (não dependem do layout do repo), e a **fonte de tokens** é resolvida por precedência: `--tokens <caminho>` / env `STUDIO_UX_TOKENS` → pacote **instalado** `@studio-ux-ds/tokens` (via `node_modules`) → layout do monorepo (fallback dev). Nunca em silêncio (Art. 5): se não achar, lança erro listando o que tentou.

- `studio lint <tela>` — usa o `tokens.css` do `@studio-ux-ds/tokens` instalado (auditoria de contraste contra a paleta real do projeto).
- `studio export [--out <dir>]` — lê os tokens instalados e escreve os artefatos na **pasta do consumidor** (`./studio-ux-tokens` por padrão; no monorepo, `packages/tokens/exports`). A versão do carimbo vem do pacote de tokens instalado.
- `studio create/generate/audit` — a versão declarada nos projetos gerados é a do próprio pacote `@studio-ux-ds/cli` (lockstep com o framework).
- `docs`/`playground` são dev-side (vivem no repositório do framework); num consumidor, avisam onde encontrá-los em vez de quebrar.

