import React from "react";
import { PageHeader, Button } from "@studio-ux-ds/react";

export default {
  title: "Padrões/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-pagehead` — cabeçalho da região de conteúdo: título + subtítulo opcional + **uma** ação primária (P6). A primária da tela mora aqui, nunca na TopBar. Não desenha o shell (P22)." } } },
};

export const Padrao = {
  name: "Padrão",
  render: () => (
    <PageHeader
      title="Receitas"
      subtitle="O que entra: salário, pró-labore, faturamento, aluguel recebido, bônus."
      actions={<Button variant="primary" icon="plus">Nova entrada</Button>}
    />
  ),
};

export const SemAcao = {
  name: "Sem ação",
  render: () => <PageHeader title="Relatórios" subtitle="Visão consolidada do mês." />,
};
