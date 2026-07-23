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
      // Os pacotes reais são publicados como .jsx cru; os aliases os servem direto
      // da fonte, para as stories importarem exatamente como um sistema consumidor
      // (subpath "./mobile" bate com o `exports` de packages/react/package.json).
      "@studio-ux-ds/react/mobile": join(here, "../packages/react/mobile.js"),
      "@studio-ux-ds/react": join(here, "../packages/react/index.js"),
    };
    return cfg;
  },
};

export default config;
