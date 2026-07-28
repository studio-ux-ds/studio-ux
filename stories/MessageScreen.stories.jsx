import React from "react";
import { MessageScreen, Button, DSIcon } from "@studio-ux-ds/react";

export default {
  title: "Padrões/MessageScreen",
  component: MessageScreen,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Materialização React do molde **`empty` de tela inteira** (TEMPLATES §2) — o lugar onde o sistema diz que **não há o que mostrar aqui**, e por quê.\n\nOs casos são os mesmos em qualquer produto: endereço que não existe, acesso que a pessoa não tem, recurso removido, erro inesperado.\n\n**A regra que ele carrega: nenhum desses casos redireciona em silêncio.** Mandar a pessoa para a home sem dizer nada é o pior desfecho — ela conclui que o sistema travou ou que o clique não pegou, e tenta de novo. Dizer o que aconteceu, em uma frase, e oferecer a saída, custa uma tela." } },
  },
};

const marca = (
  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--su-text-muted)" }}>
    <DSIcon name="spark" size="sm" /><span style={{ fontSize: 13 }}>Acme</span>
  </div>
);

const saida = (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
    <Button variant="secondary" icon="arrow-left">Voltar</Button>
    <Button variant="primary" icon="home">Ir para o início</Button>
  </div>
);

export const NaoEncontrado = {
  name: "Endereço que não existe",
  args: {
    icon: "search",
    title: "Este endereço não existe",
    description: 'Não há nada em "/relatorios/antigo". Pode ser um link antigo, um endereço digitado com erro, ou uma tela que mudou de lugar.',
    action: saida,
    above: marca,
  },
};

export const SemPermissao = {
  name: "Acesso que a pessoa não tem",
  parameters: {
    docs: { description: { story: "O endereço existe — some **o acesso**, não a tela. Dizer isso evita que a pessoa ache que o sistema quebrou, e diz a ela exatamente o que pedir a quem administra." } },
  },
  args: {
    icon: "lock",
    title: "Você não tem acesso a esta tela",
    description: "O endereço existe, mas o seu perfil de acesso não inclui esta parte do sistema. Se você precisa dela, peça a quem administra a organização para incluir a permissão no seu perfil.",
    action: saida,
    above: marca,
  },
};

export const Erro = {
  name: "Erro inesperado",
  parameters: {
    docs: { description: { story: "Falha que impede a tela de existir. A saída aqui é **tentar de novo** — e o texto não expõe a mensagem técnica, que vive no log." } },
  },
  args: {
    icon: "alert-triangle",
    title: "Não foi possível carregar esta tela",
    description: "Algo falhou do nosso lado. Tentar de novo costuma resolver; se insistir, avise quem administra o sistema.",
    action: <Button variant="primary" icon="refresh">Tentar de novo</Button>,
  },
};
