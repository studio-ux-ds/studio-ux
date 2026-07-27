import React from "react";

/**
 * FormGrid — o arranjo de um formulário (`.su-form-grid`).
 *
 * Existe porque o `Field` empilha, um por linha. Num card largo isso deixa dois
 * terços de vazio à direita enquanto o formulário desce para a rolagem — e cada
 * tela vinha resolvendo à mão, com um grid do framework de CSS do consumidor mais
 * uma largura máxima cravada. No IA Studio eram **20 arquivos com o grid montado
 * à mão e 16 larguras diferentes** respondendo à mesma pergunta: qual é a largura
 * de leitura de um formulário? Essa pergunta é do design system.
 *
 * Distribui por `auto-fill` + `minmax`, **sem media query**: o navegador encaixa
 * quantas colunas couberem e cai para uma sozinha em tela estreita. O piso de uma
 * coluna (`--su-form-col-min`) é o que impede duas colunas esmagadas.
 *
 * Alinha pelo **topo**: campo com dica é mais alto que campo sem, e alinhar pela
 * base faz o controle de quem tem dica subir — a linha fica torta. Pelo topo, os
 * rótulos ficam na mesma altura e a dica sobra embaixo de quem a tem.
 *
 * @param {"auto"|1|2|3} [columns="auto"]  dois regimes, como no `CheckGroup`:
 *   · `"auto"` (default) — quantas couberem respeitando o piso de largura.
 *   · número — **teto**. `2` = "no máximo 2, menos se não couber". Use `1` para
 *     formulário de uma coisa só (a largura máxima cai junto, para o campo não
 *     virar uma faixa de 900px onde se digita um nome).
 *
 * Campo que ocupa a linha inteira: `<Field wide>`. É para o que se **escreve** —
 * texto longo, JSON, lista editável. Meia largura transforma o texto numa coluna
 * estreita e alta, e o olho perde a linha.
 *
 * **Botão no fim de uma linha de busca fica DENTRO do campo**, ao lado do
 * controle — não como item próprio do grid. Como item, ele precisaria de uma
 * coluna inteira e de um alinhamento especial (não tem etiqueta em cima), e a
 * linha quebraria antes numa tela média. E a regra que acompanha: numa linha de
 * busca, a dica de um campo vira `placeholder`, não `hint` — a dica embaixo
 * cresce a altura daquela coluna e torce a linha toda.
 */
export function FormGrid({ columns = "auto", className = "", children, ...rest }) {
  const cls = [
    "su-form-grid",
    columns !== "auto" && `su-form-grid--${columns}`,
    className,
  ].filter(Boolean).join(" ");
  return <div className={cls} {...rest}>{children}</div>;
}
