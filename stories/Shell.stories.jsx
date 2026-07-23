import React, { useState } from "react";
import { Sidebar, NavItem, TopBar, Breadcrumb, Avatar, IconButton, DSIcon } from "@studio-ux-ds/react";

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
        brand={<span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}><DSIcon name="dashboard" style={{ color: "var(--su-action)" }} /> Studio UX</span>}
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

function SidebarComGruposDemo() {
  // O NavItem em si é átomo (folha). O comportamento de GRUPO COLAPSÁVEL (acordeão
  // com um aberto por vez, aberto por padrão no grupo que contém o item ativo) é
  // do AppShell — que consome o mesmo NavItem em .su-nav__group / .su-nav__children.
  // Aqui montamos o padrão MANUAL: um label de seção estático + itens filhos.
  const [active, setActive] = useState("aparencia");
  const [openSistema, setOpenSistema] = useState(true);
  const [openConta, setOpenConta] = useState(false);

  const leaf = (id, icon, label) => (
    <NavItem key={id} icon={icon} active={active === id} href="#"
      onClick={(e) => { e.preventDefault(); setActive(id); }}>{label}</NavItem>
  );

  return (
    <div style={{ height: 520 }}>
      <Sidebar
        brand={<span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}><DSIcon name="dashboard" style={{ color: "var(--su-action)" }} /> Studio UX</span>}
        footer={<span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13 }}><Avatar initials="RM" size="sm" status="online" /> Robson</span>}
      >
        <div className="su-nav__section">
          <div className="su-nav__label">Geral</div>
          {leaf("painel", "dashboard", "Painel")}
          {leaf("clientes", "users", "Clientes")}
        </div>

        <div className="su-nav__section">
          <div className="su-nav__label">Sistema</div>

          <div className="su-nav__group">
            <button type="button" className="su-nav__item su-nav__group-btn" aria-expanded={openSistema}
              onClick={() => setOpenSistema((v) => !v)}>
              <DSIcon name="settings" size="sm" />
              <span className="su-nav__group-label">Configurações</span>
              <DSIcon name="chevron-right" size="sm"
                className={["su-nav__chev", openSistema && "su-nav__chev--open"].filter(Boolean).join(" ")} />
            </button>
            {openSistema && (
              <div className="su-nav__children">
                {leaf("aparencia", "settings", "Aparência")}
                {leaf("categorias", "tags", "Categorias")}
                {leaf("acesso", "shield", "Perfis de acesso")}
              </div>
            )}
          </div>

          <div className="su-nav__group">
            <button type="button" className="su-nav__item su-nav__group-btn" aria-expanded={openConta}
              onClick={() => setOpenConta((v) => !v)}>
              <DSIcon name="user" size="sm" />
              <span className="su-nav__group-label">Conta</span>
              <DSIcon name="chevron-right" size="sm"
                className={["su-nav__chev", openConta && "su-nav__chev--open"].filter(Boolean).join(" ")} />
            </button>
            {openConta && (
              <div className="su-nav__children">
                {leaf("perfil", "user", "Perfil")}
                {leaf("assinatura", "credit-card", "Assinatura")}
              </div>
            )}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export const SidebarComGrupos = {
  name: "Sidebar com seções e grupos colapsáveis",
  parameters: { docs: { description: { story: "O `NavItem` é folha (átomo). O padrão de **grupo colapsável** é orquestrado pelo `AppShell` (Grupo G do `COMPONENT_LIBRARY`): um acordeão com um grupo aberto por vez, aberto por padrão no grupo que contém o item ativo. Esta story mostra a **composição manual** equivalente para quem consome só a `Sidebar` sem `AppShell` — usa as classes `.su-nav__section`/`.su-nav__group`/`.su-nav__children` e o mesmo `chevron-right` com `--open`. Para o comportamento canônico (aberto-por-ativo, memória), prefira o `AppShell`." } } },
  render: () => <SidebarComGruposDemo />,
};
