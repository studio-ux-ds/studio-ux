import React from "react";
import { Badge } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-badge`. O status carrega significado por texto **e** cor. A prop é `status` (não `variant`)." } } },
  argTypes: {
    status: { control: "select", options: [undefined, "success", "warning", "danger", "info"] },
    children: { control: "text" },
  },
  args: { children: "Ativo", status: "success" },
};

export const Playground = {};

export const Status = {
  render: () => (
    <div className="su-demo-row">
      <Badge status="success">Ativo</Badge>
      <Badge status="warning">Pendente</Badge>
      <Badge status="danger">Bloqueado</Badge>
      <Badge status="info">Novo</Badge>
      <Badge>Neutro</Badge>
    </div>
  ),
};
