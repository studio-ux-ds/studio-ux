import React from "react";
import { DSIcon } from "../DSIcon.jsx";

/** TopBar (mobile-web) — .su-m-topbar. */
export function TopBar({ title, left, right }) {
  return (
    <div className="su-m-topbar">
      {left}
      <span className="su-m-topbar__title">{title}</span>
      {right}
    </div>
  );
}

/** Greeting — .su-m-greeting. */
export function Greeting({ hi, sub }) {
  return (
    <div className="su-m-greeting">
      <div className="su-m-greeting__hi">{hi}</div>
      {sub && <div className="su-m-greeting__sub">{sub}</div>}
    </div>
  );
}

/** SearchBar — .su-m-search. */
export function SearchBar({ placeholder = "Buscar", onClick }) {
  return (
    <div className="su-m-search" onClick={onClick} role="search">
      <DSIcon name="search" />{placeholder}
    </div>
  );
}

/**
 * BottomNav — .su-m-bottomnav. `items`={key,label,icon,active}. `fab` opcional.
 */
export function BottomNav({ items, activeKey, onChange, fab }) {
  return (
    <nav className="su-m-bottomnav">
      {items.map((it) => {
        const on = (activeKey ?? it.key) === it.key && it.active !== false;
        return (
          <button key={it.key} className={["su-m-navitem", on && "su-m-navitem--active"].filter(Boolean).join(" ")}
            aria-current={on ? "page" : undefined} onClick={() => onChange && onChange(it.key)}>
            {it.icon && <DSIcon name={it.icon} />}{it.label}
          </button>
        );
      })}
      {fab && (
        <button className="su-m-fab" aria-label={fab.label || "Ação"} onClick={fab.onClick}>
          <DSIcon name={fab.icon || "plus"} />
        </button>
      )}
    </nav>
  );
}

/** Footer — .su-m-footer (rodapé fixo). */
export function Footer({ children }) {
  return <div className="su-m-footer">{children}</div>;
}

/** Cta — .su-m-cta (botão largo do rodapé). */
export function Cta({ ghost, icon, iconRight, className = "", children, ...rest }) {
  const cls = ["su-m-cta", ghost && "su-m-cta--ghost", className].filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {icon && <DSIcon name={icon} />}{children}{iconRight && <DSIcon name={iconRight} />}
    </button>
  );
}
