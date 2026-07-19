# STUDIO_UX_CLI.md — CLI Oficial · Official CLI

> Documento normativo vivo. Responde a: **qual é a linha de comando oficial do Studio UX, quais operações ela oferece e como cada comando aciona o domínio dono sem reimplementá-lo?**
> Living normative document. Answers: **what is the official Studio UX command line, which operations it offers, and how each command triggers the owning domain without reimplementing it?**
> Governança: `STUDIO_UX.md` (SSOT §11, §13), `governance/STUDIO_UX_CONSTITUTION.md`, `platform/STUDIO_UX_ARCHITECTURE.md`.

```
Architecture Boundary Check — STUDIO_UX_CLI
Resolve · Solves:            a PORTA DE ENTRADA única e uniforme para operar o Studio UX pela linha de comando —
                             o verbo que o construtor digita para acionar cada domínio dono.
                             / the single, uniform ENTRY POINT to operate Studio UX from the command line —
                             the verb the builder types to trigger each owning domain.
Não pertence a outro porque · Not elsewhere because:
                             cada operação já tem um dono (Generator, Linter, Certification, Versioning, Exporters,
                             Themes, Playground…); faltava a CAMADA DE ORQUESTRAÇÃO que os invoca de forma coerente.
                             A CLI é o verbo, não a regra.
                             / each operation already has an owner (Generator, Linter, Certification, Versioning,
                             Exporters, Themes, Playground…); the missing layer is the ORCHESTRATION that invokes them
                             coherently. The CLI is the verb, not the rule.
Complementa · Complements:   ARCHITECTURE, PACKAGES (futuro `packages/cli`), DEVTOOLS, PLAYGROUND, EXPORTERS,
                             PROJECT_GENERATOR, LINTER, COMPLIANCE, CERTIFICATION, VERSIONING, THEMES, tokens/*.
Nunca substitui · Never replaces: nenhum domínio dono — a CLI aciona, nunca reimplementa a lógica deles (SSOT, Art. 10).
Dono · Owner:                este doc, para o domínio "CLI oficial".
                             / this doc, for the "official CLI" domain.
```

---

## Objetivo · Objective
**PT** — Especificar, por comportamento, a interface de linha de comando oficial `studio`: a porta de entrada única de quem constrói com o Studio UX. A CLI dá um verbo curto e previsível a cada operação do ecossistema — criar um projeto, gerar uma peça, diagnosticar o ambiente, checar conformidade, certificar, atualizar, inspecionar tokens, gerenciar temas, abrir a documentação, abrir o Playground, exportar artefatos — sempre **delegando** ao domínio dono da operação. A CLI é orquestração e experiência de terminal; nunca é onde uma regra nasce.
**EN** — Specify, by behavior, the official `studio` command-line interface: the single entry point for whoever builds with Studio UX. The CLI gives each ecosystem operation a short, predictable verb — create a project, generate a piece, diagnose the environment, check conformance, certify, upgrade, inspect tokens, manage themes, open the docs, open the Playground, export artifacts — always **delegating** to the operation's owning domain. The CLI is orchestration and terminal experience; it is never where a rule is born.

## Escopo · Scope
**PT** — O conjunto de comandos, o que cada um faz, quando usá-lo, seu fluxo, o que consome e produz, e o dono que ele aciona. **Não** define a linguagem, o runtime nem os detalhes de implementação da CLI (§13 — tech-agnóstico): a CLI é descrita por **comportamento**, não por tecnologia. **Não** redefine a lógica de nenhum domínio dono — apenas a invoca.
**EN** — The set of commands, what each does, when to use it, its flow, what it consumes and produces, and the owner it triggers. It does **not** define the CLI's language, runtime or implementation details (§13 — technology-agnostic): the CLI is described by **behavior**, not technology. It does **not** redefine any owning domain's logic — it only invokes it.

---

## 1. O princípio da CLI — verbo, não regra · The CLI principle — verb, not rule
**PT** — Regra suprema deste domínio: **a CLI aciona os donos; nunca os reimplementa.** Cada comando é um verbo fino que reúne os argumentos, chama o domínio dono da operação, e apresenta o resultado no terminal com uma experiência consistente (mensagens claras, códigos de saída previsíveis, formatos de saída legíveis por humano e por máquina). A regra de negócio da operação — *o que é uma violação*, *o que é um nível de certificação*, *como um token vira uma tecnologia* — mora sempre no dono (Linter, Certification, Exporters…). Se a CLI passasse a decidir isso, haveria dois donos do mesmo assunto: violação direta de SSOT (Art. 10) e do §11.
**EN** — This domain's supreme rule: **the CLI triggers the owners; it never reimplements them.** Each command is a thin verb that gathers arguments, calls the operation's owning domain, and presents the result in the terminal with a consistent experience (clear messages, predictable exit codes, human- and machine-readable output formats). The operation's business rule — *what a violation is*, *what a certification level is*, *how a token becomes a technology* — always lives in the owner (Linter, Certification, Exporters…). If the CLI decided that, there would be two owners of the same subject: a direct SSOT (Art. 10) and §11 violation.

**PT** — Consequência de gosto de terminal (herança do DNA, `VISUAL_DNA`): a CLI é **calma, clara e confiável** — fala a língua do construtor (§6, P11), nunca despeja jargão cru; toda saída tem um estado inequívoco (sucesso, aviso, erro) e um caminho de ação; nada trava em silêncio (Art. 5 — nada de erro engolido). O modo verboso e o formato legível por máquina existem para automação, mas nunca são o padrão que o humano vê primeiro.
**EN** — A terminal-taste consequence (inherited from the DNA, `VISUAL_DNA`): the CLI is **calm, clear and trustworthy** — it speaks the builder's language (§6, P11), never dumps raw jargon; every output has an unambiguous state (success, warning, error) and a path to act; nothing hangs silently (Art. 5 — no swallowed errors). A verbose mode and a machine-readable format exist for automation, but are never the default a human sees first.

---

## 2. Os comandos · The commands

> **PT** — Cada comando é descrito por: **o que faz · quando usar · como funciona (fluxo) · consome/produz · dono que aciona.** Nomes de comando em inglês (identificadores, §1 do canon). **EN** — Each command is described by: **what it does · when to use · how it works (flow) · consumes/produces · owner it triggers.** Command names in English (identifiers, canon §1).

### 2.1 `studio create`
**PT** — *O que faz:* cria um sistema novo já conforme, escolhendo o produto-base (Desktop **ou** Mobile, Art. 2) e o arquétipo. *Quando usar:* no nascimento de qualquer interface da empresa. *Como funciona:* coleta as escolhas (produto, arquétipo, nome), delega ao **Project Generator**, que instancia a estrutura declarando a versão do Studio UX (§7). *Consome:* as escolhas + a Specification vigente. *Produz:* um projeto conforme, com a dependência declarada. *Dono:* `generation/PROJECT_GENERATOR`.
**EN** — *What:* creates a new, already-compliant system, choosing the base product (Desktop **or** Mobile, Art. 2) and archetype. *When:* at the birth of any company interface. *How:* collects the choices (product, archetype, name), delegates to the **Project Generator**, which instantiates the structure declaring the Studio UX version (§7). *Consumes:* the choices + the current Specification. *Produces:* a compliant project with the dependency declared. *Owner:* `generation/PROJECT_GENERATOR`.

### 2.2 `studio generate`
**PT** — *O que faz:* gera uma peça dentro de um projeto existente — uma tela, um bloco, um componente-composição — a partir de moldes e do catálogo oficial. *Quando usar:* ao adicionar uma nova parte a um sistema já criado. *Como funciona:* escolhe o molde (Templates) ou a peça do catálogo (`COMPONENT_LIBRARY`), compõe sob a gramática (`GRAMMAR`) e escreve a peça no projeto. *Consome:* Templates + componentes oficiais. *Produz:* a peça composta, conforme. *Dono:* `generation/TEMPLATES` + `COMPONENT_LIBRARY` (a CLI só orquestra a instanciação; nunca inventa componente novo — Art. 4).
**EN** — *What:* generates a piece inside an existing project — a screen, a block, a composition-component — from molds and the official catalog. *When:* when adding a new part to an already-created system. *How:* picks the mold (Templates) or catalog piece (`COMPONENT_LIBRARY`), composes it under the grammar (`GRAMMAR`) and writes the piece into the project. *Consumes:* Templates + official components. *Produces:* the composed, compliant piece. *Owner:* `generation/TEMPLATES` + `COMPONENT_LIBRARY` (the CLI only orchestrates instantiation; it never invents a new component — Art. 4).

### 2.3 `studio doctor`
**PT** — *O que faz:* diagnostica o ambiente e a conformidade básica do projeto — versão do Studio UX declarada vs. disponível, integridade da dependência, sinais estruturais óbvios. *Quando usar:* ao configurar a máquina, ao herdar um projeto, ou quando algo "parece errado". *Como funciona:* lê o estado do projeto, consulta o **Versioning** (versão atual/disponível) e roda uma checagem estrutural leve apoiada no **Linter**, apresentando um relatório de saúde com o que está certo, o que avisa e o que bloqueia. *Consome:* estado do projeto + dados de versão. *Produz:* relatório de diagnóstico acionável. *Dono:* aciona `governance/VERSIONING` e `quality/LINTER` (a CLI apenas agrega — não define o que é "saudável").
**EN** — *What:* diagnoses the environment and the project's basic conformance — declared vs. available Studio UX version, dependency integrity, obvious structural signals. *When:* when setting up a machine, inheriting a project, or when something "feels wrong". *How:* reads the project state, queries **Versioning** (current/available version) and runs a light structural check backed by the **Linter**, presenting a health report of what is right, what warns and what blocks. *Consumes:* project state + version data. *Produces:* an actionable diagnostic report. *Owner:* triggers `governance/VERSIONING` and `quality/LINTER` (the CLI only aggregates — it does not define "healthy").

### 2.4 `studio lint`
**PT** — *O que faz:* roda a detecção automática de violações contra a Specification (valor fora de token, componente fora da biblioteca, `desktop` importando `mobile`, jargão renderizado como UI…). *Quando usar:* durante o desenvolvimento e em automação, a cada mudança. *Como funciona:* delega integralmente ao **Linter**, que aplica as regras derivadas dos Princípios e Tokens, e devolve a lista de violações; a CLI só formata e propaga o código de saída. *Consome:* o código/composição do projeto + as regras do Linter. *Produz:* relatório de violações (humano e legível por máquina). *Dono:* `quality/LINTER`.
**EN** — *What:* runs automatic detection of violations against the Specification (value outside a token, component outside the library, `desktop` importing `mobile`, jargon rendered as UI…). *When:* during development and in automation, on every change. *How:* fully delegates to the **Linter**, which applies the rules derived from Principles and Tokens and returns the violation list; the CLI only formats and propagates the exit code. *Consumes:* the project's code/composition + the Linter's rules. *Produces:* a violation report (human and machine-readable). *Owner:* `quality/LINTER`.

### 2.5 `studio audit`
**PT** — *O que faz:* roda a certificação — a graduação de conformidade no nível da tela e do sistema (o selo/nível). *Quando usar:* antes de um release, ao atestar a qualidade de um sistema, em portões de qualidade. *Como funciona:* delega à **Certification**, que agrega Linter + Compliance + Princípios e devolve o nível atingido e o que falta para o próximo. *Consome:* o sistema/tela + os critérios de certificação. *Produz:* o nível de certificação + o caminho de melhoria. *Dono:* `CERTIFICATION`.
**EN** — *What:* runs certification — the conformance grading at screen and system level (the seal/level). *When:* before a release, when attesting a system's quality, at quality gates. *How:* delegates to **Certification**, which aggregates Linter + Compliance + Principles and returns the level reached and what is missing for the next. *Consumes:* the system/screen + the certification criteria. *Produces:* the certification level + the improvement path. *Owner:* `CERTIFICATION`.

### 2.6 `studio upgrade`
**PT** — *O que faz:* atualiza a versão do Studio UX que o projeto declara, deliberadamente e com o guia de migração. *Quando usar:* ao adotar uma nova MINOR/PATCH ou, com cuidado, uma MAJOR. *Como funciona:* consulta o **Versioning** para a versão disponível e o guia de migração, apresenta o impacto (especialmente breaking changes de MAJOR) e aplica a nova declaração de dependência — nunca em silêncio (Art. 14). *Consome:* versão atual declarada + versão disponível + guia. *Produz:* dependência atualizada + resumo da migração. *Dono:* `governance/VERSIONING`.
**EN** — *What:* upgrades the Studio UX version the project declares, deliberately and with the migration guide. *When:* when adopting a new MINOR/PATCH or, carefully, a MAJOR. *How:* queries **Versioning** for the available version and migration guide, presents the impact (especially MAJOR breaking changes) and applies the new dependency declaration — never silently (Art. 14). *Consumes:* current declared version + available version + guide. *Produces:* updated dependency + migration summary. *Owner:* `governance/VERSIONING`.

### 2.7 `studio tokens`
**PT** — *O que faz:* inspeciona os tokens vivos — lista, resolve e mostra o valor de um token no tema ativo — e prepara a saída para exportação. *Quando usar:* para entender qual token usar, conferir a resolução num tema, ou alimentar automação. *Como funciona:* lê a arquitetura de tokens (`tokens/*`) e, quando pedido para exportar, encaminha aos **Exporters**. *Consome:* os tokens da Specification + o tema ativo. *Produz:* a listagem/resolução (e, sob `--export`, delega ao dono da exportação). *Dono:* `tokens/*` (leitura); `generation/EXPORTERS` (exportação).
**EN** — *What:* inspects the living tokens — lists, resolves and shows a token's value in the active theme — and prepares output for export. *When:* to decide which token to use, verify resolution in a theme, or feed automation. *How:* reads the token architecture (`tokens/*`) and, when asked to export, forwards to the **Exporters**. *Consumes:* the Specification's tokens + the active theme. *Produces:* the listing/resolution (and, under `--export`, delegates to the export owner). *Owner:* `tokens/*` (reading); `generation/EXPORTERS` (export).

### 2.8 `studio theme`
**PT** — *O que faz:* gerencia temas — lista os temas disponíveis (dark/light/brand), mostra o tema ativo e alterna entre eles para inspeção. *Quando usar:* ao trabalhar white-label/marca, ao verificar um sistema em cada tema. *Como funciona:* delega ao **Themes**, que é o dono da mecânica de tema; a CLI só seleciona e reporta. *Consome:* o catálogo de temas + os tokens. *Produz:* o tema ativo/estado. *Dono:* `THEMES`.
**EN** — *What:* manages themes — lists available themes (dark/light/brand), shows the active theme and switches between them for inspection. *When:* when working white-label/brand, when verifying a system in each theme. *How:* delegates to **Themes**, the owner of theme mechanics; the CLI only selects and reports. *Consumes:* the theme catalog + the tokens. *Produces:* the active theme/state. *Owner:* `THEMES`.

### 2.9 `studio docs`
**PT** — *O que faz:* abre/serve a documentação navegável do Studio UX localmente. *Quando usar:* para consultar a Specification enquanto se constrói. *Como funciona:* delega ao pacote de documentação (`packages/docs`), lembrando que a doc navegável **não é a fonte da verdade** — a verdade é a Specification/Especificação em git (Art. 5). *Consome:* a documentação gerada. *Produz:* a documentação servida/aberta. *Dono:* `packages/docs`.
**EN** — *What:* opens/serves the navigable Studio UX documentation locally. *When:* to consult the Specification while building. *How:* delegates to the documentation package (`packages/docs`), recalling that the navigable docs are **not the source of truth** — the truth is the git Specification (Art. 5). *Consumes:* the generated documentation. *Produces:* the served/opened docs. *Owner:* `packages/docs`.

### 2.10 `studio playground`
**PT** — *O que faz:* abre o Playground — o catálogo/sandbox vivo dos componentes em todos os seus estados. *Quando usar:* para explorar, testar e demonstrar peças oficiais antes de compô-las. *Como funciona:* delega ao **Playground** (`tools/PLAYGROUND`), que é um ambiente derivado do Runtime, nunca produção (Art. 5). *Consome:* o Runtime + os componentes. *Produz:* o ambiente Playground aberto. *Dono:* `tools/PLAYGROUND`.
**EN** — *What:* opens the Playground — the living component catalog/sandbox in all states. *When:* to explore, test and demonstrate official pieces before composing them. *How:* delegates to the **Playground** (`tools/PLAYGROUND`), a layer derived from the Runtime, never production (Art. 5). *Consumes:* the Runtime + the components. *Produces:* the opened Playground environment. *Owner:* `tools/PLAYGROUND`.

### 2.11 `studio export`
**PT** — *O que faz:* exporta tokens e artefatos da fundação para as tecnologias-alvo. *Quando usar:* ao materializar a Specification para um Runtime concreto ou alimentar outra ferramenta. *Como funciona:* delega aos **Exporters**, que traduzem tokens→tecnologia; a CLI escolhe o alvo e o formato conceitual de saída e reporta o resultado. *Consome:* os tokens/artefatos da Specification + o alvo. *Produz:* o artefato exportado. *Dono:* `generation/EXPORTERS`.
**EN** — *What:* exports foundation tokens and artifacts to target technologies. *When:* when materializing the Specification into a concrete Runtime or feeding another tool. *How:* delegates to the **Exporters**, which translate tokens→technology; the CLI picks the target and conceptual output format and reports the result. *Consumes:* the Specification's tokens/artifacts + the target. *Produces:* the exported artifact. *Owner:* `generation/EXPORTERS`.

---

## Responsabilidades · Responsibilities
**PT** — Oferecer um verbo único e consistente por operação; reunir argumentos e apresentar resultados com uma experiência de terminal clara; delegar cada operação ao domínio dono; propagar estados inequívocos e códigos de saída previsíveis.
**EN** — Offer a single, consistent verb per operation; gather arguments and present results with a clear terminal experience; delegate each operation to the owning domain; propagate unambiguous states and predictable exit codes.

## Não-responsabilidades · Non-responsibilities
**PT** — Não define regras de nenhum domínio (Linter, Certification, Exporters, Versioning, Themes, Generator, Tokens são donos); não é a documentação (`packages/docs`) nem o ambiente vivo (`PLAYGROUND`); não prescreve linguagem/runtime de implementação (§13); não fixa valores estéticos.
**EN** — Does not define any domain's rules (Linter, Certification, Exporters, Versioning, Themes, Generator, Tokens are owners); is not the documentation (`packages/docs`) or the living environment (`PLAYGROUND`); does not prescribe an implementation language/runtime (§13); does not fix aesthetic values.

## Integrações e dependências · Integrations and dependencies
**PT** — A CLI aciona: `PROJECT_GENERATOR`, `TEMPLATES`, `COMPONENT_LIBRARY`, `LINTER`, `COMPLIANCE`, `CERTIFICATION`, `VERSIONING`, `tokens/*`, `EXPORTERS`, `THEMES`, `packages/docs`, `PLAYGROUND`. Fisicamente residirá em `packages/cli` (a entrar no `PACKAGES` quando o épico o materializar). Depende da fronteira Specification × Runtime do `RUNTIME`.
**EN** — The CLI triggers: `PROJECT_GENERATOR`, `TEMPLATES`, `COMPONENT_LIBRARY`, `LINTER`, `COMPLIANCE`, `CERTIFICATION`, `VERSIONING`, `tokens/*`, `EXPORTERS`, `THEMES`, `packages/docs`, `PLAYGROUND`. It will physically live in `packages/cli` (to enter `PACKAGES` when the epic materializes it). It depends on the `RUNTIME` Specification × Runtime boundary.

## Fluxos · Flows
**PT** — Fluxo canônico de um comando: **argumentos → validação leve → invocação do dono → apresentação do resultado + código de saída.** Fluxo de nascimento: `studio create` → Generator → projeto conforme. Fluxo de qualidade: `studio lint` → Linter; `studio audit` → Certification. Fluxo de evolução: `studio upgrade` → Versioning. Nenhum fluxo termina dentro da CLI: o resultado sempre vem do dono.
**EN** — Canonical command flow: **arguments → light validation → owner invocation → result presentation + exit code.** Birth flow: `studio create` → Generator → compliant project. Quality flow: `studio lint` → Linter; `studio audit` → Certification. Evolution flow: `studio upgrade` → Versioning. No flow ends inside the CLI: the result always comes from the owner.

## Boas práticas · Best practices
**PT** — Mantenha cada comando fino: reúna, delegue, apresente. Fale a língua do construtor nas mensagens (P11). Ofereça um formato legível por máquina para automação, sem torná-lo o padrão humano. Códigos de saída previsíveis. Nunca engula um erro do dono num fallback silencioso (Art. 5). Um comando novo só nasce para uma operação genuína de outro dono — nunca para duplicar lógica.
**EN** — Keep each command thin: gather, delegate, present. Speak the builder's language in messages (P11). Offer a machine-readable format for automation without making it the human default. Predictable exit codes. Never swallow an owner's error into a silent fallback (Art. 5). A new command is born only for a genuine operation of another owner — never to duplicate logic.

## Anti-padrões · Anti-patterns
**PT / EN**
- Um comando que reimplementa a lógica de um dono (ex.: a CLI decidindo o que é violação em vez de chamar o Linter) — viola SSOT (Art. 10). / A command reimplementing an owner's logic (e.g. the CLI deciding what a violation is instead of calling the Linter) — violates SSOT.
- CLI acoplada a uma tecnologia específica de implementação, ou que prescreve o runtime do sistema consumidor (§13, Art. 13). / A CLI coupled to a specific implementation technology, or prescribing the consuming system's runtime.
- Erro do dono engolido num fallback plausível sem sinal (Art. 5, `STUDIO_UX.md` §10). / An owner's error swallowed into a plausible fallback without a signal.
- Comando que renderiza jargão técnico cru como se fosse a experiência (viola P11). / A command rendering raw technical jargon as the experience.
- `studio generate` inventando um componente fora da biblioteca (Art. 4). / `studio generate` inventing a component outside the library.
- Dois comandos com a mesma responsabilidade, ou um comando guarda-chuva sem foco. / Two commands with the same responsibility, or an unfocused umbrella command.

## Roadmap
**PT** — Especificado no Épico 2 (Ferramentas). Os comandos nascem na implementação (`packages/cli`), cada um respeitando a delegação ao dono. Comandos novos entram aqui quando um domínio dono novo passa a oferecer uma operação de terminal — nunca antes.
**EN** — Specified in Epic 2 (Tools). The commands are born at implementation (`packages/cli`), each respecting delegation to the owner. New commands enter here when a new owning domain begins offering a terminal operation — never before.

## Referências internas · Internal references
`platform/STUDIO_UX_ARCHITECTURE.md` · `platform/STUDIO_UX_PACKAGES.md` · `platform/STUDIO_UX_RUNTIME.md` · `tools/STUDIO_UX_DEVTOOLS.md` · `tools/STUDIO_UX_PLAYGROUND.md` · `generation/STUDIO_UX_PROJECT_GENERATOR.md` · `generation/STUDIO_UX_EXPORTERS.md` · `quality/STUDIO_UX_LINTER.md` · `quality/STUDIO_UX_COMPLIANCE.md` · `STUDIO_UX_CERTIFICATION.md` · `governance/STUDIO_UX_VERSIONING.md` · `STUDIO_UX_THEMES.md` · `tokens/STUDIO_UX_DESIGN_TOKENS.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 4, 5, 10, 13, 14) · `STUDIO_UX.md` §11 · §13

## Estado da implementação · Implementation state

**PT** — Materializada em `tools/cli/studio.mjs` (v1.1.7), a entrar em `packages/cli` quando o `PACKAGES` a formalizar. Os 11 comandos existem. **Donos já construídos → delegação real:** `lint` → `tools/linter/lint.mjs`; `export` → `tools/exporters/export-tokens.mjs`; `tokens`/`theme` → leitura de `tokens.css` (regra é do `tokens/*`), `tokens --export` reencaminha ao Exporter; `doctor`/`upgrade` → versão de `package.json` + tags git (dono: Versioning); `docs` → lista `docs/`; `playground` → aponta `PLAYGROUND`/`DEVTOOLS`. `create` → `tools/generator/generate.mjs` (Project Generator, desde v1.1.8); `generate` → `tools/generator/templates.mjs` (Templates, desde v1.1.10). **Dono ainda não construído → honestidade (Art. 21):** `audit` (Certification) existe como verbo, mas **avisa** que o dono não nasceu e sai com código 2 — não finge execução. `bin: { studio }` no `package.json` raiz.
**EN** — Materialized in `tools/cli/studio.mjs`, to move into `packages/cli` when `PACKAGES` formalizes it. All 11 commands exist. **Owners already built → real delegation:** `create` (Project Generator), `generate` (Templates, since v1.1.10), `lint`, `export`, `tokens`/`theme`, `doctor`/`upgrade`, `docs`, `playground`. **Owner not yet built → honesty (Art. 21):** `audit` (Certification) exists as a verb but **reports** the owner isn't born and exits with code 2 — it doesn't fake execution.

---

*Documento vivo. A CLI é a porta de entrada que aciona os donos; nunca reimplementa a regra deles. · Living document. The CLI is the entry point that triggers the owners; it never reimplements their rule.*
