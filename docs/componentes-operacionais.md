# Componentes Operacionais — Referência Rápida

Visão consolidada das principais peças do domínio Conference e suas responsabilidades. Utilize este guia para alinhar implementações, revisar contratos e localizar testes associados.

## ImportPanelComponent
- **Função**: permitir que o operador escolha um arquivo, visualize erros e dispare a importação controlada pelo container.
- **Entradas**: `isLoading`, `errorMessage` e `showValidationError` (interno) comandam feedback visual.
- **Saída**: `fileSelected` emite apenas o `File` validado.
- **Boas práticas**:
  - Sempre limpar o `input` nativo após cada seleção (`input.value = ''`) para permitir o reenvio do mesmo arquivo.
  - Centralizar lógica de validação em métodos dedicados (`confirmImport`, `clearSelection`).
  - Em testes, utilize `createFileChangeMock` para simular eventos em `<input type="file">`.
- **Cobertura de testes**: `import-panel.component.spec.ts` garante fluxo feliz, validação negativa, limpeza manual e evento sem arquivo.

## ScanInputComponent
- **Função**: receber entradas manuais ou via scanner conectado e propagá-las para o container.
- **Entradas**: `placeholder` customizável para instruções contextualizadas.
- **Saída**: `codeCaptured` com o valor sanitizado.
- **Boas práticas**:
  - Tratar `trim()` e garantir limpeza do campo após cada submit para simular o hardware real.
  - Não acessar serviços diretamente; delegar ao container (`ScannerPageComponent`).
- **Cobertura de testes**: `scan-input.component.spec.ts` valida emissão com limpeza e bloqueio de entradas vazias.

## ScannerPageComponent
- **Função**: unificar leitura automática/ manual, atualizar o estado global e emitir eventos para fluxos derivados.
- **Dependências**: `ScannerService`, `ConferenceStore`, `ConferenceStream`, `MatSnackBar`.
- **Regras**:
  - Todo evento passa por `ConferenceStore.addScanned`; duplicados disparam snackbar informativo.
  - Eventos aceitos propagam `ConferenceStream.emitScan` para dashboards/integrações.
- **Boas práticas**:
  - Sempre assinar `scan$` com `takeUntilDestroyed`.
  - Para testar, espionar `MatSnackBar` via `overrideProvider` e usar `MockScannerService` com `Subject`.
- **Cobertura de testes**: `scanner-page.component.spec.ts` cobre fluxo manual, fluxo feliz e bloqueio com feedback visual.

## ConferenceStore
- **Função**: manter listas oficiais e escaneadas, derivando sinais (`totals`, `officialRows`, `scannedRows`, `issueTotals`).
- **Boas práticas**:
  - Expor apenas métodos sem efeitos colaterais externos (`setOfficial`, `addScanned`, `reset`).
  - Garantir que cálculos complexos usem `computed` para evitar recomputações.
- **Cobertura de testes**: `conference.store.spec.ts` valida projeção de linhas, regra de duplicidade, cálculo de totais e reset.

## ScannerService
- **Função**: atuar como broker entre hardware/entradas e os consumidores (`scan$`).
- **Boas práticas**:
  - Mantê-lo simples (apenas `Subject` + `emitScan`) para facilitar mocks em testes.
- **Cobertura de testes**: `scanner.service.spec.ts` (básico) — recomenda-se estender com testes de fluxo ao adicionar novas regras.

## Como usar este guia
1. Identifique o componente/serviço que precisa alterar.
2. Consulte as responsabilidades e boas práticas aqui antes de codar.
3. Abra o arquivo `.spec.ts` indicado para ver exemplos práticos de validação.
4. Ao criar novos componentes, replique o padrão: documentação concisa + testes autoexplicativos.
