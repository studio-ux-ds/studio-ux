import React, { useState } from "react";
import { TopBar, Greeting, SearchBar, BottomNav, Footer, Cta } from "@studio-ux-ds/react/mobile";
import { IconButton, DSIcon } from "@studio-ux-ds/react";

// Frame de 390px de largura (referência iPhone) para as stories mobile fazerem
// sentido visual dentro do preview do Storybook. Nada de escala/zoom; é só o
// container que o produto mobile-web renderiza dentro.
const Phone = ({ children, height = 640 }) => (
  <div style={{
    width: 390, minHeight: height, margin: "0 auto",
    background: "var(--su-surface-base)",
    border: "1px solid var(--su-border-subtle)",
    borderRadius: "var(--su-radius-xl)",
    overflow: "hidden", position: "relative",
    display: "flex", flexDirection: "column",
  }}>{children}</div>
);

export default {
  title: "Mobile-web/Shell",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Casca do adapter **mobile-web** (`@studio-ux-ds/react/mobile`) — classes `.su-m-*` do `@studio-ux-ds/mobile`. Irmão do adapter Desktop (P4): telas mobile são um produto próprio, não o Desktop responsivo. Reúne `TopBar`, `Greeting`, `SearchBar`, `BottomNav`, `Footer` e `Cta`." } },
  },
};

export const CascaCompleta = {
  name: "Casca completa (TopBar + Greeting + Search + BottomNav)",
  render: () => {
    function Demo() {
      const [tab, setTab] = useState("home");
      return (
        <Phone>
          <TopBar
            title="Finanças"
            left={<IconButton icon="menu" aria-label="Menu" />}
            right={<IconButton icon="bell" aria-label="Notificações" />}
          />
          <div style={{ padding: "var(--su-space-4)", flex: 1 }}>
            <Greeting hi="Oi, Robson" sub="Julho tá indo bem: +12% em receitas." />
            <SearchBar placeholder="Buscar receita, despesa, categoria…" onClick={() => {}} />
          </div>
          <BottomNav
            items={[
              { key: "home", label: "Início", icon: "home" },
              { key: "in", label: "Receitas", icon: "trending-up" },
              { key: "out", label: "Despesas", icon: "trending-down" },
              { key: "me", label: "Perfil", icon: "user" },
            ]}
            activeKey={tab}
            onChange={setTab}
            fab={{ icon: "plus", label: "Nova entrada", onClick: () => {} }}
          />
        </Phone>
      );
    }
    return <Demo />;
  },
};

export const RodapePersistente = {
  name: "Footer + Cta (rodapé de formulário)",
  parameters: { docs: { description: { story: "Padrão de rodapé persistente para telas de tarefa (formulário, edição): `Footer` fixa a região; `Cta` é o botão largo (primário e/ou ghost). Alvo mínimo confortável ao polegar." } } },
  render: () => (
    <Phone height={520}>
      <TopBar title="Nova despesa" left={<IconButton icon="chevron-left" aria-label="Voltar" />} />
      <div style={{ padding: "var(--su-space-4)", flex: 1, color: "var(--su-text-secondary)" }}>
        <p>Preencha os dados da despesa e confirme.</p>
      </div>
      <Footer>
        <Cta ghost>Cancelar</Cta>
        <Cta icon="check">Salvar despesa</Cta>
      </Footer>
    </Phone>
  ),
};

export const SoBottomNav = {
  name: "BottomNav sem FAB",
  render: () => {
    function Demo() {
      const [tab, setTab] = useState("in");
      return (
        <Phone height={140}>
          <div style={{ flex: 1 }} />
          <BottomNav
            items={[
              { key: "home", label: "Início", icon: "home" },
              { key: "in", label: "Receitas", icon: "trending-up" },
              { key: "out", label: "Despesas", icon: "trending-down" },
              { key: "me", label: "Perfil", icon: "user" },
            ]}
            activeKey={tab}
            onChange={setTab}
          />
        </Phone>
      );
    }
    return <Demo />;
  },
};
