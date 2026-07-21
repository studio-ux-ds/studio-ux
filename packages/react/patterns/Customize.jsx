import React, { useEffect, useState } from "react";
import { SegmentedControl } from "../Controls.jsx";
import {
  SU_ACCENTS, SU_THEMES,
  getAccent, setAccent, getTheme, setTheme, watchSystemTheme,
} from "../theme.js";

// Customize — o painel único onde o usuário muda COMO a interface se comporta.
// Nesta versão o painel entrega os dois eixos "baratos" (só repontam token, seguros):
//   • Tema  — Claro / Escuro / Sistema  (data-theme; ausente = segue o SO)
//   • Accent — os 7 tons sóbrios, todos AA-validados em claro e escuro (P18)
// Comportamento idêntico ao Flux: muda AO VIVO no clique, persiste, sem "salvar".
// O swatch selecionado sinaliza ALÉM DA COR (anel + check), P17.
//
// Eixos que ficaram FORA de propósito (cada um precisa de um ADR, ver docs/governance):
//   densidade (colide com P21), idioma (P11 ≠ i18n), direção RTL, sidebar↔topo,
//   fluido↔boxed. Não são "customização de aparência" — mexem em estrutura/tradução.
//
// Serve tanto no Drawer do AppShell quanto embutido numa tela de Configurações
// → Aparência (paridade de acesso, P19).

export function Customize({ accents = SU_ACCENTS, onChange }) {
  const [accent, setAccentState] = useState(getAccent);
  const [theme, setThemeState] = useState(getTheme);

  // Se o usuário está em "Sistema", reflete a troca do SO ao vivo (só re-render).
  useEffect(() => watchSystemTheme(() => setThemeState(getTheme())), []);

  const changeTheme = (t) => { setTheme(t); setThemeState(t); onChange && onChange({ theme: t, accent }); };
  const changeAccent = (a) => { setAccent(a); setAccentState(a); onChange && onChange({ theme, accent: a }); };

  const current = accents.find((a) => a.id === accent);

  return (
    <div className="su-customize">
      {/* Tema */}
      <section className="su-customize__block">
        <div className="su-customize__label">Tema</div>
        <SegmentedControl
          items={SU_THEMES}
          value={theme}
          onChange={changeTheme}
        />
        <p className="su-customize__hint">
          “Sistema” acompanha o modo claro/escuro do seu aparelho.
        </p>
      </section>

      {/* Cor de destaque */}
      <section className="su-customize__block">
        <div className="su-customize__label">Cor de destaque</div>
        <div className="su-swatches" role="radiogroup" aria-label="Cor de destaque">
          {accents.map((a) => {
            const selected = accent === a.id;
            return (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={a.label}
                title={a.label}
                className={["su-swatch", selected && "su-swatch--on"].filter(Boolean).join(" ")}
                style={{ "--sw": a.hex }}
                onClick={() => changeAccent(a.id)}
              >
                {selected && <i className="ti ti-check" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <p className="su-customize__hint">
          Escolhida: <strong>{current?.label}</strong>. Só muda a cor de ação (botões,
          links, destaques) — o resto do layout fica igual.
        </p>
      </section>
    </div>
  );
}
