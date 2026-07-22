import React, { useState } from "react";
import { AppShell, ListScreen, Badge, Tag, IconButton, Button, CommandPalette } from "@studio-ux-ds/react";

export default {
  title: "Padrões/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Molde da **casca** do sistema. Compõe os átomos `Sidebar`/`NavItem`/`TopBar`/`Breadcrumb` e trava as invariantes que deixam a casca idêntica ao Flux em posição e comportamento: a página preenche só a região de conteúdo (**P22**), a **TopBar nunca tem a ação primária** da tela (**P6**) — ela carrega contexto, ⌘K, notificações, ajuda e menu do usuário; o item de nav ativo sinaliza **além da cor** (**P17**); Desktop tem Sidebar fixa e colapsável (estado lembrado), Mobile a Sidebar vira off-canvas (**P4**). O menu do usuário traz o gatilho **Personalizar** → painel Customize (tema/accent)." } },
  },
};

const NAV = [
  { section: "Geral", items: [
    { icon: "home", label: "Início", href: "#", active: false },
    { icon: "trending-up", label: "Receitas", href: "#", active: true },
    { icon: "trending-down", label: "Despesas", href: "#" },
    { icon: "wallet", label: "Contas", href: "#" },
  ]},
  { section: "Sistema", items: [
    { icon: "users", label: "Equipe", href: "#" },
    { group: "Configurações", icon: "settings", items: [
      { icon: "palette", label: "Aparência", href: "#" },
      { icon: "download", label: "Atualização", href: "#" },
      { icon: "tags", label: "Categorias", href: "#" },
      { icon: "shield", label: "Perfis de acesso", href: "#" },
      { icon: "user", label: "Usuários", href: "#" },
    ]},
  ]},
];

const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const RAW = [
  { id: 1, desc: "Salário CLT", cat: "Salário", bloco: "PF", tipo: "Recorrente", vence: "dia 5", valor: 8500 },
  { id: 2, desc: "Pró-labore Nivoo", cat: "Pró-labore", bloco: "PJ", tipo: "Recorrente", vence: "dia 5", valor: 4000 },
  { id: 3, desc: "Aluguel sala", cat: "Aluguel recebido", bloco: "PJ", tipo: "Recorrente", vence: "dia 8", valor: 1900 },
];
const columns = [
  { key: "desc", header: "Descrição", render: (r) => <span style={{ fontWeight: 500 }}>{r.desc}</span> },
  { key: "cat", header: "Categoria", render: (r) => <span style={{ color: "var(--su-text-muted)" }}>{r.cat}</span> },
  { key: "bloco", header: "Bloco", render: (r) => (r.bloco === "PF" ? <Badge status="info">Pessoal</Badge> : <Badge status="success">Empresarial</Badge>) },
  { key: "tipo", header: "Tipo", render: (r) => <Tag>{r.tipo}</Tag> },
  { key: "valor", header: "Valor", align: "right", render: (r) => <span style={{ fontWeight: 600 }}>{brl(r.valor)}</span> },
];

const Brand = () => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    <span style={{ width: 26, height: 26, borderRadius: 7, background: "var(--su-action)", color: "var(--su-text-on-action)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>F</span>
    <strong>Finanças</strong>
  </span>
);

function Demo(args) {
  const [search, setSearch] = useState("");
  const [seg, setSeg] = useState("");
  const [cmdk, setCmdk] = useState(false);
  const rows = RAW.filter((r) => r.desc.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <AppShell
        brand={<Brand />}
        nav={NAV}
        version="Finanças · Studio UX 1.1.20"
        breadcrumb={[{ label: "Finanças", href: "#" }, { label: "Receitas" }]}
        topbarContext={<span>Julho 2026</span>}
        user={{ name: "Robson", email: "robson@nivoo.com", initials: "R" }}
        onCommandPalette={() => setCmdk(true)}
        notifications={3}
        onNotifications={() => {}}
        onHelp={() => {}}
        onLogout={() => {}}
        customize
        {...args}
      >
        <ListScreen
          title="Receitas"
          subtitle="O que entra: salário, pró-labore, faturamento, aluguel recebido."
          primaryAction={<Button variant="primary" icon="plus">Nova entrada</Button>}
          search={search} onSearch={setSearch} searchPlaceholder="Buscar receita…"
          segments={[{ id: "PF", label: "Pessoal" }, { id: "PJ", label: "Empresarial" }, { id: "", label: "Tudo" }]}
          segment={seg} onSegment={setSeg}
          columns={columns} rows={rows} getRowId={(r) => r.id}
          renderRowMenu={() => <IconButton icon="dots" aria-label="Ações" />}
          summary={<span>Mostrando {rows.length} de {RAW.length}</span>}
        />
      </AppShell>
      <CommandPalette open={cmdk} onClose={() => setCmdk(false)}>
        <div style={{ padding: 8, color: "var(--su-text-muted)", fontSize: 13 }}>Ex.: “Nova receita”, “Ir para Despesas”…</div>
      </CommandPalette>
    </>
  );
}

export const Padrao = { render: (args) => <Demo {...args} />, name: "Casca completa" };

export const Recolhida = {
  render: (args) => <Demo {...args} />,
  name: "Sidebar recolhida",
  parameters: { docs: { description: { story: "A sidebar recolhe para só-ícones; o estado é lembrado em `localStorage`. Use o botão de recolher na TopBar." } } },
};

export const SemUsuario = {
  render: (args) => <Demo {...args} user={undefined} onLogout={undefined} />,
  name: "Sem menu de usuário",
};
