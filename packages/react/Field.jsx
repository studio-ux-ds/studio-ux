import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Field — wrapper .su-field (label + controle + erro/dica). Erro é inline (P14);
 * a falha de envio vai por Toast (P12).
 *
 * `required` marca o campo como obrigatório **na etiqueta** — o asterisco é o
 * sinal que o usuário já conhece, e vem acompanhado de "(obrigatório)" para o
 * leitor de tela, porque um `*` solto não é lido como nada.
 *
 * Ele NÃO propaga `required` para o controle: o Field embrulha children
 * arbitrários (Input, Select, TextArea, um grupo de Checkbox), e adivinhar em
 * qual deles cravar o atributo daria falso positivo. Quem valida é o produto —
 * o Field diz ao usuário o que é obrigatório, não impõe ao navegador.
 */
export function Field({ label, error, hint, htmlFor, required, wide = false, className = "", children }) {
  // `wide` só tem efeito dentro de um `FormGrid`: faz o campo ocupar a linha
  // inteira. É para o que se escreve (texto longo, JSON, lista editável) — meia
  // largura vira uma coluna estreita e alta em que o olho perde a linha. Fora do
  // grid, é inerte (não vira atributo no DOM nem quebra o layout).
  const cls = ["su-field", error && "su-field--error", wide && "su-field--wide", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {label && (
        <label className="su-field__label" htmlFor={htmlFor}>
          {label}
          {required && (
            <>
              <span className="su-field__req" aria-hidden="true">*</span>
              <span className="su-sr-only"> (obrigatório)</span>
            </>
          )}
        </label>
      )}
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
