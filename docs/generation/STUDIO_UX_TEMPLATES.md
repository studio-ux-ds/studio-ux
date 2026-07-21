# STUDIO_UX_TEMPLATES.md — Moldes de Tela · Screen Templates

> Documento normativo vivo. Responde a: **quais são os MOLDES de tela oficiais — as composições prontas de componentes que uma tela instancia — para que ninguém monte uma tela do zero nem invente um arranjo fora da família?**
> Living normative document. Answers: **what are the official screen TEMPLATES — the ready compositions of components a screen instantiates — so no one builds a screen from scratch nor invents an arrangement outside the family?**
> Governança: `STUDIO_UX.md` (SSOT §11, Boundary Check §12, tech-agnóstico §13), `governance/STUDIO_UX_CONSTITUTION.md`, `generation/STUDIO_UX_PROJECT_GENERATOR.md`.

```
Architecture Boundary Check — STUDIO_UX_TEMPLATES
Resolve · Solves:            o MOLDE de uma tela — a composição oficial de componentes (regiões, arranjo,
                             estados obrigatórios, pontos de conteúdo vazios) que uma tela concreta instancia,
                             para que a tela nasça arranjada como a família manda, não montada do zero.
                             / a screen's TEMPLATE — the official composition of components (regions, arrangement,
                             mandatory states, empty content points) that a concrete screen instantiates.
Não pertence a outro porque · Not elsewhere because:
                             COMPONENT_LIBRARY é dona das PEÇAS (um botão, uma tabela), não do arranjo de uma tela;
                             os guias de domínio (DASHBOARD/FORMS/TABLES/NAVIGATION) dão a REGRA de cada classe,
                             mas não um molde instanciável; PROJECT_GENERATOR compõe arquétipos A PARTIR destes
                             moldes, não os define; PATTERNS descreve fluxos compostos, não o molde de UMA tela.
                             / COMPONENT_LIBRARY owns the PIECES, not a screen's arrangement; the domain guides give
                             each class's RULE but not an instantiable mold; PROJECT_GENERATOR composes archetypes
                             FROM these molds; PATTERNS describes composed flows, not one screen's mold.
Complementa · Complements:   components/COMPONENT_LIBRARY, DASHBOARD, FORMS, TABLES, NAVIGATION, patterns/PATTERNS,
                             generation/PROJECT_GENERATOR, tools/CLI (`studio generate`).
Nunca substitui · Never replaces: COMPONENT_LIBRARY (as peças), os guias de domínio (a regra de cada classe),
                             PROJECT_GENERATOR (o nascimento do projeto), RUNTIME (as camadas de execução).
Dono · Owner:                este doc, para o domínio "moldes de tela".
```

---

## Objetivo · Objective
**PT** — Definir o estoque oficial de **moldes de tela**: composições prontas de componentes do catálogo, arranjadas conforme os guias de domínio, que uma tela concreta instancia e preenche. Um molde resolve o momento mais frágil da construção — a primeira tela montada do zero, que fixa um arranjo divergente que nunca mais sai. Ele entrega as regiões, os componentes certos, os estados obrigatórios (vazio/carregando/erro) e os **pontos de conteúdo vazios** (Art. 19) já no lugar. Montar tela passa a ser *instanciar um molde e conectar o dado*, não desenhar layout.
**EN** — Define the official stock of **screen templates**: ready compositions of catalog components, arranged per the domain guides, that a concrete screen instantiates and fills. A template solves construction's most fragile moment — the first screen built from scratch that locks in a divergent arrangement. It delivers the regions, the right components, the mandatory states (empty/loading/error) and the **empty content points** (Art. 19) already in place. Building a screen becomes *instantiate a template and connect data*, not draw layout.

## Escopo · Scope
**PT** — O catálogo de moldes de tela e como cada um compõe componentes oficiais. **Não** define as peças (é `COMPONENT_LIBRARY`), a regra de cada classe de tela (são os guias `DASHBOARD`/`FORMS`/`TABLES`/`NAVIGATION`), o nascimento do projeto (`PROJECT_GENERATOR`), nem valores estéticos (Fase 2). Um molde **compõe**, nunca redefine token nem cria componente novo.
**EN** — The screen-template catalog and how each composes official components. It does **not** define the pieces (`COMPONENT_LIBRARY`), each screen class's rule (the domain guides), project birth (`PROJECT_GENERATOR`) or aesthetic values. A template **composes**, never redefines a token nor creates a new component.

---

## 1. O que é um molde · What a template is
**PT** — Um molde é uma tela **em branco de conteúdo, cheia de estrutura**. Ele fixa quatro coisas e só elas: (1) as **regiões** da tela e sua ordem/ritmo (do `LAYOUT_SYSTEM`); (2) quais **componentes do catálogo** ocupam cada região; (3) os **estados obrigatórios** daquela classe (P14 — vazio, carregando, erro); (4) os **pontos de conteúdo** — onde o dado de negócio entra, claramente vazios (Art. 19). Um molde **não** traz dado, regra de negócio, nem um componente fora do catálogo (P2/P3). Todo molde existe nas duas formas de produto (P4): Desktop e Mobile são *variantes do mesmo molde* (mesmo propósito, mesmos componentes; muda a composição — tabela↔cartões, sidebar↔abas inferiores).
**EN** — A template is a screen **empty of content, full of structure**. It fixes four things and only those: (1) the screen's **regions** and their order/rhythm (from `LAYOUT_SYSTEM`); (2) which **catalog components** fill each region; (3) the class's **mandatory states** (P14 — empty, loading, error); (4) the **content points** — where business data enters, clearly empty (Art. 19). A template carries no data, business rule, or off-catalog component. Every template exists in both product forms (P4): Desktop and Mobile are *variants of the same template*.

## 2. O catálogo de moldes · The template catalog
**PT** — Cada molde deriva de um guia de domínio (a regra) e compõe peças do catálogo (as partes). Nenhum arranjo é inventado aqui — é a materialização instanciável do que os guias já mandam.
**EN** — Each template derives from a domain guide (the rule) and composes catalog pieces (the parts). No arrangement is invented here.

- **login** — acesso. Regiões: cartão central com marca, `FormField`(e-mail), `FormField`(senha), link "esqueci a senha" (discreto, realça no hover), `Button` primary único (P6). Estados: erro via `Toast` (nunca banner). Deriva de `PATTERNS` (login). *Ponto de conteúdo:* nenhum dado — é forma pura.
- **dashboard** — leitura de indicadores. Regiões: cabeçalho + grade de `StatCard` (KPIs) + região de conteúdo (`Card` com gráfico, `Card` com tabela-resumo). Estados: carregando (`Skeleton`), vazio (`EmptyState`). Deriva de `DASHBOARD`. *Pontos de conteúdo:* valores dos KPIs, série do gráfico, linhas da tabela.
- **list** — lista de registros. Regiões: cabeçalho (título + `Button` "Novo") + filtros + `DataTable` (Desktop) / `Card`s (Mobile) + `Pagination` + `EmptyState`. Estados: vazio, carregando, erro. Deriva de `TABLES`. *Pontos de conteúdo:* as linhas/registros.
- **detail** — detalhe de uma entidade. Regiões: link "voltar" + cabeçalho (título + ações) + `Tabs` (folder) + `DescriptionList`/conteúdo por aba. Estados: carregando, erro. Deriva de `TABLES` (detalhe). *Pontos de conteúdo:* os campos da entidade e as abas.
- **form** — criar/editar. Regiões: `Card` com pilha de `FormField` + `FormActions` (`Button` ghost Cancelar + primary Salvar). Estados: validação via `Toast`, salvando (loading no botão, P16). Deriva de `FORMS`. *Pontos de conteúdo:* os campos do formulário.
- **search** — busca. Regiões: campo de busca + lista de resultados + `EmptyState` ("nada encontrado"). Estados: vazio, carregando. Deriva de `PATTERNS` (busca). *Ponto de conteúdo:* os resultados.
- **settings** — configuração. Regiões: `Tabs` (pills) + seções de `FormField` agrupadas + `FormActions`. Linguagem do usuário (P11). Deriva de `FORMS`. *Pontos de conteúdo:* as opções.
- **wizard** — passo a passo. Regiões: `Stepper` + conteúdo do passo + `FormActions` (Voltar/Avançar). Deriva de `PATTERNS`. *Pontos de conteúdo:* o conteúdo de cada passo.
- **empty** — estado vazio de tela inteira. Região: `EmptyState` central (ícone + título + descrição + `Button` primary sugerindo a ação). Deriva de `COMPONENT_LIBRARY`. *Ponto de conteúdo:* a mensagem/ação conforme o contexto.

## 3. Molde compõe, não redefine · A template composes, never redefines
**PT** — A regra que sustenta os moldes: eles são **composição** (camada Templates do `RUNTIME`), nunca uma peça nova nem um valor cru. Um molde arruma componentes existentes com tokens existentes; se um molde precisa de algo que o catálogo não tem, o caminho é pedir o componente à `COMPONENT_LIBRARY` (governança §7), não inventar dentro do molde. Um molde que redesenha um botão, crava um espaçamento ou renderiza jargão técnico (P11) deixou de ser molde e virou divergência. Instanciar um molde e depois recriar seus fundamentos é o mesmo erro do fork (PROJECT_GENERATOR §3), na escala da tela.
**EN** — The rule underpinning templates: they are **composition** (the `RUNTIME` Templates layer), never a new piece nor a raw value. A template arranges existing components with existing tokens; if it needs something the catalog lacks, the path is to request the component from `COMPONENT_LIBRARY` (governance §7), not invent inside the template. A template that redraws a button, hard-sets a spacing or renders technical jargon has stopped being a template and become divergence.

## 4. Relação com Generator, CLI e Component Library · Relation to Generator, CLI and Component Library
**PT** — **Component Library** dá as PEÇAS; **os guias de domínio** dão a REGRA de cada classe; **este doc** dá o MOLDE (a composição instanciável); **Project Generator** compõe ARQUÉTIPOS a partir de vários moldes (um arquétipo CRM instancia os moldes list, detail, dashboard, form); **CLI** é a porta: `studio generate --mold <nome> --into <projeto>` instancia UM molde numa tela do projeto. Nenhum deles redefine o outro: a peça é da biblioteca, a regra é do guia, o molde é daqui, o projeto é do gerador, o comando é da CLI.
**EN** — **Component Library** gives the PIECES; **the domain guides** give each class's RULE; **this doc** gives the TEMPLATE (the instantiable composition); **Project Generator** composes ARCHETYPES from several templates; **CLI** is the door: `studio generate --mold <name> --into <project>` instantiates ONE template into a project screen.

## Responsabilidades · Responsibilities
**PT** — Manter o catálogo de moldes (§2) com regiões, componentes compostos, estados obrigatórios e pontos de conteúdo; garantir que todo molde componha o catálogo sem redefinir peça/token (§3); manter as duas formas de produto (P4); situar a relação com Generator/CLI/Library (§4).
**EN** — Maintain the template catalog (§2); ensure every template composes the catalog without redefining piece/token (§3); keep both product forms (P4); situate the relation to Generator/CLI/Library (§4).

## Não-responsabilidades · Non-responsibilities
**PT** — Não define as peças (`COMPONENT_LIBRARY`), a regra de cada classe (guias de domínio), o nascimento do projeto (`PROJECT_GENERATOR`), a exportação de tokens (`EXPORTERS`), as camadas de execução (`RUNTIME`) nem valores estéticos (Fase 2). Não é dono de dado de negócio (Art. 19).
**EN** — Does not define the pieces, each class's rule, project birth, token export, execution layers or aesthetic values. Never owns business data (Art. 19).

## Anti-padrões · Anti-patterns
**PT / EN**
- Molde que cria um componente fora do catálogo em vez de compô-lo (P2/P3, Art. 4). / A template creating an off-catalog component instead of composing it.
- Molde com valor cru (espaçamento/cor à mão) em vez de token (P1/P7). / A template with a raw value instead of a token.
- Molde que traz dado ou regra de negócio (Art. 19). / A template carrying business data or rule.
- Misturar Desktop e Mobile no mesmo molde em vez de duas variantes (P4). / Mixing Desktop and Mobile in one template.
- Duplicar aqui a regra de um guia de domínio (dono é o guia) ou a mecânica de projeto (`PROJECT_GENERATOR`). / Duplicating a domain guide's rule or the project mechanics.
- Molde sem os estados obrigatórios da classe (vazio/carregando/erro — P14). / A template missing the class's mandatory states.

## Roadmap
**PT** — Especificado nesta era; os moldes são materializados no Épico 4 (Geração), sempre compondo `COMPONENT_LIBRARY` e derivando dos guias de domínio. Molde novo entra quando surge uma classe de tela genuinamente recorrente que os moldes atuais não cobrem — nunca por conveniência de uma tela única.
**EN** — Specified in this era; templates are materialized in Epic 4 (Generation), always composing `COMPONENT_LIBRARY` and deriving from the domain guides. A new template enters when a genuinely recurring screen class emerges — never for a one-off screen's convenience.

## Estado da implementação · Implementation state

**PT** — Materializado em `packages/cli/generator/templates.mjs` (v1.1.10), acionado por `studio generate --mold <nome> --into <projeto> [--name <tela>]`. **9 moldes** no catálogo (§2): `login`, `dashboard`, `list`, `detail`, `form`, `search`, `settings`, `wizard`, `empty`. Cada um **compõe só classes `.su-*` do catálogo** (verificado: todo nome de classe emitido existe no `components.css`) com pontos de conteúdo vazios (`su-empty`, Art. 19); nenhum token ou peça é redefinido (§3). O `list` tem variante por produto (tabela no Desktop, cartões no Mobile — lê `product` do `studio-ux.json`). A tela sai como HTML **abrível no navegador** (importa tokens+peças de `node_modules`), o que dá prova visual imediata. **Guard honesto:** recusa gerar fora de um projeto criado por `studio create` (sem `studio-ux.json`). `studio generate --list` mostra o catálogo.

**Camada React (runtime).** Além do gerador HTML (`templates.mjs`), o molde `list` também é materializado como componentes React em `@studio-ux-ds/react` (`patterns/PageHeader` + `patterns/ListScreen`), para apps React instanciarem o molde **em runtime** (não só via `studio generate`). Mesma composição (cabeçalho + filtros/busca no header do card + `DataTable` no Desktop / `Card`s em tela estreita + paginação + estados), derivada de `TABLES`; header no padrão Flux. Os demais moldes seguem só como HTML até haver demanda real (P2).
**EN** — Materialized in `packages/cli/generator/templates.mjs` (v1.1.10), triggered by `studio generate --mold <name> --into <project>`. **9 templates** (§2). Each **composes only catalog `.su-*` classes** (verified: every emitted class exists in `components.css`) with empty content points (`su-empty`, Art. 19); no token or piece is redefined (§3). `list` has a per-product variant (table on Desktop, cards on Mobile). The screen is a browser-openable HTML (imports tokens+pieces from `node_modules`), giving immediate visual proof. **Honest guard:** refuses to generate outside a `studio create` project. `studio generate --list` shows the catalog.

---

## Referências internas · Internal references
`components/STUDIO_UX_COMPONENT_LIBRARY.md` · `STUDIO_UX_DASHBOARD.md` · `STUDIO_UX_FORMS.md` · `STUDIO_UX_TABLES.md` · `STUDIO_UX_NAVIGATION.md` · `patterns/STUDIO_UX_PATTERNS.md` · `layouts/STUDIO_UX_LAYOUT_SYSTEM.md` · `generation/STUDIO_UX_PROJECT_GENERATOR.md` · `tools/STUDIO_UX_CLI.md` · `governance/STUDIO_UX_CONSTITUTION.md` (Art. 4, 19) · `STUDIO_UX.md` §11 · §12

---

*Documento vivo. Define os moldes de tela; as peças são do COMPONENT_LIBRARY, a regra de cada classe é dos guias de domínio, o projeto é do PROJECT_GENERATOR. · Living document. Defines screen templates; pieces belong to COMPONENT_LIBRARY, each class's rule to the domain guides, the project to PROJECT_GENERATOR.*
