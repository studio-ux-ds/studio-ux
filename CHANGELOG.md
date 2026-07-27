# Changelog — Studio UX

> **PT** — Histórico do produto por versão. Esta é a **fonte da verdade de versão** (com as tags git). A documentação em `docs/` descreve o estado ATUAL; o histórico do que mudou mora aqui. Formato baseado em [Keep a Changelog](https://keepachangelog.com); versionamento [SemVer](https://semver.org).
>
> **EN** — Product history by version. This is the **version source of truth** (together with git tags). The docs under `docs/` describe the CURRENT state; the history of what changed lives here. Format based on Keep a Changelog; SemVer versioning.

---

## [Unreleased]

### Changed

- **docs(prompt-framework)** · 2026-07-23 — adota `C:\Users\Flowspec\Documents\STUDIO-WORKFLOW\` v3.0.0 como fonte única do método (paradigma `prompt-framework/v1`). Agnósticos locais (`README.md`, `prompt-alinhamento.md`) viraram stubs; `COMO-INTERAGIR-COM-ROBSON.md` também. Catálogo local migrou para `studio-ux.specialty-catalog@2.0.0` (`kind: shared`, PT+EN); as 6 especialidades foram para o schema formal em `studio-ux.*@1.0.0`, todas com `extends: workflow.system-change-base@1.0.0`.

## [1.2.33] — 2026-07-26

### Added

- **`Tabs` avisa quando um item vem sem `id`** (só fora de produção). Sem `id`, `value === it.id` nunca casa e o `onChange` devolve `undefined`: as abas aparecem normalmente, e clicar em qualquer uma **esvazia o conteúdo** — porque nenhum bloco `tab === '…'` do consumidor renderiza. Avisa e segue funcionando; derrubar o render seria pior que o sintoma.

### Origem

Migração da família Integrações do IA Studio (v0.10.11): a tela de detalhe da conexão declarou os itens como `{ value, label }` e as três abas ficaram em branco. Reportado pelo Robson na validação visual — o console estava limpo.

### Lição

Terceira vez que a **prop morta** aparece nesta adoção, e a primeira **dentro de um array de dados**, não na assinatura do componente. O engano é quase inevitável: a prop da aba ativa se chama `value`, então `{ value, label }` parece a forma natural de escrever o item. A assinatura aceita, o rótulo aparece, e só o comportamento some.

O padrão que já vale para as três: **quando o DS tem duas coisas com nomes parecidos e uma delas cai no silêncio, o silêncio é responsabilidade do DS.** Não dá para pedir que cada consumidor lembre da distinção — dá para o componente dizer o que está errado no momento em que acontece.

## [1.2.32] — 2026-07-26

### Added

- **`CopyButton`** (`@studio-ux-ds/react`) — copia um valor técnico para a área de transferência (id de registro, chave, token gerado, URL de webhook). Confirma **no próprio botão**: o ícone vira `check` e o rótulo/tooltip vira "Copiado" por 2s. Sem `label`, degrada para `IconButton` só-ícone.
- **Glifo `copy`** no core curado (`@studio-ux-ds/icons`) — 52 glifos.

### Fixed

- **8 glifos estavam publicados sem SVG nem entrada no manifesto** (`play`, `power`, `zap`, `archive`, `save`, `square`, `square-check`, `square-minus`, entrados entre a v1.2.24 e a v1.2.31). `icons.js` tinha os oito; `icons/*.svg` e `manifest.json` — que vão **no pacote publicado** — não. O `manifest.json` seguia anunciando 43 glifos.
- **`build-icons.mjs` deixou de apagar a pasta inteira** antes de emitir: agora sobrescreve os SVGs da fonte e remove só os órfãos. O `rmSync(icons/)` tornava o build **impossível de executar** de dentro de um mount que não permite `unlink` — que é exatamente onde ele estava sendo rodado. O comando falhava, quem adicionou o glifo seguiu em frente, e os artefatos ficaram para trás.
- **`check-packages.mjs` passou a travar nessa divergência** — compara `icons.js` × `icons/*.svg` × `manifest.json` (nomes e contagem) e recusa empacotar fora de sincronia.

### Lição (a que importa desta versão)

Um build que falha por causa do **ambiente** e não por causa do **conteúdo** é pior do que um build que não existe: ele dá a impressão de que o passo foi executado. Aqui a falha era `EPERM` num `unlink` — nada a ver com os ícones — e o efeito foi publicar oito versões seguidas com a biblioteca de artefatos congelada.

Só não virou defeito visível porque o adapter React lê a fonte (`icons.js`), não os SVGs. **A cobertura escondeu a falta por sete releases.** É a mesma família da "prop morta": o caminho principal funciona, então ninguém procura. O conserto que vale é o terceiro item — a divergência agora é verificada por quem já roda antes de publicar, e não depende de alguém lembrar de rodar o build.

### Origem

Migração da família Integrações do IA Studio. O par "valor técnico + botão de copiar" aparecia **quatro vezes na mesma família** (id da conexão, id de cada recurso descoberto, URL do webhook para colar na Meta, valor do token gerado) — e cada uma reimplementava a mesma coisa por conta própria, num helper local (`copyToClipboard` em `ConnectionFields.jsx`) que as outras telas não enxergavam.

### Lição

O que decidiu a entrada no DS não foi a repetição — foi **qual parte cada cópia esquecia**. Copiar é três coisas, não uma: o `try/catch` do `navigator.clipboard`, o **fallback** para contexto sem Clipboard API (http, iframe antigo) e o aviso de que copiou. A repetição solta acerta a primeira, quase sempre esquece a segunda e resolve a terceira de um jeito diferente em cada tela. E o modo de falhar é o pior possível para um botão: **o clique não faz nada e não diz nada** — o usuário conclui que copiou, cola em branco, e o erro aparece longe dali.

Por isso a confirmação mudou de lugar. O legado avisava por toast, no canto da tela, enquanto o olho estava no valor. Aqui o botão fala de si mesmo (P11): a resposta nasce onde a pergunta foi feita.

## [1.2.31] — 2026-07-25

### Added

- **`AppShell` ganhou `fullBleed`** — entrega a região de conteúdo **sem espaçamento e sem rolagem própria**, virando um container flex de altura definida (`.su-appshell__content--bleed`). É o que uma **tela de trabalho contínuo** precisa: conversa, canvas, editor de mídia — onde o conteúdo tem rolagem interna em mais de uma coluna e deve ocupar a altura toda.
  - Sem isso, o consumidor calcula a altura à mão. O IA Studio tinha `h-[calc(100dvh-8.5rem)]` na tela de conversas: **8.5rem é a soma da barra de cima com o padding**, um número que erra sempre que a casca muda de altura, e erra diferente no celular.
  - No mobile o full-bleed **não** recebe padding (a regra de 16px do `content` é anulada de propósito): é justamente onde cada pixel conta.

### Origem

Migração da família WhatsApp do IA Studio, decisão do Robson: a tela de conversas deve ocupar a área inteira, como no AquaPark.

### Lição

O padrão que se repete quando falta uma prop na casca: **o consumidor não fica sem a funcionalidade — ele a reimplementa com um número mágico.** `100dvh - 8.5rem` não é descuido de quem escreveu; é a única saída quando a casca cobra padding e rolagem sem oferecer como desligar.

Vale a pergunta na revisão de qualquer componente de layout: *"que decisão minha o consumidor precisa desfazer, e eu deixo?"*. Padding e rolagem são as duas mais comuns — e as duas mais caras de contornar por fora, porque a conta depende de dimensões que só a casca conhece.

## [1.2.30] — 2026-07-25

### Fixed

- **O degradê do `StatCard` agora são os valores da referência, traduzidos** — não uma calibragem de olho. O card do console do IA Studio é `bg-gradient-to-br from-<hue>-500/20 to-<hue>-600/5` + `border-<hue>-500/20` + ícone `bg-<hue>-500/10`. Em CSS: 135°, **20% de cor no início e 5% no fim**, transição ocupando o trajeto inteiro; borda a 20%; caixa do ícone a 10%.
- **O erro das duas tentativas anteriores era o mesmo:** terminar em **cor zero** (16%→superfície em 72%, depois 10%→superfície em 55%). Acabar em superfície pura antes do fim deixa metade do card branco, e a peça **para de ler como degradê** — era exatamente a queixa. O que sustenta a aparência de degradê é a cor **não** chegar a zero.
- A régua da §6.4 foi corrigida junto: era "≈10%, termina antes do meio" — o oposto do que funciona.

### Origem

O Robson, depois da segunda tentativa: *"continua muito claro, não parece um gradiente. como é tão difícil ir lá no console ler o que está lá e aplicar no DS? você tem código e doc na mão"*.

### Lição

Ele está certo, e o erro é de método, não de gosto. **Eu tinha lido o arquivo da referência** — cheguei a citar a linha da paleta no CHANGELOG da v1.2.27 — e mesmo assim escrevi valores próprios "no espírito" dela, em vez de **traduzir** `from-500/20 to-600/5` para `color-mix`. Depois passei duas versões ajustando por tentativa, cada uma mais clara que a anterior.

O padrão a não repetir: **quando existe uma referência concreta, o trabalho é traduzir, não interpretar.** Ler o arquivo para "entender a intenção" e depois inventar o número é o mesmo vício de supor em vez de verificar — só que disfarçado de bom gosto. Se a referência tem valores, os valores fazem parte dela; se algum deles não servir no contexto novo, aí sim se ajusta **aquele**, dizendo qual e por quê.

Corolário sobre iterar: duas rodadas de "está forte demais" → "está fraco demais" custaram duas releases e a paciência do dono. Fosse a tradução literal na primeira, a conversa teria sido uma só.

## [1.2.29] — 2026-07-25

### Changed

- **O `StatCard` deixou de ter `tone` semântico e passou a ter `hue` — cor CATEGÓRICA.** `hue` = `indigo` `blue` `teal` `violet` `amber` `rose` `slate`. A cor do card passa a dizer **de que assunto o número é** (organizações, execuções, custo, mensagens), não se ele é bom ou ruim. Sem `hue`, o card usa o accent do sistema.
  - `tone` **saiu** da API do componente. Quem ainda passar `tone` não quebra — a prop é ignorada e o card cai no accent.
  - Julgamento de valor no indicador continua no `delta`, que segue verde/vermelho por **direção**.

### Added

- **Tokens `--su-hue-{indigo,blue,teal,violet,amber,rose,slate}`** — sete matizes **sempre disponíveis e independentes do accent**, em claro e escuro (os mesmos hexes da paleta de accents, já validados AA). Servem a qualquer componente que precise distinguir categoria; `--su-action` volta a ser só a cor de **ação**.

### Origem

O Robson mostrou dois prints do console e disse: *"eu queria eles assim"* — cada card numa cor — e depois, direto: *"remove esse tone semântico"*. Na v1.2.27 eu tinha feito o contrário: mantive `tone` e argumentei que sete cores viram decoração.

### Lição

**Eu estava defendendo o princípio certo com o mecanismo errado.** O problema real nunca foi "cor variada num painel" — foi usar a prop **de status** para conseguir cor. Enquanto só existia `tone`, quem precisava distinguir domínio escrevia `tone="success"` para ter verde, e aí `success` deixava de significar "deu certo" em todo o sistema. Eu li isso como "o consumidor quer enfeitar" e travei; o que ele queria era uma função que o DS não oferecia.

Existem **três** usos de cor, não dois, e o DS só tinha vocabulário para dois:

| Uso | Pergunta que responde | Mecanismo |
|---|---|---|
| Semântico | isto é bom/ruim/atenção? | `tone` (Badge, Banner, `delta`) |
| **Categórico** | de que assunto isto é? | **`hue`** (`--su-hue-*`) — novo |
| Decorativo | — | não existe no DS |

Cor categórica é uso reconhecido (é o que faz uma série ser reencontrável num gráfico) e tem régua própria: **estável por assunto, nunca rotativa por posição**. Com ela nomeada, a recusa a "colorir por gosto" continua de pé — e deixa de atropelar um pedido legítimo.

O padrão a levar: quando o dono insiste num resultado que a regra proíbe, **a hipótese mais provável é que falte um conceito na regra**, não que ele esteja errado. Duas versões atrás eu escrevi que "uma regra estética que o dono contraria é uma regra que precisa mudar" — e na versão seguinte fiz exatamente o oposto, discutindo com o pedido em vez de procurar o conceito que faltava.

## [1.2.28] — 2026-07-25

### Changed

- **Degradê do `StatCard` mais contido:** 10% de cor terminando em **55%** do trajeto (era 16% até 72%). A régua da §6.4 ganhou a linha que faltava: **o degradê termina antes do meio da peça**. Em componente que estica, a diagonal longa deixava **metade** de um card de ~400px colorida, e o degradê passava a ser o assunto da tela.

### Origem

O Robson viu o resultado no painel real e perguntou: *"vc acha que ficou estranho?"*. Ficou. Três causas somadas — degradê forte para card largo (esta versão), quatro cards com quatro tones sem razão semântica e nenhum deles com ícone (as duas últimas eram do consumidor, corrigidas na v0.10.6 do IA Studio).

### Lição

**Calibrei a intensidade num arranjo e ela não sobreviveu ao outro** — o card do console é estreito e tem ícone; o do painel é largo e não tinha. É a mesma armadilha da série toda (`NumericInput.fullWidth`, `Pagination` com dado real, largura do `Drawer`): componente de DS **estica**, e valor calibrado numa largura vira outra coisa na largura seguinte.

O que passo a fazer diferente: quando o valor é **proporcional** (porcentagem de trajeto, largura relativa), a régua tem que dizer **onde ele termina**, não só quanto ele vale. "10% de cor" não protege nada se o trajeto for a diagonal inteira de uma peça larga.

E a parte que não é técnica: o gradiente estava fazendo o serviço de dizer "este card é de um assunto diferente" — serviço que, no painel, nenhum dos quatro cards precisava. Enfraquecer o efeito foi metade do conserto; a outra metade foi o consumidor parar de pedir quatro cores para quatro contagens.

## [1.2.27] — 2026-07-25

### Changed

- **`StatCard` mudou de desenho** — ícone à esquerda num quadrado tonalizado, rótulo em caixa alta pequena, número em destaque (peso 700) e o card com um **degradê leve da cor do papel**. Antes era plano, com o ícone no canto direito e o rótulo do mesmo tamanho do resto. Desenho pedido pelo Robson a partir do console do IA Studio, que já o tinha escrito à mão em Tailwind. **Afeta todos os consumidores** (é um DS: o desenho é o do sistema, não o da tela).
- **O `tone` não colore mais o número.** Sobre fundo tonalizado, número colorido perde contraste — e o dado é o que menos pode ficar difícil de ler. A cor agora vive no entorno (degradê, borda, ícone); o valor é sempre `--su-text-primary` (P17/P18).
- **`tone="neutral"` usa o accent do sistema** em vez de cinza, então um painel de indicadores acompanha a personalização do usuário.

### Added

- **`sub` no `StatCard`** — linha secundária **neutra** sob o número: unidade, composição, recorte ("976.884 tokens", "Limite: 5", "0 com erro"). Existia só `delta`, que é a **variação** e leva cor de direção; quem precisava de legenda usava `delta` e **pintava de verde um texto que não é melhora nenhuma** (o Dashboard do IA Studio tinha quatro cards escrevendo "Limite: N" em verde desde a v0.9.80).
- **Token `--su-fw-bold` (700)** — a escala de pesos ia só até 600 (semibold). O número de um indicador precisa pesar mais que um título de seção, e sem o token o consumidor cravava `font-weight: 700` solto.

### Fixed

- **Storybook quebrado em toda story com ícone** — "React is not defined". `packages/icons/react.jsx` era **o único `.jsx` dos pacotes sem `import React`**: publicado como JSX cru, um bundler que compile no runtime **classic** gera `React.createElement`, e o pré-bundle do esbuild (Vite) usa classic por padrão — ao contrário do plugin React, que usa automatic. Nos apps consumidores funcionava; no Storybook, não.
- **`Icon` com nome fora da curadoria deixou de lançar exceção.** Era `throw` no render — e exceção durante o render **desmonta a árvore React inteira**: um nome de ícone errado apagava a tela do consumidor. Agora desenha `help` e avisa no console, dizendo onde olhar. Mesma classe do `children` no `<input>` (v1.2.23): o rigor do DS não pode custar a aplicação de quem consome.

### Changed (regra)

- **Gradiente passou a ser PERMITIDO — tonal e discreto.** A regra era "praticamente nunca" e o card de indicador com fundo em degradê estava escrito no `VISUAL_DNA` como **anti-exemplo**. Decisão do Robson. A régua nova (§6.4) admite: **uma matiz só**, vinda de token, baixa saturação (≈15% sobre a superfície), em **peça pequena e delimitada**, direção estável (135°), contraste do texto medido **depois** do gradiente. Seguem vetados: saturado, multicor, "mesh", de marca, glass/neon, e gradiente atrás de texto corrido ou em fundo de página.
- Reconciliado nos **cinco** documentos que repetiam a proibição — `VISUAL_DNA` (§6.4, a nota de fase e o exemplo do KPI, que virou o exemplo POSITIVO), `CERTIFICATION` (régua de veto), `COLOR_SYSTEM` (quando não usar cor) e `HANDOFF` (decisões travadas). Doc que contradiz o código é pior que doc faltando: a próxima pessoa segue a regra velha e desfaz o trabalho.

### Origem

Pedido do Robson: *"queria fazer uma alteração visual nos cards do DS para ficarem iguais os do print"* — o print sendo o dashboard do console, cujos cards são bonitos e estavam fora do DS. Junto: *"mude a proibição de gradiente para aceitar"* e o Storybook publicado quebrado.

### Lição

**O desenho veio de um componente local que o produto já tinha — e a tradução exigiu tirar uma coisa.** O card do console escolhe a cor por gosto (`color="brand|green|blue|yellow"`): sete indicadores, quatro cores, nenhuma delas dizendo nada sobre o dado. Trazer isso literalmente para o DS seria transformar `tone` — que é **papel semântico** — em paleta decorativa, e com ela a promessa de que verde significa algo se perde em todo o sistema.

O que entrou foi o **desenho** (degradê, ícone à esquerda, hierarquia tipográfica); o que ficou de fora foi a **cor arbitrária**. Um painel em que tudo é colorido comunica menos que um em que só o que importa é: quando cada card tem sua cor, nenhuma cor é sinal. Quem quiser variedade tem os tones semânticos — e um indicador que não é bom nem ruim fica `neutral`, que agora tem cor (a do accent), não cinza.

Vale para toda vez que um visual sobe do produto para o DS: **copiar a aparência é fácil; a parte difícil é decidir o que da aparência era regra e o que era gosto.**

E a segunda lição, do gradiente: **uma regra estética que o dono do produto contraria é uma regra que precisa mudar, não uma que ele precisa obedecer.** O "praticamente nunca" nasceu de um receio legítimo (gradiente envelhece, rouba atenção do dado) e virou proibição categórica — que, aplicada ao pé da letra, vetava também o uso discreto que não tem nenhum desses defeitos. O conserto não foi abrir a mão: foi **escrever a régua** que separa o gradiente que serve do que enfeita. Regra sem régua é gosto com autoridade.

Nota de método: a proibição estava em **cinco** documentos. Mudar um e deixar quatro contando a história antiga seria pior que não mudar nenhum — a próxima leitura acha o texto velho, obedece, e desfaz. Regra vive num dono (`VISUAL_DNA` §6.4); os outros documentos **referenciam**, não repetem — e quando repetem, mudam junto.

## [1.2.26] — 2026-07-25

### Added

- **Glifos `power` e `zap`** — fecham o vocabulário de automação: **ligar/desligar** o que está em operação e o **gatilho** que dispara. Sem eles o consumidor pedia `settings` emprestado para "gatilho" (que já significa configuração, ferindo P2 — uma metáfora, um significado) e não tinha nada para ligar/desligar: caía no `help`, o "?" do fallback silencioso.

### Origem

Migração do canvas de automação do IA Studio (sub-frente C). Terceira leva de glifos que a mesma frente pediu — `play`/`archive`/`save` na v1.2.24, `power`/`zap` agora.

### Lição

A curadoria de ícones estava completa para **CRUD** (criar, editar, excluir, buscar, filtrar) e vazia para **operação** (rodar, ligar, arquivar, gravar versão, disparar). Não é acaso: a biblioteca cresceu vestindo telas de cadastro. Um DS que se propõe a vestir produto de automação precisa do vocabulário de *o que acontece*, não só de *o que se cadastra* — e a hora de descobrir isso é lendo o domínio, não quando o botão aparece com um "?" na tela do cliente.

Fica anotado como pergunta para a próxima família a migrar: **quais verbos deste domínio a biblioteca ainda não sabe desenhar?**

## [1.2.25] — 2026-07-25

### Added

- **Cada tom de ação agora vem também em canais RGB** — `--su-action-rgb`, `--su-action-hover-rgb`, `--su-action-active-rgb`, nos 7 accents × claro/escuro. Existem para o consumidor com **Tailwind**: `bg-brand/5` precisa compor opacidade a partir da cor do tema (`rgb(var(--su-action-rgb) / <alpha-value>)`), e **não há como extrair canais de um hex em CSS**. Sem isso, o app é obrigado a cravar o hex no `tailwind.config` — e passa a ter duas cores de ação: a do accent nas telas do DS e a fixa em todas as outras. Vale para os três sistemas do ecossistema, que usam Tailwind.
- **`Breadcrumb` ganhou `onNavigate(href, event)`**, repassado pelo `AppShell` como `onBreadcrumbNavigate`. Sem ele, clicar no caminho **recarrega a aplicação inteira** — o componente usa `<a href>` de verdade (e continua usando: Ctrl/Cmd-clique abre em nova aba, que um `<span onClick>` não daria). O `preventDefault` só acontece no clique simples.

### Fixed

- **`Breadcrumb` sem semântica de navegação.** Era uma `<div>` com links soltos; virou `<nav aria-label="Caminho">`, com `aria-current="page"` no último item e as barras `/` marcadas `aria-hidden`. O leitor de tela agora anuncia que aquilo é o caminho e onde o usuário está.

### Origem

O Robson mandou dois prints lado a lado: o mesmo botão "Salvar versão" **verde** na tela migrada e **azul** na que ainda não migrou. A causa não estava no DS — o `tailwind.config` do consumidor cravava índigo —, mas a **impossibilidade de resolver sem cravar** estava: faltava a forma RGB do accent. No mesmo relato: uma tela migrada tinha ficado sem saída porque quem a escreveu (eu) supôs que o breadcrumb navegava, e ele era texto decorativo.

### Lição

Dois vazamentos da mesma natureza: **o DS entregava o valor num formato que o consumidor não consegue usar, e o consumidor "resolvia" cravando.**

- Cor: só hex → Tailwind não compõe alpha → hex cravado no config → duas cores de ação no mesmo painel.
- Navegação: `href` sem gancho de interceptação → SPA recarregaria → o consumidor "resolve" não usando o link, e o caminho vira enfeite.

A pergunta que o DS tem que fazer de cada token e de cada prop é **"o consumidor consegue usar isto no arranjo real dele?"** — não "isto está correto?". Um token que só serve para `color:` e um link que só serve para site estático estão corretos e são inúteis onde vão ser usados. Quando o consumidor precisa cravar valor para contornar o DS, a falha é do DS, não da disciplina de quem consome.

## [1.2.24] — 2026-07-25

### Added

- **A terceira via da regra de container: o inspetor.** A regra do Modal era escrita com duas saídas — Modal ou rota — e havia um caso que não cabe em nenhuma: **a configuração de um passo dentro do editor de um fluxo**. Rota exigiria que o passo existisse no servidor, e ele é rascunho da sessão até se salvar uma versão; Modal está fora pela regra do `TextArea`. O container certo é o `Drawer` no papel de **inspetor** — que a spec de Desktop (`DESKTOP` §6) já declarava: *"painel lateral persistente que edita as propriedades do item em foco"*. Agora está escrito onde se procura (`COMPONENT_LIBRARY` → Modal), com a tabela dos três containers e o critério de cada um.
- **Três glifos novos: `play`, `archive`, `save`.** Faltavam para vestir um produto de automação — executar um fluxo, arquivar sem excluir, salvar uma versão. Sem eles o consumidor cai no `help` (o "?" do fallback silencioso do `DSIcon`) ou empresta um ícone de outro significado, o que fere P2 (uma metáfora, um significado).
- **`Drawer` ganhou `width`** (default 360). Um inspetor de propriedades curtas cabe em 360; **formulário com texto longo ou JSON precisa de 480+** — em 360 o JSON quebra em toda linha e o painel deixa de cumprir a função. `max-width: 90vw` do CSS continua valendo.

### Fixed

- **`Drawer` não associava o título ao diálogo.** Tinha `role="dialog"` + `aria-modal` mas nenhum `aria-labelledby` — o leitor de tela anunciava "diálogo" sem dizer qual. Agora aponta para o **texto** do título, não para o cabeçalho inteiro (que contém o botão Fechar, e viria grudado no nome do painel).

### Origem

Decisão do Robson na migração da Automação do IA Studio (sub-frente B): perguntei onde deveria viver a configuração de um passo, e a resposta foi o painel lateral — o mesmo que o canvas vai precisar quando clicar num nó. A regra que faltava não era nova: era ler a spec de Desktop e ligá-la ao teste de container.

### Lição

A regra mecânica do `TextArea` (v1.2.11 → v1.2.12) resolveu a ambiguidade que existia, mas **fechou o mundo em duas opções** e, com isso, criou uma nova: qualquer caso que não fosse Modal era empurrado para rota, inclusive o que não tem registro nem URL para chamar de sua.

Uma regra mecânica é boa quando **descarta** (a pergunta "tem `TextArea`?" segue perfeita para eliminar o Modal) e é ruim quando pretende **escolher entre todas as alternativas** — porque o conjunto de alternativas cresce com o produto. A correção não foi enfraquecer a regra nem abrir exceção: foi **declarar a terceira alternativa** e dizer qual pergunta separa uma da outra ("o item tem URL própria?" e "o contexto em volta precisa continuar à vista?").

## [1.2.23] — 2026-07-25

### Fixed

- **`<Checkbox>rótulo</Checkbox>` derrubava a página inteira.** O `Checkbox` (e o `Radio`) só liam o rótulo de `label`; `children` caía no `...rest`, chegava ao `<input>` — que é elemento vazio — e o React lançava *"input is a void element tag and must neither have children nor use dangerouslySetInnerHTML"*. Não é aviso: é exceção durante o render, que **desmonta a árvore toda**. Resultado no consumidor: **tela branca**, sem casca, sem menu. Agora `label` e `children` são equivalentes, e `children` nunca é repassado ao `<input>`.

### Origem

Rota nova do IA Studio (`/automacao/calendarios/novo`) abrindo em branco. O arquivo tinha um `<Checkbox>` por dia da semana com o rótulo escrito como filho — a forma mais natural de escrever em React, e a única que o componente não aceitava.

### Lição

Terceira prop mal-resolvida em duas versões (`Badge.tone`, `Field.required`, agora `Checkbox.children`), e a que mostra o pior desenho dos três: **a falha não foi silenciosa, foi catastrófica**. Prop ignorada dá tela feia; prop repassada cegamente pro DOM dá tela branca.

A regra que sai daí, e que vale para todo componente do DS: **`...rest` só existe para atributos que o elemento de destino aceita.** Se o componente decide onde cada prop vai, ele tem que **consumir por nome** tudo que não é atributo do elemento — `children` em primeiro lugar. Um adapter que espalha o resto num elemento vazio está a um rótulo de distância de derrubar a aplicação do consumidor.

Corolário para o consumidor: **rótulo de opção aceita `label` ou filho** — as duas, sempre. Um componente que aceita só uma das duas formas está exigindo que o consumidor decore a assinatura, o que é o mesmo problema que o `Badge.tone` criou por outro caminho.

## [1.2.22] — 2026-07-25

### Added

- **`Badge` aceita `tone`** — o nome canônico do papel semântico no DS, o mesmo que `StatCard` e `Banner` já usavam. `status` continua aceito como apelido (versões publicadas o usam), mas código novo escreve `tone`. `neutral` virou valor explícito e válido (é o `.su-badge` puro, sem classe de cor).
- **`Field` ganhou `required`** — asterisco na etiqueta (`.su-field__req`, cor `--su-danger-fg`) mais `(obrigatório)` em texto só-para-leitor-de-tela. O `*` vai `aria-hidden`: sozinho ele não é lido, e "Nome asterisco" não é rótulo.
- **`.su-sr-only`** no `components.css` — utilitário de texto só para leitor de tela (fora do fluxo visual, dentro da árvore de acessibilidade). Faltava um, e sem ele a alternativa era `display: none`, que esconde dos dois.

### Fixed

- **`<Badge tone>` era prop morta — e derrubou 47 badges de um consumidor só.** O `Badge` era o único componente do DS a chamar o papel semântico de `status`; `StatCard` e `Banner` chamam `tone`. Quem migrava tela escrevia `tone` por analogia, a prop caía no `...rest`, virava atributo inválido no `<span>` e **o badge ficava neutro em silêncio** — sem erro de build, sem aviso no console. No IA Studio eram **47 ocorrências em 19 arquivos**, todas de telas já validadas e no ar: "Falhou", "Concluída", "Enviada", "sem permissão" — tudo cinza. Com o apelido aceito, as 47 passam a colorir **sem tocar em nenhum arquivo do consumidor**.
- **`<Field required>` era prop morta.** A spec do FormField exige, desde a v1.0.0, "marcar obrigatoriedade de forma textual, não só por cor/asterisco solto" — mas o adapter React nunca expôs `required`. Quem migrava tela escrevia `required` de boa-fé, a prop caía no vazio e **o campo obrigatório ficava idêntico ao opcional**, sem aviso nenhum no console. Já estava vazando em `ContaSenha.jsx` (3 campos) desde a v0.9.87 do IA Studio.

### Origem

Auditoria dos editores novos da Automação do IA Studio (calendário e template). Escrevi `<Field required>` por hábito, fui conferir a assinatura real antes de fechar, e a prop não existia. Fui conferir as outras que uso por hábito — e caiu o `Badge tone`, que é bem pior: 47 vezes, em telas já no ar.

### Lição

**Uma classe nova de erro, e a mais perigosa até agora: a prop morta.**

As seis lições anteriores (`NumericInput.fullWidth`, `Button.loading`, largura fora do `Field`, glifo do DataTable, rótulo de opção, `Pagination` com dado real) eram todas o mesmo padrão — *a spec previa, o adapter não expunha* — e todas **apareciam na tela**: algo torto, apertado, sem spinner. Alguém olhava e via.

Estas duas não aparecem. A prop cai no `...rest` ou é ignorada, o build passa, o React não reclama de prop desconhecida em componente próprio, e **o resultado é plausível**: um campo sem asterisco parece opcional, um badge cinza parece uma escolha de design. Foram 47 badges cinza em 19 arquivos passando por validação visual sem ninguém — eu incluído — desconfiar.

Duas causas distintas, cada uma com sua correção estrutural:

1. **Divergência de nome dentro do próprio DS** (`Badge.status` contra `StatCard.tone`/`Banner.tone`). Um DS que chama a mesma coisa por dois nomes **educa o consumidor a errar**. Correção: o nome canônico é `tone`, em todos; o antigo fica como apelido.
2. **Spec adiante do adapter** (`Field.required`). Correção: já é a sétima — vale gate.

Anotado como candidato a gate no `check-packages.mjs`: (a) comparar as props documentadas na `STUDIO_UX_COMPONENT_LIBRARY.md` com as desestruturadas na assinatura do componente; (b) checar que props de mesmo papel semântico têm o mesmo nome entre componentes. Não entram nesta versão — a spec é prosa bilíngue, extrair nome de prop dela sem falso positivo é frente própria, e (b) exige um vocabulário declarado de props canônicas que ainda não existe.

## [1.2.21] — 2026-07-25

### Fixed

- **`Pagination` era inalcançável por teclado.** Os controles eram `<span onClick>` — não focáveis, não anunciados como botão, e o "anterior" na página 1 continuava parecendo clicável. Agora são `<button>` com `aria-label`, `aria-current="page"` na atual, `disabled` real nas pontas e anel de foco (P18). Mesma classe de bug do "Limpar" da barra de lote (v1.2.15): elemento de ação escrito como `<span>`.
- **Mostrava apenas as 5 PRIMEIRAS páginas** (`slice(0, 5)`) — num log de 40 páginas **não havia como chegar na 6ª**. Agora é uma **janela** em volta da página atual (`window`, default 1 de cada lado), com primeira e última sempre visíveis e `…` marcando o salto. O `…` não é botão: é indicação, sem hover nem foco.

### Added

- **`total` + `itemLabel` no `Pagination`.** O componente não mostrava contagem de registros, então **cada tela de log montava "N registros" à mão** — a informação mais pedida numa lista longa, reimplementada N vezes com espaçamento próprio. Passando `total`, o componente rende a barra `.su-pagination-bar` com a contagem à esquerda e a navegação à direita.
  - **`itemLabel` aceita `[singular, plural]`**, não só string. String pluraliza com "s", o que **não serve para quase nenhum substantivo de log em português**: `notificação` → `notificaçãos`, `execução` → `execuçãos`. Com o par: `["notificação", "notificações"]`. Um DS que fala português por padrão não pode assumir plural do inglês.

### Origem

Pedido do Robson ao ver o primeiro consumo real numa tela de log da Automação do IA Studio: *"temos que evoluir o DS primeiro"*. Os três problemas só apareceriam **com dado de verdade** — 40 páginas, contagem grande, navegação por teclado. Ou seja: seriam descobertos em produção, não no desenvolvimento, que é o pior momento.

**Sexto caso** do padrão desta sequência: o componente funcionava na montagem em que foi testado primeiro (poucas páginas, mouse) e quebrava na montagem real (log paginado, teclado).

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.21`. **Consumidor precisa bumpar** `react` + `components`. **Mudança de API compatível**: `{ page, pageCount, onChange }` continua funcionando; `total`/`itemLabel`/`window` são opt-in.

## [1.2.20] — 2026-07-25

### Added

- **`Checkbox` e `Radio` ganharam `variant="card"` + `meta`.** A opção inteira vira um alvo delimitado — caixa + rótulo + linha de `meta` (categoria, contagem, `Badge`) dentro de uma borda que **acende no accent** quando marcada. O estado visual vem do próprio input via **`:has(:checked)`**: não existe prop de estado duplicada nem classe pra tela sincronizar — se existisse, borda e marcado poderiam divergir. `hover`, `focus-visible` (anel, P18) e `disabled` (esmaecido + superfície afundada) passaram a ser do componente.
  - **Por que virou padrão:** esse desenho já existia — **montado à mão** no editor de assistente do IA Studio, com `<div>` + borda e `<input>` solto. Mesma aparência, mas sem foco visível, com a borda de "marcado" sincronizada por JS e o motivo do desabilitado escondido num `title`. Robson comparou as duas telas (a com card e a com opção nua) e cravou: *"ficou muito mais elegante e isso tem que ser padrão do DS"*.
  - `meta` aceita nós, não só texto. Serve para tirar do rótulo a condição de aplicação — em vez de "Avisar quando normalizar (só nos modos proativo e combinado)" numa linha só, o rótulo fica curto e a condição vai pra `meta`.

### Changed

- **`CheckGroup.columns` agora tem dois regimes explícitos, e o numérico é TETO.** Antes a regra era só `minmax(240px, 1fr)`, que define largura **mínima** — então `columns={2}` num card de 1500px rendia 6 colunas. Agora: `"auto"` (default) = **quantas couberem** (o comportamento denso que o Robson aprovou nas listas de rótulo curto); `4`/`3`/`2`/`1` = **teto**, com o piso de cada coluna sendo o maior entre a largura legível e a fração 1/N do container descontados os gaps. Nenhuma media query.
- **`docs/components/STUDIO_UX_COMPONENT_LIBRARY.md`** ganhou duas seções novas — **`CheckGroup`** (com a tabela de quando usar cada regime de `columns`, decidido pelo comprimento do rótulo) e **Opção em card** (quando a borda ganha da opção nua, quando ela é só moldura, e os anti-padrões). Antes o catálogo descrevia `Checkbox` e `Radio` isolados e não dizia nada sobre **lista** de opções — o vácuo que fez cada tela inventar a sua grade.
- `Checkbox` e `Radio` passaram a compartilhar um `OptionLabel` interno: as duas não podem divergir de desenho, e antes o rótulo estava duplicado nos dois.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.20`. **Consumidor precisa bumpar** `react` + `components`.

## [1.2.19] — 2026-07-25

> **A tag `v1.2.18` existe mas NÃO publicou nada com esse número.** Eu corrigi o código e escrevi a entrada, mas **esqueci de bumpar os `package.json`** — que continuaram em `1.2.17`. O workflow então republicou `1.2.17` (já existente no registry), o CI ficou **verde**, e o consumidor que pediu `^1.2.18` recebeu `ETARGET: No matching version found`. O conteúdo que era pra ser a 1.2.18 está nesta 1.2.19; a tag `v1.2.18` fica queimada (tag é imutável).

### Fixed

- **`packages/react/Controls.jsx` estava sintaticamente INVÁLIDO na v1.2.17 — e foi publicado assim.** No JSDoc do `CheckGroup` eu escrevi `**3**/**4**`; a sequência `*` + `/` no meio disso **é `*/`**, que fecha o comentário de bloco ali. O resto da frase (`*4** para rótulos curtos…`) passou a ser lido como código. Reescrito como `3 ou 4`.
  - **Sintoma:** qualquer parser quebra no arquivo. O build do Storybook falhou com `[storybook:react-docgen-plugin] Controls.jsx: Unexpected token (38:33)`, e o mesmo vale para o Vite/esbuild de qualquer consumidor que instale a `1.2.17`.
  - **Quem instalou `@studio-ux-ds/react@1.2.17` precisa subir para `1.2.18`.** Consumidor com faixa `^1.2.17` pega a correção sozinho no próximo `npm install`.

### Changed

- **`scripts/check-packages.mjs` passou a validar que a TAG bate com a versão dos pacotes.** Este é o gate que faltava e que deixou a `v1.2.18` sair vazia: o workflow publica quando uma tag `vX.Y.Z` é empurrada, mas nada conferia se os `package.json` diziam `X.Y.Z`. Com as versões atrasadas, o `npm publish` republica a versão antiga — **sem erro**, porque tecnicamente é um publish válido — e o número da tag simplesmente nunca existe no registry. Agora, se `GITHUB_REF_NAME` for uma tag de versão e não casar com o lockstep, o publish falha antes, dizendo o comando exato para corrigir. Validei simulando os dois casos (tag certa passa; tag `v1.2.18` com pacotes em `1.2.19` falha).
- **`scripts/check-packages.mjs` passou a validar integridade de comentário de bloco.** A v1.2.17 saiu quebrada porque o gate de publicação verificava se os arquivos **existiam**, não se eram **válidos** — e o workflow de publish roda esse script antes do `npm publish`, sem `npm install`, então não há parser disponível. A checagem nova é dependency-free e precisa para esta classe: numa linha de continuação de comentário (começa com `*`), um `*/` que não está no fim da linha fechou o bloco cedo → falha com o arquivo, a linha e a sugestão de reescrita. Roda sobre `.js`/`.jsx`/`.mjs`/`.css` de `packages/`.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.19`. **Consumidor precisa usar `^1.2.19`** — `^1.2.18` não resolve, porque essa versão não existe no registry.

### Lição

Dois erros meus em sequência, e o mesmo tipo de causa: **gate que valida forma sem validar conteúdo dá falsa segurança.**

1. O `Controls.jsx` inválido passou pelo `check-packages` (que checava se o arquivo **existia**, não se era **válido**) e pelo `npm publish` (que não parseia nada). Quem pegou foi o Storybook, **depois** do pacote já estar no registry.
2. A `v1.2.18` saiu vazia porque nada conferia se a **tag** batia com a **versão dos pacotes** — e republicar uma versão existente não é erro para o npm, então o CI ficou verde.

Nos dois casos o CI passou e o consumidor descobriu no build dele. As duas checagens novas entraram no **mesmo script que já bloqueia o publish**, de propósito: lint separado que ninguém roda não é gate.

## [1.2.17] — 2026-07-25

### Added

- **`CheckGroup` — o container de uma lista de `Checkbox`/`Radio`** (`@studio-ux-ds/react` + `.su-check-group` no CSS). Montar o layout de um grupo de opções era trabalho do consumidor (um `div` com `space-y-*`), e o resultado empilhava **uma opção por linha**: num card largo sobravam dois terços de vazio e a lista descia pra rolagem. O `CheckGroup` distribui em **colunas** por `auto-fill` + `minmax` — sem media query: o navegador encaixa quantas couberem e cai pra uma sozinho em tela estreita.
  - `columns`: `"auto"` (default, equivale a 3) · `1` · `2` · `3` · `4`. **O default é usar as colunas que couberem**, não empilhar. Use `1` quando cada opção traz texto explicativo longo; `2` para rótulos de uma frase; `3`/`4` para rótulos curtos (nomes, chaves).
  - Aceita `role="group"`/`role="radiogroup"` + `aria-labelledby` apontando pro título visível da seção.
  - Dois consumidores reais já na estreia (a regra de "nenhuma abstração sem 2+ consumidores"): as listas de habilidades/bases/memória do editor de assistente do IA Studio — que tinham uma grade `auto-fill` **montada à mão**, agora deletada — e as opções de comportamento do incidente.

### Origem

Robson, olhando as 4 opções de comportamento do incidente empilhadas na v1.2.16: *"olha o tanto de espaço"* — e a diretriz: *"para otimizar o espaço em telas grandes seria bom ela ser capaz de usar colunas, não empilhar linha por linha"*.

Complementa a v1.2.16 (que corrigiu o rótulo de opção deixar de ser `inline` e passar a empilhar): empilhar era o certo para **uma** opção não colar na outra, mas o certo para um **grupo** é distribuir em colunas. A v1.2.16 resolveu a colisão; esta resolve o desperdício.

### Impacto nos consumidores

- **Aditivo.** `Checkbox`/`Radio` soltos não mudam. Quem quiser colunas envolve a lista no `CheckGroup`; quem não usar continua com o comportamento da v1.2.16 (empilhado).

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.17`. **Consumidor precisa bumpar** `react` + `components`.

## [1.2.16] — 2026-07-25

### Fixed

- **Várias opções seguidas ficavam NA MESMA LINHA, com o rótulo de uma encostando no controle da próxima.** O rótulo do `Checkbox`/`Radio` era `display: inline-flex` por estilo inline — e elemento inline não quebra linha, então nem `space-y-*` no container resolvia. O default virou **`flex` (bloco): uma lista de opções empilha**, que é o caso comum. Para o caso raro de opções lado a lado existe a prop **`inline`** (classe `.su-check--inline`).
- **`align-items: flex-start` + `line-height: 1.45`** no rótulo: quando o texto da opção é longo e quebra em duas linhas, o controle fica alinhado com a **primeira** linha em vez de flutuar no meio do parágrafo.
- **O ✓ saía torto no círculo.** Estava posicionado por offset fixo em px, calibrado para o quadrado; no `radio` isso desalinhava. Agora é `left/top: 50%` + `translate(-50%,-50%)`, que centraliza em qualquer forma. Mesmo tratamento no traço do `:indeterminate`.
- **Estilo saiu do inline para a classe `.su-check`** (P1: prop traduz para classe, não para valor). Antes o rótulo carregava `style={{...}}` com tamanho, cor e gap cravados — o consumidor não tinha como tematizar.

### Origem

Robson, revisando a família ISP recém-migrada (`v0.9.92`): *"não sei se é o DS, muito junto os checkbox do fim das frases"* — no card "Comportamento do assistente", as 4 opções apareciam em duas linhas corridas, com "…por este incidente✓ Informar a previsão…" grudado. E no mesmo print, o ✓ do radio desalinhado.

**Quinto caso** do padrão desta sequência: o componente funcionava na montagem em que foi testado primeiro (uma opção sozinha), e quebrava na montagem óbvia seguinte (uma lista de opções).

### Impacto nos consumidores

- **Mudança visual em quem usa `Checkbox`/`Radio` com rótulo.** Onde havia várias opções na horizontal por acidente, elas passam a empilhar (o correto). Se alguma tela dependia do arranjo horizontal, passar `inline`.
- Sem mudança de API fora disso: `inline` é opt-in com default `false`.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.16`. **Consumidor precisa bumpar** `react` + `components`.

## [1.2.15] — 2026-07-24

### Fixed

- **A caixa de seleção da `DataTable` aparecia como um ícone de DOCUMENTO.** O componente desenhava a seleção com `DSIcon name="square"` — e `square` estava **aliasado para `file`** no `DSIcon`. A caixa vazia renderizava uma folha de papel; a marcada (`square-check` → `check-circle`) virava um círculo; a parcial (`square-minus` → `minus`) um traço solto. Contraintuitivo e sem relação com "selecionar", exatamente como o Robson descreveu.
- **A seleção virou `<input>` REAL** (novo helper `SelectBox` dentro do `DataTable`). O ícone clicável não era focável por teclado, não era anunciado por leitor de tela e não tinha **estado indeterminado nativo** — o "alguns marcados" do cabeçalho era um traço desenhado. Agora o indeterminate vem de `ref.indeterminate`, o `aria-label` diz o que o controle faz (usando o `getRowLabel` quando existe) e o clique não propaga pro `onRowClick` da linha.

### Changed

- **`.su-checkbox` e `.su-radio` passaram a ser desenhados pelo DS** (`appearance: none` + tokens), em vez de herdar o desenho nativo cru com `accent-color`. Ganharam borda `--su-border-strong`, preenchimento `--su-action` quando marcados, ✓ branco desenhado em CSS (duas bordas rotacionadas — sem webfont nem SVG), traço no `:indeterminate`, hover, `:focus-visible` com anel (P18) e estado `:disabled`. Continuam sendo `<input>` de verdade: estilizar com `appearance: none` **não** custa acessibilidade.
- **A FORMA passou a carregar o significado (P17).** No `DataTable`: `selectionMode="multiple"` renderiza `checkbox` (**quadrado** — cabe vários); `selectionMode="single"` renderiza `radio` (**círculo** — cabe um). O ✓ é o mesmo nos dois: quem diz "está selecionado" é o preenchimento + o sinal; quem diz "quantos cabem" é a forma. É a convenção mais antiga da interface — círculo onde se pode marcar vários confunde antes de qualquer rótulo explicar. Em `single` os radios compartilham um `name` (via `useId`), senão cada um seria um grupo de um só e as setas do teclado não andariam entre as linhas.
- **Três glifos de caixa criados em `icons.js`** — `square`, `square-check`, `square-minus` (retângulo com raio; com ✓; com traço) — e os três **aliases enganosos removidos** do `DSIcon`. Precisavam sair: o alias tem precedência sobre o glifo (`ALIASES[name] || name`), então manter as linhas anularia os ícones novos. Quem pedir `square` agora recebe um quadrado.
- **"Limpar" da barra de lote virou `<button>`** — era um `<span>` com `onClick`, inalcançável por teclado.
- **Removido o ícone de caixa marcada ao lado do "N selecionado"** na barra de lote. A barra já diz a quantidade **por escrito** e cada linha marcada já mostra o próprio estado — o ícone era a mesma informação uma terceira vez, ruído competindo com o dado (P1). Achado pelo Robson na revisão visual: *"esse que marquei é redundante na visualização"*.

### Origem

Robson, olhando a barra de lote que acabou de entrar (v1.2.14): *"o checkbox está com ícone de arquivo, ficou estranho e contraintuitivo"*. O `.su-checkbox` já existia no CSS e o componente `Checkbox` já existia no React — o `DataTable` só não os usava. **Quarto caso** do mesmo padrão nesta sequência (`fullWidth`, `Button.loading`, largura dos controles, agora a caixa de seleção): a peça certa existia no DS e o componente improvisava com outra.

### Impacto nos consumidores

- **Puramente visual/semântico, sem mudança de API.** Nenhum call-site de `DataTable` muda.
- Se algum consumidor pedia `DSIcon name="square"` esperando o ícone de arquivo (improvável, era um bug), agora recebe um quadrado — o correto.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.15`. **Consumidor precisa bumpar os três** — `react` (o `SelectBox`), `components` (o desenho do `.su-checkbox`/`.su-radio`) e `icons` (os glifos `square*`).

## [1.2.14] — 2026-07-24

### Added

- **`DataTable` ganhou `selectionMode: "multiple" | "single"`** (default `"multiple"`, retrocompatível). A barra de lote deixou de pressupor multi-seleção: com `"single"`, marcar uma linha **desmarca a anterior** e o "marcar todas" do cabeçalho **não é renderizado**. Existe para os casos em que nada ali pode ser feito em massa — seja porque é perigoso (aprovar uma ação de IA, estornar um pagamento) ou porque o backend só atende um por vez. A interface para de oferecer o que o sistema não faz, em vez de aceitar cinco e recusar na hora de executar (P13).
- **`bulkActions` documentado como contextual à quantidade.** Ele já recebia `selectedIds`; o JSDoc agora diz para que serve: **o conjunto de ações varia com quantos estão marcados** — com 1 cabem as ações de registro único (Editar, Ver versões, Publicar, Testar); com vários, só as que rodam em lote (Exportar, Excluir, Arquivar). Ramificar em `selectedIds.length === 1`. A mesma tabela ter **mais** ações com um item marcado do que com cinco é deliberado, não inconsistência.

### Changed

- **`docs/STUDIO_UX_TABLES.md` §3 — "O teste objetivo da coluna de ações" virou "Onde cada ação mora — a taxonomia".** A versão anterior (v1.2.12) dizia o que **não** fazer (sem botão redundante na linha) e mandava a ação secundária "pro Menu de mais opções ou pra tela de destino" — mas **não citava a barra de lote**, que é o comportamento canônico do próprio `DataTable` ("Ao selecionar, a toolbar vira barra contextual", no JSDoc do componente desde sempre). Resultado: eu mesmo, seguindo a regra, tirei quatro botões da linha de Assistentes e mandei dois pro cabeçalho do editor — quando o lugar deles era a barra de lote. Regra reescrita como **taxonomia fechada de três lugares**: (1) abre o registro → a própria linha (`onRowClick`, zero botão); (2) age sobre um ou mais registros → **barra de lote** (`selectable` + `bulkActions`); (3) só existe dentro do registro → tela de destino. Mais a pergunta que decide (*"se eu marcar cinco linhas, essa ação faz sentido nas cinco?"*), a subseção de `selectionMode`, e o porquê da barra vencer o botão-por-linha (a mesma informação N vezes é ruído que cresce com a lista, e "fazer isso em cinco" deixa de custar cinco cliques).
- **Novo anti-padrão nomeado:** *"tirar o botão da linha e não fazê-lo reaparecer em lugar nenhum — ação que desaparece é regressão, não simplificação"*. Ao mover uma ação, **verificar na tela** que ela chegou no destino. Nasceu de o Robson notar, no Assistentes, que as ações saíram da linha e ele não as achou.

### Fixed

- **`.su-pagehead__actions` ganhou `flex-wrap: wrap` + `justify-content: flex-end`.** Sem wrap e com `flex: none`, um cabeçalho de detalhe com 3–4 ações (Voltar · Versões · Exportar · Salvar) estourava para fora da viewport em telas estreitas — e as ações simplesmente desapareciam de vista, o que é indistinguível de "não foram implementadas".

- **`.su-input`, `.su-textarea` e `.su-select` ganharam `width: 100%` + `box-sizing: border-box`** (`@studio-ux-ds/components`). Os três só preenchiam o espaço **porque `.su-field` é `flex-direction: column`** — o stretch vinha do flex do wrapper, não do controle. Fora do `Field` caíam na largura intrínseca do elemento HTML: `<input>` ~180px, `<textarea>` no `cols` padrão (~20 caracteres). Resultado: qualquer composição que use um controle solto — linha repetível (passo de um roteiro, item de lista editável), célula de tabela, barra de filtro montada à mão — nascia com o campo esmagado. **Dentro do `Field` nada muda**: o efeito é idêntico ao que o flex já dava.
- **`.su-toolbar__search` ganhou `width: auto`** para reverter o `100%` acima. Ali o `.su-input` está aplicado numa `<div>` que vive na flex row da toolbar do `ListScreen`, ao lado do `SegmentedControl` e das ações — se esticasse, empurraria os dois pra fora da linha. Regressão pega antes de publicar.

### Origem

Terceiro caso do mesmo padrão em três releases (`fullWidth` do `NumericInput` na v1.2.10, `loading` do `Button` na v1.2.13, largura dos controles agora): **o componente funcionava só no arranjo em que foi testado primeiro**, e o consumidor que saía dele improvisava. Aqui apareceu na migração do editor de assistentes do IA Studio (`v0.9.90`), onde as linhas de "Passo" e "Situação" põem um `Input` e um `TextArea` numa linha flex sem `Field` — e os campos apareceram com ~180px, ilegíveis, no print do Robson.

**Ajuste no método:** ao materializar um componente, testar as **duas** montagens — dentro do `Field` e solto — antes de considerar pronto. Um controle de formulário que só preenche quando embrulhado não é um componente completo; é um componente com pré-condição não documentada.

### Impacto nos consumidores

- **Retrocompatível na intenção, mas é mudança visual.** Onde havia `.su-input`/`.su-select`/`.su-textarea` **fora** de um `.su-field` dentro de um container largo, o campo passa a preencher — que é o efeito desejado, mas é diferente de antes.
- **Onde NÃO se quer o `100%`**, envolver num container com largura (`<div style={{ maxWidth: 320 }}>`) — que já é o padrão que os consumidores usam para o `Field` — ou aplicar `width: auto` numa classe própria, como o `.su-toolbar__search` faz.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.14`. **Consumidor precisa bumpar** (`@studio-ux-ds/components` carrega o CSS).

## [1.2.13] — 2026-07-24

### Added

- **`Button` ganha prop `loading`** (`@studio-ux-ds/react` + `@studio-ux-ds/components`). Materializa o estado que a spec **já declarava** desde sempre no catálogo (`STUDIO_UX_COMPONENT_LIBRARY.md` → Button → Estados: *"loading (spinner + rótulo, bloqueia re-clique, P16)"*) e que o adapter não expunha. Com `loading`: o `icon` da esquerda é substituído por `<Spinner>`, o `iconRight` é suprimido, o botão recebe `disabled` (bloqueia re-clique de verdade, não só visualmente) e `aria-busy` (anuncia a leitores). O **rótulo continua visível** — quem chama deve trocá-lo pelo gerúndio ("Salvando…"), porque spinner sozinho não diz o que está acontecendo (P11); isso está no JSDoc da prop.
- **CSS `.su-btn .su-spinner`** — o Spinner dentro de botão herda a **cor do texto** (`currentColor`) em vez das cores do `.su-spinner` solto (que usa `--su-border-default` + `--su-action` e ficaria **invisível** sobre o fundo de um `primary`/`danger`). Anel de 3/4 em `currentColor` com o topo transparente; tamanho acompanha `--sm`/`--lg`. Sem `color-mix` pra não depender de suporte. `.su-btn--loading` só ajusta `cursor: progress`.

### Origem

Rastro de três descobertas em cadeia, durante a migração da família IA Studio (releases `v0.9.84`–`v0.9.88`):

1. Robson notou que os botões de salvar não mostravam spinner de verdade.
2. Investigando, os consumidores estavam escrevendo `icon={saving ? 'loader-2' : 'check'}` — **fingindo** o estado. `loader-2` existe como *alias* no `DSIcon` (→ `refresh`), então renderiza um ícone de refresh **estático**: parece um botão comum, não comunica carregamento.
3. A causa raiz: a spec declarava o estado, `.su-spinner` já existia no CSS, `<Spinner>` já existia no React — **só não estavam ligados no Button**. Mesmo padrão do `fullWidth` do `NumericInput` (v1.2.10): consumidor precisou, spec já previa, adapter não expunha, consumidor improvisou.

**Lição registrada no método:** quando um consumidor improvisa um estado (ícone falso, `<div>` no lugar de componente, classe inventada), a primeira pergunta não é "como melhorar o improviso" — é **"a spec já prevê isso e o adapter não expõe?"**. Nos 2 casos até agora a resposta foi sim. Um `grep` no catálogo antes de improvisar teria evitado os dois.

### Também nesta leva (achado colateral)

Auditoria dos nomes de ícone usados pelos consumidores contra `ICON_NAMES` + `ALIASES` do `DSIcon` encontrou **nomes inexistentes sendo passados** (`refresh-cw`, `server`). O `DSIcon` **não quebra** — cai no fallback `"help"`, ou seja, renderiza um **"?"** na interface. Comportamento correto (não explodir a tela), mas silencioso: o consumidor só descobre olhando. Corrigido do lado do consumidor (IA Studio `v0.9.89`). **Fica registrado como dívida do DS:** avaliar um aviso em dev (`console.warn` só quando `NODE_ENV !== 'production'`) para nome de ícone não resolvido — hoje o erro é invisível até alguém ver o "?" na tela. Não implementado nesta release (é decisão de API do adapter, merece frente própria).

### Impacto nos consumidores

- **Retrocompatível (MINOR).** `loading` é opt-in com default `false`; nenhum call-site existente muda de comportamento.
- **Ação recomendada:** trocar `icon={saving ? 'loader-2' : 'x'}` por `loading={saving} icon="x"` — o `icon` volta a ser sempre o ícone real da ação, e o DS cuida do estado.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.13`. **Consumidor precisa bumpar** pra usar a prop (`@studio-ux-ds/react` + `@studio-ux-ds/components` — o CSS do spinner-em-botão vem no `components.css`).

## [1.2.12] — 2026-07-24

### Changed

- **`docs/components/STUDIO_UX_COMPONENT_LIBRARY.md` — a regra do Modal virou TESTE OBJETIVO.** A v1.2.11 escreveu a regra em prosa editorial ("campo que exija escrita reflexiva") e ela foi interpretada por gosto — cada caso virou uma discussão sobre o `TextArea` ser "pequeno o bastante". Substituída por critério **mecânico, verificável por `grep`**: *se o formulário contém um `TextArea`, ele NÃO é Modal — é rota.* Sem exceção de tamanho, obrigatoriedade ou "é só um motivinho curto". Nova subseção **"Modal ou rota? — o teste objetivo"** (PT+EN) com: a lista fechada dos campos que Modal aceita (`Input`, `NumericInput`, `Select`, `Combobox`, `Checkbox`, `Switch`, `RadioGroup`, `DatePicker`), o **porquê** de ser absoluta (o que decide não é o tamanho do campo, é o que ele pede do usuário — `Input` pede dado que ele já tem na cabeça, `TextArea` pede que ele **componha**, e compor exige ver o contexto que o Modal esconde atrás do scrim), como promover pra rota, e 4 **casos-limite resolvidos** (motivo opcional de rejeição → rota; JSON mono → rota; leitura de lista curta → pode ser Modal; `ConfirmDialog` sem campo → Modal sempre).
- **`docs/STUDIO_UX_TABLES.md` §3 — a regra da linha clicável virou TESTE OBJETIVO.** A regra já existia ("a linha não precisa de um botão 'abrir' redundante quando ela inteira já é o alvo") mas estava enterrada no meio de um parágrafo de prosa, e foi violada na prática. Nova subseção **"O teste objetivo da coluna de ações"** (PT+EN): antes de colocar QUALQUER botão numa linha, perguntar *"esse botão leva ao mesmo lugar que clicar na linha levaria?"* — se sim, ele não existe. Mais uma **árvore de decisão em 4 casos**: (1) um destino natural → `onRowClick`, zero botão; (2) ação secundária que não é "abrir" → `Menu` de mais-opções ou, melhor, desce pra dentro da tela de destino; (3) linha sem destino (backend não expõe leitura/edição individual) → linha não clicável, não invente rota; (4) duas decisões concorrentes na linha (aprovar × rejeitar) → sinal de que falta a tela de decisão; a linha abre o detalhe e as ações vivem lá. **Anti-padrão nomeado:** `onRowClick` **e** botão de editar na mesma linha (dois alvos primários disputando o mesmo clique).

### Origem

Duas descobertas na sequência, durante a migração da família IA Studio:

1. **Modal.** A regra da v1.2.11 não segurou: na migração de `IA/Ferramentas` (release `v0.9.87` do IA Studio) o `ToolModal` foi corretamente promovido a rota, mas o `RejectModal` do `Aprovacoes` (um `TextArea` de motivo, 2 linhas, opcional) ficou como Modal por eu ter julgado "curto o bastante". Robson cortou a ambiguidade: *"modal deveria ser usado somente aonde havera poucos dados e nunca aonde tem imputs grandes como o descrição e o jason"*. Regra reescrita como teste binário.
2. **Tabelas.** Na mesma release eu coloquei um lápis "editar" em cada linha do catálogo de habilidades. Robson: *"se não me engano em tabelas teremos sempre linha clicaveis sem botões de ações"* — e estava certo, a regra já estava escrita no `TABLES` §3. Ou seja: **a regra existir não basta se estiver diluída em prosa.** Promovida a teste verificável, com a árvore de decisão que cobre os casos que davam margem a improviso.

Lição registrada no método: quando uma regra do DS é violada por quem a leu, o problema costuma ser a **forma** da regra (editorial, sujeita a julgamento), não a falta dela. A correção é transformá-la em teste mecânico.

### Impacto nos consumidores

- **Puramente documental.** Nenhuma quebra de API, nenhuma mudança de CSS/adapter. Consumidor NÃO precisa bumpar dependência por causa desta release.
- **Auditoria recomendada** nos consumidores em adoção — dois `grep` resolvem: `TextArea` dentro de arquivo que também tem `Modal` (candidato a rota), e `renderRowMenu` com botão que leva ao mesmo destino do `onRowClick` (botão redundante). Foi exatamente essa auditoria que gerou a release `v0.9.88` do IA Studio, que corrigiu as 4 telas já migradas.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.12` mesmo sendo mudança só de doc — mantém o padrão "1 tag = 1 estado da spec".

## [1.2.11] — 2026-07-24

### Changed

- **`docs/components/STUDIO_UX_COMPONENT_LIBRARY.md` — regra permanente do Modal**: "formulário com `TextArea` para descrição/texto rico ou qualquer campo que exija escrita reflexiva **não vive em Modal — vira rota/tela dedicada**." Reforço explícito nas seções "Quando NÃO usar", "Regras" e "Anti-padrões" (PT+EN). Motivação: o textarea empurra o form pra baixo do scrim, reduz o espaço útil de escrita e escrever texto denso preso num modal (com o resto da tela ausente) é hostil ao pensamento. Regra alinhada com P22 (overlay é pra tarefa curta) e P6 (ação primária da tela mora no PageHeader).

### Origem

Descoberta durante a migração da tela `IA/Aprovacoes` do IA Studio pro DS (release `v0.9.86`, 2026-07-24): o `PolicyModal` original — que tem `TextArea` de Descrição + `TextArea` de Condição JSON — foi migrado 1:1 para o `Modal` do DS, mas Robson identificou o antipattern na revisão visual. Regra promovida imediatamente pra evitar que a mesma cagada se repita em outras migrações.

### Impacto nos consumidores

- **Puramente documental.** Nenhuma quebra de API, nenhum bump de código do adapter/CSS. A regra vale a partir de agora pra novas telas e pra planejamento de refactor arquitetural das telas existentes.
- Consumidores em migração devem **rever seus modais**: qualquer `Modal` com `TextArea` como campo central é candidato a virar rota dedicada em sub-frente futura. Não é urgência de "quebrar tudo agora" — é bússola pra evitar novos casos e priorizar o refactor dos existentes.

### Bump lockstep

Todos os 7 pacotes vão pra `1.2.11` mesmo sendo mudança só de doc — mantém o padrão "1 tag = 1 estado da spec" (a spec inclui a doc; o snapshot da spec avança).

## [1.2.10] — 2026-07-24

### Added

- **`NumericInput` ganha prop `fullWidth`** (`@studio-ux-ds/react` + `@studio-ux-ds/components`). Opt-in: quando `true`, o componente muda de `inline-flex` (largura natural ~140px) para `flex; width: 100%` e o input interno passa de `width: 72px` fixo para `flex: 1`. Útil quando o `NumericInput` vive numa célula de grid/`Field` que oferece 100% de espaço (o default deixa um vazio à direita que destoa em forms `grid-cols-3` etc.).

### Origem

Descoberto na aplicação real durante a migração da tela `IA/Custos` do IA Studio pro DS (release `v0.9.84` do IA Studio, 2026-07-24): forms em `grid-cols-3` (Simulador de custo) mostravam os NumericInputs alinhados à esquerda com espaço vazio à direita dentro da célula. Alternativas foram avaliadas com o dono (aceitar, quick fix na tela, evoluir o DS); optou-se pela evolução do DS pra não criar inconsistência entre telas nem hack no consumidor.

### Como o consumidor usa

```jsx
import { NumericInput, Field } from '@studio-ux-ds/react';

// Default (largura natural, ~140px, alinhado à esquerda no container):
<Field label="Quantidade">
  <NumericInput value={qty} onChange={setQty} min={0} step={1} />
</Field>

// fullWidth (estica pra 100% do container — Field/grid cell/qualquer coisa):
<Field label="Tokens de prompt">
  <NumericInput value={form.prompt_tokens} onChange={(v) => patch({ prompt_tokens: v })} min={0} step={100} fullWidth />
</Field>
```

### Compatibilidade

Backwards-compatible. Default é `false` — todo callsite existente continua exatamente como estava. Consumidores que quiserem a nova largura opt-in explicitamente com `fullWidth`.




- **PT:** `StatCard` semântico passa a manter a superfície neutra: borda, valor e ícone carregam o tom funcional, sem fundo colorido. O adapter React expõe o slot opcional `icon`, e as referências Financeiro e Comercial demonstram o mesmo contrato.
- **EN:** Semantic `StatCard` now keeps a neutral surface: border, value and icon carry the functional tone, without a colored background. The React adapter exposes the optional `icon` slot, and the Financial and Commercial references demonstrate the same contract.

## [1.2.9] - 2026-07-22

### Fixed

- **PT:** O adapter React deixa de restringir `@studio-ux-ds/icons` à série `1.2.x`; a faixa de peer dependency agora aceita a linha compatível `1.x`, preservando o lockstep em futuros bumps MINOR.
- **EN:** The React adapter no longer restricts `@studio-ux-ds/icons` to the `1.2.x` series; its peer-dependency range now accepts the compatible `1.x` line, preserving lockstep through future MINOR bumps.
- **PT:** Ícones do adapter web, mobile-web e stories passam integralmente pelo SVG local curado. O Storybook não depende mais da webfont Tabler/CDN para exibir ícones.
- **EN:** Icons in the web adapter, mobile-web adapter and stories now all go through the curated local SVG. Storybook no longer depends on the Tabler webfont/CDN to display icons.

### Changed

- **PT:** `STUDIO_UX.md` e o handoff voltam a descrever o produto real: pacotes materializados, tokens congelados, Fase 3 ativa e adoção por jornada.
- **EN:** `STUDIO_UX.md` and the handoff once again describe the real product: materialized packages, frozen tokens, active Phase 3 and journey-based adoption.

## [1.2.8] - 2026-07-22

### Changed

- **PT:** A jornada canônica de listagens da referência AquaPark passa a demonstrar a regra completa: linha acionável com teclado, drill-in, criação e edição em página, retorno ao contexto e `ConfirmDialog` apenas para exclusão. O gatilho de busca deixa de exibir o atalho; `Ctrl+K`/`⌘K` continuam funcionais. A referência também remove seus degradês residuais.
- **EN:** The AquaPark reference canonical list journey now demonstrates the complete rule: keyboard-accessible row, drill-in, page-based creation and editing, contextual return, and `ConfirmDialog` only for deletion. The search trigger no longer displays the shortcut; `Ctrl+K`/`⌘K` remain functional. The reference also removes its remaining gradients.

## [1.2.7] - 2026-07-22

### Fixed
- **PT:** O gatilho de busca do `AppShell` deixa de exibir a tecla `⌘K`; ele mostra apenas a ação “Buscar”. Quando `onCommandPalette` é fornecido, a casca passa a abrir o comando por `Ctrl+K` no Windows/Linux e `⌘K` no macOS, prevenindo o atalho nativo do navegador.
- **EN:** The `AppShell` search trigger no longer displays the `⌘K` key; it shows only the “Search” action. When `onCommandPalette` is supplied, the shell opens the command with `Ctrl+K` on Windows/Linux and `⌘K` on macOS, preventing the browser's native shortcut.

### Changed
- **PT:** A DoD de adoção passa a proibir coexistência final entre componentes legados e o layout Studio UX numa mesma jornada. A migração exige lista, detalhe, criação, edição, confirmação e retorno completos; `DataTable`/`ListScreen` usam linha clicável como acesso ao drill-in, e modais ficam restritos a confirmação ou tarefa curta.
- **EN:** The adoption DoD now forbids final coexistence between legacy components and the Studio UX layout within the same journey. Migration requires complete list, detail, creation, edit, confirmation, and return flows; `DataTable`/`ListScreen` use a clickable row as drill-in access, while modals are restricted to confirmation or a short task.

## [1.2.6] - 2026-07-22

### Changed
- **PT:** O padrão CRUD passa a exigir continuidade visual entre detalhe e edição: quando “Editar” nasce no detalhe, a página de edição mantém o mesmo PageHeader, largura, superfície e contexto de retorno. Editar é um estado da entidade, não uma nova área do produto.
- **EN:** The CRUD pattern now requires visual continuity between detail and editing: when “Edit” originates in detail, the edit page keeps the same PageHeader, width, surface, and return context. Editing is an entity state, not a new product area.


## [1.2.5] - 2026-07-22

### Changed
- **PT:** Refinamento de presença visual sem gradientes: canvas do AppShell usa a superfície rebaixada, shell/tabelas/cards ganham separação mais legível e `StatCard` recebe sinal semântico mais claro pela borda, tint suave e valor. Adicionado o tom `warning`.
- **EN:** Visual-presence refinement without gradients: the AppShell canvas uses the sunken surface, shell/tables/cards gain clearer separation, and `StatCard` receives a stronger semantic signal through border, soft tint, and value. Added the `warning` tone.


## [1.2.4] - 2026-07-22

### Added
- **PT:** `DataTable` e `ListScreen` agora aceitam `onRowClick` e `getRowLabel`, transformando a linha no acesso canônico ao detalhe com mouse e teclado (`Enter`/`Espaço`). `StatCard` ganha o tom semântico opcional `info`, `success` e `danger`.
- **EN:** `DataTable` and `ListScreen` now accept `onRowClick` and `getRowLabel`, making the row the canonical way into detail with mouse and keyboard (`Enter`/`Space`). `StatCard` adds optional semantic `info`, `success`, and `danger` tones.

### Changed
- **PT:** Linhas clicáveis recebem hover e foco visível; seleção em lote e menu de linha não disparam a abertura do detalhe.
- **EN:** Clickable rows receive hover and visible focus; bulk selection and a row menu do not trigger detail navigation.


## [1.2.3] - 2026-07-22 - Busca estável no ListScreen

- ✅ **Foco preservado:** a Toolbar de `ListScreen` agora fica em um card estrutural estável. Alternar entre loading, tabela, cartões e estado vazio não desmonta o input de busca; é possível continuar digitando depois de o primeiro resultado aparecer ou desaparecer.
- ✅ **DataTable reutilizável:** a prop interna `bare` permite que o molde de lista reaproveite a tabela sem criar outro card, preservando a API pública existente.
- 🔎 **Lockstep:** oito manifests (raiz + sete pacotes) avançam juntos para `1.2.3`.

## [1.2.2] - 2026-07-22 - Ícones locais no adapter React

- ✅ **Sem webfont externa no AppShell:** navegação, TopBar, botões de ícone, drawers, estados vazios, busca e Customize passam a renderizar o SVG local curado em `@studio-ux-ds/icons`. A casca não deixa de exibir ícones quando uma CDN é bloqueada por CSP ou está indisponível.
- ✅ **Compatibilidade de API:** nomes legados aceitos nas props `icon` continuam funcionando por normalização interna; consumidores não precisam trocar sua árvore de navegação nesta release.
- 🔎 **Lockstep:** oito manifests (raiz + sete pacotes) avançam juntos para `1.2.2`.

## [1.2.1] - 2026-07-22 - Correção do menu da Top Nav

- ✅ **Dropdown visível:** o menu de grupos da variante `Top Nav` não é mais recortado pelo contêiner horizontal; ao abrir Configurações, seus destinos ficam acima do conteúdo e continuam clicáveis.
- 🔎 **Trem de release:** `v1.2.0` já havia sido publicada; esta correção segue para frente em `v1.2.1`, preservando a imutabilidade das tags.

## [1.2.0] - 2026-07-22 - Preferências de layout e linguagem

- ✅ **Layout persistido no `AppShell`:** o Customize passa a alternar entre `Sidebar` e `Top Nav` com a mesma árvore de navegação; no Mobile a casca preserva o menu off-canvas.
- ✅ **Idioma inicial real:** `pt-BR` e `en` são persistidos e aplicados ao `lang` do documento; rótulos proprietários do DS (Customize e AppShell) acompanham a escolha. O conteúdo do sistema consumidor continua em sua camada de i18n, sem tradução falsa.
- ✅ **Escopo explícito:** densidade, direção/RTL e container seguem fora do Customize. As decisões de idioma e layout foram registradas nos ADRs correspondentes.

## [1.1.22] - 2026-07-22 - Laboratório visual: navegação e casca compacta

- ✅ **Casca recolhida sem deformação:** ao recolher a `Sidebar`, a marca conserva apenas seu símbolo; o nome deixa de ocupar ou vazar da coluna de ícones.
- ✅ **TopBar responsiva antes do aperto:** a partir de larguras intermediárias, contexto, rótulos e atalhos redundantes cedem espaço primeiro. Busca, notificações, ajuda e menu de usuário continuam como gatilhos independentes e clicáveis.
- ✅ **Navegação honesta no Laboratório:** `Despesas` ganhou lista própria; busca abre a `CommandPalette`; sino e ajuda abrem seus `Drawer`s. Rotas que ainda não têm fluxo de validação mostram uma cena explícita de preparação — elas não são mais redirecionadas falsamente para “Estados da experiência”.
- 🔎 **Prova:** `check-packages.mjs` verde para os oito manifests em lockstep (raiz + sete pacotes) `1.1.22` e `git diff --check` sem erro. A confirmação visual ocorre no Storybook Pages após o push desta tag.

## [1.1.21] - 2026-07-22 - Laboratório visual + refinamento da linguagem base

- ✅ **Laboratório visual integrado no Storybook:** nova story **`Referência visual/Laboratório financeiro`**, composta exclusivamente com o runtime real (`AppShell`, `PageHeader`, `ListScreen`, `Card`, `StatCard`, formulário e estados). É o ambiente de aprovação visual antes de qualquer adoção em AquaPark, IA Studio, Finanças, Delivery ou outro consumidor — não é maquete nem CSS de app.
- ✅ **A linguagem visual foi refinada na fonte:** tokens de superfícies, bordas, raios e elevação foram recalibrados nos dois temas; sidebar, topbar, cards, KPIs e tabela passaram a ter hierarquia, ritmo e profundidade mais definidos, mantendo a paleta semântica, sem gradientes ou efeitos decorativos.
- ✅ **`StatCard` mais consistente:** KPI agora usa a mesma superfície elevada dos agrupamentos de dados; delta ganhou classes oficiais (`.su-statcard__delta`/`--down`), removendo valores visuais inline do adapter.
- ✅ **Governança/documentação:** `PLAYGROUND`, `REFINAMENTO-E-PROPAGACAO` e `COMPONENT_LIBRARY` passam a registrar o Laboratório visual como gate de revisão claro+escuro e descrevem as superfícies atuais. Story de `AppShell` atualizada para a versão vigente.
- 🔎 **Prova:** contraste recalculado para os pares principais (texto primário/secundário nos dois temas ≥ AA; ação escura sobre superfície = 3.55:1 para componente não-textual); `check-packages.mjs` verde, lockstep dos 8 manifests em `1.1.21` e `git diff --check` sem erro. O build do Storybook fica a cargo da CI no push, pois o ambiente local não materializou as dependências do bundler.
- 🔎 **A propagar:** publicar `v1.1.21` primeiro; revisar o Visual Lab no Pages e só então escolher uma adoção-canário. Nenhum sistema consumidor foi alterado nesta release.

## [1.1.20] - 2026-07-21 - AppShell: grupos de navegação colapsáveis (acordeão)

- ✅ **`AppShell` ganhou grupos de nav colapsáveis** (`patterns/AppShell.jsx`): um item da navegação agora pode ser uma **folha** (`{icon,label,href,active}`) **ou um grupo** (`{group, icon, items:[folhas…], defaultOpen}`) que abre/fecha em **acordeão** — um aberto por vez — e **nasce aberto no grupo que contém o item ativo**. Filhos recuados (`.su-nav__children`), chevron que gira, e o botão do grupo herda a marca P17 do item ativo quando fechado sobre uma rota ativa. Na sidebar **recolhida** (só ícones), clicar um grupo **expande a sidebar e abre o grupo**.
- 🔎 **Motivo (refinamento surgido ao adotar a casca do Finanças):** o Finanças tem o submenu **Configurações** (Aparência/Atualização/Categorias/Perfis/Usuários) como acordeão — o `AppShell` só sabia seções planas. Em vez de achatar o menu do app na adoção, a capacidade voltou pro DS (P: o DS é dono do desenho). Serve também ao IA STUDIO (mesmo padrão "abre um, fecha o outro").
- ✅ **CSS** (`components.css`): renomeado o invólucro de seção para `.su-nav__section` (evita colisão) e adicionados `.su-nav__group/.su-nav__group-btn/.su-nav__group-label/.su-nav__chev/.su-nav__children` — só token. Story `Padrões/AppShell` atualizada com o grupo **Configurações** de exemplo.
- 🔎 **A propagar:** próxima frente = re-adoção da casca do Finanças no `AppShell` (Layout→AppShell, Customize na TopBar/Aparência, usuário movido pra TopBar, accent migrado pro `data-su-accent`). Depende desta versão publicada. Lockstep (8 pacotes) preservado.
- **Prova (QA):** build do Storybook limpo; acordeão verificado no Chromium — grupo Configurações fechado por padrão, abre ao clicar mostrando os 5 filhos recuados, um-aberto-por-vez; resto da casca (TopBar, nav ativo P17, accent) intacto.

## [1.1.19] - 2026-07-21 - AppShell + Customize (casca no arquétipo + tema/accent do usuário)

- ✅ **`AppShell` — o molde da casca** (`@studio-ux-ds/react`, `patterns/AppShell.jsx`): compõe só átomos existentes (`Sidebar`/`NavItem`/`TopBar`/`Breadcrumb`/`Drawer`) e trava as invariantes que deixam a casca **idêntica ao Flux em posição e comportamento**. A página preenche **só a região de conteúdo** (P22); a **TopBar nunca carrega a ação primária** da tela (P6) — leva contexto (breadcrumb/período), gatilho ⌘K, notificações, ajuda e menu do usuário. Item de nav ativo sinaliza **além da cor** (barra à esquerda + peso + `aria-current`, P17). Desktop = Sidebar fixa **colapsável com estado lembrado** (`localStorage`), rodapé em 2 blocos (atalhos + bloco de versão passivo); Mobile (≤767px) = Sidebar vira **off-canvas** por hambúrguer (P4). Menu do usuário traz **Personalizar** → painel Customize, e atalho rápido Claro↔Escuro.
- ✅ **`Customize` — painel de tema + accent** (`patterns/Customize.jsx`): entrega os dois eixos que **só repontam token** (seguros, THEMES §5) — **Tema** (Claro / Escuro / **Sistema**, via `data-theme`; ausente = segue o SO) e **Cor de destaque** (7 accents). Muda **ao vivo** no clique, **persiste** e reaplica antes do render (sem flash); o accent selecionado sinaliza **além da cor** (anel + check, P17). Serve no Drawer do AppShell **e** embutido numa tela de Configurações → Aparência (paridade de acesso, P19).
- ✅ **Mecanismo de tema/accent promovido ao DS** (`packages/react/theme.js`, sem dependência de React): `getTheme/setTheme`, `getAccent/setAccent`, `isDark`, `applyTheme` (chamar antes do render), `watchSystemTheme`, `configureTheme({namespace})` para o app namespaçar as chaves. Agora é **o DS** quem sabe trocar tema/accent — o app (Finanças) passa a consumir, não a manter o `theme.js` próprio.
- ✅ **Tokens: `[data-su-accent]` com 7 accents sóbrios** (`indigo` padrão, `blue`, `teal`, `violet`, `amber`, `rose`, `slate`). Um accent repõe **só** `--su-action` (+`hover/active/tint`) e `--su-text-on-action`; nunca espaço/layout/estrutura (THEMES §5). **Todos revalidados em AA** (P18) em claro **e** escuro por script de contraste WCAG; no escuro, accents claros (teal/âmbar/…) fazem **flip da tinta** do rótulo para escuro, cumprindo o alvo onde texto branco falharia. `indigo` reproduz exatamente o padrão do sistema.
- ✅ **Storybook:** novos `Padrões/AppShell` (casca completa, sidebar recolhida, sem usuário) e `Padrões/Customize` (painel + prévia ao vivo). `components.css` ganhou `.su-appshell*`, rótulos/grupos de nav, barra do item ativo (P17), rodapé/versão da sidebar, TopBar (`__left/__right/__context/__cmdk/__bell/__user`), `.su-usermenu`, off-canvas mobile e `.su-customize/.su-swatches/.su-swatch` — só token.
- 🔎 **Governança:** `docs/governance/ADR-CUSTOMIZE-EIXOS-ADIADOS.md` registra os eixos **deixados de fora** de propósito, cada um como ADR aberto: densidade em runtime (colide com P21), idioma (P11 ≠ i18n), direção RTL, sidebar↔topo (muda estrutura), fluido↔boxed (molde de layout). Não entram sem decisão registrada.
- 🔎 **A propagar:** Finanças passa a usar o `AppShell` como casca e o `Customize` na tela de Aparência (troca o `theme.js` local pelo do DS via `configureTheme({namespace:"financas"})`). Lockstep (8 pacotes) preservado — bump no release.
- **Prova (QA):** build do Storybook limpo (0 stories faltando); `AppShell` renderiza a casca Flux (breadcrumb+contexto+⌘K+sino+usuário na TopBar, sem ação primária; nav ativo com barra). **Accent troca a cor ao vivo** só com `data-su-accent` (verificado teal no claro e âmbar no escuro — botão âmbar com tinta escura legível). Painel Customize com os 7 swatches e seleção sinalizada além da cor. Gate AA (branco/tinta sobre ação e ação sobre superfície ≥ 3.0) passa nos 14 pares (7 accents × claro/escuro). Chromium headless, screenshots por estado.

## [1.1.18] - 2026-07-21 - Fix .su-cards (variante mobile do ListScreen)

- 🔎 **Fix achado ao re-adotar a Receitas (Finanças) no `ListScreen`:** a lista de cards da variante estreita (`.su-cards`) estourava a largura em ~375px — era `display:grid` sem coluna explícita (vira `max-content` e infla no conteúdo) e faltava `min-width:0` na cadeia flex (`.su-listscreen > *`, `.su-cards > *`). Corrigido: `.su-cards` vira **flex-column** + `min-width:0` nos filhos; os cards ocupam 100% da largura e o texto trunca. Verificado em build real (Vite) a 375px, claro/escuro, **0 overflow**.

## [1.1.17] - 2026-07-21 - Padrao list na camada React

- ✅ **Padrão `list` materializado na camada React** (`@studio-ux-ds/react`): novos `PageHeader` e `ListScreen` (subpasta `patterns/`) compondo só átomos existentes (DataTable, SegmentedControl, Pagination, EmptyState, Skeleton…). O molde de tela `list` (TEMPLATES §2, deriva de TABLES) passa a existir como componente React **runtime**, não só como gerador HTML — um app React (Finanças) importa `ListScreen` e a tela é **re-desenhada no archetype**.
- ✅ **Header do card idêntico ao Flux** (posição + comportamento): título à esquerda · busca + filtro segmentado à direita; rodapé "mostrando X de Y"; ações de linha em ícone à direita. Duas variantes de produto (P4): Desktop = `DataTable`; tela estreita = `Card`s (via `renderCard`, troca por `matchMedia`). Todos os estados (P14).
- ✅ **`DataTable`: `footer` + seleção opt-in** (`selectable`, default = só com `bulkActions`; sem ações de lote não há checkbox — igual Flux). Novo `Padrões/PageHeader` e `Padrões/ListScreen` no Storybook; `components.css` com `.su-listscreen/.su-pagehead/.su-toolbar/.su-listcard__foot/.su-cardstate/.su-cards` (só token).
- 🔎 **A propagar:** Finanças/`Receitas` (v0.1.28, port raso) marcado pra re-adotar o `ListScreen`. Lockstep (7 pacotes) preservado — bump no release.

- ✅ **Storybook do `@studio-ux-ds/react`** (doc navegável, hospedado no GitHub Pages). Documenta o **pacote React real** — cada componente com exemplo vivo + tabela de props + código, importando de `@studio-ux-ds/react` igual a um sistema consumidor (alias do Vite para `packages/react/index.js`; nada recriado). Cobre os ~28 exports do barrel (Button/IconButton, Badge, Avatar, Link, Tag, Banner, CommandPalette, Field, Input, PhoneInput, Select, Checkbox, Radio, Switch, SegmentedControl, NumericInput, TextArea, Combobox, FileUpload, DatePicker, Stepper, Card, StatCard, DataTable, DescriptionList, Timeline, Pagination, Accordion, EmptyState, Skeleton, Spinner, ProgressBar, Sidebar/NavItem, TopBar, Breadcrumb, Tabs, Modal, ConfirmDialog, Drawer, Sheet, Menu, Tooltip, Popover, Toast) com cobertura profunda (ex.: `DataTable` com seleção em lote, `bulkActions`, `renderRowMenu` e `toolbar`). Seletor de tema claro/escuro na toolbar (tokens `--su-*`), webfont Tabler no `preview-head.html`.
- ✅ **CI de Pages** `.github/workflows/storybook.yml`: push na branch principal → `npm install` → `build-storybook` → deploy do `storybook-static` via `actions/deploy-pages`. (Requer, uma vez: Settings → Pages → Source = "GitHub Actions".) O Windows do Robson não tem Node — o build só roda na CI.
- Sem impacto em versão/publicação: o Storybook vive fora de `packages/*` (`.storybook/`, `stories/`), não adiciona workspace nem toca em `package.json` de pacote — **lockstep intacto** e `check-packages.mjs` inalterado. Apenas o `package.json` raiz ganhou `devDependencies` (storybook/react/vite) e os scripts `storybook`/`build-storybook`.
- **Prova (QA):** build limpo; todas as stories renderizam (0 faltando); accent indigo `--su-action` correto (claro `#4F46E5`, escuro `#6365F0`) com a troca de tema; ícones Tabler renderizando; sem chrome nativo do navegador em select/tabs/segmented (checkbox/radio usam `accent-color` por design). Verificado com Chromium headless (screenshots por seção, claro + escuro).

---

## [1.1.15] — 2026-07-19 — CLI consumer-side: `lint`/`export` resolvem a fonte instalada · Consumer-side CLI

- ✅ **`lint` e `export` agora funcionam num projeto consumidor** (instalado via `node_modules`), não só no monorepo. Resolvedor `packages/cli/lib/resolve-tokens.mjs` acha o `tokens.css` por precedência: **`--tokens <caminho>` / env `STUDIO_UX_TOKENS` → pacote instalado `@studio-ux-ds/tokens` → layout do monorepo (fallback)**. Nunca em silêncio (Art. 5): se não achar, erro listando o que tentou.
- ✅ **`studio export` escreve na pasta do consumidor** (`./studio-ux-tokens` por padrão; `--out <dir>` override; `packages/tokens/exports/` no monorepo). Carimbo com a versão do pacote de tokens ao lado da fonte.
- 🔎 **Bug real encontrado ao simular a instalação:** o `studio.mjs` (e `certify.mjs`) spawnavam as ferramentas por caminho relativo ao layout do repo (`packages/cli/…`), que **quebra instalado** (o dir vira `node_modules/@studio-ux-ds/cli`). Corrigido para **caminho self-relativo** (`tool()`), e o cwd dos spawns passou a **herdar o do usuário** (para o export escrever na pasta certa). `generate` passou a declarar a versão do **próprio pacote CLI** (self-relativo, lockstep), não do `package.json` do repo.
- **Prova:** pipeline inteiro (`studio lint/export/create/generate/audit`) rodado de um **consumidor real** fora do monorepo (CLI + tokens em `node_modules`) — lint acha os tokens instalados, export gera na pasta do consumidor com a versão instalada (`v9.9.9` no teste), create/generate/audit **apto**. Monorepo intacto (exemplos 17/17, `good.html` 0, `bad.html` baseline). `docs`/`playground` avisam (não quebram) num consumidor.
- Trem de release: 1.1.14 → **1.1.15**, lockstep (7 pacotes).

---

## [1.1.14] — 2026-07-19 — `packages/cli` físico: `@studio-ux-ds/cli` (7º pacote) · Physical CLI package

- ✅ **CLI virou pacote publicável `@studio-ux-ds/cli`** (`bin: studio`), a **casa física do ferramental da plataforma**: o orquestrador `studio.mjs` + as ferramentas que ele aciona migraram de `tools/` para `packages/cli/` (`linter/`, `exporters/`, `generator/`, `certification/`, `devtools/`). `tools/` foi removido; nada duplicado (SSOT).
- **Sem regressão:** profundidade de ROOT ajustada (3 níveis para as ferramentas em subpasta), caminhos de spawn e refs corrigidos. Pipeline inteiro validado no novo local — `studio help`, `lint` (good 0 / bad baseline 11-4), `export`, `create → generate → audit` (desktop **e** mobile **apto**), exemplos **17/17** limpos.
- **Monorepo agora com 7 pacotes** publicáveis (lockstep); `check-packages`/`set-version` incluem `cli`; scripts do root apontam para `packages/cli/`; PUBLISHING/CLI docs atualizados; codemod de exemplos movido para `scripts/`.
- 🔎 **Fronteira honesta (Art. 21):** `create`/`generate`/`audit`(estrutura)/`tokens`/`theme`/`doctor`/`upgrade`/`docs`/`playground` rodam de qualquer diretório do monorepo; **`lint` (contraste) e `export`** leem a fonte de tokens pelo layout do monorepo — resolver via `@studio-ux-ds/tokens` instalado (consumidor puro) é o próximo passo declarado, não finjo que já é 100% consumer-side.
- Trem de release: 1.1.13 → **1.1.14**, lockstep (7 pacotes).

---

## [1.1.13] — 2026-07-19 — Linter mais preciso: `su-allow` auditável + `single-primary` por tela → exemplos 17/17 · Linter precision

- ✅ **`single-primary-action` agora conta por TELA, não por arquivo** (P6 é por contexto). O linter segmenta a fonte por marcadores de tela (`data-page`/`su-page`/`role="dialog"`/modal/scrim) e conta primárias por segmento — um SPA com N telas, 1 primária cada, deixa de ser falso-positivo. `clientes.html` (página + modal) passou a limpo só com isso.
- ✅ **Escape-hatch auditável `su-allow`** (nunca "desliga tudo" silencioso): `su-allow: <regras> (motivo)` (linha + seguinte), `su-allow-begin … su-allow-end` (região), `su-allow-file: <regras> (motivo)` (nível de arquivo). Exige **motivo** e **aparece contado no relatório** ("Exceções explícitas (su-allow) — auditáveis: …") — abusar do marcador é visível. Sem marcador, a regra continua reprovando (não afrouxou: `bad.html` mantém o baseline 11/4).
- ✅ **Exemplos: 17/17 limpos.** Os 6 resíduos legítimos ganharam marcador com motivo no código: swatches do seletor de acento (`configuracoes`/`index`/`mobile-configuracoes` — cores não-token por definição), cena escura do scanner (`#000`/`#0A0C10`), e `single-primary` do SPA `app.html`. Total: 25 exceções auditáveis, todas justificadas.
- 🔎 **Achado ao auditar um projeto MOBILE (que eu ainda não tinha auditado):** o shell mobile do gerador (`generate.mjs`) tinha `padding-bottom:84px` cru (folga da bottom-nav) — valor mágico pré-existente. Corrigido para `calc(var(--su-space-16) + var(--su-space-5))`; agora `studio create -p mobile` também passa o piso.
- Doc do `LINTER` atualizada (seção "Exceções explícitas e precisão de contexto").
- Trem de release: 1.1.12 → **1.1.13**, lockstep (6 pacotes).

---

## [1.1.12] — 2026-07-19 — Tokens de tamanho de fonte (`--su-fs-*`) + limpeza dos exemplos · Font-size tokens + examples cleanup

- 🔎 **Bug silencioso encontrado e corrigido na raiz:** os únicos tokens de tipografia eram pares `size/line-height` (`--su-text-h2: 20px/1.3`), feitos para o shorthand `font:`. Usá-los em `font-size:` gera **CSS inválido** (`font-size: 20px/1.3` → ignorado → texto herda o tamanho). Os exemplos **e** o fix de gerador da v1.1.11 já carregavam esse bug, e o linter o aceitava (regra fraca).
- ✅ **Correção de raiz (opção escolhida pelo Robson):** nova família de token **`--su-fs-{display,h1,h2,h3,body,body-sm,label,caption}`** (tamanho puro) na fonte de tokens, para `font-size: var(--su-fs-h2)` válido. Geradores (`generate.mjs`/`templates.mjs`) migrados de `--su-text-*` → `--su-fs-*` em `font-size`. Exports regenerados (os 10 alvos). Doc de tipografia atualizada (duas famílias de token).
- ✅ **Linter endurecido:** `typography-off-role` agora **reprova** `font-size: var(--su-text-*)` (o par inválido) e aponta o `--su-fs-*` — o furo que deixava o bug passar foi fechado; fixture `good.html` migrado.
- ✅ **Exemplos tokenizados — 11/17 totalmente limpos** (era 0/17). Codemod determinístico (`tools/examples-codemod.mjs`) trocou `font-size`/espaçamento/raio crus por tokens; correções manuais de `color:#fff → --su-text-on-action`, e **bugs reais de a11y/motion** (anel de foco `:focus-visible` em app/chat; `animation .18s → var(--su-duration-base)`).
- **Resíduo honesto (não forçado — Art. 21):** 6 arquivos mantêm hex/contagem por motivo legítimo — o **seletor de cor de acento** (swatches mostram opções que não são token: configuracoes/index/mobile-configuracoes), a **cena escura do scanner** (`#000`/`#0A0C10`), e `single-primary-action` em app/clientes (o linter conta por arquivo, mas cada primária está em tela/modal diferente — falso-positivo de SPA). Forçar seria esconder hex em JS (desonesto) ou remover feature (destrutivo).
- Trem de release: 1.1.11 → **1.1.12**, lockstep (6 pacotes).

---

## [1.1.11] — 2026-07-19 — Certification: `studio audit` (consome o Linter) + conformidade dos geradores · Certification tool

- ✅ **Ferramenta materializada:** `tools/certification/certify.mjs`, acionada por `studio audit <alvo>`. Implementa `STUDIO_UX_CERTIFICATION`. Regra de ouro (§8.4): *Linter detecta · Compliance mede · **Certification gradua***. Ela **consome** as violações do Linter e as transforma em veredito de eliminatórios — **não re-detecta** (SSOT, Art. 10). Alvo tela (`.html`) → laudo de tela; alvo projeto (`studio-ux.json`) → laudo de sistema (shell + `src/screens/*` + dependência de versão declarada).
- **Honesta por construção (§8.3, Art. 21):** gradua só o **estaticamente verificável** (eliminatórios `P1, P3, P4, P6, P7, P11, P14, P17, P18`); **não imprime nível** (Bronze→Platinum) porque isso exige evidência humana (a11y nos 2 temas, estados, DNA visual, Desktop+Mobile), e é explícita sobre os eliminatórios só-humanos (`P12, P13, P19`). "Selo que mente é o pior erro" — prefere reportar o que não pode provar a fingir um nível.
- 🔎 **Achado real na estreia — corrigido na fonte:** a certificação pegou que os geradores (`generate.mjs`/`templates.mjs`) emitiam **valores mágicos** (P1/P7/P8/P20 — `font-size`/`color`/`border-radius`/`gap`/`margin` crus) no `<style>` das telas, tornando a saída de `studio create`+`generate` **não-certificável**. Trocados por tokens (`--su-text-*`, `--su-space-*`, `--su-radius-*`, `--su-text-on-action`, `--su-icon-*`); agora **todo projeto gerado passa o piso automático** (shell + 9 moldes). Erro visível, corrigido — não suavizado.
- **CLI completa:** `studio audit` deixa de ser "não construído" e delega à ferramenta. **Os 11 comandos agora delegam de verdade** ao seu dono — `notYet` (código morto) removido. `npm run audit`.
- Docs vivas: nota de estado no `CERTIFICATION` (§9) e no `CLI`; `tools/certification/README.md`.
- Trem de release: 1.1.10 → **1.1.11**, lockstep (6 pacotes).

---

## [1.1.10] — 2026-07-19 — Templates / Component Library: moldes de tela + `studio generate` · Screen templates

- ✅ **Doc dona faltante escrita:** `docs/generation/STUDIO_UX_TEMPLATES.md` — os **moldes de tela** que o Project Generator vinha *citando* (`generation/TEMPLATES`) sem que a spec existisse. Buraco estrutural fechado: agora há dono próprio (o que é um molde §1, o catálogo §2, "compõe não redefine" §3, relação com Generator/CLI/Library §4).
- ✅ **Ferramenta materializada:** `tools/generator/templates.mjs`, acionada por `studio generate --mold <nome> --into <projeto> [--name <tela>]`. **9 moldes:** `login`, `dashboard`, `list`, `detail`, `form`, `search`, `settings`, `wizard`, `empty` — cada um **compõe só classes `.su-*` do catálogo** (verificado: todo nome emitido existe no `components.css`) com pontos de conteúdo vazios (`su-empty`, Art. 19). A tela sai **abrível no navegador** (importa tokens+peças de `node_modules`) — prova visual imediata. `list` adapta por produto (tabela Desktop / cartões Mobile).
- **CLI:** `studio generate` deixa de ser "não construído" e passa a **delegar** ao motor de moldes; `studio generate --list` mostra o catálogo. Guard honesto: recusa gerar fora de um projeto criado por `studio create`. Só resta `studio audit` (Certification) como verbo à espera do dono (Art. 21).
- **Docs vivas:** nota de fase obsoleta do `COMPONENT_LIBRARY` ("nada implementado", v0.1.0) corrigida para o estado real (materializado em `.su-*`/`.su-m-*` + adapters + ícones); notas de estado no `TEMPLATES`, `CLI` e README do gerador.
- 🔎 **Fronteira honesta:** os moldes **compõem**, nunca redefinem token nem criam peça (§3); as peças são do `COMPONENT_LIBRARY`, a regra de cada classe é dos guias de domínio.
- Trem de release: 1.1.9 → **1.1.10**, lockstep (6 pacotes).

---

## [1.1.9] — 2026-07-19 — Bloco B: pacote de ícones `@studio-ux-ds/icons` · Block B: icons package

- ✅ Sexta peça (e última estrutural) do **bloco B**: pacote **`@studio-ux-ds/icons`** — a biblioteca curada de ícones. Implementa `STUDIO_UX_ICONOGRAPHY`. Fecha o último dono estrutural do bloco B.
- **Fonte única** `packages/icons/icons.js`: nome semântico em inglês → corpo SVG + significado documentado + keywords. **Core curado de 43 glifos** (navegação, ações, objetos, dados, status, UI).
- **Estilo único (§3):** grade 24, traço 1.5, terminações redondas, **cor via `currentColor`** (herda o papel de texto do contexto). O `build-icons.mjs` (`npm run build:icons`) **valida o contrato de estilo** (kebab-case, sem cor crua, sem `px`/`style`, ponto absoluto na grade, significado obrigatório) e emite `icons/<name>.svg` + `manifest.json` — o pacote enforce a própria regra; falha (exit 1) o que quebrar o contrato.
- **Tamanho virou token (§4 — era buraco estrutural):** `--su-icon-sm/md/lg` = 16/20/24 na fonte de tokens; exports regenerados (os 10 alvos carregam os novos tokens).
- **`<Icon>` web** (`react.jsx`): tamanho por token + acessibilidade do §5 (`label` → `role=img`+`aria-label`; sem `label` → `aria-hidden`). `icons.css` dá `.su-icon`/`--sm`/`--lg`. Galeria em `examples/icons.html`.
- 🔎 **Honesto (Art. 21):** é o **core que cresce por curadoria governada** (SemVer), não a biblioteca "completa" — novo ícone entra por `icons.js` + `build:icons`, nunca por download avulso por tela (§6).
- Monorepo agora com **6 pacotes** publicáveis (lockstep); `check-packages`/`set-version` incluem `icons`; PUBLISHING atualizado; `dist-projects/` no `.gitignore` (da peça anterior).
- Trem de release: 1.1.8 → **1.1.9**, lockstep.

---

## [1.1.8] — 2026-07-19 — Bloco B: Project Generator (projeto nasce conforme) · Block B: Project Generator

- ✅ Quinta peça do **bloco B**: `tools/generator/generate.mjs` (`npm run create` / `studio create`). Implementa `STUDIO_UX_PROJECT_GENERATOR` — um projeto **nasce conforme** (§1): produto (Desktop **OU** Mobile) → arquétipo → **versão declarada** → estrutura pronta.
- **Derivado, não fork (§3):** o projeto gerado **declara** a dependência `@studio-ux-ds/*` com `~` (anda no trem — último dígito; salto de linha é edição deliberada, VERSIONING §2) e **nunca copia** o framework (Art. 1/14). O `index.html` é um **shell real** com as classes oficiais (`.su-*` desktop / `.su-m-*` mobile) consumindo o CSS de `node_modules`; os pontos de conteúdo nascem **vazios** (Art. 19).
- **Os 9 arquétipos (§2):** `base`, `portal`, `crm`, `erp`, `analytics`, `ia-studio`, `customer-portal`, `marketplace`, `backoffice` (cada um declara suas bases desktop/mobile). Valida produto (desktop XOR mobile — recusa mistura, Art. 2/P4) e a base do arquétipo.
- **CLI:** `studio create` deixa de ser "não construído" e passa a **delegar** ao gerador (real). `studio generate` (peça em projeto existente, dono Templates) e `studio audit` (Certification) seguem honestos (Art. 21).
- 🔎 **Fronteira honesta:** os moldes de tela são do `generation/TEMPLATES` (ainda não é pacote separado) — o gerador **cita** o molde de cada tela, não o duplica; o miolo nasce vazio à espera do dado e do molde.
- Materializa: `studio-ux.json` (manifesto), `package.json` (deps declaradas), `.npmrc` (GitHub Packages), `index.html` (shell), `src/screens/<rota>.md` (pontos de conteúdo), `README.md`. `dist-projects/` no `.gitignore`. `tools/generator/README.md` + nota de estado na doc.
- Trem de release: 1.1.7 → **1.1.8**, lockstep.

---

## [1.1.7] — 2026-07-19 — Bloco B: CLI `studio` (verbo que aciona os donos) · Block B: CLI

- ✅ Quarta peça do **bloco B**: `tools/cli/studio.mjs` (`npm run studio -- <cmd>`, ou `studio` via `bin`). Implementa `STUDIO_UX_CLI` — **verbo, não regra**: cada comando reúne argumentos, aciona o domínio dono e apresenta o resultado; nunca reimplementa a lógica do dono (SSOT, Art. 10).
- **Os 11 comandos:** `create`, `generate`, `doctor`, `lint`, `audit`, `upgrade`, `tokens`, `theme`, `docs`, `playground`, `export`. **Delegação real** onde o dono já existe: `lint`→Linter, `export`→Exporters, `tokens`/`theme`→leitura de `tokens.css` (+`--export`→Exporters), `doctor`/`upgrade`→versão+tags git, `docs`→lista `docs/`, `playground`→aponta Playground/DevTools.
- 🔎 **Honestidade (Art. 21):** `create`/`generate` (Project Generator) e `audit` (Certification) existem como verbo mas **avisam** que o dono ainda não foi construído e saem com código 2 — não fingem uma execução falsa. É o verbo esperando o dono nascer.
- `bin: { studio }` + script `studio` no `package.json` raiz; `tools/cli/README.md`; nota de estado na doc `STUDIO_UX_CLI`.
- Trem de release: 1.1.6 → **1.1.7**, lockstep.

---

## [1.1.6] — 2026-07-19 — Bloco B: DevTools (9 inspetores) · Block B: DevTools

- ✅ Terceira peça do **bloco B**: `tools/devtools/index.html` (abre no navegador, sem build). Implementa `STUDIO_UX_DEVTOOLS` — **lupas somente-leitura** que leem a regra do dono e mostram ao vivo; não julgam (é o Linter) nem alteram a Specification.
- **Os 9 inspetores:** Inspector, Theme Viewer, Token Viewer, Component Explorer, Layout Inspector, Spacing Inspector, Accessibility Inspector, Motion Inspector, Feedback Inspector. Carrega os pacotes reais e lê os **valores vivos** via `getComputedStyle` (76 tokens, todos verificados como existentes — sem fantasma); o toggle de tema re-lê tudo. Accessibility Inspector mostra o contraste medido × AA por tema (o veredito continua sendo do Linter).
- Doc DEVTOOLS + `tools/devtools/README.md` atualizados.
- Trem de release: 1.1.5 → **1.1.6**, lockstep.

---

## [1.1.5] — 2026-07-19 — Correção de contraste AA nos tokens (achado do linter) · AA contrast fix

- ✅ Resolvidos os 4 pares abaixo de AA que o `contrast-minimum` (v1.1.4) apontou, ajustando os tokens **na fonte** (decisão do Robson): `text-muted` claro `#9AA1AE → #8E95A1` (2.60 → 3.02), `warning-fg` claro `#B45309 → #B25209` (→ 4.53), `danger-fg` claro `#DC2626 → #D12424` (→ 4.51), `action` escuro `#6366F1 → #6365F0` (→ 4.52). Três mudanças imperceptíveis; `text-muted` levemente mais escuro mantendo o visual muted (alvo 3.0).
- **Exports regenerados** (todos os 10 alvos refletem os novos valores); o `npm run lint` agora **zera** o contraste.
- `docs/quality/CONTRASTE-ACHADOS.md` marcado como resolvido; header do `tokens.css` atualizado (deixou de ser literalmente "frozen" — valor mudou por AA).
- Trem de release: 1.1.4 → **1.1.5**, lockstep.

---

## [1.1.4] — 2026-07-19 — Bloco B: Linter (14 regras estáticas) · Block B: linter

- ✅ Segunda peça do **bloco B**: `tools/linter/lint.mjs` (`npm run lint`). Implementa `STUDIO_UX_LINTER` — detecção estática e binária; cada regra cita seu **P#/Art. dono** e a severidade herda a certificação (eliminatório→erro, pontuável→aviso). Sai com código 1 se houver erro (trava CI).
- **As 14 regras:** `no-magic-spacing`, `no-magic-value`, `color-off-token`, `unofficial-component`, `typography-off-role`, `animation-off-catalog`, `single-primary-action`, `layout-from-system`, `no-cross-product-component`, `no-surface-jargon`, `meaning-not-color-only`, `focus-visible-required`, `contrast-minimum`, `required-states`.
- **Fixtures de prova:** `bad.html` dispara as 14 categorias; `good.html` passa limpo (0 violações de arquivo).
- 🔎 **Achado real (não escondido — Art. 21):** a regra `contrast-minimum` (determinística sobre os valores de token) encontrou **4 pares abaixo de AA** na paleta v1.0.0 — `text-muted/surface-raised` (2.60), `warning-fg/warning-bg` (4.45), `danger-fg/danger-bg` (4.13), `text-on-action/action` escuro (4.47). Registrado em `docs/quality/CONTRASTE-ACHADOS.md` como **dívida visível**; NÃO foi corrigido nem o limiar afrouxado (mexer em token congelado é decisão do Robson).
- Trem de release: 1.1.3 → **1.1.4**, lockstep.

---

## [1.1.3] — 2026-07-19 — Exporters: alvos nativos (Flutter/SwiftUI/Compose) · Native exporter targets

- ✅ Os 3 alvos nativos do exporter, completando os **10 alvos** da tabela do `EXPORTERS §2`: `tokens.dart` (Flutter — `abstract class` com `Color(0xFF…)`/`double`/`int`), `Tokens.swift` (SwiftUI — `enum` + extensão `Color(su:)`/`CGFloat`), `Tokens.kt` (Compose — `object` com `Color(0xFF…)`/`.dp`/`.sp`/`FontWeight`).
- **Validação:** estrutural (152 declarações por arquivo = 76 tokens × claro+escuro; chaves balanceadas; sem `undefined`/`NaN`). Sintaxe idiomática e determinística. **NÃO compilados no ambiente do DS** (sem dart/swiftc/kotlinc) — o produto confirma compilando; honestidade explícita (Art. 21): estrutura garantida, compilação a verificar.
- Publicados no `@studio-ux-ds/tokens` (`files: exports/`). Doc EXPORTERS e `tools/exporters/README.md` atualizados.
- Trem de release: 1.1.2 → **1.1.3**, lockstep.

---

## [1.1.2] — 2026-07-19 — Bloco B: Exporters de tokens (real) · Block B: token exporters

- ✅ Primeira peça do **bloco B** (plataforma-ferramenta) construída de verdade: `tools/exporters/export-tokens.mjs` (`npm run export:tokens`). Implementa `STUDIO_UX_EXPORTERS`: **fonte única `packages/tokens/tokens.css` → transformação determinística → artefato do alvo** (o exporter só lê a fonte — Art. 5).
- **Alvos entregues e validados por máquina** (76 tokens, light+dark) em `packages/tokens/exports/`: `tokens.json` (JSON), `tokens.w3c.json` (W3C/DTCG), `tokens.figma.json` (Tokens Studio), `tailwind.preset.cjs` (preset `su-*`, cores via var CSS → theme-aware), `theme.js` (React + React Native), `tokens.css` (re-emissão). Validação: JSON.parse, `require` do Tailwind, esbuild do tema JS, cobertura (aborta se o escuro tiver token fora do claro).
- **Fidelidade (§4):** direção única, determinismo, cobertura; exports carimbam a versão da fonte e a seguem (não têm versão própria).
- Publicados no pacote `@studio-ux-ds/tokens` (`files: exports/` + subpaths). Consumo: `presets: [require("@studio-ux-ds/tokens/exports/tailwind.preset.cjs")]`, `import { light, dark } from "@studio-ux-ds/tokens/exports/theme.js"`.
- **Próximos alvos (honesto, não stub):** Flutter/SwiftUI/Compose — exigem verificação de compilação na plataforma; entram no mesmo script depois.
- Trem de release: 1.1.1 → **1.1.2**, lockstep.

---

## [1.1.1] — 2026-07-19 — Paridade do adapter React Native · React Native adapter parity

- ✅ O adapter nativo (`@studio-ux-ds/react-native`) fechou a lacuna de primitivos que um app nativo real precisa (antes era só shell mobile: topbar/bottomnav/lista/chat). Adicionados, em base nativa (View/Text/Pressable/TextInput/Modal/Switch/ActivityIndicator): `Switch`, `Checkbox` (+indeterminado), `Radio`, `Select` (folha nativa), `SegmentedControl`, `NumericInput`, `TextArea`, `Avatar`, `Tag`, `Link`, `Spinner`, `ProgressBar`, `EmptyState`, `Modal`, `ConfirmDialog`, `Menu` (action sheet), `Accordion`, `DescriptionList`, `Timeline`.
- **54 exports** no barrel RN; validado (esbuild transpila + resolução dos exports + fronteira P4 intacta).
- **Fora de escopo por design (P4):** `DataTable`/`CommandPalette`/`Tooltip` são desktop — no mobile a doc manda cards/gesto, não tabela/hover.
- Trem de release (último dígito, convenção do Robson): 1.1.0 → **1.1.1**, lockstep. Resta apenas o **bloco B** (plataforma-ferramenta) do GAP_AUDIT, que não vira stub.

---

## [1.1.0] — 2026-07-19 — Catálogo de componentes completo (bloco A do GAP_AUDIT) · Component catalog completed

- ✅ **Regra suprema (Constituição Art. 21):** melhor erro visível do que buraco oculto. Implementa-se tudo o que a doc manda de uma vez; proibido suavizar/stub; limitação real → pausa e reporta.
- ✅ **Auditoria de completude** (`docs/audits/STUDIO_UX_GAP_AUDIT.md`) — cruza doc × código; separa "buraco de porte" (bloco A) de "plataforma futura" (bloco B).
- ✅ **Bloco A fechado (CSS + adapter React):** `Avatar` (imagem/iniciais/status), `NumericInput` (com passos +/−, nunca `input[type=number]`), `TextArea`, `Link`, `Banner` desktop, `Tag` removível, `Checkbox` indeterminado; e os wrappers React que faltavam para CSS já existente: `Combobox`, `FileUpload`, `CommandPalette`, `DatePicker` (calendário funcional). Adapter React: 47 exports, todos validados (esbuild + checagem de resolução).
- ✅ **Tokens que faltavam:** grupos `opacity`, `z-index` (pilha nomeada) e `breakpoints` — aditivos, sem tocar nos valores congelados.
- **Não implementado de propósito (honestidade — Art. 21):** o **bloco B** (CLI, exporters, linter, devtools, gerador de projeto, pacotes `core`/`icons`/`testing`/`devtools`) é software executável e fica como roadmap real — NÃO virou stub. Item aberto: paridade do adapter React Native (eixo próprio).
- **MINOR** (adição retrocompatível): 1.0.x → **1.1.0**, lockstep nos 5 pacotes.

---

## [1.0.16] — 2026-07-19 — Demo do sistema + slot de marca + logins corrigidos · System demo + brand slot + login fixes

- ✅ **`examples/app.html` — demo navegável como um sistema:** login → painel, clientes → **detalhe** (abas), conversas (chat com envio de mensagem), relatórios, ajustes. Roteador em JS, toasts, modal de "novo cliente", ConfirmDialog em ação destrutiva, seletor de tema e de **cor de ação** ao vivo. **Adapta ao celular** (sidebar → barra inferior, grids empilham, chat em painel único) — degradação do desktop; num produto real seriam as telas `.su-m-*` (P4).
- ✅ **`examples/chat.html`** — Central de atendimento (lista + thread + composer), tela que faltava.
- ✅ **Logins corrigidos:** "Esqueci a senha?" virou link discreto **abaixo** do campo (não competindo com o label); painel de marca do desktop rebalanceado (headline + pitch + 3 destaques); login mobile sem o vão gigante (CTA não é mais empurrado ao fundo).
- ✅ **Slot de marca (white-label):** classe `.su-brand__logo` agora no `components.css` + doc `docs/platform/STUDIO_UX_BRANDING.md` (onde ancoram logo do sistema, favicon e ícone de app/PWA; produto injeta em runtime; cor vem do acento).
- ✅ **Exemplos navegáveis:** sidebar dos exemplos desktop leva a cada tela; "Faturas" (sem tela) virou "Conversas". Galeria `index.html` atualizada (app em destaque + chat).
- Versões em lockstep na 1.0.16 (o `components.css` ganhou `.su-brand__logo`).

---

## [1.0.15] — 2026-07-19 — Publicação no GitHub Packages (org `studio-ux-ds`) · Publish to GitHub Packages

- ✅ Registry definido: **GitHub Packages**, org **`studio-ux-ds`** (`studio-ux` e `studioux` estavam tomados). Escopo renomeado para **`@studio-ux-ds`** em todos os pacotes/docs/scripts (casa com o dono do repositório). Os 5 `package.json` ganharam `publishConfig.registry: https://npm.pkg.github.com` e `repository.url` da org `github.com/studio-ux-ds/studio-ux`.
- ✅ `.github/workflows/publish.yml` — **publica automaticamente os 5 pacotes ao empurrar uma tag `v*`**, usando o `GITHUB_TOKEN` embutido (sem token manual). Roda `check-packages.mjs` antes de publicar.
- ✅ `.npmrc.example` reescrito para o GitHub Packages (publicar = `write:packages`; consumir = `read:packages`; CI não precisa de token).
- ✅ `STUDIO_UX_PUBLISHING.md` atualizado: preparação da org/repo, publicação por tag (automática) e manual, e como os produtos consomem via `.npmrc`.
- Versões em lockstep na 1.0.15.

---

## [1.0.14] — 2026-07-19 — Empacotamento: monorepo npm workspaces publicável · Packaging: publishable npm workspaces monorepo

- ✅ `package.json` na raiz (**privado**, nunca publicado) com `workspaces` dos 5 pacotes; versionamento **em lockstep**.
- ✅ `packages/mobile/package.json` criado (faltava) — `@studio-ux/mobile` (classes `.su-m-*`).
- ✅ Todos os `package.json` normalizados: `files`, `license` (UNLICENSED), `repository`, `author`, `publishConfig` (`access: restricted`), `keywords`. Confirmado via `npm pack --dry-run` que cada tarball leva só o necessário (a subpasta `react/mobile/` inclusa).
- ✅ `scripts/set-version.mjs` (bump em lockstep raiz+pacotes) e `scripts/check-packages.mjs` (smoke test: campos, `files` existentes, lockstep e **fronteira P4** — web ⊥ nativo).
- ✅ `docs/platform/STUDIO_UX_PUBLISHING.md` — como empacotar, versionar, publicar (npm/GitHub Packages/interno) e **consumir** nos produtos. `.npmrc.example` + `.gitignore` (ignora `node_modules`, `dist-packs`, `.npmrc`, `*.tgz`, lockfile).
- **Sem build:** CSS é fonte executável e os adapters JSX são runtime descartável que o consumidor transpila — pacotes agnósticos de bundler.
- Versões em lockstep na 1.0.14 (raiz + 5 pacotes).

---

## [1.0.13] — 2026-07-19 — Galeria de exemplos (`examples/index.html`) · Examples gallery

- ✅ `examples/index.html` — vitrine única que lista os 13 exemplos em cards, agrupados por **Desktop** (5) e **Mobile** (8), cada card com ícone, descrição e link. Toggle de tema, seletor de cor de ação ao vivo e atalho para o Playground de componentes.
- Verificado: todos os 13 links resolvem; nenhuma classe fantasma.

---

## [1.0.12] — 2026-07-19 — Mais exemplos Mobile: Entrar, Início, Configurações · More Mobile examples

- ✅ `examples/mobile-login.html` — **Entrar** (tela própria mobile, P4): marca no topo, campos com ícone, CTA único de destaque, SSO empilhado, link de recuperação.
- ✅ `examples/mobile-inicio.html` — **Início**: saudação, 4 KPIs (`.su-m-stat`), ações rápidas (`.su-m-actions`), atividade recente (itens com valor + status à direita) e bottom nav com FAB central.
- ✅ `examples/mobile-configuracoes.html` — **Configurações**: seções agrupadas (conta, aparência, notificações, sobre), tema escuro + **seletor de cor de ação** (recolore ao vivo) e switches (`.su-switch` de components.css — importado junto por ser componente universal). Sair em destaque de perigo.
- Verificado: nenhuma classe fantasma. Paridade com os exemplos Desktop da v1.0.11.

---

## [1.0.11] — 2026-07-19 — Mais exemplos Desktop: Entrar, Relatórios, Configurações · More Desktop examples

- ✅ `examples/login.html` — tela de **Entrar**: painel de marca + formulário (e-mail/senha com ícone, "manter conectado", SSO Google/Microsoft), sóbrio, um acento só (P8), toggle de tema.
- ✅ `examples/analytics.html` — **Relatórios**: filtros (segmented de período + canal), 4 KPIs, gráfico de barras (composição pura, cor de token), breakdown por canal e tabela "produtos mais vendidos". Barras montadas por JS — só a altura é dado; a cor vem de `--su-action`.
- ✅ `examples/configuracoes.html` — **Configurações**: abas de pasta (Geral/Aparência/Notificações/Segurança), perfil da empresa (form grid), **seletor de cor de ação** (7 acentos, recolore ao vivo), notificações (switches, "todo automatismo nasce desligado") e zona de perigo (ação destrutiva com aviso — P13).
- Todos reusam o shell/sidebar dos exemplos existentes; verificado: nenhuma classe fantasma.

---

## [1.0.10] — 2026-07-19 — Adapter React para mobile-web (`@studio-ux/react/mobile`) · React adapter for mobile-web

- ✅ Novo subpath **`@studio-ux/react/mobile`** (`packages/react/mobile/`): wrappers React sobre as classes `.su-m-*` do `mobile.css`, para PWA/mobile-web em React. Irmão do adapter Desktop (P4) — não é o desktop "responsivo".
- **Componentes (~25):** `TopBar`, `Greeting`, `SearchBar`, `BottomNav` (+FAB), `Footer`, `Cta`; `Card`, `List`, `ListItem`, `Stat`, `Chips`/`Chip`; `DetailHeader`, `MobileTabs`, `QuickActions`/`QuickAction`; `OfflineBanner`, `SyncBanner`, `Banner`, `Notification`, `StepBar`; `Field`, `Input`, `PhoneInput`, `Sheet`; `SwipeableRow` (touch, com alternativa — P19), `ScannerFrame` (câmera é do produto).
- `mobile.css`: adicionadas classes token-based que os mockups faziam via inline — `.su-m-sheet-backdrop`, `.su-m-detail-head__body`/`__meta`, `.su-m-notif__body` e variantes de tom `.su-m-notif__icon--{success,warning,danger,info}` (paridade com o adapter RN; aditivo, não-quebra).
- `packages/react/package.json`: `exports` com subpath `./mobile`.

---

## [1.0.9] — 2026-07-15 — Adapter React Native — paridade com o mobile · RN adapter — mobile parity

- ✅ `packages/react-native/` completado até a paridade com `mobile.css`: `Greeting`, `SearchBar`, `PhoneInput` (E.164), `MobileTabs`, `QuickActions`/`QuickAction`, `DetailHeader`, `OfflineBanner`/`SyncBanner`/`Banner`, `Notification`, `SwipeableRow` (gesto via PanResponder, com alternativa — P19), `ScannerFrame` (câmera é do produto), `Footer`. Barrel `index.js` atualizado (~29 componentes).
- **Regra mantida:** primitivas nativas, mesmos valores de token; ícones e câmera vêm do produto (`renderIcon`/`camera`); gesto sempre com alternativa.

---

## [1.0.8] — 2026-07-15 — Adapter Mobile nativo (React Native) · Native Mobile adapter (React Native)

- ✅ `packages/react-native/` — adapter Mobile **irmão** do web (P4): `theme.jsx` (tokens `v1.0.0` em JS, claro/escuro via `useColorScheme`, accent por tenant), `Button`/`Cta`, `Badge`/`Card`/`Stat`/`Chip`/`Divider`, `Field`/`Input`, `TopBar`/`ListItem`/`BottomNav`, `Sheet`/`StepBar` + `index.js` + `README` + `package.json` (`@studio-ux/react-native`).
- **Regra:** mesmos VALORES de token, primitivas nativas próprias (`View`/`Text`/`Pressable`) — não reutiliza classes `.su-*` nem o layout web. Ícones via `renderIcon` (produto). Runtime descartável (`RUNTIME`).

---

## [1.0.7] — 2026-07-15 — Playground (catálogo vivo) · Playground (live catalog)

- ✅ `playground/index.html` — catálogo vivo navegável: todos os componentes por categoria (Fundamentais, Formulário, Dados, Navegação, Overlays, Feedback), em seus estados, com **troca de tema (claro/escuro)** e **seletor de cor de ação ao vivo** (7 acentos) — prova o eixo de marca do `THEMES` reapontando `--su-action` e a interface inteira acompanhando.

---

## [1.0.6] — 2026-07-15 — Camada React completa · React layer complete

- ✅ `packages/react/` ampliado até a paridade com o catálogo Desktop (~35 componentes): `Select`, `Checkbox`, `Radio`, `Switch`, `SegmentedControl`, `Stepper`, `Sidebar`/`NavItem`/`TopBar`/`Breadcrumb`, `Drawer`/`Sheet`/`Menu`/`Tooltip`/`Popover`, `DescriptionList`/`Timeline`/`Pagination`/`Accordion`, `EmptyState`/`Skeleton`/`Spinner`/`ProgressBar`. Barrel `index.js` atualizado.
- Cada componente aponta para uma classe `.su-*` existente; props → estados, nunca valores (P1); acessibilidade reforçada (aria, foco, Esc).

---

## [1.0.5] — 2026-07-15 — Camada React (núcleo) · React layer (core)

- ✅ `packages/react/` — adapter React: `Button`/`IconButton`, `Badge`, `Field`/`Input`/`PhoneInput`, `Card`/`StatCard`, `Tabs`, `Modal`/`ConfirmDialog`, `ToastProvider`/`useToast`, `DataTable` (seleção em lote) + `index.js` (barrel) + `README`.
- ✅ `package.json` para `@studio-ux/tokens`, `@studio-ux/components`, `@studio-ux/react` (imports reais/instaláveis).
- **Regra:** o adapter só embrulha classes `.su-*` (zero estilo novo); props traduzem para estados, nunca valores (P1). É runtime descartável (`RUNTIME`), não Specification.

---

## [1.0.4] — 2026-07-15 — Fase 4 (Mobile) completa · Phase 4 (Mobile) complete

- ✅ `packages/mobile/mobile.css` ampliado: cabeçalho de detalhe, sub-abas por toque, KPI compacto, ações rápidas (círculos), CTA + rodapé fixo, campo grande de toque, barra de progresso de etapa, sync/offline.
- ✅ `examples/mobile-detalhe.html` — detalhe do cliente (KPIs, ações rápidas, dados, CTA).
- ✅ `examples/mobile-cadastro.html` — cadastro em **etapas** (mobile), contraparte do Wizard Desktop (P4). Rodapé com **um CTA proeminente**; voltar na seta do topo (alinhado à referência).
- ✅ `mobile.css`: **swipe** em item de lista (com alternativa no "…"), **Scanner** (moldura + alternativa manual, P19), **notificações** (item + banner), **offline/sync** de primeira classe. `.su-m-cta` com `appearance:none` (renderiza cheio).
- ✅ `examples/mobile-scanner.html` e `examples/mobile-notificacoes.html`.
- **Fase 4 (Mobile) essencialmente completa.** Próximo: camada React (opcional) e/ou playground/mais exemplos.

---

## [1.0.3] — 2026-07-15 — Mobile + PhoneInput + Wizard de cadastro + correções · Mobile + PhoneInput + registration Wizard + fixes

### Adicionado · Added
- **Fase 4 (Mobile) iniciada:** `packages/mobile/mobile.css` — produto irmão (P4): Top Bar, Bottom Navigation (ação central), Cards, list items tocáveis ≥44px, chips, bottom sheet, indicador offline. `examples/mobile-clientes.html` — Clientes em versão mobile (lista + bottom nav + filtro em sheet).
- **`PhoneInput`** implementado em `components.css` (E.164, seletor de país) — antes só especificado no catálogo.
- **`FormSection` / `su-form-grid` / `su-form-actions`** para formulários longos multi-coluna.
- **`examples/clientes.html`** — CRUD completo: DataTable interativa (seleção em lote + menu de linha) + **cadastro em etapas (Wizard/Stepper)** como tela dedicada, com PhoneInput.

### Corrigido · Fixed
- **`.su-tab` (Tabs) e `.su-segment` (SegmentedControl):** `appearance:none` — não renderizam mais como "botão nativo" do SO (casca de borda). Correção na raiz, vale para todo consumidor.
- **`.su-m-navitem` (Bottom Navigation):** reset de botão blindado (sem caixa nativa).
- **List item mobile:** nome trunca com reticências; valor + status empilhados à direita (evita quebra em telas estreitas).
- **Padrão de cadastro Desktop:** trocado o Drawer estreito (padrão curto/mobile) por **tela dedicada** — como manda o CRUD Desktop para entidade com muitos campos.

### Nota · Note
- **CPF/CEP são localização BR** (responsabilidade do produto consumidor, não do DS); no exemplo usam `TextInput` comum. O **telefone** usa o componente oficial `PhoneInput`.

---

## [1.0.2] — 2026-07-15 — Componentes especializados + exemplo · Specialized components + example

- ✅ `packages/components/components.css` — **grupo 3 (especializados):** Combobox, DatePicker/Calendar, FileUpload, Drawer/Sheet, Accordion, Stepper/Wizard, DescriptionList, ProgressBar, Timeline, CommandPalette, SegmentedControl, Divider.
- ✅ `examples/dashboard.html` — Painel completo composto só com o kit (prova de composição; alterna tema).
- **Catálogo Desktop essencialmente completo** — todos os componentes do catálogo agora em CSS sobre os tokens.
- Correções: convenção de versão ajustada para a faixa `v1.0.x` (`HANDOFF`, `VERSIONING`); ícones da sidebar no preview trocados pelos oficiais.

---

## [1.0.1] — 2026-07-15 — Componentes Desktop (fundamentais + estrutura) · Desktop components

**Fase 3 — Biblioteca de Componentes.** Implementação de referência **tech-agnóstica** (CSS + tokens). / Phase 3 — Component Library. Tech-agnostic reference implementation.

- ✅ `packages/tokens/tokens.css` — todos os tokens congelados como CSS custom properties (claro/escuro/reduzir-movimento).
- ✅ `packages/components/components.css` — **grupo 1 (fundamentais):** Button (primary/secondary/ghost/danger + tamanhos + estados + foco), IconButton, Badge/Status, FormField/Input (+ erro), Table, Modal/ConfirmDialog, Toast, Spinner.
- ✅ **grupo 2:** Sidebar, TopBar, Tabs (folder+pills), Breadcrumb, Select, Checkbox, Radio, Switch, Menu/Dropdown, Tooltip, Popover, Card, StatCard, EmptyState, Skeleton, Pagination.
- ✅ `packages/components/demo.html` — demonstração com alternância de tema.

---

## [1.0.0] — 2026-07-15 — 🎯 Tokens Frozen · Design Tokens Congelados

**PT** — **Marco `v1.0.0`.** A Fase 2 (materialização dos Design Tokens) foi concluída: as seis camadas foram escolhidas, aprovadas pelo Robson e **congeladas** como o primeiro **contrato estável** que um sistema consumidor pode declarar. A estética deixou de ser provisória. A partir daqui, mudança de valor de token segue SemVer (`governance/STUDIO_UX_VERSIONING.md`).

**EN** — **`v1.0.0` milestone.** Phase 2 (Design Token materialization) is complete: the six layers were chosen, approved by Robson and **frozen** as the first **stable contract** a consumer system can declare. Aesthetics are no longer provisional. From here, token value changes follow SemVer.

- ✅ **Cor · Color** (`tokens/STUDIO_UX_COLOR_SYSTEM.md` §9) — escala neutra 0–900, papéis semânticos claro/escuro, 7 acentos (Índigo padrão), status; contraste WCAG AA conferido.
- ✅ **Tipografia · Typography** (`tokens/STUDIO_UX_TYPOGRAPHY.md` §9) — Inter (UI) + JetBrains Mono; escala de 9 papéis; pesos 400/500/600; base 15px.
- ✅ **Espaço · Spacing** (`tokens/STUDIO_UX_SPACING.md`) — grade 4px, `space-0…24`, papéis inset/stack/inline.
- ✅ **Raio · Radius** (`tokens/STUDIO_UX_DESIGN_TOKENS.md`) — sm 6 / md 8 / lg 12 / xl 16 / full.
- ✅ **Elevação · Elevation** — raised / overlay / modal (poucos níveis; escuro clareia a superfície).
- ✅ **Motion** — durações 120/200/320ms; curvas standard/entrance/exit; respeita `prefers-reduced-motion`.

**Próxima fase / Next phase:** **Fase 3 — Biblioteca de Componentes** (implementação, Desktop primeiro), sobre estes tokens congelados.

---

## [0.3.1] — 2026-07-15 — Fase 1.6 validada · Phase 1.6 validated

**PT** — A **Fase 1.6 (UI Exploration)** foi concluída e a linguagem visual **aprovada** por decisão humana, validada em ~14 cenários (dashboard, analytics, DataTable, formulário, wizard, detalhe+timeline, login, mobile, estados, confirm+toast, configurações, command palette, filtro mobile, menu de linha). Decisões travadas: **(1)** direção **sóbria** (sem gradientes — o DNA congelado se mantém; a variação expressiva foi vista e recusada); **(2)** **cor de ação configurável** — paleta de 7 acentos sóbrios (Índigo padrão, Azul, Teal, Verde, Violeta, Cobre, Grafite), um por tema, pelo eixo de marca do `THEMES`. Sem mudança estrutural. Abre a **Fase 2 — Materialização dos Tokens**.

**EN** — **Phase 1.6 (UI Exploration)** is complete and the visual language **approved** by human decision, validated across ~14 scenarios. Locked decisions: **(1)** the **sober** direction (no gradients — the frozen DNA holds; the expressive variant was reviewed and declined); **(2)** a **configurable action color** — a palette of 7 sober accents, one per theme, via the `THEMES` brand axis. No structural change. Opens **Phase 2 — Token Materialization**.

---

## [0.3.0] — 2026-07-15 — 🧊 Foundation Frozen · Fundação Congelada

**PT** — A Fundação do Studio UX foi **oficialmente congelada**. A partir desta versão, toda evolução ocorre **exclusivamente através da implementação** (Fase 2 — tokens em diante). Mudanças estruturais passam a exigir **RFC + ADR** (`governance/STUDIO_UX_RFC_GUIDE.md`, `governance/STUDIO_UX_ADR_GUIDE.md`). Componentes novos, **somente mediante necessidade comprovada por produtos consumidores** (auditoria em `docs/audits/`).

**EN** — The Studio UX Foundation is **officially frozen**. From this version on, evolution happens **exclusively through implementation** (Phase 2 — tokens onward). Structural changes now require **RFC + ADR**. New components only upon **need proven by consuming products**.

- Base da decisão / Decision basis: `docs/audits/STUDIO_UX_PRODUCT_AUDIT.md` (~93% de cobertura genérica, 0 gaps críticos), `docs/audits/FINAL_ARCHITECTURE_REVIEW.md`, `docs/audits/FOUNDATION_FREEZE_DECISION.md` (✅ SIM), `docs/audits/IMPLEMENTATION_PLAN_REVIEW.md`.
- Próxima fase / Next phase: **Implementação (Fase 2 — materialização dos tokens).**

---

## [0.2.3] — 2026-07-15 — Épicos 2–5: Ferramentas, Qualidade, Geração, IA · Epics 2–5: Tools, Quality, Generation, AI

### Adicionado · Added

**PT — A plataforma completa em documentação.** Os quatro épicos restantes da camada de plataforma, entregues numa leva (sem código para deploy, o portão por épico perde a razão). Nada contradiz a fundação; **nenhum código, nenhum valor estético**.

**EN — The full platform in documentation.** The four remaining platform-layer epics, delivered in one batch. Nothing contradicts the foundation; **no code, no aesthetic values**.

- **Épico 2 — Ferramentas / Tools:** `docs/tools/STUDIO_UX_CLI.md` (CLI `studio` — 11 comandos), `docs/tools/STUDIO_UX_DEVTOOLS.md` (9 inspetores), `docs/tools/STUDIO_UX_PLAYGROUND.md`.
- **Épico 3 — Qualidade / Quality:** `docs/quality/STUDIO_UX_LINTER.md` (catálogo de regras — detecta), `docs/quality/STUDIO_UX_COMPLIANCE.md` (mede continuamente). Fronteira canônica: *Linter detecta · Compliance mede · Certification gradua.*
- **Épico 4 — Geração / Generation:** `docs/generation/STUDIO_UX_PROJECT_GENERATOR.md` (10 arquétipos), `docs/generation/STUDIO_UX_EXPORTERS.md` (10 alvos plugáveis).
- **Épico 5 — Ecossistema de IA / AI Ecosystem:** `docs/context/STUDIO_UX_AI_ECOSYSTEM.md` (context loading, self-audit, protocolo anti-invenção).

### Alterado · Changed

- **`docs/STUDIO_UX_CERTIFICATION.md` expandido** para dois escopos com dono único: **tela** (Bronze→Platinum) e **sistema** (Bronze→**Enterprise**, §8). Sem `CERTIFICATION_SYSTEM.md` separado (SSOT).
- **`STUDIO_UX.md`:** mapa SSOT (§11) ampliado com os 8 domínios novos; rótulo de certificação atualizado para tela+sistema.
- **Docs-índice vivos:** `README`, `ROADMAP` (épicos 2–5 concluídos), `context/STUDIO_UX_HANDOFF.md`.

### Notas · Notes

- **PT** — Camada de plataforma documental **completa** (Épicos 1–5). Pendentes do design system: Fase 1.6 (UI Exploration) e Fase 2 (tokens). Implementação (código) começa na Fase 2.
- **EN** — Platform documentation layer **complete** (Epics 1–5). Design-system pending: Phase 1.6 (UI Exploration) and Phase 2 (tokens). Implementation (code) starts at Phase 2.

---

## [0.2.2] — 2026-07-15 — Épico 1: Plataforma & Governança · Epic 1: Platform & Governance

### Adicionado · Added

**PT — O Studio UX passa de design system a plataforma.** Primeiro épico da camada de plataforma: governança elevada e arquitetura de longo prazo. Nada contradiz a Fase 1; **nenhum código, nenhum valor estético**.

**EN — Studio UX moves from design system to platform.** First epic of the platform layer: elevated governance and long-term architecture. Nothing contradicts Phase 1; **no code, no aesthetic values**.

- **Governança / Governance:** `docs/governance/STUDIO_UX_CONSTITUTION.md` (20 artigos imutáveis), `docs/governance/STUDIO_UX_VERSIONING.md` (dono da estratégia de versão), `docs/governance/STUDIO_UX_ADR_GUIDE.md`, `docs/governance/STUDIO_UX_RFC_GUIDE.md`.
- **Plataforma / Platform:** `docs/platform/STUDIO_UX_PLATFORM.md` (estratégia), `docs/platform/STUDIO_UX_ARCHITECTURE.md` (mapa lógico de domínios), `docs/platform/STUDIO_UX_RUNTIME.md` (Specification × Runtime × Playground × Templates × Applications), `docs/platform/STUDIO_UX_PACKAGES.md` (monorepo), `docs/platform/STUDIO_UX_ROADMAP_2035.md` (visão de década).

### Alterado · Changed

- **`STUDIO_UX.md`:** mapa SSOT (§11) ampliado com os 10 domínios novos; §7 passa a referenciar `VERSIONING` como dono do detalhe e a `CONSTITUTION` como camada suprema.
- **Docs-índice vivos:** `README`, `ROADMAP`, `context/STUDIO_UX_HANDOFF.md` atualizados.

### Notas · Notes

- **PT** — Execução por épicos com validação humana entre eles (decisão do Robson). Épico 1 de 5. Próximos: Ferramentas, Qualidade, Geração, Ecossistema de IA. Conflito de certificação resolvido: dono único (`CERTIFICATION` será expandido para tela+sistema no Épico 3), sem `CERTIFICATION_SYSTEM.md` separado.
- **EN** — Epic-by-epic execution with human validation between them (Robson's decision). Epic 1 of 5. Certification conflict resolved: single owner (`CERTIFICATION` to be expanded to screen+system in Epic 3), no separate `CERTIFICATION_SYSTEM.md`.

---

## [0.2.0] — 2026-07-15

### Adicionado · Added

**PT — Fase 1.5: Linguagem Visual.** O produto ganha sua identidade e linguagem visual, permanecendo do lado da arquitetura da linha (caráter e regras; **nenhum valor estético final** — esses seguem na Fase 2). Nada contradiz a Fase 1 congelada.

**EN — Phase 1.5: Visual Language.** The product gains its identity and visual language, staying on the architecture side of the line (character and rules; **no final aesthetic values** — those come in Phase 2). Nothing contradicts the frozen Phase 1.

- **DNA e composição / DNA & composition:** `docs/STUDIO_UX_VISUAL_DNA.md`, `docs/STUDIO_UX_GRAMMAR.md` (com ADR-001 da fronteira Grammar × Layout System), `docs/STUDIO_UX_SURFACES.md`, `docs/STUDIO_UX_VISUAL_RHYTHM.md`.
- **Guias de domínio / Domain guides:** `docs/STUDIO_UX_DASHBOARD.md`, `docs/STUDIO_UX_FORMS.md`, `docs/STUDIO_UX_TABLES.md`, `docs/STUDIO_UX_NAVIGATION.md`.
- **Governança da qualidade / Quality governance:** `docs/STUDIO_UX_CERTIFICATION.md` (auditoria de tela, níveis Bronze/Silver/Gold/Platinum), `docs/context/AI_RULES.md` (regras imperativas para IA).
- **Engenharia reversa / Reverse-engineering:** `docs/research/REFERENCE_DNA.md` (13 referências, "princípios, nunca cópia").

### Alterado · Changed

- **PT — Governança reforçada** em `STUDIO_UX.md` (adições, sem reabrir Fase 1): §11 **Single Source of Truth por domínio** (+ mapa de donos), §12 **Architecture Boundary Check** obrigatório, §13 **horizonte de 10 anos / tech-agnóstico**, e a 8ª regra de ouro ("assunto novo ou já tem dono?"). Doc de governança → v1.1.0.
- **EN — Reinforced governance** in `STUDIO_UX.md` (additions, without reopening Phase 1): §11 SSOT per domain (+ ownership map), §12 mandatory Architecture Boundary Check, §13 10-year/tech-agnostic horizon, and the 8th golden rule.
- **Docs-índice vivos atualizados / Living index docs updated:** `ROADMAP` (fases 1.5 e 1.6 inseridas), `README` (mapa), `context/STUDIO_UX_HANDOFF.md` (estado), `context/STUDIO_UX_AI_CONTEXT.md` (ordem de leitura).
- **PT — Fase 1.6 (UI Exploration) registrada no roadmap** e pasta `research/ui-exploration/` criada com guia (estudos visuais viriam após validação humana). / **EN — Phase 1.6 (UI Exploration) recorded in the roadmap** and `research/ui-exploration/` scaffolded with a guide.

---

## [0.1.0] — 2026-07-15

### Adicionado · Added

**PT — Fundação documental completa (Fase 1).** Nasce o produto Studio UX como framework independente, versionado e governado. Somente documentação; nenhum componente, token final ou tela implementados.

**EN — Complete documentation foundation (Phase 1).** The Studio UX product is born as an independent, versioned, governed framework. Documentation only; no components, final tokens or screens implemented.

- **Governança / Governance:** `STUDIO_UX.md` (regra máxima), `README.md`, este `CHANGELOG.md`. Política bilíngue oficial (PT-BR + EN lado a lado por seção). SemVer + tags imutáveis + ADRs. Estrutura de pastas do produto criada.
- **Núcleo conceitual / Conceptual core:** `STUDIO_UX_VISION.md`, `STUDIO_UX_PHILOSOPHY.md`, `STUDIO_UX_PRINCIPLES.md` (princípios numerados P1…Pn), `context/STUDIO_UX_AI_CONTEXT.md`, `context/STUDIO_UX_HANDOFF.md`.
- **Fundação de design / Design foundation:** `tokens/STUDIO_UX_DESIGN_TOKENS.md` (arquitetura de tokens em 3 camadas), `tokens/STUDIO_UX_COLOR_SYSTEM.md`, `tokens/STUDIO_UX_TYPOGRAPHY.md`, `tokens/STUDIO_UX_SPACING.md`, `STUDIO_UX_THEMES.md`, `STUDIO_UX_ICONOGRAPHY.md`, `STUDIO_UX_ANIMATIONS.md`. Arquitetura definida; valores/estéticas finais deliberadamente adiados.
- **Sistema estrutural / Structural system:** `layouts/STUDIO_UX_LAYOUT_SYSTEM.md`, `components/STUDIO_UX_COMPONENT_LIBRARY.md` (catálogo oficial, sem código), `patterns/STUDIO_UX_PATTERNS.md`, `STUDIO_UX_ACCESSIBILITY.md`.
- **Produtos / Products:** `desktop/STUDIO_UX_DESKTOP.md` e `mobile/STUDIO_UX_MOBILE.md` — projetados como produtos independentes (não responsivo de um só).
- **Evolução / Evolution:** `STUDIO_UX_ROADMAP.md`, `research/REFERENCES.md`.

### Notas · Notes

- **PT** — Nesta fase o papel é de **arquiteto de produto**: nada de código, componentes ou telas. A implementação começa na Fase 2 (ver ROADMAP).
- **EN** — In this phase the role is **product architect**: no code, components or screens. Implementation starts in Phase 2 (see ROADMAP).

---

<!--
Modelo de entrada / Entry template:

## [X.Y.Z] — AAAA-MM-DD
### Adicionado · Added
### Alterado · Changed
### Descontinuado · Deprecated
### Removido · Removed
### Corrigido · Fixed
### Migração · Migration (obrigatório em MAJOR / required on MAJOR)
-->
