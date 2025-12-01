import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
    localStorage.clear();
  });

  it('should set and get value', () => {
    service.set('k', { a: 1 });
    const v = service.get('k');
    expect(v).toEqual({ a: 1 });
  });

  it('should remove value', () => {
    service.set('x', 2);
    service.remove('x');
    expect(service.get('x')).toBeNull();
  });
});
