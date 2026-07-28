import React from "react";
import { FormGrid, Field, Input, Select, TextArea, NumericInput, Button, Card } from "@studio-ux-ds/react";

export default {
  title: "Formulário/FormGrid",
  component: FormGrid,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "O **arranjo** de um formulário: distribui os campos em colunas por `auto-fill` + `minmax`, **sem media query** — o navegador encaixa quantas couberem e cai para uma em tela estreita.\n\nTrês regras que valem decorar:\n\n1. **`columns` é TETO, não quantidade fixa.** `columns={3}` numa área estreita vira 2, depois 1.\n2. **Alinha pelo TOPO.** Campo com dica é mais alto; alinhar pela base empurra o controle de quem tem dica para cima e a linha fica torta.\n3. **O grid NÃO limita a própria largura.** Ele preenche o container — largura de leitura é decisão de quem põe o formulário na tela (o card, a página). Embutir um teto aqui produziu o defeito oposto: uma faixa estreita encostada à esquerda de um card largo, e `columns={3}` quebrando em 2+1.\n\nCampo do que se **escreve** (texto longo, JSON, lista) leva `<Field wide>` e ocupa a linha inteira: meia largura vira uma coluna estreita e alta onde o olho perde a linha.\n\nNasceu de 20 grids montados à mão em 12 arquivos, com 16 larguras máximas diferentes." } },
  },
};

export const Cadastro = {
  name: "Cadastro (columns={2})",
  render: () => (
    <Card>
      <FormGrid columns={2}>
        <Field label="Nome" required><Input placeholder="Nome completo" /></Field>
        <Field label="E-mail" required hint="É por aqui que a pessoa entra no sistema."><Input type="email" placeholder="voce@empresa.com" /></Field>
        <Field label="Perfil de acesso"><Select><option>Administrador</option><option>Operador</option></Select></Field>
        <Field label="Limite mensal" hint="Em reais."><NumericInput fullWidth placeholder="0" /></Field>
        {/* O que se ESCREVE ocupa a linha inteira. */}
        <Field label="Observações" wide><TextArea rows={4} placeholder="Contexto que ajuda quem for atender…" /></Field>
      </FormGrid>
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="primary">Salvar</Button>
      </div>
    </Card>
  ),
};

export const TetoNaoGarantia = {
  name: "columns é TETO — o mesmo grid em duas larguras",
  parameters: {
    docs: { description: { story: "O mesmo `columns={3}` em 900px e em 420px. Nenhuma media query no consumidor: o grid encaixa quantas colunas couberem." } },
  },
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {[900, 420].map((w) => (
        <div key={w}>
          <div style={{ fontSize: 12, color: "var(--su-text-muted)", marginBottom: 8, fontFamily: "var(--su-font-mono)" }}>{w}px</div>
          <div style={{ width: w, maxWidth: "100%", border: "1px dashed var(--su-border-default)", padding: 16, borderRadius: 8 }}>
            <FormGrid columns={3}>
              <Field label="Cidade"><Input /></Field>
              <Field label="Estado"><Input /></Field>
              <Field label="CEP"><Input /></Field>
            </FormGrid>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const LinhaDeBusca = {
  name: "Linha de busca",
  parameters: {
    docs: { description: { story: "Numa linha de busca, a dica de um campo vira **`placeholder`**, não `hint` — a dica embaixo cresce aquela coluna e desalinha a linha. E o botão fica **dentro** do campo: como item do grid ele precisaria de uma coluna inteira e de alinhamento especial (não tem etiqueta em cima), e a linha quebraria antes numa tela média." } },
  },
  render: () => (
    <FormGrid columns={3}>
      <Field label="Buscar"><Input placeholder="Nome, e-mail ou documento" /></Field>
      <Field label="Situação"><Select><option>Todas</option><option>Ativas</option></Select></Field>
      <Field label="Período"><Input type="date" /></Field>
    </FormGrid>
  ),
};
