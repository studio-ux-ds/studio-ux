# @studio-ux-ds/react/mobile — adapter React para mobile-web (PWA)

Wrappers React finos sobre as classes `.su-m-*` do `@studio-ux-ds/mobile` (mobile.css).
É o **irmão mobile-web** do adapter Desktop (`@studio-ux-ds/react`) — não é o desktop
"responsivo". Serve produtos que fazem app mobile na web em React (ex.: PWA do
garçom do Delivery). Segue o Princípio **P4** (Desktop ≠ Mobile: dois produtos).

## Uso

```jsx
import "@studio-ux-ds/tokens/tokens.css";
import "@studio-ux-ds/mobile/mobile.css";
import { TopBar, BottomNav, ListItem, Cta } from "@studio-ux-ds/react/mobile";
```

## Regras (iguais ao adapter Desktop)

- **Runtime descartável.** Só embrulha classe CSS; toda a verdade visual vem do
  token/CSS. Trocar React por outra tech não muda o design.
- **Props → estado, nunca valor literal.** `tone`, `variant`, `active`… nunca cor/px.
- **Ícones vêm do Studio UX** (`icon="nome"` → SVG local curado, sem webfont externa);
  a **câmera** do `ScannerFrame` e o conteúdo de avatar são do produto.
- **Gesto sempre com alternativa** (`SwipeableRow` expõe `onLongPress`; as mesmas
  ações devem existir num menu) — P19.

## Componentes

Shell: `TopBar`, `Greeting`, `SearchBar`, `BottomNav`, `Footer`, `Cta`.
Lista: `Card`, `List`, `ListItem`, `Stat`, `Chips`, `Chip`.
Detalhe: `DetailHeader`, `MobileTabs`, `QuickActions`, `QuickAction`.
Feedback: `OfflineBanner`, `SyncBanner`, `Banner`, `Notification`, `StepBar`.
Form: `Field`, `Input`, `PhoneInput`, `Sheet`.
Interação: `SwipeableRow`, `ScannerFrame`.
