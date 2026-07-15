# STUDIO_UX_AI_CONTEXT.md — Contexto para IA · AI Context

> Documento normativo vivo. Responde a: **como uma IA (Claude Code, ChatGPT, ou qualquer outra) constrói uma tela nova que já nasce consistente com o Studio UX?**
> Living normative document. Answers: **how does an AI build a new screen that is born consistent with Studio UX?**
> Governança: `STUDIO_UX.md`. Este é o documento que uma IA deve carregar como contexto ao gerar interfaces.

---

## 0. Leia isto primeiro · Read this first

**PT** — Você (IA) está prestes a construir ou alterar uma interface para um sistema que consome o Studio UX. Sua missão não é ser criativa; é ser **consistente**. Uma tela que parece "de fora da família" é um defeito, mesmo que bonita. Este documento te dá o procedimento e as regras para acertar sem adivinhar.

**EN** — You (the AI) are about to build or change an interface for a system that consumes Studio UX. Your job is not to be creative; it is to be **consistent**. A screen that looks "outside the family" is a defect, even if pretty. This document gives you the procedure and rules to get it right without guessing.

**PT — Regra zero:** se a documentação não cobre um caso, **pare e pergunte** ou escolha a opção mais conservadora (a que mais se parece com o que já existe). Nunca invente um token, um espaçamento ou um componente novo por conta própria.

**EN — Rule zero:** if the docs don't cover a case, **stop and ask** or choose the most conservative option (the one closest to what already exists). Never invent a token, a spacing or a new component on your own.

---

## 1. Ordem de leitura obrigatória · Mandatory reading order

**PT** — Antes de gerar qualquer tela, carregue e respeite, nesta ordem:

1. `STUDIO_UX.md` — regra máxima (governança, política bilíngue, regra máxima de UX).
2. `STUDIO_UX_PRINCIPLES.md` — os princípios numerados P1…P25. São a sua checklist.
3. O produto certo: `desktop/STUDIO_UX_DESKTOP.md` **ou** `mobile/STUDIO_UX_MOBILE.md`. **Nunca os dois na mesma tela.**
4. `tokens/STUDIO_UX_DESIGN_TOKENS.md` (+ COLOR, TYPOGRAPHY, SPACING) — de onde vêm todos os valores.
5. `components/STUDIO_UX_COMPONENT_LIBRARY.md` — o que já existe para reutilizar.
6. `patterns/STUDIO_UX_PATTERNS.md` — como resolver o fluxo (CRUD, busca, wizard…).
7. `STUDIO_UX_LAYOUT_SYSTEM.md`, `STUDIO_UX_ACCESSIBILITY.md`, `STUDIO_UX_ANIMATIONS.md` conforme necessário.

**EN** — Before generating any screen, load and honor, in this order: (1) `STUDIO_UX.md`; (2) `STUDIO_UX_PRINCIPLES.md` (your checklist); (3) the right product doc — Desktop OR Mobile, never both in one screen; (4) the token docs; (5) the component library (reuse first); (6) the patterns doc; (7) layout, accessibility and animation docs as needed.

---

## 2. Procedimento para construir uma tela · Procedure to build a screen

**PT** — Siga este roteiro em prosa antes de produzir qualquer saída:

1. **Qual produto?** Desktop (produtividade) ou Mobile (nativo)? Decide o documento de layout e navegação. Se for os dois, são **duas telas diferentes**, não uma responsiva.
2. **Qual a pergunta única da tela?** (onde/o-que/agora — P6). Defina a ação primária única.
3. **Que padrão resolve o fluxo?** Procure em PATTERNS (CRUD, upload, delete, wizard, login, busca, filtros, paginação, loading, empty, erro, offline, permissões, auditoria). Use o padrão inteiro, não pedaços.
4. **Que componentes já existem?** Monte a tela só com componentes do catálogo (P2, P3). Faltou algo? É pedido de novo componente, não improviso.
5. **Que tokens?** Todo valor (cor, espaço, tipografia, raio, sombra, duração) sai de token (P1, P7). Zero valor literal.
6. **Projete todos os estados** (P14): default, loading (skeleton), vazio (EmptyState), erro (toast), sucesso, muitos dados.
7. **Permissão** (P23): o que o usuário não pode, não aparece habilitado.
8. **Ação destrutiva?** Aplique os cinco (P13). Feedback via toast (P12).
9. **Acessibilidade** (P17–P19): contraste, foco, alvo de toque/teclado, significado não só por cor.
10. **Linguagem do usuário** (P11): nenhum jargão técnico na superfície.

**EN** — Follow this narrative before producing output: (1) which product — Desktop or Mobile? if both, they are two different screens; (2) the screen's single question and single primary action (P6); (3) which pattern solves the flow — use the whole pattern; (4) which components already exist — assemble from the catalog only (P2, P3); (5) which tokens — every value from a token, zero literals (P1, P7); (6) design all states (P14); (7) permission shapes the UI (P23); (8) destructive? apply the five safeguards (P13), feedback via toast (P12); (9) accessibility (P17–P19); (10) user's language, no jargon (P11).

---

## 3. Checklist de autoavaliação · Self-review checklist

**PT** — Antes de entregar, verifique cada item. Um "não" é bug, não estilo:

- [ ] Nenhum valor literal (cor/px/duração) — tudo é token? (P1, P7)
- [ ] Só componentes oficiais; nada inventado? (P2, P3)
- [ ] Desktop e Mobile não foram misturados? (P4)
- [ ] Uma única ação primária; hierarquia clara? (P6)
- [ ] Estados vazio/loading/erro/sucesso projetados? (P14)
- [ ] Erros via toast; destrutivo com os 5? (P12, P13)
- [ ] Contraste, foco, alvo de toque/teclado, cor não é o único sinal? (P17–P19)
- [ ] Zero jargão técnico na superfície? (P11)
- [ ] Nada parece "de fora da família"? (P20)
- [ ] Se documentei algo, fiz nas duas línguas? (§1 governança)

**EN** — Before delivering, verify each item. A "no" is a bug, not a style: no literal values; official components only; Desktop/Mobile not mixed; single primary action; empty/loading/error/success designed; toast errors + 5 safeguards; contrast/focus/target + color not sole cue; zero jargon; nothing looks foreign; anything documented is bilingual.

---

## 4. Como referenciar as regras · How to cite the rules

**PT** — Ao justificar uma decisão (em PR, comentário ou resposta), cite o princípio por número: "usei EmptyState porque P14"; "movi o valor para token por P1". Isso torna a revisão rápida e ensina o próximo (humano ou IA). Se você precisou violar um princípio, **diga qual, por quê, e proponha um ADR** — nunca viole em silêncio.

**EN** — When justifying a decision (in a PR, comment or answer), cite the principle by number: "used EmptyState because P14"; "moved the value to a token per P1". This makes review fast and teaches the next agent (human or AI). If you had to violate a principle, **say which, why, and propose an ADR** — never violate silently.

---

## 5. O que você NÃO deve fazer · What you must NOT do

**PT / EN**

- Inventar tokens, cores, espaçamentos ou componentes. / Invent tokens, colors, spacings or components.
- Copiar layout/código/identidade das referências de estudo (Flux, Zenith, shadcn, Linear, GitHub, Stripe, Vercel, Notion, Figma). Elas são estudo de princípios, nunca fonte de cópia. / Copy layout/code/identity from the study references. They are principle study, never a copy source.
- Transformar Desktop em Mobile com media queries. / Turn Desktop into Mobile with media queries.
- Expor jargão técnico na tela. / Expose technical jargon on screen.
- Entregar tela sem estados de erro/vazio/loading. / Deliver a screen without error/empty/loading states.
- Documentar em uma língua só. / Document in one language only.

---

## 6. Nota sobre a fase atual · Note on the current phase

**PT** — Na versão `v0.1.0`, o Studio UX é **só documentação** — tokens, componentes e telas ainda não foram implementados. Se te pedirem para "usar o componente X" ou "o token Y" antes de eles existirem, avise que estamos na fase de fundação documental e ofereça construir a partir das *especificações* documentadas (o catálogo e a arquitetura de tokens já definem nome, propósito e regras). Ver `STUDIO_UX_ROADMAP.md`.

**EN** — In `v0.1.0`, Studio UX is **documentation only** — tokens, components and screens are not implemented yet. If asked to "use component X" or "token Y" before they exist, note that we are in the documentation-foundation phase and offer to build from the documented *specifications* (the catalog and token architecture already define name, purpose and rules). See `STUDIO_UX_ROADMAP.md`.

---

*Documento vivo. Atualizar sempre que princípios, tokens ou o catálogo mudarem. · Living document. Update whenever principles, tokens or the catalog change.*
