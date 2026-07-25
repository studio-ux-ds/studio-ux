import React, { useState, useRef, useEffect, useId } from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Controle de seleção da linha — `<input>` REAL (não um ícone clicável): focável
 * por teclado, anunciado por leitor de tela e com estado indeterminado nativo.
 *
 * **A forma carrega o significado** (P17): em `selectionMode="multiple"` é um
 * `checkbox` (quadrado — cabe vários); em `"single"` é um `radio` (círculo —
 * cabe um). O desenho vem do `.su-checkbox`/`.su-radio` do DS; o ✓ é o mesmo nos
 * dois, porque quem diz "quantos cabem" é a forma, não o sinal.
 */
function SelectBox({ checked, indeterminate, onChange, label, single, name }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && !single) ref.current.indeterminate = !!indeterminate && !checked;
  }, [indeterminate, checked, single]);
  return (
    <input
      ref={ref}
      type={single ? "radio" : "checkbox"}
      // `name` compartilhado agrupa os radios: sem ele cada um é um grupo de um
      // só e as setas do teclado não andam entre as linhas.
      name={single ? name : undefined}
      className={single ? "su-radio" : "su-checkbox"}
      checked={!!checked}
      onChange={onChange}
      onClick={(event) => event.stopPropagation()}
      aria-label={label}
    />
  );
}

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
  const radioName = `su-select-${useId()}`;
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
          {/* Sem ícone de caixa marcada aqui: a barra já diz "N selecionado" por
              escrito e as linhas já mostram o próprio estado. O ícone era a mesma
              informação uma terceira vez — ruído competindo com o dado (P1). */}
          <span style={{ fontWeight: 500 }}>
            {sel.size} selecionado{sel.size > 1 ? "s" : ""}
          </span>
          {bulkActions && bulkActions(Array.from(sel), clear)}
          {/* "Limpar" é ação: botão de verdade, não um <span> clicável (era
              inalcançável por teclado). */}
          <button
            type="button"
            onClick={clear}
            style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: 0, padding: 0, font: "inherit", color: "var(--su-text-muted)", cursor: "pointer" }}
          >
            <DSIcon name="close" /> Limpar
          </button>
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
                  <SelectBox
                    checked={allChecked}
                    indeterminate={sel.size > 0}
                    onChange={toggleAll}
                    label={allChecked ? "Desmarcar todas as linhas" : "Marcar todas as linhas"}
                  />
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
                  <td style={{ paddingLeft: 16 }} onClick={(event) => event.stopPropagation()}>
                    <SelectBox
                      single={single}
                      name={radioName}
                      checked={on}
                      onChange={() => toggle(id)}
                      label={getRowLabel ? `Selecionar ${getRowLabel(r)}` : "Selecionar esta linha"}
                    />
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
