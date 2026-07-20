import React from "react";
import { Banner } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-banner`. Aviso de **condição contínua** (offline, degradação) — nunca substitui Toast para feedback de ação. A prop é `tone`." } } },
  argTypes: {
    tone: { control: "select", options: [undefined, "info", "success", "warning", "danger"] },
    icon: { control: "text" },
    children: { control: "text" },
  },
  args: { tone: "info", children: "Sincronização em andamento — os dados podem estar desatualizados." },
};

export const Playground = {};

export const Tons = {
  render: () => (
    <div className="su-demo-col">
      <Banner tone="info">Modo somente-leitura ativo enquanto a manutenção acontece.</Banner>
      <Banner tone="success">Backup concluído há 5 minutos.</Banner>
      <Banner tone="warning">Sua assinatura expira em 3 dias.</Banner>
      <Banner tone="danger">Conexão com o servidor perdida — tentando reconectar.</Banner>
    </div>
  ),
};
