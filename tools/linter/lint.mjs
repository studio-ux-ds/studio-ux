#!/usr/bin/env node
/**
 * Studio UX — Linter (Épico 3 · STUDIO_UX_LINTER).
 * Detecção estática e binária: cada regra aponta UMA violação e cita seu P#/Art. dono
 * (o linter NÃO cria regra — só detecta). Severidade herdada da certificação: eliminatório=erro,
 * pontuável=aviso. Fora do estático → encaminha (Certification/humano), não decide.
 * Uso: node tools/linter/lint.mjs [arquivos...]   (default: fixtures)
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// ---------- tokens da fonte (para contraste e checagem de token válido) ----------
const css = readFileSync(join(root, "packages/tokens/tokens.css"), "utf8");
const parseBlock = (re) => { const m = css.match(re); const o = {}; if (m) { const r = /--su-([\w-]+)\s*:\s*([^;]+);/g; let x; while ((x = r.exec(m[1]))) o[x[1].trim()] = x[2].trim(); } return o; };
const T_LIGHT = parseBlock(/:root\s*\{([^}]*)\}/);
const T_DARK = { ...T_LIGHT, ...parseBlock(/\[data-theme="dark"\]\s*\{([^}]*)\}/) };
const isHex = (v) => /^#[0-9a-fA-F]{6}$/.test(v);

// ---------- WCAG contraste (determinístico) ----------
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => { const [r, g, b] = rgb(h).map((c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// pares texto-sobre-fundo que o DS realmente usa (regra 2.13, ambos de token → determinístico)
const PAIRS = [
  ["text-primary", "surface-base", 4.5], ["text-primary", "surface-raised", 4.5], ["text-primary", "surface-sunken", 4.5],
  ["text-secondary", "surface-raised", 4.5], ["text-muted", "surface-raised", 3.0],
  ["text-on-action", "action", 4.5],
  ["success-fg", "success-bg", 4.5], ["warning-fg", "warning-bg", 4.5], ["danger-fg", "danger-bg", 4.5], ["info-fg", "info-bg", 4.5],
];

const violations = [];
const add = (file, line, id, origin, severity, evidence) => violations.push({ file, line, id, origin, severity, evidence });

// ---------- catálogo de regras estáticas ----------
function lintFile(file) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  const rel = file.replace(root + "/", "").replace(root + "\\", "");
  const hasFocusReplacement = /focus-visible[^}]*box-shadow|:focus[^}]*box-shadow/.test(src);
  const primaryCount = (src.match(/su-btn--primary/g) || []).length;
  if (primaryCount > 1) add(rel, 0, "single-primary-action", "P6", "erro", `${primaryCount} ações primárias (su-btn--primary) no mesmo arquivo`);
  const usesMobile = /\bsu-m-[a-z]/.test(src), usesDesktopShell = /\bsu-sidebar\b|\bsu-topbar\b/.test(src);
  if (usesMobile && usesDesktopShell) add(rel, 0, "no-cross-product-component", "P4/Art.2", "erro", "arquivo Desktop (su-sidebar/topbar) usando componente Mobile (su-m-*)");
  const hasData = /\bsu-table\b|class="[^"]*su-m-list/.test(src);
  const hasState = /\bsu-empty\b|\bsu-skeleton\b|\bsu-spinner\b|EmptyState/.test(src);
  if (hasData && !hasState) add(rel, 0, "required-states", "P14", "aviso", "componente de dados (tabela/lista) sem estado vazio/carregando/erro declarado (parcial)");

  lines.forEach((ln, i) => {
    const n = i + 1;
    // 2.3 color-off-token
    let m = ln.match(/(color|background|background-color|border-color|fill|stroke)\s*:\s*[^;"']*#[0-9a-fA-F]{3,8}/);
    if (m && !/var\(/.test(m[0])) add(rel, n, "color-off-token", "P1/P8/Art.3", "erro", m[0].trim());
    // 2.1 no-magic-spacing
    m = ln.match(/(padding|margin|gap|inset)(-\w+)?\s*:\s*[^;"']*\b[1-9]\d*px/);
    if (m && !/var\(/.test(m[0])) add(rel, n, "no-magic-spacing", "P1/P7/Art.3", "erro", m[0].trim());
    // 2.2 no-magic-value (radius/opacity/shadow/duration soltos)
    m = ln.match(/border-radius\s*:\s*[^;"']*\b\d+px/);
    if (m && !/var\(|50%|9999/.test(m[0])) add(rel, n, "no-magic-value", "P1/Art.3", "erro", m[0].trim());
    // 2.5 typography-off-role — px cru fora de token
    m = ln.match(/font-size\s*:\s*[^;"']*\b\d+px/);
    if (m && !/var\(/.test(m[0])) add(rel, n, "typography-off-role", "P1/P20/Art.3", "erro", m[0].trim());
    // 2.5b typography-off-role — par size/line-height em font-size é CSS inválido; use --su-fs-*
    m = ln.match(/font-size\s*:\s*var\(--su-text-[a-z0-9-]+\)/);
    if (m) add(rel, n, "typography-off-role", "P1/P20/Art.3", "erro", m[0].trim() + " (par size/line-height é inválido em font-size — use var(--su-fs-*))");
    // 2.6 animation-off-catalog
    m = ln.match(/(transition|animation)\s*:[^;"']*\b\d+\.?\d*m?s\b/);
    if (m && !/var\(/.test(m[0])) add(rel, n, "animation-off-catalog", "P15/P1", "erro", m[0].trim());
    if (/parallax/i.test(ln)) add(rel, n, "animation-off-catalog", "P15", "aviso", "movimento vetado (parallax)");
    // 2.8 layout-from-system (grid ad hoc inline)
    if (/style="[^"]*grid-template-columns/.test(ln)) add(rel, n, "layout-from-system", "P22", "aviso", "grid ad hoc inline (grid-template-columns em style)");
    // 2.10 no-surface-jargon (texto de superfície)
    m = ln.match(/>([^<>]*(?:--su-[\w-]+|\b[a-z]{2,}_[a-z_]{2,}\b|allowed_tools)[^<>]*)</);
    if (m && !/https?:|\/\//.test(m[1])) add(rel, n, "no-surface-jargon", "P11/Art.7", "erro", `texto de superfície com jargão: "${m[1].trim()}"`);
    // 2.12 focus-visible-required
    if (/outline\s*:\s*(none|0)\b/.test(ln) && !/box-shadow/.test(ln) && !hasFocusReplacement) add(rel, n, "focus-visible-required", "P18/P19/Art.9", "erro", "outline removido sem foco visível substituto");
    // 2.4 unofficial-component
    if (/<input[^>]*type=["']number["']/.test(ln)) add(rel, n, "unofficial-component", "P2/P3/Art.4", "erro", "<input type=number> (use NumericInput)");
    m = ln.match(/<button(?![^>]*class="[^"]*su-)[^>]*>/);
    if (m && !/su-m-/.test(ln)) add(rel, n, "unofficial-component", "P2/P3/Art.4", "aviso", "<button> cru sem classe su-* (use Button)");
    // 2.11 meaning-not-color-only (parcial): ponto colorido de status sem rótulo/ícone
    if (/<span[^>]*background:\s*var\(--su-(success|warning|danger|info)[^>]*><\/span>/.test(ln)) add(rel, n, "meaning-not-color-only", "P17/Art.9", "aviso", "status só por cor (ponto sem ícone/rótulo) — parcial, encaminha");
  });
}

// ---------- 2.13 contrast-minimum (auditoria dos tokens; determinístico) ----------
function contrastAudit() {
  for (const [theme, T] of [["claro", T_LIGHT], ["escuro", T_DARK]]) {
    for (const [fg, bg, target] of PAIRS) {
      const a = T[fg], b = T[bg];
      if (!isHex(a) || !isHex(b)) { add("tokens.css", 0, "contrast-minimum", "P18/Art.9", "aviso", `par ${fg}/${bg} indeterminável (não-token)`); continue; }
      const r = ratio(a, b);
      if (r < target) add("packages/tokens/tokens.css", 0, "contrast-minimum", "P18/Art.9", "erro", `${fg} sobre ${bg} (${theme}) = ${r.toFixed(2)}:1 < ${target} AA`);
    }
  }
}

// ---------- execução ----------
let files = process.argv.slice(2);
if (files.length === 0) {
  const fx = join(root, "tools/linter/fixtures");
  files = readdirSync(fx).filter((f) => /\.(html|jsx|css)$/.test(f)).map((f) => join(fx, f));
}
files.forEach(lintFile);
contrastAudit();

// relatório
const byFile = {};
for (const v of violations) (byFile[v.file] ||= []).push(v);
const errors = violations.filter((v) => v.severity === "erro").length;
const warns = violations.filter((v) => v.severity === "aviso").length;
console.log("Studio UX Linter — detecção estática (LINTER §2)\n");
for (const f of Object.keys(byFile).sort()) {
  console.log(`  ${f}`);
  for (const v of byFile[f].sort((a, b) => a.line - b.line)) {
    const tag = v.severity === "erro" ? "ERRO " : "aviso";
    console.log(`    ${String(v.line).padStart(4)} [${tag}] ${v.id} (${v.origin}) — ${v.evidence}`);
  }
  console.log("");
}
console.log(`Total: ${errors} erro(s), ${warns} aviso(s).`);
process.exit(errors > 0 ? 1 : 0);
