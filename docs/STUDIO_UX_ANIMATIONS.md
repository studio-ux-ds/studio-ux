# STUDIO_UX_ANIMATIONS.md — Movimento · Motion

> Documento normativo vivo. Responde a: **qual é a filosofia de movimento do Studio UX, quais tokens governam duração, curva e atraso, e quais micro-interações são permitidas — sempre respeitando quem prefere menos movimento?**
> Living normative document. Answers: **what is Studio UX's motion philosophy, which tokens govern duration, curve and delay, and which micro-interactions are allowed — always respecting those who prefer reduced motion?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PRINCIPLES.md` (P15, P16). Base: `tokens/STUDIO_UX_DESIGN_TOKENS.md`. Acessibilidade: `STUDIO_UX_ACCESSIBILITY.md`.

---

## 1. Filosofia: movimento explica, não entretém · Philosophy: motion explains, it does not entertain

**PT** — O movimento no Studio UX tem **uma função: dar continuidade e causalidade** (P15, `STUDIO_UX_PHILOSOPHY.md` §6). Ele mostra de onde algo veio, para onde foi, e que uma ação surtiu efeito. Animação que só chama atenção é ruído com aparência de sofisticação — e ruído compete com o dado, violando a filosofia do foco no conteúdo (`STUDIO_UX_PHILOSOPHY.md` §1). Por isso as micro-animações são curtas, discretas e funcionais. A régua é objetiva: **se a animação fosse removida, a compreensão pioraria?** Se não, ela não deveria existir. Movimento é o retorno visual mais imediato que o sistema tem (P16); usá-lo para decorar desperdiça uma ferramenta de comunicação.

**EN** — Motion in Studio UX has **one job: to give continuity and causality** (P15, `STUDIO_UX_PHILOSOPHY.md` §6). It shows where something came from, where it went, and that an action took effect. Animation that merely draws attention is noise disguised as sophistication — and noise competes with the data, violating the content-focus philosophy (`STUDIO_UX_PHILOSOPHY.md` §1). So micro-animations are short, discreet and functional. The test is objective: **if the animation were removed, would understanding get worse?** If not, it should not exist. Motion is the most immediate visual feedback the system has (P16); using it to decorate wastes a communication tool.

---

## 2. Tokens de movimento · Motion tokens

**PT** — Todo valor de movimento vem de token (P1); nenhuma duração ou curva é escrita à mão. A família Motion (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §4) tem três eixos:

**EN** — Every motion value comes from a token (P1); no duration or curve is hand-written. The Motion family (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §4) has three axes:

- **Duração / `motion.duration.*`** — uma escala curta e nomeada: `fast` (retorno instantâneo — hover, foco, press), `base` (a transição padrão — troca de estado, entrada de menu), `slow` (movimentos maiores e mais raros — um painel que desliza). Os valores concretos em ms são materializados na Fase 2 (`STUDIO_UX_ROADMAP.md`); a arquitetura fixa que são **poucos degraus** e que o teto é baixo — nada de movimento longo que atrasa a tarefa (§7).
- **Curva / `motion.easing.*`** — curvas de easing nomeadas por função: `standard` (a maioria das transições de estado), `entrance` (algo que aparece, desacelerando ao chegar), `exit` (algo que sai, acelerando ao partir). Curvas comunicam física: entrada e saída não usam a mesma curva porque não são o mesmo evento.
- **Atraso / `motion.delay.*`** — atrasos discretos, usados com parcimônia (ex.: escalonar levemente a entrada de itens de uma lista para dar ordem de leitura). Atraso nunca é usado para "segurar" o usuário.

**PT** — A família **Transitions** (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §4) monta combinações prontas de propriedade + duração + easing para os estados interativos comuns, de modo que "a transição de hover de um botão" seja um token composto, não três valores soltos repetidos em cada componente.

**EN** — The **Transitions** family (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §4) assembles ready combinations of property + duration + easing for the common interactive states, so that "a button's hover transition" is a composite token, not three loose values repeated in every component.

---

## 3. Continuidade e causalidade · Continuity and causality

**PT** — Dois princípios de física visual guiam cada animação. **Continuidade:** um elemento que se transforma deve parecer *o mesmo elemento* mudando, não um desaparecer e outro surgir — um item que se expande cresce a partir de si, um painel que abre desliza de sua origem. Isso preserva o modelo mental do usuário sobre "onde as coisas estão". **Causalidade:** todo movimento tem uma causa visível e um efeito visível — o usuário clica (causa) e algo se move em resposta (efeito), tornando óbvio que o sistema recebeu a ação (P16). Movimento sem causa (algo que se mexe sozinho) ou sem continuidade (transições que teleportam elementos) confunde em vez de explicar, e por isso é proibido.

**EN** — Two principles of visual physics guide every animation. **Continuity:** an element that transforms should look like *the same element* changing, not one vanishing and another appearing — an item that expands grows from itself, a panel that opens slides from its origin. This preserves the user's mental model of "where things are". **Causality:** every motion has a visible cause and a visible effect — the user clicks (cause) and something moves in response (effect), making it obvious the system received the action (P16). Motion with no cause (something moving on its own) or no continuity (transitions that teleport elements) confuses instead of explaining, and is therefore forbidden.

---

## 4. Catálogo de micro-interações permitidas · Catalog of allowed micro-interactions

**PT** — O movimento é restrito a um catálogo fechado de micro-interações funcionais. Cada uma tem uma função de comunicação; nenhuma é decorativa:

**EN** — Motion is restricted to a closed catalog of functional micro-interactions. Each has a communication function; none is decorative:

- **Hover** (Desktop) — resposta sutil ao ponteiro sobre um alvo interativo, sinalizando "isto é clicável". Duração `fast`, mudança discreta (superfície/cor via token).
- **Focus** — o anel de foco aparece de forma imediata e visível (P18); a transição é `fast`, nunca lenta o bastante para atrasar a navegação por teclado.
- **Press / active** — retorno tátil-visual ao pressionar (leve recuo/mudança de estado), confirmando o toque ou clique (P16).
- **Entrada/saída de overlay** — toast, modal, popover e menu entram com `entrance` e saem com `exit`, deslizando/esvanecendo a partir de sua origem (continuidade, §3).
- **Transição de estado** — mudança entre estados de um mesmo componente (ex.: um switch, uma aba selecionada) animada com `base` para mostrar que é a mesma coisa mudando.
- **Skeleton / loading** — o estado de carregamento (P14, P16) usa um movimento discreto e contínuo que comunica "trabalhando", nunca uma animação chamativa.

**PT** — O que **não** está no catálogo não é permitido sem virar uma decisão de governança (ADR): o sistema cresce por necessidade comprovada (`STUDIO_UX_PHILOSOPHY.md` §8), inclusive em movimento.

**EN** — What is **not** in the catalog is not allowed without becoming a governance decision (ADR): the system grows by proven need (`STUDIO_UX_PHILOSOPHY.md` §8), motion included.

---

## 5. Respeito a prefers-reduced-motion (obrigatório) · Respecting prefers-reduced-motion (mandatory)

**PT** — Respeitar `prefers-reduced-motion` é **obrigatório**, não opcional (P15, `STUDIO_UX_ACCESSIBILITY.md`). Quando o usuário sinaliza preferência por menos movimento — por vestibular, enxaqueca, distração ou escolha — o sistema substitui as animações de deslocamento por transições mínimas (um esvanecer curto) ou por nenhuma, **sem nunca remover o retorno funcional**: o usuário que reduz movimento continua recebendo confirmação de que sua ação surtiu efeito (P16), só que sem o deslocamento. Como o movimento vem de tokens (§2), essa adaptação é uma regra do sistema aplicada de uma vez, não um retrabalho por tela. Movimento essencial à compreensão degrada para a forma mais discreta possível; movimento decorativo (que não deveria existir de qualquer modo, §1) simplesmente some.

**EN** — Respecting `prefers-reduced-motion` is **mandatory**, not optional (P15, `STUDIO_UX_ACCESSIBILITY.md`). When the user signals a preference for reduced motion — for vestibular reasons, migraine, distraction or choice — the system replaces displacement animations with minimal transitions (a short fade) or none, **without ever removing functional feedback**: the reduced-motion user still receives confirmation that their action took effect (P16), just without the displacement. Because motion comes from tokens (§2), this adaptation is a system rule applied at once, not per-screen rework. Motion essential to understanding degrades to the most discreet form possible; decorative motion (which shouldn't exist anyway, §1) simply disappears.

---

## 6. Desktop vs. Mobile · Desktop vs. Mobile

**PT** — Desktop e Mobile **compartilham** os tokens de movimento — as mesmas durações e curvas são identidade (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §7). O que difere é o **repertório de gatilhos**, porque a interação física difere (P4, P21). O **Desktop** tem ponteiro e teclado: existe estado de **hover** e o foco por teclado é central; as transições podem ser um pouco mais rápidas, servindo à produtividade. O **Mobile** é toque e gesto: **não há hover** (não se anima o que não existe), o retorno de **press** e o feedback tátil-visual ganham peso, e o movimento acompanha gestos diretos (arrastar, deslizar) com continuidade. O mesmo token `motion.duration.base` serve aos dois; o *quando* ele dispara é do produto. Nunca se porta o hover do Desktop para o Mobile por descuido.

**EN** — Desktop and Mobile **share** the motion tokens — the same durations and curves are identity (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §7). What differs is the **trigger repertoire**, because physical interaction differs (P4, P21). **Desktop** has pointer and keyboard: **hover** state exists and keyboard focus is central; transitions may be slightly faster, serving productivity. **Mobile** is touch and gesture: **there is no hover** (don't animate what doesn't exist), **press** feedback and tactile-visual response carry more weight, and motion follows direct gestures (drag, swipe) with continuity. The same `motion.duration.base` token serves both; the *when* it fires belongs to the product. Desktop hover is never ported to Mobile by oversight.

---

## 7. Regras, limitações e anti-padrões · Rules, limitations and anti-patterns

**PT — Regras e limitações:**

- Toda duração/curva/atraso vem de token (P1); zero valor cru.
- Movimento é curto e discreto; o teto de duração é baixo — a tarefa nunca espera a animação (P15, P16).
- Só o catálogo do §4 é permitido; o resto vira ADR.
- `prefers-reduced-motion` é obrigatório e nunca remove o retorno funcional (§5).
- Movimento nunca é o único sinal de um estado (par com cor+ícone+texto — P17).

**EN — Rules and limitations:**

- Every duration/curve/delay comes from a token (P1); zero raw values.
- Motion is short and discreet; the duration ceiling is low — the task never waits for the animation (P15, P16).
- Only the §4 catalog is allowed; the rest becomes an ADR.
- `prefers-reduced-motion` is mandatory and never removes functional feedback (§5).
- Motion is never the sole cue of a state (pair with color+icon+text — P17).

**PT — Anti-padrões:**

- **Animação longa** — transições que fazem o usuário esperar para agir (viola P16).
- **Movimento decorativo** — animação que não explica nada, só "impressiona" (viola P15, §1).
- **Parallax gratuito** — deslocamento por profundidade sem função de continuidade.
- **Movimento que atrasa a tarefa** — splash, delays artificiais, "carregando" mais lento que o necessário.
- **Duração/curva crua** — `0.3s ease-in-out` à mão (viola P1).
- **Ignorar reduced-motion** — animar deslocamento para quem pediu menos movimento (viola P15, §5).
- **Hover no Mobile** — animar um estado que o toque não produz (viola P4).

**EN — Anti-patterns:**

- **Long animation** — transitions that make the user wait to act (violates P16).
- **Decorative motion** — animation that explains nothing, only "impresses" (violates P15, §1).
- **Gratuitous parallax** — depth displacement with no continuity function.
- **Motion that delays the task** — splash screens, artificial delays, "loading" slower than needed.
- **Raw duration/curve** — a hand-set `0.3s ease-in-out` (violates P1).
- **Ignoring reduced-motion** — animating displacement for someone who asked for less (violates P15, §5).
- **Hover on Mobile** — animating a state touch doesn't produce (violates P4).

**PT — Governança (SemVer, `STUDIO_UX.md` §7):** novos tokens de motion ou uma nova micro-interação no catálogo são adição **MINOR**; remover ou renomear um token de motion é **MAJOR**. Os valores concretos (ms e curvas) são materializados na Fase 2. Ampliar o catálogo do §4 exige um ADR curto que prove a função de comunicação da nova interação.

**EN — Governance (SemVer, `STUDIO_UX.md` §7):** new motion tokens or a new catalog micro-interaction are a **MINOR** addition; removing or renaming a motion token is **MAJOR**. Concrete values (ms and curves) are materialized in Phase 2. Expanding the §4 catalog requires a short ADR proving the new interaction's communication function.

---

*Documento vivo. A filosofia e os tokens de motion entram aqui; os valores concretos são materializados na Fase 2. Atualizar nas duas línguas na mesma leva. · Living document. The motion philosophy and tokens enter here; concrete values are materialized in Phase 2. Update in both languages in the same commit.*
