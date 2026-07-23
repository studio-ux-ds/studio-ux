import React, { createContext, useContext, useState, useCallback } from "react";
import { DSIcon } from "./DSIcon.jsx";

const ToastCtx = createContext(null);

/**
 * ToastProvider — feedback via toast (P12), nunca banner nem alert() nativo.
 * Envolva o app e use `useToast()` para disparar.
 */
export function ToastProvider({ children, duration = 3500 }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, type) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
  }, [duration]);
  const api = {
    success: (m) => push(m, "success"),
    error: (m) => push(m, "danger"),
    info: (m) => push(m, "info"),
    warn: (m) => push(m, "warning"),
  };
  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", gap: 8, zIndex: 2000 }}>
        {toasts.map((t) => (
          <div key={t.id} className={`su-toast su-toast--${t.type}`} role="status">
            <span className="su-toast__icon"><DSIcon name={t.type === "danger" ? "alert-circle" : "check"} /></span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return ctx;
}
