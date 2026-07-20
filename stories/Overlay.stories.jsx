import React, { useState } from "react";
import { Drawer, Sheet, Menu, Tooltip, Popover, Button, IconButton, Field, Input } from "@studio-ux-ds/react";

export default {
  title: "Overlays/Painéis e menus",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Drawer (lateral), Sheet (inferior), Menu (dropdown), Tooltip e Popover." } } },
};

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" icon="filter" onClick={() => setOpen(true)}>Filtros</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Filtros"
        footer={<>
          <Button variant="secondary" onClick={() => setOpen(false)}>Limpar</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Aplicar</Button>
        </>}
      >
        <div className="su-demo-col">
          <Field label="Buscar" htmlFor="d1"><Input id="d1" placeholder="Nome do cliente" /></Field>
          <Field label="Cidade" htmlFor="d2"><Input id="d2" placeholder="São Paulo" /></Field>
        </div>
      </Drawer>
    </>
  );
}
export const DrawerLateral = { name: "Drawer", render: () => <DrawerDemo /> };

function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" icon="dots" onClick={() => setOpen(true)}>Mais ações</Button>
      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="su-demo-col" style={{ padding: 20 }}>
          <strong style={{ fontSize: 15 }}>Ações rápidas</strong>
          <Button variant="secondary" icon="edit" onClick={() => setOpen(false)}>Editar</Button>
          <Button variant="secondary" icon="copy" onClick={() => setOpen(false)}>Duplicar</Button>
          <Button variant="danger" icon="trash" onClick={() => setOpen(false)}>Excluir</Button>
        </div>
      </Sheet>
    </>
  );
}
export const SheetInferior = { name: "Sheet", render: () => <SheetDemo /> };

export const MenuDropdown = {
  name: "Menu",
  parameters: { docs: { description: { story: "`.su-menu` — itens `{ label, icon?, danger?, onClick?, separator? }`. Renderize dentro de um wrapper `position:relative`." } } },
  render: () => (
    <div style={{ width: 220 }}>
      <Menu items={[
        { label: "Ver detalhes", icon: "eye" },
        { label: "Editar", icon: "edit" },
        { label: "Duplicar", icon: "copy" },
        { separator: true },
        { label: "Excluir", icon: "trash", danger: true },
      ]} />
    </div>
  ),
};

export const TooltipDica = {
  name: "Tooltip",
  parameters: { docs: { description: { story: "`.su-tooltip` — casca; o posicionamento fica a cargo de quem usa." } } },
  render: () => (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <IconButton icon="help" aria-label="Ajuda" />
      <span style={{ position: "absolute", left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" }}>
        <Tooltip>Precisa de ajuda?</Tooltip>
      </span>
    </span>
  ),
};

export const PopoverBox = {
  name: "Popover",
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Popover>
        <div style={{ padding: 4 }}>
          <strong style={{ fontSize: 13 }}>Dica</strong>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--su-text-secondary)" }}>
            Popover é a casca de conteúdo flutuante; ancore-o como precisar.
          </p>
        </div>
      </Popover>
    </div>
  ),
};
