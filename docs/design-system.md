# Design System — ML Conferência

Guia de referência rápida para manter consistência visual entre páginas, componentes e futuras entregas.

## Princípios de Experiência
- **Clareza antes da estética:** priorize legibilidade, contraste e hierarquia visual.
- **Ações à vista:** elementos interativos devem ser óbvios e seguir o esquema de cores funcional.
- **Escalabilidade:** cada variação (cor, espaçamento, tipografia) precisa mapear para um token reutilizável.

## Paleta Base
| Token CSS | Uso recomendado | Fonte |
| --- | --- | --- |
| `--ml-color-primary` / `--ml-color-primary-soft` | Ações principais, estados padrão de componentes Material | Mat palette `deep-purple` |
| `--ml-color-accent` / `--ml-color-accent-soft` | Feedback positivo, destaques secundários | Mat palette `pink` |
| `--ml-color-warn` / `--ml-color-warn-soft` | Alertas críticos globais | Mat palette `red` |
| `--ml-color-critical` / `--ml-color-critical-soft` | Produto danificado | Custom (#c62828 / #fdecea) |
| `--ml-color-attention` / `--ml-color-attention-soft` | Destinatário ausente | Custom (#ef6c00 / #fff3e0) |
| `--ml-color-info` / `--ml-color-info-soft` | Endereço incorreto | Custom (#1565c0 / #e3f2fd) |
| `--ml-color-success` / `--ml-color-success-soft` | KPIs positivos / status "OK" | Custom (#2e7d32 / #e8f5e9) |
| `--ml-color-warning` / `--ml-color-warning-soft` | Status "Excedentes" e alertas moderados | Custom (#f9a825 / #fff8e1) |
| `--ml-color-danger` / `--ml-color-danger-soft` | Status "Faltantes" e erros críticos | Custom (#c62828 / #fdecea) |
| `--ml-surface-base` / `--ml-surface-raised` | Fundos de página vs. cartões | Neutros |

**Boas práticas:**
1. Sempre utilizar `var(--token)` em SCSS antes de recorrer a valores absolutos.
2. Ao criar novas categorias de status, defina tokens `--ml-color-*` correspondentes no `styles.scss`.

## Tipografia
| Elemento | Fontes | Peso | Observações |
| --- | --- | --- | --- |
| Títulos (cards, seções) | `'Roboto', 'Helvetica Neue', sans-serif` | 600–700 | Usar `mat-typography` herdada | 
| Labels auxiliares | Mesma pilha | 600 uppercase | Empregar `letter-spacing: 0.04em` |
| Valores/KPIs | Mesma pilha | 600–700 | Escalonar com `clamp` para responsividade |

## Espaçamento
Tokens disponíveis (definidos em `styles.scss`):
- `--ml-space-xs`: 0.25rem — ícones pequenos, chips.
- `--ml-space-sm`: 0.5rem — separação entre labels e valores.
- `--ml-space-md`: 1rem — padding interno padrão.
- `--ml-space-lg`: 1.5rem — gap entre cartões.
- `--ml-space-xl`: 2rem — espaçamento entre seções/rows.

## Escalas utilitárias
Use as classes globais para aplicar tamanhos padronizados sem duplicar CSS:

| Classe | Aplicação | Observações |
| --- | --- | --- |
| `.ml-input-sm` / `.ml-input-md` / `.ml-input-lg` | Largura de `mat-form-field` e inputs nativos | Ajustam automaticamente via media queries (260–680px). |
| `.ml-btn` / `.ml-btn-block` | Base flexível e largura fluida para botões Material | Combine com `mat-stroked/flat/raised`; `.ml-btn-block` expande para 100% do contêiner. |
| `.ml-btn-sm` / `.ml-btn-md` / `.ml-btn-lg` | Controlam altura mínima, tipografia e largura mínima responsiva | Ajustam os tokens MDC (`--mdc-*-container-height`) para padronizar botões em qualquer variante. |
| `.ml-card-sm` / `.ml-card-md` / `.ml-card-lg` | Define `max-width` e raio consistente para `mat-card` | Use em painéis internos (480/720/960px). |
| `.ml-card-full` | Ocupa 100% da largura disponível respeitando `--ml-layout-max-width` | Ideal para contêineres principais, mantendo o cartão centralizado no shell. |
| `.ml-card-left` / `.ml-card-center` / `.ml-card-right` | Controla alinhamento de cabeçalhos e conteúdos dentro do `mat-card` | Combine com as classes acima para definir direção visual do painel. |
| `.ml-text-sm` / `.ml-text-md` / `.ml-text-lg` | Ajusta fonte e linha para trechos específicos | Útil para helper texts fora do `mat-typography`. |

Sempre que criar novos componentes, prefira essas utilidades antes de adicionar SCSS local; se precisar de variação adicional, estenda `styles.scss` na sessão correspondente.

## Componentes Chave
### Cartões de Status (OK / Faltantes / Excedentes)
- Devem ocupar a mesma row através do grid responsivo (`repeat(auto-fit, minmax(200px, 1fr))`).
- Cada cartão recebe cor dedicada: OK → `--ml-color-success`, Faltantes → `--ml-color-danger`, Excedentes → `--ml-color-warning`.
- Utilizar `mat-card` com `appearance="outlined"` e `border` + `background` derivados dos tokens.

### KPIs (IDs oficiais / Pacotes bipados)
- Usam `article` simples com borda neutra `rgba(15,23,42,0.08)` e `border-radius: 16px`.
- Valores seguem `clamp(1.5rem, 1vw + 1rem, 2.25rem)` para adaptação em telas menores.

### Distribuição por Motivo
- Todos os cartões compartilham a mesma row (`repeat(4, minmax(0, 1fr))`) em telas ≥ 1024px e podem empilhar via media queries quando necessário.
- Cada item aplica `border-left` com `--issue-card-color` e fundo suave `--issue-card-fill`.
- Mapeamento obrigatório:
  - Produto danificado → `--ml-color-critical`
  - Destinatário ausente → `--ml-color-attention`
  - Endereço incorreto → `--ml-color-info`
  - Não classificado → `--ml-color-primary`

### Layout de Importação
- Toda a tela respeita `--ml-layout-padding` e se organiza em colunas verticais (`.import-page__row`).
- Painel de importação ocupa 100% da largura disponível e deve manter ações alinhadas ao centro do cartão.
- Campo de seleção usa `mat-form-field` com largura máxima de 520px, acompanhado de botão `mat-stroked-button` “Escolher arquivo”.
- A ação “Importar lista” só dispara quando um arquivo estiver selecionado; exiba `mat-error` quando o operador tentar prosseguir sem arquivo.
- Cards de status reutilizam o componente compartilhado sem sobrescrever tokens.
- A prévia da tabela oficial deve ficar dentro de um `mat-card` com `class="import-page__table ml-card-full ml-card-center"` para herdar largura total e centralização.

## Aplicação em Novos SCSS
1. Importar apenas quando necessário (evitar duplicar `@use '@angular/material'`).
2. Reutilizar tokens com fallback: `color: var(--ml-color-primary, #5e35b1);`.
3. Manter grids responsivos usando `repeat(auto-fit, minmax(X, 1fr))` para preservar proporções adotadas no dashboard.

Seguir este guia garante que cada nova tela mantenha o mesmo ritmo visual e as mesmas regras de cor vistas no dashboard atualizado.
