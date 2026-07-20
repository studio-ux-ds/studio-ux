import React from 'react';

/** Avatar (imagem, iniciais, status). `.su-avatar`. */
export function Avatar({ src, initials, alt = '', size, status }) {
  return (
    <span className={`su-avatar${size ? ` su-avatar--${size}` : ''}`}>
      {src ? <img src={src} alt={alt} /> : initials}
      {status && <span className={`su-avatar__status su-avatar__status--${status}`} />}
    </span>
  );
}

/** Tag removível. `.su-tag`. */
export function Tag({ children, onRemove }) {
  return (
    <span className="su-tag">
      {children}
      {onRemove && <button type="button" className="su-tag__x" onClick={onRemove} aria-label="Remover">×</button>}
    </span>
  );
}

/** Lista de descrições (chave · valor). `.su-dl`. rows: [{ key, val }]. */
export function DescriptionList({ rows = [] }) {
  return (
    <div className="su-dl">
      {rows.map((r, i) => (
        <div key={i} className="su-dl__row">
          <span className="su-dl__key">{r.key}</span>
          <span className="su-dl__val">{r.val}</span>
        </div>
      ))}
    </div>
  );
}

/** Linha do tempo (auditoria). `.su-timeline`. items: [{ title, meta, active }]. */
export function Timeline({ items = [] }) {
  return (
    <div className="su-timeline">
      {items.map((it, i) => (
        <div key={i} className={`su-timeline__item${it.active ? ' su-timeline__item--active' : ''}`}>
          <span className="su-timeline__dot" />
          <div className="su-timeline__title">{it.title}</div>
          <div className="su-timeline__meta">{it.meta}</div>
        </div>
      ))}
    </div>
  );
}

/** Passo a passo (wizard). `.su-stepper`. steps: string[]. */
export function Stepper({ steps = [], current = 0 }) {
  return (
    <div className="su-stepper">
      {steps.map((label, i) => {
        const state = i < current ? ' su-step--done' : i === current ? ' su-step--current' : '';
        return (
          <React.Fragment key={i}>
            <div className={`su-step${state}`}>
              <span className="su-step__dot">{i < current ? '✓' : i + 1}</span>
              <span className="su-step__label">{label}</span>
            </div>
            {i < steps.length - 1 && <div className={`su-step__line${i < current ? ' su-step__line--done' : ''}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/** Acordeão. `.su-accordion`. items: [{ title, body }]. */
export function Accordion({ items = [] }) {
  return (
    <div className="su-accordion">
      {items.map((it, i) => (
        <div key={i} className="su-accordion__item">
          <div className="su-accordion__head">{it.title}<span>▾</span></div>
          <div className="su-accordion__body">{it.body}</div>
        </div>
      ))}
    </div>
  );
}
