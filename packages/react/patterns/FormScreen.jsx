import React from "react";
import { PageHeader } from "./PageHeader.jsx";
import { Card } from "../Card.jsx";
import { Button } from "../Button.jsx";
import { DSIcon } from "../DSIcon.jsx";
import { EmptyState, Skeleton } from "../Feedback.jsx";

function CamposCarregando() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--su-space-4)" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ display: "grid", gap: "var(--su-space-2)" }}>
          <Skeleton width="40%" height={10} />
          <Skeleton width="100%" height={34} radius="var(--su-radius-md)" />
        </div>
      ))}
    </div>
  );
}

/**
 * FormScreen — o molde **`form`** (`STUDIO_UX_TEMPLATES` §2, deriva de `FORMS`):
 * criar ou editar um registro, **em rota própria**.
 *
 * Regiões: voltar (opcional) → cabeçalho → `Card` com os campos → ações
 * (Cancelar *ghost* à esquerda, Salvar *primary* à direita).
 *
 * O que ele fixa, e por quê:
 *
 * - **É um `<form>` de verdade.** Enter submete, o gerenciador de senha entende
 *   o formulário, e o botão `type="submit"` funciona sem `onClick`. Formulário
 *   montado com `<div>` some com o Enter — e ninguém reporta isso como bug,
 *   as pessoas só param de usar o teclado.
 * - **Salvando é `loading` no botão** (P16), nunca um spinner montado à mão ao
 *   lado do rótulo: `loading` já desabilita, marca `aria-busy` e usa a escala e
 *   a cor do botão.
 * - **Erro de validação é `Toast`**, nunca banner inline — por isso o molde não
 *   tem região de erro de campo. O que ele tem é `banner`, para a condição que
 *   vale para a tela inteira ("este registro está arquivado").
 * - **Cancelar existe sempre.** É a saída, e ela não pode depender do breadcrumb.
 *
 * O arranjo dos campos é do `FormGrid` — passe-o como `children`. O molde não
 * decide colunas: quem conhece os campos é a tela.
 *
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [subtitle]
 * @param {{label?:string,onClick:Function}} [back]
 * @param {React.ReactNode} [banner]      condição que vale para a tela inteira
 * @param {Function} onSubmit
 * @param {Function} [onCancel]
 * @param {string} [submitLabel]
 * @param {string} [cancelLabel]
 * @param {boolean} [saving]
 * @param {boolean} [submitDisabled]
 * @param {React.ReactNode} [extraActions]  ação secundária do formulário (ex.: "Salvar e criar outro")
 * @param {boolean} [loading]               carregando o registro a editar
 * @param {{message:string,onRetry?:Function}} [error]
 */
export function FormScreen({
  title, subtitle, back, banner,
  onSubmit, onCancel, submitLabel = "Salvar", cancelLabel = "Cancelar",
  saving = false, submitDisabled = false, extraActions,
  loading, error,
  children,
}) {
  if (error) {
    return (
      <div className="su-screen">
        {(title || subtitle) && <PageHeader title={title} subtitle={subtitle} />}
        <Card>
          <EmptyState
            icon="alert-triangle"
            title="Não foi possível carregar"
            description={error.message}
            action={error.onRetry && <Button variant="secondary" icon="refresh" onClick={error.onRetry}>Tentar de novo</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="su-screen">
      {back && (
        <button type="button" className="su-backlink" onClick={back.onClick}>
          <DSIcon name="arrow-left" size="sm" />
          {back.label || "Voltar"}
        </button>
      )}

      {(title || subtitle) && <PageHeader title={title} subtitle={subtitle} />}

      {banner}

      {/* `<form>` real: o Enter submete e o `type="submit"` do botão basta. */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!saving) onSubmit?.(event);
        }}
      >
        <Card>
          {loading ? <CamposCarregando /> : children}

          <div className="su-form-actions">
            {extraActions}
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" variant="primary" loading={saving} disabled={submitDisabled || loading}>
              {submitLabel}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
