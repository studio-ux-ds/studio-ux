import React, { useState } from "react";
import { Tag } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-tag` — badge removível. `onRemove` mostra o \"x\"." } } },
};

export const Estatica = {
  name: "Estática",
  render: () => (
    <div className="su-demo-row">
      <Tag>Financeiro</Tag>
      <Tag>Urgente</Tag>
      <Tag>Aprovado</Tag>
    </div>
  ),
};

function Removiveis() {
  const [tags, setTags] = useState(["React", "Design System", "Tokens", "Acessibilidade"]);
  return (
    <div className="su-demo-row">
      {tags.map((t) => (
        <Tag key={t} onRemove={() => setTags((xs) => xs.filter((x) => x !== t))}>{t}</Tag>
      ))}
      {tags.length === 0 && <span style={{ color: "var(--su-text-muted)", fontSize: 13 }}>Todas removidas.</span>}
    </div>
  );
}

export const Removivel = { name: "Removível", render: () => <Removiveis /> };
