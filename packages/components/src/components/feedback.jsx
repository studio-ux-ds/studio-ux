import React from 'react';

/** Aviso contínuo (não substitui toast). `.su-banner`. */
export function Banner({ variant = 'info', icon, children }) {
  return (
    <div className={`su-banner su-banner--${variant}`}>
      {icon && <span className="su-banner__icon">{icon}</span>}
      <div className="su-banner__body">{children}</div>
    </div>
  );
}

/** Notificação efêmera. `.su-toast`. */
export function Toast({ variant = 'success', icon = '✓', children }) {
  return (
    <span className={`su-toast su-toast--${variant}`}>
      <span className="su-toast__icon">{icon}</span>
      {children}
    </span>
  );
}

/** Indicador de carregamento. `.su-spinner`. */
export function Spinner() {
  return <span className="su-spinner" role="status" aria-label="carregando" />;
}

/** Placeholder de carregamento. `.su-skeleton`. */
export function Skeleton({ width = '100%', height = 14, style }) {
  return <span className="su-skeleton" style={{ display: 'block', width, height, ...style }} />;
}

/** Estado vazio. `.su-empty`. */
export function EmptyState({ icon = '∅', title, children }) {
  return (
    <div className="su-empty">
      <div className="su-empty__icon">{icon}</div>
      {title && <div className="su-empty__title">{title}</div>}
      {children && <div style={{ fontSize: 13, marginTop: 4 }}>{children}</div>}
    </div>
  );
}

/** Barra de progresso. `.su-progress`. */
export function Progress({ value = 0 }) {
  return (
    <div className="su-progress">
      <div className="su-progress__fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
