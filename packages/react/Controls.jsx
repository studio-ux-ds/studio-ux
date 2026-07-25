import React from "react";

/** Select — .su-select. */
export function Select({ className = "", children, ...rest }) {
  return <select className={["su-select", className].filter(Boolean).join(" ")} {...rest}>{children}</select>;
}

/**
 * Checkbox — `.su-checkbox` (quadrado: cabe VÁRIOS). Rótulo opcional à direita.
 * @param {boolean} [inline] põe a opção na mesma linha das vizinhas. O default é
 *   EMPILHAR: uma lista de opções é vertical. (Até a v1.2.15 o rótulo era
 *   `inline-flex` e várias opções seguidas fluíam na mesma linha, com o texto de
 *   uma encostando no controle da próxima.)
 */
export function Checkbox({ label, className = "", id, inline = false, ...rest }) {
  const input = <input type="checkbox" id={id} className={["su-checkbox", className].filter(Boolean).join(" ")} {...rest} />;
  if (!label) return input;
  return (
    <label htmlFor={id} className={["su-check", inline && "su-check--inline"].filter(Boolean).join(" ")}>
      {input}<span>{label}</span>
    </label>
  );
}

/**
 * CheckGroup — container de uma LISTA de `Checkbox`/`Radio` (`.su-check-group`).
 *
 * Existe porque montar o layout de um grupo era trabalho do consumidor (um `div`
 * com `space-y-*`), e o resultado empilhava uma opção por linha: num card largo
 * sobravam dois terços de vazio e a lista descia pra rolagem.
 *
 * Distribui em COLUNAS por `auto-fill` + `minmax`, sem media query — o navegador
 * encaixa quantas couberem e cai pra uma sozinho em tela estreita.
 *
 * @param {"auto"|1|2|3|4} [columns="auto"]  quantas colunas no máximo. `auto` é
 *   o default (o mesmo que 3): usa o espaço que tem. Use 1 quando cada opção traz
 *   texto explicativo longo e a leitura em coluna única é melhor; 2 para rótulos
 *   de uma frase; 3 ou 4 para rótulos curtos (nomes, chaves).
 * @param {string} [role]  passe `"group"` (checkboxes) ou `"radiogroup"` (radios)
 *   com um `aria-labelledby` apontando pro título da seção, quando o grupo tem
 *   um título visível.
 */
export function CheckGroup({ columns = "auto", className = "", children, ...rest }) {
  const n = columns === "auto" ? 3 : columns;
  return (
    <div className={["su-check-group", `su-check-group--${n}`, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}

/**
 * Radio — `.su-radio` (círculo: cabe UM). Radios do mesmo grupo precisam do
 * mesmo `name`, senão cada um é um grupo de um só e as setas do teclado não
 * andam entre eles.
 * @param {boolean} [inline] mesma linha das vizinhas; o default é empilhar.
 */
export function Radio({ label, className = "", id, inline = false, ...rest }) {
  const input = <input type="radio" id={id} className={["su-radio", className].filter(Boolean).join(" ")} {...rest} />;
  if (!label) return input;
  return (
    <label htmlFor={id} className={["su-check", inline && "su-check--inline"].filter(Boolean).join(" ")}>
      {input}<span>{label}</span>
    </label>
  );
}

/** Switch / Toggle — .su-switch (controlado). */
export function Switch({ checked, onChange, "aria-label": ariaLabel }) {
  return (
    <label className="su-switch">
      <input type="checkbox" checked={checked} onChange={(e) => onChange && onChange(e.target.checked)} aria-label={ariaLabel} />
      <span className="su-switch__track" />
    </label>
  );
}

/**
 * SegmentedControl — .su-segmented. Controlado por value/onChange.
 * @param {{id:string,label:string}[]} items
 */
export function SegmentedControl({ items, value, onChange }) {
  return (
    <div className="su-segmented" role="tablist">
      {items.map((it) => (
        <button key={it.id} role="tab" aria-selected={value === it.id}
          className={["su-segment", value === it.id && "su-segment--active"].filter(Boolean).join(" ")}
          onClick={() => onChange && onChange(it.id)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
