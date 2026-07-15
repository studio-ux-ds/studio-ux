# STUDIO_UX_RFC_GUIDE.md — Guia de RFC · RFC Guide

> Documento normativo vivo. Responde a: **como uma mudança do Studio UX é proposta, discutida e aprovada antes de virar decisão — quando exige RFC, quem aprova, por que fluxo passa e o que fica escrito?**
> Living normative document. Answers: **how is a Studio UX change proposed, discussed and approved before becoming a decision — when an RFC is required, who approves, through which flow it passes, and what gets written down?**
> Governança: `STUDIO_UX.md` §7, `governance/STUDIO_UX_CONSTITUTION.md` (Art. 16). Par: `governance/STUDIO_UX_ADR_GUIDE.md`.

```
Architecture Boundary Check — STUDIO_UX_RFC_GUIDE
Resolve · Solves:            o processo oficial de RFC (Request for Comments) — quando uma mudança grande exige
                             proposta formal, quem aprova, o fluxo de estados e o formato da proposta. O dono do
                             "como propomos e discutimos uma mudança antes de decidir".
                             / the official RFC process — when a large change requires a formal proposal, who approves,
                             the state flow and the proposal format. The owner of "how we propose and discuss a change
                             before deciding".
Não pertence a outro porque · Not elsewhere because:
                             ADR_GUIDE registra o que FOI decidido (o depois); VERSIONING cuida da MECÂNICA de release;
                             CONSTITUTION apenas ORDENA que propostas virem RFC (Art. 16). Faltava o dono do processo
                             de deliberação em si.
                             / ADR_GUIDE records what WAS decided (the after); VERSIONING handles release MECHANICS;
                             CONSTITUTION only MANDATES that proposals become RFCs (Art. 16). The missing piece is the
                             owner of the deliberation process itself.
Complementa · Complements:   ADR_GUIDE, VERSIONING, CONSTITUTION (Art. 16), STUDIO_UX.md §7, ROADMAP, CHANGELOG.
Nunca substitui · Never replaces: ADR_GUIDE (registro da decisão), VERSIONING (mecânica de versão), CHANGELOG (histórico),
                             ROADMAP (fases), nem os donos de domínio.
Dono · Owner:                este doc, para o domínio "processo de RFC".
                             / this doc, for the "RFC process" domain.
```

---

## Objetivo · Objective
**PT** — Fixar o processo único pelo qual uma mudança grande do Studio UX é **proposta, discutida e aprovada** antes de virar decisão, para que nada estrutural mude de improviso (Art. 16, Art. 20). O RFC é o espaço deliberado onde uma ideia amadurece à vista de todos, com motivação, alternativas e riscos explícitos — de modo que a decisão final (registrada depois num ADR) seja consciente, não acidental.
**EN** — Fix the single process by which a large Studio UX change is **proposed, discussed and approved** before it becomes a decision, so nothing structural changes on a whim (Art. 16, Art. 20). The RFC is the deliberate space where an idea matures in the open, with explicit motivation, alternatives and risks — so the final decision (later recorded in an ADR) is conscious, not accidental.

## Escopo · Scope
**PT** — Quando um RFC é necessário e quando não, quem aprova, o fluxo de estados, a numeração, o formato da proposta e as relações com ADR e com a Constituição. **Não** registra a decisão final (isso é `ADR_GUIDE`), não define a mecânica de release (é `VERSIONING`) nem as fases do produto (é `ROADMAP`).
**EN** — When an RFC is required and when not, who approves, the state flow, the numbering, the proposal format, and the relations with ADR and with the Constitution. It does **not** record the final decision (`ADR_GUIDE`), define release mechanics (`VERSIONING`) or product phases (`ROADMAP`).

---

## 1. O que é um RFC · What an RFC is
**PT** — Um **RFC (Request for Comments)** é uma proposta formal e discutível de mudança: um documento que descreve o que se quer mudar, por quê, como, o que se considerou como alternativa e que riscos há — **antes** de qualquer decisão. É a ferramenta que transforma "acho que deveríamos…" em uma proposta avaliável, com começo (Rascunho) e fim (Aprovado, Rejeitado ou Retirado). O RFC é o *antes* da decisão; o ADR é o *depois* (§6). Enquanto o ADR é curto e afirmativo (o veredito), o RFC é exploratório e argumentativo (a deliberação).
**EN** — An **RFC (Request for Comments)** is a formal, discussable change proposal: a document describing what one wants to change, why, how, what was considered as an alternative and what risks exist — **before** any decision. It is the tool that turns "I think we should…" into an evaluable proposal, with a beginning (Draft) and an end (Approved, Rejected or Withdrawn). The RFC is the *before* of the decision; the ADR is the *after* (§6). While the ADR is short and affirmative (the verdict), the RFC is exploratory and argumentative (the deliberation).

## 2. Quando um RFC é necessário · When an RFC is required
**PT** — Exige-se RFC para toda mudança **grande** — aquela que mexe na estrutura, não só no detalhe. São candidatas obrigatórias: mudanças em **arquitetura** ou nas **fronteiras/SSOT** entre domínios (§11); criação, revogação ou mudança de semântica de **princípio (P#)**; alteração de **versionamento** (regras de SemVer, depreciação, LTS); qualquer **breaking change** de contrato; e — sempre, sem exceção — **emendar a Constituição** (adicionar, revogar ou alterar um artigo). Em uma frase: *se a mudança altera como o produto é pensado, governado ou versionado, ela nasce como RFC.*
**EN** — An RFC is required for every **large** change — one that touches structure, not just detail. Mandatory candidates: changes to **architecture** or to the **boundaries/SSOT** between domains (§11); creating, repealing or changing the semantics of a **principle (P#)**; altering **versioning** (SemVer rules, deprecation, LTS); any contract **breaking change**; and — always, without exception — **amending the Constitution** (adding, repealing or altering an article). In one sentence: *if the change alters how the product is thought, governed or versioned, it is born as an RFC.*

## 3. Quando NÃO é necessário · When it is NOT required
**PT** — Mudança **pequena e retrocompatível** não precisa de RFC: vai direto pelo fluxo de **PATCH** (correção/esclarecimento de doc) ou **MINOR** (adição retrocompatível — novo token, componente ou padrão que não quebra nada), com entrada no CHANGELOG (`VERSIONING`). A régua: *se a mudança não move fronteira, não quebra contrato, não toca princípio nem Constituição, e um consumidor conforme continua conforme — não precisa de RFC.* Exigir RFC para o pequeno emperra o produto tanto quanto pular o RFC no grande o desgoverna; o equilíbrio é a regra.
**EN** — A **small, backward-compatible** change needs no RFC: it goes straight through the **PATCH** (doc fix/clarification) or **MINOR** (backward-compatible addition — a new token, component or pattern that breaks nothing) flow, with a CHANGELOG entry (`VERSIONING`). The ruler: *if the change moves no boundary, breaks no contract, touches neither principle nor Constitution, and a compliant consumer stays compliant — it needs no RFC.* Requiring an RFC for the small stalls the product as much as skipping the RFC on the large ungoverns it; the balance is the rule.

## 4. Quem aprova · Who approves
**PT** — Nesta fase do produto, a **autoridade final de aprovação é humana e explícita: o Robson.** Nenhum RFC se considera aprovado por decurso de prazo, por silêncio ou por decisão de uma IA (Art. 20 — na dúvida, não se inventa: propõe-se e aguarda-se). Uma IA pode **redigir** um RFC, **argumentar** as alternativas e **recomendar** um caminho, mas a transição para *Aprovado* ou *Rejeitado* é sempre um ato humano deliberado. À medida que o ecossistema crescer, o rol de aprovadores pode ser ampliado — mas essa própria ampliação seria, ela mesma, um RFC.
**EN** — In this product phase, the **final approval authority is human and explicit: Robson.** No RFC is considered approved by elapsed time, by silence or by an AI's decision (Art. 20 — when in doubt, do not invent: propose and await). An AI may **draft** an RFC, **argue** the alternatives and **recommend** a path, but the transition to *Approved* or *Rejected* is always a deliberate human act. As the ecosystem grows, the roster of approvers may widen — but that widening would itself be an RFC.

## 5. O fluxo de estados · The state flow
**PT** — Um RFC percorre estados explícitos, e a transição de saída é sempre uma decisão humana:

- **Rascunho · Draft** — a proposta está sendo escrita; incompleta e livre para mudar. Sai para *Em discussão* quando está pronta para ser avaliada.
- **Em discussão · Under discussion** — a proposta está completa e em avaliação: alternativas debatidas, riscos pesados, perguntas em aberto respondidas. É o coração do processo — o "comments" do Request for Comments.
- **Aprovado · Approved** — decisão humana explícita de adotar. A partir daqui, gera **um ou mais ADRs** (§6) que registram a decisão, e a mudança entra na mecânica de versão (`VERSIONING`).
- **Rejeitado · Rejected** — decisão humana explícita de **não** adotar. Fica registrado com o porquê, para que a mesma proposta não volte sem memória.
- **Implementado · Implemented** — a mudança aprovada foi materializada (docs/versão atualizadas). Encerra o ciclo; o RFC vira registro histórico da deliberação.
- **Retirado · Withdrawn** — o proponente recolhe a proposta antes da decisão (perdeu sentido, foi substituída por outra melhor). Também fica registrado.

Caminho típico: **Rascunho → Em discussão → Aprovado → Implementado**. Ramos possíveis: **→ Rejeitado** (a qualquer momento após discussão) e **→ Retirado** (pelo proponente, antes da decisão).

**EN** — An RFC travels through explicit states, and the exit transition is always a human decision:

- **Draft** — the proposal is being written; incomplete and free to change. Exits to *Under discussion* when ready to be evaluated.
- **Under discussion** — the proposal is complete and under evaluation: alternatives debated, risks weighed, open questions answered. It is the heart of the process — the "comments" in Request for Comments.
- **Approved** — an explicit human decision to adopt. From here it yields **one or more ADRs** (§6) recording the decision, and the change enters version mechanics (`VERSIONING`).
- **Rejected** — an explicit human decision **not** to adopt. Recorded with the why, so the same proposal does not return without memory.
- **Implemented** — the approved change was materialized (docs/version updated). Closes the cycle; the RFC becomes the historical record of the deliberation.
- **Withdrawn** — the proposer pulls the proposal before the decision (it lost relevance, or a better one replaced it). Also recorded.

Typical path: **Draft → Under discussion → Approved → Implemented**. Possible branches: **→ Rejected** (any time after discussion) and **→ Withdrawn** (by the proposer, before the decision).

## 6. Numeração · Numbering
**PT** — Os RFCs são numerados numa **sequência global própria** — `RFC-001`, `RFC-002`, … — independente da sequência dos ADRs (são séries distintas). O número é **imutável e nunca reusado**: um RFC Rejeitado ou Retirado mantém seu número para sempre; o próximo pega o próximo livre. Não se renumera (mesma regra de princípios, artigos e ADRs). Confirmar o próximo número na verdade do git e dos arquivos, nunca de cabeça (Art. 5).
**EN** — RFCs are numbered in their **own global sequence** — `RFC-001`, `RFC-002`, … — independent of the ADR sequence (distinct series). The number is **immutable and never reused**: a Rejected or Withdrawn RFC keeps its number forever; the next takes the next free slot. No renumbering (the same rule as principles, articles and ADRs). Confirm the next number from the truth of git and files, never from memory (Art. 5).

## 7. O template de um RFC · The RFC template
**PT** — Todo RFC é escrito em **prosa bilíngue** (nunca código, §13) e traz, nesta ordem, sete partes:

- **Resumo · Summary** — a proposta em poucas linhas: o que se quer mudar e o efeito esperado. Quem lê só isto já entende o essencial.
- **Motivação · Motivation** — o problema que justifica a mudança: que dor, que limitação, que fronteira mal resolvida. Sem motivação clara, não há RFC.
- **Proposta detalhada · Detailed proposal** — a mudança em profundidade: o que muda, onde, como se comporta, que documentos-donos são afetados, que princípios/artigos toca.
- **Alternativas · Alternatives** — os outros caminhos considerados e por que a proposta é preferível a cada um (inclusive a alternativa "não fazer nada").
- **Impacto e riscos · Impact and risks** — o que a mudança quebra ou arrisca: é breaking? (`VERSIONING`); afeta que consumidores?; que efeitos colaterais em outros domínios?
- **Plano de adoção/migração · Adoption/migration plan** — como a mudança entra sem trauma: ciclo de depreciação, guia de migração (se breaking), ordem de rollout, uma frente por vez (Art. 15).
- **Perguntas em aberto · Open questions** — o que ainda não está resolvido e precisa de discussão antes da aprovação. Um RFC com perguntas em aberto **não** é aprovado até que elas sejam respondidas.

**EN** — Every RFC is written in **bilingual prose** (never code, §13) and carries, in this order, seven parts:

- **Summary** — the proposal in a few lines: what to change and the expected effect. Reading only this conveys the essentials.
- **Motivation** — the problem that justifies the change: which pain, which limitation, which ill-resolved boundary. Without clear motivation, there is no RFC.
- **Detailed proposal** — the change in depth: what changes, where, how it behaves, which owner documents are affected, which principles/articles it touches.
- **Alternatives** — the other paths considered and why the proposal is preferable to each (including the "do nothing" alternative).
- **Impact and risks** — what the change breaks or risks: is it breaking? (`VERSIONING`); which consumers are affected?; what side effects on other domains?
- **Adoption/migration plan** — how the change enters without trauma: deprecation cycle, migration guide (if breaking), rollout order, one front at a time (Art. 15).
- **Open questions** — what is still unresolved and needs discussion before approval. An RFC with open questions is **not** approved until they are answered.

## 8. Relação com ADR e com a Constituição · Relation to ADR and to the Constitution
**PT** — **RFC → ADR:** um RFC **aprovado** gera **um ou mais ADRs** (`ADR_GUIDE`), que registram cada decisão arquitetural que ele consolida. A separação é nítida: **o RFC serve para PROPOR e discutir; o ADR serve para REGISTRAR o que foi decidido.** O RFC pode ser longo e argumentativo; o ADR é curto e afirmativo. **RFC + Constituição:** emendar a Constituição (adicionar, revogar ou alterar um artigo) **exige** o caminho mais pesado — um RFC aprovado por decisão humana explícita **+** um ADR que registra a emenda **+** uma entrada no CHANGELOG como evento notável (`CONSTITUTION`, fluxo de emenda). Nunca se emenda a Constituição de passagem, nem por PATCH silencioso.
**EN** — **RFC → ADR:** an **approved** RFC yields **one or more ADRs** (`ADR_GUIDE`), recording each architectural decision it consolidates. The separation is sharp: **the RFC is for PROPOSING and discussing; the ADR is for RECORDING what was decided.** The RFC may be long and argumentative; the ADR is short and affirmative. **RFC + Constitution:** amending the Constitution (adding, repealing or altering an article) **requires** the heaviest path — an RFC approved by explicit human decision **+** an ADR recording the amendment **+** a CHANGELOG entry as a notable event (`CONSTITUTION`, amendment flow). The Constitution is never amended in passing, nor by a silent PATCH.

---

## Responsabilidades · Responsibilities
**PT** — Definir o processo de RFC: quando é exigido, quem aprova, o fluxo de estados, a numeração e o formato da proposta; ser o dono referenciado pela `CONSTITUTION` (Art. 16 e fluxo de emenda) e pelo `STUDIO_UX.md` §7 para "como propomos mudanças".
**EN** — Define the RFC process: when it is required, who approves, the state flow, the numbering and the proposal format; be the owner referenced by the `CONSTITUTION` (Art. 16 and amendment flow) and `STUDIO_UX.md` §7 for "how we propose changes".

## Não-responsabilidades · Non-responsibilities
**PT** — Não registra a decisão final (é `ADR_GUIDE`); não define a mecânica de release nem o que é breaking (é `VERSIONING`); não define fases (é `ROADMAP`); não guarda o histórico (é `CHANGELOG`); não aprova por conta própria (aprovação é humana e explícita — §4).
**EN** — It does not record the final decision (`ADR_GUIDE`); it does not define release mechanics or what is breaking (`VERSIONING`); it does not define phases (`ROADMAP`); it does not hold history (`CHANGELOG`); it does not approve on its own (approval is human and explicit — §4).

## Integrações e dependências · Integrations and dependencies
**PT** — Referenciado pela `CONSTITUTION` (Art. 16 e no fluxo de emenda) e pelo `STUDIO_UX.md` §7. Alimenta o `ADR_GUIDE` (RFC aprovado → ADR) e a `VERSIONING` (a mudança aprovada entra pela mecânica de versão). Toca o `ROADMAP` quando a proposta cria ou reordena uma fase. Fecha no `CHANGELOG` quando implementada.
**EN** — Referenced by the `CONSTITUTION` (Art. 16 and in the amendment flow) and by `STUDIO_UX.md` §7. It feeds the `ADR_GUIDE` (approved RFC → ADR) and `VERSIONING` (the approved change enters version mechanics). It touches the `ROADMAP` when the proposal creates or reorders a phase. It closes in the `CHANGELOG` when implemented.

## Fluxos · Flows
**PT** — Fluxo padrão de proposta (Rascunho → Em discussão → decisão humana → Aprovado → gera ADR(s) → Implementado). Fluxo de recusa (→ Rejeitado, com o porquê registrado). Fluxo de retirada (→ Retirado pelo proponente antes da decisão). Fluxo de emenda constitucional (RFC aprovado + ADR + CHANGELOG — o caminho mais pesado).
**EN** — Standard proposal flow (Draft → Under discussion → human decision → Approved → yields ADR(s) → Implemented). Rejection flow (→ Rejected, with the why recorded). Withdrawal flow (→ Withdrawn by the proposer before the decision). Constitutional amendment flow (approved RFC + ADR + CHANGELOG — the heaviest path).

## Boas práticas · Best practices
**PT** — Escreva a Motivação antes da Proposta — se a dor não estiver clara, a proposta não está madura. Inclua sempre a alternativa "não fazer nada". Feche as Perguntas em aberto antes de pedir aprovação. Uma proposta por RFC. Ao aprovar, gere o(s) ADR(s) na mesma leva. Confirme o próximo número na verdade do git.
**EN** — Write the Motivation before the Proposal — if the pain isn't clear, the proposal isn't mature. Always include the "do nothing" alternative. Close Open questions before requesting approval. One proposal per RFC. On approval, generate the ADR(s) in the same commit. Confirm the next number from git's truth.

## Anti-padrões · Anti-patterns
**PT / EN**
- Fazer mudança estrutural (fronteira, princípio, versionamento) sem RFC (viola Art. 16). / Making a structural change without an RFC.
- RFC eterno "em discussão" sem nunca ir a decisão. / An eternal "under discussion" RFC that never reaches a decision.
- Considerar aprovado por silêncio, prazo ou decisão de IA (viola Art. 20). / Considering it approved by silence, elapsed time or an AI's decision.
- Pular o RFC para emendar a Constituição ou tocar um princípio. / Skipping the RFC to amend the Constitution or touch a principle.
- Reusar ou renumerar um número de RFC. / Reusing or renumbering an RFC number.
- Aprovar sem gerar o ADR correspondente (a decisão fica sem registro permanente). / Approving without generating the corresponding ADR.
- Usar o RFC como registro final da decisão (isso é do ADR — o RFC é a deliberação). / Using the RFC as the final decision record.

## Roadmap
**PT** — O processo de RFC é estável. Evoluções previstas: um índice navegável de RFCs (ponteiro, nunca duplicação), a ampliação deliberada do rol de aprovadores conforme o ecossistema cresça (via um RFC próprio) e a verificação por ferramenta de que toda mudança estrutural teve seu RFC. Nenhuma muda o formato da proposta definido aqui.
**EN** — The RFC process is stable. Foreseen evolutions: a navigable RFC index (pointer, never duplication), the deliberate widening of the approver roster as the ecosystem grows (via its own RFC), and tool-side verification that every structural change had its RFC. None change the proposal format defined here.

## Referências internas · Internal references
`governance/STUDIO_UX_CONSTITUTION.md` (Art. 16, fluxo de emenda) · `governance/STUDIO_UX_ADR_GUIDE.md` · `governance/STUDIO_UX_VERSIONING.md` · `STUDIO_UX.md` §7 · `STUDIO_UX_ROADMAP.md` · `CHANGELOG.md` · `context/STUDIO_UX_HANDOFF.md`

---

*Documento vivo. Dono do processo de RFC; o registro da decisão é do ADR_GUIDE, o histórico do CHANGELOG. · Living document. Owner of the RFC process; the decision record belongs to ADR_GUIDE, history to the CHANGELOG.*
