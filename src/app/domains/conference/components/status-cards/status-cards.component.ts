import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.scss']
})
export class StatusCardsComponent {
  // Totais computados pelo store e repassados pela página hospedeira.
  @Input() ok = 0;
  @Input() missing = 0;
  @Input() extra = 0;
}
