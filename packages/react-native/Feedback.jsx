import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useTheme } from "./theme.jsx";

/** Spinner (RN) — ActivityIndicator com a cor de ação. */
export function Spinner({ size = "small" }) {
  const { c } = useTheme();
  return <ActivityIndicator size={size} color={c.action} />;
}

/** ProgressBar (RN) — 0..100. */
export function ProgressBar({ value = 0 }) {
  const { c, radius } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={{ height: 8, backgroundColor: c.surfaceSunken, borderRadius: radius.full, overflow: "hidden" }}>
      <View style={{ width: `${pct}%`, height: "100%", backgroundColor: c.action, borderRadius: radius.full }} />
    </View>
  );
}

/** EmptyState (RN) — ícone (do produto) + título + descrição + ação. */
export function EmptyState({ icon, title, description, action }) {
  const { c, space } = useTheme();
  return (
    <View style={{ alignItems: "center", padding: space[8], gap: 6 }}>
      {icon}
      {title ? <Text style={{ fontSize: 15, fontWeight: "500", color: c.textPrimary }}>{title}</Text> : null}
      {description ? <Text style={{ fontSize: 13, color: c.textSecondary, textAlign: "center" }}>{description}</Text> : null}
      {action}
    </View>
  );
}
