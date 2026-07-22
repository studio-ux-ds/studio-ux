---
name: studio-ux-componentes-react
description: Virada de rumo — @studio-ux-ds/components virou biblioteca React de verdade + Storybook (o "Flux" do Robson)
type: project
---
## Contexto (por que mudou)
O app de referência (HTML `.su-*` à mão) e a doc NÃO resolviam o problema real do Robson: ele quer **algo igual ao Flux (flux.dashboardpack.com)** — componentes/páginas REAIS e importáveis que ele usa como layout dos sistemas, com cada cenário coberto. Maquete não protege o porte; a doc "é enfeite se não encaixa no código". Diagnóstico da raiz: **o `@studio-ux-ds/components` era só CSS** (`components.css`, classes `.su-*`) — nunca teve a camada React. Por isso portar era sempre trabalho manual tela a tela, raso.

## O que foi feito (2026-07-20)
Transformei o `@studio-ux-ds/components` em **biblioteca React de verdade** (cascas finas sobre as classes `.su-*` que já existiam) + **Storybook** como doc viva (o "Flux" dele). Tudo em `STUDIO-UX/packages/components/`:
- `src/components/*.jsx` (11 arquivos, **37 componentes**): Button, IconButton, Badge, Card, StatCard, DataTable, PageHeader, Field, Input, Textarea, Select, Checkbox, Radio, Switch, NumericInput, Banner, Toast, Spinner, Skeleton, EmptyState, Progress, Tabs, Segmented, Breadcrumb, Pagination, Link, Divider, Modal, ConfirmDialog, Menu, Tooltip, Avatar, Tag, DescriptionList, Timeline, Stepper, Accordion + `index.js` (barrel).
- `src/stories/*.stories.jsx` (11) com exemplo vivo + variações + props (autodocs).
- `.storybook/main.js` + `preview.js` (importa `../../tokens/tokens.css` + `../components.css`).
- `tsup.config.js` (build ESM+CJS, externaliza react).
- `package.json` reescrito: React (main/module/exports p/ dist + `./components.css`), peerDeps react/react-dom/@studio-ux-ds/tokens, devDeps storybook+tsup+vite, scripts build/storybook. **Versão ainda 1.1.15 — Robson bumpa e publica.**
- `components.css` + `demo.html` preservados. Sobrou `packages/components/_to_delete/_incoming.tgz` (Robson pode apagar).

Verificado no container: `tsup` builda (dist/index.mjs+index.js, 37 exports); Storybook renderiza tudo fiel, accent indigo `#4F46E5` (default do DS), 0 erro JS.

Accent default do Studio UX = **`--su-action: #4F46E5`** (indigo, em `packages/tokens/tokens.css` `:root`). Finanças sobrepõe com `--ap-primary` (navy, trocável em Aparência).

## Próximos passos
1. **Publicar** o pacote: `npm install` + `npm run build` (tsup) + bump de versão + `npm publish` (GitHub Packages). Roda no servidor/CI — Windows do Robson não tem Node. Aí os sistemas fazem `import { DataTable, StatCard, Button } from '@studio-ux-ds/components'` + `import '@studio-ux-ds/components/components.css'`.
2. **Batch 2 de componentes** (faltam, especializados): Combobox, CommandPalette (cmdk), Calendar/DatePicker, Drawer, Sheet, PhoneInput, Upload, Popover, Sidebar/Topbar/Nav (layout), FormSection/FormGrid/FormActions, Brand.
3. **Portar telas**: montar cada tela dos sistemas com esses componentes (cobertura garantida) — começar pelo finanças.

## Estado dos sistemas (não regrediu)
Finanças: fundação polida (v0.1.26, cards com elevação + btn) + Despesas com cabeçalhos de seção (v0.1.27, no disco/pendente commit). AquaPark: app de referência HTML `examples/referencia-aquapark.html` (v13, ver `docs/quality/PROFUNDIDADE-OBRIGATORIA.md`) — serve como espelho visual, mas o caminho real agora é a biblioteca React + porte.
Regras do Robson: pt-BR; nunca cravar versão de cabeça; deploy por git tag; sem Node no Windows; pente fino (cobrir cada coluna/ação/botão); fonte da verdade = doc/código, não memória.
