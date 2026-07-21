// @studio-ux-ds/react — barrel. Cada componente num arquivo (tree-shakeable).
// Adapter de runtime sobre packages/components/components.css + packages/tokens/tokens.css.

// Fundamentais
export { Button, IconButton } from "./Button.jsx";
export { Badge } from "./Badge.jsx";
export { Avatar, Link, Tag, Banner, CommandPalette } from "./Misc.jsx";

// Formulário
export { Field, Input, PhoneInput } from "./Field.jsx";
export { Select, Checkbox, Radio, Switch, SegmentedControl } from "./Controls.jsx";
export { NumericInput, TextArea, Combobox, FileUpload, DatePicker } from "./Inputs.jsx";
export { Stepper } from "./Stepper.jsx";

// Dados
export { Card, StatCard } from "./Card.jsx";
export { DataTable } from "./DataTable.jsx";
export { DescriptionList, Timeline, Pagination, Accordion } from "./Data.jsx";
export { EmptyState, Skeleton, Spinner, ProgressBar } from "./Feedback.jsx";

// Navegação
export { Sidebar, NavItem, TopBar, Breadcrumb } from "./Shell.jsx";
export { Tabs } from "./Tabs.jsx";

// Feedback / overlay
export { Modal, ConfirmDialog } from "./Modal.jsx";
export { Drawer, Sheet, Menu, Tooltip, Popover } from "./Overlay.jsx";
export { ToastProvider, useToast } from "./Toast.jsx";

// Padrões · Patterns (composição de moldes de tela — STUDIO_UX_TEMPLATES)
export { PageHeader } from "./patterns/PageHeader.jsx";
export { ListScreen } from "./patterns/ListScreen.jsx";
export { AppShell } from "./patterns/AppShell.jsx";
export { Customize } from "./patterns/Customize.jsx";

// Mecanismo de tema/accent do sistema (sem React — chame applyTheme antes do render).
export {
  SU_ACCENTS, SU_THEMES, configureTheme,
  getAccent, setAccent, getTheme, setTheme,
  isDark, applyTheme, watchSystemTheme,
} from "./theme.js";
