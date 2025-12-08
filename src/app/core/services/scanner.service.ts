import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScannerService {
  private _scan$ = new Subject<string>();
  readonly scan$: Observable<string> = this._scan$.asObservable();

  constructor() {}

  // Emite um código escaneado (em produção ouviria teclado ou hardware dedicado)
  emitScan(code: string) {
    this._scan$.next(code);
  }
}
