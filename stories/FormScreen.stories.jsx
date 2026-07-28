import React, { useState } from "react";
import { FormScreen, FormGrid, Field, Input, Select, TextArea, PhoneInput, Banner, Button } from "@studio-ux-ds/react";

export default {
  title: "Padrões/FormScreen",
  component: FormScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Molde **`form`** (TEMPLATES §2, deriva de FORMS): criar ou editar um registro, **em rota própria** (a regra dos três containers — Modal é leitura e campo curto).\n\n**É um `<form>` de verdade:** Enter submete, o gerenciador de senha entende, `type=\"submit\"` basta. Formulário montado com `<div>` some com o Enter, e ninguém reporta — as pessoas só param de usar o teclado.\n\n**Salvando é `loading` no botão** (P16), nunca spinner montado à mão ao lado do rótulo. **Erro de validação é `Toast`**, nunca banner inline — por isso não há região de erro de campo; o que há é `banner`, para a condição que vale para a tela inteira.\n\nO arranjo dos campos é do `FormGrid`, passado como `children`: quem conhece os campos é a tela, não o molde." } },
  },
};

function Campos() {
  const [tel, setTel] = useState("");
  return (
    <FormGrid columns={2}>
      <Field label="Nome" required><Input placeholder="Nome completo" /></Field>
      <Field label="E-mail" required hint="É por aqui que a pessoa entra no sistema."><Input type="email" placeholder="voce@empresa.com" /></Field>
      <Field label="Telefone"><PhoneInput value={tel} onChange={setTel} /></Field>
      <Field label="Perfil de acesso"><Select><option>Administrador</option><option>Operador</option></Select></Field>
      <Field label="Observações" wide><TextArea rows={4} placeholder="Contexto que ajuda quem for atender…" /></Field>
    </FormGrid>
  );
}

export const Criar = {
  name: "Criar",
  render: () => (
    <FormScreen
      back={{ onClick: () => {} }}
      title="Nova pessoa"
      subtitle="Ela recebe um convite por e-mail para criar a própria senha."
      onSubmit={() => {}}
      onCancel={() => {}}
      submitLabel="Enviar convite"
    >
      <Campos />
    </FormScreen>
  ),
};

export const Salvando = {
  name: "Salvando",
  parameters: { docs: { description: { story: "`saving` liga o `loading` do botão — que já desabilita, marca `aria-busy` e usa a escala e a cor do próprio botão. O Cancelar fica desabilitado junto: cancelar no meio de um POST deixa o registro em estado indefinido." } } },
  render: () => (
    <FormScreen title="Nova pessoa" onSubmit={() => {}} onCancel={() => {}} saving>
      <Campos />
    </FormScreen>
  ),
};

export const Carregando = {
  name: "Carregando o registro a editar",
  render: () => <FormScreen title="Editar pessoa" onSubmit={() => {}} onCancel={() => {}} loading />,
};

export const ComCondicao = {
  name: "Com condição que vale para a tela inteira",
  parameters: { docs: { description: { story: "`banner` é para o que muda a leitura de **todos** os campos — registro arquivado, edição bloqueada, credencial vencida. Erro de um campo continua sendo `Toast`." } } },
  render: () => (
    <FormScreen
      title="Editar pessoa"
      banner={<Banner tone="warning">Esta pessoa está <b>arquivada</b>. Alterações só passam a valer se você reativá-la.</Banner>}
      onSubmit={() => {}}
      onCancel={() => {}}
      extraActions={<Button type="button" variant="secondary">Reativar</Button>}
    >
      <Campos />
    </FormScreen>
  ),
};

export const Erro = {
  name: "Erro ao carregar",
  render: () => <FormScreen title="Editar pessoa" onSubmit={() => {}} error={{ message: "O registro não foi encontrado ou foi removido.", onRetry: () => {} }} />,
};
