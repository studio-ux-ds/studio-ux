/**
 * Studio UX — <Icon>: adapter web (React) da biblioteca de ícones.
 * Tamanho por token (§4), cor via currentColor (herda o papel de texto do contexto).
 * Acessibilidade (§5): passe `label` para ícone que carrega significado sozinho (vira role=img + aria-label);
 * sem `label`, o ícone é decorativo e nasce aria-hidden — nunca fica "mudo" de forma ambígua.
 */
import { ICONS, ICON_STYLE } from "./icons.js";

const SIZE = { sm: "var(--su-icon-sm)", md: "var(--su-icon-md)", lg: "var(--su-icon-lg)" };

export function Icon({ name, size = "md", label, className = "", ...rest }) {
  const ic = ICONS[name];
  if (!ic) throw new Error(`ícone fora da biblioteca curada: "${name}" (ICONOGRAPHY §6)`);
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
