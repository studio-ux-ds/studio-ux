import React from 'react';

/**
 * Tabela de dados. Casca fina sobre `.su-table` / `.su-table-card`.
 * @param {{key:string,label:string,align?:'left'|'right',render?:(row:object)=>any}[]} columns
 * @param {object[]} rows
 */
export function DataTable({ columns = [], rows = [] }) {
  return (
    <div className="su-table-card">
      <table className="su-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.align === 'right' ? 'num' : ''}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key} className={c.align === 'right' ? 'num' : ''}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
