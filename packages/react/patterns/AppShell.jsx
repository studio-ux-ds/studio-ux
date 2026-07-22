import React, { useEffect, useRef, useState } from "react";
import { Sidebar, NavItem, TopBar, Breadcrumb } from "../Shell.jsx";
import { Drawer } from "../Overlay.jsx";
import { IconButton } from "../Button.jsx";
import { Avatar } from "../Misc.jsx";
import { DSIcon } from "../DSIcon.jsx";
import { Customize } from "./Customize.jsx";
import { getTheme, setTheme, isDark, getLayout, getLocale } from "../theme.js";

const shellCopy = {
  "pt-BR": { menu: "Abrir menu", expand: "Expandir menu", collapse: "Recolher menu", search: "Buscar", openSearch: "Abrir busca de comandos", notifications: "Notificações", help: "Ajuda", light: "Modo claro", dark: "Modo escuro", customize: "Personalizar", logout: "Sair", navigation: "Navegação principal", newNotifications: "novas" },
  en: { menu: "Open menu", expand: "Expand menu", collapse: "Collapse menu", search: "Search", openSearch: "Open command search", notifications: "Notifications", help: "Help", light: "Light mode", dark: "Dark mode", customize: "Customize", logout: "Sign out", navigation: "Main navigation", newNotifications: "new" },
};

// AppShell — o MOLDE da casca (arquétipo), não a decoração. Compõe os átomos que
// o DS já tem (Sidebar/NavItem/TopBar/Breadcrumb/Drawer) e trava as invariantes que
// fazem a casca ficar idêntica ao Flux em posição e comportamento:
//   • P22 — a página só preenche a REGIÃO de conteúdo; nunca redesenha a casca.
//   • P6  — a TopBar carrega CONTEXTO (breadcrumb/período), busca, notificações, ajuda
//           e menu do usuário. A ação primária da tela mora no PageHeader, nunca aqui.
//   • P17 — o item de nav ativo sinaliza além da cor (barra + peso + aria-current).
//   • P4  — Desktop: Sidebar fixa. Mobile (≤767px): Sidebar vira Drawer (hambúrguer).
//   • Sidebar colapsável no desktop, com estado LEMBRADO; rodapé em 2 blocos
//     (atalhos + bloco de versão passivo).
//   • Gatilho "Personalizar" no menu do usuário → abre o painel Customize (tema/accent).

function useNarrow(maxWidth = 767) {
  const q = `(max-width: ${maxWidth}px)`;
  const read = () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q).matches : false);
  const [narrow, setNarrow] = useState(read);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(q);
    const on = () => setNarrow(mql.matches);
    on();
    mql.addEventListener ? mql.addEventListener("change", on) : mql.addListener(on);
    return () => (mql.removeEventListener ? mql.removeEventListener("change", on) : mql.removeListener(on));
  }, [q]);
  return narrow;
}

// Estado booleano lembrado em localStorage (colapso da sidebar).
function useRemembered(key, initial) {
  const read = () => {
    if (typeof window === "undefined") return initial;
    try { const v = window.localStorage.getItem(key); return v == null ? initial : v === "1"; } catch { return initial; }
  };
  const [val, setVal] = useState(read);
  const set = (next) => {
    setVal(next);
    try { window.localStorage.setItem(key, next ? "1" : "0"); } catch { /* sem storage */ }
  };
  return [val, set];
}

// Normaliza `nav` para seções: aceita [{section?, items:[…]}] ou uma lista simples de itens.
function toSections(nav) {
  if (!Array.isArray(nav)) return [];
  if (nav.length && nav[0] && Array.isArray(nav[0].items)) return nav;
  return [{ items: nav }];
}

// Um item da nav é ou uma folha ({icon,label,href,active}) ou um GRUPO colapsável
// ({group, icon, items:[folhas…], defaultOpen}). O grupo é acordeão: um aberto por
// vez, e nasce aberto no grupo que contém o item ativo.
const isGroup = (it) => it && Array.isArray(it.items);

function NavList({ sections, collapsed, onNavigate, onExpandRequest }) {
  const initialOpen = () => {
    for (const sec of sections)
      for (const it of sec.items || [])
        if (isGroup(it) && (it.items.some((c) => c.active) || it.defaultOpen)) return it.group;
    return null;
  };
  const [openGroup, setOpenGroup] = useState(initialOpen);

  const leaf = (it, key) => (
    <NavItem
      key={key}
      icon={it.icon}
      active={it.active}
      href={it.href}
      title={collapsed ? it.label : undefined}
      onClick={(e) => { it.onClick && it.onClick(e); onNavigate && onNavigate(); }}
    >
      {!collapsed && it.label}
    </NavItem>
  );

  return (
    <>
      {sections.map((sec, i) => (
        <div key={i} className="su-nav__section">
          {sec.section && !collapsed && <div className="su-nav__label">{sec.section}</div>}
          {(sec.items || []).map((it, j) =>
            isGroup(it) ? (
              <NavGroup
                key={j}
                group={it}
                collapsed={collapsed}
                open={openGroup === it.group}
                onToggle={() => {
                  if (collapsed) { onExpandRequest && onExpandRequest(); setOpenGroup(it.group); }
                  else setOpenGroup((p) => (p === it.group ? null : it.group));
                }}
                onNavigate={onNavigate}
                renderLeaf={leaf}
              />
            ) : (
              leaf(it, j)
            )
          )}
        </div>
      ))}
    </>
  );
}

/** Grupo colapsável da navegação — botão com chevron + filhos recuados. */
function NavGroup({ group, collapsed, open, onToggle, renderLeaf }) {
  const groupActive = group.items.some((c) => c.active);
  const cls = ["su-nav__item", "su-nav__group-btn", groupActive && !open && "su-nav__item--active"].filter(Boolean).join(" ");
  return (
    <div className="su-nav__group">
      <button type="button" className={cls} aria-expanded={open} title={collapsed ? group.group : undefined} onClick={onToggle}>
        {group.icon && <DSIcon name={group.icon} size="sm" />}
        {!collapsed && <span className="su-nav__group-label">{group.group}</span>}
        {!collapsed && <DSIcon name="chevron-right" size="sm" className={["su-nav__chev", open && "su-nav__chev--open"].filter(Boolean).join(" ")} />}
      </button>
      {open && !collapsed && (
        <div className="su-nav__children">
          {group.items.map((c, k) => renderLeaf(c, k))}
        </div>
      )}
    </div>
  );
}

/** Dropdown do usuário — fecha ao clicar fora ou Esc. */
function TopNavList({ sections, ariaLabel }) {
  const leaf = (item, key) => <a key={key} className={["su-topnav__item", item.active && "su-topnav__item--active"].filter(Boolean).join(" ")}
    aria-current={item.active ? "page" : undefined} href={item.href} onClick={item.onClick}>
    {item.icon && <DSIcon name={item.icon} size="sm" />}{item.label}
  </a>;
  return <nav className="su-topnav" aria-label={ariaLabel}>
    {sections.flatMap((section) => section.items || []).map((item, index) => isGroup(item) ? (
      <details key={index} className="su-topnav__group">
        <summary><DSIcon name={item.icon} size="sm" />{item.group}<DSIcon name="chevron-down" size="sm" /></summary>
        <div className="su-topnav__menu">{item.items.map((child, childIndex) => leaf(child, childIndex))}</div>
      </details>
    ) : leaf(item, index))}
  </nav>;
}

function UserMenu({ user, items, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <div ref={ref} className="su-menu su-usermenu" role="menu">
      {user && (
        <div className="su-usermenu__head">
          <div className="su-usermenu__name">{user.name}</div>
          {user.email && <div className="su-usermenu__mail">{user.email}</div>}
        </div>
      )}
      {items.map((it, i) =>
        it.separator ? (
          <div key={i} className="su-menu__sep" />
        ) : (
          <div key={i} role="menuitem"
            className={["su-menu__item", it.danger && "su-menu__item--danger"].filter(Boolean).join(" ")}
            onClick={() => { onClose(); it.onClick && it.onClick(); }}>
            {it.icon && <DSIcon name={it.icon} size="sm" />}
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.hint && <span className="su-usermenu__hint">{it.hint}</span>}
          </div>
        )
      )}
    </div>
  );
}

export function AppShell({
  brand,
  nav,
  footer,
  version,
  breadcrumb,
  topbarContext,
  user,
  userMenuItems = [],
  onCommandPalette,
  notifications,
  onNotifications,
  onHelp,
  customize = false,          // true liga o painel embutido; ou {accents, themes} p/ configurar
  onCustomize,                // sobrescreve a abertura do painel embutido, se quiser um próprio
  onPreferencesChange,
  onLogout,
  children,
}) {
  const narrow = useNarrow();
  const [collapsed, setCollapsed] = useRemembered("su_sidebar_collapsed", false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [custOpen, setCustOpen] = useState(false);
  // Espelha o tema atual só para rotular o atalho rápido no menu (Claro↔Escuro).
  const [, force] = useState(0);
  const sections = toSections(nav);
  const layout = getLayout();
  const locale = getLocale();
  const text = shellCopy[locale] || shellCopy["pt-BR"];

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!onCommandPalette) return undefined;
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onCommandPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCommandPalette]);

  const openCustomize = () => {
    if (onCustomize) return onCustomize();
    if (customize) setCustOpen(true);
  };
  const quickToggleTheme = () => {
    // Atalho: alterna Claro↔Escuro (sai de "Sistema" para a escolha explícita oposta ao atual).
    setTheme(isDark() ? "light" : "dark");
    force((n) => n + 1);
  };

  const menuItems = [
    ...userMenuItems,
    ...(userMenuItems.length ? [{ separator: true }] : []),
    { icon: isDark() ? "sun" : "moon", label: isDark() ? text.light : text.dark, onClick: quickToggleTheme },
    ...(customize || onCustomize ? [{ icon: "adjustments", label: text.customize, onClick: openCustomize }] : []),
    ...(onLogout ? [{ separator: true }, { icon: "logout", label: text.logout, danger: true, onClick: onLogout }] : []),
  ];

  const sidebarNode = (mobile) => (
    <Sidebar
      brand={brand}
      footer={
        <div className="su-sidebar__foot">
          {footer && <div className="su-sidebar__foot-actions">{footer}</div>}
          {version && <div className="su-sidebar__version" aria-hidden="true">{version}</div>}
        </div>
      }
    >
      <NavList
        sections={sections}
        collapsed={!mobile && collapsed}
        onNavigate={mobile ? () => setMobileOpen(false) : undefined}
        onExpandRequest={!mobile ? () => setCollapsed(false) : undefined}
      />
    </Sidebar>
  );

  return (
    <div className={["su-appshell", !narrow && layout === "sidebar" && collapsed && "su-appshell--collapsed", !narrow && layout === "topnav" && "su-appshell--topnav"].filter(Boolean).join(" ")}>
      {/* Sidebar — desktop fixa; mobile em off-canvas à esquerda */}
      {!narrow && layout === "sidebar" && sidebarNode(false)}
      {narrow && mobileOpen && (
        <div className="su-appshell__scrim" onClick={(e) => e.target === e.currentTarget && setMobileOpen(false)}>
          <div className="su-appshell__offcanvas">{sidebarNode(true)}</div>
        </div>
      )}

      <div className="su-appshell__main">
        <TopBar>
          <div className="su-topbar__left">
            {narrow ? (
              <IconButton icon="menu-2" aria-label={text.menu} onClick={() => setMobileOpen(true)} />
            ) : layout === "sidebar" ? (
              <IconButton
                icon={collapsed ? "layout-sidebar-left-expand" : "layout-sidebar-left-collapse"}
                aria-label={collapsed ? text.expand : text.collapse}
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : null}
            {!narrow && layout === "topnav" && <><div className="su-topnav__brand">{brand}</div><TopNavList sections={sections} ariaLabel={text.navigation} /></>}
            {breadcrumb && <Breadcrumb items={breadcrumb} />}
            {topbarContext && <div className="su-topbar__context">{topbarContext}</div>}
          </div>

          <div className="su-topbar__right">
            {onCommandPalette && (
              <button className="su-topbar__cmdk" onClick={onCommandPalette} aria-label={text.openSearch} aria-keyshortcuts="Control+K Meta+K">
                <DSIcon name="search" size="sm" />
                <span className="su-topbar__cmdk-label">{text.search}</span>
              </button>
            )}
            {onNotifications && (
              <span className="su-topbar__bell">
                <IconButton icon="bell" aria-label={text.notifications} onClick={onNotifications} />
                {notifications > 0 && <span className="su-topbar__bell-dot" aria-label={`${notifications} ${text.newNotifications}`}>{notifications > 9 ? "9+" : notifications}</span>}
              </span>
            )}
            {onHelp && <IconButton icon="help" aria-label={text.help} onClick={onHelp} />}
            {user && (
              <div className="su-topbar__user">
                <button className="su-topbar__user-btn" aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
                  <Avatar src={user.avatarUrl} initials={user.initials} size="sm" alt={user.name} />
                  {!narrow && <span className="su-topbar__user-name">{user.name}</span>}
                  <DSIcon name="chevron-down" size="sm" className="su-topbar__user-chevron" />
                </button>
                {menuOpen && <UserMenu user={user} items={menuItems} onClose={() => setMenuOpen(false)} />}
              </div>
            )}
          </div>
        </TopBar>

        {/* Região de conteúdo — a página vive SÓ aqui (P22) */}
        <main className="su-appshell__content">{children}</main>
      </div>

      {/* Painel Customize embutido (Drawer a partir do menu do usuário) */}
      {customize && !onCustomize && (
        <Drawer open={custOpen} onClose={() => setCustOpen(false)} title={text.customize}>
          <Customize
            accents={typeof customize === "object" ? customize.accents : undefined}
            onChange={(preferences) => { force((n) => n + 1); onPreferencesChange && onPreferencesChange(preferences); }}
          />
        </Drawer>
      )}
    </div>
  );
}
