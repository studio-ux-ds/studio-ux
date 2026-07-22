---
name: padrao-listpage-e-refinamento
description: Frente ListScreen do Studio UX (FEITA + no ar no Finanças) + processo de refinamento; próxima = AppShell + Customize
type: project
---
DIREÇÃO (Robson): o Studio UX tem lógica de exibição PRÓPRIA — adotar RE-DESENHA a tela no archetype do DS. Molde = Vendas do AquaPark, inspirado no Flux. Regra: **idêntico ao Flux em posição e comportamento**. O padrão já existia como molde `list` (TEMPLATES.md); a frente foi materializá-lo em React runtime.

STATUS: **ListScreen no ar em produção no Finanças (Receitas), v0.1.31.** ✅
- Studio UX: `@studio-ux-ds/react` ganhou `patterns/PageHeader` + `patterns/ListScreen` (composição dos átomos). `DataTable` ganhou `footer` + `selectable` (opt-in). CSS de padrão no `components.css`. **Publicado 1.1.18** (1.1.16 falhou por bump não rodado; 1.1.17/1.1.18 verdes).
- Fix v1.1.18: `.su-cards` era grid (estourava mobile) → **flex-column + min-width:0** nos filhos (`.su-listscreen > *`, `.su-cards > *`). Achado ao portar a Receitas.
- Finanças Receitas.jsx re-desenhada no `ListScreen` (v0.1.29→30 falharam; **v0.1.31 subiu**). Duas seções viraram uma lista com coluna Tipo; header com busca+segmentado (Flux); desktop tabela / mobile cards (P4); ícones lucide + webfont Tabler no index.html.

IDENTIDADE (decisão vigente): layout do DS, **cor = marca do app** (Finanças verde). Robson viu no ar e vai **decidir a cor depois de ver o AppShell/Customize** (onde a cor se troca). Opção alternativa: identidade própria indigo = desligar o alias `--su-action ← --ap-primary` no studio-ux-brand.css (1 linha).

PRÓXIMA FRENTE: **AppShell + painel Customize.** O que o Robson notou ("barra superior igual"): a topbar/sidebar são o shell persistente (P22), frente separada. AppShell = Sidebar + TopBar (busca ⌘K, notif, avatar) do DS + **painel Customize** (Tema claro/escuro/sistema · Cor/accent = marca por app · Densidade · Layout · Direção LTR/RTL · Idioma i18n). É onde a cor/identidade se resolve. Grande — precisa de plano próprio (Fase 0 ancorar docs + Fase 1 spec, como no ListScreen).

Verificação de consumo em [[consumo-adapter-react]]. Regras de deploy/versão em [[feedback_versionamento]] e [[feedback_deploy_financas]].
