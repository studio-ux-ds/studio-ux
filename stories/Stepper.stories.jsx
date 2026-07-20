import React, { useState } from "react";
import { Stepper, Button } from "@studio-ux-ds/react";

export default {
  title: "Formulário/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-stepper` — trilho de etapas do wizard. `steps` = `[{label}]`; `current` é **1-based**." } } },
  argTypes: { current: { control: { type: "number", min: 1, max: 4 } } },
  args: {
    current: 2,
    steps: [{ label: "Dados" }, { label: "Endereço" }, { label: "Pagamento" }, { label: "Revisão" }],
  },
};

export const Playground = {};

function Interativo() {
  const steps = [{ label: "Dados" }, { label: "Endereço" }, { label: "Pagamento" }, { label: "Revisão" }];
  const [cur, setCur] = useState(1);
  return (
    <div className="su-demo-col">
      <Stepper steps={steps} current={cur} />
      <div className="su-demo-row">
        <Button variant="secondary" icon="arrow-left" disabled={cur === 1} onClick={() => setCur((c) => c - 1)}>Voltar</Button>
        <Button variant="primary" iconRight="arrow-right" disabled={cur === steps.length} onClick={() => setCur((c) => c + 1)}>Avançar</Button>
      </div>
    </div>
  );
}
export const Interativo_ = { name: "Interativo", render: () => <Interativo /> };
