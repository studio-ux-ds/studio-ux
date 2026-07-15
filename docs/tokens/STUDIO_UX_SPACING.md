# STUDIO_UX_SPACING.md — Espaçamento · Spacing

> Documento normativo vivo. Responde a: **qual é a grade base do espaçamento, como a escala é nomeada e aplicada, e por que nenhum espaço é escrito fora dela?**
> Living normative document. Answers: **what is the base grid of spacing, how is the scale named and applied, and why is no space written outside it?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PRINCIPLES.md` (P5, P7, P21). Camadas e nomenclatura: `STUDIO_UX_DESIGN_TOKENS.md`. Ritmo com texto: `STUDIO_UX_TYPOGRAPHY.md`.

---

## 1. Espaço é a ferramenta primária de hierarquia · Space is the primary hierarchy tool

**PT** — Antes de uma borda, antes de um fundo, antes de uma cor, o espaço em branco é o que agrupa e separa (P5, `STUDIO_UX_PHILOSOPHY.md` §3). Elementos próximos "pertencem juntos"; elementos afastados são grupos distintos. Essa é a leitura mais barata e mais universal de uma tela, e por isso o espaço é a **primeira** ferramenta de hierarquia do Studio UX — bordas e fundos são o último recurso, não o primeiro. Um sistema de espaçamento existe para que essa ferramenta seja aplicada com **consistência**: o mesmo tipo de relação usa sempre o mesmo espaço, em toda tela, para que o olho aprenda o ritmo uma vez.

**EN** — Before a border, before a background, before a color, whitespace is what groups and separates (P5, `STUDIO_UX_PHILOSOPHY.md` §3). Nearby elements "belong together"; distant elements are distinct groups. This is the cheapest and most universal reading of a screen, and so space is Studio UX's **first** hierarchy tool — borders and backgrounds are the last resort, not the first. A spacing system exists so that this tool is applied with **consistency**: the same kind of relation always uses the same space, on every screen, so the eye learns the rhythm once.

---

## 2. A unidade-base: a grade de 4px · The base unit: the 4px grid

**PT** — O Studio UX propõe uma **grade conceitual de 4px** como unidade-base do espaçamento. Todo degrau da escala é um múltiplo dessa base. Por que 4? Porque é o maior divisor comum prático das telas modernas: divide bem as densidades de pixel, alinha-se ao ritmo tipográfico (entrelinhas e tamanhos costumam cair em múltiplos de 4), e produz uma escala fina o bastante para dar controle sem ser tão fina que reintroduz o caos do pixel livre. A grade de 4px é uma **decisão de arquitetura**, não um valor estético — ela define a *quantização* do espaço (só existem os pontos da grade), e é isso que torna "quase igual" impossível: entre `space-16` e `space-24` não há um `20` improvisado a menos que a escala o defina. Os **valores px finais de cada degrau** são materializados na Fase 2 (`../STUDIO_UX_ROADMAP.md`); aqui se fixa a base e a progressão.

**EN** — Studio UX proposes a **conceptual 4px grid** as the base unit of spacing. Every scale step is a multiple of that base. Why 4? Because it is the greatest practical common divisor of modern screens: it divides pixel densities well, aligns with typographic rhythm (line-heights and sizes tend to fall on multiples of 4), and yields a scale fine enough to give control without being so fine it reintroduces free-pixel chaos. The 4px grid is an **architecture decision**, not an aesthetic value — it defines the *quantization* of space (only grid points exist), and that is what makes "almost equal" impossible: between `space-16` and `space-24` there is no improvised `20` unless the scale defines it. The **final px value of each step** is materialized in Phase 2 (`../STUDIO_UX_ROADMAP.md`); here we fix the base and the progression.

---

## 3. A escala de espaçamento · The spacing scale

**PT** — A escala é uma sequência nomeada de degraus, do zero ao maior, cada um um múltiplo da base de 4px. A progressão **não** é puramente linear: é densa nos degraus pequenos (onde 4px de diferença importa muito — o espaço interno de um botão, o gap entre um ícone e seu rótulo) e mais espaçada nos grandes (onde saltos maiores são o que se percebe — a separação entre seções de página). Uma progressão comum combina passos de 4 na base e cresce por multiplicadores maiores no topo.

**EN** — The scale is a named sequence of steps, from zero to the largest, each a multiple of the 4px base. The progression is **not** purely linear: it is dense at small steps (where a 4px difference matters greatly — the inner space of a button, the gap between an icon and its label) and looser at large ones (where bigger jumps are what's perceived — the separation between page sections). A common progression combines steps of 4 at the base and grows by larger multipliers at the top.

**PT** — A nomenclatura segue a convenção de tokens (`STUDIO_UX_DESIGN_TOKENS.md` §3). Na camada primitiva, degraus por índice numérico da escala — `space-0, space-1, space-2, space-3, space-4, space-6, space-8, space-12, space-16, space-24…` — onde o índice é o multiplicador da base (o nome nunca é o px cru, para não mentir se o valor mudar). Na camada semântica, papéis com t-shirt sizes — `space.inset.sm/md/lg`, `space.stack.sm/md/lg` — que apontam para os degraus primitivos. A tela consome o papel semântico; nunca o degrau primitivo direto (regra de camada).

**EN** — Naming follows the token convention (`STUDIO_UX_DESIGN_TOKENS.md` §3). In the primitive layer, steps by numeric scale index — `space-0, space-1, space-2, space-3, space-4, space-6, space-8, space-12, space-16, space-24…` — where the index is the multiplier of the base (the name is never the raw px, so it won't lie if the value changes). In the semantic layer, roles with t-shirt sizes — `space.inset.sm/md/lg`, `space.stack.sm/md/lg` — pointing to the primitive steps. The screen consumes the semantic role; never the primitive step directly (layer rule).

---

## 4. Os três tipos de espaçamento · The three kinds of spacing

**PT** — O mesmo degrau da escala serve a três *tipos* de espaço, distinguidos por papel semântico para que a intenção seja explícita:

**EN** — The same scale step serves three *kinds* of space, distinguished by semantic role so intent is explicit:

- **Inset / padding — `space.inset.*`** — o espaço *interno* de um contêiner: a folga entre a borda de um cartão, botão ou campo e o seu conteúdo. Governa a densidade percebida de um componente.
- **Stack / gap vertical — `space.stack.*`** — o espaço *entre elementos empilhados verticalmente*: parágrafos, campos de um formulário, itens de uma lista, seções de página. É o principal instrumento do ritmo vertical (§ com `STUDIO_UX_TYPOGRAPHY.md`).
- **Inline / gap horizontal — `space.inline.*`** — o espaço *entre elementos lado a lado*: um ícone e seu rótulo, botões numa barra de ações, chips numa linha.

**PT** — Separar os tipos importa porque a mesma medida tem significados diferentes: `space.inset.md` num botão e `space.stack.md` entre campos podem apontar para o mesmo degrau, mas exprimem intenções distintas — e podem ser reajustadas independentemente sem colidir. Inset assimétrico (mais no eixo x que no y, ou vice-versa) usa degraus distintos por eixo, sempre da escala.

**EN** — Separating the kinds matters because the same measure means different things: `space.inset.md` on a button and `space.stack.md` between fields may point to the same step, yet express distinct intents — and can be retuned independently without colliding. Asymmetric inset (more on x than y, or vice versa) uses distinct steps per axis, always from the scale.

---

## 5. Proibição de valor arbitrário · No arbitrary value

**PT** — Todo `padding`, `margin` e `gap` mapeia para um degrau da escala (P7). Um `15px` onde a escala prevê `16px` é *o* bug silencioso do design system: parece certo, passa na revisão apressada, e corrói a família a cada repetição (`STUDIO_UX.md` §3, regra 5). O teste é objetivo: procurar qualquer valor de espaço que não seja um degrau nomeado; qualquer ocorrência é violação, mesmo que "esteticamente pareça melhor". Se um caso real parece pedir um valor fora da escala, a resposta não é o valor cru — é ou usar o degrau mais próximo, ou levar o caso à governança para avaliar um novo degrau (§7). O sistema **quantiza** o espaço de propósito: essa restrição é a origem da consistência, não um obstáculo a ela.

**EN** — Every `padding`, `margin` and `gap` maps to a scale step (P7). A `15px` where the scale expects `16px` is *the* silent bug of the design system: it looks right, passes a rushed review, and corrodes the family with each repetition (`STUDIO_UX.md` §3, rule 5). The test is objective: search for any space value that is not a named step; any occurrence is a violation, even if it "aesthetically looks better". If a real case seems to demand an off-scale value, the answer is not the raw value — it is either the nearest step, or taking the case to governance to consider a new step (§7). The system **quantizes** space on purpose: that restriction is the origin of consistency, not an obstacle to it.

---

## 6. Densidade Desktop vs. Mobile · Desktop vs. Mobile density

**PT** — A escala de espaçamento é **compartilhada** como estrutura (mesma base de 4px, mesmos degraus nomeados — identidade, `STUDIO_UX_DESIGN_TOKENS.md` §7); a **aplicação** é contextual (P4, P21). O Desktop tende à densidade: papéis semânticos resolvem para degraus menores, cabendo mais informação por tela, servindo à produtividade. O Mobile tende ao espaço: os mesmos papéis resolvem para degraus maiores, dando folga ao toque e garantindo alvos ≥ 44×44px (P19). Assim `space.inset.md` pode ser um degrau no Desktop e o degrau seguinte no Mobile — o *nome* é o mesmo, o *contexto* muda. Dentro de cada produto a densidade é uniforme (P21): não se mistura uma tela apertada com outra frouxa sem razão. Nunca se produz o Mobile só reescalonando o Desktop por media query.

**EN** — The spacing scale is **shared** as structure (same 4px base, same named steps — identity, `STUDIO_UX_DESIGN_TOKENS.md` §7); the **application** is contextual (P4, P21). Desktop leans dense: semantic roles resolve to smaller steps, fitting more information per screen, serving productivity. Mobile leans spacious: the same roles resolve to larger steps, giving room to touch and guaranteeing targets ≥ 44×44px (P19). So `space.inset.md` may be one step on Desktop and the next step on Mobile — the *name* is the same, the *context* changes. Within each product, density is uniform (P21): a cramped screen isn't mixed with a loose one without reason. Mobile is never produced by merely rescaling Desktop through a media query.

---

## 7. Boas práticas, anti-padrões e governança · Best practices, anti-patterns, governance

**PT — Boas práticas:**

- Resolver hierarquia com espaço antes de recorrer a borda ou fundo (P5).
- Escolher o papel certo (inset/stack/inline) para tornar a intenção explícita.
- Manter o ritmo: relações do mesmo tipo usam o mesmo degrau em toda a tela.
- Preferir menos degraus bem usados a inflar a escala.

**EN — Best practices:**

- Solve hierarchy with space before reaching for a border or background (P5).
- Pick the right role (inset/stack/inline) to make intent explicit.
- Keep the rhythm: same-kind relations use the same step across the screen.
- Prefer fewer well-used steps to inflating the scale.

**PT — Anti-padrões:**

- **Valor arbitrário** — `15px` onde a escala é `16px`; qualquer espaço fora de degrau (viola P7).
- **Borda antes de espaço** — cercar tudo em caixas quando o espaço resolveria (viola P5).
- **Degrau primitivo direto na tela** — `space-16` cru em vez do papel semântico (viola a regra de camada).
- **Tipo trocado** — usar inset onde o correto é stack, borrando a intenção.
- **Densidade incoerente** — telas apertadas e frouxas misturadas no mesmo produto (viola P21).
- **Espaço tipográfico solto** — espaçar texto com valores fora da escala, quebrando o ritmo vertical (viola P7 e §5 de `STUDIO_UX_TYPOGRAPHY.md`).

**EN — Anti-patterns:**

- **Arbitrary value** — `15px` where the scale is `16px`; any off-step space (violates P7).
- **Border before space** — boxing everything when space would solve it (violates P5).
- **Primitive step directly on screen** — raw `space-16` instead of the semantic role (violates the layer rule).
- **Swapped kind** — using inset where stack is correct, blurring intent.
- **Incoherent density** — cramped and loose screens mixed in the same product (violates P21).
- **Loose typographic space** — spacing text with off-scale values, breaking vertical rhythm (violates P7 and `STUDIO_UX_TYPOGRAPHY.md` §5).

**PT — Governança (SemVer, `STUDIO_UX.md` §7):** adicionar um degrau ou papel de espaçamento é **MINOR**. Remover ou renomear um degrau é **MAJOR** e exige guia de migração. Um novo degrau só entra quando um padrão recorrente prova que a escala tem um vão real — nunca para acomodar um valor arbitrário de uma tela. Toda mudança entra no `CHANGELOG.md`.

**EN — Governance (SemVer, `STUDIO_UX.md` §7):** adding a spacing step or role is **MINOR**. Removing or renaming a step is **MAJOR** and needs a migration guide. A new step enters only when a recurring pattern proves the scale has a real gap — never to accommodate one screen's arbitrary value. Every change enters `CHANGELOG.md`.

---

*Documento vivo. A base e a progressão entram aqui; os px finais de cada degrau são materializados na Fase 2. Atualizar nas duas línguas na mesma leva. · Living document. The base and progression enter here; the final px of each step is materialized in Phase 2. Update in both languages in the same commit.*
