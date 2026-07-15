# STUDIO_UX_LAYOUT_SYSTEM.md — Sistema de Layout · Layout System

> Documento normativo vivo. Responde a: **como uma tela é composta espacialmente — grade, regiões, containers, camadas — para que qualquer produto feito com Studio UX tenha a mesma estrutura sem inventar layout por tela?**
> Living normative document. Answers: **how is a screen composed spatially — grid, regions, containers, layers — so that any product built with Studio UX shares the same structure without inventing a per-screen layout?**
> Governança: `STUDIO_UX.md`. Princípios-âncora: P4, P5, P7, P21, P22. Fonte de valores: `tokens/STUDIO_UX_SPACING.md` e `tokens/STUDIO_UX_DESIGN_TOKENS.md`.

---

## 0. O que este documento é — e o que não é · What this document is — and is not

**PT** — Este é o documento que P22 cita: **toda composição de tela (grade, colunas, gutters, regiões, camadas) vem daqui, não de decisões ad hoc por tela.** Ele define a *estrutura* — onde as coisas moram e como o espaço é distribuído. Não define os valores finais (isso é dos tokens de espaçamento), nem os componentes que ocupam as regiões (isso é do catálogo), nem o comportamento de navegação de cada produto (isso é dos docs Desktop e Mobile). O layout é o esqueleto; tokens são as medidas; componentes são os órgãos.

**EN** — This is the document P22 cites: **all screen composition (grid, columns, gutters, regions, layers) comes from here, not from ad-hoc per-screen decisions.** It defines *structure* — where things live and how space is distributed. It does not define final values (that is the spacing tokens), nor the components that fill the regions (that is the catalog), nor each product's navigation behavior (that is the Desktop and Mobile docs). Layout is the skeleton; tokens are the measurements; components are the organs.

**PT** — Regra de fronteira: se a pergunta é "quanto de espaço?", vá aos tokens. Se é "que peça?", vá ao catálogo. Se é "onde a peça mora e como a tela se divide?", é aqui.

**EN** — Boundary rule: if the question is "how much space?", go to tokens. If it is "which piece?", go to the catalog. If it is "where the piece lives and how the screen divides?", it is here.

---

## 1. Dois sistemas de layout, tokens compartilhados · Two layout systems, shared tokens

**PT** — Coerente com o Princípio Reitor (`STUDIO_UX.md` §2) e P4: **Desktop e Mobile têm sistemas de layout diferentes.** Não é o mesmo grid reflowado por media query — são duas gramáticas espaciais distintas que herdam os *mesmos tokens* (a escala de espaçamento, a escala de raio, os tokens de camada). O que muda é a *composição*: o Desktop compõe para produtividade e visão simultânea de muita informação; o Mobile compõe para foco sequencial, alcance do polegar e uma coisa de cada vez. Um grid de 12 colunas com sidebar fixa e densidade alta é Desktop; uma coluna única, navegação inferior e ritmo espaçoso é Mobile. Tentar derivar um do outro só encolhendo a viewport é a violação que P4 proíbe.

**EN** — Consistent with the Governing Principle (`STUDIO_UX.md` §2) and P4: **Desktop and Mobile have different layout systems.** It is not the same grid reflowed by media query — they are two distinct spatial grammars inheriting the *same tokens* (the spacing scale, the radius scale, the layer tokens). What changes is *composition*: Desktop composes for productivity and simultaneous view of much information; Mobile composes for sequential focus, thumb reach and one thing at a time. A 12-column grid with fixed sidebar and high density is Desktop; a single column, bottom navigation and spacious rhythm is Mobile. Deriving one from the other by merely shrinking the viewport is the violation P4 forbids.

**PT** — O que os dois compartilham: (1) a escala de espaçamento — nenhum gutter, margem ou padding foge dela (P7); (2) a ideia de *shell* (§3) — ambos têm navegação, cabeçalho e área de conteúdo, embora em formas diferentes; (3) a pilha de camadas (§7); (4) a filosofia do espaço em branco como ferramenta primária de hierarquia (P5).

**EN** — What the two share: (1) the spacing scale — no gutter, margin or padding escapes it (P7); (2) the *shell* idea (§3) — both have navigation, header and content area, in different forms; (3) the layer stack (§7); (4) the whitespace-as-primary-hierarchy philosophy (P5).

---

## 2. A grade conceitual · The conceptual grid

**PT** — A grade é o acordo invisível que alinha tudo. Definimos três peças, todas ancoradas em tokens:

- **Colunas (columns).** O Desktop usa uma grade de **12 colunas**, divisível por 2, 3, 4 e 6 — flexível para meios, terços e quartos sem frações estranhas. O Mobile usa **4 colunas** (ou, na prática, uma coluna de conteúdo com sub-divisões pontuais), porque numa tela estreita a promessa de 12 colunas é ficção.
- **Gutters (medianiz).** O espaço *entre* colunas. É um token da escala de espaçamento, não um número solto. Desktop tende a gutter menor (densidade, P21); Mobile tende a gutter maior proporcionalmente ao alcance do toque.
- **Margens (margins).** O espaço entre a grade e a borda da região que a contém. Também token. No Mobile a margem lateral é o respiro mínimo que impede o conteúdo de colar na borda física.

**EN** — The grid is the invisible agreement that aligns everything. We define three pieces, all anchored to tokens:

- **Columns.** Desktop uses a **12-column** grid, divisible by 2, 3, 4 and 6 — flexible for halves, thirds and quarters without odd fractions. Mobile uses **4 columns** (in practice, a single content column with occasional sub-divisions), because on a narrow screen the promise of 12 columns is fiction.
- **Gutters.** The space *between* columns. A token from the spacing scale, not a loose number. Desktop leans to a smaller gutter (density, P21); Mobile leans to a proportionally larger gutter for touch reach.
- **Margins.** The space between the grid and the edge of its containing region. Also a token. On Mobile the side margin is the minimum breathing room that keeps content off the physical edge.

**PT** — A grade é um guia de alinhamento, não uma cerca. Um componente pode ocupar 1, 3 ou 12 colunas, mas suas bordas caem sempre nas linhas da grade. Alinhar "no olho" fora da grade é o bug silencioso de P5/P7.

**EN** — The grid is an alignment guide, not a fence. A component may span 1, 3 or 12 columns, but its edges always land on grid lines. Aligning "by eye" off the grid is the silent bug of P5/P7.

---

## 3. Regiões de tela: a ideia de shell · Screen regions: the shell idea

**PT** — Toda aplicação Studio UX vive dentro de um **shell** — a moldura persistente que responde "onde estou?" (P6) e não é redesenhada a cada tela. O shell tem quatro regiões canônicas:

- **Navegação (navigation).** Onde o usuário se move entre seções. No Desktop, uma **Sidebar** vertical (persistente, colapsável). No Mobile, uma **BottomNavigation** de 3–5 destinos e/ou um menu. É a única região que "sabe" a árvore inteira do produto.
- **Cabeçalho (header / top bar).** A faixa superior de contexto: título/breadcrumb da tela atual, busca global, ações globais, identidade/conta. No Desktop é uma **TopBar** larga; no Mobile é uma barra compacta com título e, no máximo, uma ou duas ações.
- **Área de conteúdo (content area).** O único lugar que muda de tela para tela. Tudo que é específico do fluxo mora aqui: tabelas, formulários, cards, editores. É a região que a grade (§2) governa.
- **Rodapé (footer).** Discreto e opcional. No padrão herdado do IA Studio, o rodapé da sidebar carrega o bloco de usuário e o **indicador passivo de versão** ("v1.2.0 · nova versão disponível") — informa sem interromper. O rodapé nunca disputa atenção com o conteúdo (P1 da filosofia).

**EN** — Every Studio UX application lives inside a **shell** — the persistent frame that answers "where am I?" (P6) and is not redrawn per screen. The shell has four canonical regions:

- **Navigation.** Where the user moves between sections. On Desktop, a vertical **Sidebar** (persistent, collapsible). On Mobile, a **BottomNavigation** of 3–5 destinations and/or a menu. The only region that "knows" the product's whole tree.
- **Header / top bar.** The top context strip: current-screen title/breadcrumb, global search, global actions, identity/account. On Desktop a wide **TopBar**; on Mobile a compact bar with a title and at most one or two actions.
- **Content area.** The only place that changes screen to screen. Everything flow-specific lives here: tables, forms, cards, editors. The region the grid (§2) governs.
- **Footer.** Discreet and optional. In the IA Studio-inherited pattern, the sidebar footer carries the user block and the **passive version indicator** ("v1.2.0 · new version available") — informs without interrupting. The footer never competes with content.

**PT** — Regra de composição por região (P22): uma tela **preenche** regiões; ela não redesenha o shell. A página nunca duplica o padding do container de conteúdo, nunca desenha sua própria barra de navegação, nunca move o cabeçalho. Sair da região é o anti-padrão "layout que ignora o shell".

**EN** — Region-composition rule (P22): a screen **fills** regions; it does not redraw the shell. The page never duplicates the content container's padding, never draws its own nav bar, never moves the header. Leaving the region is the "layout ignores the shell" anti-pattern.

---

## 4. Containers e larguras máximas · Containers and max widths

**PT** — Dentro da área de conteúdo, o texto e os formulários precisam de uma **largura máxima de leitura**. Uma tabela pode esticar até a borda útil; um parágrafo ou um formulário não — linha longa demais cansa o olho e destrói a hierarquia. Definimos containers nomeados por propósito (todos com largura em token):

- **Container de leitura/formulário** — largura confortável para texto e campos empilhados (uma medida de linha legível). Centralizado ou alinhado à esquerda conforme o produto.
- **Container de trabalho** — largura ampla para tabelas, dashboards e editores que se beneficiam de ver muito ao mesmo tempo (Desktop).
- **Container full-bleed** — quando o conteúdo é o próprio canvas (mapa, editor de fluxo, imagem). Ocupa a área toda, mas ainda respeita as margens do shell.

**EN** — Inside the content area, text and forms need a **maximum reading width**. A table may stretch to the useful edge; a paragraph or a form may not — an overly long line tires the eye and destroys hierarchy. We define containers named by purpose (all width-tokened):

- **Reading/form container** — comfortable width for text and stacked fields (a legible line measure). Centered or left-aligned per product.
- **Work container** — wide width for tables, dashboards and editors that benefit from seeing a lot at once (Desktop).
- **Full-bleed container** — when the content is the canvas itself (map, flow editor, image). Fills the whole area but still respects the shell margins.

**PT** — Boa prática: escolher o container pelo *conteúdo*, não pelo desejo de "preencher a tela". Um formulário de 6 campos num container de trabalho de 1600px é um erro de hierarquia, não uma tela cheia.

**EN** — Best practice: choose the container by the *content*, not by a wish to "fill the screen". A 6-field form in a 1600px work container is a hierarchy error, not a full screen.

---

## 5. Breakpoints como tokens · Breakpoints as tokens

**PT** — Breakpoints são tokens nomeados (ex.: `bp-sm`, `bp-md`, `bp-lg`, `bp-xl`), nunca números soltos no meio de uma tela. Mas — e este é o ponto que P4 blinda — **breakpoint organiza o conteúdo dentro de UM produto; ele não transforma Desktop em Mobile.** Um breakpoint do Desktop decide se um dashboard mostra 2, 3 ou 4 colunas de cards, se a sidebar colapsa em ícones, se uma tabela esconde colunas secundárias. Ele *não* é o mecanismo para "virar" o app Mobile — o Mobile é um produto projetado do zero, com seu próprio shell e seus próprios breakpoints internos (telefone pequeno vs. grande, retrato vs. paisagem, tablet).

**EN** — Breakpoints are named tokens (e.g. `bp-sm`, `bp-md`, `bp-lg`, `bp-xl`), never loose numbers mid-screen. But — and this is the point P4 shields — **a breakpoint organizes content within ONE product; it does not turn Desktop into Mobile.** A Desktop breakpoint decides whether a dashboard shows 2, 3 or 4 card columns, whether the sidebar collapses to icons, whether a table hides secondary columns. It is *not* the mechanism to "become" the Mobile app — Mobile is a product designed from scratch, with its own shell and its own internal breakpoints (small vs. large phone, portrait vs. landscape, tablet).

**PT** — Teste de sanidade: se um único conjunto de media queries está tentando levar a mesma marcação de 1920px até 375px, você está violando P4 — pare e trate como duas telas. Breakpoint legítimo reorganiza; breakpoint ilegítimo metamorfoseia.

**EN** — Sanity test: if a single set of media queries is trying to carry the same markup from 1920px down to 375px, you are violating P4 — stop and treat it as two screens. A legitimate breakpoint reorganizes; an illegitimate one metamorphoses.

---

## 6. Densidade e ritmo · Density and rhythm

**PT** — Densidade (P21) é a quantidade de informação por unidade de espaço; ritmo é a regularidade com que o espaço se repete. O Desktop tende à densidade (produtividade: ver muito, agir rápido); o Mobile tende ao espaço (toque, foco). Dentro de cada produto a densidade é **uniforme** — não se mistura uma tela apertada com outra frouxa sem motivo. O ritmo nasce da escala de espaçamento (P7): os mesmos degraus (`space-1`, `space-2`, `space-4`…) se repetem entre rótulo e campo, entre cards, entre seções, criando uma cadência que o olho aprende. Ritmo quebrado — um gap de 12px onde toda a tela usa 16px — é o "quase igual" que corrói a família (P20).

**EN** — Density (P21) is information per unit of space; rhythm is the regularity with which space repeats. Desktop leans dense (productivity: see much, act fast); Mobile leans spacious (touch, focus). Within each product density is **uniform** — a cramped screen isn't mixed with a loose one without reason. Rhythm is born from the spacing scale (P7): the same steps (`space-1`, `space-2`, `space-4`…) repeat between label and field, between cards, between sections, creating a cadence the eye learns. A broken rhythm — a 12px gap where the whole screen uses 16px — is the "almost equal" that corrodes the family (P20).

**PT** — Boa prática: definir a densidade da tela uma vez (compacta, confortável, espaçosa) e aplicar o degrau correspondente da escala em todos os espaçamentos verticais daquela tela. Espaço em branco é hierarquia (P5): antes de uma borda, tente um degrau maior de espaço.

**EN** — Best practice: set the screen's density once (compact, comfortable, spacious) and apply the matching scale step to every vertical spacing on that screen. Whitespace is hierarchy (P5): before a border, try a bigger space step.

---

## 7. Camadas e z-index · Layers and z-index

**PT** — Empilhamento não é livre. Definimos uma **pilha de camadas** nomeada por token de z-index, do fundo ao topo, para que dois overlays nunca briguem por profundidade "no chute":

1. **base** — o plano do shell e do fundo da página.
2. **content** — o conteúdo normal da área de conteúdo.
3. **sticky** — cabeçalhos de tabela fixos, barras de ação que grudam ao rolar, a TopBar quando fixa.
4. **overlay** — Dropdown/Menu, Popover, Tooltip: flutuam sobre o conteúdo mas são leves e efêmeros.
5. **modal** — Modal, Drawer/Sheet e ConfirmDialog, com o seu backdrop (scrim) logo abaixo. Captura o foco e bloqueia o fundo.
6. **toast** — a camada mais alta: notificações (Toast) precisam aparecer *acima* até de um modal, pois confirmam ou alertam sobre a própria ação em curso.

**EN** — Stacking is not free. We define a **layer stack** named by z-index token, back to front, so two overlays never fight for depth "by guess":

1. **base** — the shell plane and page background.
2. **content** — normal content-area content.
3. **sticky** — pinned table headers, action bars that stick on scroll, the TopBar when fixed.
4. **overlay** — Dropdown/Menu, Popover, Tooltip: float over content but are light and ephemeral.
5. **modal** — Modal, Drawer/Sheet and ConfirmDialog, with their backdrop (scrim) just below. Traps focus and blocks the background.
6. **toast** — the highest layer: notifications (Toast) must appear *above* even a modal, since they confirm or warn about the very action in progress.

**PT** — Regra: nenhum valor de z-index é escrito à mão (P1) — sempre o token da camada. Elevação por sombra (P9) acompanha a camada, mas com parcimônia: poucos níveis, discretos. Duas camadas modais simultâneas são um cheiro de arquitetura (um modal que abre outro modal) — reveja o fluxo antes de empilhar.

**EN** — Rule: no z-index value is hand-written (P1) — always the layer token. Shadow elevation (P9) follows the layer, but sparingly: few levels, discreet. Two simultaneous modal layers are an architecture smell (a modal opening another modal) — review the flow before stacking.

---

## 8. Estados do layout · Layout states

**PT** — O próprio layout tem estados, não só os componentes:

- **default** — shell montado, conteúdo carregado, grade respeitada.
- **loading** — a área de conteúdo mostra Skeleton na forma do que vai chegar (P14, P16); o shell permanece estável (a navegação não "pisca").
- **empty** — quando não há dados, a área de conteúdo hospeda um EmptyState centralizado no container de leitura; o shell continua inteiro.
- **error** — falha de carregamento mostra um estado de erro na área de conteúdo (com ação de repetir); o shell nunca some (o usuário não fica preso).
- **collapsed / expanded** — a Sidebar (Desktop) tem estado colapsado (só ícones) e expandido; a preferência é lembrada.
- **scrolled** — regiões sticky assumem sua elevação ao rolar; o cabeçalho pode compactar.
- **overflow** — quando o conteúdo excede a área, a rolagem mora na área de conteúdo, não na janela inteira; o shell não rola junto.

**EN** — The layout itself has states, not only components:

- **default** — shell mounted, content loaded, grid honored.
- **loading** — the content area shows Skeleton in the shape of what will arrive (P14, P16); the shell stays stable (navigation does not "flicker").
- **empty** — with no data, the content area hosts a centered EmptyState in the reading container; the shell stays whole.
- **error** — a load failure shows an error state in the content area (with a retry action); the shell never disappears (the user isn't trapped).
- **collapsed / expanded** — the Sidebar (Desktop) has collapsed (icons only) and expanded states; the preference is remembered.
- **scrolled** — sticky regions take their elevation on scroll; the header may compact.
- **overflow** — when content exceeds the area, scrolling lives in the content area, not the whole window; the shell doesn't scroll along.

---

## 9. Desktop vs. Mobile · Desktop vs. Mobile

**PT** — Resumo da divergência estrutural (mesmos tokens, gramáticas distintas):

- **Desktop** — shell horizontal: Sidebar à esquerda + TopBar no topo + área de conteúdo densa com grade de 12 colunas. Múltiplas regiões visíveis ao mesmo tempo. Overlays posicionados relativos ao gatilho (Popover, Menu). Rolagem por região. Alvo de mouse; teclado de primeira classe (P19).
- **Mobile** — shell vertical: BottomNavigation + barra superior compacta + uma coluna de conteúdo espaçosa. Uma tela, uma tarefa. Overlays viram Drawer/Sheet que sobem de baixo (alcance do polegar). Alvos ≥44px (P19). Gestos, mas nunca gesto como *único* caminho para uma ação.

**EN** — Summary of the structural divergence (same tokens, distinct grammars):

- **Desktop** — horizontal shell: Sidebar on the left + TopBar on top + a dense content area with a 12-column grid. Multiple regions visible at once. Overlays positioned relative to the trigger (Popover, Menu). Per-region scrolling. Mouse target; first-class keyboard (P19).
- **Mobile** — vertical shell: BottomNavigation + compact top bar + one spacious content column. One screen, one task. Overlays become Drawer/Sheet rising from the bottom (thumb reach). Targets ≥44px (P19). Gestures, but never a gesture as the *only* path to an action.

---

## 10. Acessibilidade do layout · Layout accessibility

**PT** — O layout carrega responsabilidades de acessibilidade que nenhum componente resolve sozinho (ver `STUDIO_UX_ACCESSIBILITY.md`): ordem de leitura/tabulação que segue a hierarquia visual (navegação → cabeçalho → conteúdo); um *skip link* para pular a navegação e ir ao conteúdo no Desktop; marcos semânticos por região (navegação, cabeçalho, principal, rodapé) para leitores de tela; foco nunca preso fora de um modal, sempre preso *dentro* de um modal (P18/P19); e uma altura de `100dvh` que respeita as barras dinâmicas do navegador móvel sem cortar conteúdo. A rolagem mora na região certa para que o teclado e o leitor de tela não se percam.

**EN** — The layout carries accessibility duties no single component solves (see `STUDIO_UX_ACCESSIBILITY.md`): a reading/tab order that follows the visual hierarchy (navigation → header → content); a *skip link* to jump past navigation to content on Desktop; semantic landmarks per region (navigation, header, main, footer) for screen readers; focus never trapped outside a modal, always trapped *inside* one (P18/P19); and a `100dvh` height that respects mobile browsers' dynamic bars without clipping content. Scrolling lives in the right region so keyboard and screen reader don't get lost.

---

## 11. Boas práticas e anti-padrões · Best practices and anti-patterns

**PT — Boas práticas:**
- Componha por regiões, não por pixel (P22): decida qual região e qual container antes de qualquer medida.
- Um valor de espaço = um token da escala (P7). Alinhe tudo à grade.
- Escolha o container pelo conteúdo (§4). Deixe o dado respirar com espaço, não com caixas (P5).
- Defina a densidade uma vez por tela e mantenha o ritmo (P21).
- Trate Desktop e Mobile como projetos separados que só compartilham tokens (P4).

**PT — Anti-padrões:**
- **Grid ad hoc por tela** — inventar colunas/gutters locais em vez de usar a grade do sistema (viola P22).
- **Layout que ignora o shell** — a página desenha sua própria navegação, move o cabeçalho ou duplica o padding do container.
- **Desktop virando Mobile por media query** — a metamorfose que P4 proíbe.
- **Valor mágico de espaço/z-index** — `padding: 15px` ou `z-index: 9999` (viola P1/P7).
- **Empilhar sombras** para fingir profundidade em vez de usar a pilha de camadas e a elevação contida (viola P9).
- **Container de trabalho para conteúdo curto** — formulário de 4 campos esticado por 1600px (viola hierarquia, P6).

**EN — Best practices:**
- Compose by regions, not by pixel (P22): decide which region and container before any measure.
- One space value = one scale token (P7). Align everything to the grid.
- Choose the container by content (§4). Let data breathe with space, not boxes (P5).
- Set density once per screen and keep the rhythm (P21).
- Treat Desktop and Mobile as separate projects sharing only tokens (P4).

**EN — Anti-patterns:**
- **Ad-hoc per-screen grid** — inventing local columns/gutters instead of the system grid (violates P22).
- **Layout that ignores the shell** — the page draws its own navigation, moves the header or duplicates the container padding.
- **Desktop becoming Mobile via media query** — the metamorphosis P4 forbids.
- **Magic space/z-index value** — `padding: 15px` or `z-index: 9999` (violates P1/P7).
- **Stacking shadows** to fake depth instead of the layer stack and restrained elevation (violates P9).
- **Work container for short content** — a 4-field form stretched across 1600px (violates hierarchy, P6).

---

*Documento vivo. O sistema de layout descreve a estrutura que existe hoje; valores finais moram nos tokens e comportamentos de navegação nos docs Desktop/Mobile. Mudou aqui, muda nas duas línguas na mesma leva. · Living document. The layout system describes today's structure; final values live in tokens and navigation behaviors in the Desktop/Mobile docs. A change here changes both languages in the same commit.*
