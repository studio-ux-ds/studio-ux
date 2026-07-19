#!/usr/bin/env node
// Bump em LOCKSTEP: aplica a mesma versão à raiz e a todos os pacotes publicáveis.
// Uso: node scripts/set-version.mjs 1.0.1
// Governança: VERSIONING (SemVer, tag imutável) — nunca reusar número; confirmar com o Robson.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const version = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("Uso: node scripts/set-version.mjs X.Y.Z");
  process.exit(1);
}

const rootPkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const targets = ["package.json", ...rootPkg.workspaces.map((w) => join(w, "package.json"))];

for (const rel of targets) {
  const p = join(root, rel);
  const json = JSON.parse(readFileSync(p, "utf8"));
  json.version = version;
  writeFileSync(p, JSON.stringify(json, null, 2) + "\n");
  console.log(`  ${json.name || "studio-ux (raiz)"} -> ${version}`);
}
console.log(`\nVersão ${version} aplicada em lockstep. Lembre: CHANGELOG + commit + tag anotada v${version}.`);
