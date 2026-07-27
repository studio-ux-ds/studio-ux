import React from "react";
import { DSIcon } from "./DSIcon.jsx";
import { Spinner } from "./Feedback.jsx";

/**
 * Button — embrulha .su-btn. Props traduzem para classes/estados (P1), nunca valores.
 * @param {"primary"|"secondary"|"ghost"|"danger"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {string} icon  nome do ícone local curado à esquerda (ex.: "plus")
 * @param {string} iconRight  ícone à direita (ex.: "arrow-right")
 * @param {boolean} loading  estado de carregamento (P16): troca o ícone por
 *   `Spinner`, desabilita o botão (bloqueia re-clique) e anuncia `aria-busy`.
 *   O rótulo continua visível — quem chama deve trocá-lo pelo gerúndio da ação
 *   ("Salvando…"), porque spinner sozinho não diz o que está acontecendo (P11).
 */
export function Button({ variant = "secondary", size = "md", icon, iconRight, loading = false, block = false, disabled, className = "", children, ...rest }) {
  const sizeCls = size === "sm" ? "su-btn--sm" : size === "lg" ? "su-btn--lg" : "";
  // `block`: largura total do container. A spec já pedia isso ("no rodapé de
  // formulário no Mobile, largura total"; tela de login, ação única de um passo)
  // e o adapter não expunha — então o consumidor cravava `width: 100%` no
  // `style`, ou pior, uma classe que não existe.
  const cls = ["su-btn", `su-btn--${variant}`, sizeCls, block && "su-btn--block", loading && "su-btn--loading", className].filter(Boolean).join(" ");
  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <Spinner /> : (icon && <DSIcon name={icon} size="sm" />)}
      {children}
      {iconRight && !loading && <DSIcon name={iconRight} size="sm" />}
    </button>
  );
}

/** IconButton — .su-iconbtn (exige aria-label). */
export function IconButton({ icon, className = "", ...rest }) {
  return (
    <button className={["su-iconbtn", className].filter(Boolean).join(" ")} {...rest}>
      <DSIcon name={icon} size="sm" />
    </button>
  );
}

/**
 * CopyButton — copia um texto para a área de transferência.
 *
 * Existe porque "valor técnico + botão de copiar" é um par recorrente (id de
 * registro, chave de API, URL de webhook, token gerado) e cada tela vinha
 * reimplementando os mesmos três detalhes, sempre pela metade: o `try/catch` do
 * `navigator.clipboard`, o fallback para contexto sem Clipboard API (http,
 * iframe antigo) e o aviso de que copiou. Sem o fallback o clique não faz nada
 * e não diz nada — o pior desfecho possível para um botão.
 *
 * Confirma no próprio botão (o rótulo/tooltip vira "Copiado" por 2s) em vez de
 * depender de toast: a confirmação nasce onde o olho está (P11). Quem quiser o
 * toast passa `onCopied`.
 *
 * @param {string} value   texto a copiar (obrigatório)
 * @param {string} label   rótulo visível; sem ele, vira IconButton só-ícone
 * @param {(ok:boolean)=>void} onCopied  chamado após a tentativa
 */
export function CopyButton({ value, label, title = "Copiar", variant = "ghost", size = "sm", onCopied, ...rest }) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function handleCopy() {
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(String(value ?? ""));
        ok = true;
      } else {
        const el = document.createElement("textarea");
        el.value = String(value ?? "");
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        ok = document.execCommand("copy");
        document.body.removeChild(el);
      }
    } catch {
      ok = false;
    }
    if (ok) setCopied(true);
    onCopied?.(ok);
  }

  const texto = copied ? "Copiado" : label;
  const dica = copied ? "Copiado" : title;

  if (!label) {
    return <IconButton icon={copied ? "check" : "copy"} title={dica} aria-label={dica} onClick={handleCopy} {...rest} />;
  }
  return (
    <Button variant={variant} size={size} icon={copied ? "check" : "copy"} title={dica} onClick={handleCopy} {...rest}>
      {texto}
    </Button>
  );
}
