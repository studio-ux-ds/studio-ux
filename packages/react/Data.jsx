import React, { useState } from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * DescriptionList — a ficha de um registro (.su-dl). Tela de detalhe.
 *
 * Os pares se distribuem em grade: numa tela larga a ficha rende várias colunas
 * em vez de descer numa única fileira com a largura toda vazia ao lado. Quem
 * decide quantas colunas é o espaço, não uma media query — igual ao `FormGrid`.
 *
 * @param {{key:string, value:React.ReactNode, wide?:boolean}[]} items
 *        `wide` dá a linha inteira ao par — para observação, endereço, texto
 *        longo, que espremido numa coluna estica a altura de todas as outras.
 * @param {boolean} [rows]  Empilha em coluna única (rótulo ao lado do valor).
 *        Para resumo estreito, painel lateral ou confirmação curta.
 * @param {number|string} [min]  Piso de uma coluna (default 220px). Suba quando
 *        os valores forem longos e a ficha estiver quebrando cedo demais.
 */
export function DescriptionList({ items, rows = false, min, className = "", style, ...rest }) {
  const cls = ["su-dl", rows ? "su-dl--rows" : "", className].filter(Boolean).join(" ");
  const estilo = min ? { "--su-dl-min": typeof min === "number" ? `${min}px` : min, ...style } : style;
  return (
    <div className={cls} style={estilo} {...rest}>
      {items.map((it, i) => (
        <div className={`su-dl__row${it.wide ? " su-dl__row--wide" : ""}`} key={i}>
          <span className="su-dl__key">{it.key}</span>
          <span className="su-dl__val">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Timeline — histórico/auditoria (.su-timeline). Quem fez o quê, quando (P24).
 * @param {{title:React.ReactNode, meta?:string, active?:boolean}[]} items
 */
export function Timeline({ items }) {
  return (
    <div className="su-timeline">
      {items.map((it, i) => (
        <div className={["su-timeline__item", it.active && "su-timeline__item--active"].filter(Boolean).join(" ")} key={i}>
          <span className="su-timeline__dot" />
          <div className="su-timeline__title">{it.title}</div>
          {it.meta && <div className="su-timeline__meta">{it.meta}</div>}
        </div>
      ))}
    </div>
  );
}

/**
 * Pagination — `.su-pagination`. Controlado por `page`/`onChange`.
 *
 * Três coisas que a v1.2.20 não fazia e que impediam usar em log de verdade:
 *  1. os controles eram `<span onClick>` — invisíveis para o teclado e não
 *     anunciados como botão. Agora são `<button>` com `aria-label` e `disabled`
 *     real nas pontas (antes o "anterior" na página 1 parecia clicável);
 *  2. mostrava só as 5 PRIMEIRAS páginas (`slice(0, 5)`) — num log de 40 páginas
 *     não havia como chegar na 6ª. Agora é uma JANELA em volta da página atual,
 *     com primeira/última sempre visíveis e `…` no salto;
 *  3. não mostrava contagem, então cada tela montava "N registros" à mão — a
 *     informação mais pedida numa lista longa reimplementada N vezes. Passe
 *     `total` (e opcionalmente `itemLabel`) e o componente escreve.
 *
 * @param {number} page  página atual (1-based)
 * @param {number} pageCount  total de páginas
 * @param {(p:number)=>void} onChange
 * @param {number} [total]  total de REGISTROS — habilita a contagem à esquerda
 * @param {string|[string,string]} [itemLabel="registro"]  substantivo da
 *   contagem. String simples pluraliza com "s" (`registro` → `registros`), o que
 *   NÃO serve para a maioria dos substantivos de log em português — então aceita
 *   o par `[singular, plural]`: `["notificação", "notificações"]`,
 *   `["execução", "execuções"]`. Sem isso a tela escreveria "notificaçãos".
 * @param {number} [window=1]  quantas páginas mostrar de cada lado da atual
 */
export function Pagination({ page, pageCount, onChange, total, itemLabel = "registro", window: win = 1 }) {
  const [one, many] = Array.isArray(itemLabel) ? itemLabel : [itemLabel, `${itemLabel}s`];
  const last = Math.max(1, pageCount || 1);
  const cur = Math.min(Math.max(1, page || 1), last);
  const go = (p) => p >= 1 && p <= last && p !== cur && onChange && onChange(p);

  // Janela em volta da atual + primeira e última sempre presentes. `null` marca
  // onde entra o "…" (não é página, é indicação de salto).
  const items = [];
  const from = Math.max(1, cur - win);
  const to = Math.min(last, cur + win);
  if (from > 1) { items.push(1); if (from > 2) items.push(null); }
  for (let p = from; p <= to; p++) items.push(p);
  if (to < last) { if (to < last - 1) items.push(null); items.push(last); }

  const nav = (
    <div className="su-pagination" role="navigation" aria-label="Paginação">
      <button type="button" className="su-page su-page--nav" onClick={() => go(cur - 1)} disabled={cur <= 1} aria-label="Página anterior">
        <DSIcon name="chevron-left" />
      </button>
      {items.map((p, i) => (p === null ? (
        <span key={`gap-${i}`} className="su-page su-page--gap" aria-hidden="true">…</span>
      ) : (
        <button
          key={p}
          type="button"
          className={["su-page", p === cur && "su-page--active"].filter(Boolean).join(" ")}
          onClick={() => go(p)}
          aria-label={`Página ${p}`}
          aria-current={p === cur ? "page" : undefined}
        >
          {p}
        </button>
      )))}
      <button type="button" className="su-page su-page--nav" onClick={() => go(cur + 1)} disabled={cur >= last} aria-label="Próxima página">
        <DSIcon name="chevron-right" />
      </button>
    </div>
  );

  if (total == null) return nav;
  return (
    <div className="su-pagination-bar">
      <span className="su-pagination__count">
        {total.toLocaleString("pt-BR")} {total === 1 ? one : many}
      </span>
      {nav}
    </div>
  );
}

/**
 * Accordion — .su-accordion. Itens colapsáveis (controlado internamente).
 * @param {{title:React.ReactNode, content:React.ReactNode}[]} items
 */
export function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="su-accordion">
      {items.map((it, i) => (
        <div className="su-accordion__item" key={i}>
          <div className="su-accordion__head" onClick={() => setOpen(open === i ? -1 : i)}>
            {it.title}
            <DSIcon name={`chevron-${open === i ? "up" : "down"}`} style={{ color: "var(--su-text-muted)" }} />
          </div>
          {open === i && <div className="su-accordion__body">{it.content}</div>}
        </div>
      ))}
    </div>
  );
}
