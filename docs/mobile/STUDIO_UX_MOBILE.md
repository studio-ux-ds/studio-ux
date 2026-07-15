# STUDIO_UX_MOBILE.md — Produto Mobile · Mobile Product

> Documento normativo vivo. Responde a uma pergunta: **como é o Studio UX Mobile, o produto projetado do zero para experiência nativa — sua arquitetura de toque, seus gestos e seus padrões de uso em movimento?**
> Living normative document. Answers one question: **what is Studio UX Mobile, the product designed from scratch for native experience — its touch architecture, gestures and on-the-go patterns?**
> Governança: `STUDIO_UX.md`. Princípios: `STUDIO_UX_PRINCIPLES.md`. Irmão: `desktop/STUDIO_UX_DESKTOP.md`.

---

## 0. Premissa · Premise

**PT** — O Studio UX Mobile é o **produto irmão** do Desktop (P4), projetado do zero para uma realidade completamente diferente: **toque em vez de mouse, gestos em vez de atalhos, uma tarefa por vez em vez de múltiplas colunas, uso em movimento em vez de sessão sentada, e rede instável em vez de conexão confiável.** O Mobile **não é uma adaptação do Desktop**; é um produto pensado para o polegar de alguém em pé no ônibus, com uma mão ocupada e sinal oscilando. Compartilha com o Desktop a identidade, os princípios e os tokens — nada de layout. Este documento descreve a *arquitetura* do produto Mobile; estamos na Fase 1 (fundação documental), portanto sem valores finais de estilo nem código.

**EN** — Studio UX Mobile is the Desktop's **sibling product** (P4), designed from scratch for a completely different reality: **touch instead of mouse, gestures instead of shortcuts, one task at a time instead of multiple columns, on-the-go use instead of a seated session, and flaky connectivity instead of a reliable link.** Mobile is **not an adaptation of Desktop**; it is a product designed for the thumb of someone standing on a bus, with one hand busy and a wavering signal. It shares with Desktop the identity, principles and tokens — no layout. This document describes the *architecture* of the Mobile product; we are in Phase 1 (documentation foundation), so no final style values nor code.

**PT** — O usuário-alvo do Mobile é o **usuário em contexto**: pouco tempo, uma tarefa focada, ambiente com distrações, possivelmente sem rede. Cada decisão abaixo protege esse usuário. Onde o Mobile diverge do Desktop, o documento diz explicitamente por quê — e o inverso ("por que não trazer o padrão do Desktop") é tão importante quanto o "o que fazer".

**EN** — The Mobile target user is the **user in context**: little time, one focused task, a distracting environment, possibly no network. Every decision below protects that user. Where Mobile diverges from Desktop, this document says explicitly why — and the inverse ("why not bring the Desktop pattern") matters as much as the "what to do".

---

## 1. Arquitetura geral · Overall architecture

**PT** — A aplicação Mobile organiza-se como uma **pilha de telas focadas**, não como um shell de múltiplas regiões. A moldura persistente é mínima: uma **Top Bar** fina no topo (contexto e no máximo uma ou duas ações) e uma **Bottom Navigation** ancorada embaixo (navegação primária ao alcance do polegar). Entre elas, uma tela por tarefa, rolável verticalmente. O usuário navega **empilhando** telas (entra num detalhe, volta) em vez de olhar tudo lado a lado. Densidade tende ao espaço (P21): alvos grandes, respiro generoso, uma coisa importante por vez (P6).

**EN** — The Mobile application is organized as a **stack of focused screens**, not a multi-region shell. The persistent frame is minimal: a thin **Top Bar** on top (context and at most one or two actions) and a **Bottom Navigation** anchored at the bottom (primary navigation within thumb reach). Between them, one screen per task, vertically scrollable. The user navigates by **stacking** screens (enter a detail, go back) rather than viewing everything side by side. Density leans spacious (P21): large targets, generous breathing room, one important thing at a time (P6).

**PT** — A **zona do polegar** governa o layout: ações primárias e navegação vivem na metade inferior da tela, onde o polegar alcança sem reposicionar a mão. O topo é para leitura e contexto; a base é para ação. Essa é a inversão mais visível em relação ao Desktop, onde a ação primária costuma morar no topo do conteúdo.

**EN** — The **thumb zone** governs layout: primary actions and navigation live in the lower half of the screen, where the thumb reaches without repositioning the hand. The top is for reading and context; the bottom is for action. This is the most visible inversion versus Desktop, where the primary action usually lives at the top of content.

---

## 2. Bottom Navigation — navegação primária · Bottom Navigation — primary navigation

**PT** — A Bottom Navigation é a navegação de primeiro nível do Mobile: uma barra fixa na base com **três a cinco destinos** representados por ícone + rótulo curto, o destino atual destacado (P6, P17 — nunca só por cor). É o equivalente mobile da Sidebar do Desktop, mas deliberadamente **enxuto**: só os destinos mais importantes cabem, porque estão na região nobre do polegar e porque mais que cinco vira ilegível e intocável. O que não cabe aqui mora dentro das seções, não numa segunda barra.

**EN** — Bottom Navigation is the Mobile's first-level navigation: a fixed bottom bar with **three to five destinations** shown as icon + short label, the current one highlighted (P6, P17 — never by color alone). It is the mobile equivalent of the Desktop Sidebar, but deliberately **lean**: only the most important destinations fit, because they sit in the thumb's prime zone and because more than five becomes illegible and untouchable. What does not fit here lives inside the sections, not in a second bar.

**Regras · Rules**
- **PT** — 3 a 5 destinos, um ativo por vez; alvos ≥ 44px (P19); ícone acompanhado de rótulo; destaque do ativo com segundo sinal além da cor (P17). A barra some/reaparece de forma previsível em rolagens longas, se aplicável, mas nunca prende o usuário sem saída.
- **EN** — 3 to 5 destinations, one active at a time; targets ≥ 44px (P19); icon paired with a label; active highlight with a second cue beyond color (P17). The bar may hide/reappear predictably on long scrolls, if applicable, but never traps the user.

**Anti-padrões · Anti-patterns**
- **PT** — Espremer a Sidebar inteira do Desktop numa barra inferior; mais de cinco itens; rótulos técnicos; dois itens ativos; usar a Bottom Navigation para ações (é navegação, não ação).
- **EN** — Cramming the whole Desktop Sidebar into a bottom bar; more than five items; technical labels; two active items; using Bottom Navigation for actions (it is navigation, not action).

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — O Desktop usa **Sidebar lateral rica e permanente** (dezenas de itens, seções, colapsável, rodapé com usuário e versão) porque há largura e o mouse alcança a lateral. No Mobile isso estaria fora do alcance do polegar e roubaria a tela — daí a barra inferior enxuta. **Não existe rodapé de Sidebar no Mobile**; identidade do usuário, versão e logout moram na tela de Perfil/Configurações, alcançadas por um destino da Bottom Navigation ou pela Top Bar.
- **EN** — Desktop uses a **rich, permanent side Sidebar** (dozens of items, sections, collapsible, footer with user and version) because there is width and the mouse reaches the side. On Mobile that would be out of thumb reach and would steal the screen — hence the lean bottom bar. **There is no Sidebar footer on Mobile**; user identity, version and logout live in the Profile/Settings screen, reached via a Bottom Navigation destination or the Top Bar.

---

## 3. Top Bar · Top Bar

**PT** — A Top Bar do Mobile é **minimalista e contextual**: mostra o título da tela atual (o "onde estou" — P6), o botão **voltar** quando há uma tela anterior na pilha, e no máximo uma ou duas ações realmente relevantes para *aquela* tela. Ela muda de tela para tela, ao contrário da TopBar estável do Desktop. Ações abundantes não cabem aqui — vão para um menu de overflow, um bottom sheet ou a própria tela. O objetivo é preservar espaço para o conteúdo e manter o foco em uma tarefa.

**EN** — The Mobile Top Bar is **minimalist and contextual**: it shows the current screen's title (the "where am I" — P6), the **back** button when there is a previous screen in the stack, and at most one or two actions truly relevant to *that* screen. It changes screen to screen, unlike Desktop's stable TopBar. Abundant actions do not fit here — they go to an overflow menu, a bottom sheet or the screen itself. The goal is to preserve content space and keep focus on one task.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — A TopBar do Desktop é **global e estável** (contexto de sessão, busca global que abre a Command Palette, ações globais) porque a sessão é longa e há espaço. A do Mobile é **local e trocável** porque cada tela é uma tarefa e o espaço é precioso.
- **EN** — The Desktop TopBar is **global and stable** (session context, global search opening the Command Palette, global actions) because the session is long and there is room. Mobile's is **local and swappable** because each screen is one task and space is precious.

---

## 4. Cards — a unidade de conteúdo dominante · Cards — the dominant content unit

**PT** — No Mobile, o **Card** é a unidade de conteúdo por excelência, substituindo a tabela densa do Desktop. Cada Card empacota um registro (um cliente, um pedido, um chamado) com seus poucos campos essenciais, uma hierarquia interna clara e as ações mais prováveis à mão. Listas de Cards rolam verticalmente e são o análogo mobile da DataTable — mas nunca são uma tabela encolhida: um Card mostra **os poucos campos que importam** naquele contexto, não trinta colunas espremidas. Toque no Card abre o detalhe (empilha uma tela).

**EN** — On Mobile, the **Card** is the content unit par excellence, replacing the Desktop's dense table. Each Card packages a record (a customer, an order, a ticket) with its few essential fields, a clear internal hierarchy and the most likely actions at hand. Lists of Cards scroll vertically and are the mobile analog of the DataTable — but they are never a shrunken table: a Card shows **the few fields that matter** in that context, not thirty squeezed columns. Tapping the Card opens the detail (stacks a screen).

**Regras · Rules**
- **PT** — Um Card = um registro; poucos campos priorizados; ação primária clara; agrupar por espaço antes de bordas (P5); estados de lista (vazio/loading/erro) projetados (P14). Ações secundárias podem morar num **swipe** ou num **long-press** (§5), sempre com alternativa visível e acessível.
- **EN** — One Card = one record; few prioritized fields; a clear primary action; group by space before borders (P5); list states (empty/loading/error) designed (P14). Secondary actions may live in a **swipe** or **long-press** (§5), always with a visible, accessible alternative.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — O Desktop mostra o mesmo conjunto de registros numa **DataTable** de muitas colunas, ordenável e filtrável, densa por design (P21). O Mobile mostra o subconjunto essencial em Cards tocáveis. **Converter DataTable em Cards não é encolher a tabela — é reprojetar o que se mostra** (P4).
- **EN** — Desktop shows the same record set in a many-column **DataTable**, sortable and filterable, dense by design (P21). Mobile shows the essential subset as tappable Cards. **Turning a DataTable into Cards is not shrinking the table — it is redesigning what is shown** (P4).

---

## 5. Gestos · Gestures

**PT** — Gestos são a linguagem nativa do toque, mas são **atalhos, nunca o único caminho**: todo gesto tem uma alternativa visível e acessível (um botão, um item de menu), porque gesto é invisível e não descobrível por todos, e a acessibilidade vem antes da elegância (ordem de precedência dos princípios). Os gestos permitidos no Studio UX Mobile e quando usá-los:

**EN** — Gestures are the native language of touch, but they are **shortcuts, never the only path**: every gesture has a visible, accessible alternative (a button, a menu item), because a gesture is invisible and not discoverable by everyone, and accessibility comes before elegance (the principles' precedence order). The gestures allowed in Studio UX Mobile and when to use them:

- **PT — Swipe (deslizar) num item de lista:** revela ações secundárias (arquivar, excluir). *Quando:* ações rápidas repetitivas numa lista. *Regra:* a mesma ação existe também por toque (menu do Card); ação destrutiva por swipe ainda exige confirmação (P13). *Quando NÃO:* como único jeito de excluir.
- **EN — Swipe on a list item:** reveals secondary actions (archive, delete). *When:* fast repetitive actions in a list. *Rule:* the same action also exists by tap (Card menu); a destructive swipe still requires confirmation (P13). *When NOT:* as the only way to delete.

- **PT — Pull-to-refresh (puxar para atualizar):** recarrega a lista atual. *Quando:* listas de dados que mudam (feed, pedidos, chamados). *Regra:* mostra estado de carregando (P16); existe também um jeito explícito de recarregar. *Quando NÃO:* em telas onde recarregar perde trabalho não salvo.
- **EN — Pull-to-refresh:** reloads the current list. *When:* lists of changing data (feed, orders, tickets). *Rule:* shows a loading state (P16); an explicit reload also exists. *When NOT:* on screens where reloading loses unsaved work.

- **PT — Long-press (pressionar e segurar):** abre um menu contextual de ações do item. *Quando:* revelar ações secundárias sem poluir o Card. *Regra:* sempre duplicado por um botão de "mais ações" visível.
- **EN — Long-press:** opens a contextual action menu for the item. *When:* revealing secondary actions without cluttering the Card. *Rule:* always duplicated by a visible "more actions" button.

- **PT — Swipe horizontal entre abas/telas irmãs** e **voltar por gesto de borda:** navegação natural do SO. *Regra:* respeitar a convenção da plataforma; nunca sequestrar o gesto de voltar do sistema.
- **EN — Horizontal swipe between sibling tabs/screens** and **edge-swipe back:** natural OS navigation. *Rule:* honor the platform convention; never hijack the system back gesture.

**Anti-padrões · Anti-patterns**
- **PT** — Gesto como único caminho para uma função; gesto destrutivo sem confirmação; inventar gestos exóticos que ninguém descobre; conflitar com gestos do SO.
- **EN** — A gesture as the only path to a function; a destructive gesture with no confirmation; inventing exotic gestures no one discovers; conflicting with OS gestures.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — O Desktop não tem gestos de toque; seu equivalente em velocidade é o **teclado e a Command Palette** (§Desktop). Trazer swipe/long-press para o Desktop seria importar um padrão de outro produto (P4). Inversamente, trazer atalhos de teclado como recurso primário para o Mobile ignora que não há teclado físico em contexto de uso.
- **EN** — Desktop has no touch gestures; its speed equivalent is the **keyboard and Command Palette** (see Desktop). Bringing swipe/long-press to Desktop would import another product's pattern (P4). Conversely, bringing keyboard shortcuts as a primary resource to Mobile ignores that there is no physical keyboard in the usage context.

---

## 6. Listas · Lists

**PT** — A lista rolável vertical é o esqueleto de navegação de conteúdo do Mobile. Itens são grandes o suficiente para o toque confiável (**≥ 44×44px** — P19), com espaço entre eles (P5), e feedback tátil/visual ao tocar (P16). Listas longas usam rolagem virtualizada e carregamento incremental ("carregar mais" ou infinito, com indicador claro de que há mais). Cabeçalhos de seção e separadores ajudam a orientar em listas longas. Todo estado é projetado: vazio (EmptyState com próxima ação), carregando (skeleton de itens), erro (com opção de repetir) — P14.

**EN** — The vertical scrollable list is the Mobile's content navigation skeleton. Items are large enough for reliable touch (**≥ 44×44px** — P19), with space between them (P5), and tactile/visual feedback on tap (P16). Long lists use virtualized scrolling and incremental loading ("load more" or infinite, with a clear indicator that more exists). Section headers and dividers help orient in long lists. Every state is designed: empty (EmptyState with a next action), loading (item skeletons), error (with a retry option) — P14.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — No Desktop, o volume de registros vira **DataTable paginada/virtualizada** com colunas, ordenação e seleção em massa. No Mobile vira **lista de Cards** rolável. A seleção em massa, natural no Desktop, é rara e cuidadosa no Mobile (o dedo erra mais que o mouse).
- **EN** — On Desktop, record volume becomes a **paginated/virtualized DataTable** with columns, sorting and bulk selection. On Mobile it becomes a scrollable **list of Cards**. Bulk selection, natural on Desktop, is rare and careful on Mobile (the finger errs more than the mouse).

---

## 7. Busca · Search

**PT** — A busca no Mobile é um padrão de tela cheia focado: um campo de busca no topo (aberto por um ícone na Top Bar ou fixo no topo da lista), teclado surgindo, resultados aparecendo enquanto se digita, buscas recentes e sugestões quando o campo está vazio. Toque num resultado empilha o detalhe. A busca é frequentemente o **atalho principal** do Mobile para encontrar um registro numa base grande, já que não há Command Palette nem tabela filtrável.

**EN** — Search on Mobile is a focused full-screen pattern: a search field on top (opened by a Top Bar icon or fixed atop the list), the keyboard surfacing, results appearing as you type, recent searches and suggestions when the field is empty. Tapping a result stacks the detail. Search is often the Mobile's **main shortcut** to find a record in a large base, since there is no Command Palette nor filterable table.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — No Desktop, a busca global vive na TopBar e abre a **Command Palette** (navegação + conteúdo + comandos). No Mobile é uma tela de busca de conteúdo dedicada, operada por toque, sem a camada de "comandos por teclado".
- **EN** — On Desktop, global search lives in the TopBar and opens the **Command Palette** (navigation + content + commands). On Mobile it is a dedicated content-search screen, touch-operated, without the "keyboard commands" layer.

---

## 8. Filtros · Filters

**PT** — Filtros no Mobile abrem num **bottom sheet** (folha deslizante de baixo para cima) ou drawer, ao alcance do polegar, sobrepondo a lista sem trocar de tela. O usuário escolhe critérios com controles grandes e tocáveis, vê a contagem de resultados atualizar, e aplica. Filtros ativos ficam visíveis como *chips* removíveis acima da lista, para o usuário nunca esquecer que a lista está filtrada. *Regra:* aplicar e limpar são explícitos; estado "sem resultados para esse filtro" tem EmptyState (P14).

**EN** — Filters on Mobile open in a **bottom sheet** (a sheet sliding up from the bottom) or drawer, within thumb reach, overlaying the list without switching screens. The user picks criteria with large, tappable controls, sees the result count update, and applies. Active filters remain visible as removable *chips* above the list, so the user never forgets the list is filtered. *Rule:* apply and clear are explicit; a "no results for this filter" state has an EmptyState (P14).

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — No Desktop, filtros vivem **inline** na barra da DataTable, com largura para vários filtros simultâneos visíveis. No Mobile, concentram-se num bottom sheet porque não há espaço para expô-los sem sufocar a lista.
- **EN** — On Desktop, filters live **inline** in the DataTable bar, with width for several simultaneous visible filters. On Mobile, they concentrate in a bottom sheet because there is no room to expose them without choking the list.

---

## 9. Scanner — câmera, código de barras e QR · Scanner — camera, barcode and QR

**PT** — O Scanner é um padrão **nativo do Mobile sem par no Desktop**: usar a câmera do dispositivo para ler código de barras, QR ou capturar imagem como entrada de dados (registrar um produto, validar um ingresso, iniciar um fluxo por QR). *Quando usar:* sempre que digitar seria lento ou propenso a erro e o dado tem forma escaneável. *Regras:* pedir permissão de câmera com explicação clara do porquê (P11); dar feedback imediato de leitura bem/malsucedida (P16); oferecer **entrada manual como alternativa** sempre (acessibilidade e câmera indisponível); funcionar com o mínimo de passos, uma mão. *Anti-padrões:* scanner sem fallback manual; capturar sem confirmar o que foi lido.

**EN** — The Scanner is a **Mobile-native pattern with no Desktop counterpart**: using the device camera to read a barcode, QR or capture an image as data input (register a product, validate a ticket, start a flow via QR). *When to use:* whenever typing would be slow or error-prone and the datum has a scannable form. *Rules:* request camera permission with a clear why (P11); give immediate feedback on read success/failure (P16); always offer **manual entry as an alternative** (accessibility and camera unavailable); work in minimal steps, one-handed. *Anti-patterns:* a scanner with no manual fallback; capturing without confirming what was read.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — O Desktop, sem câmera à mão em contexto de trabalho, resolve a mesma necessidade por **digitação, importação de arquivo ou colagem**. O Scanner é uma capacidade que só faz sentido no produto Mobile — exemplo puro de por que os dois produtos são projetados separadamente (P4).
- **EN** — Desktop, with no camera at hand in a work context, solves the same need by **typing, file import or paste**. The Scanner is a capability that only makes sense in the Mobile product — a pure example of why the two products are designed separately (P4).

---

## 10. Offline — funcionar sem rede · Offline — working without network

**PT** — O Mobile assume que a **rede vai falhar** e projeta para isso (P14 — o estado offline é um estado de primeira classe, não uma exceção esquecida). Conteúdo já carregado permanece legível sem sinal; o app comunica com clareza que está offline (um indicador discreto e honesto, nunca um erro assustador); ações feitas offline são aceitas e enfileiradas para sincronizar depois, com feedback de que estão "pendentes". O usuário nunca fica preso numa tela branca porque o sinal caiu. *Regras:* distinguir visualmente "sem rede" de "erro do sistema" (P17); nunca perder o que o usuário digitou por falta de sinal.

**EN** — Mobile assumes the **network will fail** and designs for it (P14 — the offline state is a first-class state, not a forgotten exception). Already-loaded content stays readable without signal; the app clearly communicates it is offline (a discreet, honest indicator, never a scary error); actions taken offline are accepted and queued to sync later, with feedback that they are "pending". The user is never stuck on a blank screen because signal dropped. *Rules:* visually distinguish "no network" from "system error" (P17); never lose what the user typed for lack of signal.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — O Desktop assume conexão majoritariamente estável (rede cabeada/Wi-Fi de escritório); trata queda como erro pontual recuperável, não como condição de projeto permanente. O Mobile trata offline como cenário normal de uso em movimento.
- **EN** — Desktop assumes mostly stable connectivity (wired/office Wi-Fi); it treats a drop as an occasional recoverable error, not a permanent design condition. Mobile treats offline as a normal on-the-go usage scenario.

---

## 11. Sincronização · Synchronization

**PT** — Como consequência do offline, o Mobile precisa de um modelo de **sincronização** explícito e visível: uma **fila** de ações pendentes que sobe quando a rede volta, **feedback de status** (pendente → enviando → sincronizado → falhou) por item, e uma estratégia clara de **resolução de conflito** quando o mesmo dado mudou no servidor e no aparelho. O usuário sempre sabe o que já subiu e o que ainda não. Conflitos não se resolvem em silêncio: o app avisa e, quando necessário, pede a decisão ao usuário em linguagem clara (P11), nunca despejando um diff técnico.

**EN** — As a consequence of offline, Mobile needs an explicit, visible **synchronization** model: a **queue** of pending actions that uploads when the network returns, per-item **status feedback** (pending → sending → synced → failed), and a clear **conflict-resolution** strategy when the same datum changed on the server and on the device. The user always knows what has uploaded and what has not. Conflicts are not resolved silently: the app warns and, when needed, asks the user to decide in clear language (P11), never dumping a technical diff.

**Anti-padrões · Anti-patterns**
- **PT** — Sincronizar em silêncio e sobrescrever o trabalho do usuário; deixar a fila invisível; resolver conflito escondendo que houve conflito; mostrar erro de sincronização como jargão técnico.
- **EN** — Syncing silently and overwriting the user's work; keeping the queue invisible; resolving a conflict while hiding that there was one; showing a sync error as technical jargon.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — No Desktop, a operação é majoritariamente síncrona (salvou → foi); a fila de sincronização offline não é um padrão central. No Mobile, a fila e o status de sincronização são peças de primeira classe da experiência.
- **EN** — On Desktop, operation is mostly synchronous (saved → done); the offline sync queue is not a central pattern. On Mobile, the queue and sync status are first-class experience pieces.

---

## 12. Notificações · Notifications

**PT** — O Mobile fala com o usuário mesmo quando o app está fechado, então precisa de uma disciplina de **notificações**: **push** (fora do app, respeitando permissão e horário, com prioridade honesta — só interrompe o que merece interromper), **in-app** (dentro do app, como toasts e badges de contagem nos destinos da Bottom Navigation), e uma **central de notificações** onde o histórico fica acessível. *Regras:* pedir permissão de push no momento certo, explicando o valor (P11); respeitar a prioridade (não transformar tudo em urgente — a fadiga de alerta destrói a confiança); toda notificação leva a um destino claro no app; o usuário controla o que recebe. Feedback in-app segue o padrão de toast (P12).

**EN** — Mobile talks to the user even when the app is closed, so it needs a **notifications** discipline: **push** (outside the app, honoring permission and timing, with honest priority — interrupting only what deserves it), **in-app** (inside the app, as toasts and count badges on Bottom Navigation destinations), and a **notification center** where history stays accessible. *Rules:* request push permission at the right moment, explaining the value (P11); respect priority (do not make everything urgent — alert fatigue destroys trust); every notification leads to a clear in-app destination; the user controls what they receive. In-app feedback follows the toast pattern (P12).

**Anti-padrões · Anti-patterns**
- **PT** — Pedir permissão de push na primeira tela sem contexto; marcar tudo como urgente; notificação que não leva a lugar nenhum; badge que nunca zera.
- **EN** — Requesting push permission on the first screen with no context; marking everything urgent; a notification that leads nowhere; a badge that never clears.

**Diferença vs Desktop · Difference vs Desktop**
- **PT** — O Desktop notifica dentro da sessão aberta (toasts, badges na TopBar/Sidebar) e, quando muito, via notificação do navegador/SO com o app aberto. O push que alcança o usuário com o app fechado, ligado à zona do polegar e ao uso em movimento, é característico do Mobile.
- **EN** — Desktop notifies within the open session (toasts, badges on the TopBar/Sidebar) and, at most, via browser/OS notification with the app open. Push that reaches the user with the app closed, tied to the thumb zone and on-the-go use, is characteristic of Mobile.

---

## 13. O que distingue o Mobile, em síntese · What sets Mobile apart, in synthesis

**PT** — O Mobile é o produto do **polegar, do foco e da rede ruim**. Ele existe para quem está em movimento, com pouco tempo e uma tarefa por vez: Bottom Navigation enxuta, Top Bar minimalista, Cards no lugar de tabelas, gestos como atalhos (sempre com alternativa), Scanner como entrada nativa, e — o mais decisivo — **offline e sincronização como estados de primeira classe**, não exceções. Nenhuma dessas peças seria natural num Desktop, e é por isso que os dois são projetados do zero, separadamente (P4). Quem lê este documento para construir uma tela mobile deve, antes, passar pela checklist de `context/STUDIO_UX_AI_CONTEXT.md` e citar os princípios por número ao justificar cada escolha — e nunca, jamais, "adaptar a tela do Desktop encolhendo".

**EN** — Mobile is the product of the **thumb, focus and bad network**. It exists for those on the move, with little time and one task at a time: a lean Bottom Navigation, a minimalist Top Bar, Cards instead of tables, gestures as shortcuts (always with an alternative), the Scanner as native input, and — most decisively — **offline and synchronization as first-class states**, not exceptions. None of these pieces would be natural on Desktop, which is why the two are designed from scratch, separately (P4). Whoever reads this document to build a mobile screen should first go through the `context/STUDIO_UX_AI_CONTEXT.md` checklist and cite the principles by number when justifying each choice — and never, ever, "adapt the Desktop screen by shrinking it".

---

*Documento vivo. Atualizar junto com a arquitetura Mobile e os princípios que o governam; toda mudança nas duas línguas na mesma leva. · Living document. Update alongside the Mobile architecture and the principles governing it; every change in both languages in the same commit.*
