# STUDIO_UX_BRANDING.md — Marca do cliente (white-label) · Client branding

> Documento normativo vivo. Responde a: **onde a marca do cliente (logo, favicon, ícone de app/PWA, cor) ancora no sistema, sem quebrar o design system?**
> Living normative document. Answers: **where does the client's brand (logo, favicon, app/PWA icon, color) anchor in the system, without breaking the design system?**
> Governança: `STUDIO_UX_THEMES.md` (cor de ação), `STUDIO_UX_SURFACES.md`, `governance/STUDIO_UX_CONSTITUTION.md` (Art. 19 — a plataforma não é dona do dado de negócio).

```
Architecture Boundary Check — STUDIO_UX_BRANDING
Resolve · Solves:            os PONTOS DE ANCORAGEM da identidade do cliente (logo/favicon/ícone de app/cor de ação)
                             e como trocá-los sem editar o framework.
Não pertence a outro porque · Not elsewhere because:
                             THEMES é dono da COR (tokens); SURFACES dos contêineres. Faltava o contrato de ONDE a
                             logo/ícone do cliente entra e como o produto os injeta em runtime.
Complementa · Complements:   THEMES (cor de ação), SURFACES, ICONOGRAPHY, os adapters.
Nunca substitui · Never replaces: THEMES (cor), nem os donos de tela.
Dono · Owner:                este doc, para o domínio "marca do cliente / white-label".
```

---

## 1. Princípio · Principle

**PT** — O Studio UX é **white-label por padrão**: a identidade visual estrutural (tokens, ritmo, componentes) é do sistema; a **marca do cliente** entra por **slots definidos**, nunca reescrevendo CSS. Três coisas o cliente troca: a **cor de ação** (já coberta por THEMES — 7 acentos sóbrios), a **logo/símbolo** (slots abaixo) e os **ícones de app** (favicon + PWA). Nada disso exige tocar no framework.

## 2. Os slots de logo · The logo slots

**PT** — Todo lugar que mostra a marca usa a mesma classe-slot **`.su-brand__logo`** (um quadrado com o símbolo por padrão). O produto substitui o conteúdo do slot pela logo do cliente — de preferência um `<img>` — mantendo o tamanho do slot:

```html
<!-- padrão (símbolo do sistema) -->
<span class="su-brand__logo"><i class="ti ti-square-rounded"></i></span>

<!-- marca do cliente -->
<img class="su-brand__logo" src="{logo_do_cliente}" alt="{nome}">
```

Os slots aparecem em (todos usam a mesma classe, tamanhos variam por contexto):

| Superfície | Onde | Tamanho típico |
|---|---|---|
| **Rodapé/topo da sidebar** | `.su-sidebar__brand` | 22–26px |
| **Tela de login** | painel de marca + cabeçalho do formulário | 28–32px |
| **Topbar** (opcional) | ao lado do título | 22px |
| **E-mails/PDF** (fora da UI) | gerado pelo produto | livre |

**PT** — Regra: a logo do cliente **não** troca a cor de ação nem o layout — só ocupa o slot. Logo muito colorida convive com o acento sóbrio porque o acento governa botões/foco/links, não a marca.

## 3. Favicon e ícone de app/PWA · Favicon and app/PWA icon

**PT** — Favicon e ícone de app **não são CSS** — são recursos servidos pelo produto e injetados no `<head>` / `manifest`. O Studio UX não os embute (Art. 19: a plataforma não é dona do dado do cliente); ele define **o contrato** de como o produto os injeta em runtime, a partir da mesma fonte da logo:

- **Favicon:** `<link rel="icon">` apontando para o asset do cliente (idealmente um PNG/SVG quadrado do símbolo). Trocado em runtime pelo produto (ex.: um hook `useDocumentBranding` que reescreve o `<link>`).
- **Apple touch icon:** `<link rel="apple-touch-icon">` (180×180) para "Adicionar à tela de início" no iOS.
- **PWA:** entradas `icons[]` no `manifest.webmanifest` (192×192 e 512×512, mais um `maskable`). O produto gera/serve o manifest com a logo e o `theme_color` = cor de ação escolhida.

**PT** — Recomendação de assets que o cliente fornece (o resto o produto deriva): um **símbolo quadrado** (SVG preferido) para favicon/app-icon, e uma **logo horizontal** (com nome) para a sidebar/login. Cor de ação vem do seletor de acento (THEMES), não do arquivo de logo.

## 4. Como o produto injeta (runtime) · How the product injects (runtime)

**PT** — É responsabilidade do **produto consumidor** (não do framework):
1. Ler a marca do cliente da sua própria config (logo, símbolo, acento).
2. Preencher os slots `.su-brand__logo` com o `<img>` do cliente.
3. Aplicar o acento via `--su-action` (`document.documentElement.style.setProperty('--su-action', hex)` — como o seletor de acento dos exemplos).
4. Reescrever `<link rel="icon">`/`apple-touch-icon` e o `manifest` com os ícones do cliente + `theme_color`.

O framework garante que **os slots existem e têm tamanho/forma corretos**; o produto garante **qual imagem entra**.

## 5. Anti-padrões · Anti-patterns

**PT / EN**
- Embutir a logo do cliente dentro do pacote do design system. / Bundling the client logo inside the DS package.
- Deixar a logo redefinir a cor de ação ou o layout. / Letting the logo redefine the action color or layout.
- Favicon/manifest hardcoded no framework. / Hardcoding favicon/manifest in the framework.
- Criar um slot novo de marca ad-hoc em vez de reusar `.su-brand__logo`. / Ad-hoc brand slots instead of reusing `.su-brand__logo`.

## Referências internas · Internal references
`STUDIO_UX_THEMES.md` · `STUDIO_UX_SURFACES.md` · `STUDIO_UX_ICONOGRAPHY.md` · `examples/app.html` (slots em uso) · `examples/login.html`

---

*Documento vivo. Ancoragem da marca do cliente; a cor é do THEMES, os contêineres do SURFACES. · Living document.*
