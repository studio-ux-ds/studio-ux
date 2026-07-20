import React from 'react';
import { Menu, Tooltip, ConfirmDialog } from '../components/overlay';

export default { title: 'Componentes/Overlays', tags: ['autodocs'] };

export const MenuDeAcoes = {
  name: 'Menu',
  render: () => (
    <Menu items={[{ label: 'Editar' }, { label: 'Duplicar' }, { sep: true }, { label: 'Excluir', danger: true }]} />
  ),
};

export const Dica = {
  name: 'Tooltip',
  render: () => <Tooltip>Copiar link de pagamento</Tooltip>,
};

export const Confirmacao = {
  name: 'ConfirmDialog',
  render: () => (
    <div style={{ position: 'relative', minHeight: 300 }}>
      <ConfirmDialog
        title="Excluir cliente?"
        message="Marina Alves e todo o histórico serão removidos. Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        onClose={() => {}}
        onConfirm={() => {}}
      />
    </div>
  ),
};
