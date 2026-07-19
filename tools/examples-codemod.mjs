#!/usr/bin/env node
/**
 * Codemod dos exemplos: troca valores crus por tokens nas categorias DETERMINÍSTICAS
 * (font-size, espaçamento, raio). NÃO toca em cor (contexto-sensível) nem em estrutura.
 * Uso: node tools/examples-codemod.mjs <arquivo> [--write]
 */
import { readFileSync, writeFileSync } from "node:fs";

const SPACE = [[4,1],[8,2],[12,3],[16,4],[20,5],[24,6],[32,8],[48,12],[64,16],[96,24]];
const nearestSpace = (n) => "var(--su-space-" + SPACE.reduce((a,b)=>Math.abs(b[0]-n)<Math.abs(a[0]-n)?b:a)[1] + ")";
const RADIUS = [[6,"sm"],[8,"md"],[12,"lg"],[16,"xl"]];
const nearestRadius = (n) => n>=9999 ? "var(--su-radius-full)" : "var(--su-radius-" + RADIUS.reduce((a,b)=>Math.abs(b[0]-n)<Math.abs(a[0]-n)?b:a)[1] + ")";
function fontRole(n){ if(n<=12)return"caption"; if(n<=14)return"body-sm"; if(n===15)return"body"; if(n<=17)return"h3"; if(n<=21)return"h2"; if(n<=27)return"h1"; return"display"; }

const SPACING_PROPS = /\b(margin|margin-top|margin-right|margin-bottom|margin-left|padding|padding-top|padding-right|padding-bottom|padding-left|gap|row-gap|column-gap)(\s*:\s*)([^;"}<]+)/g;

function transform(src) {
  let s = src;
  // font-size: Npx (aceita decimal) → var(--su-fs-role)
  s = s.replace(/font-size(\s*:\s*)(\d+(?:\.\d+)?)px/g, (_, c, n) => `font-size${c}var(--su-fs-${fontRole(Math.round(+n))})`);
  // color: #fff → texto sobre cor de ação (chrome; não toca em background/swatch)
  s = s.replace(/color(\s*:\s*)#(?:fff|ffffff)\b/gi, (_, c) => `color${c}var(--su-text-on-action)`);
  // font-size: var(--su-text-role) [par size/line-height, inválido] → var(--su-fs-role)
  s = s.replace(/font-size(\s*:\s*)var\(--su-text-([a-z0-9-]+)\)/g, (_, c, role) => `font-size${c}var(--su-fs-${role})`);
  // border-radius: valores com px → radius token (cada px do valor)
  s = s.replace(/\bborder-radius(\s*:\s*)([^;"}<]+)/g, (_, c, v) =>
    `border-radius${c}${v.replace(/(\d+)px/g, (_, n) => nearestRadius(+n))}`);
  // espaçamento: cada Npx do valor → space token (preserva 0/auto/var)
  s = s.replace(SPACING_PROPS, (_, prop, c, v) =>
    `${prop}${c}${v.replace(/(\d+)px/g, (_, n) => nearestSpace(+n))}`);
  return s;
}

const file = process.argv[2];
if (!file) { console.error("uso: node tools/examples-codemod.mjs <arquivo> [--write]"); process.exit(1); }
const before = readFileSync(file, "utf8");
const after = transform(before);
const changed = (before.match(/\n/g)||[]).length && before !== after;
if (process.argv.includes("--write")) { writeFileSync(file, after); console.log(`✓ ${file} — ${changed?"reescrito":"sem mudança"}`); }
else {
  // dry-run: contar substituições
  const n = (before.match(/(font-size\s*:\s*\d+px|border-radius\s*:[^;"}<]*\d+px|(margin|padding|gap|row-gap|column-gap)[a-z-]*\s*:[^;"}<]*\d+px)/g)||[]).length;
  console.log(`${file}: ~${n} declarações a tokenizar (dry-run; use --write)`);
}
