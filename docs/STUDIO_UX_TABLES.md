# STUDIO_UX_TABLES.md — Composição de Tabelas de Dados · Data Table Composition

> Documento normativo vivo. Responde a: **como se compõe uma tabela de dados no Studio UX — como ela ordena, filtra, pesquisa, pagina e age em lote; como fica densa sem virar ruído; e por que no Mobile ela deixa de ser tabela?**
> Living normative document. Answers: **how is a data table composed in Studio UX — how it sorts, filters, searches, paginates and acts in bulk; how it stays dense without becoming noise; and why on Mobile it stops being a table?**
> Governança: `STUDIO_UX.md`. Princípios-âncora: P1, P4, P5, P14, P17, P19, P21. Peça central: `components/STUDIO_UX_COMPONENT_LIBRARY.md` (DataTable). Fluxos: `patterns/STUDIO_UX_PATTERNS.md` (§8 Search, §9 Filters, §10 Pagination). Gosto: `STUDIO_UX_VISUAL_DNA.md` §8.

```
Architecture Boundary Check — STUDIO_UX_TABLES
Resolve · Solves:            como COMPOR uma tabela de dados — o arranjo de colunas, a densidade das linhas,
                             a convivência de ordenação/filtro/busca/paginação/seleção, e a decisão-chave de
                             como a mesma coleção vira lista de Cards no Mobile.
                             / how to COMPOSE a data table — column arrangement, row density, the coexistence of
                             sorting/filter/search/pagination/selection, and the key decision of how the same
                             collection becomes a Card list on Mobile.
Não pertence a outro porque · Not elsewhere because:
                             COMPONENT_LIBRARY define o componente DataTable (comportamento, estados) mas não a
                             COMPOSIÇÃO de uma tela de tabela (que colunas priorizar, densidade, convivência);
                             PATTERNS define Search/Filters/Pagination como fluxos, mas não a tabela como composição.
                             Faltava o dono da COMPOSIÇÃO de tabelas.
                             / COMPONENT_LIBRARY defines the DataTable component (behavior, states) but not the
                             COMPOSITION of a table screen; PATTERNS defines Search/Filters/Pagination as flows,
                             but not the table as composition. The owner of table COMPOSITION was missing.
Complementa · Complements:   COMPONENT_LIBRARY, PATTERNS, VISUAL_DNA, GRAMMAR, VISUAL_RHYTHM, LAYOUT_SYSTEM, DESKTOP, MOBILE.
Nunca substitui · Never replaces: COMPONENT_LIBRARY (o componente DataTable e seu comportamento), PATTERNS (os fluxos
                             de busca/filtro/paginação), LAYOUT_SYSTEM (grid/colunas/camadas), TOKENS (valores).
Dono · Owner:                este doc, para o domínio "composição de tabelas de dados".
                             / this doc, for the "data table composition" domain.
```

---

## 1. O que uma tabela resolve · What a table solves

**PT** — A tabela existe para **comparar e operar** muitos registros de uma vez: o valor está em pôr linhas lado a lado sob as mesmas colunas, para o olho varrer, ordenar, filtrar e agir. É a tela mais característica do Desktop (`DESKTOP` §7.2) — o "cavalo de batalha" onde a densidade (P21) e o teclado (P19) mais rendem. Se o dado não se beneficia de comparação por colunas, provavelmente ele não quer uma tabela, e sim uma `List` (itens homogêneos simples) ou `Card`s.

**EN** — The table exists to **compare and operate** on many records at once: the value lies in placing rows side by side under the same columns, for the eye to scan, sort, filter and act. It is the Desktop's most characteristic screen (`DESKTOP` §7.2) — the "workhorse" where density (P21) and the keyboard (P19) pay off most. If the data doesn't benefit from column comparison, it probably doesn't want a table but a `List` (simple homogeneous items) or `Card`s.

**PT** — Este documento é dono da **composição**. O componente `DataTable` — seu comportamento, estados, ordenação, seleção, paginação — é do `COMPONENT_LIBRARY` e **não é reescrito aqui**; nós o referenciamos. Os fluxos de busca, filtro e paginação são do `PATTERNS`. O grid, as camadas (cabeçalho fixo) e as colunas físicas são do `LAYOUT_SYSTEM`. Os valores são dos tokens. Aqui cuidamos de **como a tabela é arranjada e dosada numa tela**, e da decisão Desktop/Mobile.

**EN** — This document owns **composition**. The `DataTable` component — its behavior, states, sorting, selection, pagination — belongs to `COMPONENT_LIBRARY` and is **not rewritten here**; we reference it. Search, filter and pagination flows belong to `PATTERNS`. The grid, layers (pinned header) and physical columns to `LAYOUT_SYSTEM`. Values to the tokens. Here we handle **how the table is arranged and dosed on a screen**, and the Desktop/Mobile decision.

---

## 2. Densidade e a estética da tabela calma · Density and the calm-table aesthetic

**PT** — A régua de gosto está no exemplo do `VISUAL_DNA` §8: uma tabela densa é **legítima quando organizada**, não quando amontoada. Linhas com **altura confortável** (respiro vertical que separa sem desperdiçar), **números alinhados à direita** (para o olho comparar magnitudes e casas decimais alinhadas), **cabeçalho discreto** (rótulos de coluna presentes mas subordinados ao dado — o dado é o protagonista, P1), e **zebra sutil ou nenhuma** — porque o espaço e o alinhamento já separam as linhas. A tabela do Studio UX é uma grade de dados calma, não uma grade de bordas barulhenta.

**EN** — The taste ruler is in the `VISUAL_DNA` §8 example: a dense table is **legitimate when organized**, not when piled up. Rows with **comfortable height** (vertical breathing that separates without wasting), **right-aligned numbers** (so the eye compares magnitudes and aligned decimals), a **discreet header** (column labels present but subordinate to the data — the data is the protagonist, P1), and **subtle or no zebra striping** — because space and alignment already separate the rows. The Studio UX table is a calm data grid, not a noisy grid of borders.

**PT** — O anti-padrão-mor é **emoldurar cada célula**: linhas verticais e horizontais em toda parte transformam a tabela numa gaiola (viola P5 — a borda é o último recurso). Da mesma forma, **cores fortes alternadas** (zebra saturada) e **muitos pesos de fonte** cansam e competem com o dado (P1). Alinhamento por tipo: texto à esquerda, números à direita, datas de forma consistente. Uma **densidade ajustável** (confortável/compacta) pode existir (`DESKTOP` §7.2), mas dentro de cada modo a densidade é uniforme (P21) — nunca uma linha frouxa e outra apertada sem razão.

**EN** — The chief anti-pattern is **framing every cell**: vertical and horizontal lines everywhere turn the table into a cage (violates P5 — the border is the last resort). Likewise, **strong alternating colors** (saturated zebra) and **many font weights** tire and compete with the data (P1). Alignment by type: text left, numbers right, dates consistently. An **adjustable density** (comfortable/compact) may exist (`DESKTOP` §7.2), but within each mode density is uniform (P21) — never one loose row and one tight without reason.

---

## 3. Colunas — o que priorizar e o que congelar · Columns — what to prioritize and freeze

**PT** — A composição de uma tabela começa na **escolha e ordem das colunas**. A régua: as colunas mais importantes para *decidir e comparar* vêm primeiro (à esquerda, onde o olho começa), e as de contexto secundário à direita. A **coluna-chave** — a que identifica o registro (nome do cliente, número do pedido) — é a primeira e, em tabelas largas com rolagem horizontal, é **congelada** (fixa) para o usuário nunca perder de vista *qual* linha está lendo enquanto rola até colunas distantes. A última coluna costuma abrigar as **ações por linha**.

**EN** — A table's composition starts with the **choice and order of columns**. The rule: the columns most important to *decide and compare* come first (left, where the eye starts), and secondary-context ones to the right. The **key column** — the one identifying the record (customer name, order number) — is first and, in wide horizontally-scrolling tables, is **frozen** (pinned) so the user never loses sight of *which* row they're reading while scrolling to distant columns. The last column usually holds the **per-row actions**.

**PT** — Menos colunas, melhor. Uma tabela com trinta colunas raramente é lida — é rolada. Priorize as que respondem à pergunta da tela; ofereça as demais por **colunas configuráveis** (mostrar/ocultar/reordenar/fixar — `DESKTOP` §7.2), para o usuário adaptar sem que o padrão seja o excesso. Nunca esconda a **única ação** de uma linha numa coluna fora da tela à direita (anti-padrão do `COMPONENT_LIBRARY`): a ação que o usuário precisa fica alcançável, não perdida no scroll horizontal.

**EN** — Fewer columns, better. A thirty-column table is rarely read — it's scrolled. Prioritize those that answer the screen's question; offer the rest via **configurable columns** (show/hide/reorder/pin — `DESKTOP` §7.2), so the user adapts without the default being excess. Never hide a row's **sole action** in an off-screen column to the right (a `COMPONENT_LIBRARY` anti-pattern): the action the user needs stays reachable, not lost in horizontal scroll.

**PT — Ações por linha e a abertura do detalhe.** A última coluna abriga as **ações por linha**, e a composição segue a mesma economia do resto: expõem-se as **poucas** ações mais prováveis como `IconButton` (com tooltip e rótulo acessível — P17), e o restante recolhe-se num `Menu` de "mais opções", para a linha não virar uma barra de botões que compete com o dado (P1). As ações revelam-se com contenção no hover da linha (Desktop), mas permanecem sempre alcançáveis por teclado (P19) — nunca dependem só do hover. Ação destrutiva por linha carrega os cinco (P13). A ação mais comum de todas — **abrir o detalhe do registro** — costuma ser a própria linha clicável (ou um `Link` na coluna-chave), levando à tela de detalhe (`DescriptionList`, `Tabs`, `Timeline` — `PATTERNS` §1); a linha não precisa de um botão "abrir" redundante quando ela inteira já é o alvo.

**EN — Row actions and opening the detail.** The last column holds the **per-row actions**, and composition follows the same economy as the rest: expose the **few** most likely actions as `IconButton`s (with tooltip and accessible label — P17), and collapse the rest into a "more" `Menu`, so the row doesn't become a button bar competing with the data (P1). Actions reveal with restraint on row hover (Desktop) but stay always keyboard-reachable (P19) — never hover-only. A destructive row action carries the five (P13). The most common action of all — **opening the record's detail** — is usually the clickable row itself (or a `Link` on the key column), leading to the detail screen (`DescriptionList`, `Tabs`, `Timeline` — `PATTERNS` §1); the row needs no redundant "open" button when the whole row is already the target.

### O teste objetivo da coluna de ações · The objective test for the action column

**PT** — A regra do parágrafo acima estava sendo lida como conselho e violada na prática (lápis "editar" repetido em toda linha). Vira teste **mecânico**:

> **A linha é o alvo.** Antes de colocar QUALQUER botão numa linha, pergunte: *"esse botão leva ao mesmo lugar que clicar na linha levaria?"* Se sim, **ele não existe** — a linha inteira é `onRowClick`, e o botão sai.

Como decidir, em ordem:

1. **A linha tem UM destino natural** (abrir o registro — detalhe, editor, entradas)? → `onRowClick` para lá. **Nenhum** botão na linha. Um texto acima da tabela avisa o caminho ("Clique num orçamento para ajustar limite e alerta") — a afordância é o hover da linha + esse aviso, não um ícone repetido N vezes.
2. **Sobrou ação secundária** que NÃO é "abrir" (sincronizar, duplicar, arquivar, exportar)? → ela vai no `Menu` de "mais opções" da linha **ou** — melhor — desce pra dentro da tela/overlay de destino, onde tem contexto pra ser entendida. Sincronizar um servidor faz mais sentido ao lado do que ele trouxe do que solto numa lista.
3. **A linha NÃO tem destino** (o backend não expõe leitura/edição individual)? → a linha **não é clicável**, e a ação, se houver, é botão explícito. Não invente rota que não existe só pra cumprir a regra.
4. **A linha tem duas decisões concorrentes** (ex.: aprovar × rejeitar)? → **não** são dois botões na linha. Isso é sinal de que falta a tela onde a decisão é tomada com o contexto na frente: a linha abre o detalhe, e as duas ações vivem lá. Decidir com 1 clique cego numa lista é pior que 2 cliques informados.

**Anti-padrão consequente:** `onRowClick` **e** um botão de editar na mesma linha. São dois alvos primários disputando o mesmo clique; o usuário não sabe qual usa, e o botão rouba o clique de quem mirou na linha.

**EN** — The paragraph above was being read as advice and violated in practice (an "edit" pencil repeated on every row). It becomes a **mechanical** test:

> **The row is the target.** Before putting ANY button on a row, ask: *"does this button lead where clicking the row would lead?"* If yes, **it does not exist** — the whole row is `onRowClick`, and the button goes away.

How to decide, in order:

1. **Does the row have ONE natural destination** (open the record — detail, editor, entries)? → `onRowClick` there. **No** button on the row. A line of text above the table states the path ("Click a budget to adjust its limit and alert") — the affordance is the row hover plus that hint, not an icon repeated N times.
2. **Any secondary action left** that is NOT "open" (sync, duplicate, archive, export)? → it goes in the row's "more" `Menu` **or** — better — moves into the destination screen/overlay, where it has context to be understood. Syncing a server makes more sense next to what it brought back than loose in a list.
3. **Does the row have no destination** (the backend exposes no single-record read/edit)? → the row is **not** clickable, and the action, if any, is an explicit button. Do not invent a route that does not exist just to satisfy the rule.
4. **Does the row carry two competing decisions** (e.g. approve × reject)? → those are **not** two row buttons. That is a sign the decision screen is missing: the row opens the detail, and both actions live there. Deciding with one blind click in a list is worse than two informed clicks.

**Resulting anti-pattern:** `onRowClick` **and** an edit button on the same row. Two primary targets fighting for the same click; the user cannot tell which to use, and the button steals the click from whoever aimed at the row.

---

## 4. Ordenação · Sorting

**PT** — A ordenação é do componente `DataTable` (comportamento: `COMPONENT_LIBRARY`); aqui, a composição. Ordena-se clicando no **cabeçalho da coluna**, com a direção sinalizada por **ícone + estado** e não só por cor (P17 — uma seta para cima/baixo, além do realce). Uma coluna ordenada por vez é o padrão previsível; ordenação multi-nível é recurso avançado, não o comportamento base. Nem toda coluna precisa ser ordenável — colunas de ação ou de texto livre longo não ganham nada com isso. A ordenação é anunciada a leitores (`aria-sort`).

**EN** — Sorting belongs to the `DataTable` component (behavior: `COMPONENT_LIBRARY`); here, the composition. You sort by clicking the **column header**, with direction signaled by **icon + state**, not color alone (P17 — an up/down arrow, plus the highlight). One sorted column at a time is the predictable default; multi-level sorting is an advanced feature, not the base behavior. Not every column needs to be sortable — action columns or long free-text ones gain nothing from it. Sorting is announced to readers (`aria-sort`).

---

## 5. Pesquisa e filtros · Search and filters

**PT** — Busca e filtros são fluxos do `PATTERNS` (§8 Search, §9 Filters); a tabela é onde eles pousam. A **pesquisa** filtra a coleção ao digitar (com pequeno debounce), mostrando estado de loading e, sem resultado, um **`EmptyState` de busca** ("Nenhum resultado para '…'") distinto do vazio de primeira visita. Os **filtros** (`Select`, `Combobox`, `DatePicker`, `SegmentedControl`) refinam por critério; os filtros aplicados aparecem como **chips (`Tag`) removíveis** acima da tabela, para o usuário nunca esquecer que a lista está filtrada, e há um "limpar filtros".

**EN** — Search and filters are `PATTERNS` flows (§8 Search, §9 Filters); the table is where they land. **Search** filters the collection as you type (with a small debounce), showing a loading state and, with no result, a **search `EmptyState`** ("No results for '…'") distinct from the first-visit empty. **Filters** (`Select`, `Combobox`, `DatePicker`, `SegmentedControl`) refine by criteria; applied filters appear as **removable chips (`Tag`)** above the table, so the user never forgets the list is filtered, and there's a "clear filters".

**PT** — Regra herdada do IA Studio: as **opções de filtro vêm filtradas da fonte** — o operador só vê o que dá para escolher, nunca uma opção que retorna vazio. E o anti-erro-silencioso vale aqui em cheio: um filtro que trunca ou um `IN` grande que volta vazio calado é o bug clássico da tabela — parece que "não há dados" quando na verdade a consulta falhou. Valide contra dado real; um número "plausível" de resultados não é presunção de que é o certo.

**EN** — Rule inherited from IA Studio: **filter options come filtered from the source** — the operator only sees choosable ones, never an option that returns empty. And the anti-silent-error rule fully applies: a filter that truncates or a large `IN` returning empty silently is the classic table bug — it looks like "no data" when the query actually failed. Validate against real data; a "plausible" result count is no presumption of correctness.

---

## 6. Paginação e virtualização · Pagination and virtualization

**PT** — Para **dados operacionais**, o Studio UX prefere **paginação** a scroll infinito (fluxo: `PATTERNS` §10) — previsibilidade, contagem e endereçabilidade. A `Pagination` mostra a página atual e o **total real** (nunca escondido — anti-erro-silencioso), com tamanho de página escolhível; trocar de página mostra loading no conteúdo enquanto o shell fica estável. Um `rp`/limite que trunca sem avisar é erro silencioso: o usuário acha que viu tudo.

**EN** — For **operational data**, Studio UX prefers **pagination** over infinite scroll (flow: `PATTERNS` §10) — predictability, count and addressability. `Pagination` shows the current page and the **real total** (never hidden — anti-silent-error), with a choosable page size; changing page shows loading in the content while the shell stays stable. A limit/`rp` truncating silently is a silent error: the user thinks they saw everything.

**PT** — A **virtualização** é um princípio de composição para volumes muito grandes: renderizar só as linhas visíveis para a tabela não travar com milhares de registros. É referida aqui como *princípio* — a implementação é de fase futura (`STUDIO_UX.md` §0), não deste documento. Paginação e virtualização resolvem problemas diferentes (percorrer páginas endereçáveis vs. rolar um conjunto imenso fluidamente) e não se misturam numa mesma tela sem intenção clara.

**EN** — **Virtualization** is a composition principle for very large volumes: render only visible rows so the table doesn't choke on thousands of records. It is referenced here as a *principle* — the implementation is a future phase (`STUDIO_UX.md` §0), not this document's. Pagination and virtualization solve different problems (traversing addressable pages vs. fluidly scrolling a huge set) and don't mix on one screen without clear intent.

---

## 7. Seleção e ações em lote · Selection and bulk actions

**PT** — A tabela permite **seleção** de linha única e múltipla. Ao selecionar, aparece uma **barra de ações em lote** com um **contador** ("3 selecionados") e as ações aplicáveis ao conjunto (exportar, arquivar, mudar status). A barra surge só quando há seleção e some quando se limpa — não ocupa espaço à toa. As ações em lote **destrutivas** carregam os cinco cuidados (P13, `PATTERNS` §4): confirmação, aviso, tooltip, loading e gate de permissão — porque um erro em lote afeta muitos registros de uma vez. A seleção é operável por teclado (espaço seleciona a linha em foco — `DESKTOP` §7.2).

**EN** — The table allows **single and multiple** row selection. On selection, a **bulk-action bar** appears with a **counter** ("3 selected") and the actions applicable to the set (export, archive, change status). The bar surfaces only when there's a selection and disappears when cleared — it doesn't waste space. **Destructive** bulk actions carry the five safeguards (P13, `PATTERNS` §4): confirmation, disclaimer, tooltip, loading and permission gate — because a bulk mistake affects many records at once. Selection is keyboard-operable (space selects the focused row — `DESKTOP` §7.2).

**PT** — Permissão molda a seleção (P23): quem não pode executar uma ação em lote não a vê habilitada. No Mobile, a seleção em massa é **rara e cuidadosa** (`MOBILE` §6) — o dedo erra mais que o mouse, então ações em lote no Mobile pedem passos mais deliberados.

**EN** — Permission shapes selection (P23): those who can't run a bulk action don't see it enabled. On Mobile, bulk selection is **rare and careful** (`MOBILE` §6) — the finger errs more than the mouse, so Mobile bulk actions call for more deliberate steps.

---

## 8. Exportação · Export

**PT** — Exportar é um fluxo de download (`PATTERNS` §3): um `Button`/`IconButton` dispara; se demora, dá feedback de progresso (P16 — nunca um botão "mudo"); ao concluir, um toast diz o que foi gerado. Declara-se **formato e escopo** (a página atual? o filtro aplicado? tudo?) para o usuário não exportar o conjunto errado. Exportar **dado sensível respeita permissão** (P23) — não há export sem gate. O escopo do que sai bate com o que a tabela mostra: se há filtro ativo, o export honra o filtro (ou pergunta), nunca despeja tudo silenciosamente quando o usuário via um recorte.

**EN** — Exporting is a download flow (`PATTERNS` §3): a `Button`/`IconButton` triggers; if slow, it gives progress feedback (P16 — never a "mute" button); on completion, a toast names what was generated. It declares **format and scope** (the current page? the applied filter? everything?) so the user doesn't export the wrong set. Exporting **sensitive data respects permission** (P23) — no export without a gate. The scope of what leaves matches what the table shows: with an active filter, export honors the filter (or asks), never silently dumping everything when the user saw a slice.

---

## 9. Estados da tabela · Table states

**PT** — Todo estado é projetado (P14) — uma tabela sem estado vazio e sem estado de erro não está pronta:

- **Carregando** — **`Skeleton` em forma de linhas** (dono: `COMPONENT_LIBRARY`), imitando a estrutura da tabela para reduzir o salto de layout; não um spinner solto no meio do nada.
- **Vazio** — **`EmptyState`** que distingue "vazio porque é novo" ("Você ainda não tem clientes" + "Criar o primeiro") de "vazio porque o filtro não achou" ("Nenhum resultado para esses filtros" + "limpar"). Nunca uma tabela em branco ambígua.
- **Erro** — estado de erro **na área da tabela** com uma ação de "tentar de novo"; o shell nunca some. Falha ao carregar não vira fallback silencioso.
- **Populada** — o estado normal, com hover/seleção de linha, ordenação e paginação ativos.
- **Muitos dados** — paginação/virtualização; a contagem real sempre visível.

**EN** — Every state is designed (P14) — a table with no empty and no error state is not done:

- **Loading** — a **`Skeleton` shaped as rows** (owner: `COMPONENT_LIBRARY`), mimicking the table structure to reduce layout jump; not a lone spinner in a void.
- **Empty** — an **`EmptyState`** distinguishing "empty because new" ("You don't have customers yet" + "Create the first") from "empty because the filter found nothing" ("No results for these filters" + "clear"). Never an ambiguous blank table.
- **Error** — an error state **in the table area** with a "try again" action; the shell never disappears. A load failure doesn't become a silent fallback.
- **Populated** — the normal state, with row hover/selection, sorting and pagination active.
- **Many-data** — pagination/virtualization; the real count always visible.

---

## 10. Desktop vs Mobile — a decisão-chave · Desktop vs Mobile — the key decision

**PT** — Esta é a decisão mais importante do documento, e uma aplicação pura do P4: **no Desktop existe tabela; no Mobile, não.** No **Desktop**, a `DataTable` é densa e completa — muitas colunas, ordenação, filtros inline, seleção em massa, paginação, ações por linha, tudo operável por teclado (`DESKTOP` §7.2). A largura e o mouse tornam a comparação por colunas natural e poderosa.

**EN** — This is the document's most important decision, and a pure application of P4: **on Desktop a table exists; on Mobile it does not.** On **Desktop**, the `DataTable` is dense and complete — many columns, sorting, inline filters, bulk selection, pagination, per-row actions, all keyboard-operable (`DESKTOP` §7.2). Width and the mouse make column comparison natural and powerful.

**PT** — No **Mobile**, a mesma coleção **vira uma lista de `Card`s** rolável (`MOBILE` §4, §6; `COMPONENT_LIBRARY` DataTable "Vs Mobile"): um registro por Card, mostrando **os poucos campos que importam** naquele contexto — não trinta colunas espremidas. Busca e filtros vão para um **bottom sheet**; a ação primária de cada item fica à mão; ações secundárias podem morar num swipe ou long-press, **sempre com alternativa visível** (`MOBILE` §5). Tocar no Card abre o detalhe (empilha uma tela).

**EN** — On **Mobile**, the same collection **becomes a scrollable list of `Card`s** (`MOBILE` §4, §6; `COMPONENT_LIBRARY` DataTable "Vs Mobile"): one record per Card, showing **the few fields that matter** in that context — not thirty squeezed columns. Search and filters go to a **bottom sheet**; each item's primary action stays at hand; secondary actions may live in a swipe or long-press, **always with a visible alternative** (`MOBILE` §5). Tapping the Card opens the detail (stacks a screen).

**PT — A regra que não se negocia:** **converter tabela em Cards não é encolher a tabela — é reprojetar o que se mostra** (`MOBILE` §4). Escolhe-se, para o contexto mobile, quais campos entram no Card; o resto vive no detalhe. Portar a `DataTable` para o Mobile "encolhendo colunas" — a tabela larga com scroll horizontal, ilegível e intocável em 375px — é **violação de P4** e um dos anti-padrões mais graves do sistema.

**EN — The non-negotiable rule:** **turning a table into Cards is not shrinking the table — it is redesigning what is shown** (`MOBILE` §4). One chooses, for the mobile context, which fields enter the Card; the rest lives in the detail. Porting the `DataTable` to Mobile by "shrinking columns" — the wide horizontally-scrolling table, illegible and untouchable at 375px — is a **P4 violation** and one of the system's gravest anti-patterns.

---

## 11. Anti-padrões · Anti-patterns

**PT / EN**

- **Borda em toda célula** — a tabela vira gaiola (viola P5). / **Border on every cell** — the table becomes a cage.
- **Cores fortes alternadas** — zebra saturada que cansa e compete com o dado (P1). / **Strong alternating colors** — saturated zebra that tires and competes with data.
- **Muitos pesos de fonte** — grade barulhenta (`VISUAL_DNA` §8). / **Many font weights** — a noisy grid.
- **Tabela horizontal com scroll no Mobile** — a tabela larga espremida em 375px (viola P4). / **Horizontal scrolling table on Mobile** — the wide table squeezed at 375px.
- **Números não alinhados à direita** — comparação de magnitude prejudicada. / **Numbers not right-aligned** — magnitude comparison hurt.
- **Ação única escondida fora da tela** — a única ação de linha numa coluna à direita perdida no scroll. / **Sole action hidden off-screen** — a row's only action lost in horizontal scroll.
- **Paginação sem total / limite que trunca calado** — o usuário acha que viu tudo (erro silencioso). / **Pagination with no total / a silently truncating limit** — the user thinks they saw everything.
- **Filtro que retorna vazio como opção** — deveria vir filtrado da fonte; `IN` grande que volta vazio calado (erro silencioso). / **A filter option that returns empty** — should come filtered from source; a large `IN` returning empty silently.
- **Sem estado vazio ou de erro** — a tabela não está pronta (P14). / **No empty or error state** — the table isn't done.
- **Vazio de busca confundido com vazio inicial** — mensagens trocadas confundem o usuário. / **Search-empty confused with initial-empty**.
- **Ação em lote destrutiva sem os cinco** — um erro em lote afeta muitos registros (viola P13). / **A destructive bulk action without the five** — a bulk mistake affects many records.
- **Cabeçalho gritante** — a coluna competindo com o dado (viola P1). / **A loud header** — the column competing with the data.

---

*Documento vivo. Descreve a composição de tabelas que existe hoje; referencia o componente DataTable (dono: COMPONENT_LIBRARY) e os fluxos (PATTERNS) sem reescrevê-los, e nunca redefine grid, camada ou valor. Toda mudança nas duas línguas na mesma leva. · Living document. Describes today's table composition; it references the DataTable component and the flows without rewriting them, and never redefines grid, layer or value. Every change in both languages in the same commit.*
