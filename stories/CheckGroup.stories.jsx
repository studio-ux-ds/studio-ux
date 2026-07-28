import React, { useState } from "react";
import { CheckGroup, Checkbox, Radio, Card } from "@studio-ux-ds/react";

export default {
  title: "Formulário/CheckGroup",
  component: CheckGroup,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "A **grade de opções** — o container de um conjunto de `Checkbox`/`Radio`. Existe para que ninguém monte a grade à mão com o framework de CSS da vez, que foi como cada tela acabou com um número de colunas diferente.\n\n`columns` numérico é **teto** (`2`, `3`, `4`); `\"auto\"` (padrão) encaixa quantas couberem. Em tela estreita cai para uma coluna sozinho, sem media query no consumidor.\n\nUse junto com `variant=\"card\"` do `Checkbox`/`Radio` quando a opção tem explicação ou condição própria — aí ela ganha moldura, e a condição vai no `meta`, não no meio do rótulo." } },
  },
};

export const Simples = {
  name: "Opções curtas (columns={3})",
  render: () => (
    <CheckGroup columns={3}>
      {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((d) => (
        <Checkbox key={d} label={d} defaultChecked={!["Sábado", "Domingo"].includes(d)} />
      ))}
    </CheckGroup>
  ),
};

export const EmCard = {
  name: "Opção em card (quando a opção tem explicação)",
  parameters: {
    docs: { description: { story: "Quando cada opção precisa de uma frase para ser entendida, o rótulo sozinho vira um parágrafo dentro da linha. `variant=\"card\"` dá moldura à opção e o `meta` carrega a condição — que é informação **sobre** a escolha, não parte do nome dela." } },
  },
  render: () => {
    const [sel, setSel] = useState("aprovar");
    return (
      <CheckGroup columns={2}>
        <Radio
          variant="card"
          name="politica"
          label="Pedir aprovação"
          meta="A ação fica pendente até alguém com permissão aprovar. Mais lento, e é o padrão para o que mexe em dinheiro."
          checked={sel === "aprovar"}
          onChange={() => setSel("aprovar")}
        />
        <Radio
          variant="card"
          name="politica"
          label="Executar direto"
          meta="A ação acontece na hora, dentro do escopo do assistente. Registrada na auditoria de qualquer forma."
          checked={sel === "direto"}
          onChange={() => setSel("direto")}
        />
      </CheckGroup>
    );
  },
};

export const Auto = {
  name: 'columns="auto" em larguras diferentes',
  render: () => (
    <div style={{ display: "grid", gap: 20 }}>
      {[720, 360].map((w) => (
        <div key={w}>
          <div style={{ fontSize: 12, color: "var(--su-text-muted)", marginBottom: 8, fontFamily: "var(--su-font-mono)" }}>{w}px</div>
          <Card style={{ width: w, maxWidth: "100%" }}>
            <CheckGroup>
              {["Leitura", "Escrita", "Exclusão", "Exportação", "Aprovação"].map((p) => (
                <Checkbox key={p} label={p} />
              ))}
            </CheckGroup>
          </Card>
        </div>
      ))}
    </div>
  ),
};
