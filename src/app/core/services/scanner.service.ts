import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScannerService {
  private _scan$ = new Subject<string>();
  readonly scan$: Observable<string> = this._scan$.asObservable();

  constructor() {}

  // Emit a scanned code (in real app this would listen to keyboard events or hardware)
  emitScan(code: string) {
    this._scan$.next(code);
  }
}
