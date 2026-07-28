import React from "react";
import { FormRow, Field, Input, Select, NumericInput, Button, Card, Badge } from "@studio-ux-ds/react";

export default {
  title: "Formulário/FormRow",
  component: FormRow,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "A **linha de ação** de um formulário: um ou mais campos e um botão que age sobre eles, lado a lado. \"Adicionar pessoa à equipe\", \"incluir uma variável\", \"consultar\".\n\nExiste porque essa linha era montada à mão em todo consumidor, sempre com o mesmo `flex items-end gap-2` — e sempre com os mesmos três defeitos:\n\n1. **`items-end` alinha pela BASE da caixa, não pelo controle.** Um campo com dica é mais alto que o vizinho, então alinhar por baixo empurra o controle de quem tem dica para cima e joga o botão para a altura do texto da dica.\n2. **`flex: 1` num campo faz ele esticar até onde o cartão for** — num cartão largo, um seletor de nomes vira uma faixa de 1200px.\n3. **A dica embaixo empurra a linha** — a mesma armadilha do `FormGrid`, agravada pelo botão junto.\n\nComo resolve: os campos alinham pelo **topo** (a dica pende abaixo do próprio campo) e a ação carrega uma **etiqueta fantasma** — um rótulo invisível com exatamente a altura de um rótulo real. O botão fica na linha dos controles **por medição, não por número mágico**; se a tipografia mudar, o alinhamento acompanha.\n\nO campo principal leva `<Field grow>`: cresce até um teto de leitura, em vez de ocupar a linha inteira.\n\n**Quando NÃO usar:** no corpo do formulário (é `FormGrid`); numa linha de busca, onde o botão vai **dentro** do campo; para duas ações sem campo (é só um `<div>`)." } },
  },
};

export const OCasoQueOOriginou = {
  name: "O caso real: campo + campo curto com dica + botão",
  parameters: {
    docs: { description: { story: "É o \"adicionar pessoa à equipe\" que expôs o problema: o campo do meio tem dica, o principal esticava até a borda, e o botão descia para a altura do texto da dica." } },
  },
  render: () => (
    <Card>
      <FormRow action={<Button variant="secondary" icon="user-plus">Adicionar</Button>}>
        <Field grow label="Adicionar pessoa">
          <Select defaultValue=""><option value="">Escolha…</option><option>Admin Demo</option><option>Fabricia Marques</option></Select>
        </Field>
        <Field label="Como" hint="Supervisor enxerga tudo da equipe.">
          <Select defaultValue="MEMBER"><option value="MEMBER">Atende</option><option value="SUPERVISOR">Supervisiona</option></Select>
        </Field>
      </FormRow>
    </Card>
  ),
};

export const LadoALado = {
  name: "Comparação — à mão x FormRow",
  parameters: {
    docs: { description: { story: "O de cima é o `flex items-end gap-3` que existia em cinco telas. Repare no controle do campo com dica, mais alto que o vizinho, e no botão descolado da linha." } },
  },
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, color: "var(--su-text-muted)", marginBottom: 8 }}>À mão (<code>flex items-end</code>) — torto:</div>
        <Card>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <Field label="Adicionar pessoa"><Select defaultValue=""><option>Escolha…</option></Select></Field>
            </div>
            <div style={{ width: 180 }}>
              <Field label="Como" hint="Supervisor enxerga tudo da equipe."><Select><option>Atende</option></Select></Field>
            </div>
            <Button variant="secondary" icon="user-plus">Adicionar</Button>
          </div>
        </Card>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "var(--su-text-muted)", marginBottom: 8 }}><code>FormRow</code> — alinhado:</div>
        <Card>
          <FormRow action={<Button variant="secondary" icon="user-plus">Adicionar</Button>}>
            <Field grow label="Adicionar pessoa"><Select defaultValue=""><option>Escolha…</option></Select></Field>
            <Field label="Como" hint="Supervisor enxerga tudo da equipe."><Select><option>Atende</option></Select></Field>
          </FormRow>
        </Card>
      </div>
    </div>
  ),
};

export const TresCampos = {
  name: "Três campos + ação",
  render: () => (
    <Card>
      <FormRow action={<Button variant="secondary" icon="plus">Incluir</Button>}>
        <Field grow label="Login ou CPF"><Input /></Field>
        <Field label="Nome"><Input /></Field>
        <Field label="Telefone"><Input /></Field>
      </FormRow>
    </Card>
  ),
};

export const AcaoDeIcone = {
  name: "Ação de ícone (remover a linha)",
  parameters: {
    docs: { description: { story: "Quando a ação é uma lixeira, o alinhamento errado costumava ser \"corrigido\" com um `marginBottom: 1` cravado à mão — sinal clássico de que o arranjo estava errado, não o botão." } },
  },
  render: () => (
    <Card>
      <FormRow action={<Button variant="ghost" icon="trash" aria-label="Remover este par" />}>
        <Field grow label="Departamento"><Select><option>Selecione…</option></Select></Field>
        <Field grow label="Assunto"><Select><option>Selecione…</option></Select></Field>
      </FormRow>
    </Card>
  ),
};

export const SemRotulo = {
  name: "Linha sem rótulos (labels={false})",
  parameters: {
    docs: { description: { story: "Sem etiqueta nos campos, não há o que acompanhar — `labels={false}` tira o deslocamento da ação." } },
  },
  render: () => (
    <Card>
      <FormRow labels={false} action={<Button variant="secondary" icon="search">Filtrar</Button>}>
        <Field grow><Input placeholder="Buscar por nome ou documento" /></Field>
        <Field><NumericInput defaultValue={10} min={1} step={1} fullWidth /></Field>
      </FormRow>
    </Card>
  ),
};

export const ComValorFixo = {
  name: "Com um valor de leitura na linha",
  render: () => (
    <Card>
      <FormRow action={<Button variant="secondary" icon="search">Filtrar</Button>}>
        <Field label="Escopo"><Badge tone="info">Por contato</Badge></Field>
        <Field grow label="Filtrar por chave de escopo"><Input placeholder="ID do contato / da sessão…" /></Field>
      </FormRow>
    </Card>
  ),
};
