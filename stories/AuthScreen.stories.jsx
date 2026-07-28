import React, { useState } from "react";
import { AuthScreen, AuthLink, Field, Input, Button, Checkbox, DSIcon } from "@studio-ux-ds/react";

export default {
  title: "Padrões/AuthScreen",
  component: AuthScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Materialização React do molde de tela **`login`** (TEMPLATES §2). Duas regiões: o **painel de marca** (à esquerda, só a partir de 900px) onde o produto diz o que é, e o **formulário** (380px) onde a pessoa age.\n\n**O painel só é renderizado quando há conteúdo para ele.** Sem `welcome`/`pitch`/`features`, o molde centra o formulário na tela — que é o arranjo certo para **passo obrigatório** (aceitar convite, redefinir senha), onde não há o que argumentar.\n\nO molde decide **arranjo**; o produto decide **conteúdo** — quais campos, o que dizer, e se existe entrada por provedor externo. Erro de credencial é **genérico** de propósito: dizer \"este e-mail não existe\" conta a um estranho quais endereços têm conta." } },
  },
};

const marca = { name: "Acme", logo: <DSIcon name="spark" size="sm" /> };

/** Entrar — o caso com painel completo. */
export const Entrar = {
  name: "Entrar (com painel de marca)",
  render: () => {
    const [manter, setManter] = useState(true);
    return (
      <AuthScreen
        brand={marca}
        welcome="Bem-vindo de volta."
        pitch="Tudo o que a operação precisa num só lugar. Entre para continuar de onde parou."
        features={[
          { icon: "bot", label: "Assistentes que atendem sozinhos, com aprovação quando precisa" },
          { icon: "shield", label: "Acesso por perfil e trilha de auditoria" },
          { icon: "phone", label: "Funciona no computador e no celular" },
        ]}
        footer="© 2026 Acme · Todos os direitos reservados"
        title="Entrar na sua conta"
        subtitle="Use o e-mail cadastrado pela sua organização."
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="E-mail">
            <Input type="email" placeholder="voce@empresa.com" autoComplete="username" />
          </Field>
          <Field label="Senha">
            <Input type="password" placeholder="••••••••" autoComplete="current-password" />
            {/* O link auxiliar não promete o que não existe: se não há recuperação
                por e-mail, ele diz quem redefine. */}
            <AuthLink href="#" onClick={(e) => e.preventDefault()}>Esqueci a senha?</AuthLink>
          </Field>
          <Checkbox label="Manter conectado neste dispositivo" checked={manter} onChange={(e) => setManter(e.target.checked)} />
          <Button type="submit" variant="primary" size="lg" block>Entrar</Button>
        </form>
      </AuthScreen>
    );
  },
};

/** Passo obrigatório — sem painel. */
export const PassoObrigatorio = {
  name: "Aceitar convite (sem painel)",
  parameters: {
    docs: { description: { story: "Quem chega aqui já foi convidado e só precisa escolher uma senha. Painel com argumento de venda no meio de um passo obrigatório é ruído — então não se passa `welcome`/`pitch`/`features` e o molde centra o formulário sozinho." } },
  },
  render: () => (
    <AuthScreen
      brand={marca}
      title="Criar o seu acesso"
      subtitle="Você foi convidado. Escolha uma senha para entrar."
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Seu nome"><Input placeholder="Nome completo" /></Field>
        <Field label="Senha" hint="Pelo menos 8 caracteres."><Input type="password" placeholder="••••••••" autoComplete="new-password" /></Field>
        <Field label="Repita a senha"><Input type="password" placeholder="••••••••" autoComplete="new-password" /></Field>
        <Button type="submit" variant="primary" size="lg" block>Criar meu acesso</Button>
      </form>
    </AuthScreen>
  ),
};
