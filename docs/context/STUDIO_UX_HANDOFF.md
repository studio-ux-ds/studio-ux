# STUDIO_UX_HANDOFF.md — Estado & Re-ancoragem · State & Re-anchoring

> **PT** — Este arquivo existe porque a memória de um assistente é compactada em sessões longas e ele perde o fio (principalmente rastreando versão). **A fonte da verdade é o git + `CHANGELOG.md`, NUNCA a memória.** Toda sessão nova começa lendo: (1) `git log --oneline -3` e `git tag`, (2) este arquivo, (3) `STUDIO_UX.md`, (4) o doc da frente atual.
>
> **EN** — This file exists because an assistant's memory is compacted in long sessions and it loses the thread (especially tracking versions). **The source of truth is git + `CHANGELOG.md`, NEVER memory.** Every new session starts by reading: (1) `git log --oneline -3` and `git tag`, (2) this file, (3) `STUDIO_UX.md`, (4) the current front's doc.

> Última atualização · Last updated: 2026-07-15 (Fase 1.5 concluída · Phase 1.5 done).

---

## 🔴 Regra de ouro · Golden rule

**PT** — Nunca cravar número de versão, nome de arquivo/token/componente ou "o que já foi implementado" de cabeça. Rodar `git tag | sort -V | tail` e `git log --oneline -3` ANTES de falar de versão. Tag é imutável — nunca reusar. Confirmar o número da próxima versão com o Robson antes de taggear.

**EN** — Never state a version number, a file/token/component name, or "what's already implemented" from memory. Run `git tag | sort -V | tail` and `git log --oneline -3` BEFORE talking about versions. Tags are immutable — never reuse. Confirm the next version number with Robson before tagging.

> **PT — Convenção de versão vigente:** o `v1.0.0` foi alcançado com o **congelamento dos tokens** (fim da Fase 2). A era pré-1.0 (`v0.1.x`→`v0.3.x`) encerrou-se. **Daqui em diante vale o SemVer normal** (`governance/STUDIO_UX_VERSIONING.md`): PATCH para correção, MINOR para adição retrocompatível (ex.: componentes novos da Fase 3 → `v1.1.0`, `v1.2.0`…), MAJOR só para quebra com guia de migração. Tags imutáveis; confirmar o número com o Robson.
> **EN — Current version convention:** `v1.0.0` was reached with the **token freeze** (end of Phase 2). The pre-1.0 era ended. **Normal SemVer applies from here** (`governance/STUDIO_UX_VERSIONING.md`): PATCH for fixes, MINOR for backward-compatible additions (e.g. new Phase 3 components → `v1.1.0`, `v1.2.0`…), MAJOR only for a break with a migration guide. Immutable tags; confirm the number with Robson.

---

## ✅ Estado vigente · Current state

- **🧊 FOUNDATION FROZEN em `v0.3.0` (2026-07-15).** A Fundação (arquitetura, princípios, linguagem visual, catálogo-spec, plataforma) está **congelada**. Daqui em diante: **Implementação (Fase 2 — tokens)**. Mudança estrutural só por RFC + ADR; componente novo só por necessidade comprovada em produto. Decisão em `docs/audits/FOUNDATION_FREEZE_DECISION.md`. / Foundation frozen at `v0.3.0`; implementation only from here (structural change via RFC+ADR).
- **Versão / Version:** `v1.0.0` — 🎯 **TOKENS FROZEN**. Fase 2 concluída: as 6 camadas de tokens (cor, tipografia, espaço, raio, elevação, motion) foram materializadas, aprovadas e congeladas — primeiro contrato estável. Valores em `tokens/COLOR_SYSTEM §9`, `TYPOGRAPHY §9`, `SPACING`, `DESIGN_TOKENS`. Próximo: **Fase 3 — componentes (Desktop primeiro)**. / Tokens frozen at v1.0.0; next is Phase 3 (components, Desktop first).
- **Decisões da Fase 1.6 (travadas) / Locked Phase 1.6 decisions:** (1) **direção sóbria** confirmada — sem gradientes, o DNA congelado se mantém; a variação expressiva foi vista e recusada. (2) **Cor de ação configurável** — paleta de 7 acentos sóbrios (Índigo padrão, Azul, Teal, Verde, Violeta, Cobre, Grafite), um por tema, eixo de marca do `THEMES`. Linguagem validada em ~14 cenários (dashboard, analytics, DataTable, form, wizard, detalhe+timeline, login, mobile, estados, confirm+toast, settings, command palette, filtro mobile, menu de linha).
- **Fase / Phase:** Fases 1 e 1.5 concluídas em conteúdo — só documentação. Nenhum código, token final, componente ou tela; **nenhum valor estético final** decidido. / Phases 1 and 1.5 complete in content — documentation only. No code, final tokens, components or screens; **no final aesthetic value** decided.
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
| Evolução · Evolution | `STUDIO_UX_ROADMAP.md` (fases 1.5/1.6), `research/REFERENCES.md` | ✅ |
| **Plataforma (Épico 1) · Platform (Epic 1)** | `platform/STUDIO_UX_PLATFORM.md`, `platform/STUDIO_UX_ARCHITECTURE.md`, `platform/STUDIO_UX_RUNTIME.md`, `platform/STUDIO_UX_PACKAGES.md`, `platform/STUDIO_UX_ROADMAP_2035.md` | ✅ |
| **Governança da plataforma (Épico 1) · Platform governance (Epic 1)** | `governance/STUDIO_UX_CONSTITUTION.md`, `governance/STUDIO_UX_VERSIONING.md`, `governance/STUDIO_UX_ADR_GUIDE.md`, `governance/STUDIO_UX_RFC_GUIDE.md` | ✅ |
| **Ferramentas (Épico 2) · Tools (Epic 2)** | `tools/STUDIO_UX_CLI.md`, `tools/STUDIO_UX_DEVTOOLS.md`, `tools/STUDIO_UX_PLAYGROUND.md` | ✅ |
| **Qualidade (Épico 3) · Quality (Epic 3)** | `quality/STUDIO_UX_LINTER.md`, `quality/STUDIO_UX_COMPLIANCE.md`, `STUDIO_UX_CERTIFICATION.md` (tela+sistema/Enterprise) | ✅ |
| **Geração (Épico 4) · Generation (Epic 4)** | `generation/STUDIO_UX_PROJECT_GENERATOR.md`, `generation/STUDIO_UX_EXPORTERS.md` | ✅ |
| **Ecossistema de IA (Épico 5) · AI Ecosystem (Epic 5)** | `context/STUDIO_UX_AI_ECOSYSTEM.md` | ✅ |

---

## 🎯 O que vem agora · What comes next

**PT** — Fases 1, 1.5 e **1.6 concluídas**; camada de plataforma documental completa. **Estamos na Fase 2 — Materialização dos Design Tokens.** Objetivo: transformar os valores provisórios validados na 1.6 em **tokens nomeados e congelados**, camada por camada com aprovação humana: **cor → tipografia → espaço → raio → elevação → motion**, mais os temas claro/escuro/marca. Cada camada é proposta, aprovada e gravada no dono (`tokens/*`, `THEMES`) — são VALORES, que a arquitetura congelada sempre reservou para cá (não é mudança estrutural, não precisa de RFC/ADR). O congelamento de todos os tokens é o marco **`v1.0.0`**. Enquanto isso, releases na linha `v0.3.x`.

**EN** — Phases 1, 1.5 and **1.6 complete**; platform documentation layer complete. **We are in Phase 2 — Materializing the Design Tokens.** Goal: turn the provisional values validated in 1.6 into **named, frozen tokens**, layer by layer with human approval: **color → typography → spacing → radius → elevation → motion**, plus light/dark/brand themes. Each layer is proposed, approved and written to its owner (`tokens/*`, `THEMES`) — these are VALUES, which the frozen architecture always reserved for here (not a structural change, no RFC/ADR needed). Freezing all tokens is the **`v1.0.0`** milestone. Meanwhile, releases in the `v0.3.x` line.

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
