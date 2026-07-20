import React, { useState } from "react";
import { Tabs } from "@studio-ux-ds/react";

export default {
  title: "Navegação/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-tabs` (folder) / `.su-tabs--pills`. Controlado por `value`/`onChange`. Itens `{ id, label, icon? }`." } } },
};

const items = [
  { id: "geral", label: "Geral", icon: "info-circle" },
  { id: "faturas", label: "Faturas", icon: "file-invoice" },
  { id: "historico", label: "Histórico", icon: "history" },
];

function TabsDemo({ variant }) {
  const [v, setV] = useState("geral");
  return (
    <div className="su-demo-col">
      <Tabs items={items} value={v} onChange={setV} variant={variant} />
      <div style={{ fontSize: 13, color: "var(--su-text-secondary)" }}>Aba ativa: <strong>{v}</strong></div>
    </div>
  );
}

export const Folder = { name: "Folder (padrão)", render: () => <TabsDemo variant="folder" /> };
export const Pills = { render: () => <TabsDemo variant="pills" /> };
