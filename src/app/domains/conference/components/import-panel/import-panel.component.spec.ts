import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ImportPanelComponent } from './import-panel.component';
import { createFileChangeMock } from '../../../../../testing/file-event.mock';

describe('ImportPanelComponent', () => {
  let component: ImportPanelComponent;
  let fixture: ComponentFixture<ImportPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportPanelComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Cenário feliz: operador escolhe arquivo válido e input é limpo.
  it('deve armazenar o arquivo selecionado e limpar o input nativo', () => {
    const { event, input } = createFileChangeMock({ fileName: 'lista.xlsx' });

    component.handleFileChange(event);

    expect(component.lastFileName).toBe('lista.xlsx');
    expect(input.value).toBe('');
    expect(component.showValidationError).toBeFalse();
  });

  // Confirmação deve emitir arquivo pendente e resetar estado.
  it('deve emitir o arquivo pendente ao confirmar importação', () => {
    const { event, file } = createFileChangeMock({ fileName: 'planilha.csv' });
    const emitido = jasmine.createSpy('arquivoEmitido');
    component.fileSelected.subscribe(emitido);

    component.handleFileChange(event);
    component.confirmImport();

    expect(emitido).toHaveBeenCalledOnceWith(file!);
    expect(component.lastFileName).toBeNull();
    expect(component.showValidationError).toBeFalse();
  });

  // Fluxo defensivo: evento sem arquivo não pode afetar estado atual.
  it('deve ignorar mudança quando nenhum arquivo é fornecido', () => {
    const { event } = createFileChangeMock();

    component.handleFileChange(event);

    expect(component.lastFileName).toBeNull();
    expect(component.showValidationError).toBeFalse();
  });

  // Validação visual quando não há arquivo pendente.
  it('deve sinalizar erro ao confirmar sem arquivo selecionado', () => {
    component.confirmImport();

    expect(component.showValidationError).toBeTrue();
  });

  // Limpeza manual precisa remover arquivo e feedbacks.
  it('deve limpar seleção e feedbacks ao chamar clearSelection', () => {
    const { event } = createFileChangeMock({ fileName: 'lista.xlsx' });
    component.handleFileChange(event);

    component.clearSelection();

    expect(component.lastFileName).toBeNull();
    expect(component.showValidationError).toBeFalse();
  });
});
