import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Avatar — .su-avatar. Imagem, ou iniciais (fallback), com indicador de status.
 * @param {"online"|"busy"|"away"} [status]  @param {"sm"|"lg"} [size]
 */
export function Avatar({ src, initials, status, size, alt = "", className = "" }) {
  const cls = ["su-avatar", size && `su-avatar--${size}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls}>
      {src ? <img src={src} alt={alt} /> : initials}
      {status && <span className={`su-avatar__status su-avatar__status--${status}`} />}
    </span>
  );
}

/** Link — .su-link. `muted` = discreto até o hover. */
export function Link({ muted, className = "", children, ...rest }) {
  return <a className={["su-link", muted && "su-link--muted", className].filter(Boolean).join(" ")} {...rest}>{children}</a>;
}

/** Tag — .su-tag (Badge removível). `onRemove` mostra o "x". */
export function Tag({ onRemove, className = "", children }) {
  return (
    <span className={["su-tag", className].filter(Boolean).join(" ")}>
      {children}
      {onRemove && <button type="button" className="su-tag__x" aria-label="Remover" onClick={onRemove}><DSIcon name="x" /></button>}
    </span>
  );
}

/**
 * Banner — .su-banner. Aviso de CONDIÇÃO CONTÍNUA (offline, degradação) — nunca
 * substitui Toast para feedback de ação (P12 / PATTERNS §15).
 * @param {"info"|"success"|"warning"|"danger"} [tone]
 */
export function Banner({ tone, icon, className = "", children }) {
  const iconMap = { info: "info-circle", success: "circle-check", warning: "alert-triangle", danger: "alert-circle" };
  const ic = icon || iconMap[tone];
  return (
    <div className={["su-banner", tone && `su-banner--${tone}`, className].filter(Boolean).join(" ")}>
      {ic && <DSIcon name={ic} className="su-banner__icon" />}
      <div className="su-banner__body">{children}</div>
    </div>
  );
}

/**
 * CommandPalette — .su-cmdk num scrim. Controlado por `open`/`onClose`.
 * O conteúdo (grupos/itens) é do produto; aqui é a casca + campo de busca.
 */
export function CommandPalette({ open, placeholder = "Digite um comando ou busque…", onClose, footer, children }) {
  if (!open) return null;
  return (
    <div className="su-scrim" style={{ alignItems: "flex-start", paddingTop: "12vh" }} onClick={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div className="su-cmdk" role="dialog" aria-modal="true">
        <div className="su-cmdk__input">
          <DSIcon name="search" />
          <input placeholder={placeholder} autoFocus style={{ border: "none", outline: "none", flex: 1, background: "transparent", font: "inherit", fontSize: 14, color: "var(--su-text-primary)" }} />
        </div>
        <div style={{ maxHeight: 320, overflow: "auto", padding: 6 }}>{children}</div>
        {footer && <div className="su-cmdk__foot">{footer}</div>}
      </div>
    </div>
  );
}
