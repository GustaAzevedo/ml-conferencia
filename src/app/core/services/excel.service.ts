import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  constructor() {}

  /**
   * Parse an Excel file (xlsx) and return an array of string IDs (minimal placeholder).
   */
  async parseWorkbook(file: File): Promise<string[]> {
    // minimal placeholder implementation: read as ArrayBuffer and parse first sheet
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) return [];
    const sheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[];
    // flatten and coerce to strings (very naive)
    const ids: string[] = [];
    for (const row of json) {
      for (const cell of row) {
        if (cell != null) ids.push(String(cell));
      }
    }
    return ids;
  }
}
