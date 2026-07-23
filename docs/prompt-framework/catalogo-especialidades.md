---
schema: prompt-framework/v1
id: studio-ux.specialty-catalog
kind: shared
version: 2.0.0
status: released
title: Catalogo de especialidades do Studio UX
owners: [robson]
reviewers: [robson]
reviewed_at: "2026-07-23"
released_at: "2026-07-23"
change_reason: Migracao do catalogo do formato markdown livre (v1.0.1) para o schema formal `prompt-framework/v1` do STUDIO-WORKFLOW v3.0.0.
---

# Catalogo de especialidades do Studio UX · Studio UX specialty catalog

> **PT** — Catalogo versionado dos prompts que podem ser selecionados pelo alinhador (`workflow.prompt-alignment@2.0.0`). Cada item representa uma responsabilidade real do Studio UX e aponta para seu contrato operacional.
>
> **EN** — Versioned catalog of prompts that may be selected by the aligner (`workflow.prompt-alignment@2.0.0`). Each item represents a real Studio UX responsibility and points to its operating contract.

## Missao · Mission

**PT** — Definir quais especialidades existem no Studio UX, suas fronteiras e o arquivo que o alinhador deve selecionar.

**EN** — Define which specialties exist in Studio UX, their boundaries and the file the aligner must select.

## Regra de selecao · Selection rule

**PT** — Selecione uma especialidade apenas quando sua missao cobrir toda a responsabilidade principal do pedido. Um titulo profissional e contexto operacional; a missao e os limites de cada arquivo sao o criterio de selecao. Pode indicar uma especialidade secundaria quando houver uma fronteira tecnica independente. Pedido com duas frentes independentes deve ser separado e aguardar a prioridade do dono do sistema. Quando nenhuma linha se aplicar, o alinhador devolve `especialidade não catalogada` e nao cria nada.

**EN** — Select a specialty only when its mission covers the full primary responsibility of the request. A professional title is operational context; each file's mission and limits are the selection criterion. A secondary specialty may be indicated only when there is an independent technical boundary. A request with two independent fronts must be separated and wait for the owner's priority. When no line applies, the aligner returns `specialty not cataloged` and creates nothing.

## Especialidades disponiveis · Available specialties

| Slug | Identidade operacional · Operating identity | Missao · Mission | Prompt |
|---|---|---|---|
| `studio-ux.design-system-foundation` | Engenheiro Senior de Design Systems · Senior Design Systems Engineer | Evoluir tokens, CSS de componentes, icones e temas sem criar uma segunda linguagem visual nem quebrar contratos. · Evolve tokens, component CSS, icons and themes without creating a second visual language or breaking contracts. | [design-system-foundation.md](especialidades/design-system-foundation.md) |
| `studio-ux.web-adapter-and-storybook` | Engenheiro Frontend Senior especializado em Design Systems · Senior Frontend Engineer specialized in Design Systems | Evoluir o adapter React e a documentacao viva do Storybook sobre as APIs reais e o CSS oficial. · Evolve the React adapter and Storybook living documentation on real APIs and official CSS. | [web-adapter-and-storybook.md](especialidades/web-adapter-and-storybook.md) |
| `studio-ux.mobile-adapters` | Engenheiro Senior de Design Systems Mobile · Senior Mobile Design Systems Engineer | Evoluir contratos Mobile e React Native preservando a fronteira entre web e nativo. · Evolve Mobile and React Native contracts while preserving the web/native boundary. | [mobile-adapters.md](especialidades/mobile-adapters.md) |
| `studio-ux.platform-tooling-and-release` | Engenheiro Senior de DX e Release · Senior Developer Experience and Release Engineer | Evoluir CLI, scripts, manifests, validacoes e publicacao lockstep do monorepo. · Evolve CLI, scripts, manifests, validations and lockstep monorepo publishing. | [platform-tooling-and-release.md](especialidades/platform-tooling-and-release.md) |
| `studio-ux.design-system-governance-and-quality` | Arquiteto Senior de Governanca Tecnica e Qualidade · Senior Technical Governance and Quality Architect | Evoluir SSOT, regras, documentacao, auditorias e criterios de qualidade sem duplicar donos. · Evolve SSOT, rules, documentation, audits and quality criteria without duplicating owners. | [design-system-governance-and-quality.md](especialidades/design-system-governance-and-quality.md) |
| `studio-ux.ux-reference-and-examples` | Designer de Produto Senior especializado em Design Systems · Senior Product Designer specialized in Design Systems | Refinar referencias HTML e exemplos de jornada com os contratos reais do Studio UX, sem transforma-los em uma segunda biblioteca. · Refine HTML references and journey examples with real Studio UX contracts, without turning them into a second library. | [ux-reference-and-examples.md](especialidades/ux-reference-and-examples.md) |

## Fora do catalogo · Outside the catalog

**PT** — Este repositorio nao possui dominio proprio de backend, banco de dados, integracoes externas de produto, atendimento, SDR ou automacao operacional. Pedidos desses dominios nao devem ser encaixados a forca em uma especialidade acima; o alinhador devolve `especialidade não catalogada` e aguarda decisao.

**EN** — This repository has no owned domain for backend, database, product external integrations, support, SDR or operational automation. Requests from those domains must not be forced into a specialty above; the aligner returns `specialty not cataloged` and waits for a decision.

## Criterios de aceite · Acceptance criteria

- Todo slug aponta para um unico arquivo `released` em `especialidades/`.
- Toda especialidade herda `workflow.system-change-base@1.0.0` (capability agnostica que vive em `C:\Users\Flowspec\Documents\STUDIO-WORKFLOW\shared\system-change-base.md`).
- Nenhuma especialidade e escolhida apenas pela identidade profissional.
- Especialidade ausente exige novo relatorio e aprovacao explicita antes de criacao.

## Registro de revisao

| Versao | Estado | Revisao | Impacto |
|---|---|---|---|
| 1.0.1 | released | Formato markdown livre (bilingue) | Catalogo autoritativo pre-schema |
| 2.0.0 | released | Aprovado por Robson em 2026-07-23 | Migracao para o schema formal `prompt-framework/v1`; namespace `studio-ux.*`; heranca da capability agnostica `workflow.system-change-base@1.0.0`; bilinguismo PT+EN preservado. |
