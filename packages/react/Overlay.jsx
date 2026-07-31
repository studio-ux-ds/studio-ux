import React, { useEffect, useId } from "react";
import { DSIcon } from "./DSIcon.jsx";

function useEsc(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

/**
 * Drawer — painel lateral (.su-drawer) sobre scrim. É o container do **inspetor**
 * (`DESKTOP` §6): edita as propriedades do item em foco **sem tirar o resto de
 * vista** — o passo de um fluxo, o nó de um canvas, o item de uma lista longa.
 *
 * É a terceira via da regra de container (`COMPONENT_LIBRARY` → Modal): Modal
 * para leitura/confirmação/campo curto; **rota** para o registro que existe por
 * si e merece URL; **inspetor** para a propriedade de um item dentro de um
 * editor, cujo rascunho vive na sessão e não tem endereço próprio.
 *
 * @param {number} [width=360]  largura em px. 360 serve para uma lista de
 *   propriedades curtas; um formulário com texto longo ou JSON precisa de 480+ —
 *   em 360 o JSON quebra em toda linha e o inspetor deixa de ser legível. O
 *   `max-width: 90vw` do CSS continua valendo, então em tela estreita o painel
 *   se ajusta sozinho.
 */
export function Drawer({ open, onClose, title, children, footer, width = 360 }) {
  const titleId = useId();
  useEsc(open, onClose);
  if (!open) return null;
  return (
    <div className="su-scrim" style={{ justifyContent: "flex-end", padding: 0 }} onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      {/* `aria-labelledby` aponta pro texto do título, não pro cabeçalho inteiro:
          o cabeçalho contém o botão Fechar, e o leitor de tela anunciaria o nome
          do painel com "Fechar" grudado no fim. */}
      <div className="su-drawer" style={{ width }} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined}>
        {title && <div className="su-modal__head" style={{ display: "flex", alignItems: "center" }}><span id={titleId} style={{ flex: 1 }}>{title}</span><button className="su-iconbtn" aria-label="Fechar" onClick={onClose}><DSIcon name="close" size="sm" /></button></div>}
        <div style={{ padding: "0 var(--su-space-5) var(--su-space-4)", overflow: "auto", flex: 1 }}>{children}</div>
        {footer && <div className="su-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}

/** Sheet — painel inferior; `title`/`footer`/`fullHeight` ativam o fluxo estruturado. */
export function Sheet({ open, onClose, title, children, footer, fullHeight = false }) {
  const titleId = useId();
  useEsc(open, onClose);
  if (!open) return null;
  const structured = Boolean(title || footer || fullHeight);
  return (
    <div className="su-scrim" style={{ alignItems: "flex-end", padding: 0 }} onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className={["su-sheet", structured && "su-sheet--structured", fullHeight && "su-sheet--full"].filter(Boolean).join(" ")} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-label={title ? undefined : "Painel inferior"}>
        <div className="su-sheet__handle" />
        {title && <div className="su-sheet__head"><span id={titleId}>{title}</span><button type="button" className="su-iconbtn" aria-label="Fechar" onClick={onClose}><DSIcon name="close" size="sm" /></button></div>}
        {structured ? <div className="su-sheet__body">{children}</div> : children}
        {footer && <div className="su-sheet__foot">{footer}</div>}
      </div>
    </div>
  );
}

/** Menu / Dropdown — .su-menu. Renderize dentro de um wrapper position:relative. */
export function Menu({ items }) {
  return (
    <div className="su-menu" role="menu">
      {items.map((it, i) =>
        it.separator ? (
          <div key={i} className="su-menu__sep" />
        ) : (
          <div key={i} role="menuitem"
            className={["su-menu__item", it.danger && "su-menu__item--danger"].filter(Boolean).join(" ")}
            onClick={it.onClick}>
            {it.icon && <DSIcon name={it.icon} size="sm" />}{it.label}
          </div>
        )
      )}
    </div>
  );
}

/** Tooltip — .su-tooltip. Casca; posicionamento fica a cargo de quem usa. */
export function Tooltip({ children, className = "" }) {
  return <span className={["su-tooltip", className].filter(Boolean).join(" ")} role="tooltip">{children}</span>;
}

/** Popover — .su-popover. */
export function Popover({ children, className = "" }) {
  return <div className={["su-popover", className].filter(Boolean).join(" ")}>{children}</div>;
}
