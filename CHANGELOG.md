# Changelog — Studio UX

> **PT** — Histórico do produto por versão. Esta é a **fonte da verdade de versão** (com as tags git). A documentação em `docs/` descreve o estado ATUAL; o histórico do que mudou mora aqui. Formato baseado em [Keep a Changelog](https://keepachangelog.com); versionamento [SemVer](https://semver.org).
>
> **EN** — Product history by version. This is the **version source of truth** (together with git tags). The docs under `docs/` describe the CURRENT state; the history of what changed lives here. Format based on Keep a Changelog; SemVer versioning.

---

## [Unreleased]

Nada pendente. / Nothing pending.

---

## [0.1.0] — 2026-07-15

### Adicionado · Added

**PT — Fundação documental completa (Fase 1).** Nasce o produto Studio UX como framework independente, versionado e governado. Somente documentação; nenhum componente, token final ou tela implementados.

**EN — Complete documentation foundation (Phase 1).** The Studio UX product is born as an independent, versioned, governed framework. Documentation only; no components, final tokens or screens implemented.

- **Governança / Governance:** `STUDIO_UX.md` (regra máxima), `README.md`, este `CHANGELOG.md`. Política bilíngue oficial (PT-BR + EN lado a lado por seção). SemVer + tags imutáveis + ADRs. Estrutura de pastas do produto criada.
- **Núcleo conceitual / Conceptual core:** `STUDIO_UX_VISION.md`, `STUDIO_UX_PHILOSOPHY.md`, `STUDIO_UX_PRINCIPLES.md` (princípios numerados P1…Pn), `context/STUDIO_UX_AI_CONTEXT.md`, `context/STUDIO_UX_HANDOFF.md`.
- **Fundação de design / Design foundation:** `tokens/STUDIO_UX_DESIGN_TOKENS.md` (arquitetura de tokens em 3 camadas), `tokens/STUDIO_UX_COLOR_SYSTEM.md`, `tokens/STUDIO_UX_TYPOGRAPHY.md`, `tokens/STUDIO_UX_SPACING.md`, `STUDIO_UX_THEMES.md`, `STUDIO_UX_ICONOGRAPHY.md`, `STUDIO_UX_ANIMATIONS.md`. Arquitetura definida; valores/estéticas finais deliberadamente adiados.
- **Sistema estrutural / Structural system:** `layouts/STUDIO_UX_LAYOUT_SYSTEM.md`, `components/STUDIO_UX_COMPONENT_LIBRARY.md` (catálogo oficial, sem código), `patterns/STUDIO_UX_PATTERNS.md`, `STUDIO_UX_ACCESSIBILITY.md`.
- **Produtos / Products:** `desktop/STUDIO_UX_DESKTOP.md` e `mobile/STUDIO_UX_MOBILE.md` — projetados como produtos independentes (não responsivo de um só).
- **Evolução / Evolution:** `STUDIO_UX_ROADMAP.md`, `research/REFERENCES.md`.

### Notas · Notes

- **PT** — Nesta fase o papel é de **arquiteto de produto**: nada de código, componentes ou telas. A implementação começa na Fase 2 (ver ROADMAP).
- **EN** — In this phase the role is **product architect**: no code, components or screens. Implementation starts in Phase 2 (see ROADMAP).

---

<!--
Modelo de entrada / Entry template:

## [X.Y.Z] — AAAA-MM-DD
### Adicionado · Added
### Alterado · Changed
### Descontinuado · Deprecated
### Removido · Removed
### Corrigido · Fixed
### Migração · Migration (obrigatório em MAJOR / required on MAJOR)
-->
