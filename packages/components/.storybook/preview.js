// Studio UX Storybook — carrega os tokens congelados + as classes .su-* reais.
import '../../tokens/tokens.css';
import '../components.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: { storySort: { order: ['Introdução', 'Componentes'] } },
  },
};
export default preview;
