import React from "react";
import { Card, StatCard, Button, Badge, DSIcon } from "@studio-ux-ds/react";

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
  parameters: { docs: { description: { story: "`.su-statcard` — indicador numérico: ícone à esquerda, degradê leve da cor do papel, número em destaque. `sub` é a linha secundária neutra (unidade/composição); `delta` é a variação, e só ela recebe verde/vermelho." } } },
  render: () => (
    <div className="su-demo-grid">
      <StatCard label="Receita (mês)" value="R$ 128.400" delta="12,5%" deltaType="up" icon={<DSIcon name="trending-up" />} />
      <StatCard label="Execuções" value="164" sub="0 com erro" icon={<DSIcon name="play" />} />
      <StatCard label="Consumo de IA" value="976.884" sub="tokens no mês" icon={<DSIcon name="chart-bar" />} />
      <StatCard label="Tickets abertos" value="9" />
    </div>
  ),
};

export const SubOuDelta = {
  name: "StatCard — `sub` ou `delta`?",
  parameters: { docs: { description: { story: "As duas linhas existem e **não** são a mesma coisa. `sub` é neutra: diz do que o número é feito (unidade, recorte, composição). `delta` é a variação no período e leva cor de direção. Usar `delta` para escrever uma legenda pinta de verde um texto que não é melhora nenhuma — era o que acontecia antes de `sub` existir (v1.2.27)." } } },
  render: () => (
    <div className="su-demo-grid">
      <StatCard label="Custo de IA" value="US$ 0,19" sub="976.884 tokens" icon={<DSIcon name="chart-bar" />} />
      <StatCard label="Custo de IA" value="US$ 0,19" delta="4,1% vs. mês anterior" deltaType="down" icon={<DSIcon name="chart-bar" />} />
    </div>
  ),
};

export const EstatisticasMatiz = {
  name: "StatCard — matiz por assunto",
  parameters: { docs: { description: { story: "`hue` = `indigo` | `blue` | `teal` | `violet` | `amber` | `rose` | `slate`. A cor é **categórica**: diz de que assunto o indicador é, não se ele é bom ou ruim (o `tone` semântico saiu do StatCard na v1.2.29 — no card de indicador o par bom/ruim quase nunca cabe, e quem precisava distinguir domínio acabava usando `success` só para ter verde). A régua: **estável por assunto** — custo é sempre a mesma cor em qualquer tela; nunca rotativa por posição na grade. Sem `hue`, o card usa o accent do sistema." } } },
  render: () => (
    <div className="su-demo-grid">
      <StatCard hue="violet" label="Organizações" value="1" icon={<DSIcon name="home" />} />
      <StatCard hue="blue" label="Execuções" value="164" sub="0 com erro" icon={<DSIcon name="play" />} />
      <StatCard hue="teal" label="Custo de IA" value="US$ 0,19" sub="976.884 tokens" icon={<DSIcon name="chart-bar" />} />
      <StatCard hue="amber" label="Mensagens" value="6" icon={<DSIcon name="message" />} />
      <StatCard label="Sem matiz (usa o accent)" value="1.284" icon={<DSIcon name="users" />} />
    </div>
  ),
};
