# STUDIO_UX_PUBLISHING.md — Empacotamento e publicação · Packaging & publishing

> Documento normativo vivo. Responde a: **como os pacotes do Studio UX são empacotados, versionados em lockstep, publicados e consumidos pelos produtos?**
> Living normative document. Answers: **how are the Studio UX packages packaged, lockstep-versioned, published and consumed by products?**
> Governança: `platform/STUDIO_UX_PACKAGES.md` (layout físico), `governance/STUDIO_UX_VERSIONING.md` (SemVer/tag), `platform/STUDIO_UX_RUNTIME.md` (runtime descartável).

```
Architecture Boundary Check — STUDIO_UX_PUBLISHING
Resolve · Solves:            a mecânica concreta de EMPACOTAR e PUBLICAR os pacotes (npm workspaces, files, publishConfig,
                             lockstep, npm pack/publish) e de CONSUMIR nos produtos.
                             / the concrete mechanics of PACKAGING and PUBLISHING the packages and CONSUMING them in products.
Não pertence a outro porque · Not elsewhere because:
                             PACKAGES define QUAIS pacotes existem e o grafo; VERSIONING define a POLÍTICA de versão;
                             faltava o COMO operacional de gerar o tarball e subir no registry.
                             / PACKAGES defines WHICH packages exist; VERSIONING the version POLICY; the missing piece is the
                             operational HOW of producing the tarball and pushing to the registry.
Complementa · Complements:   PACKAGES, VERSIONING, RUNTIME, os READMEs dos adapters.
Nunca substitui · Never replaces: PACKAGES (layout), VERSIONING (política SemVer/tag).
Dono · Owner:                este doc, para o domínio "empacotamento e publicação".
```

---

## 1. O monorepo publicável · The publishable monorepo

**PT** — O `package.json` da raiz é **privado** (`"private": true`, nunca publicado) e declara `workspaces` apontando para os 6 pacotes publicáveis. Cada pacote tem responsabilidade única (PACKAGES §1) e é publicado separadamente sob o escopo `@studio-ux-ds/`.

| Pacote | Conteúdo | Depende de (peer) |
|---|---|---|
| `@studio-ux-ds/tokens` | `tokens.css` (CSS custom properties — fonte executável) | — |
| `@studio-ux-ds/components` | `components.css` (classes `.su-*`, Desktop) | `tokens` |
| `@studio-ux-ds/mobile` | `mobile.css` (classes `.su-m-*`, Mobile — irmão do Desktop, P4) | `tokens` |
| `@studio-ux-ds/react` | adapter web: `index.js` (`.su-*`) + `mobile.js`/`mobile/` (`.su-m-*`) | `react`, `tokens`, `components`, `mobile` (opcional) |
| `@studio-ux-ds/react-native` | adapter nativo (View/Text/Pressable, mesmos valores de token) | `react`, `react-native` |
| `@studio-ux-ds/icons` | biblioteca curada de ícones (`icons.js` + `<Icon>` + `icons/*.svg`, estilo único, cor via token) | `tokens`, `react` (opcional) |

**PT** — Não há passo de build: o CSS é fonte executável e os adapters JSX são **runtime descartável** (RUNTIME) que o produto consumidor transpila com o próprio toolchain React/RN (Babel/Metro/Vite). Publicar código-fonte é deliberado — mantém o pacote agnóstico de bundler e alinhado a "trocar o runtime não muda o design".

## 2. Versionamento em lockstep · Lockstep versioning

**PT** — Todos os pacotes carregam a **mesma versão**, batendo com a tag do repositório (VERSIONING: SemVer, tag anotada imutável, número confirmado com o Robson). Para bumpar:

```bash
node scripts/set-version.mjs 1.0.1     # aplica 1.0.1 à raiz + aos 5 pacotes
node scripts/check-packages.mjs        # smoke test (campos, files, lockstep, fronteira P4)
```

**PT** — `check-packages.mjs` falha se: faltar campo obrigatório, um arquivo de `files` não existir, as versões saírem de lockstep, ou o adapter web importar `react-native` (ou o nativo importar o web) — a fronteira Desktop×Mobile (P4) é verificada aqui, antes de qualquer publicação.

## 3. Publicar — GitHub Packages (org `studio-ux-ds`) · Publishing

**PT** — Registry escolhido: **GitHub Packages**, org **`studio-ux-ds`**. O escopo do pacote (`@studio-ux-ds`) casa com o dono do repositório (regra do GitHub Packages), por isso o repositório vive em `github.com/studio-ux-ds/studio-ux`. Cada pacote traz `publishConfig.registry: https://npm.pkg.github.com` + `access: restricted` + `license: UNLICENSED` (design system proprietário da casa).

**Preparação (uma vez):**
1. Criar a organização `studio-ux-ds` no GitHub.
2. Criar o repositório `studio-ux-ds/studio-ux` e enviar o código (`git remote add origin …` + push).

**Publicação automática (recomendado) — via tag:**
**PT** — O workflow `.github/workflows/publish.yml` publica os 5 pacotes sempre que uma tag `vX.Y.Z` é empurrada, usando o `GITHUB_TOKEN` embutido (sem token manual). É o mesmo gesto de release que o resto do ecossistema já usa:

```powershell
node scripts/set-version.mjs 1.0.15   # bump lockstep
# CHANGELOG + commit + push
git tag -a v1.0.15 -m "..." ; git push origin v1.0.15   # dispara o Actions → publica
```

**Publicação manual (alternativa):**
```bash
# .npmrc com token write:packages (ver .npmrc.example)
npm run check                                   # valida os 5 pacotes
npm run pack:all                                # gera .tgz em ./dist-packs (revisão local)
npm publish --workspaces --access restricted    # publica no GitHub Packages
```

**PT** — Publicar respeita a ordem do grafo automaticamente (peers só são resolvidos na instalação). Reusar uma versão já publicada falha (imutável) — sempre bumpe. Se abrir o código um dia, troque `license` e mude `access` para `public`.

## 4. Consumir nos produtos · Consuming in products

**PT** — O produto **declara** a versão MAJOR que usa (VERSIONING §compatibilidade) e nunca edita o framework por dentro. Para instalar do GitHub Packages, o produto precisa de um `.npmrc` (git-ignored) apontando o escopo para o registry, com um token de **leitura** (`read:packages`):

```
@studio-ux-ds:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```
```bash
npm install @studio-ux-ds/tokens @studio-ux-ds/react
```

**Web (Aquapark / IA Studio / Delivery admin):**
```js
import "@studio-ux-ds/tokens/tokens.css";
import "@studio-ux-ds/components/components.css";           // Desktop
import "@studio-ux-ds/mobile/mobile.css";                    // Mobile-web (PWA)
import { Button, DataTable } from "@studio-ux-ds/react";      // adapter Desktop
import { BottomNav, ListItem } from "@studio-ux-ds/react/mobile"; // adapter mobile-web
```

**Nativo (app React Native):**
```jsx
import { ThemeProvider, Button, ListItem } from "@studio-ux-ds/react-native";
```

**PT** — Sem React? Use as classes CSS direto (`.su-*` / `.su-m-*`) — o adapter é opcional. Essa é a garantia do runtime descartável: a verdade visual está no token/CSS, não no wrapper.

## 5. Anti-padrões · Anti-patterns

**PT / EN**
- Publicar a raiz (é `private`). / Publishing the root.
- Versões fora de lockstep entre pacotes. / Out-of-lockstep package versions.
- Adapter web importando o nativo (ou vice-versa) — viola P4. / Web adapter importing the native one.
- Commitar `.npmrc` com token. / Committing `.npmrc` with a token.
- Editar o framework dentro do consumidor. / Editing the framework inside the consumer.

## Referências internas · Internal references
`platform/STUDIO_UX_PACKAGES.md` · `governance/STUDIO_UX_VERSIONING.md` · `platform/STUDIO_UX_RUNTIME.md` · `packages/react/README.md` · `packages/react/mobile/README.md` · `packages/react-native/README.md`

---

*Documento vivo. Mecânica de empacotamento/publicação; o layout físico é do PACKAGES, a política de versão do VERSIONING. · Living document.*
