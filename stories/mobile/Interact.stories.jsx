import React, { useState } from "react";
import { SwipeableRow, ScannerFrame, List, ListItem } from "@studio-ux-ds/react/mobile";
import { Avatar, Badge } from "@studio-ux-ds/react";

const Phone = ({ children, height = 520 }) => (
  <div style={{
    width: 390, minHeight: height, margin: "0 auto",
    background: "var(--su-surface-base)",
    border: "1px solid var(--su-border-subtle)",
    borderRadius: "var(--su-radius-xl)",
    padding: "var(--su-space-3)",
    overflow: "hidden",
  }}>{children}</div>
);

export default {
  title: "Mobile-web/Interação",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Interações específicas do toque no mobile-web. **Regra permanente:** gesto **sempre** tem alternativa (P19) — `SwipeableRow` aceita `onLongPress` e recomenda menu \"...\" duplicando as ações; `ScannerFrame` sempre oferece `onManual` (digitação)." } },
  },
};

export const Swipe = {
  name: "SwipeableRow (arrastar para ações)",
  parameters: { docs: { description: { story: "Arraste a linha para a esquerda (**touch**) para revelar as ações. Como o Storybook roda em desktop, o gesto só funciona num viewport de toque; ainda assim a story mostra o layout e as ações. O `tone` da ação (`\"charge\" | \"delete\"`) tinge o fundo pela semântica." } } },
  render: () => {
    function Demo() {
      const [ultima, setUltima] = useState(null);
      return (
        <Phone>
          <p style={{ fontSize: 13, color: "var(--su-text-muted)", marginTop: 0 }}>
            Toque numa linha e arraste para a esquerda para ver as ações.
          </p>
          <List>
            {[
              { id: 1, nome: "Acme Ltda", meta: "R$ 2.400/mês", status: <Badge status="success">Ativo</Badge> },
              { id: 2, nome: "Globex", meta: "R$ 380/mês", status: <Badge status="warning">Pendente</Badge> },
              { id: 3, nome: "Umbrella", meta: "sem plano", status: <Badge status="danger">Bloqueado</Badge> },
            ].map((r) => (
              <SwipeableRow
                key={r.id}
                onLongPress={() => setUltima(`long-press em ${r.nome}`)}
                actions={[
                  { label: "Cobrar", tone: "charge", icon: "credit-card", onClick: () => setUltima(`cobrar ${r.nome}`) },
                  { label: "Excluir", tone: "delete", icon: "trash", onClick: () => setUltima(`excluir ${r.nome}`) },
                ]}
              >
                <ListItem
                  avatar={<Avatar initials={r.nome.slice(0, 2).toUpperCase()} size="sm" />}
                  title={r.nome}
                  subtitle={r.meta}
                  end={{ status: r.status }}
                />
              </SwipeableRow>
            ))}
          </List>
          {ultima && (
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--su-text-secondary)" }}>
              Última ação: <strong>{ultima}</strong>
            </p>
          )}
        </Phone>
      );
    }
    return <Demo />;
  },
};

export const Scanner = {
  name: "ScannerFrame (moldura de câmera)",
  parameters: { docs: { description: { story: "A moldura + overlay. A câmera de verdade (`getUserMedia`/`<video>`) é do produto consumidor e entra em `camera`; aqui simulamos com um fundo. O botão **Digitar código manualmente** vem sempre (P19)." } } },
  render: () => {
    function Demo() {
      const [manual, setManual] = useState(false);
      const fakeCam = (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, var(--su-surface-sunken), var(--su-surface-base))",
        }} />
      );
      return (
        <Phone height={480}>
          <div style={{ position: "relative", height: 460, borderRadius: "var(--su-radius-lg)", overflow: "hidden" }}>
            <ScannerFrame
              camera={fakeCam}
              hint="Aponte para o código de barras da conta"
              onManual={() => setManual(true)}
            />
          </div>
          {manual && (
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--su-text-secondary)" }}>
              Alternativa manual acionada — o produto abre um `Sheet` para digitação.
            </p>
          )}
        </Phone>
      );
    }
    return <Demo />;
  },
};
