import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "./theme.jsx";

/** Accordion (RN) — `items`={title,body}. Um aberto por vez. */
export function Accordion({ items = [] }) {
  const { c, radius, space } = useTheme();
  const [openIdx, setOpenIdx] = useState(-1);
  return (
    <View style={{ borderWidth: 1, borderColor: c.borderDefault, borderRadius: radius.lg, overflow: "hidden" }}>
      {items.map((it, i) => (
        <View key={i} style={i > 0 ? { borderTopWidth: 1, borderTopColor: c.borderSubtle } : null}>
          <Pressable onPress={() => setOpenIdx(openIdx === i ? -1 : i)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: space[4] }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: c.textPrimary }}>{it.title}</Text>
            <Text style={{ color: c.textMuted }}>{openIdx === i ? "▲" : "▼"}</Text>
          </Pressable>
          {openIdx === i ? <View style={{ paddingHorizontal: space[4], paddingBottom: space[4] }}><Text style={{ fontSize: 13, color: c.textSecondary, lineHeight: 19 }}>{it.body}</Text></View> : null}
        </View>
      ))}
    </View>
  );
}

/** DescriptionList (RN) — `items`={key,value}. */
export function DescriptionList({ items = [] }) {
  const { c, space } = useTheme();
  return (
    <View>
      {items.map((it, i) => (
        <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: space[2], borderTopWidth: i > 0 ? 1 : 0, borderTopColor: c.borderSubtle }}>
          <Text style={{ color: c.textSecondary, fontSize: 13 }}>{it.key}</Text>
          <Text style={{ color: c.textPrimary, fontSize: 13, fontWeight: "500" }}>{it.value}</Text>
        </View>
      ))}
    </View>
  );
}

/** Timeline (RN) — auditoria; `items`={title,meta,active}. */
export function Timeline({ items = [] }) {
  const { c, space } = useTheme();
  return (
    <View style={{ paddingLeft: space[2] }}>
      {items.map((it, i) => (
        <View key={i} style={{ flexDirection: "row", gap: 12, marginBottom: space[4] }}>
          <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: it.active ? c.action : c.borderStrong, marginTop: 4 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, color: c.textPrimary }}>{it.title}</Text>
            {it.meta ? <Text style={{ fontSize: 11, color: c.textMuted }}>{it.meta}</Text> : null}
          </View>
        </View>
      ))}
    </View>
  );
}
