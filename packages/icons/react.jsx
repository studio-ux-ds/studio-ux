/**
 * Studio UX — <Icon>: adapter web (React) da biblioteca de ícones.
 * Tamanho por token (§4), cor via currentColor (herda o papel de texto do contexto).
 * Acessibilidade (§5): passe `label` para ícone que carrega significado sozinho (vira role=img + aria-label);
 * sem `label`, o ícone é decorativo e nasce aria-hidden — nunca fica "mudo" de forma ambígua.
 */
// `import React` é OBRIGATÓRIO mesmo sem uso aparente: este arquivo é publicado
// como `.jsx` cru, e um bundler que compile JSX no runtime **classic** gera
// `React.createElement(...)`. Sem o import, o resultado é "React is not defined"
// em tempo de execução — foi o que derrubou o Storybook (todas as stories que
// renderizam um ícone), porque o pré-bundle do esbuild usa o runtime classic por
// padrão, ao contrário do plugin React do Vite. Os outros `.jsx` dos pacotes já
// importavam; este era o único que não, e por isso quebrava só ele.
import React from "react";
import { ICONS, ICON_STYLE } from "./icons.js";

const SIZE = { sm: "var(--su-icon-sm)", md: "var(--su-icon-md)", lg: "var(--su-icon-lg)" };

export function Icon({ name, size = "md", label, className = "", ...rest }) {
  // Nome fora da curadoria **não derruba a tela**: avisa no console e desenha o
  // ícone de "ajuda". Antes era `throw`, e uma exceção no render desmonta a
  // árvore React inteira — um nome de ícone errado apagava a aplicação do
  // consumidor. O rigor continua (o aviso é explícito e diz onde olhar), mas o
  // custo do engano deixa de ser catastrófico.
  const ic = ICONS[name] || ICONS.help;
  if (!ICONS[name] && typeof console !== "undefined") {
    console.warn(`[studio-ux] ícone fora da biblioteca curada: "${name}" — desenhando "help". Ver ICONOGRAPHY §6.`);
  }
  const dim = SIZE[size] || size;
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: false };
  const cls = ["su-icon-svg", className].filter(Boolean).join(" ");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={ICON_STYLE.viewBox}
      width={dim}
      height={dim}
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STYLE.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
      {...a11y}
      {...rest}
      dangerouslySetInnerHTML={{ __html: ic.body }}
    />
  );
}

export { ICONS, ICON_NAMES, ICON_STYLE, iconSvg } from "./icons.js";
