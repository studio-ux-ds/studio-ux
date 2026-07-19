# Certification (Épico 3)

Implementa `docs/STUDIO_UX_CERTIFICATION.md`. **Gradua** a conformidade — não detecta. Regra de ouro (§8.4): *Linter detecta · Compliance mede · Certification gradua*. Esta ferramenta **consome** as violações do Linter e as transforma em veredito de eliminatórios; **nunca re-detecta** (SSOT, Art. 10).

- **Rodar:** `node packages/cli/certification/certify.mjs <alvo>` · `npm run audit -- <alvo>` · `studio audit <alvo>`.
- **Alvo:** uma **tela** (arquivo `.html`) → laudo de tela; um **projeto** (pasta com `studio-ux.json`) → laudo de sistema (shell + telas + dependência de versão).

## O que ela faz — e o que deliberadamente NÃO faz (Art. 21)

Gradua **só o que é estaticamente verificável**. Consome o Linter e decide os **eliminatórios** que ele cobre:

- **Eliminatórios estáticos** (via Linter): `P1` (token), `P3` (componente oficial), `P4` (Desktop×Mobile), `P6` (1 ação primária), `P7` (espaçamento), `P11` (língua do usuário), `P14` (estados), `P17` (não só cor), `P18` (contraste/foco). Qualquer um reprovado → **não certificada** (abaixo de Bronze, §5).
- **Eliminatórios humanos** (a ferramenta NÃO afirma): `P12` (toast), `P13` (5 patrasques), `P19` (toque/teclado) — exigem interação/evidência.
- **Nível (Bronze→Platinum / Enterprise):** a ferramenta **não imprime** — depende de evidência humana (a11y nos 2 temas, estados, DNA visual, Desktop+Mobile). Um selo que mente é o pior erro (§8.3). Ela dá o **piso automático** e aponta o que falta ao auditor humano.

## Saída

- **Tela limpa:** "piso automático limpo" + os eliminatórios estáticos que passam + o que pende de auditoria humana.
- **Tela suja:** "NÃO CERTIFICADA" + os eliminatórios reprovados (com o P# e a linha do Linter).
- **Sistema:** dependência de versão declarada + laudo por tela (shell + `src/screens/*`) + piso de sistema.

## Fronteira

Não recria a detecção (`LINTER`) nem a medição contínua (`COMPLIANCE`); não redefine os P# (donos: `PRINCIPLES`/`ACCESSIBILITY`). Só **agrega e gradua** o que os donos definem — se um P# muda no dono, a auditoria muda junto.
