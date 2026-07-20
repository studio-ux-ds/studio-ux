import React from 'react';
import { Field, Input, Textarea, Select, Checkbox, Radio, Switch, NumericInput } from '../components/forms';

export default { title: 'Componentes/Formulários', tags: ['autodocs'] };

export const Controles = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 380 }}>
      <Field label="Nome"><Input defaultValue="Marina Alves" /></Field>
      <Field label="E-mail" error="Digite um e-mail válido."><Input defaultValue="marina@empresa" /></Field>
      <Field label="Observação" hint="Máx. 500 caracteres."><Textarea defaultValue="Cliente VIP." /></Field>
      <Field label="Plano"><Select defaultValue="anual"><option value="mensal">Mensal</option><option value="anual">Anual</option></Select></Field>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}><Checkbox defaultChecked /> Ativo</label>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}><Radio name="r" defaultChecked /> Opção A</label>
        <Switch checked onChange={() => {}} />
        <NumericInput value="3" onChange={() => {}} min={0} />
      </div>
    </div>
  ),
};
