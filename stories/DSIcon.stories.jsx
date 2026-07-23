import React, { useMemo, useState } from "react";
import { DSIcon } from "@studio-ux-ds/react";
import { ICON_NAMES } from "@studio-ux-ds/icons/react.jsx";

export default {
  title: "Fundamentais/DSIcon",
  component: DSIcon,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "`DSIcon` — adapter web dos ícones curados (`@studio-ux-ds/icons`). Traço 1.5 na grade 24, cor via `currentColor` (herda o papel de texto do contexto), tamanho por token (`--su-icon-{sm|md|lg}`). Ícone sem `label` nasce `aria-hidden` (decorativo); passe `label` para promover a `role=\"img\"` acessível. O `DSIcon` também aceita **aliases** legados que mapeiam nomes do ecossistema Tabler para os nomes curados (ver `packages/react/DSIcon.jsx`)." } },
  },
  argTypes: {
    name: { control: "select", options: [...ICON_NAMES].sort() },
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
  },
  args: { name: "search", size: "md" },
};

export const Playground = {};

export const Tamanhos = {
  name: "Tamanhos (sm | md | lg)",
  parameters: { docs: { description: { story: "Tamanhos por token — `--su-icon-sm` (16px), `--su-icon-md` (20px, padrão), `--su-icon-lg` (24px, casa com a grade 24 do desenho)." } } },
  render: () => (
    <div className="su-demo-row">
      {["sm", "md", "lg"].map((s) => (
        <span key={s} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 60 }}>
          <DSIcon name="search" size={s} />
          <span style={{ fontSize: 11, color: "var(--su-text-muted)" }}>{s}</span>
        </span>
      ))}
    </div>
  ),
};

export const HerdaCor = {
  name: "Herda a cor do contexto (currentColor)",
  parameters: { docs: { description: { story: "`stroke=\"currentColor\"` — o ícone assume a cor do texto do container. Ideal para reforçar semântica (sucesso/erro/ação) sem tokens novos." } } },
  render: () => (
    <div className="su-demo-row">
      <span style={{ color: "var(--su-text-primary)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <DSIcon name="user" /> primary
      </span>
      <span style={{ color: "var(--su-text-secondary)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <DSIcon name="user" /> secondary
      </span>
      <span style={{ color: "var(--su-action)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <DSIcon name="user" /> action
      </span>
      <span style={{ color: "var(--su-success-fg)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <DSIcon name="check-circle" /> success
      </span>
      <span style={{ color: "var(--su-warning-fg)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <DSIcon name="alert-circle" /> warning
      </span>
      <span style={{ color: "var(--su-danger-fg)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <DSIcon name="alert-circle" /> danger
      </span>
    </div>
  ),
};

export const Galeria = {
  name: "Galeria (ICON_NAMES)",
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: { description: { story: `Todos os **${ICON_NAMES.length}** ícones curados do \`@studio-ux-ds/icons\`. Filtre por nome. O nome canônico é o que vai em \`<DSIcon name="…" />\`; aliases legados (ex.: \`loader-2 → refresh\`, \`pencil → edit\`) são resolvidos internamente pelo \`DSIcon\`.` } },
  },
  render: () => {
    function Demo() {
      const [q, setQ] = useState("");
      const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        const sorted = [...ICON_NAMES].sort();
        return term ? sorted.filter((n) => n.includes(term)) : sorted;
      }, [q]);
      return (
        <div>
          <div className="su-demo-row" style={{ marginBottom: "var(--su-space-4)" }}>
            <input
              className="su-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Filtrar em ${ICON_NAMES.length} ícones…`}
              style={{ maxWidth: 320 }}
            />
            <span style={{ fontSize: 12, color: "var(--su-text-muted)" }}>
              {filtered.length} de {ICON_NAMES.length}
            </span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "var(--su-space-2)",
          }}>
            {filtered.map((name) => (
              <div key={name} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 6, padding: "var(--su-space-3)",
                border: "1px solid var(--su-border-subtle)",
                borderRadius: "var(--su-radius-md)",
                background: "var(--su-surface-raised)",
              }}>
                <DSIcon name={name} size="lg" />
                <span style={{ fontSize: 11, color: "var(--su-text-muted)", textAlign: "center", wordBreak: "break-all" }}>{name}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1 / -1", padding: "var(--su-space-4)", color: "var(--su-text-muted)", fontSize: 13 }}>
                Nenhum ícone bate com "{q}".
              </div>
            )}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
