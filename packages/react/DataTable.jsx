import React, { useState } from "react";

/**
 * DataTable — .su-table-card + .su-table, com seleção em lote e menu por linha.
 * Ao selecionar, a toolbar vira barra contextual (o comportamento canônico).
 *
 * @param {{key:string, header:React.ReactNode, align?:"right", render?:(row)=>React.ReactNode}[]} columns
 * @param {any[]} rows
 * @param {(row, i)=>string|number} [getRowId]
 * @param {(selectedIds:any[], clear:()=>void)=>React.ReactNode} [bulkActions]  ações da barra de lote
 * @param {(row)=>React.ReactNode} [renderRowMenu]  o "…" de cada linha
 * @param {React.ReactNode} [toolbar]  a toolbar quando nada está selecionado
 * @param {React.ReactNode} [footer]  rodapé dentro do card (ex.: contagem + Pagination)
 * @param {boolean} [selectable]  mostra a coluna de seleção. Default: só quando há `bulkActions`
 *   (sem ações de lote não há por que ter checkbox — mantém a lista "calma", igual ao Flux).
 */
export function DataTable({ columns, rows, getRowId = (r, i) => i, bulkActions, renderRowMenu, toolbar, footer, selectable: selectableProp, bare = false, onRowClick, getRowLabel }) {
  const selectable = selectableProp != null ? selectableProp : bulkActions != null;
  const [sel, setSel] = useState(() => new Set());
  const ids = rows.map(getRowId);
  const allChecked = rows.length > 0 && sel.size === rows.length;
  const toggle = (id) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSel(allChecked ? new Set() : new Set(ids));
  const clear = () => setSel(new Set());
  const selCell = { paddingLeft: 16, width: 34 };

  const content = <>
      {selectable && sel.size > 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "13px 16px", background: "var(--su-action-tint)", fontSize: 12 }}>
          <span style={{ fontWeight: 500 }}><i className="ti ti-square-check" style={{ color: "var(--su-action)" }} /> {sel.size} selecionado{sel.size > 1 ? "s" : ""}</span>
          {bulkActions && bulkActions(Array.from(sel), clear)}
          <span style={{ marginLeft: "auto", color: "var(--su-text-muted)", cursor: "pointer" }} onClick={clear}><i className="ti ti-x" /> Limpar</span>
        </div>
      ) : toolbar}

      <table className="su-table">
        <thead>
          <tr>
            {selectable && (
              <th style={selCell}>
                <i className={`ti ${allChecked ? "ti-square-check" : sel.size ? "ti-square-minus" : "ti-square"}`}
                   style={{ cursor: "pointer", fontSize: 15, color: sel.size ? "var(--su-action)" : "var(--su-text-muted)" }}
                   onClick={toggleAll} role="checkbox" aria-checked={allChecked} />
              </th>
            )}
            {columns.map((c) => <th key={c.key} className={c.align === "right" ? "num" : ""}>{c.header}</th>)}
            {renderRowMenu && <th style={{ width: 44 }} />}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const id = getRowId(r, i); const on = sel.has(id);
            const open = () => onRowClick && onRowClick(r);
            return (
              <tr key={id} className={onRowClick ? "su-table__row--clickable" : undefined} tabIndex={onRowClick ? 0 : undefined}
                aria-label={onRowClick ? getRowLabel?.(r) || "Abrir detalhe" : undefined}
                onClick={open} onKeyDown={(event) => { if (onRowClick && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); open(); } }}
                style={on ? { background: "color-mix(in srgb, var(--su-action) 5%, transparent)" } : undefined}>
                {selectable && (
                  <td style={{ paddingLeft: 16 }}>
                    <i className={`ti ${on ? "ti-square-check" : "ti-square"}`}
                       style={{ cursor: "pointer", fontSize: 15, color: on ? "var(--su-action)" : "var(--su-text-muted)" }}
                       onClick={() => toggle(id)} role="checkbox" aria-checked={on} />
                  </td>
                )}
                {columns.map((c) => <td key={c.key} className={c.align === "right" ? "num" : ""}>{c.render ? c.render(r) : r[c.key]}</td>)}
                {renderRowMenu && <td style={{ textAlign: "right" }}>{renderRowMenu(r)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      {footer}
  </>;

  return bare ? content : <div className="su-table-card">{content}</div>;
}
