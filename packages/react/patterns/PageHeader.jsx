import React from "react";

/**
 * PageHeader — cabeçalho da região de conteúdo (.su-pagehead): título + subtítulo
 * opcional + UMA ação primária (P6). A primária da tela mora aqui, NUNCA na TopBar
 * (NAVIGATION §5). Não desenha shell (P22).
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [subtitle]
 * @param {React.ReactNode} [actions]  slot da ação primária (ex.: <Button variant="primary">)
 */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="su-pagehead">
      <div className="su-pagehead__text">
        {title && <h1 className="su-pagehead__title">{title}</h1>}
        {subtitle && <p className="su-pagehead__sub">{subtitle}</p>}
      </div>
      {actions && <div className="su-pagehead__actions">{actions}</div>}
    </div>
  );
}
