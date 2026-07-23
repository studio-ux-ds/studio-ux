import React from "react";
import { Card, StatCard, Button, Badge } from "@studio-ux-ds/react";

export default {
  title: "Dados/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-card` — superfície elevada de agrupamento." } } },
};

export const Basico = {
  name: "Card",
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <strong style={{ fontSize: 15 }}>Acme Ltda</strong>
          <Badge status="success">Ativo</Badge>
        </div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--su-text-secondary)" }}>
          Cliente desde março de 2024. Plano anual.
        </p>
        <Button variant="secondary" size="sm" iconRight="arrow-right">Ver conta</Button>
      </Card>
    </div>
  ),
};

export const Estatisticas = {
  name: "StatCard",
  parameters: { docs: { description: { story: "`.su-statcard` — indicador numérico sóbrio. `deltaType` = `up` | `down`." } } },
  render: () => (
    <div className="su-demo-grid">
      <StatCard label="Receita (mês)" value="R$ 128.400" delta="12,5%" deltaType="up" />
      <StatCard label="Novos clientes" value="47" delta="8" deltaType="up" />
      <StatCard label="Churn" value="2,1%" delta="0,4%" deltaType="down" />
      <StatCard label="Tickets abertos" value="9" />
    </div>
  ),
};

export const EstatisticasTom = {
  name: "StatCard — tons semânticos",
  parameters: { docs: { description: { story: "`tone` = `neutral` | `info` | `success` | `warning` | `danger` (v1.2.4). Tinge o valor e a borda com o par semântico do token de status — sinal funcional, não decorativo. `neutral` mantém a superfície padrão." } } },
  render: () => (
    <div className="su-demo-grid">
      <StatCard tone="neutral" label="Neutro (padrão)" value="1.284" />
      <StatCard tone="info" label="A processar" value="127" delta="12 hoje" deltaType="up" />
      <StatCard tone="success" label="Concluído" value="R$ 84.900" delta="8,2%" deltaType="up" />
      <StatCard tone="warning" label="Atrasado" value="9" delta="2 novos" deltaType="up" />
      <StatCard tone="danger" label="Falhas" value="3" delta="1" deltaType="up" />
    </div>
  ),
};
