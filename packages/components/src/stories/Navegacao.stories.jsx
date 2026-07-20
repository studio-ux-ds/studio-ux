import React from 'react';
import { Tabs, Segmented, Breadcrumb, Pagination, Link, Divider } from '../components/nav';

export default { title: 'Componentes/Navegação', tags: ['autodocs'] };

export const Todos = {
  render: () => {
    const [t, setT] = React.useState('geral');
    const [s, setS] = React.useState('mes');
    const [p, setP] = React.useState(2);
    return (
      <div style={{ display: 'grid', gap: 20, maxWidth: 540 }}>
        <Breadcrumb items={[{ label: 'Início', href: '#' }, { label: 'Vendas', href: '#' }, { label: 'Cobranças' }]} />
        <Tabs items={[{ id: 'geral', label: 'Geral' }, { id: 'pagos', label: 'Pagos' }, { id: 'venc', label: 'Vencidos' }]} value={t} onChange={setT} />
        <Segmented items={[{ id: 'dia', label: 'Dia' }, { id: 'mes', label: 'Mês' }, { id: 'ano', label: 'Ano' }]} value={s} onChange={setS} />
        <Pagination page={p} pages={5} onPage={setP} />
        <div style={{ fontSize: 13 }}><Link href="#">Ver detalhes</Link> · <Link href="#" muted>ajuda</Link></div>
        <Divider />
      </div>
    );
  },
};
