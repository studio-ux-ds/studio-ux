#!/usr/bin/env node
/**
 * Studio UX — Project Generator (Épico 4 · STUDIO_UX_PROJECT_GENERATOR).
 * Faz um projeto NASCER conforme: produto (Desktop OU Mobile) → arquétipo → versão declarada → estrutura pronta (§1).
 * O projeto gerado é DERIVADO (camada Templates do RUNTIME): DECLARA a dependência do Studio UX, NUNCA copia o
 * framework (Art. 1/14, §3). Aplica os componentes/tokens/gramática oficiais — não os redefine. Pontos de conteúdo
 * nascem vazios, à espera do dado de negócio (Art. 19). Os moldes de tela são do generation/TEMPLATES: aqui o shell
 * é real e o miolo de cada tela é um ponto de conteúdo que cita o molde a instanciar — não duplicamos TEMPLATES.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const VERSION = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;

// ---------------------------------------------------------------------------
// Catálogo de arquétipos (§2). Cada um: bases suportadas, propósito, navegação e
// telas-molde (cada tela cita o molde do TEMPLATES/guia-de-domínio a instanciar).
// ---------------------------------------------------------------------------
const ARCHETYPES = {
  base: { bases: ["desktop", "mobile"], purpose: "shell nu do produto — ponto de partida para compor.", nav: [
    { route: "inicio", label: "Início", icon: "home", mold: "shell", note: "Área principal nua com os estados globais." },
  ] },
  portal: { bases: ["desktop", "mobile"], purpose: "porta de entrada informativa/autoatendimento — informar e encaminhar.", nav: [
    { route: "inicio", label: "Início", icon: "home", mold: "conteúdo (PATTERNS)", note: "Página de conteúdo/boas-vindas." },
    { route: "conteudo", label: "Conteúdo", icon: "article", mold: "lista de conteúdo (PATTERNS)", note: "Artigos/seções informativas." },
    { route: "busca", label: "Busca", icon: "search", mold: "padrão de busca (PATTERNS)", note: "Campo de busca + resultados." },
    { route: "entrar", label: "Entrar", icon: "login", mold: "login (PATTERNS)", note: "Acesso do usuário." },
  ] },
  crm: { bases: ["desktop"], purpose: "gestão de relacionamento — acompanhar pessoas e negociações.", nav: [
    { route: "painel", label: "Painel", icon: "layout-dashboard", mold: "dashboard (DASHBOARD)", note: "Visão do funil e da carteira." },
    { route: "contatos", label: "Contatos", icon: "users", mold: "lista+detalhe (TABLES)", note: "Registros com filtro e CRUD." },
    { route: "negocios", label: "Negócios", icon: "briefcase", mold: "lista+detalhe (TABLES)", note: "Oportunidades por estágio." },
    { route: "interacoes", label: "Interações", icon: "timeline", mold: "timeline (PATTERNS)", note: "Histórico de contatos." },
  ] },
  erp: { bases: ["desktop"], purpose: "operação densa e transacional — registrar e processar operação.", nav: [
    { route: "modulos", label: "Módulos", icon: "box", mold: "shell de módulos (NAVIGATION)", note: "Entrada dos domínios." },
    { route: "cadastros", label: "Cadastros", icon: "forms", mold: "formulário longo (FORMS)", note: "Entidades base." },
    { route: "lancamentos", label: "Lançamentos", icon: "file-invoice", mold: "tabela densa (TABLES)", note: "Transações do dia." },
    { route: "relatorios", label: "Relatórios", icon: "chart-bar", mold: "relatório (DASHBOARD)", note: "Consolidações." },
  ] },
  analytics: { bases: ["desktop"], purpose: "leitura de indicadores — ler o estado do negócio, nunca decorar.", nav: [
    { route: "painel", label: "Painel", icon: "layout-dashboard", mold: "dashboard (DASHBOARD)", note: "Grade de KPIs e gráficos." },
    { route: "indicadores", label: "Indicadores", icon: "chart-dots", mold: "cartões de KPI (DASHBOARD)", note: "Métricas detalhadas." },
    { route: "relatorios", label: "Relatórios", icon: "chart-bar", mold: "filtro de período (PATTERNS)", note: "Recortes temporais." },
  ] },
  "ia-studio": { bases: ["desktop"], purpose: "orquestração de assistentes/automação — configurar comportamento sem jargão (P11).", nav: [
    { route: "assistentes", label: "Assistentes", icon: "robot", mold: "lista de configuração (PATTERNS)", note: "Quem são e o que fazem." },
    { route: "fluxos", label: "Fluxos", icon: "sitemap", mold: "editor/canvas (PATTERNS)", note: "Automação visual." },
    { route: "conhecimento", label: "Conhecimento", icon: "book", mold: "lista (TABLES)", note: "Bases que os assistentes usam." },
    { route: "ajustes", label: "Ajustes", icon: "settings", mold: "wizard/config (FORMS)", note: "Comportamento geral." },
  ] },
  "customer-portal": { bases: ["desktop", "mobile"], purpose: "autoatendimento do cliente final — resolver com o mínimo de fricção.", nav: [
    { route: "inicio", label: "Início", icon: "home", mold: "status + ação única (PATTERNS)", note: "Situação atual em destaque." },
    { route: "faturas", label: "Faturas", icon: "file-invoice", mold: "lista + status (TABLES)", note: "Cobranças e 2ª via." },
    { route: "pedidos", label: "Pedidos", icon: "package", mold: "lista + status (TABLES)", note: "Acompanhamento." },
    { route: "ajuda", label: "Ajuda", icon: "help", mold: "conteúdo (PATTERNS)", note: "Autoatendimento." },
  ] },
  marketplace: { bases: ["desktop", "mobile"], purpose: "catálogo com muitos atores — encontrar e escolher entre muitos itens.", nav: [
    { route: "vitrine", label: "Vitrine", icon: "building-store", mold: "listagem/busca (TABLES)", note: "Itens em destaque." },
    { route: "busca", label: "Busca", icon: "search", mold: "busca (PATTERNS)", note: "Encontrar por termo/filtro." },
    { route: "categorias", label: "Categorias", icon: "category", mold: "navegação (NAVIGATION)", note: "Recorte por classe." },
    { route: "carrinho", label: "Carrinho", icon: "shopping-cart", mold: "detalhe/escolha (PATTERNS)", note: "Fluxo de escolha." },
  ] },
  backoffice: { bases: ["desktop"], purpose: "administração interna — operar os bastidores com controle e rastro.", nav: [
    { route: "painel", label: "Painel", icon: "layout-dashboard", mold: "dashboard (DASHBOARD)", note: "Visão operacional." },
    { route: "usuarios", label: "Usuários", icon: "users", mold: "tabela (TABLES)", note: "Contas e papéis." },
    { route: "permissoes", label: "Permissões", icon: "shield-lock", mold: "formulário (FORMS) + P23", note: "Controle de acesso." },
    { route: "auditoria", label: "Auditoria", icon: "history", mold: "tabela + estados de auditoria", note: "Rastro do que mudou." },
  ] },
};

// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const a = { product: "", archetype: "", name: "", out: "" };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--product" || k === "-p") a.product = argv[++i];
    else if (k === "--archetype" || k === "-a") a.archetype = argv[++i];
    else if (k === "--name" || k === "-n") a.name = argv[++i];
    else if (k === "--out" || k === "-o") a.out = argv[++i];
  }
  return a;
}

function fail(msg) { console.error("\x1b[31m✗\x1b[0m " + msg); process.exit(1); }

function listArchetypes() {
  console.log("\x1b[1mArquétipos disponíveis\x1b[0m (§2 — cada um deriva de uma base, nunca é fork):");
  for (const [id, a] of Object.entries(ARCHETYPES))
    console.log("  " + id.padEnd(16) + "\x1b[2m[" + a.bases.join("/") + "] " + a.purpose + "\x1b[0m");
}

// --- construtores de shell (markup REAL; classes oficiais .su-* / .su-m-*) ---
const brand = (name) =>
  `<span class="su-brand__logo" style="width:22px;height:22px;border-radius:7px;background:var(--su-action);color:#fff;display:inline-flex;align-items:center;justify-content:center;"><i class="ti ti-square-rounded"></i></span>${name}`;

function contentPoint(scr) {
  // Ponto de conteúdo vazio (Art. 19): shell pronto, dado de negócio ainda não.
  return `<div class="su-empty">
        <div class="su-empty__icon"><i class="ti ti-${scr.icon}"></i></div>
        <div class="su-empty__title">${scr.label}</div>
        <p style="color:var(--su-text-muted);font-size:13px;max-width:420px;margin:6px auto 0;">${scr.note}</p>
        <p style="color:var(--su-text-muted);font-size:12px;margin-top:10px;">Ponto de conteúdo — instancie o molde <b>${scr.mold}</b> (generation/TEMPLATES) e conecte o dado de negócio.</p>
      </div>`;
}

function desktopHtml(name, arch, product) {
  const nav = arch.nav.map((s, i) =>
    `        <a class="su-nav__item${i === 0 ? " su-nav__item--active" : ""}" data-route="${s.route}"><i class="ti ti-${s.icon}" style="font-size:18px;"></i>${s.label}</a>`).join("\n");
  const pages = arch.nav.map((s, i) =>
    `    <section class="su-page${i === 0 ? " su-page--active" : ""}" data-page="${s.route}">
      <h1 style="font-size:20px;margin:0 0 4px;">${s.label}</h1>
      ${contentPoint(s)}
    </section>`).join("\n");
  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Studio UX (Desktop)</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css">
  <!-- Dependência DECLARADA (Art. 1/14): consumida de node_modules, nunca copiada para dentro. -->
  <link rel="stylesheet" href="./node_modules/@studio-ux-ds/tokens/tokens.css">
  <link rel="stylesheet" href="./node_modules/@studio-ux-ds/components/components.css">
  <style>
    /* Só composição/layout — os VALORES vêm dos tokens (P1/P22). */
    body { margin:0; background:var(--su-surface-base); font-family:var(--su-font-ui); color:var(--su-text-primary); }
    .shell { display:flex; min-height:100vh; }
    .main { flex:1; min-width:0; display:flex; flex-direction:column; }
    .content { padding:var(--su-space-6); }
    .su-page { display:none; } .su-page--active { display:block; }
    @media (max-width:820px){ .su-sidebar{ display:none; } }
  </style>
</head>
<body class="su">
  <div class="shell">
    <aside class="su-sidebar">
      <div class="su-sidebar__brand">${brand(name)}</div>
      <nav class="su-nav" id="nav">
${nav}
      </nav>
      <div class="su-sidebar__footer" style="display:flex;align-items:center;gap:9px;">
        <span class="su-brand__logo" style="width:26px;height:26px;border-radius:50%;background:var(--su-surface-raised);color:var(--su-text-muted);display:inline-flex;align-items:center;justify-content:center;">US</span>
        <div style="flex:1;font-size:12px;"><b>Usuário</b><div style="color:var(--su-text-muted);">Papel</div></div>
        <i class="ti ti-logout" style="color:var(--su-text-muted);cursor:pointer;"></i>
      </div>
    </aside>
    <div class="main">
      <header class="su-topbar">
        <b style="font-size:14px;">${arch.__title}</b>
        <span style="flex:1;"></span>
        <button class="su-iconbtn" aria-label="Alternar tema" onclick="document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark'"><i class="ti ti-moon"></i></button>
      </header>
      <div class="content">
${pages}
      </div>
    </div>
  </div>
  <script>
    // Roteador mínimo (só troca de tela; sem regra de negócio).
    var items = document.querySelectorAll('#nav .su-nav__item');
    items.forEach(function(a){ a.onclick = function(){
      items.forEach(function(x){ x.classList.remove('su-nav__item--active'); });
      a.classList.add('su-nav__item--active');
      document.querySelectorAll('.su-page').forEach(function(p){ p.classList.toggle('su-page--active', p.dataset.page===a.dataset.route); });
    }; });
  </script>
</body>
</html>
`;
}

function mobileHtml(name, arch) {
  const pages = arch.nav.map((s, i) =>
    `    <section class="su-page${i === 0 ? " su-page--active" : ""}" data-page="${s.route}" style="padding:var(--su-space-4);">
      ${contentPoint(s)}
    </section>`).join("\n");
  const tabs = arch.nav.map((s, i) =>
    `      <button class="su-m-navitem${i === 0 ? " su-m-navitem--active" : ""}" data-route="${s.route}"><i class="ti ti-${s.icon}"></i><span>${s.label}</span></button>`).join("\n");
  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${name} — Studio UX (Mobile)</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css">
  <!-- Dependência DECLARADA (Art. 1/14): consumida de node_modules, nunca copiada. -->
  <link rel="stylesheet" href="./node_modules/@studio-ux-ds/tokens/tokens.css">
  <link rel="stylesheet" href="./node_modules/@studio-ux-ds/mobile/mobile.css">
  <style>
    body { margin:0; background:var(--su-surface-sunken); font-family:var(--su-font-ui); color:var(--su-text-primary); }
    .phone { max-width:390px; margin:0 auto; min-height:100vh; background:var(--su-surface-base); display:flex; flex-direction:column; position:relative; }
    .app { flex:1; overflow:auto; padding-bottom:84px; }
    .su-page { display:none; } .su-page--active { display:block; }
  </style>
</head>
<body>
  <div class="phone">
    <header class="su-m-topbar"><span class="su-m-topbar__title">${name}</span></header>
    <div class="app" id="app">
${pages}
    </div>
    <nav class="su-m-bottomnav" id="nav">
${tabs}
    </nav>
  </div>
  <script>
    var items = document.querySelectorAll('#nav .su-m-navitem');
    items.forEach(function(b){ b.onclick = function(){
      items.forEach(function(x){ x.classList.remove('su-m-navitem--active'); });
      b.classList.add('su-m-navitem--active');
      document.querySelectorAll('.su-page').forEach(function(p){ p.classList.toggle('su-page--active', p.dataset.page===b.dataset.route); });
    }; });
  </script>
</body>
</html>
`;
}

function projectPackageJson(name, product, version) {
  const deps = { "@studio-ux-ds/tokens": "~" + version };
  if (product === "desktop") { deps["@studio-ux-ds/components"] = "~" + version; deps["@studio-ux-ds/react"] = "~" + version; }
  else { deps["@studio-ux-ds/mobile"] = "~" + version; deps["@studio-ux-ds/react-native"] = "~" + version; }
  // ~ (til): anda no trem (último dígito da linha); salto de linha é edição deliberada (Art. 14, VERSIONING §2).
  return JSON.stringify({ name, private: true, version: "0.1.0", description: `Projeto Studio UX (${product}) — derivado, declara a dependência do framework.`, dependencies: deps }, null, 2) + "\n";
}

function readme(name, product, archId, arch, version) {
  return `# ${name}

Projeto **Studio UX** — produto **${product === "desktop" ? "Desktop" : "Mobile"}**, arquétipo **${archId}**.
Gerado pelo Project Generator (nasce conforme, §1). ${arch.purpose}

## É derivado, não é fork (§3)

Este projeto **declara** a dependência do Studio UX — não copia o framework para dentro (Art. 1/14).
Os tokens, componentes e a gramática vêm dos pacotes \`@studio-ux-ds/*\` instalados; aqui você **aplica**, nunca redefine.
Recriar fundamentos (redefinir tokens, refazer componentes) transforma o arquétipo em fork — e o fork é a morte da conformidade.

## Rodar

\`\`\`bash
npm install      # baixa @studio-ux-ds/* do GitHub Packages (ver .npmrc)
# abra index.html no navegador (o shell consome o CSS de node_modules)
\`\`\`

## Versão do Studio UX

Declarada como \`~${version}\` em \`package.json\` e registrada em \`studio-ux.json\`.
O til (\`~\`) faz o projeto **andar no trem** (último dígito da linha, ex.: ${version} → próxima correção). Um **salto de linha**
(ex.: 1.x → 2.x) é adoção **deliberada** com o guia de migração (VERSIONING) — edite a versão à mão, não é automático.

## Telas (pontos de conteúdo — Art. 19)

O shell está pronto; o miolo de cada tela nasce **vazio**, à espera do dado de negócio. Instancie o molde citado (dono: generation/TEMPLATES):

${arch.nav.map((s) => `- **${s.label}** — molde ${s.mold}. ${s.note}`).join("\n")}

## Certificar de partida

Rode a Certification/Linter logo no nascimento para confirmar a conformidade inicial (\`studio lint\`).
`;
}

// ---------------------------------------------------------------------------
const args = parseArgs(process.argv.slice(2));
if (args.product === "list" || args.archetype === "list" || process.argv.includes("--list")) { listArchetypes(); process.exit(0); }

if (!args.product) fail("informe o produto: --product desktop|mobile  (a 1ª e mais irreversível decisão, Art. 2/P4)");
if (!["desktop", "mobile"].includes(args.product)) fail(`produto inválido: ${args.product} (use desktop OU mobile — nunca os dois no mesmo projeto, Art. 2)`);
if (!args.archetype) { console.error("informe o arquétipo: --archetype <id>"); listArchetypes(); process.exit(1); }
const arch = ARCHETYPES[args.archetype];
if (!arch) { console.error(`\x1b[31m✗\x1b[0m arquétipo desconhecido: ${args.archetype}`); listArchetypes(); process.exit(1); }
if (!arch.bases.includes(args.product)) fail(`o arquétipo "${args.archetype}" não suporta ${args.product} (bases: ${arch.bases.join(", ")})`);
const name = args.name || `studio-${args.archetype}-${args.product}`;
const out = resolve(args.out || join(ROOT, "dist-projects", name));

arch.__title = name;
mkdirSync(join(out, "src", "screens"), { recursive: true });

const manifest = {
  name, product: args.product, archetype: args.archetype,
  studioUx: { version: VERSION, declaredAs: "~" + VERSION, consumes: args.product === "desktop"
    ? ["@studio-ux-ds/tokens", "@studio-ux-ds/components", "@studio-ux-ds/react"]
    : ["@studio-ux-ds/tokens", "@studio-ux-ds/mobile", "@studio-ux-ds/react-native"] },
  generatedAt: new Date().toISOString(),
  note: "Projeto DERIVADO: declara a dependência, não copia o framework (Art. 1/14, §3). Salto de linha de versão é deliberado (VERSIONING §2).",
};

writeFileSync(join(out, "studio-ux.json"), JSON.stringify(manifest, null, 2) + "\n");
writeFileSync(join(out, "package.json"), projectPackageJson(name, args.product, VERSION));
writeFileSync(join(out, ".npmrc"), "@studio-ux-ds:registry=https://npm.pkg.github.com\n");
writeFileSync(join(out, "index.html"), args.product === "desktop" ? desktopHtml(name, arch, args.product) : mobileHtml(name, arch));
writeFileSync(join(out, "README.md"), readme(name, args.product, args.archetype, arch, VERSION));
for (const s of arch.nav)
  writeFileSync(join(out, "src", "screens", s.route + ".md"),
    `# ${s.label}\n\nPonto de conteúdo (Art. 19). Molde a instanciar: **${s.mold}** (dono: generation/TEMPLATES).\n\n${s.note}\n\nO dado de negócio conecta-se aqui; o arquétipo não o traz.\n`);

console.log(`\x1b[32m✓\x1b[0m projeto "${name}" nascido conforme.`);
console.log(`  produto  : ${args.product}   arquétipo: ${args.archetype}`);
console.log(`  Studio UX: declarado ~${VERSION} (não copiado — Art. 1/14)`);
console.log(`  telas    : ${arch.nav.map((s) => s.label).join(" · ")}  \x1b[2m(pontos de conteúdo vazios)\x1b[0m`);
console.log(`  destino  : ${out}`);
console.log(`\x1b[2m  próximo: cd no destino → npm install → abrir index.html; instancie os moldes (TEMPLATES) e conecte o dado.\x1b[0m`);
