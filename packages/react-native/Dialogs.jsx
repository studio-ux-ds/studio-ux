import React from "react";
import { View, Text, Pressable, Modal as RNModal } from "react-native";
import { useTheme } from "./theme.jsx";
import { Button } from "./Button.jsx";

/** Modal / Dialog (RN) — sobreposição centralizada. */
export function Modal({ open, onClose, title, children, footer }) {
  const { c, radius, space } = useTheme();
  return (
    <RNModal visible={!!open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: "rgba(20,22,30,0.44)", alignItems: "center", justifyContent: "center", padding: space[4] }} onPress={onClose}>
        <Pressable style={{ width: "100%", maxWidth: 420, backgroundColor: c.surfaceOverlay, borderRadius: radius.xl, overflow: "hidden" }} onPress={() => {}}>
          {title ? <Text style={{ padding: space[5], paddingBottom: space[2], fontSize: 16, fontWeight: "600", color: c.textPrimary }}>{title}</Text> : null}
          <View style={{ paddingHorizontal: space[5], paddingBottom: space[4] }}>{children}</View>
          {footer ? <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8, paddingVertical: space[3], paddingHorizontal: space[5], borderTopWidth: 1, borderTopColor: c.borderSubtle }}>{footer}</View> : null}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

/** ConfirmDialog (RN) — os 5 patrasques na base nativa (P13). */
export function ConfirmDialog({ open, title, message, confirmLabel = "Confirmar", danger, loading, onCancel, onConfirm }) {
  const { c } = useTheme();
  return (
    <Modal open={open} onClose={onCancel} title={title}
      footer={
        <>
          <Button variant="ghost" onPress={onCancel}>Cancelar</Button>
          <Button variant={danger ? "danger" : "primary"} onPress={onConfirm} disabled={loading}>{confirmLabel}</Button>
        </>
      }>
      <Text style={{ color: c.textSecondary, fontSize: 14, lineHeight: 20 }}>{message}</Text>
    </Modal>
  );
}

/** Menu (RN) — action sheet (folha de ações) na base. `items`={label,onPress,icon?,danger?}. */
export function Menu({ open, onClose, items = [] }) {
  const { c, radius, space } = useTheme();
  return (
    <RNModal visible={!!open} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: "rgba(20,22,30,0.44)", justifyContent: "flex-end" }} onPress={onClose}>
        <View style={{ backgroundColor: c.surfaceOverlay, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, paddingVertical: space[2], paddingBottom: space[6] }}>
          {items.map((it, i) => (
            <Pressable key={i} onPress={() => { onClose && onClose(); it.onPress && it.onPress(); }} style={{ paddingVertical: 14, paddingHorizontal: space[5], flexDirection: "row", alignItems: "center", gap: 12 }}>
              {it.icon}
              <Text style={{ color: it.danger ? c.dangerFg : c.textPrimary, fontSize: 16 }}>{it.label}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </RNModal>
  );
}
