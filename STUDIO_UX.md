# STUDIO_UX.md — REGRA MÁXIMA DO PRODUTO STUDIO UX
# STUDIO_UX.md — SUPREME RULE OF THE STUDIO UX PRODUCT

> **Studio UX** é o Framework de Experiência do Usuário oficial da empresa: a base única sobre a qual todos os sistemas (Aquapark, IA Studio, ERPs, CRMs, Portais do Cliente) constroem suas interfaces. Não é um template. É um **produto independente, versionado e governado**, feito para durar anos.
>
> **Studio UX** is the company's official User Experience Framework: the single foundation on which every system (Aquapark, IA Studio, ERPs, CRMs, Customer Portals) builds its interfaces. It is not a template. It is an **independent, versioned, governed product**, built to last for years.

> Toda IA ou pessoa que atuar neste projeto DEVE seguir estas regras sem exceção.
> Every AI or person working on this project MUST follow these rules without exception.

> **Documentos normativos vivos / Living normative documents:** `docs/STUDIO_UX_PRINCIPLES.md` (princípios), `docs/tokens/STUDIO_UX_DESIGN_TOKENS.md` (arquitetura de tokens), `docs/components/STUDIO_UX_COMPONENT_LIBRARY.md` (catálogo oficial), `docs/context/STUDIO_UX_AI_CONTEXT.md` (contexto para IA). Índice de estado / re-ancoragem: `docs/context/STUDIO_UX_HANDOFF.md`.

---

## 0. STATUS · Fase atual · Current phase

- **Versão / Version:** `v0.1.0` (fundação documental — só documentação, zero código).
- **Fase / Phase:** **Fase 1 — Fundação Conceitual e Documental.** Não implementar componentes, tokens finais ou telas ainda. Ver `docs/STUDIO_UX_ROADMAP.md`.
- **Fonte da verdade de versão / Version source of truth:** `CHANGELOG.md` + tags git. **Nunca a memória.**

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
6. **Arquitetura antes de estética. / Architecture before aesthetics.** Nesta fase definimos *como* tokens, temas e componentes funcionam — não os valores/estilos finais.
7. **Pós-compactação = re-ancorar antes de agir. / After context compaction, re-anchor before acting.** A primeira ação após um resumo de sessão é reler este arquivo + o topo do `CHANGELOG.md` + `docs/context/STUDIO_UX_HANDOFF.md` e conferir o estado real (git, ls, ler o arquivo) antes de recomendar ou tocar em nada. Nunca cravar versão/nome de arquivo de cabeça. Tag nunca é reusada.

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

**PT** — Studio UX é versionado por **SemVer** (`MAJOR.MINOR.PATCH`):

- **MAJOR** — mudança que quebra contrato (token removido/renomeado, componente aposentado, princípio revogado). Exige guia de migração.
- **MINOR** — adição retrocompatível (novo token, novo componente, novo padrão).
- **PATCH** — correção/esclarecimento de documentação sem mudar contrato.

Toda mudança: entrada no `CHANGELOG.md` → commit → **tag anotada e imutável** `vX.Y.Z` (nunca reusar tag; sempre confirmar o número com o Robson). Decisões arquiteturais relevantes viram **ADR** (Architecture Decision Record) curto dentro do doc afetado (contexto → decisão → consequência).

**Consumo por sistemas / Consumption by systems:** um sistema **declara** a versão do Studio UX que usa (ex.: "Aquapark → Studio UX Desktop `v1.x`"). Atualizações MAJOR são adotadas deliberadamente, com o guia de migração. O framework nunca é editado dentro do sistema consumidor — só consumido.

**EN** — Studio UX is versioned via **SemVer** (`MAJOR.MINOR.PATCH`): MAJOR = contract break (needs migration guide); MINOR = backward-compatible addition; PATCH = doc fix/clarification. Every change: `CHANGELOG.md` entry → commit → **annotated immutable tag** `vX.Y.Z` (never reuse a tag; always confirm the number with Robson). Notable architectural decisions become a short **ADR** inside the affected doc (context → decision → consequence). A consuming system **declares** the Studio UX version it uses; MAJOR upgrades are adopted deliberately with the migration guide. The framework is never edited inside a consumer — only consumed.

---

## 8. 🧠 PENSAR ANTES DE DOCUMENTAR/CONSTRUIR · THINK BEFORE DOCUMENTING/BUILDING

**PT** — Antes de escrever um documento novo ou (fase futura) um componente, mapear em prosa: **1)** que pergunta única este arquivo responde; **2)** que princípios (P#) e tokens ele referencia; **3)** relação com Desktop vs Mobile (é comum, ou específico?); **4)** o que ele NÃO cobre (fronteira com outro doc); **5)** anti-padrões que precisa proibir; **6)** exemplos de uso correto e incorreto; **7)** impacto no `CHANGELOG` e na versão. Todo componente/padrão documentado descreve obrigatoriamente: **propósito · quando usar · quando NÃO usar · regras · limitações · boas práticas · anti-padrões · estados (default/hover/focus/active/disabled/loading/error/empty) · acessibilidade · variação Desktop vs Mobile.**

**EN** — Before writing a new document or (future) a component, map in prose: **1)** the single question this file answers; **2)** which principles (P#) and tokens it references; **3)** its relation to Desktop vs Mobile (shared or specific?); **4)** what it does NOT cover (boundary with another doc); **5)** anti-patterns it must forbid; **6)** correct and incorrect usage examples; **7)** impact on `CHANGELOG` and version. Every documented component/pattern mandatorily describes: **purpose · when to use · when NOT to use · rules · limitations · best practices · anti-patterns · states (default/hover/focus/active/disabled/loading/error/empty) · accessibility · Desktop vs Mobile variation.**

---

## 9. 🧾 DOCUMENTAÇÃO VIVA — SEM LIXO · LIVING DOCS — NO DEAD WEIGHT

**PT** — Doc descreve o que EXISTE hoje, não é depósito de histórico. Toda versão/ajuste atualiza a doc afetada (as DUAS línguas) na mesma leva. Regra/token/componente removido SAI da doc. Correção terminada não vira "registro de correção" na doc — o histórico mora no `CHANGELOG.md`; a doc mantém só a descrição do estado atual. Spec de fase é andaime temporário: concluída a fase e documentado o "como funciona", a spec sai.

**EN** — Docs describe what EXISTS today; they are not a history dump. Every version/tweak updates the affected doc (BOTH languages) in the same commit. A removed rule/token/component LEAVES the doc. A finished fix does not become a "fix log" in the doc — history lives in `CHANGELOG.md`; the doc keeps only the current-state description. Phase specs are temporary scaffolding: once the phase ships and the "how it works" is documented, the spec is removed.

**Papéis / Roles:** `CHANGELOG.md` = histórico (o que mudou e quando). `docs/` = estado atual (o que existe e como funciona). `docs/context/STUDIO_UX_HANDOFF.md` = índice para re-ancorar entre sessões (a verdade mora no git + arquivos, nunca na memória).

---

## 10. 🚦 SINAIS DE ALARME · RED FLAGS

**PT / EN** — Pare e revise se aparecer: espaçamento/cor/raio fora de token ("valor mágico"); componente novo que já existe em `components/`; Desktop virando Mobile só por media query; jargão técnico renderizado como texto de UI; documento só em uma língua; princípio renumerado; doc guardando histórico de correção; decisão arquitetural dependente de um segmento de negócio; sombra/animação chamando mais atenção que o dado.

---

*Versão do documento / Document version: 1.0.0 — 15/07/2026. Corresponde ao Studio UX `v0.1.0` (fundação documental).*
