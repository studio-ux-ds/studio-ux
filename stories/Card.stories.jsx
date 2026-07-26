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

export const EstatisticasTom = {
  name: "StatCard — tons semânticos",
  parameters: { docs: { description: { story: "`tone` = `neutral` | `info` | `success` | `warning` | `danger`. O tone pinta o **entorno** (degradê, borda, ícone) e nunca o número — sobre fundo tonalizado, número colorido perde contraste. `neutral` usa o accent do sistema, então o painel acompanha a personalização. A cor responde \"isto é bom/ruim/atenção\": indicador que não responde nada fica `neutral`, mesmo que sete cores diferentes ficassem bonitas." } } },
  render: () => (
    <div className="su-demo-grid">
      <StatCard tone="neutral" label="Organizações" value="1" icon={<DSIcon name="home" />} />
      <StatCard tone="info" label="A processar" value="127" sub="na fila agora" icon={<DSIcon name="refresh" />} />
      <StatCard tone="success" label="Sem erros" value="0" sub="nas últimas 164 execuções" icon={<DSIcon name="check-circle" />} />
      <StatCard tone="warning" label="Atrasado" value="9" delta="2 novos" deltaType="up" />
      <StatCard tone="danger" label="Falhas" value="3" delta="1" deltaType="up" icon={<DSIcon name="alert-circle" />} />
    </div>
  ),
};
