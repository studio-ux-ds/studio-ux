import React from "react";
import { Avatar } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-avatar`. Imagem ou iniciais (fallback), com indicador de status." } } },
  argTypes: {
    status: { control: "select", options: [undefined, "online", "busy", "away"] },
    size: { control: "select", options: [undefined, "sm", "lg"] },
    initials: { control: "text" },
    src: { control: "text" },
  },
  args: { initials: "RM" },
};

export const Playground = {};

export const Iniciais = {
  render: () => (
    <div className="su-demo-row">
      <Avatar initials="RM" size="sm" />
      <Avatar initials="RM" />
      <Avatar initials="RM" size="lg" />
    </div>
  ),
};

export const ComStatus = {
  name: "Com status",
  render: () => (
    <div className="su-demo-row">
      <Avatar initials="ON" status="online" />
      <Avatar initials="BU" status="busy" />
      <Avatar initials="AW" status="away" />
    </div>
  ),
};

export const ComImagem = {
  name: "Com imagem",
  render: () => (
    <div className="su-demo-row">
      <Avatar src="https://i.pravatar.cc/80?img=12" alt="Foto" status="online" />
      <Avatar src="https://i.pravatar.cc/80?img=32" alt="Foto" size="lg" />
    </div>
  ),
};
