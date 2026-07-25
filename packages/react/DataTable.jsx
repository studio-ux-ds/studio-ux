import React, { useState } from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * DataTable — .su-table-card + .su-table, com seleção em lote e menu por linha.
 * Ao selecionar, a toolbar vira barra contextual (o comportamento canônico).
 *
 * @param {{key:string, header:React.ReactNode, align?:"right", render?:(row)=>React.ReactNode}[]} columns
 * @param {any[]} rows
 * @param {(row, i)=>string|number} [getRowId]
 * @param {(selectedIds:any[], clear:()=>void)=>React.ReactNode} [bulkActions]  ações da barra de lote.
 *   Recebe os ids selecionados justamente para o conjunto de ações **variar com a quantidade**:
 *   com 1 marcado cabem as ações de um registro só (Editar, Ver versões, Publicar); com vários,
 *   só as que fazem sentido em lote (Exportar, Excluir, Arquivar). Ramifique em
 *   `selectedIds.length === 1` — não ofereça uma ação de-um-só quando há cinco marcados.
 * @param {(row)=>React.ReactNode} [renderRowMenu]  o "…" de cada linha
 * @param {React.ReactNode} [toolbar]  a toolbar quando nada está selecionado
 * @param {React.ReactNode} [footer]  rodapé dentro do card (ex.: contagem + Pagination)
 * @param {boolean} [selectable]  mostra a coluna de seleção. Default: só quando há `bulkActions`
 *   (sem ações de lote não há por que ter checkbox — mantém a lista "calma", igual ao Flux).
 * @param {"multiple"|"single"} [selectionMode]  quantos registros a seleção aceita. Default
 *   `"multiple"`. Use `"single"` quando a ação **não pode** ser feita em massa — seja porque é
 *   perigosa (aprovar uma ação de IA, estornar) ou porque o backend só atende um por vez. Em
 *   `"single"` marcar uma linha desmarca a anterior e o "marcar todos" do cabeçalho não existe:
 *   a interface deixa de oferecer o que o sistema não faz, em vez de recusar depois (P13).
 */
export function DataTable({ columns, rows, getRowId = (r, i) => i, bulkActions, renderRowMenu, toolbar, footer, selectable: selectableProp, selectionMode = "multiple", bare = false, onRowClick, getRowLabel }) {
  const selectable = selectableProp != null ? selectableProp : bulkActions != null;
  const single = selectionMode === "single";
  const [sel, setSel] = useState(() => new Set());
  const ids = rows.map(getRowId);
  const allChecked = !single && rows.length > 0 && sel.size === rows.length;
  const toggle = (id) => setSel((s) => {
    if (single) return s.has(id) ? new Set() : new Set([id]);
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleAll = () => setSel(allChecked ? new Set() : new Set(ids));
  const clear = () => setSel(new Set());
  const selCell = { paddingLeft: 16, width: 34 };

  const content = <>
      {selectable && sel.size > 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "13px 16px", background: "var(--su-action-tint)", fontSize: 12 }}>
          <span style={{ fontWeight: 500 }}><DSIcon name="square-check" style={{ color: "var(--su-action)" }} /> {sel.size} selecionado{sel.size > 1 ? "s" : ""}</span>
          {bulkActions && bulkActions(Array.from(sel), clear)}
          <span style={{ marginLeft: "auto", color: "var(--su-text-muted)", cursor: "pointer" }} onClick={clear}><DSIcon name="x" /> Limpar</span>
        </div>
      ) : toolbar}

      <table className="su-table">
        <thead>
          <tr>
            {selectable && (
              // Em `single` não há "marcar todas" — a seleção aceita um só, então
              // a célula fica vazia em vez de oferecer o que não se pode fazer.
              <th style={selCell}>
                {!single && (
                  <DSIcon name={allChecked ? "square-check" : sel.size ? "square-minus" : "square"}
                    size="sm" style={{ cursor: "pointer", color: sel.size ? "var(--su-action)" : "var(--su-text-muted)" }}
                    onClick={toggleAll} role="checkbox" aria-checked={allChecked} />
                )}
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
                    <DSIcon name={on ? "square-check" : "square"}
                      size="sm" style={{ cursor: "pointer", color: on ? "var(--su-action)" : "var(--su-text-muted)" }}
                      onClick={(event) => { event.stopPropagation(); toggle(id); }} role="checkbox" aria-checked={on} />
                  </td>
                )}
                {columns.map((c) => <td key={c.key} className={c.align === "right" ? "num" : ""}>{c.render ? c.render(r) : r[c.key]}</td>)}
                {renderRowMenu && <td style={{ textAlign: "right" }} onClick={(event) => event.stopPropagation()}>{renderRowMenu(r)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      {footer}
  </>;

  return bare ? content : <div className="su-table-card">{content}</div>;
}
