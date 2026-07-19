# Achados de contraste (linter `contrast-minimum`) — 2026-07-19

> ✅ **RESOLVIDO em v1.1.5** (decisão do Robson: ajustar os tokens na fonte). Novos valores:
> `text-muted` claro `#9AA1AE → #8E95A1` (2.60 → 3.02, alvo 3.0 — mantém a cara de muted),
> `warning-fg` claro `#B45309 → #B25209` (→ 4.53), `danger-fg` claro `#DC2626 → #D12424` (→ 4.51),
> `action` escuro `#6366F1 → #6365F0` (→ 4.52). Exports regenerados; o linter agora zera. Histórico
> abaixo mantido como trilha (o que foi encontrado e por quê).


> O linter (`packages/cli/linter/lint.mjs`, regra `contrast-minimum` — P18/Art.9) calculou a razão
> de contraste WCAG dos pares texto/fundo de token da paleta **v1.0.0 (frozen)** e encontrou
> **4 pares abaixo de AA**. Registrado como **dívida visível** (Art. 21: não esconder, não
> afrouxar o limiar). **Não corrigido automaticamente** — mexer em token congelado é decisão
> do Robson (RFC/ADR; mudar valor de token é quebra de contrato = MAJOR).

## Achados

| Par (texto sobre fundo) | Tema | Razão | Meta AA | Gravidade |
|---|---|---|---|---|
| `text-muted` sobre `surface-raised` | claro | **2.60:1** | 4.5 (texto normal) / 3.0 (grande) | 🔴 falha clara |
| `warning-fg` sobre `warning-bg` | claro | 4.45:1 | 4.5 | 🟠 raspando |
| `danger-fg` sobre `danger-bg` | claro | 4.13:1 | 4.5 | 🟠 raspando |
| `text-on-action` sobre `action` | escuro | 4.47:1 | 4.5 | 🟠 raspando |

(Os demais pares auditados passam nos dois temas.)

## Leitura

- **`text-muted` (2.60)** é o único que falha de forma clara — cinza `#9AA1AE` sobre branco. Se o
  `text-muted` for usado em **texto pequeno** (legenda/placeholder), 4.5 é a meta e 2.60 reprova.
  Placeholder puro é isento pela WCAG; legenda informativa, não.
- Os 3 "raspando" (4.13–4.47) ficam logo abaixo de 4.5. São texto de **status sobre tint** e
  **branco sobre a ação**. Pela WCAG, se tratados como **componente de UI / texto grande**, a meta
  é 3.0 e passariam; como **texto normal pequeno**, a meta é 4.5 e reprovam por pouco.

## Decisão pendente (do Robson) — 3 caminhos, nenhum é "esconder"

1. **Ajustar os tokens** (escurecer levemente `text-muted`, `warning-fg`, `danger-fg` no claro e
   clarear `action` no escuro/usar texto mais claro) — corrige na fonte. Mexe em token congelado →
   nova linha/decisão explícita + regenerar exports.
2. **Ajustar a política AA por papel no linter** — declarar que `text-muted` e `*-fg`/`on-action`
   são alvos de **3.0** (UI/large) e não 4.5. Legítimo pela WCAG **se** esses papéis nunca forem
   usados em texto pequeno corrido. `text-muted` a 2.60 ainda reprovaria 3.0 → precisaria de ajuste.
3. **Aceitar como débito registrado** — manter este arquivo como a trilha, o linter continua
   apontando (visível), e some quando 1 ou 2 for aplicado.

Enquanto não decidido, fica aqui — visível, não esquecido.
