---
name: app-referencia-studio-ux
description: App de referência interativo do Studio UX (molde visual dos sistemas) — estado, arquitetura e próximos passos
type: project
---
App de referência interativo do Studio UX — protótipo estático (HTML único) que é o **molde visual** dos 5 sistemas. Arquivo: `STUDIO-UX/examples/referencia-aquapark.html` (artefato Cowork "referencia-aquapark"). AquaPark, accent laranja. Versão atual: **v13**.

⚠️ FONTE DA VERDADE = DOC NO REPO, NÃO MEMÓRIA. Antes de mexer, LER:
- `STUDIO-UX/docs/quality/PROFUNDIDADE-OBRIGATORIA.md` — regra da profundidade obrigatória + tabela de auditoria por tela (veredito) + seção 6 com achados históricos. Ao mexer numa tela, atualizar o veredito lá.
- `STUDIO-UX/COMO-INTERAGIR-COM-ROBSON.md`, `docs/context/AI_RULES.md`, `docs/governance/STUDIO_UX_CONSTITUTION.md`.

ESTADO (v13): **AquaPark = 100% FIEL_RICO** nas telas auditadas. A 1ª auditoria de profundidade (2026-07-20) deu 0 FIEL_RICO / 12 RASO / 8 DIVERGENTE nas 20 bespoke; TODAS foram refeitas na v13 espelhando o componente real de cada rota (via Workflow paralelo: 1 agente lê o .jsx real e devolve função+css; eu integrei por brace-match e fiz QA). QA v13: 63 telas, 0 erro JS, 0 chrome nativo, 0 overflow, 0 texto null; revisadas visualmente uma a uma.
Fixes globais adicionados: `.su-btn svg{15px}` (ícones de botão não estouram); `kpi()` esconde ícone/delta quando null (sem "▼ null" nem bolinha); toggles sempre laranja (`.switch.on`=--su-action).

MENU 100% = nav real (`Sidebar.jsx`). 20 listagens com colunas reais. Seção "Studio UX · Referência" do menu = demos de arquétipo (fora de auditoria).

Arquitetura: tokens `--su-*` inline; `.content`/`<main>` full-width (real também); `render(scr,title,preset,grp)`; topbar = SÓ breadcrumb "Seção › Página" (título vem do h1 do conteúdo, NUNCA repetir na topbar); `SCREENS={}`/`LIST={}` const (evaluate por nome cru, NÃO window); ⌘K; accordion.
Helpers no arquivo: PLUS/SEARCH/EDIT/TRASH/COLS/DL/SORT/SPARK/ICN{edit,trash,refresh,eye}; badge([txt,cls]); kpi(l,v,d,dir,icn,bg,fg); hbar; chip; ic(key); initials; CHART_LINE.
Componentes reais staged em `/mnt/user-data/uploads/aquapark/admin-panel/src/pages/...`; minhas funções extraíveis via brace-match (script /tmp/extract.cjs pattern).
QA técnico: Playwright `/opt/pw-browsers`, require `$(npm root -g)/playwright` num .cjs; render todas; flagar chrome nativo (borderTopStyle outset/inset, bg cinza UA, select/checkbox/radio appearance!=none); overflow; texto /null|undefined|NaN/; olhar COM topbar no clip; + comparar densidade com o real.

PRÓXIMO: replicar pros outros 3 sistemas = trocar MENU real (do código) + accent, sobre os mesmos arquétipos, espelhando cada componente real (mesma disciplina de profundidade). Menus lidos: IA Studio (`platform-admin`), Finanças (`admin-panel`); falta ler menu do `delivery-system/frontend`. Real do AquaPark fica em `C:\Users\Flowspec\Documents\delivery-system\aquapark`.
