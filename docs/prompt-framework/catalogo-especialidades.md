# Catálogo de especialidades de desenvolvimento · Development specialty catalog

> **PT** — Catálogo versionado dos prompts que podem ser selecionados pelo alinhador. Cada item representa uma responsabilidade real do Studio UX e aponta para seu contrato operacional.
>
> **EN** — Versioned catalog of prompts that may be selected by the aligner. Each item represents a real Studio UX responsibility and points to its operating contract.

```
Architecture Boundary Check — Catálogo de especialidades
Resolve · Solves:             declarar quais responsabilidades podem ser roteadas e para qual contrato.
Não pertence a outro porque · Not elsewhere because:
                              o alinhador classifica; a especialidade executa; este arquivo é a lista versionada entre ambos.
Complementa · Complements:    prompt-alinhamento.md e os arquivos em especialidades/.
Nunca substitui · Never replaces:
                              regras do repositório, dono técnico, código real ou aprovação humana.
Dono · Owner:                 este catálogo, para os slugs, caminhos e fronteiras das especialidades.
```

## 1. Regra de seleção · Selection rule

**PT** — Selecione uma especialidade apenas quando sua missão cobrir toda a responsabilidade principal do pedido. Um título profissional é contexto operacional; a missão e os limites abaixo são o critério de seleção. Quando nenhuma linha se aplicar, o alinhador devolve `especialidade não catalogada` e não cria nada.

**EN** — Select a specialty only when its mission covers the full primary responsibility of the request. A professional title is operational context; the mission and limits below are the selection criterion. When no line applies, the aligner returns `specialty not cataloged` and creates nothing.

## 2. Especialidades disponíveis · Available specialties

| Slug | Identidade operacional · Operating identity | Missão · Mission | Prompt |
|---|---|---|---|
| `design-system-foundation` | Engenheiro Sênior de Design Systems · Senior Design Systems Engineer | Evoluir tokens, CSS de componentes, ícones e temas sem criar uma segunda linguagem visual nem quebrar contratos. · Evolve tokens, component CSS, icons and themes without creating a second visual language or breaking contracts. | [design-system-foundation.md](especialidades/design-system-foundation.md) |
| `web-adapter-and-storybook` | Engenheiro Frontend Sênior especializado em Design Systems · Senior Frontend Engineer specialized in Design Systems | Evoluir o adapter React e a documentação viva do Storybook sobre as APIs reais e o CSS oficial. · Evolve the React adapter and Storybook living documentation on real APIs and official CSS. | [web-adapter-and-storybook.md](especialidades/web-adapter-and-storybook.md) |
| `mobile-adapters` | Engenheiro Sênior de Design Systems Mobile · Senior Mobile Design Systems Engineer | Evoluir contratos Mobile e React Native preservando a fronteira entre web e nativo. · Evolve Mobile and React Native contracts while preserving the web/native boundary. | [mobile-adapters.md](especialidades/mobile-adapters.md) |
| `platform-tooling-and-release` | Engenheiro Sênior de DX e Release · Senior Developer Experience and Release Engineer | Evoluir CLI, scripts, manifests, validações e publicação lockstep do monorepo. · Evolve CLI, scripts, manifests, validations and lockstep monorepo publishing. | [platform-tooling-and-release.md](especialidades/platform-tooling-and-release.md) |
| `design-system-governance-and-quality` | Arquiteto Sênior de Governança Técnica e Qualidade · Senior Technical Governance and Quality Architect | Evoluir SSOT, regras, documentação, auditorias e critérios de qualidade sem duplicar donos. · Evolve SSOT, rules, documentation, audits and quality criteria without duplicating owners. | [design-system-governance-and-quality.md](especialidades/design-system-governance-and-quality.md) |

## 3. Fora do catálogo · Outside the catalog

**PT** — Este repositório não possui domínio próprio de backend, banco de dados, integrações externas de produto, atendimento, SDR ou automação operacional. Pedidos desses domínios não devem ser encaixados à força em uma especialidade acima.

**EN** — This repository has no owned domain for backend, database, product external integrations, support, SDR or operational automation. Requests from those domains must not be forced into a specialty above.

---

*Versão do catálogo · Catalog version: 1.0.0. Documento do framework, independente da versão lockstep dos pacotes. · Framework document, independent from the packages' lockstep version.*
