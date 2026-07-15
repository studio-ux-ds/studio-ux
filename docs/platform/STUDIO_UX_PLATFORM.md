# STUDIO_UX_PLATFORM.md — A Plataforma · The Platform

> Documento normativo vivo. Responde a: **o que é o Studio UX como plataforma de desenvolvimento — sua missão, seus produtos, como tudo conversa e como novos sistemas nascem dentro dele?**
> Living normative document. Answers: **what is Studio UX as a development platform — its mission, its products, how everything talks, and how new systems are born within it?**
> Governança: `STUDIO_UX.md`, `governance/STUDIO_UX_CONSTITUTION.md`.

```
Architecture Boundary Check — STUDIO_UX_PLATFORM
Resolve · Solves:            descrever o Studio UX como PLATAFORMA — a narrativa/estratégia que une fundação,
                             ferramentas, qualidade, geração e IA num ecossistema onde sistemas nascem.
                             / describes Studio UX as a PLATFORM — the strategy uniting foundation, tools, quality,
                             generation and AI into an ecosystem where systems are born.
Não pertence a outro porque · Not elsewhere because:
                             VISION é a visão do PRODUTO (design system); ARCHITECTURE é o MAPA técnico dos domínios;
                             PACKAGES é o layout físico. Faltava a camada de estratégia da plataforma.
                             / VISION is the PRODUCT vision; ARCHITECTURE is the technical DOMAIN MAP; PACKAGES is the
                             physical layout. The missing layer is the platform strategy.
Complementa · Complements:   VISION, CONSTITUTION, ARCHITECTURE, RUNTIME, PACKAGES, ROADMAP, ROADMAP_2035.
Nunca substitui · Never replaces: VISION (visão do produto), ARCHITECTURE (mapa de domínios), PACKAGES (layout físico).
Dono · Owner:                este doc, para o domínio "estratégia da plataforma".
                             / this doc, for the "platform strategy" domain.
```

---

## Objetivo · Objective
**PT** — Elevar o Studio UX de *design system* a **Plataforma Oficial de Desenvolvimento de Interfaces da empresa**: o lugar de onde todo sistema (Desktop, Mobile, Portal, CRM, ERP, Analytics, IA Studio, Portal do Cliente, Marketplace, Backoffice) nasce, é validado, versionado e evoluído — sem recriar fundamentos. Este documento explica a missão, a visão de plataforma, a arquitetura de alto nível, os produtos, como as peças conversam e como um sistema novo nasce.
**EN** — Elevate Studio UX from *design system* to the company's **Official Interface Development Platform**: the place from which every system is born, validated, versioned and evolved — without recreating fundamentals. This document explains the mission, the platform vision, the high-level architecture, the products, how the pieces talk, and how a new system is born.

## Escopo · Scope
**PT** — A visão de plataforma e como seus domínios se articulam. **Não** entra no detalhe de cada domínio (isso é do dono de cada um) nem no layout físico do código (é `PACKAGES`).
**EN** — The platform vision and how its domains articulate. It does **not** enter each domain's detail (that's each owner's) nor the physical code layout (that's `PACKAGES`).

---

## 1. Missão e visão · Mission and vision
**PT** — *Missão:* garantir que qualquer interface da empresa nasça consistente, acessível e reconhecível como Studio UX, com o mínimo de esforço e a máxima previsibilidade — para humanos e para IAs. *Visão de plataforma:* um ecossistema onde a fundação (identidade, tokens, componentes, padrões), as ferramentas (CLI, DevTools, Playground), a qualidade (Linter, Compliance, Certification), a geração (Project Generator, Templates, Exporters) e a IA (AI Ecosystem) formam um todo coeso. O sistema consumidor **declara uma dependência** e recebe, de graça, a consistência do ecossistema inteiro.
**EN** — *Mission:* ensure any company interface is born consistent, accessible and recognizable as Studio UX, with minimal effort and maximum predictability — for humans and AIs. *Platform vision:* an ecosystem where the foundation, the tools, the quality layer, the generation layer and the AI layer form a coherent whole. The consuming system **declares a dependency** and receives, for free, the whole ecosystem's consistency.

**PT** — Referências de ambição: Material Design, Carbon, Polaris, Flutter, Android SDK, Apple Human Interface, shadcn/ui — estudados por seus princípios (`REFERENCE_DNA`), nunca copiados. O Studio UX vai além do design system: é plataforma, com identidade própria.
**EN** — Ambition references: Material Design, Carbon, Polaris, Flutter, Android SDK, Apple Human Interface, shadcn/ui — studied for their principles (`REFERENCE_DNA`), never copied. Studio UX goes beyond a design system: it is a platform, with its own identity.

## 2. As cinco camadas da plataforma · The platform's five layers
**PT** — A plataforma organiza-se em cinco camadas (os cinco épicos), cada uma com donos de domínio próprios:

1. **Fundação · Foundation** — identidade, princípios, tokens, componentes, padrões, superfícies, gramática (Fases 1–1.5). É o núcleo do qual tudo depende.
2. **Ferramentas · Tools** — CLI, DevTools, Playground: a experiência de quem constrói com o Studio UX.
3. **Qualidade · Quality** — Linter (detecta), Compliance (mede), Certification (gradua): garantem conformidade.
4. **Geração · Generation** — Project Generator, Templates, Exporters: como um sistema nasce já correto e como os tokens saem para outras tecnologias.
5. **Ecossistema de IA · AI Ecosystem** — como cada IA consome, valida e certifica automaticamente.

**EN** — The platform is organized in five layers (the five epics), each with its own domain owners: (1) **Foundation** — identity, principles, tokens, components, patterns, surfaces, grammar; (2) **Tools** — CLI, DevTools, Playground; (3) **Quality** — Linter, Compliance, Certification; (4) **Generation** — Project Generator, Templates, Exporters; (5) **AI Ecosystem**.

## 3. Como tudo conversa · How everything talks
**PT** — O fluxo de valor atravessa as camadas: os **tokens** e **componentes** da fundação alimentam os **exporters** (que os levam a qualquer tecnologia) e o **generator** (que instancia um sistema); a **CLI** é a porta de entrada de todas as operações; o **Linter** e o **Compliance** vigiam continuamente; a **Certification** carimba o resultado; a **IA** consome a documentação como contexto e se auto-audita pela Certification. A separação entre *especificação* (o que documentamos) e *runtime* (o que executa) é sagrada e detalhada em `RUNTIME`. Nenhuma camada fura a fronteira da outra — a SSOT (`STUDIO_UX.md` §11) mantém cada assunto com um dono.
**EN** — Value flows across the layers: the foundation's **tokens** and **components** feed the **exporters** (carrying them to any technology) and the **generator** (instantiating a system); the **CLI** is the entry point for all operations; the **Linter** and **Compliance** watch continuously; **Certification** stamps the result; the **AI** consumes the documentation as context and self-audits via Certification. The separation between *specification* (what we document) and *runtime* (what executes) is sacred and detailed in `RUNTIME`.

## 4. Como um sistema novo nasce · How a new system is born
**PT** — O caminho canônico: (1) escolher o produto-base (Desktop **ou** Mobile) e o arquétipo (Portal, CRM, ERP, Analytics, IA Studio, Portal do Cliente, Marketplace, Backoffice); (2) o **Project Generator** cria a estrutura já conforme, declarando a dependência de versão do Studio UX; (3) o sistema é construído compondo componentes e padrões oficiais, sob a gramática (`GRAMMAR`); (4) o **Linter**/**Compliance** validam a cada mudança; (5) a **Certification** atesta o nível; (6) atualizações do Studio UX chegam por SemVer (`VERSIONING`), adotadas deliberadamente. O sistema **nunca edita o framework por dentro** — só o consome (Art. 1, 19 da `CONSTITUTION`).
**EN** — The canonical path: (1) choose the base product (Desktop **or** Mobile) and the archetype; (2) the **Project Generator** creates a compliant structure, declaring the Studio UX version dependency; (3) the system is built by composing official components and patterns under the grammar (`GRAMMAR`); (4) the **Linter**/**Compliance** validate on every change; (5) **Certification** attests the level; (6) Studio UX updates arrive via SemVer (`VERSIONING`), deliberately adopted. The system **never edits the framework internally** — it only consumes it.

## 5. Como evolui · How it evolves
**PT** — A plataforma evolui por versões e por épicos, nunca por reescrita. Mudanças passam por RFC (`RFC_GUIDE`) e viram ADR (`ADR_GUIDE`); a Constituição é o limite que nenhuma evolução cruza. O horizonte de dez anos está em `ROADMAP_2035`.
**EN** — The platform evolves through versions and epics, never through rewrites. Changes go through RFC (`RFC_GUIDE`) and become ADRs (`ADR_GUIDE`); the Constitution is the limit no evolution crosses. The ten-year horizon lives in `ROADMAP_2035`.

## Responsabilidades · Responsibilities
**PT** — Descrever a estratégia e a articulação da plataforma; nomear as cinco camadas e o fluxo entre elas; explicar o nascimento de um sistema.
**EN** — Describe the platform strategy and articulation; name the five layers and the flow between them; explain the birth of a system.

## Não-responsabilidades · Non-responsibilities
**PT** — Não detalha domínios (donos próprios), não define o monorepo físico (`PACKAGES`), não define as camadas de execução (`RUNTIME`), não é a visão do produto de design (`VISION`).
**EN** — Does not detail domains (own owners), define the physical monorepo (`PACKAGES`), define execution layers (`RUNTIME`), or serve as the design product vision (`VISION`).

## Integrações e dependências · Integrations and dependencies
**PT** — Depende da `CONSTITUTION` (limites) e da `VISION` (propósito); referencia todos os domínios das cinco camadas. É referenciado pelo `ARCHITECTURE` como a narrativa que o mapa técnico serve.
**EN** — Depends on the `CONSTITUTION` (limits) and `VISION` (purpose); references all five-layer domains. Referenced by `ARCHITECTURE` as the narrative its technical map serves.

## Fluxos · Flows
**PT** — Fluxo de nascimento de sistema (§4); fluxo de valor entre camadas (§3); fluxo de evolução (§5).
**EN** — System-birth flow (§4); cross-layer value flow (§3); evolution flow (§5).

## Boas práticas · Best practices
**PT** — Trate a plataforma como produto, não projeto. Faça o sistema consumidor declarar a versão. Mantenha a fronteira especificação × runtime. Adote atualizações MAJOR deliberadamente.
**EN** — Treat the platform as a product, not a project. Make the consuming system declare the version. Keep the specification × runtime boundary. Adopt MAJOR updates deliberately.

## Anti-padrões · Anti-patterns
**PT / EN**
- Editar o framework por dentro do sistema consumidor. / Editing the framework inside the consuming system.
- Recriar fundamentos em vez de declarar dependência. / Recreating fundamentals instead of declaring a dependency.
- Misturar especificação e runtime. / Mixing specification and runtime.
- Tratar a plataforma como um tema trocável. / Treating the platform as a swappable theme.

## Roadmap
**PT** — A plataforma é construída por épicos (1 Plataforma & Governança, 2 Ferramentas, 3 Qualidade, 4 Geração, 5 IA), um por vez, com validação humana. Ver `ROADMAP` (fases) e `ROADMAP_2035` (década).
**EN** — The platform is built by epics (1 Platform & Governance, 2 Tools, 3 Quality, 4 Generation, 5 AI), one at a time, with human validation. See `ROADMAP` (phases) and `ROADMAP_2035` (decade).

## Referências internas · Internal references
`governance/STUDIO_UX_CONSTITUTION.md` · `STUDIO_UX_VISION.md` · `platform/STUDIO_UX_ARCHITECTURE.md` · `platform/STUDIO_UX_RUNTIME.md` · `platform/STUDIO_UX_PACKAGES.md` · `platform/STUDIO_UX_ROADMAP_2035.md` · `STUDIO_UX_ROADMAP.md`

---

*Documento vivo. Estratégia da plataforma; o mapa técnico é do ARCHITECTURE, o layout físico do PACKAGES. · Living document. Platform strategy; the technical map belongs to ARCHITECTURE, the physical layout to PACKAGES.*
