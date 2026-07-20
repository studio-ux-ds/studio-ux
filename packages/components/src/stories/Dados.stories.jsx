import React from 'react';
import { Avatar, Tag, DescriptionList, Timeline, Stepper, Accordion } from '../components/data';

export default { title: 'Componentes/Dados', tags: ['autodocs'] };

export const Todos = {
  render: () => (
    <div style={{ display: 'grid', gap: 22, maxWidth: 440 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Avatar initials="MA" status="online" />
        <Avatar initials="CN" size="lg" />
        <Tag>Ativo</Tag>
        <Tag onRemove={() => {}}>Filtro</Tag>
      </div>
      <Stepper steps={['Detalhes', 'Equipe', 'Revisão']} current={1} />
      <DescriptionList rows={[{ key: 'Plano', val: 'Anual' }, { key: 'Status', val: 'Em dia' }, { key: 'Próxima cobrança', val: '05/08/2026' }]} />
      <Timeline items={[{ title: 'Pagamento recebido', meta: 'hoje · 08:12', active: true }, { title: 'Fatura gerada', meta: '01/07 · 00:00' }]} />
      <Accordion items={[{ title: 'O que é o day use?', body: 'Acesso avulso por um dia, sem vínculo mensal.' }, { title: 'Como renovar?', body: 'Pelo portal do associado, na aba Faturas.' }]} />
    </div>
  ),
};
