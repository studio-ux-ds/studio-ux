# STUDIO_UX_HANDOFF.md — Estado & Re-ancoragem · State & Re-anchoring

> **PT** — Este arquivo existe porque a memória de um assistente é compactada em sessões longas e ele perde o fio (principalmente rastreando versão). **A fonte da verdade é o git + `CHANGELOG.md`, NUNCA a memória.** Toda sessão nova começa lendo: (1) `git log --oneline -3` e `git tag`, (2) este arquivo, (3) `STUDIO_UX.md`, (4) o doc da frente atual.
>
> **EN** — This file exists because an assistant's memory is compacted in long sessions and it loses the thread (especially tracking versions). **The source of truth is git + `CHANGELOG.md`, NEVER memory.** Every new session starts by reading: (1) `git log --oneline -3` and `git tag`, (2) this file, (3) `STUDIO_UX.md`, (4) the current front's doc.

> Última atualização · Last updated: 2026-07-15 (Fase 1.5 concluída · Phase 1.5 done).

---

## 🔴 Regra de ouro · Golden rule

**PT** — Nunca cravar número de versão, nome de arquivo/token/componente ou "o que já foi implementado" de cabeça. Rodar `git tag | sort -V | tail` e `git log --oneline -3` ANTES de falar de versão. Tag é imutável — nunca reusar. Confirmar o número da próxima versão com o Robson antes de taggear.

**EN** — Never state a version number, a file/token/component name, or "what's already implemented" from memory. Run `git tag | sort -V | tail` and `git log --oneline -3` BEFORE talking about versions. Tags are immutable — never reuse. Confirm the next version number with Robson before tagging.

> **PT — Convenção de versão vigente (decisão do Robson, 15/07/2026):** a `v0.2.0` foi publicada com um número que ficou errado, mas permanece (tag imutável). **Daqui em diante, só se varia o dígito final dentro da faixa `v0.2.1` … `v0.2.99`** — a próxima tag é `v0.2.1`, depois `v0.2.2`, etc. Toda a era de documentação (Fases 1.5–1.6) mora na linha `v0.2.x`. A mudança para `v1.0.0` continua reservada ao congelamento dos tokens (Fase 2).
> **EN — Current version convention (Robson's decision, 2026-07-15):** `v0.2.0` shipped with a number that turned out wrong, but it stays (immutable tag). **From now on, only the final digit varies, within `v0.2.1` … `v0.2.99`** — the next tag is `v0.2.1`, then `v0.2.2`, etc. The whole documentation era (Phases 1.5–1.6) lives in the `v0.2.x` line. The move to `v1.0.0` remains reserved for freezing the tokens (Phase 2).

---

## ✅ Estado vigente · Current state

- **Versão / Version:** `v0.2.0` (Fase 1.5 — linguagem visual / visual language).
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

---

## 🎯 O que vem agora · What comes next

**PT** — Fases 1 e 1.5 concluídas. **Camada de plataforma em andamento por épicos** (decisão do Robson): Épico 1 (Plataforma & Governança) **concluído** — 9 documentos em `platform/` e `governance/`. Próximos épicos: **2 Ferramentas** (CLI, DevTools, Playground), **3 Qualidade** (Linter, Compliance, Certification — este último expandido para tela+sistema), **4 Geração** (Project Generator, Exporters), **5 Ecossistema de IA** (AI Ecosystem). Cada épico é revisado/aprovado antes do próximo. Em paralelo, seguem pendentes a **Fase 1.6 (UI Exploration)** e a **Fase 2 (tokens)** do design system — `research/ui-exploration/` já tem guia e aguarda o "vai".

**EN** — Phases 1 and 1.5 complete. **Platform layer in progress, epic by epic** (Robson's decision): Epic 1 (Platform & Governance) **done** — 9 documents in `platform/` and `governance/`. Next epics: **2 Tools**, **3 Quality** (Certification expanded to screen+system), **4 Generation**, **5 AI Ecosystem**. Each epic is reviewed/approved before the next. In parallel, **Phase 1.6 (UI Exploration)** and **Phase 2 (tokens)** of the design system remain pending — `research/ui-exploration/` has a guide and awaits the go-ahead.

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
