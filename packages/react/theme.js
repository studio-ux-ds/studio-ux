// @studio-ux-ds/react — mecanismo de TEMA + ACCENT do sistema (v1.1.19).
// Promovido do theme.js do Finanças para o DS: agora é o DS quem sabe trocar
// tema/accent; cada app apenas consome. Sem dependência de React — pode (e deve)
// ser chamado ANTES do primeiro render para não haver flash (ver applyTheme).
//
// Contrato de tokens (packages/tokens/tokens.css):
//   tema  → <html data-theme="light|dark">  (ausente = segue o SO, prefers-color-scheme)
//   accent→ <html data-su-accent="indigo|blue|teal|violet|amber|rose|slate">
// Um accent repõe só o papel de ação (--su-action & cia); nunca layout/espaço (THEMES §5).
// Os 7 accents são AA-validados em claro e escuro (P18).

/** Paleta oficial. `hex` é a cor do swatch (tom claro), só para exibição no seletor. */
export const SU_ACCENTS = [
  { id: "indigo", label: "Índigo",      hex: "#4F46E5" }, // padrão do sistema
  { id: "blue",   label: "Azul",        hex: "#2563EB" },
  { id: "teal",   label: "Verde-água",  hex: "#0D8C82" },
  { id: "violet", label: "Violeta",     hex: "#7C3AED" },
  { id: "amber",  label: "Âmbar",       hex: "#B25E09" },
  { id: "rose",   label: "Rosa",        hex: "#E11D48" },
  { id: "slate",  label: "Ardósia",     hex: "#475569" },
];

export const SU_THEMES = [
  { id: "light",  label: "Claro" },
  { id: "dark",   label: "Escuro" },
  { id: "system", label: "Sistema" }, // segue o SO (sem data-theme forçado)
];

export const SU_LAYOUTS = [
  { id: "sidebar", label: "Barra lateral" },
  { id: "topnav", label: "Navegação superior" },
];

export const SU_LOCALES = [
  { id: "pt-BR", label: "Português (Brasil)" },
  { id: "en", label: "English" },
];

const DEFAULT_ACCENT = "indigo";
const DEFAULT_THEME = "system";
const DEFAULT_LAYOUT = "sidebar";
const DEFAULT_LOCALE = "pt-BR";

// Chaves de armazenamento. Trocáveis por app via configureTheme({ namespace })
// para não colidir quando vários sistemas rodam no mesmo domínio.
let ACCENT_KEY = "su_accent";
let THEME_KEY = "su_theme";
let LAYOUT_KEY = "su_layout";
let LOCALE_KEY = "su_locale";

/** Permite o app namespaçar as chaves (ex.: configureTheme({ namespace: "financas" })). */
export function configureTheme({ namespace } = {}) {
  if (namespace) {
    ACCENT_KEY = `${namespace}_su_accent`;
    THEME_KEY = `${namespace}_su_theme`;
    LAYOUT_KEY = `${namespace}_su_layout`;
    LOCALE_KEY = `${namespace}_su_locale`;
  }
}

const hasWindow = typeof window !== "undefined";
const root = () => document.documentElement;
const isAccent = (a) => SU_ACCENTS.some((x) => x.id === a);
const isTheme = (t) => t === "light" || t === "dark" || t === "system";
const isLayout = (layout) => SU_LAYOUTS.some((x) => x.id === layout);
const isLocale = (locale) => SU_LOCALES.some((x) => x.id === locale);

function read(key, fallback) {
  if (!hasWindow) return fallback;
  try { return window.localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function write(key, value) {
  if (!hasWindow) return;
  try { window.localStorage.setItem(key, value); } catch { /* modo privado/sem storage */ }
}

/* ---------------- Accent ---------------- */

export function getAccent() {
  const a = read(ACCENT_KEY, DEFAULT_ACCENT);
  return isAccent(a) ? a : DEFAULT_ACCENT;
}

export function setAccent(a) {
  const valid = isAccent(a) ? a : DEFAULT_ACCENT;
  write(ACCENT_KEY, valid);
  if (hasWindow) root().dataset.suAccent = valid; // → <html data-su-accent="...">
  return valid;
}

/* ---------------- Tema ---------------- */

export function getTheme() {
  const t = read(THEME_KEY, DEFAULT_THEME);
  return isTheme(t) ? t : DEFAULT_THEME;
}

export function setTheme(t) {
  const valid = isTheme(t) ? t : DEFAULT_THEME;
  write(THEME_KEY, valid);
  if (hasWindow) {
    if (valid === "system") delete root().dataset.theme; // ausente = segue o SO
    else root().dataset.theme = valid;                   // "light" | "dark"
  }
  return valid;
}

/* ---------------- Layout e idioma ---------------- */

export function getLayout() {
  const layout = read(LAYOUT_KEY, DEFAULT_LAYOUT);
  return isLayout(layout) ? layout : DEFAULT_LAYOUT;
}

export function setLayout(layout) {
  const valid = isLayout(layout) ? layout : DEFAULT_LAYOUT;
  write(LAYOUT_KEY, valid);
  if (hasWindow) root().dataset.suLayout = valid;
  return valid;
}

export function getLocale() {
  const locale = read(LOCALE_KEY, DEFAULT_LOCALE);
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function setLocale(locale) {
  const valid = isLocale(locale) ? locale : DEFAULT_LOCALE;
  write(LOCALE_KEY, valid);
  if (hasWindow) root().lang = valid;
  return valid;
}

/** `true` se, no estado atual, a interface está renderizando no escuro. */
export function isDark() {
  const t = getTheme();
  if (t === "dark") return true;
  if (t === "light") return false;
  return hasWindow && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

/**
 * Aplica accent+tema salvos. Chame o mais cedo possível (antes do render, ex.
 * inline no <head> ou no topo do main.jsx) para não haver flash de tema.
 */
export function applyTheme() {
  setAccent(getAccent());
  setTheme(getTheme());
  setLayout(getLayout());
  setLocale(getLocale());
}

/**
 * Observa mudança do tema do SO enquanto o usuário está em "Sistema", para
 * reagir ao vivo. Retorna uma função de limpeza. `cb` recebe isDark() atual.
 */
export function watchSystemTheme(cb) {
  if (!hasWindow || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => { if (getTheme() === "system") cb?.(mq.matches); };
  mq.addEventListener?.("change", handler);
  return () => mq.removeEventListener?.("change", handler);
}
