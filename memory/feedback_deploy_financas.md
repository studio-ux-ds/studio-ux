---
name: feedback-deploy-financas
description: Armadilhas de deploy do Finanças (dep range, index.lock, upgrade.sh) — como evitar falha de ADMIN_BUILD
type: feedback
---
Aprendido consertando o deploy da Receitas (v0.1.29/30 falharam, v0.1.31 subiu).

1) **Consumidor precisa PINAR a versão que tem a feature.** O Finanças tinha `@studio-ux-ds/react: ~1.1.15`. O `ListScreen` só existe em 1.1.16+. `~1.1.15` é satisfeito por 1.1.15, e o `npm install` do `upgrade.sh` **não sobe** um pacote já instalado que ainda satisfaz a faixa → o servidor ficou no `react@1.1.15` (sem ListScreen) → `import { ListScreen }` quebrou o `ADMIN_BUILD`.
   How to apply: ao adotar uma feature nova do DS num sistema, **bumpar a dep do consumidor pra `~<versão-com-a-feature>`** (ex.: `~1.1.18`), não deixar na faixa antiga. Senão o build do servidor puxa a versão velha.

2) **`.git/index.lock` recorrente:** as ferramentas remotas (device_bash rodando `git status`) tocam no git da pasta montada e o mount **não deixa apagar** o `index.lock` → o `git commit` do Robson falha com "index.lock: File exists". Pior: uma vez o `git commit` falhou (lock) mas o `git tag` rodou assim mesmo, taggeando o COMMIT ERRADO (v0.1.30 pegou código sem o bump) → deploy falhou igual.
   How to apply: **NÃO rodar git (nem `git status`) via device_bash nos repos do Robson** — só edições de arquivo (python) e device_commit_files. Quando o Robson for commitar: `Remove-Item -Force .git\index.lock` ANTES, e conferir que o commit imprimiu "[main xxx] N files changed" ANTES de taggear (nunca taggear sem commit ok).

3) **upgrade.sh (Finanças):** etapas ORCHESTRATOR→PREFLIGHT→BACKUP→GIT_FETCH→GIT_CHECKOUT→API_INSTALL→PRISMA_PUSH→API_BUILD→ADMIN_INSTALL→ADMIN_BUILD(npm run build + copiar pro /public/admin). Falha em qualquer etapa = **fail-safe** (aborta, fica na versão anterior, nada pela metade). `ADMIN_INSTALL` ok + `ADMIN_BUILD` falha = pacote instalou mas o vite build quebrou (tipicamente import faltando). O painel não mostra o erro do vite — diagnosticar reproduzindo o build na nuvem (mirror dos @studio-ux-ds + config real).

4) **device_stage_files pode devolver cópia EM CACHE** (me deu um package.json velho sem o `react`). Confirmar estado real via `git show HEAD:arquivo` (device_bash, leitura) quando a dúvida for de conteúdo atual, não confiar só no stage.
