import React from 'react';

/** Cabeçalho de página: título + subtítulo + ações à direita. */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--su-space-4)', flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: 'var(--su-text-primary)' }}>{title}</h1>
        {subtitle && (
          <p style={{ margin: '4px 0 0', color: 'var(--su-text-secondary)', fontSize: 13 }}>{subtitle}</p>
        )}
      </div>
      {actions && <div style={{ display: 'flex', gap: 'var(--su-space-2)' }}>{actions}</div>}
    </div>
  );
}
