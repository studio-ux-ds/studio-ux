import React from "react";
import { CopyButton, Card, DescriptionList } from "@studio-ux-ds/react";

export default {
  title: "Fundamentais/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "\"Valor técnico + botão de copiar\" é um par recorrente — chave de API, id de conexão, linha digitável, token. Existe como componente porque copiar são **três** coisas, e cada tela acertava a primeira e esquecia as outras:\n\n1. o `try/catch` da Clipboard API;\n2. o **fallback** para contexto sem ela (`http://` que não seja localhost, WebView antiga) — sem isso o clique não faz nada **e não diz nada**;\n3. a confirmação.\n\nA confirmação é **no próprio botão** (o ícone vira ✓ e o rótulo vira \"Copiado\" por 2 s), não em toast no canto: o olho já está no botão que acabou de clicar, e um toast a 40cm dali para dizer \"copiado\" é ruído." } },
  },
};

export const Sozinho = {
  args: { value: "sk_live_51H8xR2KjM4nP", label: "Copiar" },
};

export const AoLadoDoValor = {
  name: "Ao lado do valor (o par típico)",
  render: () => (
    <Card>
      <DescriptionList
        items={[
          { key: "Identificador da conexão", value: (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <code style={{ fontFamily: "var(--su-font-mono)", fontSize: 12 }}>conn_9f3a1c7e</code>
              <CopyButton value="conn_9f3a1c7e" />
            </span>
          ) },
          { key: "Endereço do webhook", value: (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <code style={{ fontFamily: "var(--su-font-mono)", fontSize: 12 }}>https://api.exemplo.com/hooks/9f3a</code>
              <CopyButton value="https://api.exemplo.com/hooks/9f3a" />
            </span>
          ) },
        ]}
      />
    </Card>
  ),
};

export const ComRotulo = {
  name: "Com rótulo (quando é a ação principal do bloco)",
  parameters: {
    docs: { description: { story: "Quando copiar é o que a pessoa veio fazer — a chave que só aparece uma vez, a linha digitável do boleto — o botão ganha rótulo e deixa de ser ícone solitário (P17)." } },
  },
  args: { value: "34191.79001 01043.510047 91020.150008 6 98770000026035", label: "Copiar linha digitável", variant: "secondary", size: "md" },
};
