import React from "react";
import { DSIcon } from "../DSIcon.jsx";

/**
 * AuthScreen — o molde de **acesso**: entrar, aceitar convite, recuperar senha.
 *
 * O molde `login` estava especificado (`STUDIO_UX_TEMPLATES` §2) e materializado
 * no gerador HTML (`examples/login.html` é a referência viva), mas **nunca virou
 * componente React** — só o `list` tinha virado. O efeito: o primeiro app React
 * a precisar de login reconstruiu um cartão centralizado à mão, sem painel de
 * marca, sem "esqueci a senha", sem "manter conectado". O molde existia e não
 * era alcançável de dentro do React.
 *
 * Duas regiões (o desenho do exemplo, valores idênticos):
 *  · **aside** — marca, uma frase de boas-vindas, o argumento e até três
 *    destaques. Aparece só a partir de 900px; abaixo disso a marca migra para
 *    cima do formulário, porque é o único elemento que diz onde a pessoa está.
 *  · **main** — o formulário, com largura de leitura de 380px.
 *
 * Sem `aside`, o formulário fica centrado na tela inteira (uma coluna) — é a
 * forma para aceitar convite ou recuperar senha, onde não há o que argumentar.
 *
 * @param {{name: string, logo?: React.ReactNode}} brand  nome + símbolo (o logo
 *   pode ser um `DSIcon`, um `<img>` do cliente, ou nada)
 * @param {string} [welcome]     a frase grande do painel ("Bem-vindo de volta.")
 * @param {string} [pitch]       o parágrafo de apoio
 * @param {{icon?: string, label: string}[]} [features]  até 3 destaques
 * @param {string} [footer]      linha de rodapé do painel (direitos, versão)
 * @param {string} title         título do formulário ("Entrar na sua conta")
 * @param {string} [subtitle]    linha de apoio do formulário
 * @param {React.ReactNode} children  os campos + a ação (o produto decide)
 * @param {React.ReactNode} [note]    linha final ("Não tem conta? …")
 * @param {React.ReactNode} [topRight] canto superior direito (ex.: alternar tema)
 */
export function AuthScreen({
  brand,
  welcome,
  pitch,
  features = [],
  footer,
  title,
  subtitle,
  children,
  note,
  topRight,
}) {
  // O painel só existe se houver o que dizer nele. Um painel vazio ao lado do
  // formulário é pior que nenhum: metade da tela sem função.
  const temPainel = Boolean(welcome || pitch || features.length || footer);

  const marca = brand && (
    <>
      {brand.logo && <span className="su-auth__logo">{brand.logo}</span>}
      {brand.name}
    </>
  );

  return (
    <div className={["su-auth", temPainel && "su-auth--split"].filter(Boolean).join(" ")}>
      {temPainel && (
        <aside className="su-auth__aside">
          {brand && <div className="su-auth__brand">{marca}</div>}
          {(welcome || pitch) && (
            <div className="su-auth__pitch">
              {welcome && <h1>{welcome}</h1>}
              {pitch && <p>{pitch}</p>}
            </div>
          )}
          {features.length > 0 && (
            <div className="su-auth__feats">
              {features.map((f, i) => (
                <div className="su-auth__feat" key={i}>
                  {f.icon ? <span><DSIcon name={f.icon} size="sm" /></span> : <span />}
                  {f.label}
                </div>
              ))}
            </div>
          )}
          {footer && <div className="su-auth__foot">{footer}</div>}
        </aside>
      )}

      <main className="su-auth__main">
        {topRight && <div style={{ position: "fixed", top: 16, right: 16, zIndex: 5 }}>{topRight}</div>}
        <div className="su-auth__form">
          {brand && (
            <div className={["su-auth__brand", temPainel && "su-auth__brand--inline"].filter(Boolean).join(" ")}
              style={temPainel ? undefined : { position: "static" }}>
              {marca}
            </div>
          )}
          <div className="su-auth__head">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
          {note && <div className="su-auth__note">{note}</div>}
        </div>
      </main>
    </div>
  );
}

/**
 * AuthLink — o link discreto do molde de acesso ("Esqueci a senha?").
 *
 * Fica alinhado à direita, abaixo do campo, com peso e cor menores que o botão:
 * há **uma** ação principal na tela (P6), e esta não é ela. Realça no hover para
 * não virar texto morto.
 */
export function AuthLink({ children, ...rest }) {
  return <a className="su-auth__link" {...rest}>{children}</a>;
}
