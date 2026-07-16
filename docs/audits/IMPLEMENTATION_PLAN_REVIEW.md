# IMPLEMENTATION_PLAN_REVIEW.md — Plano Oficial de Execução · Official Execution Plan

> **Phase X.1 — Do documento à implementação.** Este é um **plano de execução**, não um roadmap conceitual (esse é o `STUDIO_UX_ROADMAP.md`). Responde: em que ordem implementar, qual sequência reduz risco e qual maximiza reutilização. Instrumento de planejamento em `docs/audits/` — não é documento normativo e não altera nenhum documento do Studio UX.
>
> Data: 2026-07-15 · Base: `STUDIO_UX_PRODUCT_AUDIT.md` (cobertura ~93%, 0 gaps críticos) · Studio UX: `v0.2.3` (spec congelável).

---

## 1. Princípio-guia do plano

**Sequência que reduz risco = sequência que respeita o grafo de dependências do `PACKAGES.md`.** Nada se implementa antes do que ele depende. A ordem física `core → tokens → components → desktop/mobile → templates` **é** o plano de execução — cada camada só começa quando a de baixo está congelada e validada. Isto também maximiza reutilização: cada camada é consumida por várias acima, então acertá-la primeiro rende em todas.

**Regra de ritmo (herdada, Art. 15):** uma frente por vez, validação humana entre frentes. Sem empilhar.

---

## 2. Fases de implementação (execução)

| Fase | Nome | Entrega | Depende de | Versão |
|---|---|---|---|---|
| **2** | Tokens | Valores concretos congelados (cor, tipografia, espaço, raio, elevação, motion) + temas claro/escuro/marca | Spec da fundação (congelada) | `v1.0.0` (tokens) |
| **3** | Componentes Desktop | Catálogo implementado, Desktop primeiro | Tokens `v1.0.0` | `v1.x` |
| **4** | Componentes Mobile | Catálogo Mobile, projetado do zero | Tokens `v1.0.0` + vocabulário estabilizado na F3 | `v1.x` |
| **5** | Templates & Playground & Exemplos | Moldes de tela (arquétipos), playground vivo, exemplos certificados | Componentes | `v1.x` |
| **6** | Adoção pelos produtos | Migração de Aquapark → IA Studio → Delivery | Templates + componentes | `v1.x`+ |

> **Fase 1.6 (UI Exploration)** permanece **pré-requisito da Fase 2**: validar a linguagem visual (estudos em `research/ui-exploration/`) antes de cravar valores de token. É o portão que evita materializar uma estética que não convence.

---

## 3. Sprints por fase (objetivos + critério de conclusão)

### Fase 2 — Tokens
- **S2.1 Primitivos:** paleta bruta, escala numérica de espaço/raio, escala tipográfica, durações. *Conclui quando:* toda escala primitiva tem valores nomeados em inglês, sem literais.
- **S2.2 Semânticos:** mapear papéis (`color.text.primary`, `color.surface.raised`, `space.inset.*`…) sobre os primitivos, nos modos claro **e** escuro. *Conclui quando:* todo papel tem valor nos dois modos **e cumpre contraste AA** (P18) — verificado, não presumido.
- **S2.3 Temas & marca:** eixo de marca/white-label sobre a camada semântica. *Conclui quando:* trocar o tema não exige tocar em nenhuma tela (prova da arquitetura).
- **Critério de conclusão da Fase 2 = `v1.0.0` dos tokens:** nenhum componente futuro precisará inventar um valor.

### Fase 3 — Componentes Desktop
- **S3.x (um componente por vez):** implementar cada componente do catálogo com todos os estados (default/hover/focus/active/disabled/loading/error/empty), acessibilidade (P18–P19) e só tokens (P1). *Conclui cada um quando:* passa a `CERTIFICATION` (dimensões de tokens, estados, acessibilidade) e tem entrada no CHANGELOG.
- **Ordem interna:** primitivas fundamentais (Button, Input/FormField, Table, Modal, Toast, ConfirmDialog) → dados (Card, StatCard, EmptyState, Skeleton) → navegação (Sidebar, TopBar, Tabs, Breadcrumb) → overlays (Drawer, Tooltip, Popover) → compostos (Wizard/Stepper, Timeline).
- **Critério de conclusão:** todo o catálogo Desktop implementado e certificável.

### Fase 4 — Componentes Mobile
- Mesmo rigor, projetado do zero (P4): BottomNavigation, Cards, Sheets, listas tocáveis (≥44px), gestos com alternativa. *Conclui quando:* cada componente Mobile é comprovadamente um projeto próprio, não um Desktop encolhido.

### Fase 5 — Templates, Playground, Exemplos
- Instanciar os arquétipos (Dashboard, DataTable, CRUD, Login, Wizard) só com peças oficiais; playground com todos os estados/temas; ≥1 exemplo por arquétipo certificado ≥ Gold. *Conclui quando:* um consumidor consegue partir de um template.

### Fase 6 — Adoção
- Ver §7 (plano de migração).

---

## 4. Estratégia de Tokens
Materializar **de baixo para cima** (primitivo → semântico → componente). Validar contraste AA em todo par texto-sobre-superfície nos dois temas **antes** de congelar. Congelar os tokens é o marco `v1.0.0` — o primeiro contrato estável que um produto pode declarar. Só depois disso a Fase 3 começa. **Nenhum componente antes dos tokens congelados.**

## 5. Estratégia de Componentes
Um por vez, Desktop primeiro (maior densidade e maior reuso — DataTable/Sidebar/formulários ancoram o resto). Cada componente nasce da **especificação já escrita** no catálogo (propósito/estados/regras) — a implementação é tradução, não redesenho. Só entra no catálogo o que o catálogo já prevê; adição nova de componente segue MINOR + evidência de produto (ver §9 — backlog G3/G4).

## 6. Estratégia Desktop vs Mobile
Desktop e Mobile são **frentes separadas** (P4). Desktop primeiro estabiliza o vocabulário compartilhado de tokens/estados; Mobile começa depois, reusando tokens e identidade, **nunca** layout. Proibido derivar um do outro. Cada produto tem seu playground.

## 7. Estratégia de Templates
Templates saem **depois** dos componentes (dependem deles). Cada arquétipo (`PROJECT_GENERATOR.md`) vira um template composto só de peças oficiais, servindo de ponto de partida conforme para a adoção.

## 8. Estratégia de adoção pelos produtos
Ver o **Plano de Migração** no `FINAL_ARCHITECTURE_REVIEW.md` §7 (resumo: **Aquapark → IA Studio → Delivery**, Desktop antes de Mobile em cada um, começando por uma tela-piloto certificada ≥ Gold).

## 9. Estratégia de Certificação
A `CERTIFICATION` acompanha a implementação desde o primeiro componente: cada peça é certificada ao nascer; cada produto migrado busca o nível de sistema (Bronze→Enterprise). A certificação é o **portão de conclusão** de cada sprint — não um passo final.

## 10. Estratégia de Versionamento
`v0.2.x` até o congelamento dos tokens → **`v1.0.0`** no fim da Fase 2. Depois, MINOR para cada componente/pattern novo (inclui o backlog G3 NotificationBell e G4 pattern Update+Backup, quando implementados), MAJOR só para quebra com guia de migração (`VERSIONING.md`). Tags imutáveis; número confirmado com o Robson.

## 11. Dependências e riscos (resumo)
Dependências: **tudo desce dos tokens**; nada de componente antes deles; Mobile depois do Desktop; templates depois dos componentes; adoção depois dos templates. Riscos detalhados no `FINAL_ARCHITECTURE_REVIEW.md` §6 (com mitigação).

---

*Instrumento de planejamento — 2026-07-15. Não normativo. Companheiro de `FINAL_ARCHITECTURE_REVIEW.md`.*
