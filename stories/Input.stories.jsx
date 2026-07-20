import React from "react";
import { Input, PhoneInput, Field } from "@studio-ux-ds/react";

export default {
  title: "Formulário/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-input`. Recebe qualquer prop nativa de `<input>` (placeholder, type, value…)." } } },
  args: { placeholder: "Digite aqui" },
};

export const Playground = { render: (args) => <div style={{ maxWidth: 320 }}><Input {...args} /></div> };

export const Estados = {
  render: () => (
    <div className="su-demo-col" style={{ maxWidth: 320 }}>
      <Input placeholder="Padrão" />
      <Input defaultValue="Preenchido" />
      <Input placeholder="Desabilitado" disabled />
    </div>
  ),
};

export const Telefone = {
  name: "PhoneInput",
  parameters: { docs: { description: { story: "`.su-phoneinput`. Valor guardado em E.164 só-dígitos. A resolução de país é do produto." } } },
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Field label="Telefone" htmlFor="ph"><PhoneInput id="ph" placeholder="(11) 99999-9999" /></Field>
    </div>
  ),
};
