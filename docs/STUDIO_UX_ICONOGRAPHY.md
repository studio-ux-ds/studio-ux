# STUDIO_UX_ICONOGRAPHY.md — Iconografia · Iconography

> Documento normativo vivo. Responde a: **qual é o papel do ícone no Studio UX, como o estilo, os tamanhos e as metáforas se mantêm consistentes, e quando um ícone pode aparecer sozinho?**
> Living normative document. Answers: **what is the icon's role in Studio UX, how do style, sizes and metaphors stay consistent, and when may an icon appear alone?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PRINCIPLES.md` (P8, P17, P20). Tamanhos: `tokens/STUDIO_UX_TYPOGRAPHY.md`, `tokens/STUDIO_UX_SPACING.md`. Acessibilidade: `STUDIO_UX_ACCESSIBILITY.md`.

---

## 1. O papel do ícone · The icon's role

**PT** — No Studio UX o ícone **reforça o significado; não o substitui e não decora** (P17, P8). Um ícone bem escolhido acelera o reconhecimento — o olho identifica "salvar", "excluir" ou "erro" antes de ler a palavra — mas ele trabalha *com* o texto, não no lugar dele. A interface serve aos dados (`STUDIO_UX_PHILOSOPHY.md` §1); um ícone que compete com o conteúdo por atenção, ou que existe só para "enfeitar" uma tela, viola a filosofia do foco no dado tanto quanto uma cor decorativa. A régua é a mesma do movimento (P15): se remover o ícone não piora a compreensão nem a velocidade de reconhecimento, ele provavelmente sobra.

**EN** — In Studio UX the icon **reinforces meaning; it does not replace it and does not decorate** (P17, P8). A well-chosen icon speeds recognition — the eye spots "save", "delete" or "error" before reading the word — but it works *with* text, not instead of it. The interface serves the data (`STUDIO_UX_PHILOSOPHY.md` §1); an icon that competes with content for attention, or exists just to "prettify" a screen, violates the data-focus philosophy as much as a decorative color does. The rule mirrors motion (P15): if removing the icon doesn't hurt understanding or recognition speed, it is probably excess.

---

## 2. Ícone + rótulo é o padrão · Icon + label is the default

**PT** — Por padrão, **todo ícone de ação anda com um rótulo de texto** (P17). O ícone sozinho é ambíguo com mais frequência do que se imagina: o mesmo desenho significa coisas diferentes em contextos diferentes, e metáforas "óbvias" para quem construiu não o são para quem usa. O par ícone+rótulo dá o reconhecimento rápido do ícone *e* a certeza do texto, e ainda respeita a regra máxima de UX (P11, `STUDIO_UX.md` §6): a palavra fala a língua do usuário. Este é o caminho seguro e o default do sistema; o ícone solitário é a exceção justificada (§5), não a regra.

**EN** — By default, **every action icon travels with a text label** (P17). The lone icon is ambiguous more often than assumed: the same glyph means different things in different contexts, and metaphors "obvious" to the builder aren't to the user. The icon+label pair gives the icon's fast recognition *and* the text's certainty, and it honors the supreme UX rule (P11, `STUDIO_UX.md` §6): the word speaks the user's language. This is the safe path and the system default; the solitary icon is the justified exception (§5), not the rule.

---

## 3. Estilo consistente · Consistent style

**PT** — Um conjunto de ícones só parece do mesmo sistema (P20) se compartilhar um **estilo único e explícito**. O Studio UX fixa a arquitetura do estilo; os desenhos concretos são curados na Fase 2 (`STUDIO_UX_ROADMAP.md`):

**EN** — A set of icons only looks like it belongs to the same system (P20) if it shares a **single, explicit style**. Studio UX fixes the style architecture; the concrete glyphs are curated in Phase 2 (`STUDIO_UX_ROADMAP.md`):

- **Grade única.** Todos os ícones são desenhados sobre a mesma grade (ex.: uma grade de 24 unidades) com a mesma área de segurança, para que o "peso visual" seja uniforme.
- **Peso de traço consistente.** Um estilo de contorno (line) ou preenchido (solid) coerente, com a mesma espessura de traço relativa em todos — nunca misturar dois estilos na mesma tela (§7).
- **Alinhamento óptico.** Ícones são alinhados ao texto e entre si pelo *centro óptico*, não só pela caixa geométrica — um triângulo "play" é deslocado para parecer centrado ao olho.
- **Cantos e terminações consistentes** — o mesmo tratamento de raio e de ponta de traço em toda a biblioteca, ecoando a escala de raio do sistema (P10).

**PT** — Consistência de estilo é o que permite um ícone novo entrar sem parecer "de fora da família". Um ícone importado de outra biblioteca, com outro peso de traço ou outra grade, é o equivalente icônico do valor mágico (P7): parece próximo, mas quebra a família.

**EN** — Style consistency is what lets a new icon enter without looking "outside the family". An icon imported from another library, with a different stroke weight or grid, is the iconic equivalent of the magic value (P7): it looks close, but breaks the family.

---

## 4. Tamanhos como tokens · Sizes as tokens

**PT** — O tamanho do ícone é **token**, não valor cru (P1), e é derivado da tipografia e do espaçamento para que ícone e texto compartilhem o ritmo. Prevê-se uma pequena escala nomeada — `icon.size.sm`, `icon.size.md`, `icon.size.lg` — em que cada degrau se alinha a um papel tipográfico (um ícone inline num rótulo `body.md` usa `icon.size.md`, casando com a altura da letra) e a um degrau da escala de espaçamento (`tokens/STUDIO_UX_SPACING.md`). Assim um ícone ao lado de um texto nunca fica maior nem menor que o esperado — o par ícone+rótulo mantém o alinhamento óptico automaticamente. O espaço entre o ícone e o rótulo é um `space.inline.*` (§4 de SPACING), nunca um valor à mão.

**EN** — Icon size is a **token**, not a raw value (P1), derived from typography and spacing so icon and text share the rhythm. A small named scale is planned — `icon.size.sm`, `icon.size.md`, `icon.size.lg` — where each step aligns to a typographic role (an inline icon in a `body.md` label uses `icon.size.md`, matching the letter height) and to a spacing step (`tokens/STUDIO_UX_SPACING.md`). So an icon beside text is never larger or smaller than expected — the icon+label pair keeps optical alignment automatically. The space between icon and label is a `space.inline.*` (SPACING §4), never a hand-set value.

**PT** — A cor do ícone também vem de token: um ícone de UI usa um papel de texto (`color.text.secondary` para ícones de apoio, `color.text.primary` para ênfase) e um ícone de status usa o `foreground` do seu papel (`color.status.danger.foreground`), sempre acompanhado do segundo sinal (P17, `tokens/STUDIO_UX_COLOR_SYSTEM.md` §6).

**EN** — Icon color also comes from a token: a UI icon uses a text role (`color.text.secondary` for support icons, `color.text.primary` for emphasis) and a status icon uses its role's `foreground` (`color.status.danger.foreground`), always paired with the second cue (P17, `tokens/STUDIO_UX_COLOR_SYSTEM.md` §6).

---

## 5. Quando um ícone pode aparecer sozinho · When an icon may appear alone

**PT** — O ícone solitário é permitido apenas quando **três condições** se cumprem juntas:

**EN** — A solitary icon is allowed only when **three conditions** hold together:

1. **A metáfora é universal e inequívoca** no contexto (fechar `×`, busca, menu, voltar) — não uma metáfora "criativa" ou específica de domínio.
2. **Há um rótulo acessível** (`aria-label`) que dá o nome ao leitor de tela e à navegação por teclado — o ícone nunca é mudo para a tecnologia assistiva (P17, P18, `STUDIO_UX_ACCESSIBILITY.md`).
3. **O alvo cumpre o mínimo de toque/clique** (≥ 44×44px no Mobile — P19), com a área clicável maior que o desenho.

**PT** — Quando a metáfora não é universal, ou quando a ação é destrutiva ou rara, o rótulo de texto volta a ser obrigatório: uma ação de excluir (P13) nunca é só uma lixeira solta. Na dúvida entre solitário e com rótulo, o sistema prefere o rótulo — o custo de um texto a mais é baixo; o custo de um ícone mal interpretado numa ação séria é alto.

**EN** — When the metaphor is not universal, or when the action is destructive or rare, the text label becomes mandatory again: a delete action (P13) is never just a loose trash can. When in doubt between solitary and labeled, the system prefers the label — the cost of one more word is low; the cost of a misread icon on a serious action is high.

---

## 6. Consistência de metáforas e a biblioteca curada · Metaphor consistency and the curated library

**PT** — Uma metáfora, um significado. Se `+` significa "adicionar", ele significa isso em toda a interface; um mesmo conceito não recebe dois ícones diferentes em telas diferentes (P2 — um problema, uma solução, aplicado ao vocabulário visual). Por isso os ícones vivem numa **biblioteca curada** em `assets/icons/` — não são baixados avulsos por tela. A biblioteca é a fonte única: cada ícone entra com nome semântico em inglês (`icon.trash`, `icon.search`, `icon.chevron-right`), estilo conforme (§3) e um significado documentado. Adicionar um ícone é um ato de curadoria governado (SemVer, `STUDIO_UX.md` §7): avalia-se se a biblioteca já cobre o conceito antes de desenhar um novo, evitando sinônimos visuais que confundem.

**EN** — One metaphor, one meaning. If `+` means "add", it means that across the whole interface; the same concept never gets two different icons on different screens (P2 — one problem, one solution, applied to the visual vocabulary). So icons live in a **curated library** at `assets/icons/` — they are not downloaded ad hoc per screen. The library is the single source: each icon enters with a semantic English name (`icon.trash`, `icon.search`, `icon.chevron-right`), conformant style (§3) and a documented meaning. Adding an icon is a governed curation act (SemVer, `STUDIO_UX.md` §7): check whether the library already covers the concept before drawing a new one, avoiding visual synonyms that confuse.

---

## 7. Boas práticas e anti-padrões · Best practices and anti-patterns

**PT — Boas práticas:**

- Padrão ícone+rótulo; solitário só sob as três condições (§5).
- Um estilo, uma grade, um peso de traço em toda a tela (§3).
- Tamanho e cor sempre por token, alinhados à tipografia (§4).
- Uma metáfora por significado; puxar da biblioteca curada, não da web (§6).
- Todo ícone acionável tem `aria-label` e alvo de toque conforme (P18, P19).

**EN — Best practices:**

- Default icon+label; solitary only under the three conditions (§5).
- One style, one grid, one stroke weight across the screen (§3).
- Size and color always from tokens, aligned to typography (§4).
- One metaphor per meaning; pull from the curated library, not the web (§6).
- Every actionable icon has an `aria-label` and a conformant touch target (P18, P19).

**PT — Anti-padrões:**

- **Ícone ambíguo sozinho** — glifo solitário com metáfora não universal e sem rótulo (viola P17).
- **Misturar estilos** — line e solid, ou duas bibliotecas, na mesma tela (viola P20).
- **Ícone decorativo competindo com o dado** — glifo sem função roubando atenção do conteúdo (viola P8 e a filosofia do foco no dado).
- **Tamanho/cor crus** — `width: 18px` ou `#333` à mão num ícone (viola P1).
- **Sinônimo visual** — dois ícones para o mesmo conceito, ou o mesmo ícone para dois conceitos (viola P2).
- **Ícone mudo para assistiva** — ícone acionável sem `aria-label` (viola P18).

**EN — Anti-patterns:**

- **Ambiguous lone icon** — a solitary glyph with a non-universal metaphor and no label (violates P17).
- **Mixing styles** — line and solid, or two libraries, on the same screen (violates P20).
- **Decorative icon competing with the data** — a functionless glyph stealing attention from content (violates P8 and the data-focus philosophy).
- **Raw size/color** — a hand-set `width: 18px` or `#333` on an icon (violates P1).
- **Visual synonym** — two icons for one concept, or one icon for two concepts (violates P2).
- **Icon mute to assistive tech** — an actionable icon with no `aria-label` (violates P18).

---

*Documento vivo. O sistema de iconografia entra aqui; os desenhos concretos são curados na Fase 2. Atualizar nas duas línguas na mesma leva. · Living document. The iconography system enters here; concrete glyphs are curated in Phase 2. Update in both languages in the same commit.*
