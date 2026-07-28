import React from "react";
import { PageHeader } from "./PageHeader.jsx";
import { Card, StatCard } from "../Card.jsx";
import { Button } from "../Button.jsx";
import { EmptyState, Skeleton } from "../Feedback.jsx";

/**
 * DashboardScreen — o molde **`dashboard`** (`STUDIO_UX_TEMPLATES` §2, deriva de
 * `DASHBOARD`): a tela de **leitura de indicadores**.
 *
 * Regiões: cabeçalho (com o filtro de período nas ações) → grade de `StatCard`
 * → blocos de conteúdo (gráfico, tabela-resumo).
 *
 * O que ele fixa:
 *
 * - **Carregando é `Skeleton` na forma do KPI**, não spinner solto. O painel
 *   inteiro pulando de "nada" para "seis números" é a maior fonte de salto
 *   visual do produto; o esqueleto reserva o espaço.
 * - **A cor do `StatCard` (`hue`) é CATEGÓRICA — diz de que assunto o indicador
 *   é**, não se ele é bom ou ruim, e tem que ser **estável por assunto** (custo é
 *   sempre a mesma cor, em toda tela). Nunca rotativa por posição na grade, senão
 *   a cor deixa de informar e passa a decorar. Julgamento de valor vive só no
 *   `delta` + `deltaType` (`"up"`/`"down"`).
 * - **Sem dado é `EmptyState`, não zero.** Mostrar `0` quando ainda não há
 *   medição é dizer uma coisa falsa; painel que abre no dia 1 do mês precisa
 *   distinguir "ainda não aconteceu" de "aconteceu e deu zero".
 *
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [subtitle]
 * @param {React.ReactNode} [actions]  período, exportar…
 * @param {{label:string,value:React.ReactNode,sub?:React.ReactNode,delta?:React.ReactNode,deltaType?:"up"|"down",icon?:React.ReactNode,hue?:string}[]} [stats]
 * @param {boolean} [loading]
 * @param {{message:string,onRetry?:Function}} [error]
 * @param {{icon?:string,title?:string,description?:React.ReactNode,action?:React.ReactNode}} [empty]
 * @param {boolean} [hasData]  false → mostra o vazio no lugar dos blocos
 * @param {number} [statsCount]  quantos esqueletos de KPI enquanto carrega
 */
export function DashboardScreen({
  title, subtitle, actions,
  stats = [], loading, error, empty, hasData = true, statsCount = 4,
  children,
}) {
  return (
    <div className="su-screen">
      {(title || subtitle || actions) && <PageHeader title={title} subtitle={subtitle} actions={actions} />}

      <div className="su-statgrid">
        {loading
          ? Array.from({ length: stats.length || statsCount }).map((_, i) => (
              <Card key={i}>
                <Skeleton width="55%" height={10} />
                <Skeleton width="40%" height={22} style={{ marginTop: "var(--su-space-3)" }} />
              </Card>
            ))
          : stats.map((s, i) => (
              <StatCard key={s.label ?? i} label={s.label} value={s.value} sub={s.sub} delta={s.delta} deltaType={s.deltaType} icon={s.icon} hue={s.hue} />
            ))}
      </div>

      {error ? (
        <Card>
          <EmptyState
            icon="alert-triangle"
            title="Não foi possível carregar os indicadores"
            description={error.message}
            action={error.onRetry && <Button variant="secondary" icon="refresh" onClick={error.onRetry}>Tentar de novo</Button>}
          />
        </Card>
      ) : loading ? (
        <div className="su-blocks">
          {[0, 1].map((i) => (
            <Card key={i}>
              <Skeleton width="30%" height={11} />
              <Skeleton width="100%" height={160} style={{ marginTop: "var(--su-space-4)" }} radius="var(--su-radius-md)" />
            </Card>
          ))}
        </div>
      ) : !hasData ? (
        <Card>
          <EmptyState
            icon={empty?.icon || "chart-bar"}
            title={empty?.title || "Ainda não há o que medir"}
            description={empty?.description || "Assim que houver movimento no período escolhido, os números aparecem aqui."}
            action={empty?.action}
          />
        </Card>
      ) : (
        children
      )}
    </div>
  );
}
