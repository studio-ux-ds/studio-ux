import React from "react";
import { DSIcon } from "../DSIcon.jsx";

/** OfflineBanner — .su-m-offline. */
export function OfflineBanner({ icon = "wifi-off", children }) {
  return <div className="su-m-offline"><DSIcon name={icon} />{children}</div>;
}

/** SyncBanner — .su-m-sync. */
export function SyncBanner({ icon = "refresh", children }) {
  return <div className="su-m-sync"><DSIcon name={icon} />{children}</div>;
}

/** Banner — .su-m-banner (aviso genérico). */
export function Banner({ leading, children }) {
  return <div className="su-m-banner">{leading}{children}</div>;
}

/**
 * Notification — .su-m-notif. `tone`: success|warning|danger|info|neutral.
 */
export function Notification({ icon, title, meta, unread, tone = "neutral" }) {
  const cls = ["su-m-notif", unread && "su-m-notif--unread"].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <span className={`su-m-notif__icon su-m-notif__icon--${tone}`}>
        {icon && <DSIcon name={icon} />}
      </span>
      <div className="su-m-notif__body">
        <div className="su-m-notif__title">{title}</div>
        {meta && <div className="su-m-notif__time">{meta}</div>}
      </div>
    </div>
  );
}

/** StepBar — .su-m-stepbar (progresso de wizard). */
export function StepBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="su-m-stepbar">
      {label && <div className="su-m-stepbar__label">{label}</div>}
      <div className="su-m-stepbar__track"><div className="su-m-stepbar__fill" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
