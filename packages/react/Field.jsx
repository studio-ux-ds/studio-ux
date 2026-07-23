import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Field — wrapper .su-field (label + controle + erro/dica). Erro é inline (P14);
 * a falha de envio vai por Toast (P12).
 */
export function Field({ label, error, hint, htmlFor, className = "", children }) {
  const cls = ["su-field", error && "su-field--error", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {label && <label className="su-field__label" htmlFor={htmlFor}>{label}</label>}
      {children}
      {error && <span className="su-field__error"><DSIcon name="alert-circle" />{error}</span>}
      {!error && hint && <span className="su-field__hint">{hint}</span>}
    </div>
  );
}

/** Input — .su-input. */
export function Input({ className = "", ...rest }) {
  return <input className={["su-input", className].filter(Boolean).join(" ")} {...rest} />;
}

/**
 * PhoneInput — .su-phoneinput. Valor guardado em E.164 só-dígitos, sem "+".
 * (A resolução de país/normalização é do produto; aqui é a casca de UI.)
 */
export function PhoneInput({ dialCode = "+55", flag = "🇧🇷", onPickCountry, ...rest }) {
  return (
    <div className="su-phoneinput">
      <button className="su-phoneinput__country" type="button" onClick={onPickCountry}>
        {flag} {dialCode} <DSIcon name="chevron-down" size="sm" style={{ color: "var(--su-text-muted)" }} />
      </button>
      <input className="su-phoneinput__input" inputMode="tel" {...rest} />
    </div>
  );
}
