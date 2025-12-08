# Guia de Testes em Angular (Projeto ML Conferência)

Este documento reúne as práticas adotadas atualmente para escrever testes unitários com Jasmine + Karma no projeto. Use-o como checklist ao criar novos cenários.

## 1. Configuração do TestBed
- **Sempre importar `NoopAnimationsModule`** quando o componente utiliza Angular Material. Isso evita erros como `NG05105` relacionados a propriedades sintéticas (`@transitionMessages`).
- **Preferir `imports: [Componente]`** para componentes standalone, mantendo o setup enxuto.
- **Override pontual de providers**:
  ```ts
  await TestBed.configureTestingModule({
    imports: [ScannerPageComponent, NoopAnimationsModule]
  })
    .overrideProvider(MatSnackBar, {
      useValue: jasmine.createSpyObj('MatSnackBar', ['open'])
    })
    .compileComponents();
  ```

## 2. Mocks e Helpers Compartilhados
- Centralize utilitários em `src/testing/`. Exemplo: `createFileChangeMock` reproduz um evento de `<input type="file">` sem depender do DOM real.
  ```ts
  const { event, file } = createFileChangeMock({ fileName: 'planilha.csv' });
  component.handleFileChange(event);
  ```
- Para fluxos reativos, use `Subject` com métodos auxiliares. Vide `MockScannerService` em `scanner-page.component.spec.ts` com `emitirHardware()` para disparar eventos no `scan$`.

## 3. Estrutura dos Testes
- **Nomes autoexplicativos** no formato “deve …” descrevem a regra em português.
- **Comentário curto** antes de blocos importantes facilita leitura (apenas quando o cenário não é óbvio).
- **Arrange/Act/Assert** implícito: agrupe preparação, execução e expectativas em blocos distintos.

## 4. Interações com Angular Material
- Use spies para serviços como `MatSnackBar` ou `MatDialog`. Isso evita criar instâncias reais e permite validar parâmetros:
  ```ts
  const snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  expect(snackBar.open).toHaveBeenCalledOnceWith('mensagem', 'Ação', { duration: 4000 });
  ```

## 5. Testando Componentes de Formulário
- Prefira acionar métodos públicos em vez de interagir diretamente com o template.
- Simule eventos críticos com helpers (`createFileChangeMock`, mocks de `HTMLInputElement`).
- Verifique efeitos colaterais: limpeza de campos, alteração de flags (`showValidationError`).

## 6. Stores e Signals
- Inicialize o store via `TestBed` para preservar injeções reais (`CategoryService`).
- Após mutações (`setOfficial`, `addScanned`), consulte os signals chamando-os como funções: `store.totals()`.
- Garanta cenários extras (duplicidades, reset) para validar comportamentos críticos.

## 7. Fluxos Reativos
- Crie `Subject`s controlados nos mocks para disparar eventos determinísticos.
- Use `takeUntilDestroyed` no código de produção; nos testes, apenas chame o helper (`emitirHardware`) e avalie efeitos.

## 8. Checklist Antes de Concluir
1. Testes cobrem regras felizes e negativas?
2. Há helpers suficientes para evitar código duplicado?
3. Spies verificam parâmetros exatos (ex.: snackbar)?
4. O `TestBed` inclui `NoopAnimationsModule` quando preciso?
5. Documentou o cenário no PR/commits?

Seguindo estes passos, mantemos os testes confiáveis, rápidos e fáceis de evoluir junto com o produto.
