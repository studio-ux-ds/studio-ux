import React from "react";
import { DSIcon } from "./DSIcon.jsx";
import { Spinner } from "./Feedback.jsx";

/**
 * Button — embrulha .su-btn. Props traduzem para classes/estados (P1), nunca valores.
 * @param {"primary"|"secondary"|"ghost"|"danger"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {string} icon  nome do ícone local curado à esquerda (ex.: "plus")
 * @param {string} iconRight  ícone à direita (ex.: "arrow-right")
 * @param {boolean} loading  estado de carregamento (P16): troca o ícone por
 *   `Spinner`, desabilita o botão (bloqueia re-clique) e anuncia `aria-busy`.
 *   O rótulo continua visível — quem chama deve trocá-lo pelo gerúndio da ação
 *   ("Salvando…"), porque spinner sozinho não diz o que está acontecendo (P11).
 */
export function Button({ variant = "secondary", size = "md", icon, iconRight, loading = false, disabled, className = "", children, ...rest }) {
  const sizeCls = size === "sm" ? "su-btn--sm" : size === "lg" ? "su-btn--lg" : "";
  const cls = ["su-btn", `su-btn--${variant}`, sizeCls, loading && "su-btn--loading", className].filter(Boolean).join(" ");
  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <Spinner /> : (icon && <DSIcon name={icon} size="sm" />)}
      {children}
      {iconRight && !loading && <DSIcon name={iconRight} size="sm" />}
    </button>
  );
}

/** IconButton — .su-iconbtn (exige aria-label). */
export function IconButton({ icon, className = "", ...rest }) {
  return (
    <button className={["su-iconbtn", className].filter(Boolean).join(" ")} {...rest}>
      <DSIcon name={icon} size="sm" />
    </button>
  );
}
