#!/usr/bin/env node
// Verificação de sanidade dos pacotes ANTES de publicar (não é o Linter completo —
// é o smoke test de empacotamento). Checa: campos obrigatórios, arquivos de `files`
// existentes, grafo acíclico e a fronteira Desktop×Mobile (P4 — react ⊥ react-native).
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rootPkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
let errors = 0;
const fail = (m) => { console.error("  ✗ " + m); errors++; };

const versions = new Set();
for (const w of rootPkg.workspaces) {
  const dir = join(root, w);
  const pkgPath = join(dir, "package.json");
  if (!existsSync(pkgPath)) { fail(`${w}: sem package.json`); continue; }
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

  for (const field of ["name", "version", "description", "license"]) {
    if (!pkg[field]) fail(`${pkg.name || w}: campo obrigatório ausente: ${field}`);
  }
  versions.add(pkg.version);

  // Todos os arquivos declarados em `files` devem existir (globs simples/dir).
  for (const f of pkg.files || []) {
    const clean = f.replace(/\/$/, "");
    if (clean.includes("*")) {
      const ext = clean.split(".").pop();
      if (!readdirSync(dir).some((x) => x.endsWith("." + ext))) fail(`${pkg.name}: nada casa com "${f}"`);
    } else if (!existsSync(join(dir, clean))) {
      fail(`${pkg.name}: "${f}" declarado em files mas não existe`);
    }
  }
  console.log(`  ✓ ${pkg.name}@${pkg.version}`);
}

// Lockstep: todas as versões dos pacotes iguais entre si.
if (versions.size > 1) fail(`versões fora de lockstep: ${[...versions].join(", ")}`);

// Fronteira P4: o adapter web e o nativo nunca se importam.
const reactDir = join(root, "packages/react");
const rnDir = join(root, "packages/react-native");
const scan = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? scan(join(dir, e.name)) : [join(dir, e.name)]);
for (const file of scan(reactDir).filter((f) => /\.jsx?$/.test(f))) {
  if (readFileSync(file, "utf8").includes("react-native")) fail(`${file}: adapter web importa react-native (viola P4)`);
}
for (const file of scan(rnDir).filter((f) => /\.jsx?$/.test(f))) {
  const src = readFileSync(file, "utf8");
  if (/@studio-ux-ds\/react[^-]/.test(src)) fail(`${file}: adapter nativo importa o adapter web (viola P4)`);
}

// Integridade de comentário de bloco — nasceu de um bug REAL na v1.2.17: um JSDoc
// escrito com `**3**/**4**` contém a sequência `*/`, que FECHA o comentário no meio
// da frase. O resto do texto virou código, o arquivo ficou sintaticamente inválido
// e foi PUBLICADO — porque este script só verificava se os arquivos existiam, não
// se eram válidos. O consumidor só descobriu no build.
//
// Sem parser (este script é dependency-free e roda antes do `npm install` na CI):
// a heurística é precisa para esta classe — numa linha de continuação de comentário
// (começa com `*`), um `*/` que NÃO está no fim da linha fechou o bloco cedo.
const commentFiles = [
  ...scan(join(root, "packages")).filter((f) => /\.(jsx?|mjs|css)$/.test(f) && !f.includes("node_modules")),
];
for (const file of commentFiles) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (!/^\s*\*/.test(line)) return;            // só linhas de continuação de JSDoc
    const at = line.indexOf("*/");
    if (at === -1) return;
    if (line.slice(at + 2).trim() !== "") {
      fail(`${file.replace(root, ".")}:${i + 1}: "*/" no meio de um comentário fecha o bloco cedo — o resto da linha vira código. Reescreva sem "*/" (ex.: "3 ou 4" em vez de "**3**/**4**").`);
    }
  });
}

console.log(errors ? `\n${errors} problema(s).` : "\nTudo certo — pacotes prontos para empacotar.");
process.exit(errors ? 1 : 0);
