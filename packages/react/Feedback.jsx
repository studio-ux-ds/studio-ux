import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/** EmptyState — .su-empty. Convite, não desculpa (título + ação). */
export function EmptyState({ icon = "inbox", title, description, action }) {
  return (
    <div className="su-empty">
      <div className="su-empty__icon"><DSIcon name={icon} size="lg" /></div>
      {title && <div className="su-empty__title">{title}</div>}
      {description && <div style={{ fontSize: 13, marginTop: 4 }}>{description}</div>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </div>
  );
}

/** Skeleton — .su-skeleton. Placeholder de carregamento. */
export function Skeleton({ width = "100%", height = 9, radius, style, ...rest }) {
  return <span className="su-skeleton" style={{ display: "block", width, height, borderRadius: radius, ...style }} {...rest} />;
}

/**
 * Spinner — .su-spinner. Carregamento indeterminado curto.
 *
 * `size` existe porque o mesmo desenho serve a dois lugares de escala diferente:
 * ao lado de um rótulo (`sm`) e no centro de uma região que ainda não tem
 * conteúdo (`lg`). Sem isso o consumidor não tinha como pedir o maior e recorria
 * ao ícone de outra biblioteca com `animate-spin` — foi o que aconteceu em 57
 * arquivos de um painel migrado.
 *
 * `center` embrulha o spinner num bloco centrado com respiro: é o **carregamento
 * inicial de uma tela ou de um cartão**, o arranjo que estava repetido à mão em
 * 68 lugares (`flex justify-center py-16`). A cor NÃO é configurável de
 * propósito — anel neutro com o topo no accent é a assinatura de carregamento do
 * DS, e deixar cada tela escolher é como se perde a unidade.
 */
export function Spinner({ size, center = false, label = "Carregando", className = "", ...rest }) {
  const el = (
    <span
      className={["su-spinner", size && `su-spinner--${size}`, className].filter(Boolean).join(" ")}
      role="status"
      aria-label={label}
      {...rest}
    />
  );
  return center ? <div className="su-spinner-center">{el}</div> : el;
}

/** ProgressBar — .su-progress. Progresso com fim conhecido (0–100). */
export function ProgressBar({ value = 0, tone, label }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className="su-progress"
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={["su-progress__fill", tone && `su-progress__fill--${tone}`].filter(Boolean).join(" ")}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
