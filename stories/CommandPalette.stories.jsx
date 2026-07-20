import React, { useState } from "react";
import { CommandPalette, Button } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "`.su-cmdk` num scrim (⌘K). Controlado por `open`/`onClose`. O conteúdo (grupos/itens) é do produto; a casca + campo de busca vêm do componente." } } },
};

function Demo() {
  const [open, setOpen] = useState(false);
  const item = (icon, label, hint) => (
    <div className="su-menu__item" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <i className={`ti ti-${icon}`} style={{ color: "var(--su-text-muted)" }} />
      <span style={{ flex: 1 }}>{label}</span>
      {hint && <kbd style={{ fontSize: 11, color: "var(--su-text-muted)" }}>{hint}</kbd>}
    </div>
  );
  return (
    <>
      <Button variant="secondary" icon="search" onClick={() => setOpen(true)}>Abrir paleta (⌘K)</Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        footer={<span style={{ fontSize: 12, color: "var(--su-text-muted)" }}>↑↓ navegar · ↵ selecionar · esc fechar</span>}
      >
        <div className="su-demo-label" style={{ padding: "6px 10px 2px" }}>Ações</div>
        {item("plus", "Novo cliente", "C")}
        {item("file-invoice", "Nova fatura", "F")}
        <div className="su-demo-label" style={{ padding: "10px 10px 2px" }}>Ir para</div>
        {item("dashboard", "Painel")}
        {item("users", "Clientes")}
        {item("settings", "Configurações")}
      </CommandPalette>
    </>
  );
}

export const Padrao = { name: "Padrão", render: () => <Demo /> };
