# AI_RULES.md — Regras para IA · AI Rules

> Documento normativo vivo. Responde a: **quais regras secas e imperativas uma IA deve obedecer, sem exceção, ao gerar ou alterar uma tela com Studio UX?**
> Living normative document. Answers: **which dry, imperative rules must an AI obey, without exception, when generating or changing a screen with Studio UX?**
> Governança: `STUDIO_UX.md`. Procedimento detalhado (o "como"): `docs/context/STUDIO_UX_AI_CONTEXT.md`. Critérios: `STUDIO_UX_PRINCIPLES.md` (P1–P25).

```
Architecture Boundary Check — AI_RULES
Resolve · Solves:            a versão imperativa e seca das regras para uma IA — comandos curtos,
                             fáceis de obedecer, carregáveis por qualquer modelo antes de gerar tela.
                             / the dry, imperative version of the rules for an AI — short commands,
                             easy to obey, loadable by any model before generating a screen.
Não pertence a outro porque · Not elsewhere because:
                             AI_CONTEXT é o procedimento RICO (o "como uma IA constrói"); aqui é a
                             lista de comandos SECA (NUNCA/SEMPRE) que aponta para ele. Um é o manual,
                             o outro é o cartão de regras.
                             / AI_CONTEXT is the RICH procedure (the "how an AI builds"); this is the
                             DRY command list (NEVER/ALWAYS) pointing to it. One is the manual, the
                             other the rules card.
Complementa · Complements:   AI_CONTEXT, PRINCIPLES, CERTIFICATION, e todos os docs normativos.
Nunca substitui · Never replaces: AI_CONTEXT (dono do procedimento), PRINCIPLES (dono dos P#),
                             CERTIFICATION (dono da auditoria). AI_RULES condensa; não redefine.
Dono · Owner:                este doc, para o domínio "regras imperativas para IA".
                             / this doc, for the "imperative AI rules" domain.
```

> **PT** — Este é um cartão de regras, não um tutorial. Cada regra é curta e testável. O "porquê" e o "passo a passo" moram em `STUDIO_UX_AI_CONTEXT.md` — leia-o quando precisar do procedimento; obedeça isto sempre.
> **EN** — This is a rules card, not a tutorial. Each rule is short and testable. The "why" and the "step by step" live in `STUDIO_UX_AI_CONTEXT.md` — read it when you need the procedure; obey this always.

---

## 1. NUNCA · NEVER

**PT**
- **Nunca invente** token, cor, espaçamento, raio, tipografia, sombra, duração, componente, layout, animação ou superfície. Tudo já tem dono. (P1, P7)
- **Nunca escreva valor literal** (`16px`, `#3B82F6`, `0.3s`) no que seria código de tela. Todo valor vem de token. (P1)
- **Nunca copie** layout, código ou identidade de referências de estudo (Linear, Stripe, shadcn, Notion, Vercel, GitHub, Figma…). Elas são estudo de princípios, jamais fonte de cópia.
- **Nunca misture Desktop e Mobile** na mesma tela. Se precisa dos dois, são **duas telas** distintas. (P4)
- **Nunca exponha jargão técnico** na superfície — chave, ID cru, `allowed_tools`, `persona JSON`. Fala a língua do usuário. (P11)
- **Nunca entregue tela sem estados** vazio, carregando e erro projetados. (P14)
- **Nunca use** `alert()/confirm()/prompt()` nativos nem banner improvisado — feedback é por toast. (P12)
- **Nunca faça ação destrutiva sem os 5** (ConfirmDialog, disclaimer, tooltip, loading, gate de permissão). (P13)
- **Nunca crie um segundo jeito** de resolver o que já tem componente/padrão. (P2, P3)
- **Nunca desça uma ficha de leitura numa coluna só** num container largo, nem separe rótulo e valor com `space-between`. Pares rótulo↔valor se distribuem pela largura (`DescriptionList`), como campos de formulário. E antes de dividir um detalhe em abas, verificar se o conteúdo cabe distribuído — aba que compensa layout desperdiçado esconde informação sem motivo. (P26)
- **Nunca defina aqui um assunto que tem outro dono** (SSOT, `STUDIO_UX.md` §11). Referencie o dono; não duplique.
- **Nunca amarre** uma regra permanente a uma tecnologia (React, Tailwind, CSS…). Princípio é agnóstico. (`STUDIO_UX.md` §13)
- **Nunca viole um princípio em silêncio.** Diga qual, por quê, e proponha um ADR.

**EN**
- **Never invent** a token, color, spacing, radius, typography, shadow, duration, component, layout, animation or surface — everything already has an owner (P1, P7). **Never write a literal value** in screen code (P1). **Never copy** layout, code or identity from study references — principle study only, never a copy source. **Never mix Desktop and Mobile** in one screen — if you need both, they are two screens (P4). **Never expose technical jargon** on the surface (P11). **Never deliver a screen without empty, loading and error states** (P14). **Never use** native `alert()/confirm()/prompt()` or an improvised banner — feedback is via toast (P12). **Never do a destructive action without the five** (P13). **Never create a second way** to solve what a component/pattern already solves (P2, P3). **Never define a subject owned by another doc** (SSOT). **Never tie a permanent rule to a technology** (§13). **Never violate a principle silently** — say which, why, propose an ADR.

---

## 2. SEMPRE · ALWAYS

**PT**
- **Sempre reutilize** antes de criar: componente do catálogo, padrão existente, token existente. (P2, P3)
- **Sempre consulte** os documentos oficiais na ordem da §3 **antes** de gerar qualquer tela.
- **Sempre escolha primeiro** o produto: **Desktop OU Mobile**. Isso decide layout, navegação e ênfase de acessibilidade. (P4)
- **Sempre projete** os estados vazio, carregando, erro, sucesso e "muitos dados". (P14)
- **Sempre dê retorno** a cada ação em um instante — loading, skeleton, toast ou transição. (P16)
- **Sempre use toast** para erro/sucesso/aviso/info. (P12)
- **Sempre garanta acessibilidade AA**: contraste, foco visível, significado não só por cor, teclado (Desktop) / toque ≥44px (Mobile). (P17–P19; checklist em `ACCESSIBILITY.md` §11)
- **Sempre fale a língua do usuário**; jargão vai para "Ajustes avançados" ou some. (P11)
- **Sempre reflita permissão** na UI: o que o usuário não pode, não aparece habilitado. (P23)
- **Sempre tire todo valor de token** e toda composição do sistema de layout. (P1, P7, P22)
- **Sempre cite o P#** ao justificar uma decisão ("usei EmptyState por P14").
- **Sempre documente nas duas línguas** (PT-BR + EN) o que documentar. (`STUDIO_UX.md` §1)
- **Sempre autoaudite** com a checklist de `STUDIO_UX_AI_CONTEXT.md` §3 e, ao final, com `STUDIO_UX_CERTIFICATION.md`.

**EN**
- **Always reuse** before creating (P2, P3). **Always consult** the official docs in the §3 order **before** generating a screen. **Always choose the product first — Desktop OR Mobile** (P4). **Always design** the empty, loading, error, success and many-data states (P14). **Always give feedback** within an instant (P16). **Always use toast** for error/success/warning/info (P12). **Always ensure AA accessibility** — contrast, visible focus, not color-only, keyboard (Desktop) / ≥44px touch (Mobile) (P17–P19; checklist in `ACCESSIBILITY.md` §11). **Always speak the user's language** (P11). **Always reflect permission** in the UI (P23). **Always take every value from a token** and every composition from the layout system (P1, P7, P22). **Always cite the P#** when justifying a decision. **Always document in both languages** (PT-BR + EN). **Always self-audit** with `STUDIO_UX_AI_CONTEXT.md` §3 and, at the end, with `STUDIO_UX_CERTIFICATION.md`.

---

## 3. Ordem de consulta obrigatória · Mandatory consultation order

**PT** — Antes de gerar uma tela, carregue e respeite, nesta ordem. Não pule etapas.

**EN** — Before generating a screen, load and honor, in this order. Do not skip steps.

1. `STUDIO_UX_VISION.md` — o produto e o porquê. / the product and the why.
2. `STUDIO_UX_PHILOSOPHY.md` — a filosofia de design. / the design philosophy.
3. `STUDIO_UX_PRINCIPLES.md` — P1–P25, a sua checklist. / P1–P25, your checklist.
4. `STUDIO_UX_VISUAL_DNA.md` — a régua de gosto (claro, calmo, confiável). / the taste ruler.
5. `STUDIO_UX_GRAMMAR.md` — o que existe na composição (níveis). / what exists in composition.
6. `STUDIO_UX_SURFACES.md` — superfícies e elevação. / surfaces and elevation.
7. `STUDIO_UX_VISUAL_RHYTHM.md` — o ritmo do espaço. / the rhythm of space.
8. `tokens/STUDIO_UX_DESIGN_TOKENS.md` (+ `COLOR_SYSTEM`, `TYPOGRAPHY`, `SPACING`) — de onde vêm os valores. / where values come from.
9. `STUDIO_UX_THEMES.md` — dark/light/marca. / dark/light/brand.
10. `STUDIO_UX_ICONOGRAPHY.md` — ícones. / icons.
11. `STUDIO_UX_ANIMATIONS.md` — movimento. / motion.
12. `layouts/STUDIO_UX_LAYOUT_SYSTEM.md` — grid, regiões, camadas. / grid, regions, layers.
13. `components/STUDIO_UX_COMPONENT_LIBRARY.md` — o que já existe para reutilizar. / what to reuse.
14. `patterns/STUDIO_UX_PATTERNS.md` — o fluxo (CRUD, busca, wizard…). / the flow.
15. `STUDIO_UX_ACCESSIBILITY.md` — a checklist de acessibilidade. / the a11y checklist.
16. Os donos de tela conforme o caso: `STUDIO_UX_DASHBOARD.md`, `STUDIO_UX_FORMS.md`, `STUDIO_UX_TABLES.md`, `STUDIO_UX_NAVIGATION.md`. / screen owners as needed.
17. O produto: `desktop/STUDIO_UX_DESKTOP.md` **OU** `mobile/STUDIO_UX_MOBILE.md` — nunca os dois na mesma tela. / Desktop OR Mobile — never both in one screen.
18. Ao final, autoaudite com `STUDIO_UX_CERTIFICATION.md`. / finally, self-audit with CERTIFICATION.

**PT** — O procedimento detalhado de como percorrer esta ordem está em `STUDIO_UX_AI_CONTEXT.md` §1–2. Este cartão só ordena; aquele explica.

**EN** — The detailed procedure for walking this order is in `STUDIO_UX_AI_CONTEXT.md` §1–2. This card only orders; that one explains.

---

## 4. Protocolo da informação faltante · Missing-information protocol

**PT** — Regra de fechamento, sem exceção: **caso alguma informação não exista na documentação — NÃO invente.** Em vez disso:

1. **Pare** de gerar no ponto exato onde a informação falta.
2. **Crie uma PROPOSTA** explícita: o que falta, as opções possíveis, e a mais conservadora (a que mais se parece com o que já existe).
3. **Aguarde aprovação** antes de seguir. Nada de "chutar plausível" para não interromper — o chute plausível é o pior erro, porque parece certo.
4. Aprovada a proposta, o dono do assunto (SSOT) é atualizado; só então a informação passa a existir e pode ser usada.

**EN** — Closing rule, no exception: **if some information does not exist in the documentation — DO NOT invent it.** Instead: (1) **stop** generating at the exact point where the information is missing; (2) **create an explicit PROPOSAL** — what is missing, the possible options, and the most conservative one (closest to what already exists); (3) **wait for approval** before continuing — never "guess something plausible" to avoid interrupting, because the plausible guess is the worst error, since it looks right; (4) once approved, the subject owner (SSOT) is updated, and only then does the information exist and become usable.

**PT** — Isto vale para todo valor, componente, token, padrão ou regra ausente. Inventar para "adiantar" viola a fundação inteira (P1, P2, P3, SSOT). Propor e aguardar é o caminho certo, sempre.

**EN** — This applies to every missing value, component, token, pattern or rule. Inventing to "move faster" violates the whole foundation (P1, P2, P3, SSOT). Propose and wait is the right path, always.

---

*Documento vivo. Condensa em regras o que `STUDIO_UX_AI_CONTEXT.md` explica em procedimento; mudou a regra no dono, este cartão muda na mesma leva, nas duas línguas. · Living document. It condenses into rules what `STUDIO_UX_AI_CONTEXT.md` explains as procedure; if a rule changes at its owner, this card changes in the same commit, in both languages.*
