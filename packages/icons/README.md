# @studio-ux-ds/icons

Biblioteca **curada** de ícones do Studio UX. Implementa `docs/STUDIO_UX_ICONOGRAPHY.md`.

- **Estilo único (§3):** grade 24, traço 1.5, terminações redondas, sem cor crua — cor via `currentColor` (herda o token de texto do contexto, §4).
- **Uma metáfora, um significado (§6, P2):** cada ícone tem nome semântico em inglês e um significado documentado. Antes de desenhar um novo, confira se a biblioteca já cobre o conceito.
- **Fonte única:** `icons.js` (`ICONS`, `ICON_NAMES`, `iconSvg`). O build valida o contrato de estilo e emite `icons/<name>.svg` + `manifest.json`.

## Usar

**Web (React):**
```jsx
import { Icon } from "@studio-ux-ds/icons/react.jsx";
import "@studio-ux-ds/icons/icons.css";       // tamanho por token
import "@studio-ux-ds/tokens/tokens.css";      // define --su-icon-*

<Icon name="search" />                          {/* decorativo: aria-hidden */}
<Icon name="trash" size="lg" label="Excluir" /> {/* significado: role=img + aria-label */}
```

**Agnóstico (string SVG):**
```js
import { iconSvg } from "@studio-ux-ds/icons";
el.innerHTML = iconSvg("check", { size: 20, label: "Concluído" });
```

**Nativo (React Native):** consome o mesmo `ICONS[name].body` via `react-native-svg` (`SvgXml`) — mesma fonte, mesmo estilo.

## Tamanho e acessibilidade

- Tamanho é **token** (`--su-icon-sm/md/lg` = 16/20/24). Nunca `width:18px` à mão (§4).
- Ícone que carrega significado sozinho recebe `label` (vira `aria-label`); decorativo nasce `aria-hidden` (§5).
- Ação destrutiva nunca é ícone solto sem rótulo (P13/§5) — passe `label` e acompanhe de texto.

## Curadoria (adicionar um ícone)

Ato **governado** (SemVer): 1) confirme que nenhum ícone existente cobre o conceito (evita sinônimo visual, P2); 2) desenhe na grade 24, traço 1.5, `currentColor`, terminações redondas; 3) adicione a entrada em `icons.js` com `meaning` + `keywords`; 4) rode `npm run build:icons` — o validador recusa o que quebrar o contrato de estilo (§3/§7). O código é a fonte; edita-se `icons.js` + redeploy, não o SVG solto.

## Fronteiras

Não define tamanhos/cores (é `tokens/*` — este pacote os **consome**), nem os componentes que usam ícones (é `components`/adapters). É só a biblioteca curada de glifos + o `<Icon>` que a aplica.
