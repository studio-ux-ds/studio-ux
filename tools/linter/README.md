# Linter — detecção estática (Épico 3)

Implementa `docs/quality/STUDIO_UX_LINTER.md`. Detecção **binária e estática**: cada regra aponta UMA violação e **cita seu P#/Art. dono** (o linter não cria regra — só detecta). Severidade herda o peso da certificação: eliminatório → **erro**, pontuável → **aviso**. Fora do estático → **encaminha** (Certification/humano), não decide.

- **Rodar:** `npm run lint` (fixtures) · `node tools/linter/lint.mjs <arquivos…>` (alvos).
- **Saída:** por arquivo/linha — `id (origem) — evidência`; **sai com código 1 se houver erro** (para travar CI). É o domínio de detecção; a CLI (`studio lint`) é a superfície de invocação.

## As 14 regras (LINTER §2)

| id | origem | sev | detecta |
|---|---|---|---|
| `no-magic-spacing` | P1/P7/Art.3 | erro | espaçamento `px` literal fora de `--su-space-*` |
| `no-magic-value` | P1/Art.3 | erro | raio/opacidade/sombra literal fora de token |
| `color-off-token` | P1/P8/Art.3 | erro | cor `#hex`/`rgb()` literal fora de `var(--su-*)` |
| `unofficial-component` | P2/P3/Art.4 | erro/aviso | `<input type=number>` (use NumericInput); `<button>` cru sem `su-*` |
| `typography-off-role` | P1/P20/Art.3 | erro | `font-size` literal fora de `--su-text-*` |
| `animation-off-catalog` | P15/P1 | erro/aviso | duração literal em transition/animation; `parallax` |
| `single-primary-action` | P6 | erro | mais de um `su-btn--primary` no contexto |
| `layout-from-system` | P22 | aviso | grid ad hoc inline (`grid-template-columns` em `style`) |
| `no-cross-product-component` | P4/Art.2 | erro | Desktop (`su-sidebar`) usando Mobile (`su-m-*`) ou vice-versa |
| `no-surface-jargon` | P11/Art.7 | erro | jargão técnico na superfície (`--su-*`, `snake_case`) |
| `meaning-not-color-only` | P17/Art.9 | aviso | status só por cor (parcial — encaminha) |
| `focus-visible-required` | P18/P19/Art.9 | erro | `outline:none/0` sem foco visível substituto |
| `contrast-minimum` | P18/Art.9 | erro/aviso | par texto/fundo de token < AA (calculado, por tema) |
| `required-states` | P14 | aviso | componente de dados sem vazio/carregando/erro (parcial) |

## Fixtures (prova de que acerta)

- `fixtures/bad.html` — viola de propósito; o linter aponta as 14 categorias.
- `fixtures/good.html` — conforme (só composição via tokens/componentes); **zero** violação de arquivo.

## Achado real (contraste dos tokens)

A regra `contrast-minimum` é **determinística** (valores de token conhecidos por tema). Rodando sobre a paleta v1.0.0 ela **encontrou 4 pares abaixo de AA** — ver `docs/quality/CONTRASTE-ACHADOS.md`. Não foram silenciados nem o limiar foi afrouxado (Art. 21): ficam como **dívida visível** aguardando decisão (ajustar token, ajustar política AA por papel, ou aceitar como débito registrado).

## Fronteira (o que o linter NÃO julga)

Gosto, calma, beleza, "ação certa", densidade, medição no tempo (é `COMPLIANCE`), nível/selo (é `CERTIFICATION`). Quando a resposta depende de *olhar e sentir*, o linter encaminha.
