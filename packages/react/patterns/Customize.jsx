import React, { useEffect, useState } from "react";
import { SegmentedControl } from "../Controls.jsx";
import {
  SU_ACCENTS, SU_THEMES, SU_LAYOUTS, SU_LOCALES,
  getAccent, setAccent, getTheme, setTheme, getLayout, setLayout, getLocale, setLocale, watchSystemTheme,
} from "../theme.js";

// Customize reúne somente preferências de identidade e casca: tema, accent,
// variante de navegação e idioma. Não altera densidade, direção ou container.

const copy = {
  "pt-BR": {
    theme: "Tema", system: "“Sistema” acompanha o modo claro/escuro do seu aparelho.",
    accent: "Cor de destaque", selected: "Escolhida", accentHint: "Só muda a cor de ação (botões, links, destaques) — o resto do layout fica igual.",
    layout: "Layout", language: "Linguagem", contentHint: "O sistema consumidor traduz o próprio conteúdo para o idioma escolhido.",
    themes: { light: "Claro", dark: "Escuro", system: "Sistema" }, layouts: { sidebar: "Barra lateral", topnav: "Navegação superior" }, accents: { indigo: "Índigo", blue: "Azul", teal: "Verde-água", violet: "Violeta", amber: "Âmbar", rose: "Rosa", slate: "Ardósia" },
  },
  en: {
    theme: "Theme", system: "“System” follows your device light/dark preference.",
    accent: "Accent color", selected: "Selected", accentHint: "It only changes the action color (buttons, links and highlights) — the rest of the layout stays the same.",
    layout: "Layout", language: "Language", contentHint: "The consuming system translates its own content into the selected language.",
    themes: { light: "Light", dark: "Dark", system: "System" }, layouts: { sidebar: "Sidebar", topnav: "Top navigation" }, accents: { indigo: "Indigo", blue: "Blue", teal: "Teal", violet: "Violet", amber: "Amber", rose: "Rose", slate: "Slate" },
  },
};

function ChoiceGroup({ ariaLabel, items, value, onChange, icon }) {
  return <div className="su-customize__choices" role="radiogroup" aria-label={ariaLabel}>
    {items.map((item) => {
      const selected = value === item.id;
      return <button key={item.id} type="button" role="radio" aria-checked={selected}
        className={["su-customize__choice", selected && "su-customize__choice--on"].filter(Boolean).join(" ")}
        onClick={() => onChange(item.id)}>
        <i className={`ti ti-${icon[item.id]}`} aria-hidden="true" />
        <span>{item.label}</span>
        {selected && <i className="ti ti-check su-customize__check" aria-hidden="true" />}
      </button>;
    })}
  </div>;
}

export function Customize({ accents = SU_ACCENTS, onChange }) {
  const [accent, setAccentState] = useState(getAccent);
  const [theme, setThemeState] = useState(getTheme);
  const [layout, setLayoutState] = useState(getLayout);
  const [locale, setLocaleState] = useState(getLocale);
  const text = copy[locale] || copy["pt-BR"];
  const themeItems = SU_THEMES.map((item) => ({ ...item, label: text.themes[item.id] }));
  const layoutItems = SU_LAYOUTS.map((item) => ({ ...item, label: text.layouts[item.id] }));
  const localizedAccents = accents.map((item) => ({ ...item, label: text.accents[item.id] || item.label }));

  useEffect(() => watchSystemTheme(() => setThemeState(getTheme())), []);
  const emit = (next = {}) => onChange && onChange({ theme, accent, layout, locale, ...next });
  const changeTheme = (next) => { setTheme(next); setThemeState(next); emit({ theme: next }); };
  const changeAccent = (next) => { setAccent(next); setAccentState(next); emit({ accent: next }); };
  const changeLayout = (next) => { setLayout(next); setLayoutState(next); emit({ layout: next }); };
  const changeLocale = (next) => { setLocale(next); setLocaleState(next); emit({ locale: next }); };
  const current = localizedAccents.find((item) => item.id === accent);

  return <div className="su-customize">
    <section className="su-customize__block">
      <div className="su-customize__label">{text.theme}</div>
      <SegmentedControl items={themeItems} value={theme} onChange={changeTheme} />
      <p className="su-customize__hint">{text.system}</p>
    </section>

    <section className="su-customize__block">
      <div className="su-customize__label">{text.accent}</div>
      <div className="su-swatches" role="radiogroup" aria-label={text.accent}>
        {localizedAccents.map((item) => {
          const selected = accent === item.id;
          return <button key={item.id} type="button" role="radio" aria-checked={selected} aria-label={item.label} title={item.label}
            className={["su-swatch", selected && "su-swatch--on"].filter(Boolean).join(" ")} style={{ "--sw": item.hex }} onClick={() => changeAccent(item.id)}>
            {selected && <i className="ti ti-check" aria-hidden="true" />}
          </button>;
        })}
      </div>
      <p className="su-customize__hint">{text.selected}: <strong>{current?.label}</strong>. {text.accentHint}</p>
    </section>

    <section className="su-customize__block">
      <div className="su-customize__label">{text.layout}</div>
      <ChoiceGroup ariaLabel={text.layout} items={layoutItems} value={layout} onChange={changeLayout} icon={{ sidebar: "layout-sidebar-left", topnav: "layout-navbar" }} />
    </section>

    <section className="su-customize__block">
      <div className="su-customize__label">{text.language}</div>
      <ChoiceGroup ariaLabel={text.language} items={SU_LOCALES} value={locale} onChange={changeLocale} icon={{ "pt-BR": "language", en: "world" }} />
      <p className="su-customize__hint">{text.contentHint}</p>
    </section>
  </div>;
}
