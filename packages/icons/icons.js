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
  "download": { meaning: "baixar", keywords: ["save", "export"], body: '<path d="M12 4v11"/><path d="M8 11l4 4 4-4"/><path d="M5 19h14"/>' },
  "refresh": { meaning: "recarregar / sincronizar", keywords: ["reload", "sync", "retry"], body: '<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8"/><path d="M20 3v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 16"/><path d="M4 21v-5h5"/>' },
  "filter": { meaning: "filtrar lista", keywords: ["funnel", "refine"], body: '<path d="M4 5h16l-6 7v6l-4-2v-4z"/>' },

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
