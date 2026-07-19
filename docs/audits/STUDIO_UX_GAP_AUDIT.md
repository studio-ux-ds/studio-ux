# STUDIO_UX_GAP_AUDIT.md — Auditoria de completude (doc × código) · 2026-07-19

> Cruza o que a **documentação especifica** contra o que os **pacotes implementam**.
> Motivação (Robson): a doc foi escrita a partir dos sistemas que já existem
> (IA Studio, Aquapark, Delivery). Item documentado e não implementado **não** é
> "evolução futura" — é buraco estrutural que apareceria ao portar esses sistemas.
> Este documento separa o que é **buraco de porte** (fecha antes de adotar a fundo)
> do que é **plataforma futura** (a própria doc já marca como alvo de épico).

> **ATUALIZAÇÃO v1.1.0 (2026-07-19): BLOCO A FECHADO.** Todos os componentes/estados/
> tokens do bloco A foram implementados (CSS + adapter React): Avatar, NumericInput,
> TextArea, Link, Banner desktop, Tag removível, Checkbox indeterminado, e os wrappers
> React de Combobox/FileUpload/CommandPalette/DatePicker; tokens `opacity`/`z-index`/
> `breakpoints` adicionados. O **bloco B (plataforma-ferramenta)** segue como roadmap
> honesto — NÃO foi transformado em stub (Art. 21: não fingir). Item aberto: **paridade
> do adapter React Native** (eixo próprio — o catálogo do RN é o mobile, não o desktop).

## Veredito em uma linha

A **fundação e o grosso da biblioteca de componentes existem e estão em produção**
(o IA Studio já consome). Mas há um **conjunto finito e fechável de componentes/estados**
que a doc promete (porque os 3 sistemas usam) e que **não estão implementados** — esses
são buracos reais de porte. O resto do que "falta" é **ferramental/plataforma que a
própria doc declara como futuro** (CLI, gerador, exporters, linter, devtools, pacotes
de estrutura) — não bloqueia porte e não conta como regressão.

---

## A. BURACOS DE PORTE — componentes/estados prometidos e NÃO implementados

> Estes são os que fariam o Aquapark/IA Studio/Delivery portarem "com falha visível".
> Lista fechável (estimativa: ~1–2 dias de trabalho focado).

### A.1 Componentes que não existem no CSS nem no adapter

| Componente | Doc-fonte | Por que dói no porte | Prioridade |
|---|---|---|---|
| **Avatar** | COMPONENT_LIBRARY grupo A | Usado em TODA parte (usuário na sidebar, chat, listas, participantes). Hoje cada exemplo faz `.avatar` inline. | 🔴 Alta |
| **NumericInput** | COMPONENT_LIBRARY grupo B | **Regra dura nos 3 sistemas** (proibido `input type=number`). Sem ele, todo campo numérico porta errado. | 🔴 Alta |
| **TextArea** | COMPONENT_LIBRARY grupo B | Motivo de cancelamento, mensagem, observação — comum nos 3. | 🟠 Média |
| **DatePicker** | COMPONENT_LIBRARY grupo B | Existe só o CSS `.su-calendar`; falta o componente/composição de seleção de data. | 🟠 Média |
| **Link** | COMPONENT_LIBRARY grupo A | Hoje é `<a>` solto com estilo inline; falta o `.su-link` padronizado. | 🟢 Baixa |
| **Banner (desktop)** | COMPONENT_LIBRARY grupo E | Existe no mobile (`.su-m-banner`); falta o `.su-banner` desktop (aviso de condição contínua/offline). | 🟢 Baixa |

### A.2 Componentes que TÊM CSS mas o adapter React NÃO expõe

> O `components.css` implementa a classe, mas `@studio-ux-ds/react` não tem o wrapper —
> então quem usa o adapter (o caminho do IA Studio) não alcança o componente.

| Componente | CSS existe | React adapter | Prioridade |
|---|---|---|---|
| **Combobox** | `.su-combobox` ✅ | ❌ falta wrapper | 🟠 Média |
| **FileUpload** | `.su-upload` ✅ | ❌ falta wrapper | 🟠 Média |
| **CommandPalette** | `.su-cmdk` ✅ | ❌ falta wrapper | 🟢 Baixa |
| **Calendar/DatePicker** | `.su-calendar` ✅ | ❌ falta wrapper | 🟠 Média |

### A.3 Estados/variantes obrigatórios faltando

| Item | Doc | Situação |
|---|---|---|
| **Checkbox `indeterminate`** | COMPONENT_LIBRARY B | Estado exigido; não implementado. 🟢 |
| **Tag removível (com "x")** | COMPONENT_LIBRARY A | Badge existe; variante Tag-removível (usada em filtros) não. 🟠 |

### A.4 Decisão pendente — Chart/Gráfico

O `DASHBOARD.md` trata **gráfico** como exibição de primeira classe (com estados
loading/empty/erro obrigatórios), mas o **catálogo de componentes não o lista**. Hoje os
exemplos desenham barras com `<div>`. Decisão a tomar: (a) o gráfico é um componente do DS
(criar `Chart` com estados), ou (b) fica delegado a uma lib externa por produto (e a doc
do Dashboard deve dizer isso). Enquanto não decidido, é ambiguidade estrutural. 🟠

---

## B. PLATAFORMA FUTURA — documentada como alvo, não é buraco de porte

> A própria doc (era de documentação) declara estes itens como **especificação/alvo de
> épico**, não como código existente. Não bloqueiam portar telas nem causam regressão —
> um sistema não precisa de "CLI" para renderizar uma tela. Ficam como roadmap real.

### B.1 Pacotes do monorepo não criados
Documentados em `PACKAGES.md` (11 pacotes); implementados: `tokens`, `components`,
`mobile`, `react`, `react-native`. **Não criados:** `core`, `icons`, `desktop`,
`templates`, `playground` (como pacote), `docs` (como pacote), `testing`, `devtools`,
`cli` (futuro).
- **Divergência a registrar:** a spec previa `packages/desktop`/`packages/mobile` como
  camadas de layout; na prática construímos `packages/components` (CSS desktop) + `mobile`
  (CSS mobile) + os adapters `react`/`react-native` (que a spec não nomeava). Funcionalmente
  o alvo foi atendido por outra estrutura — mas a doc e o código precisam ser reconciliados
  (ou renomear, ou atualizar a doc). 🟠 estrutural-documental (não visual).
- **`packages/icons`:** hoje dependemos do Tabler externo. Um pacote de ícones curado é
  previsto; enquanto não existe, o produto carrega o Tabler (funciona, mas não é o "set
  curado" da doc). 🟢

### B.2 Ferramentas/qualidade/geração (Épicos 2–5) — só especificação
Nenhum roda como software hoje; todos documentados como alvo:
- **CLI `studio`** (11 comandos) — `tools/CLI`.
- **DevTools** (9 inspetores) — `tools/DEVTOOLS`.
- **Playground completo** — existe um `playground/index.html` básico, não a ferramenta da spec.
- **Linter** (14 regras) — `quality/LINTER`.
- **Compliance / Certification** (como ferramentas que rodam) — `quality/*`, `CERTIFICATION`.
- **Project Generator** (arquétipos) — `generation/PROJECT_GENERATOR`.
- **Exporters** (10 alvos: Tailwind, Flutter, SwiftUI, Compose, Figma…) — `generation/EXPORTERS`.
- **AI Ecosystem** — `context/AI_ECOSYSTEM`.

Isto é a "plataforma" além do design system. Legítimo como futuro; **não** é dívida de porte.

### B.3 Tokens — grupos possivelmente não materializados
Cor, tipografia, espaço, raio, elevação/sombra e motion estão implementados. A doc de
tokens também nomeia **opacity**, **z-index (camadas nomeadas)**, **transitions (combos)**
e **breakpoints** como famílias. Verificar se estão no `tokens.css`; se não, são adições
pequenas. 🟢

---

## C. Recomendação

1. **Fechar o bloco A antes de portar mais** — é finito e barato (Avatar, NumericInput,
   TextArea, DatePicker + wrappers React de Combobox/Upload/CommandPalette/Calendar +
   estados indeterminate/Tag-removível + decisão do Chart). Isso elimina os buracos
   **visíveis** ao migrar Aquapark/IA Studio/Delivery. Vira uma ou duas versões (v1.1.x).
2. **Bloco B fica no roadmap** com honestidade — a doc já o marca como alvo; o que falta é
   reconciliar a divergência de nomes de pacotes (desktop/mobile × components/adapters) e
   decidir a prioridade de `icons`/`testing` quando fizer sentido.
3. **Regra daqui pra frente:** todo componente que um dos 3 sistemas usa entra no bloco A
   (fundação), não no bloco B (futuro). Porte só começa numa área depois que o componente
   correspondente existe no DS — senão é portar com falha, exatamente o que se quer evitar.

---

*Auditoria pontual (não é doc viva). Depois de fechar o bloco A, atualizar/remover.*
