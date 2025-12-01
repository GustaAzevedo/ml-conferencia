import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private prefix = 'ml-conferencia:';

  constructor() {}

  set<T>(key: string, value: T) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  get<T>(key: string): T | null {
    const v = localStorage.getItem(this.prefix + key);
    return v ? (JSON.parse(v) as T) : null;
  }

  remove(key: string) {
    localStorage.removeItem(this.prefix + key);
  }
}
