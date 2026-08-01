import React, { useState } from "react";
import { Modal, ConfirmDialog, Button, DatePicker, Field, FormGrid, Input, NumericInput, Select } from "@studio-ux-ds/react";

export default {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-scrim` + `.su-modal`. Controlado por `open`; fecha no Esc e no clique do scrim.\n\n**Regra de contêiner:** Modal no Desktop e Sheet no Mobile para uma única intenção curta com respostas fechadas. Tabs, `TextArea`, arquivo/prévia, histórico ou trabalho contínuo promovem a jornada para detalhe inline ou rota. Drawer é inspetor de item dentro de editor/canvas, não um modal maior." } } },
};

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" icon="plus" onClick={() => setOpen(true)}>Novo cliente</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Novo cliente"
        maxWidth={460}
        footer={<>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Salvar</Button>
        </>}
      >
        <div className="su-demo-col">
          <Field label="Razão social" htmlFor="m1"><Input id="m1" placeholder="Acme Ltda" /></Field>
          <Field label="E-mail" htmlFor="m2"><Input id="m2" type="email" placeholder="contato@acme.com" /></Field>
        </div>
      </Modal>
    </>
  );
}
export const Padrao = { name: "Modal", render: () => <ModalDemo /> };

function ShortFormDemo() {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(1);
  const [quantity, setQuantity] = useState(100);
  const [until, setUntil] = useState("");
  return <>
    <Button variant="secondary" icon="edit" onClick={() => setOpen(true)}>Ajustar disponibilidade</Button>
    <Modal open={open} onClose={() => setOpen(false)} title="Ajustar disponibilidade" maxWidth={640} footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button><Button variant="primary" onClick={() => setOpen(false)}>Salvar</Button></>}>
      <FormGrid columns={2}>
        <Field label="Código"><Input defaultValue="LOTE-01" /></Field>
        <Field label="Situação"><Select defaultValue="active"><option value="active">Ativo</option><option value="paused">Pausado</option></Select></Field>
        <Field label="Ordem"><NumericInput value={order} onChange={setOrder} min={1} fullWidth /></Field>
        <Field label="Quantidade"><NumericInput value={quantity} onChange={setQuantity} min={0} fullWidth /></Field>
        <Field label="Disponível até" wide><DatePicker value={until} onChange={setUntil} /></Field>
      </FormGrid>
    </Modal>
  </>;
}
export const FormularioCurto = {
  name: "Modal: formulário curto de uma intenção",
  parameters: { docs: { description: { story: "Campos simples podem ocupar uma composição de duas colunas sem virar Drawer. A decisão é a intenção única e fechada — não uma contagem arbitrária de campos." } } },
  render: () => <ShortFormDemo />,
};

function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const confirm = () => { setLoading(true); setTimeout(() => { setLoading(false); setOpen(false); }, 1200); };
  return (
    <>
      <Button variant="danger" icon="trash" onClick={() => setOpen(true)}>Excluir cliente</Button>
      <ConfirmDialog
        open={open}
        onClose={() => !loading && setOpen(false)}
        onConfirm={confirm}
        loading={loading}
        title="Excluir cliente?"
        message="Esta ação é permanente e remove todas as faturas associadas."
        confirmLabel="Excluir"
      />
    </>
  );
}
export const Confirmacao = { name: "ConfirmDialog", render: () => <ConfirmDemo /> };
