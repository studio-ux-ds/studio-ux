import React, { useState } from "react";
import { NumericInput, TextArea, Combobox, FileUpload, DatePicker, Field } from "@studio-ux-ds/react";

export default {
  title: "Formulário/Inputs avançados",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "NumericInput (nunca `input[type=number]`), TextArea, Combobox buscável, FileUpload (drag-drop) e DatePicker — todos controlados." } } },
};

function NumericDemo() {
  const [v, setV] = useState(3);
  return (
    <div style={{ maxWidth: 200 }}>
      <Field label="Quantidade" htmlFor="q"><NumericInput value={v} onChange={setV} min={0} max={99} /></Field>
    </div>
  );
}
export const Numeric = { name: "NumericInput", render: () => <NumericDemo /> };

export const TextAreaBasico = {
  name: "TextArea",
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Field label="Observações" htmlFor="obs"><TextArea id="obs" rows={4} placeholder="Escreva uma nota…" /></Field>
    </div>
  ),
};

function ComboDemo() {
  const [v, setV] = useState(null);
  const options = [
    { label: "São Paulo", value: "SP" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Paraná", value: "PR" },
    { label: "Bahia", value: "BA" },
  ];
  return (
    <div style={{ maxWidth: 320 }}>
      <Field label="Estado" hint={v ? `Selecionado: ${v}` : "Digite para filtrar"} htmlFor="uf">
        <Combobox value={v} onChange={setV} options={options} placeholder="Selecione um estado" />
      </Field>
    </div>
  );
}
export const ComboboxBuscavel = { name: "Combobox", render: () => <ComboDemo /> };

function UploadDemo() {
  const [name, setName] = useState(null);
  return (
    <div style={{ maxWidth: 420 }}>
      <FileUpload onFiles={(f) => setName(f && f[0] ? f[0].name : null)} />
      {name && <div style={{ fontSize: 13, marginTop: 8, color: "var(--su-text-secondary)" }}>Selecionado: {name}</div>}
    </div>
  );
}
export const Upload = { name: "FileUpload", render: () => <UploadDemo /> };

function DateDemo() {
  const [v, setV] = useState("");
  return (
    <div>
      <Field label="Vencimento" htmlFor="dt"><DatePicker value={v} onChange={setV} /></Field>
    </div>
  );
}
export const Data = { name: "DatePicker", render: () => <DateDemo /> };
