# Studio UX

> O Framework de Experiência do Usuário oficial da empresa.
> The company's official User Experience Framework.

**PT** — Studio UX é a base única sobre a qual todos os sistemas da empresa constroem suas interfaces. Não é um template: é um **produto independente, versionado e governado**, composto por dois frameworks irmãos que compartilham identidade visual, princípios e design tokens — mas **nunca** compartilham layouts.

**EN** — Studio UX is the single foundation on which every company system builds its interfaces. It is not a template: it is an **independent, versioned, governed product**, made of two sibling frameworks that share visual identity, principles and design tokens — but **never** share layouts.

| Produto · Product | Foco · Focus |
|---|---|
| **Studio UX Desktop** | Produtividade, densidade de informação, teclado e mouse. / Productivity, information density, keyboard & mouse. |
| **Studio UX Mobile** | Experiência nativa, toque, gestos, offline. / Native experience, touch, gestures, offline. |

## Estado atual · Current status

- **Versão / Version:** `v0.1.0`
- **Fase / Phase:** Fase 1 — Fundação Conceitual e Documental. **Somente documentação; nenhum componente, token final ou tela foi implementado ainda.** / Phase 1 — Conceptual & Documentation Foundation. **Documentation only; no components, final tokens or screens implemented yet.**
- **Idioma / Language:** Bilíngue PT-BR + EN em toda a documentação normativa. / Bilingual PT-BR + EN across all normative docs.

## Comece por aqui · Start here

1. **`STUDIO_UX.md`** — a regra máxima do produto (governança, versionamento, política bilíngue). / the product's supreme rule.
2. **`docs/STUDIO_UX_VISION.md`** — o que é o produto e por que existe. / what the product is and why it exists.
3. **`docs/STUDIO_UX_PHILOSOPHY.md`** e **`docs/STUDIO_UX_PRINCIPLES.md`** — a filosofia e os princípios numerados (P1…Pn). / the philosophy and the numbered principles.
4. **`docs/context/STUDIO_UX_AI_CONTEXT.md`** — como uma IA constrói telas consistentes com o Studio UX. / how an AI builds screens consistent with Studio UX.

## Mapa da documentação · Documentation map

```
Conceito / Concept      → VISION · PHILOSOPHY · PRINCIPLES · AI_CONTEXT
Fundação / Foundation   → DESIGN_TOKENS · COLOR_SYSTEM · TYPOGRAPHY · SPACING
                          THEMES · ICONOGRAPHY · ANIMATIONS
Estrutura / Structure   → LAYOUT_SYSTEM · COMPONENT_LIBRARY · PATTERNS · ACCESSIBILITY
Produtos / Products     → DESKTOP · MOBILE
Evolução / Evolution    → ROADMAP · CHANGELOG · HANDOFF
```

## Como um sistema usa o Studio UX · How a system consumes Studio UX

**PT** — Um sistema (Aquapark, IA Studio, ERP, CRM, Portal do Cliente) **declara** a versão e o produto que consome — por exemplo, "IA Studio Painel → Studio UX Desktop `v1.x`". Ele nunca edita o framework; apenas o consome. Atualizações MAJOR são adotadas deliberadamente, seguindo o guia de migração da versão.

**EN** — A system (Aquapark, IA Studio, ERP, CRM, Customer Portal) **declares** the product and version it consumes — e.g. "IA Studio Panel → Studio UX Desktop `v1.x`". It never edits the framework; it only consumes it. MAJOR upgrades are adopted deliberately, following that version's migration guide.

## Princípios em uma frase · Principles in one line

> A interface nunca chama mais atenção que os dados. Poucas cores, muito espaço em branco, hierarquia impecável, consistência absoluta.
> The interface never draws more attention than the data. Few colors, lots of whitespace, impeccable hierarchy, absolute consistency.

## Licença e governança · License & governance

Produto interno versionado por SemVer, com tags git imutáveis e ADRs por decisão. Ver `STUDIO_UX.md` §7 e `CHANGELOG.md`. / Internal product versioned via SemVer, with immutable git tags and per-decision ADRs. See `STUDIO_UX.md` §7 and `CHANGELOG.md`.
