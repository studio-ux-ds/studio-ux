# STUDIO_UX_TYPOGRAPHY.md — Tipografia · Typography

> Documento normativo vivo. Responde a: **como o texto é estruturado em papéis, escala e eixos de token, e por que a hierarquia tipográfica é construída por sistema e não por escolha ad hoc de tamanho?**
> Living normative document. Answers: **how is text structured into roles, a scale and token axes, and why is typographic hierarchy built by system rather than ad-hoc size choices?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PRINCIPLES.md` (P6, P20, P21). Camadas e nomenclatura: `STUDIO_UX_DESIGN_TOKENS.md`. Ritmo vertical: `STUDIO_UX_SPACING.md`.

---

## 1. Por que uma arquitetura tipográfica · Why a typographic architecture

**PT** — A tipografia é o principal veículo da hierarquia (P6, `STUDIO_UX_PHILOSOPHY.md` §3): antes de qualquer cor ou borda, é o tamanho, o peso e o espaço do texto que dizem ao olho *onde estou, o que importa, o que faço agora*. Se cada tela escolhesse tamanhos de fonte à mão, a hierarquia viraria opinião local — dez tamanhos "quase iguais", nenhum com significado. Por isso a tipografia é um sistema: um conjunto pequeno de **papéis** com valores vindos de **tokens**, de modo que "isto é um título de seção" seja uma decisão do sistema, não um número digitado. **A fonte específica e os px finais são definidos na Fase 2** (`../STUDIO_UX_ROADMAP.md`); aqui se define a *estrutura*.

**EN** — Typography is the primary vehicle of hierarchy (P6, `STUDIO_UX_PHILOSOPHY.md` §3): before any color or border, it is the size, weight and space of text that tell the eye *where I am, what matters, what I do now*. If each screen picked font sizes by hand, hierarchy would become local opinion — ten "almost equal" sizes, none with meaning. So typography is a system: a small set of **roles** with values coming from **tokens**, so that "this is a section heading" is a system decision, not a typed number. **The specific typeface and final pixels are set in Phase 2** (`../STUDIO_UX_ROADMAP.md`); here we define the *structure*.

---

## 2. Papéis tipográficos · Typographic roles

**PT** — O texto é organizado por **função de leitura**, não por tamanho cru. Telas e componentes pedem o papel, não o px. Os papéis previstos:

**EN** — Text is organized by **reading function**, not raw size. Screens and components ask for the role, not the px. The planned roles:

- **Display** — o maior texto, para momentos de destaque raro (tela de entrada, número-herói de um dashboard). Uso escasso.
- **Heading** — títulos em níveis (`heading.1`, `heading.2`, `heading.3`…), a espinha dorsal da hierarquia de seção. Poucos níveis, cada um claramente distinto do vizinho.
- **Body** — o texto de conteúdo corrido, em pelo menos dois tamanhos (`body.md` padrão, `body.sm` para densidade). É o papel mais usado; otimizado para leitura confortável.
- **Label** — texto curto de UI: rótulos de campo, botões, itens de menu, cabeçalhos de tabela. Frequentemente com peso um pouco maior e tracking ajustado.
- **Caption** — texto auxiliar menor: legendas, metadados, dicas, textos de ajuda. Ênfase baixa por design.
- **Code / Mono** — texto monoespaçado para identificadores técnicos, valores literais e trechos de código. É o único lugar onde jargão técnico é aceitável na superfície — e mesmo assim sob a regra da linguagem do usuário (P11): dado técnico exposto porque *é* o dado, não porque a UI falhou em traduzir.

**PT** — Cada papel é um token composto (família + tamanho + peso + entrelinha + tracking) que a tela consome como uma unidade. "É um título de seção" resolve para `heading.2` inteiro, não para quatro valores soltos.

**EN** — Each role is a composite token (family + size + weight + line-height + tracking) that the screen consumes as a unit. "It's a section title" resolves to the whole `heading.2`, not to four loose values.

---

## 3. A escala tipográfica modular · The modular type scale

**PT** — Os tamanhos vêm de uma **escala modular**: cada passo é o anterior multiplicado por uma razão constante (a razão final é escolhida na Fase 2 — famílias como 1.125, 1.200 ou 1.250 são candidatas). Uma escala modular importa porque produz saltos **perceptíveis e proporcionais** entre níveis: dois títulos vizinhos são obviamente diferentes, sem serem gritantes. O contrário — tamanhos escolhidos a esmo — gera pares que o olho não distingue (o `17px` e o `18px` do mesmo texto) e saltos incoerentes. A escala primitiva é numerada (`font.scale.100 … font.scale.900` ou t-shirt sizes); os papéis semânticos apontam para passos dela (`font.size.body → font.scale.400`). Poucos passos: mais tamanhos que níveis de hierarquia é excesso que confunde (§8).

**EN** — Sizes come from a **modular scale**: each step is the previous one times a constant ratio (the final ratio is chosen in Phase 2 — families like 1.125, 1.200 or 1.250 are candidates). A modular scale matters because it produces **perceptible, proportional** jumps between levels: two neighboring headings are obviously different without being jarring. The opposite — sizes picked at random — yields pairs the eye can't tell apart (`17px` vs `18px` for the same text) and incoherent jumps. The primitive scale is numbered (`font.scale.100 … font.scale.900` or t-shirt sizes); semantic roles point at its steps (`font.size.body → font.scale.400`). Few steps: more sizes than hierarchy levels is confusing excess (§8).

---

## 4. Os eixos como tokens · The axes as tokens

**PT** — Cada papel tipográfico combina quatro eixos, cada um seu próprio conjunto de tokens:

**EN** — Each typographic role combines four axes, each its own set of tokens:

- **Size / `font.size.*`** — o tamanho, vindo da escala modular (§3).
- **Weight / `font.weight.*`** — poucos pesos com papel (`regular`, `medium`, `semibold`, `bold`). Peso é ênfase, não substituto de nível de tamanho (§8).
- **Line-height / `font.line-height.*`** — a entrelinha, ligada ao ritmo vertical (§5). Texto de conteúdo pede mais folga (leitura); títulos pedem menos (compacidade).
- **Letter-spacing / `font.tracking.*`** — o tracking, sutil: levemente negativo em títulos grandes, levemente positivo em rótulos pequenos em caixa alta. Nunca decorativo.

**PT** — A **família tipográfica** (`font.family.*`) é o quinto token, previsto para pelo menos duas entradas: uma família de UI/texto e uma monoespaçada para o papel Code. A escolha das famílias concretas é da Fase 2; a arquitetura só fixa que família também é token (P1) e que troca de família é troca de tema/marca, não edição de tela (`../STUDIO_UX_THEMES.md`).

**EN** — The **type family** (`font.family.*`) is the fifth token, planned for at least two entries: a UI/text family and a monospaced one for the Code role. Choosing the concrete families belongs to Phase 2; the architecture only fixes that family is also a token (P1) and that swapping family is a theme/brand swap, not screen editing (`../STUDIO_UX_THEMES.md`).

---

## 5. Ritmo vertical e a escala de espaçamento · Vertical rhythm and the spacing scale

**PT** — Tipografia e espaço são um sistema só. O **ritmo vertical** — a cadência regular com que linhas e blocos se empilham — nasce da relação entre a entrelinha (`font.line-height.*`) e a escala de espaçamento (`STUDIO_UX_SPACING.md`). A entrelinha e os espaços verticais (stack) derivam da mesma unidade-base para que o texto "assente" numa grade invisível: o espaço acima de um título, entre parágrafos e entre um rótulo e seu campo são degraus da escala de espaço, não valores tipográficos avulsos. É isso que faz páginas diferentes "respirarem" igual (P20). Espaçar texto com valores fora da escala é o mesmo bug silencioso do `15px` (P7).

**EN** — Typography and space are one system. **Vertical rhythm** — the regular cadence with which lines and blocks stack — is born from the relation between line-height (`font.line-height.*`) and the spacing scale (`STUDIO_UX_SPACING.md`). Line-height and vertical (stack) spaces derive from the same base unit so text "sits" on an invisible grid: the space above a heading, between paragraphs, and between a label and its field are steps of the spacing scale, not stray typographic values. This is what makes different pages "breathe" alike (P20). Spacing text with off-scale values is the same silent `15px` bug (P7).

---

## 6. Legibilidade e hierarquia · Legibility and hierarchy

**PT** — Duas metas guiam cada decisão: **legibilidade** (o texto é confortável de ler) e **hierarquia** (a importância relativa é óbvia sem esforço — P6). Para legibilidade: comprimento de linha controlado (medida de leitura confortável, tipicamente ~45–75 caracteres para body), entrelinha suficiente, contraste que cumpre a meta AA (P18, cor vem de `STUDIO_UX_COLOR_SYSTEM.md`). Para hierarquia: o salto entre níveis é claro (§3), a ênfase primária é o **tamanho/nível**, não a cor nem o peso sozinho. Uma tela com hierarquia tipográfica correta dispensa instruções; uma tela com hierarquia confusa nenhum texto de ajuda conserta (`STUDIO_UX_PHILOSOPHY.md` §3).

**EN** — Two goals guide every decision: **legibility** (text is comfortable to read) and **hierarchy** (relative importance is effortlessly obvious — P6). For legibility: controlled line length (a comfortable measure, typically ~45–75 characters for body), sufficient line-height, contrast meeting the AA target (P18, color from `STUDIO_UX_COLOR_SYSTEM.md`). For hierarchy: the jump between levels is clear (§3), primary emphasis is **size/level**, not color nor weight alone. A screen with correct typographic hierarchy needs no instructions; one with confused hierarchy no help text can fix (`STUDIO_UX_PHILOSOPHY.md` §3).

---

## 7. Densidade Desktop vs. Mobile · Desktop vs. Mobile density

**PT** — Desktop e Mobile **compartilham** a família tipográfica, os pesos e a estrutura da escala (identidade — `STUDIO_UX_DESIGN_TOKENS.md` §7); **não** compartilham a densidade aplicada (P4, P21). O Desktop tende à densidade — títulos e corpo podem ser um pouco menores e mais próximos, servindo à produtividade e a mais informação por tela. O Mobile tende ao espaço — tamanhos mínimos de corpo maiores para leitura a distância de braço, entrelinha mais generosa, alvos de toque respeitados (P19). O mesmo papel semântico (`body.md`) pode resolver para um valor contextual em cada produto. A regra: **o papel é o mesmo; a densidade é do produto.** Nunca se produz o Mobile só reduzindo o Desktop por media query.

**EN** — Desktop and Mobile **share** the type family, weights and scale structure (identity — `STUDIO_UX_DESIGN_TOKENS.md` §7); they **don't** share applied density (P4, P21). Desktop leans dense — headings and body can be slightly smaller and tighter, serving productivity and more information per screen. Mobile leans spacious — larger minimum body sizes for arm's-length reading, more generous line-height, touch targets respected (P19). The same semantic role (`body.md`) may resolve to a contextual value in each product. The rule: **the role is the same; density belongs to the product.** Mobile is never produced by merely shrinking Desktop through a media query.

---

## 8. Quando usar cada papel, boas práticas e anti-padrões · When to use each role, best practices, anti-patterns

**PT — Quando usar cada papel:** Display para o destaque raro e único; Heading para estrutura de seção (do maior nível para o menor, sem pular); Body para conteúdo de leitura; Label para elementos de UI curtos; Caption para o auxiliar de baixa ênfase; Code só para o dado técnico genuíno. Um papel por função — não se usa Heading para dar ênfase a um trecho de body (isso é peso/nível, ou é uma mudança estrutural real).

**EN — When to use each role:** Display for the rare, single highlight; Heading for section structure (largest to smallest, no skipping); Body for reading content; Label for short UI elements; Caption for the low-emphasis auxiliary; Code only for genuine technical data. One role per function — don't use Heading to emphasize a snippet of body (that's weight/level, or it's a real structural change).

**PT — Boas práticas:** comece pela hierarquia (quantos níveis a tela realmente tem?) antes do estilo; use o menor número de tamanhos que resolve a hierarquia; ancore todo espaço de texto na escala de espaçamento; verifique legibilidade em claro e escuro e nos dois produtos.

**EN — Best practices:** start from hierarchy (how many levels does the screen truly have?) before style; use the fewest sizes that solve the hierarchy; anchor every text space in the spacing scale; verify legibility in light and dark and on both products.

**PT — Anti-padrões:**

- **Peso no lugar de nível** — usar `bold` para simular um título quando o certo é subir de nível de tamanho. Peso reforça; não cria hierarquia sozinho.
- **Tamanhos demais** — mais tamanhos do que níveis reais de hierarquia; pares que o olho não distingue (`17`/`18`).
- **Tamanho cru na tela** — `font-size: 15px` à mão (viola P1, P7).
- **Título como decoração** — usar Display/Heading por estética, não por estrutura.
- **Tracking/entrelinha decorativos** — ajustes que não servem à leitura.
- **Jargão técnico como texto de UI** — expor identificador cru fora do papel Code (viola P11).

**EN — Anti-patterns:**

- **Weight instead of level** — using `bold` to fake a heading when the right move is a size level up. Weight reinforces; it doesn't create hierarchy alone.
- **Too many sizes** — more sizes than real hierarchy levels; pairs the eye can't tell apart (`17`/`18`).
- **Raw size on screen** — a hand-written `font-size: 15px` (violates P1, P7).
- **Heading as decoration** — using Display/Heading for aesthetics, not structure.
- **Decorative tracking/line-height** — adjustments that don't serve reading.
- **Technical jargon as UI copy** — exposing a raw identifier outside the Code role (violates P11).

---

*Documento vivo. Papéis e eixos entram aqui; a fonte e os px finais são materializados na Fase 2. Atualizar nas duas línguas na mesma leva. · Living document. Roles and axes enter here; the final typeface and pixels are materialized in Phase 2. Update in both languages in the same commit.*
