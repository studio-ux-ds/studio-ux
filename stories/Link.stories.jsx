import React from "react";
import { Link } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-link`. `muted` = discreto até o hover." } } },
  argTypes: { muted: { control: "boolean" }, children: { control: "text" } },
  args: { children: "Ver detalhes", href: "#" },
};

export const Playground = {};

export const Variantes = {
  render: () => (
    <div className="su-demo-row">
      <Link href="#">Link padrão</Link>
      <Link href="#" muted>Link discreto (muted)</Link>
    </div>
  ),
};
