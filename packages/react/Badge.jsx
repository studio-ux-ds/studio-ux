import React from "react";

/**
 * Badge / Status — .su-badge. O status carrega significado por texto + cor (P17).
 *
 * `tone` é o nome canônico do papel semântico no DS — é como `StatCard` e
 * `Banner` já chamavam. O Badge era o único que chamava `status`, e a divergência
 * custou caro: consumidor escrevia `tone` por analogia, a prop caía no `...rest`,
 * virava atributo inválido no `<span>` e **o badge ficava neutro em silêncio**.
 * `status` segue aceito como apelido (versões publicadas o usam) — mas o nome a
 * usar em código novo é `tone`.
 *
 * `neutral` é o default e não tem classe própria: é o `.su-badge` puro.
 *
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [tone]
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [status]  apelido legado de `tone`
 */
export function Badge({ tone, status, className = "", children, ...rest }) {
  const role = tone || status;
  const cls = [
    "su-badge",
    role && role !== "neutral" && `su-badge--${role}`,
    className,
  ].filter(Boolean).join(" ");
  return <span className={cls} {...rest}>{children}</span>;
}
