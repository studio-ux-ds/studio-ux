# STUDIO_UX_ARCHITECTURE.md — Arquitetura da Plataforma · Platform Architecture

> Documento normativo vivo. Responde a: **quais são os domínios do Studio UX, qual a responsabilidade de cada um e como se relacionam?**
> Living normative document. Answers: **what are the Studio UX domains, each one's responsibility, and how they relate?**
> Governança: `STUDIO_UX.md` (SSOT §11), `platform/STUDIO_UX_PLATFORM.md`.

```
Architecture Boundary Check — STUDIO_UX_ARCHITECTURE
Resolve · Solves:            o MAPA lógico completo dos domínios da plataforma e suas responsabilidades — a visão
                             única de "quem faz o quê" no ecossistema.
                             / the complete logical MAP of the platform's domains and responsibilities — the single
                             view of "who does what" in the ecosystem.
Não pertence a outro porque · Not elsewhere because:
                             PLATFORM é a estratégia (por quê/o quê); PACKAGES é o layout FÍSICO do código; RUNTIME é
                             a separação de CAMADAS de execução. Faltava o mapa lógico de domínios.
                             / PLATFORM is strategy; PACKAGES is the PHYSICAL code layout; RUNTIME is the EXECUTION-layer
                             separation. The missing piece is the logical domain map.
Complementa · Complements:   PLATFORM, PACKAGES, RUNTIME, STUDIO_UX.md §11 (mapa SSOT), CONSTITUTION.
Nunca substitui · Never replaces: PACKAGES (layout físico), RUNTIME (camadas de execução), nem os donos de cada domínio.
Dono · Owner:                este doc, para o domínio "arquitetura lógica / mapa de domínios".
                             / this doc, for the "logical architecture / domain map" domain.
```

---

## Objetivo · Objective
**PT** — Ser o mapa de referência de todos os domínios do Studio UX: o que cada um resolve, o que **não** resolve, e como se conectam. É a visão de conjunto que impede sobreposição e orienta onde uma responsabilidade nova deve morar.
**EN** — Be the reference map of all Studio UX domains: what each solves, what it does **not**, and how they connect. It is the whole-system view that prevents overlap and guides where a new responsibility should live.

## Escopo · Scope
**PT** — Os domínios **lógicos** e suas fronteiras. **Não** define pastas de código (`PACKAGES`) nem camadas de execução (`RUNTIME`) — referencia ambos.
**EN** — The **logical** domains and their boundaries. It does **not** define code folders (`PACKAGES`) or execution layers (`RUNTIME`) — it references both.

---

## 1. Os domínios · The domains
**PT** — Cada domínio tem um dono único (SSOT, `STUDIO_UX.md` §11). Agrupados pelas cinco camadas da plataforma:

**EN** — Each domain has a single owner (SSOT). Grouped by the platform's five layers:

| Camada · Layer | Domínio · Domain | Responsabilidade · Responsibility | Dono · Owner |
|---|---|---|---|
| Governança | Constituição | verdades imutáveis | `governance/CONSTITUTION` |
| Governança | Governança operacional | regras, SSOT, boundary check | `STUDIO_UX.md` |
| Governança | Versionamento | SemVer, migração, LTS | `governance/VERSIONING` |
| Governança | Decisões (ADR) | registrar decisões | `governance/ADR_GUIDE` |
| Governança | Propostas (RFC) | propor mudanças | `governance/RFC_GUIDE` |
| Fundação | Visão/Filosofia/Princípios | por quê e regras | `VISION`/`PHILOSOPHY`/`PRINCIPLES` |
| Fundação | Linguagem visual | DNA, gramática, superfícies, ritmo | `VISUAL_DNA`/`GRAMMAR`/`SURFACES`/`VISUAL_RHYTHM` |
| Fundação | Tokens | arquitetura + valores | `tokens/*` |
| Fundação | Temas / Ícones / Motion | aparência trocável | `THEMES`/`ICONOGRAPHY`/`ANIMATIONS` |
| Fundação | Layout / Componentes / Padrões | estrutura e peças | `LAYOUT_SYSTEM`/`COMPONENT_LIBRARY`/`PATTERNS` |
| Fundação | Acessibilidade | usável por todos | `ACCESSIBILITY` |
| Fundação | Composição por domínio | dashboard/forms/tables/nav | `DASHBOARD`/`FORMS`/`TABLES`/`NAVIGATION` |
| Fundação | Produtos | Desktop / Mobile | `desktop/*`/`mobile/*` |
| Ferramentas | CLI | operações de linha de comando | `tools/CLI` |
| Ferramentas | DevTools | inspetores | `tools/DEVTOOLS` |
| Ferramentas | Playground | catálogo/sandbox vivo | `tools/PLAYGROUND` |
| Qualidade | Linter | detecção automática | `quality/LINTER` |
| Qualidade | Compliance | medição contínua | `quality/COMPLIANCE` |
| Qualidade | Certificação | nível/selo (tela+sistema) | `CERTIFICATION` |
| Geração | Project Generator | nascimento de sistemas | `generation/PROJECT_GENERATOR` |
| Geração | Exporters | tokens→tecnologias | `generation/EXPORTERS` |
| IA | Ecossistema de IA | consumo por IAs | `context/AI_ECOSYSTEM` |
| IA | Contexto/Regras de IA | procedimento/regras | `context/AI_CONTEXT`/`context/AI_RULES` |

> **PT** — Nomes com pasta hipotética (`tools/`, `quality/`, `generation/`) indicam domínios dos épicos futuros; os documentos são criados no seu épico. **EN** — Names with a hypothetical folder indicate future-epic domains; the documents are created in their epic.

## 2. Como os domínios se relacionam · How domains relate
**PT** — A regra de dependência é acíclica e de cima para baixo: **Constituição → Governança → Fundação → (Ferramentas, Qualidade, Geração, IA)**. Uma camada superior nunca depende de uma inferior para existir; as inferiores consomem as superiores. Exemplos: Exporters dependem de Tokens (não o contrário); Linter depende de Princípios e Tokens; Certification agrega Linter/Compliance/Princípios; IA consome tudo como contexto. Nenhum domínio importa outro "por dentro" fora dessas relações — a fronteira de cada um está no seu Boundary Check.
**EN** — The dependency rule is acyclic and top-down: **Constitution → Governance → Foundation → (Tools, Quality, Generation, AI)**. An upper layer never depends on a lower one to exist; lower ones consume upper ones. Examples: Exporters depend on Tokens (not vice versa); the Linter depends on Principles and Tokens; Certification aggregates Linter/Compliance/Principles; AI consumes everything as context. No domain reaches "inside" another beyond these relations.

## 3. Onde uma responsabilidade nova mora · Where a new responsibility lives
**PT** — Antes de criar um domínio, aplica-se o teste do `STUDIO_UX.md` §12 (Boundary Check) e a regra de ouro §3.8 ("assunto novo ou já tem dono?"). Se cabe num domínio existente, expande-se o dono; só um domínio genuinamente novo ganha documento. Este mapa é o índice para decidir.
**EN** — Before creating a domain, apply the `STUDIO_UX.md` §12 test (Boundary Check) and the golden rule §3.8 ("new subject or already owned?"). If it fits an existing domain, expand the owner; only a genuinely new domain gets a document. This map is the index for deciding.

## Responsabilidades · Responsibilities
**PT** — Manter o mapa lógico atualizado; nomear cada domínio e seu dono; declarar as relações de dependência entre camadas.
**EN** — Keep the logical map current; name each domain and its owner; declare the cross-layer dependency relations.

## Não-responsabilidades · Non-responsibilities
**PT** — Não detalha o interior de nenhum domínio; não define o monorepo físico (`PACKAGES`); não define execução (`RUNTIME`); não é a estratégia (`PLATFORM`).
**EN** — Does not detail any domain's interior; does not define the physical monorepo (`PACKAGES`); does not define execution (`RUNTIME`); is not the strategy (`PLATFORM`).

## Integrações e dependências · Integrations and dependencies
**PT** — Espelha e detalha o mapa SSOT do `STUDIO_UX.md` §11; serve o `PACKAGES` (que dá endereço físico a cada domínio) e o `RUNTIME` (que separa por execução).
**EN** — Mirrors and details the `STUDIO_UX.md` §11 SSOT map; serves `PACKAGES` (which gives each domain a physical address) and `RUNTIME` (which separates by execution).

## Fluxos · Flows
**PT** — Fluxo de decisão "onde mora uma responsabilidade" (§3); fluxo de dependência entre camadas (§2).
**EN** — "Where a responsibility lives" decision flow (§3); cross-layer dependency flow (§2).

## Boas práticas · Best practices
**PT** — Consulte este mapa antes de qualquer documento novo. Mantenha a dependência acíclica. Cada linha da tabela tem um só dono.
**EN** — Consult this map before any new document. Keep dependencies acyclic. Each table row has a single owner.

## Anti-padrões · Anti-patterns
**PT / EN**
- Dependência circular entre domínios. / Circular dependency between domains.
- Dois donos para o mesmo domínio. / Two owners for the same domain.
- Detalhar o interior de um domínio aqui. / Detailing a domain's interior here.
- Confundir mapa lógico com layout de pastas (`PACKAGES`). / Confusing the logical map with the folder layout.

## Roadmap
**PT** — O mapa cresce a cada épico (Ferramentas, Qualidade, Geração, IA) — cada domínio novo entra aqui e no §11 do `STUDIO_UX.md` na mesma leva.
**EN** — The map grows with each epic — each new domain enters here and in `STUDIO_UX.md` §11 in the same commit.

## Referências internas · Internal references
`STUDIO_UX.md` §11 · `platform/STUDIO_UX_PLATFORM.md` · `platform/STUDIO_UX_PACKAGES.md` · `platform/STUDIO_UX_RUNTIME.md` · `governance/STUDIO_UX_CONSTITUTION.md`

---

*Documento vivo. Mapa lógico de domínios; o físico é do PACKAGES, a execução do RUNTIME. · Living document. Logical domain map; physical belongs to PACKAGES, execution to RUNTIME.*
