import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/**
 * Storybook do Studio UX — documenta o pacote REAL `@studio-ux-ds/react`.
 * As stories importam de "@studio-ux-ds/react" (aliasado para packages/react/index.js),
 * exatamente como um sistema consumidor importa. Nada é recriado aqui.
 */

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  docs: { autodocs: "tag" },
  async viteFinal(cfg) {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      // O pacote React real é publicado como .jsx cru; o alias o serve direto da fonte,
      // então as stories importam de "@studio-ux-ds/react" igual a um sistema consumidor.
      "@studio-ux-ds/react": join(here, "../packages/react/index.js"),
    };
    return cfg;
  },
};

export default config;
