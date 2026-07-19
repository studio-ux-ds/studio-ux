#!/usr/bin/env node
/**
 * Studio UX — Certification (Épico 3 · STUDIO_UX_CERTIFICATION). Aciona por `studio audit`.
 * "Linter detecta · Compliance mede · Certification GRADUA" (§8.4). Esta ferramenta CONSOME as violações do
 * Linter e as transforma em veredito de eliminatórios — NUNCA re-detecta (SSOT, Art. 10).
 * Honestidade (§8.3, Art. 21): só gradua o que é ESTATICAMENTE verificável; jamais imprime um nível (Bronze→Platinum)
 * que dependeria de evidência humana (a11y nos 2 temas, estados, DNA visual, Desktop+Mobile). Selo que mente é o pior erro.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const C = { b:(s)=>`\x1b[1m${s}\x1b[0m`, dim:(s)=>`\x1b[2m${s}\x1b[0m`, g:(s)=>`\x1b[32m${s}\x1b[0m`, y:(s)=>`\x1b[33m${s}\x1b[0m`, r:(s)=>`\x1b[31m${s}\x1b[0m`, a:(s)=>`\x1b[36m${s}\x1b[0m` };

// Eliminatórios oficiais (§3). Os que o Linter enxerga estaticamente vs os que exigem evidência humana (§1 passo 3).
const ELIMINATORS = ["P1","P3","P4","P6","P7","P11","P12","P13","P14","P17","P18","P19"];
const STATIC_ELIMINATORS = ["P1","P3","P4","P6","P7","P11","P14","P17","P18"]; // cobertos por regra do Linter
const HUMAN_ELIMINATORS = ["P12","P13","P19"]; // toast/5-patrasques/toque-teclado — só auditoria humana

function lint(file) {
  const r = spawnSync("node", ["tools/linter/lint.mjs", file], { cwd: ROOT, encoding: "utf8" });
  const out = (r.stdout || "") + (r.stderr || "");
  const errors = [], warns = [];
  for (const m of out.matchAll(/\[(ERRO|aviso)\s*\]\s+([a-z-]+)\s+\(([^)]+)\)\s+—\s+(.+)/g)) {
    const ps = (m[3].match(/P\d+/g) || []); // princípios citados na regra
    const entry = { rule: m[2], principles: ps, tag: m[3], msg: m[4].trim() };
    (m[1] === "ERRO" ? errors : warns).push(entry);
  }
  return { errors, warns, ran: r.status !== null };
}

function screenVerdict(errors) {
  // Eliminatório reprovado = qualquer erro do Linter cujo P# esteja no conjunto eliminatório (§5).
  const failed = new Set();
  for (const e of errors) for (const p of e.principles) if (ELIMINATORS.includes(p)) failed.add(p);
  return { failed: [...failed].sort((a,b)=>+a.slice(1)-+b.slice(1)), clean: errors.length === 0 };
}

function printScreen(file, { errors, warns }) {
  const v = screenVerdict(errors);
  console.log(C.b("Laudo de tela") + C.dim("  " + file));
  if (v.failed.length) {
    console.log("  " + C.r("✗ NÃO CERTIFICADA") + " — eliminatório(s) reprovado(s): " + C.r(v.failed.join(", ")) + " (abaixo de Bronze, §5)");
    for (const e of errors.filter(e => e.principles.some(p => ELIMINATORS.includes(p))))
      console.log(C.dim(`      ${e.rule} (${e.tag}) — ${e.msg}`));
  } else {
    console.log("  " + C.g("✓ piso automático limpo") + " — os eliminatórios estáticos passam: " + C.a(STATIC_ELIMINATORS.join(", ")));
    console.log(C.dim("      (o Linter não reprovou nenhum eliminatório que ele consegue ver)"));
  }
  if (warns.length) console.log("  " + C.y(`${warns.length} ponto(s) de atenção (pontuável/parcial): `) + C.dim(warns.map(w=>w.rule).join(", ")));
  // Honestidade sobre a fronteira: o que a ferramenta NÃO pode graduar.
  console.log(C.dim("  Pendente de AUDITORIA HUMANA (não estático, §1 passo 3):"));
  console.log(C.dim(`    · eliminatórios ${HUMAN_ELIMINATORS.join("/")} — toast (P12), 5 patrasques do destrutivo (P13), toque≥44px+teclado (P19)`));
  console.log(C.dim("    · Bronze exige TAMBÉM esses + evidência nos 2 temas e nos estados vazio/carregando/erro"));
  console.log(C.dim("    · Silver→Platinum: consistência entre telas, a11y integral nos 2 temas, DNA visual, Desktop+Mobile (§4)"));
  console.log(C.dim("  Esta ferramenta gradua só o verificável; não imprime um nível que precisaria de evidência humana (§8.3)."));
  return v;
}

function auditSystem(dir) {
  const manifestPath = join(dir, "studio-ux.json");
  if (!existsSync(manifestPath)) { console.error(C.r("✗ ") + `"${dir}" não é um projeto Studio UX (sem studio-ux.json).`); process.exit(1); }
  const man = JSON.parse(readFileSync(manifestPath, "utf8"));
  console.log(C.b("Laudo de sistema") + C.dim("  " + man.name + " (" + man.product + " · " + man.archetype + ")"));
  // Critério de sistema estático (§8.1): dependência de versão DECLARADA (não framework recriado).
  const pkg = existsSync(join(dir, "package.json")) ? JSON.parse(readFileSync(join(dir, "package.json"), "utf8")) : {};
  const deps = pkg.dependencies || {};
  const declaresVersion = Object.keys(deps).some(d => d.startsWith("@studio-ux-ds/") && /^[~^]?\d/.test(deps[d]));
  console.log("  " + (declaresVersion ? C.g("✓") : C.r("✗")) + " dependência de versão declarada (@studio-ux-ds/*, VERSIONING) — não copia o framework (§8.1)");
  // Auditar o shell + cada tela pelo Linter.
  const scrDir = join(dir, "src", "screens");
  const targets = [];
  if (existsSync(join(dir, "index.html"))) targets.push(["index.html (shell)", join(dir, "index.html")]);
  if (existsSync(scrDir)) for (const f of readdirSync(scrDir).filter(f => f.endsWith(".html"))) targets.push(["tela " + f, join(scrDir, f)]);
  if (targets.length <= (existsSync(join(dir, "index.html")) ? 1 : 0)) console.log(C.dim("  (sem telas em src/screens — gere com `studio generate`)"));
  let worst = "limpo";
  for (const [label, path] of targets) {
    const v = screenVerdict(lint(path).errors);
    const ok = v.failed.length === 0;
    if (!ok) worst = "reprovado";
    console.log("  " + (ok ? C.g("✓") : C.r("✗")) + ` ${label}` + (ok ? C.dim("  piso automático limpo") : C.r("  eliminatório: " + v.failed.join(", "))));
  }
  console.log("  " + C.b("Piso de sistema (estático): ") + (worst==="limpo" && declaresVersion ? C.g("apto") : C.r("reprovado")) +
    C.dim("  — Bronze→Enterprise exigem: a11y integral, consistência entre telas, COMPLIANCE contínuo e governança RFC/ADR (§8.2), fora do alcance estático."));
  console.log(C.dim("  Linter detecta · Compliance mede · Certification gradua — esta ferramenta consome o Linter; não re-detecta (§8.4)."));
}

// ---- entrada ----
const argv = process.argv.slice(2);
const target = argv.find(a => !a.startsWith("-"));
if (!target) {
  console.error(C.r("✗ ") + "informe o alvo: uma tela (arquivo .html) ou um projeto (pasta com studio-ux.json).");
  console.error(C.dim("  ex.: studio audit examples/login.html   |   studio audit <projeto-gerado>"));
  process.exit(1);
}
const abs = resolve(target);
if (!existsSync(abs)) { console.error(C.r("✗ ") + `alvo não existe: ${target}`); process.exit(1); }
const isDir = existsSync(join(abs, "studio-ux.json"));
if (isDir) { auditSystem(abs); }
else {
  const res = lint(abs);
  const v = printScreen(target, res);
  process.exit(v.failed.length ? 1 : 0);
}
