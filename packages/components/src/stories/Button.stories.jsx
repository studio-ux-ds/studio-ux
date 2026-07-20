import React from 'react';
import { Button } from '../components/Button';

export default {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Botão de ação. Variações primary / secondary / ghost / danger e tamanhos sm / md / lg.' } } },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Salvar', variant: 'primary', size: 'md', disabled: false },
};

export const Playground = {};

export const Variantes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="primary">Salvar</Button>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="ghost">Ver mais</Button>
      <Button variant="danger">Excluir</Button>
      <Button variant="primary" disabled>Desabilitado</Button>
    </div>
  ),
};

export const Tamanhos = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" size="sm">Pequeno</Button>
      <Button variant="primary" size="md">Médio</Button>
      <Button variant="primary" size="lg">Grande</Button>
    </div>
  ),
};
