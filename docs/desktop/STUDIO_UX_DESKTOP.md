# STUDIO_UX_DESKTOP.md — Produto Desktop · Desktop Product

> Documento normativo vivo. Responde a uma pergunta: **como é o Studio UX Desktop, o produto projetado para produtividade — sua arquitetura de aplicação, suas peças de shell e suas telas-arquétipo?**
> Living normative document. Answers one question: **what is Studio UX Desktop, the product designed for productivity — its application architecture, its shell parts and its archetype screens?**
> Governança: `STUDIO_UX.md`. Princípios: `STUDIO_UX_PRINCIPLES.md`. Irmão: `mobile/STUDIO_UX_MOBILE.md`.

---

## 0. Premissa · Premise

**PT** — O Studio UX Desktop é um dos **dois produtos irmãos** do framework (P4). Ele é projetado do zero para a **produtividade**: densidade de informação, operação por teclado e mouse, múltiplas colunas simultâneas, sessões de trabalho prolongadas em telas largas. Ele **nunca** é obtido esticando o Mobile, e o Mobile nunca é obtido comprimindo o Desktop — os dois compartilham identidade, princípios e tokens, mas não layouts. Este documento descreve a *arquitetura* do produto Desktop (o esqueleto e as telas-arquétipo), não valores finais de estilo nem código — estamos na Fase 1 (fundação documental).

**EN** — Studio UX Desktop is one of the framework's **two sibling products** (P4). It is designed from scratch for **productivity**: information density, keyboard-and-mouse operation, multiple simultaneous columns, prolonged work sessions on wide screens. It is **never** obtained by stretching Mobile, and Mobile is never obtained by compressing Desktop — the two share identity, principles and tokens, but not layouts. This document describes the *architecture* of the Desktop product (the skeleton and the archetype screens), not final style values nor code — we are in Phase 1 (documentation foundation).

**PT** — O usuário-alvo do Desktop é o **operador**: alguém que passa horas no sistema, repete tarefas, quer ver muito de uma vez e navegar sem tirar as mãos do teclado. Cada decisão abaixo serve esse usuário. Onde o Desktop diverge do Mobile, o documento diz explicitamente por quê.

**EN** — The Desktop target user is the **operator**: someone who spends hours in the system, repeats tasks, wants to see a lot at once and navigate without leaving the keyboard. Every decision below serves that user. Where Desktop diverges from Mobile, this document says explicitly why.

---

## 1. Arquitetura geral — o shell · Overall architecture — the shell

**PT** — Toda aplicação Desktop do Studio UX monta-se sobre um **shell persistente** de três a quatro regiões estáveis que não recarregam ao navegar: uma **Sidebar** à esquerda (navegação primária), uma **TopBar** no topo (contexto, busca e ações globais), uma área de **conteúdo** central que troca conforme a rota, e um **Footer** discreto quando aplicável. O shell é o mapa mental constante do usuário: ele muda de tela sem nunca perder a moldura. Isso reduz carga cognitiva (P6 — onde/o-que/agora) e permite atalhos globais consistentes (P19).

**EN** — Every Studio UX Desktop application is built on a **persistent shell** of three to four stable regions that do not reload on navigation: a **Sidebar** on the left (primary navigation), a **TopBar** at the top (context, search and global actions), a central **content** area that swaps by route, and a discreet **Footer** where applicable. The shell is the user's constant mental map: they change screens without ever losing the frame. This lowers cognitive load (P6 — where/what/now) and enables consistent global shortcuts (P19).

**PT** — O shell segue o sistema de layout (P22): larguras de coluna, gutters e regiões vêm de `layouts/STUDIO_UX_LAYOUT_SYSTEM.md`, nunca de medidas ad hoc por tela. A hierarquia de superfícies (fundo da aplicação < superfície da Sidebar < superfície de conteúdo < superfície elevada de overlays) obedece a poucos níveis de elevação (P9) — separação por cor de superfície e espaço antes de sombra. A largura de conteúdo tem um teto legível: em monitores ultralargos, o conteúdo não estica infinitamente; ganha respiro nas laterais, mantendo comprimento de linha e densidade de leitura sob controle.

**EN** — The shell follows the layout system (P22): column widths, gutters and regions come from `layouts/STUDIO_UX_LAYOUT_SYSTEM.md`, never from ad-hoc per-screen measures. The surface hierarchy (app background < Sidebar surface < content surface < elevated overlay surface) obeys few elevation levels (P9) — separation by surface color and space before shadow. Content width has a legible ceiling: on ultra-wide monitors, content does not stretch infinitely; it gains side breathing room, keeping line length and reading density under control.

**Anti-padrões · Anti-patterns**
- **PT** — Recarregar a Sidebar/TopBar a cada rota; conteúdo que estica até as bordas em telas 4K sem teto de leitura; inventar uma quarta região de navegação concorrente com a Sidebar.
- **EN** — Reloading Sidebar/TopBar on every route; content stretching to the edges on 4K screens with no reading ceiling; inventing a fourth navigation region competing with the Sidebar.

---

## 2. Sidebar — navegação primária · Sidebar — primary navigation

**PT** — A Sidebar é a espinha de navegação do Desktop. Ela lista os destinos de primeiro nível do sistema, sempre visível, ancorada à esquerda. É onde o usuário sabe **onde pode ir** — o equivalente desktop do Bottom Navigation do Mobile, mas com capacidade muito maior: dezenas de itens, agrupados em **seções** com rótulos, com suporte a subitens. O item da rota atual é destacado de forma inequívoca (o "onde estou" do P6), com um único item ativo por vez.

**EN** — The Sidebar is the Desktop's navigation spine. It lists the system's first-level destinations, always visible, anchored left. It is where the user knows **where they can go** — the desktop equivalent of Mobile's Bottom Navigation, but with far greater capacity: dozens of items, grouped into labeled **sections**, with subitem support. The current route's item is highlighted unambiguously (the P6 "where am I"), with a single active item at a time.

**PT** — A Sidebar é **colapsável**: expandida mostra ícone + rótulo; colapsada mostra só ícones (com tooltip no hover revelando o rótulo), recuperando largura para o conteúdo. O estado colapsado/expandido é lembrado por usuário. Grupos longos podem ser recolhidos por seção. A navegação é totalmente operável por teclado (P19): foco tabulável, setas para percorrer, enter para entrar.

**EN** — The Sidebar is **collapsible**: expanded shows icon + label; collapsed shows icons only (with a hover tooltip revealing the label), reclaiming width for content. The collapsed/expanded state is remembered per user. Long groups can be collapsed by section. Navigation is fully keyboard-operable (P19): tabbable focus, arrows to traverse, enter to enter.

**PT — Rodapé da Sidebar (padrão herdado do IA Studio).** O rodapé tem sempre **dois blocos verticais, nesta ordem**: (1) **bloco de usuário** — avatar circular com iniciais, nome (peso semibold), papel/role abaixo em tom mais discreto, e um ícone de **logout** à direita; (2) **bloco de versão** — texto centralizado, pequeno e discreto, mostrando a versão atual do sistema e, **se houver atualização disponível**, um sufixo em cor de destaque discreta (info/accent) indicando "nova versão disponível". O bloco de versão é **passivo e NÃO clicável** — ele apenas avisa; o usuário navega manualmente até Configurações › Atualização quando quiser. É indicador de estado, não notificação: avisa sem interromper nem forçar ação. A fonte da versão é um dado consultado uma vez no carregamento, com cache e fallback para a versão do build.

**EN — Sidebar footer (pattern inherited from IA Studio).** The footer always has **two vertical blocks, in this order**: (1) **user block** — circular avatar with initials, name (semibold), role below in a more discreet tone, and a **logout** icon on the right; (2) **version block** — centered, small, discreet text showing the current system version and, **if an update is available**, a suffix in a discreet accent color (info/accent) reading "new version available". The version block is **passive and NOT clickable** — it only informs; the user manually navigates to Settings › Update when they wish. It is a state indicator, not a notification: it informs without interrupting or forcing action. The version source is data fetched once on load, cached, with a fallback to the build version.

**Regras · Rules**
- **PT** — Um único item ativo; seções com rótulos claros na língua do usuário (P11); ícones acompanham rótulos, nunca substituem sozinhos o significado (P17). Colapsar recupera espaço, não esconde funções.
- **EN** — A single active item; sections with clear labels in the user's language (P11); icons accompany labels, never carry meaning alone (P17). Collapsing reclaims space, it does not hide functions.

**Anti-padrões · Anti-patterns**
- **PT** — Sidebar com dois itens ativos; rótulos técnicos (`user_settings` em vez de "Perfil"); bloco de versão clicável que reboca o usuário para uma tela; rodapé sem identidade do usuário; mais de um nível de aninhamento profundo que vira labirinto.
- **EN** — A Sidebar with two active items; technical labels (`user_settings` instead of "Profile"); a clickable version block that yanks the user to a screen; a footer without user identity; more than one deep nesting level turning into a maze.

**Diferença vs Mobile · Difference vs Mobile**
- **PT** — No Mobile, a navegação primária mora no **Bottom Navigation** (3–5 destinos ao alcance do polegar), não numa sidebar lateral. A Sidebar do Desktop é rica e permanente porque há largura e o mouse alcança a lateral sem esforço; no Mobile isso seria fora do alcance do polegar e roubaria a tela.
- **EN** — On Mobile, primary navigation lives in the **Bottom Navigation** (3–5 thumb-reachable destinations), not a side sidebar. The Desktop Sidebar is rich and permanent because there is width and the mouse reaches the side effortlessly; on Mobile that would be out of thumb reach and would steal the screen.

---

## 3. TopBar / Header · TopBar / Header

**PT** — A TopBar é a faixa de contexto e ação global no topo do shell. Ela carrega, da esquerda para a direita: o **contexto atual** (ex.: seletor de workspace/ambiente, quando o sistema é multi-tenant), a **busca global** (que abre a Command Palette — §5), e as **ações globais** à direita (notificações, ajuda, menu do usuário). Ela responde ao "onde estou" complementando a Sidebar e concentra o que é global à sessão, não à tela. A TopBar é fina e estável; não compete com o conteúdo (regra de ouro — a interface nunca chama mais atenção que os dados).

**EN** — The TopBar is the strip of global context and action at the top of the shell. It carries, left to right: the **current context** (e.g. a workspace/environment selector when the system is multi-tenant), the **global search** (which opens the Command Palette — §5), and the **global actions** on the right (notifications, help, user menu). It reinforces "where am I" complementing the Sidebar and concentrates what is global to the session, not the screen. The TopBar is thin and stable; it does not compete with content (golden rule — the interface never draws more attention than the data).

**Regras · Rules**
- **PT** — Ações da TopBar são **globais** (valem em qualquer tela). Ações específicas de uma tela moram na própria tela (ex.: cabeçalho de página, barra de ações de uma DataTable), nunca na TopBar. Busca global sempre acessível por atalho de teclado.
- **EN** — TopBar actions are **global** (valid on any screen). Screen-specific actions live in the screen itself (e.g. page header, a DataTable action bar), never in the TopBar. Global search always reachable by keyboard shortcut.

**Diferença vs Mobile · Difference vs Mobile**
- **PT** — A Top Bar do Mobile é **minimalista** e muda por tela (título + no máximo uma ou duas ações), porque o espaço é escasso e o foco é uma tarefa por vez. A TopBar do Desktop é estável e concentra o global porque há espaço e a sessão é longa.
- **EN** — Mobile's Top Bar is **minimalist** and changes per screen (title + at most one or two actions), because space is scarce and focus is one task at a time. Desktop's TopBar is stable and concentrates the global because there is room and the session is long.

---

## 4. Footer e Breadcrumb · Footer and Breadcrumb

**PT — Footer.** O Footer do Desktop é discreto e opcional. Ele hospeda metainformação de baixo peso: versão, ambiente atual, links institucionais, estado de conexão. Nunca hospeda ações primárias nem navegação essencial — se o usuário precisa disso para trabalhar, não pode estar num rodapé fácil de perder. Em telas de trabalho denso (DataTable, Analytics), o rodapé costuma ceder lugar à barra de paginação/status da própria tela.

**EN — Footer.** The Desktop Footer is discreet and optional. It hosts low-weight meta-information: version, current environment, institutional links, connection state. It never hosts primary actions nor essential navigation — if the user needs those to work, they cannot live in an easy-to-miss footer. On dense work screens (DataTable, Analytics) the footer typically yields to the screen's own pagination/status bar.

**PT — Breadcrumb.** O Breadcrumb é o rastro de migalhas que mostra a **profundidade** dentro de uma seção (ex.: Clientes › Contrato #123 › Faturas). Ele complementa a Sidebar: a Sidebar diz em qual seção você está; o Breadcrumb diz quão fundo. Cada nível é clicável e volta ao ancestral. Usa-se quando há hierarquia real de navegação (três ou mais níveis); em telas rasas, um título de página basta. Rótulos na língua do usuário (P11).

**EN — Breadcrumb.** The Breadcrumb is the trail that shows **depth** within a section (e.g. Customers › Contract #123 › Invoices). It complements the Sidebar: the Sidebar says which section you are in; the Breadcrumb says how deep. Each level is clickable and returns to the ancestor. Use it when there is real navigation hierarchy (three or more levels); on shallow screens a page title suffices. Labels in the user's language (P11).

**Diferença vs Mobile · Difference vs Mobile**
- **PT** — O Mobile raramente usa Breadcrumb (rouba espaço e alvos de toque ficam pequenos); usa o botão **voltar** e a hierarquia de telas empilhadas. O Desktop usa Breadcrumb porque há largura e o clique é preciso.
- **EN** — Mobile rarely uses a Breadcrumb (it steals space and touch targets shrink); it uses the **back** button and a stack of screens. Desktop uses a Breadcrumb because there is width and clicking is precise.

---

## 5. Navegação, teclado e Command Palette · Navigation, keyboard and Command Palette

**PT** — No Desktop, o **teclado é cidadão de primeira classe** (P19). Todo fluxo é operável sem o mouse: tab percorre foco em ordem lógica, enter confirma, esc fecha overlays, atalhos aceleram o repetitivo. Foco sempre visível (P18). O sistema publica um conjunto de **atalhos globais consistentes** (abrir busca, criar novo, salvar, navegar entre abas/registros) que não mudam de tela para tela — a memória muscular do operador é um ativo que o produto protege.

**EN** — On Desktop the **keyboard is a first-class citizen** (P19). Every flow is operable without the mouse: tab traverses focus in logical order, enter confirms, esc closes overlays, shortcuts accelerate the repetitive. Focus is always visible (P18). The system publishes a set of **consistent global shortcuts** (open search, create new, save, move between tabs/records) that do not change screen to screen — the operator's muscle memory is an asset the product protects.

**PT — Command Palette.** A Command Palette é o acelerador central do Desktop: um overlay invocado por atalho que combina **busca de navegação** (ir para qualquer tela), **busca de conteúdo** (encontrar um registro) e **execução de comandos** (disparar ações) num único campo. Ela é o que dá ao Desktop a sensação de velocidade de produtos como o Linear: o usuário experiente quase nunca precisa clicar na Sidebar. Lista resultados por relevância, é 100% navegável por teclado, e mostra o atalho de cada comando ao lado (ensinando o usuário a ir mais rápido na próxima vez).

**EN — Command Palette.** The Command Palette is the Desktop's central accelerator: a shortcut-invoked overlay combining **navigation search** (go to any screen), **content search** (find a record) and **command execution** (fire actions) in a single field. It is what gives Desktop the speed feel of products like Linear: the expert user almost never needs to click the Sidebar. It ranks results by relevance, is fully keyboard-navigable, and shows each command's shortcut beside it (teaching the user to go faster next time).

**Regras · Rules**
- **PT** — Atalhos globais são estáveis e documentados; nunca sequestram atalhos do navegador/SO de forma surpreendente. Toda ação alcançável por mouse também é alcançável por teclado. A Command Palette nunca é o *único* caminho para uma função (P6 — descoberta também pela Sidebar/tela).
- **EN** — Global shortcuts are stable and documented; they never hijack browser/OS shortcuts surprisingly. Every mouse-reachable action is also keyboard-reachable. The Command Palette is never the *only* path to a function (P6 — discovery also via Sidebar/screen).

**Diferença vs Mobile · Difference vs Mobile**
- **PT** — O Mobile não tem Command Palette nem atalhos de teclado; seu acelerador é o **gesto** e a busca por toque. Trazer uma Command Palette para o Mobile seria importar um padrão de outro produto (P4).
- **EN** — Mobile has no Command Palette nor keyboard shortcuts; its accelerator is the **gesture** and touch search. Bringing a Command Palette to Mobile would import a pattern from another product (P4).

---

## 6. Grid e layout de conteúdo · Content grid and layout

**PT** — A área de conteúdo do Desktop explora a largura com **múltiplas colunas simultâneas** (P21 — densidade intencional): lista + detalhe lado a lado, formulário + pré-visualização, mestre + inspetor. Isso é uma vantagem estrutural do Desktop que o Mobile não tem — no Mobile, esses mesmos elementos viram telas empilhadas navegadas em sequência. O grid, os gutters e os pontos de dobra vêm do sistema de layout (P22). Regiões de conteúdo agrupam-se por espaço em branco antes de bordas e caixas (P5).

**EN** — The Desktop content area exploits width with **multiple simultaneous columns** (P21 — intentional density): list + detail side by side, form + preview, master + inspector. This is a structural Desktop advantage Mobile lacks — on Mobile those same elements become stacked screens navigated in sequence. The grid, gutters and breakpoints come from the layout system (P22). Content regions group by whitespace before borders and boxes (P5).

**PT** — Padrões estruturais recorrentes do Desktop: **master–detail** (lista à esquerda, detalhe do item selecionado à direita, sem trocar de tela), **inspetor** (painel lateral persistente que edita as propriedades do item em foco), e **split view** com divisória ajustável. Todos preservam contexto: o usuário mantém a lista à vista enquanto opera o item.

**EN** — Recurring Desktop structural patterns: **master–detail** (list on the left, selected item's detail on the right, without switching screens), **inspector** (a persistent side panel editing the focused item's properties), and **split view** with an adjustable divider. All preserve context: the user keeps the list in view while operating on the item.

---

## 7. Telas-arquétipo · Archetype screens

**PT** — As telas abaixo são **arquétipos**: moldes conceituais que qualquer sistema consumidor instancia com seu próprio conteúdo. O Studio UX define a estrutura, a navegação e as regras de cada uma; o sistema entrega o dado. Para cada arquétipo: propósito, quando usar, regras, anti-padrões e a diferença vs Mobile.

**EN** — The screens below are **archetypes**: conceptual molds any consuming system instantiates with its own content. Studio UX defines each one's structure, navigation and rules; the system supplies the data. For each archetype: purpose, when to use, rules, anti-patterns and the difference vs Mobile.

### 7.1 Dashboard

**PT** — *Propósito:* dar, num relance, o estado do que importa e o caminho para agir. *Quando usar:* landing de uma seção/sistema para um perfil que precisa monitorar. *Estrutura:* grade de cartões de indicador (StatCard) no topo, seguida de blocos de gráfico e listas de itens acionáveis; uma única ação primária evidente (P6). *Regras:* cada indicador aponta para o detalhe correspondente; nada de "mural de números" sem próximo passo; estados vazio/loading/erro projetados (P14). *Anti-padrões:* Dashboard como depósito de todos os gráficos possíveis; densidade tão alta que nada se destaca. *Vs Mobile:* no Mobile o Dashboard é uma **coluna única rolável de cartões priorizados** — os três a cinco números que cabem no polegar —, não uma grade densa.

**EN** — *Purpose:* give, at a glance, the state of what matters and the path to act. *When to use:* landing of a section/system for a role that must monitor. *Structure:* a grid of indicator cards (StatCard) on top, followed by chart blocks and lists of actionable items; a single evident primary action (P6). *Rules:* each indicator links to its detail; no "wall of numbers" without a next step; empty/loading/error states designed (P14). *Anti-patterns:* a Dashboard as a dump of every possible chart; density so high nothing stands out. *Vs Mobile:* on Mobile the Dashboard is a **single scrollable column of prioritized cards** — the three to five numbers that fit the thumb — not a dense grid.

### 7.2 DataTable — o cavalo de batalha · the workhorse

**PT** — *Propósito:* exibir e operar grandes conjuntos de registros com controle total. A DataTable é a tela mais característica do Desktop; é onde a densidade e o teclado (P19, P21) mais rendem. *Capacidades:* **ordenação** por coluna (clique no cabeçalho), **filtros** (por coluna e globais, persistentes), **seleção** (linha única e múltipla, com barra de ações em massa que aparece ao selecionar), **paginação** (ou rolagem virtualizada para volumes grandes), **densidade ajustável** (confortável/compacta), colunas configuráveis (mostrar/ocultar/reordenar/fixar), e ações por linha. Operável inteiramente por teclado: setas navegam células/linhas, espaço seleciona, enter abre o detalhe.

**EN** — *Purpose:* display and operate large record sets with full control. The DataTable is the Desktop's most characteristic screen; it is where density and keyboard (P19, P21) pay off most. *Capabilities:* column **sorting** (click the header), **filters** (per-column and global, persistent), **selection** (single and multiple rows, with a bulk-action bar that appears on selection), **pagination** (or virtualized scrolling for large volumes), **adjustable density** (comfortable/compact), configurable columns (show/hide/reorder/pin), and per-row actions. Fully keyboard-operable: arrows navigate cells/rows, space selects, enter opens the detail.

**PT** — *Regras:* toda DataTable projeta explicitamente o estado **vazio** (EmptyState com próxima ação), **carregando** (skeleton de linhas), **erro** (toast + estado de recarregar) e **muitos dados** (paginação/virtualização) — P14. Ações destrutivas em massa carregam os cinco (P13). Cabeçalhos e filtros na língua do usuário (P11). *Anti-padrões:* tabela sem paginação nem virtualização travando com milhares de linhas; filtros que somem ao navegar; seleção em massa sem confirmação para ação destrutiva; densidade tão apertada que perde o alvo de clique. *Vs Mobile:* **a DataTable não existe no Mobile.** O mesmo dado vira uma **lista de Cards** rolável (§ Mobile), um item por cartão, com busca e filtros em bottom sheet — porque uma tabela de muitas colunas em 375px é ilegível e não tocável. Portar a DataTable para o Mobile "encolhendo colunas" é violação de P4.

**EN** — *Rules:* every DataTable explicitly designs the **empty** state (EmptyState with a next action), **loading** (row skeletons), **error** (toast + reload state) and **many-data** (pagination/virtualization) — P14. Destructive bulk actions carry the five (P13). Headers and filters in the user's language (P11). *Anti-patterns:* a table with no pagination nor virtualization choking on thousands of rows; filters that vanish on navigation; bulk selection with no confirmation for a destructive action; density so tight it loses the click target. *Vs Mobile:* **the DataTable does not exist on Mobile.** The same data becomes a scrollable **list of Cards** (see Mobile), one item per card, with search and filters in a bottom sheet — because a many-column table at 375px is illegible and untouchable. Porting the DataTable to Mobile by "shrinking columns" violates P4.

### 7.3 CRUD (criar/editar registro) · CRUD (create/edit record)

**PT** — *Propósito:* criar e editar uma entidade. *Estrutura Desktop:* formulário em **múltiplas colunas** quando os campos se agrupam bem, ou formulário + inspetor/pré-visualização lado a lado; seções com títulos; ação primária única de salvar, secundárias (cancelar, salvar e novo) claramente subordinadas (P6). *Regras:* validação inline por campo + feedback global via toast (P12); campos usam os componentes oficiais (FormField, PhoneInput, NumericInput — P3); jargão em "Ajustes avançados" (P11); estados de loading no submit e de erro projetados (P14, P16). *Anti-padrões:* formulário gigante de coluna única quando há largura para agrupar; salvar sem feedback; validação só no fim. *Vs Mobile:* no Mobile o CRUD é **uma coluna, um passo por vez**, campos grandes para o toque (≥44px), teclado contextual; formulários longos viram **Wizard** de etapas.

**EN** — *Purpose:* create and edit an entity. *Desktop structure:* a **multi-column** form when fields group well, or form + inspector/preview side by side; titled sections; a single primary save action, secondaries (cancel, save and new) clearly subordinate (P6). *Rules:* inline per-field validation + global feedback via toast (P12); fields use official components (FormField, PhoneInput, NumericInput — P3); jargon under "Advanced settings" (P11); loading-on-submit and error states designed (P14, P16). *Anti-patterns:* a giant single-column form when there is width to group; saving with no feedback; validation only at the end. *Vs Mobile:* on Mobile CRUD is **one column, one step at a time**, large touch fields (≥44px), contextual keyboard; long forms become a stepped **Wizard**.

### 7.4 Analytics

**PT** — *Propósito:* explorar tendências e comparações com profundidade. *Estrutura:* barra de controles no topo (intervalo de datas, dimensões, filtros), seguida de uma grade de gráficos e tabelas de apoio; permite comparar períodos e cruzar dimensões. *Regras:* cada gráfico tem título, unidade e legenda; cor com papel semântico e nunca como único sinal (P8, P17); estado vazio e de "sem dados no período" projetados (P14). *Anti-padrões:* dashboards de vaidade; gráfico 3D decorativo; excesso de cores sem função. *Vs Mobile:* no Mobile, Analytics reduz-se a **um gráfico por vez em cartões roláveis**, com controles em bottom sheet — não a grade densa de comparação simultânea, que exige a largura do Desktop.

**EN** — *Purpose:* explore trends and comparisons in depth. *Structure:* a control bar on top (date range, dimensions, filters), followed by a grid of charts and supporting tables; allows comparing periods and crossing dimensions. *Rules:* each chart has a title, unit and legend; color has a semantic role and is never the sole cue (P8, P17); empty and "no data in range" states designed (P14). *Anti-patterns:* vanity dashboards; decorative 3D charts; a color excess with no function. *Vs Mobile:* on Mobile, Analytics reduces to **one chart at a time in scrollable cards**, with controls in a bottom sheet — not the dense grid of simultaneous comparison, which needs Desktop width.

### 7.5 Login

**PT** — *Propósito:* autenticar com atrito mínimo. *Estrutura Desktop:* layout centrado e calmo, frequentemente dividido (marca/ilustração de um lado, formulário do outro), aproveitando a largura sem encher a tela. *Regras:* uma ação primária (entrar); erros via toast/inline discreto, nunca `alert()` nativo (P12); foco inicial no primeiro campo, submit por enter (P19); estados de loading e erro claros. *Anti-padrões:* pedir mais do que o necessário; mensagens de erro técnicas. *Vs Mobile:* no Mobile o Login é **coluna única, campos grandes ao alcance do polegar**, teclado contextual e suporte a preenchimento/biometria do dispositivo — não o split centrado do Desktop.

**EN** — *Purpose:* authenticate with minimal friction. *Desktop structure:* a centered, calm layout, often split (brand/illustration on one side, form on the other), using width without filling the screen. *Rules:* one primary action (sign in); errors via toast/discreet inline, never native `alert()` (P12); initial focus on the first field, submit on enter (P19); clear loading and error states. *Anti-patterns:* asking more than necessary; technical error messages. *Vs Mobile:* on Mobile Login is **a single column, large thumb-reachable fields**, contextual keyboard and device autofill/biometrics support — not the Desktop centered split.

### 7.6 Configurações · Settings

**PT** — *Propósito:* organizar preferências e administração em muitas categorias. *Estrutura Desktop:* navegação secundária à esquerda (lista de seções) + painel de detalhe à direita — um **master–detail** dentro da tela. É onde vive, por exemplo, a seção **Atualização** (para onde o bloco de versão da Sidebar *aponta em prosa*, sem levar por clique). *Regras:* agrupamento por afinidade; cada mudança dá feedback (P16); permissões moldam o que aparece (P23); ações destrutivas com os cinco (P13). *Anti-padrões:* uma tela infinita de opções sem agrupamento; salvar silencioso. *Vs Mobile:* no Mobile, Configurações é uma **lista rolável que empilha telas** (toca numa seção → abre a tela dela → volta), não o master–detail lado a lado.

**EN** — *Purpose:* organize preferences and administration across many categories. *Desktop structure:* secondary navigation on the left (section list) + detail panel on the right — a **master–detail** within the screen. This is where, for instance, the **Update** section lives (which the Sidebar's version block *points to in prose*, without linking by click). *Rules:* group by affinity; each change gives feedback (P16); permissions shape what appears (P23); destructive actions carry the five (P13). *Anti-patterns:* one endless option screen with no grouping; silent saving. *Vs Mobile:* on Mobile, Settings is a **scrollable list that stacks screens** (tap a section → open its screen → back), not the side-by-side master–detail.

### 7.7 Perfil · Profile

**PT** — *Propósito:* ver e editar a própria identidade e preferências pessoais. *Estrutura:* cabeçalho com avatar/nome/papel, seções de dados pessoais, segurança e preferências. *Regras:* dado sensível redigido; troca de senha com os cuidados destrutivos onde aplicável; feedback em cada salvamento. *Anti-padrões:* misturar administração do sistema com perfil pessoal. *Vs Mobile:* no Mobile o Perfil é uma **tela empilhada de seções tocáveis**, com o avatar e as ações principais no topo ao alcance do polegar.

**EN** — *Purpose:* view and edit one's own identity and personal preferences. *Structure:* header with avatar/name/role, sections for personal data, security and preferences. *Rules:* sensitive data redacted; password change with destructive care where applicable; feedback on each save. *Anti-patterns:* mixing system administration with personal profile. *Vs Mobile:* on Mobile the Profile is a **stacked screen of tappable sections**, with the avatar and main actions at the top within thumb reach.

### 7.8 Wizard · Wizard

**PT** — *Propósito:* conduzir um fluxo longo/complexo em etapas ordenadas (configuração inicial, importação, criação guiada). *Estrutura Desktop:* indicador de etapas visível (onde estou / quantas faltam — P6), conteúdo da etapa no centro, navegação anterior/próxima; possibilidade de mostrar um resumo lateral. *Regras:* validar por etapa antes de avançar; permitir voltar sem perder dados; estado de progresso claro (P16); a última etapa confirma antes de efetivar. *Anti-padrões:* wizard para o que caberia num formulário simples; etapas sem como voltar. *Vs Mobile:* no Mobile o Wizard é **uma etapa por tela cheia**, com progresso no topo e o botão de avançar fixo ao alcance do polegar — o mesmo conceito, layout diferente (P4).

**EN** — *Purpose:* guide a long/complex flow through ordered steps (initial setup, import, guided creation). *Desktop structure:* a visible step indicator (where am I / how many left — P6), step content in the center, previous/next navigation; an optional side summary. *Rules:* validate per step before advancing; allow going back without losing data; clear progress state (P16); the last step confirms before committing. *Anti-patterns:* a wizard for what would fit a simple form; steps with no way back. *Vs Mobile:* on Mobile the Wizard is **one step per full screen**, with progress on top and the advance button pinned within thumb reach — same concept, different layout (P4).

### 7.9 Relatórios · Reports

**PT** — *Propósito:* configurar, gerar, visualizar e exportar relatórios estruturados. *Estrutura Desktop:* painel de parâmetros (período, filtros, agrupamentos) + área de resultado (tabela/gráfico) + ações de exportar/agendar. Aproveita a largura para parâmetros e resultado coexistirem. *Regras:* geração dá feedback de progresso (P16); resultado vazio tem EmptyState com dica; exportação declara formato e escopo; nada de export com dados sensíveis sem gate de permissão (P23). *Anti-padrões:* gerar sem indicar progresso em relatórios pesados; export mudo. *Vs Mobile:* no Mobile, Relatórios foca em **consultar e compartilhar** um resultado já configurado (parâmetros em bottom sheet, resultado em cartões/um gráfico por vez), não na montagem densa lado a lado do Desktop.

**EN** — *Purpose:* configure, generate, view and export structured reports. *Desktop structure:* a parameter panel (period, filters, groupings) + result area (table/chart) + export/schedule actions. It uses width so parameters and result coexist. *Rules:* generation gives progress feedback (P16); an empty result has an EmptyState with a hint; export declares format and scope; no export of sensitive data without a permission gate (P23). *Anti-patterns:* generating heavy reports with no progress; a mute export. *Vs Mobile:* on Mobile, Reports focuses on **consulting and sharing** an already-configured result (parameters in a bottom sheet, result as cards/one chart at a time), not the Desktop's dense side-by-side assembly.

---

## 8. O que distingue o Desktop, em síntese · What sets Desktop apart, in synthesis

**PT** — O Desktop é o produto da **densidade deliberada** e do **teclado soberano**. Ele existe para quem trabalha muito, vê muito e navega rápido: Sidebar rica e permanente, TopBar global estável, múltiplas colunas simultâneas, Command Palette e atalhos, e a DataTable como cavalo de batalha. Cada uma dessas peças seria hostil num Mobile — e é justamente por isso que Desktop e Mobile são projetados separadamente (P4). Quem lê este documento para construir uma tela desktop deve, antes, passar pela checklist de `context/STUDIO_UX_AI_CONTEXT.md` e citar os princípios por número ao justificar cada escolha.

**EN** — Desktop is the product of **deliberate density** and the **sovereign keyboard**. It exists for those who work a lot, see a lot and navigate fast: a rich, permanent Sidebar, a stable global TopBar, multiple simultaneous columns, a Command Palette and shortcuts, and the DataTable as workhorse. Each of these pieces would be hostile on Mobile — which is precisely why Desktop and Mobile are designed separately (P4). Whoever reads this document to build a desktop screen should first go through the `context/STUDIO_UX_AI_CONTEXT.md` checklist and cite the principles by number when justifying each choice.

---

*Documento vivo. Atualizar junto com a arquitetura Desktop e os princípios que o governam; toda mudança nas duas línguas na mesma leva. · Living document. Update alongside the Desktop architecture and the principles governing it; every change in both languages in the same commit.*
