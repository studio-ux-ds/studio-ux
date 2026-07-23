# STUDIO_UX_HANDOFF.md — Estado & Re-ancoragem · State & Re-anchoring

> **PT** — Este arquivo existe porque a memória de um assistente é compactada em sessões longas e ele perde o fio (principalmente rastreando versão). **A fonte da verdade é o git + `CHANGELOG.md`, NUNCA a memória.** Toda sessão nova começa lendo: (1) `git log --oneline -3` e `git tag`, (2) este arquivo, (3) `STUDIO_UX.md`, (4) o doc da frente atual.
>
> **EN** — This file exists because an assistant's memory is compacted in long sessions and it loses the thread (especially tracking versions). **The source of truth is git + `CHANGELOG.md`, NEVER memory.** Every new session starts by reading: (1) `git log --oneline -3` and `git tag`, (2) this file, (3) `STUDIO_UX.md`, (4) the current front's doc.

> Última atualização · Last updated: 2026-07-22 (biblioteca e adoção por jornada em evolução · component library and journey adoption in progress).

---

## 🔴 Regra de ouro · Golden rule

**PT** — Nunca cravar número de versão, nome de arquivo/token/componente ou "o que já foi implementado" de cabeça. Rodar `git tag | sort -V | tail` e `git log --oneline -3` ANTES de falar de versão. Tag é imutável — nunca reusar. Confirmar o número da próxima versão com o Robson antes de taggear.

**EN** — Never state a version number, a file/token/component name, or "what's already implemented" from memory. Run `git tag | sort -V | tail` and `git log --oneline -3` BEFORE talking about versions. Tags are immutable — never reuse. Confirm the next version number with Robson before tagging.

> **PT — Convenção de versão vigente:** SemVer em lockstep para os manifests do monorepo. Antes de preparar qualquer release, descubra a última tag com `git tag --sort=-v:refname`, escolha o próximo número compatível com a mudança e aplique `scripts/set-version.mjs`; tags são imutáveis e nunca são reusadas.
> **EN — Current version convention:** SemVer in lockstep across monorepo manifests. Before preparing any release, discover the latest tag with `git tag --sort=-v:refname`, choose the next number compatible with the change, and apply `scripts/set-version.mjs`; tags are immutable and never reused.

---

## ✅ Estado vigente · Current state

- **Fundação, linguagem e tokens / Foundation, language and tokens:** concluídos e congelados como contratos. Mudança estrutural só por RFC + ADR; componente novo só por necessidade comprovada em produto. / Complete and frozen as contracts. Structural change only through RFC + ADR; a new component only for a proven product need.
- **Implementação real / Actual implementation:** `packages/tokens`, `packages/components`, `packages/icons`, `packages/react`, `packages/react-native`, `packages/mobile` e `packages/cli` existem e são versionados em lockstep. O Storybook documenta o adapter React real; `scripts/check-packages.mjs` é a validação estrutural da publicação. / The packages exist and are versioned in lockstep. Storybook documents the real React adapter; `scripts/check-packages.mjs` is the publishing structural validation.
- **Fase / Phase:** Fase 3 está ativa: componentes, padrões de jornada e refinamentos são materializados e adotados de forma controlada pelos sistemas consumidores. O produto não está mais em fase somente documental. / Phase 3 is active: components, journey patterns and refinements are being materialized and adopted in a controlled way by consuming systems. The product is no longer documentation-only.
- **Decisões visuais travadas / Locked visual decisions:** direção sóbria, sem gradientes decorativos; cor de ação configurável com paleta de acentos sóbrios; hierarquia e semântica vêm de tokens, não de literais na tela. / Sober direction, no decorative gradients; configurable action color with a sober accent palette; hierarchy and semantics come from tokens, never screen literals.
- **Idioma / Language:** Bilíngue PT-BR + EN, lado a lado por seção, em toda doc normativa. / Bilingual, side by side per section.

### Documentos entregues · Delivered documents

| Grupo · Group | Arquivos · Files | Status |
|---|---|---|
| Governança · Governance | `STUDIO_UX.md` (v1.1.0: +SSOT §11, +Boundary Check §12, +10 anos §13), `README.md`, `CHANGELOG.md` | ✅ |
| Conceito · Concept | `STUDIO_UX_VISION.md`, `STUDIO_UX_PHILOSOPHY.md`, `STUDIO_UX_PRINCIPLES.md`, `context/STUDIO_UX_AI_CONTEXT.md`, `context/AI_RULES.md`, `context/STUDIO_UX_HANDOFF.md` | ✅ |
| Linguagem visual · Visual language | `STUDIO_UX_VISUAL_DNA.md`, `STUDIO_UX_GRAMMAR.md` (ADR-001), `STUDIO_UX_SURFACES.md`, `STUDIO_UX_VISUAL_RHYTHM.md`, `research/REFERENCE_DNA.md` | ✅ |
| Tokens | `tokens/STUDIO_UX_DESIGN_TOKENS.md`, `COLOR_SYSTEM`, `TYPOGRAPHY`, `SPACING` | ✅ |
| Fundação visual · Visual foundation | `STUDIO_UX_THEMES.md`, `STUDIO_UX_ICONOGRAPHY.md`, `STUDIO_UX_ANIMATIONS.md` | ✅ |
| Estrutura · Structure | `layouts/STUDIO_UX_LAYOUT_SYSTEM.md`, `components/STUDIO_UX_COMPONENT_LIBRARY.md`, `patterns/STUDIO_UX_PATTERNS.md`, `STUDIO_UX_ACCESSIBILITY.md` | ✅ |
| Composição · Composition | `STUDIO_UX_DASHBOARD.md`, `STUDIO_UX_FORMS.md`, `STUDIO_UX_TABLES.md`, `STUDIO_UX_NAVIGATION.md` | ✅ |
| Produtos · Products | `desktop/STUDIO_UX_DESKTOP.md`, `mobile/STUDIO_UX_MOBILE.md` | ✅ |
| Qualidade · Quality | `STUDIO_UX_CERTIFICATION.md` | ✅ |
| Intake de desenvolvimento · Development intake | `prompt-framework/prompt-alinhamento.md` | ✅ |
| Evolução · Evolution | `STUDIO_UX_ROADMAP.md` (fases 1.5/1.6), `research/REFERENCES.md` | ✅ |
| **Plataforma (Épico 1) · Platform (Epic 1)** | `platform/STUDIO_UX_PLATFORM.md`, `platform/STUDIO_UX_ARCHITECTURE.md`, `platform/STUDIO_UX_RUNTIME.md`, `platform/STUDIO_UX_PACKAGES.md`, `platform/STUDIO_UX_ROADMAP_2035.md` | ✅ |
| **Governança da plataforma (Épico 1) · Platform governance (Epic 1)** | `governance/STUDIO_UX_CONSTITUTION.md`, `governance/STUDIO_UX_VERSIONING.md`, `governance/STUDIO_UX_ADR_GUIDE.md`, `governance/STUDIO_UX_RFC_GUIDE.md` | ✅ |
| **Ferramentas (Épico 2) · Tools (Epic 2)** | `tools/STUDIO_UX_CLI.md`, `tools/STUDIO_UX_DEVTOOLS.md`, `tools/STUDIO_UX_PLAYGROUND.md` | ✅ |
| **Qualidade (Épico 3) · Quality (Epic 3)** | `quality/STUDIO_UX_LINTER.md`, `quality/STUDIO_UX_COMPLIANCE.md`, `STUDIO_UX_CERTIFICATION.md` (tela+sistema/Enterprise) | ✅ |
| **Geração (Épico 4) · Generation (Epic 4)** | `generation/STUDIO_UX_PROJECT_GENERATOR.md`, `generation/STUDIO_UX_EXPORTERS.md` | ✅ |
| **Ecossistema de IA (Épico 5) · AI Ecosystem (Epic 5)** | `context/STUDIO_UX_AI_ECOSYSTEM.md` | ✅ |

---

## 🎯 O que vem agora · What comes next

**PT** — Continuar a Fase 3 com uma jornada real por vez: inventariar o sistema consumidor, adotar o adapter oficial sem coexistência com UI legada, cobrir lista → detalhe → criação/edição → confirmação → retorno e propagar o refinamento para Storybook, documentação, CHANGELOG/versão e sistemas. A fonte de operação é `docs/quality/REFINAMENTO-E-PROPAGACAO.md`.

**EN** — Continue Phase 3 one real journey at a time: inventory the consuming system, adopt the official adapter without coexistence with legacy UI, cover list → detail → create/edit → confirmation → return, and propagate the refinement to Storybook, documentation, CHANGELOG/version and systems. The operating source is `docs/quality/REFINAMENTO-E-PROPAGACAO.md`.

---

## 🧠 Lições e decisões travadas · Locked lessons and decisions

**PT / EN**

- **Bilíngue total é decisão do Robson** ("o sistema todo pode ser bilíngue"). PT-BR + EN lado a lado por seção; identificadores de código sempre em inglês. / Full bilingual is Robson's decision.
- **Dois produtos, não um responsivo.** Desktop e Mobile projetados do zero, separados. / Two products, not one responsive.
- **Referências são estudo, nunca cópia.** Flux, Zenith, shadcn, Linear, GitHub, Stripe, Vercel, Notion, Figma → princípios, não layout/código/identidade. / References are study, never copy.
- **Governança herdada do IA Studio:** SemVer + tags imutáveis, CHANGELOG como fonte da verdade, docs vivos sem lixo, "pensar antes de construir", Definição de Pronto, regra máxima de UX (língua do usuário). / Governance inherited from IA Studio.
- **Fase 1 = arquiteto de produto.** Sem código nesta fase. / Phase 1 = product architect. No code.

---

*Ao concluir qualquer frente, ATUALIZAR este arquivo. · When finishing any front, UPDATE this file.*
