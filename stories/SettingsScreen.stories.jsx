import React, { useState } from "react";
import { SettingsScreen, SettingsSection, FormGrid, Field, Input, Select, Switch, Checkbox, CheckGroup } from "@studio-ux-ds/react";

export default {
  title: "Padrões/SettingsScreen",
  component: SettingsScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Molde **`settings`** (TEMPLATES §2, deriva de FORMS): **configuração**, que é um formulário com outra ergonomia. Cabeçalho → `Tabs` **pills** (é sub-navegação dentro de um assunto, não a aba principal de um registro) → seções → ações.\n\n**Ajuste é linguagem do usuário (P11), sem exceção** — é a tela onde o jargão mais aparece, porque cada opção tem um nome técnico no banco.\n\n**Duas ergonomias, e a escolha não é de gosto:** ajuste de **efeito imediato** (um `Switch` que liga algo agora) **não tem Salvar** — mudou, valeu, e o retorno é `Toast`; ajuste que **só vale em conjunto** (dados da empresa, credenciais) tem Salvar. Misturar os dois na mesma seção é o que faz alguém mexer num toggle e depois clicar em Cancelar achando que desfez.\n\n**Cada seção diz o que muda** — ajuste sem consequência declarada vira tentativa e erro em produção." } },
  },
};

const abas = [
  { id: "geral", label: "Geral" },
  { id: "atendimento", label: "Atendimento" },
  { id: "avisos", label: "Avisos" },
];

export const ComSalvar = {
  name: "Ajustes que só valem em conjunto (com Salvar)",
  render: () => {
    const [tab, setTab] = useState("geral");
    const [dirty, setDirty] = useState(false);
    return (
      <SettingsScreen
        title="Ajustes"
        subtitle="Valem para toda a organização."
        tabs={abas}
        tab={tab}
        onTab={setTab}
        onSave={() => setDirty(false)}
        onCancel={() => setDirty(false)}
        dirty={dirty}
      >
        <SettingsSection title="Identificação" description="É o nome que aparece nos e-mails e documentos que o sistema envia em seu nome.">
          <FormGrid columns={2}>
            <Field label="Nome da empresa"><Input defaultValue="Acme Provedor" onChange={() => setDirty(true)} /></Field>
            <Field label="Endereço público" hint="Usado nos links que vão para o cliente."><Input defaultValue="https://acme.com.br" onChange={() => setDirty(true)} /></Field>
          </FormGrid>
        </SettingsSection>
        <SettingsSection title="Fuso e formato" description="Muda como as datas aparecem em todas as telas e nos relatórios exportados.">
          <FormGrid columns={2}>
            <Field label="Fuso horário"><Select onChange={() => setDirty(true)}><option>América/São Paulo</option><option>América/Manaus</option></Select></Field>
            <Field label="Primeiro dia da semana"><Select onChange={() => setDirty(true)}><option>Domingo</option><option>Segunda</option></Select></Field>
          </FormGrid>
        </SettingsSection>
      </SettingsScreen>
    );
  },
};

export const EfeitoImediato = {
  name: "Ajustes de efeito imediato (sem Salvar)",
  parameters: { docs: { description: { story: "Sem `onSave` o molde **não renderiza as ações** — e isso é a decisão certa, não uma omissão: um `Switch` que já ligou a coisa não pode conviver com um \"Cancelar\" que sugere que dá para desfazer. O retorno de cada mudança é `Toast`." } } },
  render: () => {
    const [tab, setTab] = useState("atendimento");
    const [ia, setIa] = useState(true);
    const [fora, setFora] = useState(false);
    return (
      <SettingsScreen title="Ajustes" tabs={abas} tab={tab} onTab={setTab}>
        <SettingsSection
          title="Atendimento automático"
          description="Quando um cliente escreve e ninguém da equipe está conduzindo aquela conversa, o assistente responde sozinho. Se um atendente humano assumir, o assistente fica quieto."
        >
          <Switch checked={ia} onChange={setIa} aria-label="Ligar o atendimento automático" />
        </SettingsSection>
        <SettingsSection
          title="Fora do horário"
          description="Fora do expediente, avisa o cliente de quando alguém volta a responder — em vez de deixar a mensagem sem resposta até o dia seguinte."
        >
          <Switch checked={fora} onChange={setFora} aria-label="Avisar fora do horário" />
        </SettingsSection>
      </SettingsScreen>
    );
  },
};

export const ComOpcoes = {
  name: "Seção com grade de opções",
  render: () => (
    <SettingsScreen title="Ajustes" tabs={abas} tab="avisos" onTab={() => {}} onSave={() => {}} onCancel={() => {}}>
      <SettingsSection title="Quando avisar" description="Escolha o que gera um aviso para a sua equipe. Vale só para você.">
        <CheckGroup columns={2}>
          <Checkbox label="Conversa nova sem dono" defaultChecked />
          <Checkbox label="Cliente respondeu" defaultChecked />
          <Checkbox label="Cobrança venceu" />
          <Checkbox label="Falha em automação" defaultChecked />
        </CheckGroup>
      </SettingsSection>
    </SettingsScreen>
  ),
};

export const Carregando = { name: "Carregando", render: () => <SettingsScreen title="Ajustes" tabs={abas} tab="geral" onTab={() => {}} onSave={() => {}} loading /> };
