#!/usr/bin/env node
/**
 * Studio UX — CLI oficial `studio` (Épico 2 · STUDIO_UX_CLI).
 * Verbo, não regra: cada comando REÚNE argumentos, ACIONA o domínio dono e APRESENTA o resultado.
 * Nunca reimplementa a lógica do dono (SSOT, Art. 10). Nada trava em silêncio (Art. 5).
 * Onde o dono ainda não foi construído (Generator/Certification), o comando DIZ isso — não finge.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const c = { dim: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m`, g: (s) => `\x1b[32m${s}\x1b[0m`, y: (s) => `\x1b[33m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`, a: (s) => `\x1b[36m${s}\x1b[0m` };
const say = (...a) => console.log(...a);
const run = (cmd, args) => spawnSync(cmd, args, { cwd: ROOT, stdio: "inherit" }).status ?? 0;
const runOut = (cmd, args) => { const r = spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8" }); return (r.stdout || "").trim(); };
const version = () => JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;

// --- fonte de tokens (leitura; regra é do tokens/*) ---
function tokenMaps() {
  const css = readFileSync(join(ROOT, "packages/tokens/tokens.css"), "utf8");
  const blk = (re) => { const m = css.match(re); const o = {}; if (m) { const r = /--su-([\w-]+)\s*:\s*([^;]+);/g; let x; while ((x = r.exec(m[1]))) o[x[1].trim()] = x[2].trim(); } return o; };
  const light = blk(/:root\s*\{([^}]*)\}/);
  return { light, dark: { ...light, ...blk(/\[data-theme="dark"\]\s*\{([^}]*)\}/) } };
}

const COMMANDS = {
  lint: { owner: "quality/LINTER", desc: "detecção estática de violações", run: (a) => run("node", ["tools/linter/lint.mjs", ...a]) },
  export: { owner: "generation/EXPORTERS", desc: "exporta tokens para os alvos", run: (a) => run("node", ["tools/exporters/export-tokens.mjs", ...a]) },
  tokens: { owner: "tokens/* (leitura) · EXPORTERS (--export)", desc: "lista/resolve tokens no tema ativo", run: cmdTokens },
  theme: { owner: "THEMES", desc: "lista temas e resolve num deles", run: cmdTheme },
  doctor: { owner: "VERSIONING + LINTER", desc: "diagnóstico do ambiente/projeto", run: cmdDoctor },
  upgrade: { owner: "governance/VERSIONING", desc: "mostra versão atual × disponível", run: cmdUpgrade },
  docs: { owner: "packages/docs", desc: "abre/lista a documentação (a verdade é o git)", run: cmdDocs },
  playground: { owner: "tools/PLAYGROUND + DEVTOOLS", desc: "aponta o catálogo vivo e os inspetores", run: cmdPlayground },
  create: { owner: "generation/PROJECT_GENERATOR", desc: "cria um projeto conforme (produto→arquétipo→versão)", run: (a) => run("node", ["tools/generator/generate.mjs", ...a]) },
  generate: { owner: "generation/TEMPLATES", desc: "instancia um molde de tela num projeto", run: (a) => run("node", ["tools/generator/templates.mjs", ...a]) },
  audit: { owner: "CERTIFICATION", desc: "gradua a conformidade (selo/nível)", run: () => notYet("Certification") },
};

function notYet(owner) {
  say(c.y("⚠ ") + `o domínio dono (${c.b(owner)}) ainda não foi construído.`);
  say(c.dim("   A CLI é só o verbo — este comando existe, mas não vou fingir uma execução (Art. 21)."));
  say(c.dim("   Roadmap: bloco B do docs/audits/STUDIO_UX_GAP_AUDIT.md."));
  return 2;
}

function cmdTokens(a) {
  const { light, dark } = tokenMaps();
  if (a.includes("--export")) return run("node", ["tools/exporters/export-tokens.mjs"]);
  const name = a.find((x) => !x.startsWith("-"));
  if (name) {
    const k = name.replace(/^--su-/, "");
    if (!(k in light)) { say(c.r("✗ ") + `token não existe: --su-${k}`); return 1; }
    say(`${c.b("--su-" + k)}`);
    say(`  claro : ${c.a(light[k])}`);
    say(`  escuro: ${c.a(dark[k])}`);
    return 0;
  }
  say(c.b(`Tokens (${Object.keys(light).length})`) + c.dim("  — valor no tema claro; use `studio tokens <nome>` para os dois temas"));
  Object.keys(light).sort().forEach((k) => say(`  --su-${k}`.padEnd(30) + c.dim(light[k])));
  return 0;
}

function cmdTheme(a) {
  const { light, dark } = tokenMaps();
  const sample = ["surface-base", "text-primary", "action", "text-on-action"];
  const which = a[0];
  if (!which || which === "list") {
    say(c.b("Temas disponíveis: ") + "claro · escuro" + c.dim("  (o tema ativo é resolvido no runtime via [data-theme])"));
    say(c.dim("  `studio theme claro` | `studio theme escuro` para resolver uma amostra"));
    return 0;
  }
  const T = /esc|dark/i.test(which) ? dark : light;
  say(c.b(`Amostra no tema ${/esc|dark/i.test(which) ? "escuro" : "claro"}`));
  sample.forEach((k) => say(`  --su-${k}`.padEnd(24) + c.a(T[k])));
  return 0;
}

function cmdDoctor() {
  say(c.b("studio doctor") + c.dim("  — aciona VERSIONING + LINTER; a CLI só agrega"));
  const v = version();
  const tags = runOut("git", ["tag", "--sort=-v:refname"]).split("\n").filter(Boolean);
  const latest = tags[0] || "(sem tags)";
  say(`  versão declarada : ${c.a("v" + v)}`);
  say(`  última tag (git) : ${c.a(latest)}`);
  say(`  ${v && latest === "v" + v ? c.g("✓ em dia") : c.y("⚠ confira se aplicou a última tag")}`);
  say(c.dim("  integridade dos pacotes:"));
  const st = run("node", ["scripts/check-packages.mjs"]);
  say(c.dim("  detecção estática: rode `studio lint` (dono: Linter)."));
  return st;
}

function cmdUpgrade() {
  const v = version();
  const tags = runOut("git", ["tag", "--sort=-v:refname"]).split("\n").filter(Boolean);
  say(c.b("studio upgrade") + c.dim("  — dono: VERSIONING (a CLI reporta; não muda em silêncio, Art. 14)"));
  say(`  atual declarada: ${c.a("v" + v)}`);
  say(`  disponível     : ${c.a(tags[0] || "—")}`);
  say(c.dim("  Convenção do trem (VERSIONING §2): último dígito; salto de linha só por decisão do Robson."));
  say(c.dim("  Migração: ver docs/governance/STUDIO_UX_VERSIONING.md. A adoção é deliberada, não automática."));
  return 0;
}

function cmdDocs() {
  const dir = join(ROOT, "docs");
  say(c.b("Documentação (Specification em git — a verdade, Art. 5)") + c.dim("  docs/"));
  const walk = (d, pre) => readdirSync(d, { withFileTypes: true }).forEach((e) => {
    if (e.isDirectory()) { say(c.dim(pre + e.name + "/")); walk(join(d, e.name), pre + "  "); }
    else if (e.name.endsWith(".md")) say(pre + e.name);
  });
  walk(dir, "  ");
  return 0;
}

function cmdPlayground() {
  const pg = join(ROOT, "playground/index.html"), dt = join(ROOT, "tools/devtools/index.html");
  say(c.b("Ambientes vivos (derivados do Runtime, nunca produção — Art. 5)"));
  say(`  Playground (catálogo/sandbox): ${c.a(existsSync(pg) ? pg : "playground/index.html")}`);
  say(`  DevTools (9 inspetores)      : ${c.a(existsSync(dt) ? dt : "tools/devtools/index.html")}`);
  say(c.dim("  Abra no navegador (sem build)."));
  return 0;
}

function help() {
  say(c.b("studio") + c.dim(` — CLI oficial do Studio UX (v${version()})`));
  say(c.dim("A CLI é o verbo; a regra mora sempre no domínio dono.\n"));
  say(c.b("Comandos:"));
  for (const [name, cmd] of Object.entries(COMMANDS)) {
    say("  " + c.a(name.padEnd(11)) + cmd.desc.padEnd(42) + c.dim(cmd.owner));
  }
  say("\n" + c.dim("Ex.: studio tokens action · studio lint · studio export · studio doctor"));
  return 0;
}

const [, , name, ...rest] = process.argv;
if (!name || name === "help" || name === "-h" || name === "--help") process.exit(help());
const cmd = COMMANDS[name];
if (!cmd) { say(c.r("✗ ") + `comando desconhecido: ${name}`); help(); process.exit(1); }
process.exit(cmd.run(rest) ?? 0);
