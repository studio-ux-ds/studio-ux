---
name: consumo-adapter-react
description: Como um app Vite consome o @studio-ux-ds/react (adapter) — padrão validado no Finanças
type: reference
---
Padrão pra uma tela/app passar a consumir o adapter `@studio-ux-ds/react` (em vez de `.su-*` na mão). Validado 2026-07-20 portando `Receitas.jsx` do Finanças (admin-panel).

INFRA (2 coisas, só):
1. `package.json` deps: add `@studio-ux-ds/react` no mesmo pin dos outros (`~1.1.15`). O `.npmrc` já roteia `@studio-ux-ds:registry=https://npm.pkg.github.com`; a auth do server build já vale pros outros 3 pacotes.
2. **vite.config NÃO muda** — `plugins: [react()]` puro basta. O esbuild do Vite transforma o `.jsx` cru do pacote (publicado sem build) nativamente em node_modules. Espelha o IA Studio (`platform-admin`, que consome o adapter com vite plain). Provado com smoke test (`vite build` limpo).

PADRÃO DE PORT (Finanças):
- Importar de `@studio-ux-ds/react` só o que tem equivalente LIMPO: `Button`, `SegmentedControl`, `ConfirmDialog`, etc. Não forçar `Card` onde o layout é edge-to-edge (o `.su-card` tem padding 20px) — deixar composites bespoke no `.card` (que já consome `--su-*`).
- **Ícones:** o Finanças NÃO carrega a webfont Tabler (usa lucide + `@studio-ux-ds/icons`). Então NÃO usar a prop `icon=` do `Button`/`IconButton` (renderiza `<i class="ti ti-...">` que não pinta). Passar o ícone lucide como CHILD: `<Button variant="primary"><Plus size={15}/> Texto</Button>`.
- **Cor de marca:** o adapter herda `--su-action ← --ap-primary` (via `studio-ux-brand.css`), então `Button variant="primary"` sai navy (a marca do app), não indigo. Dark automático.
- `ConfirmDialog` do adapter: props `open/onClose/onConfirm/title/message/confirmLabel/loading` (SEM `danger`/`cancelLabel` — é sempre danger; loading mostra "Processando…").
- Manter dados/handlers/permissões (`can()`) idênticos — troca só a camada de UI.

VERIFICAÇÃO (sem GitHub Packages auth na nuvem): reconstruir os 4 pacotes @studio-ux-ds em node_modules a partir de `/home/claude/studio-ux/packages/*`, montar mini-app Vite (+ tailwind + o `index.css`/`studio-ux-brand.css` do app pra fidelidade), `vite build` + screenshot Chromium claro/escuro.

ESTADO: Finanças `Receitas.jsx` portada (Button+SegmentedControl+ConfirmDialog) — entregue, aguardando validação do Robson antes de replicar na irmã `Despesas.jsx`. Deploy do Finanças é por tag + painel Atualização (não taggear sem ok).
