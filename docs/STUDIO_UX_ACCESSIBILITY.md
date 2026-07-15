# STUDIO_UX_ACCESSIBILITY.md — Acessibilidade · Accessibility

> Documento normativo vivo. Responde a: **como o Studio UX garante que toda tela seja usável por todos — por padrão, nascida da fundação, e não remendada no fim?**
> Living normative document. Answers: **how does Studio UX ensure every screen is usable by everyone — by default, born from the foundation, not patched at the end?**
> Governança: `STUDIO_UX.md`. Fundamento filosófico: `STUDIO_UX_PHILOSOPHY.md` §7. Princípios-âncora: P11, P17, P18, P19. Liga com `STUDIO_UX_ANIMATIONS.md`, `tokens/STUDIO_UX_COLOR_SYSTEM.md`, `components/STUDIO_UX_COMPONENT_LIBRARY.md`.

---

## 0. Acessibilidade é fundação, não camada · Accessibility is foundation, not a layer

**PT** — A crença 7 da filosofia é lei aqui: **acessibilidade não é uma camada adicionada no fim; é uma propriedade da fundação.** Contraste, foco visível, alvos de toque, semântica e navegação por teclado nascem nos *tokens* e nos *componentes*, de modo que a tela acessível seja o **resultado natural** de usar o sistema corretamente — e a tela inacessível exija *sair* dele. Isso inverte o ônus: você não "adiciona acessibilidade"; você a herda ao usar os componentes oficiais (P3) e os tokens (P1). Quando alguém precisa lutar para tornar algo acessível, é sinal de que saiu do sistema. Meta declarada: **WCAG 2.1 nível AA**.

**EN** — Philosophy belief 7 is law here: **accessibility is not a layer added at the end; it is a property of the foundation.** Contrast, visible focus, touch targets, semantics and keyboard navigation are born in the *tokens* and *components*, so the accessible screen is the **natural result** of using the system correctly — and the inaccessible screen requires *leaving* it. This inverts the burden: you don't "add accessibility"; you inherit it by using the official components (P3) and tokens (P1). When someone must fight to make something accessible, it's a sign they left the system. Declared target: **WCAG 2.1 level AA**.

**PT** — Acessibilidade também é a que **vence** conflitos (regra de precedência em `STUDIO_UX_PRINCIPLES.md`): acessibilidade e clareza do usuário (P11, P17–P19) > consistência do sistema > densidade/estética. Nunca se sacrifica compreensão por elegância.

**EN** — Accessibility also **wins** conflicts (precedence rule in `STUDIO_UX_PRINCIPLES.md`): accessibility and user clarity (P11, P17–P19) > system consistency > density/aesthetics. User understanding is never sacrificed for elegance.

---

## 1. Contraste · Contrast (P18)

**PT** — Texto e elementos interativos cumprem o contraste mínimo do WCAG AA: **4.5:1** para texto normal, **3:1** para texto grande e para componentes de UI / estados de foco. Isso **nasce dos tokens de cor** (`tokens/STUDIO_UX_COLOR_SYSTEM.md`): cada par texto-sobre-superfície é validado no sistema de cor, para todos os temas (dark e light), antes de virar componente. O designer não escolhe cor "no olho"; escolhe um par de token já aprovado. Contraste insuficiente é bug de token, não de tela.

**EN** — Text and interactive elements meet WCAG AA minimum contrast: **4.5:1** for normal text, **3:1** for large text and for UI components / focus states. This **is born from color tokens** (`tokens/STUDIO_UX_COLOR_SYSTEM.md`): every text-on-surface pair is validated in the color system, across all themes (dark and light), before becoming a component. The designer doesn't pick color "by eye"; they pick an already-approved token pair. Insufficient contrast is a token bug, not a screen bug.

---

## 2. Foco visível · Visible focus (P18)

**PT** — **Todo elemento focável tem foco visível** — sempre, sem exceção. O indicador de foco (um anel/contorno por token) cumpre contraste próprio e nunca é removido "por estética". Remover o outline sem substituto acessível é um dos anti-padrões mais graves do sistema. O foco segue a ordem de leitura (§4) e, em overlays, fica **preso** dentro do overlay ativo (modal/dialog/sheet) e é **devolvido** ao gatilho ao fechar. O foco nasce dos componentes: usar o componente oficial já entrega o anel correto.

**EN** — **Every focusable element has visible focus** — always, no exception. The focus indicator (a ring/outline by token) meets its own contrast and is never removed "for aesthetics". Removing the outline without an accessible replacement is one of the system's gravest anti-patterns. Focus follows the reading order (§4) and, in overlays, is **trapped** inside the active overlay (modal/dialog/sheet) and **returned** to the trigger on close. Focus is born from components: using the official component already delivers the correct ring.

---

## 3. Significado nunca só por cor · Meaning never by color alone (P17)

**PT** — Estado e severidade sempre têm um **segundo sinal** além da cor: ícone, texto, forma ou posição. Um `Badge` de erro traz texto+ícone, não só vermelho; um `Toast` de sucesso traz ícone+texto; a aba ativa das `Tabs` se distingue por peso/indicador, não só por cor; a variação de um `StatCard` mostra sinal e seta, não só verde/vermelho. Isso protege daltônicos, telas ruins e ambientes de alto brilho. **Teste:** em escala de cinza, a informação continua legível?

**EN** — State and severity always carry a **second cue** beyond color: icon, text, shape or position. An error `Badge` carries text+icon, not just red; a success `Toast` carries icon+text; the active `Tabs` tab is distinguished by weight/indicator, not color alone; a `StatCard`'s change shows a sign and arrow, not just green/red. This protects color-blind users, poor screens and high-glare environments. **Test:** in grayscale, is the information still legible?

---

## 4. Semântica, marcos e hierarquia de headings · Semantics, landmarks and heading hierarchy

**PT** — A estrutura é semântica, não visual-only. O shell (`layouts/`) expõe **marcos** por região: navegação, banner (cabeçalho), principal (conteúdo) e rodapé, para que leitores de tela pulem entre elas. A **hierarquia de headings** é lógica e sem saltos (um H1 por tela — o título; H2 para seções; H3 para subseções), refletindo a hierarquia visual (P6), não escolhida por tamanho de fonte. Cada elemento tem o papel (role) certo: botão é botão, link é link, lista é lista, tabela é tabela — nunca uma `div` clicável fingindo ser controle. Rótulos e nomes acessíveis existem em todo controle (o texto visível quando há; aria-label quando é só-ícone).

**EN** — Structure is semantic, not visual-only. The shell (`layouts/`) exposes **landmarks** per region: navigation, banner (header), main (content) and footer, so screen readers jump between them. The **heading hierarchy** is logical and skip-free (one H1 per screen — the title; H2 for sections; H3 for subsections), reflecting the visual hierarchy (P6), not chosen by font size. Every element has the right role: a button is a button, a link a link, a list a list, a table a table — never a clickable `div` faking a control. Accessible labels/names exist on every control (the visible text when present; aria-label when icon-only).

---

## 5. Navegação por teclado · Keyboard navigation (P19)

**PT** — No Desktop, **todo fluxo é operável por teclado** — não é um extra. Regras: (1) **ordem de tabulação** segue a ordem de leitura/hierarquia visual; (2) **Enter/Espaço** ativam controles conforme o papel; (3) **Esc** fecha overlays (Modal, Menu, Popover, Sheet) — a menos que haja dado não salvo, quando confirma antes; (4) **setas** navegam dentro de grupos (Radio, Tabs, Menu, SegmentedControl, grade do DatePicker); (5) **foco preso** dentro de modais/dialogs e **devolvido** ao gatilho ao fechar; (6) **skip link** para pular a navegação e ir ao conteúdo; (7) atalhos (incl. `CommandPalette`) são **aceleradores, nunca o único caminho** — toda ação também é alcançável pela UI visível. Nenhum "buraco" de foco: não há armadilha (foco preso onde não devia) nem elemento interativo inalcançável por teclado.

**EN** — On Desktop, **every flow is keyboard-operable** — not an extra. Rules: (1) **tab order** follows reading/visual hierarchy; (2) **Enter/Space** activate controls per role; (3) **Esc** closes overlays (Modal, Menu, Popover, Sheet) — unless there's unsaved data, when it confirms first; (4) **arrows** navigate within groups (Radio, Tabs, Menu, SegmentedControl, DatePicker grid); (5) **focus trapped** inside modals/dialogs and **returned** to the trigger on close; (6) a **skip link** to jump past navigation to content; (7) shortcuts (incl. `CommandPalette`) are **accelerators, never the sole path** — every action is also reachable via the visible UI. No focus "holes": no trap (focus stuck where it shouldn't be) and no keyboard-unreachable interactive element.

---

## 6. Alvo de toque e gestos · Touch target and gestures (P19)

**PT** — No Mobile, alvos de toque medem **≥ 44×44px**, mesmo quando o glifo é menor (a área de toque é maior que o ícone). Espaçamento suficiente entre alvos evita mis-tap (crítico no `ConfirmDialog`). **Gestos** (deslizar, arrastar) são atalhos, **nunca o único caminho** para uma ação — sempre há um controle visível equivalente (o `Drawer/Sheet` fecha por gesto *e* por botão). Respeita as **áreas seguras** do dispositivo (notch, barra inferior) — daí `100dvh` no layout, não `100vh`.

**EN** — On Mobile, touch targets measure **≥ 44×44px**, even when the glyph is smaller (the touch area exceeds the icon). Enough spacing between targets avoids mis-taps (critical in `ConfirmDialog`). **Gestures** (swipe, drag) are shortcuts, **never the sole path** to an action — there's always an equivalent visible control (the `Drawer/Sheet` closes by gesture *and* by button). Respect device **safe areas** (notch, bottom bar) — hence `100dvh` in the layout, not `100vh`.

---

## 7. Leitores de tela · Screen readers

**PT** — O conteúdo é compreensível sem ver a tela. Além de papéis e nomes (§4): (1) **regiões "live"** anunciam mudanças assíncronas — `Toast` de erro é assertivo, info é polido; loading e resultados de busca são anunciados; (2) imagens/ícones **decorativos** são escondidos do leitor (aria-hidden) e os **informativos** têm texto alternativo; (3) o estado é comunicado (aria-expanded, aria-current, aria-selected, aria-invalid) e não apenas visual; (4) conteúdo que aparece/some (overlays) gerencia o foco para o leitor não se perder; (5) texto de superfície fala a **língua do usuário** (P11) — o leitor nunca soletra um identificador técnico cru. Tempo relativo ("há 2h") sempre tem a **data absoluta** acessível.

**EN** — Content is understandable without seeing the screen. Beyond roles and names (§4): (1) **live regions** announce async changes — an error `Toast` is assertive, info polite; loading and search results are announced; (2) **decorative** images/icons are hidden from the reader (aria-hidden) and **informative** ones have alt text; (3) state is communicated (aria-expanded, aria-current, aria-selected, aria-invalid), not only visual; (4) content that appears/disappears (overlays) manages focus so the reader isn't lost; (5) surface copy speaks the **user's language** (P11) — the reader never spells out a raw technical identifier. Relative time ("2h ago") always has the **absolute date** accessible.

---

## 8. Movimento reduzido · Reduced motion

**PT** — Acessibilidade e motion se ligam: o sistema respeita **`prefers-reduced-motion`** (ver `STUDIO_UX_ANIMATIONS.md`). Quando o usuário pede menos movimento, animações não-essenciais são reduzidas ou substituídas por transições instantâneas/suaves; pulsações de `Skeleton` e giros de `Spinner` se estabilizam. Como o movimento no Studio UX é sempre funcional e discreto (P15), remover a decoração não custa compreensão. Nada de parallax, auto-play agressivo ou animação que possa causar desconforto vestibular.

**EN** — Accessibility and motion connect: the system respects **`prefers-reduced-motion`** (see `STUDIO_UX_ANIMATIONS.md`). When the user asks for less motion, non-essential animations are reduced or replaced by instant/soft transitions; `Skeleton` pulses and `Spinner` spins settle. Since motion in Studio UX is always functional and discreet (P15), removing decoration costs no understanding. No parallax, aggressive auto-play or animation that could cause vestibular discomfort.

---

## 9. Formulários acessíveis · Accessible forms

**PT** — O `FormField` é a garantia de formulário acessível e concentra as regras: (1) **rótulo visível e associado** a cada campo — nunca `placeholder` como rótulo (o placeholder some ao digitar e não é lido de forma confiável); (2) **erro associado** ao campo (aria-describedby) e mostrado junto dele, com texto além de cor (P17), e `aria-invalid` no controle; (3) **dica/descrição** associada; (4) **obrigatoriedade** dita em texto, não só por asterisco/cor; (5) requisitos (regra de senha, formato) ditos **antes** do erro; (6) agrupamentos (Radio, Checkbox) têm rótulo de grupo. A validação de campo vive no FormField; o `Toast` é para o resultado do envio (P12) — os dois não se confundem.

**EN** — `FormField` is the accessible-form guarantee and concentrates the rules: (1) a **visible label associated** with each field — never `placeholder`-as-label (the placeholder vanishes on typing and isn't reliably read); (2) an **associated error** (aria-describedby) shown by the field, with text beyond color (P17), and `aria-invalid` on the control; (3) an associated **hint/description**; (4) **required-ness** stated in text, not only by asterisk/color; (5) requirements (password rule, format) stated **before** the error; (6) groupings (Radio, Checkbox) have a group label. Field validation lives in FormField; `Toast` is for the submit result (P12) — the two don't blur.

---

## 10. Desktop vs Mobile · Desktop vs Mobile

**PT** — A acessibilidade é universal, mas a ênfase difere por produto (P4): no **Desktop**, o teclado é de primeira classe (§5) — tab order, atalhos, Esc, foco preso. No **Mobile**, o alvo de toque e os gestos com alternativa são o foco (§6), além de compatibilidade com os leitores/gestos de acessibilidade nativos do sistema operacional e respeito às áreas seguras. Ambos herdam contraste, foco visível, semântica e "não só cor" dos mesmos tokens e componentes.

**EN** — Accessibility is universal, but emphasis differs per product (P4): on **Desktop**, the keyboard is first-class (§5) — tab order, shortcuts, Esc, focus trap. On **Mobile**, touch targets and gestures-with-alternative are the focus (§6), plus compatibility with the OS's native accessibility readers/gestures and respect for safe areas. Both inherit contrast, visible focus, semantics and "not color-only" from the same tokens and components.

---

## 11. Checklist de verificação · Verification checklist

**PT** — Uma tela/componente só está acessível se **todos** passam (um "não" é bug, não estilo):

- [ ] Contraste AA em texto e controles, nos dois temas? (P18, §1)
- [ ] Todo elemento focável tem foco visível; nenhum outline removido sem substituto? (P18, §2)
- [ ] Nenhuma informação depende só de cor (há ícone/texto/forma)? (P17, §3)
- [ ] Marcos por região, um H1, headings sem salto, papéis corretos? (§4)
- [ ] Fluxo completo por teclado; Esc fecha; foco preso/devolvido em overlays; skip link? (P19, §5)
- [ ] Alvos ≥44px no Mobile; gesto tem alternativa; áreas seguras respeitadas? (P19, §6)
- [ ] Estados anunciados a leitores; decorativo escondido, informativo rotulado; língua do usuário? (P11, §7)
- [ ] `prefers-reduced-motion` respeitado? (§8)
- [ ] Formulários com rótulo associado, erro associado + texto, sem placeholder-como-rótulo? (§9)
- [ ] Documentado nas duas línguas? (governança)

**EN** — A screen/component is only accessible if **all** pass (a "no" is a bug, not a style):

- [ ] AA contrast in text and controls, in both themes? (P18, §1)
- [ ] Every focusable element has visible focus; no outline removed without a replacement? (P18, §2)
- [ ] No information depends on color alone (icon/text/shape present)? (P17, §3)
- [ ] Landmarks per region, one H1, skip-free headings, correct roles? (§4)
- [ ] Full keyboard flow; Esc closes; focus trapped/returned in overlays; skip link? (P19, §5)
- [ ] ≥44px targets on Mobile; gestures have an alternative; safe areas respected? (P19, §6)
- [ ] States announced to readers; decorative hidden, informative labeled; user's language? (P11, §7)
- [ ] `prefers-reduced-motion` respected? (§8)
- [ ] Forms with associated label, associated error + text, no placeholder-as-label? (§9)
- [ ] Documented in both languages? (governance)

---

## 12. Anti-padrões · Anti-patterns

**PT / EN**
- **Foco removido / Focus removed** — tirar o outline "por estética" sem substituto acessível (viola P18, §2).
- **Placeholder como rótulo / Placeholder as label** — o rótulo some ao digitar e não é lido de forma confiável (viola §9).
- **`div` clicável sem papel / Clickable `div` with no role** — um controle que não é botão/link real, invisível ao teclado e ao leitor (viola §4/§5).
- **Cor como único sinal / Color as the only cue** — "vermelho = erro" sem ícone/texto (viola P17, §3).
- **Armadilha ou buraco de foco / Focus trap or hole** — foco preso onde não devia, ou interativo inalcançável por teclado (viola P19, §5).
- **Gesto como único caminho / Gesture as the sole path** — ação só por deslizar, sem controle visível equivalente (viola P19, §6).
- **Tempo só relativo / Relative-only time** — "há 2h" sem data absoluta acessível (viola §7).
- **Alvo pequeno no toque / Small touch target** — abaixo de 44px no Mobile (viola P19, §6).
- **Contraste "quase" / "Almost" contrast** — um par de cor fora de token que passa raspando (viola P1/P18).

---

*Documento vivo. A acessibilidade descrita aqui é o estado que a fundação garante hoje; mudou token, componente ou motion, esta doc muda na mesma leva, nas duas línguas. A meta é WCAG AA — regressão de acessibilidade é bug de release, não detalhe. · Living document. The accessibility described here is what the foundation guarantees today; if a token, component or motion changes, this doc changes in the same commit, in both languages. The target is WCAG AA — an accessibility regression is a release bug, not a detail.*
