# REFINAMENTO E PROPAGAÇÃO — Definição de Pronto de uma frente do Studio UX

> **REGRA MÁXIMA:** o Studio UX evolui por **refinamento iterativo** (constrói → vê → ajusta), não por spec perfeita no papel. Mas **todo refinamento é controlado**: entra na camada certa do código, **propaga pra TODOS os lugares que toca**, e vira release versionado. **Nenhuma frente fecha com o Storybook ou a doc mentindo.**
>
> Esta doc é a **Definição de Pronto (DoD)** de qualquer frente do Studio UX. Operacionaliza `COMO-INTERAGIR-COM-ROBSON.md` §4 (docs/código vivos) e §7 (governança/checkpoint) para o fluxo de refinamento do DS. Irmã da `PROFUNDIDADE-OBRIGATORIA.md` (aquela cobra *profundidade*; esta cobra *propagação*).

## ⚖️ POR QUE EXISTE
- O DS é **consumido por N sistemas** (AquaPark, IA Studio, Finanças, Delivery, novos). Refinamento descontrolado no DS **rippla** pra todos — bom quando propagado, veneno quando esquecido.
- O **Storybook documenta o `@studio-ux-ds/react` REAL.** Se um componente muda e a story não acompanha, o Storybook passa a **mentir** — e mentira em doc é pior que doc faltando.
- Doc viva descreve o que existe **hoje**. Refinamento que não atualiza a doc do assunto vira lixo que engana quem lê depois.

## 🔁 O QUE É UMA "FRENTE"
Unidade de trabalho **fechável**: um componente novo, um **padrão** novo (ex.: `ListPage`), um **refinamento visual** (ex.: filtro que sobe pro header do card), uma **adoção** num sistema. **Uma por vez**, com checkpoint pro Robson antes da próxima (§7). Refinamentos pequenos podem ser **agrupados numa frente** e soltos juntos no checkpoint — sem micro-release a cada mexida.

## 🗺️ OS 5 LUGARES QUE UM REFINAMENTO TOCA (mapa de propagação)
Todo refinamento passa por esta régua. Se tocou o item, ajusta o item.

| # | Camada | Onde | Quando |
|---|--------|------|--------|
| 1 | **Código do DS** | `packages/tokens` (valor) · `packages/components/components.css` (classe `.su-*`) · `packages/react/*.jsx` (componente/adapter) | Sempre que a forma/valor/API muda. Valor visual = token; estilo = CSS; comportamento/props = react. Nunca literal em tela. |
| 2 | **Storybook** | `stories/*.stories.jsx` | Componente/padrão mudou → story nova/atualizada refletindo a **API real**. `build-storybook` tem que rodar limpo. |
| 3 | **Docs donos (SSOT)** | `docs/components/…` · `docs/patterns/…` · `docs/layouts/…` · `docs/tokens/…` | O doc dono do assunto descreve o estado **atual**. Spec temporária de andaime sai quando a frente fecha. |
| 4 | **CHANGELOG + versão** | `CHANGELOG.md` + tag `vX.Y.Z` (lockstep, `scripts/set-version.mjs`) | Todo refinamento é **release**. Entrada no CHANGELOG + bump em **lockstep** (todos os pacotes na mesma versão). |
| 5 | **Sistemas consumidores** | lista de re-adoção (no checkpoint) | A peça que mudou é usada por quem? Registrar quem precisa **re-adotar** depois. Não precisa adotar já — mas **não pode ficar invisível**. |

**Frentes visuais:** antes de alterar um consumidor, a revisão acontece no **Laboratório visual integrado** do Storybook, em claro e escuro. O laboratório usa o Runtime real; exemplos HTML ou CSS local do consumidor não são evidência de que o DS está pronto.

## ✅ CHECKLIST DE FIM DE FRENTE (o "roundup")
Antes de dizer **pronto**, responder e agir:

1. **Houve refinamento** de API, visual, token ou comportamento nesta frente? Se **não**, pula 2–6.
2. **Código do DS** ajustado na **camada certa**? (token → CSS → react, na ordem de quem é dono do quê.)
3. **Storybook:** a story do que mudou está nova/atualizada e reflete a API real? `build-storybook` roda limpo? Passou o QA de profundidade (sem chrome nativo, ícones renderizando, claro+escuro) — ver `PROFUNDIDADE-OBRIGATORIA.md`?
   - Se a frente é visual: o cenário integrado do Laboratório visual foi revisado em claro+escuro antes de qualquer adoção-canário?
4. **Docs donos** do assunto atualizados? Andaime/spec temporária removida?
5. **CHANGELOG** com entrada + **versão bumpada em lockstep**? `node scripts/check-packages.mjs` passa (files, lockstep, fronteira P4)?
6. **Sistemas consumidores** da peça listados pra re-adoção no checkpoint?
7. **Checkpoint** gerado pro Robson (o que mudou · riscos · o que não foi testado · o que falta propagar)?

## 🚫 REGRAS DURAS
- **Storybook não fecha frente** se não buildar, ou se a story não refletir a API real do `@studio-ux-ds/react`.
- **Refinamento é release versionado** (lockstep). Nada de mexida solta no código sem CHANGELOG + tag. Mas **agrupa por frente** e solta no checkpoint (sem micro-release).
- **Doc/story que descreve algo que mudou e não foi atualizada = lixo que engana.** Atualiza na mesma leva ou não fecha.
- **Nunca cravar número de versão de cabeça** — conferir `git tag --sort=-v:refname`/`CHANGELOG.md` ou perguntar (§5/§6).
- **Identidade x marca (decisão vigente):** o DS dita **layout/desenho**; o **accent (marca) é por app** (via o painel de personalização / tokens de marca). Refinamento de layout é do DS; cor de marca é do app — não confundir as duas camadas ao propagar.

## Contrato de adoção de layout · Layout adoption contract

**PT** — Adoção do Studio UX é feita por **jornada completa**, nunca por troca cosmética isolada. Ao migrar uma área, a lista, estados vazio/loading/erro, detalhe, criação, edição, confirmação destrutiva e retorno precisam usar o padrão novo na mesma entrega. A lista operacional não tem coluna de ações por linha: a linha/card é o acesso canônico ao detalhe; o detalhe concentra editar e excluir; criar e editar usam rotas/páginas próprias. Modal é reservado a confirmação ou tarefa curta e contextual. Componente local legado não pode permanecer renderizado ao lado do equivalente Studio UX — primeiro substitui toda a jornada, depois remove o legado.

**EN** — Studio UX adoption happens by **complete journey**, never by isolated cosmetic replacement. When migrating an area, list, empty/loading/error states, detail, creation, editing, destructive confirmation, and return path must use the new pattern in the same delivery. An operational list has no per-row action column: row/card is the canonical way to detail; detail concentrates edit and delete; create and edit use dedicated routes/pages. Modal is reserved for confirmation or a short contextual task. A legacy local component cannot remain rendered beside its Studio UX equivalent — replace the whole journey first, then remove the legacy implementation.

**PT** — Gate obrigatório antes de adotar em sistema novo: (1) validar o cenário integrado no Laboratório visual, claro e escuro; (2) declarar a jornada que será migrada; (3) inventariar e remover os componentes locais concorrentes daquela jornada; (4) revisar desktop e mobile; (5) só então liberar a área. Não existe “adaptação parcial” como estado final.

**EN** — Mandatory gate before adopting in a new system: (1) validate the integrated scenario in the visual Lab, light and dark; (2) declare the journey being migrated; (3) inventory and remove competing local components from that journey; (4) review desktop and mobile; (5) only then release the area. “Partial adaptation” is never a final state.

## 🧭 FLUXO (refinar à medida que implanta)
```
constrói a peça  →  vê (mock / story / screenshot claro+escuro)  →  Robson refina
     →  ajusta no DS (camada certa)  →  PROPAGA (os 5 lugares)  →  checkpoint  →  próxima frente
```
O ideal declarado pelo Robson: **ir refinando conforme implanta**, e a cada frente fechada rodar este roundup pra garantir que o refinamento chegou em todos os lugares — código, Storybook, docs, versão e sistemas.

## 🧾 DEFINIÇÃO DE PRONTO (uma frente do Studio UX)
Uma frente só está **PRONTA** se: código na camada certa (token/CSS/react) · **Storybook atualizado e buildando limpo** · docs donos refletindo o estado atual · **CHANGELOG + bump em lockstep** · `check-packages.mjs` passa · **sistemas consumidores mapeados** pra re-adoção · checkpoint gerado. **NÃO é pronto:** refinamento no código com Storybook desatualizado, sem entrada no CHANGELOG, sem versão, ou com a lista de re-adoção esquecida.

---

*Versão 0.1.0 — criada quando decidimos evoluir o DS por refinamento iterativo (padrão "Tela de Lista"/ListPage como primeira frente sob esta regra). Atualizar se o mapa de propagação ganhar camadas novas.*
