import React, { useState } from "react";
import { Sidebar, NavItem, TopBar, Breadcrumb, Avatar, IconButton } from "@studio-ux-ds/react";

export default {
  title: "Navegação/Shell",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component: "Sidebar + NavItem, TopBar e Breadcrumb — a casca de aplicação. `NavItem active` marca a rota corrente." } } },
};

function SidebarDemo() {
  const [active, setActive] = useState("clientes");
  const nav = [
    { id: "painel", icon: "dashboard", label: "Painel" },
    { id: "clientes", icon: "users", label: "Clientes" },
    { id: "faturas", icon: "file-invoice", label: "Faturas" },
    { id: "relatorios", icon: "chart-bar", label: "Relatórios" },
    { id: "config", icon: "settings", label: "Configurações" },
  ];
  return (
    <div style={{ height: 420 }}>
      <Sidebar
        brand={<span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}><i className="ti ti-brand-react" style={{ color: "var(--su-action)" }} /> Studio UX</span>}
        footer={<span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13 }}><Avatar initials="RM" size="sm" status="online" /> Robson</span>}
      >
        {nav.map((n) => (
          <NavItem key={n.id} icon={n.icon} active={active === n.id} href="#"
            onClick={(e) => { e.preventDefault(); setActive(n.id); }}>{n.label}</NavItem>
        ))}
      </Sidebar>
    </div>
  );
}
export const SidebarNav = { name: "Sidebar + NavItem", render: () => <SidebarDemo /> };

export const Topo = {
  name: "TopBar + Breadcrumb",
  render: () => (
    <TopBar>
      <Breadcrumb items={[{ label: "Clientes", href: "#" }, { label: "Acme Ltda" }]} />
      <span style={{ marginLeft: "auto", display: "inline-flex", gap: 8, alignItems: "center" }}>
        <IconButton icon="search" aria-label="Buscar" />
        <IconButton icon="bell" aria-label="Notificações" />
        <Avatar initials="RM" size="sm" status="online" />
      </span>
    </TopBar>
  ),
};

export const BreadcrumbSozinho = {
  name: "Breadcrumb",
  render: () => <Breadcrumb items={[{ label: "Início", href: "#" }, { label: "Financeiro", href: "#" }, { label: "Faturas" }]} />,
};
