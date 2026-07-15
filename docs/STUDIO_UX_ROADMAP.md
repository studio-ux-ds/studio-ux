# STUDIO_UX_ROADMAP.md — Roadmap · Roadmap

> Documento normativo vivo. Responde a uma pergunta: **por quais fases versionadas o Studio UX evolui, e qual o critério de saída (Definição de Pronto) de cada uma?**
> Living normative document. Answers one question: **through which versioned phases does Studio UX evolve, and what is the exit criterion (Definition of Done) of each?**
> Governança e SemVer: `STUDIO_UX.md` §7. Estado atual: `CHANGELOG.md` + tags git (fonte da verdade, nunca a memória).

---

## 0. Como ler este roadmap · How to read this roadmap

**PT** — O Studio UX é um **produto versionado** (SemVer — `STUDIO_UX.md` §7), não um projeto com prazo. Ele evolui por fases, e **cada fase desce da documentação já escrita na anterior** — nada de estética antes de arquitetura (regra de ouro §3.6). A Fase 1 fixou a fundação conceitual; todas as fases seguintes materializam o que a Fase 1 já descreveu, nunca reabrindo decisões sem um ADR. Duas regras atravessam todo o roadmap: **uma frente por vez, com validação humana entre frentes**, e **nada nasce sem sua documentação bilíngue na mesma leva** (§9 — docs vivos sem lixo).

**EN** — Studio UX is a **versioned product** (SemVer — `STUDIO_UX.md` §7), not a deadline project. It evolves through phases, and **each phase descends from the documentation already written in the previous one** — no aesthetics before architecture (golden rule §3.6). Phase 1 fixed the conceptual foundation; every later phase materializes what Phase 1 already described, never reopening decisions without an ADR. Two rules cut across the whole roadmap: **one front at a time, with human validation between fronts**, and **nothing ships without its bilingual documentation in the same commit** (§9 — living docs, no dead weight).

**PT** — Cada fase abaixo declara: seu **objetivo**, o que **entrega**, sua **Definição de Pronto** (o critério objetivo de saída) e a **versão** que ela alcança. Datas não são prometidas; a ordem e os critérios, sim.

**EN** — Each phase below declares: its **goal**, what it **delivers**, its **Definition of Done** (the objective exit criterion) and the **version** it reaches. Dates are not promised; the order and the criteria are.

---

## Fase 1 — Fundação conceitual e documental · Phase 1 — Conceptual and documentation foundation `v0.1.0` ✅

**PT** — *Objetivo:* definir a visão, os princípios, a governança e a arquitetura de todo o produto **antes de qualquer implementação** — a lição central do IA Studio. *Entrega:* regra máxima (`STUDIO_UX.md`), visão, filosofia, os princípios numerados P1…P25, a arquitetura de tokens, o catálogo de componentes, os padrões, o sistema de layout, o contexto para IA, a arquitetura dos dois produtos (Desktop e Mobile), a pesquisa de referências e este roadmap. **Zero código, zero tokens finais, zero telas.** *Definição de Pronto:* uma pessoa nova (ou uma IA) consegue entender o produto inteiro — o quê, o porquê e o como-vai-ser — lendo só a documentação; tudo bilíngue; princípios estáveis e numerados. *Status:* **CONCLUÍDA** — corresponde a `v0.1.0`.

**EN** — *Goal:* define the vision, principles, governance and architecture of the whole product **before any implementation** — IA Studio's central lesson. *Delivery:* the supreme rule (`STUDIO_UX.md`), vision, philosophy, the numbered principles P1…P25, the token architecture, the component catalog, the patterns, the layout system, the AI context, the architecture of both products (Desktop and Mobile), the reference study and this roadmap. **Zero code, zero final tokens, zero screens.** *Definition of Done:* a newcomer (or an AI) can understand the whole product — the what, the why and the how-it-will-be — from the docs alone; everything bilingual; principles stable and numbered. *Status:* **DONE** — corresponds to `v0.1.0`.

---

## Fase 1.5 — Linguagem visual · Phase 1.5 — Visual language `v0.2.0` ✅

**PT** — *Objetivo:* dar ao produto sua **identidade e linguagem visual** — o DNA que faz qualquer tela ser reconhecida como Studio UX — permanecendo **do lado da arquitetura da linha** (caráter e regras, **nunca valores estéticos finais**; esses seguem na Fase 2). É o elo que faltava entre "por que" (Filosofia) e "quais valores" (Fase 2). *Entrega:* `STUDIO_UX_VISUAL_DNA.md` (personalidade, regras de gosto, o que nunca será), `STUDIO_UX_GRAMMAR.md` (a gramática de composição Application→…→Content, com o ADR-001 da fronteira com Layout System), `STUDIO_UX_SURFACES.md` (sistema de superfícies e elevação), `STUDIO_UX_VISUAL_RHYTHM.md` (ritmo, respiração, escaneabilidade), os guias de composição por domínio `DASHBOARD`/`FORMS`/`TABLES`/`NAVIGATION`, `STUDIO_UX_CERTIFICATION.md` (auditoria de tela com níveis Bronze→Platinum), `REFERENCE_DNA.md` (engenharia reversa de princípios) e `AI_RULES.md` (regras imperativas para IA). Reforça a governança com **SSOT por domínio**, **Architecture Boundary Check** e **horizonte de 10 anos / tech-agnóstico** (`STUDIO_UX.md` §11–13). *Definição de Pronto:* toda a linguagem visual documentada nas duas línguas, cada doc com seu Boundary Check e um único dono de domínio; **nenhum valor concreto** decidido (a regra §3.6 permanece intacta); nada contradiz a Fase 1. *Status:* **CONCLUÍDA** — corresponde a `v0.2.0`.

**EN** — *Goal:* give the product its **identity and visual language** — the DNA that makes any screen recognizable as Studio UX — while staying **on the architecture side of the line** (character and rules, **never final aesthetic values**; those come in Phase 2). It is the missing link between "why" (Philosophy) and "which values" (Phase 2). *Delivery:* `STUDIO_UX_VISUAL_DNA.md` (personality, taste rules, what it will never be), `STUDIO_UX_GRAMMAR.md` (the composition grammar Application→…→Content, with ADR-001 on the Layout System boundary), `STUDIO_UX_SURFACES.md` (surface & elevation system), `STUDIO_UX_VISUAL_RHYTHM.md` (rhythm, breathing, scannability), the domain composition guides `DASHBOARD`/`FORMS`/`TABLES`/`NAVIGATION`, `STUDIO_UX_CERTIFICATION.md` (screen audit with Bronze→Platinum levels), `REFERENCE_DNA.md` (principle reverse-engineering) and `AI_RULES.md` (imperative AI rules). It reinforces governance with **SSOT per domain**, the **Architecture Boundary Check** and the **10-year / tech-agnostic horizon** (`STUDIO_UX.md` §11–13). *Definition of Done:* the whole visual language documented in both languages, each doc with its Boundary Check and a single domain owner; **no concrete value** decided (rule §3.6 stays intact); nothing contradicts Phase 1. *Status:* **DONE** — corresponds to `v0.2.0`.

---

## Fase 1.6 — UI Exploration (validação da linguagem) · Phase 1.6 — UI Exploration (validating the language) → `v0.2.x`

**PT** — *Objetivo:* **validar a linguagem visual antes de implementar componentes**, evitando o erro clássico de descobrir que a identidade não convence com metade da biblioteca já pronta. Fluxo maduro de produto: visão → linguagem → **exploração** → componentes. *Entrega:* o diretório `research/ui-exploration/` com dezenas de estudos visuais descritivos (wireframes em prosa, composições, variações de sidebar, cards, dashboards, tabelas, formulários, login), **todos derivados do `STUDIO_UX_VISUAL_DNA.md`** e nenhum definitivo — servem para calibrar e aprovar a linguagem com o Robson. Cada estudo é auditável pela `CERTIFICATION` e continua **sem valores finais** (ou com valores explicitamente marcados como provisórios/descartáveis). *Definição de Pronto:* linguagem visual validada e aprovada por decisão humana; os estudos que orientam a Fase 2 ficam registrados; os descartáveis saem (§9). Só depois desta validação a Fase 2 começa. *Nota:* esta fase foi proposta pelo Robson e inserida por evolução natural do roadmap (não reabre decisão da Fase 1).

**EN** — *Goal:* **validate the visual language before implementing components**, avoiding the classic mistake of discovering the identity doesn't convince with half the library already built. Mature product flow: vision → language → **exploration** → components. *Delivery:* the `research/ui-exploration/` directory with dozens of descriptive visual studies (prose wireframes, compositions, sidebar/card/dashboard/table/form/login variations), **all derived from `STUDIO_UX_VISUAL_DNA.md`** and none definitive — they calibrate and get the language approved with Robson. Each study is auditable by `CERTIFICATION` and stays **without final values** (or with values explicitly marked provisional/disposable). *Definition of Done:* the visual language validated and approved by human decision; the studies guiding Phase 2 recorded; the disposable ones removed (§9). Only after this validation does Phase 2 begin. *Note:* this phase was proposed by Robson and inserted as a natural roadmap evolution (it does not reopen a Phase 1 decision).

---

## Fase 2 — Materialização dos Design Tokens · Phase 2 — Materializing the Design Tokens → `v1.0.0` (tokens)

**PT** — *Objetivo:* transformar a *arquitetura* de tokens (já documentada) em **valores concretos e congelados** — as decisões de cor, tipografia, espaçamento, raio, sombra, duração que dão ao Studio UX sua identidade visual própria. Aqui, e só aqui, a estética entra (a arquitetura já existe). *Entrega:* a paleta com papéis semânticos (P8), a escala tipográfica, a escala de espaçamento (P7), a escala de raio (P10), os níveis de elevação (P9), as durações de movimento (P15), e os temas dark/light/brand — cada valor ancorado num token nomeado em inglês, sem literais soltos (P1). *Definição de Pronto:* toda categoria de token tem valores decididos, nomeados e documentados nas duas línguas; contraste mínimo verificado (P18); os temas derivam dos mesmos tokens; nenhuma tela ou componente futuro precisará "inventar" um valor. Congelar os tokens é o marco que leva à **`v1.0.0` dos tokens** — o primeiro contrato estável que os consumidores podem declarar.

**EN** — *Goal:* turn the token *architecture* (already documented) into **concrete, frozen values** — the color, typography, spacing, radius, shadow and duration decisions that give Studio UX its own visual identity. Here, and only here, aesthetics enter (the architecture already exists). *Delivery:* the palette with semantic roles (P8), the type scale, the spacing scale (P7), the radius scale (P10), the elevation levels (P9), the motion durations (P15), and the dark/light/brand themes — each value anchored in an English-named token, no loose literals (P1). *Definition of Done:* every token category has decided, named and documented values in both languages; minimum contrast verified (P18); themes derive from the same tokens; no future screen or component will need to "invent" a value. Freezing the tokens is the milestone that reaches **tokens `v1.0.0`** — the first stable contract consumers can declare.

---

## Fase 3 — Biblioteca de componentes (Desktop primeiro) · Phase 3 — Component library (Desktop first) → `v1.x` (components)

**PT** — *Objetivo:* implementar os componentes do catálogo já documentado, **Desktop primeiro**, porque o Desktop é o produto de maior densidade de componentes (DataTable, Sidebar, Command Palette, formulários densos) e ancora o resto. *Entrega:* os componentes oficiais construídos sobre os tokens congelados da Fase 2 — cada um com seus estados (default/hover/focus/active/disabled/loading/error/empty), acessibilidade (P18–P19), variação documentada, e nenhum valor fora de token (P1). Um componente só entra quando substitui de fato um elemento "cru" que uma tela precisaria (P2, P3). *Definição de Pronto (por componente):* propósito, quando usar, quando NÃO, regras, limitações, boas práticas, anti-padrões, todos os estados e a variação Desktop/Mobile — nas duas línguas (P25); construído só com tokens; acessível; entrada no CHANGELOG. *Regra de ritmo:* **um componente por vez, validado, antes do próximo** — nunca empilhar frentes.

**EN** — *Goal:* implement the catalog's already-documented components, **Desktop first**, because Desktop is the highest component-density product (DataTable, Sidebar, Command Palette, dense forms) and anchors the rest. *Delivery:* the official components built on Phase 2's frozen tokens — each with its states (default/hover/focus/active/disabled/loading/error/empty), accessibility (P18–P19), documented variation, and no off-token value (P1). A component only enters when it actually replaces a "raw" element a screen would need (P2, P3). *Definition of Done (per component):* purpose, when to use, when NOT, rules, limitations, best practices, anti-patterns, all states and the Desktop/Mobile variation — in both languages (P25); built from tokens only; accessible; a CHANGELOG entry. *Pace rule:* **one component at a time, validated, before the next** — never stack fronts.

---

## Fase 4 — Componentes Mobile · Phase 4 — Mobile components → `v1.x` (components)

**PT** — *Objetivo:* implementar os componentes do produto **Mobile** — Bottom Navigation, Cards, bottom sheets de filtro, listas tocáveis, padrões de gesto, Scanner, indicadores de offline/sincronização —, **projetados do zero** a partir de `mobile/STUDIO_UX_MOBILE.md`, nunca adaptando os do Desktop (P4). *Entrega:* os componentes Mobile sobre os mesmos tokens da Fase 2 (identidade compartilhada, layout próprio), com alvos de toque ≥ 44px (P19), estados projetados (P14) e gestos sempre com alternativa acessível. *Definição de Pronto:* mesma barra de qualidade da Fase 3, aplicada ao Mobile; e a prova explícita de que cada componente Mobile é um projeto próprio, não um Desktop encolhido. Só começa depois de a Fase 3 estabilizar o vocabulário compartilhado de tokens/estados.

**EN** — *Goal:* implement the **Mobile** product's components — Bottom Navigation, Cards, filter bottom sheets, touch lists, gesture patterns, Scanner, offline/sync indicators — **designed from scratch** from `mobile/STUDIO_UX_MOBILE.md`, never adapting the Desktop ones (P4). *Delivery:* the Mobile components on Phase 2's same tokens (shared identity, own layout), with touch targets ≥ 44px (P19), designed states (P14) and gestures always with an accessible alternative. *Definition of Done:* the same quality bar as Phase 3, applied to Mobile; and explicit proof that each Mobile component is its own design, not a shrunken Desktop. It starts only after Phase 3 stabilizes the shared token/state vocabulary.

---

## Fase 5 — Playground, exemplos e templates · Phase 5 — Playground, examples and templates → `v1.x`

**PT** — *Objetivo:* dar ao produto um **laboratório vivo** onde os componentes são vistos, testados e combinados, e uma biblioteca de **telas-exemplo e templates** que instanciam as telas-arquétipo (Dashboard, DataTable, CRUD, Login, Wizard, etc.) com dados fictícios. *Entrega:* o `playground/` (cada componente em todos os seus estados e temas, manipulável), o `examples/` (telas completas montadas só com componentes e tokens oficiais, como referência de "assim se faz"), e `templates/` (moldes prontos de tela para os consumidores partirem). *Definição de Pronto:* cada componente aparece no playground com todos os estados e nos temas dark/light; cada tela-arquétipo tem um exemplo que respeita todos os princípios (é auditável pela checklist do `AI_CONTEXT`); templates documentados nas duas línguas. *Valor:* é o que torna o produto **demonstrável** e o que ensina consumidores e IAs pelo exemplo.

**EN** — *Goal:* give the product a **living lab** where components are seen, tested and combined, and a library of **example screens and templates** instantiating the archetype screens (Dashboard, DataTable, CRUD, Login, Wizard, etc.) with mock data. *Delivery:* the `playground/` (each component in all its states and themes, manipulable), the `examples/` (full screens assembled from official components and tokens only, as a "this is how it's done" reference), and `templates/` (ready screen molds for consumers to start from). *Definition of Done:* each component appears in the playground with all states and in dark/light themes; each archetype screen has an example respecting every principle (auditable by the `AI_CONTEXT` checklist); templates documented in both languages. *Value:* this is what makes the product **demonstrable** and what teaches consumers and AIs by example.

---

## Fase 6+ — Adoção, governança contínua e extensões · Phase 6+ — Adoption, continuous governance and extensions → `v2.x` e além / and beyond

**PT** — *Objetivo:* colocar o Studio UX em produção nos **sistemas consumidores** e sustentá-lo como produto vivo por anos. *Entrega:* adoção pelos sistemas (Aquapark, IA Studio, ERPs, CRMs, Portais) **declarando uma dependência de versão** (ex.: "Aquapark → Studio UX Desktop `v1.x`"), nunca recriando fundamentos nem editando o framework por dentro (`STUDIO_UX.md` §7); guias de migração para toda mudança MAJOR; governança contínua (novos componentes/padrões entram por MINOR, quebras por MAJOR com migração); extensões maduras — **temas/white-label** para os consumidores vestirem a marca deles sobre a mesma arquitetura, e a **biblioteca de ícones/ilustrações** (`assets/`). *Definição de Pronto (contínua):* cada release respeita SemVer, entra no CHANGELOG, recebe tag anotada imutável (nunca reusada, sempre confirmada com o Robson); nenhum consumidor precisa de "adivinhar"; a documentação continua descrevendo só o que existe hoje (§9). Esta fase não "termina" — é o regime permanente do produto.

**EN** — *Goal:* put Studio UX into production in the **consuming systems** and sustain it as a living product for years. *Delivery:* adoption by systems (Aquapark, IA Studio, ERPs, CRMs, Portals) **declaring a version dependency** (e.g. "Aquapark → Studio UX Desktop `v1.x`"), never recreating fundamentals nor editing the framework internally (`STUDIO_UX.md` §7); migration guides for every MAJOR change; continuous governance (new components/patterns enter via MINOR, breaks via MAJOR with migration); mature extensions — **themes/white-label** for consumers to wear their own brand over the same architecture, and the **icon/illustration library** (`assets/`). *Definition of Done (continuous):* each release honors SemVer, enters the CHANGELOG, gets an immutable annotated tag (never reused, always confirmed with Robson); no consumer has to "guess"; documentation keeps describing only what exists today (§9). This phase does not "end" — it is the product's permanent regime.

---

## Trilha da Plataforma — épicos · Platform track — epics `v0.2.x`

**PT** — Acima do design system, o Studio UX cresce como **plataforma de desenvolvimento**, construída em **cinco épicos**, um por vez com validação humana entre eles. Esta trilha convive com as fases do design system (não as substitui) e especifica a arquitetura de longo prazo. O detalhe da estratégia está em `platform/STUDIO_UX_PLATFORM.md`.

1. **Épico 1 — Plataforma & Governança** ✅ — `PLATFORM`, `ARCHITECTURE`, `RUNTIME`, `PACKAGES`, `CONSTITUTION`, `VERSIONING`, `ADR_GUIDE`, `RFC_GUIDE`, `ROADMAP_2035`.
2. **Épico 2 — Ferramentas** ✅ — CLI, DevTools, Playground.
3. **Épico 3 — Qualidade** ✅ — Linter, Compliance, Certification (expandido para tela + sistema, com nível Enterprise).
4. **Épico 4 — Geração** ✅ — Project Generator, Exporters.
5. **Épico 5 — Ecossistema de IA** ✅ — AI Ecosystem.

**EN** — Above the design system, Studio UX grew as a **development platform**, built in **five epics — all complete** in documentation. This track coexists with the design-system phases (it does not replace them) and specifies the long-term architecture. Strategy detail lives in `platform/STUDIO_UX_PLATFORM.md`. The platform documentation is done; **implementation (code) begins at Phase 2** of the design system.

---

## Regras de execução que atravessam todas as fases · Execution rules across all phases

**PT**
- **Uma frente por vez, com validação humana entre frentes.** Nunca empilhar mudanças estruturais; checkpoint e revisão antes da próxima.
- **Tudo desce da documentação.** Nenhuma fase reabre uma decisão da Fase 1 sem um ADR curto (contexto → decisão → consequência) no documento afetado.
- **Documentação viva, sem lixo (§9).** Cada entrega atualiza a doc afetada nas duas línguas na mesma leva; o que sai de cena sai da doc; o histórico mora no CHANGELOG, não na doc de arquitetura.
- **SemVer e tags imutáveis (§7).** MAJOR = quebra (com guia de migração); MINOR = adição retrocompatível; PATCH = correção de doc. Toda mudança: CHANGELOG → commit → tag anotada `vX.Y.Z` (nunca reusar; confirmar o número com o Robson).
- **A verdade mora no git e nos arquivos, nunca na memória.** Após qualquer compactação de sessão, re-ancorar antes de agir (`STUDIO_UX.md` §3.7).

**EN**
- **One front at a time, with human validation between fronts.** Never stack structural changes; checkpoint and review before the next.
- **Everything descends from the documentation.** No phase reopens a Phase 1 decision without a short ADR (context → decision → consequence) in the affected document.
- **Living docs, no dead weight (§9).** Every delivery updates the affected doc in both languages in the same commit; what leaves the stage leaves the doc; history lives in the CHANGELOG, not in the architecture doc.
- **SemVer and immutable tags (§7).** MAJOR = break (with migration guide); MINOR = backward-compatible addition; PATCH = doc fix. Every change: CHANGELOG → commit → annotated tag `vX.Y.Z` (never reused; confirm the number with Robson).
- **Truth lives in git and files, never in memory.** After any session compaction, re-anchor before acting (`STUDIO_UX.md` §3.7).

---

*Documento vivo. Atualizar a cada mudança de fase ou de critério de saída; toda mudança nas duas línguas na mesma leva. · Living document. Update on every phase or exit-criterion change; every change in both languages in the same commit.*
