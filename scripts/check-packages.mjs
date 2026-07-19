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
  if (/@studio-ux\/react[^-]/.test(src)) fail(`${file}: adapter nativo importa o adapter web (viola P4)`);
}

console.log(errors ? `\n${errors} problema(s).` : "\nTudo certo — pacotes prontos para empacotar.");
process.exit(errors ? 1 : 0);
