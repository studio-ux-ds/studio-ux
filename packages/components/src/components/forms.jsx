import React from 'react';

/** Campo de formulário com label, erro e hint. Envolve qualquer controle. */
export function Field({ label, error, hint, children }) {
  return (
    <div className={`su-field${error ? ' su-field--error' : ''}`}>
      {label && <label className="su-field__label">{label}</label>}
      {children}
      {error && <span className="su-field__error">{error}</span>}
      {!error && hint && <span className="su-field__hint">{hint}</span>}
    </div>
  );
}

/** Campo de texto. `.su-input`. */
export function Input(props) {
  return <input className="su-input" {...props} />;
}

/** Área de texto. `.su-textarea`. */
export function Textarea(props) {
  return <textarea className="su-textarea" {...props} />;
}

/** Seleção. `.su-select` (caret nativo removido). */
export function Select({ children, ...rest }) {
  return <select className="su-select" {...rest}>{children}</select>;
}

/** Caixa de marcação. `.su-checkbox`. */
export function Checkbox(props) {
  return <input type="checkbox" className="su-checkbox" {...props} />;
}

/** Rádio. `.su-radio`. */
export function Radio(props) {
  return <input type="radio" className="su-radio" {...props} />;
}

/** Interruptor liga/desliga. `.su-switch`. */
export function Switch({ checked, onChange, ...rest }) {
  return (
    <label className="su-switch">
      <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
      <span className="su-switch__track" />
    </label>
  );
}

/** Campo numérico com passos +/−. `.su-numeric`. */
export function NumericInput({ value, onChange, min, max, step = 1 }) {
  const num = Number(value) || 0;
  const set = (v) => onChange && onChange(String(v));
  return (
    <div className="su-numeric">
      <button type="button" className="su-numeric__btn" disabled={min != null && num <= min} onClick={() => set(num - step)}>−</button>
      <input className="su-numeric__input" value={value} onChange={(e) => onChange && onChange(e.target.value)} />
      <button type="button" className="su-numeric__btn" disabled={max != null && num >= max} onClick={() => set(num + step)}>+</button>
    </div>
  );
}
