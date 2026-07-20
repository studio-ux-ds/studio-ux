import React from 'react';

/** Abas. `.su-tabs` (+ `--pills`). items: [{ id, label }]. */
export function Tabs({ items = [], value, onChange, pills = false }) {
  return (
    <div className={`su-tabs${pills ? ' su-tabs--pills' : ''}`}>
      {items.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`su-tab${t.id === value ? ' su-tab--active' : ''}`}
          onClick={() => onChange && onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/** Controle segmentado. `.su-segmented`. items: [{ id, label }]. */
export function Segmented({ items = [], value, onChange }) {
  return (
    <div className="su-segmented">
      {items.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`su-segment${o.id === value ? ' su-segment--active' : ''}`}
          onClick={() => onChange && onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Trilha de navegação. `.su-breadcrumb`. items: [{ label, href }]. */
export function Breadcrumb({ items = [] }) {
  return (
    <nav className="su-breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>›</span>}
          {it.href ? <a href={it.href}>{it.label}</a> : <span>{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

/** Paginação. `.su-pagination`. */
export function Pagination({ page = 1, pages = 1, onPage }) {
  const go = (p) => onPage && p >= 1 && p <= pages && onPage(p);
  return (
    <div className="su-pagination">
      <button type="button" className="su-page su-page--nav" onClick={() => go(page - 1)}>‹</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} type="button" className={`su-page${p === page ? ' su-page--active' : ''}`} onClick={() => go(p)}>{p}</button>
      ))}
      <button type="button" className="su-page su-page--nav" onClick={() => go(page + 1)}>›</button>
    </div>
  );
}

/** Link. `.su-link` (+ `--muted`). */
export function Link({ href, muted = false, children, ...rest }) {
  return <a className={`su-link${muted ? ' su-link--muted' : ''}`} href={href} {...rest}>{children}</a>;
}

/** Separador. `.su-divider`. */
export function Divider() {
  return <hr className="su-divider" />;
}
