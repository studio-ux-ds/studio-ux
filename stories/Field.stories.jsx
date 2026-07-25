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
    required: { control: "boolean" },
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

/**
 * `required` marca a etiqueta: `*` decorativo (`aria-hidden`) + "(obrigatório)"
 * em `.su-sr-only`, que o leitor de tela lê e a tela não mostra. O Field não
 * propaga o atributo pro controle — quem valida é o produto.
 */
export const Obrigatorio = {
  render: () => (
    <div className="su-demo-col" style={{ maxWidth: 360 }}>
      <Field label="Nome" required htmlFor="r1"><Input id="r1" placeholder="Ex.: Feriados nacionais" /></Field>
      <Field label="Apelido" hint="Opcional — usado só na listagem." htmlFor="r2"><Input id="r2" /></Field>
      <Field label="E-mail" required error="Informe um e-mail." htmlFor="r3"><Input id="r3" aria-invalid /></Field>
    </div>
  ),
};
