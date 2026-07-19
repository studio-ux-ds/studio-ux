# STUDIO_UX_CERTIFICATION.md — Certificação · Certification

> Documento normativo vivo. Responde a: **como uma tela E um sistema feitos com Studio UX são auditados de forma objetiva e recebem uma nota e um nível reproduzíveis?**
> Living normative document. Answers: **how are a screen AND a system built with Studio UX audited objectively and given a reproducible score and level?**
> Governança: `STUDIO_UX.md`. Critérios de origem: `STUDIO_UX_PRINCIPLES.md` (P1–P25). Checklists de origem: `docs/context/STUDIO_UX_AI_CONTEXT.md` §3 e `STUDIO_UX_ACCESSIBILITY.md` §11. Definição de Pronto: `STUDIO_UX.md` §8. Medição contínua: `docs/quality/STUDIO_UX_COMPLIANCE.md`.

> **PT — Dois escopos, um dono.** Este documento certifica em **dois escopos**: a **tela** (Bronze→Platinum, §§0–7) e o **sistema inteiro** (Bronze→Enterprise, §8). É o dono único do domínio "certificação" (SSOT) — não existe documento separado de certificação de sistema.
> **EN — Two scopes, one owner.** This document certifies at **two scopes**: the **screen** (Bronze→Platinum, §§0–7) and the **whole system** (Bronze→Enterprise, §8). It is the single owner of the "certification" domain (SSOT) — there is no separate system-certification document.

```
Architecture Boundary Check — STUDIO_UX_CERTIFICATION
Resolve · Solves:            o método oficial para auditar (a) uma TELA pronta — nível Bronze/Silver/Gold/Platinum —
                             e (b) um SISTEMA inteiro — Bronze→Enterprise — de forma objetiva e reproduzível.
                             / the official method to audit (a) a finished SCREEN — Bronze/Silver/Gold/Platinum —
                             and (b) a whole SYSTEM — Bronze→Enterprise — objectively and reproducibly.
Não pertence a outro porque · Not elsewhere because:
                             PRINCIPLES define as regras (o que é certo); ACCESSIBILITY e AI_CONTEXT trazem
                             checklists de construção; faltava o instrumento de MEDIÇÃO pós-fato — auditar,
                             pontuar e classificar uma tela existente contra tudo isso.
                             / PRINCIPLES define the rules (what is right); ACCESSIBILITY and AI_CONTEXT carry
                             build checklists; the missing piece was the after-the-fact MEASUREMENT
                             instrument — to audit, score and grade an existing screen against all of it.
Complementa · Complements:   PRINCIPLES, AI_CONTEXT, AI_RULES, ACCESSIBILITY, VISUAL_DNA, DESKTOP, MOBILE.
Nunca substitui · Never replaces: PRINCIPLES (dono dos P#), ACCESSIBILITY (dono da checklist de a11y),
                             AI_CONTEXT (dono do "como construir"), STUDIO_UX.md §8 (dono da Definição de Pronto).
                             CERTIFICATION mede; nunca redefine a regra medida.
Dono · Owner:                este doc, para o domínio "certificação / auditoria de tela".
                             / this doc, for the "screen certification / audit" domain.
```

> **PT — Natureza deste documento:** a certificação **não cria regra nova**. Ela **agrega** critérios que já têm dono (SSOT, `STUDIO_UX.md` §11) e os transforma num instrumento de medição. Toda linha de checklist aponta para o princípio (P#) ou a checklist de origem — se a regra mudar no dono, a auditoria muda junto. A nota nunca é opinião do auditor.
> **EN — Nature of this document:** certification **creates no new rule**. It **aggregates** criteria that already have an owner (SSOT, `STUDIO_UX.md` §11) and turns them into a measurement instrument. Every checklist line points to its source principle (P#) or checklist — if the rule changes at its owner, the audit changes with it. The score is never the auditor's opinion.

---

## 0. Por que certificar · Why certify

**PT** — Um design system só permanece consistente ao longo dos anos se a consistência puder ser **medida**, não apenas pedida. A certificação dá a toda tela feita com Studio UX um veredito objetivo: passou ou não passou, e em que nível de excelência. Serve a três públicos: quem constrói (sabe o alvo antes de entregar), quem revisa (audita rápido, sem gosto pessoal) e quem governa (mede a saúde do sistema no tempo). O objetivo declarado é **reprodutibilidade**: dois auditores independentes, com a mesma tela e este documento, chegam à mesma nota (§8).

**EN** — A design system stays consistent over the years only if consistency can be **measured**, not merely requested. Certification gives every Studio UX screen an objective verdict: pass or fail, and at which level of excellence. It serves three audiences: builders (know the target before delivering), reviewers (audit fast, without personal taste) and governance (measure the system's health over time). The declared goal is **reproducibility**: two independent auditors, with the same screen and this document, reach the same score (§8).

**PT** — Regra de precedência herdada de `STUDIO_UX_PRINCIPLES.md`: quando dois critérios colidem, **acessibilidade e clareza do usuário (P11, P17–P19) > consistência do sistema (P1–P3, P20) > densidade/estética (P21)**. A certificação nunca premia elegância que custou compreensão.

**EN** — Precedence rule inherited from `STUDIO_UX_PRINCIPLES.md`: when two criteria collide, **accessibility and user clarity (P11, P17–P19) > system consistency (P1–P3, P20) > density/aesthetics (P21)**. Certification never rewards elegance that cost understanding.

---

## 1. Metodologia — como auditar uma tela · Methodology — how to audit a screen

**PT** — A auditoria segue sempre a mesma ordem, para ser reproduzível. Passo a passo:

1. **Identificar o produto.** A tela é **Desktop** (produtividade) ou **Mobile** (nativo)? Isto define qual documento de produto vale (`desktop/STUDIO_UX_DESKTOP.md` **ou** `mobile/STUDIO_UX_MOBILE.md`) e quais checagens de a11y pesam mais (teclado no Desktop, toque no Mobile). Uma tela que é "as duas coisas na mesma composição" já falha P4 antes de começar.
2. **Delimitar a unidade auditada.** Uma tela = uma composição com uma pergunta única (P6). Fluxos com várias telas auditam-se tela a tela; a nota do fluxo é a **menor** nota entre suas telas.
3. **Coletar as evidências.** Ver a tela nos dois temas (dark e light), no estado cheio de dados e nos estados vazio/carregando/erro; no Mobile, em largura pequena; no Desktop, operando por teclado. Sem as evidências, o item correspondente é reprovado por ausência de prova — não presumido cumprido.
4. **Percorrer as nove dimensões** (§2), marcando cada item verificável como **cumpre / não cumpre / não se aplica**. Cada item cita seu P# de origem.
5. **Aplicar os eliminatórios** (§5). Qualquer eliminatório reprovado trava o nível, independentemente do resto.
6. **Consolidar** com o checklist P1–P25 (§3) e atribuir o nível (§4).
7. **Registrar o veredito**: nível, itens reprovados (com o P# citado) e a evidência. O laudo aponta a regra, nunca "não gostei".

**EN** — The audit always follows the same order, to be reproducible. Step by step: (1) **identify the product** — Desktop or Mobile? this sets which product doc applies and which a11y checks weigh more (keyboard on Desktop, touch on Mobile); a screen that is "both in one composition" already fails P4. (2) **Bound the audited unit** — one screen = one composition with a single question (P6); multi-screen flows are audited screen by screen and the flow's score is the **lowest** among its screens. (3) **Collect evidence** — view the screen in both themes, in the data-full state and in empty/loading/error, at small width on Mobile, keyboard-operated on Desktop; without evidence, the item fails for lack of proof, never assumed passed. (4) **Walk the nine dimensions** (§2), marking each verifiable item as pass / fail / N/A, each citing its source P#. (5) **Apply the eliminators** (§5) — any failed eliminator caps the level. (6) **Consolidate** with the P1–P25 checklist (§3) and assign the level (§4). (7) **Record the verdict**: level, failed items (with cited P#) and evidence; the report points to the rule, never "I didn't like it".

---

## 2. As nove dimensões · The nine dimensions

**PT** — Cada tela é medida em nove dimensões. Cada dimensão amarra-se a princípios (P#) e traz itens verificáveis. Onde o princípio já traz um **Teste:** objetivo, a auditoria o reusa — não inventa critério paralelo.

**EN** — Each screen is measured across nine dimensions. Each ties to principles (P#) and carries verifiable items. Where a principle already ships an objective **Test:**, the audit reuses it — it does not invent a parallel criterion.

### 2.a Tokens e consistência de valor · Tokens and value consistency — P1, P7, P20
- **PT** — Nenhum valor visual "na mão": cor, espaço, raio, tipografia, sombra e duração vêm de token (P1 · Teste: procurar literal como `16px`/`#3B82F6`/`0.3s`). Todo espaçamento mapeia para um degrau da escala (P7). Nada parece "de fora da família" ao lado de um componente existente (P20).
- **EN** — No hand-written visual value: color, space, radius, typography, shadow and duration come from tokens (P1 · Test: search for literals). Every spacing maps to a scale step (P7). Nothing looks "outside the family" beside an existing component (P20).

### 2.b Composição e hierarquia · Composition and hierarchy — P5, P6, P22 + GRAMMAR
- **PT** — Espaço em branco é a ferramenta primária de agrupamento; bordas/fundos são último recurso (P5). A tela responde onde/o-que/agora, com **uma** ação primária (P6). A composição segue o sistema de layout e a gramática de composição — sem grid ad hoc por tela (P22; níveis de composição em `STUDIO_UX_GRAMMAR.md`, grid/regiões em `STUDIO_UX_LAYOUT_SYSTEM.md`).
- **EN** — Whitespace is the primary grouping tool; borders/backgrounds are a last resort (P5). The screen answers where/what/now, with **one** primary action (P6). Composition follows the layout system and composition grammar — no per-screen ad-hoc grid (P22; composition levels in `STUDIO_UX_GRAMMAR.md`, grid/regions in `STUDIO_UX_LAYOUT_SYSTEM.md`).

### 2.c Componentes oficiais · Official components — P2, P3
- **PT** — A tela é montada só com componentes do catálogo (P3). Nenhum "segundo jeito" de resolver o que já tem solução (P2 · Teste: se algo é cru, apontar por que o catálogo não cobre — e isso é pedido de componente, não gambiarra local).
- **EN** — The screen is assembled only from catalog components (P3). No "second way" to solve what already has a solution (P2 · Test: if something is raw, state why the catalog doesn't cover it — that becomes a component request, not a local hack).

### 2.d Estados completos · Complete states — P14
- **PT** — Estão projetados e visíveis: vazio (`EmptyState`), carregando (skeleton/spinner), erro, sucesso e o estado com muitos dados (P14 · Teste: componente sem estado vazio e sem estado de erro **não está pronto** — logo, não certifica).
- **EN** — Designed and visible: empty (`EmptyState`), loading (skeleton/spinner), error, success and the many-data state (P14 · Test: a component with no empty and no error state is **not done** — thus does not certify).

### 2.e Feedback e toast · Feedback and toast — P12, P16
- **PT** — Erro/sucesso/aviso/info via toast do sistema; nunca `alert()/confirm()/prompt()` nativos nem banner improvisado (P12). Nenhum clique fica "mudo": há retorno em um instante — loading, skeleton, toast ou transição (P16).
- **EN** — Error/success/warning/info via the system toast; never native `alert()/confirm()/prompt()` nor an improvised banner (P12). No click stays "mute": feedback within an instant — loading, skeleton, toast or transition (P16).

### 2.f Acessibilidade · Accessibility — P17, P18, P19
- **PT** — Medida pela **checklist dona** em `STUDIO_UX_ACCESSIBILITY.md` §11 (contraste AA nos dois temas; foco visível em todo focável; significado nunca só por cor; marcos/headings/papéis corretos; fluxo por teclado no Desktop; alvo ≥44px e gesto-com-alternativa no Mobile; estados anunciados a leitores; `prefers-reduced-motion`; formulários com rótulo/erro associados). A certificação **não recria** esses itens; ela os importa e verifica.
- **EN** — Measured by the **owner checklist** in `STUDIO_UX_ACCESSIBILITY.md` §11 (AA contrast in both themes; visible focus on every focusable; meaning never color-only; correct landmarks/headings/roles; keyboard flow on Desktop; ≥44px target and gesture-with-alternative on Mobile; states announced to readers; `prefers-reduced-motion`; forms with associated label/error). Certification **does not recreate** these items; it imports and verifies them.

### 2.g Linguagem do usuário · User's language — P11
- **PT** — Nenhum rótulo, botão, dica ou mensagem expõe identificador técnico, chave ou ID cru (P11 · Teste: varrer a superfície por jargão de código — `allowed_tools`, `persona JSON`, IDs). Jargão legítimo mora em "Ajustes avançados" ou fora da tela.
- **EN** — No label, button, hint or message exposes a technical identifier, key or raw ID (P11 · Test: sweep the surface for code jargon). Legitimate jargon lives under "Advanced settings" or off-screen.

### 2.h Desktop/Mobile correto · Correct Desktop/Mobile — P4
- **PT** — A tela pertence a um produto e respeita o documento dele; não é um Desktop "esticado" por media query virando Mobile, nem o inverso (P4). A densidade é a do produto certo (P21): densa e uniforme no Desktop, espaçada no Mobile.
- **EN** — The screen belongs to one product and honors its doc; it is not a Desktop "stretched" via media query into Mobile, nor the reverse (P4). Density matches the right product (P21): dense and uniform on Desktop, spacious on Mobile.

### 2.i DNA visual · Visual DNA — VISUAL_DNA
- **PT** — A tela soa **clara, calma e confiável** e some para o dado brilhar (`STUDIO_UX_VISUAL_DNA.md`). Régua de veto: nada chamativo, "de moda", decorativo, ruidoso, infantil, ostentoso, amontoado. Sem gradiente decorativo, sem "mar de cards", sem "gaiola" de bordas, sem sombra que embeleza cartão parado. Aplica-se o micro-ritmo do espaço (dono: `STUDIO_UX_VISUAL_RHYTHM.md`).
- **EN** — The screen sounds **clear, calm and trustworthy** and disappears to let data shine (`STUDIO_UX_VISUAL_DNA.md`). Veto ruler: nothing flashy, on-trend, decorative, noisy, childish, ostentatious, cluttered. No decorative gradient, no "sea of cards", no border "cage", no shadow beautifying a resting card. The micro-rhythm of space applies (owner: `STUDIO_UX_VISUAL_RHYTHM.md`).

---

## 3. Checklist oficial consolidado P1–P25 · Consolidated official checklist P1–P25

**PT** — Percorre todos os princípios. Cada um é **eliminatório (E)** — reprova o certificado inteiro se falhar — ou **pontuável (P)** — soma para o nível. A regra de origem mora no dono (`STUDIO_UX_PRINCIPLES.md`); aqui só se marca o peso na auditoria.

**EN** — Walks all principles. Each is **eliminatory (E)** — fails the whole certificate if unmet — or **scored (S)** — counts toward the level. The source rule lives at its owner (`STUDIO_UX_PRINCIPLES.md`); here only the audit weight is marked.

| P# | Assunto · Subject | Peso · Weight |
|---|---|---|
| P1  | Tudo vem de um token · Everything from a token | **E** |
| P2  | Um problema, uma solução · One problem, one solution | S |
| P3  | Só componentes oficiais · Official components only | **E** |
| P4  | Desktop e Mobile não se misturam · No mixing | **E** |
| P5  | Espaço é hierarquia primária · Whitespace-first hierarchy | S |
| P6  | Onde/o-que/agora, 1 ação primária · Single primary action | **E** |
| P7  | Sem espaçamento arbitrário · No arbitrary spacing | **E** |
| P8  | Poucas cores com papel · Few semantic colors | S |
| P9  | Poucas sombras · Few shadows | S |
| P10 | Raio e forma consistentes · Consistent radius | S |
| P11 | Língua do usuário · User's language | **E** |
| P12 | Feedback via toast · Toast feedback | **E** |
| P13 | Destrutivo tem os 5 · Five safeguards | **E** |
| P14 | Todo estado é projetado · Every state designed | **E** |
| P15 | Movimento funcional e discreto · Functional motion | S |
| P16 | Retorno em um instante · Instant feedback | S |
| P17 | Significado não só por cor · Not color-only | **E** |
| P18 | Contraste e foco (AA) · Contrast and focus | **E** |
| P19 | Toque e teclado 1ª classe · Touch and keyboard | **E** |
| P20 | Nada "de fora da família" · Nothing foreign | S |
| P21 | Densidade coerente · Coherent density | S |
| P22 | Layout vem do sistema · Layout from the system | S |
| P23 | Permissão molda a UI · Permission shapes UI | S |
| P24 | Ações relevantes deixam rastro · Actions leave a trail | S |
| P25 | Documentar o porquê · Document the why | S |

**PT** — Eliminatórios (E): **P1, P3, P4, P6, P7, P11, P12, P13, P14, P17, P18, P19.** São o piso não-negociável: acessibilidade, consistência de valor, estados, linguagem e segurança de ação. Um "não" em qualquer um reprova antes de somar pontos. Os demais são pontuáveis e definem quão alto o nível sobe (§4).

**EN** — Eliminators (E): **P1, P3, P4, P6, P7, P11, P12, P13, P14, P17, P18, P19.** They are the non-negotiable floor: accessibility, value consistency, states, language and action safety. A single "no" fails before any points are summed. The rest are scored and set how high the level climbs (§4).

---

## 4. Níveis · Levels — Bronze · Silver · Gold · Platinum

**PT** — O nível é atribuído por critério objetivo, sempre nesta ordem. Um nível superior exige **todos** os requisitos dos inferiores.

**EN** — The level is assigned by objective criteria, always in this order. A higher level requires **all** the lower ones.

- **Bronze — o piso digno · the decent floor.** Todos os itens **eliminatórios** (§3) cumpridos: nenhuma barreira de acessibilidade, nenhum valor mágico, só componentes oficiais, estados projetados, linguagem do usuário, destrutivo com os 5. A tela é correta e segura, ainda que não brilhante. Abaixo de Bronze = **não certificada** (reprovada).
  · **EN** — All **eliminatory** items met: no a11y barrier, no magic value, official components only, states designed, user's language, destructive with the five. The screen is correct and safe, if not brilliant. Below Bronze = **not certified**.
- **Silver — consistência plena · full consistency.** Bronze **+** todos os pontuáveis de sistema (P2, P5, P8, P9, P10, P20, P22) cumpridos. Nada fora da família, hierarquia por espaço, paleta e formas coerentes, layout do sistema.
  · **EN** — Bronze **+** all system-scored items (P2, P5, P8, P9, P10, P20, P22) met.
- **Gold — experiência polida · polished experience.** Silver **+** governança e movimento (P15, P16, P21, P23, P24) e a **checklist de acessibilidade** de `ACCESSIBILITY.md` §11 passando **integralmente nos dois temas**. Feedback impecável, densidade coerente, permissão molda a UI, rastro onde é preciso.
  · **EN** — Silver **+** governance and motion (P15, P16, P21, P23, P24) and the `ACCESSIBILITY.md` §11 checklist passing **fully in both themes**.
- **Platinum — referência do sistema · system reference.** Gold **+** DNA visual (§2.i) e micro-ritmo (`VISUAL_RHYTHM`) impecáveis, documentação do porquê nas duas línguas (P25), **e a mesma experiência certificada em Desktop E Mobile** (as duas telas irmãs, cada uma no seu produto, ambas ≥ Gold). Platinum é 100%: nada a remover, nada fora do lugar.
  · **EN** — Gold **+** flawless visual DNA (§2.i) and micro-rhythm (`VISUAL_RHYTHM`), bilingual "why" documentation (P25), **and the same experience certified on Desktop AND Mobile** (both sibling screens, each in its product, both ≥ Gold). Platinum is 100%: nothing to remove, nothing out of place.

---

## 5. O que reprova — itens eliminatórios · What fails — eliminatory items

**PT** — Qualquer um destes trava a certificação (nem Bronze), independentemente da beleza da tela. São a materialização dos eliminatórios (§3) e dos anti-padrões dos donos:

- **Contraste AA falho** — texto ou controle abaixo do mínimo, em qualquer tema (P18; `ACCESSIBILITY.md` §1).
- **Foco removido sem substituto** — `outline` tirado "por estética" (P18; `ACCESSIBILITY.md` §2).
- **Significado só por cor** — "vermelho = erro" sem ícone/texto/forma (P17; `ACCESSIBILITY.md` §3).
- **Jargão técnico na superfície** — chave, ID cru ou identificador de código como texto de UI (P11).
- **Componente fora da família** — elemento cru onde existe componente oficial, ou um "segundo jeito" (P2, P3, P20).
- **Valor mágico** — cor/espaço/raio/duração literal fora de token (P1, P7).
- **Ação destrutiva sem os 5** — falta ConfirmDialog, disclaimer, tooltip, loading ou gate de permissão (P13).
- **Estado faltando** — sem vazio, sem erro ou sem loading projetado (P14).
- **Desktop e Mobile misturados** — um esticado no outro só por media query (P4).
- **Feedback nativo** — `alert()/confirm()/prompt()` ou banner improvisado no lugar do toast (P12).

**EN** — Any of these caps certification (not even Bronze), no matter how pretty the screen. They materialize the eliminators (§3) and the owners' anti-patterns: **failed AA contrast** (P18); **focus removed without replacement** (P18); **meaning color-only** (P17); **technical jargon on the surface** (P11); **component outside the family** (P2/P3/P20); **magic value** off-token (P1/P7); **destructive action missing any of the five** (P13); **missing state** — no empty/error/loading designed (P14); **Desktop and Mobile mixed** via media query (P4); **native feedback** — `alert()/confirm()/prompt()` or improvised banner instead of toast (P12).

---

## 6. Como validar cada aspecto · How to validate each aspect

**PT** — Subseções objetivas: o que olhar e contra qual dono verificar.

**EN** — Objective subsections: what to look at and against which owner to verify.

- **Interface · Interface** — Componentes só do catálogo (P3, `COMPONENT_LIBRARY`); valores só de token (P1/P7, `DESIGN_TOKENS`+COLOR/TYPOGRAPHY/SPACING); superfícies/elevação coerentes (`SURFACES`); nada "de fora da família" (P20). / Catalog-only components; token-only values; coherent surfaces/elevation; nothing foreign.
- **UX · UX** — Uma pergunta e uma ação primária por tela (P6); o fluxo usa o padrão inteiro, não pedaços (`PATTERNS`); feedback em um instante (P16) e por toast (P12); destrutivo com os 5 (P13); permissão molda a UI (P23). / One question, one primary action; whole pattern; instant + toast feedback; five safeguards; permission shapes UI.
- **Consistência · Consistency** — Colocada ao lado de outra tela do sistema, parece do mesmo sistema (P20 · Teste); densidade uniforme dentro do produto (P21); layout do sistema, sem grid ad hoc (P22); um só jeito de resolver cada coisa (P2). / Beside another system screen, it looks same-system; uniform density; system layout; one way per problem.
- **Acessibilidade · Accessibility** — Percorrer **integralmente** a checklist de `ACCESSIBILITY.md` §11 nos dois temas; qualquer "não" é bug, não estilo. Eliminatórios de a11y (contraste, foco, não-só-cor, teclado/toque) travam o certificado. / Walk `ACCESSIBILITY.md` §11 fully in both themes; any "no" is a bug; a11y eliminators cap the certificate.
- **Desktop · Desktop** — Confirmar produto (§1); operar **tudo por teclado** (tab/enter/esc/atalhos/foco preso — `ACCESSIBILITY.md` §5); densidade de produtividade coerente; segue `desktop/STUDIO_UX_DESKTOP.md`. / Confirm product; full keyboard operation; coherent productivity density; follows the Desktop doc.
- **Mobile · Mobile** — Alvos ≥44px e gesto sempre com alternativa visível (`ACCESSIBILITY.md` §6); áreas seguras respeitadas (`100dvh`); espaçamento de toque; segue `mobile/STUDIO_UX_MOBILE.md`. / ≥44px targets and gesture-with-alternative; safe areas; touch spacing; follows the Mobile doc.

---

## 7. Reprodutibilidade · Reproducibility

**PT** — A nota é reprodutível porque **nenhum item é subjetivo**: cada um cita um P# ou uma linha de checklist do dono, com um teste objetivo (procurar um literal, medir contraste, verificar foco, contar ações primárias, checar estados). Dois auditores com a mesma tela, os mesmos temas e este documento chegam à mesma classificação. Divergência entre auditores é sinal de que (a) faltou evidência (voltar ao passo 3 da §1) ou (b) um critério está ambíguo — e critério ambíguo é bug **do dono** (PRINCIPLES/ACCESSIBILITY), corrigido lá e não "interpretado" aqui. A certificação nunca inventa a regra que mede.

**EN** — The score is reproducible because **no item is subjective**: each cites a P# or an owner checklist line, with an objective test (search a literal, measure contrast, verify focus, count primary actions, check states). Two auditors with the same screen, the same themes and this document reach the same grade. Divergence between auditors signals either (a) missing evidence (return to §1 step 3) or (b) an ambiguous criterion — and an ambiguous criterion is a bug **at its owner** (PRINCIPLES/ACCESSIBILITY), fixed there, never "interpreted" here. Certification never invents the rule it measures.

**PT** — O laudo mínimo registra: produto (Desktop/Mobile), nível atribuído, cada item reprovado com o P# citado e a evidência, e — se Platinum — a confirmação das duas telas irmãs. É a mesma tela para todos, sempre.

**EN** — The minimal report records: product (Desktop/Mobile), assigned level, each failed item with its cited P# and evidence, and — if Platinum — confirmation of both sibling screens. It is the same screen for everyone, always.

---

## 8. Certificação de sistema · System certification — Bronze · Silver · Gold · Platinum · Enterprise

**PT** — Certificar uma **tela** (§§0–7) responde "esta tela está conforme?". Certificar um **sistema** responde "este produto inteiro — todas as suas telas, sua navegação, seus temas, sua governança de uso — é conforme e permanece conforme?". O escopo muda de uma peça para o todo; os critérios de tela continuam valendo (cada tela do sistema é auditada), e somam-se critérios que só existem no nível do sistema.

**EN** — Certifying a **screen** (§§0–7) answers "is this screen compliant?". Certifying a **system** answers "is this whole product — all its screens, its navigation, its themes, its usage governance — compliant, and does it stay compliant?". The scope moves from a piece to the whole; the screen criteria still apply (each screen is audited), and system-only criteria are added.

### 8.1 Critérios de nível de sistema · System-level criteria
**PT** — Além de auditar as telas, o nível de sistema verifica: **declaração de dependência** de versão do Studio UX (`VERSIONING`) em vez de fundamentos recriados; **uso exclusivo de componentes e tokens oficiais** em todo o produto (nenhum fork, nenhum valor mágico — verificável pelo `LINTER`); **separação Desktop/Mobile** correta em todo o sistema (Art. 2, P4); **consistência entre telas** (a família se mantém de tela em tela — P20); **cobertura de estados** e de acessibilidade em todos os fluxos, não só nas telas felizes; **conformidade contínua** medida ao longo do tempo (`COMPLIANCE`), não só num instante; e **governança de mudança** (alterações relevantes passam por RFC/ADR — `RFC_GUIDE`/`ADR_GUIDE`).
**EN** — Beyond auditing screens, the system level verifies: a **version dependency declaration** on Studio UX (`VERSIONING`) instead of recreated fundamentals; **exclusive use of official components and tokens** across the product (no fork, no magic value — checkable by the `LINTER`); correct **Desktop/Mobile separation** system-wide (Art. 2, P4); **cross-screen consistency** (the family holds from screen to screen — P20); **state and accessibility coverage** across all flows, not only happy screens; **continuous conformance** measured over time (`COMPLIANCE`), not just at one instant; and **change governance** (relevant changes go through RFC/ADR).

### 8.2 Os cinco níveis de sistema · The five system levels
**PT**

- **Bronze — conforme no piso.** Toda tela do sistema é ≥ Bronze (nenhum eliminatório em lugar nenhum); dependência de versão declarada; só componentes/tokens oficiais. O sistema é correto e seguro de ponta a ponta.
- **Silver — consistente.** Bronze **+** toda tela ≥ Silver e consistência plena entre telas (P20): a família não varia entre módulos.
- **Gold — polido.** Silver **+** toda tela ≥ Gold, acessibilidade integral em todos os fluxos nos dois temas, e conformidade contínua monitorada (`COMPLIANCE`) sem regressões abertas.
- **Platinum — referência.** Gold **+** as jornadas-chave certificadas em **Desktop E Mobile** (produtos irmãs, cada um no seu layout, P4), DNA visual e ritmo impecáveis em todo o produto, e documentação do porquê nas duas línguas.
- **Enterprise — plataforma de confiança.** Platinum **+** governança de escala comprovada: **mudanças passam por RFC/ADR**, versionamento e migração seguem `VERSIONING` (breaking changes com guia), a conformidade é **auditável e reproduzível continuamente** (não pontual), e o sistema sustenta a certificação **release após release** (não uma foto única). Enterprise é o nível de um sistema que outros sistemas podem tomar como exemplo do Studio UX.

**EN**

- **Bronze — compliant floor.** Every screen is ≥ Bronze (no eliminator anywhere); version dependency declared; official components/tokens only. The system is correct and safe end to end.
- **Silver — consistent.** Bronze **+** every screen ≥ Silver and full cross-screen consistency (P20).
- **Gold — polished.** Silver **+** every screen ≥ Gold, full accessibility across all flows in both themes, and continuously monitored conformance (`COMPLIANCE`) with no open regressions.
- **Platinum — reference.** Gold **+** key journeys certified on **Desktop AND Mobile** (sibling products, each in its layout, P4), flawless visual DNA and rhythm across the product, and bilingual "why" documentation.
- **Enterprise — trusted platform.** Platinum **+** proven governance at scale: **changes go through RFC/ADR**, versioning and migration follow `VERSIONING` (breaking changes with a guide), conformance is **continuously auditable and reproducible** (not a snapshot), and the system sustains certification **release after release**. Enterprise is the level of a system other systems can take as an example of Studio UX.

### 8.3 Recertificar e perder certificação · Recertify and lose certification
**PT** — A certificação de sistema é um **estado vivo**, não um selo permanente. Recertifica-se a cada release relevante (nova MAJOR/MINOR — `VERSIONING`) e periodicamente. **Perde-se o nível** quando: um eliminatório aparece em qualquer tela; um fork/valor mágico é introduzido (o `LINTER` detecta); a conformidade contínua cai abaixo do limiar do nível (`COMPLIANCE`); uma mudança estrutural entra sem RFC/ADR; ou a acessibilidade regride. A queda é para o maior nível ainda satisfeito — nunca se "mantém no papel" um nível que a realidade não sustenta (o pior erro seria um selo que mente).
**EN** — System certification is a **living state**, not a permanent seal. It is recertified at each relevant release (new MAJOR/MINOR — `VERSIONING`) and periodically. **The level is lost** when: an eliminator appears in any screen; a fork/magic value is introduced (the `LINTER` catches it); continuous conformance drops below the level's threshold (`COMPLIANCE`); a structural change lands without RFC/ADR; or accessibility regresses. The drop is to the highest level still met — a level reality doesn't sustain is never kept "on paper".

### 8.4 Fronteira com Linter e Compliance · Boundary with Linter and Compliance
**PT** — *Linter detecta · Compliance mede · Certification gradua.* A certificação de sistema **consome** as violações do `LINTER` (detecção automática) e as métricas do `COMPLIANCE` (medição contínua) e as transforma em nível/selo. Ela não recria a detecção nem a medição — agrega, como sempre fez com os P# (SSOT).
**EN** — *Linter detects · Compliance measures · Certification grades.* System certification **consumes** the `LINTER`'s violations (automatic detection) and the `COMPLIANCE` metrics (continuous measurement) and turns them into a level/badge. It recreates neither detection nor measurement — it aggregates, as it always has with the P# (SSOT).

---

## 9. Estado da implementação · Implementation state

**PT** — Materializado em `tools/certification/certify.mjs` (v1.1.11), acionado por `studio audit <alvo>`. **Consome o Linter** (não re-detecta, §8.4) e gradua o **verificável estaticamente**: reprova o certificado (abaixo de Bronze) se qualquer eliminatório coberto pelo Linter falhar — `P1, P3, P4, P6, P7, P11, P14, P17, P18` (§5). É **honesto por construção** (§8.3, Art. 21): **não imprime nível** (Bronze→Platinum) porque isso dependeria de evidência humana (a11y nos 2 temas, estados, DNA visual, Desktop+Mobile); e é explícita sobre os eliminatórios que só a auditoria humana vê (`P12, P13, P19`). Alvo tela (`.html`) → laudo de tela; alvo projeto (com `studio-ux.json`) → laudo de sistema (shell `index.html` + `src/screens/*` + dependência de versão declarada, §8.1). **Achado real na estreia:** a ferramenta pegou que os geradores (`generate.mjs`/`templates.mjs`) emitiam valores mágicos (P1/P7) no `<style>` das telas; corrigido na fonte (literais → tokens), e agora todo projeto `studio create`+`generate` passa o piso automático. Selo que mente é o pior erro — por isso a ferramenta prefere reportar o que não pode provar a fingir um nível.
**EN** — Materialized in `tools/certification/certify.mjs` (v1.1.11), triggered by `studio audit <target>`. **Consumes the Linter** (does not re-detect, §8.4) and grades the **statically verifiable**: fails the certificate (below Bronze) if any Linter-covered eliminator fails — `P1, P3, P4, P6, P7, P11, P14, P17, P18` (§5). **Honest by construction** (§8.3, Art. 21): it **prints no level** (Bronze→Platinum), since that needs human evidence (a11y in both themes, states, visual DNA, Desktop+Mobile), and is explicit about the eliminators only a human audit sees (`P12, P13, P19`). Screen target → screen report; project target → system report (shell + screens + declared version dependency). **Real finding on debut:** the tool caught that the generators emitted magic values (P1/P7) in the screens' `<style>`; fixed at the source (literals → tokens), and now every `studio create`+`generate` project passes the automatic floor.

---

*Documento vivo. Mede o que os donos definem; se um P# ou uma checklist muda no dono, a auditoria muda na mesma leva, nas duas línguas. A certificação nunca cria regra — só a aplica. · Living document. It measures what the owners define; if a P# or a checklist changes at its owner, the audit changes in the same commit, in both languages. Certification never creates a rule — it only applies it.*
