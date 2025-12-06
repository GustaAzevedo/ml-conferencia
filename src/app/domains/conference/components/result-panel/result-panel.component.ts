import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-result-panel',
  templateUrl: './result-panel.component.html',
  styleUrls: ['./result-panel.component.scss']
})
export class ResultPanelComponent {
  // Reservado para gráficos/listagens específicos da conferência em versões futuras.
}
