import React from 'react';
import { Badge } from '../components/Badge';

export default {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['success', 'warning', 'danger', 'info'] } },
  args: { children: 'Ativo', variant: 'success' },
};

export const Playground = {};

export const Todos = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="success">Ativo</Badge>
      <Badge variant="warning">Pendente</Badge>
      <Badge variant="danger">Inadimplente</Badge>
      <Badge variant="info">Novo</Badge>
    </div>
  ),
};
