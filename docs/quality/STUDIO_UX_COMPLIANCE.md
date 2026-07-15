# STUDIO_UX_COMPLIANCE.md — Conformidade contínua · Continuous compliance

> Documento normativo vivo. Responde a: **como toda tela, todo sistema, todo componente e toda alteração feitos com Studio UX se tornam auditáveis de forma contínua e no tempo?**
> Living normative document. Answers: **how do every screen, system, component and change built with Studio UX become auditable continuously and over time?**
> Governança: `STUDIO_UX.md`. Regras de origem: `STUDIO_UX_PRINCIPLES.md` (P1–P25) e `governance/STUDIO_UX_CONSTITUTION.md` (Art. 1–20). Detecção: `docs/quality/STUDIO_UX_LINTER.md`. Graduação: `docs/STUDIO_UX_CERTIFICATION.md` (§8 sistema, §8.4 fronteira).

```
Architecture Boundary Check — STUDIO_UX_COMPLIANCE
Resolve · Solves:            o instrumento oficial de MEDIÇÃO contínua — transformar detecções e checagens num
                             conjunto de métricas, índices e tendências que dizem "quão conforme, onde, e para onde
                             está indo" ao longo do tempo.
                             / the official CONTINUOUS MEASUREMENT instrument — turning detections and checks into a set
                             of metrics, indices and trends that say "how compliant, where, and where it is heading"
                             over time.
Não pertence a outro porque · Not elsewhere because:
                             LINTER detecta UMA violação pontual (binário, num instante); CERTIFICATION gradua num
                             nível/selo; PRINCIPLES define a regra. Faltava a camada que MEDE o conjunto no tempo —
                             cobertura, densidade, tendência, dívida — de forma auditável e contínua.
                             / LINTER detects ONE point violation (binary, at one instant); CERTIFICATION grades a
                             level/badge; PRINCIPLES defines the rule. The missing layer MEASURES the set over time —
                             coverage, density, trend, debt — auditably and continuously.
Complementa · Complements:   PRINCIPLES, CONSTITUTION, LINTER, CERTIFICATION, VERSIONING, ARCHITECTURE, tools/CLI.
Nunca substitui · Never replaces: PRINCIPLES (dono dos P#), LINTER (detecção pontual), CERTIFICATION (nível/selo).
                             COMPLIANCE mede; nunca cria a regra medida nem gradua o selo.
Dono · Owner:                este doc, para o domínio "conformidade contínua (medição)".
                             / this doc, for the "continuous compliance (measurement)" domain.
```

> **PT — Natureza deste documento:** a conformidade **não cria regra nova**. Ela **conta e agrega** o que já tem dono: cada métrica se apoia num P#/Art. e nas detecções do `LINTER`. Um score que vira opinião do medidor — sem regra-dona por trás — é bug. A medição nunca é gosto; é aritmética sobre critérios objetivos.
> **EN — Nature of this document:** compliance **creates no new rule**. It **counts and aggregates** what already has an owner: every metric rests on a P#/Art. and on the `LINTER`'s detections. A score that becomes the measurer's opinion — with no owning rule behind it — is a bug. Measurement is never taste; it is arithmetic over objective criteria.

---

## Objetivo · Objective
**PT** — Tornar **auditável, de forma contínua e no tempo**, toda tela, todo sistema, todo componente e toda alteração. Onde o `LINTER` responde "este ponto cumpre?" num instante, a conformidade responde "quão conforme está o conjunto, em que áreas, e como isso evolui de release a release?". O objetivo é que a qualidade deixe de ser uma foto (uma auditoria isolada) e passe a ser um **filme** (uma medida que se acompanha, com tendência e alerta de regressão).
**EN** — Make **auditable, continuously and over time**, every screen, system, component and change. Where the `LINTER` answers "does this point comply?" at one instant, compliance answers "how compliant is the set, in which areas, and how does it evolve release to release?". The goal is for quality to stop being a snapshot (one isolated audit) and become a **film** (a measure tracked over time, with trend and regression alert).

## Escopo · Scope
**PT** — A **medição** do conjunto: o que é medido, como vira métrica/índice/score, como se acompanha a tendência e a dívida, e como isso alimenta a certificação de sistema. **Fora de escopo:** detectar a violação individual (é `LINTER`), definir a regra (é `PRINCIPLES`/`CONSTITUTION`) e atribuir o nível/selo (é `CERTIFICATION`).
**EN** — The **measurement** of the set: what is measured, how it becomes a metric/index/score, how trend and debt are tracked, and how this feeds system certification. **Out of scope:** detecting the individual violation (`LINTER`), defining the rule (`PRINCIPLES`/`CONSTITUTION`) and assigning the level/badge (`CERTIFICATION`).

---

## 1. Os quatro escopos medidos · The four measured scopes
**PT** — A conformidade mede em quatro escopos, do menor ao maior, e cada um herda o anterior:
**EN** — Compliance measures at four scopes, from smallest to largest, each inheriting the previous:

- **Componente · Component** — a peça do catálogo: seus estados estão completos? seus valores vêm de token? cumpre acessibilidade? É a unidade mais fina; a conformidade de um componente ruim contamina toda tela que o usa.
- **Tela · Screen** — a composição: mede-se o resultado da auditoria de tela da `CERTIFICATION` (§§0–7) somado às detecções do `LINTER` naquela tela. É a unidade que o usuário vê.
- **Sistema · System** — o produto inteiro: a agregação de todas as suas telas e componentes num índice único, com a família mantida de tela em tela (P20). É o que a certificação de sistema (`CERTIFICATION` §8) consome.
- **Alteração · Change** — o delta: cada mudança medida contra o baseline (§4). É o escopo que torna a qualidade **contínua** em vez de pontual.

**PT** — O mesmo conjunto de dimensões (§2) aplica-se a cada escopo, mudando só a unidade de agregação. Um índice de sistema nunca é melhor que o pior escopo eliminatório dentro dele (herda a regra da `CERTIFICATION`: um eliminatório reprovado em qualquer tela trava o sistema).
**EN** — The same set of dimensions (§2) applies at each scope, changing only the aggregation unit. A system index is never better than the worst eliminatory scope within it (it inherits the `CERTIFICATION` rule: a failed eliminatory on any screen caps the system).

## 2. O que é medido · What is measured
**PT** — A conformidade mede dimensões objetivas, cada uma ancorada num dono. Nenhuma é subjetiva; toda métrica é contável.
**EN** — Compliance measures objective dimensions, each anchored to an owner. None is subjective; every metric is countable.

- **Cobertura de tokens · Token coverage** — proporção de valores visuais que vêm de token vs valores mágicos (fonte: `LINTER` `no-magic-spacing`/`no-magic-value`/`color-off-token`; regra: P1, P7, Art. 3). Alvo: tender a 100%.
- **Uso de componentes oficiais · Official-component usage** — proporção de elementos vindos do catálogo vs crus/forks (fonte: `LINTER` `unofficial-component`; regra: P2, P3, Art. 4).
- **Densidade de violações do LINTER por área · LINTER violation density per area** — violações (erro/aviso) por tela/módulo/sistema, normalizadas por tamanho, para comparar áreas de forma justa.
- **Cobertura de estados · State coverage** — proporção de componentes de dados com vazio/carregando/erro declarados (fonte: `LINTER` `required-states`; regra: P14).
- **Conformidade de acessibilidade · Accessibility conformance** — proporção de itens da checklist dona (`STUDIO_UX_ACCESSIBILITY.md` §11) cumpridos nos dois temas: contraste, foco, não-só-cor, teclado/toque (regra: P17–P19, Art. 9).
- **Aderência à gramática e às superfícies · Grammar and surface adherence** — proporção de composições que respeitam a gramática (`GRAMMAR`), o layout do sistema (P22) e a linguagem do usuário na superfície (P11, Art. 7).

**PT** — Cada dimensão tem uma escala clara (0 a 100% ou contagem normalizada) e um dono da regra. Onde o `LINTER` já detecta, a conformidade **soma e normaliza** — não re-detecta. Onde a regra só é verificável por humano (percepção), a conformidade **conta o resultado da auditoria** da `CERTIFICATION`, não o improvisa.
**EN** — Each dimension has a clear scale (0–100% or normalized count) and a rule owner. Where the `LINTER` already detects, compliance **sums and normalizes** — it does not re-detect. Where a rule is only human-verifiable (perception), compliance **counts the `CERTIFICATION` audit result**, it does not improvise it.

## 3. Como vira score, métricas e indicadores · How it becomes score, metrics and indicators
**PT** — As dimensões (§2) consolidam-se em três camadas:
**EN** — The dimensions (§2) consolidate into three layers:

- **Métrica · Metric** — o valor cru de uma dimensão numa unidade (ex.: cobertura de tokens de uma tela). É o tijolo.
- **Índice de conformidade · Compliance index** — a combinação ponderada das métricas para um escopo (tela, módulo, sistema). O peso **herda** a distinção eliminatório/pontuável da `CERTIFICATION` §3: uma falha em dimensão de peso eliminatório derruba o índice mais do que uma pontuável — a medição nunca "compensa" um eliminatório reprovado com pontos em estética. É o índice por sistema/módulo.
- **Indicador de tendência e dívida · Trend and debt indicator** — a **derivada no tempo**: como o índice se move entre releases (melhora/piora) e a **dívida de conformidade** acumulada (o conjunto de violações e itens em aberto ainda não sanados). É o que transforma foto em filme.

**PT — Exemplo descritivo (nunca número final):** um módulo com cobertura de tokens quase total, componentes oficiais em toda parte e estados completos, porém com um foco removido em um formulário, **não** exibe um índice "quase perfeito": a falha de foco é de dimensão eliminatória (P18) e derruba o índice do módulo abaixo do piso, enquanto os avisos pontuáveis apenas o arranham. O índice conta a história certa — "seguro exceto por uma barreira de acessibilidade" —, não uma média que esconde a barreira.
**EN — Descriptive example (never a final number):** a module with near-total token coverage, official components everywhere and complete states, yet with focus removed in one form, does **not** show an "almost perfect" index: the focus failure is an eliminatory dimension (P18) and drops the module's index below the floor, while scored warnings only scratch it. The index tells the right story — "safe except for one accessibility barrier" — not an average that hides the barrier.

**PT** — Regra de honestidade do score: o índice reflete a realidade medida, nunca a desejada. Um índice que não bate com as detecções do `LINTER` e as auditorias da `CERTIFICATION` está errado por construção. Precedência herdada (`PRINCIPLES`): acessibilidade e clareza (P11, P17–P19) pesam acima de consistência (P1–P3, P20), acima de densidade/estética (P21).
**EN** — Score-honesty rule: the index reflects the measured reality, never the desired one. An index that doesn't match the `LINTER` detections and the `CERTIFICATION` audits is wrong by construction. Inherited precedence: accessibility and clarity (P11, P17–P19) weigh above consistency (P1–P3, P20), above density/aesthetics (P21).

## 4. Toda alteração é auditável · Every change is auditable
**PT** — O princípio central: **cada mudança pode ser medida contra um baseline**, e uma regressão é detectável. Para cada release (`VERSIONING`), a conformidade guarda um **baseline** — o retrato das métricas naquele ponto. Uma alteração seguinte é medida contra esse baseline: se o índice cai, se a densidade de violações sobe, se a cobertura de estados ou de acessibilidade recua, isso é uma **regressão** identificável — com o quê, onde e quanto. Nada de "pioramos, mas não sabemos onde". A auditabilidade contínua é o que permite à certificação de sistema sustentar-se release após release, e não ser uma foto única (`CERTIFICATION` §8.3).
**EN** — The central principle: **every change can be measured against a baseline**, and a regression is detectable. For each release (`VERSIONING`), compliance keeps a **baseline** — the snapshot of the metrics at that point. A subsequent change is measured against it: if the index drops, if violation density rises, if state or accessibility coverage recedes, that is an identifiable **regression** — with what, where and how much. No "we got worse but don't know where". Continuous auditability is what lets system certification sustain itself release after release, rather than being a single snapshot.

## 5. Como alimenta a Certification de sistema · How it feeds system Certification
**PT** — A conformidade é uma das entradas da **certificação de sistema** (`CERTIFICATION` §8). Enquanto a certificação de *tela* audita uma peça, a de *sistema* exige **conformidade contínua monitorada, sem regressões abertas** (`CERTIFICATION` §8.1/§8.2): Gold pede conformidade acompanhada sem regressão; Enterprise pede conformidade **auditável e reproduzível continuamente**, sustentada release após release. A conformidade fornece o número; a certificação decide o selo a partir dele. Também é a conformidade que sinaliza a **perda de nível** (`CERTIFICATION` §8.3): quando o índice cai abaixo do limiar do nível, o selo cai junto — nunca se mantém "no papel" um nível que a medição não sustenta.
**EN** — Compliance is one of the inputs to **system certification** (`CERTIFICATION` §8). While *screen* certification audits a piece, *system* certification requires **continuously monitored conformance with no open regressions** (§8.1/§8.2): Gold asks for tracked conformance without regression; Enterprise asks for **continuously auditable and reproducible** conformance, sustained release after release. Compliance provides the number; certification decides the badge from it. Compliance is also what signals **level loss** (§8.3): when the index falls below the level's threshold, the badge falls with it — a level the measurement doesn't sustain is never kept "on paper".

## 6. Fronteira com Linter e Certification · Boundary with Linter and Certification
**PT** — *Linter detecta · Compliance mede · Certification gradua* (`CERTIFICATION` §8.4). O `LINTER` acha **um ponto** (uma violação exata, binária, num instante). A conformidade **mede o conjunto no tempo** (quantos, onde, para onde vai) — ela *consome* as detecções do linter como uma de suas entradas e as agrega em métrica/índice/tendência. A `CERTIFICATION` **gradua** (transforma a medição num nível/selo). Distinção prática: uma violação de contraste numa tela é achado do **linter**; "a cobertura de acessibilidade do módulo caiu 8% neste release" é medição da **conformidade**; "o sistema perdeu o nível Gold" é veredito da **certificação**. Nenhum recria o papel do outro.
**EN** — *Linter detects · Compliance measures · Certification grades* (§8.4). The `LINTER` finds **one point** (an exact, binary violation, at one instant). Compliance **measures the set over time** (how many, where, heading where) — it *consumes* the linter's detections as one of its inputs and aggregates them into metric/index/trend. `CERTIFICATION` **grades** (turns measurement into a level/badge). Practical distinction: a contrast violation on a screen is a **linter** finding; "the module's accessibility coverage fell 8% this release" is a **compliance** measurement; "the system lost Gold" is a **certification** verdict. None recreates another's role.

## Responsabilidades · Responsibilities
**PT** — Definir as dimensões medidas e suas escalas, cada uma ancorada num P#/Art.; consolidar métricas em índices por escopo (tela/módulo/sistema); manter baseline por release e detectar regressão; expor tendência e dívida de conformidade; entregar o número que a certificação de sistema consome.
**EN** — Define the measured dimensions and their scales, each anchored to a P#/Art.; consolidate metrics into indices per scope (screen/module/system); keep a per-release baseline and detect regression; expose trend and compliance debt; deliver the number that system certification consumes.

## Não-responsabilidades · Non-responsibilities
**PT** — Não cria regra (é `PRINCIPLES`/`CONSTITUTION`); não detecta a violação individual (é `LINTER`); não atribui nível/selo (é `CERTIFICATION`); não julga gosto nem percepção (isso é humano na `CERTIFICATION`); não define versão/migração (é `VERSIONING`); não fixa valores estéticos.
**EN** — Creates no rule (`PRINCIPLES`/`CONSTITUTION`); detects no individual violation (`LINTER`); assigns no level/badge (`CERTIFICATION`); judges no taste or perception (that is human in `CERTIFICATION`); defines no version/migration (`VERSIONING`); fixes no aesthetic values.

## Integrações e dependências · Integrations and dependencies
**PT** — Consome as detecções do `LINTER` e os resultados de auditoria da `CERTIFICATION` (para as dimensões só verificáveis por humano); ancora cada métrica em `PRINCIPLES`/`CONSTITUTION`; usa `VERSIONING` para o conceito de release/baseline; usa `ARCHITECTURE` para saber os limites de módulo/sistema; é invocada pela CLI (`tools/STUDIO_UX_CLI`) e serve à `CERTIFICATION` §8.
**EN** — Consumes the `LINTER` detections and the `CERTIFICATION` audit results (for human-only dimensions); anchors every metric in `PRINCIPLES`/`CONSTITUTION`; uses `VERSIONING` for the release/baseline concept; uses `ARCHITECTURE` for module/system boundaries; is invoked by the CLI and serves `CERTIFICATION` §8.

## Fluxos · Flows
**PT** — **(a) Medição por release:** a cada release relevante (`VERSIONING`), calculam-se as métricas e consolida-se o índice por escopo, gravando o baseline. **(b) Tendência:** compara-se o índice atual com os baselines anteriores para desenhar a curva (melhora/piora) e quantificar a dívida. **(c) Alerta de regressão:** quando uma alteração faz uma métrica cruzar para baixo do baseline (ou do limiar do nível), dispara-se o alerta com o quê/onde/quanto — a certificação de sistema o lê para decidir manutenção ou perda de nível.
**EN** — **(a) Per-release measurement:** at each relevant release, metrics are computed and the index per scope is consolidated, recording the baseline. **(b) Trend:** the current index is compared with prior baselines to draw the curve (better/worse) and quantify debt. **(c) Regression alert:** when a change makes a metric cross below the baseline (or the level threshold), an alert fires with what/where/how much — system certification reads it to decide keeping or losing a level.

## Boas práticas · Best practices
**PT** — Toda métrica cita seu P#/Art. dono. Herdar peso da certificação (eliminatório pesa mais que pontuável). Medir contra baseline, sempre — número solto sem tendência engana. Manter o índice honesto: se não bate com linter+certificação, o índice está errado. Preferir poucas métricas fortes e ancoradas a muitas frágeis.
**EN** — Every metric cites its owning P#/Art. Inherit certification weight (eliminatory weighs more than scored). Always measure against a baseline — a loose number with no trend misleads. Keep the index honest: if it doesn't match linter+certification, the index is wrong. Prefer a few strong, anchored metrics over many fragile ones.

## Anti-padrões · Anti-patterns
**PT / EN**
- Medir sem dono da regra — métrica sem P#/Art. é opinião disfarçada de número. / Measuring with no rule owner — a metric with no P#/Art. is opinion disguised as a number.
- Score que vira opinião do medidor. / A score that becomes the measurer's opinion.
- Confundir-se com o Linter — re-detectar a violação pontual em vez de agregá-la. / Confusing itself with the Linter — re-detecting the point violation instead of aggregating it.
- Selo que mente — sustentar um nível que a medição não suporta (o pior erro; ver `CERTIFICATION` §8.3). / A badge that lies — sustaining a level the measurement doesn't support (the worst error).
- Número sem baseline nem tendência — uma foto vendida como filme. / A number with no baseline or trend — a snapshot sold as a film.
- Compensar um eliminatório reprovado com pontos de estética. / Offsetting a failed eliminatory with aesthetic points.

## Roadmap
**PT** — As dimensões medidas crescem só quando um P#/Art. novo (ou uma nova detecção do `LINTER`) pede medição; cada dimensão nova nasce com escala, dono e peso, no mesmo commit em que a regra muda. A tendência e a dívida ganham histórico à medida que os releases se acumulam — o valor da conformidade cresce com o tempo, não com a foto.
**EN** — The measured dimensions grow only when a new P#/Art. (or a new `LINTER` detection) asks for measurement; each new dimension is born with scale, owner and weight, in the same commit the rule changes. Trend and debt gain history as releases accumulate — compliance's value grows with time, not with the snapshot.

## Referências internas · Internal references
`STUDIO_UX.md` §11–§13 · `STUDIO_UX_PRINCIPLES.md` (P1–P25) · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 1–20) · `docs/quality/STUDIO_UX_LINTER.md` · `docs/STUDIO_UX_CERTIFICATION.md` §8 · `STUDIO_UX_ACCESSIBILITY.md` §11 · `governance/STUDIO_UX_VERSIONING.md` · `platform/STUDIO_UX_ARCHITECTURE.md` · `tools/STUDIO_UX_CLI`

---

*Documento vivo. Mede o que os donos definem e o Linter detecta; se um P#, artigo ou detecção muda no dono, a medição muda na mesma leva, nas duas línguas. A conformidade nunca cria regra nem gradua selo — só mede. · Living document. It measures what the owners define and the Linter detects; if a P#, article or detection changes at its owner, the measurement changes in the same commit, in both languages. Compliance never creates a rule nor grades a badge — it only measures.*
