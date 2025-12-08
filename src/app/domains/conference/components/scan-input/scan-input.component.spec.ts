import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScanInputComponent } from './scan-input.component';

describe('ScanInputComponent', () => {
  let component: ScanInputComponent;
  let fixture: ComponentFixture<ScanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanInputComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Cenário feliz: deve emitir o código tratado e limpar o campo.
  it('deve emitir o código e limpar o input após envio válido', () => {
    const emitidos: string[] = [];
    component.codeCaptured.subscribe((valor) => emitidos.push(valor));
    const input = { value: ' 1234 ' } as HTMLInputElement;

    component.submitFrom(input);

    expect(emitidos).toEqual(['1234']);
    expect(input.value).toBe('');
  });

  // Cenário inválido: espaços ou vazio não devem disparar evento.
  it('deve ignorar valores em branco e manter o campo intacto', () => {
    const spy = jasmine.createSpy('codeCaptured');
    component.codeCaptured.subscribe(spy);
    const input = { value: '   ' } as HTMLInputElement;

    component.submitFrom(input);

    expect(spy).not.toHaveBeenCalled();
    expect(input.value).toBe('   ');
  });
});
