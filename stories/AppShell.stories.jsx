import React, { useEffect, useState } from "react";
import { AppShell, ListScreen, Badge, Tag, IconButton, Button, CommandPalette, setLayout } from "@studio-ux-ds/react";

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

const LONG_NAV = [
  { section: "Operação", items: Array.from({ length: 10 }, (_, index) => ({ icon: "grid", label: `Visão ${index + 1}`, href: "#" })) },
  { section: "Administração", items: [
    { icon: "users", label: "Pessoas", href: "#" },
    { group: "Configurações", icon: "settings", items: [
      { icon: "building", label: "Dados da empresa", href: "#" },
      { icon: "shield", label: "Perfis de acesso", href: "#" },
      { icon: "user", label: "Usuários", href: "#" },
      { icon: "key", label: "Chaves de acesso", href: "#" },
      { icon: "database", label: "Dados", href: "#" },
    ]},
  ]},
];

const MOBILE_NAV = [
  { items: [
    { icon: "home", label: "Inicio", href: "#" },
    { icon: "wallet", label: "Contas", href: "#", active: true },
    { icon: "message", label: "Mensagens", href: "#" },
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

function Demo({ nav = NAV, ...args }) {
  const [search, setSearch] = useState("");
  const [seg, setSeg] = useState("");
  const [cmdk, setCmdk] = useState(false);
  const rows = RAW.filter((r) => r.desc.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <AppShell
        brand={<Brand />}
        nav={nav}
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

export const GrupoRevelado = {
  name: "Grupo aberto permanece visível",
  parameters: { docs: { description: { story: "Com a navegação maior que a Sidebar, abrir Configurações rola apenas a região de navegação até revelar o grupo. Grupo e folhas mantêm a mesma escala tipográfica; recuo, peso e estado ativo organizam a hierarquia. O foco permanece no botão e a animação respeita redução de movimento." } } },
  render: (args) => <Demo {...args} nav={LONG_NAV} />,
};

export const NavegacaoMobileEspecifica = {
  name: "Navegacao mobile especifica",
  parameters: { docs: { description: { story: "`mobileNav` aceita o mesmo contrato de `nav` e so entra no Drawer em ate 767px. Use quando a jornada compacta e, intencionalmente, um subconjunto da arvore desktop; sem a prop, o Drawer reproduz `nav` integralmente." } } },
  render: (args) => <Demo {...args} mobileNav={MOBILE_NAV} />,
};

export const SemUsuario = {
  render: (args) => <Demo {...args} user={undefined} onLogout={undefined} />,
  name: "Sem menu de usuário",
};

export const AcoesGlobaisDoConsumidor = {
  name: "Ações globais do consumidor (topbarActions)",
  parameters: { docs: { description: { story: "`topbarActions` recebe controles globais do sistema consumidor, como uma central de notificações com popover próprio. O slot fica antes do menu da pessoa usuária e nunca recebe a ação primária da tela, que permanece no PageHeader." } } },
  render: (args) => <Demo {...args} topbarActions={<IconButton icon="bell" aria-label="Central de notificações" />} />,
};

function TopNavDemo() {
  // A variante topnav é lida do theme (setLayout persiste em localStorage).
  // Setamos aqui na entrada para a story ilustrar a casca horizontal; a saída
  // volta para "sidebar" para não vazar preferência entre stories.
  useEffect(() => { setLayout("topnav"); return () => setLayout("sidebar"); }, []);
  return <Demo />;
}

export const TopNav = {
  name: "Layout topnav (barra superior)",
  parameters: { docs: { description: { story: "Variante `layout=\"topnav\"` do `AppShell` (v1.1.19): a navegação principal vira **barra horizontal** no topo, com grupos colapsáveis em `<details>` (`.su-topnav*`), enquanto a Sidebar deixa de existir. O restante da casca (busca/⌘K, notificações, ajuda, menu do usuário) permanece idêntico — a variante afeta só a região de navegação. A preferência é persistida via `setLayout(\"topnav\")`; o painel `Customize` do menu do usuário troca ao vivo entre `sidebar` e `topnav`." } } },
  render: () => <TopNavDemo />,
};

export const MenuUsuarioCustomizado = {
  name: "Menu do usuário com itens custom (userMenuItems)",
  parameters: { docs: { description: { story: "`userMenuItems` (v1.1.19) adiciona ações do sistema consumidor **acima** dos itens padrão (Personalizar, Claro/Escuro, Sair) no menu do usuário. Aceita `{ icon, label, hint, onClick, danger }` e um `{ separator: true }` para dividir grupos. A separação entre itens custom e itens padrão é feita automaticamente pela casca." } } },
  render: (args) => (
    <Demo
      {...args}
      userMenuItems={[
        { icon: "user", label: "Perfil", onClick: () => {} },
        { icon: "building", label: "Empresa ativa", hint: "Nivoo", onClick: () => {} },
        { icon: "credit-card", label: "Assinatura", hint: "Anual", onClick: () => {} },
        { separator: true },
        { icon: "help", label: "Central de ajuda", onClick: () => {} },
      ]}
    />
  ),
};
