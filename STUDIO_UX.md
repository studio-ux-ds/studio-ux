# STUDIO_UX.md — REGRA MÁXIMA DO PRODUTO STUDIO UX
# STUDIO_UX.md — SUPREME RULE OF THE STUDIO UX PRODUCT

> **Studio UX** é o Framework de Experiência do Usuário oficial da empresa: a base única sobre a qual todos os sistemas (Aquapark, IA Studio, ERPs, CRMs, Portais do Cliente) constroem suas interfaces. Não é um template. É um **produto independente, versionado e governado**, feito para durar anos.
>
> **Studio UX** is the company's official User Experience Framework: the single foundation on which every system (Aquapark, IA Studio, ERPs, CRMs, Customer Portals) builds its interfaces. It is not a template. It is an **independent, versioned, governed product**, built to last for years.

> Toda IA ou pessoa que atuar neste projeto DEVE seguir estas regras sem exceção.
> Every AI or person working on this project MUST follow these rules without exception.

> **Documentos normativos vivos / Living normative documents:** `docs/STUDIO_UX_PRINCIPLES.md` (princípios), `docs/tokens/STUDIO_UX_DESIGN_TOKENS.md` (arquitetura de tokens), `docs/components/STUDIO_UX_COMPONENT_LIBRARY.md` (catálogo oficial), `docs/context/STUDIO_UX_AI_CONTEXT.md` (contexto para IA). Índice de estado / re-ancoragem: `docs/context/STUDIO_UX_HANDOFF.md`.
>
> **Como interagir com o Robson / How to work with Robson** (idioma pt-BR nas conversas, re-ancorar pós-compactação, erro silencioso, docs vivos, ambiente/deploy, governança de mudanças, tom de resposta) está em **`COMO-INTERAGIR-COM-ROBSON.md`** (raiz do projeto — mesmo conteúdo em todos os projetos do Robson) / is in **`COMO-INTERAGIR-COM-ROBSON.md`** (project root — same content across all of Robson's projects). Este arquivo aqui é só regra do produto Studio UX (a política bilíngue PT+EN do §1 é do produto, não conflita com aquele doc). / This file is product rule only (the §1 PT+EN bilingual policy is about the product, not in conflict with that doc).

---

## 0. STATUS · Fase atual · Current phase

- **Produto materializado / Materialized product:** **PT:** os tokens, o CSS de componentes, os adapters React e React Native, a biblioteca de ícones, o CLI e o Storybook existem em `packages/*`. A arquitetura real é `tokens → components → react → sistemas consumidores`; consulte `docs/platform/STUDIO_UX_PACKAGES.md` antes de alterar uma camada. **EN:** tokens, component CSS, React and React Native adapters, the icon library, CLI and Storybook exist in `packages/*`. The real architecture is `tokens → components → react → consuming systems`; read `docs/platform/STUDIO_UX_PACKAGES.md` before changing a layer.
- **Fase / Phase:** **PT:** **Fase 3 — biblioteca de componentes e adoção controlada.** A fundação documental (Fase 1), a linguagem visual (1.5/1.6) e os tokens (Fase 2) estão concluídos; a biblioteca e os refinamentos por jornada continuam evoluindo sob a Definition of Done de `docs/quality/REFINAMENTO-E-PROPAGACAO.md`. O roadmap histórico permanece em `docs/STUDIO_UX_ROADMAP.md`. **EN:** **Phase 3 — component library and controlled adoption.** The documentation foundation (Phase 1), visual language (1.5/1.6) and tokens (Phase 2) are complete; the library and journey refinements continue under the Definition of Done in `docs/quality/REFINAMENTO-E-PROPAGACAO.md`. The historical roadmap remains in `docs/STUDIO_UX_ROADMAP.md`.
- **Fonte da verdade de versão / Version source of truth:** `CHANGELOG.md` + tags git. **PT:** nunca a memória nem este cabeçalho. **EN:** never memory or this header.

**PT** — Este documento governa o produto que já está em código e publicação. Não trate a Fase 1 como estado atual, não recrie camadas já existentes e não implemente fora do pacote dono.

**EN** — This document governs a product that already has code and publishing. Do not treat Phase 1 as the current state, do not recreate existing layers, and do not implement outside the owning package.

---

## 1. 🌍 IDIOMA · LANGUAGE — política bilíngue oficial

**PT** — O Studio UX é **totalmente bilíngue (PT-BR + EN)**. Toda a documentação de superfície convive nas duas línguas, lado a lado por seção, para nunca dessincronizar. A regra de "docs vivos sem lixo" (§9) vale para as duas línguas ao mesmo tempo: mudou o PT, muda o EN na mesma leva.

**EN** — Studio UX is **fully bilingual (PT-BR + EN)**. All surface documentation lives in both languages, side by side per section, so translations never drift apart. The "living docs, no dead weight" rule (§9) applies to both languages at once: if the PT changes, the EN changes in the same commit.

**Regras / Rules:**

- **Prosa bilíngue por seção.** Cada seção traz um bloco `**PT** — …` e um bloco `**EN** — …` adjacentes. Nunca um arquivo só-PT nem só-EN para conteúdo normativo. / Each section carries adjacent `**PT** —` and `**EN** —` blocks. Never a PT-only or EN-only file for normative content.
- **Identificadores em inglês.** Nomes de tokens, componentes, propriedades e chaves de código são **sempre em inglês** (`color.surface.raised`, `Button`, `DataTable`, `space-4`). Padrão da indústria (Material, Carbon, Polaris) e pré-requisito para consumo por IA. / Token, component, property and code-key names are **always English**. Industry standard and a prerequisite for AI consumption.
- **Texto de UI (dos sistemas consumidores) segue a língua do produto final.** O Studio UX documenta em PT+EN; cada sistema que o consome escolhe a(s) língua(s) da sua UI via i18n. O framework nunca chumba string de idioma. / UI copy in consuming systems follows that product's language via i18n; the framework never hard-codes user-facing strings.
- **Títulos de documento e de seção podem ser bilíngues** com separador `·` (ex.: `Visão geral · Overview`). / Document and section titles may be bilingual using the `·` separator.

---

## 2. ⚖️ PRINCÍPIO REITOR · GOVERNING PRINCIPLE

**PT** — Studio UX é **genérico e agnóstico de domínio**. Nenhuma decisão pode depender de um segmento (ISP, e-commerce, saúde…). Funcionalidade de negócio nunca entra no framework — o framework entrega a **linguagem visual, os componentes, os padrões e as regras**; o sistema consumidor entrega o conteúdo. Studio UX **nunca é dono de dado de negócio nem de tela de negócio**; ele é dono da *experiência*.

**EN** — Studio UX is **generic and domain-agnostic**. No decision may depend on a vertical (ISP, e-commerce, healthcare…). Business functionality never enters the framework — the framework ships the **visual language, components, patterns and rules**; the consuming system ships the content. Studio UX **never owns business data or business screens**; it owns the *experience*.

**PT** — São **dois produtos irmãos, não um responsivo**: `Studio UX Desktop` (produtividade) e `Studio UX Mobile` (nativo). Compartilham identidade visual, princípios e tokens; **não** compartilham layouts. Transformar Desktop em Mobile só com media query é violação.

**EN** — There are **two sibling products, not one responsive one**: `Studio UX Desktop` (productivity) and `Studio UX Mobile` (native). They share visual identity, principles and tokens; they do **not** share layouts. Turning Desktop into Mobile with media queries alone is a violation.

---

## 3. 🔁 REGRAS DE OURO DA EXECUÇÃO · GOLDEN EXECUTION RULES

**PT / EN — leia antes de escrever qualquer doc ou, no futuro, qualquer componente.**

1. **A interface nunca chama mais atenção que os dados. / The interface never draws more attention than the data.** Poucas cores, muito espaço em branco, poucas sombras, micro-animações discretas. Se um enfeite compete com o conteúdo, ele sai.
2. **Consistência acima de criatividade pontual. / Consistency over one-off creativity.** Nenhum componente pode parecer "fora da família". Nenhum espaçamento arbitrário — todo valor vem de um token. Nenhuma tela construída sem os componentes oficiais.
3. **Documentar o PORQUÊ, não só o QUÊ. / Document the WHY, not only the WHAT.** Toda decisão registra motivo, quando usar, quando NÃO usar, regras, limitações, boas práticas e anti-padrões (§8).
4. **Desktop e Mobile pensados do zero, separadamente. / Desktop and Mobile designed from scratch, separately.** Nunca adaptar um a partir do outro.
5. **Desconfie de inconsistência silenciosa. / Distrust silent inconsistency.** Um valor "quase igual" (um `padding` de 15px onde o token é 16px) é o bug do design system: parece certo e corrói a família. Sempre ancorar em token.
6. **Arquitetura antes de estética. / Architecture before aesthetics.** A arquitetura e os tokens congelados precedem qualquer refinamento: use os contratos existentes, não crie valores paralelos nem uma segunda camada visual. / Frozen architecture and tokens precede any refinement: use existing contracts, never create parallel values or a second visual layer.
7. **Pós-compactação = re-ancorar antes de agir. / After context compaction, re-anchor before acting.** Regra geral em `COMO-INTERAGIR-COM-ROBSON.md` §2; aqui a primeira ação após um resumo de sessão é reler também `docs/context/STUDIO_UX_HANDOFF.md`. / General rule in `COMO-INTERAGIR-COM-ROBSON.md` §2; here the first action after a session summary also rereads `docs/context/STUDIO_UX_HANDOFF.md`.
8. **Antes de criar um documento, pergunte: "assunto novo ou já tem dono?" / Before creating a document, ask: "new subject or already owned?"** Se o assunto pertence a um documento existente, **expanda o existente — não crie outro** (viola SSOT, §11). Só nasce documento novo quando é um domínio de conhecimento genuinamente novo. E todo documento novo passa antes pelo **Architecture Boundary Check** (§12). / If the subject belongs to an existing document, **expand it — do not create another** (violates SSOT, §11). A new document is born only for a genuinely new knowledge domain. And every new document first passes the **Architecture Boundary Check** (§12).

---

## 4. 🏗️ ESTRUTURA DO PRODUTO · PRODUCT STRUCTURE

```
studio-ux/
├── STUDIO_UX.md                     # este arquivo — regra máxima / this file — supreme rule
├── README.md                        # porta de entrada / entry point
├── CHANGELOG.md                     # histórico por versão (fonte da verdade) / history by version (source of truth)
├── docs/
│   ├── STUDIO_UX_VISION.md          # o produto e o porquê / the product and the why
│   ├── STUDIO_UX_PHILOSOPHY.md      # a filosofia de design / the design philosophy
│   ├── STUDIO_UX_PRINCIPLES.md      # princípios operacionais / operational principles
│   ├── STUDIO_UX_ANIMATIONS.md      # motion & micro-interações / motion & micro-interactions
│   ├── STUDIO_UX_ACCESSIBILITY.md   # acessibilidade / accessibility
│   ├── STUDIO_UX_THEMES.md          # temas (dark/light/brand) / themes
│   ├── STUDIO_UX_ICONOGRAPHY.md     # iconografia / iconography
│   ├── STUDIO_UX_ROADMAP.md         # evolução do produto / product evolution
│   ├── context/
│   │   ├── STUDIO_UX_AI_CONTEXT.md  # como uma IA constrói telas com Studio UX / how an AI builds screens
│   │   └── STUDIO_UX_HANDOFF.md     # índice de estado / re-anchoring index
│   ├── research/
│   │   └── REFERENCES.md            # estudo de referências (princípios, nunca cópia) / reference study
│   ├── desktop/
│   │   └── STUDIO_UX_DESKTOP.md     # produto Desktop / Desktop product
│   ├── mobile/
│   │   └── STUDIO_UX_MOBILE.md      # produto Mobile / Mobile product
│   ├── tokens/
│   │   ├── STUDIO_UX_DESIGN_TOKENS.md   # arquitetura dos tokens / token architecture
│   │   ├── STUDIO_UX_COLOR_SYSTEM.md    # sistema de cor / color system
│   │   ├── STUDIO_UX_TYPOGRAPHY.md      # tipografia / typography
│   │   └── STUDIO_UX_SPACING.md         # espaçamento / spacing
│   ├── components/
│   │   └── STUDIO_UX_COMPONENT_LIBRARY.md  # catálogo oficial / official catalog
│   ├── patterns/
│   │   └── STUDIO_UX_PATTERNS.md    # padrões de UX / UX patterns
│   ├── layouts/
│   │   └── STUDIO_UX_LAYOUT_SYSTEM.md   # sistema de layout / layout system
│   └── templates/                   # modelos de tela (fase futura) / screen templates (future phase)
├── playground/                      # laboratório vivo (fase futura) / live lab (future phase)
├── assets/
│   ├── icons/                       # biblioteca de ícones / icon library
│   ├── illustrations/               # ilustrações / illustrations
│   └── branding/                    # marca do Studio UX / Studio UX brand
└── examples/                        # telas de exemplo (fase futura) / example screens (future phase)
```

**PT** — Um arquivo responde UMA pergunta (regra de coesão). Documento de token não vira documento de componente; documento de Desktop não vira Mobile.
**EN** — One file answers ONE question (cohesion rule). A token doc never bleeds into a component doc; a Desktop doc never bleeds into Mobile.

---

## 5. 🔢 CATÁLOGO DE PRINCÍPIOS NUMERADOS · NUMBERED PRINCIPLE CATALOG

**PT** — Como o IA Studio governa por "diretrizes numeradas", o Studio UX governa por **Princípios numerados (P1…Pn)**, definidos em `docs/STUDIO_UX_PRINCIPLES.md`. Cada princípio tem número imutável; documentos e (no futuro) componentes referenciam por número (ex.: "P7 — sem espaçamento arbitrário"). Aposentar um princípio = marcá-lo `DEPRECATED` com a versão, nunca renumerar os outros.

**EN** — Just as IA Studio governs via "numbered directives", Studio UX governs via **numbered Principles (P1…Pn)**, defined in `docs/STUDIO_UX_PRINCIPLES.md`. Each principle has an immutable number; docs and (future) components reference it by number (e.g. "P7 — no arbitrary spacing"). Retiring a principle = mark it `DEPRECATED` with the version, never renumber the others.

---

## 6. 🎨 REGRA MÁXIMA DE UX · SUPREME UX RULE — linguagem do usuário

**PT** — Herdada do IA Studio e elevada a lei do Studio UX: **todo texto de superfície fala a língua do dono do negócio, nunca a do desenvolvedor.** "O que o assistente pode fazer", não `allowed_tools`. "Quem é", não `persona JSON`. Jargão técnico (chaves, IDs, tokens crus) mora em "Ajustes avançados" ou fora da tela. Vale para toda tela que qualquer sistema construir sobre o Studio UX. O framework fornece os componentes que tornam isso o caminho fácil (ex.: `EmptyState`, `ConfirmDialog`, toasts).

**EN** — Inherited from IA Studio and raised to Studio UX law: **all surface copy speaks the business owner's language, never the developer's.** "What the assistant can do", not `allowed_tools`. "Who it is", not `persona JSON`. Technical jargon (keys, IDs, raw tokens) lives under "Advanced settings" or off-screen. This applies to every screen any system builds on Studio UX. The framework supplies the components that make this the easy path (e.g. `EmptyState`, `ConfirmDialog`, toasts).

---

## 7. 🧭 GOVERNANÇA E VERSIONAMENTO · GOVERNANCE AND VERSIONING

> **PT** — O detalhe completo da estratégia de versão (breaking changes, depreciação, compatibilidade, LTS) é do dono `docs/governance/STUDIO_UX_VERSIONING.md`. Esta seção é o resumo. Acima de toda a governança está a `docs/governance/STUDIO_UX_CONSTITUTION.md` (verdades imutáveis). **EN** — The full version-strategy detail (breaking changes, deprecation, compatibility, LTS) belongs to the owner `docs/governance/STUDIO_UX_VERSIONING.md`. This section is the summary. Above all governance stands `docs/governance/STUDIO_UX_CONSTITUTION.md` (immutable truths).

**PT** — Studio UX é versionado por **SemVer** (`MAJOR.MINOR.PATCH`):

- **MAJOR** — mudança que quebra contrato (token removido/renomeado, componente aposentado, princípio revogado). Exige guia de migração.
- **MINOR** — adição retrocompatível (novo token, novo componente, novo padrão).
- **PATCH** — correção/esclarecimento de documentação sem mudar contrato.

Toda mudança: entrada no `CHANGELOG.md` → commit → **tag anotada e imutável** `vX.Y.Z` (nunca reusar tag — regra geral de confirmar versão com o Robson em `COMO-INTERAGIR-COM-ROBSON.md` §5). Decisões arquiteturais relevantes viram **ADR** (Architecture Decision Record) curto dentro do doc afetado (contexto → decisão → consequência).

**Consumo por sistemas / Consumption by systems:** um sistema **declara** a versão do Studio UX que usa (ex.: "Aquapark → Studio UX Desktop `v1.x`"). Atualizações MAJOR são adotadas deliberadamente, com o guia de migração. O framework nunca é editado dentro do sistema consumidor — só consumido.

**EN** — Studio UX is versioned via **SemVer** (`MAJOR.MINOR.PATCH`): MAJOR = contract break (needs migration guide); MINOR = backward-compatible addition; PATCH = doc fix/clarification. Every change: `CHANGELOG.md` entry → commit → **annotated immutable tag** `vX.Y.Z` (never reuse a tag — general version-confirmation rule in `COMO-INTERAGIR-COM-ROBSON.md` §5). Notable architectural decisions become a short **ADR** inside the affected doc (context → decision → consequence). A consuming system **declares** the Studio UX version it uses; MAJOR upgrades are adopted deliberately with the migration guide. The framework is never edited inside a consumer — only consumed.

---

## 8. 🧠 PENSAR ANTES DE DOCUMENTAR/CONSTRUIR · THINK BEFORE DOCUMENTING/BUILDING

**PT** — Antes de escrever um documento novo ou (fase futura) um componente, mapear em prosa: **1)** que pergunta única este arquivo responde; **2)** que princípios (P#) e tokens ele referencia; **3)** relação com Desktop vs Mobile (é comum, ou específico?); **4)** o que ele NÃO cobre (fronteira com outro doc); **5)** anti-padrões que precisa proibir; **6)** exemplos de uso correto e incorreto; **7)** impacto no `CHANGELOG` e na versão. Todo componente/padrão documentado descreve obrigatoriamente: **propósito · quando usar · quando NÃO usar · regras · limitações · boas práticas · anti-padrões · estados (default/hover/focus/active/disabled/loading/error/empty) · acessibilidade · variação Desktop vs Mobile.**

**EN** — Before writing a new document or (future) a component, map in prose: **1)** the single question this file answers; **2)** which principles (P#) and tokens it references; **3)** its relation to Desktop vs Mobile (shared or specific?); **4)** what it does NOT cover (boundary with another doc); **5)** anti-patterns it must forbid; **6)** correct and incorrect usage examples; **7)** impact on `CHANGELOG` and version. Every documented component/pattern mandatorily describes: **purpose · when to use · when NOT to use · rules · limitations · best practices · anti-patterns · states (default/hover/focus/active/disabled/loading/error/empty) · accessibility · Desktop vs Mobile variation.**

---

## 9. 🧾 DOCUMENTAÇÃO VIVA — SEM LIXO · LIVING DOCS — NO DEAD WEIGHT

**PT** — Regra geral (doc descreve o hoje, sem depósito de histórico) em `COMO-INTERAGIR-COM-ROBSON.md` §4. Aqui, o adicional específico do Studio UX: toda versão/ajuste atualiza a doc afetada nas DUAS línguas na mesma leva — mudar só o PT ou só o EN é o mesmo tipo de dívida.

**EN** — General rule (docs describe the today, no history dump) in `COMO-INTERAGIR-COM-ROBSON.md` §4. Studio UX-specific addition: every version/tweak updates the affected doc in BOTH languages in the same commit — changing only PT or only EN is the same kind of debt.

**Papéis / Roles:** `CHANGELOG.md` = histórico (o que mudou e quando). `docs/` = estado atual (o que existe e como funciona). `docs/context/STUDIO_UX_HANDOFF.md` = índice para re-ancorar entre sessões (a verdade mora no git + arquivos, nunca na memória).

---

## 10. 🚦 SINAIS DE ALARME · RED FLAGS

**PT / EN** — Pare e revise se aparecer: espaçamento/cor/raio fora de token ("valor mágico"); componente novo que já existe em `components/`; Desktop virando Mobile só por media query; jargão técnico renderizado como texto de UI; documento só em uma língua; princípio renumerado; doc guardando histórico de correção; decisão arquitetural dependente de um segmento de negócio; sombra/animação chamando mais atenção que o dado; **o mesmo assunto definido em dois documentos (viola SSOT, §11); documento novo sem Architecture Boundary Check (§12); regra que amarra a princípios permanentes a uma tecnologia específica (viola §13).**

---

## 11. 🗂️ SINGLE SOURCE OF TRUTH POR DOMÍNIO · SINGLE SOURCE OF TRUTH PER DOMAIN

**PT** — Cada domínio de conhecimento tem **um, e só um, documento dono**. O dono é a única fonte da verdade daquele assunto: é onde a regra nasce, evolui e é corrigida. Todos os outros documentos **referenciam** o dono — nunca redefinem, nunca duplicam, nunca contradizem. Se dois documentos descrevem o mesmo assunto, um deles está errado por construção. Esta regra é o que mantém a documentação consistente à medida que cresce e elimina o risco de divergência ao longo dos anos.

**EN** — Each knowledge domain has **one, and only one, owner document**. The owner is the single source of truth for that subject: it is where the rule is born, evolves and is corrected. Every other document **references** the owner — never redefines, never duplicates, never contradicts. If two documents describe the same subject, one of them is wrong by construction. This rule keeps the documentation consistent as it grows and removes the risk of divergence over the years.

**Mapa de donos por domínio · Domain ownership map:**

| Domínio · Domain | Dono único · Sole owner |
|---|---|
| Governança operacional, SSOT, Boundary Check · Operational governance, SSOT, Boundary Check | `STUDIO_UX.md` |
| Verdades constitucionais · Constitutional truths | `docs/governance/STUDIO_UX_CONSTITUTION.md` |
| Estratégia de versionamento · Versioning strategy | `docs/governance/STUDIO_UX_VERSIONING.md` |
| Padrão de ADR · ADR standard | `docs/governance/STUDIO_UX_ADR_GUIDE.md` |
| Processo de RFC · RFC process | `docs/governance/STUDIO_UX_RFC_GUIDE.md` |
| Estratégia da plataforma · Platform strategy | `docs/platform/STUDIO_UX_PLATFORM.md` |
| Arquitetura lógica / mapa de domínios · Logical architecture / domain map | `docs/platform/STUDIO_UX_ARCHITECTURE.md` |
| Camadas de execução · Execution layers | `docs/platform/STUDIO_UX_RUNTIME.md` |
| Arquitetura de monorepo / layout físico · Monorepo architecture / physical layout | `docs/platform/STUDIO_UX_PACKAGES.md` |
| Visão de década · Decade vision | `docs/platform/STUDIO_UX_ROADMAP_2035.md` |
| Visão · Vision | `docs/STUDIO_UX_VISION.md` |
| Filosofia · Philosophy | `docs/STUDIO_UX_PHILOSOPHY.md` |
| Princípios P1…Pn · Principles | `docs/STUDIO_UX_PRINCIPLES.md` |
| DNA visual / personalidade · Visual DNA / personality | `docs/STUDIO_UX_VISUAL_DNA.md` |
| Gramática de composição · Composition grammar | `docs/STUDIO_UX_GRAMMAR.md` |
| Superfícies e elevação · Surfaces & elevation | `docs/STUDIO_UX_SURFACES.md` |
| Ritmo visual · Visual rhythm | `docs/STUDIO_UX_VISUAL_RHYTHM.md` |
| Arquitetura de tokens · Token architecture | `docs/tokens/STUDIO_UX_DESIGN_TOKENS.md` |
| Cor · Color | `docs/tokens/STUDIO_UX_COLOR_SYSTEM.md` |
| Tipografia · Typography | `docs/tokens/STUDIO_UX_TYPOGRAPHY.md` |
| Espaçamento · Spacing | `docs/tokens/STUDIO_UX_SPACING.md` |
| Temas · Themes | `docs/STUDIO_UX_THEMES.md` |
| Iconografia · Iconography | `docs/STUDIO_UX_ICONOGRAPHY.md` |
| Movimento · Motion | `docs/STUDIO_UX_ANIMATIONS.md` |
| Layout, grid, regiões, camadas · Layout, grid, regions, layers | `docs/layouts/STUDIO_UX_LAYOUT_SYSTEM.md` |
| Catálogo de componentes · Component catalog | `docs/components/STUDIO_UX_COMPONENT_LIBRARY.md` |
| Padrões de fluxo · Flow patterns | `docs/patterns/STUDIO_UX_PATTERNS.md` |
| Acessibilidade · Accessibility | `docs/STUDIO_UX_ACCESSIBILITY.md` |
| Dashboards · Dashboards | `docs/STUDIO_UX_DASHBOARD.md` |
| Formulários · Forms | `docs/STUDIO_UX_FORMS.md` |
| Tabelas de dados · Data tables | `docs/STUDIO_UX_TABLES.md` |
| Navegação · Navigation | `docs/STUDIO_UX_NAVIGATION.md` |
| Certificação (tela e sistema) · Certification (screen and system) | `docs/STUDIO_UX_CERTIFICATION.md` |
| Engenharia reversa de referências · Reference reverse-engineering | `docs/research/REFERENCE_DNA.md` |
| Produto Desktop · Desktop product | `docs/desktop/STUDIO_UX_DESKTOP.md` |
| Produto Mobile · Mobile product | `docs/mobile/STUDIO_UX_MOBILE.md` |
| Regras para IA · AI rules | `docs/context/AI_RULES.md` |
| CLI oficial · Official CLI | `docs/tools/STUDIO_UX_CLI.md` |
| Ferramentas de inspeção (DevTools) · Inspection tools | `docs/tools/STUDIO_UX_DEVTOOLS.md` |
| Ambiente Playground · Playground environment | `docs/tools/STUDIO_UX_PLAYGROUND.md` |
| Validação automática (Linter) · Automatic validation | `docs/quality/STUDIO_UX_LINTER.md` |
| Conformidade contínua · Continuous compliance | `docs/quality/STUDIO_UX_COMPLIANCE.md` |
| Geração de projetos · Project generation | `docs/generation/STUDIO_UX_PROJECT_GENERATOR.md` |
| Exportadores · Exporters | `docs/generation/STUDIO_UX_EXPORTERS.md` |
| Integração com IA · AI ecosystem integration | `docs/context/STUDIO_UX_AI_ECOSYSTEM.md` |

**PT** — Fronteira exemplar (permanente): **`GRAMMAR` define "o que existe"** (os níveis de composição e como se aninham); **`LAYOUT_SYSTEM` define "onde existe"** (grid, colunas, gutters, margens, breakpoints, z-index, regiões físicas). Grammar nunca fala de grid; Layout nunca fala de gramática. Ver o ADR em `STUDIO_UX_GRAMMAR.md`.

**EN** — Exemplary (permanent) boundary: **`GRAMMAR` defines "what exists"** (the composition levels and how they nest); **`LAYOUT_SYSTEM` defines "where it exists"** (grid, columns, gutters, margins, breakpoints, z-index, physical regions). Grammar never talks about grid; Layout never talks about grammar. See the ADR in `STUDIO_UX_GRAMMAR.md`.

---

## 12. ✅ ARCHITECTURE BOUNDARY CHECK — obrigatório antes de todo doc novo · mandatory before every new doc

**PT** — Nenhum documento nasce sem antes responder cinco perguntas, e o resultado fica **registrado no topo do próprio documento** (logo após o cabeçalho). Isto previne sobreposição de responsabilidade antes que ela aconteça.

**EN** — No document is born without first answering five questions, and the result is **recorded at the top of the document itself** (right after the header). This prevents responsibility overlap before it happens.

Perguntas · Questions: (1) Qual problema este documento resolve? / What problem does this document solve? · (2) Por que ele não pertence a um documento existente? / Why doesn't it belong to an existing document? · (3) Quais documentos ele complementa? / Which documents does it complement? · (4) Quais documentos ele nunca deve substituir? / Which documents must it never replace? · (5) Quem é o dono deste assunto? / Who owns this subject?

Formato do bloco · Block format:

```
Architecture Boundary Check — STUDIO_UX_EXEMPLO
Resolve · Solves:            <o problema único / the single problem>
Não pertence a outro porque · Not elsewhere because: <razão / reason>
Complementa · Complements:   <docs>
Nunca substitui · Never replaces: <docs>
Dono · Owner:                <este doc, para o domínio X / this doc, for domain X>
```

---

## 13. ⏳ HORIZONTE DE 10 ANOS — princípios permanentes, não tecnologia · 10-YEAR HORIZON — permanent principles, not technology

**PT** — Toda a documentação normativa descreve **princípios permanentes de experiência, composição e design**, independentes de qualquer tecnologia de implementação. Um documento do Studio UX **não pode depender** de framework, biblioteca ou linguagem específicos — nada de React, Tailwind, shadcn, Vue, CSS, HTML ou o que estiver na moda. Essas tecnologias mudam em ciclos de poucos anos; o Studio UX é feito para durar uma década e mais. A camada de implementação virá depois, como um *tradutor* dos princípios para a tecnologia do momento, e é descartável/substituível sem tocar na fundação. Regra prática: se uma frase só faz sentido dentro de uma tecnologia (ex.: "use a classe utilitária X", "o hook Y"), ela não pertence à documentação de princípios.

**EN** — All normative documentation describes **permanent principles of experience, composition and design**, independent of any implementation technology. A Studio UX document **must not depend** on a specific framework, library or language — no React, Tailwind, shadcn, Vue, CSS, HTML or whatever is trending. Those technologies change on a few-year cycle; Studio UX is built to last a decade and beyond. The implementation layer comes later, as a *translator* of the principles into the technology of the day, and is disposable/replaceable without touching the foundation. Practical rule: if a sentence only makes sense inside one technology (e.g. "use utility class X", "the Y hook"), it does not belong in the principles documentation.

---

*Documento vivo / Living document: descreve o produto materializado e sua governança atual. A versão de release é sempre `CHANGELOG.md` + tags git; o histórico de fases vive em `docs/STUDIO_UX_ROADMAP.md`.*
