import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Tabs — .su-tabs (folder) / .su-tabs--pills. Controlado por value/onChange.
 * @param {{id:string,label:string,icon?:string}[]} items
 * @param {"folder"|"pills"} [variant]
 */
export function Tabs({ items, value, onChange, variant = "folder", className = "" }) {
  const rootCls = ["su-tabs", variant === "pills" && "su-tabs--pills", className].filter(Boolean).join(" ");
  return (
    <div className={rootCls} role="tablist">
      {items.map((it) => (
        <button
          key={it.id}
          role="tab"
          aria-selected={value === it.id}
          className={["su-tab", value === it.id && "su-tab--active"].filter(Boolean).join(" ")}
          onClick={() => onChange && onChange(it.id)}
        >
          {it.icon && <DSIcon name={it.icon} />} {it.label}
        </button>
      ))}
    </div>
  );
}
