import React, { useState } from "react";
import { DataTable, Badge, Button, IconButton, Menu, Avatar } from "@studio-ux-ds/react";

export default {
  title: "Dados/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "`.su-table-card` + `.su-table`. Recursos embutidos: **seleção em lote** (a toolbar vira barra contextual), **ações de lote** (`bulkActions`), **menu por linha** (`renderRowMenu`) e **toolbar**. Colunas: `{ key, header, align?, render? }`." } },
  },
};

const ROWS = [
  { id: 1, nome: "Acme Ltda", contato: "Ana Prado", plano: "Anual", status: "ativo", mrr: 2400 },
  { id: 2, nome: "Globex", contato: "Bruno Dias", plano: "Mensal", status: "pendente", mrr: 380 },
  { id: 3, nome: "Initech", contato: "Carla Souza", plano: "Anual", status: "ativo", mrr: 1990 },
  { id: 4, nome: "Umbrella", contato: "Diego Alves", plano: "Mensal", status: "bloqueado", mrr: 0 },
  { id: 5, nome: "Soylent", contato: "Elisa Rocha", plano: "Anual", status: "ativo", mrr: 3200 },
];

const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const statusBadge = (s) =>
  s === "ativo" ? <Badge status="success">Ativo</Badge>
  : s === "pendente" ? <Badge status="warning">Pendente</Badge>
  : <Badge status="danger">Bloqueado</Badge>;

function RowMenu() {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <IconButton icon="dots" aria-label="Ações da linha" onClick={() => setOpen((o) => !o)} />
      {open && (
        <div style={{ position: "absolute", right: 0, top: "100%", zIndex: "var(--su-z-overlay)" }} onMouseLeave={() => setOpen(false)}>
          <Menu items={[
            { label: "Ver detalhes", icon: "eye", onClick: () => setOpen(false) },
            { label: "Editar", icon: "edit", onClick: () => setOpen(false) },
            { separator: true },
            { label: "Excluir", icon: "trash", danger: true, onClick: () => setOpen(false) },
          ]} />
        </div>
      )}
    </span>
  );
}

const columns = [
  { key: "nome", header: "Cliente", render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <Avatar initials={r.nome.slice(0, 2).toUpperCase()} size="sm" />
        <span style={{ fontWeight: 500 }}>{r.nome}</span>
      </span>
    ) },
  { key: "contato", header: "Contato" },
  { key: "plano", header: "Plano" },
  { key: "status", header: "Status", render: (r) => statusBadge(r.status) },
  { key: "mrr", header: "MRR", align: "right", render: (r) => brl(r.mrr) },
];

function FullDemo() {
  const toolbar = (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
      <strong style={{ fontSize: 14, flex: 1 }}>Clientes</strong>
      <Button variant="secondary" size="sm" icon="filter">Filtrar</Button>
      <Button variant="primary" size="sm" icon="plus">Novo cliente</Button>
    </div>
  );
  return (
    <div style={{ padding: 24, background: "var(--su-surface-base)" }}>
      <DataTable
        columns={columns}
        rows={ROWS}
        getRowId={(r) => r.id}
        toolbar={toolbar}
        renderRowMenu={() => <RowMenu />}
        bulkActions={(ids, clear) => (
          <>
            <Button variant="secondary" size="sm" icon="mail">E-mail ({ids.length})</Button>
            <Button variant="danger" size="sm" icon="trash" onClick={clear}>Excluir</Button>
          </>
        )}
      />
    </div>
  );
}

export const Completo = {
  name: "Completo (seleção, lote, menu, toolbar)",
  render: () => <FullDemo />,
};

export const Simples = {
  name: "Simples",
  parameters: { docs: { description: { story: "Só colunas + linhas, sem toolbar nem menu (seleção continua disponível)." } } },
  render: () => (
    <div style={{ padding: 24, background: "var(--su-surface-base)" }}>
      <DataTable columns={columns} rows={ROWS} getRowId={(r) => r.id} />
    </div>
  ),
};
