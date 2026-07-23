# Prompt de alinhamento para solicitações de desenvolvimento · Development-request alignment prompt

> **PT** — Documento dono do intake de pedidos de desenvolvimento feitos em linguagem natural para ChatGPT, Codex, Claude e modelos futuros. Ele converte um pedido em relatório **antes** de qualquer implementação.
>
> **EN** — Owner document for natural-language development-request intake used with ChatGPT, Codex, Claude and future models. It turns a request into a report **before** any implementation.

```
Architecture Boundary Check — Prompt de alinhamento
Resolve · Solves:             converter um pedido humano em decisão de escopo verificável, sem formulário técnico
                              e antes de código.
Não pertence a outro porque · Not elsewhere because:
                              AI_RULES governa geração de tela; HANDOFF registra estado; este documento governa
                              somente o alinhamento de solicitações de desenvolvimento.
Complementa · Complements:    AGENTS.md/CLAUDE.md, COMO-INTERAGIR-COM-ROBSON.md, HANDOFF e o dono técnico
                              identificado para cada pedido.
Nunca substitui · Never replaces:
                              regras do repositório, documentação dona, ADR/RFC, nem aprovação humana.
Dono · Owner:                 este arquivo, para o domínio "intake de solicitações de desenvolvimento".
```

---

## 1. Escopo e limite · Scope and boundary

**PT** — Este framework atende pedidos de mudança no projeto feitos a uma IA de desenvolvimento. Ele **não** é prompt de produto, atendimento, SDR, automação, agente operacional, banco, integração existente ou funcionalidade de negócio. Durante o alinhamento, não executa, não cria especialidade e não altera código.

**EN** — This framework handles project-change requests made to a development AI. It is **not** a product, support, SDR, automation, operational-agent, database, existing-integration or business-function prompt. During alignment it does not execute, create a specialty or change code.

**PT** — Gatilho: qualquer pedido de desenvolvimento em linguagem natural. Saída obrigatória: relatório. Implementação só começa depois da decisão explícita do Robson: `ok`.

**EN** — Trigger: any natural-language development request. Required output: a report. Implementation starts only after Robson's explicit `ok` decision.

---

## 2. Catálogo inicial de especialidades · Initial specialty catalog

**PT** — O catálogo descreve apenas especialidades reais deste repositório. Ele permite classificação honesta; não é uma lista de capacidades desejadas. Se o pedido não se encaixar, use `especialidade não catalogada`.

**EN** — The catalog lists only real specialties in this repository. It enables honest classification; it is not a wish list. If a request does not fit, use `especialidade não catalogada`.

| Especialidade · Specialty | Missão · Mission | Fontes iniciais · Starting sources |
|---|---|---|
| `design-system-foundation` | Evoluir tokens, CSS de componentes, ícones e temas sem quebrar o contrato visual. | `packages/tokens`, `packages/components`, `packages/icons`, docs de tokens/componentes. |
| `react-adapter-and-storybook` | Evoluir o adapter React e sua documentação viva sem duplicar a camada CSS. | `packages/react`, `stories`, `.storybook`, `STUDIO_UX_RUNTIME.md`. |
| `mobile-adapters` | Evoluir os adapters e contratos mobile respeitando a fronteira Desktop, web e nativo. | `packages/mobile`, `packages/react-native`, `packages/react/mobile`, docs mobile. |
| `platform-cli-and-packages` | Evoluir CLI, geração, lint, certificação, manifests e publicação do monorepo. | `packages/cli`, `scripts`, workflows, docs de plataforma e ferramentas. |
| `design-system-governance-and-quality` | Evoluir regras, SSOT, auditorias, documentação e critérios de qualidade do Studio UX. | `STUDIO_UX.md`, `docs/governance`, `docs/quality`, `docs/context`. |

**PT** — Exemplo: “integrar a Meta API para responder mensagens do Direct do Instagram e Facebook” não pertence às especialidades atuais. O relatório deve retornar `especialidade não catalogada`, recomendar `external-api-integrations` e aguardar `ok`; ele não cria integração nem código.

**EN** — Example: “integrate the Meta API to answer Instagram and Facebook Direct messages” does not belong to the current specialties. The report must return `especialidade não catalogada`, recommend `external-api-integrations`, and wait for `ok`; it does not create an integration or code.

---

## 3. Prompt operacional · Operating prompt

**PT — Copie este bloco antes do pedido em ChatGPT, Codex ou Claude.**

```text
Você está no modo ALINHAMENTO DE SOLICITAÇÃO DE DESENVOLVIMENTO.

Receba o pedido em linguagem natural abaixo e responda SOMENTE com o relatório definido neste documento. Não implemente código, não altere arquivos, não crie especialidade, não modifique banco, integração, automação, prompt operacional ou funcionalidade existente antes de eu responder "ok".

Antes de classificar ou propor qualquer coisa:
1. Leia AGENTS.md, CLAUDE.md ou regra equivalente; leia o handoff/estado e a documentação atual relevante.
2. Inventarie regra, documento, componente, módulo, pacote, padrão e código reutilizável existentes no próprio projeto.
3. Classifique somente se uma especialidade do catálogo cobrir realmente o pedido. Nunca force uma classificação.
4. Se faltar especialidade, use o fluxo "especialidade não catalogada". Se houver impedimento real, use "bloqueado".
5. Nunca avance da resposta-relatório para implementação sem uma decisão explícita "ok" do solicitante.

PEDIDO:
{{cole aqui o pedido em linguagem natural}}
```

**EN — Copy this block before the request in ChatGPT, Codex or Claude.**

```text
You are in DEVELOPMENT-REQUEST ALIGNMENT mode.

Receive the natural-language request below and answer ONLY with the report defined in this document. Do not implement code, edit files, create a specialty, modify a database, integration, automation, operational prompt or existing functionality before I answer "ok".

Before classifying or proposing anything:
1. Read AGENTS.md, CLAUDE.md or equivalent rules; read the handoff/state and relevant current documentation.
2. Inventory existing reusable rules, documents, components, modules, packages, patterns and code in the project itself.
3. Classify only when a catalog specialty truly covers the request. Never force a classification.
4. When a specialty is missing, use the "specialty not cataloged" flow. When a real impediment exists, use "blocked".
5. Never move from the report response to implementation without the requester's explicit "ok" decision.

REQUEST:
{{paste the natural-language request here}}
```

---

## 4. Formato obrigatório do relatório · Required report format

**PT / EN** — Use exatamente estes títulos, preenchendo com fatos verificados. Se algo ainda não foi lido, escreva `a verificar` e inclua no plano; nunca complete por suposição.

```md
# Relatório de alinhamento · Alignment report

## Status
`alinhado` | `especialidade não catalogada` | `bloqueado`

## Projeto
<repositório, produto e área afetada>

## Especialidade identificada
<uma especialidade do catálogo, ou “não catalogada”>

## Pedido entendido
<o resultado desejado, em linguagem objetiva>

## Fontes, documentos e código a ler
<regras, handoff, SSOT, pacote/módulo e código existente relevantes>

## Escopo
<o que a próxima frente poderá alterar após “ok”>

## Fora de escopo
<o que permanece intocado nesta frente>

## Riscos e dependências
<contratos, permissões, credenciais, APIs, migrações, release, segurança ou incertezas>

## Plano proposto
<passos pequenos, na ordem; primeiro inventário, depois a menor mudança necessária>

## Validação prevista
<testes, checks, revisão visual, documentação e critérios de aceite proporcionais ao risco>

## Decisão necessária antes de implementar
<a decisão objetiva que o solicitante deve responder; “ok” só vale para este plano>
```

### 4.1 Status `alinhado`

**PT** — Use quando uma especialidade existente cobre o pedido e a decisão restante é aprovar escopo/plano. O relatório ainda declara fontes a ler e o que confirmar antes de editar.

**EN** — Use when an existing specialty covers the request and the remaining decision is to approve scope/plan. The report still declares sources to read and what to confirm before editing.

### 4.2 Status `especialidade não catalogada`

**PT** — Além do formato obrigatório, inclua estes campos antes de “Decisão necessária”:

```md
## Especialidade/prompt faltante
<o tipo de prompt que não existe>

## Especialidade recomendada
<nome técnico em inglês, sem criá-la ainda>

## Missão proposta
<uma frase>

## Por que as existentes não atendem
<comparação objetiva com o catálogo>

## Produto, fluxo e tipo de tarefa que justificam a criação
<onde ela será usada e qual trabalho recorrente ela organiza>

## Escopo mínimo da nova especialidade
<somente os documentos/regras mínimos; sem código nem automação>

## Aprovação necessária
<aprovar criar a especialidade, aprovar seu escopo ou rejeitar/encaminhar>
```

**EN** — In addition to the required format, include the corresponding fields: missing specialty/prompt; recommended specialty; one-sentence mission; why existing ones do not fit; product, flow and task type justifying it; minimal scope; and required approval.

### 4.3 Status `bloqueado`

**PT** — Use somente para impedimento concreto: conflito com regra, ausência de acesso/credencial, decisão de produto necessária, dependência externa sem autoridade ou risco que não pode ser assumido. Diga o bloqueio, a evidência e a menor decisão que o remove. Não use `bloqueado` apenas porque a tarefa é grande.

**EN** — Use only for a concrete impediment: a rule conflict, missing access/credential, required product decision, external dependency without authority, or risk that cannot be assumed. State the blocker, evidence and smallest decision that removes it. Do not use `blocked` merely because a task is large.

---

## 5. Gate de execução e checkpoint · Execution gate and checkpoint

**PT** — Depois do relatório, a IA para. `ok` aprova somente a decisão listada no relatório; mudança material de escopo exige novo relatório. Ao concluir a frente documental deste framework: rodar `git diff --check`, listar os arquivos alterados e registrar checkpoint com o que foi feito, validado e não testado. Não criar tag ou deploy por documentação.

**EN** — After the report, the AI stops. `ok` approves only the decision listed in the report; a material scope change requires a new report. When completing this framework's documentation work: run `git diff --check`, list changed files and record a checkpoint with what was done, validated and not tested. Do not create a tag or deploy for documentation.

---

*Documento vivo. Alterar catálogo ou protocolo só após relatório de alinhamento e aprovação explícita; manter PT e EN na mesma mudança. · Living document. Change the catalog or protocol only after an alignment report and explicit approval; keep PT and EN in the same change.*
