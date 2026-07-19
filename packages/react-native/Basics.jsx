import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useTheme } from "./theme.jsx";

/** Avatar (RN) — imagem ou iniciais + indicador de status. */
export function Avatar({ source, initials, status, size = 36 }) {
  const { c } = useTheme();
  const sc = { online: c.successFg, busy: c.dangerFg, away: c.warningFg };
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: c.surfaceSunken, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {source ? <Image source={source} style={{ width: "100%", height: "100%" }} /> : <Text style={{ color: c.textSecondary, fontWeight: "500", fontSize: Math.round(size * 0.36) }}>{initials}</Text>}
      {status ? <View style={{ position: "absolute", right: -1, bottom: -1, width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: c.surfaceRaised, backgroundColor: sc[status] || c.textMuted }} /> : null}
    </View>
  );
}

/** Tag (RN) — chip removível (com "x"). */
export function Tag({ children, onRemove }) {
  const { c, radius } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: c.surfaceSunken, borderRadius: radius.full, paddingLeft: 9, paddingRight: onRemove ? 4 : 9, paddingVertical: 4, alignSelf: "flex-start" }}>
      <Text style={{ color: c.textSecondary, fontSize: 12, fontWeight: "500" }}>{children}</Text>
      {onRemove ? <Pressable onPress={onRemove} hitSlop={6}><Text style={{ color: c.textMuted, fontSize: 13 }}>✕</Text></Pressable> : null}
    </View>
  );
}

/** Link (RN) — texto acionável. `muted` = discreto. */
export function Link({ children, onPress, muted }) {
  const { c } = useTheme();
  return <Pressable onPress={onPress}><Text style={{ color: muted ? c.textMuted : c.action, fontWeight: "500" }}>{children}</Text></Pressable>;
}
