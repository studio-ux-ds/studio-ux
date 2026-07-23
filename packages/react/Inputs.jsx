import React, { useState } from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * NumericInput — .su-numeric. Campo numérico com passos +/−.
 * NUNCA usa input[type=number] (regra dura herdada dos 3 sistemas).
 * onChange recebe number (ou string intermediária "" / "-" durante digitação).
 */
export function NumericInput({ value = 0, onChange, min, max, step = 1, disabled, className = "", ...rest }) {
  const clamp = (n) => { if (min != null && n < min) n = min; if (max != null && n > max) n = max; return n; };
  const num = Number(value) || 0;
  const set = (n) => onChange && onChange(clamp(n));
  return (
    <div className={["su-numeric", className].filter(Boolean).join(" ")}>
      <button type="button" className="su-numeric__btn" aria-label="Diminuir" disabled={disabled || (min != null && num <= min)} onClick={() => set(num - step)}>−</button>
      <input className="su-numeric__input" inputMode="decimal" value={value} disabled={disabled}
        onChange={(e) => { const v = e.target.value; if (v === "" || v === "-") { onChange && onChange(v); return; } const n = Number(v); if (!Number.isNaN(n)) set(n); }}
        {...rest} />
      <button type="button" className="su-numeric__btn" aria-label="Aumentar" disabled={disabled || (max != null && num >= max)} onClick={() => set(num + step)}>+</button>
    </div>
  );
}

/** TextArea — .su-textarea. */
export function TextArea({ className = "", ...rest }) {
  return <textarea className={["su-textarea", className].filter(Boolean).join(" ")} {...rest} />;
}

/**
 * Combobox — .su-combobox (input buscável + lista). Controlado por value/onChange.
 * `options`: array de {label,value} ou strings. Opções filtradas da fonte (P — Filtros).
 */
export function Combobox({ value, onChange, options = [], placeholder = "Selecione", getLabel = (o) => o.label ?? o, getValue = (o) => o.value ?? o }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const current = options.find((o) => getValue(o) === value);
  const filtered = options.filter((o) => String(getLabel(o)).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="su-combobox">
      <input className="su-input" style={{ width: "100%" }} placeholder={placeholder}
        value={open ? q : (current ? getLabel(current) : "")}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)} />
      {open && (
        <div className="su-menu" role="listbox">
          {filtered.length ? filtered.map((o, i) => (
            <div key={i} className="su-menu__item" role="option" onMouseDown={() => { onChange && onChange(getValue(o)); setQ(""); setOpen(false); }}>{getLabel(o)}</div>
          )) : <div className="su-menu__item" style={{ color: "var(--su-text-muted)" }}>Nada encontrado</div>}
        </div>
      )}
    </div>
  );
}

/** FileUpload — .su-upload. `onFiles(FileList)`. Clique ou arrastar-soltar. */
export function FileUpload({ onFiles, accept, multiple, hint = "Arraste um arquivo ou clique para escolher", icon = "upload" }) {
  return (
    <label className="su-upload"
      onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("su-upload--dragover"); }}
      onDragLeave={(e) => e.currentTarget.classList.remove("su-upload--dragover")}
      onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove("su-upload--dragover"); onFiles && onFiles(e.dataTransfer.files); }}>
      <div className="su-upload__icon"><DSIcon name={icon} /></div>
      <div>{hint}</div>
      <input type="file" accept={accept} multiple={multiple} style={{ display: "none" }} onChange={(e) => onFiles && onFiles(e.target.files)} />
    </label>
  );
}

const DP_MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const DP_DOW = ["D", "S", "T", "Q", "Q", "S", "S"];
/** DatePicker — botão + .su-calendar. `value`/`onChange` em ISO "YYYY-MM-DD". */
export function DatePicker({ value, onChange, placeholder = "Selecionar data" }) {
  const [open, setOpen] = useState(false);
  const base = value ? new Date(value + "T00:00:00") : new Date();
  const [view, setView] = useState({ y: base.getFullYear(), m: base.getMonth() });
  const pad = (n) => String(n).padStart(2, "0");
  const iso = (d) => `${view.y}-${pad(view.m + 1)}-${pad(d)}`;
  const startDow = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const move = (delta) => { let m = view.m + delta, y = view.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } setView({ y, m }); };
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button type="button" className="su-input" style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", minWidth: 170 }} onClick={() => setOpen((o) => !o)}>
        <DSIcon name="calendar" style={{ color: "var(--su-text-muted)" }} />
        {value || <span style={{ color: "var(--su-text-muted)" }}>{placeholder}</span>}
      </button>
      {open && (
        <div className="su-calendar" style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: "var(--su-z-overlay)" }}>
          <div className="su-calendar__head">
            <button type="button" className="su-iconbtn" aria-label="Mês anterior" onClick={() => move(-1)}><DSIcon name="chevron-left" /></button>
            <span>{DP_MONTHS[view.m]} {view.y}</span>
            <button type="button" className="su-iconbtn" aria-label="Próximo mês" onClick={() => move(1)}><DSIcon name="chevron-right" /></button>
          </div>
          <div className="su-calendar__grid">
            {DP_DOW.map((d, i) => <div key={"h" + i} className="su-calendar__dow">{d}</div>)}
            {cells.map((d, i) => d == null ? <div key={i} /> : (
              <div key={i} className={["su-calendar__day", value === iso(d) && "su-calendar__day--selected"].filter(Boolean).join(" ")}
                onClick={() => { onChange && onChange(iso(d)); setOpen(false); }}>{d}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
