# Changelog — Studio UX

> **PT** — Histórico do produto por versão. Esta é a **fonte da verdade de versão** (com as tags git). A documentação em `docs/` descreve o estado ATUAL; o histórico do que mudou mora aqui. Formato baseado em [Keep a Changelog](https://keepachangelog.com); versionamento [SemVer](https://semver.org).
>
> **EN** — Product history by version. This is the **version source of truth** (together with git tags). The docs under `docs/` describe the CURRENT state; the history of what changed lives here. Format based on Keep a Changelog; SemVer versioning.

---

## [Unreleased]

Nada pendente. / Nothing pending.

---

## [1.1.0] — 2026-07-19 — Catálogo de componentes completo (bloco A do GAP_AUDIT) · Component catalog completed

- ✅ **Regra suprema (Constituição Art. 21):** melhor erro visível do que buraco oculto. Implementa-se tudo o que a doc manda de uma vez; proibido suavizar/stub; limitação real → pausa e reporta.
- ✅ **Auditoria de completude** (`docs/audits/STUDIO_UX_GAP_AUDIT.md`) — cruza doc × código; separa "buraco de porte" (bloco A) de "plataforma futura" (bloco B).
- ✅ **Bloco A fechado (CSS + adapter React):** `Avatar` (imagem/iniciais/status), `NumericInput` (com passos +/−, nunca `input[type=number]`), `TextArea`, `Link`, `Banner` desktop, `Tag` removível, `Checkbox` indeterminado; e os wrappers React que faltavam para CSS já existente: `Combobox`, `FileUpload`, `CommandPalette`, `DatePicker` (calendário funcional). Adapter React: 47 exports, todos validados (esbuild + checagem de resolução).
- ✅ **Tokens que faltavam:** grupos `opacity`, `z-index` (pilha nomeada) e `breakpoints` — aditivos, sem tocar nos valores congelados.
- **Não implementado de propósito (honestidade — Art. 21):** o **bloco B** (CLI, exporters, linter, devtools, gerador de projeto, pacotes `core`/`icons`/`testing`/`devtools`) é software executável e fica como roadmap real — NÃO virou stub. Item aberto: paridade do adapter React Native (eixo próprio).
- **MINOR** (adição retrocompatível): 1.0.x → **1.1.0**, lockstep nos 5 pacotes.

---

## [1.0.16] — 2026-07-19 — Demo do sistema + slot de marca + logins corrigidos · System demo + brand slot + login fixes

- ✅ **`examples/app.html` — demo navegável como um sistema:** login → painel, clientes → **detalhe** (abas), conversas (chat com envio de mensagem), relatórios, ajustes. Roteador em JS, toasts, modal de "novo cliente", ConfirmDialog em ação destrutiva, seletor de tema e de **cor de ação** ao vivo. **Adapta ao celular** (sidebar → barra inferior, grids empilham, chat em painel único) — degradação do desktop; num produto real seriam as telas `.su-m-*` (P4).
- ✅ **`examples/chat.html`** — Central de atendimento (lista + thread + composer), tela que faltava.
- ✅ **Logins corrigidos:** "Esqueci a senha?" virou link discreto **abaixo** do campo (não competindo com o label); painel de marca do desktop rebalanceado (headline + pitch + 3 destaques); login mobile sem o vão gigante (CTA não é mais empurrado ao fundo).
- ✅ **Slot de marca (white-label):** classe `.su-brand__logo` agora no `components.css` + doc `docs/platform/STUDIO_UX_BRANDING.md` (onde ancoram logo do sistema, favicon e ícone de app/PWA; produto injeta em runtime; cor vem do acento).
- ✅ **Exemplos navegáveis:** sidebar dos exemplos desktop leva a cada tela; "Faturas" (sem tela) virou "Conversas". Galeria `index.html` atualizada (app em destaque + chat).
- Versões em lockstep na 1.0.16 (o `components.css` ganhou `.su-brand__logo`).

---

## [1.0.15] — 2026-07-19 — Publicação no GitHub Packages (org `studio-ux-ds`) · Publish to GitHub Packages

- ✅ Registry definido: **GitHub Packages**, org **`studio-ux-ds`** (`studio-ux` e `studioux` estavam tomados). Escopo renomeado para **`@studio-ux-ds`** em todos os pacotes/docs/scripts (casa com o dono do repositório). Os 5 `package.json` ganharam `publishConfig.registry: https://npm.pkg.github.com` e `repository.url` da org `github.com/studio-ux-ds/studio-ux`.
- ✅ `.github/workflows/publish.yml` — **publica automaticamente os 5 pacotes ao empurrar uma tag `v*`**, usando o `GITHUB_TOKEN` embutido (sem token manual). Roda `check-packages.mjs` antes de publicar.
- ✅ `.npmrc.example` reescrito para o GitHub Packages (publicar = `write:packages`; consumir = `read:packages`; CI não precisa de token).
- ✅ `STUDIO_UX_PUBLISHING.md` atualizado: preparação da org/repo, publicação por tag (automática) e manual, e como os produtos consomem via `.npmrc`.
- Versões em lockstep na 1.0.15.

---

## [1.0.14] — 2026-07-19 — Empacotamento: monorepo npm workspaces publicável · Packaging: publishable npm workspaces monorepo

- ✅ `package.json` na raiz (**privado**, nunca publicado) com `workspaces` dos 5 pacotes; versionamento **em lockstep**.
- ✅ `packages/mobile/package.json` criado (faltava) — `@studio-ux/mobile` (classes `.su-m-*`).
- ✅ Todos os `package.json` normalizados: `files`, `license` (UNLICENSED), `repository`, `author`, `publishConfig` (`access: restricted`), `keywords`. Confirmado via `npm pack --dry-run` que cada tarball leva só o necessário (a subpasta `react/mobile/` inclusa).
- ✅ `scripts/set-version.mjs` (bump em lockstep raiz+pacotes) e `scripts/check-packages.mjs` (smoke test: campos, `files` existentes, lockstep e **fronteira P4** — web ⊥ nativo).
- ✅ `docs/platform/STUDIO_UX_PUBLISHING.md` — como empacotar, versionar, publicar (npm/GitHub Packages/interno) e **consumir** nos produtos. `.npmrc.example` + `.gitignore` (ignora `node_modules`, `dist-packs`, `.npmrc`, `*.tgz`, lockfile).
- **Sem build:** CSS é fonte executável e os adapters JSX são runtime descartável que o consumidor transpila — pacotes agnósticos de bundler.
- Versões em lockstep na 1.0.14 (raiz + 5 pacotes).

---

## [1.0.13] — 2026-07-19 — Galeria de exemplos (`examples/index.html`) · Examples gallery

- ✅ `examples/index.html` — vitrine única que lista os 13 exemplos em cards, agrupados por **Desktop** (5) e **Mobile** (8), cada card com ícone, descrição e link. Toggle de tema, seletor de cor de ação ao vivo e atalho para o Playground de componentes.
- Verificado: todos os 13 links resolvem; nenhuma classe fantasma.

---

## [1.0.12] — 2026-07-19 — Mais exemplos Mobile: Entrar, Início, Configurações · More Mobile examples

- ✅ `examples/mobile-login.html` — **Entrar** (tela própria mobile, P4): marca no topo, campos com ícone, CTA único de destaque, SSO empilhado, link de recuperação.
- ✅ `examples/mobile-inicio.html` — **Início**: saudação, 4 KPIs (`.su-m-stat`), ações rápidas (`.su-m-actions`), atividade recente (itens com valor + status à direita) e bottom nav com FAB central.
- ✅ `examples/mobile-configuracoes.html` — **Configurações**: seções agrupadas (conta, aparência, notificações, sobre), tema escuro + **seletor de cor de ação** (recolore ao vivo) e switches (`.su-switch` de components.css — importado junto por ser componente universal). Sair em destaque de perigo.
- Verificado: nenhuma classe fantasma. Paridade com os exemplos Desktop da v1.0.11.

---

## [1.0.11] — 2026-07-19 — Mais exemplos Desktop: Entrar, Relatórios, Configurações · More Desktop examples

- ✅ `examples/login.html` — tela de **Entrar**: painel de marca + formulário (e-mail/senha com ícone, "manter conectado", SSO Google/Microsoft), sóbrio, um acento só (P8), toggle de tema.
- ✅ `examples/analytics.html` — **Relatórios**: filtros (segmented de período + canal), 4 KPIs, gráfico de barras (composição pura, cor de token), breakdown por canal e tabela "produtos mais vendidos". Barras montadas por JS — só a altura é dado; a cor vem de `--su-action`.
- ✅ `examples/configuracoes.html` — **Configurações**: abas de pasta (Geral/Aparência/Notificações/Segurança), perfil da empresa (form grid), **seletor de cor de ação** (7 acentos, recolore ao vivo), notificações (switches, "todo automatismo nasce desligado") e zona de perigo (ação destrutiva com aviso — P13).
- Todos reusam o shell/sidebar dos exemplos existentes; verificado: nenhuma classe fantasma.

---

## [1.0.10] — 2026-07-19 — Adapter React para mobile-web (`@studio-ux/react/mobile`) · React adapter for mobile-web

- ✅ Novo subpath **`@studio-ux/react/mobile`** (`packages/react/mobile/`): wrappers React sobre as classes `.su-m-*` do `mobile.css`, para PWA/mobile-web em React. Irmão do adapter Desktop (P4) — não é o desktop "responsivo".
- **Componentes (~25):** `TopBar`, `Greeting`, `SearchBar`, `BottomNav` (+FAB), `Footer`, `Cta`; `Card`, `List`, `ListItem`, `Stat`, `Chips`/`Chip`; `DetailHeader`, `MobileTabs`, `QuickActions`/`QuickAction`; `OfflineBanner`, `SyncBanner`, `Banner`, `Notification`, `StepBar`; `Field`, `Input`, `PhoneInput`, `Sheet`; `SwipeableRow` (touch, com alternativa — P19), `ScannerFrame` (câmera é do produto).
- `mobile.css`: adicionadas classes token-based que os mockups faziam via inline — `.su-m-sheet-backdrop`, `.su-m-detail-head__body`/`__meta`, `.su-m-notif__body` e variantes de tom `.su-m-notif__icon--{success,warning,danger,info}` (paridade com o adapter RN; aditivo, não-quebra).
- `packages/react/package.json`: `exports` com subpath `./mobile`.

---

## [1.0.9] — 2026-07-15 — Adapter React Native — paridade com o mobile · RN adapter — mobile parity

- ✅ `packages/react-native/` completado até a paridade com `mobile.css`: `Greeting`, `SearchBar`, `PhoneInput` (E.164), `MobileTabs`, `QuickActions`/`QuickAction`, `DetailHeader`, `OfflineBanner`/`SyncBanner`/`Banner`, `Notification`, `SwipeableRow` (gesto via PanResponder, com alternativa — P19), `ScannerFrame` (câmera é do produto), `Footer`. Barrel `index.js` atualizado (~29 componentes).
- **Regra mantida:** primitivas nativas, mesmos valores de token; ícones e câmera vêm do produto (`renderIcon`/`camera`); gesto sempre com alternativa.

---

## [1.0.8] — 2026-07-15 — Adapter Mobile nativo (React Native) · Native Mobile adapter (React Native)

- ✅ `packages/react-native/` — adapter Mobile **irmão** do web (P4): `theme.jsx` (tokens `v1.0.0` em JS, claro/escuro via `useColorScheme`, accent por tenant), `Button`/`Cta`, `Badge`/`Card`/`Stat`/`Chip`/`Divider`, `Field`/`Input`, `TopBar`/`ListItem`/`BottomNav`, `Sheet`/`StepBar` + `index.js` + `README` + `package.json` (`@studio-ux/react-native`).
- **Regra:** mesmos VALORES de token, primitivas nativas próprias (`View`/`Text`/`Pressable`) — não reutiliza classes `.su-*` nem o layout web. Ícones via `renderIcon` (produto). Runtime descartável (`RUNTIME`).

---

## [1.0.7] — 2026-07-15 — Playground (catálogo vivo) · Playground (live catalog)

- ✅ `playground/index.html` — catálogo vivo navegável: todos os componentes por categoria (Fundamentais, Formulário, Dados, Navegação, Overlays, Feedback), em seus estados, com **troca de tema (claro/escuro)** e **seletor de cor de ação ao vivo** (7 acentos) — prova o eixo de marca do `THEMES` reapontando `--su-action` e a interface inteira acompanhando.

---

## [1.0.6] — 2026-07-15 — Camada React completa · React layer complete

- ✅ `packages/react/` ampliado até a paridade com o catálogo Desktop (~35 componentes): `Select`, `Checkbox`, `Radio`, `Switch`, `SegmentedControl`, `Stepper`, `Sidebar`/`NavItem`/`TopBar`/`Breadcrumb`, `Drawer`/`Sheet`/`Menu`/`Tooltip`/`Popover`, `DescriptionList`/`Timeline`/`Pagination`/`Accordion`, `EmptyState`/`Skeleton`/`Spinner`/`ProgressBar`. Barrel `index.js` atualizado.
- Cada componente aponta para uma classe `.su-*` existente; props → estados, nunca valores (P1); acessibilidade reforçada (aria, foco, Esc).

---

## [1.0.5] — 2026-07-15 — Camada React (núcleo) · React layer (core)

- ✅ `packages/react/` — adapter React: `Button`/`IconButton`, `Badge`, `Field`/`Input`/`PhoneInput`, `Card`/`StatCard`, `Tabs`, `Modal`/`ConfirmDialog`, `ToastProvider`/`useToast`, `DataTable` (seleção em lote) + `index.js` (barrel) + `README`.
- ✅ `package.json` para `@studio-ux/tokens`, `@studio-ux/components`, `@studio-ux/react` (imports reais/instaláveis).
- **Regra:** o adapter só embrulha classes `.su-*` (zero estilo novo); props traduzem para estados, nunca valores (P1). É runtime descartável (`RUNTIME`), não Specification.

---

## [1.0.4] — 2026-07-15 — Fase 4 (Mobile) completa · Phase 4 (Mobile) complete

- ✅ `packages/mobile/mobile.css` ampliado: cabeçalho de detalhe, sub-abas por toque, KPI compacto, ações rápidas (círculos), CTA + rodapé fixo, campo grande de toque, barra de progresso de etapa, sync/offline.
- ✅ `examples/mobile-detalhe.html` — detalhe do cliente (KPIs, ações rápidas, dados, CTA).
- ✅ `examples/mobile-cadastro.html` — cadastro em **etapas** (mobile), contraparte do Wizard Desktop (P4). Rodapé com **um CTA proeminente**; voltar na seta do topo (alinhado à referência).
- ✅ `mobile.css`: **swipe** em item de lista (com alternativa no "…"), **Scanner** (moldura + alternativa manual, P19), **notificações** (item + banner), **offline/sync** de primeira classe. `.su-m-cta` com `appearance:none` (renderiza cheio).
- ✅ `examples/mobile-scanner.html` e `examples/mobile-notificacoes.html`.
- **Fase 4 (Mobile) essencialmente completa.** Próximo: camada React (opcional) e/ou playground/mais exemplos.

---

## [1.0.3] — 2026-07-15 — Mobile + PhoneInput + Wizard de cadastro + correções · Mobile + PhoneInput + registration Wizard + fixes

### Adicionado · Added
- **Fase 4 (Mobile) iniciada:** `packages/mobile/mobile.css` — produto irmão (P4): Top Bar, Bottom Navigation (ação central), Cards, list items tocáveis ≥44px, chips, bottom sheet, indicador offline. `examples/mobile-clientes.html` — Clientes em versão mobile (lista + bottom nav + filtro em sheet).
- **`PhoneInput`** implementado em `components.css` (E.164, seletor de país) — antes só especificado no catálogo.
- **`FormSection` / `su-form-grid` / `su-form-actions`** para formulários longos multi-coluna.
- **`examples/clientes.html`** — CRUD completo: DataTable interativa (seleção em lote + menu de linha) + **cadastro em etapas (Wizard/Stepper)** como tela dedicada, com PhoneInput.

### Corrigido · Fixed
- **`.su-tab` (Tabs) e `.su-segment` (SegmentedControl):** `appearance:none` — não renderizam mais como "botão nativo" do SO (casca de borda). Correção na raiz, vale para todo consumidor.
- **`.su-m-navitem` (Bottom Navigation):** reset de botão blindado (sem caixa nativa).
- **List item mobile:** nome trunca com reticências; valor + status empilhados à direita (evita quebra em telas estreitas).
- **Padrão de cadastro Desktop:** trocado o Drawer estreito (padrão curto/mobile) por **tela dedicada** — como manda o CRUD Desktop para entidade com muitos campos.

### Nota · Note
- **CPF/CEP são localização BR** (responsabilidade do produto consumidor, não do DS); no exemplo usam `TextInput` comum. O **telefone** usa o componente oficial `PhoneInput`.

---

## [1.0.2] — 2026-07-15 — Componentes especializados + exemplo · Specialized components + example

- ✅ `packages/components/components.css` — **grupo 3 (especializados):** Combobox, DatePicker/Calendar, FileUpload, Drawer/Sheet, Accordion, Stepper/Wizard, DescriptionList, ProgressBar, Timeline, CommandPalette, SegmentedControl, Divider.
- ✅ `examples/dashboard.html` — Painel completo composto só com o kit (prova de composição; alterna tema).
- **Catálogo Desktop essencialmente completo** — todos os componentes do catálogo agora em CSS sobre os tokens.
- Correções: convenção de versão ajustada para a faixa `v1.0.x` (`HANDOFF`, `VERSIONING`); ícones da sidebar no preview trocados pelos oficiais.

---

## [1.0.1] — 2026-07-15 — Componentes Desktop (fundamentais + estrutura) · Desktop components

**Fase 3 — Biblioteca de Componentes.** Implementação de referência **tech-agnóstica** (CSS + tokens). / Phase 3 — Component Library. Tech-agnostic reference implementation.

- ✅ `packages/tokens/tokens.css` — todos os tokens congelados como CSS custom properties (claro/escuro/reduzir-movimento).
- ✅ `packages/components/components.css` — **grupo 1 (fundamentais):** Button (primary/secondary/ghost/danger + tamanhos + estados + foco), IconButton, Badge/Status, FormField/Input (+ erro), Table, Modal/ConfirmDialog, Toast, Spinner.
- ✅ **grupo 2:** Sidebar, TopBar, Tabs (folder+pills), Breadcrumb, Select, Checkbox, Radio, Switch, Menu/Dropdown, Tooltip, Popover, Card, StatCard, EmptyState, Skeleton, Pagination.
- ✅ `packages/components/demo.html` — demonstração com alternância de tema.

---

## [1.0.0] — 2026-07-15 — 🎯 Tokens Frozen · Design Tokens Congelados

**PT** — **Marco `v1.0.0`.** A Fase 2 (materialização dos Design Tokens) foi concluída: as seis camadas foram escolhidas, aprovadas pelo Robson e **congeladas** como o primeiro **contrato estável** que um sistema consumidor pode declarar. A estética deixou de ser provisória. A partir daqui, mudança de valor de token segue SemVer (`governance/STUDIO_UX_VERSIONING.md`).

**EN** — **`v1.0.0` milestone.** Phase 2 (Design Token materialization) is complete: the six layers were chosen, approved by Robson and **frozen** as the first **stable contract** a consumer system can declare. Aesthetics are no longer provisional. From here, token value changes follow SemVer.

- ✅ **Cor · Color** (`tokens/STUDIO_UX_COLOR_SYSTEM.md` §9) — escala neutra 0–900, papéis semânticos claro/escuro, 7 acentos (Índigo padrão), status; contraste WCAG AA conferido.
- ✅ **Tipografia · Typography** (`tokens/STUDIO_UX_TYPOGRAPHY.md` §9) — Inter (UI) + JetBrains Mono; escala de 9 papéis; pesos 400/500/600; base 15px.
- ✅ **Espaço · Spacing** (`tokens/STUDIO_UX_SPACING.md`) — grade 4px, `space-0…24`, papéis inset/stack/inline.
- ✅ **Raio · Radius** (`tokens/STUDIO_UX_DESIGN_TOKENS.md`) — sm 6 / md 8 / lg 12 / xl 16 / full.
- ✅ **Elevação · Elevation** — raised / overlay / modal (poucos níveis; escuro clareia a superfície).
- ✅ **Motion** — durações 120/200/320ms; curvas standard/entrance/exit; respeita `prefers-reduced-motion`.

**Próxima fase / Next phase:** **Fase 3 — Biblioteca de Componentes** (implementação, Desktop primeiro), sobre estes tokens congelados.

---

## [0.3.1] — 2026-07-15 — Fase 1.6 validada · Phase 1.6 validated

**PT** — A **Fase 1.6 (UI Exploration)** foi concluída e a linguagem visual **aprovada** por decisão humana, validada em ~14 cenários (dashboard, analytics, DataTable, formulário, wizard, detalhe+timeline, login, mobile, estados, confirm+toast, configurações, command palette, filtro mobile, menu de linha). Decisões travadas: **(1)** direção **sóbria** (sem gradientes — o DNA congelado se mantém; a variação expressiva foi vista e recusada); **(2)** **cor de ação configurável** — paleta de 7 acentos sóbrios (Índigo padrão, Azul, Teal, Verde, Violeta, Cobre, Grafite), um por tema, pelo eixo de marca do `THEMES`. Sem mudança estrutural. Abre a **Fase 2 — Materialização dos Tokens**.

**EN** — **Phase 1.6 (UI Exploration)** is complete and the visual language **approved** by human decision, validated across ~14 scenarios. Locked decisions: **(1)** the **sober** direction (no gradients — the frozen DNA holds; the expressive variant was reviewed and declined); **(2)** a **configurable action color** — a palette of 7 sober accents, one per theme, via the `THEMES` brand axis. No structural change. Opens **Phase 2 — Token Materialization**.

---

## [0.3.0] — 2026-07-15 — 🧊 Foundation Frozen · Fundação Congelada

**PT** — A Fundação do Studio UX foi **oficialmente congelada**. A partir desta versão, toda evolução ocorre **exclusivamente através da implementação** (Fase 2 — tokens em diante). Mudanças estruturais passam a exigir **RFC + ADR** (`governance/STUDIO_UX_RFC_GUIDE.md`, `governance/STUDIO_UX_ADR_GUIDE.md`). Componentes novos, **somente mediante necessidade comprovada por produtos consumidores** (auditoria em `docs/audits/`).

**EN** — The Studio UX Foundation is **officially frozen**. From this version on, evolution happens **exclusively through implementation** (Phase 2 — tokens onward). Structural changes now require **RFC + ADR**. New components only upon **need proven by consuming products**.

- Base da decisão / Decision basis: `docs/audits/STUDIO_UX_PRODUCT_AUDIT.md` (~93% de cobertura genérica, 0 gaps críticos), `docs/audits/FINAL_ARCHITECTURE_REVIEW.md`, `docs/audits/FOUNDATION_FREEZE_DECISION.md` (✅ SIM), `docs/audits/IMPLEMENTATION_PLAN_REVIEW.md`.
- Próxima fase / Next phase: **Implementação (Fase 2 — materialização dos tokens).**

---

## [0.2.3] — 2026-07-15 — Épicos 2–5: Ferramentas, Qualidade, Geração, IA · Epics 2–5: Tools, Quality, Generation, AI

### Adicionado · Added

**PT — A plataforma completa em documentação.** Os quatro épicos restantes da camada de plataforma, entregues numa leva (sem código para deploy, o portão por épico perde a razão). Nada contradiz a fundação; **nenhum código, nenhum valor estético**.

**EN — The full platform in documentation.** The four remaining platform-layer epics, delivered in one batch. Nothing contradicts the foundation; **no code, no aesthetic values**.

- **Épico 2 — Ferramentas / Tools:** `docs/tools/STUDIO_UX_CLI.md` (CLI `studio` — 11 comandos), `docs/tools/STUDIO_UX_DEVTOOLS.md` (9 inspetores), `docs/tools/STUDIO_UX_PLAYGROUND.md`.
- **Épico 3 — Qualidade / Quality:** `docs/quality/STUDIO_UX_LINTER.md` (catálogo de regras — detecta), `docs/quality/STUDIO_UX_COMPLIANCE.md` (mede continuamente). Fronteira canônica: *Linter detecta · Compliance mede · Certification gradua.*
- **Épico 4 — Geração / Generation:** `docs/generation/STUDIO_UX_PROJECT_GENERATOR.md` (10 arquétipos), `docs/generation/STUDIO_UX_EXPORTERS.md` (10 alvos plugáveis).
- **Épico 5 — Ecossistema de IA / AI Ecosystem:** `docs/context/STUDIO_UX_AI_ECOSYSTEM.md` (context loading, self-audit, protocolo anti-invenção).

### Alterado · Changed

- **`docs/STUDIO_UX_CERTIFICATION.md` expandido** para dois escopos com dono único: **tela** (Bronze→Platinum) e **sistema** (Bronze→**Enterprise**, §8). Sem `CERTIFICATION_SYSTEM.md` separado (SSOT).
- **`STUDIO_UX.md`:** mapa SSOT (§11) ampliado com os 8 domínios novos; rótulo de certificação atualizado para tela+sistema.
- **Docs-índice vivos:** `README`, `ROADMAP` (épicos 2–5 concluídos), `context/STUDIO_UX_HANDOFF.md`.

### Notas · Notes

- **PT** — Camada de plataforma documental **completa** (Épicos 1–5). Pendentes do design system: Fase 1.6 (UI Exploration) e Fase 2 (tokens). Implementação (código) começa na Fase 2.
- **EN** — Platform documentation layer **complete** (Epics 1–5). Design-system pending: Phase 1.6 (UI Exploration) and Phase 2 (tokens). Implementation (code) starts at Phase 2.

---

## [0.2.2] — 2026-07-15 — Épico 1: Plataforma & Governança · Epic 1: Platform & Governance

### Adicionado · Added

**PT — O Studio UX passa de design system a plataforma.** Primeiro épico da camada de plataforma: governança elevada e arquitetura de longo prazo. Nada contradiz a Fase 1; **nenhum código, nenhum valor estético**.

**EN — Studio UX moves from design system to platform.** First epic of the platform layer: elevated governance and long-term architecture. Nothing contradicts Phase 1; **no code, no aesthetic values**.

- **Governança / Governance:** `docs/governance/STUDIO_UX_CONSTITUTION.md` (20 artigos imutáveis), `docs/governance/STUDIO_UX_VERSIONING.md` (dono da estratégia de versão), `docs/governance/STUDIO_UX_ADR_GUIDE.md`, `docs/governance/STUDIO_UX_RFC_GUIDE.md`.
- **Plataforma / Platform:** `docs/platform/STUDIO_UX_PLATFORM.md` (estratégia), `docs/platform/STUDIO_UX_ARCHITECTURE.md` (mapa lógico de domínios), `docs/platform/STUDIO_UX_RUNTIME.md` (Specification × Runtime × Playground × Templates × Applications), `docs/platform/STUDIO_UX_PACKAGES.md` (monorepo), `docs/platform/STUDIO_UX_ROADMAP_2035.md` (visão de década).

### Alterado · Changed

- **`STUDIO_UX.md`:** mapa SSOT (§11) ampliado com os 10 domínios novos; §7 passa a referenciar `VERSIONING` como dono do detalhe e a `CONSTITUTION` como camada suprema.
- **Docs-índice vivos:** `README`, `ROADMAP`, `context/STUDIO_UX_HANDOFF.md` atualizados.

### Notas · Notes

- **PT** — Execução por épicos com validação humana entre eles (decisão do Robson). Épico 1 de 5. Próximos: Ferramentas, Qualidade, Geração, Ecossistema de IA. Conflito de certificação resolvido: dono único (`CERTIFICATION` será expandido para tela+sistema no Épico 3), sem `CERTIFICATION_SYSTEM.md` separado.
- **EN** — Epic-by-epic execution with human validation between them (Robson's decision). Epic 1 of 5. Certification conflict resolved: single owner (`CERTIFICATION` to be expanded to screen+system in Epic 3), no separate `CERTIFICATION_SYSTEM.md`.

---

## [0.2.0] — 2026-07-15

### Adicionado · Added

**PT — Fase 1.5: Linguagem Visual.** O produto ganha sua identidade e linguagem visual, permanecendo do lado da arquitetura da linha (caráter e regras; **nenhum valor estético final** — esses seguem na Fase 2). Nada contradiz a Fase 1 congelada.

**EN — Phase 1.5: Visual Language.** The product gains its identity and visual language, staying on the architecture side of the line (character and rules; **no final aesthetic values** — those come in Phase 2). Nothing contradicts the frozen Phase 1.

- **DNA e composição / DNA & composition:** `docs/STUDIO_UX_VISUAL_DNA.md`, `docs/STUDIO_UX_GRAMMAR.md` (com ADR-001 da fronteira Grammar × Layout System), `docs/STUDIO_UX_SURFACES.md`, `docs/STUDIO_UX_VISUAL_RHYTHM.md`.
- **Guias de domínio / Domain guides:** `docs/STUDIO_UX_DASHBOARD.md`, `docs/STUDIO_UX_FORMS.md`, `docs/STUDIO_UX_TABLES.md`, `docs/STUDIO_UX_NAVIGATION.md`.
- **Governança da qualidade / Quality governance:** `docs/STUDIO_UX_CERTIFICATION.md` (auditoria de tela, níveis Bronze/Silver/Gold/Platinum), `docs/context/AI_RULES.md` (regras imperativas para IA).
- **Engenharia reversa / Reverse-engineering:** `docs/research/REFERENCE_DNA.md` (13 referências, "princípios, nunca cópia").

### Alterado · Changed

- **PT — Governança reforçada** em `STUDIO_UX.md` (adições, sem reabrir Fase 1): §11 **Single Source of Truth por domínio** (+ mapa de donos), §12 **Architecture Boundary Check** obrigatório, §13 **horizonte de 10 anos / tech-agnóstico**, e a 8ª regra de ouro ("assunto novo ou já tem dono?"). Doc de governança → v1.1.0.
- **EN — Reinforced governance** in `STUDIO_UX.md` (additions, without reopening Phase 1): §11 SSOT per domain (+ ownership map), §12 mandatory Architecture Boundary Check, §13 10-year/tech-agnostic horizon, and the 8th golden rule.
- **Docs-índice vivos atualizados / Living index docs updated:** `ROADMAP` (fases 1.5 e 1.6 inseridas), `README` (mapa), `context/STUDIO_UX_HANDOFF.md` (estado), `context/STUDIO_UX_AI_CONTEXT.md` (ordem de leitura).
- **PT — Fase 1.6 (UI Exploration) registrada no roadmap** e pasta `research/ui-exploration/` criada com guia (estudos visuais viriam após validação humana). / **EN — Phase 1.6 (UI Exploration) recorded in the roadmap** and `research/ui-exploration/` scaffolded with a guide.

---

## [0.1.0] — 2026-07-15

### Adicionado · Added

**PT — Fundação documental completa (Fase 1).** Nasce o produto Studio UX como framework independente, versionado e governado. Somente documentação; nenhum componente, token final ou tela implementados.

**EN — Complete documentation foundation (Phase 1).** The Studio UX product is born as an independent, versioned, governed framework. Documentation only; no components, final tokens or screens implemented.

- **Governança / Governance:** `STUDIO_UX.md` (regra máxima), `README.md`, este `CHANGELOG.md`. Política bilíngue oficial (PT-BR + EN lado a lado por seção). SemVer + tags imutáveis + ADRs. Estrutura de pastas do produto criada.
- **Núcleo conceitual / Conceptual core:** `STUDIO_UX_VISION.md`, `STUDIO_UX_PHILOSOPHY.md`, `STUDIO_UX_PRINCIPLES.md` (princípios numerados P1…Pn), `context/STUDIO_UX_AI_CONTEXT.md`, `context/STUDIO_UX_HANDOFF.md`.
- **Fundação de design / Design foundation:** `tokens/STUDIO_UX_DESIGN_TOKENS.md` (arquitetura de tokens em 3 camadas), `tokens/STUDIO_UX_COLOR_SYSTEM.md`, `tokens/STUDIO_UX_TYPOGRAPHY.md`, `tokens/STUDIO_UX_SPACING.md`, `STUDIO_UX_THEMES.md`, `STUDIO_UX_ICONOGRAPHY.md`, `STUDIO_UX_ANIMATIONS.md`. Arquitetura definida; valores/estéticas finais deliberadamente adiados.
- **Sistema estrutural / Structural system:** `layouts/STUDIO_UX_LAYOUT_SYSTEM.md`, `components/STUDIO_UX_COMPONENT_LIBRARY.md` (catálogo oficial, sem código), `patterns/STUDIO_UX_PATTERNS.md`, `STUDIO_UX_ACCESSIBILITY.md`.
- **Produtos / Products:** `desktop/STUDIO_UX_DESKTOP.md` e `mobile/STUDIO_UX_MOBILE.md` — projetados como produtos independentes (não responsivo de um só).
- **Evolução / Evolution:** `STUDIO_UX_ROADMAP.md`, `research/REFERENCES.md`.

### Notas · Notes

- **PT** — Nesta fase o papel é de **arquiteto de produto**: nada de código, componentes ou telas. A implementação começa na Fase 2 (ver ROADMAP).
- **EN** — In this phase the role is **product architect**: no code, components or screens. Implementation starts in Phase 2 (see ROADMAP).

---

<!--
Modelo de entrada / Entry template:

## [X.Y.Z] — AAAA-MM-DD
### Adicionado · Added
### Alterado · Changed
### Descontinuado · Deprecated
### Removido · Removed
### Corrigido · Fixed
### Migração · Migration (obrigatório em MAJOR / required on MAJOR)
-->
