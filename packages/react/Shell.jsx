import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/** Sidebar — .su-sidebar (Desktop). Compõe brand + nav + footer. */
export function Sidebar({ brand, children, footer }) {
  return (
    <aside className="su-sidebar">
      {brand && <div className="su-sidebar__brand">{brand}</div>}
      <nav className="su-nav">{children}</nav>
      {footer && <div className="su-sidebar__footer">{footer}</div>}
    </aside>
  );
}

/** NavItem — .su-nav__item. `active` marca o item corrente (P6). */
export function NavItem({ icon, active, className = "", children, ...rest }) {
  const cls = ["su-nav__item", active && "su-nav__item--active", className].filter(Boolean).join(" ");
  return (
    <a className={cls} aria-current={active ? "page" : undefined} {...rest}>
      {icon && <DSIcon name={icon} size="sm" />}{children}
    </a>
  );
}

/** TopBar / Header — .su-topbar. */
export function TopBar({ className = "", children, ...rest }) {
  return <header className={["su-topbar", className].filter(Boolean).join(" ")} {...rest}>{children}</header>;
}

/**
 * Breadcrumb — .su-breadcrumb.
 * @param {{label:string, href?:string}[]} items
 */
/**
 * Breadcrumb — o caminho até a tela atual. Item com `href` é link; o último item
 * (a página onde se está) nunca deve ter.
 *
 * `onNavigate(href, event)` existe para o app de página única: sem ele, o clique
 * num `<a href>` **recarrega a aplicação inteira** — perde estado, refaz login
 * check, pisca a tela. Quem tem router passa `onNavigate` e chama a navegação
 * dele; o componente dá `preventDefault` só no clique simples, então
 * Ctrl/Cmd-clique e "abrir em nova aba" continuam funcionando (é para isso que o
 * `href` real permanece, em vez de virar um `<span onClick>`).
 *
 * @param {{label:React.ReactNode, href?:string}[]} items
 * @param {(href:string, event:MouseEvent)=>void} [onNavigate]
 */
export function Breadcrumb({ items, onNavigate }) {
  const handle = (href) => (event) => {
    if (!onNavigate) return;
    // Deixa passar o que o navegador faz melhor: nova aba, nova janela, download.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(href, event);
  };
  return (
    <nav className="su-breadcrumb" aria-label="Caminho">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.href
            ? <a href={it.href} onClick={handle(it.href)}>{it.label}</a>
            : <span aria-current="page">{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
