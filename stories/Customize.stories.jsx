import React, { useState } from "react";
import { Customize, Button, Card, Badge, Tag } from "@studio-ux-ds/react";

export default {
  title: "Padrões/Customize",
  component: Customize,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Painel único onde o usuário muda **como a interface se comporta**. Entrega os dois eixos que só repontam token (seguros): **Tema** (Claro/Escuro/Sistema, via `data-theme`) e **Cor de destaque** (7 accents sóbrios, todos **AA-validados** em claro e escuro — P18). Muda **ao vivo** no clique, persiste em `localStorage`, sem botão salvar. O accent selecionado sinaliza **além da cor** (anel + check, P17). Eixos que mexem em estrutura/tradução (densidade, idioma, RTL, sidebar↔topo, largura) ficam fora — cada um é um ADR de governança." } },
  },
};

// Prévia: uma faixa de componentes que reagem ao accent/tema escolhido no painel.
function Preview() {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <strong style={{ color: "var(--su-text-primary)" }}>Prévia ao vivo</strong>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="primary" icon="check">Ação primária</Button>
          <Button variant="secondary">Secundária</Button>
          <Badge status="info">Informação</Badge>
          <Tag>Etiqueta</Tag>
          <a href="#" style={{ color: "var(--su-action)", fontWeight: 600 }}>Um link</a>
        </div>
      </div>
    </Card>
  );
}

export const Painel = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start", maxWidth: 760 }}>
      <div style={{ padding: 16, border: "1px solid var(--su-border-default)", borderRadius: 12, background: "var(--su-surface-raised)" }}>
        <Customize />
      </div>
      <Preview />
    </div>
  ),
  name: "Painel + prévia",
};

export const SoPainel = {
  render: () => <div style={{ maxWidth: 320 }}><Customize /></div>,
  name: "Só o painel (como no Drawer)",
};
