# STUDIO_UX_PLAYGROUND.md — Ambiente Playground · Playground Environment

> Documento normativo vivo. Responde a: **o que é o ambiente Playground do Studio UX — como ele demonstra, testa e compõe as peças oficiais vivas — e por que ele nunca é produção nem fonte da verdade?**
> Living normative document. Answers: **what is the Studio UX Playground environment — how it demonstrates, tests and composes the living official pieces — and why it is never production nor the source of truth?**
> Governança: `STUDIO_UX.md` (SSOT §11, §13), `governance/STUDIO_UX_CONSTITUTION.md`, `platform/STUDIO_UX_RUNTIME.md`.

```
Architecture Boundary Check — STUDIO_UX_PLAYGROUND
Resolve · Solves:            o AMBIENTE vivo onde toda peça oficial pode ser vista em todos os seus estados, testada
                             manipulando propriedades/estados, e composta livremente com outras peças oficiais —
                             o laboratório de demonstração e validação do Studio UX.
                             / the living ENVIRONMENT where every official piece can be seen in all its states, tested
                             by manipulating props/states, and freely composed with other official pieces — Studio UX's
                             demonstration and validation lab.
Não pertence a outro porque · Not elsewhere because:
                             RUNTIME situa a camada Playground em nível conceitual (o que é, onde se encaixa); os
                             DEVTOOLS são a lupa que inspeciona; a CLI é o verbo que o abre. Faltava o detalhe do
                             AMBIENTE em si — catálogo, visualização, teste, sandbox, comparação.
                             / RUNTIME situates the Playground layer conceptually (what it is, where it fits); DEVTOOLS
                             are the lens that inspects; the CLI is the verb that opens it. The missing piece is the
                             ENVIRONMENT detail itself — catalog, visualization, test, sandbox, comparison.
Complementa · Complements:   RUNTIME (camada Playground), DEVTOOLS, CLI, COMPONENT_LIBRARY, THEMES, tokens/*,
                             ANIMATIONS, TEMPLATES/Examples, desktop/*, mobile/*, packages/playground.
Nunca substitui · Never replaces: a Specification (fonte da verdade, Art. 5), os Templates/Examples, nem os DevTools
                             (inspeção). O Playground demonstra e compõe; nunca define regra.
Dono · Owner:                este doc, para o domínio "ambiente Playground".
                             / this doc, for the "Playground environment" domain.
```

---

## Objetivo · Objective
**PT** — Especificar, por comportamento, o ambiente Playground: o laboratório vivo onde as peças oficiais do Studio UX são demonstradas, vistas em todos os seus estados, testadas manipulando propriedades e compostas livremente com outras peças oficiais. É a camada Playground do `RUNTIME`, aqui detalhada como ambiente. O Playground existe para *ver e validar antes de compor num sistema real* — é demonstração e verificação, **nunca** uma aplicação de produção nem uma fonte da verdade (Art. 5). Ele consome o Runtime; nunca o define.
**EN** — Specify, by behavior, the Playground environment: the living lab where Studio UX's official pieces are demonstrated, seen in all their states, tested by manipulating props and freely composed with other official pieces. It is the `RUNTIME` Playground layer, detailed here as an environment. The Playground exists to *see and validate before composing into a real system* — it is demonstration and verification, **never** a production application nor a source of truth (Art. 5). It consumes the Runtime; it never defines it.

## Escopo · Scope
**PT** — As capacidades do ambiente (catálogo, visualização, teste, sandbox, comparação), o suporte a Desktop e Mobile como produtos separados (Art. 2, P4), e a integração com temas, tokens e motion. **Não** define as peças (é `COMPONENT_LIBRARY`), a mecânica de tema (`THEMES`), os valores de token (`tokens/*`) nem prescreve a tecnologia do ambiente (§13 — descrição por comportamento).
**EN** — The environment's capabilities (catalog, visualization, test, sandbox, comparison), Desktop and Mobile support as separate products (Art. 2, P4), and integration with themes, tokens and motion. It does **not** define the pieces (that is `COMPONENT_LIBRARY`), the theme mechanics (`THEMES`), the token values (`tokens/*`) or prescribe the environment's technology (§13 — behavior description).

---

## 1. O princípio do Playground — demonstra, não é produção · The Playground principle — it demonstrates, it is not production
**PT** — Regra suprema deste domínio: **o Playground é uma camada derivada — consome o Runtime, nunca define regra, e nunca é produção nem fonte da verdade (Art. 5).** Ele mostra o que já existe, do jeito que já é. Nenhuma Application consome o Playground; toda Application consome o Runtime (`RUNTIME` §1.3). Nada que apareça no Playground vale como especificação: uma composição feita no sandbox é um experimento, não um contrato — se algo ali vira regra, ele é **promovido à Specification** pelo dono próprio, jamais congelado como verdade dentro do ambiente. Confundir o conteúdo do Playground com spec é o mesmo erro de tratar `packages/docs` como fonte da verdade (Art. 5): a embalagem viva não é a lei.
**EN** — This domain's supreme rule: **the Playground is a derived layer — it consumes the Runtime, never defines a rule, and is never production nor a source of truth (Art. 5).** It shows what already exists, the way it already is. No Application consumes the Playground; every Application consumes the Runtime (`RUNTIME` §1.3). Nothing that appears in the Playground counts as specification: a composition made in the sandbox is an experiment, not a contract — if something there becomes a rule, it is **promoted to the Specification** by its own owner, never frozen as truth inside the environment. Confusing Playground content with spec is the same mistake as treating `packages/docs` as the source of truth (Art. 5): the living package is not the law.

---

## 2. As capacidades do ambiente · The environment's capabilities

> **PT** — Cada capacidade: **o que oferece · quando usar · o que consome.** **EN** — Each capability: **what it offers · when to use · what it consumes.**

### 2.1 Catálogo · Catalog
**PT** — *Oferece:* todas as peças oficiais do Studio UX reunidas e navegáveis num só lugar — o índice vivo da `COMPONENT_LIBRARY`. *Quando usar:* para descobrir qual peça existe antes de compor. *Consome:* `COMPONENT_LIBRARY` (via Runtime).
**EN** — *Offers:* all official Studio UX pieces gathered and navigable in one place — the living index of the `COMPONENT_LIBRARY`. *When:* to discover which piece exists before composing. *Consumes:* `COMPONENT_LIBRARY` (via Runtime).

### 2.2 Visualização · Visualization
**PT** — *Oferece:* cada componente exibido em **todos os seus estados** (default/hover/focus/active/disabled/loading/error/empty, §8), lado a lado, para calibragem e verificação. *Quando usar:* ao conferir se uma peça se comporta corretamente em cada estado. *Consome:* os estados definidos pela `COMPONENT_LIBRARY`.
**EN** — *Offers:* each component shown in **all its states** (default/hover/focus/active/disabled/loading/error/empty, §8), side by side, for calibration and verification. *When:* to check a piece behaves correctly in every state. *Consumes:* the states defined by `COMPONENT_LIBRARY`.

### 2.3 Teste · Test
**PT** — *Oferece:* manipular propriedades e estados de uma peça ao vivo para observar como ela responde (mudar um rótulo, alternar um estado, variar um tamanho). *Quando usar:* ao entender os limites e variantes de um componente. *Consome:* a superfície de propriedades da peça (via Runtime). Manipular aqui é observação — não muda a Specification.
**EN** — *Offers:* manipulating a piece's props and states live to observe how it responds (change a label, toggle a state, vary a size). *When:* to understand a component's limits and variants. *Consumes:* the piece's prop surface (via Runtime). Manipulating here is observation — it does not change the Specification.

### 2.4 Sandbox
**PT** — *Oferece:* compor livremente peças oficiais para experimentar arranjos, sob a gramática (`GRAMMAR`). *Quando usar:* ao prototipar uma ideia de tela com peças reais antes de levá-la a um sistema. *Consome:* `COMPONENT_LIBRARY` + `GRAMMAR`. O que se cria no sandbox é experimento, nunca spec (§1).
**EN** — *Offers:* freely composing official pieces to experiment with arrangements, under the grammar (`GRAMMAR`). *When:* to prototype a screen idea with real pieces before taking it to a system. *Consumes:* `COMPONENT_LIBRARY` + `GRAMMAR`. What is created in the sandbox is an experiment, never spec (§1).

### 2.5 Comparação · Comparison
**PT** — *Oferece:* ver peças, estados, temas ou variantes **lado a lado** para avaliar diferenças com precisão. *Quando usar:* ao decidir entre variantes ou verificar paridade entre temas/produtos. *Consome:* o Runtime + `THEMES`.
**EN** — *Offers:* seeing pieces, states, themes or variants **side by side** to assess differences precisely. *When:* when deciding between variants or verifying theme/product parity. *Consumes:* the Runtime + `THEMES`.

---

## 3. Desktop e Mobile — produtos separados no Playground · Desktop and Mobile — separate products in the Playground
**PT** — Como Desktop e Mobile são **produtos irmãos e distintos** (Art. 2, P4), o Playground os trata separadamente: não há uma única visão "responsiva" que transforma um no outro por redimensionamento. Cada produto tem seu catálogo, seus estados e suas composições, apoiados na base compartilhada (`tokens`, `icons`, `components`, identidade) mas **nunca** misturando layouts. Ver uma peça "no Playground Desktop" e "no Playground Mobile" é ver dois produtos, não duas larguras do mesmo — coerente com `packages/desktop` e `packages/mobile` (`PACKAGES` §3).
**EN** — Since Desktop and Mobile are **sibling, distinct products** (Art. 2, P4), the Playground treats them separately: there is no single "responsive" view turning one into the other by resizing. Each product has its own catalog, states and compositions, resting on the shared base (`tokens`, `icons`, `components`, identity) but **never** mixing layouts. Seeing a piece "in the Desktop Playground" and "in the Mobile Playground" is seeing two products, not two widths of the same — consistent with `packages/desktop` and `packages/mobile` (`PACKAGES` §3).

## 4. Temas, tokens e animações no Playground · Themes, tokens and animation in the Playground
**PT** — O ambiente integra três dimensões vivas, sempre lidas dos donos: **Temas** — alternar dark/light/brand para ver cada peça em cada tema (`THEMES`); **Tokens** — ver os tokens vivos que sustentam cada valor na tela (`tokens/*`), o que também é a matéria-prima que os DevTools inspecionam em detalhe; **Animações** — ver o motion das peças em contexto, observando duração e função (`ANIMATIONS`). O Playground *mostra* essas dimensões; a regra de cada uma continua no seu dono (SSOT, Art. 10).
**EN** — The environment integrates three live dimensions, always read from their owners: **Themes** — toggling dark/light/brand to see each piece in each theme (`THEMES`); **Tokens** — seeing the living tokens behind each on-screen value (`tokens/*`), which is also the raw material DevTools inspect in detail; **Animation** — seeing the pieces' motion in context, observing duration and function (`ANIMATIONS`). The Playground *shows* these dimensions; each one's rule stays with its owner (SSOT, Art. 10).

## 5. Fronteira com DevTools e com Templates/Examples · Boundary with DevTools and Templates/Examples
**PT** — O **Playground** é o *ambiente* (catálogo/sandbox); os **DevTools** são a *lupa* que inspeciona uma peça dentro dele — os inspetores rodam no Playground, mas o ambiente não é o inspetor e o inspetor não é o ambiente (`DEVTOOLS` §3). Já os **Templates/Examples** são *moldes prontos* e *telas de exemplo* — composições oficiais completas que servem de ponto de partida conforme (donos: `generation/TEMPLATES`, `examples/`). A fronteira: no Playground você *experimenta livremente* com peças; num Template você *instancia um molde pronto*. O sandbox produz experimento descartável; o Template produz um começo conforme para uma Application. Um não vira o outro.
**EN** — The **Playground** is the *environment* (catalog/sandbox); the **DevTools** are the *lens* inspecting a piece within it — the inspectors run in the Playground, but the environment is not the inspector and the inspector is not the environment (`DEVTOOLS` §3). The **Templates/Examples**, in turn, are *ready molds* and *example screens* — complete official compositions that serve as a compliant starting point (owners: `generation/TEMPLATES`, `examples/`). The boundary: in the Playground you *experiment freely* with pieces; in a Template you *instantiate a ready mold*. The sandbox yields a disposable experiment; the Template yields a compliant start for an Application. One never becomes the other.

---

## Responsabilidades · Responsibilities
**PT** — Reunir o catálogo vivo; exibir cada peça em todos os estados; permitir teste manipulando propriedades; oferecer sandbox de composição livre; comparar lado a lado; suportar Desktop e Mobile separadamente; integrar temas, tokens e motion lidos dos donos.
**EN** — Gather the living catalog; show each piece in all states; allow testing by manipulating props; offer a free-composition sandbox; compare side by side; support Desktop and Mobile separately; integrate themes, tokens and motion read from the owners.

## Não-responsabilidades · Non-responsibilities
**PT** — Não é produção nem fonte da verdade (Art. 5); não define peças (`COMPONENT_LIBRARY`), temas (`THEMES`) ou valores de token (`tokens/*`); não inspeciona (é `DEVTOOLS`); não é molde pronto nem exemplo (`TEMPLATES`/`examples`); não prescreve tecnologia (§13).
**EN** — Is not production nor the source of truth (Art. 5); does not define pieces (`COMPONENT_LIBRARY`), themes (`THEMES`) or token values (`tokens/*`); does not inspect (that is `DEVTOOLS`); is not a ready mold nor example (`TEMPLATES`/`examples`); does not prescribe technology (§13).

## Integrações e dependências · Integrations and dependencies
**PT** — Consome o Runtime (`RUNTIME` §1.3) e, através dele, `COMPONENT_LIBRARY`, `GRAMMAR`, `THEMES`, `tokens/*`, `ANIMATIONS`, `desktop/*`, `mobile/*`. É aberto pela CLI (`studio playground`) e hospeda os `DEVTOOLS`. Fisicamente reside em `packages/playground` (`PACKAGES`), que depende de `desktop`, `mobile`, `components`, `tokens` e nunca é aplicação de produção.
**EN** — Consumes the Runtime (`RUNTIME` §1.3) and, through it, `COMPONENT_LIBRARY`, `GRAMMAR`, `THEMES`, `tokens/*`, `ANIMATIONS`, `desktop/*`, `mobile/*`. It is opened by the CLI (`studio playground`) and hosts the `DEVTOOLS`. It physically lives in `packages/playground` (`PACKAGES`), which depends on `desktop`, `mobile`, `components`, `tokens` and is never a production application.

## Fluxos · Flows
**PT** — Fluxo canônico: **Runtime → Playground** (camada derivada, `RUNTIME`). Fluxo de uso: navegar o catálogo → visualizar estados → testar propriedades → compor no sandbox → comparar variantes/temas. A seta nunca aponta para trás: o Playground não reescreve o Runtime, e o Runtime não reescreve a Specification. Se um experimento do sandbox merece virar regra, ele sobe ao dono (promoção à Specification), não fica congelado no ambiente.
**EN** — Canonical flow: **Runtime → Playground** (derived layer, `RUNTIME`). Usage flow: browse the catalog → visualize states → test props → compose in the sandbox → compare variants/themes. The arrow never points backward: the Playground does not rewrite the Runtime, and the Runtime does not rewrite the Specification. If a sandbox experiment deserves to become a rule, it goes up to the owner (promotion to Specification), not frozen in the environment.

## Boas práticas · Best practices
**PT** — Trate o Playground como laboratório, não como app. Componha só com peças oficiais (Art. 4). Mantenha Desktop e Mobile separados (Art. 2). Leia cada dimensão do seu dono e o cite. Promova à Specification o que virar regra — nunca trate uma composição do sandbox como contrato. Fale a língua do construtor (P11).
**EN** — Treat the Playground as a lab, not an app. Compose only with official pieces (Art. 4). Keep Desktop and Mobile separate (Art. 2). Read each dimension from its owner and cite it. Promote to the Specification whatever becomes a rule — never treat a sandbox composition as a contract. Speak the builder's language (P11).

## Anti-padrões · Anti-patterns
**PT / EN**
- O Playground virar uma aplicação de produção (uma Application consumindo o Playground em vez do Runtime). / The Playground becoming a production application (an Application consuming the Playground instead of the Runtime).
- Conteúdo do Playground tratado como spec/fonte da verdade (viola Art. 5). / Playground content treated as spec/source of truth.
- Compor no sandbox com peças fora da biblioteca oficial (Art. 4). / Composing in the sandbox with pieces outside the official library.
- Uma visão "responsiva" única transformando Desktop em Mobile por redimensionamento (viola Art. 2, P4). / A single "responsive" view turning Desktop into Mobile by resizing.
- O Playground redefinir tema/token/peça em vez de ler do dono (viola SSOT, Art. 10). / The Playground redefining a theme/token/piece instead of reading from the owner.
- O Playground acumular funções de inspeção e virar DevTools. / The Playground accumulating inspection functions and becoming DevTools.
- Ambiente acoplado a uma tecnologia de implementação específica (§13). / An environment coupled to a specific implementation technology.

## Roadmap
**PT** — Especificado no Épico 2 (Ferramentas); o ambiente nasce na implementação (`packages/playground`), sempre derivando do Runtime. Capacidades novas entram aqui quando são genuinamente do ambiente — nunca quando pertencem a um dono existente (peça, tema, token, inspeção).
**EN** — Specified in Epic 2 (Tools); the environment is born at implementation (`packages/playground`), always deriving from the Runtime. New capabilities enter here when they are genuinely the environment's — never when they belong to an existing owner (piece, theme, token, inspection).

## Referências internas · Internal references
`platform/STUDIO_UX_RUNTIME.md` (§1.3) · `tools/STUDIO_UX_DEVTOOLS.md` · `tools/STUDIO_UX_CLI.md` · `platform/STUDIO_UX_PACKAGES.md` (§3) · `components/STUDIO_UX_COMPONENT_LIBRARY.md` · `STUDIO_UX_GRAMMAR.md` · `STUDIO_UX_THEMES.md` · `tokens/STUDIO_UX_DESIGN_TOKENS.md` · `STUDIO_UX_ANIMATIONS.md` · `desktop/STUDIO_UX_DESKTOP.md` · `mobile/STUDIO_UX_MOBILE.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 2, 4, 5, 10, 13) · `STUDIO_UX.md` §11 · §13

---

*Documento vivo. O Playground demonstra e compõe o que já existe; nunca é produção nem fonte da verdade. · Living document. The Playground demonstrates and composes what already exists; it is never production nor the source of truth.*
