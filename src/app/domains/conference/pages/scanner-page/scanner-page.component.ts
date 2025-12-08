import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GridTableComponent } from '../../../../shared/components/grid-table/grid-table.component';
import { ScannerService } from '../../../../core/services/scanner.service';
import { ScanInputComponent } from '../../components/scan-input/scan-input.component';
import { StatusCardsComponent } from '../../components/status-cards/status-cards.component';
import { ConferenceStore } from '../../state/conference.store';
import { ConferenceStream } from '../../streams/conference.stream';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-scanner-page',
  imports: [CommonModule, ScanInputComponent, StatusCardsComponent, GridTableComponent, MatCardModule, MatSnackBarModule],
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.scss']
})
export class ScannerPageComponent {
  private readonly scannerService = inject(ScannerService);
  private readonly store = inject(ConferenceStore);
  private readonly stream = inject(ConferenceStream);
  private readonly snackBar = inject(MatSnackBar);

  readonly totals = this.store.totals;
  readonly scannedRows = this.store.scannedRows;
  readonly gridColumns = ['ordem', 'id'];

  constructor() {
    // Sincroniza cada evento do scanner com o estado e com os fluxos derivados.
    this.scannerService.scan$
      .pipe(takeUntilDestroyed())
      .subscribe((code) => {
        const inserted = this.store.addScanned(code);
        if (!inserted) {
          this.showDuplicateWarning(code);
          return;
        }

        this.stream.emitScan(code);
      });
  }

  // Entradas manuais reutilizam o serviço para manter um único fluxo de eventos.
  handleManualEntry(code: string) {
    this.scannerService.emitScan(code);
  }

  private showDuplicateWarning(code: string) {
    this.snackBar.open(`O ID ${code} já foi adicionado à lista`, 'Entendi', {
      duration: 4000
    });
  }
}
