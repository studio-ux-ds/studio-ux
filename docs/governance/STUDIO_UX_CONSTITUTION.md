# STUDIO_UX_CONSTITUTION.md — Constituição · Constitution

> Documento normativo vivo, porém **quase imutável**. Responde a: **quais são as verdades supremas e inegociáveis do Studio UX, das quais tudo o mais deriva?**
> Living normative document, yet **near-immutable**. Answers: **what are the supreme, non-negotiable truths of Studio UX, from which everything else derives?**
> Governança: `STUDIO_UX.md`. Os artigos abaixo estão ACIMA de qualquer outro documento; princípios (P#), tokens e componentes derivam deles, nunca o contrário.

```
Architecture Boundary Check — STUDIO_UX_CONSTITUTION
Resolve · Solves:            fixar as verdades supremas e imutáveis do produto — o topo do qual todo o resto deriva.
                             / fixing the product's supreme, immutable truths — the top from which all else derives.
Não pertence a outro porque · Not elsewhere because:
                             STUDIO_UX.md é governança operacional (muda por versão); PRINCIPLES são regras testáveis
                             (crescem). Faltava a camada curta e estável que NÃO muda com versões.
                             / STUDIO_UX.md is operational governance (changes per version); PRINCIPLES are testable
                             rules (they grow). The missing layer is the short, stable one that does NOT change with versions.
Complementa · Complements:   STUDIO_UX.md, PRINCIPLES, VISION, PHILOSOPHY.
Nunca substitui · Never replaces: PRINCIPLES (regras operacionais), STUDIO_UX.md (mecânica de governança), nem os donos de domínio.
Dono · Owner:                este doc, para o domínio "verdades constitucionais".
                             / this doc, for the "constitutional truths" domain.
```

---

## Objetivo · Objective
**PT** — Declarar, no menor número de artigos possível, as verdades que definem o Studio UX e que **não mudam com versões**. Enquanto princípios crescem e a governança se ajusta, a Constituição permanece. Ela é a régua final: se um documento, decisão ou implementação a contraria, o documento/decisão/implementação está errado.
**EN** — Declare, in the fewest possible articles, the truths that define Studio UX and that **do not change with versions**. While principles grow and governance adjusts, the Constitution remains. It is the final ruler: if a document, decision or implementation contradicts it, the document/decision/implementation is wrong.

## Escopo · Scope
**PT** — Todo o ecossistema Studio UX — fundação, plataforma, ferramentas, geração, IA, e todo sistema consumidor. **Não** entra em detalhe operacional (isso é dos donos de domínio); entra só no que é permanente.
**EN** — The entire Studio UX ecosystem — foundation, platform, tools, generation, AI, and every consuming system. It does **not** go into operational detail (that belongs to domain owners); only into what is permanent.

---

## Os Artigos · The Articles

> **PT** — Cada artigo é curto e absoluto. A referência entre parênteses aponta ao dono que o detalha (a Constituição nunca duplica o detalhe — SSOT). **EN** — Each article is short and absolute. The parenthetical reference points to the owner that details it (the Constitution never duplicates detail — SSOT).

**Art. 1** — O Studio UX é um **produto independente**, versionado e governado — nunca um template, tema ou biblioteca acessória. *(`STUDIO_UX.md`, `STUDIO_UX_PLATFORM.md`)* / Studio UX is an **independent product**, versioned and governed — never a template, theme or accessory library.

**Art. 2** — **Desktop e Mobile são produtos distintos**, projetados do zero, que compartilham identidade, princípios e tokens — nunca layouts. *(P4, `DESKTOP`, `MOBILE`)* / **Desktop and Mobile are distinct products**, designed from scratch, sharing identity, principles and tokens — never layouts.

**Art. 3** — **Todo valor visual nasce de um token.** Não existe valor literal em tela. *(P1, P7, `DESIGN_TOKENS`)* / **Every visual value is born from a token.** No literal value exists in a screen.

**Art. 4** — **Nenhum componente existe fora da biblioteca oficial.** O que ela não cobre é pedido de componente, não improviso. *(P2, P3, `COMPONENT_LIBRARY`)* / **No component exists outside the official library.**

**Art. 5** — **A documentação é a fonte da verdade.** A verdade mora no git e nos arquivos, nunca na memória. *(`STUDIO_UX.md` §9, `HANDOFF`)* / **Documentation is the source of truth.**

**Art. 6** — **A interface nunca chama mais atenção que os dados.** *(`PHILOSOPHY`, `VISUAL_DNA`)* / **The interface never draws more attention than the data.**

**Art. 7** — **A tela fala a língua do usuário, nunca a do desenvolvedor.** *(P11)* / **The screen speaks the user's language, never the developer's.**

**Art. 8** — **Consistência vence criatividade pontual.** Nada pode parecer fora da família. *(P20)* / **Consistency beats one-off creativity.**

**Art. 9** — **Acessibilidade é propriedade da fundação, não remendo.** A meta mínima (WCAG AA) é inviolável em qualquer tema. *(P17–P19, `ACCESSIBILITY`)* / **Accessibility is a property of the foundation, not a patch.**

**Art. 10** — **Cada domínio tem um, e só um, documento dono (SSOT).** Os demais referenciam; nunca duplicam. *(`STUDIO_UX.md` §11)* / **Each domain has one, and only one, owner document (SSOT).**

**Art. 11** — **Os princípios têm números imutáveis.** Um princípio se aposenta como DEPRECATED; jamais se renumera. *(`PRINCIPLES`)* / **Principles have immutable numbers.**

**Art. 12** — **A arquitetura precede a estética.** Estrutura e regras primeiro; valores estéticos depois, na fase própria. *(`STUDIO_UX.md` §3.6, `ROADMAP`)* / **Architecture precedes aesthetics.**

**Art. 13** — **Os princípios são permanentes; a tecnologia é descartável.** Nada normativo depende de framework, linguagem ou moda. *(`STUDIO_UX.md` §13)* / **Principles are permanent; technology is disposable.**

**Art. 14** — **Toda mudança é versionada (SemVer) e imutável na tag.** Tag nunca se reusa; a próxima versão é sempre nova. *(`VERSIONING`, `STUDIO_UX.md` §7)* / **Every change is versioned (SemVer) and tag-immutable.**

**Art. 15** — **Uma frente por vez, com validação humana entre frentes.** Nada de empilhar mudanças estruturais. *(`ROADMAP`)* / **One front at a time, with human validation between fronts.**

**Art. 16** — **Decisões arquiteturais relevantes viram ADR; propostas de mudança viram RFC.** Nada estrutural muda em silêncio. *(`ADR_GUIDE`, `RFC_GUIDE`)* / **Notable architectural decisions become an ADR; change proposals become an RFC.**

**Art. 17** — **Documentação viva, sem lixo.** A doc descreve o que existe hoje; o histórico mora no CHANGELOG. *(`STUDIO_UX.md` §9)* / **Living docs, no dead weight.**

**Art. 18** — **Toda documentação normativa é bilíngue (PT-BR + EN), lado a lado.** Identificadores de código sempre em inglês. *(`STUDIO_UX.md` §1)* / **All normative documentation is bilingual, side by side.**

**Art. 19** — **O Studio UX nunca é dono de dado de negócio.** Ele é dono da experiência; o sistema consumidor traz o conteúdo. *(`VISION`, `PLATFORM`)* / **Studio UX never owns business data.** It owns the experience.

**Art. 20** — **Na dúvida, não se inventa: propõe-se e aguarda-se aprovação.** *(`AI_RULES`, `STUDIO_UX.md` §12)* / **When in doubt, do not invent: propose and await approval.**

---

## Não-responsabilidades · Non-responsibilities
**PT** — A Constituição não detalha *como* cada verdade se cumpre — isso é do dono citado. Ela não lista regras testáveis (isso é `PRINCIPLES`), nem mecânica de versão (é `VERSIONING`), nem processo de decisão (é `ADR_GUIDE`/`RFC_GUIDE`).
**EN** — The Constitution does not detail *how* each truth is fulfilled — that belongs to the cited owner. It does not list testable rules (`PRINCIPLES`), version mechanics (`VERSIONING`), or decision process (`ADR_GUIDE`/`RFC_GUIDE`).

## Integrações e dependências · Integrations and dependencies
**PT** — Todos os documentos do ecossistema dependem desta Constituição e não podem contradizê-la. Ela depende, para detalhe, dos donos citados em cada artigo. É o topo do grafo de dependências documentais.
**EN** — Every ecosystem document depends on this Constitution and cannot contradict it. It depends, for detail, on the owners cited in each article. It is the top of the documentation dependency graph.

## Fluxo de emenda · Amendment flow
**PT** — Emendar a Constituição é raríssimo e exige o caminho mais pesado: um **RFC** (`RFC_GUIDE`) aprovado por decisão humana explícita + um **ADR** (`ADR_GUIDE`) que registra a mudança + entrada no CHANGELOG como evento notável. Nunca se emenda de passagem. Adicionar um artigo usa o próximo número livre; aposentar marca como `REVOGADO`/`REPEALED` com a versão — **nunca se renumeram os artigos** (mesma regra dos princípios).
**EN** — Amending the Constitution is extremely rare and requires the heaviest path: an approved **RFC** (`RFC_GUIDE`) by explicit human decision + an **ADR** (`ADR_GUIDE`) recording the change + a CHANGELOG entry as a notable event. It is never amended in passing. Adding an article uses the next free number; retiring marks it `REPEALED` with the version — **articles are never renumbered**.

## Boas práticas · Best practices
**PT** — Cite o artigo por número ao justificar uma decisão de alto nível ("viola Art. 2"). Use a Constituição como primeiro filtro de qualquer proposta grande. Mantenha-a curta: se um artigo novo é detalhe operacional, ele não é constitucional — vira princípio ou regra do dono.
**EN** — Cite the article by number when justifying a high-level decision ("violates Art. 2"). Use the Constitution as the first filter for any large proposal. Keep it short: if a new article is operational detail, it isn't constitutional — it becomes a principle or an owner's rule.

## Anti-padrões · Anti-patterns
**PT / EN**
- Duplicar aqui o detalhe que mora num dono (viola SSOT). / Duplicating here detail that lives in an owner.
- Emendar de passagem, sem RFC + ADR. / Amending in passing, without RFC + ADR.
- Inchar a Constituição com regras operacionais. / Bloating the Constitution with operational rules.
- Renumerar artigos. / Renumbering articles.

## Roadmap
**PT** — A Constituição tende à estabilidade máxima. Mudanças previstas são apenas emendas raras via o fluxo acima. Nenhuma fase futura a "reescreve".
**EN** — The Constitution trends toward maximum stability. Foreseen changes are only rare amendments via the flow above. No future phase "rewrites" it.

## Referências internas · Internal references
`STUDIO_UX.md` · `STUDIO_UX_PRINCIPLES.md` · `STUDIO_UX_VISION.md` · `STUDIO_UX_PHILOSOPHY.md` · `governance/STUDIO_UX_VERSIONING.md` · `governance/STUDIO_UX_ADR_GUIDE.md` · `governance/STUDIO_UX_RFC_GUIDE.md` · `platform/STUDIO_UX_PLATFORM.md`

---

*Documento vivo mas quase imutável. Emenda só por RFC + ADR + CHANGELOG; artigos nunca são renumerados. · Living but near-immutable. Amendment only via RFC + ADR + CHANGELOG; articles are never renumbered.*
