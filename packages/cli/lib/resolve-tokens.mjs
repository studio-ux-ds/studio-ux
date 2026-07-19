/**
 * Studio UX CLI — resolvedor da fonte de tokens (consumer-side + monorepo).
 * Precedência: override explícito (--tokens/STUDIO_UX_TOKENS) > pacote instalado @studio-ux-ds/tokens > layout do monorepo.
 * Nunca falha em silêncio (Art. 5): se não achar, lança erro listando o que foi tentado.
 */
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SELF_DIR = dirname(fileURLToPath(import.meta.url));

function tryInstalled(fromDir, sub) {
  try {
    const p = createRequire(join(fromDir, "_.js")).resolve(sub);
    return existsSync(p) ? p : null;
  } catch { return null; }
}

/** Caminho do tokens.css. `override` = flag/env; `root` = raiz do monorepo (fallback dev). */
export function resolveTokensCss({ override, root } = {}) {
  const tried = [];
  if (override) { tried.push("override: " + override); if (existsSync(override)) return override; }
  // pacote instalado — procura a partir do cwd do consumidor E da própria instalação do CLI
  for (const base of [process.cwd(), SELF_DIR]) {
    const p = tryInstalled(base, "@studio-ux-ds/tokens/tokens.css");
    if (p) { tried.push("instalado (@studio-ux-ds/tokens): " + p); return p; }
  }
  if (root) { const p = join(root, "packages/tokens/tokens.css"); tried.push("monorepo: " + p); if (existsSync(p)) return p; }
  throw new Error(
    "fonte de tokens não encontrada. Instale @studio-ux-ds/tokens no projeto, " +
    "ou passe --tokens <caminho> (ou a env STUDIO_UX_TOKENS).\n  Tentado:\n  - " + (tried.join("\n  - ") || "nada")
  );
}

/** Diretório de saída dos exports. `override` = --out; senão packages/tokens/exports no monorepo; senão <cwd>/studio-ux-tokens. */
export function resolveExportOut({ override, root } = {}) {
  if (override) return override;
  if (root && existsSync(join(root, "packages/tokens"))) return join(root, "packages/tokens/exports");
  return join(process.cwd(), "studio-ux-tokens");
}

/** Extrai --tokens/--out de argv (e env) e devolve { override, out, rest }. */
export function parseTokenArgs(argv) {
  let override = process.env.STUDIO_UX_TOKENS || undefined, out, rest = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--tokens") override = argv[++i];
    else if (argv[i] === "--out") out = argv[++i];
    else rest.push(argv[i]);
  }
  return { override, out, rest };
}
