# CLAUDE.md — REGRA MÁXIMA DO STUDIO UX (monorepo do Design System)

> Studio UX é o **produto de design system** que veste os 5 sistemas do Robson (AquaPark, IA Studio, Finanças Pessoais, Delivery, + novos). Monorepo npm workspaces com os pacotes publicáveis em GitHub Packages (`@studio-ux-ds/*`).
> Toda IA/dev que atuar aqui DEVE seguir estas regras sem exceção.
> **Como interagir com o Robson** (idioma pt-BR, re-ancorar pós-compactação, erro silencioso, docs vivos, ambiente/deploy, tom) está em **`COMO-INTERAGIR-COM-ROBSON.md`** (raiz — mesmo conteúdo em todos os projetos). Governança e SSOT do DS em **`STUDIO_UX.md`**; regras de IA em `docs/context/AI_RULES.md`; princípios em `docs/STUDIO_UX_PRINCIPLES.md`; constituição em `docs/governance/STUDIO_UX_CONSTITUTION.md`.

## ⚖️ O QUE O STUDIO UX É — e por que a regra de "porte dos irmãos" NÃO se aplica aqui
O Studio UX é a **interface (design system) que os outros sistemas USAM.** Ele é **upstream, novo e original.** A direção da dependência é só uma: `tokens → components (CSS) → react (adapter) → os sistemas consomem`.

Por isso a regra que vale nos SISTEMAS — *"PORTE, NÃO REINVENTE: olhe o AquaPark/IA STUDIO ANTES e porte o equivalente"* — **NÃO se aplica ao Studio UX.** Aqui **não se porta código dos sistemas**; aqui se **cria** a interface limpa e original que eles vão adotar. Quem porta são os sistemas (as telas deles passam a importar o Studio UX), nunca o contrário.

O *"não reinvente"* aqui tem outro sentido: **não duplicar o que já existe DENTRO do próprio DS.** A camada React já é o `@studio-ux-ds/react` — não recriar; as classes já são o `components.css` — não inventar outras; os valores já são os tokens — não cravar literal. Descobrir QUAIS componentes/telas precisam existir pode olhar as necessidades reais dos sistemas — mas isso é **escopo/descoberta**, e o resultado é código **original e limpo do DS**, não cópia de arquivo do sistema.

## ⛔ REGRA ZERO — LER ANTES DE AGIR (a lição mais cara desta base)
**NUNCA suponha que algo não existe. Inventarie primeiro.** Antes de propor, construir ou "diagnosticar que falta" QUALQUER pacote, componente, token, rota ou função:

1. `grep`/`ls` no monorepo e no pacote relevante. **Um `cat packages/react/index.js` mostra os ~48 componentes React que já existem.**
2. Leia o `README.md` do pacote e o doc dono (SSOT) do assunto.
3. Só então proponha — citando o que leu.

Suposição no lugar de leitura já custou horas nesta base (ex.: reconstruir uma camada React que já existia em `@studio-ux-ds/react`, no pacote errado). **Reinventar = repetir trabalho e introduzir divergência.** Se não leu, não afirme; não construa.

## 🧩 O QUE CADA PACOTE É (decore isto)
Monorepo em `packages/*`, versão em **LOCKSTEP** (todos na mesma versão; `scripts/set-version.mjs`).

- **`@studio-ux-ds/tokens`** — a **fonte da verdade**. `tokens.css` = variáveis `--su-*` (cor/tipo/espaço/raio/sombra/duração), congeladas desde v1.0.0. `--su-action` default = `#4F46E5` (indigo). Nunca valor literal em tela; sempre `var(--su-*)`.
- **`@studio-ux-ds/components`** — **CSS puro** (`components.css`): as classes `.su-*` (btn, card, statcard, table, badge, field, tabs, modal, banner, avatar, timeline, stepper, sidebar, topbar, pagination…). Sobre os tokens. **NÃO é React** — não colocar componente React aqui.
- **`@studio-ux-ds/react`** — **a camada React** (adapter). ~48 componentes em `.jsx` que embrulham as classes `.su-*` numa API de props (Button, Badge, Card, StatCard, DataTable, Field, Input, Select, Switch, Tabs, Modal, ConfirmDialog, Toast, Stepper, Sidebar, TopBar, Breadcrumb, Combobox, CommandPalette, DatePicker, Drawer, Sheet, Popover, FileUpload, PhoneInput, EmptyState…). Barrel em `index.js`. **Runtime descartável** (RUNTIME.md): a Specification (tokens+regras) é a verdade; troca-se o adapter, não o DS. **É AQUI que componente React nasce/cresce — não em `components`.**
- **`@studio-ux-ds/mobile`** / **`@studio-ux-ds/react-native`** — camada Mobile/nativa. **Fronteira P4:** web (`react`) e nativo (`react-native`) NUNCA se importam (o `check-packages.mjs` valida).
- **`@studio-ux-ds/icons`** — ícones. **`@studio-ux-ds/cli`** — gerador/linter/certificação (`studio`).

Como um sistema consome: `import '@studio-ux-ds/tokens/tokens.css'` + `import '@studio-ux-ds/components/components.css'` + `import { DataTable, StatCard, Button } from '@studio-ux-ds/react'`.

## 🚀 BUILD / PUBLICAÇÃO
- **Windows do Robson não tem Node** — build/publish só no servidor/CI. Nunca pedir `npm build/publish` local.
- Publica automático: `.github/workflows/publish.yml` roda em `push` de tag `vX.Y.Z` → `node scripts/check-packages.mjs` → `npm publish --workspaces` (auth via `GITHUB_TOKEN`).
- **Versão em lockstep** — nunca cravar número de cabeça; conferir `git tag --sort=-v:refname` ou perguntar ao Robson (COMO-INTERAGIR §5/§6). Bump com `scripts/set-version.mjs`.
- Se um pacote passar a precisar de build (ex.: bundle), o build tem que entrar ANTES do publish no workflow — senão publica sem `dist`. `check-packages.mjs` exige que tudo em `files` exista.

## 🧠 PENSAR ANTES (obrigatório, antes de tocar em qualquer coisa)
1. **Inventariei** o pacote/componente/token/doc relevante? (Regra Zero.) 2. Qual pacote é o dono do que vou mexer (tokens / components-CSS / react / mobile)? 3. Já existe o componente/classe? (grep `index.js` + `components.css`.) 4. Estou respeitando a fronteira P4 (web ⊥ nativo)? 5. Valor visual vem de token (`--su-*`)? 6. SSOT: o assunto tem um doc dono — vou referenciar, não duplicar? 7. Estados vazio/loading/erro previstos? 8. Bilíngue (PT+EN) se for doc normativo? 9. A mudança bate com o código real dos sistemas que consomem?

## 🚫 ANTI-PADRÕES (reprovado — lições desta base)
- **Supor que um pacote/componente não existe** sem grep. (Reconstruí `@studio-ux-ds/react` à toa.)
- Colocar componente React em `components` (é CSS) ou CSS em `react`.
- Reimplementar em vez de reusar o adapter já pronto.
- Maquete HTML `.su-*` à mão como "entrega" — o produto é o pacote importável, não um mock.
- Cravar número de versão; quebrar lockstep; publicar sem o build necessário.
- Cobertura rasa: ao portar uma tela de sistema, cobrir CADA coluna/ação/botão/estado do componente real (ver `docs/quality/PROFUNDIDADE-OBRIGATORIA.md`).
- Documentar/afirmar de memória. Fonte da verdade = doc + código, nunca memória.

## 🎨 STORYBOOK (doc navegável dos componentes)
Quando existir, o Storybook documenta o **`@studio-ux-ds/react` real** (cada componente com exemplo vivo + props + código) e é hospedado pela CI (Pages). Stories escritas contra a API REAL de cada componente (ler o `.jsx` antes) — nunca contra uma API suposta.

## 🔌 SISTEMAS QUE CONSOMEM (estado)
`@studio-ux-ds/react` hoje é importado por: IA Studio (2 arquivos), AquaPark/Finanças/Delivery (0). O caminho de adoção é portar as telas pra importar o adapter — não escrever `.su-*` na mão. Repos reais: `C:\Users\Flowspec\Documents\delivery-system\{aquapark,IA STUDIO,delivery-system}` e `C:\Users\Flowspec\Documents\delivery-system\financas-pessoais`.

## 📚 DOCS DONOS (SSOT — ler o dono antes de mexer no assunto)
`STUDIO_UX.md` (governança) · `docs/governance/STUDIO_UX_CONSTITUTION.md` · `docs/STUDIO_UX_PRINCIPLES.md` (P1–P25) · `docs/context/AI_RULES.md` · `docs/platform/STUDIO_UX_RUNTIME.md` (adapter descartável) · `docs/platform/STUDIO_UX_PACKAGES.md` · `docs/governance/STUDIO_UX_VERSIONING.md` · `docs/tokens/*` · `docs/components/STUDIO_UX_COMPONENT_LIBRARY.md` · `docs/quality/PROFUNDIDADE-OBRIGATORIA.md` · `docs/quality/REFINAMENTO-E-PROPAGACAO.md` (DoD por frente + propagação de refinamento: código→Storybook→docs→CHANGELOG/versão→sistemas).

---

*Versão 0.1.0 — fundação inicial. Escrito depois de uma sessão em que a IA agiu por suposição (reconstruiu a camada React que já existia) — a Regra Zero existe pra isso não repetir. Atualizar quando a arquitetura de pacotes mudar.*
