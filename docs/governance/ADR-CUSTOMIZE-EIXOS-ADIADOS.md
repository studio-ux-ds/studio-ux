# ADR (stubs) — eixos de personalização adiados do Customize

> Status: **misto** — densidade, RTL e container permanecem abertos; idioma e layout foram decididos em `v1.2.0`.
>
> O painel `Customize` entrega Tema, Accent, Layout e Idioma. Os eixos abaixo que permanecem deliberadamente deixados de fora
> cada um **mexe em estrutura, tradução ou numa invariante já escrita**, então não é
> "customização de aparência" e não entra sem uma decisão registrada. Este arquivo é o
> rastro dessas decisões, para nenhuma delas ser tomada por acidente dentro de um PR de tela.

Cada stub segue: **contexto · o conflito · opções · decisão (pendente)**.

---

## ADR-001 — Densidade ajustável pelo usuário (compacto / confortável)

**Contexto.** O Flux expõe um controle de densidade no painel de personalização.

**O conflito.** Colide de frente com **P21** (densidade é uniforme *por produto* Desktop/Mobile,
não por usuário) e com o modelo de espaço, que é contextual por produto e não por tema
(THEMES §5, SPACING §6). Deixar o usuário apertar tudo reintroduz exatamente a
inconsistência que o sistema existe para eliminar.

**Opções.** (a) Manter P21 invariante — sem toggle de densidade. (b) Redefinir P21 para
"default do produto + override do usuário", com uma escala de espaço temática validada.
(c) Densidade só como preferência de *tabela* (linha alta/baixa), sem afetar o resto.

**Decisão.** _pendente._ Enquanto aberto, **não** há toggle de densidade no Customize.

---

## ADR-002 — Idioma da interface

**Contexto.** Trocar o idioma da aplicação a partir do painel.

**O conflito.** **P11**: "idioma do usuário ≠ i18n". Trocar idioma exige uma camada real de
tradução (chaves, catálogos, plural, data/número por locale) — não é repontar um token.
É uma frente própria, não um eixo de aparência.

**Opções.** (a) Frente de i18n dedicada (infra de tradução) e só então o seletor. (b) Ficar
fora do Customize permanentemente e viver em Configurações → Conta quando existir i18n.

**Decisão.** **aceita em escopo limitado.** O Customize persiste `pt-BR` ou `en` e aplica `lang` no documento; componentes do DS traduzem os seus próprios rótulos. Conteúdo, dados, pluralização e catálogos pertencem ao sistema consumidor, que deve fornecer sua camada real de i18n. Não há idiomas adicionais sem catálogo validado.

---

## ADR-003 — Direção do texto (LTR / RTL)

**Contexto.** Suporte a idiomas RTL (árabe, hebraico) e o toggle correspondente.

**O conflito.** Exige varredura de **todo** o layout com propriedades lógicas
(`margin-inline`, `inset-inline`, `padding-inline`…) e revisão de cada componente — território
grande, transversal a todos os pacotes. Depende também do ADR-002 (idioma).

**Opções.** (a) Auditoria de propriedades lógicas no DS inteiro, depois expor `dir`. (b) Adiar
até haver demanda real de tenant RTL.

**Decisão.** _pendente._ Sem toggle de direção; recomendável já escrever CSS novo com
propriedades lógicas para não acumular dívida.

---

## ADR-004 — Navegação: Sidebar ↔ barra no topo

**Contexto.** Alternar a navegação entre lateral (Sidebar) e horizontal (top-nav).

**O conflito.** Muda a **estrutura** da casca, não a aparência — e "tema não muda estrutura"
(THEMES §5). Seriam duas variantes de `AppShell`, com implicações de densidade de navegação,
overflow de itens e mobile.

**Opções.** (a) Manter só Sidebar (decisão atual do AppShell). (b) Criar `AppShell` variante
`topnav` como molde irmão, decidido em governança, não como preferência solta do usuário.

**Decisão.** **aceita.** `AppShell` oferece as variantes `sidebar` e `topnav` sobre o mesmo contrato de navegação; o usuário pode escolher e a preferência é lembrada. Mobile continua usando o menu off-canvas, independente da escolha Desktop. As duas variantes são obrigatoriamente validadas no Laboratório visual.

---

## ADR-005 — Largura do conteúdo: fluido ↔ boxed

**Contexto.** Deixar o usuário escolher se o conteúdo ocupa toda a largura ou fica numa caixa
central com largura máxima.

**O conflito.** Mexe no **molde de layout** (a região de conteúdo), não em token. Interage com
a grade e com o comportamento de cada tela (tabelas largas vs. formulários estreitos), que já
têm regra própria por arquétipo (LAYOUT_SYSTEM).

**Opções.** (a) Largura definida **por arquétipo de tela** (o molde decide), não pelo usuário.
(b) Preferência global fluido/boxed, revalidando cada molde.

**Decisão.** _pendente._ A largura continua responsabilidade do molde da tela; sem toggle.
