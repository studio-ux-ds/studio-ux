# STUDIO_UX_PACKAGES.md — Arquitetura de Monorepo · Monorepo Architecture

> Documento normativo vivo. Responde a: **como o código da plataforma se organiza fisicamente em pacotes, e qual a responsabilidade de cada um?**
> Living normative document. Answers: **how is the platform's code physically organized into packages, and what is each one's responsibility?**
> Governança: `STUDIO_UX.md` (§11 SSOT), `platform/STUDIO_UX_ARCHITECTURE.md` (mapa lógico), `platform/STUDIO_UX_RUNTIME.md`.

```
Architecture Boundary Check — STUDIO_UX_PACKAGES
Resolve · Solves:            o layout FÍSICO do monorepo — quais pacotes existem, o que cada um contém e do que depende.
                             Dá endereço físico aos domínios lógicos.
                             / the PHYSICAL monorepo layout — which packages exist, what each contains and depends on.
                             Gives a physical address to the logical domains.
Não pertence a outro porque · Not elsewhere because:
                             ARCHITECTURE é o mapa LÓGICO de domínios; RUNTIME separa CAMADAS de execução; PLATFORM é
                             a estratégia. Faltava onde, fisicamente, o código de cada domínio mora.
                             / ARCHITECTURE is the LOGICAL domain map; RUNTIME separates EXECUTION layers; PLATFORM is
                             strategy. The missing piece is where, physically, each domain's code lives.
Complementa · Complements:   ARCHITECTURE, RUNTIME, PLATFORM, EXPORTERS (Épico 4), DEVTOOLS/PLAYGROUND (Épico 2).
Nunca substitui · Never replaces: ARCHITECTURE (domínios lógicos), RUNTIME (camadas de execução), nem os donos de cada domínio.
Dono · Owner:                este doc, para o domínio "arquitetura de monorepo / layout físico".
                             / this doc, for the "monorepo architecture / physical layout" domain.
```

---

## Objetivo · Objective
**PT** — Definir a arquitetura física do monorepo do Studio UX: a lista de pacotes, a responsabilidade única de cada um, o grafo de dependências (acíclico) e o que cada pacote **nunca** contém. Isto dá endereço físico aos domínios lógicos do `ARCHITECTURE` e prepara a implementação sem, nesta fase, escrever uma linha de código.
**EN** — Define the physical architecture of the Studio UX monorepo: the package list, each one's single responsibility, the (acyclic) dependency graph, and what each package **never** contains. This gives a physical address to the `ARCHITECTURE` logical domains and prepares implementation without, in this phase, writing a single line of code.

## Escopo · Scope
**PT** — O layout físico de pacotes e suas dependências. **Não** define os domínios lógicos (`ARCHITECTURE`), as camadas de execução (`RUNTIME`) nem o conteúdo de cada domínio (donos próprios). Esta é **especificação de arquitetura**, não código criado.
**EN** — The physical package layout and its dependencies. It does **not** define the logical domains (`ARCHITECTURE`), the execution layers (`RUNTIME`) or each domain's content (own owners). This is **architecture specification**, not created code.

---

## 1. Os pacotes · The packages

**PT** — Cada pacote tem uma responsabilidade única (Art. 10 — SSOT físico). A ordem abaixo segue o grafo de dependência, do mais básico (não depende de ninguém) ao mais alto.

**EN** — Each package has a single responsibility (Art. 10 — physical SSOT). The order below follows the dependency graph, from the most basic (depends on nothing) to the highest.

| Pacote · Package | Responsabilidade única · Single responsibility | Depende de · Depends on | Nunca contém · Never contains |
|---|---|---|---|
| `packages/core` | primitivos, tipos e utilidades fundamentais, agnósticos de aparência | (nada / nothing) | tokens, componentes, aparência |
| `packages/tokens` | os design tokens materializados (a partir de `tokens/*`) e sua resolução | `core` | componentes, layout, lógica de tela |
| `packages/icons` | a biblioteca de ícones curada (`ICONOGRAPHY`) | `core` | componentes, cor fora de token |
| `packages/components` | os componentes oficiais (`COMPONENT_LIBRARY`), agnósticos de produto quando possível | `tokens`, `icons`, `core` | telas, layout de produto, dado de negócio |
| `packages/desktop` | o produto Desktop — layout, shell e variações Desktop (`desktop/*`) | `components`, `tokens`, `core` | qualquer coisa de Mobile (Art. 2, P4) |
| `packages/mobile` | o produto Mobile — layout, shell e variações Mobile (`mobile/*`) | `components`, `tokens`, `core` | qualquer coisa de Desktop (Art. 2, P4) |
| `packages/templates` | moldes de tela/projeto prontos (camada Templates do `RUNTIME`) | `desktop`, `mobile`, `components` | dado de negócio real, framework acoplado |
| `packages/playground` | o ambiente de catálogo/sandbox vivo (dono virá no Épico 2) | `desktop`, `mobile`, `components`, `tokens` | ser uma aplicação de produção |
| `packages/docs` | a documentação navegável gerada a partir da Specification | `core` (leitura) | ser fonte da verdade (a verdade é a Specification, Art. 5) |
| `packages/testing` | utilidades de teste e conformidade compartilhadas (base do Linter/Certification) | `core`, `tokens`, `components` | regras de negócio; ser o dono das regras (só as executa) |
| `packages/devtools` | os inspetores (dono virá no Épico 2) | `tokens`, `components`, `core` | ser Playground; ser aplicação final |

## 2. Grafo de dependências · Dependency graph
**PT** — A regra é **acíclica e de baixo para cima**: `core` não depende de ninguém; `tokens`, `icons` dependem de `core`; `components` depende de `tokens`+`icons`+`core`; `desktop` e `mobile` dependem de `components`; `templates`/`playground` dependem dos produtos. **Nunca** existe ciclo (nada que `core` importe volta a depender de `core`). Isto espelha a dependência acíclica dos domínios lógicos (`ARCHITECTURE` §2): o físico obedece ao lógico.
**EN** — The rule is **acyclic and bottom-up**: `core` depends on nothing; `tokens`, `icons` depend on `core`; `components` depends on `tokens`+`icons`+`core`; `desktop` and `mobile` depend on `components`; `templates`/`playground` depend on the products. There is **never** a cycle. This mirrors the acyclic dependency of the logical domains (`ARCHITECTURE` §2): the physical obeys the logical.

## 3. A fronteira Desktop × Mobile no monorepo · The Desktop × Mobile boundary in the monorepo
**PT** — `packages/desktop` e `packages/mobile` são **pacotes irmãos e separados** que compartilham `core`, `tokens`, `icons` e `components`, mas **nunca importam um do outro** (Art. 2, P4). `desktop` importar de `mobile` (ou vice-versa) é uma violação estrutural detectável pelo Linter (Épico 3). A identidade é compartilhada pela base; o layout, jamais.
**EN** — `packages/desktop` and `packages/mobile` are **sibling, separate packages** sharing `core`, `tokens`, `icons` and `components`, but **never importing from each other** (Art. 2, P4). `desktop` importing from `mobile` (or vice versa) is a structural violation detectable by the Linter (Epic 3). Identity is shared by the base; layout, never.

## 4. Especificação, não implementação · Specification, not implementation
**PT** — Nesta fase (`v0.2.x`, era de documentação), este layout é **contrato de arquitetura**, não código. Os pacotes nascem na fase de implementação (Fases 2+ do `ROADMAP`), cada um respeitando a responsabilidade única e o grafo aqui definidos. A separação Specification × Runtime é do `RUNTIME`.
**EN** — In this phase (`v0.2.x`, documentation era), this layout is an **architecture contract**, not code. The packages are born in the implementation phase (Phases 2+ of the `ROADMAP`), each respecting the single responsibility and graph defined here. The Specification × Runtime separation belongs to `RUNTIME`.

## Responsabilidades · Responsibilities
**PT** — Nomear os pacotes, a responsabilidade única de cada um, o grafo acíclico e as proibições físicas (o que cada pacote nunca contém/importa).
**EN** — Name the packages, each one's single responsibility, the acyclic graph and the physical prohibitions.

## Não-responsabilidades · Non-responsibilities
**PT** — Não define domínios lógicos (`ARCHITECTURE`), camadas de execução (`RUNTIME`), estratégia (`PLATFORM`), nem o conteúdo interno de cada pacote (donos de domínio).
**EN** — Does not define logical domains (`ARCHITECTURE`), execution layers (`RUNTIME`), strategy (`PLATFORM`), or each package's internal content (domain owners).

## Integrações e dependências · Integrations and dependencies
**PT** — Realiza fisicamente o mapa do `ARCHITECTURE`; serve os `EXPORTERS` (que partem de `packages/tokens`), o `PLAYGROUND` e os `DEVTOOLS` (Épico 2), e o `testing` como base de `LINTER`/`CERTIFICATION` (Épico 3).
**EN** — Physically realizes the `ARCHITECTURE` map; serves the `EXPORTERS` (starting from `packages/tokens`), the `PLAYGROUND` and `DEVTOOLS` (Epic 2), and `testing` as the base of `LINTER`/`CERTIFICATION` (Epic 3).

## Fluxos · Flows
**PT** — Fluxo de dependência (§2); fluxo de nascimento de pacote na implementação (§4); verificação da fronteira Desktop×Mobile pelo Linter (§3).
**EN** — Dependency flow (§2); package-birth flow at implementation (§4); Desktop×Mobile boundary check by the Linter (§3).

## Boas práticas · Best practices
**PT** — Mantenha cada pacote com uma responsabilidade. Preserve o grafo acíclico. Compartilhe pela base (`core`/`tokens`/`components`), nunca lateralmente entre produtos. Um pacote novo só nasce se for um domínio físico genuíno (regra §3.8).
**EN** — Keep each package to one responsibility. Preserve the acyclic graph. Share through the base, never laterally between products. A new package is born only for a genuine physical domain (rule §3.8).

## Anti-padrões · Anti-patterns
**PT / EN**
- Dependência circular entre pacotes. / Circular dependency between packages.
- `desktop` importando de `mobile` (ou vice-versa). / `desktop` importing from `mobile` (or vice versa).
- Pacote guarda-chuva sem responsabilidade única. / An umbrella package with no single responsibility.
- `packages/docs` tratado como fonte da verdade (a verdade é a Specification, Art. 5). / Treating `packages/docs` as the source of truth.
- Colocar dado de negócio em qualquer pacote (Art. 19). / Putting business data in any package.

## Roadmap
**PT** — Especificado na era de documentação; os pacotes são criados na implementação (Fases 2+). Pacotes novos de épicos futuros (ex.: `packages/cli`) entram aqui quando o épico chegar.
**EN** — Specified in the documentation era; packages are created at implementation (Phases 2+). New packages from future epics (e.g. `packages/cli`) enter here when their epic arrives.

## Referências internas · Internal references
`platform/STUDIO_UX_ARCHITECTURE.md` · `platform/STUDIO_UX_RUNTIME.md` · `platform/STUDIO_UX_PLATFORM.md` · `STUDIO_UX.md` §11 · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 2, 10, 19)

---

*Documento vivo. Layout físico do monorepo; o mapa lógico é do ARCHITECTURE, a execução do RUNTIME. · Living document. Physical monorepo layout; the logical map belongs to ARCHITECTURE, execution to RUNTIME.*
