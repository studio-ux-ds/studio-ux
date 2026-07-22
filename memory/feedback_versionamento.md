---
name: feedback-versionamento
description: Robson versiona por PATCH sequencial; e NUNCA passar comando `node`/`npm` pra ele (Windows sem Node)
type: feedback
---
REGRA 1 — NUMERAÇÃO: versionamento = **patch sequencial** — sempre última tag +1 no último dígito (…1.1.16 → 1.1.17 → 1.1.18…), independente de feature/fix/doc. **Nunca** propor salto de minor/major por SemVer. Doc dono reescrito pra isso: `docs/governance/STUDIO_UX_VERSIONING.md` (§1 = trem de release é a regra; SemVer só rótulo de natureza). Ele corrigiu quando propus 1.2.0 ("fica dando esses saltos").

REGRA 2 — NUNCA passar comando `node`/`npm`/`vite`/build pro Robson: **o Windows dele NÃO tem Node** (PowerShell só edita + git). Passei `node scripts/set-version.mjs` e deu "node não reconhecido" → o bump não rodou → v1.1.16 taggeada com package.json ainda em 1.1.15 → publish falhou (não republica 1.1.15). Consertado PRA FRENTE com v1.1.17.
How to apply:
- **Bump de versão:** EU rodo `node scripts/set-version.mjs X.Y.Z` na VM montada (device_bash, tem /usr/bin/node) e entrego os package.json bumpados; OU dou **PowerShell** puro (regex no campo `"version"`), nunca `node`.
- ⚠️ No PowerShell, `[IO.File]::ReadAllText('arquivo')` resolve relativo em `system32`, não na pasta atual — SEMPRE usar `(Resolve-Path arquivo).Path` (caminho absoluto). Foi o que fez o package.json da RAIZ ficar pra trás no bump manual.
- Pro Robson só entrego comandos **git** (add/commit/tag/push) e ações de **painel** (Atualização / Pages). Escrita em arquivo no disco dele = eu via device_commit_files, ou PowerShell puro.
- Deploy dele = git tag + painel; numeração = última tag +1.

INCIDENTE (2026-07-21): v1.1.16 taggeada sem bump (sem node no Windows) → publish falha (fail-safe). Resolvido: v1.1.17 com bump real via PowerShell + VERSIONING.md ajustado. Código do ListScreen estava na main desde o commit da 1.1.16.
