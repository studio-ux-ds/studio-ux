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
  render: () => (
    <div className="su-demo-row">
      <Spinner />
      <span style={{ fontSize: 13, color: "var(--su-text-secondary)" }}>Carregando…</span>
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
