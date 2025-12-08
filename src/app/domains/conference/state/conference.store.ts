import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import {
  ISSUE_REASON_LABELS,
  IssueReason,
  OfficialEntry
} from '../models/official-entry.model';

export interface ConferenceState {
  officialList: OfficialEntry[];
  scannedList: string[];
}

@Injectable({ providedIn: 'root' })
export class ConferenceStore {
  private readonly categoryService = inject(CategoryService);
  private readonly _state = signal<ConferenceState>({ officialList: [], scannedList: [] });
  readonly state: Signal<ConferenceState> = this._state;

  // Derived totals help dashboards and cards consume aggregate information without repeating logic.
  readonly totals = computed(() => {
    const { officialList, scannedList } = this._state();
    const officialSet = new Set(officialList.map((entry) => entry.id));
    const scannedSet = new Set(scannedList);

    let ok = 0;
    let missing = 0;
    let extra = 0;

    // Official IDs that were scanned are OK, otherwise missing.
    officialList.forEach((entry) => {
      const id = entry.id;
      const isScanned = scannedSet.has(id);
      const category = this.categoryService.classify(isScanned, true);
      if (category === 'OK') ok += 1;
      if (category === 'MISSING') missing += 1;
    });

    // Anything scanned that was not expected is treated as extra.
    scannedSet.forEach((id) => {
      if (!officialSet.has(id)) {
        extra += 1;
      }
    });

    return { ok, missing, extra };
  });

  // Tabular projection of the official list is used by the import preview table.
  readonly officialRows = computed(() =>
    this._state().officialList.map((entry, index) => ({
      ordem: index + 1,
      id: entry.id,
      motivo: ISSUE_REASON_LABELS[entry.issue]
    }))
  );

  // Tabular projection of scanned data supports diagnostics in the scanner view.
  readonly scannedRows = computed(() =>
    this._state().scannedList.map((id, index) => ({ ordem: index + 1, id }))
  );

  constructor() {}

  readonly issueTotals = computed(() => {
    const totals: Record<IssueReason, number> = {
      'produto-danificado': 0,
      'destinatario-ausente': 0,
      'endereco-incorreto': 0,
      'nao-classificado': 0
    };
    this._state().officialList.forEach((entry) => {
      totals[entry.issue] += 1;
    });
    return totals;
  });

  // Sobrescreve a lista oficial com os IDs importados.
  setOfficial(list: OfficialEntry[]) {
    this._state.set({ ...this._state(), officialList: list });
  }

  // Adiciona um novo ID escaneado quando ainda não existe.
  addScanned(id: string): boolean {
    const current = this._state().scannedList;
    if (current.includes(id)) {
      return false;
    }

    this._state.set({ ...this._state(), scannedList: [...current, id] });
    return true;
  }

  // Utilitário para testes e UI limparem as listas ao reiniciar a conferência.
  reset() {
    this._state.set({ officialList: [], scannedList: [] });
  }
}
