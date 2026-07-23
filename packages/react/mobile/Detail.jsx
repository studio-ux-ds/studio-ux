import React from "react";
import { DSIcon } from "../DSIcon.jsx";

/** DetailHeader — .su-m-detail-head (topo da tela de detalhe). */
export function DetailHeader({ avatar, name, meta, status }) {
  return (
    <div className="su-m-detail-head">
      {avatar != null && <span className="su-m-detail-head__avatar">{avatar}</span>}
      <div className="su-m-detail-head__body">
        <span className="su-m-detail-head__name">{name}</span>
        {(meta || status) && <div className="su-m-detail-head__meta">{meta}{status}</div>}
      </div>
    </div>
  );
}

/** MobileTabs — .su-m-tabs / .su-m-tab (sub-abas com sublinhado). */
export function MobileTabs({ items, value, onChange }) {
  return (
    <div className="su-m-tabs" role="tablist">
      {items.map((it) => {
        const on = value === it.id;
        return (
          <button key={it.id} role="tab" aria-selected={on ? "true" : "false"}
            className={["su-m-tab", on && "su-m-tab--active"].filter(Boolean).join(" ")}
            onClick={() => onChange && onChange(it.id)}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

/** QuickActions + QuickAction — .su-m-actions / .su-m-action. */
export function QuickActions({ children }) {
  return <div className="su-m-actions">{children}</div>;
}
export function QuickAction({ icon, label, onClick }) {
  return (
    <button type="button" className="su-m-action" onClick={onClick}>
      <span className="su-m-action__circle"><DSIcon name={icon} /></span>
      {label}
    </button>
  );
}
