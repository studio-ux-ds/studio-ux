import React from 'react';
import { StatCard } from '../components/StatCard';

export default {
  title: 'Componentes/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Receita aprovada', value: 'R$ 284.720' },
};

export const Playground = {};

export const Linha = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      <StatCard label="Pendentes" value="R$ 38.940" />
      <StatCard label="Pagos" value="R$ 284.720" />
      <StatCard label="Vencidos" value="R$ 12.310" />
      <StatCard label="Total" value="R$ 335.970" />
    </div>
  ),
};
