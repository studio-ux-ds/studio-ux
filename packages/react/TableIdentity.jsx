import React from "react";

/**
 * TableIdentity — identificação principal e metadado complementar em uma célula
 * de DataTable. Mantém os dois níveis empilhados, para que nome e e-mail nunca
 * concorram pela mesma linha.
 *
 * @param {React.ReactNode} primary
 * @param {React.ReactNode} [secondary]
 */
export function TableIdentity({ primary, secondary, className = "", ...rest }) {
  const cls = ["su-table-identity", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <span className="su-table-identity__primary">{primary}</span>
      {secondary && <span className="su-table-identity__secondary">{secondary}</span>}
    </div>
  );
}
