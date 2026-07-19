// @studio-ux-ds/react-native — adapter Mobile nativo. IRMÃO do adapter web (P4):
// mesmos VALORES de token, primitivas próprias (View/Text/Pressable), layout próprio.
export { ThemeProvider, useTheme, palette, space, radius, fontSize, fontWeight } from "./theme.jsx";
export { Button, Cta } from "./Button.jsx";
export { Badge, Card, Stat, Chip, Divider } from "./Primitives.jsx";
export { Field, Input } from "./Field.jsx";
export { Greeting, SearchBar, PhoneInput, Footer } from "./Extras.jsx";
export { TopBar, ListItem, BottomNav } from "./Shell.jsx";
export { DetailHeader, MobileTabs, QuickActions, QuickAction } from "./DetailKit.jsx";
export { OfflineBanner, SyncBanner, Banner, Notification } from "./Banners.jsx";
export { SwipeableRow, ScannerFrame } from "./Interact.jsx";
export { Sheet, StepBar } from "./Overlay.jsx";
// Paridade com o catálogo desktop (v1.1.1): formulário, primitivos, feedback, overlays, dados.
export { Switch, Checkbox, Radio, Select, SegmentedControl, NumericInput, TextArea } from "./Inputs.jsx";
export { Avatar, Tag, Link } from "./Basics.jsx";
export { Spinner, ProgressBar, EmptyState } from "./Feedback.jsx";
export { Modal, ConfirmDialog, Menu } from "./Dialogs.jsx";
export { Accordion, DescriptionList, Timeline } from "./Data.jsx";
