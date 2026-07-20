import React from 'react';

/**
 * Botão de ação do Studio UX. Casca fina sobre as classes `.su-btn`.
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export function Button({ variant = 'primary', size = 'md', disabled = false, children, ...rest }) {
  const cls = [
    'su-btn',
    `su-btn--${variant}`,
    size && size !== 'md' ? `su-btn--${size}` : '',
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

/** Botão só-ícone. `.su-iconbtn`. */
export function IconButton({ children, ...rest }) {
  return (
    <button className="su-iconbtn" {...rest}>
      {children}
    </button>
  );
}
