import React from "react";

/** Select — .su-select. */
export function Select({ className = "", children, ...rest }) {
  return <select className={["su-select", className].filter(Boolean).join(" ")} {...rest}>{children}</select>;
}

/**
 * Envelope compartilhado por `Checkbox` e `Radio` — o rótulo, a variante em card
 * e a linha de meta. Um só lugar: as duas opções não podem divergir de desenho.
 */
function OptionLabel({ input, id, label, meta, variant, inline }) {
  const card = variant === "card";
  const cls = [
    "su-check",
    card && "su-check--card",
    inline && !card && "su-check--inline",
  ].filter(Boolean).join(" ");
  return (
    <label htmlFor={id} className={cls}>
      {input}
      {card || meta ? (
        <span className="su-check__body">
          <span className="su-check__label">{label}</span>
          {meta && <span className="su-check__meta">{meta}</span>}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </label>
  );
}

/**
 * Checkbox — `.su-checkbox` (quadrado: cabe VÁRIOS). Rótulo opcional à direita.
 * @param {boolean} [inline] põe a opção na mesma linha das vizinhas. O default é
 *   EMPILHAR: uma lista de opções é vertical. (Até a v1.2.15 o rótulo era
 *   `inline-flex` e várias opções seguidas fluíam na mesma linha, com o texto de
 *   uma encostando no controle da próxima.)
 * @param {"plain"|"card"} [variant="plain"]  `card` embrulha a opção numa borda
 *   que acende no accent quando marcada. Use quando a lista é longa, quando cada
 *   item carrega um dado secundário (`meta`), ou quando a leitura é em grade —
 *   sem fronteira visível o olho perde a associação entre o rótulo de uma coluna
 *   e a caixa dela.
 * @param {React.ReactNode} [meta]  linha secundária sob o rótulo: categoria,
 *   contagem, `Badge`s de estado. Aceita nós, não só texto.
 * @param {React.ReactNode} [children]  forma alternativa de dar o rótulo:
 *   `<Checkbox>Segunda</Checkbox>` é o mesmo que `label="Segunda"`. Aceita as
 *   duas porque **as duas são o que se espera de um componente com rótulo em
 *   React** — e até a v1.2.22 passar children DERRUBAVA A PÁGINA: `children`
 *   caía no `...rest`, ia pro `<input>` (elemento vazio) e o React lançava
 *   "input is a void element tag and must neither have children…", desmontando a
 *   árvore inteira. Tela branca por escrever o rótulo do jeito óbvio.
 */
export function Checkbox({ label, children, className = "", id, inline = false, variant = "plain", meta, indeterminate = false, ...rest }) {
  const text = label ?? children;
  // `indeterminate` não é atributo HTML — só existe como propriedade do nó, e
  // por isso precisa de ref. Sem isto, a caixa "marcar todo o grupo" só sabe
  // dizer "todas" ou "nenhuma": com metade do grupo marcado ela aparece VAZIA, o
  // que informa o oposto do que acontece. Era o motivo de o consumidor voltar ao
  // `<input>` cru em toda tela de permissões.
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);
  const input = (
    <input
      ref={ref}
      type="checkbox"
      id={id}
      className={["su-checkbox", className].filter(Boolean).join(" ")}
      aria-checked={indeterminate ? "mixed" : undefined}
      {...rest}
    />
  );
  if (!text) return input;
  return <OptionLabel input={input} id={id} label={text} meta={meta} variant={variant} inline={inline} />;
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
 * @param {"auto"|1|2|3|4} [columns="auto"]  dois regimes:
 *   · `"auto"` (default) — **quantas couberem** com largura mínima legível. Numa
 *     tela larga rende 5, 6 colunas. É o que se quer numa lista longa de rótulos
 *     curtos: densidade máxima sem rolagem.
 *   · número — **teto**. `2` significa "no máximo 2, menos se não couber". Use
 *     quando o rótulo é uma frase e mais colunas partiriam cada uma em três
 *     linhas; use `1` para opção com texto explicativo longo.
 * @param {string} [role]  passe `"group"` (checkboxes) ou `"radiogroup"` (radios)
 *   com um `aria-labelledby` apontando pro título da seção, quando o grupo tem
 *   um título visível.
 */
export function CheckGroup({ columns = "auto", className = "", children, ...rest }) {
  const cls = [
    "su-check-group",
    columns !== "auto" && `su-check-group--${columns}`,
    className,
  ].filter(Boolean).join(" ");
  return <div className={cls} {...rest}>{children}</div>;
}

/**
 * Radio — `.su-radio` (círculo: cabe UM). Radios do mesmo grupo precisam do
 * mesmo `name`, senão cada um é um grupo de um só e as setas do teclado não
 * andam entre eles.
 * @param {boolean} [inline] mesma linha das vizinhas; o default é empilhar.
 * @param {"plain"|"card"} [variant="plain"]  igual ao `Checkbox` — ver lá.
 * @param {React.ReactNode} [meta]  linha secundária sob o rótulo.
 * @param {React.ReactNode} [children]  rótulo, alternativa a `label` — ver o
 *   `Checkbox` para o motivo (até a v1.2.22 children aqui derrubava a página).
 */
export function Radio({ label, children, className = "", id, inline = false, variant = "plain", meta, ...rest }) {
  const text = label ?? children;
  const input = <input type="radio" id={id} className={["su-radio", className].filter(Boolean).join(" ")} {...rest} />;
  if (!text) return input;
  return <OptionLabel input={input} id={id} label={text} meta={meta} variant={variant} inline={inline} />;
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
