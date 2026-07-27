/**
 * Studio UX — Biblioteca curada de ícones (fonte única · ICONOGRAPHY §6).
 * Cada ícone: nome semântico em inglês → { body (markup interno), meaning (significado documentado), keywords }.
 * Estilo único (§3): grade 24, traço 1.5, terminações redondas, SEM cor crua — herda `currentColor` (o token do contexto, §4).
 * Uma metáfora, um significado (P2): antes de desenhar um ícone novo, confira se a biblioteca já cobre o conceito.
 * Este é o CORE curado; cresce por curadoria governada (SemVer), nunca por download avulso por tela.
 */
export const ICON_STYLE = { viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };

export const ICONS = {
  // — Navegação / setas —
  "chevron-right": { meaning: "avançar / abrir item", keywords: ["next", "forward", "expand"], body: '<path d="M9 6l6 6-6 6"/>' },
  "chevron-left": { meaning: "voltar item", keywords: ["prev", "back"], body: '<path d="M15 6l-6 6 6 6"/>' },
  "chevron-down": { meaning: "expandir / abrir menu", keywords: ["expand", "open", "dropdown"], body: '<path d="M6 9l6 6 6-6"/>' },
  "chevron-up": { meaning: "recolher", keywords: ["collapse"], body: '<path d="M6 15l6-6 6 6"/>' },
  "arrow-left": { meaning: "voltar para a tela anterior", keywords: ["back", "previous"], body: '<path d="M20 12H4"/><path d="M10 6l-6 6 6 6"/>' },
  "arrow-right": { meaning: "seguir adiante", keywords: ["forward", "continue"], body: '<path d="M4 12h16"/><path d="M14 6l6 6-6 6"/>' },
  "arrow-up-right": { meaning: "tendência de alta / sair", keywords: ["trend up", "increase"], body: '<path d="M7 17L17 7"/><path d="M8 7h9v9"/>' },
  "external-link": { meaning: "abrir em novo local / fora do app", keywords: ["open", "new tab"], body: '<path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M18 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>' },

  // — Ações —
  "plus": { meaning: "adicionar / criar novo", keywords: ["add", "create", "new"], body: '<path d="M12 5v14"/><path d="M5 12h14"/>' },
  "minus": { meaning: "remover / diminuir", keywords: ["remove", "less"], body: '<path d="M5 12h14"/>' },
  "close": { meaning: "fechar / cancelar", keywords: ["x", "dismiss", "cancel"], body: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>' },
  "check": { meaning: "confirmar / concluído", keywords: ["ok", "done", "confirm"], body: '<path d="M5 12.5l4.5 4.5L19 7"/>' },
  "search": { meaning: "buscar", keywords: ["find", "lookup"], body: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>' },
  "trash": { meaning: "excluir (ação destrutiva — nunca solta, P13)", keywords: ["delete", "remove"], body: '<path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12"/><path d="M10 11v6"/><path d="M14 11v6"/>' },
  "edit": { meaning: "editar", keywords: ["pencil", "modify", "write"], body: '<path d="M5 19h4L19 9l-4-4L5 15v4z"/><path d="M13.5 6.5l4 4"/>' },
  "send": { meaning: "enviar mensagem", keywords: ["submit", "paper plane"], body: '<path d="M20 4L3 11l7 3 3 7 7-17z"/><path d="M20 4l-10 10"/>' },
  "copy": { meaning: "copiar para a área de transferência", keywords: ["duplicate", "clipboard", "id"], body: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>' },
  "alert-triangle": { meaning: "aviso / atenção", keywords: ["warning", "caution", "risk"], body: '<path d="M12 4L2.5 20h19L12 4z"/><path d="M12 10v5"/><path d="M12 17.5v.5"/>' },
  "history": { meaning: "histórico / versões anteriores", keywords: ["timeline", "revisions", "past", "log"], body: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3 4v4h4"/><path d="M12 8v4l3 2"/>' },

  /* ---------------------------------------------------------------------------
     VOCABULÁRIO DE NAVEGAÇÃO (v1.2.39)
     ---------------------------------------------------------------------------
     O core nasceu vestindo tela de CADASTRO: ação (salvar, excluir), objeto
     (arquivo, usuário) e status. Faltava o vocabulário do MENU de um produto —
     assistente, rede, fluxo, banco de dados, terminal, plugue, livro, dinheiro.

     A falta não apareceu como erro: apareceu como **repetição**. O consumidor
     montou um mapa de "proximidade semântica" e o menu do IA Studio terminou com
     `file` em 12 itens e `settings` em 9 — de 30 itens, só 7 tinham ícone próprio.
     "Custos" era uma folha de papel; "Incidentes" era o mesmo sino de
     "Notificações". Ninguém errou um nome: o vocabulário não existia.

     Regra que fica: **um conceito de menu, um glifo.** Se dois itens de menu
     compartilham desenho, ou eles são a mesma coisa (e o menu tem item demais),
     ou falta glifo — e aí ele entra aqui, não num mapa de fallback no consumidor.
     ------------------------------------------------------------------------ */

  /* `spark` usa o MESMO path do favicon do IA Studio — não um desenho parecido.
     A marca do produto aparecia em três formas diferentes (um `·` no menu, um
     raio no login, esta faísca no favicon); unificar exigia que o glifo fosse
     literalmente a mesma geometria, não uma aproximação "no espírito". */
  "spark": { meaning: "faísca / inteligência / marca de produto", keywords: ["ai", "sparkle", "magic", "brand", "star"], body: '<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>' },
  "bot": { meaning: "assistente / agente de IA", keywords: ["agent", "assistant", "robot", "ai"], body: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4"/><path d="M9 13v1.5"/><path d="M15 13v1.5"/>' },
  "brain": { meaning: "memória / conhecimento retido", keywords: ["memory", "mind", "context"], body: '<path d="M9.5 4.5a3.5 3.5 0 0 0-3.5 3.5 3 3 0 0 0-1 5.8V16a3.5 3.5 0 0 0 4.5 3.3z"/><path d="M14.5 4.5A3.5 3.5 0 0 1 18 8a3 3 0 0 1 1 5.8V16a3.5 3.5 0 0 1-4.5 3.3z"/><path d="M12 5v14"/>' },
  "book": { meaning: "base de conhecimento / documentação", keywords: ["knowledge", "docs", "library", "manual"], body: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>' },
  "tool": { meaning: "ferramenta / habilidade que o sistema executa", keywords: ["wrench", "skill", "capability"], body: '<path d="M14.5 4.5a4 4 0 0 0 5 5L20 10 10 20a2.8 2.8 0 0 1-4-4L16 6z"/><path d="M6.5 17.5h.01"/>' },
  "shield": { meaning: "permissão / proteção", keywords: ["acl", "profile", "security", "role"], body: '<path d="M12 3l7 3v5.5c0 4.2-2.8 7.6-7 9.5-4.2-1.9-7-5.3-7-9.5V6z"/>' },
  "coin": { meaning: "custo / dinheiro", keywords: ["money", "cost", "billing", "price"], body: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5A2.5 2.5 0 0 0 12 8c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2a2.5 2.5 0 0 1-2.5-1.5"/><path d="M12 6v12"/>' },
  "network": { meaning: "rede / infraestrutura conectada", keywords: ["isp", "nodes", "topology", "provider"], body: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4"/><path d="M12 11.5L6.5 17"/><path d="M12 11.5L17.5 17"/>' },
  "radio": { meaning: "transmissão / incidente em curso", keywords: ["broadcast", "signal", "live", "outage"], body: '<circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4"/><path d="M16.2 16.2a6 6 0 0 0 0-8.4"/><path d="M4.9 4.9a10 10 0 0 0 0 14.2"/><path d="M19.1 19.1a10 10 0 0 0 0-14.2"/>' },
  "ticket": { meaning: "chamado / atendimento aberto", keywords: ["support", "os", "case", "issue"], body: '<path d="M3.5 9V7a1.5 1.5 0 0 1 1.5-1.5h14A1.5 1.5 0 0 1 20.5 7v2a3 3 0 0 0 0 6v2a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-2a3 3 0 0 0 0-6z"/><path d="M12 8.5v7"/>' },
  "workflow": { meaning: "automação / sequência de passos", keywords: ["flow", "pipeline", "automation", "steps"], body: '<rect x="3.5" y="4" width="7" height="5.5" rx="1.5"/><rect x="13.5" y="14.5" width="7" height="5.5" rx="1.5"/><path d="M7 9.5v4a3 3 0 0 0 3 3h3.5"/>' },
  "git-branch": { meaning: "fluxo com ramos / versão", keywords: ["flow", "branch", "fork", "version"], body: '<circle cx="7" cy="5.5" r="2.5"/><circle cx="7" cy="18.5" r="2.5"/><circle cx="17" cy="9" r="2.5"/><path d="M7 8v8"/><path d="M17 11.5c0 3-2.5 4.5-6 4.5"/>' },
  "activity": { meaning: "execução / atividade em andamento", keywords: ["pulse", "run", "monitor", "heartbeat"], body: '<path d="M3 12h4l2.5-6 4 12 2.5-6h5"/>' },
  "messages": { meaning: "conversas / várias trocas", keywords: ["chats", "threads", "inbox"], body: '<path d="M8 14H6.5A2.5 2.5 0 0 1 4 11.5v-4A2.5 2.5 0 0 1 6.5 5h8A2.5 2.5 0 0 1 17 7.5V9"/><path d="M9.5 10h8a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5H14l-4 3v-3h-.5A2.5 2.5 0 0 1 7 16.5v-4A2.5 2.5 0 0 1 9.5 10z"/>' },
  "list": { meaning: "fila / lista ordenada", keywords: ["queue", "order", "team", "sequence"], body: '<path d="M9 6.5h11"/><path d="M9 12h11"/><path d="M9 17.5h11"/><path d="M4.5 6.5h.01"/><path d="M4.5 12h.01"/><path d="M4.5 17.5h.01"/>' },
  "plug": { meaning: "conexão com sistema externo", keywords: ["connection", "integration", "socket"], body: '<path d="M9 3.5v5"/><path d="M15 3.5v5"/><path d="M6.5 8.5h11v3a5.5 5.5 0 0 1-11 0z"/><path d="M12 17v3.5"/>' },
  "store": { meaning: "catálogo / loja de conectores", keywords: ["marketplace", "shop", "catalog"], body: '<path d="M4 9.5h16V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/><path d="M3 9.5L5 4h14l2 5.5"/><path d="M9.5 14h5"/>' },
  "grid": { meaning: "conjunto de blocos / módulos", keywords: ["blocks", "modules", "apps"], body: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>' },
  "key": { meaning: "chave de acesso / credencial", keywords: ["api key", "secret", "token", "credential"], body: '<circle cx="8" cy="8" r="4"/><path d="M11 11l8 8"/><path d="M16.5 16.5l2-2"/><path d="M19 19l1.5-1.5"/>' },
  "database": { meaning: "recurso de dados / repositório", keywords: ["data", "storage", "records", "resource"], body: '<ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v11c0 1.7 3.1 3 7 3s7-1.3 7-3v-11"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>' },
  "layers": { meaning: "camadas / tradução entre formatos", keywords: ["mapping", "stack", "transform"], body: '<path d="M12 3.5L20.5 8 12 12.5 3.5 8z"/><path d="M3.5 12.5L12 17l8.5-4.5"/><path d="M3.5 17L12 21.5l8.5-4.5"/>' },
  "compass": { meaning: "explorar / percorrer o que existe", keywords: ["explore", "discover", "browse"], body: '<circle cx="12" cy="12" r="8.5"/><path d="M15 9l-2 4-4 2 2-4z"/>' },
  "terminal": { meaning: "ambiente de desenvolvedor", keywords: ["console", "shell", "cli", "developer"], body: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M7.5 10l2.5 2.5L7.5 15"/><path d="M12.5 15.5h4"/>' },
  "code": { meaning: "código / chamada técnica", keywords: ["json", "payload", "script", "test"], body: '<path d="M8.5 8.5L4 12l4.5 3.5"/><path d="M15.5 8.5L20 12l-4.5 3.5"/><path d="M13.5 5l-3 14"/>' },
  "boxes": { meaning: "workspaces / espaços separados", keywords: ["workspace", "environments", "containers"], body: '<rect x="3.5" y="3.5" width="8" height="8" rx="1.5"/><rect x="12.5" y="12.5" width="8" height="8" rx="1.5"/><path d="M12.5 7.5h5a2 2 0 0 1 2 2v3"/>' },
  "credit-card": { meaning: "plano / assinatura", keywords: ["billing", "plan", "license", "subscription"], body: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M6.5 14.5h4"/>' },
  "upload": { meaning: "enviar arquivo / importar", keywords: ["import", "attach", "send file"], body: '<path d="M12 19V8"/><path d="M8 12l4-4 4 4"/><path d="M5 5h14"/>' },
  "download": { meaning: "baixar", keywords: ["save", "export"], body: '<path d="M12 4v11"/><path d="M8 11l4 4 4-4"/><path d="M5 19h14"/>' },
  "refresh": { meaning: "recarregar / sincronizar", keywords: ["reload", "sync", "retry"], body: '<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8"/><path d="M20 3v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 16"/><path d="M4 21v-5h5"/>' },
  "filter": { meaning: "filtrar lista", keywords: ["funnel", "refine"], body: '<path d="M4 5h16l-6 7v6l-4-2v-4z"/>' },
  // Três ações que faltavam para vestir um produto de automação: executar,
  // arquivar e salvar. Sem elas o consumidor caía no `help` ("?") — o fallback
  // silencioso do DSIcon — ou pedia emprestado um ícone de outro significado
  // (P2: uma metáfora, um significado).
  "play": { meaning: "executar / iniciar agora", keywords: ["run", "start", "execute"], body: '<path d="M7 5l12 7-12 7V5z"/>' },
  // `power` e `zap` fecham o vocabulário de automação: LIGAR/DESLIGAR uma
  // automação e o GATILHO que a dispara. Sem eles o produto de automação pedia
  // emprestado `settings` para "gatilho" (que já significa configuração) e não
  // tinha nada para ligar/desligar — caía no "?" do fallback.
  "power": { meaning: "ligar / desligar (o que está em operação)", keywords: ["on", "off", "enable", "disable", "publish"], body: '<path d="M12 4v8"/><path d="M7.5 7.5a6.5 6.5 0 1 0 9 0"/>' },
  "zap": { meaning: "gatilho / o que dispara algo", keywords: ["trigger", "event", "bolt", "lightning"], body: '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>' },
  "archive": { meaning: "arquivar (guarda sem excluir)", keywords: ["box", "store", "inactive"], body: '<path d="M3 7h18v3H3z"/><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/><path d="M10 14h4"/>' },
  "save": { meaning: "salvar / gravar alteração", keywords: ["store", "disk", "commit"], body: '<path d="M5 4h11l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8 4v5h7"/><path d="M8 15h8"/>' },

  // — Seleção — glifos de caixa. Existem porque os nomes `square*` estavam
  // aliasados para ícones sem relação (`square` → `file`, `square-check` →
  // `check-circle`): quem pedia uma caixa recebia um documento. Estes são a
  // representação VISUAL de seleção; para um controle de verdade use
  // `<input type="checkbox" class="su-checkbox">` (semântico, focável).
  "square": { meaning: "caixa vazia / não selecionado", keywords: ["checkbox", "unchecked", "empty"], body: '<rect x="4" y="4" width="16" height="16" rx="3"/>' },
  "square-check": { meaning: "caixa marcada / selecionado", keywords: ["checkbox", "checked", "selected"], body: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12.5l2.8 2.8L16 10"/>' },
  "square-minus": { meaning: "seleção parcial (alguns marcados)", keywords: ["checkbox", "indeterminate", "partial"], body: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12h7"/>' },

  // — Objetos / navegação principal —
  "home": { meaning: "início", keywords: ["house", "start", "dashboard"], body: '<path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>' },
  "user": { meaning: "pessoa / perfil", keywords: ["person", "account", "profile"], body: '<circle cx="12" cy="8" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/>' },
  "users": { meaning: "grupo de pessoas / equipe", keywords: ["team", "group", "contacts"], body: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18.5 20a6 6 0 0 0-3.2-5.3"/>' },
  "user-plus": { meaning: "adicionar pessoa", keywords: ["add user", "invite"], body: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M18 7v6"/><path d="M21 10h-6"/>' },
  "mail": { meaning: "e-mail / mensagem", keywords: ["email", "envelope", "inbox"], body: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>' },
  "message": { meaning: "conversa / atendimento", keywords: ["chat", "comment", "talk"], body: '<path d="M20 15a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9z"/>' },
  "bell": { meaning: "notificação", keywords: ["notification", "alert", "reminder"], body: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2z"/><path d="M10 20a2 2 0 0 0 4 0"/>' },
  "settings": { meaning: "ajustes / configuração", keywords: ["gear", "config", "preferences"], body: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M22 12h-3"/><path d="M5 12H2"/><path d="M18.4 5.6l-2 2"/><path d="M7.6 16.4l-2 2"/><path d="M18.4 18.4l-2-2"/><path d="M7.6 7.6l-2-2"/>' },
  "calendar": { meaning: "data / agenda", keywords: ["date", "schedule", "event"], body: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16"/><path d="M8 3v4"/><path d="M16 3v4"/>' },
  "lock": { meaning: "seguro / privado", keywords: ["secure", "private", "password"], body: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>' },
  "phone": { meaning: "telefone / ligação", keywords: ["call", "tel"], body: '<path d="M6 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>' },
  "file": { meaning: "documento / arquivo", keywords: ["document", "page", "invoice"], body: '<path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4"/>' },

  // — Mídia / gravação — o vocabulário de quem GRAVA e TOCA algo (mensagem de
  // voz, anexo de foto, reprodução). Faltava pelo mesmo motivo que faltou o de
  // navegação: a curadoria nasceu vestindo tela de cadastro, onde nada toca e
  // nada grava. A ausência não apareceu como erro — apareceu como o consumidor
  // importando ícone de outra biblioteca dentro do composer de áudio, com dois
  // estilos de desenho na mesma barra.
  // Dois sinais de confirmação: o primeiro é "chegou", o segundo é "foi visto".
  // É vocabulário de MENSAGERIA (a convenção que o WhatsApp popularizou), e
  // entra porque o conceito "entregue ≠ lido" existe em qualquer produto que
  // troca mensagem — sem ele o consumidor mantinha uma segunda biblioteca de
  // ícones viva por causa de um glifo.
  "check-double": { meaning: "entregue e lido", keywords: ["delivered", "read", "seen", "double check"], body: '<path d="M2 12.5l3.5 3.5L13 8"/><path d="M11 16l3.5-3.5"/><path d="M13.5 11.5L22 3"/>' },
  "pause": { meaning: "pausar reprodução", keywords: ["stop temporarily", "audio", "video"], body: '<path d="M9 5v14"/><path d="M15 5v14"/>' },
  "mic": { meaning: "gravar voz", keywords: ["microphone", "record", "audio", "voice"], body: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>' },
  "music": { meaning: "áudio / faixa de som", keywords: ["audio", "sound", "note", "track"], body: '<circle cx="7" cy="17" r="3"/><circle cx="18" cy="15" r="3"/><path d="M10 17V6l11-2v11"/>' },
  "image": { meaning: "imagem / foto", keywords: ["photo", "picture", "attachment"], body: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M4 17l5-4 4 3 3-2 4 3"/>' },
  "camera": { meaning: "tirar foto / capturar", keywords: ["photo", "capture", "webcam"], body: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>' },
  "file-text": { meaning: "documento com texto", keywords: ["document", "note", "content", "page"], body: '<path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4"/><path d="M8.5 12h7"/><path d="M8.5 16h5"/>' },
  "clock": { meaning: "hora / duração", keywords: ["time", "duration", "schedule", "elapsed"], body: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.5 2"/>' },
  "sliders": { meaning: "ajuste fino / filtros avançados", keywords: ["filters", "tune", "controls", "advanced"], body: '<path d="M4 8h10"/><path d="M18 8h2"/><circle cx="16" cy="8" r="2"/><path d="M4 16h4"/><path d="M12 16h8"/><circle cx="10" cy="16" r="2"/>' },
  "rotate": { meaning: "recomeçar / desfazer para o estado inicial", keywords: ["reset", "undo", "restart", "revert"], body: '<path d="M4 12a8 8 0 1 0 8-8 8 8 0 0 0-5.7 2.4L4 9"/><path d="M4 4v5h5"/>' },

  // — Dados / métricas —
  "dashboard": { meaning: "painel / visão geral", keywords: ["grid", "overview", "panel"], body: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="4" rx="1"/><rect x="13" y="10" width="7" height="10" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/>' },
  "chart-bar": { meaning: "relatório / gráfico", keywords: ["report", "analytics", "stats"], body: '<path d="M4 20h16"/><path d="M6 20v-8"/><path d="M12 20V5"/><path d="M18 20v-11"/>' },
  "trending-up": { meaning: "tendência de crescimento", keywords: ["growth", "increase", "up"], body: '<path d="M4 16l5-5 4 4 7-7"/><path d="M15 8h5v5"/>' },

  // — Status (acompanham sempre um 2º sinal — P17) —
  "alert-circle": { meaning: "atenção / aviso", keywords: ["warning", "attention", "caution"], body: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v5"/><path d="M12 16h.01"/>' },
  "info-circle": { meaning: "informação", keywords: ["info", "note"], body: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><path d="M12 8h.01"/>' },
  "check-circle": { meaning: "sucesso / validado", keywords: ["success", "done", "valid"], body: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>' },

  // — UI geral —
  "menu": { meaning: "menu / navegação", keywords: ["hamburger", "nav"], body: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>' },
  "more": { meaning: "mais ações", keywords: ["options", "overflow", "dots"], body: '<path d="M12 6h.01"/><path d="M12 12h.01"/><path d="M12 18h.01"/>' },
  "moon": { meaning: "tema escuro", keywords: ["dark", "night", "theme"], body: '<path d="M20 14a8 8 0 1 1-10-10 6 6 0 0 0 10 10z"/>' },
  "help": { meaning: "ajuda", keywords: ["question", "support", "faq"], body: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 2-2.3 3.5"/><path d="M12 17h.01"/>' },
  "logout": { meaning: "sair da conta", keywords: ["sign out", "exit"], body: '<path d="M14 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8"/><path d="M17 8l4 4-4 4"/><path d="M21 12H9"/>' },
  "login": { meaning: "entrar na conta", keywords: ["sign in", "enter"], body: '<path d="M10 4h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8"/><path d="M7 8l-4 4 4 4"/><path d="M3 12h12"/>' },
};

export const ICON_NAMES = Object.keys(ICONS);

/** Monta o SVG completo de um ícone (string). size = px (use o token --su-icon-* na borda de consumo). */
export function iconSvg(name, { size = 20, label } = {}) {
  const ic = ICONS[name];
  if (!ic) throw new Error(`ícone fora da biblioteca curada: "${name}" (ICONOGRAPHY §6 — não invente, curadoria governada)`);
  const a11y = label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ICON_STYLE.viewBox}" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${ICON_STYLE.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${ic.body}</svg>`;
}
