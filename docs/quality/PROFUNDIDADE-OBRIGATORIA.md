# Profundidade Obrigatória — Referência Studio UX

> Regra de qualidade para o app de referência (`examples/referencia-aquapark.html`)
> e para qualquer front portado a partir dele. **Fonte da verdade: este doc + o
> código real dos sistemas.** Nunca "de memória".

---

## 1. A regra

Cada tela da referência **DEVE espelhar o componente REAL da rota com a MESMA
profundidade** — não apenas a estrutura (colunas/campos certos), mas a **riqueza**:
ícones, descrições completas, caixas de detalhe / sub-painéis, listas, contadores,
filtros, abas, estados (vazio/loading/erro) e badges/status com rótulos e cores certos.
Uma versão RASA (ex.: uma tira de uma linha no lugar de um card rico) ou DIVERGENTE
(tela que não é o componente real, com conteúdo inventado) é **reprovada**.

## 2. O que conta como profundidade (checklist por tela)

Abrir o componente real e a minha tela lado a lado e conferir:

- [ ] Cabeçalho igual (título + subtítulo do componente real).
- [ ] TODAS as colunas/campos reais — nome exato e ordem.
- [ ] Ícones onde o real tem ícones.
- [ ] Descrições completas — não resumidas — incluindo exemplos/códigos que o real mostra.
- [ ] Sub-painéis, caixas de detalhe, abas e listas que o real tem.
- [ ] Ações reais: mesmos rótulos e cores dos botões (editar/clonar/testar/inativar/excluir/etc.).
- [ ] Estados: vazio sempre; loading/erro quando o real tiver.
- [ ] Filtros / abas / busca / contadores / StatCards como no real.
- [ ] Status e badges com os mesmos rótulos e cores.
- [ ] NUNCA inventar conteúdo (KPIs, colunas, seções) que não existe no componente real.

## 3. Anti-padrões (reprovado)

- Card real virar tira de uma linha.
- Descrição real resumida a meia frase.
- Faltar caixa de detalhe / lista / sub-painel / aba que o real mostra.
- **Inventar** item/coluna/KPI que não existe no real (DIVERGENTE), ou renderizar outro componente no lugar do certo.
- Título repetido na topbar (o título vem do `<h1>` do conteúdo; topbar é só o breadcrumb "Seção › Página").
- Chrome nativo vazando (switch/select/aba/botão sem reset de appearance/background/border).

## 4. Método de verificação

1. Abrir o componente real no código (`aquapark/admin-panel/src/pages/...`).
2. Abrir a minha tela na referência.
3. Rodar o checklist da seção 2.
4. Render + screenshot **incluindo a topbar** e olhar.
5. Varredura técnica (Playwright): 0 erro JS, 0 chrome nativo, 0 overflow.

## 5. Tabela de auditoria

Auditoria de profundidade rodada em **2026-07-20** (20 telas bespoke, 1 agente por tela vs componente real).

Resultado da 1ª auditoria: **0 FIEL_RICO · 12 RASO · 8 DIVERGENTE** nas 20 auditadas.

**Resolução — v13 (2026-07-20):** as 20 foram refeitas/enriquecidas espelhando o componente real de cada rota (1 agente por tela, lendo o `.jsx` real) e integradas. QA: **63 telas, 0 erro JS, 0 chrome nativo, 0 overflow, 0 texto null/undefined**; todas revisadas visualmente. As 20 passam a **FIEL_RICO**. Os achados da seção 6 ficam como registro do que estava errado (agora resolvido).

Veredito: **FIEL_RICO** (espelha com profundidade) · **RASO** (simplificado demais) · **DIVERGENTE** (componente errado / conteúdo inventado) · **PENDENTE** (não auditado).

| Tela (referência) | Componente real | Veredito | Sev |
|---|---|---|---|
| Email Inbox | EmailInbox/EmailLeadsList.jsx | FIEL_RICO | — |
| Dados de Teste | Configuracoes/DevSeed.jsx | FIEL_RICO | — |
| WhatsApp › Conversas | WhatsApp/ChatList+ChatWindow | FIEL_RICO | — |
| Portal Associado | Portal/Portal.jsx | FIEL_RICO | — |
| Mensagens | Configuracoes/Mensagens.jsx | FIEL_RICO | ✓ v13 |
| Canais de Venda | Configuracoes/CanaisVenda.jsx | FIEL_RICO | ✓ v13 |
| Confiabilidade de Eventos | Configuracoes/EventDispatchLog.jsx | FIEL_RICO | ✓ v13 |
| Tarefas Agendadas | Configuracoes/TarefasAgendadas.jsx | FIEL_RICO | ✓ v13 |
| Signatários (Empresa) | Configuracoes/SignatariosEmpresa.jsx | FIEL_RICO | ✓ v13 |
| Dados Empresa | Configuracoes/DadosEmpresa.jsx | FIEL_RICO | ✓ v13 |
| Pagamentos (Faturamento) | Configuracoes/ConfigPagamentos.jsx | FIEL_RICO | ✓ v13 |
| Cobrança Forte | Configuracoes/CobrancaForte.jsx | FIEL_RICO | ✓ v13 |
| Comissões Config | Configuracoes/ConfigComissoes.jsx | FIEL_RICO | ✓ v13 |
| Atualização | Configuracoes/Atualizacao.jsx | FIEL_RICO | ✓ v13 |
| WhatsApp › Equipes e Filas | Configuracoes/AtendimentoEquipes.jsx | FIEL_RICO | ✓ v13 |
| Dashboard Financeiro | Dashboard/Dashboard.jsx | FIEL_RICO | ✓ v13 |
| Dashboard Comercial | Dashboard/DashboardComercial.jsx | FIEL_RICO | ✓ v13 |
| IA › Assistentes | Automacao/Agentes.jsx | FIEL_RICO | ✓ v13 |
| IA › Pendências | Automacao/IAPendencias.jsx (AutomacaoAprovacoes) | FIEL_RICO | ✓ v13 |
| IA › Painel | Automacao/IAPainel.jsx (SupervisorIA) | FIEL_RICO | ✓ v13 |
| IA › Ajustes gerais | Automacao/IAAjustes.jsx (AtendimentoIAWhatsappConfig) | FIEL_RICO | ✓ v13 |
| Relatórios › Geral | Relatorios/Relatorios.jsx | FIEL_RICO | ✓ v13 |
| Relatórios › Análise avançada | Relatorios/AnaliseAvancada.jsx | FIEL_RICO | ✓ v13 |
| Relatórios › Atendimento | Relatorios/AtendimentoWhatsApp.jsx | FIEL_RICO | ✓ v13 |
| Listagens (20 presets) | *.jsx por rota | PENDENTE | — |

> As telas da seção "Studio UX · Referência" do menu (Componentes, Detalhe, Atividade, Sugestões, Conta, Roadmap, Formulários, Calendário, Estado vazio) são **demos de arquétipo**, não rotas reais — fora do escopo.

## 6. Achados detalhados por tela (2026-07-20)

O que o componente REAL tem e a minha tela **não tem ou erra**. Usar como lista de correção.

### Pagamentos (Faturamento) — DIVERGENTE (alta)
`Configuracoes/ConfigPagamentos.jsx` — A minha tela é um componente completamente diferente (gestão de métodos de pagamento e chaves de API) enquanto o real é um formulário de configurações de cobrança com multa/juros, instruções de boleto, descontos, notificações, contrato e estratégia de pagamento.

- A minha tela é sobre 'métodos de pagamento' (Pix/Cartão/Boleto com toggle, gateway, taxa) e chaves de API — o componente real NÃO é isso; é um formulário de configurações de cobrança (billing settings)
- Seção 'Configurações gerais' com 5 campos: Multa por atraso (%), Juros por mês (%), Vencimento boleto entrada (dias), Antecedência geração (dias), Aceite após vencimento (dias) — cada um com hint explicativo
- Seção 'Instruções do boleto' com parágrafo explicativo (uma instrução por linha, máx 40 chars, até 5 linhas) e Textarea (rows=4, maxLength=500) com placeholder
- Seção 'Desconto por antecipação' com campos Desconto à vista (%) e Válido por (dias)
- Seção 'Notificações de venda' com 3 checkboxes (notif vendedor, notif admin, envio automático de link de pagamento)
- Seção 'Contrato' com checkbox 'Exigir contrato em toda venda' e descrição do comportamento quando desligado
- Seção 'Estratégia de pagamento' com 3 cards de rádio (Página intermediária, Portal do associado, Link direto do gateway) com descrições longas e estado ativo (borda/radio)
- Estado de loading (spinner 'Carregando...')
- Botão global 'Salvar configurações' com estado 'Salvando...' e gating por permissão (canWrite / payment_methods.write)
- Hints/descrições de cada campo (ex.: 'Pro rata diário 0,033%/dia', 'Recomendado: 7')
- Nenhum dos elementos da minha tela (chaves de API, máscara, botão Regerar/Copiar, taxas por gateway) existe no real

### Cobrança Forte — DIVERGENTE (alta)
`Configuracoes/CobrancaForte.jsx` — Minha tela e um componente diferente (regua de comunicacao) e nao o painel de configuracao de negativacao/protesto legal do real.

- Componente errado: real e configuracao de escalada legal (Negativacao Serasa + Protesto cartorio via Sicoob); minha tela e uma regua de comunicacao (WhatsApp/E-mail/SMS/Juridico) — nao e o mesmo componente
- Header com icone Gavel + subtitulo 'Escalada automatizada de inadimplencia via Sicoob'
- Card 'Configuracao geral' com toggle 'Cron diario ativo (08:00)'
- Aviso amarelo de atencao sobre efeito legal/financeiro de negativacao e protesto
- Sub-painel 'Negativacao (Serasa)': checkbox Automatica, campo 'Dias de atraso para negativar', campo 'Valor minimo (R$)'
- Sub-painel 'Protesto (Cartorio)': checkbox Automatico, campo 'Dias de atraso para protestar', campo 'Valor minimo (R$)'
- Botoes 'Rodar agora' (PlayCircle) e 'Salvar configuracao' (Save) com estados loading e gate de permissao (canWrite)
- Tabela 'Faturas em cobranca forte ativa (N)' com colunas: Fatura, Associado, Valor, Atraso, Status, Desde, Acoes
- Badges de collection_status com labels/cores: Sem cobranca (cinza), Negativado Serasa (ambar), Protestado cartorio (vermelho), Cancelado (verde)
- Acoes por linha: Protestar (Gavel), Cancelar negativacao (Ban), Cancelar protesto (Ban) condicionais ao status
- Estado vazio: 'Nenhuma fatura em cobranca forte no momento'
- Estado loading global com spinner
- Tres ConfirmDialog (Negativar/Protestar/Cancelar) com mensagens de efeito legal
- Meus dados sao inventados/errados: '128 clientes na regua', etapas WhatsApp/SMS — nada disso existe no real

### Comissões Config — DIVERGENTE (alta)
`Configuracoes/ConfigComissoes.jsx` — Minha tela renderiza outro componente (percentuais/bonus por canal com switches) em vez do gestor de configuracoes de comissao por gatilho do AquaPark.

- Conceito errado: o real e sobre configuracoes por GATILHO de pagamento (Contrato Assinado, Entrada Paga, 1a Fatura Paga, Toda fatura paga por condicao), nao percentuais por canal de venda
- 3 StatCards: 'Configuracoes Ativas', 'Total de Configs', 'Padrao do Sistema' (com label do gatilho)
- Botoes de acao: 'Nova Configuracao' (+) e 'Atualizar' (refresh com spin em loading)
- Banner de destaque do Padrao do Sistema com icone estrela, nome, gatilho e nota de que o % vem do cadastro do vendedor em Vendedores
- Tabela com colunas: Nome (com icone do gatilho + tag PADRAO), Gatilho (badge colorido por tipo), Status (badge Ativa/Inativa), Acoes
- Colunas ordenaveis (sort) em Nome/Gatilho/Status
- Acoes por linha: Definir como padrao (estrela), Editar, Desativar (lixeira) com permissao canWrite
- Estados da tabela: 'Carregando...' (loading) e 'Nenhuma configuracao cadastrada' (vazio)
- Badges de gatilho com icones especificos (FileText, DollarSign, CheckCircle) e cores por tipo
- Modal Nova/Editar Configuracao: campo Nome*, select Gatilho* com 4 opcoes, descricao dinamica por gatilho, caixa de aviso 'Sem percentual aqui', campo Descricao, checkbox 'Definir como padrao do sistema'
- ConfirmDialog de desativacao com mensagem e estado de loading
- Controle de permissao commissions_config.write ocultando acoes de escrita
- Minha tela inventou: % por canal (Bilheteria/Site/Revendas/Grupos), % do gerente, override, switches de ajustes gerais — nada disso existe no real

### Dashboard Financeiro — DIVERGENTE (alta)
`Dashboard/Dashboard.jsx` — A minha tela e um dashboard operacional generico de parque; o real e um Dashboard Financeiro com metricas de receita, cards secundarios, pizza de status, alertas e acoes rapidas — componente e conteudo divergentes.

- KPIs errados: o real e um Dashboard FINANCEIRO com 'Receita Aprovada', 'Receita Pendente', 'Total de Vendas', 'Ticket Medio'; a minha usa metricas operacionais ('Faturamento hoje', 'Entradas', 'Ocupacao')
- Falta a linha de 4 cards secundarios: Recebidos, Pendentes, Vencidos, Inadimplencia (% com 1 decimal), cada um com icone colorido
- Falta o painel 'Status dos Pedidos' (grafico de pizza/donut) com legenda por status: bolinha colorida + label + contagem por status
- Falta o painel 'Alertas Urgentes' com icone AlertTriangle, linha 'Boletos vencidos' (badge vermelho com contagem) e 'Pedidos pendentes' (badge amarelo)
- Falta o painel 'Acoes Rapidas' com 4 botoes/links coloridos: Novo Associado, Ver Vendas, Ver Cobrancas, Inadimplencia
- Falta botao 'Atualizar' (RefreshCw) no topo
- Tabela de atividade: faltam colunas 'Numero' (contract_number mono), 'Data' e a acao 'Ver'; o real usa Associado (nao Itens/Forma) e nao tem coluna 'Forma'/'Itens'
- Status pill: o real usa VendaStatusPill/SALE_STATUS_CONFIG com labels e cores de status de venda; a minha tem so 'Pago'/'Pendente' generico
- Faltam estados: loading ('Carregando dashboard...' com spinner), EmptyState para receita/pedidos/atividade ('Sem dados de receita', 'Sem pedidos', 'Nenhum pedido recente')
- O grafico 'Por categoria' (hbar Ingressos/Alimentacao/Locacao/Loja) nao existe no real; e conteudo inventado
- Titulo do real e 'Atividade Recente' (nao 'Ultimas vendas') e limita a 5 vendas mais recentes

### IA › Painel — DIVERGENTE (alta)
`Automacao/IAPainel.jsx (SupervisorIA)` — Minha tela é um dashboard genérico inventado ('IA Studio' com KPIs, gráfico de barras e ranking) que não corresponde ao componente real Supervisor IA (execuções/erros, conversas WhatsApp, comercial/motivos de perda, custo por agente e analytics de qualidade/ferramentas), nem à estrutura de abas.

- Título/subtítulo errados: real é 'Supervisor IA' / 'Visão da operação da IA nos últimos 7 dias (somente leitura)'; minha usa 'IA Studio' e um subtítulo inventado
- Botão 'Atualizar' com ícone RefreshCw/Loader2 (spinner) — ausente
- Estados de loading (spinner central) e vazio ('Sem dados.') — ausentes
- Seção 'Execuções da IA' com 4 Stats (Execuções, Concluídas verde, Falhas vermelho, Em andamento âmbar) — ausente
- Sub-painel 'Erros recentes' (lista agente + mensagem de erro truncada) — ausente
- Seção 'Conversas no WhatsApp' com 3 Stats (Atendendo pela IA ciano, Com atendente, Encaminhadas p/ humano âmbar) — ausente
- Card 'Comercial (resumo atual)' com 3 contadores (Leads abertos, Qualificados, Em negociação) — ausente
- Card 'Motivos de perda' com ícone TrendingDown, lista de razões (Preço, Sem interesse, Sem recursos, Concorrência, Sem resposta, Outro) + contagem, e estado vazio 'Nenhuma perda registrada.' — ausente
- Card 'Custo da IA (7 dias)' com ícone DollarSign, custo estimado em US$, palavras/tokens processados, e nota de rodapé — inventei 'Custo do mês R$ 4.187' em vez disso
- Tabela de custo por agente (colunas: Assistente, Execuções, Tokens, Custo) — ausente
- Card 'Qualidade por assistente' (tabela: Assistente, Exec., Sucesso com cor por taxa, Tempo méd.) — ausente
- Card 'Ferramentas que mais falham' (tabela: Ferramenta, Usos, Falhas com % e cor, Tempo méd.) com estado vazio — ausente
- Estrutura de ABAS da rota real (Visão geral, Métricas, Saúde, Inteligência de fluxos) — não refletida
- Inventei conteúdo inexistente: KPIs 'Aprovações pendentes', gráfico de barras 'Uso 7 dias', deltas percentuais, e ranking 'Assistentes mais ativos' com % de resolução — nada disso existe no componente real

### IA › Ajustes gerais — DIVERGENTE (alta)
`Automacao/IAAjustes.jsx (AtendimentoIAWhatsappConfig)` — Minha tela renderiza um componente totalmente diferente ('Ajustes gerais' do IA Studio) em vez do real 'Atendimento por IA no WhatsApp', sem abas da secao e sem nenhum dos 3 cards ricos.

- Toda a estrutura de ABAS da secao IAAjustes: [Atendimento no WhatsApp, Ferramentas, Acoes da IA, Passagem entre assistentes, Colaboracao] — minha tela nao tem abas nenhuma
- Titulo/tema errado: real e 'Atendimento por IA no WhatsApp'; minha tela mostra 'Ajustes gerais' (IA Studio, provedor/modelo/custos) — componente completamente diferente
- Card 'Respostas automaticas': toggle 'IA responde no WhatsApp', select 'Quem a IA atende' (scope: somente leads/qualquer numero com scope_options), campo 'Tempo de espera para agrupar mensagens' (debounce 0-120s) com botao Salvar
- Card 'Leads e follow-up': toggle 'Atendimento de leads por IA (1o contato)', toggle 'Follow-up automatico' e 4 campos numericos (Silencio ate 1a cobranca, Intervalo entre cobrancas, Maximo de tentativas, Encaminhar ao atendente apos) + botao 'Salvar follow-up'
- Card 'Negociacao e pos-venda': toggle 'Closer (negociacao e fechamento)' + campo 'Nota a partir da qual o Closer assume (0-100)' + botao 'Salvar Closer'; toggle 'Regua de relacionamento (pos-venda)'
- Layout em grid de 3 colunas de cards ricos (lg:grid-cols-2 xl:grid-cols-3) — minha tela e um unico card com field-rows genericos
- Icones/InfoTip (tooltip de ajuda com icone Info) em cada campo com descricoes longas — ausentes na minha
- Estados: loading ('Carregando...' com spinner), saving ('Salvando...'), toasts de sucesso/erro — ausentes
- Toggles reais (switch role) com estados disabled/opacity ligados a dependencias (ex.: desabilita quando autoreply off) — minha tela tem apenas 3 switches genericos sem logica
- Guard de permissao automation.actions.config

### Relatórios › Análise avançada — DIVERGENTE (alta)
`Relatorios/AnaliseAvancada.jsx` — Minha tela não é o componente certo: o real é um BI de forecast/heatmap/benchmark/conversão por origem, enquanto a minha mostra KPIs, categorias e retenção trimestral inventados.

- Seção 'Comparação com o período anterior' com 4 BenchCards (Leads, Convertidos, Vendas, Receita) mostrando valor + delta % com setas ▲/▼ coloridas (verde/vermelho) — ausente
- Seção 'Previsão de receita' com ícone TrendingUp: gráfico de barras da série mensal + barra destacada 'prev.' e texto de projeção do próximo mês baseado em tendência — ausente
- Seção 'Horários de movimento (chegada de leads, 90 dias)': heatmap 7 dias x 24 horas com células coloridas por intensidade (rgba cyan) e tooltips por célula — totalmente ausente
- Seção 'Conversão por origem': lista com source_label, convertidos/leads e taxa de conversão em % — ausente
- Estado de loading com Loader2 spinner + 'Carregando…' — ausente
- Subtítulo real ('Previsão, horários de movimento, comparação entre períodos e conversão por origem') difere do meu
- Renderização condicional de cada seção (só aparece se houver dados) — ausente
- Minha tela inventou conteúdo inexistente: KPIs (Ticket médio, Ocupação, Retenção, Cancelamentos), abas Desempenho/Coortes/Previsão, botão Exportar CSV, gráfico Receita por categoria, gráfico Retenção de associados, tabela Desempenho por período trimestral — nada disso existe no componente real

### Relatórios › Atendimento — DIVERGENTE (alta)
`Relatorios/AtendimentoWhatsApp.jsx` — Minha tela é um componente errado: relatório genérico com KPIs inventados (Resolvidas %, CSAT, delta vs semana), gráfico de barras e tabela com estrelas — nada disso existe no real, que é um painel gerencial de Operação/Fila/SLA/Produtividade.

- Card 'Operação (agora)' com 4 tiles: Abertas sem atendente, Em atendimento, Abertas total, Encerradas (com cores accent)
- Card 'Fila de espera (agora)' com 3 tiles: Aguardando atendente, Aguardando cliente, Sem espera definida
- Card 'SLA — tempo médio de primeira resposta' com tile Geral (N conversas) e 3 breakdown tables: Por equipe, Por fila, Por atendente (nome → tempo médio · volume)
- Card 'Produtividade (últimos N dias)' com 5 tiles de eventos: Assumidas, Transferidas, Takeovers, Encerradas, Reabertas
- Aviso condicional 'N reabertura(s) por mensagem do cliente — possível encerramento prematuro' em laranja
- Filtro de período 7/30/90 dias (minha tela só tem 7/30)
- Filtro por tag (select 'Todas as tags' populado por listAttendanceTags)
- Botão Atualizar com ícone RefreshCw / spinner de loading
- Estados: loading (spinner central) e vazio ('Sem dados de atendimento.')
- Ícone MessageCircle no título e subtítulo correto sobre SLA/produtividade/fila
- Helper fmtDuration (s/m/h) para tempos médios

### Mensagens — RASO (alta)
`Configuracoes/Mensagens.jsx` — Minha tela reproduz a ideia (grupos por evento com cards e chips de canal) mas e drasticamente mais rasa que o componente real, que e um CRUD completo de variantes com filtro de status, diagnostico, cron, badges tecnicos, rotulos de gatilho, assunto, e uma barra densa de acoes (editar/clonar/testar/inativar/excluir) alem de varios modais.

- StatusFilter no topo (abas Ativos/Inativos/Todos) — ausente
- Botao 'Diagnostico' (icone Beaker) que valida templates — ausente
- Botao 'Disparar lembretes agora' (cron, com loading) — ausente
- Badge mono com o event_key tecnico (ex: INVOICE_GENERATED) ao lado do titulo — ausente
- Contador de variantes ('· N variantes') por evento — ausente
- Botao 'Adicionar variante'/'Adicionar canal' por evento — ausente
- Rotulo de gatilho por variante (No evento / Nd antes / Nd depois) — ausente; so mostro chips de canal
- Assunto/subject truncado do template exibido no card — ausente
- Badge 'INATIVO' (vermelho) para templates deletados — ausente
- Botoes de acao por variante: toggle ativar/pausar, Editar (lapis), Testar (Send)/Preview (Eye), Clonar (Copy), Inativar (ArchiveX), Reativar (RotateCcw), Excluir permanente (Trash2) — todos ausentes; so tenho um switch decorativo
- Estado vazio 'Nenhuma variante cadastrada ainda' por evento — ausente
- Icone de canal (Mail/MessageCircle/Bell/Smartphone) + rotulo por variante — uso so chips coloridos sem icone
- Area de teste real: dropdown 'Variante' + campo dinamico (E-mail vs Telefone) + hint sobre variaveis ficticias — minha area de teste so tem 1 input de email
- Modal de edicao/criacao/clone: roteamento (Canal/Tipo de gatilho/Frequencia dias), assunto, corpo HTML, checkbox ativo, painel lateral de variaveis contextuais — ausente
- Editor Meta/WhatsApp (template aprovado HSM, mapeamento de placeholders header/body/buttons) — ausente
- Modal de teste rapido e ConfirmDialog de inativar/excluir com mensagens detalhadas — ausente
- Modal de Preview com dados demo — ausente
- Rotulo dos 4 canais fiel: uso 'Painel (sino)' e 'Web Push' ok, mas contexto/limites PUSH (title/body chars) ausentes

### Confiabilidade de Eventos — RASO (alta)
`Configuracoes/EventDispatchLog.jsx` — A minha tela reproduz a tabela base (8 colunas) mas omite os 4 StatCards, o filtro de eventos, o estado DEAD/dead-letter, o modal de detalhes com payload/trace, o confirm de retry e os estados vazio/loading — muito mais rasa que o componente real.

- Linha de 4 StatCards no topo (Pendentes/Clock amber, Sucesso/CheckCircle2 green, Falhou/AlertTriangle red, Dead/XCircle red) com contadores — ausente por completo
- Filtro dropdown 'Todos os eventos' (event_name distinto) — a minha so tem status + listener
- Status set correto: real usa PENDING/SUCCESS/FAILED/DEAD (rotulos Pendentes/Sucesso/Falhou/Dead-letter). A minha usa OK/RETRY/PENDING e inventa 'Retentando'; falta o estado DEAD/dead-letter
- Opcao 'Dead-letter' no filtro de status
- Modal de Detalhes rico (Field: Evento, Event ID, Trace ID com botao 'Ver fluxo completo', Listener, Status, Tentativas, Emitido em, Ultima tentativa, Concluido em, Erro em bloco pre, Payload JSON) — a minha so tem botao sem conteudo
- TraceTimelineModal ('Ver fluxo completo' via trace_id) — ausente
- ConfirmDialog 'Reemitir evento?' com mensagem detalhada antes do retry — ausente
- Botao de retry condicional (so aparece em FAILED/DEAD e com permissao events.retry) com estado de loading spinner — a minha mostra refresh em todas as linhas
- EmptyState (icone Activity, titulo 'Nenhum evento registrado', descricao) — ausente
- Estado de loading (spinner Loader2) — ausente
- Colunas ordenaveis (sort em event_name, listener_name, status, attempt_count, emitted_at, last_attempt_at, last_error) — a minha e estatica
- Paginacao (Pagination, PAGE_SIZE 30, total) — ausente
- Descricao correta do subtitulo: 'Monitor do barramento interno: listeners com retry automatico (a cada 5min) e dead-letter apos 5 tentativas' — a minha resume
- Coluna Acoes tem Detalhes (Eye) primeiro e Reemitir condicional; ordem/condicao divergem

### Tarefas Agendadas — RASO (alta)
`Configuracoes/TarefasAgendadas.jsx` — Estrutura certa (jobs cron agrupados) mas reduzida a uma tira de uma linha; falta descricao, badges, proxima execucao/padrao, botoes Padrão e Disparar agora com confirmacao, fonte/status da ultima execucao e banner de permissao.

- Descricao de cada job (texto explicativo job.description) — minha linha nao mostra nenhuma descricao
- Badges de status: 'sensível' (destructive), 'agenda custom' (is_custom), 'não registrado' (!registered) — ausentes
- Label textual do toggle 'Ativa'/'Desativada' com cor (verde/cinza) — so tenho o switch visual
- Label 'Expressão cron' acima do input e placeholder '0 0 6 * * *'
- Linha de agenda padrão: 'Padrão: <default_cron>' — ausente
- Proxima execucao: '· próxima: <next_run>' com icone CalendarClock — ausente
- Botao 'Padrão' (RotateCcw) para restaurar agenda padrão — ausente
- Rodape: fonte da ultima execucao '(manual)'/'(auto)' via last_source — nao mostro
- Rodape: status de falha '— falhou' quando last_status FAILED — ausente
- Botao 'Disparar agora' com rotulo e icone Play (tenho so um iconbtn refresh sem rotulo)
- ConfirmDialog de confirmacao ao disparar (com aviso reforcado para tarefas sensíveis) — ausente
- Botao 'Atualizar' (RefreshCw) no cabecalho — ausente
- Banner de permissao (quando !canWrite) avisando que so admin edita/dispara — ausente
- Estado de loading 'Carregando tarefas...' com spinner — ausente
- Borda esquerda cinza e opacidade reduzida em jobs desativados — ausente
- Estado dirty do botao Salvar (desabilitado sem alteracao) — ausente

### Signatários (Empresa) — RASO (alta)
`Configuracoes/SignatariosEmpresa.jsx` — Minha tela reduz um componente de cards ricos com conceito de signatario primario, filtro de status e ciclo de lifecycle Tier 2 a uma lista de uma linha por linha, alem de inventar um campo 'Cargo' inexistente.

- Badge 'Primário' com icone estrela (conceito central: signatario primario e adicionado auto nos contratos D4Sign) — minha tela nao tem nenhuma nocao de primario
- Acao 'Marcar primário' (botao com estrela)
- Filtro de status Ativos/Inativos/Todos (StatusFilter) no topo — minha tela nao tem filtro
- E-mail do signatario exibido no card — minha tela so mostra cargo/CPF
- Distincao de 3 estados/badges: Primário (ambar), Pausado (cinza, is_active=false), Inativo (vermelho, deleted_at) — minha tela so tem badge Ativo/Inativo binario
- Ciclo de lifecycle Tier 2 com acoes separadas: Inativar (soft), Reativar, Excluir permanente — minha tela so tem Editar e Excluir genericos
- Descricao completa mencionando socios/representantes que assinam junto ao associado e insercao automatica no D4Sign — minha subtitle e generica
- Estado vazio rico (icone UserCheck + texto 'Cadastre pelo menos 1 socio...')
- Estado de loading (spinner 'Carregando…')
- Layout de cards ricos (avatar circular, nome, badges, email, CPF mono, rodape com acoes) — minha tela usa tira de uma linha por signatario
- Campo inventado 'Cargo' (Diretor/Financeiro/Comercial/Juridico) que NAO existe no componente real (real tem name, document_cpf, email, is_primary, is_active)
- Modal de criar/editar com campos Nome, CPF (mascara), E-mail, Primário (Sim/Nao), Em uso (Sim/Nao) com hints
- ConfirmDialog com mensagens especificas por acao (inativar vs excluir permanente)

### Dados Empresa — RASO (alta)
`Configuracoes/DadosEmpresa.jsx` — Minha tela reduz um formulario de 5 cards ricos (branding com upload de imagens, estabelecimento, endereco com UF/geo, contato, fuso horario) a uma unica lista rasa de 10 linhas genericas, omitindo secoes, icones, uploaders, o card de fuso horario e a maioria dos campos.

- Card de Branding com dois ImageUploader (Logo e Favicon): preview quadrado, botao 'Enviar imagem' com icone Upload, botao remover (Trash2), e hints detalhados de formato/tamanho (JPG/PNG/WebP/SVG/ICO, max 2MB/500KB, dimensoes recomendadas)
- Section headers com icones (Building2, MapPin, Phone, Clock) e titulos por secao — minha tela nao tem secoes separadas nem icones
- Card 'Dados do Estabelecimento' completo: faltam campos Razao Social separada, Inscricao Estadual, Inscricao Municipal (so tenho Razao/Nome/CNPJ/Segmento juntos)
- Card 'Endereco' com muito mais campos: Numero, Complemento, Bairro, Estado (Select com 27 UFs), Cidade, Referencia, Latitude e Longitude (com placeholders de coords). Minha tela colapsa em 'Endereco' e 'Cidade/UF' unicos
- Select de Estado com lista completa das 27 UFs (AC..TO) — ausente
- Card 'Contato' com Telefone Adicional (phone_secondary) e Site/website — faltam ambos
- Card 'Fuso horario' inteiro: descricao explicativa, Select de timezone com opcoes, botao 'Salvar fuso' proprio com estado de saving/Loader2 — totalmente ausente
- Estado de loading (Loader2 'Carregando...') ausente
- Botao 'Recarregar' (btn-secondary) — minha tela tem 'Cancelar' no lugar
- Estados de saving nos botoes (Loader2 'Salvando...' + icone Save) ausentes
- Descricoes reais dos campos substituidas por placeholder generico 'Descrição do campo' em todas as linhas
- Placeholders/mascaras especificas ausentes em varios campos (CEP, telefone, cnpj presente mas parcial)

### Atualização — RASO (alta)
`Configuracoes/Atualizacao.jsx` — Estrutura base certa (abas, cards de versão, histórico) mas rasa: falta o painel de versões disponíveis com changelog e botão atualizar, o painel de upgrade em andamento com LogViewer ao vivo, o alerta de lock órfão, o painel de último upgrade detalhado com estados FAILED/RUNNING e os ConfirmDialogs.

- Painel 'Versões disponíveis' com lista de upgrades (versão mono, data com ícone Clock, summary, lista de itens/changelog em bullets) e botão 'Atualizar' por versão — minha tela só mostra card 'Disponível: Nenhuma'
- Botão 'Atualizar lista' (RefreshCw) dentro do painel de versões disponíveis
- EmptyState 'Sistema atualizado' com descrição da versão atual quando não há upgrades
- Painel de upgrade em andamento (isRunning): título 'Atualizando X → Y', timestamp iniciado, e LogViewer ao vivo (log_lines com timestamp HH:MM:SS, [step], mensagem colorida por level error/warn/info) com auto-scroll
- Estado de loading (spinner Loader2 + 'Carregando...')
- Alerta de lock órfão (ShieldAlert amarelo) com aviso 'RUNNING há mais de 10 min' e botão 'Liberar lock manualmente'
- Painel 'Último upgrade' detalhado: ícone SUCCESS/FAILED, from→to, Status, Iniciado, Concluído, bloco de erro (error_step/error_message) em vermelho, backup_path em mono — minha versão é só uma tira de uma linha
- Histórico é colapsável (Chevron) com contador '(N)' — minha versão é tabela sempre aberta
- Coluna Origem no histórico existe na minha, mas real usa StatusPill com rótulos OK/Falhou/Em andamento e cores por status, não badge genérico 'Concluído'
- ConfirmDialog de upgrade com etapas detalhadas (Backup ~30s, aplica versão, recompila, reinicia 1-2min) e aviso de reversão via restore-backup.sh
- ConfirmDialog de liberação de lock (motivo MANUAL_RELEASE, avisos)
- Aba Backup abre componente BackupRestore real (não apenas um botão/tab inerte)
- Card 'Backups retidos' com valor 'até 7' (real) vs '7'; subtítulo de retenção
- Estados FAILED/RUNNING além do sucesso — minha tela assume sempre 'Concluído'

### WhatsApp › Equipes e Filas — RASO (alta)
`Configuracoes/AtendimentoEquipes.jsx` — Componente certo e seções corretas (Equipes/Filas/Tags), mas raso: falta todo o painel Visão geral com tiles e movimentações, ações por linha, estados inativos e descrições por seção.

- Painel 'Visão geral do atendimento' inteiro ausente: 4 stat tiles coloridos (Abertas sem atendente, Em atendimento, Abertas total, Encerradas)
- Sub-bloco 'Movimentações (últimos N dias)' com 6 contadores (Assumidas, Transferidas, Takeovers, Encerradas, Reabertas, Reabertas por cliente com destaque warn)
- Descrições por seção ausentes (Equipes: 'Grupos de atendentes e supervisores...', Filas: 'Destinos de roteamento...', Tags: 'Categorias para classificar conversas ex.: Financeiro, VIP, Urgente')
- Ações por linha de equipe: botões Membros (UserPlus), Editar (Pencil) e Desativar (Trash2) — mina só tem um botão 'more' genérico
- Item de equipe real usa bolinha de cor + contagem de membros + 'fila padrão: X'; mina inventa avatar de iniciais e campo 'Supervisor' que não existe no real
- Estado inativo '(inativa)' com opacity reduzida em equipes/filas/tags
- Item de fila: rótulo 'equipe: X' ou 'sem equipe' e ações Editar/Desativar (mina adiciona bolinha de cor que o real não tem e sem ações)
- Tags reais têm bolinha de cor + botões Editar/Desativar por tag e estado inativo; mina só renderiza badges coloridos sem ações
- Botões de criação rotulados 'Nova equipe', 'Nova fila', 'Nova tag' (mina usa genérico 'Adicionar')
- EmptyState rico com ícone + título + descrição para cada seção (mina usa texto simples)
- Estado de loading (spinner) ausente
- Modais de detalhe: Membros da equipe (lista membro/supervisor com email + papel, add/remover), Nova/Editar equipe (cor, fila padrão), fila e tag — nenhum representado

### Dashboard Comercial — RASO (alta)
`Dashboard/DashboardComercial.jsx` — Mesma familia (dashboard comercial) mas muito mais rasa e com conteudo inventado: faltam a linha de SmallStats, motivos de perda, temperatura, dois graficos de pizza, area e barras, e o funil/KPIs/ranking divergem do real.

- Linha de 4 StatCards do topo real (Total de Pedidos, Pedidos Concluidos, Valor Total, Ticket Medio) com icones proprios — a minha usa KPIs inventados (Vendas do mes, Meta atingida, Conversao) com deltas que nao existem no real
- Segunda linha de 4 SmallStats: Leads, Leads convertidos, Conversao de leads, Vendedores ativos (com icones Inbox/UserCheck/TrendingUp/Users)
- Botao 'Atualizar' (RefreshCw) no topo
- Funil comercial com 6 estagios reais (Leads, Qualificados, Visita agendada, Proposta enviada, Negociacao, Venda) — a minha tem so 4 estagios diferentes (Visitantes, Leads, Propostas, Fechados)
- Rodape do funil com 'Conversao do periodo' e 'Tempo medio ate vender: X dias'
- Card 'Motivos de perda' com lista de motivos (Preco, Sem interesse, Sem recursos, Concorrencia, Sem resposta, Outro) e contagens
- Sub-secao 'POR TEMPERATURA' com Quente (vermelho), Morno (ambar), Frio (azul) e contadores
- Grafico de pizza 'Status dos Pedidos' com legenda (PieLegend nome+valor+cor)
- Grafico de pizza 'Leads por status' com legenda e cores por status (Pendente, Atribuido, Em atendim., Convertido, Descartado)
- Grafico de area 'Vendas por mes (qtd)'
- Grafico de barras 'Faturamento mensal (R$)'
- Tabela 'Top 5 Vendedores' com colunas #, Vendedor, Vendas, Total (ordenavel) — a minha usa um ranking com avatares/barras/subtitulos fabricados, estrutura diferente
- Estados: loading 'Carregando dashboard comercial...', EmptyStates (Sem pedidos, Sem leads, Sem dados mensais, Sem vendas atribuidas)

### IA › Assistentes — RASO (alta)
`Automacao/Agentes.jsx` — Minha tela reproduz apenas a lista estatica de assistentes; falta toda a riqueza do modal de edicao com 9 abas, o wizard de criacao e os estados de loading/vazio/confirmacao.

- Estado de loading (spinner Loader2) ausente
- Estado vazio (EmptyState 'Nenhum assistente' com descricao dos 2 passos) ausente
- Badge '(inativo)' quando assistente nao esta ativo
- Botao 'Novo assistente' abre wizard de criacao guiada (4 modelos: Atendimento, Vendedor, Concierge, Do zero) com 2 passos — ausente
- Modal de edicao completo com 9 ABAS: Visao geral, Quem e, O que faz, O que sabe, O que pode fazer, Follow-up, Quem atende, Testar, Ajustes avancados — totalmente ausente
- Aba Visao geral: checklist 'Pronto para publicar?' (Tem nome, Tem objetivo/roteiro, Sabe responder, Tem habilidades) com marcadores verdes/opcionais
- Aba Quem e: bloco Personalidade (Nome que a IA usa, Tom de voz, Emojis, Tamanho das respostas, listas Sempre/Nunca)
- Aba O que faz: Objetivo + PassosBuilder (Passos na ordem com subir/descer + Situacoes quando/faca) + Instrucoes extras
- Aba O que sabe: grid de bases de conhecimento com checkboxes
- Aba O que pode fazer: grid de ferramentas com badge 'grava dados' + Acoes autorizadas
- Aba Follow-up: config herdada vs personalizada com 4 campos (delay, intervalo, tentativas, handoff)
- Aba Quem atende (AssistantAttends): badge 'Roteamento automatico ligado/desligado', regras de atendimento por publico
- Aba Testar: caixa de teste manual com output e status + historico de prompt
- Aba Ajustes avancados: provedor, modelo, criatividade, passos de raciocinio, tamanho maximo
- Botao excluir dispara ConfirmDialog de confirmacao
- Icone Bot no cabecalho e descricao completa presente mas sem os elementos ricos do modal

### Relatórios › Geral — RASO (alta)
`Relatorios/Relatorios.jsx` — Minha tela tem o esqueleto de um dashboard de relatorios, mas omite o pie de status, os 3 cards de ranking (associados/vendedores/titulos) e toda a secao de exportacao com 4 tipos de relatorio; alem disso troca os 4 KPIs e o header por conteudo inventado.

- Grafico de pizza 'Status dos Pedidos' com fatias coloridas + legenda listando cada status com bolinha de cor, rotulo e contador (usa SALE_STATUS_CONFIG com cores)
- Card 'Top 5 Associados' (colunas #, Associado, Total em BRL) com ranking numerado e ordenacao por coluna
- Card 'Top 5 Vendedores' (colunas #, Vendedor, 'Vendas / Total') com contagem e total
- Card 'Top Titulos' (colunas #, Titulo, Vendas)
- Secao 'Exportar relatorios' com 4 botoes ricos: Vendas (icone carrinho, 'Historico de vendas por periodo'), Financeiro (icone $, 'Receitas, faturas e balanco'), Funil (icone tendencia, 'Conversao por etapa'), Inadimplencia (icone barras, 'Boletos vencidos por associado'), cada um com badge XLSX e icone de download
- KPIs errados: real usa Vendas Totais, Receita Total, Associados Ativos, Taxa Conversao; a minha usa Faturamento/Ingressos/Novos associados/Inadimplencia
- Botao 'Atualizar' (refresh) no topo — a minha tem segmentos Este mes/Trimestre/Ano e Exportar PDF que nao existem no real
- Estado de loading ('Carregando relatorios...' com spinner) e EmptyStates ('Sem dados', 'Sem pedidos') por secao
- Ranking numerado com '#' em destaque brand e valores em verde (semantica visual do RankingCard)
- Estado condicional por permissao (can('reports.export')) para a secao de exportacao
- A tabela 'Top produtos' da minha tela nao existe no real (real tem 3 cards de ranking, nao lista de produtos)

### Canais de Venda — RASO (media)
`Configuracoes/CanaisVenda.jsx` — Componente certo (tabela de canais) com boa densidade — colunas, descrição, badge INATIVO e grip presentes — mas falta o filtro de status e as ações de inativar/reativar do ciclo Tier 2.

- Filtro StatusFilter (Ativos / Inativos / Todos) no topo à direita — ausente na minha tela
- Ações de ciclo de vida: real tem Inativar/Reativar (activate/inactivate) além de Editar e Excluir; a minha só tem Editar e Excluir (falta o botão de inativar/reativar)
- Cabeçalhos de coluna ordenáveis (sort com indicador) — Ordem/Code/Rótulo/Status/Padrão são sortáveis no real
- Coluna Padrão: real usa ícone CheckCircle2; ok, mas sem estado — nitpick
- Subtítulo diferente: real diz 'Os canais definem como uma venda foi originada e quanto o vendedor (e/ou indicador) recebe.'

### IA › Pendências — RASO (media)
`Automacao/IAPendencias.jsx (AutomacaoAprovacoes)` — Reflete a secao com abas (Autorizacoes/Aprendizados) e o header/estado vazio corretos, mas mostra apenas o empty state e omite toda a riqueza da lista de aprovacoes (cards com tool, args, permissao, timestamp e botoes Aprovar/Recusar + dialog).

- Cards de acao pendente da lista: nao existe nenhum item rico, so o estado vazio. Faltam os cards com tool_label, descricao (friendlyArgs), timestamp com icone de relogio e o permLabel
- Botao 'Aprovar' (fundo ciano, icone check) que executa a acao na hora
- Botao 'Recusar' (borda, texto vermelho, icone X)
- ConfirmDialog de aprovar/recusar com texto de aviso ('sera executada agora, sob o escopo do assistente' / registro de quem aprovou)
- Estado de loading (spinner) — minha tela pula direto pro vazio
- Trecho final da descricao '— nunca com a sua permissao' foi cortado no subtitulo

## 7. Fonte da verdade

A profundidade de cada tela é decidida contra o componente real, nunca de memória. Ao corrigir uma tela, atualizar o veredito na tabela (seção 5) e marcar os itens resolvidos (seção 6), na mesma leva.

---

*Doc vivo. A regra (seções 1–4) só muda por decisão do Robson; a tabela e os achados evoluem com as correções.*
