import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Modal, Switch as RNSwitch } from "react-native";
import { useTheme } from "./theme.jsx";

/** Switch (RN) — usa o Switch nativo com as cores do token. */
export function Switch({ value, onValueChange, disabled }) {
  const { c } = useTheme();
  return <RNSwitch value={!!value} onValueChange={onValueChange} disabled={disabled}
    trackColor={{ false: c.borderStrong, true: c.action }} thumbColor="#fff" ios_backgroundColor={c.borderStrong} />;
}

/** Checkbox (RN) — Pressable com marca. `indeterminate` mostra traço. */
export function Checkbox({ value, indeterminate, onValueChange, label, disabled }) {
  const { c, radius } = useTheme();
  const on = value || indeterminate;
  return (
    <Pressable onPress={() => !disabled && onValueChange && onValueChange(!value)} style={{ flexDirection: "row", alignItems: "center", gap: 8, opacity: disabled ? 0.5 : 1 }}>
      <View style={{ width: 18, height: 18, borderRadius: 5, borderWidth: 1.5, borderColor: on ? c.action : c.borderStrong, backgroundColor: on ? c.action : "transparent", alignItems: "center", justifyContent: "center" }}>
        {indeterminate ? <Text style={{ color: "#fff", fontSize: 13, lineHeight: 14 }}>–</Text> : (value ? <Text style={{ color: "#fff", fontSize: 12, lineHeight: 14 }}>✓</Text> : null)}
      </View>
      {label != null && <Text style={{ color: c.textPrimary, fontSize: 14 }}>{label}</Text>}
    </Pressable>
  );
}

/** Radio (RN). */
export function Radio({ selected, onPress, label, disabled }) {
  const { c } = useTheme();
  return (
    <Pressable onPress={() => !disabled && onPress && onPress()} style={{ flexDirection: "row", alignItems: "center", gap: 8, opacity: disabled ? 0.5 : 1 }}>
      <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: selected ? c.action : c.borderStrong, alignItems: "center", justifyContent: "center" }}>
        {selected && <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: c.action }} />}
      </View>
      {label != null && <Text style={{ color: c.textPrimary, fontSize: 14 }}>{label}</Text>}
    </Pressable>
  );
}

/** Select (RN) — abre uma folha nativa com as opções. */
export function Select({ value, onChange, options = [], placeholder = "Selecione", getLabel = (o) => o.label ?? o, getValue = (o) => o.value ?? o }) {
  const { c, radius, space } = useTheme();
  const [open, setOpen] = useState(false);
  const current = options.find((o) => getValue(o) === value);
  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={{ height: 44, borderWidth: 1, borderColor: c.borderDefault, borderRadius: radius.md, backgroundColor: c.surfaceRaised, paddingHorizontal: space[3], flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ color: current ? c.textPrimary : c.textMuted, fontSize: 15 }}>{current ? getLabel(current) : placeholder}</Text>
        <Text style={{ color: c.textMuted }}>▾</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: "rgba(20,22,30,0.44)", justifyContent: "flex-end" }} onPress={() => setOpen(false)}>
          <View style={{ backgroundColor: c.surfaceOverlay, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, paddingVertical: space[2], paddingBottom: space[6] }}>
            {options.map((o, i) => (
              <Pressable key={i} onPress={() => { onChange && onChange(getValue(o)); setOpen(false); }} style={{ paddingVertical: 14, paddingHorizontal: space[5] }}>
                <Text style={{ color: getValue(o) === value ? c.action : c.textPrimary, fontSize: 16 }}>{getLabel(o)}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

/** SegmentedControl (RN). */
export function SegmentedControl({ items = [], value, onChange }) {
  const { c, radius } = useTheme();
  return (
    <View style={{ flexDirection: "row", backgroundColor: c.surfaceSunken, borderRadius: radius.md, padding: 2 }}>
      {items.map((it) => {
        const on = value === it.id;
        return (
          <Pressable key={it.id} onPress={() => onChange && onChange(it.id)} style={{ flex: 1, paddingVertical: 7, borderRadius: radius.md - 2, backgroundColor: on ? c.surfaceRaised : "transparent", alignItems: "center" }}>
            <Text style={{ color: on ? c.textPrimary : c.textSecondary, fontSize: 13, fontWeight: on ? "500" : "400" }}>{it.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** NumericInput (RN) — passos +/−; nunca teclado só-número sem controles. */
export function NumericInput({ value = 0, onChange, min, max, step = 1 }) {
  const { c, radius } = useTheme();
  const num = Number(value) || 0;
  const clamp = (n) => { if (min != null && n < min) n = min; if (max != null && n > max) n = max; return n; };
  const set = (n) => onChange && onChange(clamp(n));
  const Btn = ({ label, fn, disabled }) => (
    <Pressable onPress={() => !disabled && fn()} style={{ width: 40, height: 44, alignItems: "center", justifyContent: "center", backgroundColor: c.surfaceSunken, opacity: disabled ? 0.4 : 1 }}>
      <Text style={{ fontSize: 20, color: c.textSecondary }}>{label}</Text>
    </Pressable>
  );
  return (
    <View style={{ flexDirection: "row", borderWidth: 1, borderColor: c.borderDefault, borderRadius: radius.md, overflow: "hidden", alignSelf: "flex-start" }}>
      <Btn label="−" fn={() => set(num - step)} disabled={min != null && num <= min} />
      <TextInput value={String(value)} keyboardType="numeric" style={{ width: 64, textAlign: "center", color: c.textPrimary, fontSize: 15 }}
        onChangeText={(t) => { if (t === "" || t === "-") { onChange && onChange(t); return; } const n = Number(t); if (!Number.isNaN(n)) set(n); }} />
      <Btn label="+" fn={() => set(num + step)} disabled={max != null && num >= max} />
    </View>
  );
}

/** TextArea (RN). */
export function TextArea({ style, ...rest }) {
  const { c, radius, space } = useTheme();
  return <TextInput multiline textAlignVertical="top" placeholderTextColor={c.textMuted}
    style={[{ minHeight: 84, borderWidth: 1, borderColor: c.borderDefault, borderRadius: radius.md, backgroundColor: c.surfaceRaised, padding: space[3], color: c.textPrimary, fontSize: 15 }, style]} {...rest} />;
}
