import React from 'react';
import { Banner, Toast, Spinner, Skeleton, EmptyState, Progress } from '../components/feedback';

export default { title: 'Componentes/Feedback', tags: ['autodocs'] };

export const Todos = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 440 }}>
      <Banner variant="info" icon="ℹ">Sincronização em andamento.</Banner>
      <Banner variant="warning" icon="⚠">2 faturas vencem hoje.</Banner>
      <Banner variant="danger" icon="⛔">Falha ao enviar cobrança.</Banner>
      <Toast variant="success">Cliente salvo.</Toast>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, color: 'var(--su-text-secondary)' }}><Spinner /> Carregando…</div>
      <Skeleton width={240} />
      <Progress value={64} />
      <EmptyState icon="∅" title="Nada por aqui">Nenhum registro ainda.</EmptyState>
    </div>
  ),
};
