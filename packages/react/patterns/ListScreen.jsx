import React, { useEffect, useState } from "react";
import { PageHeader } from "./PageHeader.jsx";
import { DataTable } from "../DataTable.jsx";
import { SegmentedControl } from "../Controls.jsx";
import { Pagination } from "../Data.jsx";
import { EmptyState, Skeleton } from "../Feedback.jsx";
import { Button } from "../Button.jsx";
import { DSIcon } from "../DSIcon.jsx";

function useNarrow(maxWidth = 767) {
  const query = `(max-width: ${maxWidth}px)`;
  const read = () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false);
  const [narrow, setNarrow] = useState(read);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setNarrow(mql.matches);
    onChange();
    mql.addEventListener ? mql.addEventListener("change", onChange) : mql.addListener(onChange);
    return () => (mql.removeEventListener ? mql.removeEventListener("change", onChange) : mql.removeListener(onChange));
  }, [query]);
  return narrow;
}

function Toolbar({ listTitle, search, onSearch, searchPlaceholder, segments, segment, onSegment, toolbarActions }) {
  return <div className="su-toolbar">
    {listTitle && <span className="su-toolbar__title">{listTitle}</span>}
    <div className="su-toolbar__spacer" />
    {onSearch && <div className="su-input su-toolbar__search">
      <DSIcon name="search" size="sm" />
      <input value={search ?? ""} onChange={(event) => onSearch(event.target.value)} placeholder={searchPlaceholder || "Buscar…"} aria-label={searchPlaceholder || "Buscar"} />
    </div>}
    {segments && segments.length > 0 && <SegmentedControl items={segments} value={segment} onChange={onSegment} />}
    {toolbarActions && toolbarActions.length > 0 && <div className="su-toolbar__actions">
      {toolbarActions.map((action, index) => <Button key={index} variant="secondary" size="sm" icon={action.icon} onClick={action.onClick}>{action.label}</Button>)}
    </div>}
  </div>;
}

function SkeletonRows({ n = 5 }) {
  return <div style={{ padding: "var(--su-space-2) var(--su-space-4)" }}>
    {Array.from({ length: n }).map((_, index) => <div key={index} style={{ display: "flex", gap: "var(--su-space-4)", alignItems: "center", padding: "var(--su-space-3) 0", borderTop: index ? "1px solid var(--su-border-subtle)" : "none" }}>
      <Skeleton width="26%" height={12} /><Skeleton width="18%" height={12} /><Skeleton width="14%" height={12} /><Skeleton width="12%" height={12} style={{ marginLeft: "auto" }} />
    </div>)}
  </div>;
}

/**
 * Molde de listas operacionais. A Toolbar sempre ocupa a mesma posição no card,
 * inclusive ao alternar entre tabela, loading e estados vazios: assim o input de
 * busca não é desmontado nem perde foco enquanto o resultado é filtrado.
 */
export function ListScreen({
  title, subtitle, primaryAction,
  listTitle, search, onSearch, searchPlaceholder, segments, segment, onSegment, toolbarActions,
  columns, rows = [], getRowId = (row, index) => index, renderRowMenu, bulkActions,
  renderCard,
  summary, page, pageCount, onPage,
  loading, error, filterActive, emptyNew, emptyFiltered,
}) {
  const narrow = useNarrow();
  const toolbar = <Toolbar listTitle={listTitle} search={search} onSearch={onSearch} searchPlaceholder={searchPlaceholder} segments={segments} segment={segment} onSegment={onSegment} toolbarActions={toolbarActions} />;
  const hasPagination = typeof pageCount === "number" && pageCount > 1;
  const footer = (summary || hasPagination) ? <div className="su-listcard__foot">
    {summary && <span>{summary}</span>}
    {hasPagination && <Pagination page={page} pageCount={pageCount} onChange={onPage} />}
  </div> : null;

  let content;
  if (loading) {
    content = <SkeletonRows />;
  } else if (error) {
    content = <div className="su-cardstate"><EmptyState icon="alert-triangle" title="Não foi possível carregar" description={error.message} action={error.onRetry && <Button variant="secondary" icon="refresh" onClick={error.onRetry}>Tentar de novo</Button>} /></div>;
  } else if (!rows.length) {
    const empty = (filterActive ? emptyFiltered : emptyNew) || {};
    content = <div className="su-cardstate">{filterActive
      ? <EmptyState icon={empty.icon || "search"} title={empty.title || "Nada encontrado"} description={empty.description || "Nenhum resultado para o filtro atual."} action={empty.onClear && <Button variant="secondary" onClick={empty.onClear}>Limpar filtros</Button>} />
      : <EmptyState icon={empty.icon || "inbox"} title={empty.title || "Nada por aqui ainda"} description={empty.description} action={empty.action} />
    }</div>;
  } else if (narrow && renderCard) {
    content = <div className="su-cards">{rows.map((row, index) => <React.Fragment key={getRowId(row, index)}>{renderCard(row)}</React.Fragment>)}</div>;
  } else {
    content = <DataTable bare columns={columns} rows={rows} getRowId={getRowId} renderRowMenu={renderRowMenu} bulkActions={bulkActions} />;
  }

  return <div className="su-listscreen">
    {(title || subtitle || primaryAction) && <PageHeader title={title} subtitle={subtitle} actions={primaryAction} />}
    <div className="su-table-card">
      {toolbar}
      {content}
      {footer}
    </div>
  </div>;
}
