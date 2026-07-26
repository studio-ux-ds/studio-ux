import React from "react";

/** Card — .su-card (superfície elevada de agrupamento). */
export function Card({ className = "", children, ...rest }) {
  return <div className={["su-card", className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
}

/**
 * StatCard — .su-statcard. Indicador numérico.
 *
 * Desenho (v1.2.27): **ícone à esquerda** num quadrado tonalizado, texto à
 * direita, e o card com um leve degradê da cor do papel. O `tone` decide a cor —
 * do degradê, da borda e do ícone —, **nunca do número**: valor colorido perde
 * contraste e some junto com o fundo tonalizado.
 *
 * O `tone` continua sendo **papel semântico**, não decoração: `neutral` usa o
 * accent do sistema, e os outros o papel correspondente. Um painel com sete
 * indicadores em cinco cores por gosto não é o que este componente faz — a cor
 * aqui responde "isto é bom/ruim/atenção", e quando não responde nada, é
 * `neutral` (P17).
 *
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [tone]
 * @param {React.ReactNode} [sub]  linha secundária NEUTRA sob o número —
 *   composição, unidade, recorte ("976.884 tokens", "0 com erro"). É o que quase
 *   sempre se quer: antes só existia `delta`, que é colorido como variação, e
 *   quem precisava de legenda a colocava lá — dando verde a um texto que não é
 *   nem melhora nem piora.
 * @param {React.ReactNode} [delta]  a VARIAÇÃO no período ("8,4%").
 * @param {"up"|"down"} [deltaType]  direção da variação (verde/vermelho).
 * @param {React.ReactNode} [icon]  reforço visual da métrica.
 */
export function StatCard({ label, value, sub, delta, deltaType, icon, tone = "neutral" }) {
  return (
    <div className={["su-statcard", tone !== "neutral" && `su-statcard--${tone}`].filter(Boolean).join(" ")}>
      {icon && <span className="su-statcard__icon" aria-hidden="true">{icon}</span>}
      <div className="su-statcard__body">
        <div className="su-statcard__label">{label}</div>
        <div className="su-statcard__value">{value}</div>
        {sub && <div className="su-statcard__sub">{sub}</div>}
        {delta && (
          <div className={["su-statcard__delta", deltaType === "down" && "su-statcard__delta--down"].filter(Boolean).join(" ")}>
            {delta}
          </div>
        )}
      </div>
    </div>
  );
}
