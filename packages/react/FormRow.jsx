import React from "react";

/**
 * FormRow — a **linha de ação** de um formulário: um ou mais campos e um botão
 * que age sobre eles, lado a lado. "Adicionar pessoa à equipe", "incluir uma
 * variável", "vincular um recurso".
 *
 * Existe porque essa linha era montada à mão em todo consumidor, sempre com o
 * mesmo `flex items-end gap-2` — e sempre com os mesmos três defeitos:
 *
 * 1. **`items-end` alinha pela BASE da caixa, não pelo controle.** Um campo com
 *    dica é mais alto que o vizinho, então alinhar por baixo empurra o controle
 *    de quem tem dica para cima e joga o botão para a altura do texto da dica. A
 *    linha fica visivelmente torta, e a causa não é óbvia olhando o código.
 * 2. **`flex: 1` num campo faz ele esticar até onde o cartão for.** Num cartão
 *    largo, um seletor de nomes vira uma faixa de 1200px — largura que não ajuda
 *    a ler nem a escolher, só afasta o rótulo do controle.
 * 3. **A dica embaixo empurra a linha.** É a mesma armadilha já documentada no
 *    `FormGrid`, só que aqui com um botão junto, o que torna o desalinho maior.
 *
 * Como o molde resolve: os campos alinham pelo **topo** (a dica passa a pender
 * abaixo do seu próprio campo, sem mexer em ninguém) e a ação carrega uma
 * **etiqueta fantasma** — um rótulo invisível com exatamente a altura de um
 * rótulo de verdade. Assim o botão fica na linha dos controles **por medição, não
 * por número mágico**: se a tipografia mudar, o alinhamento acompanha.
 *
 * O campo principal leva `<Field grow>`; ele cresce até um teto de leitura em vez
 * de ocupar a linha inteira. Campo curto (papel, unidade, quantidade) fica no
 * tamanho natural.
 *
 * **Quando NÃO usar:** para o corpo do formulário, que é `FormGrid` (colunas,
 * sem botão no meio); para uma linha de busca, onde o botão vai **dentro** do
 * campo; para duas ações sem campo, que é só um `<div>` com os botões.
 *
 * @param {React.ReactNode} action  o botão (ou os botões) que agem sobre a linha
 * @param {boolean} [labels=true]   `false` quando nenhum campo da linha tem
 *   rótulo — sem etiqueta para acompanhar, a ação não leva o deslocamento.
 */
export function FormRow({ action, labels = true, className = "", children }) {
  return (
    <div className={["su-form-row", className].filter(Boolean).join(" ")}>
      {children}
      {action && (
        <div className="su-form-row__action">
          {/* Etiqueta fantasma: mesma altura de um rótulo real, invisível e fora
              da árvore de acessibilidade. É o que põe o botão na linha dos
              controles sem cravar pixel. */}
          {labels && <span className="su-field__label" aria-hidden="true">&nbsp;</span>}
          <div className="su-form-row__buttons">{action}</div>
        </div>
      )}
    </div>
  );
}
