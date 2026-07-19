# DevTools — inspetores (Épico 2)

Implementa `docs/tools/STUDIO_UX_DEVTOOLS.md`. **Lupas somente-leitura**: leem a regra do domínio dono e mostram ao vivo o que uma composição usa **agora** — não julgam conformidade (isso é o Linter) nem alteram a Specification.

- **Abrir:** dê duplo-clique em `packages/cli/devtools/index.html` (roda no navegador, sem build). Carrega os pacotes reais (`packages/tokens/tokens.css` + `packages/components/components.css`) e lê os **valores vivos** via `getComputedStyle` — inspeciona o Runtime, não a abstração.
- **Tema:** o toggle no topo alterna claro/escuro e **tudo re-lê ao vivo** (paridade de tema, contraste por tema).

## Os 9 inspetores (DEVTOOLS §2)

| Inspetor | Revela | Lê (dono) |
|---|---|---|
| **Inspector** | visão geral + índice + contagem de tokens | COMPONENT_LIBRARY · GRAMMAR · SURFACES |
| **Theme Viewer** | tema ativo e como cada superfície resolve | THEMES |
| **Token Viewer** | todo token, seu valor no tema ativo, com swatch | tokens/* |
| **Component Explorer** | peças oficiais + variantes/estados, ao vivo | COMPONENT_LIBRARY |
| **Layout Inspector** | pilha de z-index e breakpoints | LAYOUT_SYSTEM |
| **Spacing Inspector** | escala de espaço (grade 4px) visualizada | SPACING · VISUAL_RHYTHM |
| **Accessibility Inspector** | contraste medido ao vivo × meta AA, por tema | ACCESSIBILITY (Art. 9) |
| **Motion Inspector** | durações/easings + observar um movimento | ANIMATIONS (P15) |
| **Feedback Inspector** | loading/empty/progress/toast ao vivo | PATTERNS · COMPONENT_LIBRARY |

## Fronteira (o que os DevTools NÃO fazem)

Não detectam violações automaticamente (é o **Linter**), não são catálogo/sandbox (é o **Playground**), não graduam (é a **Certification**), não alteram a Specification. Cada inspetor cita seu dono e é **somente-leitura sobre a regra** (DEVTOOLS §1). O Accessibility Inspector *mostra* o contraste; quem *reprova* é o Linter (`contrast-minimum`).
