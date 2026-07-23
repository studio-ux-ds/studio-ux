import React, { useState } from "react";
import { Field, Input, PhoneInput, Sheet } from "@studio-ux-ds/react/mobile";
import { Cta, Footer } from "@studio-ux-ds/react/mobile";

const Phone = ({ children, height = 480 }) => (
  <div style={{
    width: 390, minHeight: height, margin: "0 auto",
    background: "var(--su-surface-base)",
    border: "1px solid var(--su-border-subtle)",
    borderRadius: "var(--su-radius-xl)",
    overflow: "hidden", position: "relative",
    display: "flex", flexDirection: "column",
  }}>{children}</div>
);

export default {
  title: "Mobile-web/Formulário",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Formulário mobile-web (`.su-m-*`): `Field` (label + campo), `Input` (linha padrão), `PhoneInput` (reusa `.su-phoneinput` do Desktop — E.164 sem `+`) e `Sheet` (bottom sheet controlado — o substituto natural de modais no toque)." } },
  },
};

export const CamposBasicos = {
  name: "Field + Input + PhoneInput",
  render: () => {
    function Demo() {
      const [nome, setNome] = useState("");
      const [tel, setTel] = useState("");
      return (
        <Phone>
          <div style={{ padding: "var(--su-space-4)", flex: 1, display: "flex", flexDirection: "column", gap: "var(--su-space-3)" }}>
            <Field label="Nome completo" htmlFor="fld-nome">
              <Input id="fld-nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Ana Prado" />
            </Field>
            <Field label="Telefone" htmlFor="fld-tel">
              <PhoneInput id="fld-tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="27999998888" onPickCountry={() => {}} />
            </Field>
          </div>
          <Footer>
            <Cta ghost>Cancelar</Cta>
            <Cta icon="check">Salvar</Cta>
          </Footer>
        </Phone>
      );
    }
    return <Demo />;
  },
};

export const SheetPadrao = {
  name: "Sheet (bottom sheet)",
  parameters: { docs: { description: { story: "`Sheet` é o overlay canônico do mobile — sobe do fundo com `role=\"dialog\"` e backdrop clicável para fechar. Substitui Modal em telas de toque." } } },
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <Phone height={420}>
          <div style={{ padding: "var(--su-space-4)", flex: 1 }}>
            <Cta icon="filter" onClick={() => setOpen(true)}>Abrir filtros</Cta>
          </div>
          <Sheet open={open} onClose={() => setOpen(false)}>
            <div style={{ padding: "var(--su-space-4)" }}>
              <strong style={{ fontSize: 15 }}>Filtros</strong>
              <p style={{ margin: "var(--su-space-3) 0", color: "var(--su-text-secondary)", fontSize: 13 }}>
                Escolha o período, o bloco e a categoria.
              </p>
              <Cta onClick={() => setOpen(false)}>Aplicar</Cta>
            </div>
          </Sheet>
        </Phone>
      );
    }
    return <Demo />;
  },
};
