# STUDIO_UX_VERSIONING.md — Versionamento · Versioning

> Documento normativo vivo. Responde a: **como o Studio UX é versionado, migrado, depreciado e suportado ao longo do tempo?**
> Living normative document. Answers: **how is Studio UX versioned, migrated, deprecated and supported over time?**
> Governança: `STUDIO_UX.md` §7 (que agora REFERENCIA este dono), `governance/STUDIO_UX_CONSTITUTION.md` (Art. 14).

```
Architecture Boundary Check — STUDIO_UX_VERSIONING
Resolve · Solves:            a estratégia completa de versionamento — SemVer, breaking changes, depreciação,
                             compatibilidade, LTS e suporte. O dono único do "como versionamos".
                             / the complete versioning strategy — SemVer, breaking changes, deprecation, compatibility,
                             LTS and support. The single owner of "how we version".
Não pertence a outro porque · Not elsewhere because:
                             STUDIO_UX.md §7 só esboçava SemVer; ROADMAP cuida de FASES, não de mecânica de versão;
                             HANDOFF guarda a convenção vigente. Faltava o dono da estratégia.
                             / STUDIO_UX.md §7 only sketched SemVer; ROADMAP handles PHASES; HANDOFF holds the current
                             convention. The missing piece is the strategy owner.
Complementa · Complements:   STUDIO_UX.md §7, ROADMAP, CHANGELOG, HANDOFF, CONSTITUTION (Art. 14), ADR_GUIDE, RFC_GUIDE.
Nunca substitui · Never replaces: ROADMAP (fases), CHANGELOG (histórico), HANDOFF (estado/convenção vigente).
Dono · Owner:                este doc, para o domínio "estratégia de versionamento".
                             / this doc, for the "versioning strategy" domain.
```

---

## Objetivo · Objective
**PT** — Ser a fonte única da estratégia de versão do Studio UX, para que consumidores (sistemas e IAs) saibam exatamente o que esperar de cada release e como migrar com segurança. O `STUDIO_UX.md` §7 passa a referenciar este documento como dono do detalhe.
**EN** — Be the single source of Studio UX's version strategy, so consumers (systems and AIs) know exactly what to expect from each release and how to migrate safely. `STUDIO_UX.md` §7 now references this document as the detail owner.

## Escopo · Scope
**PT** — Regras de SemVer, breaking changes, depreciação, compatibilidade, LTS e suporte. **Não** define as fases do produto (`ROADMAP`) nem guarda o histórico (`CHANGELOG`).
**EN** — SemVer rules, breaking changes, deprecation, compatibility, LTS and support. It does **not** define product phases (`ROADMAP`) or hold history (`CHANGELOG`).

---

## 1. SemVer · SemVer
**PT** — Versão `MAJOR.MINOR.PATCH`. **MAJOR** = quebra de contrato (token/componente removido ou renomeado, princípio revogado, artigo constitucional emendado) — exige guia de migração. **MINOR** = adição retrocompatível (novo token, componente, padrão, documento). **PATCH** = correção/esclarecimento sem mudar contrato. Toda mudança: entrada no `CHANGELOG` → commit → **tag anotada e imutável** `vX.Y.Z` (nunca reusada; número sempre confirmado com o Robson — `HANDOFF`).
**EN** — Version `MAJOR.MINOR.PATCH`. **MAJOR** = contract break (token/component removed or renamed, principle repealed, constitutional article amended) — requires a migration guide. **MINOR** = backward-compatible addition. **PATCH** = fix/clarification without changing the contract. Every change: `CHANGELOG` entry → commit → **annotated, immutable tag** `vX.Y.Z` (never reused; number always confirmed with Robson).

## 2. Convenção vigente · Current convention
**PT** — Decisão do Robson (estado vigente no `HANDOFF`): a Fundação foi congelada em `v0.3.0` (🧊 Foundation Frozen). **Daqui em diante varia-se apenas o dígito final na faixa `v0.3.0 … v0.3.99`** (próxima tag `v0.3.1`, etc.). A era `v0.2.x` (documentação) encerrou-se com o freeze; a `v0.2.0` permanece (tag imutável, nunca reusada). O salto para `v1.0.0` fica reservado ao **congelamento dos tokens** (Fase 2) — o primeiro contrato estável que um consumidor pode declarar.
**EN** — Robson's decision (current state in `HANDOFF`): the Foundation was frozen at `v0.3.0` (Foundation Frozen). **From now on only the final digit varies within `v0.3.0 … v0.3.99`** (next tag `v0.3.1`, etc.). The `v0.2.x` (documentation) era ended with the freeze; `v0.2.0` stays (immutable tag, never reused). The jump to `v1.0.0` is reserved for **freezing the tokens** (Phase 2) — the first stable contract a consumer can declare.

## 3. Breaking changes · Breaking changes
**PT** — Uma mudança é *breaking* quando um consumidor que seguia o contrato anterior pode parar de funcionar ou de estar conforme. Toda breaking change: (a) só sai em MAJOR; (b) vem com **guia de migração** (o que mudou, por que, como adaptar, exemplos antes/depois); (c) sempre que possível é precedida por um ciclo de **depreciação** (§4); (d) é registrada em ADR (`ADR_GUIDE`). Renomear/remover token ou componente, mudar a semântica de um papel, revogar princípio ou emendar a Constituição são breaking.
**EN** — A change is *breaking* when a consumer following the previous contract may stop working or stop being compliant. Every breaking change: (a) ships only in MAJOR; (b) comes with a **migration guide** (what changed, why, how to adapt, before/after examples); (c) whenever possible is preceded by a **deprecation** cycle (§4); (d) is recorded in an ADR. Renaming/removing a token or component, changing a role's semantics, repealing a principle or amending the Constitution are breaking.

## 4. Depreciação · Deprecation
**PT** — Nada some de repente. Um item a ser removido é primeiro marcado `DEPRECATED` com: a versão em que foi depreciado, o substituto e a versão-alvo de remoção. Ele continua funcionando durante o período de depreciação (no mínimo um ciclo MINOR), com aviso claro, antes de ser removido numa MAJOR. Princípios e artigos constitucionais nunca são removidos nem renumerados — só marcados `DEPRECATED`/`REVOGADO`.
**EN** — Nothing disappears suddenly. An item to be removed is first marked `DEPRECATED` with: the version it was deprecated in, the replacement and the target removal version. It keeps working during the deprecation window (at least one MINOR cycle), with a clear warning, before removal in a MAJOR. Principles and constitutional articles are never removed nor renumbered — only marked `DEPRECATED`/`REPEALED`.

## 5. Compatibilidade e declaração de dependência · Compatibility and dependency declaration
**PT** — Um sistema consumidor **declara** a versão que usa (ex.: "IA Studio → Studio UX Desktop `v1.x`"). Dentro de uma MAJOR, MINOR e PATCH são seguros de adotar. Entre MAJORs, adota-se deliberadamente com o guia de migração. O framework nunca é editado por dentro do consumidor (Art. 1/19 da `CONSTITUTION`).
**EN** — A consuming system **declares** the version it uses (e.g. "IA Studio → Studio UX Desktop `v1.x`"). Within a MAJOR, MINOR and PATCH are safe to adopt. Between MAJORs, adoption is deliberate, with the migration guide. The framework is never edited inside the consumer.

## 6. LTS e suporte · LTS and support
**PT** — A partir da `v1.0.0`, versões MAJOR podem ser designadas **LTS (Long-Term Support)**: recebem correções e avisos de segurança/conformidade por um período estendido, mesmo após a MAJOR seguinte sair, para dar aos consumidores uma janela de migração confortável. A política concreta de janelas LTS é decidida quando a `v1.0.0` chegar (fica como ponto de roadmap, não valor cravado nesta fase).
**EN** — From `v1.0.0` on, MAJOR versions may be designated **LTS (Long-Term Support)**: they receive fixes and security/compliance notices for an extended period, even after the next MAJOR ships, giving consumers a comfortable migration window. The concrete LTS-window policy is decided when `v1.0.0` arrives (a roadmap point, not a value fixed in this phase).

## Responsabilidades · Responsibilities
**PT** — Definir SemVer, breaking changes, depreciação, compatibilidade, LTS e suporte; ser o dono referenciado pelo `STUDIO_UX.md` §7.
**EN** — Define SemVer, breaking changes, deprecation, compatibility, LTS and support; be the owner referenced by `STUDIO_UX.md` §7.

## Não-responsabilidades · Non-responsibilities
**PT** — Não define fases (`ROADMAP`), não guarda histórico (`CHANGELOG`), não decide números específicos de cabeça (confirmar com o Robson — `HANDOFF`).
**EN** — Does not define phases (`ROADMAP`), hold history (`CHANGELOG`), or decide specific numbers from memory (confirm with Robson — `HANDOFF`).

## Integrações e dependências · Integrations and dependencies
**PT** — Referenciado por `STUDIO_UX.md` §7 e pela `CONSTITUTION` (Art. 14). Alimenta o `CHANGELOG` (formato de entrada) e a `CLI` (`studio upgrade`, `studio doctor`). Migrações relevantes viram ADR.
**EN** — Referenced by `STUDIO_UX.md` §7 and the `CONSTITUTION` (Art. 14). Feeds the `CHANGELOG` (entry format) and the `CLI` (`studio upgrade`, `studio doctor`). Relevant migrations become ADRs.

## Fluxos · Flows
**PT** — Fluxo de release (CHANGELOG → commit → tag); fluxo de depreciação → remoção; fluxo de adoção MAJOR (migração).
**EN** — Release flow (CHANGELOG → commit → tag); deprecation → removal flow; MAJOR adoption (migration) flow.

## Boas práticas · Best practices
**PT** — Prefira MINOR aditivo a MAJOR sempre que possível. Deprecie antes de remover. Escreva o guia de migração junto com a breaking change, não depois. Confirme o número da tag com o Robson.
**EN** — Prefer additive MINOR over MAJOR whenever possible. Deprecate before removing. Write the migration guide alongside the breaking change, not after. Confirm the tag number with Robson.

## Anti-padrões · Anti-patterns
**PT / EN**
- Reusar uma tag. / Reusing a tag.
- Remover sem depreciar. / Removing without deprecating.
- Breaking change sem guia de migração. / Breaking change with no migration guide.
- Cravar número de versão de cabeça. / Stating a version number from memory.
- Renumerar princípio ou artigo. / Renumbering a principle or article.

## Roadmap
**PT** — Era de documentação em `v0.2.x`; `v1.0.0` no congelamento dos tokens (Fase 2); política LTS concreta definida a partir da `v1.0.0`.
**EN** — Documentation era in `v0.2.x`; `v1.0.0` at token freeze (Phase 2); concrete LTS policy defined from `v1.0.0`.

## Referências internas · Internal references
`STUDIO_UX.md` §7 · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 14) · `STUDIO_UX_ROADMAP.md` · `CHANGELOG.md` · `context/STUDIO_UX_HANDOFF.md` · `governance/STUDIO_UX_ADR_GUIDE.md`

---

*Documento vivo. Dono da estratégia de versão; fases são do ROADMAP, histórico do CHANGELOG. · Living document. Owner of version strategy; phases belong to ROADMAP, history to CHANGELOG.*
