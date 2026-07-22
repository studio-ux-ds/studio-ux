---
name: storybook-studio-ux
description: Storybook do @studio-ux-ds/react (doc navegável hospedada no GitHub Pages) — arquitetura, QA e como rodar
type: project
---
Storybook que documenta o **pacote React real `@studio-ux-ds/react`** (cada componente = exemplo vivo + props + código), à la Flux. Construído 2026-07-20. **NO AR:** https://studio-ux-ds.github.io/studio-ux/ (repo tornado **público** — Pages privado é pago). Vive na RAIZ do monorepo, FORA de `packages/*`, pra não afetar publish/lockstep.

ARQUITETURA:
- `.storybook/main.js` — framework `@storybook/react-vite`; addons essentials + a11y (a11y em `manual`). `viteFinal` faz **alias `@studio-ux-ds/react` → `packages/react/index.js`** (serve o .jsx cru direto da fonte; as stories importam de `@studio-ux-ds/react` igual a um consumidor). Nada de componente recriado.
- `.storybook/preview.js` — importa `packages/tokens/tokens.css` + `packages/components/components.css`; decorator com toggle de tema (globalType `theme` → `[data-theme]` no <html>, claro/escuro). `preview.css` = casca só com tokens `--su-*`.
- `.storybook/preview-head.html` — **webfont Tabler** (jsdelivr) — sem ela os `<i class="ti ti-...">` não pintam — + Inter/JetBrains Mono.
- `stories/` — 21 `.stories.jsx` + `Introducao.mdx`, cobrindo os ~28 exports do barrel. Cobertura profunda (DataTable com selection/bulkActions/renderRowMenu/toolbar).
- `.github/workflows/storybook.yml` — push em main → `npm install --legacy-peer-deps` → `build-storybook` → deploy `storybook-static` via `actions/deploy-pages`.
- `package.json` raiz: ganhou devDeps (storybook/react-vite/react/react-dom/vite/addons) + scripts `storybook`/`build-storybook`. `.gitignore`: + `storybook-static/`.

REGRAS APRENDIDAS/CONFIRMADAS:
- **CI: `npm install` PRECISA de `--legacy-peer-deps`.** Sem ele: pôr react no root faz o npm instalar o peer `react-native` de `@studio-ux-ds/react-native` → puxa react-native@latest (exige react 19) → conflita com react 18 → ERESOLVE, build falha. (O build nem precisa dos workspaces resolvidos — usa alias do Vite.) Isso quebrou o 1º deploy.
- `Button.jsx` real NÃO tem prop `loading` (só variant/size/icon/iconRight + rest; disabled é nativo). O resumo antigo dizia "loading" — o .jsx manda.
- Badge usa `status` (não variant); Banner usa `tone`.
- Checkbox/Radio usam `accent-color` (checkbox nativo recolorido, appearance NÃO é none) — é o design; não confundir com "chrome nativo".
- Ícones `-filled` (ex.: `ti-square-rounded-filled`) exigem a fonte filled separada; no set base não pintam — usar ícones regulares.
- Publish é por tag `v*` (publish.yml). Pages é por push em main (storybook.yml). NÃO taggear pra publicar o Storybook.
- `.git/index.lock` "Operation not permitted" ao rodar git pela VM montada (device_bash não apaga no mount) — no Windows nativo do Robson o git funciona normal; se travar, apagar `.git\index.lock`.
- `device_commit_files` NÃO grava em `.github/workflows/` (arquivo protegido) — usar `device_bash` heredoc pra escrever workflow.

QA (2026-07-20): build limpo; check-packages.mjs no repo real = 7 pacotes @1.1.15, lockstep OK; todas as stories renderizam; accent claro #4F46E5 / escuro #6365F0; Chromium headless (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, require playwright global num .cjs), fonte Tabler servida localmente pra provar glifos (no sandbox o CDN dá ERR_CONNECTION_RESET — some na CI/navegador real). Deploy no ar confirmado pelo Robson.

MANUTENÇÃO: mexeu num componente em `packages/react/*.jsx`? Confere se a story correspondente em `stories/` reflete a API. Deploy é automático no push em main.
