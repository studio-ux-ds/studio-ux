#!/usr/bin/env node
/**
 * Studio UX — build + verificação da biblioteca de ícones (ICONOGRAPHY §3/§7).
 * Valida o CONTRATO DE ESTILO (estilo único, sem cor/tamanho crus) e emite os artefatos:
 *   icons/<name>.svg (biblioteca curada) + manifest.json (registro com significado).
 * Falha (exit 1) se algum ícone quebrar o contrato — o pacote enforce a própria regra.
 */
import { writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ICONS, ICON_NAMES, ICON_STYLE, iconSvg } from "./icons.js";

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "icons");
let errors = 0;
const fail = (m) => { console.error("  ✗ " + m); errors++; };

// --- Contrato de estilo (§3/§7): nome semântico kebab-case; sem cor crua; sem tamanho cru; só primitivas SVG. ---
const PRIMITIVE = /<(path|circle|rect|line|polyline|polygon|ellipse)\b[^>]*\/?>/g;
for (const name of ICON_NAMES) {
  const { body, meaning, keywords } = ICONS[name];
  if (!/^[a-z][a-z0-9-]*$/.test(name)) fail(`"${name}": nome não é kebab-case semântico`);
  if (!meaning || !meaning.trim()) fail(`"${name}": sem significado documentado (§6)`);
  if (!Array.isArray(keywords) || !keywords.length) fail(`"${name}": sem keywords`);
  if (/#[0-9a-fA-F]{3,6}\b/.test(body)) fail(`"${name}": cor crua no corpo — use currentColor (P1/P7)`);
  if (/\bfill="(?!none)/.test(body)) fail(`"${name}": fill explícito no corpo (só o wrapper define fill=none)`);
  if (/px\b|font-size|style=/.test(body)) fail(`"${name}": unidade/estilo cru no corpo (§4) — a geometria é adimensional na grade 24`);
  const prims = body.match(PRIMITIVE) || [];
  if (!prims.length) fail(`"${name}": corpo sem primitiva SVG reconhecida`);
  // Coordenadas ABSOLUTAS (comandos M/L/C/A/rect x/y…) devem caber na grade 24 (folga -2..26, §3).
  // Deltas relativos (l/h/v/c minúsculos) são legítimos negativos — não os checamos aqui.
  for (const [, x, y] of body.matchAll(/[ML]\s*(-?\d+(?:\.\d+)?)[ ,]+(-?\d+(?:\.\d+)?)/g)) {
    if (+x < -2 || +x > 26 || +y < -2 || +y > 26) { fail(`"${name}": ponto absoluto (${x},${y}) fora da grade 24 (§3)`); break; }
  }
}

if (errors) { console.error(`\n${errors} violação(ões) de contrato — biblioteca NÃO emitida.`); process.exit(1); }

// --- Emitir a biblioteca curada + o registro ---
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const name of ICON_NAMES) writeFileSync(join(OUT, name + ".svg"), iconSvg(name) + "\n");

const manifest = {
  name: "@studio-ux-ds/icons",
  style: { grid: 24, ...ICON_STYLE },
  note: "Biblioteca curada (ICONOGRAPHY §6). Uma metáfora, um significado (P2). Cor via currentColor (§4). Cresce por curadoria governada.",
  count: ICON_NAMES.length,
  icons: Object.fromEntries(ICON_NAMES.map((n) => [n, { meaning: ICONS[n].meaning, keywords: ICONS[n].keywords }])),
};
writeFileSync(join(DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(`  ✓ ${ICON_NAMES.length} ícones conformes emitidos em icons/ + manifest.json`);
console.log(`  estilo: grade 24 · traço ${ICON_STYLE.strokeWidth} · currentColor · terminações redondas`);
