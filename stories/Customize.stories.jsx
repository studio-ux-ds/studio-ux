import React, { useState } from "react";
import { Customize, SU_ACCENTS, Button, Card, Badge, Tag } from "@studio-ux-ds/react";

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

export const AccentsRestritos = {
  name: "Accents restritos (whitelabel do consumidor)",
  parameters: { docs: { description: { story: "A prop `accents` do `Customize` aceita qualquer subconjunto de `SU_ACCENTS`. É como um sistema consumidor de marca fixa restringe as opções: expõe só os accents que se alinham à identidade (ex.: 3 de 7). O padrão do sistema continua sendo **Índigo**; se o accent atual salvo pelo usuário não estiver no subset, o painel apenas não o marca como selecionado — não força troca (a persistência é do usuário, `theme.js`)." } } },
  render: () => {
    // Só os accents que fariam sentido para uma marca "Nivoo" fictícia.
    const permitidos = SU_ACCENTS.filter((a) => ["indigo", "teal", "slate"].includes(a.id));
    return (
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start", maxWidth: 760 }}>
        <div style={{ padding: 16, border: "1px solid var(--su-border-default)", borderRadius: 12, background: "var(--su-surface-raised)" }}>
          <Customize accents={permitidos} />
        </div>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <strong style={{ color: "var(--su-text-primary)" }}>Prévia + accents permitidos</strong>
            <p style={{ margin: 0, fontSize: 13, color: "var(--su-text-secondary)" }}>
              Só {permitidos.length} de {SU_ACCENTS.length} accents estão expostos: <strong>{permitidos.map((a) => a.label).join(", ")}</strong>. Os demais (`amber`, `rose`, `violet`, `blue`) continuam válidos no runtime mas ocultos deste painel.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="primary" icon="check">Ação primária</Button>
              <Badge status="info">Informação</Badge>
              <Tag>Etiqueta</Tag>
            </div>
          </div>
        </Card>
      </div>
    );
  },
};
