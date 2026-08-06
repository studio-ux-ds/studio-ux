import React, { useState } from "react";
import { DataTable, Badge, Button, IconButton, Menu, Avatar, TableIdentity } from "@studio-ux-ds/react";

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
      <IconButton icon="more" aria-label="Ações da linha" onClick={() => setOpen((o) => !o)} />
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

function SelecaoElegivelDemo() {
  const [selected, setSelected] = useState([]);
  return <div style={{ padding: 24, background: "var(--su-surface-base)" }}>
    <DataTable
      columns={columns} rows={ROWS} getRowId={(row) => row.id}
      isRowSelectable={(row) => row.status !== "bloqueado"}
      selectedIds={selected} onSelectionChange={setSelected}
      bulkActions={(ids, clear) => <><Button variant="secondary" size="sm">Processar ({ids.length})</Button><Button variant="secondary" size="sm" onClick={clear}>Limpar</Button></>}
    />
  </div>;
}

export const SelecaoElegivelControlada = {
  name: "Seleção elegível e controlada",
  parameters: { docs: { description: { story: "`isRowSelectable` impede que estados finais sejam selecionados. `selectedIds` e `onSelectionChange` tornam a seleção controlada, preservando-a quando a paginação troca as linhas visíveis." } } },
  render: () => <SelecaoElegivelDemo />,
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

export const IdentidadeComMeta = {
  name: "Identidade com metadado",
  parameters: { docs: { description: { story: "`TableIdentity` mantém a informação principal e seu metadado em duas linhas dentro da célula. Use para nome + e-mail, empresa + responsável ou qualquer identidade de leitura que não pode se misturar na mesma linha." } } },
  render: () => <div style={{ padding: 24, background: "var(--su-surface-base)" }}>
    <DataTable
      columns={[
        { key: "nome", header: "Cliente", render: (row) => <TableIdentity primary={row.nome} secondary={`${row.contato.toLowerCase().replace(" ", ".")}@acme.com`} /> },
        { key: "plano", header: "Plano" },
        { key: "status", header: "Status", render: (row) => statusBadge(row.status) },
      ]}
      rows={ROWS}
      getRowId={(row) => row.id}
    />
  </div>,
};

export const LinhaClicavel = {
  name: "Linha clicável (onRowClick + getRowLabel)",
  parameters: { docs: { description: { story: "Quando abrir o registro é a **ação principal** da linha (v1.2.4), passe `onRowClick` e `getRowLabel`: a linha inteira vira alvo (mouse, `Enter`, `Espaço`) e recebe `aria-label` a partir do rótulo derivado; a classe `.su-table__row--clickable` marca o hover. O menu por linha e o checkbox continuam alvos independentes (o clique neles não abre o detalhe)." } } },
  render: () => {
    function Demo() {
      const [aberto, setAberto] = useState(null);
      return (
        <div style={{ padding: 24, background: "var(--su-surface-base)" }}>
          <DataTable
            columns={columns}
            rows={ROWS}
            getRowId={(r) => r.id}
            renderRowMenu={() => <RowMenu />}
            onRowClick={(r) => setAberto(r)}
            getRowLabel={(r) => `Abrir ${r.nome}`}
          />
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--su-text-secondary)" }}>
            {aberto ? <>Aberto: <strong>{aberto.nome}</strong></> : "Clique numa linha (ou foque e aperte Enter)."}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

function SortDemo() {
  const [sort, setSort] = useState({ key: "nome", direction: "asc" });
  const sortedRows = [...ROWS].sort((a, b) => {
    const left = a[sort.key]; const right = b[sort.key];
    const result = typeof left === "number" ? left - right : String(left).localeCompare(String(right), "pt-BR");
    return sort.direction === "asc" ? result : -result;
  });
  const sortableColumns = columns.map((column) => ["nome", "mrr"].includes(column.key) ? { ...column, sortable: true } : column);
  return <div style={{ padding: 24, background: "var(--su-surface-base)" }}>
    <DataTable columns={sortableColumns} rows={sortedRows} getRowId={(row) => row.id} sort={sort} onSort={(key, direction) => setSort({ key, direction })} />
  </div>;
}

export const OrdenacaoControlada = {
  name: "Ordenação controlada",
  parameters: { docs: { description: { story: "O DS torna o cabeçalho acionável, anuncia `aria-sort` e informa a próxima direção por `onSort(key, direction)`. A ordem dos dados continua no produto: aqui ela é local; numa lista paginada ela normalmente chama a API." } } },
  render: () => <SortDemo />,
};

export const Bare = {
  name: "Modo bare (sem cartão)",
  parameters: { docs: { description: { story: "Com `bare` (v1.2.4) o `DataTable` **não** desenha o próprio `.su-table-card`, entregando só toolbar+tabela+footer para caber dentro de outro cartão (é assim que o `ListScreen` compõe o molde). Use quando o wrapper de superfície já é outro." } } },
  render: () => (
    <div style={{ padding: 24, background: "var(--su-surface-base)" }}>
      <div className="su-table-card">
        <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--su-border-subtle)" }}>
          <strong style={{ fontSize: 14, flex: 1 }}>Cartão externo (container próprio)</strong>
          <Button variant="secondary" size="sm" icon="filter">Filtrar</Button>
        </div>
        <DataTable bare columns={columns} rows={ROWS} getRowId={(r) => r.id} />
        <div style={{ padding: "10px 16px", fontSize: 12, color: "var(--su-text-muted)", borderTop: "1px solid var(--su-border-subtle)" }}>
          {ROWS.length} registros
        </div>
      </div>
    </div>
  ),
};
