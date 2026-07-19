#!/usr/bin/env node
/**
 * Studio UX — Moldes de tela (Épico 4 · STUDIO_UX_TEMPLATES). Aciona por `studio generate`.
 * Um molde COMPÕE componentes oficiais (.su-*) com os estados obrigatórios e pontos de conteúdo VAZIOS (Art. 19).
 * Não redefine token nem cria peça nova (§3): usa só classes do catálogo. Instancia UM molde numa tela do projeto.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const cp = (icon, title, note) => // ponto de conteúdo vazio (su-empty do catálogo)
  `<div class="su-empty"><div class="su-empty__icon"><i class="ti ti-${icon}"></i></div><div class="su-empty__title">${title}</div><p class="cp">${note}</p></div>`;
const field = (label, type = "text", ph = "") => `<div class="su-field"><label class="su-field__label">${label}</label><input class="su-input" type="${type}" placeholder="${ph}"></div>`;
const formActions = `<div class="su-form-actions"><button class="su-btn su-btn--ghost">Cancelar</button><button class="su-btn su-btn--primary">Salvar</button></div>`;
const step = (label, mod = "") => `<div class="su-step ${mod}"><span class="su-step__dot"></span><span class="su-step__label">${label}</span></div>`;

// Cada molde: guia dono + render(product, name) → markup interno (composição de .su-*). Pontos de conteúdo vazios.
export const MOLDS = {
  login: { guide: "PATTERNS", desc: "acesso — cartão central + e-mail/senha + ação única (P6)", render: (p, name) =>
    `<div class="loginwrap"><div class="su-card logincard">
      <div class="su-brand" style="justify-content:center;margin-bottom:var(--su-space-1);"><span class="su-brand__logo bl">${name.slice(0,1).toUpperCase()}</span>${name}</div>
      ${field("E-mail", "email", "voce@empresa.com")}
      <div class="su-field"><label class="su-field__label">Senha</label><input class="su-input" type="password"><a class="forgot" href="#" onclick="return false">Esqueci a senha</a></div>
      <button class="su-btn su-btn--primary" style="width:100%;margin-top:var(--su-space-1);">Entrar</button>
    </div></div>` },

  dashboard: { guide: "DASHBOARD", desc: "leitura de indicadores — KPIs + gráfico + resumo", render: () =>
    `<div class="kpis">${["Receita","Clientes","Conversão","Ticket médio"].map(k=>`<div class="su-statcard"><div class="su-statcard__label">${k}</div><div class="su-statcard__value">—</div></div>`).join("")}</div>
     <div class="row2">
       <div class="su-card"><b class="ch">Evolução</b>${cp("chart-line","Gráfico","Conecte a série temporal do indicador.")}</div>
       <div class="su-card"><b class="ch">Resumo</b>${cp("table","Tabela-resumo","Conecte as linhas do resumo.")}</div>
     </div>` },

  list: { guide: "TABLES", desc: "lista de registros — cabeçalho + tabela/cartões + paginação + vazio", render: (p) => {
    const head = `<div class="listhead"><h1>Registros</h1><button class="su-btn su-btn--primary"><i class="ti ti-plus"></i>Novo</button></div>
      <div class="filters"><div class="su-field ff"><input class="su-input" placeholder="Buscar…"></div><select class="su-select"><option>Todos</option></select></div>`;
    if (p === "mobile") return head + cp("list", "Sem registros", "Conecte a lista — cada item vira um cartão (Card).");
    return head + `<table class="su-table"><thead><tr><th>Nome</th><th>Cidade</th><th>Status</th><th></th></tr></thead><tbody></tbody></table>
      ${cp("database","Sem registros","Conecte a lista de registros — desktop mostra tabela, mobile mostra cartões.")}
      <div class="su-pagination"><button class="su-btn su-btn--ghost">Anterior</button><span class="pg">Página 1</span><button class="su-btn su-btn--ghost">Próxima</button></div>`;
  } },

  detail: { guide: "TABLES", desc: "detalhe de entidade — voltar + abas + campos", render: () =>
    `<a class="backlink" href="#" onclick="return false"><i class="ti ti-arrow-left"></i> Voltar</a>
     <div class="listhead"><h1>Detalhe</h1><div><button class="su-btn su-btn--secondary"><i class="ti ti-edit"></i>Editar</button></div></div>
     <div class="su-tabs"><button class="su-tab su-tab--active">Visão geral</button><button class="su-tab">Histórico</button></div>
     <div class="su-card">${cp("id","Campos da entidade","Conecte os dados da entidade (DescriptionList).")}</div>` },

  form: { guide: "FORMS", desc: "criar/editar — campos + ações (ghost/primary)", render: () =>
    `<div class="listhead"><h1>Novo registro</h1></div>
     <div class="su-card formcard">${field("Nome")}${field("E-mail","email")}${field("Telefone","tel")}${formActions}</div>` },

  search: { guide: "PATTERNS", desc: "busca — campo + resultados + vazio", render: () =>
    `<div class="su-field ff searchf"><i class="ti ti-search"></i><input class="su-input" placeholder="O que você procura?"></div>
     ${cp("search","Nada por aqui ainda","Conecte os resultados da busca.")}` },

  settings: { guide: "FORMS", desc: "configuração — abas (pills) + seções + ações", render: () =>
    `<div class="listhead"><h1>Ajustes</h1></div>
     <div class="su-tabs su-tabs--pills"><button class="su-tab su-tab--active">Geral</button><button class="su-tab">Notificações</button></div>
     <div class="su-card formcard">${field("Nome da empresa")}${field("Domínio público","url","https://…")}${formActions}</div>` },

  wizard: { guide: "PATTERNS", desc: "passo a passo — stepper + conteúdo + voltar/avançar", render: () =>
    `<div class="su-stepper">${step("Dados","su-step--current")}${step("Revisão")}${step("Concluir")}</div>
     <div class="su-card">${cp("forms","Conteúdo do passo","Conecte os campos deste passo.")}</div>
     <div class="su-form-actions"><button class="su-btn su-btn--ghost">Voltar</button><button class="su-btn su-btn--primary">Avançar</button></div>` },

  empty: { guide: "COMPONENT_LIBRARY", desc: "estado vazio de tela inteira — EmptyState + ação", render: () =>
    `<div class="fullempty">${cp("inbox","Nada por aqui ainda","Descreva o que falta e sugira a ação.")}<button class="su-btn su-btn--primary" style="margin-top:var(--su-space-3);"><i class="ti ti-plus"></i>Começar</button></div>` },
};

export const MOLD_NAMES = Object.keys(MOLDS);

function page(product, name, mold) {
  const css = product === "mobile"
    ? '<link rel="stylesheet" href="../../node_modules/@studio-ux-ds/mobile/mobile.css">'
    : '<link rel="stylesheet" href="../../node_modules/@studio-ux-ds/components/components.css">';
  const wrap = product === "mobile"
    ? `<div class="phone"><div class="screen">${MOLDS[mold].render(product, name)}</div></div>`
    : `<div class="screen">${MOLDS[mold].render(product, name)}</div>`;
  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — molde ${mold} (${product})</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css">
  <!-- Dependência DECLARADA: tokens + peças vêm de node_modules (Art. 1/14). -->
  <link rel="stylesheet" href="../../node_modules/@studio-ux-ds/tokens/tokens.css">
  ${css}
  <style>
    /* Só composição/layout — valores dos tokens (P1/P22). */
    body { margin:0; background:var(--su-surface-sunken); font-family:var(--su-font-ui); color:var(--su-text-primary); }
    .screen { max-width:1024px; margin:0 auto; padding:var(--su-space-6); display:flex; flex-direction:column; gap:var(--su-space-5); }
    .phone { max-width:390px; margin:0 auto; min-height:100vh; background:var(--su-surface-base); }
    .phone .screen { padding:var(--su-space-4); gap:var(--su-space-4); }
    h1 { font-size:var(--su-text-h2); margin:0; }
    .kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--su-space-3); }
    .row2 { display:grid; grid-template-columns:1fr 1fr; gap:var(--su-space-4); }
    .listhead { display:flex; align-items:center; justify-content:space-between; }
    .filters { display:flex; gap:var(--su-space-3); } .ff { flex:1; } .searchf { display:flex; align-items:center; gap:var(--su-space-2); }
    .su-pagination { display:flex; align-items:center; justify-content:center; gap:var(--su-space-3); } .pg { color:var(--su-text-muted); font-size:var(--su-text-body-sm); }
    .loginwrap { min-height:80vh; display:flex; align-items:center; justify-content:center; } .logincard { width:340px; display:flex; flex-direction:column; gap:var(--su-space-3); padding:var(--su-space-6); }
    .bl { background:var(--su-action); color:var(--su-text-on-action); width:24px; height:24px; border-radius:var(--su-radius-sm); display:inline-flex; align-items:center; justify-content:center; }
    .forgot { align-self:flex-end; margin-top:var(--su-space-1); font-size:var(--su-text-caption); color:var(--su-text-muted); text-decoration:none; } .forgot:hover { color:var(--su-action); }
    .formcard { display:flex; flex-direction:column; gap:var(--su-space-4); } /* su-form-actions é estilizado pelo components.css (dono) */
    .backlink { color:var(--su-text-muted); text-decoration:none; font-size:var(--su-text-body-sm); } .ch { display:block; margin-bottom:var(--su-space-2); }
    .cp { color:var(--su-text-muted); font-size:var(--su-text-caption); margin:var(--su-space-1) 0 0; }
    .fullempty { text-align:center; padding:var(--su-space-16) 0; }
    @media (max-width:720px){ .kpis{grid-template-columns:repeat(2,1fr);} .row2{grid-template-columns:1fr;} }
  </style>
</head>
<body class="su">
  ${wrap}
</body>
</html>
`;
}

export function emitMold({ mold, into, name }) {
  if (!MOLDS[mold]) { console.error(`\x1b[31m✗\x1b[0m molde fora do catálogo: "${mold}" (STUDIO_UX_TEMPLATES §2 — não invente)`); listMolds(); process.exit(1); }
  const proj = resolve(into);
  const manifestPath = join(proj, "studio-ux.json");
  if (!existsSync(manifestPath)) { console.error(`\x1b[31m✗\x1b[0m "${into}" não parece um projeto Studio UX (sem studio-ux.json). Crie com \`studio create\` primeiro.`); process.exit(1); }
  const product = JSON.parse(readFileSync(manifestPath, "utf8")).product || "desktop";
  const screen = name || mold;
  const dir = join(proj, "src", "screens");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, screen + ".html");
  writeFileSync(file, page(product, screen, mold));
  console.log(`\x1b[32m✓\x1b[0m molde "${mold}" instanciado como tela "${screen}" (${product}).`);
  console.log(`  guia dono: ${MOLDS[mold].guide}   composição: só componentes .su-* + pontos de conteúdo vazios (Art. 19)`);
  console.log(`  arquivo  : ${file}`);
  console.log(`\x1b[2m  abra no navegador para ver; conecte o dado de negócio nos pontos de conteúdo.\x1b[0m`);
}

export function listMolds() {
  console.log("\x1b[1mMoldes de tela\x1b[0m (§2 — cada um compõe o catálogo, deriva de um guia):");
  for (const [n, m] of Object.entries(MOLDS)) console.log("  " + n.padEnd(10) + `\x1b[2m[${m.guide}] ${m.desc}\x1b[0m`);
}

// Execução direta (studio generate delega aqui)
if (import.meta.url === `file://${process.argv[1]}`) {
  const a = { mold: "", into: "", name: "" };
  const argv = process.argv.slice(2);
  if (argv.includes("--list") || argv[0] === "list") { listMolds(); process.exit(0); }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--mold" || argv[i] === "-m") a.mold = argv[++i];
    else if (argv[i] === "--into" || argv[i] === "-i") a.into = argv[++i];
    else if (argv[i] === "--name" || argv[i] === "-n") a.name = argv[++i];
  }
  if (!a.mold) { console.error("informe o molde: --mold <nome>"); listMolds(); process.exit(1); }
  if (!a.into) { console.error("\x1b[31m✗\x1b[0m informe o projeto destino: --into <dir> (um projeto criado com `studio create`)"); process.exit(1); }
  emitMold(a);
}
