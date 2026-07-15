# REFERENCES.md — Estudo de referências · Reference study

> Documento normativo vivo. Responde a uma pergunta: **quais produtos estudamos por seus princípios de experiência, o que absorvemos de cada um e o que rejeitamos — sem nunca copiar?**
> Living normative document. Answers one question: **which products do we study for their experience principles, what do we absorb from each and what do we reject — without ever copying?**
> Governança: `STUDIO_UX.md`. Visão: `STUDIO_UX_VISION.md`.

---

## 0. Regra de ferro — princípios, nunca cópia · Iron rule — principles, never copy

**PT** — **Leia isto antes de tudo.** As referências abaixo são estudadas **exclusivamente para absorver princípios de experiência e organização** — como pensam a velocidade, a densidade, a calma, a hierarquia, a composição. É **PROIBIDO copiar** delas layout, código, componentes ou identidade visual. O Studio UX tem **identidade própria** (`STUDIO_UX_VISION.md`): as cores, as formas, a tipografia e a marca são nossas, decididas na Fase 2 a partir da nossa arquitetura, não retiradas de nenhum destes produtos. Uma tela do Studio UX que "pareça um Linear" ou "pareça um Stripe" falhou — o objetivo é parecer **Studio UX**. Estudar o princípio é legítimo; espelhar o produto é violação (reforçado em `context/STUDIO_UX_AI_CONTEXT.md` §5).

**EN** — **Read this first.** The references below are studied **exclusively to absorb experience and organization principles** — how they think about speed, density, calm, hierarchy, composition. It is **FORBIDDEN to copy** their layout, code, components or visual identity. Studio UX has **its own identity** (`STUDIO_UX_VISION.md`): the colors, shapes, typography and brand are ours, decided in Phase 2 from our architecture, not lifted from any of these products. A Studio UX screen that "looks like Linear" or "looks like Stripe" has failed — the goal is to look like **Studio UX**. Studying the principle is legitimate; mirroring the product is a violation (reinforced in `context/STUDIO_UX_AI_CONTEXT.md` §5).

**PT** — *Nota de método:* este estudo parte do conhecimento consolidado destes produtos (seus princípios gerais e reputação de design), não de capturas de tela específicas. Não copiamos telas; extraímos ideias.

**EN** — *Method note:* this study draws on the consolidated knowledge of these products (their general principles and design reputation), not on specific screenshots. We copy no screens; we extract ideas.

---

## 1. As referências, uma a uma · The references, one by one

### Flux Dashboard — `flux.dashboardpack.com`

**PT** — *Absorve-se:* a organização de um **shell de dashboard administrativo** completo — como Sidebar, TopBar e área de conteúdo convivem, e como um kit de telas administrativas se mantém coerente entre muitas páginas. É uma boa aula de **arquitetura de shell** para o produto Desktop. *Rejeita-se:* a densidade de "template de venda" — muitos widgets decorativos, gradientes e enfeites que competem com o dado (viola a regra de ouro §3.1 e P8). Pegamos a estrutura, descartamos a ornamentação.

**EN** — *Absorb:* the organization of a complete **admin dashboard shell** — how Sidebar, TopBar and content area coexist, and how an admin screen kit stays coherent across many pages. A good lesson in **shell architecture** for the Desktop product. *Reject:* the "sales template" density — many decorative widgets, gradients and adornments competing with the data (violates golden rule §3.1 and P8). We take the structure, discard the ornamentation.

### Zenith Dashboard — `zenith-shadcn.dashboardpack.com`

**PT** — *Absorve-se:* a demonstração de que uma **base neutra e composável (shadcn)** rende dashboards limpos e consistentes; o valor de partir de primitivos sóbrios em vez de um tema pesado. Reforça a nossa aposta em **neutralidade e composição**. *Rejeita-se:* tratar o kit como pronto-para-vestir — herdar as escolhas visuais de outro em vez de decidir as nossas (Fase 2). A lição é o método (composição neutra), não a aparência.

**EN** — *Absorb:* the demonstration that a **neutral, composable base (shadcn)** yields clean, consistent dashboards; the value of starting from sober primitives instead of a heavy theme. It reinforces our bet on **neutrality and composition**. *Reject:* treating the kit as ready-to-wear — inheriting another's visual choices instead of deciding ours (Phase 2). The lesson is the method (neutral composition), not the appearance.

### shadcn/ui

**PT** — *Absorve-se:* a **arquitetura de composição** e a **neutralidade** — componentes como primitivos combináveis, sem opinião estética imposta, que o consumidor veste com seus tokens. É próximo do nosso modelo (framework dá a forma; o sistema dá o conteúdo — `STUDIO_UX.md` §2) e da nossa disciplina de tokens (P1). *Rejeita-se:* a filosofia "copie o código para dentro do seu projeto" — no Studio UX o framework é **consumido por versão declarada**, nunca copiado e editado por dentro (§7). Absorvemos a composição; rejeitamos o modelo de propriedade do código.

**EN** — *Absorb:* the **composition architecture** and the **neutrality** — components as combinable primitives, with no imposed aesthetic opinion, that the consumer dresses with their tokens. It is close to our model (framework gives the form; the system gives the content — `STUDIO_UX.md` §2) and to our token discipline (P1). *Reject:* the "copy the code into your project" philosophy — in Studio UX the framework is **consumed by a declared version**, never copied and edited internally (§7). We absorb the composition; we reject the code-ownership model.

### Linear

**PT** — *Absorve-se:* a **velocidade percebida** e o **teclado-primeiro** — a Command Palette, os atalhos onipresentes, a sensação de que o app responde no instante (alimenta o §5 do Desktop e P16, P19). Também a **contenção**: pouca cor, foco no trabalho. *Rejeita-se:* a estética muito específica e a densidade extrema calibrada para um público de engenharia — não é a nossa identidade nem o nosso único público. Pegamos o *comportamento* (rapidez, teclado), não o *visual*.

**EN** — *Absorb:* the **perceived speed** and **keyboard-first** approach — the Command Palette, omnipresent shortcuts, the sense that the app responds instantly (feeds Desktop §5 and P16, P19). Also the **restraint**: little color, focus on the work. *Reject:* the very specific aesthetic and extreme density calibrated for an engineering audience — not our identity nor our sole audience. We take the *behavior* (speed, keyboard), not the *look*.

### GitHub

**PT** — *Absorve-se:* a maturidade de **navegar densidade sem se perder** — hierarquia clara em telas cheias de dados, breadcrumbs e navegação secundária que orientam em estruturas profundas (alimenta o Breadcrumb e o master–detail do Desktop, P6, P22). *Rejeita-se:* o peso acumulado de anos de recursos empilhados — regiões que competem, densidade que às vezes vira ruído. Absorvemos a orientação em profundidade; rejeitamos o acúmulo.

**EN** — *Absorb:* the maturity of **navigating density without getting lost** — clear hierarchy on data-heavy screens, breadcrumbs and secondary navigation that orient in deep structures (feeds the Desktop Breadcrumb and master–detail, P6, P22). *Reject:* the accumulated weight of years of stacked features — competing regions, density that sometimes becomes noise. We absorb the depth orientation; we reject the accumulation.

### Stripe Dashboard

**PT** — *Absorve-se:* a **clareza de dados densos** e a **hierarquia impecável** — como Stripe apresenta números, tabelas e estados financeiros complexos de forma legível, com tipografia e espaço fazendo o trabalho pesado (alimenta a DataTable, o Analytics e os Relatórios do Desktop; P5, P6, P8). É a referência-mestra de "muito dado, zero confusão". *Rejeita-se:* copiar a paleta e a linguagem visual reconhecíveis da marca Stripe — a nossa cor e forma são decididas por nós. Absorvemos a *clareza*; rejeitamos a *pele*.

**EN** — *Absorb:* the **clarity of dense data** and the **impeccable hierarchy** — how Stripe presents complex numbers, tables and financial states legibly, with typography and space doing the heavy lifting (feeds the Desktop DataTable, Analytics and Reports; P5, P6, P8). It is the master reference for "lots of data, zero confusion". *Reject:* copying Stripe's recognizable brand palette and visual language — our color and shape are decided by us. We absorb the *clarity*; we reject the *skin*.

### Vercel Dashboard

**PT** — *Absorve-se:* o **minimalismo funcional** e o domínio do **modo escuro** — interfaces sóbrias, monocromáticas, onde o pouco que aparece tem função, e o dark theme é de primeira classe (alimenta a nossa disciplina de poucas cores/sombras P8, P9 e a arquitetura de temas). *Rejeita-se:* o risco do minimalismo virar frieza ou esconder affordances — clareza vem antes de elegância (ordem de precedência dos princípios). Absorvemos a sobriedade; rejeitamos a frieza.

**EN** — *Absorb:* the **functional minimalism** and mastery of **dark mode** — sober, monochromatic interfaces where the little that appears has a function, and the dark theme is first-class (feeds our few-colors/few-shadows discipline P8, P9 and the theme architecture). *Reject:* the risk of minimalism becoming coldness or hiding affordances — clarity comes before elegance (the principles' precedence order). We absorb the sobriety; we reject the coldness.

### Notion

**PT** — *Absorve-se:* a **calma e o espaço** — respiro generoso, tipografia legível, uma interface que não grita e deixa o conteúdo respirar (alimenta P5 — espaço como ferramenta primária de hierarquia — e a regra de ouro de a interface não competir com o dado). *Rejeita-se:* a densidade baixa demais para produtividade densa de operador; o Desktop do Studio UX precisa de mais densidade que o Notion (P21). Absorvemos a calma como *valor*, calibrando a densidade ao nosso operador.

**EN** — *Absorb:* the **calm and space** — generous breathing room, legible typography, an interface that does not shout and lets content breathe (feeds P5 — space as the primary hierarchy tool — and the golden rule that the interface must not compete with the data). *Reject:* the too-low density for an operator's dense productivity; Studio UX Desktop needs more density than Notion (P21). We absorb calm as a *value*, calibrating density to our operator.

### Figma

**PT** — *Absorve-se:* a excelência do **inspetor e do painel de propriedades** — como editar muitas propriedades de um objeto em foco de forma organizada, e como um canvas convive com painéis laterais (alimenta o padrão inspetor/master–detail do Desktop, §6). Também a robustez de uma ferramenta de trabalho prolongado. *Rejeita-se:* a complexidade de uma ferramenta de criação profissional — o Studio UX serve sistemas de negócio, não editores gráficos; não herdamos essa curva de aprendizado. Absorvemos a *organização do inspetor*; rejeitamos a *complexidade de ferramenta criativa*.

**EN** — *Absorb:* the excellence of the **inspector and properties panel** — how to edit many properties of a focused object in an organized way, and how a canvas coexists with side panels (feeds the Desktop inspector/master–detail pattern, §6). Also the robustness of a prolonged-work tool. *Reject:* the complexity of a professional creation tool — Studio UX serves business systems, not graphic editors; we do not inherit that learning curve. We absorb the *inspector organization*; we reject the *creative-tool complexity*.

---

## 2. Síntese — o que o Studio UX toma de cada um e como isso vira identidade PRÓPRIA · Synthesis — what Studio UX takes from each and how it becomes its OWN identity

**PT** — Cada referência contribui com **um princípio de comportamento**, nunca com um pixel. Juntando-os: de **Linear**, a velocidade percebida e o teclado-primeiro; de **Stripe**, a clareza de dados densos e a hierarquia; de **Notion**, a calma e o espaço; de **shadcn**, a composição e a neutralidade; de **Vercel**, o minimalismo funcional e o dark de primeira classe; de **GitHub**, a orientação em profundidade; de **Figma**, a organização do inspetor; de **Flux/Zenith**, a arquitetura de shell administrativo. Nenhuma dessas contribuições traz cor, forma ou marca — todas trazem *modo de pensar*.

**EN** — Each reference contributes **one behavior principle**, never a pixel. Put together: from **Linear**, perceived speed and keyboard-first; from **Stripe**, dense-data clarity and hierarchy; from **Notion**, calm and space; from **shadcn**, composition and neutrality; from **Vercel**, functional minimalism and first-class dark; from **GitHub**, depth orientation; from **Figma**, inspector organization; from **Flux/Zenith**, admin shell architecture. None of these contributions brings color, shape or brand — all bring a *way of thinking*.

**PT** — A identidade **própria** do Studio UX nasce de como esses princípios são **filtrados pelos nossos** (P1–P25) e materializados nos **nossos tokens** (Fase 2). Velocidade sem virar a estética do Linear; densidade sem virar a pele do Stripe; calma sem a baixa densidade do Notion; composição sem o modelo de código do shadcn. O resultado é uma família visual que não se confunde com nenhuma referência porque as decisões finais — cor, tipografia, forma, marca — são tomadas por nós, para os nossos dois produtos (Desktop e Mobile, P4), a partir da nossa documentação. **Estudamos os melhores para pensar melhor; não para nos parecermos com eles.**

**EN** — Studio UX's **own** identity is born from how these principles are **filtered through ours** (P1–P25) and materialized in **our tokens** (Phase 2). Speed without becoming Linear's aesthetic; density without becoming Stripe's skin; calm without Notion's low density; composition without shadcn's code model. The result is a visual family that is not mistaken for any reference because the final decisions — color, typography, shape, brand — are made by us, for our two products (Desktop and Mobile, P4), from our documentation. **We study the best to think better; not to look like them.**

---

*Documento vivo. Atualizar quando uma referência for adicionada, revista ou aposentada; toda mudança nas duas línguas na mesma leva. · Living document. Update when a reference is added, revised or retired; every change in both languages in the same commit.*
