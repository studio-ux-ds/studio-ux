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
  "file-invoice": "file",
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
  // ─────────────────────────────────────────────────────────────────────────
  // NÃO reintroduzir alias para um nome que JÁ É glifo em `icons.js`.
  //
  // `ALIASES[name] || name` dá precedência ao alias, então um alias com o mesmo
  // nome de um glifo real ANULA o glifo — silenciosamente, sem erro nenhum.
  //
  // Já aconteceu duas vezes:
  //  • v1.2.15 — `square`/`square-check`/`square-minus` apontavam para `file` e
  //    `check-circle`: a caixa de seleção da DataTable renderizava um DOCUMENTO.
  //  • v1.2.59 — `copy`→`file`, `history`→`refresh`, `upload`→`arrow-up-right`,
  //    `shield`→`lock` e `alert-triangle`→`alert-circle`. Todos os cinco tinham
  //    glifo próprio e curado; "copiar" aparecia como documento e "enviar
  //    arquivo" como seta diagonal.
  //
  // Antes de acrescentar uma linha aqui: confira que o nome NÃO está em
  // `packages/icons/manifest.json`. Alias existe para nome LEGADO (Tabler) que
  // não tem equivalente próprio — não para renomear glifo que já temos.
  // ─────────────────────────────────────────────────────────────────────────
  inbox: "file",
  "calendar-event": "calendar",
  "layout-dashboard": "dashboard",
  "chart-line": "chart-bar",
  "chart-pie": "chart-bar",
  "cloud-download": "download",
  "settings-2": "settings",
  tags: "file",
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
