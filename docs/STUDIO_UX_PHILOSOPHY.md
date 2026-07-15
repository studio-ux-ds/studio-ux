# STUDIO_UX_PHILOSOPHY.md — Filosofia · Philosophy

> Documento normativo vivo. Responde a: **em que acreditamos sobre design de interface, e por quê?**
> Living normative document. Answers: **what do we believe about interface design, and why?**
> Governança: `STUDIO_UX.md`. Os princípios operacionais e testáveis derivados desta filosofia estão em `STUDIO_UX_PRINCIPLES.md`.

---

## Preâmbulo · Preamble

**PT** — Filosofia não é decoração. Cada crença abaixo existe porque a sua ausência custa caro: em confusão do usuário, em retrabalho, em telas que envelhecem mal. Estas são as convicções que, quando um caso não estiver previsto na documentação, devem guiar a decisão. Se um princípio operacional (P#) parecer conflitar com uma dessas crenças, a crença vence e o princípio é revisto.

**EN** — Philosophy is not decoration. Each belief below exists because its absence is expensive: in user confusion, in rework, in screens that age badly. These are the convictions that, when a case is not covered by the documentation, should guide the decision. If an operational principle (P#) appears to conflict with one of these beliefs, the belief wins and the principle is revised.

---

## 1. A interface serve aos dados, não a si mesma · The interface serves the data, not itself

**PT** — O usuário não vem pela interface; vem pelo que ela permite fazer e ver. Logo, a interface ideal é a que *desaparece*: o olho vai direto ao conteúdo e à ação. Cada elemento cromático, cada sombra, cada animação precisa justificar por que merece roubar atenção do dado. Na dúvida, o enfeite sai. É por isso que adotamos poucas cores, muito espaço em branco, poucas sombras e micro-animações discretas — não por moda minimalista, mas porque **atenção é um orçamento finito e o dado tem prioridade de gasto.**

**EN** — Users don't come for the interface; they come for what it lets them do and see. So the ideal interface *disappears*: the eye goes straight to content and action. Every color, every shadow, every animation must justify why it deserves to steal attention from the data. When in doubt, the ornament goes. This is why we adopt few colors, lots of whitespace, few shadows and discreet micro-animations — not out of minimalist fashion, but because **attention is a finite budget and data has spending priority.**

---

## 2. Consistência é uma funcionalidade · Consistency is a feature

**PT** — Quando o mesmo problema é resolvido do mesmo jeito em todo lugar, o usuário aprende uma vez e aplica para sempre. Cada exceção "criativa" cobra um imposto de reaprendizado. Por isso tratamos consistência como recurso de primeira classe, acima da criatividade pontual: um componente novo que resolve algo que um componente existente já resolve é um bug, não uma contribuição. A família visual é sagrada; nada pode parecer "de fora".

**EN** — When the same problem is solved the same way everywhere, the user learns once and applies forever. Each "creative" exception charges a relearning tax. So we treat consistency as a first-class feature, above one-off creativity: a new component that solves what an existing component already solves is a bug, not a contribution. The visual family is sacred; nothing may look "foreign".

---

## 3. Hierarquia é como se pensa numa tela · Hierarchy is how a screen thinks

**PT** — Uma tela bem feita responde, em ordem e sem esforço, a três perguntas: *onde estou? o que importa aqui? o que faço agora?* Isso é hierarquia visual — construída com tamanho, peso, cor, espaço e posição, não com linhas e caixas. Uma hierarquia impecável elimina a necessidade de instruções. Uma hierarquia confusa nenhuma quantidade de texto de ajuda conserta. O espaço em branco é a principal ferramenta de hierarquia: ele agrupa, separa e respira.

**EN** — A well-made screen answers, in order and effortlessly, three questions: *where am I? what matters here? what do I do now?* That is visual hierarchy — built with size, weight, color, space and position, not with lines and boxes. Impeccable hierarchy removes the need for instructions. Confused hierarchy no amount of help text can fix. Whitespace is the primary hierarchy tool: it groups, separates and breathes.

---

## 4. Sistema antes de tela · System before screen

**PT** — Nenhuma tela é projetada isoladamente. Toda tela é uma composição de peças que já existem no sistema: tokens, componentes e padrões. Isso inverte a ordem tradicional — primeiro se garante que as peças estão certas e consistentes, depois se montam telas. Um espaçamento arbitrário é sintoma de que se pulou o sistema e se foi direto ao pixel. O framework existe justamente para tornar o caminho consistente o caminho *fácil*.

**EN** — No screen is designed in isolation. Every screen is a composition of pieces that already exist in the system: tokens, components and patterns. This inverts the traditional order — first ensure the pieces are correct and consistent, then assemble screens. An arbitrary spacing is a symptom that the system was skipped and the pixel was reached directly. The framework exists precisely to make the consistent path the *easy* path.

---

## 5. A língua da tela é a do usuário · The screen's language is the user's

**PT** — Herdada e elevada do IA Studio: a interface fala a língua do dono do negócio, nunca a do desenvolvedor. Termos técnicos, IDs, chaves e jargão são a linguagem de quem constrói, não de quem usa. O usuário descreve o que quer em palavras humanas; o sistema traduz para os identificadores técnicos por baixo. Isto é filosofia, não só regra de UI: significa que o design existe a serviço da *compreensão do usuário*, e que a complexidade técnica é responsabilidade do sistema esconder, não do usuário decifrar.

**EN** — Inherited and elevated from IA Studio: the interface speaks the business owner's language, never the developer's. Technical terms, IDs, keys and jargon are the language of those who build, not those who use. The user describes what they want in human words; the system translates to the technical identifiers underneath. This is philosophy, not just a UI rule: it means design exists in service of the *user's understanding*, and that hiding technical complexity is the system's responsibility, not the user's to decipher.

---

## 6. Movimento explica; não entretém · Motion explains; it does not entertain

**PT** — Animação tem uma função: dar continuidade e causalidade — mostrar de onde algo veio, para onde foi, que uma ação surtiu efeito. Movimento que só chama atenção é ruído com aparência de sofisticação. Por isso as micro-animações do Studio UX são curtas, discretas e funcionais. A régua: se a animação fosse removida, a compreensão pioraria? Se não, ela não deveria existir.

**EN** — Animation has one job: to give continuity and causality — to show where something came from, where it went, that an action took effect. Motion that merely draws attention is noise disguised as sophistication. That is why Studio UX micro-animations are short, discreet and functional. The test: if the animation were removed, would understanding get worse? If not, it should not exist.

---

## 7. Acessível por padrão, não por remendo · Accessible by default, not by patch

**PT** — Acessibilidade não é uma camada adicionada no fim; é uma propriedade da fundação. Contraste, foco visível, alvos de toque, semântica e navegação por teclado nascem nos tokens e nos componentes, de modo que a tela acessível seja o resultado natural de usar o sistema corretamente — e a tela inacessível exija sair dele. Ver `STUDIO_UX_ACCESSIBILITY.md`.

**EN** — Accessibility is not a layer added at the end; it is a property of the foundation. Contrast, visible focus, touch targets, semantics and keyboard navigation are born in the tokens and components, so that the accessible screen is the natural result of using the system correctly — and the inaccessible screen requires leaving it. See `STUDIO_UX_ACCESSIBILITY.md`.

---

## 8. Menos, mas melhor · Less, but better

**PT** — Prefere-se um conjunto pequeno de componentes muito bem resolvidos a um catálogo enorme e frouxo. Cada adição ao sistema aumenta o custo de manutenção e a superfície de inconsistência. A pergunta antes de criar algo novo não é "isso seria útil?", mas "isso é necessário, e por que o que já existe não basta?". O sistema cresce por necessidade comprovada, não por acumulação.

**EN** — A small set of very well-resolved components is preferred to a huge, loose catalog. Each addition to the system raises maintenance cost and the surface for inconsistency. The question before creating something new is not "would this be useful?" but "is this necessary, and why doesn't what already exists suffice?". The system grows by proven need, not by accumulation.

---

## 9. Durabilidade sobre tendência · Durability over trend

**PT** — O Studio UX é feito para durar anos. Escolhas guiadas por moda envelhecem com a moda. Por isso a estética-base é sóbria e atemporal, e a expressividade fica em camadas de tema/marca, trocáveis sem tocar na fundação. Evoluímos por versão e migração, nunca por reescrita reativa a modismos.

**EN** — Studio UX is built to last years. Choices driven by fashion age with the fashion. So the base aesthetic is sober and timeless, and expressiveness lives in theme/brand layers, swappable without touching the foundation. We evolve by version and migration, never by rewrite reacting to fads.

---

*Documento vivo. Estas crenças mudam raramente; quando mudam, os princípios (P#) e os tokens são revistos junto. · Living document. These beliefs change rarely; when they do, the principles and tokens are revised alongside.*
