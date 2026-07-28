import React from "react";
import { PageHeader } from "./PageHeader.jsx";
import { Stepper } from "../Stepper.jsx";
import { Card } from "../Card.jsx";
import { Button } from "../Button.jsx";
import { DSIcon } from "../DSIcon.jsx";

/**
 * WizardScreen — o molde **`wizard`** (`STUDIO_UX_TEMPLATES` §2, deriva de
 * `PATTERNS`): o **passo a passo**, quando uma decisão depende da anterior.
 *
 * Regiões: voltar (sair de tudo) → cabeçalho → `Stepper` → conteúdo do passo →
 * ações (Voltar de um lado, Avançar/Concluir do outro).
 *
 * **Quando NÃO usar — a parte que mais economiza retrabalho.** Se todos os
 * campos são independentes, um formulário de uma tela é melhor: o passo a passo
 * esconde metade das perguntas e obriga a ir e voltar para conferir. Wizard só
 * se paga quando **o passo seguinte muda conforme a resposta do anterior**
 * (escolher o provedor define quais credenciais pedir) ou quando cada passo
 * depende de uma ida ao servidor.
 *
 * O que ele fixa:
 *
 * - **É uma ROTA, não um modal.** O passo a passo tem estado que a pessoa não
 *   quer perder por um clique fora, e cada passo merece endereço.
 * - **Voltar é sempre possível**; sair de tudo, também (o `back` do topo). Passo
 *   a passo sem saída é armadilha.
 * - **O botão do último passo diz o que vai acontecer** ("Criar conexão"), não
 *   "Concluir": é a única ação irreversível do fluxo e a pessoa precisa ler o
 *   verbo antes de clicar.
 * - **`Avançar` desabilitado sem dizer por quê é o pior estado possível.** Use
 *   `nextDisabled` junto de `hint`, ou valide no clique com `Toast`.
 *
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [subtitle]
 * @param {{label?:string,onClick:Function}} [back]        sair do passo a passo
 * @param {{label:string}[]} steps
 * @param {number} current                                  1-based
 * @param {Function} [onBack]
 * @param {Function} onNext
 * @param {boolean} [nextDisabled]
 * @param {React.ReactNode} [hint]     por que Avançar está bloqueado / o que falta
 * @param {boolean} [working]
 * @param {string} [nextLabel]         no último passo, o VERBO do que vai acontecer
 * @param {string} [backLabel]
 * @param {boolean} [bare]             conteúdo sem o Card (o passo traz o próprio)
 */
export function WizardScreen({
  title, subtitle, back,
  steps = [], current = 1,
  onBack, onNext, nextDisabled = false, hint, working = false,
  nextLabel, backLabel = "Voltar", bare = false,
  children,
}) {
  const ultimo = current >= steps.length;
  const rotuloAvancar = nextLabel || (ultimo ? "Concluir" : "Avançar");

  return (
    <div className="su-screen">
      {back && (
        <button type="button" className="su-backlink" onClick={back.onClick}>
          <DSIcon name="arrow-left" size="sm" />
          {back.label || "Sair"}
        </button>
      )}

      {(title || subtitle) && <PageHeader title={title} subtitle={subtitle} />}

      {steps.length > 0 && <Stepper steps={steps} current={current} />}

      {bare ? children : <Card>{children}</Card>}

      <div className="su-form-actions su-form-actions--split">
        <Button type="button" variant="ghost" icon="arrow-left" onClick={onBack} disabled={current <= 1 || working}>
          {backLabel}
        </Button>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--su-space-3)" }}>
          {hint && (
            <span style={{ fontSize: "var(--su-fs-body-sm)", color: "var(--su-text-muted)" }}>{hint}</span>
          )}
          <Button type="button" variant="primary" onClick={onNext} loading={working} disabled={nextDisabled}>
            {rotuloAvancar}
          </Button>
        </div>
      </div>
    </div>
  );
}
