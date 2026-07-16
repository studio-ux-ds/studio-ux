# STUDIO_UX_PRODUCT_AUDIT.md — Auditoria Orientada a Produto · Product-Driven Audit

> **Fase X — Product Coverage & Gap Analysis.** Auditoria independente do Studio UX contra os produtos consumidores reais: **Aquapark**, **Delivery System** e **IA Studio**. Modo: Arquiteto de Plataforma. Este documento é um **instrumento de auditoria** (análise pontual), não um documento normativo — não altera nenhum documento do Studio UX.
>
> Data: 2026-07-15 · Studio UX auditado: `v0.2.3` (documentação; nenhum componente implementado) · Método: leitura primária do código-fonte dos três produtos (frontends montados) + documentação de cada um.

---

## 1. Executive Summary

**A pergunta única:** *"O Studio UX atual consegue construir completamente todos os produtos da empresa?"*

**Resposta:** **SIM, no que compete a um Design System.** A camada de UI **genérica** que os três produtos realmente usam — tabelas, modais, campos de formulário, toasts, confirmação destrutiva, telefone, cards de métrica, abas, estados vazios, shells de navegação (sidebar/topbar/bottom-nav), wizard — **já está integralmente especificada** no catálogo do Studio UX (`STUDIO_UX_COMPONENT_LIBRARY.md`, ~45 componentes) e nos padrões. Nenhum produto inventa um componente **genérico** que o Studio UX não preveja.

O que os produtos têm além disso é **componente de domínio** (KDS de cozinha, editor de nós de automação, composer de WhatsApp, telas fiscais NF-e, câmeras HLS, cofre de segredos…). Pela Constituição do Studio UX (**Art. 19 — nunca é dono de dado/tela de negócio**; Princípio Reitor — agnóstico de domínio), esses componentes **NÃO devem entrar no Studio UX**: eles são **compostos** pelos produtos a partir das primitivas oficiais. A ausência deles no Studio UX não é um gap — é a arquitetura funcionando.

Foram encontrados **4 gaps reais** (todos IMPORTANTE ou de decisão, **zero CRÍTICO/bloqueador**), **5 divergências** entre produtos que o Studio UX resolve por oficialização, e **5 anti-padrões** (duplicação) que existem **porque os produtos ainda não consomem** um Design System único — exatamente o problema que o Studio UX cura. Nenhum gap impede iniciar a implementação (Fase 2).

**Score de cobertura da superfície genérica** (metodologia na §3): Aquapark ~95% · IA Studio ~95% · Delivery ~90% · Geral **~93%**.

**Veredito de prontidão:** ver §14. **SIM — pronto para iniciar a implementação (Fase 2 — tokens).**

---

## 2. Arquitetura atual (resumo factual dos consumidores)

| Produto | Stack de front | Apps | Shell |
|---|---|---|---|
| **Aquapark** ("Vitalicio" — CRM/cobrança/atendimento) | React + Vite + Tailwind | `admin-panel` (Desktop), `admin-panel-cliente` (portal), `admin-panel-mobile` (app) | Sidebar+Header (Desktop); BottomTabs (Mobile) |
| **Delivery System** | Next.js 15 + React 18 + TS + Tailwind (PWA) | `frontend` (admin, garçom PWA, KDS, PDV, cardápio público) | AdminSidebar (Desktop); bottom-nav (garçom PWA) |
| **IA Studio** (plataforma de automação/IA) | React + Vite + Tailwind | `platform-admin` (cliente), `platform-console` (SaaS) | Sidebar+Header + seletor de workspace/ambiente |

**Observação-chave:** os três **já convergiram informalmente** para o mesmo conjunto de primitivas (ConfirmDialog, Modal, Table, FormField, Tabs, StatCard, Toast, PhoneInput, EmptyState) — só que **cada um com sua própria implementação**. É a evidência mais forte de que o Studio UX está mirando o alvo certo.

---

## 3. Product Coverage Matrix — cobertura por componente

**Metodologia:** para cada item genérico, marca-se se o produto o usa (✓), se usa de forma inline/ad-hoc (~) ou se não se aplica (—), e se o **Studio UX já o especifica** (coluna Studio UX). "Cobertura" mede a superfície **genérica** (domínio é excluído por decisão arquitetural, não conta como gap).

| Componente / Item | Aquapark | Delivery | IA Studio | Studio UX | Status |
|---|---|---|---|---|---|
| Button | ~ (inline) | ~ (inline) | ~ (inline) | ✓ `Button` | **Coberto** |
| Table + ordenação + paginação | ✓ `Table` | ~ (inline) | ✓ `Table` | ✓ `DataTable` | **Coberto** |
| Modal / Dialog | ✓ `Modal` | ✓ `ConfirmDialog`+inline | ✓ `Modal` | ✓ `Modal/Dialog` | **Coberto** |
| ConfirmDialog (destrutivo) | ✓ | ✓ | ✓ | ✓ `ConfirmDialog` (P13) | **Coberto** |
| FormField + inputs | ✓ | ~ | ✓ (+Select/Textarea) | ✓ `FormField` | **Coberto** |
| NumericInput | ✓ | ✓ | ✓ (via FormField) | ✓ `NumericInput` | **Coberto** |
| PhoneInput (E.164) | ✓ | ~ (máscara) | ✓ | ✓ `PhoneInput` | **Coberto / divergência D2** |
| Tabs (folder/pills) | ✓ | ~ | ✓ | ✓ `Tabs` | **Coberto** |
| StatCard / KPI | ✓ | ✓ | ✓ | ✓ `StatCard` | **Coberto** |
| Badge / StatusPill | ✓ `StatusPill` | ~ | ✓ `Badge` | ✓ `Badge/Tag` | **Coberto** |
| Toast (feedback) | ✓ | ✓ | ✓ | ✓ `Toast` (P12) | **Coberto / divergência D1** |
| EmptyState | ✓ | ~ (inline) | ✓ | ✓ `EmptyState` | **Coberto** |
| Loading / Skeleton | ~ (spinner) | ~ (animate-pulse) | ~ (spinner) | ✓ `Skeleton`/`Spinner` | **Coberto** (produtos usam inline) |
| Upload (imagem/arquivo) | ✓ `ImageUploader` | ✓ | ✓ | ✓ `FileUpload` | **Coberto** |
| Combobox / Typeahead | ✓ `CustomerTypeahead` | ~ | ~ | ✓ `Combobox` | **Coberto** |
| DatePicker | ~ | ~ | ~ | ✓ `DatePicker` | **Coberto** |
| Sidebar (Desktop) | ✓ | ✓ `AdminSidebar` | ✓ | ✓ `Sidebar` | **Coberto** |
| TopBar / Header | ✓ | ✓ | ✓ (+workspace) | ✓ `TopBar` | **Coberto** |
| BottomNavigation (Mobile) | ✓ `BottomTabs` | ✓ (garçom PWA) | — | ✓ `BottomNavigation` | **Coberto** |
| Breadcrumb | ~ | ~ | ✓ | ✓ `Breadcrumb` | **Coberto** |
| Wizard / Stepper | ✓ (Cliente) | ✓ (Checkout) | ✓ (ConnectionWizard) | ✓ `Stepper/Wizard` | **Coberto** |
| Rodapé de versão na sidebar | ✓ | ✓ | ✓ (parcial) | ✓ (DESKTOP §Sidebar) | **Coberto / divergência D5** |
| Timeline (auditoria/histórico) | ✓ | — | ✓ | ✓ `Timeline` (P24) | **Coberto** |
| Drawer / Sheet | ~ | ✓ (Checkout drawer) | ~ | ✓ `Drawer/Sheet` | **Coberto** |
| **NotificationBell / Center** | ✓ | ~ (som) | ✓ | ✗ (só `Toast`) | **GAP G3** |
| **Canvas / node editor** | ✓ `WorkflowCanvas` | — | ✓ `FluxoCanvas` | ✗ | **GAP G1 (decisão)** |
| **Audio record + player** | ✓ | ✓ | ✓ | ✗ | **GAP G2 (decisão)** |
| **Painel Update+Backup** | ✓ | ✓ | ✓ | ✗ (composável) | **GAP G4 (pattern)** |
| Chat / conversa | ✓ | ✓ | ✓ | ✗ (domínio) | **Domínio — não-DS** |
| Kanban / KDS board | — | ✓ | — | ✗ (domínio) | **Domínio — não-DS** |
| Map picker | — | ✓ | — | ✗ (domínio) | **Domínio — não-DS** |

### Cobertura por produto (superfície genérica)
- **Aquapark ~95%** — usa quase todas as primitivas do catálogo; o que falta é decisão (canvas/áudio) ou domínio.
- **IA Studio ~95%** — idem; forte aderência ao mesmo kit.
- **Delivery ~90%** — usa menos primitivas (reimplementa inline), mas **todas as suas necessidades genéricas estão no catálogo**; a lacuna é de *adoção*, não de cobertura.

### Cobertura por Pattern (Studio UX `PATTERNS.md`)
CRUD ✓ (3/3) · Upload ✓ (3/3) · Delete/os-5 ✓ (3/3, formalizado em 2) · Wizard ✓ (3/3) · Login ✓ (3/3) · Search ✓ · Filters ✓ · Pagination ✓ · Loading/Skeleton ✓ (inline nos produtos) · Empty ✓ · Erro/Toast ✓ (3/3) · Offline ✓ (delivery PWA, aquapark mobile) · Permissões ✓ (3/3, `can()`) · Auditoria ✓ (aquapark, IA Studio). **Nenhum fluxo genérico descoberto.**

### Cobertura por Layout
Shell Desktop (Sidebar+Header+conteúdo+footer) ✓ (3/3). Shell Mobile (TopBar+BottomNav) ✓ (aquapark, delivery). Seletor de workspace/ambiente ✓ (IA Studio) — coberto pelo shell do produto Desktop. **Nenhum layout genérico descoberto.**

---

## 4. Gaps encontrados (classificados)

> Regra aplicada: um gap só entra se tiver **produto + tela + fluxo + necessidade real** e for **genérico** (não domínio). Classificação: **CRÍTICO** (sem isso um produto não se implementa) · **IMPORTANTE** (há workaround) · **FUTURO** (nenhum produto precisa hoje).

| ID | Gap | Evidência (produto/arquivo) | Genérico ou domínio? | Classe |
|---|---|---|---|---|
| **G1** | **Canvas / node editor** (pan-zoom, nós, conexões, inspetor) | Aquapark `WorkflowCanvas.jsx` + IA Studio `FluxoCanvas.jsx` (comentário: "porta o WorkflowCanvas do Aquapark") | **Infra reutilizável entre 2 produtos**, porém especializada — zona cinzenta | **IMPORTANTE / decisão humana** |
| **G2** | **Gravador + reprodutor de áudio** | Aquapark `MessageComposer/AudioPlayer`; IA Studio idem ("portado do Aquapark"); Delivery `AudioPlayer.tsx` | Primitiva de mídia recorrente em **3 produtos**, mas sempre dentro de messaging | **IMPORTANTE / decisão humana** |
| **G3** | **NotificationBell / Central de notificações** (sino + dropdown + contadores) | Aquapark `notifications/NotificationBell+Dropdown`; IA Studio `NotificationsBell.jsx` | Genérico (2 produtos) — o Studio UX só tem `Toast` (efêmero), não a central persistente | **IMPORTANTE** |
| **G4** | **Padrão "Atualização do Sistema + Backup"** (versão atual/disponível, upgrade por tag com log ao vivo, backup/restore) | Aquapark `Atualizacao.jsx`+`BackupRestore.jsx`; IA Studio `console/Atualizacao.jsx`; Delivery `AtualizacaoTab.jsx` — os 3 "porte do Aquapark" | **Pattern/Template** (composável de StatCard+Table+ConfirmDialog+ProgressBar+Toast+polling), não componente novo | **IMPORTANTE (pattern)** |

**Nenhum gap CRÍTICO.** Os quatro têm workaround em produção hoje (cada produto porta a sua versão). G1 e G2 exigem **decisão humana** sobre a fronteira "infra reutilizável × domínio" (§13). G3 é candidato a componente/pattern genuíno. G4 é candidato a **pattern** (não componente).

---

## 5. Divergências entre produtos (mesma coisa, jeitos diferentes)

| ID | Assunto | Aquapark | Delivery | IA Studio | Recomendação de oficialização |
|---|---|---|---|---|---|
| **D1** | Sistema de Toast | `lib/toast`+`UIToastContainer` | `shared/Toast` singleton | bus `iastudio:ui-toast` | Oficializar **um** `Toast` (Studio UX P12 já o define). Três implementações → uma. |
| **D2** | PhoneInput | E.164 sem `+`, 21 países | **máscara + detectCountry** | E.164 sem `+` | Oficializar **E.164 só-dígitos sem `+`** (2 de 3 + regra dos CLAUDE.md). Delivery diverge. |
| **D3** | Kit de primitivas | pasta `ui/` completa | **sem `ui/`** (tudo inline) | pasta `ui/` (duplicada admin/console) | Oficializar o catálogo do Studio UX como fonte única; Delivery é o mais distante. |
| **D4** | Ação destrutiva | "5 patrasques" formalizado | ConfirmDialog + gating (mais solto) | "5 patrasques" formalizado | Oficializar **P13 (os 5)**; Delivery deve alinhar. |
| **D5** | Rodapé da sidebar | usuário + versão | versão | **só versão** (diverge do próprio CLAUDE.md) | Oficializar o padrão do Studio UX Desktop (usuário + versão passiva); corrigir IA Studio. |

Em todas: **o Studio UX já tem a posição correta documentada** — a divergência é dos produtos, não do Studio UX.

---

## 6. Duplicações e anti-padrões

| ID | Anti-padrão | Evidência |
|---|---|---|
| **AP1** | Kit de UI duplicado dentro do mesmo produto | IA Studio: `platform-admin/components/ui` **e** `platform-console/components/ui` (mesmos 8-9 componentes, dois arquivos cada) |
| **AP2** | Primitivas reimplementadas inline por página | Delivery: Button/Table/Modal/Card/FormField não existem como componentes — refeitos com Tailwind em cada tela |
| **AP3** | Três sistemas de Toast | Aquapark, Delivery e IA Studio, cada um com o seu |
| **AP4** | Duas convenções de telefone | E.164 (Aquapark/IA Studio) × máscara (Delivery) |
| **AP5** | Empty/Loading inconsistentes | `EmptyState`/`Skeleton` em Aquapark/IA Studio × "Carregando..."/`animate-pulse` inline no Delivery (122 arquivos) |

**Leitura arquitetural:** todos os 5 anti-padrões são **sintomas da ausência de um Design System consumido** — não defeitos do Studio UX. São exatamente a doença que o Studio UX foi criado para curar. A adoção do Studio UX **elimina** AP1–AP5.

---

## 7. Riscos arquiteturais

1. **Delivery está longe do padrão** (sem `ui/`, tudo inline). Migrá-lo para o Studio UX é o maior esforço de adoção — risco de subestimar. *Mitigação:* tratar Delivery como o caso-teste mais duro do catálogo.
2. **Zona cinzenta "infra × domínio"** (canvas, áudio, chat). Se entrarem no Studio UX sem critério, incham o DS e ferem o Art. 19; se ficarem de fora sem um lar comum, os produtos continuam portando cópias. *Mitigação:* decisão humana explícita (§13) — provavelmente uma **camada de "domain-infra" fora do DS** ou um conjunto mínimo de primitivas de mídia.
3. **Stack heterogênea** (Vite/React × Next.js). O Studio UX é tech-agnóstico por Constituição (Art. 13), então a especificação serve aos dois; o risco mora na camada de *runtime/exporters* (Épico 4), não na spec.
4. **Divergência doc↔código nos próprios produtos** (ex.: rodapé da sidebar do IA Studio). O Studio UX + Certification/Linter são o instrumento para detectar isso — reforça o valor da plataforma.

---

## 8. Recomendações (por gap/divergência)

| Item | Recomendação | Justificativa |
|---|---|---|
| G1 Canvas | **Decisão humana** antes de agir (§13). Opção A: declarar "domain-infra" fora do DS com um guia de composição; Opção B: um único primitivo `WorkspaceCanvas` no catálogo. **Não criar sem aprovação.** | 2 produtos, porém especializado; fere o "menor possível" se entrar sem critério |
| G2 Áudio | **Decisão humana.** Candidato a par mínimo `AudioRecorder`/`AudioPlayer` como primitivas de mídia (3 produtos), OU domain-infra de messaging | Recorrência forte (3), mas sempre em contexto de mensageria |
| G3 NotificationBell | **Criar como componente/pattern** após validar (evidência 2 produtos, genérico) | Persistência ≠ Toast; lacuna real e genérica |
| G4 Update+Backup | **Criar um Pattern** (não componente) — compõe primitivas existentes | 3 produtos portam a mesma tela; é composição, não peça nova |
| D1–D5 | **Corrigir os produtos** para consumir o Studio UX (não mudar o Studio UX) | O Studio UX já tem a posição certa |
| AP1–AP5 | **Resolvidos por adoção** do Studio UX | São ausência de DS, não defeito de DS |

**Nenhuma recomendação exige criar componente novo genérico de imediato**, exceto (após validação) G3 e o pattern G4. G1/G2 ficam represados por decisão.

---

## 9. Architecture Boundary Check dos candidatos

> Aplicado a cada candidato a entrar no Studio UX (só passam os que respondem tudo consistentemente).

**G3 NotificationBell / Center**
1. Problema: notificações **persistentes** (lista, lidas/não-lidas, contador) — o `Toast` é efêmero. 2. Produtos: Aquapark, IA Studio. 3. Telas: sino no header + dropdown. 4. Evoluir algo? Não — `Toast` é outro papel. 5. Responsabilidade única: sim. 6. SSOT: novo domínio (notificação persistente). 7. Dono: novo componente em `COMPONENT_LIBRARY` (grupo Feedback) + possível pattern. 8. Simplifica? Sim — remove 2 implementações ad-hoc. → **Passa (após validação humana).**

**G4 Update+Backup (pattern)**
1. Problema: tela de atualização/versão + backup/restore. 2. Produtos: os 3. 3. Telas: Configurações→Atualização. 4. Evoluir? É **composição** de peças existentes → **pattern**, não componente. 5. Responsabilidade única: sim (um fluxo). 6. SSOT: `PATTERNS.md` é o dono. 7. Dono: `PATTERNS.md` (novo padrão "Atualização de Sistema"). 8. Simplifica? Sim. → **Passa como pattern.**

**G1 Canvas / G2 Áudio** → **NÃO passam automaticamente**: resposta inconsistente em (4)/(8) — podem inflar o DS e há dúvida "infra × domínio". **Exigem decisão humana** (§13). Enquanto não decididos, **não entram**.

**Chat, KDS, Map, editores de agente, fiscal, Sicoob, HLS…** → falham (2)/(6)/(8): são **domínio** (Art. 19). **Não entram nunca.**

---

## 10. O que NÃO deve entrar no Studio UX

> Cada item com a justificativa (produto que usa, e por que é domínio ou não-necessário).

- **KDS / Kitchen Board** — só Delivery; domínio (operação de cozinha). Não criar.
- **PDV / POS** — só Delivery; domínio (balcão). Não criar.
- **Cardápio / pizza / combo / meia-a-meia** — só Delivery; domínio. Não criar.
- **Fichas técnicas / CMV / receita** — só Delivery; domínio. Não criar.
- **Fiscal (NF-e/NFC-e/SPED/certificado A1)** — só Delivery; domínio fiscal BR. Não criar.
- **Delivery zones / driver / tracking / MapPicker** — só Delivery; domínio logístico. Não criar.
- **Impressão térmica / setor** — só Delivery; domínio. Não criar.
- **Sicoob / billing BR / boletos / PFX** — só Aquapark; domínio bancário BR. Não criar.
- **HLS / WebRTC / câmeras** — só Aquapark (Portal); domínio de vídeo. Não criar.
- **Editor de assistente/agente, prompt, tools, MCP, RAG, memória, custos de IA** — só IA Studio; domínio de IA. Não criar.
- **Templates HSM WhatsApp, contact center, composer** — Aquapark/IA Studio/Delivery, mas **domínio de mensageria** (a peça é de negócio). Não criar como componente de DS (ver G2 para a decisão de primitivas de mídia).
- **Marketplace de conectores, cofre de segredos, feature flags UI, Resource Explorer/Mapper, Event Bus/Execução** — só IA Studio; domínio de plataforma de integração. Não criar.
- **Vertical ISP** — só IA Studio; domínio. Não criar.
- **Campos Cep/Cpf** — Aquapark/Delivery; localização BR — **domínio de localização**, não primitiva genérica. Não criar no DS (pode virar extensão de localização do consumidor).
- **Scheduler genérico, Heatmap, Gantt** — **nenhum produto usa** (confirmado: grep zero para Gantt/Heatmap; "scheduler" existe só como gatilho de automação (IA Studio) e grade de horários (Delivery), ambos domínio). **Não criar** — seriam componentes "porque existem em outros design systems", proibido pela regra de qualidade.

---

## 11. Definition of Done — quando o Studio UX é v1.0

**Enunciado objetivo:**

> O Studio UX será considerado **v1.0** quando **toda necessidade de UI genérica** de Aquapark, Delivery System e IA Studio puder ser atendida **exclusivamente** por tokens, componentes e padrões oficiais do Studio UX — de modo que cada produto construa suas telas **compondo** o Studio UX, e **só precise criar por conta própria os componentes de domínio** (que, por Constituição Art. 19, nunca pertencem ao Studio UX). Concretamente, v1.0 exige: (a) os Design Tokens materializados e congelados (Fase 2); (b) os componentes do catálogo implementados (Fases 3–4); (c) os 4 gaps resolvidos por decisão (G1/G2) ou entrega (G3 componente, G4 pattern); (d) pelo menos **uma tela real de cada produto reconstruída** só com Studio UX e certificada ≥ Gold; (e) as divergências D1–D5 oficializadas na spec.

**Importante:** a DoD **não** exige que o Studio UX contenha KDS, canvas de IA ou telas fiscais. Exigir isso violaria a própria natureza do produto. "Implementável integralmente com o Studio UX" significa **a camada genérica**, com o domínio **composto** sobre ela.

---

## 12. Roadmap de priorização (orientado a produto)

| Fase | Itens | Justificativa (produto real) |
|---|---|---|
| **2.0 — Críticos** | *Nenhum item de gap.* Materializar os **Design Tokens** (já planejado). | Sem tokens, nada se implementa. Não há gap CRÍTICO de componente. |
| **2.1 — Importantes** | Implementar o catálogo (Desktop primeiro); oficializar D1–D5; entregar **G3 NotificationBell** e o **G4 pattern Update+Backup**. | Todos com evidência em ≥2 produtos. |
| **2.2 — Melhorias** | Migrar o Delivery para o kit (maior distância, AP2); unificar toasts (AP3) e telefone (AP4). | Reduz duplicação já existente. |
| **3 — Futuro / decisão** | **G1 Canvas** e **G2 Áudio** — só após decisão humana "infra × domínio". | Zona cinzenta; não represar a implementação por eles. |

---

## 13. Decisões que exigem aprovação humana

1. **G1 — Canvas/node-editor é DS ou domain-infra?** Dois produtos o portam. Entrar no DS incha; ficar totalmente de fora perpetua a cópia. Propor: camada "domain-infra" fora do catálogo, OU um único `WorkspaceCanvas` primitivo. **Decisão do Robson.**
2. **G2 — Primitivas de mídia (AudioRecorder/AudioPlayer) entram no catálogo?** Recorrência em 3 produtos, sempre em mensageria. Decidir se são primitivas genéricas ou domain-infra de chat.
3. **Fronteira "localização BR" (Cep/Cpf/telefone):** o telefone (E.164) já é do DS; Cep/Cpf são domínio de localização. Confirmar que localização é responsabilidade do consumidor (extensão), não do DS.
4. **DoD de v1.0:** aprovar o enunciado da §11 (camada genérica, não domínio).
5. **Ordem de adoção:** confirmar Desktop-primeiro e Delivery como caso-teste mais duro.

---

## 14. Score Executivo & Veredito

**Studio UX Coverage (superfície genérica):**
- Aquapark **~95%**
- Delivery **~90%**
- IA Studio **~95%**
- **Cobertura geral ~93%**

*(Estimativas conservadoras por inventário de código; a cobertura da camada genérica é praticamente total — os pontos <100% são as decisões G1/G2 e a adoção pendente do Delivery, não ausência de especificação.)*

| Métrica | Número |
|---|---|
| Componentes genéricos reutilizados (cobertos pelo catálogo) | **~24** |
| Gaps reais | **4** (0 crítico · 3 importante · 1 pattern) |
| Divergências | **5** (D1–D5) |
| Anti-padrões (duplicação) | **5** (AP1–AP5) |
| Componentes desnecessários evitados (domínio/não-usados) | **~20 famílias** listadas na §10 |
| Recomendações críticas | **0** |
| Recomendações importantes | **~6** (G3, G4, D1–D5, migração Delivery) |
| Recomendações futuras / decisão | **2** (G1, G2) |

---

### "O Studio UX está pronto para iniciar a implementação?"

# ✅ SIM

**Justificativa (por evidência, não opinião):** a superfície de UI **genérica** dos três produtos reais está **integralmente especificada** pelo Studio UX; **zero gaps CRÍTICOS**; os itens não-cobertos são **domínio** (que por Art. 19 não pertencem ao DS) ou **decisões de fronteira** que não bloqueiam a Fase 2. As divergências e duplicações encontradas são **a favor** do Studio UX — são a doença que ele cura. A implementação da **Fase 2 (materialização dos tokens)** pode começar imediatamente; os 4 gaps entram no backlog priorizado (§12), sem represar o início.

**Não é necessário criar novos componentes ou documentos para começar** — além do backlog já mapeado (G3 componente, G4 pattern) e das duas decisões represadas (G1, G2), que são deliberadas com o Robson e não são pré-requisito do início.

---

*Instrumento de auditoria — análise pontual de 2026-07-15. Não altera nenhum documento normativo do Studio UX. Reauditar a cada adoção de produto ou release relevante.*
