import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/** EmptyState — .su-empty. Convite, não desculpa (título + ação). */
export function EmptyState({ icon = "inbox", title, description, action }) {
  return (
    <div className="su-empty">
      <div className="su-empty__icon"><DSIcon name={icon} size="lg" /></div>
      {title && <div className="su-empty__title">{title}</div>}
      {description && <div style={{ fontSize: 13, marginTop: 4 }}>{description}</div>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </div>
  );
}

/** Skeleton — .su-skeleton. Placeholder de carregamento. */
export function Skeleton({ width = "100%", height = 9, radius, style, ...rest }) {
  return <span className="su-skeleton" style={{ display: "block", width, height, borderRadius: radius, ...style }} {...rest} />;
}

/** Spinner — .su-spinner. Carregamento indeterminado curto. */
export function Spinner({ className = "", ...rest }) {
  return <span className={["su-spinner", className].filter(Boolean).join(" ")} role="status" aria-label="Carregando" {...rest} />;
}

/** ProgressBar — .su-progress. Progresso com fim conhecido (0–100). */
export function ProgressBar({ value = 0 }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="su-progress" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
      <div className="su-progress__fill" style={{ width: `${v}%` }} />
    </div>
  );
}
