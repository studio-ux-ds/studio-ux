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

## Fronteira honesta (Art. 21)

`create`, `generate`, `audit` (estrutura), `tokens`, `theme`, `doctor`, `upgrade`, `docs`, `playground` funcionam a partir de qualquer diretório do monorepo. **`lint` (auditoria de contraste) e `export`** leem a **fonte de tokens** (`packages/tokens/tokens.css`) pelo layout do monorepo — publicados assim, assumem o workspace do Studio UX. Resolver a fonte via `@studio-ux-ds/tokens` instalado (uso num projeto consumidor puro) é o próximo passo declarado — não finjo que já é 100% consumer-side.
