import React from 'react';

/** Superfície de conteúdo. Casca fina sobre `.su-card`. */
export function Card({ children, style }) {
  return (
    <div className="su-card" style={style}>
      {children}
    </div>
  );
}
