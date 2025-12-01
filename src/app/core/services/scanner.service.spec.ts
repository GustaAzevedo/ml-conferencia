import { ScannerService } from './scanner.service';

describe('ScannerService', () => {
  let service: ScannerService;

  beforeEach(() => {
    service = new ScannerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit scans', (done) => {
    const expected = 'ABC123';
    service.scan$.subscribe((code) => {
      expect(code).toBe(expected);
      done();
    });
    service.emitScan(expected);
  });
});
