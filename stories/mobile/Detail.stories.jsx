import React, { useState } from "react";
import { DetailHeader, MobileTabs, QuickActions, QuickAction } from "@studio-ux-ds/react/mobile";
import { Avatar, Badge } from "@studio-ux-ds/react";

const Phone = ({ children }) => (
  <div style={{
    width: 390, margin: "0 auto",
    background: "var(--su-surface-base)",
    border: "1px solid var(--su-border-subtle)",
    borderRadius: "var(--su-radius-xl)",
    padding: "var(--su-space-4)",
  }}>{children}</div>
);

export default {
  title: "Mobile-web/Detalhe",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Peças da tela de **detalhe** do mobile-web: `DetailHeader` (identidade + meta + status), `MobileTabs` (sub-abas com sublinhado) e `QuickActions`/`QuickAction` (grelha de atalhos redondos abaixo do header)." } },
  },
};

export const Completo = {
  name: "Detalhe completo (header + tabs + quick actions)",
  render: () => {
    function Demo() {
      const [tab, setTab] = useState("resumo");
      return (
        <Phone>
          <DetailHeader
            avatar={<Avatar initials="AC" size="md" />}
            name="Acme Ltda"
            meta={<span>Cliente desde <strong>03/2024</strong></span>}
            status={<Badge status="success">Ativo</Badge>}
          />
          <QuickActions>
            <QuickAction icon="phone" label="Ligar" onClick={() => {}} />
            <QuickAction icon="mail" label="E-mail" onClick={() => {}} />
            <QuickAction icon="message" label="Mensagem" onClick={() => {}} />
            <QuickAction icon="edit" label="Editar" onClick={() => {}} />
          </QuickActions>
          <MobileTabs
            items={[
              { id: "resumo", label: "Resumo" },
              { id: "hist", label: "Histórico" },
              { id: "docs", label: "Documentos" },
            ]}
            value={tab}
            onChange={setTab}
          />
          <div style={{ padding: "var(--su-space-3) 0", color: "var(--su-text-secondary)", fontSize: 13 }}>
            Aba ativa: <strong>{tab}</strong>
          </div>
        </Phone>
      );
    }
    return <Demo />;
  },
};

export const SoHeader = {
  name: "DetailHeader (mínimo)",
  render: () => (
    <Phone>
      <DetailHeader
        avatar={<Avatar initials="RB" size="md" />}
        name="Robson Marques"
        meta={<span>Admin · sem 2FA</span>}
      />
    </Phone>
  ),
};
