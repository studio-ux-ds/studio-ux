# STUDIO_UX_LINTER.md — Validação automática · Automatic linting

> Documento normativo vivo. Responde a: **como o Studio UX detecta, de forma automática e estática, uma violação de regra antes que ela vire problema?**
> Living normative document. Answers: **how does Studio UX detect, automatically and statically, a rule violation before it becomes a problem?**
> Governança: `STUDIO_UX.md`. Regras de origem: `STUDIO_UX_PRINCIPLES.md` (P1–P25) e `governance/STUDIO_UX_CONSTITUTION.md` (Art. 1–20). Fronteira de qualidade: `docs/quality/STUDIO_UX_COMPLIANCE.md` (mede) e `docs/STUDIO_UX_CERTIFICATION.md` §8.4 (gradua). Superfície de invocação: `tools/STUDIO_UX_CLI` (`studio lint`).

```
Architecture Boundary Check — STUDIO_UX_LINTER
Resolve · Solves:            o instrumento oficial de DETECÇÃO automática e estática — encontrar, num artefato
                             (tela, componente, tema), toda violação verificável sem execução nem julgamento humano.
                             / the official AUTOMATIC, STATIC DETECTION instrument — to find, in an artifact
                             (screen, component, theme), every checkable violation without running it or human judgment.
Não pertence a outro porque · Not elsewhere because:
                             PRINCIPLES define a regra (o que é certo); COMPLIANCE mede o conjunto no tempo;
                             CERTIFICATION gradua em nível/selo. Faltava o detector pontual, binário e automático
                             que aponta UMA violação exata, aqui e agora.
                             / PRINCIPLES defines the rule (what is right); COMPLIANCE measures the set over time;
                             CERTIFICATION grades into a level/badge. The missing piece was the point, binary,
                             automatic detector that flags ONE exact violation, here and now.
Complementa · Complements:   PRINCIPLES, CONSTITUTION, DESIGN_TOKENS, COMPONENT_LIBRARY, ANIMATIONS,
                             ACCESSIBILITY, COMPLIANCE, CERTIFICATION, tools/CLI, tools/DEVTOOLS.
Nunca substitui · Never replaces: PRINCIPLES (dono dos P#), CONSTITUTION (dono dos artigos), COMPLIANCE (medição
                             contínua), CERTIFICATION (nível/selo). O linter detecta; nunca cria a regra que detecta.
Dono · Owner:                este doc, para o domínio "validação automática (linter)".
                             / this doc, for the "automatic validation (linter)" domain.
```

> **PT — Natureza deste documento:** o linter **não cria regra nova**. Cada regra de lint aponta para um princípio (P#) ou artigo (Art.) que já tem dono (SSOT, `STUDIO_UX.md` §11). Se a regra muda no dono, a regra de lint muda junto; um linter que "inventa" um critério sem dono é bug — o pior deles.
> **EN — Nature of this document:** the linter **creates no new rule**. Every lint rule points to a principle (P#) or article (Art.) that already has an owner (SSOT). If the rule changes at its owner, the lint rule changes with it; a linter that "invents" a criterion with no owner is a bug — the worst kind.

---

## Objetivo · Objective
**PT** — Garantir conformidade **detectando violações estáticas antes de virarem problema**. O linter é a primeira linha de defesa: roda cedo (ao salvar, ao propor uma mudança, na integração contínua), é barato, é objetivo e é reproduzível. Ele responde a uma pergunta binária por regra — "este ponto cumpre ou não cumpre?" — e nunca a uma pergunta de gosto.
**EN** — Ensure conformance by **detecting static violations before they become problems**. The linter is the first line of defense: it runs early (on save, on a proposed change, in continuous integration), is cheap, objective and reproducible. It answers a binary question per rule — "does this point comply or not?" — never a matter of taste.

## Escopo · Scope
**PT** — Tudo que é decidível **estaticamente**, sem executar a tela nem depender de percepção: valores fora de token, componente não-oficial, papel tipográfico errado, animação fora do catálogo, hierarquia com mais de uma ação primária, grid ad hoc, componente do produto errado (Desktop/Mobile), jargão na superfície, significado só por cor (quando detectável), foco removido, contraste insuficiente (quando ambos os lados vêm de token), estado ausente (quando declarado). **Fora de escopo:** tudo que exige julgamento perceptivo ou medição no tempo (§ "O que o linter não julga").
**EN** — Everything decidable **statically**, without running the screen or relying on perception: off-token values, unofficial component, wrong typographic role, off-catalog animation, hierarchy with more than one primary action, ad-hoc grid, wrong-product component (Desktop/Mobile), surface jargon, color-only meaning (when detectable), removed focus, insufficient contrast (when both sides come from tokens), missing state (when declared). **Out of scope:** anything requiring perceptual judgment or measurement over time (§ "What the linter does not judge").

---

## 1. Como uma regra de lint é definida · How a lint rule is defined
**PT** — Toda regra tem exatamente cinco partes: **(1) id conceitual** (nome estável, agnóstico de tecnologia, ex.: `no-magic-spacing`); **(2) o que detecta** (a condição estática exata); **(3) origem** (o P# e/ou Art. dono da regra — nunca "porque sim"); **(4) severidade** (**erro** trava; **aviso** sinaliza); **(5) exemplo** de violação e de conformidade, em prosa. A severidade herda o peso da certificação: princípio **eliminatório** (`CERTIFICATION` §3) vira **erro**; princípio **pontuável** vira **aviso**. O linter nunca decide sozinho se algo é erro ou aviso — herda do dono.
**EN** — Every rule has exactly five parts: **(1) conceptual id** (stable, technology-agnostic name, e.g. `no-magic-spacing`); **(2) what it detects** (the exact static condition); **(3) origin** (the owning P# and/or Art. — never "just because"); **(4) severity** (**error** blocks; **warning** signals); **(5) example** of violation and of conformance, in prose. Severity inherits the certification weight: an **eliminatory** principle (`CERTIFICATION` §3) becomes an **error**; a **scored** principle becomes a **warning**. The linter never decides on its own whether something is error or warning — it inherits from the owner.

---

## 2. Catálogo de regras · Rule catalog

**PT** — Cada regra abaixo é dona de uma detecção, referencia sua origem, declara severidade e traz exemplo descritivo (nunca código, §13). O catálogo cresce só quando um P#/Art. novo pede detecção estática.
**EN** — Each rule below owns one detection, references its origin, declares severity and carries a descriptive example (never code, §13). The catalog grows only when a new P#/Art. asks for static detection.

### 2.1 `no-magic-spacing` — espaçamento fora dos tokens · off-token spacing
- **Origem · Origin:** P1, P7, Art. 3 · **Severidade · Severity: erro · error**
- **PT — Detecta:** qualquer espaçamento (gap, margem, recuo) que não mapeia para um degrau da escala de espaçamento (`tokens/STUDIO_UX_SPACING.md`). *Violação:* um recuo "quase certo", um degrau abaixo do previsto pela escala. *Conformidade:* todo espaçamento referencia um degrau nomeado da escala.
- **EN — Detects:** any spacing (gap, margin, inset) that does not map to a step of the spacing scale. *Violation:* an "almost right" inset, one notch off the scale. *Conformance:* every spacing references a named step of the scale.

### 2.2 `no-magic-value` — valor mágico genérico · generic magic value
- **Origem · Origin:** P1, Art. 3 · **Severidade · Severity: erro · error**
- **PT — Detecta:** qualquer valor visual literal fora de token — raio, duração de movimento, nível de sombra, opacidade — que não seja espaço nem cor (esses têm regra própria). É a rede que pega o "valor solto" genérico. *Violação:* um raio de canto escrito à mão. *Conformidade:* o valor vem de um token nomeado (`tokens/STUDIO_UX_DESIGN_TOKENS.md`).
- **EN — Detects:** any literal visual value off-token — radius, motion duration, shadow level, opacity — that is neither spacing nor color (those have their own rules). It is the net that catches the generic "loose value". *Violation:* a hand-written corner radius. *Conformance:* the value comes from a named token.

### 2.3 `color-off-token` — cor fora dos tokens ou inválida · off-token or invalid color
- **Origem · Origin:** P1, P8, Art. 3 · **Severidade · Severity: erro · error**
- **PT — Detecta:** cor literal fora do sistema de cor, cor sem papel semântico, ou referência a um token de cor inexistente/inválido (`tokens/STUDIO_UX_COLOR_SYSTEM.md`). *Violação:* uma cor de fundo escrita à mão, ou uma cor "decorativa" sem papel. *Conformidade:* toda cor vem de um papel semântico do sistema (superfície, texto, ação, status).
- **EN — Detects:** a literal color off the color system, a color with no semantic role, or a reference to a nonexistent/invalid color token. *Violation:* a hand-written background color, or a "decorative" color with no role. *Conformance:* every color comes from a semantic role of the system (surface, text, action, status).

### 2.4 `unofficial-component` — componente não-oficial · unofficial component
- **Origem · Origin:** P2, P3, Art. 4 · **Severidade · Severity: erro · error**
- **PT — Detecta:** um elemento cru montado à mão onde o catálogo já tem componente, ou um "segundo jeito" de resolver o mesmo caso (`components/STUDIO_UX_COMPONENT_LIBRARY.md`). *Violação:* um botão desenhado do zero em vez do `Button` oficial. *Conformidade:* a tela é montada só com componentes do catálogo; o que falta vira pedido de componente, não gambiarra local.
- **EN — Detects:** a raw, hand-assembled element where the catalog already has a component, or a "second way" to solve the same case. *Violation:* a button drawn from scratch instead of the official `Button`. *Conformance:* the screen is assembled only from catalog components; what is missing becomes a component request, not a local hack.

### 2.5 `typography-off-role` — tipografia incorreta · incorrect typography
- **Origem · Origin:** P1, P20, Art. 3 · **Severidade · Severity: erro (valor fora de token) · aviso (papel trocado) · error (off-token value) · warning (wrong role)**
- **PT — Detecta:** texto com tamanho/peso/altura-de-linha fora dos papéis tipográficos definidos (`tokens/STUDIO_UX_TYPOGRAPHY.md`) — seja um valor literal (erro) ou um papel aplicado fora do seu lugar, como um papel de título usado em corpo de tabela (aviso). *Conformidade:* cada texto usa o papel tipográfico previsto para sua função.
- **EN — Detects:** text with size/weight/line-height outside the defined typographic roles — either a literal value (error) or a role applied out of place, like a title role used in a table body (warning). *Conformance:* each text uses the typographic role intended for its function.

### 2.6 `animation-off-catalog` — animação proibida ou fora do catálogo · forbidden or off-catalog animation
- **Origem · Origin:** P15, ANIMATIONS · **Severidade · Severity: aviso (fora do catálogo) · erro (duração literal, P1) · warning (off-catalog) · error (literal duration, P1)**
- **PT — Detecta:** movimento que não está no catálogo de motion (`STUDIO_UX_ANIMATIONS.md`) ou que a régua veta (parallax, animação longa, movimento decorativo), e duração escrita à mão (que também dispara `no-magic-value`). *Conformidade:* toda animação referencia uma entrada do catálogo de motion, com duração de token.
- **EN — Detects:** motion not in the motion catalog or vetoed by the ruler (parallax, long animation, decorative motion), and hand-written duration (which also triggers `no-magic-value`). *Conformance:* every animation references a motion-catalog entry, with a token duration.

### 2.7 `single-primary-action` — hierarquia quebrada / múltiplas ações primárias · broken hierarchy / multiple primary actions
- **Origem · Origin:** P6 · **Severidade · Severity: erro · error**
- **PT — Detecta:** mais de uma ação marcada como **primária** no mesmo contexto de tela. *Violação:* dois botões de ênfase primária competindo. *Conformidade:* uma única ação primária por contexto; as demais são secundárias/terciárias. **Limite:** o linter confirma que existe *exatamente uma* ação primária — **não** julga se é a ação *certa* (isso é humano/Certification).
- **EN — Detects:** more than one action marked **primary** in the same screen context. *Violation:* two primary-emphasis buttons competing. *Conformance:* a single primary action per context; the rest are secondary/tertiary. **Limit:** the linter confirms that *exactly one* primary action exists — it does **not** judge whether it is the *right* one (that is human/Certification).

### 2.8 `layout-from-system` — layout incorreto / grid ad hoc · incorrect layout / ad-hoc grid
- **Origem · Origin:** P22 · **Severidade · Severity: aviso · warning**
- **PT — Detecta:** composição que define colunas/gutters/regiões próprias em vez de usar o sistema de layout (`layouts/STUDIO_UX_LAYOUT_SYSTEM.md`). *Violação:* um grid inventado só para uma tela. *Conformidade:* a tela compõe sobre o grid e as regiões do sistema.
- **EN — Detects:** a composition that defines its own columns/gutters/regions instead of using the layout system. *Violation:* a grid invented for one screen. *Conformance:* the screen composes on the system's grid and regions.

### 2.9 `no-cross-product-component` — Desktop usando componente Mobile e vice-versa · Desktop using a Mobile component and vice-versa
- **Origem · Origin:** P4, Art. 2 · **Severidade · Severity: erro · error**
- **PT — Detecta:** um artefato declarado de um produto (Desktop) consumindo um componente/layout do produto irmão (Mobile), ou o inverso. *Violação:* uma barra de navegação inferior de toque numa tela de produtividade Desktop. *Conformidade:* cada produto usa os componentes e o layout do seu documento (`desktop/*` ou `mobile/*`); compartilham tokens e princípios, nunca layouts.
- **EN — Detects:** an artifact declared for one product (Desktop) consuming a sibling-product (Mobile) component/layout, or vice-versa. *Violation:* a touch bottom-navigation bar on a Desktop productivity screen. *Conformance:* each product uses the components and layout of its own doc; they share tokens and principles, never layouts.

### 2.10 `no-surface-jargon` — jargão técnico na superfície · technical jargon on the surface
- **Origem · Origin:** P11, Art. 7 · **Severidade · Severity: erro · error**
- **PT — Detecta:** identificador técnico, chave, ID cru ou nome de token exposto como texto de superfície (rótulo, botão, dica, mensagem), varrendo contra um dicionário de padrões técnicos. *Violação:* um rótulo escrito `allowed_tools`. *Conformidade:* a superfície fala a língua do dono do negócio; jargão fica em "Ajustes avançados" ou some. **Limite:** detecta o padrão técnico óbvio; não julga se um texto "de negócio" está bem escrito.
- **EN — Detects:** a technical identifier, key, raw ID or token name exposed as surface text (label, button, hint, message), swept against a dictionary of technical patterns. *Violation:* a label reading `allowed_tools`. *Conformance:* the surface speaks the business owner's language; jargon lives under "Advanced settings" or disappears. **Limit:** it catches the obvious technical pattern; it does not judge whether a "business" text is well written.

### 2.11 `meaning-not-color-only` — significado só por cor · meaning by color alone
- **Origem · Origin:** P17, Art. 9 · **Severidade · Severity: aviso · warning**
- **PT — Detecta (parcial):** um estado/severidade cujo único diferenciador declarado é a cor, sem segundo sinal (ícone, texto, forma). *Conformidade:* todo status carrega um segundo sinal além da cor. **Limite:** o linter aponta o *suspeito* (só cor, sem ícone/rótulo associado); a confirmação de que o segundo sinal é suficiente para um daltônico é humana/Certification — por isso é aviso, não erro.
- **EN — Detects (partial):** a state/severity whose only declared differentiator is color, with no second cue (icon, text, shape). *Conformance:* every status carries a second cue beyond color. **Limit:** the linter flags the *suspect* (color-only, no associated icon/label); confirming the second cue is enough for a color-blind user is human/Certification — hence warning, not error.

### 2.12 `focus-visible-required` — foco removido · focus removed
- **Origem · Origin:** P18, P19, Art. 9 · **Severidade · Severity: erro · error**
- **PT — Detecta:** um elemento focável que remove o indicador de foco sem substituto visível (`STUDIO_UX_ACCESSIBILITY.md` §2). *Violação:* o foco tirado "por estética". *Conformidade:* todo focável tem foco visível, herdado de token/componente.
- **EN — Detects:** a focusable element that removes the focus indicator with no visible replacement. *Violation:* focus removed "for aesthetics". *Conformance:* every focusable has visible focus, inherited from token/component.

### 2.13 `contrast-minimum` — contraste insuficiente · insufficient contrast
- **Origem · Origin:** P18, Art. 9 · **Severidade · Severity: erro (ambos os lados de token) · aviso (indeterminável) · error (both sides from tokens) · warning (undeterminable)**
- **PT — Detecta (na medida do estático):** um par texto/fundo, ambos vindos de tokens, cuja razão de contraste fica abaixo da meta AA em algum tema (`STUDIO_UX_ACCESSIBILITY.md` §1). Como os tokens têm valor conhecido por tema, o cálculo é determinístico. *Conformidade:* todo par de token usado como texto-sobre-fundo cumpre AA nos dois temas. **Limite:** se um dos lados não vem de token (ex.: cor sobre imagem), o linter não consegue calcular — emite aviso "indeterminável" e manda para verificação humana/Certification.
- **EN — Detects (as far as static allows):** a text/background pair, both from tokens, whose contrast ratio falls below the AA target in some theme. Since tokens have a known value per theme, the computation is deterministic. *Conformance:* every token pair used as text-on-background meets AA in both themes. **Limit:** if one side is not a token (e.g. text over an image), the linter cannot compute it — it emits an "undeterminable" warning and sends it to human/Certification.

### 2.14 `required-states` — estado ausente · missing state
- **Origem · Origin:** P14 · **Severidade · Severity: aviso · warning**
- **PT — Detecta (quando declarável):** um componente que lida com dados sem declarar seus estados obrigatórios — vazio (`EmptyState`), carregando, erro (`STUDIO_UX.md` §8). *Conformidade:* todo componente de dados declara vazio, carregando e erro além do "feliz". **Limite:** o linter cobra os estados *declarados/ausentes*; não julga se o estado vazio *comunica bem* — isso é humano/Certification.
- **EN — Detects (when declarable):** a data-handling component that declares none of its mandatory states — empty (`EmptyState`), loading, error. *Conformance:* every data component declares empty, loading and error besides the "happy" one. **Limit:** the linter enforces the *declared/missing* states; it does not judge whether the empty state *communicates well* — that is human/Certification.

---

## 3. O que o linter NÃO julga — a fronteira do estático · What the linter does NOT judge — the static boundary
**PT** — O linter só decide o que é **binário e estático**. Ele **não** responde a perguntas de percepção ou de gosto, e nunca deve fingir que responde: *"isto parece calmo?"*, *"esta é a ação primária certa?"*, *"o espaço agrupa bem?"*, *"o tom soa profissional?"*, *"a densidade está confortável?"*, *"esta tela some para o dado brilhar?"* (régua do `STUDIO_UX_VISUAL_DNA.md`). Tudo isso é **julgamento humano**, consolidado pela `CERTIFICATION` (auditoria com evidência). O linter também não mede tendência nem cobertura ao longo do tempo — isso é `COMPLIANCE`. A regra de ouro: quando a resposta depende de *olhar e sentir*, o linter **encaminha**, não decide.
**EN** — The linter only decides what is **binary and static**. It does **not** answer questions of perception or taste, and must never pretend to: *"does this feel calm?"*, *"is this the right primary action?"*, *"does the space group well?"*, *"does the tone sound professional?"*, *"is the density comfortable?"*, *"does this screen disappear to let the data shine?"* (the `STUDIO_UX_VISUAL_DNA.md` ruler). All of that is **human judgment**, consolidated by `CERTIFICATION` (evidence-based audit). The linter also measures neither trend nor coverage over time — that is `COMPLIANCE`. The golden rule: when the answer depends on *looking and feeling*, the linter **routes it on**, it does not decide.

## 4. Fronteira com Compliance e Certification · Boundary with Compliance and Certification
**PT** — *Linter detecta · Compliance mede · Certification gradua* (`CERTIFICATION` §8.4). O linter aponta **um ponto**: uma violação exata, num artefato, num instante — binário. O `COMPLIANCE` **mede o conjunto no tempo**: quantas violações por área, tendência entre releases, dívida acumulada — ele *consome* a saída do linter como uma de suas entradas. A `CERTIFICATION` **gradua**: transforma detecções e medições num nível/selo. Nenhum recria a regra do outro nem a regra-dona (P#/Art.). O linter é a fonte de detecção; os outros dois a leem.
**EN** — *Linter detects · Compliance measures · Certification grades* (`CERTIFICATION` §8.4). The linter flags **one point**: an exact violation, in one artifact, at one instant — binary. `COMPLIANCE` **measures the set over time**: how many violations per area, trend across releases, accumulated debt — it *consumes* the linter's output as one of its inputs. `CERTIFICATION` **grades**: it turns detections and measurements into a level/badge. None recreates the other's rule nor the owning rule (P#/Art.). The linter is the detection source; the other two read it.

## 5. Integração com a CLI · CLI integration
**PT** — O linter é o **domínio de detecção**; a superfície que o invoca é a CLI (`tools/STUDIO_UX_CLI`), pelo comando `studio lint`. A CLI passa os artefatos, recebe as violações (id da regra, severidade, P#/Art. citado, local e a evidência) e decide política de saída (ex.: **erro** falha a integração contínua; **aviso** apenas reporta). O linter não é dono do comando nem do formato de terminal — é dono das **regras e da detecção**; a CLI é dona da **invocação**. A mesma detecção alimenta os inspetores (`tools/STUDIO_UX_DEVTOOLS`) sem duplicar regra.
**EN** — The linter is the **detection domain**; the surface that invokes it is the CLI (`tools/STUDIO_UX_CLI`), via `studio lint`. The CLI passes the artifacts, receives the violations (rule id, severity, cited P#/Art., location and evidence) and decides exit policy (e.g. **error** fails continuous integration; **warning** only reports). The linter owns neither the command nor the terminal format — it owns the **rules and the detection**; the CLI owns the **invocation**. The same detection feeds the inspectors (`tools/STUDIO_UX_DEVTOOLS`) without duplicating a rule.

## Responsabilidades · Responsibilities
**PT** — Manter o catálogo de regras estáticas, cada uma amarrada a um P#/Art. dono; classificar severidade herdando o peso da certificação; entregar violações objetivas, com id, origem, severidade e evidência; encaminhar o não-estático a Certification/humano.
**EN** — Keep the static-rule catalog, each tied to an owning P#/Art.; classify severity inheriting the certification weight; deliver objective violations with id, origin, severity and evidence; route the non-static to Certification/human.

## Não-responsabilidades · Non-responsibilities
**PT** — Não cria regra sem P#/Art. dono; não julga gosto, calma, beleza ou "ação certa"; não mede tendência/cobertura no tempo (é `COMPLIANCE`); não atribui nível/selo (é `CERTIFICATION`); não define o comando de terminal (é a CLI); não fixa valores estéticos (Fase 2, donos de token).
**EN** — Creates no rule without an owning P#/Art.; judges no taste, calm, beauty or "right action"; measures no trend/coverage over time (`COMPLIANCE`); assigns no level/badge (`CERTIFICATION`); defines no terminal command (the CLI); fixes no aesthetic values (Phase 2, token owners).

## Integrações e dependências · Integrations and dependencies
**PT** — Depende de `PRINCIPLES` (P#), `CONSTITUTION` (Art.), dos donos de token (`DESIGN_TOKENS`/`COLOR_SYSTEM`/`TYPOGRAPHY`/`SPACING`), do `COMPONENT_LIBRARY`, do `LAYOUT_SYSTEM`, do `ANIMATIONS` e do `ACCESSIBILITY` (§1/§2). É consumido por `COMPLIANCE` (como entrada de medição), por `CERTIFICATION` (§8.4), pela CLI (`studio lint`) e pelas DevTools.
**EN** — Depends on `PRINCIPLES` (P#), `CONSTITUTION` (Art.), the token owners, `COMPONENT_LIBRARY`, `LAYOUT_SYSTEM`, `ANIMATIONS` and `ACCESSIBILITY` (§1/§2). It is consumed by `COMPLIANCE` (as measurement input), by `CERTIFICATION` (§8.4), by the CLI (`studio lint`) and by DevTools.

## Fluxos · Flows
**PT** — **(a) Ao salvar/propor:** o autor roda `studio lint`; erros barram, avisos orientam. **(b) Na integração contínua:** o linter roda em cada mudança; um **erro** reprova a mudança antes de ir adiante — a detecção precoce evita a dívida. **(c) Encaminhamento:** o que o linter marca como *indeterminável* ou *suspeito* (contraste sobre imagem, só-cor, ação certa) vira item de verificação humana na `CERTIFICATION`.
**EN** — **(a) On save/propose:** the author runs `studio lint`; errors block, warnings guide. **(b) In continuous integration:** the linter runs on every change; an **error** fails the change before it moves on — early detection prevents debt. **(c) Routing:** whatever the linter marks *undeterminable* or *suspect* (contrast over image, color-only, the right action) becomes a human-verification item in `CERTIFICATION`.

## Boas práticas · Best practices
**PT** — Toda regra cita seu P#/Art. dono. Severidade herda o peso da certificação (eliminatório→erro, pontuável→aviso). Rodar cedo e sempre. Preferir **aviso** quando a detecção é parcial (evita falso positivo). Corrigir a regra **no dono** quando ela estiver ambígua — nunca "interpretar" no linter.
**EN** — Every rule cites its owning P#/Art. Severity inherits the certification weight (eliminatory→error, scored→warning). Run early and always. Prefer **warning** when detection is partial (avoids false positives). Fix an ambiguous rule **at its owner** — never "interpret" it in the linter.

## Anti-padrões · Anti-patterns
**PT / EN**
- Linter que inventa regra sem P#/Art. dono (viola SSOT). / A linter that invents a rule with no owning P#/Art.
- Falso positivo por regra ambígua — regra ambígua é bug do dono (`PRINCIPLES`/`CONSTITUTION`), corrigido lá. / False positive from an ambiguous rule — an ambiguous rule is a bug at its owner, fixed there.
- Usar o linter para julgar gosto ("isto é bonito/calmo?"). / Using the linter to judge taste.
- Marcar como **erro** o que só é detectável em parte (deveria ser **aviso**). / Marking as **error** what is only partly detectable (should be **warning**).
- Duplicar no linter a medição no tempo (é `COMPLIANCE`) ou o nível/selo (é `CERTIFICATION`). / Duplicating in the linter the over-time measurement (`COMPLIANCE`) or the level/badge (`CERTIFICATION`).

## Roadmap
**PT** — O catálogo cresce só quando um P#/Art. novo pede detecção estática; toda regra nova nasce com id, origem, severidade e exemplo, e entra no mesmo commit em que o dono muda. Detecções hoje parciais (só-cor, contraste sobre não-token) podem ganhar precisão, mas o limite permanece: o não-estático nunca vira decisão do linter.
**EN** — The catalog grows only when a new P#/Art. asks for static detection; every new rule is born with id, origin, severity and example, entering in the same commit the owner changes. Today's partial detections (color-only, contrast over non-token) may gain precision, but the boundary holds: the non-static never becomes a linter decision.

## Referências internas · Internal references
`STUDIO_UX.md` §11–§13 · `STUDIO_UX_PRINCIPLES.md` (P1–P25) · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 1–20) · `tokens/STUDIO_UX_DESIGN_TOKENS.md` · `tokens/STUDIO_UX_COLOR_SYSTEM.md` · `tokens/STUDIO_UX_TYPOGRAPHY.md` · `tokens/STUDIO_UX_SPACING.md` · `components/STUDIO_UX_COMPONENT_LIBRARY.md` · `layouts/STUDIO_UX_LAYOUT_SYSTEM.md` · `STUDIO_UX_ANIMATIONS.md` · `STUDIO_UX_ACCESSIBILITY.md` · `STUDIO_UX_VISUAL_DNA.md` · `docs/quality/STUDIO_UX_COMPLIANCE.md` · `docs/STUDIO_UX_CERTIFICATION.md` §8.4 · `tools/STUDIO_UX_CLI` · `tools/STUDIO_UX_DEVTOOLS`

---

*Documento vivo. Detecta o que os donos definem; se um P# ou artigo muda no dono, a regra de lint muda na mesma leva, nas duas línguas. O linter nunca cria a regra — só a detecta. · Living document. It detects what the owners define; if a P# or article changes at its owner, the lint rule changes in the same commit, in both languages. The linter never creates a rule — it only detects it.*
