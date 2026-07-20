import React from "react";
import { Field, Input } from "@studio-ux-ds/react";

export default {
  title: "Formulário/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-field` — wrapper de label + controle + erro/dica. O erro é inline; a falha de envio vai por Toast." } } },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
  },
  args: { label: "Nome do cliente", hint: "Como aparece nas faturas." },
};

export const Playground = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Field {...args} htmlFor="f1"><Input id="f1" placeholder="Ex.: Acme Ltda" /></Field>
    </div>
  ),
};

export const Estados = {
  render: () => (
    <div className="su-demo-col" style={{ maxWidth: 360 }}>
      <Field label="Padrão" htmlFor="a"><Input id="a" placeholder="Digite aqui" /></Field>
      <Field label="Com dica" hint="Usamos só para contato." htmlFor="b"><Input id="b" placeholder="email@exemplo.com" /></Field>
      <Field label="Com erro" error="E-mail inválido." htmlFor="c"><Input id="c" defaultValue="email@" aria-invalid /></Field>
    </div>
  ),
};
