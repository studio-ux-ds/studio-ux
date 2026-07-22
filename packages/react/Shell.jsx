import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/** Sidebar — .su-sidebar (Desktop). Compõe brand + nav + footer. */
export function Sidebar({ brand, children, footer }) {
  return (
    <aside className="su-sidebar">
      {brand && <div className="su-sidebar__brand">{brand}</div>}
      <nav className="su-nav">{children}</nav>
      {footer && <div className="su-sidebar__footer">{footer}</div>}
    </aside>
  );
}

/** NavItem — .su-nav__item. `active` marca o item corrente (P6). */
export function NavItem({ icon, active, className = "", children, ...rest }) {
  const cls = ["su-nav__item", active && "su-nav__item--active", className].filter(Boolean).join(" ");
  return (
    <a className={cls} aria-current={active ? "page" : undefined} {...rest}>
      {icon && <DSIcon name={icon} size="sm" />}{children}
    </a>
  );
}

/** TopBar / Header — .su-topbar. */
export function TopBar({ className = "", children, ...rest }) {
  return <header className={["su-topbar", className].filter(Boolean).join(" ")} {...rest}>{children}</header>;
}

/**
 * Breadcrumb — .su-breadcrumb.
 * @param {{label:string, href?:string}[]} items
 */
export function Breadcrumb({ items }) {
  return (
    <div className="su-breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>/</span>}
          {it.href ? <a href={it.href}>{it.label}</a> : <span>{it.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
