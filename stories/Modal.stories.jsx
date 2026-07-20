import React, { useState } from "react";
import { Modal, ConfirmDialog, Button, Field, Input } from "@studio-ux-ds/react";

export default {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-scrim` + `.su-modal`. Controlado por `open`; fecha no Esc e no clique do scrim." } } },
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
