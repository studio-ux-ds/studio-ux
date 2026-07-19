# Exporters — tokens da Specification → alvos

Implementa `docs/generation/STUDIO_UX_EXPORTERS.md`. Anatomia: **FONTE canônica → TRANSFORMAÇÃO determinística → ARTEFATO do alvo**.

- **Fonte única:** `packages/tokens/tokens.css` (o exporter só **lê** — Art. 5).
- **Rodar:** `npm run export:tokens` (na raiz). Regenera tudo em `packages/tokens/exports/`.
- **Regra de ouro:** os artefatos são **gerados e descartáveis** — nunca edite à mão; a próxima geração sobrescreve. Editar a fonte (`tokens.css`) é o único caminho para mudar um valor.
- **Fidelidade (§4):** direção única + determinismo (mesma fonte → mesmo artefato) + cobertura (todo token da fonte aparece no alvo; nada inventado, nada perdido). O script aborta se o tema escuro introduzir um token que não existe no claro.
- **Versão:** os exports **seguem a versão da Specification** (carimbada em cada artefato). Não têm versão própria.

## Alvos implementados (validados por máquina)

| Arquivo | Alvo | Natureza |
|---|---|---|
| `tokens.json` | JSON | estrutura neutra, intercambiável (light + dark) |
| `tokens.w3c.json` | Design Tokens (W3C/DTCG) | formato aberto padronizado (`$type`/`$value`) |
| `tokens.figma.json` | Figma Tokens (Tokens Studio) | pacote de tokens da ferramenta de design |
| `tailwind.preset.cjs` | Tailwind | preset com utilitários `su-*` (cores referenciam a var CSS → theme-aware) |
| `theme.js` | React + React Native | `export const light/dark` (valores fiéis à fonte) |
| `tokens.css` | CSS Variables | re-emissão determinística (a FONTE segue sendo `packages/tokens/tokens.css`) |

## Próximos alvos (crescimento honesto — NÃO stub)

`Flutter (Dart)`, `SwiftUI (Swift)`, `Compose (Kotlin)`. Emitir constantes é mecânico, mas exigem **verificação de compilação na própria plataforma** — não foram gerados aqui para não entregar arquivo que eu não consigo validar (Constituição Art. 21). Entram como novos emissores neste mesmo script quando forem verificáveis, sem tocar a fonte (a arquitetura é plugável, §2 do EXPORTERS).

## Consumo pelos produtos

```js
// Tailwind (tailwind.config.js do produto)
module.exports = { presets: [require("@studio-ux-ds/tokens/exports/tailwind.preset.cjs")] };

// Tema JS (React / React Native)
import { light, dark } from "@studio-ux-ds/tokens/exports/theme.js";

// Interop (design tools / outra stack)
import tokens from "@studio-ux-ds/tokens/exports/tokens.json" assert { type: "json" };
```
