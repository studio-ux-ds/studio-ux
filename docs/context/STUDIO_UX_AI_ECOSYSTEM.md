# STUDIO_UX_AI_ECOSYSTEM.md — Ecossistema de IA · AI Ecosystem

> Documento normativo vivo. Responde a: **como cada ferramenta de IA se integra ao Studio UX — carrega o contexto, valida, certifica a saída e é impedida de gerar inconsistência?**
> Living normative document. Answers: **how does each AI tool integrate with Studio UX — load the context, validate, certify the output and be prevented from generating inconsistency?**
> Governança: `STUDIO_UX.md` (SSOT §11, tech-agnóstico §13). Procedimento: `context/AI_CONTEXT`. Regras: `context/AI_RULES`. Medição: `CERTIFICATION`.

```
Architecture Boundary Check — STUDIO_UX_AI_ECOSYSTEM
Resolve · Solves:            a arquitetura de INTEGRAÇÃO entre as ferramentas de IA e o Studio UX — como cada
                             agente carrega o contexto, valida, certifica e é impedido de inventar; a camada
                             que conecta a pilha de IA existente ao ecossistema de forma consistente.
                             / the INTEGRATION architecture between AI tools and Studio UX — how each agent
                             loads context, validates, certifies and is prevented from inventing; the layer
                             that connects the existing AI stack to the ecosystem consistently.
Não pertence a outro porque · Not elsewhere because:
                             AI_CONTEXT é o PROCEDIMENTO (o "como uma IA constrói uma tela"); AI_RULES é o cartão
                             de REGRAS secas (NUNCA/SEMPRE); CERTIFICATION é a MEDIÇÃO. Faltava a arquitetura de
                             CONSUMO por ferramenta — como cada IA se pluga, carrega e se autoaudita.
                             / AI_CONTEXT is the PROCEDURE (the "how an AI builds a screen"); AI_RULES is the dry
                             RULES card; CERTIFICATION is the MEASUREMENT. The missing piece is the per-tool
                             CONSUMPTION architecture — how each AI plugs in, loads and self-audits.
Complementa · Complements:   AI_CONTEXT (procedimento), AI_RULES (regras), CERTIFICATION (medição),
                             quality/LINTER (detecção), CONSTITUTION (Art. 20), STUDIO_UX.md §12.
Nunca substitui · Never replaces: AI_CONTEXT (dono do procedimento), AI_RULES (dono das regras),
                             CERTIFICATION (dona da auditoria), quality/LINTER (dono da detecção).
Dono · Owner:                este doc, para o domínio "integração com o ecossistema de IA".
                             / this doc, for the "AI ecosystem integration" domain.
```

---

## Objetivo · Objective
**PT** — Definir a camada de **integração** entre as ferramentas de IA e o Studio UX: como cada agente (Claude Code, ChatGPT, Codex, Cursor, GitHub Copilot e agentes em geral) **consome** o framework para gerar telas que já nascem conformes. Enquanto o `AI_CONTEXT` ensina o *procedimento* e o `AI_RULES` lista as *regras*, este documento é a *arquitetura de consumo*: qual pacote de documentos cada IA carrega, em que ordem, como ela valida a própria saída e como o protocolo "não invente → proponha → aguarde" (Art. 20) impede a inconsistência antes que ela chegue à tela. É a ponte entre a pilha de IA já existente e o ecossistema — não a duplica.
**EN** — Define the **integration** layer between AI tools and Studio UX: how each agent (Claude Code, ChatGPT, Codex, Cursor, GitHub Copilot and agents in general) **consumes** the framework to generate screens born compliant. While `AI_CONTEXT` teaches the *procedure* and `AI_RULES` lists the *rules*, this document is the *consumption architecture*: which document bundle each AI loads, in what order, how it validates its own output, and how the "do not invent → propose → wait" protocol (Art. 20) prevents inconsistency before it reaches the screen. It is the bridge between the existing AI stack and the ecosystem — it does not duplicate it.

## Escopo · Scope
**PT** — A arquitetura de integração/consumo por ferramenta de IA, os conceitos de **context loading** e **self-audit**, e a fronteira com os documentos irmãos. **Não** reescreve o procedimento (`AI_CONTEXT`), as regras (`AI_RULES`), a auditoria (`CERTIFICATION`) nem a detecção (`quality/LINTER`) — referencia todos. Aqui se responde apenas *como cada IA se conecta e se disciplina*.
**EN** — The per-tool integration/consumption architecture, the **context loading** and **self-audit** concepts, and the boundary with sibling documents. It does **not** rewrite the procedure (`AI_CONTEXT`), the rules (`AI_RULES`), the audit (`CERTIFICATION`) or the detection (`quality/LINTER`) — it references all of them. It answers only *how each AI connects and disciplines itself*.

---

## 1. Context loading — o pacote mínimo · Context loading — the minimum bundle
**PT** — **Context loading** é o ato de uma IA carregar, antes de gerar qualquer tela, o pacote mínimo de documentos que a torna capaz de produzir saída conforme. O pacote e a **ordem** são os donos: `AI_CONTEXT` §1 (ordem de leitura obrigatória) e `AI_RULES` §3 (ordem de consulta) — este documento **aponta** para eles, não os recria. Em resumo, o carregamento vai do geral ao específico: a regra máxima e a Constituição → os princípios (P#) → a linguagem visual (DNA/gramática/superfícies/ritmo) → **o produto certo, Desktop OU Mobile, nunca os dois** → tokens/temas/ícones → componentes → padrões e donos de tela → layout e acessibilidade. Sem esse carregamento, a IA está adivinhando; com ele, está traduzindo a Specification. Uma IA que gera tela **sem** ter carregado o contexto opera fora da família por construção.
**EN** — **Context loading** is the act of an AI loading, before generating any screen, the minimum bundle of documents that makes it capable of compliant output. The bundle and the **order** have owners: `AI_CONTEXT` §1 (mandatory reading order) and `AI_RULES` §3 (consultation order) — this document **points** to them, it does not recreate them. In short, loading goes from general to specific: the supreme rule and the Constitution → the principles (P#) → the visual language (DNA/grammar/surfaces/rhythm) → **the right product, Desktop OR Mobile, never both** → tokens/themes/icons → components → patterns and screen owners → layout and accessibility. Without that loading, the AI is guessing; with it, it is translating the Specification. An AI that generates a screen **without** loading the context operates outside the family by construction.

## 2. Self-audit — a IA se certifica antes de entregar · Self-audit — the AI certifies before delivering
**PT** — **Self-audit** é a disciplina de a IA rodar, sobre a própria saída e **antes de entregá-la**, a checklist de autoavaliação (`AI_CONTEXT` §3) e a `CERTIFICATION` (a medição oficial). Ela responde, item a item, se a tela usa só tokens (P1, P7), só componentes oficiais (P2, P3), não mistura Desktop/Mobile (P4), tem estados vazio/carregando/erro (P14), fala a língua do usuário (P11) e passa em acessibilidade (P17–P19). Um "não" é *bug, não estilo* — e a IA corrige antes de entregar, ou declara a violação e propõe um ADR (Art. 20). A `CERTIFICATION` é a régua; a `quality/LINTER` (Épico 3) é a detecção automática que confirma o que a IA deveria ter pego. O self-audit é a IA fazendo, mentalmente, o trabalho do Linter — para não empurrar defeito adiante.
**EN** — **Self-audit** is the discipline of the AI running, over its own output and **before delivering it**, the self-review checklist (`AI_CONTEXT` §3) and `CERTIFICATION` (the official measurement). Item by item, it answers whether the screen uses only tokens (P1, P7), only official components (P2, P3), does not mix Desktop/Mobile (P4), has empty/loading/error states (P14), speaks the user's language (P11) and passes accessibility (P17–P19). A "no" is a *bug, not a style* — and the AI fixes it before delivering, or declares the violation and proposes an ADR (Art. 20). `CERTIFICATION` is the ruler; `quality/LINTER` (Epic 3) is the automatic detection that confirms what the AI should have caught. Self-audit is the AI doing, mentally, the Linter's work — so it does not push a defect downstream.

## 3. O protocolo anti-invenção · The anti-invention protocol
**PT** — A regra que sustenta toda a integração é o protocolo **"não invente → proponha → aguarde"** (Art. 20; detalhe em `AI_RULES` §4). Se a informação — um token, um componente, um padrão, um valor — **não existe** na documentação, a IA **para** no ponto exato da falta, **cria uma proposta** explícita (o que falta, as opções, a mais conservadora) e **aguarda aprovação humana**. Nunca "chuta plausível" para não interromper: o chute plausível é o pior erro, porque *parece certo* e contamina a família em silêncio. Aprovada a proposta, o **dono do assunto (SSOT)** é atualizado; só então a informação passa a existir e pode ser usada. Este protocolo é o que impede uma IA de expandir o framework por conta própria — a fronteira entre consumir e inventar.
**EN** — The rule that underpins the whole integration is the **"do not invent → propose → wait"** protocol (Art. 20; detail in `AI_RULES` §4). If the information — a token, a component, a pattern, a value — **does not exist** in the documentation, the AI **stops** at the exact point of the gap, **creates an explicit proposal** (what is missing, the options, the most conservative one) and **waits for human approval**. It never "guesses something plausible" to avoid interrupting: the plausible guess is the worst error, because it *looks right* and silently contaminates the family. Once approved, the **subject owner (SSOT)** is updated; only then does the information exist and become usable. This protocol is what prevents an AI from expanding the framework on its own — the boundary between consuming and inventing.

## 4. Como cada ferramenta consome · How each tool consumes
**PT** — A arquitetura de consumo é a mesma para todos — carregar contexto (§1), gerar traduzindo a Specification, autoauditar (§2), respeitar o protocolo (§3) — variando só o *mecanismo* de carga de cada ferramenta. O Studio UX é agnóstico de ferramenta (§13): nenhuma delas é privilegiada nem obrigatória.

- **Claude Code** — carrega o pacote de contexto como documentos de projeto (o `AI_CONTEXT` é o mapa; a regra máxima e a Constituição vêm primeiro). Gera, cita o P# em cada decisão e roda o self-audit pela `CERTIFICATION` antes de fechar. É o consumo de referência do ecossistema.
- **ChatGPT** — recebe o mesmo pacote mínimo como contexto anexado/colado na ordem do §1. Sem os documentos carregados, deve recusar-se a gerar e pedir o contexto — nunca improvisar do conhecimento geral.
- **Codex** — orientado a código: carrega o contexto e trata a saída como *tradução* da Specification para o Runtime da tecnologia-alvo, jamais como fonte. Todo valor vem de token; nada de literal (P1).
- **Cursor** — como editor assistido, carrega os documentos do repositório como contexto e usa o self-audit a cada geração. Deve tratar as referências de estudo do repo como estudo de princípios, **nunca** como fonte de cópia.
- **GitHub Copilot** — sugestão em linha: por ver pouco contexto por vez, é o mais propenso a "completar plausível". Seu uso conforme exige o pacote de contexto disponível e revisão pelo self-audit e pela `quality/LINTER` — a sugestão nunca é aceita sem passar pela régua.
- **Agentes em geral · agents at large** — qualquer agente novo segue o mesmo contrato: carregar o pacote mínimo (§1), gerar traduzindo, autoauditar (§2) e obedecer ao protocolo anti-invenção (§3). O contrato é da arquitetura, não da marca do agente.

**EN** — The consumption architecture is the same for all — load context (§1), generate by translating the Specification, self-audit (§2), honor the protocol (§3) — varying only each tool's *loading mechanism*. Studio UX is tool-agnostic (§13): none is privileged or mandatory.
- **Claude Code** — loads the context bundle as project documents (with `AI_CONTEXT` as the map; the supreme rule and the Constitution first). It generates, cites the P# on each decision, and runs self-audit via `CERTIFICATION` before closing. It is the ecosystem's reference consumption.
- **ChatGPT** — receives the same minimum bundle as attached/pasted context in the §1 order. Without the documents loaded, it must refuse to generate and ask for the context — never improvise from general knowledge.
- **Codex** — code-oriented: loads the context and treats output as a *translation* of the Specification into the target technology's Runtime, never as a source. Every value comes from a token; no literals (P1).
- **Cursor** — as an assisted editor, loads the repository documents as context and uses self-audit on every generation. It must treat the repo's study references as principle study, **never** as a copy source.
- **GitHub Copilot** — inline suggestion: seeing little context at a time, it is the most prone to "plausible completion". Its compliant use requires the context bundle available plus review by self-audit and `quality/LINTER` — a suggestion is never accepted without passing the ruler.
- **Agents at large** — any new agent follows the same contract: load the minimum bundle (§1), generate by translating, self-audit (§2) and obey the anti-invention protocol (§3). The contract belongs to the architecture, not to the agent's brand.

## 5. A fronteira com os documentos irmãos · The boundary with sibling documents
**PT** — Quatro documentos formam a pilha de IA, cada um com um papel único (SSOT): **AI_ECOSYSTEM** (este) é a *arquitetura de integração/consumo* — como cada ferramenta se pluga; **AI_CONTEXT** é o *procedimento* — como uma IA constrói uma tela, passo a passo; **AI_RULES** é o *cartão de regras* seco — os NUNCA/SEMPRE; **CERTIFICATION** é a *medição* — o selo/nível da tela. Este documento nunca redefine o procedimento, as regras ou os critérios de auditoria: ele os *orquestra*. Se uma regra muda, muda no `AI_RULES`; se o procedimento muda, no `AI_CONTEXT`; se o critério muda, na `CERTIFICATION`. AI_ECOSYSTEM só muda quando muda a *forma de integração* (uma ferramenta nova, um novo mecanismo de carga).
**EN** — Four documents form the AI stack, each with a single role (SSOT): **AI_ECOSYSTEM** (this) is the *integration/consumption architecture* — how each tool plugs in; **AI_CONTEXT** is the *procedure* — how an AI builds a screen, step by step; **AI_RULES** is the dry *rules card* — the NEVER/ALWAYS; **CERTIFICATION** is the *measurement* — the screen's seal/level. This document never redefines the procedure, the rules or the audit criteria: it *orchestrates* them. If a rule changes, it changes in `AI_RULES`; if the procedure changes, in `AI_CONTEXT`; if a criterion changes, in `CERTIFICATION`. AI_ECOSYSTEM changes only when the *form of integration* changes (a new tool, a new loading mechanism).

## Responsabilidades · Responsibilities
**PT** — Definir a arquitetura de consumo por ferramenta (§4); fixar os conceitos de context loading (§1) e self-audit (§2); ancorar o protocolo anti-invenção como fronteira do consumo (§3); manter a fronteira com AI_CONTEXT/AI_RULES/CERTIFICATION (§5).
**EN** — Define the per-tool consumption architecture (§4); fix the context-loading (§1) and self-audit (§2) concepts; anchor the anti-invention protocol as the consumption boundary (§3); keep the boundary with AI_CONTEXT/AI_RULES/CERTIFICATION (§5).

## Não-responsabilidades · Non-responsibilities
**PT** — Não reescreve o procedimento (`AI_CONTEXT`), as regras (`AI_RULES`), os critérios de certificação (`CERTIFICATION`) nem a detecção automática (`quality/LINTER`). Não define tokens, componentes ou padrões (donos próprios). Não privilegia nenhuma ferramenta de IA (§13).
**EN** — Does not rewrite the procedure (`AI_CONTEXT`), the rules (`AI_RULES`), the certification criteria (`CERTIFICATION`) or the automatic detection (`quality/LINTER`). Does not define tokens, components or patterns (own owners). Privileges no AI tool (§13).

## Integrações e dependências · Integrations and dependencies
**PT** — Depende de `AI_CONTEXT` e `AI_RULES` para o pacote e a ordem de contexto, e de `CERTIFICATION`/`quality/LINTER` para o self-audit. Serve toda ferramenta de IA como o contrato de consumo do ecossistema, e o `PROJECT_GENERATOR` (uma IA gera telas dentro de um projeto que nasceu conforme). Assenta sobre o Art. 20 (não inventar) e o §12 (Boundary Check) da regra máxima.
**EN** — Depends on `AI_CONTEXT` and `AI_RULES` for the context bundle and order, and on `CERTIFICATION`/`quality/LINTER` for self-audit. Serves every AI tool as the ecosystem's consumption contract, and the `PROJECT_GENERATOR` (an AI generates screens inside a project born compliant). It rests on Art. 20 (do not invent) and §12 (Boundary Check) of the supreme rule.

## Fluxos · Flows
**PT** — Fluxo de consumo conforme: **carregar contexto (§1) → gerar traduzindo a Specification → self-audit (§2) → certificar → entregar**. Fluxo da falta: informação inexistente → parar → propor → aguardar aprovação → dono atualizado → só então usar (§3). Fluxo por ferramenta: cada IA (§4) segue o mesmo contrato variando só o mecanismo de carga.
**EN** — Compliant consumption flow: **load context (§1) → generate by translating the Specification → self-audit (§2) → certify → deliver**. Missing-information flow: nonexistent info → stop → propose → wait for approval → owner updated → only then use (§3). Per-tool flow: each AI (§4) follows the same contract, varying only the loading mechanism.

## Boas práticas · Best practices
**PT** — Carregue o pacote mínimo na ordem certa antes de gerar; nunca gere "de memória". Autoaudite pela `CERTIFICATION` antes de entregar e corrija todo "não". Cite o P# em cada decisão. Trate referências de estudo como estudo de princípios, jamais como fonte de cópia. Na falta de qualquer informação, proponha e aguarde — nunca invente. Deixe cada regra no seu dono; este documento só orquestra.
**EN** — Load the minimum bundle in the right order before generating; never generate "from memory". Self-audit via `CERTIFICATION` before delivering and fix every "no". Cite the P# on each decision. Treat study references as principle study, never as a copy source. On any missing information, propose and wait — never invent. Keep each rule in its owner; this document only orchestrates.

## Anti-padrões · Anti-patterns
**PT / EN**
- IA que inventa token, componente, padrão ou valor em vez de propor e aguardar (Art. 20). / An AI that invents a token, component, pattern or value instead of proposing and waiting.
- IA que gera tela sem carregar o pacote de contexto (§1). / An AI that generates a screen without loading the context bundle.
- Consumir uma referência de estudo como fonte de cópia (layout/código/identidade). / Consuming a study reference as a copy source.
- Pular o self-audit e entregar sem passar pela `CERTIFICATION` (§2). / Skipping self-audit and delivering without `CERTIFICATION`.
- Misturar Desktop e Mobile na mesma tela por não ter escolhido o produto no carregamento (P4). / Mixing Desktop and Mobile by not choosing the product at loading time.
- Redefinir aqui o procedimento, as regras ou os critérios (viola SSOT; donos são AI_CONTEXT/AI_RULES/CERTIFICATION). / Redefining here the procedure, rules or criteria (violates SSOT).

## Roadmap
**PT** — Especificado na era de documentação; a integração ganha mecanismos concretos por ferramenta nos Épicos de Geração e Qualidade, sempre derivando de `AI_CONTEXT`/`AI_RULES`/`CERTIFICATION`. Ferramentas de IA novas entram na §4 quando surgirem — sempre sob o mesmo contrato de consumo, nunca com privilégio de marca (§13).
**EN** — Specified in the documentation era; the integration gains concrete per-tool mechanisms in the Generation and Quality epics, always deriving from `AI_CONTEXT`/`AI_RULES`/`CERTIFICATION`. New AI tools enter §4 when they appear — always under the same consumption contract, never with brand privilege (§13).

## Referências internas · Internal references
`context/STUDIO_UX_AI_CONTEXT.md` · `context/AI_RULES.md` · `STUDIO_UX_CERTIFICATION.md` · `generation/STUDIO_UX_PROJECT_GENERATOR.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 20) · `STUDIO_UX.md` §11 · §12 · §13 · `STUDIO_UX_PRINCIPLES.md` (P1–P25)

---

*Documento vivo. Arquitetura de integração/consumo por IA; o procedimento é do AI_CONTEXT, as regras do AI_RULES, a medição da CERTIFICATION. · Living document. AI integration/consumption architecture; the procedure belongs to AI_CONTEXT, the rules to AI_RULES, the measurement to CERTIFICATION.*
