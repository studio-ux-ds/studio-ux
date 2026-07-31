import React, { useState } from "react";
import { Drawer, Sheet, Menu, Tooltip, Popover, Button, IconButton, Field, Input, FileUpload, Banner } from "@studio-ux-ds/react";

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
      <Button variant="secondary" icon="more" onClick={() => setOpen(true)}>Mais ações</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Ações rápidas" footer={<Button variant="secondary" onClick={() => setOpen(false)}>Fechar</Button>}>
        <div className="su-demo-col">
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

function FileFlowSheetDemo() {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const close = () => { setOpen(false); setFileName(""); };
  return <>
    <Button variant="secondary" icon="upload" onClick={() => setOpen(true)}>Importar arquivo</Button>
    <Sheet
      open={open}
      onClose={close}
      title="Importar registros"
      fullHeight
      footer={<><Button variant="secondary" onClick={close}>Cancelar</Button><Button variant="primary" disabled={!fileName} onClick={close}>{fileName ? "Continuar" : "Selecione um arquivo"}</Button></>}
    >
      <div className="su-demo-col">
        <p style={{ margin: 0, color: "var(--su-text-secondary)" }}>Envie uma planilha para revisar os dados antes de confirmar a importação.</p>
        <FileUpload accept=".xlsx,.csv" hint="Arraste uma planilha ou clique para selecionar" onFiles={(files) => setFileName(files && files[0] ? files[0].name : "")} />
        {fileName && <Banner tone="info">Arquivo selecionado: <strong>{fileName}</strong></Banner>}
      </div>
    </Sheet>
  </>;
}

export const SheetFluxoDeArquivo = {
  name: "Sheet: fluxo de arquivo em tela cheia",
  parameters: { docs: { description: { story: "Para uma jornada de arquivo com revisão, use `Sheet` com `title`, `footer` e `fullHeight`. O corpo fica rolável e o rodapé conserva as ações. `FileUpload` recebe o arquivo; leitura, validação, progresso e envio são responsabilidade do produto." } } },
  render: () => <FileFlowSheetDemo />,
};

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
