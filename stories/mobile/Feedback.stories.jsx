import React from "react";
import { OfflineBanner, SyncBanner, Banner, Notification, StepBar } from "@studio-ux-ds/react/mobile";
import { DSIcon } from "@studio-ux-ds/react";

const Phone = ({ children }) => (
  <div style={{
    width: 390, margin: "0 auto",
    background: "var(--su-surface-base)",
    border: "1px solid var(--su-border-subtle)",
    borderRadius: "var(--su-radius-xl)",
    padding: "var(--su-space-3)",
    display: "flex", flexDirection: "column", gap: "var(--su-space-3)",
  }}>{children}</div>
);

export default {
  title: "Mobile-web/Feedback",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Sinalizações persistentes/de sistema do mobile-web. **Banner** é para condição contínua (não é feedback de ação — feedback de ação é Toast, P12). `OfflineBanner`/`SyncBanner` são casos especializados (padrão §15). `Notification` é o item de central de notificações. `StepBar` é o progresso enxuto de wizard (§5)." } },
  },
};

export const Banners = {
  name: "Banners de estado (Offline / Sync / genérico)",
  render: () => (
    <Phone>
      <OfflineBanner>Você está offline. Dados exibidos podem estar desatualizados.</OfflineBanner>
      <SyncBanner>Sincronizando 3 alterações…</SyncBanner>
      <Banner leading={<DSIcon name="info" />}>
        Ambiente de teste — nada aqui é cobrado de verdade.
      </Banner>
    </Phone>
  ),
};

export const Notificacoes = {
  name: "Notification (5 tons semânticos)",
  parameters: { docs: { description: { story: "`tone` = `neutral | info | success | warning | danger`. `unread` marca a notificação como não lida (círculo/estilo próprio pelo CSS)." } } },
  render: () => (
    <Phone>
      <Notification tone="success" unread icon="check-circle" title="Pagamento confirmado" meta="há 2 min" />
      <Notification tone="info" icon="info" title="Nova versão disponível" meta="há 1 h" />
      <Notification tone="warning" unread icon="alert-circle" title="Fatura vence amanhã" meta="ontem" />
      <Notification tone="danger" icon="alert-circle" title="Falha ao sincronizar" meta="há 3 h" />
      <Notification tone="neutral" icon="user" title="Robson entrou no espaço" meta="há 1 dia" />
    </Phone>
  ),
};

export const Progresso = {
  name: "StepBar (progresso de wizard)",
  parameters: { docs: { description: { story: "Progresso enxuto para wizard mobile (§5). Preenche `current/total` como percentual — o rótulo textual acompanha (P17: nunca só cor/posição)." } } },
  render: () => (
    <Phone>
      <StepBar current={1} total={4} label="Etapa 1 de 4 — Identidade" />
      <StepBar current={2} total={4} label="Etapa 2 de 4 — Endereço" />
      <StepBar current={3} total={4} label="Etapa 3 de 4 — Preferências" />
      <StepBar current={4} total={4} label="Etapa 4 de 4 — Confirmação" />
    </Phone>
  ),
};
