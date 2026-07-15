# STUDIO_UX_DESIGN_TOKENS.md — Arquitetura de Tokens · Token Architecture

> Documento normativo vivo. Responde a: **o que é um design token no Studio UX, como os tokens são organizados em camadas e nomeados, e por que toda tela consome tokens em vez de valores crus?**
> Living normative document. Answers: **what is a design token in Studio UX, how are tokens organized in layers and named, and why does every screen consume tokens instead of raw values?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PRINCIPLES.md` (P1, P7). Descem ao detalhe: `STUDIO_UX_COLOR_SYSTEM.md`, `STUDIO_UX_TYPOGRAPHY.md`, `STUDIO_UX_SPACING.md`, `../STUDIO_UX_THEMES.md`.

---

## 1. O que é um design token · What is a design token

**PT** — Um **design token** é a menor unidade de decisão de design, nomeada e reutilizável. Em vez de escrever um valor cru (`#3B82F6`, `16px`, `0.3s`) direto numa tela, dá-se a esse valor um **nome com significado** (`color.action.primary`, `space.inset.md`, `motion.duration.fast`) e referencia-se o nome. O token é o contrato entre a decisão de design e o pixel final: mudou a decisão, muda-se o token uma vez, e toda a interface acompanha. Esta é a materialização direta de **P1 — tudo vem de um token**: nenhum valor visual é escrito à mão.

**EN** — A **design token** is the smallest named, reusable unit of a design decision. Instead of writing a raw value (`#3B82F6`, `16px`, `0.3s`) directly into a screen, that value is given a **meaningful name** (`color.action.primary`, `space.inset.md`, `motion.duration.fast`) and the name is referenced. The token is the contract between the design decision and the final pixel: change the decision, change the token once, and the whole interface follows. This is the direct materialization of **P1 — everything comes from a token**: no visual value is hand-written.

**PT** — Por que isso existe? Porque um valor cru espalhado por centenas de telas é uma decisão sem dono: ninguém consegue mudá-la com segurança, ninguém sabe se `#3B82F6` numa tela é o mesmo "azul de ação" de outra ou uma coincidência. O token dá **dono, nome e rastreabilidade** à decisão. Ele também é pré-requisito de temas (§6) e de consumo por IA (identificadores estáveis em inglês que uma máquina resolve sem adivinhar).

**EN** — Why does this exist? Because a raw value scattered across hundreds of screens is an ownerless decision: nobody can change it safely, nobody knows whether `#3B82F6` on one screen is the same "action blue" as on another or a coincidence. The token gives the decision an **owner, a name and traceability**. It is also the prerequisite for theming (§6) and for AI consumption (stable English identifiers a machine resolves without guessing).

---

## 2. As três camadas · The three layers

**PT** — Todo token do Studio UX vive em uma de três camadas. A separação existe para que a **troca de tema ou de marca** aconteça sem tocar em nenhuma tela — só a camada semântica é reapontada.

**EN** — Every Studio UX token lives in one of three layers. The separation exists so that **swapping a theme or a brand** happens without touching any screen — only the semantic layer is repointed.

1. **PT — Primitivos / globais.** Valores crus nomeados, agnósticos de uso: a paleta bruta (`palette.blue.500`), a escala numérica de espaço (`scale.space.4`), os degraus de raio, os passos da escala tipográfica. Não dizem *para que servem* — só *o que são*. Nunca são consumidos direto por uma tela.
   **EN — Primitives / globals.** Named raw values, usage-agnostic: the raw palette (`palette.blue.500`), the numeric space scale (`scale.space.4`), the radius steps, the type-scale steps. They don't say *what they're for* — only *what they are*. Never consumed directly by a screen.

2. **PT — Semânticos / de sistema.** O **papel de uso**: `color.text.primary`, `color.surface.raised`, `space.inset.md`, `radius.interactive`. Um token semântico *aponta* para um primitivo (`color.text.primary → palette.slate.900` no tema claro; `→ palette.slate.50` no escuro). É esta camada que carrega a intenção e que o tema reescreve.
   **EN — Semantic / system.** The **usage role**: `color.text.primary`, `color.surface.raised`, `space.inset.md`, `radius.interactive`. A semantic token *points* to a primitive (`color.text.primary → palette.slate.900` in light; `→ palette.slate.50` in dark). This layer carries intent and is what a theme rewrites.

3. **PT — De componente.** A referência específica de um componente: `button.padding.x`, `card.radius`, `input.border.color`. Apontam para a camada semântica (`button.padding.x → space.inset.md`), nunca para o primitivo. Existem para dar a um componente um ponto de ajuste local sem quebrar o sistema.
   **EN — Component.** A component-specific reference: `button.padding.x`, `card.radius`, `input.border.color`. They point to the semantic layer (`button.padding.x → space.inset.md`), never to the primitive. They give a component a local tuning point without breaking the system.

**PT — Regra de fluxo (inviolável):** telas e componentes consomem **sempre** a camada semântica ou de componente, **nunca** a primitiva. Consumir um primitivo direto numa tela é o mesmo defeito que um valor mágico — quebra a troca de tema e viola P1/P7.

**EN — Flow rule (inviolable):** screens and components **always** consume the semantic or component layer, **never** the primitive. Consuming a primitive directly in a screen is the same defect as a magic value — it breaks theming and violates P1/P7.

---

## 3. Convenção de nomenclatura · Naming convention

**PT** — Todo token segue `categoria.papel.variação` em inglês, em dot-case (com kebab-case para segmentos compostos). A leitura vai do geral ao específico:

**EN** — Every token follows `category.role.variant` in English, dot-case (kebab-case for compound segments). Reading goes from general to specific:

- `categoria` / `category` — a família (`color`, `space`, `font`, `radius`, `elevation`, `motion`…).
- `papel` / `role` — a função semântica (`text`, `surface`, `action`, `inset`, `duration`…).
- `variação` / `variant` — a qualificação (`primary`, `raised`, `md`, `fast`, `hover`…).

**PT** — Exemplos canônicos: `color.surface.base`, `color.text.secondary`, `space.stack.lg`, `radius.md`, `font.size.body`, `elevation.overlay`, `motion.duration.fast`, `opacity.disabled`, `z-index.modal`. Os degraus de escala usam nomes de **t-shirt size** (`xs, sm, md, lg, xl…`) ou índice numérico da escala (`space-4`), nunca a medida crua no nome (`space-16px` é proibido — acopla o nome ao valor e mente quando o valor muda). Identificadores são **sempre em inglês** (política bilíngue do `STUDIO_UX.md` §1): a prosa é PT+EN, os nomes de token não.

**EN** — Canonical examples: `color.surface.base`, `color.text.secondary`, `space.stack.lg`, `radius.md`, `font.size.body`, `elevation.overlay`, `motion.duration.fast`, `opacity.disabled`, `z-index.modal`. Scale steps use **t-shirt sizes** (`xs, sm, md, lg, xl…`) or a numeric scale index (`space-4`), never the raw measure in the name (`space-16px` is forbidden — it couples the name to the value and lies when the value changes). Identifiers are **always English** (`STUDIO_UX.md` §1 bilingual policy): prose is PT+EN, token names are not.

---

## 4. As famílias de token · The token families

**PT** — O Studio UX organiza os tokens em famílias estáveis. Cada família responde a uma dimensão da linguagem visual e tem (ou terá) seu documento de detalhe. A tabela abaixo é o índice: o papel de cada família e para onde descer.

**EN** — Studio UX organizes tokens into stable families. Each family answers one dimension of the visual language and has (or will have) its own detail doc. The table below is the index: each family's role and where to go deeper.

- **Color** — cor com papel semântico (superfície, texto, borda, ação, status). Habilita dark/light/brand. Detalhe: `STUDIO_UX_COLOR_SYSTEM.md`. Governada por P8, P17, P18.
- **Typography** — famílias, tamanhos, pesos, entrelinha e tracking, organizados por papel (display, heading, body, label, caption, code). Detalhe: `STUDIO_UX_TYPOGRAPHY.md`. Governada por P6.
- **Spacing** — escala de espaçamento (inset, stack, inline) sobre uma unidade-base. Detalhe: `STUDIO_UX_SPACING.md`. Governada por P5, P7.
- **Radius** — escala de raio de canto, um valor por tipo de elemento (P10).
- **Elevation** — níveis discretos de "o que flutua sobre o quê" (P9); mapeia superfície + sombra por nível.
- **Shadow** — os valores brutos de sombra que a elevação consome; poucos, discretos.
- **Motion** — durações (fast/base/slow), curvas de easing nomeadas e delays. Detalhe: `../STUDIO_UX_ANIMATIONS.md`. Governada por P15.
- **Opacity** — níveis de opacidade com papel (`opacity.disabled`, `opacity.overlay`, `opacity.hover`).
- **Border** — larguras e estilos de borda; a cor da borda vem da família Color.
- **Z-index** — camadas de empilhamento nomeadas (`base`, `dropdown`, `sticky`, `overlay`, `modal`, `toast`), nunca números mágicos espalhados.
- **Transitions** — combinações prontas de propriedade + duração + easing para estados interativos comuns, montadas a partir de Motion.
- **Breakpoints** — os pontos de mudança de contexto de largura. Não transformam Desktop em Mobile (P4) — Desktop e Mobile são produtos irmãos; breakpoints organizam adaptação *dentro* de cada produto.

**PT** — As famílias se relacionam por composição: **Elevation** consome **Shadow** + **Color.surface**; **Transitions** consome **Motion**; **Border** consome **Color.border**; componentes consomem várias famílias ao mesmo tempo pela camada de componente. Nenhuma família é ilha — mas cada uma tem um documento que responde a uma pergunta única (regra de coesão do `STUDIO_UX.md` §4).

**EN** — Families relate by composition: **Elevation** consumes **Shadow** + **Color.surface**; **Transitions** consume **Motion**; **Border** consumes **Color.border**; components consume several families at once through the component layer. No family is an island — but each has a document that answers a single question (`STUDIO_UX.md` §4 cohesion rule).

---

## 5. Valores concretos vêm na Fase 2 · Concrete values arrive in Phase 2

**PT** — Este documento — e todos os de token — define **arquitetura, camadas, nomenclatura e regras**, não os valores estéticos finais de marca. Na versão atual (`v0.1.0`, fundação documental) **não** se fixa a paleta final, os hex, a fonte específica nem os px exatos da escala. O que se define aqui é a *estrutura*: quantos níveis de superfície existem, como os degraus de espaço progridem, quais papéis de cor existem. Os **valores concretos são materializados na Fase 2** (ver `../STUDIO_UX_ROADMAP.md`), quando a identidade visual for escolhida e ancorada nos primitivos — sem tocar em nenhum consumidor semântico. Isto é "arquitetura antes de estética" (`STUDIO_UX.md` §3, regra 6).

**EN** — This document — and every token doc — defines **architecture, layers, naming and rules**, not final brand aesthetic values. In the current version (`v0.1.0`, documentation foundation) the final palette, hex codes, specific font and exact scale pixels are **not** fixed. What is defined here is the *structure*: how many surface levels exist, how space steps progress, which color roles exist. **Concrete values are materialized in Phase 2** (see `../STUDIO_UX_ROADMAP.md`), when the visual identity is chosen and anchored into the primitives — without touching any semantic consumer. This is "architecture before aesthetics" (`STUDIO_UX.md` §3, rule 6).

---

## 6. Como tokens habilitam temas · How tokens enable themes

**PT** — O tema é uma **reescrita da camada semântica**, não das telas. Modo claro e modo escuro são o mesmo conjunto de tokens semânticos (`color.text.primary`, `color.surface.base`) apontando para primitivos diferentes. A tela pede `color.text.primary` e recebe o tom certo do tema ativo — sem saber qual tema é. Da mesma forma, um **tema de marca (white-label)** troca a paleta primitiva sob os mesmos papéis semânticos, permitindo que sistemas multi-tenant (como o IA Studio) apresentem a marca de cada cliente sem reescrever componente algum. A arquitetura de tema está em `../STUDIO_UX_THEMES.md`; aqui basta a regra: **só a camada semântica muda entre temas; primitivo é reapontado, componente e tela nunca.**

**EN** — A theme is a **rewrite of the semantic layer**, not of the screens. Light and dark are the same set of semantic tokens (`color.text.primary`, `color.surface.base`) pointing to different primitives. A screen asks for `color.text.primary` and receives the right tone for the active theme — without knowing which theme it is. Likewise, a **brand (white-label) theme** swaps the primitive palette under the same semantic roles, letting multi-tenant systems (like IA Studio) present each client's brand without rewriting a single component. Theme architecture lives in `../STUDIO_UX_THEMES.md`; the rule here suffices: **only the semantic layer changes between themes; primitives are repointed, components and screens never.**

---

## 7. Tokens compartilhados vs. contextuais (Desktop/Mobile) · Shared vs. contextual tokens

**PT** — Desktop e Mobile são **produtos irmãos, não um responsivo** (`STUDIO_UX.md` §2, P4). Eles **compartilham** os tokens de identidade — paleta, papéis de cor, escala tipográfica, curvas de motion, raio: é o que garante que os dois pareçam a mesma família. Eles **não compartilham** os tokens contextuais de densidade e layout — a escala de espaçamento aplicada, os alvos de toque, os breakpoints, a densidade tipográfica (P21). Um mesmo token semântico pode ter valor contextual (ex.: `space.inset.md` mais generoso no Mobile por causa do toque, mais compacto no Desktop pela produtividade). A regra: **identidade é compartilhada; densidade e layout são contextuais.** Nunca se resolve Mobile só reaplicando os tokens de Desktop via media query.

**EN** — Desktop and Mobile are **sibling products, not one responsive one** (`STUDIO_UX.md` §2, P4). They **share** the identity tokens — palette, color roles, type scale, motion curves, radius: this is what makes both look like the same family. They **don't share** the contextual density and layout tokens — the applied spacing scale, touch targets, breakpoints, typographic density (P21). The same semantic token may carry a contextual value (e.g. `space.inset.md` more generous on Mobile for touch, more compact on Desktop for productivity). The rule: **identity is shared; density and layout are contextual.** Mobile is never solved by re-applying Desktop tokens through a media query.

---

## 8. Regras, anti-padrões e governança · Rules, anti-patterns and governance

**PT — Regras:**

- Todo valor visual referencia um token semântico ou de componente (P1, P7).
- Primitivo nunca aparece numa tela ou componente — só é apontado pela camada semântica.
- Nome sempre em inglês, `categoria.papel.variação`; nunca a medida crua no nome.
- Toda família tem um dono documental; mudança na família atualiza a doc na mesma leva (docs vivos, `STUDIO_UX.md` §9).

**EN — Rules:**

- Every visual value references a semantic or component token (P1, P7).
- A primitive never appears in a screen or component — only the semantic layer points at it.
- Names are always English, `category.role.variant`; never the raw measure in the name.
- Every family has a documentation owner; a change in the family updates the doc in the same commit (living docs, `STUDIO_UX.md` §9).

**PT — Anti-padrões:**

- **Valor mágico** — um `15px`, `#0A84FF` ou `0.25s` escrito à mão. É o bug silencioso do design system (P7): parece certo e corrói a família.
- **Consumir primitivo direto** — `palette.blue.500` numa tela. Quebra a troca de tema.
- **Token acoplado ao valor** — `space-16px`, `color-blue`. O nome mente quando o valor muda.
- **Camada pulada** — componente apontando para primitivo em vez de semântico.
- **Token órfão** — criado e nunca consumido, ou consumido em um lugar só (não era token, era valor local).

**EN — Anti-patterns:**

- **Magic value** — a hand-written `15px`, `#0A84FF` or `0.25s`. The design system's silent bug (P7).
- **Consuming a primitive directly** — `palette.blue.500` in a screen. Breaks theming.
- **Value-coupled token** — `space-16px`, `color-blue`. The name lies when the value changes.
- **Skipped layer** — a component pointing at a primitive instead of a semantic.
- **Orphan token** — created and never consumed, or consumed in a single place (it wasn't a token, it was a local value).

**PT — Governança (SemVer, `STUDIO_UX.md` §7):** adicionar um token é **MINOR** (retrocompatível). Renomear ou remover um token é **MAJOR** (quebra contrato) e exige guia de migração. Aposentar segue o ciclo: marcar `DEPRECATED` com a versão e o substituto, manter por um ciclo, depois remover no MAJOR seguinte — nunca sumir de um dia para o outro. Toda mudança entra no `CHANGELOG.md` e vira tag anotada imutável. Mudanças estruturais de arquitetura de token viram um **ADR** curto (contexto → decisão → consequência) no doc afetado.

**EN — Governance (SemVer, `STUDIO_UX.md` §7):** adding a token is **MINOR** (backward-compatible). Renaming or removing a token is **MAJOR** (contract break) and needs a migration guide. Retiring follows the cycle: mark `DEPRECATED` with the version and the replacement, keep it for one cycle, then remove in the next MAJOR — never vanish overnight. Every change enters `CHANGELOG.md` and becomes an immutable annotated tag. Structural token-architecture changes become a short **ADR** (context → decision → consequence) in the affected doc.

---

*Documento vivo. Novas famílias e regras de token entram aqui primeiro; o detalhe desce para os docs de cada família. Atualizar nas duas línguas na mesma leva. · Living document. New token families and rules enter here first; detail descends to each family's doc. Update in both languages in the same commit.*
