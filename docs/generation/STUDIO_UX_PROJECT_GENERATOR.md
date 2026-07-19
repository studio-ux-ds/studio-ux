# STUDIO_UX_PROJECT_GENERATOR.md — Gerador de Projetos · Project Generator

> Documento normativo vivo. Responde a: **como um projeto novo NASCE já conforme ao Studio UX — em vez de ser remendado depois para caber na família?**
> Living normative document. Answers: **how is a new project BORN already compliant with Studio UX — instead of being patched afterward to fit the family?**
> Governança: `STUDIO_UX.md` (SSOT §11, Boundary Check §12, tech-agnóstico §13), `governance/STUDIO_UX_CONSTITUTION.md`, `platform/STUDIO_UX_RUNTIME.md`.

```
Architecture Boundary Check — STUDIO_UX_PROJECT_GENERATOR
Resolve · Solves:            o NASCIMENTO conforme de um projeto — o mecanismo oficial que produz um
                             ponto de partida já dentro da família (produto, arquétipo, versão declarada,
                             estrutura pronta), para que a conformidade seja o estado inicial, não um remendo.
                             / the compliant BIRTH of a project — the official mechanism that produces a
                             starting point already inside the family (product, archetype, declared version,
                             ready structure), so compliance is the initial state, not a later patch.
Não pertence a outro porque · Not elsewhere because:
                             RUNTIME define as CAMADAS (Templates/Applications) mas não como um projeto nasce;
                             PACKAGES é o layout do monorepo do próprio framework, não do projeto consumidor;
                             EXPORTERS produz artefatos de tokens, não projetos; TEMPLATES é o dono dos MOLDES
                             de tela. Faltava o dono do ato de GERAR um projeto conforme.
                             / RUNTIME defines the LAYERS (Templates/Applications) but not how a project is born;
                             PACKAGES is the framework's own monorepo layout, not the consumer project's;
                             EXPORTERS produces token artifacts, not projects; TEMPLATES owns the screen MOLDS.
                             The missing owner is the act of GENERATING a compliant project.
Complementa · Complements:   RUNTIME (camadas Templates/Applications), EXPORTERS, PACKAGES, VERSIONING,
                             tools/CLI (Épico 2), generation/TEMPLATES, CERTIFICATION.
Nunca substitui · Never replaces: RUNTIME (camadas de execução), generation/TEMPLATES (moldes de tela),
                             tools/CLI (a interface de comando), nem VERSIONING (a mecânica de versão).
Dono · Owner:                este doc, para o domínio "geração de projetos".
                             / this doc, for the "project generation" domain.
```

---

## Objetivo · Objective
**PT** — Definir o gerador oficial do Studio UX: o mecanismo que faz um projeto **nascer já conforme**, em vez de nascer vazio e ser remendado depois para caber na família. Ele resolve o problema mais caro do começo de um sistema — a divergência que se instala na primeira tela e nunca mais sai. O gerador entrega uma estrutura que já usa os componentes, tokens e a gramática oficiais, já declara a versão do Studio UX que consome (Art. 14) e já separa produto de conteúdo (Art. 19). Conformidade passa a ser o **estado inicial**, não uma auditoria posterior.
**EN** — Define the official Studio UX generator: the mechanism that makes a project **born already compliant**, instead of born empty and patched later to fit the family. It solves the most expensive problem at a system's start — the divergence that settles into the first screen and never leaves. The generator delivers a structure that already uses the official components, tokens and grammar, already declares the Studio UX version it consumes (Art. 14) and already separates product from content (Art. 19). Compliance becomes the **initial state**, not a later audit.

## Escopo · Scope
**PT** — O fluxo de nascimento de um projeto e o catálogo de **arquétipos** (pontos de partida conformes). **Não** define a interface de comando (é `tools/CLI`), nem os moldes de tela (é `generation/TEMPLATES`), nem como os tokens saem para uma tecnologia (é `EXPORTERS`), nem a mecânica de versão (é `VERSIONING`). Aqui se responde apenas *como um projeto começa dentro da família*.
**EN** — The birth flow of a project and the catalog of **archetypes** (compliant starting points). It does **not** define the command interface (that's `tools/CLI`), the screen molds (`generation/TEMPLATES`), how tokens are exported to a technology (`EXPORTERS`) or the version mechanics (`VERSIONING`). It answers only *how a project begins inside the family*.

---

## 1. O fluxo de nascimento · The birth flow
**PT** — Um projeto nasce por um roteiro fixo, decidido antes de qualquer código:

1. **Escolher o produto — Desktop OU Mobile.** É a primeira e mais irreversível decisão (Art. 2, P4). Ela define o shell, a navegação, o ritmo e a ênfase de acessibilidade. Um projeto é de um produto; se precisa dos dois, são **dois projetos irmãos** que compartilham identidade, nunca um responsivo. Misturar os dois no nascimento é violação estrutural.
2. **Escolher o arquétipo.** Sobre o produto escolhido, seleciona-se um ponto de partida conforme (§2) — Portal, CRM, ERP, Analytics etc. O arquétipo define a *forma* típica daquele tipo de sistema (regiões, navegação, telas-molde), nunca o *conteúdo* de negócio.
3. **Declarar a dependência de versão.** O projeto **declara** a versão do Studio UX que consome (ex.: `Studio UX Desktop v1.x`) — não copia o framework para dentro (Art. 1, Art. 14). Atualizações MAJOR são adotadas deliberadamente com o guia de migração (`VERSIONING`).
4. **Receber a estrutura pronta.** O gerador materializa a estrutura conforme: pastas organizadas, a dependência do Runtime declarada, os moldes de tela do arquétipo instanciados a partir de `generation/TEMPLATES`, e os pontos de conteúdo claramente vazios, à espera do dado de negócio (Art. 19).

**EN** — A project is born by a fixed script, decided before any code: (1) **choose the product — Desktop OR Mobile** — the first, most irreversible decision (Art. 2, P4); it fixes shell, navigation, rhythm and accessibility emphasis; a project is of one product — if it needs both, they are **two sibling projects** sharing identity, never one responsive one; (2) **choose the archetype** — over the chosen product, a compliant starting point (§2); the archetype defines the typical *shape* of that kind of system, never business *content*; (3) **declare the version dependency** — the project **declares** the Studio UX version it consumes, it does not copy the framework inside (Art. 1, Art. 14); (4) **receive the ready structure** — the generator materializes the compliant structure: organized folders, the Runtime dependency declared, the archetype's screen molds instantiated from `generation/TEMPLATES`, and content points clearly empty, awaiting business data (Art. 19).

## 2. Os arquétipos · The archetypes
**PT** — Um **arquétipo** é um ponto de partida conforme para uma *classe* de sistema. Ele fornece a forma (regiões, navegação, telas-molde, estados obrigatórios) já montada com componentes, tokens e gramática oficiais. Ele **não** é um fork do framework nem traz dado de negócio: é uma composição pré-arranjada que a Application depois preenche. Todo arquétipo escolhe uma base — Desktop **ou** Mobile — e herda dela.

**EN** — An **archetype** is a compliant starting point for a *class* of system. It provides the shape (regions, navigation, screen molds, mandatory states) already assembled from official components, tokens and grammar. It is **not** a fork of the framework and carries no business data: it is a pre-arranged composition the Application later fills. Every archetype picks a base — Desktop **or** Mobile — and inherits from it.

### 2.1 Arquétipos de base · Base archetypes
**PT**
- **Desktop** — o shell de produtividade nu: região de navegação lateral, cabeçalho, área principal densa e organizada por ritmo. Já vem com os estados globais (vazio, carregando, erro via toast) e a régua de densidade Desktop. Base de todos os arquétipos de produtividade. Dependências: produto Desktop + componentes + tokens.
- **Mobile** — o shell nativo nu: navegação por abas/pilha, alvos de toque ≥44px, ritmo espaçoso. Já vem com os estados globais e a régua de toque Mobile. Base de todos os arquétipos móveis. Dependências: produto Mobile + componentes + tokens.

**EN**
- **Desktop** — the bare productivity shell: lateral navigation region, header, dense main area organized by rhythm. Ships with global states (empty, loading, error via toast) and the Desktop density ruler. Base of every productivity archetype. Depends on: Desktop product + components + tokens.
- **Mobile** — the bare native shell: tab/stack navigation, ≥44px touch targets, spacious rhythm. Ships with global states and the Mobile touch ruler. Base of every mobile archetype. Depends on: Mobile product + components + tokens.

### 2.2 Arquétipos de domínio · Domain archetypes
**PT** — Cada um herda de uma base (Desktop, salvo indicação) e arranja a forma típica da sua classe — sem nenhuma regra de negócio.

- **Portal** — porta de entrada informativa/autoatendimento: navegação enxuta, telas de conteúdo, login e busca. Já vem: shell de portal, padrão de busca e de login (`PATTERNS`), estados vazios. Propósito: informar e encaminhar.
- **CRM** — gestão de relacionamento: forma de lista+detalhe (registros, timeline de interações), navegação por entidades. Já vem: molde de lista com tabela (`TABLES`), molde de detalhe, padrão de filtros e de CRUD. Propósito: acompanhar pessoas e negociações.
- **ERP** — operação densa e transacional: muitas entidades, formulários longos, tabelas densas. Já vem: shell de módulos, moldes de formulário (`FORMS`) e de tabela densa, navegação profunda. Propósito: registrar e processar operação.
- **Analytics** — leitura de indicadores: forma de dashboard, filtros globais, grades de cartões e gráficos. Já vem: molde de dashboard (`DASHBOARD`), cartões de KPI, padrão de filtro de período. Propósito: ler o estado do negócio, nunca decorar.
- **IA Studio** — orquestração de assistentes/automação: forma de editor/canvas + inspetor + listas de configuração, sempre na *língua do usuário* (P11). Já vem: shell de editor, padrão de wizard e de configuração. Propósito: configurar comportamento sem expor jargão técnico.
- **Portal do Cliente · Customer Portal** — autoatendimento do cliente final: forma enxuta e acolhedora, poucas ações por tela, foco em faturas/pedidos/status. Base tende a Mobile ou Desktop conforme o público. Já vem: shell de autoatendimento, padrão de status e de ação única. Propósito: resolver a necessidade do cliente com o mínimo de fricção.
- **Marketplace** — catálogo com muitos atores: forma de vitrine + busca + detalhe + fluxo de escolha. Já vem: molde de listagem/busca, molde de detalhe, padrão de comparação. Propósito: encontrar e escolher entre muitos itens.
- **Backoffice** — administração interna: forma densa de gestão (tabelas, permissões, auditoria visível). Já vem: shell administrativo, moldes de tabela e formulário, ênfase em permissão (P23) e estados de auditoria. Propósito: operar os bastidores com controle e rastro.

**EN** — Each inherits from a base (Desktop unless noted) and arranges its class's typical shape — with zero business rules.
- **Portal** — informational/self-service entry point: lean navigation, content screens, login and search. Ships: portal shell, search and login patterns (`PATTERNS`), empty states. Purpose: inform and route.
- **CRM** — relationship management: list+detail shape (records, interaction timeline), entity navigation. Ships: list mold with table (`TABLES`), detail mold, filter and CRUD patterns. Purpose: track people and deals.
- **ERP** — dense, transactional operation: many entities, long forms, dense tables. Ships: module shell, form (`FORMS`) and dense-table molds, deep navigation. Purpose: record and process operations.
- **Analytics** — indicator reading: dashboard shape, global filters, grids of cards and charts. Ships: dashboard mold (`DASHBOARD`), KPI cards, period-filter pattern. Purpose: read the business state, never decorate.
- **IA Studio** — assistant/automation orchestration: editor/canvas + inspector + config-list shape, always in the *user's language* (P11). Ships: editor shell, wizard and configuration patterns. Purpose: configure behavior without exposing technical jargon.
- **Customer Portal** — end-customer self-service: lean, welcoming shape, few actions per screen, focus on invoices/orders/status. Base tends to Mobile or Desktop per audience. Ships: self-service shell, status and single-action patterns. Purpose: solve the customer's need with minimal friction.
- **Marketplace** — catalog with many actors: storefront + search + detail + choice-flow shape. Ships: listing/search mold, detail mold, comparison pattern. Purpose: find and choose among many items.
- **Backoffice** — internal administration: dense management shape (tables, permissions, visible audit). Ships: admin shell, table and form molds, permission emphasis (P23) and audit states. Purpose: run the back office with control and a trail.

## 3. Arquétipo é ponto de partida, não fork · An archetype is a starting point, not a fork
**PT** — A regra que sustenta todos os arquétipos: eles são **derivados** (camada Templates do `RUNTIME`), nunca cópias editáveis do framework. Um arquétipo *aplica* componentes, tokens e gramática oficiais; não os redefine nem os recria. Por isso um projeto gerado permanece na família ao longo dos anos: quando o Studio UX evolui (nova versão), o projeto adota a evolução pela **dependência declarada** (Art. 14), não por um "merge" de um fork que já divergiu. Recriar fundamentos dentro do projeto (redefinir tokens, refazer componentes, copiar a gramática) transforma o arquétipo em fork — e o fork é a morte da conformidade.
**EN** — The rule that underpins every archetype: they are **derived** (the `RUNTIME` Templates layer), never editable copies of the framework. An archetype *applies* official components, tokens and grammar; it does not redefine or recreate them. That is why a generated project stays in the family over the years: when Studio UX evolves (a new version), the project adopts the evolution through the **declared dependency** (Art. 14), not through a "merge" of a fork that has already diverged. Recreating fundamentals inside the project (redefining tokens, rebuilding components, copying the grammar) turns the archetype into a fork — and the fork is the death of compliance.

## 4. Relação com CLI, Templates e Runtime · Relation to CLI, Templates and Runtime
**PT** — O gerador é o *motor*; ele é acionado, mas não é, a interface. **CLI (`tools/CLI`, Épico 2)** é a porta: um comando como `studio create` aciona este gerador e conduz o roteiro do §1 (produto → arquétipo → versão → estrutura). **Templates (`generation/TEMPLATES`)** é o estoque de moldes de tela que o arquétipo instancia — o gerador compõe arquétipos a partir de templates, não inventa telas. **Runtime (`RUNTIME`)** é a camada que o projeto gerado consome: o arquétipo produz uma **Application** na acepção do `RUNTIME` §1.5, que consome o Runtime e declara a versão. O gerador nunca produz o Runtime (isso é dos `EXPORTERS`) — ele produz o *projeto* que o consome.
**EN** — The generator is the *engine*; it is triggered, but is not, the interface. **CLI (`tools/CLI`, Epic 2)** is the door: a command like `studio create` triggers this generator and runs the §1 script (product → archetype → version → structure). **Templates (`generation/TEMPLATES`)** is the stock of screen molds the archetype instantiates — the generator composes archetypes from templates, it does not invent screens. **Runtime (`RUNTIME`)** is the layer the generated project consumes: the archetype produces an **Application** in the `RUNTIME` §1.5 sense, which consumes the Runtime and declares the version. The generator never produces the Runtime (that belongs to `EXPORTERS`) — it produces the *project* that consumes it.

## Responsabilidades · Responsibilities
**PT** — Definir o roteiro de nascimento (§1); manter o catálogo de arquétipos com propósito, forma, o que já vem configurado e dependências (§2); garantir que todo arquétipo seja derivado e conforme, nunca fork (§3); situar a relação com CLI, Templates e Runtime (§4).
**EN** — Define the birth script (§1); maintain the archetype catalog with purpose, shape, what ships configured and dependencies (§2); ensure every archetype is derived and compliant, never a fork (§3); situate the relation to CLI, Templates and Runtime (§4).

## Não-responsabilidades · Non-responsibilities
**PT** — Não define a interface de comando (`tools/CLI`), os moldes de tela em detalhe (`generation/TEMPLATES`), a exportação de tokens (`EXPORTERS`), as camadas de execução (`RUNTIME`), o layout físico do framework (`PACKAGES`) nem valores estéticos (Fase 2). Não é dono de dado de negócio (Art. 19).
**EN** — Does not define the command interface (`tools/CLI`), the screen molds in detail (`generation/TEMPLATES`), token export (`EXPORTERS`), the execution layers (`RUNTIME`), the framework's physical layout (`PACKAGES`) or aesthetic values (Phase 2). It never owns business data (Art. 19).

## Integrações e dependências · Integrations and dependencies
**PT** — Consome `generation/TEMPLATES` (moldes), materializa Applications que consomem o Runtime (`RUNTIME`), é acionado pelo `tools/CLI` e respeita `VERSIONING` na declaração de dependência. A conformidade do que ele produz é medível pela `CERTIFICATION` (o projeto gerado nasce apto a certificar).
**EN** — Consumes `generation/TEMPLATES` (molds), materializes Applications that consume the Runtime (`RUNTIME`), is triggered by `tools/CLI` and respects `VERSIONING` in the dependency declaration. What it produces is measurable by `CERTIFICATION` (a generated project is born ready to certify).

## Fluxos · Flows
**PT** — Fluxo de nascimento (§1): produto → arquétipo → versão declarada → estrutura pronta. Fluxo de evolução: Studio UX muda por SemVer → o projeto adota a nova versão pela dependência declarada, nunca por merge de fork (§3, `VERSIONING`). Fluxo de acionamento: `studio create` (CLI) → gerador → arquétipo composto de templates → Application (§4).
**EN** — Birth flow (§1): product → archetype → declared version → ready structure. Evolution flow: Studio UX changes via SemVer → the project adopts the new version through the declared dependency, never through a fork merge (§3, `VERSIONING`). Trigger flow: `studio create` (CLI) → generator → archetype composed of templates → Application (§4).

## Boas práticas · Best practices
**PT** — Escolha o produto (Desktop OU Mobile) antes de tudo. Prefira o arquétipo mais próximo da classe do sistema e preencha com conteúdo — não recrie fundamentos. Declare a versão do Studio UX e a atualize deliberadamente. Trate o arquétipo como ponto de partida vivo: o que nele vira regra promove-se à Specification, não se guarda como fork. Rode a `CERTIFICATION` logo no nascimento para confirmar a conformidade de partida.
**EN** — Choose the product (Desktop OR Mobile) first. Prefer the archetype closest to the system's class and fill it with content — do not recreate fundamentals. Declare the Studio UX version and update it deliberately. Treat the archetype as a living starting point: whatever becomes a rule is promoted to the Specification, not kept as a fork. Run `CERTIFICATION` right at birth to confirm the starting compliance.

## Anti-padrões · Anti-patterns
**PT / EN**
- Arquétipo que vira fork editável do framework em vez de dependência declarada. / An archetype that becomes an editable fork of the framework instead of a declared dependency.
- Gerar código que recria fundamentos (tokens, componentes, gramática) em vez de declarar dependência do Runtime. / Generating code that recreates fundamentals instead of declaring a Runtime dependency.
- Misturar Desktop e Mobile num mesmo projeto (Art. 2, P4). / Mixing Desktop and Mobile in one project.
- Colocar dado ou regra de negócio dentro do arquétipo (Art. 19). / Putting business data or rules inside the archetype.
- Duplicar aqui os moldes de tela (donos: `generation/TEMPLATES`) ou a mecânica de versão (`VERSIONING`). / Duplicating here the screen molds or the version mechanics.
- Projeto que "trava" numa versão e nunca adota a evolução, deixando a família divergir. / A project that "freezes" on a version and never adopts evolution, letting the family diverge.

## Roadmap
**PT** — Especificado na era de documentação; o gerador e os arquétipos são construídos no Épico 4 (Geração), sempre derivando da Specification e compondo `generation/TEMPLATES`. Arquétipos novos entram aqui quando uma classe de sistema genuinamente nova surgir (regra §3.8) — nunca por conveniência de um segmento.
**EN** — Specified in the documentation era; the generator and archetypes are built in Epic 4 (Generation), always deriving from the Specification and composing `generation/TEMPLATES`. New archetypes enter here when a genuinely new system class emerges (rule §3.8) — never for a vertical's convenience.

## Estado da implementação · Implementation state

**PT** — Materializado em `tools/generator/generate.mjs` (v1.1.8), acionado por `studio create` (CLI). Executa o roteiro do §1: valida **produto** (desktop XOR mobile — recusa mistura, Art. 2/P4), valida o **arquétipo** e sua base, **declara** a versão com `~` (anda no trem; salto de linha é deliberado, VERSIONING §2) e materializa `studio-ux.json` + `package.json` (deps declaradas, `.npmrc` do GitHub Packages) + `index.html` (shell real com classes oficiais `.su-*`/`.su-m-*`, consumindo o CSS de `node_modules` — não copia) + `src/screens/<rota>.md` (pontos de conteúdo vazios, Art. 19). Os **9 arquétipos** do §2 estão no catálogo. **Fronteira honesta:** os moldes de tela são do `generation/TEMPLATES` (ainda não é um pacote separado); o gerador **cita** o molde de cada tela em vez de duplicá-lo — o miolo nasce vazio, à espera do dado e do molde. `studio generate` (inserir uma peça num projeto existente) espera esse dono e, por ora, avisa que não foi construído (Art. 21).
**EN** — Materialized in `tools/generator/generate.mjs` (v1.1.8), triggered by `studio create`. Runs the §1 script: validates **product** (desktop XOR mobile — refuses mixing), validates the **archetype** and its base, **declares** the version with `~`, and materializes the manifest + `package.json` (declared deps, GitHub-Packages `.npmrc`) + `index.html` (real shell with official classes, consuming CSS from `node_modules` — not copied) + empty content-point screens (Art. 19). The **9 archetypes** of §2 are in the catalog. **Honest boundary:** screen molds belong to `generation/TEMPLATES` (not yet a separate package); the generator **cites** each screen's mold instead of duplicating it. `studio generate` awaits that owner and reports it isn't built yet (Art. 21).

---

## Referências internas · Internal references
`platform/STUDIO_UX_RUNTIME.md` · `generation/STUDIO_UX_EXPORTERS.md` · `platform/STUDIO_UX_PACKAGES.md` · `governance/STUDIO_UX_VERSIONING.md` · `STUDIO_UX_CERTIFICATION.md` · `patterns/STUDIO_UX_PATTERNS.md` · `STUDIO_UX_DASHBOARD.md` · `STUDIO_UX_FORMS.md` · `STUDIO_UX_TABLES.md` · `STUDIO_UX_NAVIGATION.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 1, 2, 14, 19) · `STUDIO_UX.md` §11 · §12 · §13

---

*Documento vivo. Define como um projeto nasce conforme; os moldes de tela são do TEMPLATES, as camadas do RUNTIME, a versão do VERSIONING. · Living document. Defines how a project is born compliant; screen molds belong to TEMPLATES, layers to RUNTIME, version to VERSIONING.*
