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

// A TAG tem que bater com a versão dos pacotes. Sem esta checagem, empurrar a tag
// `v1.2.18` com os package.json ainda em `1.2.17` faz o workflow republicar 1.2.17
// (que já existe no registry) e NADA com o número da tag chega lá — o CI fica
// verde, o consumidor recebe `ETARGET: No matching version found for …@^1.2.18` e
// o erro só aparece no deploy dele. Aconteceu de verdade na v1.2.18 (2026-07-25):
// eu corrigi o código e escrevi o CHANGELOG, mas esqueci de bumpar as versões.
const refName = process.env.GITHUB_REF_NAME || "";
if (/^v\d+\.\d+\.\d+/.test(refName)) {
  const tagVersion = refName.slice(1);
  const pkgVersion = [...versions][0];
  if (tagVersion !== pkgVersion) {
    fail(`tag ${refName} não bate com a versão dos pacotes (${pkgVersion}). Rode "npm run version:all ${tagVersion}" e refaça o commit ANTES de taggear — publicar assim republicaria ${pkgVersion} e a ${tagVersion} nunca existiria no registry.`);
  } else {
    console.log(`  ✓ tag ${refName} == versão dos pacotes`);
  }
}

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

// Sincronia da biblioteca de ícones: `icons.js` é a fonte, mas quem é PUBLICADO
// junto é `icons/*.svg` + `manifest.json` (estão no `files` do pacote). Se o
// `build-icons.mjs` não rodar depois de um glifo novo, a fonte anda e os
// artefatos ficam para trás — e o sintoma não aparece em lugar nenhum, porque o
// adapter React lê `icons.js` e desenha certo. Foi o que aconteceu entre a
// v1.2.24 e a v1.2.31: **8 glifos publicados sem SVG nem entrada no manifesto**,
// descobertos por acaso na v1.2.32. Quem consome o pacote pelos SVGs (design,
// outro runtime) recebia uma biblioteca menor do que a documentada.
{
  const iconsDir = join(root, "packages/icons");
  const fonte = readFileSync(join(iconsDir, "icons.js"), "utf8");
  const nomes = [...fonte.matchAll(/^\s*"([a-z][a-z0-9-]*)":\s*\{\s*meaning:/gm)].map((m) => m[1]);
  if (!nomes.length) fail("packages/icons/icons.js: não consegui ler os nomes dos glifos — o formato mudou?");
  const svgs = new Set(readdirSync(join(iconsDir, "icons")).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4)));
  const manifest = JSON.parse(readFileSync(join(iconsDir, "manifest.json"), "utf8"));
  const semSvg = nomes.filter((n) => !svgs.has(n));
  const orfaos = [...svgs].filter((n) => !nomes.includes(n));
  const semManifesto = nomes.filter((n) => !manifest.icons?.[n]);
  if (semSvg.length) fail(`packages/icons: glifos em icons.js sem SVG emitido (${semSvg.join(", ")}) — rode "node packages/icons/build-icons.mjs".`);
  if (orfaos.length) fail(`packages/icons: SVG sem glifo correspondente em icons.js (${orfaos.join(", ")}) — rode o build.`);
  if (semManifesto.length) fail(`packages/icons: glifos fora do manifest.json (${semManifesto.join(", ")}) — rode o build.`);
  if (manifest.count !== nomes.length) fail(`packages/icons: manifest.json diz ${manifest.count} glifos, icons.js tem ${nomes.length} — rode o build.`);
}

// Nome de ícone citado DENTRO do próprio adapter tem que existir no catálogo.
// `DSIcon` com nome desconhecido não quebra: desenha "help" (um "?") e avisa no
// console — proteção deliberada, para um engano de nome não apagar a tela do
// consumidor. O efeito colateral é que **o DS pode publicar um "?" e ninguém vê**,
// porque o aviso sai no console de quem consome, não no build de quem publica.
// Foi o caso de 4 nomes de uma vez até a v1.2.34: `circle-check` e `alert-triangle`
// no `Banner` (tones `success` e `warning` saíam com "?") e `adjustments` e
// `menu-2` no `AppShell` (o item "Personalizar" e o **hambúrguer do mobile**).
// Consumidor pode errar e ser avisado; o DS não pode errar o próprio vocabulário.
{
  const iconsSrc = readFileSync(join(root, "packages/icons/icons.js"), "utf8");
  const glifos = new Set([...iconsSrc.matchAll(/^\s*"([a-z][a-z0-9-]*)":\s*\{\s*meaning:/gm)].map((m) => m[1]));
  // Só posições em que o valor É um nome de ícone: `icon:`/`icon=`/`iconRight=`/`name=` com literal.
  const PADROES = [
    /\bicon:\s*"([a-z][a-z0-9-]+)"/g,
    /\bicon="([a-z][a-z0-9-]+)"/g,
    /\biconRight="([a-z][a-z0-9-]+)"/g,
    /<DSIcon\s+name="([a-z][a-z0-9-]+)"/g,
  ];
  for (const file of scan(join(root, "packages/react")).filter((f) => /\.jsx?$/.test(f))) {
    const src = readFileSync(file, "utf8");
    for (const re of PADROES) {
      for (const m of src.matchAll(re)) {
        if (!glifos.has(m[1])) {
          fail(`${file.replace(root, ".")}: ícone "${m[1]}" não existe em packages/icons/icons.js — o DSIcon desenharia "help" (um "?") na tela do consumidor.`);
        }
      }
    }
  }
}

// Alias do DSIcon NÃO pode ter o mesmo nome de um glifo real. `ALIASES[name] || name`
// dá precedência ao alias, então um alias homônimo ANULA o glifo curado — sem erro,
// sem aviso, e a tela desenha outra coisa. Reincidiu duas vezes:
//   v1.2.15 — `square`/`square-check`/`square-minus` → a caixa de seleção da
//             DataTable renderizava um DOCUMENTO.
//   v1.2.59 — `copy`→`file`, `history`→`refresh`, `upload`→`arrow-up-right`,
//             `shield`→`lock`, `alert-triangle`→`alert-circle`: cinco glifos
//             curados anulados; "copiar" saía como documento.
// Da segunda vez o comentário de aviso já existia no arquivo e não bastou — por
// isso agora é o build que reprova.
{
  const iconsSrc = readFileSync(join(root, "packages/icons/icons.js"), "utf8");
  const glifos = new Set([...iconsSrc.matchAll(/^\s*"([a-z][a-z0-9-]*)":\s*\{\s*meaning:/gm)].map((m) => m[1]));
  const dsIcon = readFileSync(join(root, "packages/react/DSIcon.jsx"), "utf8");
  const bloco = dsIcon.split("const ALIASES = {")[1]?.split("};")[0] ?? "";
  if (!bloco) fail("packages/react/DSIcon.jsx: não encontrei o bloco ALIASES — o formato mudou?");
  for (const m of bloco.matchAll(/^\s*"?([a-z][a-z0-9-]*)"?\s*:\s*"([a-z][a-z0-9-]*)"/gm)) {
    const [, de, para] = m;
    if (glifos.has(de)) {
      fail(`packages/react/DSIcon.jsx: alias "${de}" → "${para}" anula o glifo real "${de}" de icons.js — remova a linha (alias é só para nome legado SEM glifo próprio).`);
    }
    if (!glifos.has(para)) {
      fail(`packages/react/DSIcon.jsx: alias "${de}" aponta para "${para}", que não existe em icons.js — renderizaria "help".`);
    }
  }
}

console.log(errors ? `\n${errors} problema(s).` : "\nTudo certo — pacotes prontos para empacotar.");
process.exit(errors ? 1 : 0);
