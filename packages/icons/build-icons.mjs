#!/usr/bin/env node
/**
 * Studio UX — build + verificação da biblioteca de ícones (ICONOGRAPHY §3/§7).
 * Valida o CONTRATO DE ESTILO (estilo único, sem cor/tamanho crus) e emite os artefatos:
 *   icons/<name>.svg (biblioteca curada) + manifest.json (registro com significado).
 * Falha (exit 1) se algum ícone quebrar o contrato — o pacote enforce a própria regra.
 */
import { writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
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
// Reconcilia em vez de apagar a pasta inteira: sobrescreve os SVGs de `icons.js`
// e remove SÓ os órfãos. O `rmSync(OUT)` anterior tornava o build impossível de
// rodar de dentro de um mount que não permite `unlink` (o caso do sandbox sobre
// a pasta do Windows) — e o efeito colateral foi silencioso: quem adicionava um
// glifo não conseguia gerar os artefatos, então `icons.js` seguia em frente e
// `icons/` + `manifest.json` ficavam para trás sem ninguém perceber (o adapter
// React lê `icons.js`, então a tela funcionava). Agora o `check-packages.mjs`
// também trava nessa divergência.
mkdirSync(OUT, { recursive: true });
const emitidos = new Set(ICON_NAMES.map((n) => n + ".svg"));
if (existsSync(OUT)) {
  for (const f of readdirSync(OUT)) {
    if (f.endsWith(".svg") && !emitidos.has(f)) rmSync(join(OUT, f), { force: true });
  }
}
for (const name of ICON_NAMES) writeFileSync(join(OUT, name + ".svg"), iconSvg(name) + "\n");

const manifest = {
  name: "@studio-ux-ds/icons",
  style: { grid: 24, ...ICON_STYLE },
  note: "Biblioteca curada (ICONOGRAPHY §6). Uma metáfora, um significado (P2). Cor via currentColor (§4). Cresce por curadoria governada.",
  count: ICON_NAMES.length,
  icons: Object.fromEntries(ICON_NAMES.map((n) => [n, { meaning: ICONS[n].meaning, keywords: ICONS[n].keywords }])),
};
writeFileSync(join(DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// --- Galeria navegável (examples/icons.html) — GERADA, nunca escrita à mão ---
// Ela era um HTML manual e congelou em 43 glifos enquanto o catálogo chegava a 91:
// mais da metade da biblioteca ficou invisível para quem abre a galeria para
// procurar um ícone — que é exatamente como um consumidor conclui "não existe" e
// vai buscar em outra biblioteca (ICONOGRAPHY §4.1, Corolário II). Artefato que
// mostra o catálogo tem que SAIR do catálogo; qualquer cópia manual vira mentira
// na primeira curadoria seguinte.
const GALERIA = join(DIR, "..", "..", "examples", "icons.html");
const cell = (n) =>
  `    <figure class="cell" data-nome="${n}" data-kw="${ICONS[n].keywords.join(" ")}" title="${ICONS[n].meaning}">` +
  `<span class="ic">${iconSvg(n, { size: 24 })}</span><figcaption>${n}</figcaption></figure>`;
const html = `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Studio UX — Ícones (biblioteca curada)</title>
<!-- ARQUIVO GERADO por packages/icons/build-icons.mjs a partir de icons.js. Não editar à mão. -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="../packages/tokens/tokens.css">
<link rel="stylesheet" href="../packages/icons/icons.css">
<style>
 body{margin:0;background:var(--su-surface-base);font-family:var(--su-font-ui);color:var(--su-text-primary);padding:var(--su-space-6);}
 h1{font-size:var(--su-fs-h2);margin:0 0 var(--su-space-1);} p{color:var(--su-text-muted);font-size:var(--su-fs-body-sm);margin:0 0 var(--su-space-5);}
 .bar{display:flex;gap:var(--su-space-2);align-items:center;margin-bottom:var(--su-space-5);flex-wrap:wrap;}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:var(--su-space-2);}
 .cell{margin:0;display:flex;flex-direction:column;align-items:center;gap:var(--su-space-2);padding:var(--su-space-4) var(--su-space-2);border:1px solid var(--su-border-default);border-radius:var(--su-radius-md);background:var(--su-surface-raised);}
 .cell[hidden]{display:none;}
 .ic{color:var(--su-text-primary);} figcaption{font-size:var(--su-fs-caption);color:var(--su-text-muted);font-family:var(--su-font-mono);text-align:center;word-break:break-all;}
 .sizes{display:flex;gap:var(--su-space-4);align-items:baseline;color:var(--su-text-secondary);}
 button,input{font:inherit;padding:var(--su-space-1) var(--su-space-3);border:1px solid var(--su-border-default);border-radius:var(--su-radius-md);background:var(--su-surface-raised);color:var(--su-text-primary);}
 button{cursor:pointer;} #vazio{color:var(--su-text-muted);font-size:var(--su-fs-body-sm);}
</style></head>
<body>
 <h1>Ícones — biblioteca curada (${ICON_NAMES.length})</h1>
 <p>Estilo único: grade 24 · traço ${ICON_STYLE.strokeWidth} · currentColor (herda o token de texto) · terminações redondas. ICONOGRAPHY §3/§6.<br>
    Não achou o conceito aqui? Isso é <strong>lacuna do catálogo</strong> — o caminho é a curadoria (§4.1), nunca importar de outra biblioteca.</p>
 <div class="bar">
   <button onclick="document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark'">Alternar tema</button>
   <input id="busca" type="search" placeholder="Buscar por nome ou palavra-chave…" style="min-width:260px">
   <span class="sizes"><span class="su-icon su-icon--sm">${iconSvg("check")}</span>sm 16 <span class="su-icon">${iconSvg("check")}</span>md 20 <span class="su-icon su-icon--lg">${iconSvg("check")}</span>lg 24</span>
 </div>
 <div class="grid">
${ICON_NAMES.map(cell).join("\n")}
 </div>
 <p id="vazio" hidden>Nada com esse nome. Se o conceito faz falta, ele entra por curadoria em <code>packages/icons/icons.js</code>.</p>
<script>
 const cells=[...document.querySelectorAll('.cell')], vazio=document.getElementById('vazio');
 document.getElementById('busca').addEventListener('input',(e)=>{
   const q=e.target.value.trim().toLowerCase();
   let n=0;
   for(const c of cells){const ok=!q||c.dataset.nome.includes(q)||c.dataset.kw.includes(q);c.hidden=!ok;if(ok)n++;}
   vazio.hidden=n>0;
 });
</script>
</body>
</html>
`;
writeFileSync(GALERIA, html);

console.log(`  ✓ ${ICON_NAMES.length} ícones conformes emitidos em icons/ + manifest.json + examples/icons.html`);
console.log(`  estilo: grade 24 · traço ${ICON_STYLE.strokeWidth} · currentColor · terminações redondas`);
