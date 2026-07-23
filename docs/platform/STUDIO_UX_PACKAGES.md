# STUDIO_UX_PACKAGES.md — Arquitetura de Monorepo · Monorepo Architecture

> Documento normativo vivo. Responde a: **como o código da plataforma se organiza fisicamente em pacotes, e qual a responsabilidade de cada um?**
> Living normative document. Answers: **how is the platform's code physically organized into packages, and what is each one's responsibility?**
> Governança: `STUDIO_UX.md` (§11 SSOT), `platform/STUDIO_UX_ARCHITECTURE.md` (mapa lógico), `platform/STUDIO_UX_RUNTIME.md` (camadas de execução). Fonte da verdade de versão: `CHANGELOG.md` + tags git.

```
Architecture Boundary Check — STUDIO_UX_PACKAGES
Resolve · Solves:            o layout FÍSICO do monorepo — quais pacotes existem, o que cada um contém e do que
                             depende. Dá endereço físico aos domínios lógicos.
                             / the PHYSICAL monorepo layout — which packages exist, what each contains and depends
                             on. Gives a physical address to the logical domains.
Não pertence a outro porque · Not elsewhere because:
                             ARCHITECTURE é o mapa LÓGICO de domínios; RUNTIME separa CAMADAS de execução;
                             PLATFORM é a estratégia. Faltava onde, fisicamente, o código de cada domínio mora.
                             / ARCHITECTURE is the LOGICAL domain map; RUNTIME separates EXECUTION layers; PLATFORM
                             is strategy. The missing piece is where, physically, each domain's code lives.
Complementa · Complements:   ARCHITECTURE, RUNTIME, PLATFORM, VERSIONING, ADR_GUIDE, docs/tools/*, docs/quality/*.
Nunca substitui · Never replaces:
                             ARCHITECTURE (domínios lógicos), RUNTIME (camadas de execução), nem os donos de cada
                             domínio (donos internos de tokens, componentes, ícones, etc.).
                             / ARCHITECTURE (logical domains), RUNTIME (execution layers), or each domain's owner.
Dono · Owner:                este doc, para o domínio "arquitetura de monorepo / layout físico".
                             / this doc, for the "monorepo architecture / physical layout" domain.
```

---

## Objetivo · Objective
**PT** — Definir a arquitetura física do monorepo do Studio UX: os pacotes que existem hoje, a responsabilidade única de cada um, o grafo de dependências (acíclico) e o que cada pacote **nunca** contém. O layout dá endereço físico aos domínios lógicos do `ARCHITECTURE` e é o contrato que o gate de publicação (`scripts/check-packages.mjs`) valida antes de qualquer `npm publish`.
**EN** — Define the physical architecture of the Studio UX monorepo: which packages exist today, each one's single responsibility, the (acyclic) dependency graph, and what each package **never** contains. The layout gives a physical address to the `ARCHITECTURE` logical domains and is the contract the publish gate (`scripts/check-packages.mjs`) validates before any `npm publish`.

## Escopo · Scope
**PT** — O layout físico dos pacotes e suas dependências. **Não** define os domínios lógicos (`ARCHITECTURE`), as camadas de execução (`RUNTIME`), a estratégia (`PLATFORM`) nem o conteúdo interno de cada pacote (donos próprios). Descreve o estado atual (pacotes materializados); pacotes previstos que ainda não existem vivem no `ROADMAP.md`, não aqui.
**EN** — The physical package layout and its dependencies. It does **not** define the logical domains (`ARCHITECTURE`), the execution layers (`RUNTIME`), the strategy (`PLATFORM`) or each package's internal content (own owners). Describes the current state (materialized packages); planned packages that do not yet exist live in `ROADMAP.md`, not here.

---

## 1. Os pacotes · The packages

**PT** — O monorepo usa **npm workspaces** (raiz `package.json`, campo `workspaces`) e publica em **GitHub Packages** (`https://npm.pkg.github.com`, acesso `restricted`). Todos os pacotes seguem o namespace `@studio-ux-ds/*` e evoluem em **lockstep de versão** (§3). A ordem abaixo segue o grafo de dependência, do mais básico ao mais alto.

**EN** — The monorepo uses **npm workspaces** (root `package.json`, `workspaces` field) and publishes to **GitHub Packages** (`https://npm.pkg.github.com`, `restricted` access). All packages share the `@studio-ux-ds/*` namespace and evolve in **version lockstep** (§3). The order below follows the dependency graph, from most basic to highest.

| Pacote · Package | Responsabilidade única · Single responsibility | Depende de · Depends on | Nunca contém · Never contains |
|---|---|---|---|
| `@studio-ux-ds/tokens` | Design tokens como CSS custom properties (`tokens.css`) — a fonte executável dos valores congelados desde `v1.0.0` (cor, tipo, espaço, raio, sombra, duração). Publica também os exports **Tailwind preset**, **JS theme**, **JSON**, **W3C DTCG** e **Figma**. | (nada / nothing) | componentes, layout, lógica de tela |
| `@studio-ux-ds/icons` | Biblioteca curada de ícones — SVG (`icons/`), barrel JS (`icons.js`), componente React `<Icon>` (`react.jsx`) e `manifest.json`. Dono do domínio `ICONOGRAPHY`. | `react` (peer, opcional) | componentes, cor fora de token |
| `@studio-ux-ds/components` | Componentes Desktop em **CSS puro** — as classes `.su-*` de `components.css` sobre os tokens. Dono da materialização visual do catálogo. | `tokens` (peer) | React ou qualquer código de tela, dado de negócio |
| `@studio-ux-ds/mobile` | Produto Mobile em **CSS puro** — as classes `.su-m-*` de `mobile.css` sobre os tokens. Irmão do `components` (P4). | `tokens` (peer) | React Native, qualquer coisa do Desktop |
| `@studio-ux-ds/react` | Adapter web React — embrulha as classes `.su-*` numa API de props (`index.js` + `*.jsx`), inclui o mecanismo de tema/accent (`theme.js`), os patterns de shell (`patterns/`) e um adapter mobile-web separado (`./mobile` / `mobile/`). Runtime descartável (`RUNTIME`). | `icons` (peer), `react`/`react-dom` (peer); `tokens` e `components` (peer obrigatório); `mobile` (peer opcional) | React Native (fronteira P4) |
| `@studio-ux-ds/react-native` | Adapter nativo React Native — irmão do adapter web (P4). Primitivas em `*.jsx` sobre `react-native`. | `react`, `react-native` (peer) | qualquer coisa do adapter web (`@studio-ux-ds/react`), DOM |
| `@studio-ux-ds/cli` | CLI oficial `studio` (`studio.mjs` + `lib/linter/exporters/generator/certification/devtools`). Verbo único que aciona os donos de qualidade e geração. | (nada / nothing) | regra de negócio; ser o dono das regras (só as executa) |

**PT** — Cada pacote declara `main`/`exports`/`files` no seu `package.json`; `sideEffects` é `false` nos adapters JS e `["*.css"]` nos pacotes CSS. Nenhum pacote depende de outro por `dependencies` — só por `peerDependencies` (o sistema consumidor traz `react`/`react-dom`/`react-native` e os pacotes irmãos do DS). Isso mantém o grafo acíclico observável e o bundle final do consumidor sob controle.

**EN** — Each package declares `main`/`exports`/`files` in its `package.json`; `sideEffects` is `false` on JS adapters and `["*.css"]` on CSS packages. No package depends on another via `dependencies` — only via `peerDependencies` (the consuming system brings `react`/`react-dom`/`react-native` and the sibling DS packages). This keeps the graph observably acyclic and the consumer's final bundle under control.

## 2. Grafo de dependências · Dependency graph
**PT** — A regra é **acíclica e de baixo para cima**. `tokens` e `cli` são raízes (não dependem de nenhum pacote interno); `components` e `mobile` dependem apenas de `tokens`; `icons` é raiz do lado de ícones; `react` dependencia (peer) de `tokens`, `components`, `icons` e opcionalmente `mobile`; `react-native` é um adapter irmão que consome apenas `tokens` conceitualmente e as primitivas nativas. **Nunca** existe ciclo. Ordem em texto:

```
tokens ────────┬──▶ components ──┐
               └──▶ mobile ──────┤
icons ─────────────────────────── ├──▶ react   (adapter web)
                                  │
                                  └──▶ react-native (adapter nativo)   [fronteira P4]

cli (raiz — verbo de tooling, sem peer interno)
```

**EN** — The rule is **acyclic and bottom-up**. `tokens` and `cli` are roots (they depend on no internal package); `components` and `mobile` depend only on `tokens`; `icons` is a root on the icon side; `react` (peer-)depends on `tokens`, `components`, `icons` and optionally `mobile`; `react-native` is a sibling adapter consuming only `tokens` conceptually and the native primitives. There is **never** a cycle.

## 3. Lockstep de versão e publicação · Version lockstep and publishing
**PT** — Todos os pacotes carregam a **mesma versão** ao mesmo tempo (`STUDIO_UX.md` §7, `governance/STUDIO_UX_VERSIONING.md`). O bump é feito por `scripts/set-version.mjs`, que reescreve `version` na raiz e em cada `packages/*/package.json`. O gate `scripts/check-packages.mjs` reprova o build se houver mais de uma versão no monorepo. A publicação corre no CI (`.github/workflows/publish.yml`) no push de uma tag `vX.Y.Z`: `npm ci --workspaces` → `check-packages.mjs` → `npm publish --workspaces --access restricted`. O ambiente Windows do Robson **não roda `npm publish` local** (`COMO-INTERAGIR-COM-ROBSON.md` §6); toda entrega é por tag + painel de Atualização.

**EN** — All packages carry the **same version** at the same time (`STUDIO_UX.md` §7, `governance/STUDIO_UX_VERSIONING.md`). The bump is done by `scripts/set-version.mjs`, which rewrites `version` at the root and in every `packages/*/package.json`. The gate `scripts/check-packages.mjs` fails the build if there is more than one version in the monorepo. Publishing runs in CI (`.github/workflows/publish.yml`) on a `vX.Y.Z` tag push: `npm ci --workspaces` → `check-packages.mjs` → `npm publish --workspaces --access restricted`. Robson's Windows machine **never runs `npm publish` locally** (`COMO-INTERAGIR-COM-ROBSON.md` §6); every release is a tag + Update-panel deploy.

## 4. A fronteira Desktop × Mobile no monorepo · The Desktop × Mobile boundary in the monorepo
**PT** — `@studio-ux-ds/react` (adapter web) e `@studio-ux-ds/react-native` (adapter nativo) são **pacotes irmãos e separados** que compartilham `tokens` e a linguagem visual, mas **nunca importam um do outro** (P4, `CONSTITUTION` Art. 2). O gate `scripts/check-packages.mjs` faz o scan literal: varre `packages/react/**` procurando `react-native` e `packages/react-native/**` procurando `@studio-ux-ds/react` — qualquer casamento reprova o build antes do `publish`. Note que o adapter web mantém internamente um **adapter mobile-web** (`packages/react/mobile/` + subpath export `./mobile`) para composições web em telas pequenas; esse adapter mobile-web é web (roda em DOM), não é `react-native`, portanto não cruza a fronteira P4.

**EN** — `@studio-ux-ds/react` (web adapter) and `@studio-ux-ds/react-native` (native adapter) are **sibling, separate packages** sharing `tokens` and the visual language, but **never importing from each other** (P4, `CONSTITUTION` Art. 2). The gate `scripts/check-packages.mjs` performs the literal scan: it walks `packages/react/**` looking for `react-native` and `packages/react-native/**` looking for `@studio-ux-ds/react` — any match fails the build before `publish`. Note that the web adapter internally keeps a **mobile-web adapter** (`packages/react/mobile/` + `./mobile` subpath export) for web compositions on small screens; that mobile-web adapter is web (DOM-based), not `react-native`, and therefore does not cross the P4 boundary.

## 5. O que este doc **não** descreve · What this doc does **not** describe
**PT** — Não descreve o interior de cada pacote (donos internos: `docs/tokens/*`, `docs/components/*`, `docs/STUDIO_UX_ICONOGRAPHY.md`, `docs/tools/STUDIO_UX_CLI.md`, etc.), a política de versão (`governance/STUDIO_UX_VERSIONING.md`), o mapa lógico (`platform/STUDIO_UX_ARCHITECTURE.md`), as camadas de execução (`platform/STUDIO_UX_RUNTIME.md`) nem pacotes ainda não implementados (`docs/STUDIO_UX_ROADMAP.md`).
**EN** — Does not describe each package's interior (internal owners: `docs/tokens/*`, `docs/components/*`, `docs/STUDIO_UX_ICONOGRAPHY.md`, `docs/tools/STUDIO_UX_CLI.md`, etc.), the version policy (`governance/STUDIO_UX_VERSIONING.md`), the logical map (`platform/STUDIO_UX_ARCHITECTURE.md`), the execution layers (`platform/STUDIO_UX_RUNTIME.md`) or packages not yet implemented (`docs/STUDIO_UX_ROADMAP.md`).

## Responsabilidades · Responsibilities
**PT** — Nomear os pacotes materializados hoje, a responsabilidade única de cada um, o grafo acíclico, a fronteira física Desktop × Mobile e as regras físicas de publicação (lockstep, `check-packages.mjs`, CI).
**EN** — Name today's materialized packages, each one's single responsibility, the acyclic graph, the physical Desktop × Mobile boundary and the physical publishing rules (lockstep, `check-packages.mjs`, CI).

## Não-responsabilidades · Non-responsibilities
**PT** — Não define os domínios lógicos, camadas de execução, estratégia, política de versão, conteúdo interno dos pacotes, nem pacotes futuros.
**EN** — Does not define logical domains, execution layers, strategy, version policy, packages' internal content, or future packages.

## Integrações e dependências · Integrations and dependencies
**PT** — Realiza fisicamente o mapa do `ARCHITECTURE`; materializa a camada Runtime do `RUNTIME` em código concreto; serve os `EXPORTERS` (que partem de `packages/tokens`) e a certificação/lint (`docs/quality/*`, acionados por `@studio-ux-ds/cli`). Os sistemas consumidores importam `tokens.css` + `components.css` (ou `mobile.css`) + o adapter da tecnologia deles (`@studio-ux-ds/react` para web React ou `@studio-ux-ds/react-native` para nativo).
**EN** — Physically realizes the `ARCHITECTURE` map; materializes the `RUNTIME` layer as concrete code; serves the `EXPORTERS` (starting from `packages/tokens`) and certification/lint (`docs/quality/*`, driven by `@studio-ux-ds/cli`). Consuming systems import `tokens.css` + `components.css` (or `mobile.css`) + the adapter for their technology (`@studio-ux-ds/react` for web React or `@studio-ux-ds/react-native` for native).

## Fluxos · Flows
**PT** — Fluxo de dependência (§2); fluxo de bump/lockstep e publicação por tag (§3); verificação da fronteira Desktop × Mobile e da existência de `files` pelo `check-packages.mjs` (§4). Nascimento de pacote: só quando um domínio físico genuíno aparece, com ADR curto no doc afetado e entrada em `CHANGELOG.md` (adição = MINOR).
**EN** — Dependency flow (§2); bump/lockstep and tag-driven publishing flow (§3); Desktop × Mobile boundary and `files` existence checks by `check-packages.mjs` (§4). Package birth: only when a genuine physical domain appears, with a short ADR in the affected doc and a `CHANGELOG.md` entry (addition = MINOR).

## Boas práticas · Best practices
**PT** — Mantenha cada pacote com **uma** responsabilidade. Preserve o grafo acíclico. Compartilhe pela base (`tokens`) — nunca lateralmente entre adapters. Use `peerDependencies` para o que o consumidor tem que trazer; use `peerDependenciesMeta` para marcar opcional. Se um pacote passar a exigir build (ex.: bundle), o step de build tem que entrar **antes** do `npm publish` no workflow, senão publica sem `dist` (o `check-packages.mjs` exige que tudo em `files` exista). Documentação de cada pacote vive no `README.md` do próprio pacote e no doc dono do domínio (`SSOT` §11).
**EN** — Keep each package to **one** responsibility. Preserve the acyclic graph. Share through the base (`tokens`) — never laterally between adapters. Use `peerDependencies` for what the consumer must bring; use `peerDependenciesMeta` to mark optional. If a package starts requiring a build step (e.g. a bundle), the build must enter the workflow **before** `npm publish`, otherwise it publishes without `dist` (the `check-packages.mjs` requires everything in `files` to exist). Each package's docs live in its own `README.md` and in the domain owner doc (`SSOT` §11).

## Anti-padrões · Anti-patterns
**PT / EN**
- Dependência circular entre pacotes. / Circular dependency between packages.
- `packages/react` importando de `packages/react-native` (ou vice-versa) — reprovado pelo `check-packages.mjs`. / `packages/react` importing from `packages/react-native` (or vice versa) — fails `check-packages.mjs`.
- Colocar componente React em `packages/components` (CSS puro) ou CSS em `packages/react`. / Placing React in `packages/components` (pure CSS) or CSS in `packages/react`.
- Cravar versão em um único pacote quebrando o lockstep (`check-packages.mjs` reprova). / Hard-coding a version in a single package breaking lockstep (`check-packages.mjs` fails).
- Declarar arquivo em `files` sem que exista no disco (o gate reprova). / Declaring a file in `files` that does not exist on disk (the gate fails).
- Pedir `npm build`/`publish` na máquina do Robson (ambiente Windows sem Node). / Asking for `npm build`/`publish` on Robson's machine (Windows without Node).
- Reintroduzir pacotes "guarda-chuva" (ex.: `core`, `desktop`, `templates`, `playground`, `docs`, `testing`, `devtools`) que já foram descartados ou nunca foram materializados. / Reintroducing "umbrella" packages that were dropped or never materialized.
- Colocar dado de negócio em qualquer pacote (`CONSTITUTION` Art. 19). / Putting business data in any package.

## Roadmap
**PT** — Pacotes novos só entram quando um domínio físico genuíno aparece (ex.: um adapter para outra tecnologia). Qualquer expansão é regida por `STUDIO_UX_ROADMAP.md` (fases) e por ADR curto no doc afetado. Ao adicionar um pacote, atualize também `check-packages.mjs` (se ele participar da fronteira P4) e `set-version.mjs` (é automático pelos `workspaces`).
**EN** — New packages only enter when a genuine physical domain appears (e.g. an adapter for another technology). Any expansion is governed by `STUDIO_UX_ROADMAP.md` (phases) and by a short ADR in the affected doc. When adding a package, also update `check-packages.mjs` (if it participates in the P4 boundary) and `set-version.mjs` (automatic via `workspaces`).

## Referências internas · Internal references
`platform/STUDIO_UX_ARCHITECTURE.md` · `platform/STUDIO_UX_RUNTIME.md` · `platform/STUDIO_UX_PLATFORM.md` · `governance/STUDIO_UX_VERSIONING.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 2, 10, 19) · `STUDIO_UX.md` §7 · §11 · `docs/tools/STUDIO_UX_CLI.md` · `docs/STUDIO_UX_ICONOGRAPHY.md` · `docs/tokens/STUDIO_UX_DESIGN_TOKENS.md` · `docs/components/STUDIO_UX_COMPONENT_LIBRARY.md` · `scripts/check-packages.mjs` · `scripts/set-version.mjs` · `.github/workflows/publish.yml`

---

*Documento vivo. Layout físico do monorepo materializado; o mapa lógico é do ARCHITECTURE, a execução do RUNTIME, o futuro do ROADMAP. · Living document. Materialized physical monorepo layout; the logical map belongs to ARCHITECTURE, execution to RUNTIME, the future to ROADMAP.*
