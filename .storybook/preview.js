import React from "react";
// O consumidor real carrega tokens + CSS de componentes; o preview faz o mesmo.
import "../packages/tokens/tokens.css";
import "../packages/components/components.css";
import "./preview.css";

/** Alterna [data-theme] no <html> — mostra os tokens claro/escuro reais do DS. */
const withTheme = (Story, context) => {
  const theme = context.globals.theme || "light";
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background = "var(--su-surface-base)";
  }
  return React.createElement(
    "div",
    { className: "su-preview", "data-theme-scope": theme },
    React.createElement(Story)
  );
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: "Tema do Studio UX (tokens --su-*)",
      defaultValue: "light",
      toolbar: {
        title: "Tema",
        icon: "contrast",
        items: [
          { value: "light", title: "Claro", icon: "sun" },
          { value: "dark", title: "Escuro", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: "padded",
    options: {
      storySort: {
        order: [
          "Studio UX",
          ["Introdução"],
          "Referência visual",
          "Fundamentais",
          "Formulário",
          "Dados",
          "Feedback",
          "Navegação",
          "Overlays",
        ],
      },
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    docs: { toc: true },
    // O painel de acessibilidade continua disponível, mas o axe não roda sozinho a cada
    // story (evita ruído e custo de render) — o usuário dispara pelo painel quando quer.
    a11y: { manual: true },
  },
};

export default preview;
