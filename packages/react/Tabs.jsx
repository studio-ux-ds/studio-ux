import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Tabs — .su-tabs (folder) / .su-tabs--pills. Controlado por value/onChange.
 * @param {{id:string,label:string,icon?:string}[]} items
 * @param {"folder"|"pills"} [variant]
 */
export function Tabs({ items, value, onChange, variant = "folder", className = "" }) {
  const rootCls = ["su-tabs", variant === "pills" && "su-tabs--pills", className].filter(Boolean).join(" ");

  // Item sem `id` é a falha silenciosa mais cara deste componente: as abas
  // aparecem (o `label` está lá), mas `value === it.id` nunca casa e o
  // `onChange` devolve `undefined` — clicar em qualquer aba **esvazia a tela**,
  // porque nenhum bloco `tab === '…'` do consumidor renderiza. Nada quebra, nada
  // avisa, e o sintoma (conteúdo em branco) parece problema de dado ou de
  // permissão. O erro típico é declarar `{ value, label }` copiando o nome da
  // prop da aba ativa. Avisa e segue: quebrar o render seria pior.
  if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
    const semId = (items || []).filter((it) => it && it.id === undefined).length;
    if (semId) {
      console.warn(
        `[studio-ux] Tabs: ${semId} item(ns) sem "id" — o item é identificado por "id" ` +
        `(\`items={[{ id, label }]}\`); "value" é a prop da aba ATIVA. Sem "id", clicar numa aba ` +
        `devolve undefined e o conteúdo some.`,
      );
    }
  }
  return (
    <div className={rootCls} role="tablist">
      {items.map((it) => (
        <button
          key={it.id}
          role="tab"
          aria-selected={value === it.id}
          className={["su-tab", value === it.id && "su-tab--active"].filter(Boolean).join(" ")}
          onClick={() => onChange && onChange(it.id)}
        >
          {it.icon && <DSIcon name={it.icon} />} {it.label}
        </button>
      ))}
    </div>
  );
}
