# STUDIO_UX_VERSIONING.md — Versionamento · Versioning

> Documento normativo vivo. Responde a: **como o Studio UX é versionado, migrado, depreciado e suportado ao longo do tempo?**
> Living normative document. Answers: **how is Studio UX versioned, migrated, deprecated and supported over time?**
> Governança: `STUDIO_UX.md` §7 (que agora REFERENCIA este dono), `governance/STUDIO_UX_CONSTITUTION.md` (Art. 14).

```
Architecture Boundary Check — STUDIO_UX_VERSIONING
Resolve · Solves:            a estratégia completa de versionamento — numeração por TREM DE RELEASE (patch
                             sequencial), classificação SemVer (só rótulo de natureza), breaking changes,
                             depreciação, compatibilidade, LTS e suporte. O dono único do "como versionamos".
                             / the complete versioning strategy — RELEASE-TRAIN numbering (sequential patch),
                             SemVer only as a change-nature label, breaking changes, deprecation, compatibility,
                             LTS and support. The single owner of "how we version".
Não pertence a outro porque · Not elsewhere because:
                             STUDIO_UX.md §7 só esboçava a mecânica; ROADMAP cuida de FASES, não de mecânica de versão;
                             HANDOFF guarda a convenção vigente. Faltava o dono da estratégia.
                             / STUDIO_UX.md §7 only sketched the mechanic; ROADMAP handles PHASES; HANDOFF holds the current
                             convention. The missing piece is the strategy owner.
Complementa · Complements:   STUDIO_UX.md §7, ROADMAP, CHANGELOG, HANDOFF, CONSTITUTION (Art. 14), ADR_GUIDE, RFC_GUIDE.
Nunca substitui · Never replaces: ROADMAP (fases), CHANGELOG (histórico), HANDOFF (estado/convenção vigente).
Dono · Owner:                este doc, para o domínio "estratégia de versionamento".
                             / this doc, for the "versioning strategy" domain.
```

---

## Objetivo · Objective
**PT** — Ser a fonte única da estratégia de versão do Studio UX, para que consumidores (sistemas e IAs) saibam exatamente o que esperar de cada release e como migrar com segurança. A **regra de numeração é o trem de release (patch sequencial, §1)**; SemVer entra só como rótulo que classifica a natureza da mudança, nunca para decidir o número. O `STUDIO_UX.md` §7 passa a referenciar este documento como dono do detalhe.
**EN** — Be the single source of Studio UX's version strategy, so consumers (systems and AIs) know exactly what to expect from each release and how to migrate safely. The **numbering rule is the release train (sequential patch, §1)**; SemVer is only a label for the nature of a change, never how the number is decided. `STUDIO_UX.md` §7 now references this document as the detail owner.

## Escopo · Scope
**PT** — Numeração por trem de release, uso do SemVer como rótulo, breaking changes, depreciação, compatibilidade, LTS e suporte. **Não** define as fases do produto (`ROADMAP`) nem guarda o histórico (`CHANGELOG`).
**EN** — Release-train numbering, SemVer as a label, breaking changes, deprecation, compatibility, LTS and support. It does **not** define product phases (`ROADMAP`) or hold history (`CHANGELOG`).

---

## 1. Numeração — TREM DE RELEASE (patch sequencial) · Numbering — release train (sequential patch)
**PT — ESTA É A REGRA.** A versão é `MAJOR.MINOR.PATCH`, mas **o número da próxima tag é sempre a tag atual +1 no último dígito** (`…v1.1.15 → v1.1.16 → v1.1.17 … → v1.1.99`), independente de a mudança ser feature, correção ou doc. Sempre em **lockstep** (todos os pacotes no mesmo número, `scripts/set-version.mjs X.Y.Z`).

**`MAJOR`/`MINOR`/`PATCH` só CLASSIFICAM a natureza da mudança — NUNCA decidem o número da tag.** Deduzir "é feature nova, logo MINOR → 1.2.0" é **suposição proibida** (Art. 20/21) e o erro clássico a evitar: trocar o 2º dígito (linha MINOR) ou o 1º (MAJOR) **não é automático nem se infere de SemVer** — um salto de linha acontece **só por decisão explícita do Robson**. A IA nunca promove a linha sozinha.

Rótulos (para classificar no CHANGELOG, não para numerar): **MAJOR** = quebra de contrato (token/componente removido ou renomeado, princípio revogado, artigo emendado) — exige guia de migração; **MINOR** = adição retrocompatível (novo token/componente/padrão/doc); **PATCH** = correção/esclarecimento sem mudar contrato.

Toda mudança: entrada no `CHANGELOG` → commit → **tag anotada e imutável** `vX.Y.Z` (nunca reusada). O número é **sempre a última tag real +1**, conferido em `git tag --sort=-v:refname` — nunca de cabeça, nunca de memória (re-ancorar assim, sobretudo pós-compactação). Se a tag já subiu ao remote, segue-se para frente — nunca se volta a um dígito menor (quebraria a ordem imutável).

**EN — THIS IS THE RULE.** The version is `MAJOR.MINOR.PATCH`, but **the next tag's number is always the current tag +1 on the last digit** (`…v1.1.15 → v1.1.16 → …→ v1.1.99`), whether the change is a feature, a fix or docs. Always in **lockstep** (`scripts/set-version.mjs X.Y.Z`). **`MAJOR`/`MINOR`/`PATCH` only CLASSIFY the nature of a change — they never decide the number.** Inferring "it's a feature, so MINOR → 1.2.0" is a **forbidden assumption**: bumping the 2nd digit (MINOR line) or the 1st (MAJOR) is not automatic and not inferred from SemVer — a line jump happens **only by Robson's explicit decision**; the AI never promotes the line by itself. Labels (to classify in the CHANGELOG, not to number): MAJOR = contract break (needs a migration guide); MINOR = backward-compatible addition; PATCH = fix/clarification. Every change: `CHANGELOG` entry → commit → annotated, immutable tag. The number is always the real latest tag +1, checked with `git tag --sort=-v:refname`, never from memory.

## 2. Linhas percorridas · Lines travelled
**PT** — As linhas já percorridas (imutáveis): `v0.2.x` (documentação) → `v0.3.0…v0.3.99` (Fundação congelada) → `v1.0.0` (tokens congelados) → **`v1.1.x` (atual)**. Cada linha andou pelo último dígito até o Robson decidir o próximo salto. A linha ativa hoje é a `v1.1.x` — a próxima tag é a última `v1.1.N` +1.
**EN** — Lines already travelled (immutable): `v0.2.x` (docs) → `v0.3.0…v0.3.99` (frozen Foundation) → `v1.0.0` (frozen tokens) → **`v1.1.x` (current)**. Each line advanced by its last digit until Robson decided the next jump. The active line today is `v1.1.x` — the next tag is the latest `v1.1.N` +1.

## 3. Breaking changes · Breaking changes
**PT** — Uma mudança é *breaking* quando um consumidor que seguia o contrato anterior pode parar de funcionar ou de estar conforme. Toda breaking change: (a) é classificada como MAJOR e só sai quando o Robson decide o salto de linha; (b) vem com **guia de migração** (o que mudou, por que, como adaptar, exemplos antes/depois); (c) sempre que possível é precedida por um ciclo de **depreciação** (§4); (d) é registrada em ADR (`ADR_GUIDE`). Renomear/remover token ou componente, mudar a semântica de um papel, revogar princípio ou emendar a Constituição são breaking.
**EN** — A change is *breaking* when a consumer following the previous contract may stop working or stop being compliant. Every breaking change: (a) is classified as MAJOR and ships only when Robson decides the line jump; (b) comes with a **migration guide**; (c) whenever possible is preceded by a **deprecation** cycle (§4); (d) is recorded in an ADR. Renaming/removing a token or component, changing a role's semantics, repealing a principle or amending the Constitution are breaking.

## 4. Depreciação · Deprecation
**PT** — Nada some de repente. Um item a ser removido é primeiro marcado `DEPRECATED` com: a versão em que foi depreciado, o substituto e a versão-alvo de remoção. Ele continua funcionando durante o período de depreciação, com aviso claro, antes de ser removido numa MAJOR. Princípios e artigos constitucionais nunca são removidos nem renumerados — só marcados `DEPRECATED`/`REVOGADO`.
**EN** — Nothing disappears suddenly. An item to be removed is first marked `DEPRECATED` with: the version it was deprecated in, the replacement and the target removal version. It keeps working during the deprecation window, with a clear warning, before removal in a MAJOR. Principles and constitutional articles are never removed nor renumbered — only marked `DEPRECATED`/`REPEALED`.

## 5. Compatibilidade e declaração de dependência · Compatibility and dependency declaration
**PT** — Um sistema consumidor **declara** a versão que usa (ex.: "IA Studio → Studio UX Desktop `v1.x`"). Dentro de uma MAJOR, MINOR e PATCH são seguros de adotar. Entre MAJORs, adota-se deliberadamente com o guia de migração. O framework nunca é editado por dentro do consumidor (Art. 1/19 da `CONSTITUTION`).
**EN** — A consuming system **declares** the version it uses (e.g. "IA Studio → Studio UX Desktop `v1.x`"). Within a MAJOR, MINOR and PATCH are safe to adopt. Between MAJORs, adoption is deliberate, with the migration guide. The framework is never edited inside the consumer.

## 6. LTS e suporte · LTS and support
**PT** — A partir da `v1.0.0`, versões MAJOR podem ser designadas **LTS (Long-Term Support)**: recebem correções e avisos de segurança/conformidade por um período estendido, mesmo após a MAJOR seguinte sair, para dar aos consumidores uma janela de migração confortável. A política concreta de janelas LTS é decidida quando a `v2.0.0` chegar (fica como ponto de roadmap, não valor cravado nesta fase).
**EN** — From `v1.0.0` on, MAJOR versions may be designated **LTS (Long-Term Support)**: they receive fixes and security/compliance notices for an extended period, even after the next MAJOR ships, giving consumers a comfortable migration window. The concrete LTS-window policy is decided when `v2.0.0` arrives (a roadmap point, not a value fixed in this phase).

## Responsabilidades · Responsibilities
**PT** — Definir a numeração por trem de release, o uso do SemVer como rótulo, breaking changes, depreciação, compatibilidade, LTS e suporte; ser o dono referenciado pelo `STUDIO_UX.md` §7.
**EN** — Define release-train numbering, SemVer as a label, breaking changes, deprecation, compatibility, LTS and support; be the owner referenced by `STUDIO_UX.md` §7.

## Não-responsabilidades · Non-responsibilities
**PT** — Não define fases (`ROADMAP`), não guarda histórico (`CHANGELOG`), não decide números específicos de cabeça (confirmar com `git tag` / o Robson — `HANDOFF`).
**EN** — Does not define phases (`ROADMAP`), hold history (`CHANGELOG`), or decide specific numbers from memory (confirm with `git tag` / Robson — `HANDOFF`).

## Integrações e dependências · Integrations and dependencies
**PT** — Referenciado por `STUDIO_UX.md` §7 e pela `CONSTITUTION` (Art. 14). Alimenta o `CHANGELOG` (formato de entrada) e a `CLI` (`studio upgrade`, `studio doctor`). Migrações relevantes viram ADR.
**EN** — Referenced by `STUDIO_UX.md` §7 and the `CONSTITUTION` (Art. 14). Feeds the `CHANGELOG` (entry format) and the `CLI` (`studio upgrade`, `studio doctor`). Relevant migrations become ADRs.

## Fluxos · Flows
**PT** — Fluxo de release (CHANGELOG → commit → tag = última +1); fluxo de depreciação → remoção; fluxo de adoção MAJOR (migração).
**EN** — Release flow (CHANGELOG → commit → tag = latest +1); deprecation → removal flow; MAJOR adoption (migration) flow.

## Boas práticas · Best practices
**PT** — A próxima tag é sempre a última +1 no último dígito (confira em `git tag --sort=-v:refname`). Prefira mudança aditiva/retrocompatível a breaking sempre que possível — mas isso classifica a natureza, não muda a numeração. Deprecie antes de remover. Escreva o guia de migração junto com a breaking change. Confirme salto de linha com o Robson; nunca o deduza.
**EN** — The next tag is always the latest +1 on the last digit (check `git tag --sort=-v:refname`). Prefer additive/backward-compatible changes over breaking whenever possible — but that classifies the nature, it does not change the numbering. Deprecate before removing. Write the migration guide alongside the breaking change. Confirm a line jump with Robson; never infer it.

## Anti-padrões · Anti-patterns
**PT / EN**
- Deduzir salto de linha (MINOR/MAJOR) por SemVer — "é feature, logo 1.2.0". / Inferring a line jump from SemVer — "it's a feature, so 1.2.0".
- Cravar número de versão de cabeça em vez de `última tag +1`. / Stating a version number from memory instead of `latest tag +1`.
- Reusar uma tag ou voltar a um dígito menor. / Reusing a tag or dropping to a lower digit.
- Remover sem depreciar. / Removing without deprecating.
- Breaking change sem guia de migração. / Breaking change with no migration guide.
- Renumerar princípio ou artigo. / Renumbering a principle or article.

## Roadmap
**PT** — Era de documentação em `v0.2.x`; `v1.0.0` no congelamento dos tokens; linha ativa `v1.1.x`; política LTS concreta definida quando o Robson decidir o salto para `v2.0.0`.
**EN** — Documentation era in `v0.2.x`; `v1.0.0` at token freeze; active line `v1.1.x`; concrete LTS policy defined when Robson decides the jump to `v2.0.0`.

## Referências internas · Internal references
`STUDIO_UX.md` §7 · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 14) · `STUDIO_UX_ROADMAP.md` · `CHANGELOG.md` · `context/STUDIO_UX_HANDOFF.md` · `governance/STUDIO_UX_ADR_GUIDE.md`

---

*Documento vivo. Dono da estratégia de versão: numeração por trem de release (patch sequencial); SemVer só classifica a natureza. Fases são do ROADMAP, histórico do CHANGELOG. · Living document. Owner of version strategy: release-train numbering (sequential patch); SemVer only classifies nature. Phases belong to ROADMAP, history to CHANGELOG.*
