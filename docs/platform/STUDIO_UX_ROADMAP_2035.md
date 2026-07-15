# STUDIO_UX_ROADMAP_2035.md — Visão de Década · Decade Vision

> Documento normativo vivo. Responde a: **como o Studio UX deve evoluir ao longo de ~10 anos — o que NUNCA muda, o que PODE evoluir, quais marcos são plausíveis e que produtos podem nascer — sem jamais trair a identidade?**
> Living normative document. Answers: **how should Studio UX evolve over ~10 years — what NEVER changes, what MAY evolve, which milestones are plausible, and what products may be born — without ever betraying the identity?**
> Governança: `STUDIO_UX.md` §13, `governance/STUDIO_UX_CONSTITUTION.md`. Complementa (não substitui) o `STUDIO_UX_ROADMAP.md`.

```
Architecture Boundary Check — STUDIO_UX_ROADMAP_2035
Resolve · Solves:            a visão de LONGO PRAZO (~10 anos) — os invariantes de década, o que pode ser trocado
                             por baixo, os marcos plausíveis e os produtos que podem nascer. O dono do "para onde
                             vamos na década e o que nunca muda no caminho".
                             / the LONG-TERM (~10-year) vision — the decade invariants, what can be swapped underneath,
                             the plausible milestones and the products that may be born. The owner of "where we go over
                             the decade and what never changes on the way".
Não pertence a outro porque · Not elsewhere because:
                             ROADMAP define as FASES versionadas de curto/médio prazo (com Definição de Pronto);
                             CONSTITUTION fixa as verdades imutáveis em artigos curtos; §13 é o princípio de 10 anos.
                             Faltava a visão narrativa de década que os amarra num horizonte.
                             / ROADMAP defines the versioned short/mid-term PHASES (with Definition of Done); CONSTITUTION
                             fixes the immutable truths in short articles; §13 is the 10-year principle. The missing piece
                             is the decade-long narrative that ties them into a horizon.
Complementa · Complements:   ROADMAP, CONSTITUTION, STUDIO_UX.md §13, PLATFORM, VERSIONING, VISION.
Nunca substitui · Never replaces: ROADMAP (fases versionadas e critérios de saída), CONSTITUTION (verdades imutáveis),
                             VERSIONING (mecânica), nem os donos de domínio.
Dono · Owner:                este doc, para o domínio "visão de década".
                             / this doc, for the "decade vision" domain.
```

---

## Objetivo · Objective
**PT** — Dar ao Studio UX um horizonte de ~10 anos que orienta decisões grandes sem prometer datas: separar com clareza **o que é permanente** (a especificação, a identidade, os princípios) do **que é descartável** (a tecnologia, a pele, as ferramentas do momento), para que o produto atravesse a década trocando o que envelhece por baixo sem nunca reescrever a fundação. Enquanto o `ROADMAP` responde "qual a próxima fase", este documento responde "para onde tudo isto aponta em uma década — e o que jamais será negociado no caminho".
**EN** — Give Studio UX a ~10-year horizon that guides large decisions without promising dates: clearly separate **what is permanent** (the specification, the identity, the principles) from **what is disposable** (the technology, the skin, the tools of the moment), so the product crosses the decade swapping what ages underneath without ever rewriting the foundation. While the `ROADMAP` answers "what is the next phase", this document answers "where does all of this point over a decade — and what will never be negotiated on the way".

## Escopo · Scope
**PT** — Os invariantes de década, o que pode evoluir, os marcos plausíveis e os produtos que podem nascer. **Não** define as fases versionadas com Definição de Pronto (isso é `ROADMAP`), nem os artigos imutáveis (isso é `CONSTITUTION`), nem a mecânica de versão (isso é `VERSIONING`). É direção e invariantes, não cronograma.
**EN** — The decade invariants, what may evolve, the plausible milestones and the products that may be born. It does **not** define the versioned phases with a Definition of Done (`ROADMAP`), the immutable articles (`CONSTITUTION`), or version mechanics (`VERSIONING`). It is direction and invariants, not a schedule.

---

## 1. O princípio guia da década · The decade's guiding principle
**PT** — Uma frase governa tudo o que segue: **a especificação dura a década; a tecnologia é trocada por baixo sem tocar na identidade.** O Studio UX é, antes de tudo, uma *especificação de experiência* — princípios, gramática, tokens semânticos, padrões, arquétipos. Frameworks, linguagens e bibliotecas de implementação são apenas *tradutores* dessa especificação para a tecnologia do momento (§13, Art. 13), e são feitos para serem substituídos quando a moda passar. A prova de saúde do produto em 2035 não será "usa a tecnologia da vez"; será "a mesma identidade de 2025 continua reconhecível, agora expressa na tecnologia de 2035, sem que a fundação tenha sido reescrita".
**EN** — One sentence governs all that follows: **the specification lasts the decade; the technology is swapped underneath without touching the identity.** Studio UX is, above all, an *experience specification* — principles, grammar, semantic tokens, patterns, archetypes. Implementation frameworks, languages and libraries are only *translators* of that specification into the technology of the moment (§13, Art. 13), built to be replaced when the trend passes. The product's proof of health in 2035 will not be "it uses the latest technology"; it will be "the same 2025 identity is still recognizable, now expressed in 2035's technology, without the foundation having been rewritten".

## 2. O que é IMUTÁVEL na década · What is IMMUTABLE across the decade
**PT** — Isto não muda em dez anos porque não é tecnologia — é a essência do produto. Cada item ancora num artigo da `CONSTITUTION` (a régua final):

- **Produto independente, não template.** O Studio UX continua um produto versionado e governado, nunca uma biblioteca acessória de nenhum sistema (Art. 1).
- **Desktop ≠ Mobile.** Continuam dois produtos irmãos projetados do zero, que compartilham identidade e tokens mas nunca layouts — jamais um responsivo só (Art. 2, P4).
- **Todo valor nasce de um token.** Nenhum valor literal em tela, década adentro (Art. 3).
- **Nada fora da biblioteca oficial.** O que ela não cobre é pedido de componente, não improviso (Art. 4).
- **A documentação é a fonte da verdade.** A verdade mora no git e nos arquivos, nunca na memória (Art. 5).
- **A interface nunca chama mais atenção que os dados** (Art. 6); **a tela fala a língua do usuário** (Art. 7); **consistência vence criatividade pontual** (Art. 8).
- **Acessibilidade é propriedade da fundação, não remendo** — a meta mínima é inviolável em qualquer tema, hoje e em 2035 (Art. 9).
- **SSOT por domínio** (Art. 10) e **princípios/artigos de número imutável** (Art. 11) — a espinha que impede a documentação de divergir com os anos.
- **Arquitetura antes de estética** (Art. 12) e **princípios permanentes, tecnologia descartável** (Art. 13) — as duas regras que dão à década sua estabilidade.
- **Versionamento SemVer com tag imutável** (Art. 14); **uma frente por vez** (Art. 15); **decisão vira ADR, proposta vira RFC** (Art. 16); **doc viva sem lixo** (Art. 17); **bilíngue lado a lado** (Art. 18); **nunca dona de dado de negócio** (Art. 19); **na dúvida, propõe e aguarda** (Art. 20).

**PT** — Regra de ouro deste bloco: *se uma proposta de "modernização" exige violar um destes itens, a proposta está errada — não o item.* Alterá-los, se um dia for inevitável, é o caminho mais pesado (RFC + ADR + CHANGELOG), nunca uma consequência colateral de trocar tecnologia.

**EN** — This block does not change in ten years because it is not technology — it is the product's essence. Each item anchors in a `CONSTITUTION` article (the final ruler): independent product not a template (Art. 1); Desktop ≠ Mobile, designed from scratch (Art. 2, P4); every value born from a token (Art. 3); nothing outside the official library (Art. 4); documentation as the source of truth (Art. 5); interface never louder than data (Art. 6); the screen speaks the user's language (Art. 7); consistency over one-off creativity (Art. 8); accessibility as a property of the foundation (Art. 9); SSOT per domain (Art. 10); immutable principle/article numbers (Art. 11); architecture before aesthetics (Art. 12); permanent principles, disposable technology (Art. 13); SemVer with immutable tags (Art. 14); one front at a time (Art. 15); decision → ADR, proposal → RFC (Art. 16); living docs, no dead weight (Art. 17); bilingual side by side (Art. 18); never owns business data (Art. 19); when in doubt, propose and await (Art. 20). Golden rule of this block: *if a "modernization" proposal requires violating one of these, the proposal is wrong — not the item.* Changing them, if ever unavoidable, is the heaviest path (RFC + ADR + CHANGELOG), never a side effect of swapping technology.

## 3. O que PODE evoluir · What MAY evolve
**PT** — Tudo o que é *pele e tradução* é descartável e substituível, desde que a especificação e a identidade permaneçam. Podem evoluir livremente ao longo da década:

- **A pele visual — dentro do DNA.** Os valores estéticos concretos (paletas, escalas, durações) podem ser refinados, e novos temas podem nascer, contanto que permaneçam *claros, calmos e confiáveis* e nunca cruzem as linhas do "o que o Studio UX NUNCA será" (`VISUAL_DNA`). A pele muda; o caráter, não.
- **Os componentes.** A biblioteca cresce, ganha variações e aposenta peças por depreciação (`VERSIONING`) — sempre sob a mesma gramática (`GRAMMAR`) e os mesmos tokens.
- **As tecnologias-alvo dos exporters.** Os *exporters* levam os tokens e a especificação para a tecnologia do momento; quando surgir uma nova tecnologia-alvo relevante, nasce um novo exporter — e um alvo obsoleto se aposenta — **sem tocar na especificação** que ele traduz.
- **As ferramentas.** CLI, DevTools, Playground, Linter, Compliance, Certification e Generator podem ser reescritos, reimplementados ou substituídos por gerações melhores; são a camada de *tooling* (`PLATFORM`), não a fundação.
- **As integrações de IA.** O modo como as IAs consomem, validam e certificam evolui com o estado da arte da IA — novos modelos, novos protocolos, novas formas de auto-auditoria — sempre lendo a mesma documentação como contexto e a mesma Certification como régua.

**PT** — A régua: *isto é tradução/ferramenta/pele, ou é especificação/identidade?* Se é o primeiro, pode ser trocado por algo melhor a qualquer momento. Se é o segundo, é do bloco imutável (§2).

**EN** — Everything that is *skin and translation* is disposable and replaceable, as long as the specification and the identity remain. Free to evolve over the decade: **the visual skin — within the DNA** (concrete aesthetic values refined and new themes born, while staying clear/calm/trustworthy and never crossing the "what Studio UX will NEVER be" lines — `VISUAL_DNA`); **the components** (the library grows, gains variations and retires pieces by deprecation, always under the same grammar and tokens); **the exporters' target technologies** (a new relevant target spawns a new exporter, an obsolete one retires — without touching the specification it translates); **the tools** (CLI, DevTools, Playground, Linter, Compliance, Certification, Generator may be rewritten or replaced by better generations — they are tooling, not foundation); **the AI integrations** (how AIs consume, validate and certify evolves with the AI state of the art, always reading the same documentation as context and the same Certification as ruler). The ruler: *is this translation/tool/skin, or specification/identity?* If the former, it can be swapped for something better anytime. If the latter, it belongs to the immutable block (§2).

## 4. Marcos plausíveis da década · Plausible milestones of the decade
**PT** — Marcos são **direção, não promessa de data** (§ não há cronograma aqui — datas são do `ROADMAP`, e mesmo lá não se prometem). Em ordem plausível de maturação:

- **Fundação congelada — `v1.0.0` dos tokens.** O primeiro contrato estável que um consumidor pode declarar (encontra-se com a Fase 2 do `ROADMAP`). É o marco que abre a década "para valer".
- **Biblioteca de componentes Desktop e Mobile completa.** Os dois produtos irmãos com seus catálogos maduros, cada componente sob os mesmos tokens e a mesma gramática, projetados do zero por produto (Fases 3–4).
- **Plataforma completa.** As cinco camadas maduras (`PLATFORM`): fundação, ferramentas (CLI/DevTools/Playground), qualidade (Linter/Compliance/Certification), geração (Generator/Templates/Exporters) e ecossistema de IA — um sistema novo nasce já conforme e é validado continuamente.
- **Ecossistema de IA maduro.** IAs que constroem, auditam e certificam telas de forma confiável a partir da documentação como contexto, com auto-auditoria pela Certification.
- **Adoção por todos os sistemas da empresa.** Aquapark, IA Studio, ERPs, CRMs, Portais — cada um declarando uma dependência de versão do Studio UX (`VERSIONING`), nunca recriando fundamentos nem editando o framework por dentro.
- **Ecossistema aberto — possível biblioteca da comunidade / marketplace de templates.** Um estágio maduro em que templates e extensões podem ser compartilhados sob a mesma governança (SSOT, Certification, SemVer). É uma *possibilidade* de longo prazo, não um compromisso.

**PT** — Nenhum marco tem data cravada. A ordem e os critérios de saída de cada fase são do `ROADMAP`; aqui fica só a silhueta da década.

**EN** — Milestones are **direction, not a date promise** (there is no schedule here — dates belong to the `ROADMAP`, and even there they are not promised). In a plausible order of maturation: **frozen foundation — tokens `v1.0.0`** (the first stable contract a consumer can declare; meets Phase 2 — the milestone that truly opens the decade); **complete Desktop and Mobile component libraries** (the two sibling products with mature catalogs, each component under the same tokens and grammar, designed from scratch per product — Phases 3–4); **complete platform** (the five mature layers — foundation, tools, quality, generation, AI ecosystem — where a new system is born compliant and validated continuously); **mature AI ecosystem** (AIs that build, audit and certify screens reliably from the documentation as context); **adoption by all company systems** (each declaring a Studio UX version dependency, never recreating fundamentals); **open ecosystem — a possible community library / template marketplace** (a mature stage where templates and extensions may be shared under the same governance — a long-term *possibility*, not a commitment). No milestone has a fixed date; order and exit criteria belong to the `ROADMAP` — here lives only the decade's silhouette.

## 5. Produtos que podem nascer · Products that may be born
**PT** — A década pode gerar produtos novos **desde que nasçam dentro da especificação, não contra ela**:

- **Novos arquétipos de tela.** Além dos atuais (Dashboard, DataTable, CRUD, Login, Wizard…), novos arquétipos podem entrar por MINOR conforme padrões de negócio se firmem — sempre montados com componentes e gramática oficiais.
- **Novos exporters conforme a tecnologia mude.** Cada vez que uma nova tecnologia-alvo se tornar relevante, um novo exporter a atende, traduzindo a mesma especificação; alvos obsoletos se aposentam por depreciação. A especificação nunca muda para caber num exporter — é o exporter que se molda a ela.
- **Um runtime novo se o front-end mudar de paradigma.** Se o modo de construir interfaces mudar radicalmente na década (um novo paradigma de renderização, de entrada, de dispositivo), o Studio UX pode ganhar um *runtime* novo — **sem quebrar a Specification**. O runtime é a camada de execução (separada da especificação em `RUNTIME`); trocá-lo é trocar tradução, não identidade.

**PT** — A pergunta-filtro para qualquer produto novo da década: *ele instancia a especificação existente, ou pede para mudá-la?* Se instancia, entra por MINOR. Se pede para mudá-la, passa por RFC + ADR antes de qualquer coisa.

**EN** — The decade may generate new products **provided they are born within the specification, not against it**: **new screen archetypes** (beyond today's, entering via MINOR as business patterns settle, always assembled from official components and grammar); **new exporters as technology changes** (each new relevant target gets an exporter translating the same specification; obsolete targets retire by deprecation — the specification never changes to fit an exporter, the exporter molds to it); **a new runtime if front-end changes paradigm** (if building interfaces changes radically over the decade, Studio UX may gain a new *runtime* — **without breaking the Specification**; the runtime is the execution layer, separate from the specification in `RUNTIME`; swapping it swaps translation, not identity). The filter question for any new decade product: *does it instantiate the existing specification, or does it ask to change it?* If it instantiates, it enters via MINOR. If it asks to change it, it goes through RFC + ADR first.

## 6. Datas não são prometidas · Dates are not promised
**PT** — Este documento promete **direção e invariantes, nunca datas.** O Studio UX é um produto versionado, não um projeto com prazo (`ROADMAP` §0): evolui por fases com Definição de Pronto, uma frente por vez, com validação humana entre frentes (Art. 15). A verdade do estado atual mora sempre no git, no CHANGELOG e nos arquivos, nunca na memória nem numa previsão (Art. 5). Um marco só "existe" quando sua fase conclui e é documentado — antes disso é rumo, não fato.
**EN** — This document promises **direction and invariants, never dates.** Studio UX is a versioned product, not a deadline project (`ROADMAP` §0): it evolves through phases with a Definition of Done, one front at a time, with human validation between fronts (Art. 15). The truth of the current state always lives in git, the CHANGELOG and the files, never in memory or a forecast (Art. 5). A milestone only "exists" when its phase completes and is documented — before that it is direction, not fact.

---

## Responsabilidades · Responsibilities
**PT** — Ser a visão narrativa de década: declarar os invariantes de longo prazo (ancorados na `CONSTITUTION`), o que pode evoluir, os marcos plausíveis e os produtos que podem nascer, expandindo o princípio §13 num horizonte de dez anos.
**EN** — Be the decade-long narrative vision: declare the long-term invariants (anchored in the `CONSTITUTION`), what may evolve, the plausible milestones and the products that may be born, expanding principle §13 into a ten-year horizon.

## Não-responsabilidades · Non-responsibilities
**PT** — Não define as fases versionadas nem suas Definições de Pronto (é `ROADMAP`); não cria nem altera artigos imutáveis (é `CONSTITUTION`, via emenda); não define a mecânica de versão/depreciação (é `VERSIONING`); não promete datas; não decide valores estéticos concretos (Fase 2, `DESIGN_TOKENS`).
**EN** — It does not define the versioned phases or their Definitions of Done (`ROADMAP`); it does not create or alter immutable articles (`CONSTITUTION`, via amendment); it does not define version/deprecation mechanics (`VERSIONING`); it does not promise dates; it does not decide concrete aesthetic values (Phase 2, `DESIGN_TOKENS`).

## Integrações e dependências · Integrations and dependencies
**PT** — Complementa o `ROADMAP` (curto/médio prazo) e expande o `STUDIO_UX.md` §13. Ancora cada invariante na `CONSTITUTION` (Art. 1–20). Aponta para `PLATFORM` (as cinco camadas), `RUNTIME` (especificação × execução) e `VERSIONING` (como a evolução entra sem trauma). Toda mudança de rumo estrutural que ele descreva passa por RFC + ADR.
**EN** — Complements the `ROADMAP` (short/mid-term) and expands `STUDIO_UX.md` §13. Anchors each invariant in the `CONSTITUTION` (Art. 1–20). Points to `PLATFORM` (the five layers), `RUNTIME` (specification × execution) and `VERSIONING` (how evolution enters without trauma). Any structural course change it describes goes through RFC + ADR.

## Fluxos · Flows
**PT** — Fluxo de invariante (uma decisão grande é filtrada primeiro pela `CONSTITUTION`: fere um artigo? então a proposta está errada). Fluxo de evolução (é pele/ferramenta/tradução? entra por MINOR/nova geração; é especificação/identidade? exige RFC + ADR). Fluxo de novo produto (instancia a especificação → MINOR; pede para mudá-la → RFC + ADR).
**EN** — Invariant flow (a large decision is first filtered by the `CONSTITUTION`: does it break an article? then the proposal is wrong). Evolution flow (is it skin/tool/translation? enters via MINOR/new generation; is it specification/identity? requires RFC + ADR). New-product flow (instantiates the specification → MINOR; asks to change it → RFC + ADR).

## Boas práticas · Best practices
**PT** — Cite o invariante (Art. N) ao recusar uma "modernização" que o feriria. Trate exporters, ferramentas e IA como descartáveis por design — planeje para substituí-los sem dó. Ao adotar uma tecnologia nova, escreva-a como tradutor da especificação, nunca como dona dela. Prefira MINOR aditivo; reserve RFC + ADR para o que muda a fundação.
**EN** — Cite the invariant (Art. N) when refusing a "modernization" that would breach it. Treat exporters, tools and AI as disposable by design — plan to replace them without regret. When adopting a new technology, write it as a translator of the specification, never as its owner. Prefer additive MINOR; reserve RFC + ADR for what changes the foundation.

## Anti-padrões · Anti-patterns
**PT / EN**
- Reescrever a fundação por moda tecnológica (viola Art. 12, 13). / Rewriting the foundation for a technology trend.
- Prometer datas (o produto é versionado, não um projeto com prazo). / Promising dates.
- Deixar a tecnologia contaminar a especificação (uma regra que só faz sentido dentro de um framework — §13). / Letting technology contaminate the specification.
- Tratar um exporter, ferramenta ou integração de IA como permanente (são descartáveis por design). / Treating an exporter, tool or AI integration as permanent.
- Introduzir um "produto novo" que exige mudar a especificação sem passar por RFC + ADR. / Introducing a "new product" that requires changing the specification without RFC + ADR.
- Confundir marco (direção) com compromisso de data (fato). / Confusing a milestone (direction) with a date commitment (fact).

## Roadmap
**PT** — Esta visão é revisada quando um marco se materializa (uma fase conclui) ou quando um RFC aprovado muda o rumo de longo prazo — sempre nas duas línguas, na mesma leva (§9). Ela nunca "expira": à medida que a década avança, os marcos cumpridos passam a fato (registrados no `ROADMAP`/CHANGELOG) e novos horizontes entram. Os invariantes (§2), por definição, não se revisam por aqui — só por emenda constitucional.
**EN** — This vision is revised when a milestone materializes (a phase completes) or when an approved RFC changes the long-term course — always in both languages, in the same commit (§9). It never "expires": as the decade advances, fulfilled milestones become fact (recorded in the `ROADMAP`/CHANGELOG) and new horizons enter. The invariants (§2), by definition, are not revised here — only by constitutional amendment.

## Referências internas · Internal references
`STUDIO_UX.md` §13 · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 1–20) · `STUDIO_UX_ROADMAP.md` · `platform/STUDIO_UX_PLATFORM.md` · `platform/STUDIO_UX_ARCHITECTURE.md` · `governance/STUDIO_UX_VERSIONING.md` · `governance/STUDIO_UX_ADR_GUIDE.md` · `governance/STUDIO_UX_RFC_GUIDE.md` · `STUDIO_UX_VISUAL_DNA.md`

---

*Documento vivo. Visão de década — direção e invariantes, nunca datas; as fases são do ROADMAP, as verdades da CONSTITUTION. · Living document. Decade vision — direction and invariants, never dates; phases belong to the ROADMAP, truths to the CONSTITUTION.*
