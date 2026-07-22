import React, { useEffect } from "react";
import { DSIcon } from "./DSIcon.jsx";

function useEsc(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

/** Drawer — painel lateral (.su-drawer) sobre scrim. */
export function Drawer({ open, onClose, title, children, footer }) {
  useEsc(open, onClose);
  if (!open) return null;
  return (
    <div className="su-scrim" style={{ justifyContent: "flex-end", padding: 0 }} onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className="su-drawer" role="dialog" aria-modal="true">
        {title && <div className="su-modal__head" style={{ display: "flex", alignItems: "center" }}><span style={{ flex: 1 }}>{title}</span><button className="su-iconbtn" aria-label="Fechar" onClick={onClose}><DSIcon name="close" size="sm" /></button></div>}
        <div style={{ padding: "0 var(--su-space-5) var(--su-space-4)", overflow: "auto", flex: 1 }}>{children}</div>
        {footer && <div className="su-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}

/** Sheet — bottom sheet (mobile/desktop secundário). */
export function Sheet({ open, onClose, children }) {
  useEsc(open, onClose);
  if (!open) return null;
  return (
    <div className="su-scrim" style={{ alignItems: "flex-end", padding: 0 }} onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className="su-sheet"><div className="su-sheet__handle" />{children}</div>
    </div>
  );
}

/** Menu / Dropdown — .su-menu. Renderize dentro de um wrapper position:relative. */
export function Menu({ items }) {
  return (
    <div className="su-menu" role="menu">
      {items.map((it, i) =>
        it.separator ? (
          <div key={i} className="su-menu__sep" />
        ) : (
          <div key={i} role="menuitem"
            className={["su-menu__item", it.danger && "su-menu__item--danger"].filter(Boolean).join(" ")}
            onClick={it.onClick}>
            {it.icon && <DSIcon name={it.icon} size="sm" />}{it.label}
          </div>
        )
      )}
    </div>
  );
}

/** Tooltip — .su-tooltip. Casca; posicionamento fica a cargo de quem usa. */
export function Tooltip({ children, className = "" }) {
  return <span className={["su-tooltip", className].filter(Boolean).join(" ")} role="tooltip">{children}</span>;
}

/** Popover — .su-popover. */
export function Popover({ children, className = "" }) {
  return <div className={["su-popover", className].filter(Boolean).join(" ")}>{children}</div>;
}
