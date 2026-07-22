import React, { useState } from "react";
import {
  AppShell, Banner, Badge, Button, Card, CommandPalette, Drawer, EmptyState, Field, IconButton, Input,
  ListScreen, PageHeader, ProgressBar, Select, Skeleton, StatCard, Tag, TextArea,
} from "@studio-ux-ds/react";

export default {
  title: "Referência visual/Laboratório financeiro",
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Cenário integrado para aprovar o Studio UX antes de adotá-lo em um sistema. Usa somente o runtime oficial; dados são fictícios, enquanto componentes, tema, accent e comportamento são reais." } },
  },
};

const sections = [
  { section: "Visão geral", items: [
    { id: "dashboard", icon: "layout-dashboard", label: "Painel" },
    { id: "receitas", icon: "trending-up", label: "Receitas" },
    { id: "despesas", icon: "trending-down", label: "Despesas" },
    { id: "contas", icon: "wallet", label: "Contas" },
  ] },
  { section: "Organização", items: [
    { id: "categorias", icon: "tags", label: "Categorias" },
    { group: "Configurações", icon: "settings", items: [
      { id: "aparencia", icon: "palette", label: "Aparência" },
      { id: "perfis", icon: "users", label: "Perfis de acesso" },
      { id: "usuarios", icon: "user", label: "Usuários" },
    ] },
  ] },
];

const rows = [
  { id: 1, descricao: "Salário CLT", categoria: "Salário", bloco: "Pessoal", tipo: "Recorrente", valor: "R$ 8.500" },
  { id: 2, descricao: "Pró-labore", categoria: "Receita empresarial", bloco: "Empresa", tipo: "Recorrente", valor: "R$ 4.000" },
  { id: 3, descricao: "Aluguel recebido", categoria: "Renda passiva", bloco: "Empresa", tipo: "Recorrente", valor: "R$ 1.900" },
  { id: 4, descricao: "Projeto avulso", categoria: "Serviços", bloco: "Empresa", tipo: "Única", valor: "R$ 2.800" },
];

const expenseRows = [
  { id: 1, descricao: "Cartão empresarial", categoria: "Operacional", bloco: "Empresa", tipo: "Recorrente", valor: "R$ 1.280" },
  { id: 2, descricao: "Aluguel", categoria: "Estrutura", bloco: "Empresa", tipo: "Recorrente", valor: "R$ 2.300" },
  { id: 3, descricao: "Internet", categoria: "Serviços", bloco: "Empresa", tipo: "Recorrente", valor: "R$ 189" },
  { id: 4, descricao: "Mercado", categoria: "Pessoal", bloco: "Pessoal", tipo: "Única", valor: "R$ 620" },
];

const columns = [
  { key: "descricao", header: "Descrição", render: (row) => <strong>{row.descricao}</strong> },
  { key: "categoria", header: "Categoria", render: (row) => <span style={{ color: "var(--su-text-muted)" }}>{row.categoria}</span> },
  { key: "bloco", header: "Conta", render: (row) => <Badge status={row.bloco === "Pessoal" ? "info" : "success"}>{row.bloco}</Badge> },
  { key: "tipo", header: "Tipo", render: (row) => <Tag>{row.tipo}</Tag> },
  { key: "valor", header: "Valor", align: "right", render: (row) => <span className="su-visual-lab__amount">{row.valor}</span> },
];

function Brand() {
  return <span className="su-brand"><span className="su-brand__logo">F</span><span>Finanças</span></span>;
}

function Dashboard({ onNew }) {
  return <div className="su-visual-lab__dashboard">
    <PageHeader title="Visão financeira" subtitle="Acompanhe o que entrou, saiu e está previsto para este mês." actions={<Button variant="primary" icon="plus" onClick={onNew}>Nova entrada</Button>} />
    <div className="su-visual-lab__stats">
      <StatCard label="Saldo projetado" value="R$ 18.420" delta="12,4% vs. mês anterior" />
      <StatCard label="Receitas no mês" value="R$ 17.200" delta="8,2% vs. mês anterior" />
      <StatCard label="Despesas no mês" value="R$ 6.780" delta="4,8% vs. mês anterior" deltaType="down" />
      <StatCard label="Contas a vencer" value="5" delta="Próximos 7 dias" />
    </div>
    <div className="su-visual-lab__grid">
      <Card><h2 className="su-visual-lab__card-title">Fluxo do mês</h2><div className="su-visual-lab__stack">
        <div className="su-visual-lab__list-item"><span>Receitas confirmadas</span><span className="su-visual-lab__amount">R$ 17.200</span></div><ProgressBar value={72} />
        <div className="su-visual-lab__list-item"><span>Despesas confirmadas</span><span className="su-visual-lab__amount">R$ 6.780</span></div><ProgressBar value={39} />
      </div></Card>
      <Card><h2 className="su-visual-lab__card-title">Próximos vencimentos</h2><ul className="su-visual-lab__list">
        <li className="su-visual-lab__list-item"><span>Cartão empresarial<br /><small>amanhã</small></span><span className="su-visual-lab__amount">R$ 1.280</span></li>
        <li className="su-visual-lab__list-item"><span>Internet<br /><small>dia 8</small></span><span className="su-visual-lab__amount">R$ 189</span></li>
        <li className="su-visual-lab__list-item"><span>Folha de pagamento<br /><small>dia 10</small></span><span className="su-visual-lab__amount">R$ 2.350</span></li>
      </ul></Card>
    </div>
  </div>;
}

function Receitas({ onNew }) {
  const [search, setSearch] = useState("");
  const filtered = rows.filter((row) => row.descricao.toLowerCase().includes(search.toLowerCase()));
  return <ListScreen title="Receitas" subtitle="Entradas pessoais e empresariais organizadas em um só lugar." primaryAction={<Button variant="primary" icon="plus" onClick={onNew}>Nova receita</Button>}
    search={search} onSearch={setSearch} searchPlaceholder="Buscar receita…"
    segments={[{ id: "todas", label: "Todas" }, { id: "pessoal", label: "Pessoal" }, { id: "empresa", label: "Empresa" }]} segment="todas" onSegment={() => {}}
    columns={columns} rows={filtered} getRowId={(row) => row.id} renderRowMenu={() => <IconButton icon="dots" aria-label="Ações da receita" />}
    summary={<span>Mostrando {filtered.length} de {rows.length} receitas</span>} filterActive={Boolean(search)}
    emptyFiltered={{ title: "Nenhuma receita encontrada", description: "Tente outro termo ou limpe a busca.", onClear: () => setSearch("") }}
    renderCard={(row) => <Card><div className="su-visual-lab__list-item"><span><strong>{row.descricao}</strong><br /><small>{row.categoria} · {row.tipo}</small></span><span className="su-visual-lab__amount">{row.valor}</span></div></Card>}
  />;
}

function Despesas() {
  const [search, setSearch] = useState("");
  const filtered = expenseRows.filter((row) => row.descricao.toLowerCase().includes(search.toLowerCase()));
  return <ListScreen title="Despesas" subtitle="Saídas pessoais e empresariais para acompanhar seus compromissos." primaryAction={<Button variant="primary" icon="plus">Nova despesa</Button>}
    search={search} onSearch={setSearch} searchPlaceholder="Buscar despesa…"
    segments={[{ id: "todas", label: "Todas" }, { id: "pessoal", label: "Pessoal" }, { id: "empresa", label: "Empresa" }]} segment="todas" onSegment={() => {}}
    columns={columns} rows={filtered} getRowId={(row) => row.id} renderRowMenu={() => <IconButton icon="dots" aria-label="Ações da despesa" />}
    summary={<span>Mostrando {filtered.length} de {expenseRows.length} despesas</span>} filterActive={Boolean(search)}
    emptyFiltered={{ title: "Nenhuma despesa encontrada", description: "Tente outro termo ou limpe a busca.", onClear: () => setSearch("") }}
    renderCard={(row) => <Card><div className="su-visual-lab__list-item"><span><strong>{row.descricao}</strong><br /><small>{row.categoria} · {row.tipo}</small></span><span className="su-visual-lab__amount">{row.valor}</span></div></Card>}
  />;
}

function Placeholder({ title }) {
  return <div className="su-visual-lab__stack"><PageHeader title={title} subtitle="Esta cena ainda não faz parte do recorte visual atual." />
    <Card><EmptyState icon="tools" title={`${title} em preparação`} description="O Laboratório só expõe fluxos completos quando há uma composição real para validar." /></Card>
  </div>;
}

function NovaReceita() {
  return <div className="su-visual-lab__stack"><PageHeader title="Nova receita" subtitle="Registre uma entrada para manter suas projeções atualizadas." />
    <Card><div className="su-visual-lab__form">
      <Field label="Descrição" htmlFor="receita-descricao"><Input id="receita-descricao" placeholder="Ex.: Fatura de julho" /></Field>
      <Field label="Categoria" htmlFor="receita-categoria"><Select id="receita-categoria"><option>Selecione uma categoria</option><option>Serviços</option><option>Salário</option></Select></Field>
      <Field label="Valor" htmlFor="receita-valor"><Input id="receita-valor" inputMode="decimal" placeholder="R$ 0,00" /></Field>
      <Field label="Conta" htmlFor="receita-conta"><Select id="receita-conta"><option>Conta empresarial</option><option>Conta pessoal</option></Select></Field>
    </div><Field label="Observações" htmlFor="receita-observacoes" className="su-visual-lab__stack"><TextArea id="receita-observacoes" rows="4" placeholder="Detalhes opcionais para consulta futura." /></Field>
    <div className="su-visual-lab__form-actions"><Button variant="secondary">Cancelar</Button><Button variant="primary">Salvar receita</Button></div></Card>
  </div>;
}

function Estados() {
  return <div className="su-visual-lab__stack"><PageHeader title="Estados da experiência" subtitle="A mesma linguagem precisa permanecer boa fora do caminho feliz." />
    <div className="su-visual-lab__states">
      <Card><h2 className="su-visual-lab__card-title">Carregando</h2><div className="su-visual-lab__loading"><Skeleton height="var(--su-space-4)" /><Skeleton /><Skeleton width="70%" /></div></Card>
      <Card><h2 className="su-visual-lab__card-title">Primeira vez</h2><EmptyState icon="wallet" title="Sua carteira começa aqui" description="Cadastre a primeira conta para acompanhar seu saldo." action={<Button variant="primary">Cadastrar conta</Button>} /></Card>
      <Card><h2 className="su-visual-lab__card-title">Atenção</h2><Banner tone="warning">Revise os pagamentos dos próximos sete dias.</Banner></Card>
      <Card><h2 className="su-visual-lab__card-title">Sem permissão</h2><EmptyState icon="lock" title="Acesso restrito" description="Peça ao responsável para liberar esta ação." /></Card>
    </div>
  </div>;
}

function Lab() {
  const [screen, setScreen] = useState("dashboard");
  const [placeholderLabel, setPlaceholderLabel] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const content = screen === "dashboard" ? <Dashboard onNew={() => setScreen("nova")} />
    : screen === "receitas" ? <Receitas onNew={() => setScreen("nova")} />
      : screen === "despesas" ? <Despesas />
        : screen === "nova" ? <NovaReceita />
          : screen === "estados" ? <Estados /> : <Placeholder title={placeholderLabel} />;
  const label = screen === "dashboard" ? "Painel" : screen === "receitas" ? "Receitas" : screen === "despesas" ? "Despesas" : screen === "nova" ? "Nova receita" : screen === "estados" ? "Estados" : placeholderLabel;
  const navigate = (item, event) => {
    event.preventDefault();
    if (["dashboard", "receitas", "despesas"].includes(item.id)) setScreen(item.id);
    else { setPlaceholderLabel(item.label); setScreen("placeholder"); }
  };
  const navItem = (item) => item.items ? { ...item, items: item.items.map(navItem) } : ({ ...item, active: item.id === screen, href: "#", onClick: (event) => navigate(item, event) });
  const nav = sections.map((section) => ({ ...section, items: section.items.map(navItem) }));
  return <div className="su-visual-lab"><AppShell brand={<Brand />} nav={nav} version="Studio UX Visual Lab" breadcrumb={[{ label: "Finanças" }, { label }]} topbarContext={<span>Julho de 2026</span>}
    user={{ name: "Robson", email: "robson@nivoo.com", initials: "R" }} notifications={3} onNotifications={() => setNotificationsOpen(true)} onCommandPalette={() => setCommandOpen(true)} onHelp={() => setHelpOpen(true)} customize>
    {content}
  </AppShell>
  <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)}><div className="su-menu__item" onClick={() => { setScreen("receitas"); setCommandOpen(false); }}><i className="ti ti-trending-up" aria-hidden="true" />Ir para Receitas</div><div className="su-menu__item" onClick={() => { setScreen("despesas"); setCommandOpen(false); }}><i className="ti ti-trending-down" aria-hidden="true" />Ir para Despesas</div></CommandPalette>
  <Drawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} title="Notificações"><div className="su-visual-lab__stack"><Banner tone="info">Você tem três lembretes para revisar.</Banner><Button variant="secondary" onClick={() => setNotificationsOpen(false)}>Fechar</Button></div></Drawer>
  <Drawer open={helpOpen} onClose={() => setHelpOpen(false)} title="Ajuda"><div className="su-visual-lab__stack"><p>Use este laboratório para validar a experiência antes de adotar o DS em um sistema.</p><Button variant="secondary" onClick={() => setHelpOpen(false)}>Fechar</Button></div></Drawer>
  </div>;
}

export const Completo = { name: "Console financeiro", render: () => <Lab /> };
