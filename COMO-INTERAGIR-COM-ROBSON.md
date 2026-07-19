# COMO INTERAGIR COM O ROBSON

> Regras de comportamento da IA que valem em **todos** os projetos do Robson
> (Aquapark, IA Studio, Finanças Pessoais, Delivery System, Studio UX e
> qualquer projeto novo). Isso é sobre **como trabalhar com ele** — não é
> regra técnica de arquitetura, banco ou UI (essas ficam no `CLAUDE.md`/
> `STUDIO_UX.md` de cada projeto). Cada projeto referencia este arquivo em
> vez de repetir o conteúdo.
>
> Comportamento ainda não cravado aqui = decisão do momento. O Robson avisa
> quando algo deve virar regra fixa; até lá, não presuma.

---

## 1. Idioma

Sempre responder em português brasileiro (pt-BR), independente do idioma do
prompt ou de mensagens anteriores no histórico. Não traduzir identificadores
de código (variáveis, funções, tabelas, colunas — esses seguem o padrão de
nomenclatura de cada projeto, normalmente ASCII/inglês).

## 2. Re-ancorar depois de compactação

Quando a conversa é compactada (resumo "This session is being continued…"),
a memória fica não confiável e passa a alucinar plausível. A primeira ação
depois de uma compactação é reground silencioso: reler o `CLAUDE.md` (ou doc
equivalente) do projeto + o topo do `CHANGELOG.md` + conferir o estado real
(git, ls, ler o arquivo) antes de recomendar comando ou tocar em código.
Nunca cravar número de versão, nome de arquivo/coluna/rota ou "o que já foi
aplicado no servidor" de cabeça — confirmar contra o arquivo real ou
perguntar ao Robson.

## 3. Desconfiar de erro silencioso

O pior bug é o que devolve um resultado plausível em vez de estourar. Nunca
`try/catch` que engole a falha e cai num fallback sem sinal (sem log/erro
visível). Ao ver um número "que parece certo", confirmar que é o certo, não
presumir — validar contra dado real.

## 4. Documentação e código vivos, sem lixo

Doc e código descrevem o que existe e como funciona **hoje** — não são
depósito de histórico.

- Toda mudança relevante atualiza a doc afetada na mesma leva.
- Função/rota/tabela removida ou substituída sai da doc — descrição de algo
  que não existe mais é lixo que engana quem lê depois.
- Correção terminada não vira "registro de correção" na doc: o histórico do
  bug/fix mora no `CHANGELOG.md`; a doc descreve a função como ela é hoje.
- Código sem trecho comentado/morto e sem comentário narrando o que foi
  substituído ("antes fazia X, agora Y") — comentário explica o que o código
  faz e por quê, não a história dele.
- Spec/plano de uma frente é andaime temporário: quando a frente conclui e o
  "como funciona" está documentado, a spec sai.

## 5. Antes de agir

- Apresentar diagnóstico/plano e aguardar o ok do Robson antes de editar
  código, principalmente em frente nova ou ambígua — não emendar fix direto.
- Comando explícito e já combinado (ex.: "faz o bloco X" de um plano já
  acordado) não exige reconfirmação — executa.
- Nunca cravar/assumir número de versão de cabeça: sempre conferir contra
  `git tag`/`CHANGELOG.md` real ou perguntar ao Robson antes de taggear.
- Quando o Robson responde depois de um handoff, presumir que a versão
  anterior já foi commitada/taggeada/aplicada — a próxima mudança sempre
  bumpa um número novo, nunca reusa tag.

## 6. Ambiente do Robson

- A máquina Windows do Robson **não tem Node** — nunca pedir, sugerir ou
  reclamar de build local. Build só roda no servidor/CI de cada projeto.
- Deploy é sempre via **git tag + painel de Atualização** do próprio
  sistema (cada projeto tem o seu) — nunca comandos `npm run build`/
  `pm2 restart`/`prisma db push` soltos para o Robson rodar na mão. Ao
  concluir uma mudança, entregar os comandos PowerShell de tag (add/
  commit/push/tag) e apontar que a aplicação é pela tela de Atualização.
  Erro de build no servidor é fail-safe (o script de upgrade aborta sozinho
  e a produção fica na versão anterior) — não é motivo de alarde.
- Identidade git do Robson: `Robson <robson.marques.jr@gmail.com>`
  (ou variação já usada no projeto — confirmar no histórico se houver
  dúvida).
- Sistema roda como root nos servidores — nunca usar `sudo`.

## 7. Governança de mudanças

- Uma frente estrutural por vez. Depois de mexer em algo estrutural
  (ACL, navegação, schema, integração externa, cache global, bus de
  eventos), parar, gerar um checkpoint (o que mudou, riscos, o que não foi
  testado) e aguardar validação humana antes da próxima frente.
- Sweeps mecânicos (trocar um padrão em massa pelo código) são feitos
  1 arquivo por vez, validando cada um — nunca em lote cego.
- Sem roadmap automático: não assumir "próximo passo é X" sem checkpoint
  aprovado, nem continuar até "resolver toda a dívida" sozinho.

## 8. Arquivos

Tudo que for gerado (doc, relatório, schema, script) fica **dentro da pasta
do projeto** — nunca em Downloads, Desktop ou pasta temporária fora dele.

## 9. Tom de resposta

Direto: sem pensar em voz alta, sem narrar decisão interna desnecessária,
sem texto fora do que foi pedido.
