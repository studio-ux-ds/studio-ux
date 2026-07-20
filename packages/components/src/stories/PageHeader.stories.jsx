import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';

export default {
  title: 'Componentes/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  args: { title: 'Cobranças', subtitle: 'Faturas e cobranças do período.' },
};

export const Default = {
  render: (args) => (
    <PageHeader
      {...args}
      actions={<>
        <Button variant="secondary" size="sm">Exportar</Button>
        <Button variant="primary" size="sm">Nova cobrança</Button>
      </>}
    />
  ),
};
