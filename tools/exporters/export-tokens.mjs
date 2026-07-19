#!/usr/bin/env node
/**
 * Studio UX — Exporter de tokens (Épico 4 · EXPORTERS).
 * Anatomia (STUDIO_UX_EXPORTERS §1): FONTE canônica → TRANSFORMAÇÃO determinística → ARTEFATO do alvo.
 * FONTE ÚNICA: packages/tokens/tokens.css (lê, nunca escreve — Art. 5). Direção única + determinismo
 * + cobertura (§4): todo token da fonte tem correspondente; nada inventado, nada perdido.
 * Os artefatos são GERADOS e descartáveis — regenere, nunca edite à mão.
 *
 * Alvos desta leva (validados por máquina): JSON, W3C Design Tokens, Figma Tokens, Tailwind, tema JS
 * (React + React Native), CSS Variables. Próximos alvos (precisam de verificação na plataforma, não
 * fingidos aqui): Flutter (Dart), SwiftUI (Swift), Compose (Kotlin) — ver README.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SRC = join(root, "packages/tokens/tokens.css");
const OUT = join(root, "packages/tokens/exports");
const VERSION = JSON.parse(readFileSync(join(root, "packages/tokens/package.json"), "utf8")).version;
const STAMP = `Studio UX tokens @ v${VERSION} — GERADO de packages/tokens/tokens.css. NÃO editar (regenere: npm run export:tokens).`;

// ---------- 1) FONTE: parse do tokens.css ----------
const css = readFileSync(SRC, "utf8");
function block(re) { const m = css.match(re); return m ? m[1] : ""; }
function pairs(body) {
  const out = {}; const re = /--su-([\w-]+)\s*:\s*([^;]+);/g; let m;
  while ((m = re.exec(body))) out[m[1].trim()] = m[2].trim();
  return out;
}
const light = pairs(block(/:root\s*\{([^}]*)\}/)); // primeiro :root = tema claro
const darkOverrides = pairs(block(/\[data-theme="dark"\]\s*\{([^}]*)\}/));
const dark = { ...light, ...darkOverrides };

// cobertura (§4): dark nunca introduz token que não exista no claro
for (const k of Object.keys(darkOverrides)) if (!(k in light)) throw new Error(`Token só no escuro (fonte divergente): ${k}`);

const NAMES = Object.keys(light).sort();
const camel = (n) => n.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

function classify(name, val) {
  if (/^#|^rgba?\(|^hsl/.test(val)) return "color";
  if (name.startsWith("elevation-")) return "shadow";
  if (name.startsWith("font-")) return "fontFamily";
  if (name.startsWith("fw-")) return "fontWeight";
  if (name.startsWith("duration-") || /ms$/.test(val)) return "duration";
  if (name.startsWith("ease-") || /^cubic-bezier/.test(val)) return "easing";
  if (/^\d+px\s*\/\s*[\d.]+$/.test(val)) return "typography";
  if (/^\d+(\.\d+)?px$/.test(val)) return "dimension";
  if (name.startsWith("z-")) return "zIndex";
  if (name.startsWith("opacity-")) return "opacity";
  if (/^[\d.]+$/.test(val)) return "number";
  return "other";
}
const CAT = Object.fromEntries(NAMES.map((n) => [n, classify(n, light[n])]));

// ---------- 2+3) TRANSFORMAÇÃO → ARTEFATO (um emissor por alvo) ----------
mkdirSync(OUT, { recursive: true });
const write = (f, s) => writeFileSync(join(OUT, f), s.endsWith("\n") ? s : s + "\n");
const sortObj = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));

// JSON neutro
function emitJson() {
  const model = { $meta: { name: "studio-ux-tokens", version: VERSION, source: "packages/tokens/tokens.css" },
    light: sortObj(light), dark: sortObj(dark) };
  write("tokens.json", JSON.stringify(model, null, 2));
}

// W3C Design Tokens (DTCG)
function emitW3C() {
  const typeFor = { color: "color", dimension: "dimension", duration: "duration", fontWeight: "fontWeight", fontFamily: "fontFamily" };
  const groups = {};
  for (const n of NAMES) {
    const cat = CAT[n]; const g = ({ dimension: "dimension", typography: "typography", zIndex: "number", opacity: "number", number: "number" }[cat]) || cat;
    (groups[g] ||= {});
    const tok = { $value: light[n] };
    if (typeFor[cat]) tok.$type = typeFor[cat];
    if (cat === "fontFamily") tok.$value = light[n].split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
    groups[g][n] = tok;
  }
  const darkColors = {};
  for (const n of NAMES) if (CAT[n] === "color" && dark[n] !== light[n]) darkColors[n] = { $type: "color", $value: dark[n] };
  const model = { $description: STAMP, ...groups, $dark: { color: sortObj(darkColors) } };
  write("tokens.w3c.json", JSON.stringify(model, null, 2));
}

// Figma Tokens (Tokens Studio)
function emitFigma() {
  const tsType = { color: "color", dimension: null, typography: "fontSizes", fontWeight: "fontWeights", duration: "other", easing: "other", shadow: "boxShadow", fontFamily: "fontFamilies", zIndex: "other", opacity: "opacity", number: "other" };
  const set = (theme) => {
    const g = {};
    for (const n of NAMES) {
      const cat = CAT[n];
      let group = tsType[cat];
      if (cat === "dimension") group = n.startsWith("radius-") ? "borderRadius" : n.startsWith("bp-") ? "sizing" : "spacing";
      group = group || "other";
      let value = theme[n];
      if (cat === "typography") value = theme[n].split("/")[0].trim(); // Tokens Studio fontSizes = tamanho
      (g[group] ||= {})[n.replace(/^(radius|space|bp|fw|text|z|opacity|duration|ease|elevation|font)-/, "")] = { value, type: group };
    }
    return g;
  };
  write("tokens.figma.json", JSON.stringify({ light: set(light), dark: set(dark), $meta: { version: VERSION } }, null, 2));
}

// Tailwind preset (utilitários namespaced su-*, cores referenciam a var CSS → theme-aware)
function emitTailwind() {
  const colors = {}, spacing = {}, borderRadius = {}, fontSize = {}, fontWeight = {}, zIndex = {}, opacity = {}, screens = {}, fontFamily = {};
  for (const n of NAMES) {
    const cat = CAT[n], key = "su-" + n.replace(/^(radius|space|bp|fw|text|z|opacity|font)-/, "");
    if (cat === "color") colors["su-" + n] = `var(--su-${n})`;
    else if (cat === "dimension" && n.startsWith("space-")) spacing[key] = light[n];
    else if (cat === "dimension" && n.startsWith("radius-")) borderRadius[key] = light[n];
    else if (cat === "dimension" && n.startsWith("bp-")) screens[key] = light[n];
    else if (cat === "typography") { const [sz, lh] = light[n].split("/"); fontSize[key] = [sz.trim(), { lineHeight: lh.trim() }]; }
    else if (cat === "fontWeight") fontWeight[key] = light[n];
    else if (cat === "zIndex") zIndex[key] = light[n];
    else if (cat === "opacity") opacity[key] = light[n];
    else if (cat === "fontFamily") fontFamily[key] = light[n].split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
  }
  const j = (o) => JSON.stringify(sortObj(o), null, 6).replace(/\n/g, "\n    ");
  write("tailwind.preset.cjs",
`/* ${STAMP} */
module.exports = {
  theme: {
    extend: {
      colors: ${j(colors)},
      spacing: ${j(spacing)},
      borderRadius: ${j(borderRadius)},
      fontSize: ${j(fontSize)},
      fontWeight: ${j(fontWeight)},
      zIndex: ${j(zIndex)},
      opacity: ${j(opacity)},
      screens: ${j(screens)},
      fontFamily: ${j(fontFamily)},
    },
  },
};
`);
}

// Tema JS (React + React Native consomem valores em JS) — valores fiéis à fonte (string)
function emitThemeJs() {
  const obj = (theme) => "{\n" + NAMES.map((n) => `  ${JSON.stringify(camel(n))}: ${JSON.stringify(theme[n])},`).join("\n") + "\n}";
  write("theme.js",
`// ${STAMP}
export const light = ${obj(light)};
export const dark = ${obj(dark)};
export const tokens = { light, dark };
export default tokens;
`);
}

// CSS Variables (re-emissão determinística — o alvo nativo; a FONTE segue sendo packages/tokens/tokens.css)
function emitCss() {
  const decls = (theme) => NAMES.map((n) => `  --su-${n}: ${theme[n]};`).join("\n");
  write("tokens.css",
`/* ${STAMP} */
:root {
${decls(light)}
}
[data-theme="dark"] {
${NAMES.filter((n) => dark[n] !== light[n]).map((n) => `  --su-${n}: ${dark[n]};`).join("\n")}
}
`);
}

// ---------- Alvos nativos (constantes) ----------
// GERADOS com sintaxe idiomática e determinística; validados estruturalmente (contagem = cobertura,
// chaves balanceadas). NÃO compilados aqui (sem dart/swiftc/kotlinc) — o produto verifica na plataforma.
const argb = (h) => "0xFF" + h.replace("#", "").toUpperCase();   // Flutter/Compose (alpha FF)
const rgb = (h) => "0x" + h.replace("#", "").toUpperCase();      // Swift (extensão aplica opacity 1)
const dbl = (s) => (/\./.test(s) ? s : s + ".0");
const px = (v) => v.replace("px", "");
const sz = (v) => v.split("/")[0].replace("px", "").trim();
const lh = (v) => v.split("/")[1].trim();
const ms = (v) => v.replace("ms", "");
const s = (v) => JSON.stringify(v);

// Flutter (Dart)
function emitFlutter() {
  const line = (n, v) => { const c = CAT[n], name = camel(n);
    if (c === "color") return `  static const Color ${name} = Color(${argb(v)});`;
    if (c === "dimension") return `  static const double ${name} = ${dbl(px(v))};`;
    if (c === "typography") return `  static const double ${name} = ${dbl(sz(v))}; // line-height ${lh(v)}`;
    if (c === "fontWeight" || c === "zIndex" || c === "number") return `  static const int ${name} = ${v};`;
    if (c === "duration") return `  static const int ${name} = ${ms(v)}; // ms`;
    if (c === "opacity") return `  static const double ${name} = ${dbl(v)};`;
    return `  static const String ${name} = ${s(v)};`; };
  const cls = (nm, th) => `abstract class ${nm} {\n${NAMES.map((n) => line(n, th[n])).join("\n")}\n}`;
  write("tokens.dart", `// ${STAMP}\nimport 'package:flutter/material.dart';\n\n${cls("SuTokensLight", light)}\n\n${cls("SuTokensDark", dark)}\n`);
}

// SwiftUI (Swift)
function emitSwift() {
  const line = (n, v) => { const c = CAT[n], name = camel(n);
    if (c === "color") return `    static let ${name} = Color(su: ${rgb(v)})`;
    if (c === "dimension") return `    static let ${name}: CGFloat = ${px(v)}`;
    if (c === "typography") return `    static let ${name}: CGFloat = ${sz(v)} // line-height ${lh(v)}`;
    if (c === "fontWeight" || c === "zIndex" || c === "number") return `    static let ${name} = ${v}`;
    if (c === "duration") return `    static let ${name} = ${ms(v)} // ms`;
    if (c === "opacity") return `    static let ${name}: Double = ${v}`;
    return `    static let ${name} = ${s(v)}`; };
  const ext = `extension Color {\n    init(su hex: UInt32) {\n        self.init(.sRGB, red: Double((hex >> 16) & 0xFF) / 255, green: Double((hex >> 8) & 0xFF) / 255, blue: Double(hex & 0xFF) / 255, opacity: 1)\n    }\n}`;
  const en = (nm, th) => `enum ${nm} {\n${NAMES.map((n) => line(n, th[n])).join("\n")}\n}`;
  write("Tokens.swift", `// ${STAMP}\nimport SwiftUI\n\n${ext}\n\n${en("SuTokensLight", light)}\n\n${en("SuTokensDark", dark)}\n`);
}

// Compose (Kotlin)
function emitCompose() {
  const line = (n, v) => { const c = CAT[n], name = camel(n);
    if (c === "color") return `    val ${name} = Color(${argb(v)})`;
    if (c === "dimension") return `    val ${name} = ${px(v)}.dp`;
    if (c === "typography") return `    val ${name} = ${sz(v)}.sp // line-height ${lh(v)}`;
    if (c === "fontWeight") return `    val ${name} = FontWeight(${v})`;
    if (c === "zIndex" || c === "number") return `    val ${name} = ${v}`;
    if (c === "duration") return `    val ${name} = ${ms(v)} // ms`;
    if (c === "opacity") return `    val ${name} = ${v}f`;
    return `    val ${name} = ${s(v)}`; };
  const obj = (nm, th) => `object ${nm} {\n${NAMES.map((n) => line(n, th[n])).join("\n")}\n}`;
  const head = `import androidx.compose.ui.graphics.Color\nimport androidx.compose.ui.text.font.FontWeight\nimport androidx.compose.ui.unit.dp\nimport androidx.compose.ui.unit.sp`;
  write("Tokens.kt", `// ${STAMP}\n${head}\n\n${obj("SuTokensLight", light)}\n\n${obj("SuTokensDark", dark)}\n`);
}

emitJson(); emitW3C(); emitFigma(); emitTailwind(); emitThemeJs(); emitCss();
emitFlutter(); emitSwift(); emitCompose();
console.log(`Exportados ${NAMES.length} tokens (v${VERSION}) → packages/tokens/exports/`);
console.log("  web/interop: tokens.json · tokens.w3c.json · tokens.figma.json · tailwind.preset.cjs · theme.js · tokens.css");
console.log("  nativos:     tokens.dart · Tokens.swift · Tokens.kt  (sintaxe determinística; compilar na plataforma)");
