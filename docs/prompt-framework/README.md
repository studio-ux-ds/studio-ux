# Framework de prompts — Studio UX

> **Método (agnóstico) vive fora deste projeto**, em `C:\Users\Flowspec\Documents\STUDIO-WORKFLOW\` (paradigma `prompt-framework/v1`). Aqui ficam apenas os artefatos **específicos deste projeto**.

## Método comum (STUDIO-WORKFLOW)

Leia sempre antes de qualquer pedido:

- [`STUDIO-WORKFLOW\README.md`](../../../STUDIO-WORKFLOW/README.md) — porta de entrada.
- [`STUDIO-WORKFLOW\framework.md`](../../../STUDIO-WORKFLOW/framework.md) — especificação normativa do paradigma (schema YAML, tipos, `extends`/`uses`, SemVer por ativo, ciclo de vida, template do ativo).
- [`STUDIO-WORKFLOW\prompt-alinhamento.md`](../../../STUDIO-WORKFLOW/prompt-alinhamento.md) — `workflow.prompt-alignment@2.0.0`. Bloco a colar + formato do relatório.
- [`STUDIO-WORKFLOW\shared\system-change-base.md`](../../../STUDIO-WORKFLOW/shared/system-change-base.md) — `workflow.system-change-base@1.0.0`. **Capability base** que toda especialidade local herda via `extends`.
- [`STUDIO-WORKFLOW\architecture-review.md`](../../../STUDIO-WORKFLOW/architecture-review.md) — ADR do paradigma.
- [`STUDIO-WORKFLOW\COMO-INTERAGIR-COM-ROBSON.md`](../../../STUDIO-WORKFLOW/COMO-INTERAGIR-COM-ROBSON.md) — regras de comportamento com o Robson.

## Específico do Studio UX (fica aqui)

- [`catalogo-especialidades.md`](catalogo-especialidades.md) — as especialidades deste projeto (domínio: design system).
- [`especialidades/*.md`](especialidades/) — o método de trabalho de cada uma, apontando para pacotes/arquivos reais deste repositório.

**Pendente de migração** (Frente 3 do plano de adoção): `catalogo-especialidades.md` e `especialidades/*.md` locais ainda estão no formato markdown livre (paradigma v2.1.0). A migração pro schema formal `prompt-framework/v1` (front matter YAML + `extends: workflow.system-change-base@1.0.0` + `inputs/outputs` + critérios de aceite tabulados) é frente separada, com aprovação explícita.

## Versão consumida

`STUDIO-WORKFLOW v3.0.0` (paradigma `prompt-framework/v1`).

---

*Se o método precisar mudar, muda no STUDIO-WORKFLOW e bumpa o SemVer lá; aqui só se muda o catálogo ou as especialidades locais.*
