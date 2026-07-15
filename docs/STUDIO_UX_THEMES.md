# STUDIO_UX_THEMES.md — Temas · Themes

> Documento normativo vivo. Responde a: **como um tema troca a aparência de toda a interface sem tocar em nenhuma tela, quais são os eixos de tema, e por que o tema muda só cor e superfície — nunca estrutura?**
> Living normative document. Answers: **how does a theme swap the whole interface's appearance without touching any screen, what are the theme axes, and why does a theme change only color and surface — never structure?**
> Governança: `STUDIO_UX.md`. Fundamento: `STUDIO_UX_PRINCIPLES.md` (P1, P4, P8, P18). Base: `tokens/STUDIO_UX_DESIGN_TOKENS.md`, `tokens/STUDIO_UX_COLOR_SYSTEM.md`.

---

## 1. O que é um tema no Studio UX · What a theme is in Studio UX

**PT** — Um tema é uma **reescrita da camada semântica de tokens** (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §2, §6), não uma reescrita de telas. A arquitetura de três camadas existe precisamente para isto: a tela pede `color.text.primary` e `color.surface.base`; o tema decide para quais primitivos esses papéis apontam. Trocar o tema é reapontar a camada semântica sobre os mesmos primitivos (ou sobre uma paleta primitiva alternativa) — e a interface inteira acompanha sem que uma única tela ou componente seja editado. Esta é a prova de fogo da arquitetura de tokens: se trocar o tema exige tocar numa tela, a arquitetura foi violada (P1).

**EN** — A theme is a **rewrite of the semantic token layer** (`tokens/STUDIO_UX_DESIGN_TOKENS.md` §2, §6), not a rewrite of screens. The three-layer architecture exists precisely for this: the screen asks for `color.text.primary` and `color.surface.base`; the theme decides which primitives those roles point to. Swapping the theme is repointing the semantic layer over the same primitives (or over an alternative primitive palette) — and the whole interface follows without a single screen or component being edited. This is the acid test of the token architecture: if swapping the theme requires touching a screen, the architecture was violated (P1).

---

## 2. Os eixos de tema · The theme axes

**PT** — O Studio UX prevê temas em eixos independentes que se combinam. Cada eixo altera apenas o mapeamento semântico de aparência; nenhum altera estrutura, layout ou espaçamento (§5).

**EN** — Studio UX plans themes on independent axes that combine. Each axis alters only the semantic appearance mapping; none alters structure, layout or spacing (§5).

- **Modo claro / escuro (obrigatório).** Todo produto Studio UX suporta **os dois modos** como cidadãos de primeira classe — o escuro não é um extra. Ambos são o mesmo conjunto de papéis semânticos apontando para passos diferentes da escala de tom (`tokens/STUDIO_UX_COLOR_SYSTEM.md` §4). Nenhuma tela conhece o modo ativo.
- **Tema de marca / white-label (trocável).** A identidade cromática — a paleta primitiva sob os papéis semânticos — é uma camada trocável. Um mesmo sistema pode vestir a marca de vários clientes reapontando os papéis de ação/superfície para a paleta de cada um, sem alterar componente algum (§4).
- **Densidade** (quando aplicável). Não é um tema de cor, mas partilha o mecanismo: é a dimensão de espaçamento contextual entre Desktop e Mobile (P21, `tokens/STUDIO_UX_SPACING.md` §6). Trata-se aqui só para deixar claro que densidade **não** é papel do tema de marca — um tema de marca nunca aperta ou afrouxa o espaço.

**PT** — Os eixos são ortogonais: "marca do Cliente A" + "modo escuro" é uma combinação válida, resolvida pela composição dos mapeamentos, não por um tema monolítico por combinação.

**EN** — The axes are orthogonal: "Client A brand" + "dark mode" is a valid combination, resolved by composing the mappings, not by a monolithic theme per combination.

---

## 3. Modo claro e escuro obrigatórios · Mandatory light and dark

**PT** — Claro e escuro são requisito, não opção. Cada papel semântico de cor deve ter um mapeamento válido nos dois modos, e cada par texto-sobre-superfície deve cumprir a meta WCAG AA em ambos (P18, §6). O escuro não é o claro com um filtro invertido: a elevação, no escuro, comunica-se **clareando a superfície** (uma superfície que sobe fica mais clara, não mais sombreada), e a saturação dos destaques é reduzida para não vibrar sobre fundo escuro (`tokens/STUDIO_UX_COLOR_SYSTEM.md` §4). Como o mapeamento é semântico, toda tela e todo componente feitos corretamente já nascem funcionando nos dois modos — a tela que só funciona no claro é a tela que fugiu dos tokens.

**EN** — Light and dark are a requirement, not an option. Every semantic color role must have a valid mapping in both modes, and every text-on-surface pair must meet the WCAG AA target in both (P18, §6). Dark is not light with an inverted filter: in dark, elevation communicates by **lightening the surface** (a rising surface gets lighter, not more shadowed), and accent saturation is reduced so it doesn't vibrate on a dark ground (`tokens/STUDIO_UX_COLOR_SYSTEM.md` §4). Because the mapping is semantic, every correctly-built screen and component is born working in both modes — the screen that only works in light is the screen that escaped the tokens.

---

## 4. Marca e white-label multi-tenant · Brand and multi-tenant white-label

**PT** — Sistemas multi-tenant como o **IA Studio** precisam apresentar a marca de cada organização/cliente sem manter uma cópia da interface por marca. A camada de tema resolve isso: a **paleta de marca** (o matiz de ação, os tons de destaque, eventualmente a família tipográfica — `tokens/STUDIO_UX_TYPOGRAPHY.md` §4) é um conjunto de primitivos que os papéis semânticos passam a apontar por tenant. O componente `Button` continua pedindo `color.action.primary`; o que muda é para onde `color.action.primary` aponta na organização ativa. Assim um único código de interface veste N marcas, cada uma consistente consigo mesma e com o sistema. Regras do white-label:

**EN** — Multi-tenant systems like **IA Studio** need to present each organization/client's brand without keeping one copy of the interface per brand. The theme layer solves this: the **brand palette** (the action hue, the accent tones, possibly the type family — `tokens/STUDIO_UX_TYPOGRAPHY.md` §4) is a set of primitives that the semantic roles now point to per tenant. The `Button` component keeps asking for `color.action.primary`; what changes is where `color.action.primary` points in the active organization. So a single interface codebase dresses N brands, each consistent with itself and with the system. White-label rules:

**PT**

- **A marca troca cor e forma de destaque; nunca estrutura.** Um tenant não ganha um layout diferente, um espaçamento diferente ou um componente diferente — só a sua paleta (§5).
- **Todo tema de marca revalida contraste.** Uma marca cujos tons quebram o AA em algum par é rejeitada ou ajustada antes de publicar — o sistema não aceita uma marca inacessível "porque é a cor do cliente" (P18, §6).
- **A marca viaja como dado de configuração**, não como código: é um conjunto de valores de primitivo por tenant, versionável e reversível, nunca um fork da interface.

**EN**

- **Brand swaps accent color and shape; never structure.** A tenant does not get a different layout, spacing or component — only its palette (§5).
- **Every brand theme re-validates contrast.** A brand whose tones break AA on any pair is rejected or adjusted before publishing — the system does not accept an inaccessible brand "because it's the client's color" (P18, §6).
- **Brand travels as configuration data**, not code: it is a set of primitive values per tenant, versionable and reversible, never a fork of the interface.

---

## 5. O tema muda aparência, não estrutura · A theme changes appearance, not structure

**PT** — A fronteira mais importante deste documento: **um tema altera cor, superfície e destaque — nunca espaçamento, layout, tamanho de componente, raio estrutural ou hierarquia.** Espaço vem da escala de espaçamento e é contextual por *produto* (Desktop/Mobile), não por *tema* (`tokens/STUDIO_UX_SPACING.md` §6, P4, P21). Um tema que aperta o espaço, muda a grade ou substitui um componente não é um tema — é um fork disfarçado, e reintroduz exatamente a inconsistência que o sistema existe para eliminar. A régua: se a mudança pretendida não cabe em "reapontar um papel semântico de cor/superfície", ela não é trabalho de tema. Desktop e Mobile compartilham os tokens de tema (a mesma marca, o mesmo dark); não compartilham layout (P4) — o tema é comum aos dois produtos, o layout não.

**EN** — This document's most important boundary: **a theme changes color, surface and accent — never spacing, layout, component size, structural radius or hierarchy.** Space comes from the spacing scale and is contextual by *product* (Desktop/Mobile), not by *theme* (`tokens/STUDIO_UX_SPACING.md` §6, P4, P21). A theme that tightens space, changes the grid or swaps a component is not a theme — it is a disguised fork, and it reintroduces exactly the inconsistency the system exists to eliminate. The rule: if the intended change doesn't fit into "repoint a semantic color/surface role", it is not theme work. Desktop and Mobile share the theme tokens (the same brand, the same dark); they don't share layout (P4) — the theme is common to both products, the layout is not.

---

## 6. Contraste preservado em todo tema · Contrast preserved in every theme

**PT** — A meta WCAG AA (P18) é uma invariante de **todos** os temas, não só do padrão. Cada tema — claro, escuro, e cada marca — passa por uma verificação de contraste dos pares semânticos (texto-sobre-superfície, foco, limites interativos) antes de ser publicado. Um tema que não cumpre a meta em algum par não é aceito com ressalva; é corrigido ou rejeitado. Isso protege a promessa da filosofia (`STUDIO_UX_PHILOSOPHY.md` §7): acessibilidade é propriedade da fundação, então nenhuma troca de aparência pode desligá-la. O anel de foco (`color.border.focus`) permanece visível e conforme em qualquer tema.

**EN** — The WCAG AA target (P18) is an invariant of **every** theme, not only the default. Each theme — light, dark, and each brand — goes through a contrast check of the semantic pairs (text-on-surface, focus, interactive boundaries) before publishing. A theme that fails the target on any pair is not accepted with a caveat; it is fixed or rejected. This protects the philosophy's promise (`STUDIO_UX_PHILOSOPHY.md` §7): accessibility is a property of the foundation, so no appearance swap may switch it off. The focus ring (`color.border.focus`) stays visible and conformant in any theme.

---

## 7. Regras, anti-padrões e governança · Rules, anti-patterns, governance

**PT — Regras:**

- Só a camada semântica muda entre temas; primitivos são reapontados, componentes e telas nunca (P1).
- Claro e escuro são obrigatórios e AA-conformes; toda marca revalida contraste (P18).
- Tema muda cor/superfície; densidade e layout são do produto, não do tema (P4, P21).
- Marca viaja como configuração versionável por tenant, nunca como fork de código.

**EN — Rules:**

- Only the semantic layer changes between themes; primitives are repointed, components and screens never (P1).
- Light and dark are mandatory and AA-conformant; every brand re-validates contrast (P18).
- A theme changes color/surface; density and layout belong to the product, not the theme (P4, P21).
- Brand travels as versionable per-tenant configuration, never as a code fork.

**PT — Anti-padrões:**

- **Hardcode que quebra o dark** — cor literal na tela que só funciona no claro (viola P1 e o §3).
- **Tema que muda estrutura** — apertar espaçamento, trocar componente ou grade sob o nome de "tema" (viola §5, P4).
- **Marca inacessível aceita** — publicar uma paleta de cliente que quebra o AA (viola P18).
- **Fork por marca** — copiar a interface para vestir um cliente em vez de reapontar tokens.
- **Modo escuro como filtro** — inverter cores mecanicamente em vez de remapear elevação e saturação (viola §3).

**EN — Anti-patterns:**

- **Hardcode that breaks dark** — a literal color on screen that only works in light (violates P1 and §3).
- **Theme that changes structure** — tightening spacing, swapping a component or grid under the name "theme" (violates §5, P4).
- **Accepted inaccessible brand** — publishing a client palette that breaks AA (violates P18).
- **Fork per brand** — copying the interface to dress a client instead of repointing tokens.
- **Dark mode as a filter** — mechanically inverting colors instead of remapping elevation and saturation (violates §3).

**PT — Governança (SemVer, `STUDIO_UX.md` §7):** um novo eixo ou tema é adição **MINOR**; remover ou renomear um papel semântico que os temas dependem é **MAJOR**. Os valores concretos de cada tema (as paletas finais) são materializados na Fase 2 (`STUDIO_UX_ROADMAP.md`) — este documento define o mecanismo, não as cores. Decisões estruturais de tema viram um ADR curto no documento.

**EN — Governance (SemVer, `STUDIO_UX.md` §7):** a new axis or theme is a **MINOR** addition; removing or renaming a semantic role that themes depend on is **MAJOR**. Concrete values per theme (the final palettes) are materialized in Phase 2 (`STUDIO_UX_ROADMAP.md`) — this document defines the mechanism, not the colors. Structural theme decisions become a short ADR in the document.

---

*Documento vivo. O mecanismo de tema entra aqui; as paletas concretas são materializadas na Fase 2. Atualizar nas duas línguas na mesma leva. · Living document. The theme mechanism enters here; concrete palettes are materialized in Phase 2. Update in both languages in the same commit.*
