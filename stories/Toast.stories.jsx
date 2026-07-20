import React from "react";
import { ToastProvider, useToast, Button } from "@studio-ux-ds/react";

export default {
  title: "Overlays/Toast",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`ToastProvider` + `useToast()` — feedback de ação (nunca banner nem `alert()`). Métodos: `success`, `error`, `info`, `warn`." } } },
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
};

function Disparadores() {
  const toast = useToast();
  return (
    <div className="su-demo-row">
      <Button variant="primary" onClick={() => toast.success("Cliente salvo com sucesso.")}>Sucesso</Button>
      <Button variant="danger" onClick={() => toast.error("Falha ao salvar. Tente de novo.")}>Erro</Button>
      <Button variant="secondary" onClick={() => toast.info("Sincronização iniciada.")}>Info</Button>
      <Button variant="secondary" onClick={() => toast.warn("Sessão expira em 2 minutos.")}>Aviso</Button>
    </div>
  );
}

export const Disparar = { name: "Disparar toasts", render: () => <Disparadores /> };
