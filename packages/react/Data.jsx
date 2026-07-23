import React, { useState } from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * DescriptionList — pares chave/valor (.su-dl). Tela de detalhe.
 * @param {{key:string, value:React.ReactNode}[]} items
 */
export function DescriptionList({ items }) {
  return (
    <div className="su-dl">
      {items.map((it, i) => (
        <div className="su-dl__row" key={i}>
          <span className="su-dl__key">{it.key}</span>
          <span className="su-dl__val">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Timeline — histórico/auditoria (.su-timeline). Quem fez o quê, quando (P24).
 * @param {{title:React.ReactNode, meta?:string, active?:boolean}[]} items
 */
export function Timeline({ items }) {
  return (
    <div className="su-timeline">
      {items.map((it, i) => (
        <div className={["su-timeline__item", it.active && "su-timeline__item--active"].filter(Boolean).join(" ")} key={i}>
          <span className="su-timeline__dot" />
          <div className="su-timeline__title">{it.title}</div>
          {it.meta && <div className="su-timeline__meta">{it.meta}</div>}
        </div>
      ))}
    </div>
  );
}

/** Pagination — .su-pagination. Controlado por page/onChange. */
export function Pagination({ page, pageCount, onChange }) {
  const go = (p) => p >= 1 && p <= pageCount && onChange && onChange(p);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).slice(0, 5);
  return (
    <div className="su-pagination">
      <span className="su-page su-page--nav" onClick={() => go(page - 1)}><DSIcon name="chevron-left" /></span>
      {pages.map((p) => (
        <span key={p} className={["su-page", p === page && "su-page--active"].filter(Boolean).join(" ")} onClick={() => go(p)}>{p}</span>
      ))}
      <span className="su-page su-page--nav" onClick={() => go(page + 1)}><DSIcon name="chevron-right" /></span>
    </div>
  );
}

/**
 * Accordion — .su-accordion. Itens colapsáveis (controlado internamente).
 * @param {{title:React.ReactNode, content:React.ReactNode}[]} items
 */
export function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="su-accordion">
      {items.map((it, i) => (
        <div className="su-accordion__item" key={i}>
          <div className="su-accordion__head" onClick={() => setOpen(open === i ? -1 : i)}>
            {it.title}
            <DSIcon name={`chevron-${open === i ? "up" : "down"}`} style={{ color: "var(--su-text-muted)" }} />
          </div>
          {open === i && <div className="su-accordion__body">{it.content}</div>}
        </div>
      ))}
    </div>
  );
}
