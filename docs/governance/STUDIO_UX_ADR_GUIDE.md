# STUDIO_UX_ADR_GUIDE.md — Guia de ADR · ADR Guide

> Documento normativo vivo. Responde a: **como uma decisão arquitetural do Studio UX é registrada — quando vira ADR, quando não, como se numera, em que estado vive e o que fica escrito?**
> Living normative document. Answers: **how is a Studio UX architectural decision recorded — when it becomes an ADR, when not, how it is numbered, in what state it lives, and what gets written down?**
> Governança: `STUDIO_UX.md` §7, `governance/STUDIO_UX_CONSTITUTION.md` (Art. 16). Par: `governance/STUDIO_UX_RFC_GUIDE.md`.

```
Architecture Boundary Check — STUDIO_UX_ADR_GUIDE
Resolve · Solves:            o padrão oficial de ADR (Architecture Decision Record) — quando registrar uma decisão,
                             como numerá-la de forma imutável, seus estados e o formato do registro. O dono do
                             "como registramos o que foi decidido".
                             / the official ADR standard — when to record a decision, how to number it immutably,
                             its states and the record's format. The owner of "how we record what was decided".
Não pertence a outro porque · Not elsewhere because:
                             RFC_GUIDE cuida de PROPOR/discutir (o antes da decisão); VERSIONING cuida da MECÂNICA de
                             release; CONSTITUTION apenas ORDENA que decisões virem ADR (Art. 16). Faltava o dono do
                             padrão do registro em si.
                             / RFC_GUIDE handles PROPOSING/discussing (before the decision); VERSIONING handles release
                             MECHANICS; CONSTITUTION only MANDATES that decisions become ADRs (Art. 16). The missing
                             piece is the owner of the record's standard itself.
Complementa · Complements:   RFC_GUIDE, VERSIONING, CONSTITUTION (Art. 16), STUDIO_UX.md §7, CHANGELOG, HANDOFF.
Nunca substitui · Never replaces: RFC_GUIDE (proposta/discussão), VERSIONING (mecânica de versão), CHANGELOG (histórico),
                             nem os donos de domínio onde cada ADR mora.
Dono · Owner:                este doc, para o domínio "padrão de ADR".
                             / this doc, for the "ADR standard" domain.
```

---

## Objetivo · Objective
**PT** — Fixar o padrão único de como o Studio UX registra decisões arquiteturais, para que nenhuma escolha estrutural aconteça em silêncio (Art. 16) e para que qualquer pessoa ou IA, anos depois, entenda **o que foi decidido, por quê e o que foi descartado** — sem depender da memória de ninguém (Art. 5). Um ADR é a prova documental permanente de uma decisão; este guia diz como essa prova é escrita e mantida.
**EN** — Fix the single standard for how Studio UX records architectural decisions, so no structural choice happens in silence (Art. 16) and so any person or AI, years later, understands **what was decided, why, and what was discarded** — without relying on anyone's memory (Art. 5). An ADR is the permanent documentary proof of a decision; this guide states how that proof is written and kept.

## Escopo · Scope
**PT** — O que é um ADR, quando criar e quando não, a numeração global imutável, os cinco estados e suas transições, o formato do registro e as relações com RFC e com versionamento. **Não** define o processo de propor/discutir uma mudança (isso é `RFC_GUIDE`) nem a mecânica de release (isso é `VERSIONING`).
**EN** — What an ADR is, when to create one and when not, the immutable global numbering, the five states and their transitions, the record format, and the relations with RFC and versioning. It does **not** define the process of proposing/discussing a change (`RFC_GUIDE`) or release mechanics (`VERSIONING`).

---

## 1. O que é um ADR · What an ADR is
**PT** — Um **ADR (Architecture Decision Record)** é um registro curto e permanente de **uma** decisão arquitetural relevante: o contexto que a exigiu, a decisão tomada, a consequência que ela impõe e as alternativas descartadas. Não é um plano de implementação, não é um tutorial e não é um relatório de bug — é o "porquê" institucional de uma escolha estrutural, escrito em prosa bilíngue e imutável no que já foi decidido. O ADR-001 (a fronteira Grammar × Layout System) vive dentro de `STUDIO_UX_GRAMMAR.md` e serve de modelo permanente do formato.
**EN** — An **ADR (Architecture Decision Record)** is a short, permanent record of **one** relevant architectural decision: the context that required it, the decision taken, the consequence it imposes and the discarded alternatives. It is not an implementation plan, not a tutorial and not a bug report — it is the institutional "why" of a structural choice, written in bilingual prose and immutable in what was already decided. ADR-001 (the Grammar × Layout System boundary) lives inside `STUDIO_UX_GRAMMAR.md` and is the permanent format model.

## 2. Quando criar um ADR · When to create an ADR
**PT** — Cria-se um ADR para **toda decisão arquitetural relevante** (Art. 16) — aquela que, se revisitada no futuro, precisará do "porquê". Sinais de que a decisão pede ADR: define ou move uma **fronteira de domínio** (SSOT, §11); cria, aposenta ou muda a semântica de um **princípio (P#)**, token, componente ou padrão; introduz um **breaking change** (`VERSIONING`); emenda um **artigo da Constituição** (sempre exige ADR + RFC); resolve uma ambiguidade estrutural entre dois documentos; ou fixa uma regra que vários documentos passarão a referenciar. Um **RFC aprovado** quase sempre gera um ou mais ADRs (§7).
**EN** — Create an ADR for **every relevant architectural decision** (Art. 16) — the one that, if revisited later, will need its "why". Signs a decision needs an ADR: it defines or moves a **domain boundary** (SSOT, §11); it creates, retires or changes the semantics of a **principle (P#)**, token, component or pattern; it introduces a **breaking change** (`VERSIONING`); it amends a **Constitution article** (always requires ADR + RFC); it resolves a structural ambiguity between two documents; or it fixes a rule that several documents will then reference. An **approved RFC** almost always yields one or more ADRs (§7).

## 3. Quando NÃO criar um ADR · When NOT to create an ADR
**PT** — Não se cria ADR para o **trivial e reversível**: uma correção de redação, um esclarecimento que não muda contrato (PATCH), um ajuste de exemplo, uma decisão local sem efeito em outros documentos. A régua: *se desfazer a escolha amanhã não custa nada e não afeta nenhum consumidor nem outro documento, não é ADR.* Registrar o trivial infla o histórico e esconde as decisões que importam — o oposto do objetivo. Mudança pequena e reversível segue pelo fluxo normal de PATCH/MINOR (`VERSIONING`), com entrada no CHANGELOG, sem ADR.
**EN** — Do not create an ADR for the **trivial and reversible**: a wording fix, a clarification that doesn't change the contract (PATCH), an example tweak, a local decision with no effect on other documents. The ruler: *if undoing the choice tomorrow costs nothing and affects no consumer or other document, it is not an ADR.* Recording the trivial inflates history and hides the decisions that matter — the opposite of the goal. A small, reversible change follows the normal PATCH/MINOR flow (`VERSIONING`), with a CHANGELOG entry, no ADR.

## 4. Numeração global, sequencial e imutável · Global, sequential, immutable numbering
**PT** — Os ADRs são numerados numa **sequência global única** — `ADR-001`, `ADR-002`, … — que atravessa todo o produto, independentemente de em qual documento cada um mora. O `ADR-001` já existe (`GRAMMAR`); o próximo a nascer é o `ADR-002`. O número é **imutável e nunca reusado**: um ADR aposentado (Deprecated/Superseded/Rejected) mantém seu número para sempre; um novo pega o próximo livre. Renumerar é proibido — é a mesma regra dos princípios (Art. 11) e dos artigos (Art. 14). Confirmar o próximo número livre pela verdade do git e dos arquivos, nunca de cabeça (Art. 5).
**EN** — ADRs are numbered in a **single global sequence** — `ADR-001`, `ADR-002`, … — that spans the whole product, regardless of which document each lives in. `ADR-001` already exists (`GRAMMAR`); the next to be born is `ADR-002`. The number is **immutable and never reused**: a retired ADR (Deprecated/Superseded/Rejected) keeps its number forever; a new one takes the next free slot. Renumbering is forbidden — the same rule as principles (Art. 11) and articles (Art. 14). Confirm the next free number from the truth of git and files, never from memory (Art. 5).

## 5. Onde os ADRs moram · Where ADRs live
**PT** — Um ADR mora **dentro do documento dono do domínio que ele afeta** (SSOT, §11) — como o `ADR-001` vive em `GRAMMAR`, uma decisão de token viveria em `DESIGN_TOKENS`, uma de versão em `VERSIONING`. Isso mantém a decisão ao lado da regra que ela justifica, onde quem lê a regra encontra o porquê. Um **índice de ADRs** (lista de número, título, estado e documento-dono) pode ser mantido para navegação, mas é apenas um *ponteiro*: nunca duplica o conteúdo do ADR (§11) — a fonte da verdade de cada ADR continua sendo o documento-dono.
**EN** — An ADR lives **inside the document that owns the domain it affects** (SSOT, §11) — as `ADR-001` lives in `GRAMMAR`, a token decision would live in `DESIGN_TOKENS`, a versioning one in `VERSIONING`. This keeps the decision next to the rule it justifies, where whoever reads the rule finds the why. An **ADR index** (a list of number, title, state and owning document) may be kept for navigation, but it is only a *pointer*: it never duplicates the ADR's content (§11) — each ADR's source of truth remains the owning document.

## 6. Os cinco estados · The five states
**PT** — Todo ADR carrega um **Estado** explícito. As transições são as únicas permitidas:

- **Draft · Rascunho** — a decisão está escrita mas ainda não foi aceita. Estado de trabalho; pode mudar livremente. Sai para *Accepted* (aceito) ou *Rejected* (recusado).
- **Accepted · Aceito** — a decisão vale e está em vigor. É o estado "vivo" normal de um ADR. A partir daqui, o texto do que foi decidido é imutável; só o Estado muda no futuro.
- **Deprecated · Depreciado** — a decisão ainda descreve a realidade, mas está a caminho de sair; aponta o rumo e, quando houver, o substituto. Precede uma remoção conforme o ciclo de depreciação (`VERSIONING` §4).
- **Superseded · Substituído** — a decisão foi trocada por outra: **aponta obrigatoriamente para o ADR que a substituiu** (ex.: "Superseded por ADR-00X"). O ADR antigo permanece legível para explicar a história; o novo é a verdade atual.
- **Rejected · Recusado** — a proposta de decisão foi avaliada e **não** adotada. Fica registrada mesmo assim, para que a mesma ideia não volte sem memória de por que foi descartada.

Um ADR nunca é apagado nem renumerado: ele muda de Estado. *Accepted* → *Deprecated* → (removido do contrato numa MAJOR, mas o registro fica); *Accepted* → *Superseded* (com ponteiro para o sucessor); *Draft* → *Rejected*.

**EN** — Every ADR carries an explicit **State**. These are the only permitted transitions:

- **Draft** — the decision is written but not yet accepted. A working state; may change freely. Exits to *Accepted* or *Rejected*.
- **Accepted** — the decision holds and is in force. The normal "live" state of an ADR. From here, the text of what was decided is immutable; only the State changes later.
- **Deprecated** — the decision still describes reality but is on its way out; it points the direction and, when there is one, the replacement. Precedes a removal per the deprecation cycle (`VERSIONING` §4).
- **Superseded** — the decision was replaced by another: it **must point to the ADR that superseded it** (e.g. "Superseded by ADR-00X"). The old ADR stays readable to explain the history; the new one is the current truth.
- **Rejected** — the proposed decision was evaluated and **not** adopted. It is recorded anyway, so the same idea does not return without the memory of why it was discarded.

An ADR is never deleted nor renumbered: it changes State. *Accepted* → *Deprecated* → (removed from the contract in a MAJOR, but the record stays); *Accepted* → *Superseded* (with a pointer to the successor); *Draft* → *Rejected*.

## 7. O template de um ADR · The ADR template
**PT** — Todo ADR é escrito em **prosa bilíngue** (nunca código, §13) e traz, nesta ordem, cinco partes:

- **Título e cabeçalho** — `ADR-00N — <nome curto da decisão>`, com o **Estado** atual visível logo abaixo.
- **Contexto · Context** — a situação e a força que exigiram a decisão: que ambiguidade, que dor, que fronteira estava indefinida. Quem lê entende por que houve de se decidir algo.
- **Decisão · Decision** — o que foi decidido, em uma ou poucas frases afirmativas e absolutas. É o coração do ADR; deve poder ser citado isoladamente (como "Grammar diz o que existe; Layout System diz onde existe" no ADR-001).
- **Consequência · Consequence** — o que essa decisão passa a impor: o que agora é permitido, o que fica proibido, que documentos herdam a regra, que fronteira fica selada.
- **Alternativas consideradas · Alternatives considered** — os caminhos avaliados e **por que** foram descartados. Esta parte é o que impede a decisão de ser reaberta por esquecimento: registra a memória do "já pensamos nisso".
- **Estado · State** — Draft / Accepted / Deprecated / Superseded (→ ADR sucessor) / Rejected, com a versão em que o Estado mudou.

O `ADR-001` em `GRAMMAR` é a referência viva desse formato (Contexto → Decisão → Consequência, com a fronteira selada). Novos ADRs seguem o mesmo molde, acrescentando Alternativas e Estado explícitos.

**EN** — Every ADR is written in **bilingual prose** (never code, §13) and carries, in this order, five parts:

- **Title and header** — `ADR-00N — <short decision name>`, with the current **State** visible right below.
- **Context** — the situation and force that required the decision: which ambiguity, which pain, which boundary was undefined. The reader understands why something had to be decided.
- **Decision** — what was decided, in one or a few affirmative, absolute sentences. It is the heart of the ADR; it must be quotable on its own (like "Grammar says what exists; Layout System says where it exists" in ADR-001).
- **Consequence** — what the decision now imposes: what is allowed, what is forbidden, which documents inherit the rule, which boundary is sealed.
- **Alternatives considered** — the paths evaluated and **why** they were discarded. This part is what keeps the decision from being reopened by forgetfulness: it records the memory of "we already thought about this".
- **State** — Draft / Accepted / Deprecated / Superseded (→ successor ADR) / Rejected, with the version in which the State changed.

`ADR-001` in `GRAMMAR` is the living reference of this format (Context → Decision → Consequence, sealing the boundary). New ADRs follow the same mold, adding explicit Alternatives and State.

## 8. Relação com RFC e com Versionamento · Relation to RFC and to Versioning
**PT** — **RFC → ADR:** o RFC (`RFC_GUIDE`) é onde uma mudança grande é *proposta e discutida*; o ADR é onde a decisão resultante é *registrada*. Um RFC aprovado frequentemente gera **um ou mais** ADRs (um por decisão arquitetural que ele consolida). RFC é o "antes" (deliberação); ADR é o "depois" (o veredito permanente). **VERSIONING → ADR:** todo **breaking change** vira ADR (`VERSIONING` §3), e emendar a **Constituição** exige o caminho pesado — RFC aprovado **+** ADR **+** entrada no CHANGELOG (`CONSTITUTION`, fluxo de emenda). O ADR registra o *porquê* da mudança; o CHANGELOG registra *que* ela aconteceu e *quando*; a tag torna a versão imutável.
**EN** — **RFC → ADR:** the RFC (`RFC_GUIDE`) is where a large change is *proposed and discussed*; the ADR is where the resulting decision is *recorded*. An approved RFC often yields **one or more** ADRs (one per architectural decision it consolidates). RFC is the "before" (deliberation); ADR is the "after" (the permanent verdict). **VERSIONING → ADR:** every **breaking change** becomes an ADR (`VERSIONING` §3), and amending the **Constitution** requires the heavy path — an approved RFC **+** an ADR **+** a CHANGELOG entry (`CONSTITUTION`, amendment flow). The ADR records the *why* of the change; the CHANGELOG records *that* it happened and *when*; the tag makes the version immutable.

---

## Responsabilidades · Responsibilities
**PT** — Definir o padrão de ADR, seus estados e transições, a numeração global imutável e o formato do registro; ser o dono referenciado pela `CONSTITUTION` (Art. 16) e pelo `STUDIO_UX.md` §7 para "como registramos decisões".
**EN** — Define the ADR standard, its states and transitions, the immutable global numbering and the record format; be the owner referenced by the `CONSTITUTION` (Art. 16) and `STUDIO_UX.md` §7 for "how we record decisions".

## Não-responsabilidades · Non-responsibilities
**PT** — Não conduz a proposta/discussão de mudanças (é `RFC_GUIDE`); não define a mecânica de release nem o que é breaking (é `VERSIONING`); não guarda o histórico (é `CHANGELOG`); não decide números de cabeça (confirmar na verdade do git — Art. 5).
**EN** — It does not run the proposing/discussing of changes (`RFC_GUIDE`); it does not define release mechanics or what is breaking (`VERSIONING`); it does not hold history (`CHANGELOG`); it does not decide numbers from memory (confirm from git's truth — Art. 5).

## Integrações e dependências · Integrations and dependencies
**PT** — Referenciado pela `CONSTITUTION` (Art. 16, e no fluxo de emenda), pelo `STUDIO_UX.md` §7 e pelo `VERSIONING` (breaking → ADR). Recebe entrada do `RFC_GUIDE` (RFC aprovado → ADR). Cada ADR mora no documento-dono do domínio afetado (SSOT, §11) e é referenciado pelo CHANGELOG na entrada da versão correspondente.
**EN** — Referenced by the `CONSTITUTION` (Art. 16, and in the amendment flow), by `STUDIO_UX.md` §7 and by `VERSIONING` (breaking → ADR). It receives input from `RFC_GUIDE` (approved RFC → ADR). Each ADR lives in the owning document of the affected domain (SSOT, §11) and is referenced by the CHANGELOG in the corresponding version entry.

## Fluxos · Flows
**PT** — Fluxo de nascimento (decisão relevante → Draft → decisão humana → Accepted, no documento-dono, com número global livre). Fluxo de substituição (Accepted → Superseded, com ponteiro para o ADR sucessor, que nasce Accepted). Fluxo de depreciação (Accepted → Deprecated → remoção do contrato numa MAJOR, registro mantido). Fluxo de recusa (Draft → Rejected, registro mantido).
**EN** — Birth flow (relevant decision → Draft → human decision → Accepted, in the owning document, with the next free global number). Supersession flow (Accepted → Superseded, with a pointer to the successor ADR, which is born Accepted). Deprecation flow (Accepted → Deprecated → removal from the contract in a MAJOR, record kept). Rejection flow (Draft → Rejected, record kept).

## Boas práticas · Best practices
**PT** — Escreva o ADR **junto** da decisão, não depois. Mantenha-o curto: uma decisão por ADR. Torne a "Decisão" citável isoladamente. Registre sempre as alternativas descartadas com o porquê. Ao substituir, aponte o sucessor pelos dois lados (o novo cita o velho; o velho vira Superseded → novo). Confirme o próximo número na verdade do git.
**EN** — Write the ADR **alongside** the decision, not after. Keep it short: one decision per ADR. Make the "Decision" quotable on its own. Always record discarded alternatives with the why. When superseding, link the successor both ways (the new cites the old; the old becomes Superseded → new). Confirm the next number from git's truth.

## Anti-padrões · Anti-patterns
**PT / EN**
- Decidir algo estrutural sem registrar em ADR (viola Art. 16). / Deciding something structural without recording an ADR.
- Reusar ou renumerar um número de ADR. / Reusing or renumbering an ADR number.
- Transformar o ADR em spec/tutorial de implementação (ele registra a decisão, não o passo a passo). / Turning the ADR into an implementation spec/tutorial.
- Apagar um ADR em vez de mudá-lo para Deprecated/Superseded/Rejected. / Deleting an ADR instead of moving it to Deprecated/Superseded/Rejected.
- Substituir sem apontar o sucessor. / Superseding without pointing to the successor.
- Duplicar o conteúdo do ADR num índice (o índice só aponta — SSOT). / Duplicating the ADR content in an index.
- Registrar o trivial e reversível como ADR (inflaciona e esconde o que importa). / Recording the trivial and reversible as an ADR.

## Roadmap
**PT** — O padrão de ADR é estável. Evoluções previstas: um índice navegável de ADRs (ponteiro, nunca duplicação) e, quando a plataforma amadurecer, a verificação por ferramenta (`Linter`/CLI) de que toda breaking change tem seu ADR. Nenhuma dessas evoluções muda o formato do registro definido aqui.
**EN** — The ADR standard is stable. Foreseen evolutions: a navigable ADR index (pointer, never duplication) and, when the platform matures, tool-side verification (`Linter`/CLI) that every breaking change has its ADR. None of these change the record format defined here.

## Referências internas · Internal references
`governance/STUDIO_UX_CONSTITUTION.md` (Art. 16) · `governance/STUDIO_UX_RFC_GUIDE.md` · `governance/STUDIO_UX_VERSIONING.md` · `STUDIO_UX.md` §7, §11 · `STUDIO_UX_GRAMMAR.md` (ADR-001, formato de referência) · `CHANGELOG.md` · `context/STUDIO_UX_HANDOFF.md`

---

*Documento vivo. Dono do padrão de ADR; a proposta/discussão é do RFC_GUIDE, o histórico do CHANGELOG. · Living document. Owner of the ADR standard; proposing/discussing belongs to RFC_GUIDE, history to the CHANGELOG.*
