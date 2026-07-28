import React, { useState } from "react";
import { DetailScreen, DescriptionList, Badge, Button, Banner, Timeline, Card } from "@studio-ux-ds/react";

export default {
  title: "Padrões/DetailScreen",
  component: DetailScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Molde **`detail`** (TEMPLATES §2, deriva de TABLES): a tela de **um registro que existe por si**. Voltar → cabeçalho → abas → conteúdo.\n\n**O \"voltar\" é do molde, não do breadcrumb** — item sem `href` é texto e `href` sem `onNavigate` recarrega a SPA; os dois falham calados. **A aba é identificada por `id`** (`{value, label}` faz `onChange` devolver `undefined` e a tela esvaziar ao clicar). **Carregando e erro moram dentro da aba**, para que o cabeçalho não desapareça de quem já leu o título." } },
  },
};

const dados = [
  { key: "Nome", value: "Torre 3 — Pratinha" },
  { key: "Documento", value: "12.345.678/0001-90" },
  { key: "Situação", value: <Badge tone="success">Ativa</Badge> },
  { key: "Criada em", value: "12/03/2026" },
  { key: "Responsável", value: "Fabricia Marques" },
];

function Demo(props) {
  const [tab, setTab] = useState("geral");
  return (
    <DetailScreen
      back={{ onClick: () => {} }}
      title="Torre 3 — Pratinha"
      subtitle="Conexão do provedor · criada em 12/03/2026"
      actions={<Button variant="secondary" icon="edit">Editar</Button>}
      tabs={[
        { id: "geral", label: "Visão geral" },
        { id: "historico", label: "Histórico", icon: "history" },
      ]}
      tab={tab}
      onTab={setTab}
      {...props}
    >
      {tab === "geral"
        ? <DescriptionList items={dados} />
        : <Timeline items={[
            { title: "Credencial renovada", meta: "por Robson · 20/07/2026 14:02", active: true },
            { title: "Conexão criada", meta: "por Robson · 12/03/2026 09:31" },
          ]} />}
    </DetailScreen>
  );
}

export const Padrao = { name: "Registro com abas", render: () => <Demo /> };

export const Carregando = { name: "Carregando", render: () => <Demo loading /> };

export const Erro = {
  name: "Erro (com tentar de novo)",
  render: () => <Demo error={{ message: "O servidor não respondeu a tempo.", onRetry: () => {} }} />,
};

export const ComAviso = {
  name: "Com condição que vale para a tela inteira",
  parameters: {
    docs: { description: { story: "`aside` é o lugar da condição que muda a leitura de tudo abaixo — arquivado, credencial vencida, em manutenção. Fica **acima das abas** porque vale para todas." } },
  },
  render: () => (
    <Demo aside={<Banner tone="warning"><b>Credencial vencida.</b> Esta conexão parou de sincronizar em 20/07. Renove a credencial para voltar a receber dados.</Banner>} />
  ),
};

export const SemCard = {
  name: "bare (a aba traz o próprio arranjo)",
  parameters: {
    docs: { description: { story: "Quando o conteúdo da aba já é um conjunto de cartões — ou uma lista inteira — passar `bare` evita cartão dentro de cartão." } },
  },
  render: () => (
    <DetailScreen
      back={{ onClick: () => {} }}
      title="Torre 3 — Pratinha"
      tabs={[{ id: "recursos", label: "Recursos" }]}
      tab="recursos"
      onTab={() => {}}
      bare
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--su-space-4)" }}>
        {["Clientes", "Contratos", "Faturas"].map((r) => (
          <Card key={r}><b>{r}</b><div style={{ fontSize: 12, color: "var(--su-text-muted)", marginTop: 4 }}>Sincronizado há 5 min</div></Card>
        ))}
      </div>
    </DetailScreen>
  ),
};
