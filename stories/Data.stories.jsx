import React, { useState } from "react";
import { DescriptionList, Timeline, Pagination, Accordion, Badge } from "@studio-ux-ds/react";

export default {
  title: "Dados/Listas e histórico",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "DescriptionList (pares chave/valor), Timeline (auditoria), Pagination e Accordion." } } },
};

export const DL = {
  name: "DescriptionList",
  parameters: { docs: { description: { story: "`.su-dl` — itens `{ key, value, wide? }`. A ficha se distribui em grade: numa tela larga rende várias colunas em vez de descer numa fileira só com a largura vazia ao lado. `wide` dá a linha inteira ao par; `rows` volta à coluna única (resumo estreito, painel lateral). Esta story roda em largura CHEIA de propósito — a versão anterior vivia dentro de um `maxWidth: 460` e por isso o defeito de distribuição nunca aparecia aqui." } } },
  render: () => (
    <div style={{ display: "grid", gap: 32 }}>
      <div>
        <p style={{ fontSize: 12, color: "var(--su-text-secondary)", marginBottom: 8 }}>Padrão — grade, largura cheia</p>
        <DescriptionList items={[
          { key: "Razão social", value: "Acme Comércio Ltda" },
          { key: "CNPJ", value: "12.345.678/0001-90" },
          { key: "Plano", value: <Badge status="success">Anual</Badge> },
          { key: "Responsável", value: "Ana Prado" },
          { key: "Desde", value: "12/03/2024" },
          { key: "Cidade", value: "Vitória — ES" },
          { key: "Situação", value: <Badge status="success">Em dia</Badge> },
          { key: "Contrato", value: "vence em 05/2027" },
          { key: "Observação", wide: true, value: "Reajuste anual pelo IPCA aplicado em junho; renovação automática salvo aviso com 60 dias de antecedência." },
        ]} />
      </div>
      <div style={{ maxWidth: 320 }}>
        <p style={{ fontSize: 12, color: "var(--su-text-secondary)", marginBottom: 8 }}>`rows` — coluna única, para painel estreito</p>
        <DescriptionList rows items={[
          { key: "Plano", value: <Badge status="success">Anual</Badge> },
          { key: "Responsável", value: "Ana Prado" },
          { key: "Desde", value: "12/03/2024" },
        ]} />
      </div>
    </div>
  ),
};

export const TL = {
  name: "Timeline",
  parameters: { docs: { description: { story: "`.su-timeline` — itens `{ title, meta?, active? }`. Quem fez o quê, quando." } } },
  render: () => (
    <Timeline items={[
      { title: "Fatura paga", meta: "hoje, 09:12 · sistema", active: true },
      { title: "Fatura emitida", meta: "ontem, 18:40 · Ana Prado" },
      { title: "Plano alterado para Anual", meta: "12/03 · Bruno Dias" },
      { title: "Cliente criado", meta: "12/03 · Ana Prado" },
    ]} />
  ),
};

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="su-demo-col">
      <Pagination page={page} pageCount={8} onChange={setPage} />
      <span style={{ fontSize: 13, color: "var(--su-text-muted)" }}>Página {page} de 8</span>
    </div>
  );
}
export const Pag = { name: "Pagination", render: () => <PaginationDemo /> };

export const Acc = {
  name: "Accordion",
  parameters: { docs: { description: { story: "`.su-accordion` — itens `{ title, content }`. Controlado internamente." } } },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Accordion items={[
        { title: "Como funciona a cobrança?", content: "A cobrança é feita no primeiro dia útil de cada ciclo, conforme o plano." },
        { title: "Posso trocar de plano?", content: "Sim, a qualquer momento. O valor é ajustado proporcionalmente." },
        { title: "Como cancelo?", content: "Pelo painel, em Configurações › Assinatura. Sem multa." },
      ]} />
    </div>
  ),
};
