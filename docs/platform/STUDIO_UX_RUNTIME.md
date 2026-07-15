# STUDIO_UX_RUNTIME.md — Camadas de Execução · Execution Layers

> Documento normativo vivo. Responde a: **qual a diferença entre Specification, Runtime, Playground, Templates e Applications — e por que essas camadas NUNCA se misturam?**
> Living normative document. Answers: **what is the difference between Specification, Runtime, Playground, Templates and Applications — and why these layers NEVER mix?**
> Governança: `STUDIO_UX.md` (SSOT §11, §13), `governance/STUDIO_UX_CONSTITUTION.md`, `platform/STUDIO_UX_PLATFORM.md`.

```
Architecture Boundary Check — STUDIO_UX_RUNTIME
Resolve · Solves:            separar as CAMADAS DE EXECUÇÃO do ecossistema — o que é permanente (Specification)
                             do que roda numa tecnologia (Runtime), do que demonstra (Playground), do que
                             molda (Templates) e do que consome (Applications).
                             / separating the ecosystem's EXECUTION LAYERS — what is permanent (Specification)
                             from what runs in a technology (Runtime), what demonstrates (Playground), what
                             molds (Templates) and what consumes (Applications).
Não pertence a outro porque · Not elsewhere because:
                             PLATFORM é a estratégia; ARCHITECTURE é o mapa LÓGICO de domínios; PACKAGES é o
                             layout FÍSICO de pastas. Faltava a separação por MOMENTO/MODO DE EXECUÇÃO.
                             / PLATFORM is strategy; ARCHITECTURE is the LOGICAL domain map; PACKAGES is the
                             PHYSICAL folder layout. The missing cut is separation by EXECUTION MODE/MOMENT.
Complementa · Complements:   PLATFORM, ARCHITECTURE, PACKAGES, CONSTITUTION, VERSIONING.
Nunca substitui · Never replaces: ARCHITECTURE (mapa de domínios), PACKAGES (layout físico), nem os donos
                             de tools/PLAYGROUND, generation/EXPORTERS e generation/TEMPLATES (épicos 2 e 4).
Dono · Owner:                este doc, para o domínio "camadas de execução".
                             / this doc, for the "execution layers" domain.
```

---

## Objetivo · Objective
**PT** — Definir, sem ambiguidade, as cinco camadas de execução do Studio UX e a fronteira inviolável entre elas. É o documento que impede o erro mais caro e mais silencioso de um design system que quer durar dez anos: deixar uma regra permanente vazar para dentro do código que roda numa tecnologia do momento — e, com a tecnologia, aposentar a regra. Aqui se fixa a **regra de ouro**: a Specification é permanente e agnóstica (Art. 13, §13); o Runtime é a tradução descartável para a tecnologia do dia.
**EN** — Define, unambiguously, the five Studio UX execution layers and the inviolable boundary between them. This is the document that prevents the most expensive and most silent mistake of a design system meant to last a decade: letting a permanent rule leak into code that runs in a technology of the moment — and retiring the rule together with the technology. It fixes the **golden rule**: the Specification is permanent and agnostic (Art. 13, §13); the Runtime is the disposable translation into the technology of the day.

## Escopo · Scope
**PT** — A definição de cada camada de execução, sua responsabilidade, sua fronteira e o fluxo entre elas. **Não** detalha o interior de nenhuma delas — cada dono de domínio (ARCHITECTURE, PACKAGES, os épicos 2 e 4) faz isso. Aqui só se responde *em que modo cada coisa existe*: documentada, executada, demonstrada, moldada ou consumida.
**EN** — The definition of each execution layer, its responsibility, its boundary and the flow between them. It does **not** detail any layer's interior — each domain owner (ARCHITECTURE, PACKAGES, epics 2 and 4) does that. It answers only *in what mode each thing exists*: documented, executed, demonstrated, molded or consumed.

---

## 1. As cinco camadas · The five layers

### 1.1 Specification — o contrato · the contract
**PT** — A **Specification** é o Studio UX enquanto *documentação e contrato*: o que o produto É — princípios (P#), tokens como arquitetura, componentes como catálogo, padrões, gramática. É a **fonte da verdade** (Art. 5) e é **permanente e agnóstica de tecnologia** (Art. 13, §13). A Specification **não executa** — ela descreve. Um token, aqui, é um contrato semântico (`color.surface.raised`), não um valor materializado numa linguagem. Ela sobrevive à troca de qualquer framework: quando a tecnologia da vez morre, a Specification permanece intacta.
**EN** — The **Specification** is Studio UX as *documentation and contract*: what the product IS — principles (P#), tokens as architecture, components as catalog, patterns, grammar. It is the **source of truth** (Art. 5) and is **permanent and technology-agnostic** (Art. 13, §13). The Specification **does not execute** — it describes. A token, here, is a semantic contract (`color.surface.raised`), not a value materialized in a language. It outlives any framework swap: when the technology of the day dies, the Specification stays intact.

### 1.2 Runtime — o que efetivamente roda · what actually runs
**PT** — O **Runtime** é a *materialização* da Specification numa tecnologia concreta: o tema ativo, o valor resolvido de cada token, os componentes construídos numa linguagem, a resolução de tema (dark/light/brand) em tempo de execução. É o que roda quando uma Application usa o Studio UX. O Runtime é **descartável e substituível** por tecnologia (§13): pode existir mais de um (um por tecnologia-alvo), e todos derivam da mesma Specification. Nenhuma regra permanente nasce aqui — o Runtime apenas *cumpre* a regra que a Specification define. Trocar de tecnologia troca o Runtime; a Specification não se move.
**EN** — The **Runtime** is the *materialization* of the Specification into a concrete technology: the active theme, each token's resolved value, components built in a language, theme resolution (dark/light/brand) at execution time. It is what runs when an Application uses Studio UX. The Runtime is **disposable and replaceable** per technology (§13): more than one may exist (one per target technology), all deriving from the same Specification. No permanent rule is born here — the Runtime only *fulfills* the rule the Specification defines. Changing technology changes the Runtime; the Specification does not move.

### 1.3 Playground — a demonstração viva · the living demonstration
**PT** — O **Playground** é o ambiente de *demonstração e teste vivo* dos componentes: onde cada peça do Runtime aparece em todos os seus estados (default/hover/focus/active/disabled/loading/error/empty, §8) para inspeção, calibragem e verificação de conformidade. É uma camada **derivada** — consome o Runtime, nunca o define. Situa-se aqui apenas como camada de execução; o **dono do domínio é `tools/PLAYGROUND`** (Épico 2 — Ferramentas), que detalha o quê e o como. O Playground não é destino de produção: nenhuma Application consome o Playground, ela consome o Runtime.
**EN** — The **Playground** is the *live demonstration and testing* environment for components: where each Runtime piece appears in all its states (default/hover/focus/active/disabled/loading/error/empty, §8) for inspection, calibration and conformance checking. It is a **derived** layer — it consumes the Runtime, never defines it. It is situated here only as an execution layer; the **domain owner is `tools/PLAYGROUND`** (Epic 2 — Tools), which details the what and how. The Playground is not a production destination: no Application consumes the Playground; it consumes the Runtime.

### 1.4 Templates — os moldes · the molds
**PT** — **Templates** são *moldes de tela e de projeto* prontos — composições oficiais (uma tela de login, um dashboard, um formulário) construídas sobre o Runtime e a gramática (`GRAMMAR`), servindo de ponto de partida conforme. É uma camada **derivada**: um Template não inventa regra, ele *aplica* componentes e padrões já existentes. Situa-se aqui como camada de execução; o **dono do domínio é `generation/TEMPLATES`** (Épico 4 — Geração). Um Template consome o Runtime; a Application instancia o Template e depois preenche com seu conteúdo de negócio (Art. 19).
**EN** — **Templates** are ready *screen and project molds* — official compositions (a login screen, a dashboard, a form) built on the Runtime and the grammar (`GRAMMAR`), serving as a compliant starting point. It is a **derived** layer: a Template invents no rule, it *applies* existing components and patterns. It is situated here as an execution layer; the **domain owner is `generation/TEMPLATES`** (Epic 4 — Generation). A Template consumes the Runtime; the Application instantiates the Template and then fills it with its business content (Art. 19).

### 1.5 Applications — os sistemas consumidores · the consuming systems
**PT** — **Applications** são os sistemas finais que usam o Studio UX — Aquapark, IA Studio, ERPs, CRMs, Portais do Cliente. Elas **consomem o Runtime**, **declaram a versão** do Studio UX que usam (§7, Art. 14) e **nunca editam o framework por dentro** (Art. 1, `PLATFORM` §4). A Application é dona do seu conteúdo e dos seus dados de negócio; o Studio UX é dono da experiência (Art. 19). Uma atualização MAJOR do Studio UX é adotada deliberadamente pela Application, com o guia de migração (`VERSIONING`) — nunca imposta em silêncio.
**EN** — **Applications** are the final systems that use Studio UX — Aquapark, IA Studio, ERPs, CRMs, Customer Portals. They **consume the Runtime**, **declare the Studio UX version** they use (§7, Art. 14) and **never edit the framework internally** (Art. 1, `PLATFORM` §4). The Application owns its content and business data; Studio UX owns the experience (Art. 19). A Studio UX MAJOR update is adopted deliberately by the Application, with the migration guide (`VERSIONING`) — never imposed silently.

---

## 2. A regra de ouro — por que nunca se misturam · The golden rule — why they never mix
**PT** — A durabilidade de dez anos do Studio UX (Art. 13, §13) depende de uma única disciplina: **manter permanente e descartável em camadas separadas.** A Specification é permanente e agnóstica; o Runtime é a tradução para a tecnologia do momento. Se uma regra permanente for escrita dentro do Runtime, ela morre quando o Runtime for trocado — e a fundação perde memória. Se a Specification assumir uma tecnologia, ela deixa de ser agnóstica e passa a envelhecer no ciclo de poucos anos das ferramentas. Playground, Templates e Applications são camadas derivadas: consomem, nunca definem. Confundir qualquer par corrompe a durabilidade — é o mesmo mal do "valor mágico" fora de token (§10), agora em escala de arquitetura.
**EN** — Studio UX's ten-year durability (Art. 13, §13) rests on a single discipline: **keeping the permanent and the disposable in separate layers.** The Specification is permanent and agnostic; the Runtime is the translation into the technology of the moment. If a permanent rule is written inside the Runtime, it dies when the Runtime is swapped — and the foundation loses memory. If the Specification assumes a technology, it stops being agnostic and starts aging on the few-year cycle of tooling. Playground, Templates and Applications are derived layers: they consume, never define. Confusing any pair corrupts durability — the same evil as the "magic value" outside a token (§10), now at architecture scale.

---

## Responsabilidades · Responsibilities
**PT** — Definir as cinco camadas de execução; declarar qual é permanente e quais são descartáveis/derivadas; fixar a regra de ouro Specification × Runtime; situar Playground e Templates apontando aos seus donos de domínio.
**EN** — Define the five execution layers; declare which is permanent and which are disposable/derived; fix the Specification × Runtime golden rule; situate Playground and Templates pointing to their domain owners.

## Não-responsabilidades · Non-responsibilities
**PT** — Não detalha o interior do Playground (`tools/PLAYGROUND`), dos Templates ou dos Exporters/Generator (`generation/*`); não define o mapa lógico de domínios (`ARCHITECTURE`) nem o layout físico de pastas (`PACKAGES`); não é a estratégia (`PLATFORM`); não fixa valores estéticos (Fase 2).
**EN** — Does not detail the Playground's interior (`tools/PLAYGROUND`), Templates or Exporters/Generator (`generation/*`); does not define the logical domain map (`ARCHITECTURE`) or the physical folder layout (`PACKAGES`); is not the strategy (`PLATFORM`); does not fix aesthetic values (Phase 2).

## Integrações e dependências · Integrations and dependencies
**PT** — Depende da `CONSTITUTION` (Art. 1, 5, 13, 14, 19) e do `STUDIO_UX.md` (§7, §13). Serve o `ARCHITECTURE` (que mapeia os domínios que estas camadas executam) e o `PACKAGES` (que dá endereço físico a Specification, Runtime, Playground e Templates). Os Exporters e o Project Generator (`generation/*`) são os mecanismos que produzem o Runtime e os Templates a partir da Specification.
**EN** — Depends on the `CONSTITUTION` (Art. 1, 5, 13, 14, 19) and `STUDIO_UX.md` (§7, §13). Serves `ARCHITECTURE` (which maps the domains these layers execute) and `PACKAGES` (which gives Specification, Runtime, Playground and Templates a physical address). The Exporters and Project Generator (`generation/*`) are the mechanisms that produce the Runtime and Templates from the Specification.

## Fluxos · Flows
**PT** — Fluxo canônico de materialização: **Specification → (Exporters / Generator) → Runtime → Applications.** Camadas derivadas: **Runtime → Playground** (demonstração/teste) e **Runtime → Templates → Applications** (molde preenchido com conteúdo). A seta nunca aponta para trás: uma Application jamais reescreve o Runtime, um Runtime jamais reescreve a Specification. Fluxo de evolução: a Specification muda por SemVer (`VERSIONING`); os Exporters regeram o Runtime; a Application adota a nova versão deliberadamente.
**EN** — Canonical materialization flow: **Specification → (Exporters / Generator) → Runtime → Applications.** Derived layers: **Runtime → Playground** (demonstration/testing) and **Runtime → Templates → Applications** (mold filled with content). The arrow never points backward: an Application never rewrites the Runtime, a Runtime never rewrites the Specification. Evolution flow: the Specification changes via SemVer (`VERSIONING`); the Exporters regenerate the Runtime; the Application adopts the new version deliberately.

## Boas práticas · Best practices
**PT** — Escreva toda regra permanente na Specification e só lá. Trate cada Runtime como substituível — assuma que a tecnologia dele vai mudar. Faça a Application declarar a versão e consumir apenas o Runtime. Deixe Playground e Templates estritamente derivados: se algo neles vira regra, promova-o à Specification. Ao adicionar uma tecnologia-alvo, adicione um Runtime — nunca ramifique a Specification.
**EN** — Write every permanent rule in the Specification and only there. Treat each Runtime as replaceable — assume its technology will change. Make the Application declare the version and consume only the Runtime. Keep Playground and Templates strictly derived: if something in them becomes a rule, promote it to the Specification. To add a target technology, add a Runtime — never fork the Specification.

## Anti-padrões · Anti-patterns
**PT / EN**
- Colocar uma regra permanente dentro do Runtime (ela morre com a tecnologia). / Putting a permanent rule inside the Runtime (it dies with the technology).
- Especificação que assume uma tecnologia (React, CSS, um hook) e deixa de ser agnóstica (§13, Art. 13). / A Specification that assumes a technology and stops being agnostic.
- Application que edita o framework por dentro em vez de consumir o Runtime (Art. 1). / An Application editing the framework internally instead of consuming the Runtime.
- Playground ou Template definindo regra em vez de apenas demonstrar/aplicar. / A Playground or Template defining a rule instead of only demonstrating/applying.
- Consumir o Playground como se fosse produção. / Consuming the Playground as if it were production.
- Ramificar a Specification por tecnologia em vez de derivar um novo Runtime. / Forking the Specification per technology instead of deriving a new Runtime.

## Roadmap
**PT** — A Specification é a única camada que existe hoje (Fase documental). O Runtime, o Playground (`tools/PLAYGROUND`, Épico 2) e os Templates (`generation/TEMPLATES`, Épico 4) nascem nos seus épicos, sempre derivando da Specification. Este documento não muda com esses épicos: apenas ganha os ponteiros aos donos quando eles existirem.
**EN** — The Specification is the only layer that exists today (documentation phase). The Runtime, the Playground (`tools/PLAYGROUND`, Epic 2) and the Templates (`generation/TEMPLATES`, Epic 4) are born in their epics, always deriving from the Specification. This document does not change with those epics: it only gains pointers to the owners once they exist.

## Referências internas · Internal references
`STUDIO_UX.md` §7 · §11 · §13 · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 1, 5, 13, 14, 19) · `platform/STUDIO_UX_PLATFORM.md` · `platform/STUDIO_UX_ARCHITECTURE.md` · `platform/STUDIO_UX_PACKAGES.md` · `governance/STUDIO_UX_VERSIONING.md`

---

*Documento vivo. Separa as camadas de execução; o mapa lógico é do ARCHITECTURE, o layout físico do PACKAGES. · Living document. Separates the execution layers; the logical map belongs to ARCHITECTURE, the physical layout to PACKAGES.*
