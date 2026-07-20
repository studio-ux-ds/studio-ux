import React from 'react';

/** Cartão de indicador (KPI). Casca fina sobre `.su-statcard`. */
export function StatCard({ label, value }) {
  return (
    <div className="su-statcard">
      <div className="su-statcard__label">{label}</div>
      <div className="su-statcard__value">{value}</div>
    </div>
  );
}
