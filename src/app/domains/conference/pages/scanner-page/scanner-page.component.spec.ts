import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import { ScannerPageComponent } from './scanner-page.component';
import { ScannerService } from '../../../../core/services/scanner.service';
import { ConferenceStore } from '../../state/conference.store';
import { ConferenceStream } from '../../streams/conference.stream';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockScannerService {
  private readonly subject = new Subject<string>();
  readonly scan$ = this.subject.asObservable();
  emitScan = jasmine.createSpy('emitScan');

  emitirHardware(code: string) {
    this.subject.next(code);
  }
}

class MockConferenceStore {
  totals = signal({ ok: 0, missing: 0, extra: 0 });
  scannedRows = signal([] as Array<{ ordem: number; id: string }>);
  addScanned = jasmine.createSpy('addScanned').and.returnValue(true);
}

class MockConferenceStream {
  emitScan = jasmine.createSpy('emitScan');
}

describe('ScannerPageComponent', () => {
  let component: ScannerPageComponent;
  let fixture: ComponentFixture<ScannerPageComponent>;
  let scannerService: MockScannerService;
  let store: MockConferenceStore;
  let stream: MockConferenceStream;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannerPageComponent, NoopAnimationsModule],
      providers: [
        { provide: ScannerService, useClass: MockScannerService },
        { provide: ConferenceStore, useClass: MockConferenceStore },
        { provide: ConferenceStream, useClass: MockConferenceStream }
      ]
    })
      .overrideProvider(MatSnackBar, { useValue: jasmine.createSpyObj('MatSnackBar', ['open']) })
      .compileComponents();

    fixture = TestBed.createComponent(ScannerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    scannerService = TestBed.inject(ScannerService) as unknown as MockScannerService;
    store = TestBed.inject(ConferenceStore) as unknown as MockConferenceStore;
    stream = TestBed.inject(ConferenceStream) as unknown as MockConferenceStream;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    store.addScanned.calls.reset();
    stream.emitScan.calls.reset();
    snackBar.open.calls.reset();
  });

  // Entrada manual deve delegar para o serviço e manter fonte única de eventos.
  it('deve encaminhar entradas manuais para o ScannerService', () => {
    component.handleManualEntry('ZX9');

    expect(scannerService.emitScan).toHaveBeenCalledOnceWith('ZX9');
  });

  // Fluxo principal: ID novo atualiza store e propaga evento para integrações.
  it('deve propagar leituras aceitas para o ConferenceStream', () => {
    store.addScanned.and.returnValue(true);

    scannerService.emitirHardware('ABC123');

    expect(store.addScanned).toHaveBeenCalledOnceWith('ABC123');
    expect(stream.emitScan).toHaveBeenCalledOnceWith('ABC123');
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  // Regra de negócio: IDs duplicados exibem aviso e não disparam efeitos.
  it('deve exibir snackbar e bloquear leituras duplicadas', () => {
    store.addScanned.and.returnValue(false);

    scannerService.emitirHardware('XYZ999');

    expect(store.addScanned).toHaveBeenCalledOnceWith('XYZ999');
    expect(stream.emitScan).not.toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledOnceWith(
      'O ID XYZ999 já foi adicionado à lista',
      'Entendi',
      { duration: 4000 }
    );
  });
});
