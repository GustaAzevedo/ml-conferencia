import { ExcelService } from './excel.service';

describe('ExcelService (placeholder)', () => {
  let service: ExcelService;

  beforeEach(() => {
    service = new ExcelService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('parseWorkbook should return array for small blob', async () => {
    // create a minimal CSV-like file as placeholder (xlsx parsing won't work here but we just call)
    const blob = new Blob(["a,b,c"], { type: 'text/plain' });
    // convert to File for signature
    const file = new File([blob], 'test.txt');
    const res = await service.parseWorkbook(file);
    expect(Array.isArray(res)).toBeTrue();
  });
});
