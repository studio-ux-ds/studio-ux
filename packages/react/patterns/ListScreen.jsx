import React, { useEffect, useState } from "react";
import { PageHeader } from "./PageHeader.jsx";
import { DataTable } from "../DataTable.jsx";
import { SegmentedControl } from "../Controls.jsx";
import { Pagination } from "../Data.jsx";
import { EmptyState, Skeleton } from "../Feedback.jsx";
import { Button } from "../Button.jsx";

/**
 * ListScreen — materialização React do molde de tela `list` (STUDIO_UX_TEMPLATES §2,
 * derivado de TABLES). Preenche a região de conteúdo; NÃO desenha o shell (P22).
 * Posição/comportamento do header do card = idêntico ao Flux: título à esquerda,
 * busca + filtro segmentado à direita; ações de linha em ícone à direita; rodapé
 * "mostrando X de Y". Duas variantes de produto (P4): Desktop = DataTable; tela
 * estreita = lista de Card (via `renderCard`). Todos os estados (P14).
 */

/** Materializa a variante estreita do molde (cards no lugar da tabela — P4). */
function useNarrow(maxWidth = 767) {
  const q = `(max-width: ${maxWidth}px)`;
  const read = () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q).matches : false);
  const [narrow, setNarrow] = useState(read);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(q);
    const on = () => setNarrow(mql.matches);
    on();
    mql.addEventListener ? mql.addEventListener("change", on) : mql.addListener(on);
    return () => (mql.removeEventListener ? mql.removeEventListener("change", on) : mql.removeListener(on));
  }, [q]);
  return narrow;
}

/** Header do card — posição Flux: [título] · (espaço) · [busca] [segmentado] [ações]. */
function Toolbar({ listTitle, search, onSearch, searchPlaceholder, segments, segment, onSegment, toolbarActions }) {
  return (
    <div className="su-toolbar">
      {listTitle && <span className="su-toolbar__title">{listTitle}</span>}
      <div className="su-toolbar__spacer" />
      {onSearch && (
        <div className="su-input su-toolbar__search">
          <i className="ti ti-search" aria-hidden="true" />
          <input
            value={search ?? ""}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={searchPlaceholder || "Buscar…"}
            aria-label={searchPlaceholder || "Buscar"}
          />
        </div>
      )}
      {segments && segments.length > 0 && (
        <SegmentedControl items={segments} value={segment} onChange={onSegment} />
      )}
      {toolbarActions && toolbarActions.length > 0 && (
        <div className="su-toolbar__actions">
          {toolbarActions.map((a, i) => (
            <Button key={i} variant="secondary" size="sm" icon={a.icon} onClick={a.onClick}>{a.label}</Button>
          ))}
        </div>
      )}
    </div>
  );
}

function SkeletonRows({ n = 5 }) {
  return (
    <div style={{ padding: "var(--su-space-2) var(--su-space-4)" }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ display: "flex", gap: "var(--su-space-4)", alignItems: "center", padding: "var(--su-space-3) 0", borderTop: i ? "1px solid var(--su-border-subtle)" : "none" }}>
          <Skeleton width="26%" height={12} />
          <Skeleton width="18%" height={12} />
          <Skeleton width="14%" height={12} />
          <Skeleton width="12%" height={12} style={{ marginLeft: "auto" }} />
        </div>
      ))}
    </div>
  );
}

export function ListScreen({
  // cabeçalho de página
  title, subtitle, primaryAction,
  // header do card (filtros/busca/ações) — comportamento e posição do Flux
  listTitle, search, onSearch, searchPlaceholder, segments, segment, onSegment, toolbarActions,
  // dados (Desktop → tabela)
  columns, rows = [], getRowId = (r, i) => i, renderRowMenu, bulkActions,
  // dados (estreito → cards; P4)
  renderCard,
  // rodapé
  summary, page, pageCount, onPage,
  // estados (P14)
  loading, error, filterActive, emptyNew, emptyFiltered,
}) {
  const narrow = useNarrow();

  const toolbar = (
    <Toolbar
      listTitle={listTitle} search={search} onSearch={onSearch} searchPlaceholder={searchPlaceholder}
      segments={segments} segment={segment} onSegment={onSegment} toolbarActions={toolbarActions}
    />
  );

  const hasPagination = typeof pageCount === "number" && pageCount > 1;
  const footer = (summary || hasPagination) ? (
    <div className="su-listcard__foot">
      {summary && <span>{summary}</span>}
      {hasPagination && <Pagination page={page} pageCount={pageCount} onChange={onPage} />}
    </div>
  ) : null;

  let body;
  if (loading) {
    body = <div className="su-table-card">{toolbar}<SkeletonRows />{footer}</div>;
  } else if (error) {
    body = (
      <div className="su-table-card">
        {toolbar}
        <div className="su-cardstate">
          <EmptyState
            icon="alert-triangle"
            title="Não foi possível carregar"
            description={error.message}
            action={error.onRetry && <Button variant="secondary" icon="refresh" onClick={error.onRetry}>Tentar de novo</Button>}
          />
        </div>
      </div>
    );
  } else if (!rows.length) {
    const e = (filterActive ? emptyFiltered : emptyNew) || {};
    body = (
      <div className="su-table-card">
        {toolbar}
        <div className="su-cardstate">
          {filterActive ? (
            <EmptyState
              icon={e.icon || "search"}
              title={e.title || "Nada encontrado"}
              description={e.description || "Nenhum resultado para o filtro atual."}
              action={e.onClear && <Button variant="secondary" onClick={e.onClear}>Limpar filtros</Button>}
            />
          ) : (
            <EmptyState icon={e.icon || "inbox"} title={e.title || "Nada por aqui ainda"} description={e.description} action={e.action} />
          )}
        </div>
        {footer}
      </div>
    );
  } else if (narrow && renderCard) {
    body = (
      <div className="su-table-card">
        {toolbar}
        <div className="su-cards">
          {rows.map((r, i) => <React.Fragment key={getRowId(r, i)}>{renderCard(r)}</React.Fragment>)}
        </div>
        {footer}
      </div>
    );
  } else {
    body = (
      <DataTable
        toolbar={toolbar}
        columns={columns}
        rows={rows}
        getRowId={getRowId}
        renderRowMenu={renderRowMenu}
        bulkActions={bulkActions}
        footer={footer}
      />
    );
  }

  return (
    <div className="su-listscreen">
      {(title || subtitle || primaryAction) && <PageHeader title={title} subtitle={subtitle} actions={primaryAction} />}
      {body}
    </div>
  );
}
