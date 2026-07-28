import React from "react";
import { DSIcon } from "./DSIcon.jsx";

/**
 * Field — wrapper .su-field (label + controle + erro/dica). Erro é inline (P14);
 * a falha de envio vai por Toast (P12).
 *
 * `required` marca o campo como obrigatório **na etiqueta** — o asterisco é o
 * sinal que o usuário já conhece, e vem acompanhado de "(obrigatório)" para o
 * leitor de tela, porque um `*` solto não é lido como nada.
 *
 * Ele NÃO propaga `required` para o controle: o Field embrulha children
 * arbitrários (Input, Select, TextArea, um grupo de Checkbox), e adivinhar em
 * qual deles cravar o atributo daria falso positivo. Quem valida é o produto —
 * o Field diz ao usuário o que é obrigatório, não impõe ao navegador.
 */
export function Field({ label, error, hint, htmlFor, required, wide = false, grow = false, className = "", children }) {
  // `wide` só tem efeito dentro de um `FormGrid`: faz o campo ocupar a linha
  // inteira. É para o que se escreve (texto longo, JSON, lista editável) — meia
  // largura vira uma coluna estreita e alta em que o olho perde a linha. Fora do
  // grid, é inerte (não vira atributo no DOM nem quebra o layout).
  // `grow` só tem efeito dentro de um `FormRow`: marca QUAL campo da linha de
  // ação cresce (o principal — o seletor de pessoa, não o de papel). Cresce até
  // um teto de leitura; sem isso o campo estica até a borda do cartão.
  const cls = ["su-field", error && "su-field--error", wide && "su-field--wide", grow && "su-field--grow", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {label && (
        <label className="su-field__label" htmlFor={htmlFor}>
          {label}
          {required && (
            <>
              <span className="su-field__req" aria-hidden="true">*</span>
              <span className="su-sr-only"> (obrigatório)</span>
            </>
          )}
        </label>
      )}
      {children}
      {error && <span className="su-field__error"><DSIcon name="alert-circle" />{error}</span>}
      {!error && hint && <span className="su-field__hint">{hint}</span>}
    </div>
  );
}

/** Input — .su-input. */
export function Input({ className = "", ...rest }) {
  return <input className={["su-input", className].filter(Boolean).join(" ")} {...rest} />;
}

/**
 * Países do `PhoneInput`. Lista curada, não exaustiva: os que os produtos deste
 * ecossistema realmente atendem, com o Brasil no topo por ser o padrão.
 *
 * `mask` é do número LOCAL (sem DDI) e `maxDigits` é o teto do local — é o que
 * impede um telefone brasileiro de 11 dígitos aceitar 15.
 */
export const SU_COUNTRIES = [
  { code: "BR", name: "Brasil",          dial: "+55",  flag: "🇧🇷", mask: "(##) #####-####", maxDigits: 11 },
  { code: "US", name: "Estados Unidos",  dial: "+1",   flag: "🇺🇸", mask: "(###) ###-####",  maxDigits: 10 },
  { code: "PT", name: "Portugal",        dial: "+351", flag: "🇵🇹", mask: "### ### ###",     maxDigits: 9 },
  { code: "AR", name: "Argentina",       dial: "+54",  flag: "🇦🇷", mask: "## ####-####",    maxDigits: 10 },
  { code: "UY", name: "Uruguai",         dial: "+598", flag: "🇺🇾", mask: "## ### ###",      maxDigits: 8 },
  { code: "PY", name: "Paraguai",        dial: "+595", flag: "🇵🇾", mask: "### ### ###",     maxDigits: 9 },
  { code: "CL", name: "Chile",           dial: "+56",  flag: "🇨🇱", mask: "# #### ####",     maxDigits: 9 },
  { code: "CO", name: "Colômbia",        dial: "+57",  flag: "🇨🇴", mask: "### ### ####",    maxDigits: 10 },
  { code: "MX", name: "México",          dial: "+52",  flag: "🇲🇽", mask: "## #### ####",    maxDigits: 10 },
  { code: "PE", name: "Peru",            dial: "+51",  flag: "🇵🇪", mask: "### ### ###",     maxDigits: 9 },
  { code: "BO", name: "Bolívia",         dial: "+591", flag: "🇧🇴", mask: "#### ####",       maxDigits: 8 },
  { code: "EC", name: "Equador",         dial: "+593", flag: "🇪🇨", mask: "## ### ####",     maxDigits: 9 },
  { code: "VE", name: "Venezuela",       dial: "+58",  flag: "🇻🇪", mask: "### ### ####",    maxDigits: 10 },
  { code: "GB", name: "Reino Unido",     dial: "+44",  flag: "🇬🇧", mask: "#### ### ####",   maxDigits: 11 },
  { code: "DE", name: "Alemanha",        dial: "+49",  flag: "🇩🇪", mask: "#### #######",    maxDigits: 11 },
  { code: "FR", name: "França",          dial: "+33",  flag: "🇫🇷", mask: "# ## ## ## ##",   maxDigits: 9 },
  { code: "ES", name: "Espanha",         dial: "+34",  flag: "🇪🇸", mask: "### ### ###",     maxDigits: 9 },
  { code: "IT", name: "Itália",          dial: "+39",  flag: "🇮🇹", mask: "### ### ####",    maxDigits: 10 },
  { code: "JP", name: "Japão",           dial: "+81",  flag: "🇯🇵", mask: "##-####-####",    maxDigits: 10 },
  { code: "AO", name: "Angola",          dial: "+244", flag: "🇦🇴", mask: "### ### ###",     maxDigits: 9 },
  { code: "MZ", name: "Moçambique",      dial: "+258", flag: "🇲🇿", mask: "## ### ####",     maxDigits: 9 },
];

/**
 * Descobre o país a partir dos dígitos com DDI. Tenta 3, 2 e 1 dígito — nessa
 * ordem, porque `+1` (EUA) é prefixo de nada e `+55` de nada, mas `+591`
 * (Bolívia) COMEÇA com `+59`: testar do mais longo evita casar o país errado.
 */
export function suDetectCountry(fullDigits) {
  const digits = String(fullDigits || "").replace(/\D/g, "");
  if (!digits) return { country: SU_COUNTRIES[0], local: "" };
  for (const len of [3, 2, 1]) {
    const prefixo = digits.substring(0, len);
    const achado = SU_COUNTRIES.find((c) => c.dial === "+" + prefixo);
    if (achado) return { country: achado, local: digits.substring(len) };
  }
  return { country: SU_COUNTRIES[0], local: digits };
}

function aplicarMascara(digits, mask) {
  let saida = "";
  let i = 0;
  for (let m = 0; m < mask.length && i < digits.length; m++) {
    saida += mask[m] === "#" ? digits[i++] : mask[m];
  }
  return saida;
}

/**
 * PhoneInput — telefone com **seletor de país** (bandeira + DDI + busca).
 *
 * Guarda o valor SEMPRE em **E.164 só-dígitos, com DDI e sem `+`**
 * (`5527999998888`) — a mesma convenção do WhatsApp. `onChange` recebe a string
 * de dígitos, não o evento: o que o produto guarda não é o que está na tela (a
 * tela mostra o número local mascarado).
 *
 * Até a v1.2.37 este componente era **só a casca** — campo mais um botão de país
 * que não abria nada, e a lista/normalização "eram do produto". O resultado
 * previsível: cada consumidor mantinha o seu, e o do DS não era usado por
 * ninguém. Seletor de país não é regra de negócio de um produto — é o
 * componente. A lista é curada (não exaustiva) e cresce por governança, como os
 * ícones.
 *
 * @param {string} value  dígitos com DDI, sem "+" ("5527999998888") ou ""
 * @param {(digits: string) => void} onChange
 */
export function PhoneInput({ value = "", onChange, placeholder, disabled, error, id, className = "" }) {
  const detectado = suDetectCountry(value);
  const [country, setCountry] = React.useState(detectado.country);
  const [local, setLocal] = React.useState(detectado.local);
  const [aberto, setAberto] = React.useState(false);
  const [busca, setBusca] = React.useState("");
  const raizRef = React.useRef(null);
  const buscaRef = React.useRef(null);

  // Sincroniza de fora para dentro: troca do registro em edição, reset do form.
  React.useEffect(() => {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) { setLocal(""); return; }
    const det = suDetectCountry(digits);
    if (det.country.code !== country.code) setCountry(det.country);
    if (det.local !== local) setLocal(det.local);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  React.useEffect(() => {
    if (!aberto) return undefined;
    const fora = (e) => { if (raizRef.current && !raizRef.current.contains(e.target)) setAberto(false); };
    const esc = (e) => { if (e.key === "Escape") setAberto(false); };
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", esc);
    const t = setTimeout(() => buscaRef.current?.focus(), 30);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", esc);
      clearTimeout(t);
    };
  }, [aberto]);

  const emitir = (c, digits) => {
    if (!digits) { onChange?.(""); return; }
    onChange?.(c.dial.replace(/\D/g, "") + digits);
  };

  const escolher = (c) => {
    setCountry(c);
    setAberto(false);
    setBusca("");
    // Corta o excedente: trocar de um país de 11 dígitos para um de 8 não pode
    // deixar três dígitos órfãos guardados.
    const cortado = local.slice(0, c.maxDigits);
    setLocal(cortado);
    emitir(c, cortado);
  };

  const lista = busca
    ? SU_COUNTRIES.filter((c) => {
      const t = busca.toLowerCase();
      return c.name.toLowerCase().includes(t) || c.dial.includes(busca) || c.code.toLowerCase().includes(t);
    })
    : SU_COUNTRIES;

  const cls = ["su-phoneinput", error && "su-phoneinput--error", className].filter(Boolean).join(" ");

  return (
    <div className={cls} ref={raizRef}>
      <button
        type="button"
        className="su-phoneinput__country"
        disabled={disabled}
        onClick={() => setAberto((v) => !v)}
        aria-label={`País: ${country.name} (${country.dial})`}
        aria-expanded={aberto}
      >
        <span aria-hidden="true">{country.flag}</span>
        <span className="su-phoneinput__dial">{country.dial}</span>
        <DSIcon name="chevron-down" size="sm" />
      </button>

      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        className="su-phoneinput__input"
        disabled={disabled}
        value={aplicarMascara(local, country.mask)}
        placeholder={placeholder || country.mask.replace(/#/g, "9")}
        onChange={(e) => {
          const cru = e.target.value.replace(/\D/g, "").slice(0, country.maxDigits);
          setLocal(cru);
          emitir(country, cru);
        }}
      />

      {aberto && !disabled && (
        <div className="su-phoneinput__menu" role="listbox">
          <div className="su-phoneinput__search">
            <input
              ref={buscaRef}
              className="su-input"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar país…"
              aria-label="Buscar país"
            />
          </div>
          <div className="su-phoneinput__list">
            {lista.map((c) => (
              <button
                key={c.code}
                type="button"
                role="option"
                aria-selected={c.code === country.code}
                className={["su-phoneinput__option", c.code === country.code && "su-phoneinput__option--on"].filter(Boolean).join(" ")}
                onClick={() => escolher(c)}
              >
                <span aria-hidden="true">{c.flag}</span>
                <span className="su-phoneinput__dial">{c.dial}</span>
                <span className="su-phoneinput__name">{c.name}</span>
              </button>
            ))}
            {!lista.length && (
              <p className="su-phoneinput__empty">Nenhum país com esse nome ou código.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
