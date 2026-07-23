import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Button — embrulha .su-btn. Props traduzem para classes/estados (P1), nunca valores.
 * @param {"primary"|"secondary"|"ghost"|"danger"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {string} icon  nome do ícone local curado à esquerda (ex.: "plus")
 * @param {string} iconRight  ícone à direita (ex.: "arrow-right")
 */
export function Button({ variant = "secondary", size = "md", icon, iconRight, className = "", children, ...rest }) {
  const sizeCls = size === "sm" ? "su-btn--sm" : size === "lg" ? "su-btn--lg" : "";
  const cls = ["su-btn", `su-btn--${variant}`, sizeCls, className].filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {icon && <DSIcon name={icon} size="sm" />}
      {children}
      {iconRight && <DSIcon name={iconRight} size="sm" />}
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
