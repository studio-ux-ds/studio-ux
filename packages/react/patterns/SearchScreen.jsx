import React from "react";
import { PageHeader } from "./PageHeader.jsx";
import { Card } from "../Card.jsx";
import { Button } from "../Button.jsx";
import { DSIcon } from "../DSIcon.jsx";
import { SegmentedControl } from "../Controls.jsx";
import { EmptyState, Skeleton, Spinner } from "../Feedback.jsx";

/**
 * SearchScreen — o molde **`search`** (`STUDIO_UX_TEMPLATES` §2, deriva de
 * `PATTERNS`): a tela em que **procurar é a razão de existir**.
 *
 * Não confundir com a busca de uma lista: ali a busca **filtra** um conjunto que
 * já está na tela e mora na Toolbar do `ListScreen`. Aqui a tela **começa
 * vazia** e só existe conteúdo depois que alguém pergunta.
 *
 * O que ele fixa:
 *
 * - **O campo nunca é desmontado.** Trocar de estado (digitando → carregando →
 *   resultados → nada encontrado) remontando o campo faz o foco pular e o
 *   próximo caractere se perder. É a mesma regra da Toolbar do `ListScreen`, e é
 *   a falha mais comum desta classe de tela.
 * - **Três vazios diferentes, três textos diferentes:** *ainda não perguntou*
 *   (convite), *nada encontrado* (o que tentar agora), *erro* (tentar de novo).
 *   Colapsar os três em "Nenhum resultado" faz a tela recém-aberta parecer
 *   quebrada.
 * - **O indicador de "procurando" fica NO campo**, não no lugar dos resultados:
 *   o que já foi encontrado continua legível enquanto a próxima busca corre.
 *
 * @param {React.ReactNode} [title]
 * @param {React.ReactNode} [subtitle]
 * @param {string} query
 * @param {Function} onQuery
 * @param {Function} [onSubmit]        quando a busca não é a cada tecla
 * @param {string} [placeholder]
 * @param {{id:string,label:string}[]} [scopes]   onde procurar (tudo, pessoas, documentos…)
 * @param {string} [scope]
 * @param {Function} [onScope]
 * @param {React.ReactNode} [summary]  "12 resultados para …"
 * @param {boolean} [searching]
 * @param {{message:string,onRetry?:Function}} [error]
 * @param {number} [resultCount]
 * @param {{title?:string,description?:React.ReactNode,icon?:string}} [emptyStart]
 * @param {{title?:string,description?:React.ReactNode,icon?:string,action?:React.ReactNode}} [emptyNoResults]
 */
export function SearchScreen({
  title, subtitle,
  query = "", onQuery, onSubmit, placeholder = "O que você procura?",
  scopes, scope, onScope,
  summary, searching, error, resultCount,
  emptyStart, emptyNoResults,
  children,
}) {
  const perguntou = query.trim().length > 0;
  const temResultado = resultCount === undefined ? Boolean(children) : resultCount > 0;

  let corpo;
  if (error) {
    corpo = (
      <EmptyState
        icon="alert-triangle"
        title="A busca falhou"
        description={error.message}
        action={error.onRetry && <Button variant="secondary" icon="refresh" onClick={error.onRetry}>Tentar de novo</Button>}
      />
    );
  } else if (!perguntou) {
    corpo = (
      <EmptyState
        icon={emptyStart?.icon || "search"}
        title={emptyStart?.title || "Comece digitando"}
        description={emptyStart?.description || "Os resultados aparecem aqui conforme você escreve."}
      />
    );
  } else if (searching && !temResultado) {
    corpo = (
      <div style={{ padding: "var(--su-space-4)" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ padding: "var(--su-space-3) 0", borderTop: i ? "1px solid var(--su-border-subtle)" : "none" }}>
            <Skeleton width="38%" height={12} />
            <Skeleton width="62%" height={10} style={{ marginTop: "var(--su-space-2)" }} />
          </div>
        ))}
      </div>
    );
  } else if (!temResultado) {
    corpo = (
      <EmptyState
        icon={emptyNoResults?.icon || "search"}
        title={emptyNoResults?.title || "Nada encontrado"}
        description={emptyNoResults?.description || `Nenhum resultado para "${query}". Tente outras palavras ou procure em outro lugar.`}
        action={emptyNoResults?.action}
      />
    );
  } else {
    corpo = children;
  }

  return (
    <div className="su-screen">
      {(title || subtitle) && <PageHeader title={title} subtitle={subtitle} />}

      <Card>
        {/* O campo vive FORA do bloco condicional acima — trocar de estado nunca
            o remonta, então o foco e o cursor ficam onde estão. */}
        <form
          className="su-searchfield su-input"
          onSubmit={(event) => { event.preventDefault(); onSubmit?.(query); }}
        >
          <DSIcon name="search" />
          <input
            value={query}
            onChange={(event) => onQuery?.(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            autoFocus
          />
          {searching && <Spinner size="sm" label="Procurando" />}
        </form>

        {scopes && scopes.length > 0 && (
          <div style={{ marginTop: "var(--su-space-4)" }}>
            <SegmentedControl items={scopes} value={scope} onChange={onScope} />
          </div>
        )}

        {summary && perguntou && !error && (
          <div style={{ marginTop: "var(--su-space-4)", fontSize: "var(--su-fs-body-sm)", color: "var(--su-text-muted)" }}>
            {summary}
          </div>
        )}

        <div style={{ marginTop: "var(--su-space-4)" }}>{corpo}</div>
      </Card>
    </div>
  );
}
