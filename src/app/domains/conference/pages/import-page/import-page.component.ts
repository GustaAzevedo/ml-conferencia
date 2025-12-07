import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GridTableComponent } from '../../../../shared/components/grid-table/grid-table.component';
import { ExcelService } from '../../../../core/services/excel.service';
import { ImportPanelComponent } from '../../components/import-panel/import-panel.component';
import { StatusCardsComponent } from '../../components/status-cards/status-cards.component';
import { ConferenceStore } from '../../state/conference.store';
import { ConferenceStream } from '../../streams/conference.stream';

@Component({
  standalone: true,
  selector: 'app-import-page',
  imports: [CommonModule, ImportPanelComponent, GridTableComponent, StatusCardsComponent],
  templateUrl: './import-page.component.html',
  styleUrls: ['./import-page.component.scss']
})
export class ImportPageComponent {
  private readonly excelService = inject(ExcelService);
  private readonly store = inject(ConferenceStore);
  private readonly stream = inject(ConferenceStream);

  // Signals que controlam feedback visual durante importações demoradas.
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // Dados derivados expostos pelo store.
  readonly totals = this.store.totals;
  readonly officialRows = this.store.officialRows;

  // Colunas da grid definidas uma vez para manter o template simples.
  readonly gridColumns = ['ordem', 'id', 'motivo'];

  // Trata o arquivo emitido pelo painel de importação.
  async handleFileSelected(file: File) {
    this.errorMessage.set(null);
    this.isLoading.set(true);
    try {
      const entries = await this.excelService.parseWorkbook(file);
      this.store.setOfficial(entries);
      this.stream.emitImport(entries);
    } catch (error) {
      console.error('Erro ao ler planilha', error);
      this.errorMessage.set('Não foi possível ler o arquivo informado.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
