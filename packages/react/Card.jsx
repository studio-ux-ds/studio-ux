import React from "react";

/** Card — .su-card (superfície elevada de agrupamento). */
export function Card({ className = "", children, ...rest }) {
  return <div className={["su-card", className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
}

/**
 * StatCard — .su-statcard. Indicador numérico sóbrio.
 * @param {"neutral"|"info"|"success"|"danger"} [tone]
 * @param {"up"|"down"} [deltaType]
 */
export function StatCard({ label, value, delta, deltaType, tone = "neutral" }) {
  return (
    <div className={["su-statcard", tone !== "neutral" && `su-statcard--${tone}`].filter(Boolean).join(" ")}>
      <div className="su-statcard__label">{label}</div>
      <div className="su-statcard__value">{value}</div>
      {delta && (
        <div className={["su-statcard__delta", deltaType === "down" && "su-statcard__delta--down"].filter(Boolean).join(" ")}>
          {delta}
        </div>
      )}
    </div>
  );
}
