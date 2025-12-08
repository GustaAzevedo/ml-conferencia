import { TestBed } from '@angular/core/testing';
import { ConferenceStore } from './conference.store';
import { CategoryService } from '../services/category.service';
import { ISSUE_REASON_LABELS, IssueReason } from '../models/official-entry.model';

describe('ConferenceStore', () => {
  let store: ConferenceStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConferenceStore, CategoryService]
    });
    store = TestBed.inject(ConferenceStore);
    store.reset();
  });

  // Deve converter a lista oficial em linhas legíveis para tabelas.
  it('deve sobrescrever a lista oficial e projetar linhas com motivo descritivo', () => {
    const lista: OfficialEntryStub[] = [
      { id: '100', issue: 'produto-danificado' },
      { id: '200', issue: 'destinatario-ausente' }
    ];

    store.setOfficial(lista as any);

    expect(store.officialRows()).toEqual([
      {
        ordem: 1,
        id: '100',
        motivo: ISSUE_REASON_LABELS['produto-danificado'],
        estado: 'MISSING'
      },
      {
        ordem: 2,
        id: '200',
        motivo: ISSUE_REASON_LABELS['destinatario-ausente'],
        estado: 'MISSING'
      }
    ]);
  });

  it('deve marcar estado OK quando o ID já foi escaneado', () => {
    const lista: OfficialEntryStub[] = [{ id: '123', issue: 'produto-danificado' }];
    store.setOfficial(lista as any);
    store.addScanned('123');

    expect(store.officialRows()).toEqual([
      {
        ordem: 1,
        id: '123',
        motivo: ISSUE_REASON_LABELS['produto-danificado'],
        estado: 'OK'
      }
    ]);
  });

  // Precisa aceitar cada ID escaneado apenas uma vez.
  it('deve adicionar IDs inéditos e rejeitar duplicados', () => {
    const primeiraInclusao = store.addScanned('ABC');
    const segundaInclusao = store.addScanned('ABC');
    const terceiraInclusao = store.addScanned('DEF');

    expect(primeiraInclusao).toBeTrue();
    expect(segundaInclusao).toBeFalse();
    expect(terceiraInclusao).toBeTrue();
    expect(store.scannedRows()).toEqual([
      { ordem: 1, id: 'ABC' },
      { ordem: 2, id: 'DEF' }
    ]);
  });

  // Métricas precisam considerar OK, faltantes e extras.
  it('deve calcular totais com base em oficiais escaneados e extras', () => {
    const lista: OfficialEntryStub[] = [
      { id: '10', issue: 'produto-danificado' },
      { id: '20', issue: 'produto-danificado' }
    ];
    store.setOfficial(lista as any);

    store.addScanned('10');
    store.addScanned('999');

    expect(store.totals()).toEqual({ ok: 1, missing: 1, extra: 1 });
  });

  // Reset precisa zerar listas e sinais derivados.
  it('deve resetar listas oficiais e escaneadas', () => {
    store.setOfficial([
      { id: '1', issue: 'produto-danificado' } as OfficialEntryStub
    ] as any);
    store.addScanned('1');
    store.addScanned('2');

    store.reset();

    expect(store.officialRows()).toEqual([]);
    expect(store.scannedRows()).toEqual([]);
    expect(store.totals()).toEqual({ ok: 0, missing: 0, extra: 0 });
  });

  interface OfficialEntryStub {
    id: string;
    issue: IssueReason;
  }
});
