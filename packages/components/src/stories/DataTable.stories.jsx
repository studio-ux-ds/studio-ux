import React from 'react';
import { DataTable } from '../components/DataTable';
import { Badge } from '../components/Badge';

const columns = [
  { key: 'cliente', label: 'Cliente' },
  { key: 'status', label: 'Status', render: (r) => <Badge variant={r.sv}>{r.status}</Badge> },
  { key: 'total', label: 'Total', align: 'right' },
];
const rows = [
  { cliente: 'Marina Alves', status: 'Ativo', sv: 'success', total: 'R$ 3.240' },
  { cliente: 'Carlos Nogueira', status: 'Pendente', sv: 'warning', total: 'R$ 1.980' },
  { cliente: 'Bianca Ferraz', status: 'Inadimplente', sv: 'danger', total: 'R$ 610' },
];

export default {
  title: 'Componentes/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Tabela de dados dirigida por `columns` (com `render` por coluna para badges/ações) e `rows`.' } } },
};

export const Default = { args: { columns, rows } };
