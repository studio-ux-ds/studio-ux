import React, { useState, useEffect } from "react";
import { EmptyState, Skeleton, Spinner, ProgressBar, Button } from "@studio-ux-ds/react";

export default {
  title: "Feedback/Estados",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "EmptyState, Skeleton, Spinner e ProgressBar — os estados vazio/carregando/progresso." } } },
};

export const Vazio = {
  name: "EmptyState",
  parameters: { docs: { description: { story: "`.su-empty` — convite, não desculpa (título + ação)." } } },
  render: () => (
    <EmptyState
      icon="users"
      title="Nenhum cliente ainda"
      description="Cadastre o primeiro cliente para começar a faturar."
      action={<Button variant="primary" icon="plus">Novo cliente</Button>}
    />
  ),
};

export const Esqueleto = {
  name: "Skeleton",
  render: () => (
    <div className="su-demo-col" style={{ maxWidth: 360 }}>
      <Skeleton width="60%" height={14} />
      <Skeleton width="100%" height={10} />
      <Skeleton width="90%" height={10} />
      <Skeleton width={120} height={32} radius={8} />
    </div>
  ),
};

export const Carregando = {
  name: "Spinner",
  parameters: {
    docs: { description: { story: "Três escalas, porque o mesmo desenho serve a dois lugares: **ao lado de um rótulo** (`sm`/padrão) e **no centro de uma região que ainda não tem conteúdo** (`lg`).\n\n**A cor não é configurável de propósito** — anel neutro com o topo no accent é a assinatura de carregamento do sistema; deixar cada tela escolher é como se perde a unidade.\n\nDentro de um botão, nada disso é necessário: use `<Button loading>`, que monta o spinner na escala e na cor do botão e já cuida do `disabled`/`aria-busy`." } },
  },
  render: () => (
    <div style={{ display: "grid", gap: 20 }}>
      <div className="su-demo-row">
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
        <span style={{ fontSize: 13, color: "var(--su-text-secondary)" }}>sm 12 · padrão 16 · lg 24</span>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "var(--su-text-muted)", marginBottom: 6 }}>
          Ao lado do rótulo — carregamento de uma ação pontual:
        </div>
        <div className="su-demo-row">
          <Spinner size="sm" />
          <span style={{ fontSize: 13, color: "var(--su-text-secondary)" }}>Executando…</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "var(--su-text-muted)", marginBottom: 6 }}>
          <code>center</code> — carregamento inicial de uma tela ou cartão (o arranjo, não só o desenho):
        </div>
        <div style={{ border: "1px dashed var(--su-border-default)", borderRadius: 8 }}>
          <Spinner size="lg" center />
        </div>
      </div>
    </div>
  ),
};

function ProgressDemo() {
  const [v, setV] = useState(30);
  useEffect(() => {
    const t = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 10)), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="su-demo-col" style={{ maxWidth: 360 }}>
      <ProgressBar value={v} />
      <span style={{ fontSize: 13, color: "var(--su-text-muted)" }}>{v}%</span>
    </div>
  );
}
export const Progresso = { name: "ProgressBar", render: () => <ProgressDemo /> };
