# STUDIO_UX_DEVTOOLS.md — Ferramentas de Inspeção · Inspection Tools (DevTools)

> Documento normativo vivo. Responde a: **quais são os inspetores de runtime do Studio UX, o que cada um revela, e de qual domínio dono cada inspetor lê a regra que exibe?**
> Living normative document. Answers: **what are the Studio UX runtime inspectors, what each one reveals, and from which owning domain each inspector reads the rule it shows?**
> Governança: `STUDIO_UX.md` (SSOT §11, §13), `governance/STUDIO_UX_CONSTITUTION.md`, `platform/STUDIO_UX_ARCHITECTURE.md`.

```
Architecture Boundary Check — STUDIO_UX_DEVTOOLS
Resolve · Solves:            a INSPEÇÃO INTERATIVA E HUMANA do que está montado no runtime — abrir uma composição e
                             ver, ao vivo, os tokens, o tema, o espaçamento, o layout, o motion, a acessibilidade e
                             o feedback que ela realmente usa.
                             / the INTERACTIVE, HUMAN INSPECTION of what is assembled in the runtime — open a
                             composition and see, live, the tokens, theme, spacing, layout, motion, accessibility and
                             feedback it actually uses.
Não pertence a outro porque · Not elsewhere because:
                             o LINTER detecta violações automaticamente (máquina); o PLAYGROUND é o ambiente de
                             catálogo/sandbox; cada regra tem seu dono. Faltava a lupa interativa que LÊ e MOSTRA,
                             sem julgar nem alterar.
                             / the LINTER detects violations automatically (machine); the PLAYGROUND is the
                             catalog/sandbox environment; each rule has its owner. The missing piece is the interactive
                             lens that READS and SHOWS, without judging or changing.
Complementa · Complements:   PLAYGROUND, LINTER, tokens/*, THEMES, LAYOUT_SYSTEM, SPACING, ACCESSIBILITY, ANIMATIONS,
                             COMPONENT_LIBRARY, PATTERNS, GRAMMAR.
Nunca substitui · Never replaces: os donos das regras que inspeciona (um inspetor lê a regra, nunca a redefine); nem
                             o PLAYGROUND (ambiente) nem o LINTER (detecção automática).
Dono · Owner:                este doc, para o domínio "ferramentas de inspeção (DevTools)".
                             / this doc, for the "inspection tools (DevTools)" domain.
```

---

## Objetivo · Objective
**PT** — Especificar, por comportamento, o conjunto de inspetores de runtime do Studio UX: lupas interativas que um humano abre sobre uma composição viva para **ver** o que ela usa — qual token, qual tema, qual espaçamento, qual camada de layout, qual motion, qual estado de acessibilidade, qual feedback. Os DevTools revelam e explicam; **não** detectam violações automaticamente (isso é o Linter) e **não** são um ambiente de catálogo (isso é o Playground). Cada inspetor **lê** a regra do domínio dono e a mostra em contexto; nunca a redefine.
**EN** — Specify, by behavior, the set of Studio UX runtime inspectors: interactive lenses a human opens over a living composition to **see** what it uses — which token, which theme, which spacing, which layout layer, which motion, which accessibility state, which feedback. DevTools reveal and explain; they do **not** detect violations automatically (that is the Linter) and are **not** a catalog environment (that is the Playground). Each inspector **reads** the owning domain's rule and shows it in context; it never redefines it.

## Escopo · Scope
**PT** — O catálogo de inspetores, o que cada um revela, quando usá-lo e de qual dono ele lê. **Não** define nenhuma das regras exibidas (cada uma tem seu dono — tokens, ACESSIBILIDADE, MOTION, LAYOUT…); **não** prescreve a tecnologia da ferramenta (§13 — descrição por comportamento); **não** julga conformidade (é inspeção, não veredito).
**EN** — The inspector catalog, what each reveals, when to use it and which owner it reads from. It does **not** define any of the shown rules (each has its owner — tokens, ACCESSIBILITY, MOTION, LAYOUT…); it does **not** prescribe the tool's technology (§13 — behavior description); it does **not** judge conformance (it is inspection, not verdict).

---

## 1. O princípio dos DevTools — a lupa que lê, não decide · The DevTools principle — the lens that reads, not decides
**PT** — Regra suprema deste domínio: **um inspetor lê a regra do dono e a exibe; nunca a redefine e nunca a corrige.** Ele responde "o que esta peça está usando *agora*, e por quê" — não "isto está certo?". A pergunta de conformidade é do Linter (detecção automática) e da Certification (graduação). O DevTools é a experiência humana de *entender*: abrir, apontar, ler o valor vivo e o token/regra por trás dele. Se um inspetor passasse a decidir o que é válido, haveria dois donos da mesma regra — violação de SSOT (Art. 10). Por isso, todo inspetor é **somente-leitura sobre a regra**: pode manipular a composição para observar (mudar um prop, alternar um tema), mas nunca altera a Specification.
**EN** — This domain's supreme rule: **an inspector reads the owner's rule and displays it; it never redefines and never fixes it.** It answers "what is this piece using *now*, and why" — not "is this correct?". The conformance question belongs to the Linter (automatic detection) and Certification (grading). DevTools is the human experience of *understanding*: open, point, read the live value and the token/rule behind it. If an inspector started deciding what is valid, there would be two owners of the same rule — an SSOT violation (Art. 10). Hence every inspector is **read-only over the rule**: it may manipulate the composition to observe (change a prop, toggle a theme), but never alters the Specification.

---

## 2. Os inspetores · The inspectors

> **PT** — Cada inspetor: **o que revela · quando usar · dono que lê.** **EN** — Each inspector: **what it reveals · when to use · owner it reads.**

### 2.1 Inspector — inspeção geral · general inspection
**PT** — *Revela:* a visão geral de um elemento/composição — a peça oficial que ele é, a superfície e a camada em que vive, e um índice para os inspetores especializados. É o ponto de entrada. *Quando usar:* ao abrir qualquer composição para entendê-la de cima. *Lê:* `COMPONENT_LIBRARY`, `GRAMMAR`, `SURFACES` (o que a peça é e como se aninha).
**EN** — *Reveals:* the overview of an element/composition — the official piece it is, the surface and layer it lives on, and an index to the specialized inspectors. It is the entry point. *When:* when opening any composition to understand it from above. *Reads:* `COMPONENT_LIBRARY`, `GRAMMAR`, `SURFACES` (what the piece is and how it nests).

### 2.2 Theme Viewer
**PT** — *Revela:* o tema ativo (dark/light/brand) e como a composição responde a ele — qual variante de tema cada superfície está resolvendo. *Quando usar:* ao verificar white-label/marca e a paridade entre temas. *Lê:* `THEMES` (mecânica de tema) sobre os `tokens/*`.
**EN** — *Reveals:* the active theme (dark/light/brand) and how the composition responds — which theme variant each surface resolves. *When:* when verifying white-label/brand and cross-theme parity. *Reads:* `THEMES` (theme mechanics) over `tokens/*`.

### 2.3 Token Viewer
**PT** — *Revela:* para cada valor visual na tela, qual **token** o produz e como ele se resolve no tema ativo (a cadeia semântica → valor). Expõe o "valor mágico" que *não* veio de token. *Quando usar:* ao entender por que algo tem a cor/tamanho que tem, ou ao caçar um valor fora de token. *Lê:* `tokens/*` (`DESIGN_TOKENS`, `COLOR_SYSTEM`, `TYPOGRAPHY`, `SPACING`).
**EN** — *Reveals:* for each visual value on screen, which **token** produces it and how it resolves in the active theme (the semantic → value chain). It exposes any "magic value" that did *not* come from a token. *When:* to understand why something has the color/size it has, or to hunt a value outside a token. *Reads:* `tokens/*` (`DESIGN_TOKENS`, `COLOR_SYSTEM`, `TYPOGRAPHY`, `SPACING`).

### 2.4 Component Explorer
**PT** — *Revela:* a peça oficial usada, suas variantes e o estado atual (default/hover/focus/active/disabled/loading/error/empty, §8). *Quando usar:* ao confirmar que a composição usa componentes da biblioteca e ver em que estado cada um está. *Lê:* `COMPONENT_LIBRARY`.
**EN** — *Reveals:* the official piece in use, its variants and the current state (default/hover/focus/active/disabled/loading/error/empty, §8). *When:* to confirm the composition uses library components and see each one's state. *Reads:* `COMPONENT_LIBRARY`.

### 2.5 Layout Inspector
**PT** — *Revela:* a estrutura de layout — grid, colunas, gutters, margens, regiões e camadas (z-index) — em que a composição se apoia. Responde "onde as coisas estão". *Quando usar:* ao entender o esqueleto de uma tela ou uma quebra estrutural. *Lê:* `LAYOUT_SYSTEM`.
**EN** — *Reveals:* the layout structure — grid, columns, gutters, margins, regions and layers (z-index) — the composition rests on. It answers "where things are". *When:* to understand a screen's skeleton or a structural break. *Reads:* `LAYOUT_SYSTEM`.

### 2.6 Spacing Inspector
**PT** — *Revela:* o espaço aplicado — paddings, margens, gaps — e o token de espaçamento por trás de cada um, tornando visível o ritmo (e qualquer valor de espaço fora da escala). *Quando usar:* ao calibrar respiração/densidade ou caçar um espaçamento arbitrário. *Lê:* `SPACING` (e o ritmo do `VISUAL_RHYTHM`).
**EN** — *Reveals:* the applied space — paddings, margins, gaps — and the spacing token behind each, making the rhythm visible (and any off-scale space value). *When:* when calibrating breathing/density or hunting an arbitrary spacing. *Reads:* `SPACING` (and the `VISUAL_RHYTHM` rhythm).

### 2.7 Accessibility Inspector
**PT** — *Revela:* o estado de acessibilidade da composição — contraste medido, ordem de foco, alvos de toque, papel semântico, se a cor é único portador de significado — contra a meta mínima (WCAG AA, Art. 9). *Quando usar:* ao verificar usabilidade por todos, em qualquer tema. *Lê:* `ACCESSIBILITY`.
**EN** — *Reveals:* the composition's accessibility state — measured contrast, focus order, touch targets, semantic role, whether color is the sole carrier of meaning — against the minimum target (WCAG AA, Art. 9). *When:* to verify usability by everyone, in any theme. *Reads:* `ACCESSIBILITY`.

### 2.8 Motion Inspector
**PT** — *Revela:* as animações e transições ativas — duração, papel (explica continuidade/causalidade) e se respeitam a contenção do motion. Permite observar um movimento em câmera lenta. *Quando usar:* ao calibrar micro-interações ou verificar se um movimento é funcional e não decorativo. *Lê:* `ANIMATIONS`.
**EN** — *Reveals:* the active animations and transitions — duration, role (explaining continuity/causality) and whether they respect motion restraint. It lets you observe a motion in slow motion. *When:* when calibrating micro-interactions or checking a motion is functional, not decorative. *Reads:* `ANIMATIONS`.

### 2.9 Feedback Inspector
**PT** — *Revela:* os estados de resposta ao usuário — loading, empty, error, sucesso — e como a composição comunica que algo aconteceu (toasts, estados vazios, indicadores), verificando que nada trava em silêncio (Art. 5, P16). *Quando usar:* ao auditar a experiência de resposta de uma tela. *Lê:* `PATTERNS` (padrões de feedback) e `COMPONENT_LIBRARY` (os componentes de estado).
**EN** — *Reveals:* the user-response states — loading, empty, error, success — and how the composition communicates that something happened (toasts, empty states, indicators), verifying nothing hangs silently (Art. 5, P16). *When:* when auditing a screen's response experience. *Reads:* `PATTERNS` (feedback patterns) and `COMPONENT_LIBRARY` (the state components).

---

## 3. Fronteira com Playground e com Linter · Boundary with Playground and Linter
**PT** — Três ferramentas do Épico 2, três papéis que nunca se confundem: o **Playground** é o *ambiente* — o catálogo e o sandbox onde as peças vivem e se compõem; os **DevTools** são a *lupa* dentro (ou sobre) uma composição — inspeção interativa e humana do que está montado; o **Linter** é o *juiz automático* — detecção de violações por máquina, sem humano no laço. Regra prática: se a pergunta é "quais peças existem e como se compõem?", é Playground; se é "o que *esta* peça está usando agora e por quê?", é DevTools; se é "isto está em conformidade?" respondido automaticamente, é Linter. Os DevTools frequentemente rodam *dentro* do Playground (inspecionar uma peça do catálogo), mas o inspetor não é o ambiente, e o ambiente não inspeciona.
**EN** — Three Epic 2 tools, three roles that never blur: the **Playground** is the *environment* — the catalog and sandbox where pieces live and compose; **DevTools** are the *lens* inside (or over) a composition — interactive, human inspection of what is assembled; the **Linter** is the *automatic judge* — machine detection of violations, no human in the loop. Practical rule: if the question is "which pieces exist and how do they compose?", it is Playground; if it is "what is *this* piece using now and why?", it is DevTools; if it is "is this compliant?" answered automatically, it is the Linter. DevTools often run *inside* the Playground (inspecting a catalog piece), but the inspector is not the environment, and the environment does not inspect.

---

## Responsabilidades · Responsibilities
**PT** — Oferecer uma lupa por dimensão (tema, token, componente, layout, espaço, acessibilidade, motion, feedback); ler a regra do dono e mostrá-la em contexto vivo; permitir manipulação de observação sem alterar a Specification.
**EN** — Offer a lens per dimension (theme, token, component, layout, space, accessibility, motion, feedback); read the owner's rule and show it in live context; allow observational manipulation without altering the Specification.

## Não-responsabilidades · Non-responsibilities
**PT** — Não define nenhuma regra (cada dimensão tem seu dono); não detecta violações automaticamente (é o Linter); não gradua conformidade (é a Certification); não é o ambiente de catálogo/sandbox (é o Playground); não é produção; não prescreve tecnologia (§13).
**EN** — Does not define any rule (each dimension has its owner); does not detect violations automatically (that is the Linter); does not grade conformance (that is Certification); is not the catalog/sandbox environment (that is the Playground); is not production; does not prescribe technology (§13).

## Integrações e dependências · Integrations and dependencies
**PT** — Lê de: `tokens/*`, `THEMES`, `LAYOUT_SYSTEM`, `SPACING`, `ACCESSIBILITY`, `ANIMATIONS`, `COMPONENT_LIBRARY`, `PATTERNS`, `GRAMMAR`, `SURFACES`. É aberto pela CLI (`studio playground`/uso embutido). Fisicamente reside em `packages/devtools` (`PACKAGES`). Consome o Runtime (`RUNTIME`) — inspeciona o que está materializado, nunca a Specification em abstrato.
**EN** — Reads from: `tokens/*`, `THEMES`, `LAYOUT_SYSTEM`, `SPACING`, `ACCESSIBILITY`, `ANIMATIONS`, `COMPONENT_LIBRARY`, `PATTERNS`, `GRAMMAR`, `SURFACES`. It is opened by the CLI (`studio playground`/embedded use). It physically lives in `packages/devtools` (`PACKAGES`). It consumes the Runtime (`RUNTIME`) — inspecting what is materialized, never the abstract Specification.

## Fluxos · Flows
**PT** — Fluxo canônico de inspeção: **selecionar elemento/composição → escolher a lupa → ler o valor vivo + a regra/token do dono → (opcional) manipular para observar.** A seta nunca escreve na Specification: o inspetor termina na leitura. Fluxo com Playground: abrir o ambiente → inspecionar uma peça do catálogo com os DevTools.
**EN** — Canonical inspection flow: **select element/composition → choose the lens → read the live value + the owner's rule/token → (optional) manipulate to observe.** The arrow never writes to the Specification: the inspector ends at reading. Flow with Playground: open the environment → inspect a catalog piece with DevTools.

## Boas práticas · Best practices
**PT** — Cada inspetor lê de um único dono e o cita. Mantenha os inspetores somente-leitura sobre a regra. Fale a língua do construtor (P11) — mostre "espaço aplicado", não uma sopa de chaves cruas, com o token disponível em detalhe. Um inspetor novo só nasce para uma dimensão genuína com dono próprio (regra §3.8).
**EN** — Each inspector reads from a single owner and cites it. Keep inspectors read-only over the rule. Speak the builder's language (P11) — show "applied space", not a soup of raw keys, with the token available in detail. A new inspector is born only for a genuine dimension with its own owner (rule §3.8).

## Anti-padrões · Anti-patterns
**PT / EN**
- Um inspetor que **redefine** a regra que inspeciona (ex.: o Token Viewer decidindo qual token é válido) — viola SSOT (Art. 10). / An inspector that **redefines** the rule it inspects (e.g. the Token Viewer deciding which token is valid) — violates SSOT.
- DevTools que vira Playground (acumula catálogo e sandbox em vez de inspecionar). / DevTools turning into a Playground (accumulating catalog and sandbox instead of inspecting).
- Inspetor que detecta e julga violações automaticamente, invadindo o Linter. / An inspector that automatically detects and judges violations, invading the Linter.
- Inspetor que altera a Specification em vez de só ler. / An inspector that alters the Specification instead of only reading.
- Inspetor acoplado a uma tecnologia de implementação específica (§13). / An inspector coupled to a specific implementation technology.
- Despejar chaves técnicas cruas como experiência principal (viola P11). / Dumping raw technical keys as the primary experience.

## Roadmap
**PT** — Especificado no Épico 2 (Ferramentas); os inspetores nascem na implementação (`packages/devtools`). Inspetores novos entram aqui quando uma dimensão inspecionável nova ganha dono. Este documento aponta aos donos; não os detalha.
**EN** — Specified in Epic 2 (Tools); the inspectors are born at implementation (`packages/devtools`). New inspectors enter here when a new inspectable dimension gains an owner. This document points to the owners; it does not detail them.

## Referências internas · Internal references
`tools/STUDIO_UX_PLAYGROUND.md` · `tools/STUDIO_UX_CLI.md` · `quality/STUDIO_UX_LINTER.md` · `platform/STUDIO_UX_PACKAGES.md` · `platform/STUDIO_UX_RUNTIME.md` · `tokens/STUDIO_UX_DESIGN_TOKENS.md` · `STUDIO_UX_THEMES.md` · `layouts/STUDIO_UX_LAYOUT_SYSTEM.md` · `tokens/STUDIO_UX_SPACING.md` · `STUDIO_UX_ACCESSIBILITY.md` · `STUDIO_UX_ANIMATIONS.md` · `components/STUDIO_UX_COMPONENT_LIBRARY.md` · `patterns/STUDIO_UX_PATTERNS.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 5, 9, 10, 13) · `STUDIO_UX.md` §11 · §13

---

*Documento vivo. Os DevTools leem a regra do dono e a mostram; nunca a redefinem, nunca julgam conformidade. · Living document. DevTools read the owner's rule and show it; they never redefine it, never judge conformance.*
