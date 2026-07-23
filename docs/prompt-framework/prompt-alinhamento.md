# Prompt de alinhamento para solicitações de desenvolvimento · Development-request alignment prompt

> **PT** — Esta é a porta de entrada para pedidos de desenvolvimento feitos em linguagem natural a ChatGPT, Codex, Claude e modelos futuros. Ela converte um pedido em relatório e roteia para uma especialidade aprovada; não é o prompt que executa a mudança.
>
> **EN** — This is the entry point for natural-language development requests made to ChatGPT, Codex, Claude and future models. It converts a request into a report and routes it to an approved specialty; it is not the prompt that executes the change.

```
Architecture Boundary Check — Prompt de alinhamento
Resolve · Solves:             transformar um pedido humano em uma decisão de escopo verificável antes de agir.
Não pertence a outro porque · Not elsewhere because:
                              regras do repositório governam o trabalho; os prompts de especialidade o executam;
                              este arquivo governa somente a triagem e o gate entre os dois.
Complementa · Complements:    catalogo-especialidades.md, AGENTS.md/CLAUDE.md, handoff e o prompt especializado escolhido.
Nunca substitui · Never replaces:
                              regras do repositório, SSOT técnico, ADR/RFC, aprovação humana ou documentação dona.
Dono · Owner:                 este arquivo, para a entrada e classificação de solicitações de desenvolvimento.
```

---

## 1. Escopo e princípio · Scope and principle

**PT** — O framework atende somente pedidos para mudar este repositório. Não serve para prompts runtime do produto, atendimento, SDR, automação, agente operacional ou funcionalidade de negócio. A especialidade é definida por **responsabilidade coesa e superfície dona**, nunca por uma lista genérica de cargos.

**EN** — This framework handles only requests to change this repository. It does not serve product-runtime prompts, support, SDR, automation, operational agents or business functionality. A specialty is defined by a **cohesive responsibility and owned surface**, never by a generic list of job titles.

**PT** — A identidade profissional no prompt especializado (por exemplo, “Engenheiro Frontend Sênior especializado em Design Systems”) orienta o rigor e o vocabulário. Ela não substitui missão, limites nem fontes obrigatórias — estes continuam sendo o contrato que decide a classificação.

**EN** — The professional identity in a specialized prompt (for example, “Senior Frontend Engineer specialized in Design Systems”) guides rigor and vocabulary. It does not replace mission, limits or mandatory sources — those remain the contract that decides classification.

---

## 2. Leitura permitida antes do relatório · Reading allowed before the report

**PT** — Antes de emitir o relatório, a IA pode ler **somente**, nesta ordem:

1. `AGENTS.md`, `CLAUDE.md` ou regra equivalente e `COMO-INTERAGIR-COM-ROBSON.md`, quando existir;
2. `docs/context/STUDIO_UX_HANDOFF.md` ou o handoff/estado equivalente;
3. `docs/prompt-framework/catalogo-especialidades.md`;
4. Git mínimo: `git status --short` e `git log --oneline -3`. Consulte tags apenas se o pedido tratar de versão.

**PT** — Nesta fase a IA **não pode** criar agentes, ler código ou pacotes, auditar documentação amplamente, executar testes, instalar dependências, editar arquivos, criar especialidade ou fazer uma implementação parcial. O catálogo fornece os caminhos que serão lidos pelo prompt especializado somente após `ok`.

**EN** — Before issuing the report, the AI may read **only**, in this order: (1) `AGENTS.md`, `CLAUDE.md` or equivalent rules and `COMO-INTERAGIR-COM-ROBSON.md` when present; (2) `docs/context/STUDIO_UX_HANDOFF.md` or equivalent state handoff; (3) `docs/prompt-framework/catalogo-especialidades.md`; and (4) minimal Git: `git status --short` and `git log --oneline -3`. Read tags only when the request concerns versioning.

**EN** — At this stage the AI **must not** create agents, read code or packages, broadly audit documentation, run tests, install dependencies, edit files, create a specialty or make a partial implementation. The catalog provides the paths that the specialized prompt will read only after `ok`.

---

## 3. Prompt operacional · Operating prompt

**PT — Copie este bloco antes do pedido em ChatGPT, Codex ou Claude.**

```text
Você está no modo ALINHAMENTO DE SOLICITAÇÃO DE DESENVOLVIMENTO.

Receba o pedido abaixo e responda SOMENTE com o relatório definido neste documento.

Antes do relatório, leia somente: (1) AGENTS.md, CLAUDE.md ou regra equivalente e COMO-INTERAGIR-COM-ROBSON.md quando existir; (2) o handoff/estado; (3) docs/prompt-framework/catalogo-especialidades.md; (4) git status --short e git log --oneline -3. Leia tags apenas se o pedido falar de versão.

Não crie agentes, não leia código ou pacotes, não faça auditoria ampla, não execute testes, não instale dependências e não edite arquivos nesta fase. Não crie uma especialidade. Não implemente nada antes de eu responder “ok”.

Classifique somente quando uma especialidade catalogada cobrir integralmente a responsabilidade do pedido. Se não houver especialidade adequada, responda “especialidade não catalogada”; recomende a especialidade faltante e aguarde aprovação. Se o pedido misturar responsabilidades independentes, não force uma única classificação: explicite a separação e peça a decisão mínima sobre a primeira frente.

PEDIDO:
{{cole aqui o pedido em linguagem natural}}
```

**EN — Copy this block before the request in ChatGPT, Codex or Claude.**

```text
You are in DEVELOPMENT-REQUEST ALIGNMENT mode.

Receive the request below and answer ONLY with the report defined in this document.

Before the report, read only: (1) AGENTS.md, CLAUDE.md or equivalent rules and COMO-INTERAGIR-COM-ROBSON.md when present; (2) the handoff/state; (3) docs/prompt-framework/catalogo-especialidades.md; (4) git status --short and git log --oneline -3. Read tags only when the request concerns versioning.

Do not create agents, read code or packages, broadly audit, run tests, install dependencies or edit files at this stage. Do not create a specialty. Do not implement anything before I answer “ok”.

Classify only when a cataloged specialty fully covers the request responsibility. If no adequate specialty exists, answer “specialty not cataloged”; recommend the missing specialty and wait for approval. If the request mixes independent responsibilities, do not force one classification: state the split and ask for the minimum decision on the first front.

REQUEST:
{{paste the natural-language request here}}
```

---

## 4. Formato obrigatório do relatório · Required report format

```md
# Relatório de alinhamento · Alignment report

## Status
`alinhado` | `especialidade não catalogada` | `bloqueado`

## Projeto
<repositório, produto e área afetada>

## Especialidade identificada
<slug do catálogo e caminho do prompt, ou “não catalogada”>

## Pedido entendido
<resultado desejado em linguagem objetiva>

## Fontes, documentos e código a ler após “ok”
<fontes obrigatórias declaradas pelo catálogo/prompt especializado; não as ler ainda>

## Escopo
<o que a frente poderá alterar após “ok”>

## Fora de escopo
<o que permanece intocado>

## Riscos e dependências
<somente riscos dedutíveis das regras, handoff e catálogo; demais itens ficam “a verificar após ok”>

## Plano proposto
<primeiro passo obrigatório após ok: ler o prompt especializado e suas fontes; depois, a menor mudança necessária>

## Validação prevista
<checks proporcionais declarados pela especialidade; confirmar após a leitura profunda>

## Decisão necessária antes de implementar
<aprovação objetiva; “ok” aprova somente esta frente>
```

### 4.1 Status `alinhado`

**PT** — Use quando uma especialidade catalogada cobre uma única responsabilidade coesa. Cite o slug e o caminho do prompt; não improvise fontes fora dele antes do `ok`.

**EN** — Use when one cataloged specialty covers a single cohesive responsibility. Cite its slug and prompt path; do not improvise sources outside it before `ok`.

### 4.2 Status `especialidade não catalogada`

**PT** — Além do formato acima, inclua: `Especialidade/prompt faltante`; `Especialidade recomendada`; `Missão proposta` (uma frase); `Por que as existentes não atendem`; `Produto, fluxo e tipo de tarefa que justificam a criação`; `Escopo mínimo da nova especialidade`; e `Aprovação necessária`. Não crie o arquivo, não leia código e não implemente até uma aprovação explícita.

**EN** — In addition to the format above, include: `Missing specialty/prompt`; `Recommended specialty`; `Proposed mission` (one sentence); `Why existing specialties do not fit`; `Product, flow and task type justifying creation`; `Minimum scope of the new specialty`; and `Required approval`. Do not create the file, read code or implement until explicit approval.

### 4.3 Status `bloqueado`

**PT** — Use somente para impedimento verificável pelas fontes permitidas: conflito com regra, ausência de estado essencial ou pedido que reúna frentes independentes sem decisão de prioridade. Declare a evidência e a menor decisão que libera uma frente. Tarefa grande não é bloqueio.

**EN** — Use only for an impediment verifiable from allowed sources: a rule conflict, missing essential state or a request joining independent fronts without a priority decision. State the evidence and the smallest decision that releases one front. A large task is not a blocker.

---

## 5. Transição para execução · Transition to execution

**PT** — Depois do relatório, a IA para. Um `ok` autoriza somente o escopo e a especialidade declarados. Só então ela lê o arquivo da especialidade no catálogo, segue suas fontes obrigatórias e volta a obedecer integralmente às regras normais do repositório. Mudança material de escopo exige novo relatório.

**EN** — After the report, the AI stops. An `ok` authorizes only the declared scope and specialty. Only then does it read the specialty file in the catalog, follow its mandatory sources and resume full compliance with normal repository rules. A material scope change requires a new report.

**PT** — Ao concluir uma frente documental deste framework, rode `git diff --check`, liste arquivos alterados e registre checkpoint. Não há tag ou deploy para documentação.

**EN** — When completing a documentation front of this framework, run `git diff --check`, list changed files and record a checkpoint. There is no tag or deployment for documentation.

---

*Versão do protocolo · Protocol version: 1.0.0. Esta versão identifica o framework documental, não os pacotes publicáveis do monorepo. · This version identifies the documentation framework, not publishable monorepo packages.*
