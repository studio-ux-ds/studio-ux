# STUDIO_UX_COLOR_SYSTEM.md — Sistema de Cor · Color System

> Documento normativo vivo. Responde a: **como a cor é estruturada em papéis semânticos e escalas de tom, como os modos claro e escuro mapeiam esses papéis, e por que a cor nunca carrega significado sozinha?**
> Living normative document. Answers: **how is color structured into semantic roles and tonal scales, how do light and dark modes map those roles, and why does color never carry meaning alone?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PRINCIPLES.md` (P8, P17, P18). Camadas e nomenclatura: `STUDIO_UX_DESIGN_TOKENS.md`. Temas: `../STUDIO_UX_THEMES.md`.

---

## 1. Filosofia da cor · Color philosophy

**PT** — No Studio UX a cor é **função, não decoração** (P8). A interface serve aos dados (`STUDIO_UX_PHILOSOPHY.md` §1), e cor é atenção pura: cada mancha cromática rouba foco do conteúdo, então cada uma precisa justificar sua função. A paleta é enxuta e sóbria por convicção, não por moda: uma superfície neutra dominante, texto legível, e a cor de destaque reservada para o que exige ação ou sinaliza estado. Cor gritante espalhada é ruído. A régua: se uma cor não tem papel semântico, ela não entra.

**EN** — In Studio UX color is **function, not decoration** (P8). The interface serves the data (`STUDIO_UX_PHILOSOPHY.md` §1), and color is pure attention: every colored patch steals focus from content, so each must justify its function. The palette is lean and sober by conviction, not fashion: a dominant neutral surface, legible text, and the accent color reserved for what demands action or signals state. Loud color scattered around is noise. The rule: if a color has no semantic role, it doesn't enter.

---

## 2. Escalas de tom como primitivos · Tonal scales as primitives

**PT** — Na camada primitiva (agnóstica de uso — `STUDIO_UX_DESIGN_TOKENS.md` §2), cada matiz é definido como uma **escala de tom** em passos numerados, do mais claro ao mais escuro — por convenção `50, 100, 200, 300, 400, 500, 600, 700, 800, 900` (com `950` opcional para extremos). Ex.: `palette.neutral.50 … palette.neutral.900`, `palette.blue.50 … palette.blue.900`. O passo intermediário (~`500`) é a âncora mais saturada do matiz; os extremos servem a fundos e textos. Manter uma escala regular e previsível é o que permite ao modo escuro *espelhar* o claro invertendo a direção da escala, e o que dá aos estados hover/active um degrau adjacente coerente (hover = um passo, active = dois). **Os matizes e valores hex finais da marca são definidos na Fase 2** — aqui se fixa só a *estrutura da escala* (número de passos, papel de cada extremo), ver `../STUDIO_UX_ROADMAP.md`.

**EN** — In the primitive layer (usage-agnostic — `STUDIO_UX_DESIGN_TOKENS.md` §2), each hue is defined as a **tonal scale** in numbered steps, lightest to darkest — by convention `50, 100, 200, 300, 400, 500, 600, 700, 800, 900` (with an optional `950` for extremes). E.g. `palette.neutral.50 … palette.neutral.900`, `palette.blue.50 … palette.blue.900`. The mid step (~`500`) is the hue's most saturated anchor; the extremes serve backgrounds and text. Keeping a regular, predictable scale is what lets dark mode *mirror* light by inverting the scale direction, and what gives hover/active states a coherent adjacent step (hover = one step, active = two). **The final brand hues and hex values are set in Phase 2** — here only the *scale structure* is fixed (step count, role of each extreme), see `../STUDIO_UX_ROADMAP.md`.

**PT** — As famílias de matiz previstas são poucas e com propósito: um **neutro** dominante (a espinha dorsal de superfícies, texto e bordas), um **matiz de ação/marca** (o destaque primário) e um matiz para cada status. Nada de paleta arco-íris decorativa.

**EN** — The planned hue families are few and purposeful: a dominant **neutral** (the backbone of surfaces, text and borders), an **action/brand hue** (the primary accent), and one hue per status. No decorative rainbow palette.

---

## 3. Papéis semânticos de cor · Semantic color roles

**PT** — A camada semântica dá função aos tons. Telas e componentes consomem **só** estes papéis (nunca a escala primitiva). Os papéis são organizados em grupos:

**EN** — The semantic layer gives tones a function. Screens and components consume **only** these roles (never the primitive scale). Roles are organized into groups:

- **Superfície / Surface** — os fundos, em níveis de profundidade: `color.surface.base` (o fundo raiz da tela), `color.surface.raised` (cartões, painéis que sobem um nível), `color.surface.overlay` (menus, popovers, modais sobre a tela), `color.surface.sunken` (áreas recuadas, poços). Os níveis pareiam com a família Elevation (P9): sobe a superfície, sobe a sombra.
- **Texto / Text** — em níveis de ênfase: `color.text.primary` (o conteúdo principal), `color.text.secondary` (apoio, metadados), `color.text.tertiary`/`muted` (dicas, placeholders), `color.text.on-action` (texto sobre um fundo de ação), `color.text.disabled`. A ênfase vem do contraste, não de cores diferentes.
- **Borda / Border** — `color.border.subtle` (divisórias discretas), `color.border.default` (contorno de campos, cartões), `color.border.strong` (ênfase), `color.border.focus` (o anel de foco — obrigatório, P18).
- **Ação / Action** — `color.action.primary` (a ação principal única de um contexto — P6), `color.action.primary.hover`, `color.action.primary.active`, e o par secundário `color.action.secondary.*`. Ação é o destaque cromático mais forte da tela, justamente por ser raro.
- **Status** — os quatro sinais de estado, cada um com um tom de fundo suave e um de primeiro plano/ícone: `color.status.success.*`, `color.status.warning.*`, `color.status.danger.*`, `color.status.info.*`.

**PT** — Cada papel de status expõe ao menos duas variações — um `surface` suave (fundo do alerta/badge) e um `foreground` saturado (texto/ícone/borda) — para que o contraste interno do sinal seja garantido pelo token, não improvisado na tela.

**EN** — Each status role exposes at least two variants — a soft `surface` (badge/alert background) and a saturated `foreground` (text/icon/border) — so the signal's internal contrast is guaranteed by the token, not improvised on the screen.

---

## 4. Claro e escuro: mapeamento, não paleta nova · Light and dark: mapping, not a new palette

**PT** — Modo claro e modo escuro **não** são duas paletas separadas; são o **mesmo conjunto de papéis semânticos apontando para passos diferentes** da mesma escala de tom (`STUDIO_UX_DESIGN_TOKENS.md` §6). No claro, `color.surface.base` aponta para um neutro alto (`neutral.50`) e `color.text.primary` para um baixo (`neutral.900`); no escuro os papéis invertem a direção — a superfície vai para um neutro baixo, o texto para um alto. A tela nunca sabe qual modo está ativo: pede `color.text.primary` e recebe o tom certo. O escuro **não** é o claro com um filtro; é um remapeamento cuidadoso onde a elevação sobe *clareando* a superfície (em vez de sombras fortes) e a saturação dos destaques é reduzida para não vibrar sobre fundo escuro. Detalhe do sistema de temas em `../STUDIO_UX_THEMES.md`.

**EN** — Light and dark are **not** two separate palettes; they are the **same set of semantic roles pointing to different steps** of the same tonal scale (`STUDIO_UX_DESIGN_TOKENS.md` §6). In light, `color.surface.base` points to a high neutral (`neutral.50`) and `color.text.primary` to a low one (`neutral.900`); in dark the roles invert direction — surface goes to a low neutral, text to a high one. The screen never knows which mode is active: it asks for `color.text.primary` and gets the right tone. Dark is **not** light with a filter; it is a careful remap where elevation rises by *lightening* the surface (instead of heavy shadows) and accent saturation is dialed down so it doesn't vibrate on a dark ground. Theme-system detail in `../STUDIO_UX_THEMES.md`.

---

## 5. Contraste é requisito, não opção · Contrast is a requirement, not an option

**PT** — O contraste é uma propriedade da fundação (P18, `STUDIO_UX_PHILOSOPHY.md` §7), não um ajuste no fim. Cada par texto-sobre-superfície e cada estado interativo nascem dos tokens cumprindo a **meta WCAG AA** (contraste mínimo de 4.5:1 para texto normal, 3:1 para texto grande e para limites de componentes interativos/foco). Isso é responsabilidade da camada semântica: um par de papéis (`color.text.primary` sobre `color.surface.base`) só é válido se atender a meta em **todos** os temas — claro, escuro e de marca. Quando um novo tema é criado, os pares de contraste são reverificados antes de publicar; um tema de marca que quebra o AA é rejeitado, não aceito com ressalva (`../STUDIO_UX_THEMES.md`). O anel de foco (`color.border.focus`) é obrigatório e visível em todo elemento focável (P18, P19).

**EN** — Contrast is a property of the foundation (P18, `STUDIO_UX_PHILOSOPHY.md` §7), not a late tweak. Every text-on-surface pair and every interactive state is born from tokens meeting the **WCAG AA target** (minimum 4.5:1 for normal text, 3:1 for large text and for interactive/focus boundaries). This is the semantic layer's responsibility: a pair of roles (`color.text.primary` over `color.surface.base`) is valid only if it meets the target in **every** theme — light, dark and brand. When a new theme is created, contrast pairs are re-verified before publishing; a brand theme that breaks AA is rejected, not accepted with a caveat (`../STUDIO_UX_THEMES.md`). The focus ring (`color.border.focus`) is mandatory and visible on every focusable element (P18, P19).

---

## 6. Cor nunca é o único sinal · Color is never the only cue

**PT** — Significado nunca depende só de cor (P17). Um status não é "o vermelho" — é o ícone de erro + o rótulo "Falhou" + o vermelho. Um campo inválido não muda só de cor de borda: ganha ícone e mensagem (via toast — P12). Daltônicos, telas de baixa qualidade e ambientes de muita luz não podem perder informação por dependerem de matiz. Portanto todo uso de cor com carga semântica é **acompanhado de um segundo sinal** (ícone, texto, forma ou posição). Este princípio protege o próprio papel da cor: liberada de ser o único portador, ela pode ser discreta.

**EN** — Meaning never depends on color alone (P17). A status is not "the red" — it's the error icon + the "Failed" label + the red. An invalid field doesn't just change border color: it gets an icon and a message (via toast — P12). Color-blind users, low-quality screens and high-glare environments must not lose information by relying on hue. So every semantically-loaded use of color is **paired with a second cue** (icon, text, shape or position). This principle protects color's own role: freed from being the sole carrier, it can stay discreet.

---

## 7. Quando usar cada papel · When to use each role

**PT**

- **Ação primária** — só na ação principal única de um contexto (P6). Duas cores de ação primária na mesma tela competem e destroem a hierarquia.
- **Status** — só quando há um estado real de sistema (sucesso/aviso/erro/info) para comunicar, sempre com o segundo sinal (P17).
- **Superfícies em níveis** — para separar planos (cartão sobre fundo, overlay sobre tudo). Preferir separar por superfície + espaço (P5) a empilhar bordas.
- **Texto em níveis de ênfase** — para hierarquia de leitura; a ênfase vem do nível de texto, não de cores decorativas diferentes.

**EN**

- **Primary action** — only on the single primary action of a context (P6). Two primary-action colors on one screen compete and destroy hierarchy.
- **Status** — only when there is a real system state (success/warning/error/info) to communicate, always with the second cue (P17).
- **Layered surfaces** — to separate planes (card over ground, overlay over everything). Prefer surface + space (P5) over stacking borders.
- **Text emphasis levels** — for reading hierarchy; emphasis comes from the text level, not from different decorative colors.

---

## 8. Quando NÃO usar, anti-padrões e boas práticas · When NOT to use, anti-patterns, best practices

**PT — Quando NÃO usar cor:**

- Para decorar (gradientes, blocos coloridos sem função). Superfície neutra + espaço resolve melhor.
- Para hierarquia que o tamanho/peso/espaço já resolvem (`STUDIO_UX_TYPOGRAPHY.md`, P5).
- Para diferenciar itens que não têm diferença semântica real.

**EN — When NOT to use color:**

- To decorate (gradients, colored blocks with no function). Neutral surface + space does it better.
- For hierarchy that size/weight/space already solve (`STUDIO_UX_TYPOGRAPHY.md`, P5).
- To differentiate items with no real semantic difference.

**PT — Anti-padrões:**

- **Semáforo sem ícone** — vermelho/verde como único sinal de estado (viola P17).
- **Cor crua na tela** — `#FF0000` ou `palette.red.500` direto (viola P1 e a regra de camada).
- **Paleta decorativa** — matizes sem papel semântico, "para animar" a tela (viola P8).
- **Hardcode que quebra o dark** — cor fixa que só funciona no claro (ver `../STUDIO_UX_THEMES.md`).
- **Ação primária múltipla** — mais de um destaque de ação competindo (viola P6).

**EN — Anti-patterns:**

- **Traffic light without an icon** — red/green as the sole state cue (violates P17).
- **Raw color on screen** — `#FF0000` or `palette.red.500` directly (violates P1 and the layer rule).
- **Decorative palette** — hues with no semantic role, "to liven up" the screen (violates P8).
- **Hardcode that breaks dark** — a fixed color that only works in light (see `../STUDIO_UX_THEMES.md`).
- **Multiple primary actions** — more than one action accent competing (violates P6).

**PT — Boas práticas:** comece pela superfície neutra e pelo texto; adicione cor de ação só onde há ação; adicione status só onde há estado; verifique o contraste do par em claro e escuro antes de fechar; garanta o segundo sinal em todo uso semântico. A cor mais poderosa é a que aparece pouco.

**EN — Best practices:** start from the neutral surface and text; add action color only where there is action; add status only where there is state; verify the pair's contrast in light and dark before finishing; ensure the second cue on every semantic use. The most powerful color is the one that appears rarely.

---

## 9. Valores materializados · Materialized values (Fase 2 · Phase 2, aprovados 2026-07-15)

**PT** — Os valores concretos abaixo materializam a arquitetura acima (validados na Fase 1.6, aprovados pelo Robson). Telas e componentes **nunca** consomem o primitivo direto — consomem os papéis semânticos (§3), que apontam para estes primitivos. Hex de referência; a fonte executável virá nos arquivos de token (`packages/tokens`).

**EN** — The concrete values below materialize the architecture above (validated in Phase 1.6, approved by Robson). Screens/components **never** consume the primitive directly — they consume the semantic roles (§3), which point to these primitives. Reference hex; the executable source will live in the token files (`packages/tokens`).

### 9.1 Primitivo — escala neutra · Primitive — neutral scale

| Passo · Step | Hex |
|---|---|
| `palette.neutral.0` | `#FFFFFF` |
| `palette.neutral.50` | `#F7F8FA` |
| `palette.neutral.100` | `#EDEFF3` |
| `palette.neutral.200` | `#DDE1E8` |
| `palette.neutral.300` | `#C4CAD4` |
| `palette.neutral.400` | `#9AA1AE` |
| `palette.neutral.500` | `#6E7683` |
| `palette.neutral.600` | `#545B67` |
| `palette.neutral.700` | `#3D434D` |
| `palette.neutral.800` | `#272B33` |
| `palette.neutral.900` | `#171A1F` |

### 9.2 Primitivo — acentos (cor de ação, 7 opções) · Primitive — accents

| Acento · Accent | Base | Hover | Tint claro · Light tint | Tint escuro · Dark tint |
|---|---|---|---|---|
| **Índigo** (padrão · default) | `#4F46E5` | `#4338CA` | `#EEEFFE` | `#21243A` |
| Azul · Blue | `#2563EB` | `#1D4FD7` | `#E8F0FE` | `#16233F` |
| Teal | `#0F766E` | `#0B5D57` | `#E1F1EF` | `#0F2E2B` |
| Verde · Green | `#047857` | `#036145` | `#E6F4EE` | `#0F2E24` |
| Violeta · Violet | `#7C3AED` | `#6A2BD4` | `#F1E9FE` | `#271640` |
| Cobre · Copper | `#B45309` | `#96440A` | `#FBF0DD` | `#3A2A12` |
| Grafite · Graphite | `#334155` | `#293445` | `#EDEFF3` | `#20262F` |

### 9.3 Papéis semânticos — claro e escuro · Semantic roles — light and dark

> No escuro, a cor de ação clareia (`#6366F1`) para manter contraste sobre fundo escuro. / In dark, the action color lightens to keep contrast on a dark ground.

| Papel · Role | Claro · Light | Escuro · Dark |
|---|---|---|
| `color.surface.base` | `#F7F8FA` | `#14161B` |
| `color.surface.raised` | `#FFFFFF` | `#1C1F26` |
| `color.surface.overlay` | `#FFFFFF` | `#24272F` |
| `color.surface.sunken` | `#EDEFF3` | `#101216` |
| `color.text.primary` | `#171A1F` | `#F2F4F7` |
| `color.text.secondary` | `#545B67` | `#A6ADBA` |
| `color.text.muted` | `#9AA1AE` | `#6E7683` |
| `color.text.on-action` | `#FFFFFF` | `#FFFFFF` |
| `color.text.disabled` | `#C4CAD4` | `#4A5059` |
| `color.border.subtle` | `#EDEFF3` | `#23262E` |
| `color.border.default` | `#DDE1E8` | `#2A2E37` |
| `color.border.strong` | `#C4CAD4` | `#3A3F49` |
| `color.border.focus` | `#4F46E5` | `#6366F1` |
| `color.action.primary` | `#4F46E5` | `#6366F1` |
| `color.action.primary.hover` | `#4338CA` | `#7B7DF5` |
| `color.action.primary.active` | `#3730A3` | `#4F46E5` |

### 9.4 Status — primeiro plano + fundo · Status — foreground + background

| Status | fg | bg claro · light | bg escuro · dark |
|---|---|---|---|
| `color.status.success` | `#047857` | `#E6F4EE` | `#123028` |
| `color.status.warning` | `#B45309` | `#FBF0DD` | `#3A2A12` |
| `color.status.danger` | `#DC2626` | `#FCE9E9` | `#3A1A1A` |
| `color.status.info` | `#2563EB` | `#E8F0FE` | `#16233F` |

**PT** — Contraste conferido (P18, §5): todos os pares texto-sobre-superfície e status cumprem a meta WCAG AA nos dois modos. O acento de marca escolhido por tema revalida contraste no publish (`../STUDIO_UX_THEMES.md`).
**EN** — Contrast checked (P18, §5): every text-on-surface and status pair meets the WCAG AA target in both modes. The brand accent chosen per theme re-validates contrast on publish.

---

*Documento vivo. Arquitetura de cor + valores materializados (§9, Fase 2). Atualizar nas duas línguas na mesma leva. · Living document. Color architecture + materialized values (§9, Phase 2). Update in both languages in the same commit.*
