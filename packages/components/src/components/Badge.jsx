import React from 'react';

/**
 * Badge de status. Casca fina sobre `.su-badge`.
 * @param {'success'|'warning'|'danger'|'info'} variant
 */
export function Badge({ variant = 'info', children }) {
  return <span className={`su-badge su-badge--${variant}`}>{children}</span>;
}
