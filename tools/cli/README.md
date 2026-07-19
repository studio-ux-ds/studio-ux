# CLI `studio` (Épico 2)

Implementa `docs/tools/STUDIO_UX_CLI.md`. **Verbo, não regra:** cada comando reúne argumentos, **aciona o domínio dono** e apresenta o resultado — nunca reimplementa a lógica do dono (SSOT, Art. 10). Nada trava em silêncio (Art. 5).

- **Rodar:** `node tools/cli/studio.mjs <comando>` · `npm run studio -- <comando>` · (após `npm link`/publicar) `studio <comando>`.

## Os 11 comandos

| Comando | Faz | Dono que aciona | Estado |
|---|---|---|---|
| `studio lint [arquivos]` | detecção estática | `quality/LINTER` | ✅ delega ao linter real |
| `studio export` | exporta tokens (10 alvos) | `generation/EXPORTERS` | ✅ delega ao exporter real |
| `studio tokens [nome] [--export]` | lista/resolve token nos 2 temas | `tokens/*` · EXPORTERS | ✅ real (lê tokens.css) |
| `studio theme [claro\|escuro]` | resolve amostra num tema | `THEMES` | ✅ real |
| `studio doctor` | versão declarada × tag + integridade | VERSIONING + LINTER | ✅ real |
| `studio upgrade` | versão atual × disponível + migração | `governance/VERSIONING` | ✅ real (não muda em silêncio) |
| `studio docs` | lista a doc (a verdade é o git) | `packages/docs` | ✅ lista `docs/` |
| `studio playground` | aponta o catálogo vivo + DevTools | PLAYGROUND + DEVTOOLS | ✅ aponta os HTML |
| `studio create` | cria projeto conforme | `generation/PROJECT_GENERATOR` | ⏳ dono não construído — **diz isso** (Art. 21), não finge |
| `studio generate` | gera uma peça | TEMPLATES + COMPONENT_LIBRARY | ⏳ idem |
| `studio audit` | gradua conformidade (selo) | `CERTIFICATION` | ⏳ idem |

## Honestidade (Art. 21)

Onde o dono já existe (Linter, Exporters, tokens…), a CLI **delega de verdade**. Onde o dono ainda não foi construído (Project Generator, Certification), o comando **existe mas avisa** que o dono não está pronto e retorna código 2 — não inventa uma execução falsa. É o verbo esperando o dono nascer.
