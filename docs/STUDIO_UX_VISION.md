# STUDIO_UX_VISION.md — Visão · Vision

> Documento normativo vivo. Responde a uma pergunta: **o que é o Studio UX e por que ele existe?**
> Living normative document. Answers one question: **what is Studio UX and why does it exist?**
> Referência de governança: `STUDIO_UX.md`. · Governance reference: `STUDIO_UX.md`.

---

## 1. O problema · The problem

**PT** — Toda empresa que constrói vários sistemas ao longo dos anos enfrenta a mesma erosão: cada produto nasce com uma interface um pouco diferente, cada desenvolvedor resolve o mesmo problema (uma tabela, um formulário, um estado vazio) de um jeito ligeiramente próprio, e cada IA que gera tela inventa um padrão novo. O resultado é um ecossistema que **parece feito por dez empresas diferentes**. O custo não é estético: é cognitivo (o usuário reaprende cada tela), é de manutenção (nada é reaproveitável), e é de confiança (inconsistência lê-se como amadorismo).

**EN** — Every company that builds several systems over the years faces the same erosion: each product ships with a slightly different interface, each developer solves the same problem (a table, a form, an empty state) in a slightly personal way, and each AI that generates a screen invents a new pattern. The result is an ecosystem that **looks like it was made by ten different companies**. The cost is not aesthetic: it is cognitive (users relearn every screen), maintenance (nothing is reusable), and trust (inconsistency reads as amateurism).

**PT** — O IA Studio provou internamente que a cura para isso é ter **um documento que define toda a visão antes de qualquer implementação**. Foi o que fez o projeto dar certo. O Studio UX aplica exatamente essa lição ao problema da experiência do usuário — mas como um produto próprio, para servir *todos* os sistemas, não apenas um.

**EN** — IA Studio proved internally that the cure is to have **one document defining the whole vision before any implementation**. That is what made the project succeed. Studio UX applies exactly that lesson to the user-experience problem — but as its own product, serving *all* systems, not just one.

---

## 2. A visão · The vision

**PT** — Studio UX é o **sistema nervoso visual e experiencial** da empresa: uma fonte única de identidade, princípios, design tokens, componentes e padrões, sobre a qual qualquer sistema — presente ou futuro, feito por humano ou por IA — constrói interfaces que parecem membros da mesma família, sem esforço e sem exceção.

**EN** — Studio UX is the company's **visual and experiential nervous system**: a single source of identity, principles, design tokens, components and patterns, on which any system — present or future, built by human or AI — constructs interfaces that look like members of the same family, effortlessly and without exception.

**PT** — A ambição de referência é explícita: o Studio UX deve ter o rigor e a longevidade de um Material Design, Carbon, Polaris, Ant Design ou shadcn/ui — mas com **identidade própria**. As referências são estudadas por seus princípios de organização e experiência; nunca copiadas em layout, código ou identidade visual (ver `research/REFERENCES.md`).

**EN** — The reference ambition is explicit: Studio UX must have the rigor and longevity of a Material Design, Carbon, Polaris, Ant Design or shadcn/ui — but with **its own identity**. References are studied for their organization and experience principles; never copied in layout, code or visual identity (see `research/REFERENCES.md`).

---

## 3. O que o Studio UX É e NÃO é · What Studio UX IS and IS NOT

| É · IS | Não é · IS NOT |
|---|---|
| Um produto versionado, com roadmap e governança. / A versioned product with roadmap and governance. | Um template ou um tema. / A template or a theme. |
| Dono da **experiência** (identidade, componentes, padrões). / Owner of the **experience**. | Dono de dado ou tela de negócio. / Owner of business data or screens. |
| Dois produtos irmãos (Desktop + Mobile). / Two sibling products (Desktop + Mobile). | Um layout responsivo único. / A single responsive layout. |
| Agnóstico de domínio. / Domain-agnostic. | Acoplado a ISP, ERP, e-commerce… / Coupled to a vertical. |
| Base para humanos **e** IAs construírem telas. / A base for humans **and** AIs to build screens. | Documentação escrita só para designers. / Docs written for designers only. |

---

## 4. Por que dois produtos, não um responsivo · Why two products, not one responsive

**PT** — Produtividade em desktop e experiência nativa em mobile são **objetivos diferentes**, não tamanhos diferentes da mesma tela. O desktop otimiza densidade, atalhos de teclado, múltiplas colunas, tabelas ricas e trabalho prolongado. O mobile otimiza alcance do polegar, gestos, foco em uma tarefa por vez, tolerância a conexão instável e uso em movimento. Espremer um desktop numa tela de 375px com media queries produz o pior dos dois mundos. Por isso Desktop e Mobile são **projetados do zero, separadamente**, unidos apenas pela identidade, princípios e tokens compartilhados.

**EN** — Desktop productivity and mobile native experience are **different goals**, not different sizes of the same screen. Desktop optimizes density, keyboard shortcuts, multiple columns, rich tables and prolonged work. Mobile optimizes thumb reach, gestures, one-task-at-a-time focus, tolerance for flaky connectivity and on-the-go use. Squeezing a desktop into a 375px screen with media queries produces the worst of both worlds. That is why Desktop and Mobile are **designed from scratch, separately**, united only by shared identity, principles and tokens.

---

## 5. A dupla audiência: humanos e IAs · The dual audience: humans and AIs

**PT** — Um objetivo central e distintivo do Studio UX é servir de **contexto para Inteligências Artificiais**. Claude Code, ChatGPT ou qualquer IA deve conseguir ler esta documentação e construir uma tela nova que já nasce consistente — sabendo por que cada regra existe, quando aplicá-la, quando não, e quais anti-padrões evitar. Por isso a documentação nunca é uma lista seca: ela é escrita como um bom manual de engenharia, explicando o raciocínio. Ver `context/STUDIO_UX_AI_CONTEXT.md`.

**EN** — A central, distinctive goal of Studio UX is to serve as **context for Artificial Intelligences**. Claude Code, ChatGPT or any AI should be able to read this documentation and build a new screen that is born consistent — knowing why each rule exists, when to apply it, when not to, and which anti-patterns to avoid. That is why the documentation is never a dry list: it is written like a good engineering manual, explaining the reasoning. See `context/STUDIO_UX_AI_CONTEXT.md`.

---

## 6. Critérios de sucesso · Success criteria

**PT** — O Studio UX terá cumprido sua visão quando:

1. Uma pessoa nova (ou uma IA) consegue construir uma tela correta lendo só a documentação, sem "adivinhar".
2. Duas telas feitas por autores diferentes, em sistemas diferentes, são indistinguíveis quanto à família visual.
3. Nenhuma tela nova precisa inventar um espaçamento, uma cor ou um padrão — tudo já tem token e componente.
4. Uma atualização de versão do framework propaga melhorias a todos os sistemas consumidores de forma previsível.
5. Um novo sistema adota o Studio UX declarando uma dependência, não recriando fundamentos.

**EN** — Studio UX will have fulfilled its vision when: (1) a newcomer (or an AI) can build a correct screen from the docs alone, without guessing; (2) two screens by different authors in different systems are indistinguishable in visual family; (3) no new screen needs to invent a spacing, color or pattern — everything already has a token and component; (4) a framework version update propagates improvements to all consumers predictably; (5) a new system adopts Studio UX by declaring a dependency, not by recreating fundamentals.

---

## 7. Horizonte · Horizon

**PT** — O Studio UX é feito para durar anos e evoluir por versões, nunca por reescrita. A Fase 1 (esta) entrega a fundação conceitual e documental. As fases seguintes materializam tokens, componentes, playground e exemplos — sempre a partir do que já está documentado aqui. Ver `STUDIO_UX_ROADMAP.md`.

**EN** — Studio UX is built to last years and evolve through versions, never through rewrites. Phase 1 (this one) delivers the conceptual and documentation foundation. Subsequent phases materialize tokens, components, playground and examples — always starting from what is already documented here. See `STUDIO_UX_ROADMAP.md`.

---

*Documento vivo. Atualizar junto com mudanças de visão. · Living document. Update alongside vision changes.*
