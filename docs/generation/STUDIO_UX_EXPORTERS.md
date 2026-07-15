# STUDIO_UX_EXPORTERS.md — Exportadores · Exporters

> Documento normativo vivo. Responde a: **como os tokens e artefatos da Specification saem para uma tecnologia-alvo, sem que o Studio UX passe a depender dela?**
> Living normative document. Answers: **how do the Specification's tokens and artifacts get exported to a target technology, without Studio UX coming to depend on it?**
> Governança: `STUDIO_UX.md` (SSOT §11, tech-agnóstico §13), `governance/STUDIO_UX_CONSTITUTION.md` (Art. 3, 5, 13, 14), `platform/STUDIO_UX_RUNTIME.md`.

```
Architecture Boundary Check — STUDIO_UX_EXPORTERS
Resolve · Solves:            a SAÍDA da Specification para tecnologias-alvo — a arquitetura dos exportadores
                             que traduzem os tokens/artefatos canônicos em formatos que uma tecnologia consome,
                             mantendo a fonte única e a fidelidade.
                             / the OUTPUT of the Specification to target technologies — the architecture of the
                             exporters that translate the canonical tokens/artifacts into formats a technology
                             consumes, preserving the single source and fidelity.
Não pertence a outro porque · Not elsewhere because:
                             DESIGN_TOKENS é o dono da ARQUITETURA e dos VALORES dos tokens (a fonte); RUNTIME
                             define que o Runtime é a materialização descartável; PACKAGES diz que o export parte
                             de packages/tokens. Faltava o dono do MECANISMO de exportação e da regra de fidelidade.
                             / DESIGN_TOKENS owns the token ARCHITECTURE and VALUES (the source); RUNTIME defines
                             the Runtime as the disposable materialization; PACKAGES says export starts from
                             packages/tokens. The missing owner is the export MECHANISM and the fidelity rule.
Complementa · Complements:   DESIGN_TOKENS, RUNTIME, PACKAGES, THEMES, VERSIONING, PROJECT_GENERATOR.
Nunca substitui · Never replaces: tokens/DESIGN_TOKENS (arquitetura + valores dos tokens — a FONTE),
                             RUNTIME (camadas de execução), VERSIONING (mecânica de versão), nem THEMES.
Dono · Owner:                este doc, para o domínio "exportadores".
                             / this doc, for the "exporters" domain.
```

---

## Objetivo · Objective
**PT** — Planejar a arquitetura dos exportadores do Studio UX: o mecanismo que leva os tokens e artefatos da **Specification** (a fonte única, Art. 5) para o formato que cada tecnologia-alvo consome — sem, nunca, inverter a direção da verdade. Um exportador é uma *tradução de mão única*: da fonte canônica para o alvo. O alvo é um **destino plugável e descartável** (Art. 13, §13); a identidade mora na Specification, não no artefato exportado. Este documento fixa a arquitetura, a garantia de fidelidade e o versionamento dos exports — sem escrever uma linha de implementação (fase documental).
**EN** — Plan the architecture of the Studio UX exporters: the mechanism that carries the **Specification's** tokens and artifacts (the single source, Art. 5) into the format each target technology consumes — without ever reversing the direction of truth. An exporter is a *one-way translation*: from the canonical source to the target. The target is a **pluggable, disposable destination** (Art. 13, §13); identity lives in the Specification, not in the exported artifact. This document fixes the architecture, the fidelity guarantee and export versioning — without writing a line of implementation (documentation phase).

## Escopo · Scope
**PT** — A arquitetura de um exportador (fonte → transformação → artefato), a lista de alvos, a regra de fidelidade e o versionamento dos exports. **Não** define os valores dos tokens (é `tokens/DESIGN_TOKENS`, `COLOR_SYSTEM`, `TYPOGRAPHY`, `SPACING`), nem as camadas de execução (`RUNTIME`), nem a mecânica de SemVer (`VERSIONING`). Aqui se responde apenas *como um valor canônico vira um artefato de alvo, permanecendo fiel à fonte*.
**EN** — The architecture of an exporter (source → transform → artifact), the target list, the fidelity rule and export versioning. It does **not** define token values (`tokens/DESIGN_TOKENS`, `COLOR_SYSTEM`, `TYPOGRAPHY`, `SPACING`), the execution layers (`RUNTIME`) or the SemVer mechanics (`VERSIONING`). It answers only *how a canonical value becomes a target artifact while staying faithful to the source*.

---

## 1. A arquitetura de um exportador · The architecture of an exporter
**PT** — Todo exportador tem a mesma anatomia de três estágios, sempre na mesma direção:

1. **Fonte canônica · canonical source.** O ponto de partida é sempre a Specification, materializada em `packages/tokens` (`PACKAGES`). O token é um contrato semântico (`color.surface.raised`, `space.4`), não um valor cru. Esta é a única fonte da verdade (Art. 5); o exportador **lê**, jamais escreve nela.
2. **Transformação · transform.** Uma função determinística que traduz o contrato semântico para a forma que o alvo entende — renomeando, aninhando ou formatando conforme a convenção da tecnologia, **sem alterar o significado**. Mesmo insumo produz o mesmo artefato (idempotência). A transformação não decide valores; ela apenas os *veste* na roupa do alvo.
3. **Artefato do alvo · target artifact.** A saída no formato que a tecnologia consome. É um **produto derivado e descartável**: pode ser apagado e regerado a qualquer momento a partir da fonte. Editá-lo à mão é proibido (§4) — a próxima geração o sobrescreve.

**EN** — Every exporter shares the same three-stage anatomy, always in the same direction: (1) **canonical source** — the start is always the Specification, materialized in `packages/tokens`; a token is a semantic contract (`color.surface.raised`, `space.4`), not a raw value; this is the single source of truth (Art. 5), and the exporter **reads**, never writes to it; (2) **transform** — a deterministic function that translates the semantic contract into the form the target understands — renaming, nesting or formatting per the technology's convention, **without changing meaning**; same input yields the same artifact (idempotent); the transform decides no values, it only *dresses* them in the target's clothing; (3) **target artifact** — the output in the format the technology consumes; it is a **derived, disposable product**: it can be deleted and regenerated at any time from the source; editing it by hand is forbidden (§4) — the next generation overwrites it.

## 2. Os alvos · The targets
**PT** — Cada alvo é um **destino plugável**: adicionar ou aposentar um alvo não toca a fonte. O que se exporta é sempre o mesmo conjunto canônico (tokens e, quando aplicável, temas — `THEMES`); muda só a *roupa*. Um alvo é um destino, jamais a fonte (§3).

| Alvo · Target | O que exporta · What it exports | Natureza do formato · Format nature |
|---|---|---|
| **CSS Variables** | tokens como variáveis de estilo, temas resolvidos por escopo | variáveis nomeadas por convenção de folha de estilo |
| **JSON** | tokens em estrutura de dados neutra (intercambiável) | estrutura de dados genérica, sem tecnologia de UI |
| **Tailwind** | tokens mapeados para a configuração de utilitários do alvo | configuração de escala/tema do utilitário |
| **React** | tokens + primitivos de tema para consumo em componentes do alvo | módulo de valores/tema da biblioteca de UI |
| **React Native** | tokens adaptados à convenção de estilo nativa da plataforma | módulo de estilo para app nativo |
| **Flutter** | tokens como constantes/tema no vocabulário do alvo | tema/constantes da plataforma |
| **SwiftUI** | tokens como constantes/tema no vocabulário da plataforma Apple | constantes/tema nativo Apple |
| **Compose** | tokens como tema no vocabulário da plataforma Android | tema nativo Android |
| **Figma Tokens** | tokens no formato que a ferramenta de design consome | pacote de tokens da ferramenta de design |
| **Design Tokens (W3C)** | tokens no formato-padrão interoperável de tokens | formato aberto e padronizado de design tokens |

> **PT** — A tabela nomeia *o quê* e *a natureza do formato*, nunca a sintaxe concreta (isso é implementação, §13). **EN** — The table names *the what* and *the format nature*, never concrete syntax (that is implementation, §13).

**PT** — Alguns alvos são de **interoperabilidade** (JSON, Design Tokens W3C, Figma Tokens): existem para que a fonte converse com outras ferramentas sem se casar com nenhuma. Outros são de **plataforma de UI** (CSS Variables, Tailwind, React, React Native, Flutter, SwiftUI, Compose): materializam os valores no vocabulário de uma tecnologia que roda. Em ambos os casos vale a mesma lei: **exportar PARA uma tecnologia é o propósito do exportador; DEPENDER dela é proibido** — o Studio UX não fica preso a nenhum alvo, porque a fonte é anterior e superior a todos.
**EN** — Some targets are for **interoperability** (JSON, W3C Design Tokens, Figma Tokens): they exist so the source can talk to other tools without marrying any. Others are for a **UI platform** (CSS Variables, Tailwind, React, React Native, Flutter, SwiftUI, Compose): they materialize values in a running technology's vocabulary. Either way the same law holds: **exporting TO a technology is the exporter's purpose; DEPENDING on it is forbidden** — Studio UX is bound to no target, because the source precedes and outranks them all.

## 3. O alvo é destino, nunca fonte · The target is a destination, never the source
**PT** — Esta é a regra central e o motivo de o domínio existir. A **fonte única** é a Specification/`packages/tokens` (Art. 5). Todo artefato exportado é uma *sombra* da fonte: reflete-a e depende dela, mas nunca a define. Se um alvo (o arquivo de variáveis, a config de utilitários, o tema nativo) virar a referência que as pessoas editam para mudar um valor, a arquitetura inverteu-se e a fonte perdeu autoridade — é a versão, em escala de tokens, do erro de "regra permanente dentro do Runtime" (`RUNTIME` §2). Exportar para React, Tailwind, Flutter e afins é **desejável e é o propósito** do exportador; esses são alvos legítimos. O que nunca acontece é o Studio UX passar a *precisar* de um deles: troque todos os alvos e a identidade continua intacta na Specification (Art. 13, §13).
**EN** — This is the central rule and the reason the domain exists. The **single source** is the Specification/`packages/tokens` (Art. 5). Every exported artifact is a *shadow* of the source: it reflects and depends on it, but never defines it. If a target (the variables file, the utility config, the native theme) becomes the reference people edit to change a value, the architecture has inverted and the source has lost authority — this is the token-scale version of the "permanent rule inside the Runtime" error (`RUNTIME` §2). Exporting to React, Tailwind, Flutter and the like is **desirable and is the purpose** of the exporter; these are legitimate targets. What never happens is Studio UX coming to *need* one of them: swap every target and the identity stays intact in the Specification (Art. 13, §13).

## 4. Garantia de fidelidade · Fidelity guarantee
**PT** — Um export só é válido se **reflete a Specification, nunca a diverge**. A garantia se apoia em três disciplinas: (1) **direção única** — o exportador só lê a fonte e escreve o artefato; nunca o contrário; (2) **determinismo** — a mesma fonte gera sempre o mesmo artefato, de modo que qualquer divergência é detectável (comparar o artefato gerado com o comprometido revela edição manual ou drift); (3) **cobertura** — todo token da fonte tem seu correspondente no alvo, sem valor inventado no alvo e sem token silenciosamente perdido. Um artefato que ganhou um valor que não existe na fonte, ou que perdeu um que existe, é um *export divergente* — defeito, não estilo. A conformidade dessa fidelidade é verificável pelas ferramentas de qualidade (`quality/LINTER`, Épico 3).
**EN** — An export is valid only if it **reflects the Specification, never diverges from it**. The guarantee rests on three disciplines: (1) **single direction** — the exporter only reads the source and writes the artifact, never the reverse; (2) **determinism** — the same source always produces the same artifact, so any divergence is detectable (comparing the generated artifact with the committed one reveals manual edits or drift); (3) **coverage** — every source token has its counterpart in the target, with no value invented in the target and no token silently dropped. An artifact that gained a value not in the source, or lost one that exists, is a *divergent export* — a defect, not a style. This fidelity is checkable by the quality tools (`quality/LINTER`, Epic 3).

## 5. Versionamento dos exports · Export versioning
**PT** — Os artefatos exportados **seguem a versão da Specification** (`VERSIONING`), nunca uma versão própria. Quando a fonte muda por SemVer, os exports são **regerados**, não emendados à mão: um token renomeado/removido (MAJOR) propaga-se a todos os alvos na mesma leva; um token novo (MINOR) aparece em todos; um esclarecimento (PATCH) que não muda contrato pode não alterar artefato algum. O artefato exportado carrega a marca da versão da fonte que o gerou, de modo que uma Application saiba exatamente qual contrato consome. Nenhum alvo evolui por conta própria: se um alvo precisa de algo que a fonte não tem, o pedido sobe para a Specification (propor e aguardar, Art. 20) — não se cria o valor direto no export.
**EN** — Exported artifacts **follow the Specification's version** (`VERSIONING`), never a version of their own. When the source changes via SemVer, exports are **regenerated**, not hand-edited: a renamed/removed token (MAJOR) propagates to all targets in the same commit; a new token (MINOR) appears in all; a contract-neutral clarification (PATCH) may change no artifact at all. The exported artifact carries the mark of the source version that generated it, so an Application knows exactly which contract it consumes. No target evolves on its own: if a target needs something the source lacks, the request rises to the Specification (propose and wait, Art. 20) — the value is never created directly in the export.

## Responsabilidades · Responsibilities
**PT** — Definir a anatomia de três estágios do exportador (§1); listar os alvos e a natureza de cada formato (§2); fixar a regra "alvo é destino, nunca fonte" (§3); garantir a fidelidade (§4); amarrar o versionamento dos exports à versão da Specification (§5).
**EN** — Define the exporter's three-stage anatomy (§1); list the targets and each format's nature (§2); fix the "target is a destination, never the source" rule (§3); guarantee fidelity (§4); tie export versioning to the Specification's version (§5).

## Não-responsabilidades · Non-responsibilities
**PT** — Não define os valores dos tokens (`tokens/DESIGN_TOKENS` e donos de valor), a resolução de temas (`THEMES`), as camadas de execução (`RUNTIME`), o layout físico (`PACKAGES`), a mecânica de SemVer (`VERSIONING`) nem a sintaxe concreta de nenhum alvo (implementação, §13).
**EN** — Does not define token values (`tokens/DESIGN_TOKENS` and value owners), theme resolution (`THEMES`), execution layers (`RUNTIME`), the physical layout (`PACKAGES`), the SemVer mechanics (`VERSIONING`) or any target's concrete syntax (implementation, §13).

## Integrações e dependências · Integrations and dependencies
**PT** — Parte de `packages/tokens` (`PACKAGES`) como fonte e produz os artefatos que alimentam o **Runtime** de cada tecnologia (`RUNTIME` §1.2 — os exports são um mecanismo que materializa a Specification em Runtime). Serve o `PROJECT_GENERATOR` (um projeto gerado consome o Runtime produzido por exports) e é fiscalizado pela `quality/LINTER`/`CERTIFICATION` quanto à fidelidade. Depende de `VERSIONING` para o versionamento.
**EN** — Starts from `packages/tokens` (`PACKAGES`) as source and produces the artifacts that feed each technology's **Runtime** (`RUNTIME` §1.2 — exports are a mechanism that materializes the Specification into Runtime). It serves the `PROJECT_GENERATOR` (a generated project consumes the Runtime produced by exports) and is policed by `quality/LINTER`/`CERTIFICATION` for fidelity. It depends on `VERSIONING` for versioning.

## Fluxos · Flows
**PT** — Fluxo canônico: **fonte (`packages/tokens`) → transformação determinística → artefato do alvo**. Fluxo de evolução: Specification muda (SemVer) → todos os exports são regerados → a Application adota a nova versão (`RUNTIME`, `VERSIONING`). Fluxo de novo alvo: adiciona-se um exportador (uma nova transformação) sem tocar a fonte — nunca se ramifica a Specification por tecnologia (`RUNTIME` §2). Fluxo de pedido: alvo precisa de valor inexistente → propor à Specification → aguardar → regerar (Art. 20).
**EN** — Canonical flow: **source (`packages/tokens`) → deterministic transform → target artifact**. Evolution flow: Specification changes (SemVer) → all exports regenerated → the Application adopts the new version (`RUNTIME`, `VERSIONING`). New-target flow: add an exporter (a new transform) without touching the source — never fork the Specification per technology (`RUNTIME` §2). Request flow: a target needs a nonexistent value → propose to the Specification → wait → regenerate (Art. 20).

## Boas práticas · Best practices
**PT** — Trate todo artefato exportado como gerado e descartável — regenere, nunca edite. Mantenha a transformação determinística para tornar o drift detectável. Adicione tecnologias como novos alvos, jamais como novas fontes. Verifique cobertura total (nenhum token perdido, nenhum inventado). Marque cada artefato com a versão da fonte. Ao precisar de um valor que a fonte não tem, proponha à Specification e aguarde.
**EN** — Treat every exported artifact as generated and disposable — regenerate, never edit. Keep the transform deterministic so drift is detectable. Add technologies as new targets, never as new sources. Verify full coverage (no token dropped, none invented). Mark each artifact with the source version. When you need a value the source lacks, propose it to the Specification and wait.

## Anti-padrões · Anti-patterns
**PT / EN**
- Editar o artefato exportado como se fosse a fonte (a próxima geração o apaga). / Editing the exported artifact as if it were the source.
- Um alvo (CSS, Tailwind, tema nativo) virar a fonte da verdade dos valores. / A target becoming the source of truth for values.
- Export que diverge da Specification — ganha um valor que ela não tem ou perde um que ela tem. / An export that diverges from the Specification.
- Versionar um export por conta própria em vez de seguir a versão da fonte. / Versioning an export on its own instead of following the source version.
- Ramificar a Specification por tecnologia em vez de adicionar um exportador (`RUNTIME` §2). / Forking the Specification per technology instead of adding an exporter.
- Amarrar o Studio UX a um alvo, tratando-o como insubstituível (viola Art. 13, §13). / Binding Studio UX to a target as if it were irreplaceable.

## Roadmap
**PT** — Especificado na era de documentação; os exportadores são construídos no Épico 4 (Geração), partindo de `packages/tokens`. Alvos novos entram aqui quando uma tecnologia relevante aparecer — sempre como destino plugável, nunca alterando a fonte. Um alvo aposentado sai da tabela (§2) sem qualquer efeito sobre a Specification.
**EN** — Specified in the documentation era; the exporters are built in Epic 4 (Generation), starting from `packages/tokens`. New targets enter here when a relevant technology appears — always as a pluggable destination, never altering the source. A retired target leaves the table (§2) with no effect on the Specification.

## Referências internas · Internal references
`tokens/STUDIO_UX_DESIGN_TOKENS.md` · `tokens/STUDIO_UX_COLOR_SYSTEM.md` · `STUDIO_UX_THEMES.md` · `platform/STUDIO_UX_RUNTIME.md` · `platform/STUDIO_UX_PACKAGES.md` · `governance/STUDIO_UX_VERSIONING.md` · `generation/STUDIO_UX_PROJECT_GENERATOR.md` · `STUDIO_UX_CERTIFICATION.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 3, 5, 13, 14) · `STUDIO_UX.md` §11 · §13

---

*Documento vivo. A fonte é a Specification; os alvos são destinos plugáveis e descartáveis. Exportar para uma tecnologia é o propósito; depender dela é proibido. · Living document. The source is the Specification; targets are pluggable, disposable destinations. Exporting to a technology is the purpose; depending on it is forbidden.*
