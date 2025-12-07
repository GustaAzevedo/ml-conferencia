import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { OfficialEntry } from '../models/official-entry.model';

@Injectable({ providedIn: 'root' })
export class ConferenceStream {
  // stream of raw scanned codes
  private _scans$ = new Subject<string>();
  readonly scans$: Observable<string> = this._scans$.asObservable();

  // stream of imported IDs (from excel)
  private _imports$ = new Subject<OfficialEntry[]>();
  readonly imports$: Observable<OfficialEntry[]> = this._imports$.asObservable();

  emitScan(code: string) {
    this._scans$.next(code);
  }

  emitImport(list: OfficialEntry[]) {
    this._imports$.next(list);
  }
}
