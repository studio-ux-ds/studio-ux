import React from "react";
import { DashboardScreen, Card, Select, Button, DSIcon, DataTable } from "@studio-ux-ds/react";

export default {
  title: "Padrões/DashboardScreen",
  component: DashboardScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Molde **`dashboard`** (TEMPLATES §2, deriva de DASHBOARD): a tela de **leitura de indicadores**. Cabeçalho (com o período nas ações) → grade de `StatCard` → blocos de conteúdo.\n\n**Carregando é `Skeleton` na forma do KPI**, não spinner solto: o painel pulando de \"nada\" para \"seis números\" é a maior fonte de salto visual do produto.\n\n**A cor do `StatCard` (`hue`) é categórica** — diz de que assunto o indicador é, e tem que ser estável por assunto (custo é sempre a mesma cor, em toda tela). Nunca rotativa por posição na grade, senão a cor decora em vez de informar. Julgamento de valor vive só no `delta`.\n\n**Sem dado é `EmptyState`, não zero:** mostrar `0` quando ainda não houve medição é dizer uma coisa falsa." } },
  },
};

const stats = [
  { label: "Investimento", value: "R$ 12.480", sub: "no período", delta: "8,4%", deltaType: "up", hue: "indigo", icon: <DSIcon name="coin" /> },
  { label: "Leads", value: "312", sub: "38 hoje", delta: "12%", deltaType: "up", hue: "teal", icon: <DSIcon name="users" /> },
  { label: "Custo por lead", value: "R$ 40,00", sub: "meta: R$ 45", delta: "3,1%", deltaType: "down", hue: "violet", icon: <DSIcon name="trending-up" /> },
  { label: "Cliques", value: "9.842", sub: "CTR 2,4%", hue: "amber", icon: <DSIcon name="activity" /> },
];

const periodo = (
  <div style={{ display: "flex", gap: 8 }}>
    <Select defaultValue="30"><option value="7">Últimos 7 dias</option><option value="30">Últimos 30 dias</option></Select>
    <Button variant="secondary" icon="download">Exportar</Button>
  </div>
);

export const Padrao = {
  name: "Com dados",
  render: () => (
    <DashboardScreen title="Desempenho dos anúncios" subtitle="Últimos 30 dias · atualizado há 12 min" actions={periodo} stats={stats}>
      <div className="su-blocks">
        <Card>
          <b style={{ fontSize: 13 }}>Evolução do investimento</b>
          <div style={{ height: 180, marginTop: 12, display: "grid", placeItems: "center", color: "var(--su-text-muted)", fontSize: 12, border: "1px dashed var(--su-border-default)", borderRadius: 8 }}>
            ponto de conteúdo — a série do gráfico entra aqui
          </div>
        </Card>
        <Card>
          <b style={{ fontSize: 13 }}>Por campanha</b>
          <div style={{ marginTop: 12 }}>
            <DataTable
              bare
              columns={[{ key: "nome", header: "Campanha" }, { key: "gasto", header: "Investido", align: "right" }, { key: "leads", header: "Leads", align: "right" }]}
              rows={[
                { id: 1, nome: "Institucional", gasto: "R$ 5.120", leads: 141 },
                { id: 2, nome: "Retargeting", gasto: "R$ 4.300", leads: 118 },
                { id: 3, nome: "Bairros novos", gasto: "R$ 3.060", leads: 53 },
              ]}
            />
          </div>
        </Card>
      </div>
    </DashboardScreen>
  ),
};

export const Carregando = {
  name: "Carregando",
  render: () => <DashboardScreen title="Desempenho dos anúncios" actions={periodo} loading statsCount={4} />,
};

export const SemDado = {
  name: "Ainda não há o que medir",
  parameters: { docs: { description: { story: "Período sem movimento **não é zero**. Zero é um resultado; \"ainda não aconteceu\" é a ausência dele — e confundir os dois faz um painel recém-instalado parecer um negócio parado." } } },
  render: () => (
    <DashboardScreen
      title="Desempenho dos anúncios"
      subtitle="Últimos 7 dias"
      actions={periodo}
      stats={stats.map((s) => ({ ...s, value: "—", sub: undefined, delta: undefined }))}
      hasData={false}
      empty={{ description: "Nenhum anúncio veiculou neste período. Escolha um intervalo maior ou confira se a conta de anúncios está conectada." }}
    />
  ),
};

export const Erro = {
  name: "Erro",
  render: () => <DashboardScreen title="Desempenho dos anúncios" actions={periodo} stats={stats} error={{ message: "A conta de anúncios recusou a credencial.", onRetry: () => {} }} />,
};
