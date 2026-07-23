import React from "react";
import { Icon, ICON_NAMES } from "@studio-ux-ds/icons/react.jsx";

// O adapter recebe nomes legados do ecossistema Tabler em algumas APIs. A
// normalização mantém esses contratos, mas renderiza sempre o SVG curado local
// do Studio UX — sem depender de uma webfont/CDN no produto consumidor.
const ALIASES = {
  x: "close",
  pencil: "edit",
  dots: "more",
  eye: "search",
  copy: "file",
  history: "refresh",
  "file-invoice": "file",
  upload: "arrow-up-right",
  "loader-2": "refresh",
  "wifi-off": "alert-circle",
  wallet: "file",
  tools: "settings",
  "menu-2": "menu",
  "layout-sidebar-left": "menu",
  "layout-sidebar-left-expand": "menu",
  "layout-sidebar-left-collapse": "menu",
  "layout-navbar": "menu",
  adjustments: "settings",
  "circle-check": "check-circle",
  "square-check": "check-circle",
  "square-minus": "minus",
  square: "file",
  "alert-triangle": "alert-circle",
  inbox: "file",
  "calendar-event": "calendar",
  "layout-dashboard": "dashboard",
  "chart-line": "chart-bar",
  "chart-pie": "chart-bar",
  "cloud-download": "download",
  "settings-2": "settings",
  tags: "file",
  shield: "lock",
  palette: "settings",
  "trending-down": "trending-up",
  sun: "moon",
  language: "message",
  world: "message",
};

export function DSIcon({ name, size = "md", className = "", ...rest }) {
  const resolved = ALIASES[name] || name;
  // A API continua tolerante aos nomes que já chegavam dos consumidores. O
  // fallback explícito evita uma quebra de renderização caso um nome legado
  // ainda não tenha equivalente na curadoria.
  return <Icon name={ICON_NAMES.includes(resolved) ? resolved : "help"} size={size} className={className} {...rest} />;
}
