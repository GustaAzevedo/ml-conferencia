import { Injectable, signal, Signal } from '@angular/core';

export interface ConferenceState {
  officialList: string[];
  scannedList: string[];
}

@Injectable({ providedIn: 'root' })
export class ConferenceStore {
  private _state = signal<ConferenceState>({ officialList: [], scannedList: [] });
  readonly state: Signal<ConferenceState> = this._state;

  constructor() {}

  setOfficial(list: string[]) {
    this._state.set({ ...this._state(), officialList: list });
  }

  addScanned(id: string) {
    this._state.set({ ...this._state(), scannedList: [...this._state().scannedList, id] });
  }

  reset() {
    this._state.set({ officialList: [], scannedList: [] });
  }
}
