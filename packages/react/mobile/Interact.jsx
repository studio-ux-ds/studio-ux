import React, { useRef, useState } from "react";
import { DSIcon } from "../DSIcon.jsx";

/**
 * SwipeableRow (mobile-web) — .su-m-swipe. Arrasta para revelar ações (touch).
 * O gesto SEMPRE tem alternativa: passe `onLongPress` ou exponha as mesmas ações
 * num menu "..." (P19). `actions`={label, tone?:"charge"|"delete", onClick, icon?}.
 */
export function SwipeableRow({ actions = [], children, onLongPress }) {
  const [open, setOpen] = useState(false);
  const start = useRef(null);
  const onTouchStart = (e) => { start.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (start.current == null) return;
    const dx = e.changedTouches[0].clientX - start.current;
    if (dx < -40) setOpen(true);
    else if (dx > 40) setOpen(false);
    start.current = null;
  };
  return (
    <div className={["su-m-swipe", open && "su-m-swipe--open"].filter(Boolean).join(" ")}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="su-m-swipe__actions">
        {actions.map((a, i) => (
          <button key={i} type="button"
            className={["su-m-swipe__action", a.tone && `su-m-swipe__action--${a.tone}`].filter(Boolean).join(" ")}
            onClick={() => { setOpen(false); a.onClick && a.onClick(); }}>
            {a.icon && <DSIcon name={a.icon} />}{a.label}
          </button>
        ))}
      </div>
      <div className="su-m-swipe__content" onContextMenu={onLongPress ? (e) => { e.preventDefault(); onLongPress(); } : undefined}>
        {children}
      </div>
    </div>
  );
}

/**
 * ScannerFrame (mobile-web) — .su-m-scanner. A moldura/overlay. A CÂMERA é do
 * produto (getUserMedia/<video>) e entra como `camera` (fundo). Alternativa
 * manual sempre presente (`onManual`) — P19.
 */
export function ScannerFrame({ camera, hint = "Aponte para o código", onManual }) {
  return (
    <div className="su-m-scanner">
      {camera}
      <div className="su-m-scanner__frame">
        <span className="su-m-scanner__corner su-m-scanner__corner--tl" />
        <span className="su-m-scanner__corner su-m-scanner__corner--tr" />
        <span className="su-m-scanner__corner su-m-scanner__corner--bl" />
        <span className="su-m-scanner__corner su-m-scanner__corner--br" />
      </div>
      <div className="su-m-scanner__hint">{hint}</div>
      {onManual && <button type="button" className="su-m-cta su-m-cta--ghost" onClick={onManual}>Digitar código manualmente</button>}
    </div>
  );
}
