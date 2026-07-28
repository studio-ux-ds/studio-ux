import React, { useState } from "react";
import { WizardScreen, FormGrid, Field, Input, Select, DescriptionList, CheckGroup, Radio } from "@studio-ux-ds/react";

export default {
  title: "Padrões/WizardScreen",
  component: WizardScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Molde **`wizard`** (TEMPLATES §2, deriva de PATTERNS): o **passo a passo**, quando uma decisão depende da anterior.\n\n**Quando NÃO usar — a parte que mais economiza retrabalho.** Se todos os campos são independentes, um formulário de uma tela é melhor: o passo a passo esconde metade das perguntas e obriga a ir e voltar para conferir. Wizard só se paga quando **o passo seguinte muda conforme a resposta do anterior** (escolher o provedor define quais credenciais pedir) ou quando cada passo depende de uma ida ao servidor.\n\n**É uma rota, não um modal** — tem estado que ninguém quer perder por um clique fora. **Voltar é sempre possível**, e sair de tudo também. **O botão do último passo diz o verbo** (\"Criar conexão\"), não \"Concluir\": é a única ação irreversível do fluxo. **`Avançar` desabilitado sem dizer por quê é o pior estado possível** — use `hint` junto." } },
  },
};

const PASSOS = [{ label: "Provedor" }, { label: "Credenciais" }, { label: "Revisão" }];

function Demo({ inicial = 1, ...props }) {
  const [passo, setPasso] = useState(inicial);
  const [provedor, setProvedor] = useState("");

  const conteudo = {
    1: (
      <>
        <p style={{ marginTop: 0, fontSize: 13, color: "var(--su-text-muted)" }}>
          O provedor define quais credenciais serão pedidas no próximo passo — por isso a escolha vem antes.
        </p>
        <CheckGroup columns={2}>
          {["Altarede", "IXC", "Genérico (HTTP)"].map((p) => (
            <Radio key={p} variant="card" name="prov" label={p} meta={p === "Genérico (HTTP)" ? "Para quando o ERP não tem integração pronta." : "Integração pronta."} checked={provedor === p} onChange={() => setProvedor(p)} />
          ))}
        </CheckGroup>
      </>
    ),
    2: (
      <FormGrid columns={2}>
        <Field label="Endereço do servidor" required><Input placeholder="https://erp.suaempresa.com.br" /></Field>
        <Field label="Usuário" required><Input /></Field>
        <Field label="Senha" required><Input type="password" /></Field>
        <Field label="Ambiente"><Select><option>Produção</option><option>Homologação</option></Select></Field>
      </FormGrid>
    ),
    3: (
      <DescriptionList
        items={[
          { key: "Provedor", value: provedor || "Altarede" },
          { key: "Endereço", value: "https://erp.suaempresa.com.br" },
          { key: "Usuário", value: "integracao" },
          { key: "Ambiente", value: "Produção" },
        ]}
      />
    ),
  }[passo];

  return (
    <WizardScreen
      back={{ label: "Sair", onClick: () => {} }}
      title="Nova conexão"
      subtitle="Três passos. Nada é criado até o último."
      steps={PASSOS}
      current={passo}
      onBack={() => setPasso((p) => Math.max(1, p - 1))}
      onNext={() => setPasso((p) => Math.min(PASSOS.length, p + 1))}
      nextLabel={passo === PASSOS.length ? "Criar conexão" : undefined}
      {...props}
    >
      {conteudo}
    </WizardScreen>
  );
}

export const Passo1 = { name: "Passo 1 — a escolha que muda o resto", render: () => <Demo inicial={1} /> };
export const Passo2 = { name: "Passo 2 — campos do provedor escolhido", render: () => <Demo inicial={2} /> };
export const UltimoPasso = {
  name: "Último passo — o botão diz o verbo",
  parameters: { docs: { description: { story: "\"Concluir\" não diz o que vai acontecer. O último passo é a única ação irreversível do fluxo, então o botão nomeia o efeito: **Criar conexão**." } } },
  render: () => <Demo inicial={3} />,
};
export const Bloqueado = {
  name: "Avançar bloqueado — com o motivo",
  parameters: { docs: { description: { story: "Botão desabilitado e mudo é o pior estado possível: a pessoa fica clicando sem entender. O `hint` diz o que falta." } } },
  render: () => <Demo inicial={1} nextDisabled hint="Escolha um provedor para continuar." />,
};
export const Trabalhando = {
  name: "Executando o passo (ida ao servidor)",
  render: () => <Demo inicial={2} working />,
};
