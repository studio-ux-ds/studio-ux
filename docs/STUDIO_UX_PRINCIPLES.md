# STUDIO_UX_PRINCIPLES.md — Princípios · Principles

> Documento normativo vivo. Responde a: **quais regras operacionais e testáveis governam toda tela feita com Studio UX?**
> Living normative document. Answers: **which operational, testable rules govern every screen built with Studio UX?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PHILOSOPHY.md`.

---

## Como ler este catálogo · How to read this catalog

**PT** — Cada princípio tem um **número imutável (P#)**. Documentos e componentes referenciam por número (ex.: "viola P7"). Aposentar um princípio = marcá-lo `DEPRECATED` com a versão; **nunca renumerar os demais**. Os princípios são a ponte entre a filosofia (por que) e o dia a dia (o que fazer). Cada um traz: enunciado, motivo, e — quando útil — o teste objetivo que decide se foi cumprido.

**EN** — Each principle has an **immutable number (P#)**. Docs and components reference it by number (e.g. "violates P7"). Retiring a principle = mark it `DEPRECATED` with the version; **never renumber the others**. Principles bridge philosophy (why) and daily practice (what to do). Each carries: statement, reason, and — when useful — the objective test that decides compliance.

---

## Fundação · Foundation

### P1 — Tudo vem de um token · Everything comes from a token
**PT** — Nenhum valor visual (cor, espaçamento, raio, tipografia, sombra, duração) é escrito "na mão". Todo valor referencia um design token. **Teste:** procurar por valores literais (`16px`, `#3B82F6`, `0.3s`) no que seria código de tela; qualquer ocorrência é violação.
**EN** — No visual value (color, spacing, radius, typography, shadow, duration) is hand-written. Every value references a design token. **Test:** search for literal values in what would be screen code; any occurrence is a violation.

### P2 — Um problema, uma solução · One problem, one solution
**PT** — Se um componente/padrão já resolve o caso, usa-se ele. Criar um segundo jeito de fazer a mesma coisa é proibido. **Teste:** antes de propor algo novo, apontar por que os existentes não bastam.
**EN** — If a component/pattern already solves the case, use it. Creating a second way to do the same thing is forbidden. **Test:** before proposing anything new, state why the existing ones don't suffice.

### P3 — A tela usa só componentes oficiais · Screens use only official components
**PT** — Nenhuma tela é construída com elementos avulsos quando existe componente oficial. Elementos "crus" só para o que o catálogo ainda não cobre — e isso vira pedido de novo componente, não gambiarra local.
**EN** — No screen is built with ad-hoc elements when an official component exists. Raw elements only for what the catalog doesn't yet cover — and that becomes a request for a new component, not a local hack.

### P4 — Desktop e Mobile não se misturam · Desktop and Mobile don't mix
**PT** — Layouts de Desktop e Mobile são projetados separadamente. Proibido "esticar" um para virar o outro só com media query. Compartilham tokens, identidade e princípios; não layouts. (Ver `STUDIO_UX.md` §2.)
**EN** — Desktop and Mobile layouts are designed separately. Forbidden to "stretch" one into the other with media queries alone. They share tokens, identity and principles; not layouts.

## Hierarquia e espaço · Hierarchy and space

### P5 — Espaço em branco é a ferramenta primária de hierarquia · Whitespace is the primary hierarchy tool
**PT** — Agrupa-se e separa-se com espaço, não com linhas e caixas. Antes de adicionar uma borda ou um fundo, tenta-se resolver com espaçamento. Bordas/fundos são o último recurso, não o primeiro.
**EN** — Group and separate with space, not lines and boxes. Before adding a border or background, try to solve it with spacing. Borders/backgrounds are the last resort, not the first.

### P6 — Uma tela responde onde/o-que/agora · A screen answers where/what/now
**PT** — Toda tela deixa claro, por hierarquia visual, onde o usuário está, o que importa e qual a ação principal. Uma única ação primária por contexto; o resto é secundário ou terciário.
**EN** — Every screen makes clear, through visual hierarchy, where the user is, what matters, and the primary action. A single primary action per context; the rest is secondary or tertiary.

### P7 — Sem espaçamento arbitrário · No arbitrary spacing
**PT** — Todo espaçamento vem da escala de espaçamento (ver `tokens/STUDIO_UX_SPACING.md`). Um `padding` de 15px onde a escala prevê 16px é o bug silencioso do design system. **Teste:** todo gap/padding/margin mapeia para um degrau da escala.
**EN** — Every spacing comes from the spacing scale. A 15px padding where the scale expects 16px is the design system's silent bug. **Test:** every gap/padding/margin maps to a scale step.

## Cor e forma · Color and form

### P8 — Poucas cores, com papéis semânticos · Few colors, with semantic roles
**PT** — A paleta é enxuta. Cor tem função (superfície, texto, ação, sucesso, alerta, erro, informação), não decoração. Cor nunca é o único portador de significado (ver P17). **Teste:** contar cores decorativas sem papel — deve tender a zero.
**EN** — The palette is lean. Color has function (surface, text, action, success, warning, danger, info), not decoration. Color is never the sole carrier of meaning (see P17). **Test:** count decorative colors with no role — should approach zero.

### P9 — Poucas sombras, elevação contida · Few shadows, restrained elevation
**PT** — Sombra comunica elevação (o que flutua sobre o quê), não estilo. Poucos níveis, discretos. Preferir separação por cor de superfície e espaço a empilhar sombras.
**EN** — Shadow communicates elevation (what floats above what), not style. Few levels, discreet. Prefer separation by surface color and space over stacking shadows.

### P10 — Raio e forma consistentes · Consistent radius and shape
**PT** — Cantos, bordas e formas vêm de uma escala única de raio. Um mesmo tipo de elemento tem sempre o mesmo raio em todo o sistema.
**EN** — Corners, borders and shapes come from a single radius scale. The same kind of element always has the same radius across the system.

## Conteúdo e linguagem · Content and language

### P11 — A língua da tela é a do usuário · The screen's language is the user's
**PT** — Regra máxima de UX (`STUDIO_UX.md` §6). Texto de superfície fala a língua do dono do negócio; jargão vai para "Ajustes avançados" ou some. **Teste:** nenhum rótulo/mensagem expõe identificador técnico, chave ou ID cru.
**EN** — Supreme UX rule. Surface copy speaks the business owner's language; jargon goes to "Advanced settings" or disappears. **Test:** no label/message exposes a technical identifier, key or raw ID.

### P12 — Erros e validações via toast, não banner nem alertas nativos · Errors and validations via toast, not banners or native alerts
**PT** — Feedback de erro/sucesso/aviso/info usa o padrão de toast do sistema. Nunca `alert()/confirm()/prompt()` nativos; nunca banner inline improvisado. (Confirmações destrutivas usam ConfirmDialog — ver P13.)
**EN** — Error/success/warning/info feedback uses the system toast pattern. Never native `alert()/confirm()/prompt()`; never an improvised inline banner. (Destructive confirmations use ConfirmDialog — see P13.)

### P13 — Ação destrutiva tem cinco proteções · Destructive action has five safeguards
**PT** — Toda ação destrutiva (excluir, restaurar, sobrescrever) carrega os cinco: **ConfirmDialog, aviso/disclaimer, tooltip explicativo, estado de loading e gate de permissão.** (Herdado do IA Studio — "os 5 patrasques".)
**EN** — Every destructive action (delete, restore, overwrite) carries the five: **ConfirmDialog, disclaimer, explanatory tooltip, loading state and permission gate.** (Inherited from IA Studio — "the 5 safeguards".)

### P14 — Todo estado é projetado · Every state is designed
**PT** — Para cada tela/componente, projeta-se explicitamente: vazio (EmptyState), carregando (skeleton/spinner), erro, sucesso e o estado com muitos dados. "Feliz" não é o único caminho. **Teste:** um componente sem estado vazio e sem estado de erro não está pronto.
**EN** — For each screen/component, explicitly design: empty (EmptyState), loading (skeleton/spinner), error, success and the many-data state. The "happy path" is not the only path. **Test:** a component with no empty and no error state is not done.

## Movimento e feedback · Motion and feedback

### P15 — Movimento é funcional e discreto · Motion is functional and discreet
**PT** — Micro-animações curtas explicam continuidade e causalidade. Nada de movimento decorativo. Respeitar `prefers-reduced-motion`. **Teste:** se remover a animação piora a compreensão? Se não, ela sobra.
**EN** — Short micro-animations explain continuity and causality. No decorative motion. Respect `prefers-reduced-motion`. **Test:** does removing the animation hurt understanding? If not, it's excess.

### P16 — Toda ação dá retorno em até um instante · Every action gives feedback within an instant
**PT** — Nenhum clique fica "mudo". Retorno imediato: estado de loading, skeleton, toast ou transição. O usuário nunca fica sem saber se o sistema recebeu a ação.
**EN** — No click stays "mute". Immediate feedback: loading state, skeleton, toast or transition. The user is never left unsure whether the system received the action.

## Acessibilidade e robustez · Accessibility and robustness

### P17 — Significado nunca depende só de cor · Meaning never depends on color alone
**PT** — Estado/severidade sempre têm um segundo sinal além da cor (ícone, texto, forma). Daltônicos e telas ruins não podem perder informação.
**EN** — State/severity always have a second cue beyond color (icon, text, shape). Color-blind users and poor screens must not lose information.

### P18 — Contraste e foco são obrigatórios · Contrast and focus are mandatory
**PT** — Texto e elementos interativos cumprem contraste mínimo (meta WCAG AA); todo elemento focável tem foco visível. Nasce dos tokens e componentes. Ver `STUDIO_UX_ACCESSIBILITY.md`.
**EN** — Text and interactive elements meet minimum contrast (WCAG AA target); every focusable element has visible focus. Born from tokens and components. See `STUDIO_UX_ACCESSIBILITY.md`.

### P19 — Alvo de toque e teclado de primeira classe · Touch target and keyboard first-class
**PT** — No Mobile, alvos de toque ≥ 44×44px. No Desktop, todo fluxo é operável por teclado (tab, enter, esc, atalhos). Nenhum é "extra".
**EN** — On Mobile, touch targets ≥ 44×44px. On Desktop, every flow is keyboard-operable (tab, enter, esc, shortcuts). Neither is an "extra".

## Consistência e sistema · Consistency and system

### P20 — Nada parece "de fora da família" · Nothing looks "outside the family"
**PT** — Densidade, ritmo de espaço, tipografia, raio e cor de um novo elemento batem com o resto. **Teste:** colocado ao lado de um componente existente, o novo elemento parece do mesmo sistema?
**EN** — Density, spacing rhythm, typography, radius and color of a new element match the rest. **Test:** placed next to an existing component, does the new element look from the same system?

### P21 — Densidade é intencional e coerente · Density is intentional and coherent
**PT** — Desktop tende à densidade (produtividade); Mobile tende ao espaço (toque). Dentro de cada produto, a densidade é uniforme — não se mistura uma tela apertada com outra frouxa sem razão.
**EN** — Desktop leans dense (productivity); Mobile leans spacious (touch). Within each product, density is uniform — a cramped screen isn't mixed with a loose one without reason.

### P22 — Layout vem do sistema de layout · Layout comes from the layout system
**PT** — Composição de tela (grid, colunas, gutters, regiões) segue `layouts/STUDIO_UX_LAYOUT_SYSTEM.md`. Nada de grids ad hoc por tela.
**EN** — Screen composition (grid, columns, gutters, regions) follows the layout system. No ad-hoc per-screen grids.

## Governança da experiência · Experience governance

### P23 — Permissão molda a interface · Permission shapes the interface
**PT** — O que o usuário não pode fazer, ele não vê habilitado. Botões/ações refletem permissão (padrão `can()` no front + gate no back). Ação sem permissão nunca aparece "clicável e depois nega".
**EN** — What the user cannot do, they don't see enabled. Buttons/actions reflect permission (front `can()` + back gate). An unpermitted action never appears "clickable then denied".

### P24 — Ações relevantes deixam rastro · Relevant actions leave a trail
**PT** — Onde o consumidor precisa de auditoria, o Studio UX oferece os padrões visuais para expor histórico/trilha de forma legível (quem, quando, o que mudou). O framework dá a forma; o sistema dá o dado.
**EN** — Where the consumer needs auditing, Studio UX provides the visual patterns to expose history/trail legibly (who, when, what changed). The framework gives the form; the system gives the data.

### P25 — Documentar o porquê é parte do pronto · Documenting the why is part of done
**PT** — Um componente/padrão só está pronto com propósito, quando usar, quando NÃO usar, regras, limitações, boas práticas, anti-padrões, estados e variação Desktop/Mobile — nas duas línguas. (Ver `STUDIO_UX.md` §8–9.)
**EN** — A component/pattern is only done with purpose, when-to-use, when-NOT, rules, limitations, best practices, anti-patterns, states and Desktop/Mobile variation — in both languages.

---

## Resolução de conflitos · Conflict resolution

**PT** — Se dois princípios colidirem num caso concreto, a ordem de precedência é: **acessibilidade e clareza do usuário (P11, P17–P19) > consistência do sistema (P1–P3, P20) > densidade/estética (P21).** Nunca se sacrifica compreensão do usuário por elegância. Casos recorrentes de conflito viram um ADR no documento afetado.

**EN** — If two principles collide in a concrete case, precedence is: **accessibility and user clarity (P11, P17–P19) > system consistency (P1–P3, P20) > density/aesthetics (P21).** User understanding is never sacrificed for elegance. Recurring conflicts become an ADR in the affected document.

---

*Documento vivo. Novo princípio recebe o próximo número livre; aposentado vira DEPRECATED com a versão. Nunca renumerar. · Living document. A new principle gets the next free number; a retired one becomes DEPRECATED with the version. Never renumber.*
