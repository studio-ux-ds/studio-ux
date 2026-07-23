import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Stepper — .su-stepper. Trilho de etapas do Wizard (P5 pattern).
 * @param {{label:string}[]} steps
 * @param {number} current  índice 1-based da etapa atual
 */
export function Stepper({ steps, current }) {
  return (
    <div className="su-stepper">
      {steps.map((s, idx) => {
        const n = idx + 1;
        const state = n < current ? " su-step--done" : n === current ? " su-step--current" : "";
        return (
          <React.Fragment key={s.label}>
            <div className={`su-step${state}`}>
              <span className="su-step__dot">{n < current ? <DSIcon name="check" /> : n}</span>
              <span className="su-step__label">{s.label}</span>
            </div>
            {n < steps.length && <span className={`su-step__line${n < current ? " su-step__line--done" : ""}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
