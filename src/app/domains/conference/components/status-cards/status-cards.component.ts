import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.scss']
})
export class StatusCardsComponent {
  // Totais computados pelo store e repassados pela página hospedeira.
  @Input() ok = 0;
  @Input() missing = 0;
  @Input() extra = 0;

  get metrics() {
    return [
      { label: 'OK', value: this.ok, status: 'ok' },
      { label: 'Faltantes', value: this.missing, status: 'missing' },
      { label: 'Excedentes', value: this.extra, status: 'extra' }
    ] as const;
  }
}
