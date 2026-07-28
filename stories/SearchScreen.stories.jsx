import React, { useState } from "react";
import { SearchScreen, Badge, DSIcon } from "@studio-ux-ds/react";

export default {
  title: "Padrões/SearchScreen",
  component: SearchScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Molde **`search`** (TEMPLATES §2, deriva de PATTERNS): a tela em que **procurar é a razão de existir**.\n\nNão confundir com a busca de uma lista: ali a busca **filtra** um conjunto que já está na tela e mora na Toolbar do `ListScreen`. Aqui a tela **começa vazia** e só existe conteúdo depois que alguém pergunta.\n\n**O campo nunca é desmontado** — trocar de estado remontando o campo faz o foco pular e o próximo caractere se perder. **Três vazios, três textos:** *ainda não perguntou* (convite), *nada encontrado* (o que tentar agora), *erro* (tentar de novo); colapsar os três em \"Nenhum resultado\" faz a tela recém-aberta parecer quebrada. **O indicador de \"procurando\" fica no campo**, para que o resultado anterior continue legível." } },
  },
};

const BASE = [
  { id: 1, titulo: "Contrato de adesão — Torre 3", tipo: "Documento", onde: "Contratos" },
  { id: 2, titulo: "Fabricia Marques", tipo: "Pessoa", onde: "Equipe" },
  { id: 3, titulo: "Fatura 2026-07 — Pratinha", tipo: "Cobrança", onde: "Financeiro" },
];

function Resultado({ r }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "var(--su-space-3) 0", borderTop: "1px solid var(--su-border-subtle)" }}>
      <DSIcon name={r.tipo === "Pessoa" ? "user" : r.tipo === "Cobrança" ? "coin" : "file-text"} style={{ color: "var(--su-text-muted)" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500 }}>{r.titulo}</div>
        <div style={{ fontSize: 12, color: "var(--su-text-muted)" }}>{r.onde}</div>
      </div>
      <Badge tone="neutral">{r.tipo}</Badge>
    </div>
  );
}

function Demo({ inicial = "", ...props }) {
  const [q, setQ] = useState(inicial);
  const [escopo, setEscopo] = useState("tudo");
  const achados = q.trim() ? BASE.filter((r) => r.titulo.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <SearchScreen
      title="Buscar"
      subtitle="Procure em contratos, pessoas e cobranças ao mesmo tempo."
      query={q}
      onQuery={setQ}
      scopes={[{ id: "tudo", label: "Tudo" }, { id: "docs", label: "Documentos" }, { id: "pessoas", label: "Pessoas" }]}
      scope={escopo}
      onScope={setEscopo}
      resultCount={achados.length}
      summary={`${achados.length} resultado(s) para "${q}"`}
      {...props}
    >
      <div>{achados.map((r) => <Resultado key={r.id} r={r} />)}</div>
    </SearchScreen>
  );
}

export const AindaNaoPerguntou = { name: "Ainda não perguntou (convite)", render: () => <Demo /> };
export const ComResultados = { name: "Com resultados", render: () => <Demo inicial="a" /> };
export const NadaEncontrado = { name: "Nada encontrado", render: () => <Demo inicial="zzzz" /> };
export const Procurando = {
  name: "Procurando",
  parameters: { docs: { description: { story: "O `Spinner` fica **no campo**. Se ele ocupasse o lugar dos resultados, cada tecla apagaria o que a pessoa está lendo." } } },
  render: () => <Demo inicial="contrato" searching />,
};
export const Erro = { name: "A busca falhou", render: () => <Demo inicial="contrato" error={{ message: "O índice de busca está sendo reconstruído.", onRetry: () => {} }} /> };
