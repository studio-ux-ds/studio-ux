import React from 'react';
import { Button } from './Button';

/** Modal centralizado. `.su-scrim` + `.su-modal`. */
export function Modal({ title, children, footer, onClose }) {
  return (
    <div className="su-scrim" onClick={onClose}>
      <div className="su-modal" onClick={(e) => e.stopPropagation()}>
        {title && <div className="su-modal__head">{title}</div>}
        <div className="su-modal__body">{children}</div>
        {footer && <div className="su-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}

/** Diálogo de confirmação (destrutivo por padrão). Reusa Modal. */
export function ConfirmDialog({ title, message, confirmLabel = 'Confirmar', danger = true, onConfirm, onClose }) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
      </>}
    >
      {message}
    </Modal>
  );
}

/** Menu de ações. `.su-menu`. items: [{ label, danger, sep }]. */
export function Menu({ items = [] }) {
  return (
    <div className="su-menu">
      {items.map((it, i) =>
        it.sep ? (
          <div key={i} className="su-menu__sep" />
        ) : (
          <div key={i} className={`su-menu__item${it.danger ? ' su-menu__item--danger' : ''}`} onClick={it.onClick}>
            {it.icon}{it.label}
          </div>
        )
      )}
    </div>
  );
}

/** Dica flutuante. `.su-tooltip`. */
export function Tooltip({ children }) {
  return <span className="su-tooltip">{children}</span>;
}
