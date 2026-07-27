import React from "react";
import { Card } from "../Card.jsx";
import { EmptyState } from "../Feedback.jsx";

/**
 * MessageScreen — o molde **empty** aplicado a uma tela inteira: o lugar onde o
 * sistema diz que **não há o que mostrar aqui**, e por quê.
 *
 * É o molde `empty` de `STUDIO_UX_TEMPLATES` §2 ("estado vazio de tela inteira"),
 * que também existia só como HTML no gerador. Os casos concretos são sempre os
 * mesmos em qualquer produto: **endereço que não existe**, **acesso que a pessoa
 * não tem**, **recurso que foi removido**, **erro inesperado**.
 *
 * Regra que ele carrega: **nenhum desses casos redireciona em silêncio.** Mandar
 * a pessoa para a home sem dizer nada é o pior desfecho — ela conclui que o
 * sistema travou ou que o clique não pegou, e tenta de novo. Dizer o que
 * aconteceu, em uma frase, e oferecer a saída, custa uma tela.
 *
 * Vive **dentro** da casca quando há sessão (mantém menu e caminho de volta) e
 * sozinho quando não há. Quem decide é o roteamento do produto.
 *
 * @param {string} icon
 * @param {string} title        o que aconteceu, na língua do usuário
 * @param {React.ReactNode} description  por que aconteceu e o que fazer
 * @param {React.ReactNode} [action]     a saída (um ou dois botões)
 * @param {React.ReactNode} [above]      linha acima do card (ex.: a marca)
 */
export function MessageScreen({ icon, title, description, action, above }) {
  return (
    <div className="space-y-6" style={{ display: "flex", flexDirection: "column", gap: "var(--su-space-6)" }}>
      {above}
      <Card>
        <EmptyState icon={icon} title={title} description={description} action={action} />
      </Card>
    </div>
  );
}
