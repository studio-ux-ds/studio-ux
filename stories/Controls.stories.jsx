import React, { useState } from "react";
import { Select, Checkbox, Radio, Switch, SegmentedControl, Field } from "@studio-ux-ds/react";

export default {
  title: "Formulário/Controles",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Select, Checkbox, Radio, Switch e SegmentedControl — todos sobre classes `.su-*` (sem chrome nativo do navegador)." } } },
};

export const SelectBasico = {
  name: "Select",
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Field label="Status" htmlFor="s">
        <Select id="s" defaultValue="ativo">
          <option value="ativo">Ativo</option>
          <option value="pendente">Pendente</option>
          <option value="bloqueado">Bloqueado</option>
        </Select>
      </Field>
    </div>
  ),
};

function CheckboxDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="su-demo-col">
      <Checkbox id="c1" label="Enviar cópia por e-mail" checked={a} onChange={(e) => setA(e.target.checked)} />
      <Checkbox id="c2" label="Aceito os termos" checked={b} onChange={(e) => setB(e.target.checked)} />
      <Checkbox id="c3" label="Desabilitado" disabled />
    </div>
  );
}
export const Checkboxes = { render: () => <CheckboxDemo /> };

function RadioDemo() {
  const [v, setV] = useState("mensal");
  return (
    <div className="su-demo-col">
      {["mensal", "anual", "vitalicio"].map((o) => (
        <Radio key={o} id={`r-${o}`} name="plano" label={o[0].toUpperCase() + o.slice(1)} value={o} checked={v === o} onChange={() => setV(o)} />
      ))}
    </div>
  );
}
export const Radios = { render: () => <RadioDemo /> };

function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="su-demo-row">
      <Switch checked={on} onChange={setOn} aria-label="Notificações" />
      <span style={{ fontSize: 13, color: "var(--su-text-secondary)" }}>{on ? "Ativado" : "Desativado"}</span>
    </div>
  );
}
export const SwitchToggle = { name: "Switch", render: () => <SwitchDemo /> };

function SegmentedDemo() {
  const [v, setV] = useState("lista");
  return (
    <SegmentedControl
      value={v}
      onChange={setV}
      items={[{ id: "lista", label: "Lista" }, { id: "grade", label: "Grade" }, { id: "kanban", label: "Kanban" }]}
    />
  );
}
export const Segmented = { name: "SegmentedControl", render: () => <SegmentedDemo /> };
