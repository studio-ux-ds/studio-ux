import React, { useState } from "react";
import { Card, List, ListItem, Stat, Chips, Chip } from "@studio-ux-ds/react/mobile";
import { Badge, Avatar, DSIcon } from "@studio-ux-ds/react";

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
  title: "Mobile-web/Lista e Dados",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Peças de coleção do mobile-web (`.su-m-*`): `Card` (superfície), `List`+`ListItem` (linha vertical), `Stat` (KPI compacto), `Chips`+`Chip` (filtros segmentados)." } },
  },
};

const RECEITAS = [
  { id: 1, desc: "Salário CLT", meta: "Recorrente · dia 5", valor: "R$ 8.500", tone: "PF" },
  { id: 2, desc: "Pró-labore Nivoo", meta: "Recorrente · dia 5", valor: "R$ 4.000", tone: "PJ" },
  { id: 3, desc: "Aluguel sala", meta: "Recorrente · dia 8", valor: "R$ 1.900", tone: "PJ" },
  { id: 4, desc: "Comissão projeto X", meta: "Parcelada · 1/3", valor: "R$ 1.500", tone: "PJ" },
];

export const CartaoBasico = {
  name: "Card",
  render: () => (
    <Phone>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <strong>Acme Ltda</strong>
          <Badge status="success">Ativo</Badge>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--su-text-secondary)" }}>Cliente desde março de 2024.</p>
      </Card>
    </Phone>
  ),
};

export const Lista = {
  name: "List + ListItem (coleção clicável)",
  parameters: { docs: { description: { story: "`ListItem` com `onClick` vira `<button>` semântico (alvo ≥44px). O slot `end` aceita `{value, status}` — valor à direita empilhado com um `Badge`/`Tag` de estado." } } },
  render: () => (
    <Phone>
      <List>
        {RECEITAS.map((r) => (
          <ListItem
            key={r.id}
            avatar={<Avatar initials={r.desc.slice(0, 2).toUpperCase()} size="sm" />}
            title={r.desc}
            subtitle={r.meta}
            end={{ value: r.valor, status: r.tone === "PF" ? <Badge status="info">Pessoal</Badge> : <Badge status="success">Empresarial</Badge> }}
            onClick={() => {}}
          />
        ))}
      </List>
    </Phone>
  ),
};

export const KPIs = {
  name: "Stat (KPIs em grade)",
  render: () => (
    <Phone>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--su-space-3)" }}>
        <Stat label="Receita (mês)" value="R$ 12,4k" />
        <Stat label="Despesas" value="R$ 8,1k" />
        <Stat label="Sobra" value="R$ 4,3k" />
        <Stat label="Metas" value="3/5" />
      </div>
    </Phone>
  ),
};

export const Filtros = {
  name: "Chips + Chip (filtros segmentados)",
  parameters: { docs: { description: { story: "Filtros por toque, com `aria-pressed`. Um estado por vez neste exemplo — o produto pode combinar mais de um." } } },
  render: () => {
    function Demo() {
      const [ativo, setAtivo] = useState("todos");
      return (
        <Phone>
          <Chips>
            {["todos", "pessoal", "empresarial", "atrasadas"].map((k) => (
              <Chip key={k} active={ativo === k} onClick={() => setAtivo(k)}>
                {k[0].toUpperCase() + k.slice(1)}
              </Chip>
            ))}
          </Chips>
          <p style={{ marginTop: 12, fontSize: 13, color: "var(--su-text-muted)" }}>
            Filtro ativo: <strong>{ativo}</strong>
          </p>
        </Phone>
      );
    }
    return <Demo />;
  },
};
