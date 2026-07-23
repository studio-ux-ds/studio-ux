import React, { useMemo, useState } from "react";
import { ListScreen, Button, Badge, Tag, IconButton, DSIcon } from "@studio-ux-ds/react";

export default {
  title: "Padrões/ListScreen",
  component: ListScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Materialização React do molde de tela **`list`** (TEMPLATES §2, deriva de TABLES). Preenche a região de conteúdo; não desenha o shell (P22). Header do card com **posição e comportamento do Flux**: título à esquerda, busca + filtro segmentado à direita. Duas variantes de produto (P4): Desktop = `DataTable`; tela estreita = lista de `Card` (via `renderCard`). Todos os estados (P14): carregando, vazio (novo x filtro), erro, populado." } },
  },
};

const RAW = [
  { id: 1, desc: "Salário CLT", cat: "Salário", bloco: "PF", tipo: "Recorrente", vence: "dia 5", valor: 8500 },
  { id: 2, desc: "Pró-labore Nivoo", cat: "Pró-labore", bloco: "PJ", tipo: "Recorrente", vence: "dia 5", valor: 4000 },
  { id: 3, desc: "Aluguel sala comercial", cat: "Aluguel recebido", bloco: "PJ", tipo: "Recorrente", vence: "dia 8", valor: 1900 },
  { id: 4, desc: "Comissão projeto X", cat: "Comissão", bloco: "PJ", tipo: "Parcelada · 1/3", vence: "dia 10", valor: 1500 },
  { id: 5, desc: "13º salário", cat: "Bônus", bloco: "PF", tipo: "Única", vence: "20/dez", valor: 900 },
  { id: 6, desc: "Venda avulsa", cat: "Extra", bloco: "PF", tipo: "Única", vence: "dia 20", valor: 862 },
];

const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const blocoBadge = (b) => (b === "PF" ? <Badge status="info">Pessoal</Badge> : <Badge status="success">Empresarial</Badge>);

const columns = [
  { key: "desc", header: "Descrição", render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <DSIcon name="trending-up" style={{ color: "var(--su-success-fg)" }} />
        <span><div style={{ fontWeight: 500 }}>{r.desc}</div><div style={{ fontSize: 11, color: "var(--su-text-muted)" }}>{r.cat}</div></span>
      </span>
    ) },
  { key: "cat", header: "Categoria", render: (r) => <span style={{ color: "var(--su-text-muted)" }}>{r.cat}</span> },
  { key: "bloco", header: "Bloco", render: (r) => blocoBadge(r.bloco) },
  { key: "tipo", header: "Tipo", render: (r) => <Tag>{r.tipo}</Tag> },
  { key: "vence", header: "Vence", render: (r) => <span style={{ color: "var(--su-text-muted)" }}>{r.vence}</span> },
  { key: "valor", header: "Valor", align: "right", render: (r) => <span style={{ fontWeight: 600 }}>{brl(r.valor)}</span> },
];

const rowMenu = () => (
  <span style={{ display: "inline-flex", gap: 2, justifyContent: "flex-end", opacity: 0.75 }}>
    <IconButton icon="pencil" aria-label="Editar" />
    <IconButton icon="trash" aria-label="Remover" />
  </span>
);

const renderCard = (r) => (
  <div className="su-card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <DSIcon name="trending-up" style={{ color: "var(--su-success-fg)" }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 500 }}>{r.desc}</div>
      <div style={{ fontSize: 11, color: "var(--su-text-muted)" }}>{r.cat} · {r.tipo} · vence {r.vence}</div>
    </div>
    <div style={{ fontWeight: 600 }}>{brl(r.valor)}</div>
  </div>
);

const Frame = ({ children }) => <div style={{ padding: 24, background: "var(--su-surface-base)", minHeight: "100vh" }}>{children}</div>;

function Interativo() {
  const [search, setSearch] = useState("");
  const [seg, setSeg] = useState("");
  const base = useMemo(() => RAW.filter((r) => !seg || r.bloco === seg), [seg]);
  const rows = useMemo(() => base.filter((r) => !search || r.desc.toLowerCase().includes(search.toLowerCase())), [base, search]);
  const total = base.reduce((s, r) => s + r.valor, 0);
  return (
    <Frame>
      <ListScreen
        title="Receitas"
        subtitle="O que entra: salário, pró-labore, faturamento, aluguel recebido, bônus."
        primaryAction={<Button variant="primary" icon="plus">Nova entrada</Button>}
        search={search} onSearch={setSearch} searchPlaceholder="Buscar receita…"
        segments={[{ id: "", label: "Tudo" }, { id: "PF", label: "Pessoal" }, { id: "PJ", label: "Empresarial" }]}
        segment={seg} onSegment={setSeg}
        columns={columns} rows={rows} getRowId={(r) => r.id} renderRowMenu={rowMenu} renderCard={renderCard}
        summary={<span>Mostrando {rows.length} de {RAW.length} · Total <strong style={{ color: "var(--su-success-fg)" }}>{brl(total)}</strong></span>}
        filterActive={Boolean(search || seg)}
        emptyFiltered={{ onClear: () => { setSearch(""); setSeg(""); } }}
        emptyNew={{ icon: "trending-up", title: "Nenhuma receita ainda", description: "Cadastre a primeira entrada." }}
      />
    </Frame>
  );
}

export const Completo = { name: "Completo (Flux · interativo)", render: () => <Interativo /> };

export const Carregando = {
  name: "Carregando",
  render: () => (
    <Frame>
      <ListScreen title="Receitas" subtitle="Carregando…" primaryAction={<Button variant="primary" icon="plus">Nova entrada</Button>}
        search="" onSearch={() => {}} searchPlaceholder="Buscar receita…"
        segments={[{ id: "", label: "Tudo" }, { id: "PF", label: "Pessoal" }, { id: "PJ", label: "Empresarial" }]} segment="" onSegment={() => {}}
        columns={columns} rows={[]} loading />
    </Frame>
  ),
};

export const VazioNovo = {
  name: "Vazio (primeira vez)",
  render: () => (
    <Frame>
      <ListScreen title="Receitas" subtitle="O que entra: salário, pró-labore…" primaryAction={<Button variant="primary" icon="plus">Nova entrada</Button>}
        columns={columns} rows={[]}
        emptyNew={{ icon: "trending-up", title: "Nenhuma receita ainda", description: "Cadastre a primeira entrada pra começar a projetar o mês.", action: <Button variant="primary" icon="plus">Nova entrada</Button> }} />
    </Frame>
  ),
};

export const VazioFiltro = {
  name: "Vazio (filtro sem resultado)",
  render: () => (
    <Frame>
      <ListScreen title="Receitas" primaryAction={<Button variant="primary" icon="plus">Nova entrada</Button>}
        search="xyz" onSearch={() => {}} searchPlaceholder="Buscar receita…"
        segments={[{ id: "", label: "Tudo" }, { id: "PF", label: "Pessoal" }, { id: "PJ", label: "Empresarial" }]} segment="PF" onSegment={() => {}}
        columns={columns} rows={[]} filterActive
        emptyFiltered={{ title: "Nada para “xyz”", description: "Nenhuma receita bate com a busca e o filtro atuais.", onClear: () => {} }} />
    </Frame>
  ),
};

export const Erro = {
  name: "Erro",
  render: () => (
    <Frame>
      <ListScreen title="Receitas" primaryAction={<Button variant="primary" icon="plus">Nova entrada</Button>}
        columns={columns} rows={[]} error={{ message: "Falha ao falar com o servidor.", onRetry: () => {} }} />
    </Frame>
  ),
};
