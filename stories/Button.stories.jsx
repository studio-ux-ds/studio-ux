import React from "react";
import { Button, IconButton } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "`.su-btn`. Props traduzem para classes/estados (nunca valores). `disabled` é nativo (via rest). Ícones = nomes da biblioteca local curada." } },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    icon: { control: "text", description: "ícone local à esquerda (ex.: plus)" },
    iconRight: { control: "text", description: "ícone local à direita" },
    disabled: { control: "boolean" },
  },
  args: { children: "Novo cliente", variant: "primary", size: "md" },
};

export const Playground = {};

export const Variantes = {
  render: () => (
    <div className="su-demo-row">
      <Button variant="primary">Primário</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Excluir</Button>
    </div>
  ),
};

export const Tamanhos = {
  render: () => (
    <div className="su-demo-row">
      <Button variant="primary" size="sm">Pequeno</Button>
      <Button variant="primary" size="md">Médio</Button>
      <Button variant="primary" size="lg">Grande</Button>
    </div>
  ),
};

export const ComIcones = {
  name: "Com ícones",
  render: () => (
    <div className="su-demo-row">
      <Button variant="primary" icon="plus">Adicionar</Button>
      <Button variant="secondary" iconRight="arrow-right">Avançar</Button>
      <Button variant="secondary" icon="download" iconRight="chevron-down">Exportar</Button>
    </div>
  ),
};

export const Desabilitado = {
  render: () => (
    <div className="su-demo-row">
      <Button variant="primary" disabled>Primário</Button>
      <Button variant="secondary" disabled icon="lock">Bloqueado</Button>
    </div>
  ),
};

export const Carregando = {
  name: "Carregando (loading)",
  parameters: { docs: { description: { story: "Padrão canônico do adapter para uma ação assíncrona (P16, P12): o botão troca o ícone à esquerda por `loader-2` e vira `disabled` enquanto submete — o `disabled` nativo bloqueia o duplo-clique. O rótulo pode mudar para o presente contínuo (\"Salvando…\"). É o mesmo padrão que o `ConfirmDialog` aplica na confirmação de ações destrutivas." } } },
  render: () => (
    <div className="su-demo-row">
      <Button variant="primary" icon="loader-2" disabled>Salvando…</Button>
      <Button variant="danger" icon="loader-2" disabled>Excluindo…</Button>
      <Button variant="secondary" icon="loader-2" disabled>Enviando…</Button>
    </div>
  ),
};

export const IconButtons = {
  name: "IconButton",
  parameters: { docs: { description: { story: "`.su-iconbtn` — exige `aria-label`." } } },
  render: () => (
    <div className="su-demo-row">
      <IconButton icon="edit" aria-label="Editar" />
      <IconButton icon="trash" aria-label="Excluir" />
      <IconButton icon="dots" aria-label="Mais ações" />
      <IconButton icon="refresh" aria-label="Recarregar" />
    </div>
  ),
};
