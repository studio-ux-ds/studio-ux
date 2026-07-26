import React from "react";

/** Card — .su-card (superfície elevada de agrupamento). */
export function Card({ className = "", children, ...rest }) {
  return <div className={["su-card", className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
}

/**
 * StatCard — .su-statcard. Indicador numérico.
 *
 * Desenho: **ícone à esquerda** num quadrado tonalizado, texto à direita, e o
 * card com um leve degradê. A cor pinta o **entorno** (degradê, borda, ícone) e
 * **nunca o número**: valor colorido sobre fundo tonalizado perde contraste.
 *
 * `hue` é a cor do card, e ela é **categórica — diz de que ASSUNTO o indicador
 * é**, não se ele é bom ou ruim (v1.2.29: o `tone` semântico saiu daqui). Num
 * painel com vários domínios lado a lado — organizações, execuções, custo,
 * mensagens — é a cor que faz o olho reencontrar o mesmo assunto de uma tela para
 * outra, e isso é função, não enfeite.
 *
 * A régua: **a matiz é estável por assunto**. Custo é sempre a mesma cor, em
 * qualquer tela. Nunca rotativa por posição na grade ("o primeiro card é lilás")
 * — aí a cor deixa de informar e passa a decorar.
 *
 * Por que `tone` saiu: no card de indicador o par bom/ruim quase nunca cabe (uma
 * contagem não é nem uma coisa nem outra), e quem precisava distinguir assunto
 * acabava usando `tone` como paleta — o que fazia `success` significar "verde"
 * em vez de "deu certo". Julgamento de valor no indicador vive no `delta`, que
 * continua vermelho/verde por direção.
 *
 * @param {"indigo"|"blue"|"teal"|"violet"|"amber"|"rose"|"slate"} [hue]
 *   Default: o accent do sistema (acompanha a personalização do usuário).
 * @param {React.ReactNode} [sub]  linha secundária NEUTRA sob o número —
 *   composição, unidade, recorte ("976.884 tokens", "0 com erro").
 * @param {React.ReactNode} [delta]  a VARIAÇÃO no período ("8,4%").
 * @param {"up"|"down"} [deltaType]  direção da variação (verde/vermelho).
 * @param {React.ReactNode} [icon]  reforço visual da métrica.
 */
export function StatCard({ label, value, sub, delta, deltaType, icon, hue }) {
  return (
    <div className={["su-statcard", hue && `su-statcard--${hue}`].filter(Boolean).join(" ")}>
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
