import React from "react";
import { PageHeader } from "./PageHeader.jsx";
import { Tabs } from "../Tabs.jsx";
import { Card } from "../Card.jsx";
import { Button } from "../Button.jsx";
import { Skeleton } from "../Feedback.jsx";

/**
 * SettingsSection — uma seção de ajustes dentro do molde. Título curto na língua
 * do usuário + uma linha dizendo **o que muda** ao mexer ali. A explicação vive
 * na seção, não em tooltip: quem está configurando quer ler antes de decidir, e
 * tooltip exige adivinhar que há algo para ler.
 */
export function SettingsSection({ title, description, children }) {
  return (
    <div className="su-form-section">
      {title && <div className="su-form-section__title">{title}</div>}
      {description && (
        <p style={{ margin: "0 0 var(--su-space-4)", fontSize: "var(--su-fs-body-sm)", color: "var(--su-text-muted)", maxWidth: "62ch" }}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/**
 * SettingsScreen — o molde **`settings`** (`STUDIO_UX_TEMPLATES` §2, deriva de
 * `FORMS`): **configuração**, que é um formulário com outra ergonomia.
 *
 * Regiões: cabeçalho → `Tabs` (**pills** — é sub-navegação dentro de um assunto,
 * não a aba principal de um registro) → seções → ações.
 *
 * O que ele fixa, e a diferença que importa:
 *
 * - **Ajuste é linguagem do usuário (P11), sem exceção.** É a tela onde o jargão
 *   mais aparece, porque cada opção tem um nome técnico no banco. "Quando um
 *   cliente escreve e ninguém está atendendo" — não `AUTO_REPLY_ENABLED`.
 * - **Duas ergonomias, e a escolha não é de gosto:** ajuste de **efeito
 *   imediato** (um `Switch` que liga algo agora) não tem Salvar — mudou, valeu, e
 *   o retorno é `Toast`. Ajuste que **só vale em conjunto** (dados da empresa,
 *   credenciais) tem Salvar, e aí `onSave` existe. Misturar os dois na mesma
 *   seção é o que faz alguém mexer num toggle e depois clicar em Cancelar
 *   achando que desfez.
 * - **Cada seção diz o que muda.** Ajuste sem consequência declarada vira
 *   tentativa e erro em produção.
 *
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [subtitle]
 * @param {{id:string,label:string,icon?:string}[]} [tabs]
 * @param {string} [tab]
 * @param {Function} [onTab]
 * @param {Function} [onSave]     ausente = tudo nesta aba é de efeito imediato
 * @param {Function} [onCancel]
 * @param {boolean} [saving]
 * @param {boolean} [dirty]       nada mudou → Salvar desabilitado
 * @param {string} [saveLabel]
 * @param {boolean} [loading]
 */
export function SettingsScreen({
  title, subtitle, tabs, tab, onTab,
  onSave, onCancel, saving = false, dirty = true, saveLabel = "Salvar alterações",
  loading,
  children,
}) {
  const corpo = loading ? (
    <div style={{ display: "grid", gap: "var(--su-space-5)" }}>
      {[0, 1].map((i) => (
        <div key={i}>
          <Skeleton width="22%" height={11} />
          <Skeleton width="100%" height={34} style={{ marginTop: "var(--su-space-3)" }} radius="var(--su-radius-md)" />
        </div>
      ))}
    </div>
  ) : children;

  const conteudo = (
    <Card>
      {corpo}
      {onSave && !loading && (
        <div className="su-form-actions">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>Cancelar</Button>
          )}
          <Button type="submit" variant="primary" loading={saving} disabled={!dirty}>{saveLabel}</Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="su-screen">
      {(title || subtitle) && <PageHeader title={title} subtitle={subtitle} />}
      {tabs && tabs.length > 0 && <Tabs items={tabs} value={tab} onChange={onTab} variant="pills" />}
      {onSave ? (
        <form onSubmit={(event) => { event.preventDefault(); if (!saving) onSave(event); }}>{conteudo}</form>
      ) : (
        conteudo
      )}
    </div>
  );
}
