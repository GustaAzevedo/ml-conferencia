import { Injectable } from '@angular/core';

export type Category = 'OK' | 'MISSING' | 'EXTRA' | 'UNKNOWN';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor() {}

  classify(found: boolean, expected: boolean): Category {
    if (found && expected) return 'OK';
    if (!found && expected) return 'MISSING';
    if (found && !expected) return 'EXTRA';
    return 'UNKNOWN';
  }
}
