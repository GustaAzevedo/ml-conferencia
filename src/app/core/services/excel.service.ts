import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { OfficialEntry, normalizeIssueReason } from '../../domains/conference/models/official-entry.model';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  constructor() {}

  /**
   * Lê a planilha e retorna os IDs (coluna A) acompanhados do motivo (coluna C).
   * Espera-se que os dados comecem na linha 2 (A2/C2) e que os IDs sejam numéricos.
   */
  async parseWorkbook(file: File): Promise<OfficialEntry[]> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      return [];
    }

    const sheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json<{ id?: string | number; reason?: string | number }>(sheet, {
      header: ['id', '_skip', 'reason'],
      range: 1, // ignora cabeçalho (linha 1)
      blankrows: false,
      defval: null
    });

    return rows.reduce<OfficialEntry[]>((acc, row) => {
      const rawId = row.id;
      if (rawId == null) {
        return acc;
      }

      const id = String(rawId).trim();
      if (!/^[0-9]+$/.test(id)) {
        return acc;
      }

      const issue = normalizeIssueReason(row.reason);
      acc.push({ id, issue });
      return acc;
    }, []);
  }
}
