import React from "react";
import { PageHeader } from "./PageHeader.jsx";
import { Tabs } from "../Tabs.jsx";
import { Card } from "../Card.jsx";
import { Button } from "../Button.jsx";
import { DSIcon } from "../DSIcon.jsx";
import { EmptyState, Skeleton } from "../Feedback.jsx";

function CamposCarregando() {
  return (
    <div style={{ display: "grid", gap: "var(--su-space-4)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "var(--su-space-4)" }}>
          <Skeleton width="70%" height={11} />
          <Skeleton width="45%" height={11} />
        </div>
      ))}
    </div>
  );
}

/**
 * DetailScreen — o molde **`detail`** (`STUDIO_UX_TEMPLATES` §2, deriva de
 * `TABLES`): a tela de **um registro que existe por si**.
 *
 * Regiões, nesta ordem: **voltar** → cabeçalho (título + ações) → **abas**
 * (folder) → conteúdo da aba.
 *
 * Três regras que ele carrega, todas nascidas de erro real:
 *
 * 1. **O "voltar" é do molde, não do breadcrumb.** Item de breadcrumb sem `href`
 *    é texto, e `href` sem `onNavigate` recarrega a SPA — em um app de página
 *    única os dois falham calados. A saída que a pessoa procura primeiro tem que
 *    estar na tela, sempre.
 * 2. **A aba é identificada por `id`.** `{ value, label }` faz `onChange`
 *    devolver `undefined` e a tela esvaziar ao clicar — sem erro nenhum. O
 *    `Tabs` avisa no console desde a v1.2.33; aqui a assinatura já é a certa.
 * 3. **Carregando e erro moram DENTRO da aba**, não no lugar da tela: quem já
 *    leu o título e clicou numa aba não pode ver o cabeçalho sumir.
 *
 * Quem edita esse registro vai para uma **rota** própria (`/…/:id/editar`) — a
 * regra dos três containers (`COMPONENT_LIBRARY`): Modal é leitura e campo
 * curto; registro que existe por si tem endereço.
 *
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [subtitle]
 * @param {React.ReactNode} [actions]   ações do registro (editar, arquivar…)
 * @param {{label?:string,onClick:Function}} [back]
 * @param {{id:string,label:string,icon?:string}[]} [tabs]
 * @param {string} [tab]                aba ativa
 * @param {Function} [onTab]
 * @param {React.ReactNode} [aside]     bloco fixo acima das abas (resumo, alerta)
 * @param {boolean} [loading]
 * @param {{message:string,onRetry?:Function}} [error]
 * @param {boolean} [bare]              conteúdo sem o Card (quando a aba traz o próprio)
 */
export function DetailScreen({
  title, subtitle, actions, back,
  tabs, tab, onTab, aside,
  loading, error, bare = false,
  children,
}) {
  let conteudo;
  if (loading) {
    conteudo = <CamposCarregando />;
  } else if (error) {
    conteudo = (
      <EmptyState
        icon="alert-triangle"
        title="Não foi possível carregar"
        description={error.message}
        action={error.onRetry && <Button variant="secondary" icon="refresh" onClick={error.onRetry}>Tentar de novo</Button>}
      />
    );
  } else {
    conteudo = children;
  }

  return (
    <div className="su-screen">
      {back && (
        <button type="button" className="su-backlink" onClick={back.onClick}>
          <DSIcon name="arrow-left" size="sm" />
          {back.label || "Voltar"}
        </button>
      )}

      {(title || subtitle || actions) && <PageHeader title={title} subtitle={subtitle} actions={actions} />}

      {aside}

      {tabs && tabs.length > 0 && <Tabs items={tabs} value={tab} onChange={onTab} />}

      {bare && !loading && !error ? conteudo : <Card>{conteudo}</Card>}
    </div>
  );
}
