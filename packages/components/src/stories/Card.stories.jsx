import React from 'react';
import { Card } from '../components/Card';

export default { title: 'Componentes/Card', component: Card, tags: ['autodocs'] };

export const Default = {
  render: () => (
    <Card style={{ maxWidth: 380 }}>
      <div style={{ fontWeight: 600, color: 'var(--su-text-primary)', marginBottom: 6 }}>Plano Premium</div>
      <p style={{ margin: 0, color: 'var(--su-text-secondary)', fontSize: 13, lineHeight: 1.5 }}>
        Até 5.000 associados, controle de day use, excursões e relatórios avançados.
      </p>
    </Card>
  ),
};
