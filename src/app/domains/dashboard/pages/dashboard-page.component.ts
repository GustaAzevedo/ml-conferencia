import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { StatusCardsComponent } from '../../conference/components/status-cards/status-cards.component';
import { ConferenceStore } from '../../conference/state/conference.store';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [CommonModule, StatusCardsComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  private readonly store = inject(ConferenceStore);

  // Dashboard consome os mesmos totais derivados expostos pelo store.
  readonly totals = this.store.totals;

  // Métricas auxiliares mantêm o template limpo e evitam cálculos repetidos.
  readonly officialCount = computed(() => this.store.state().officialList.length);
  readonly scannedCount = computed(() => this.store.state().scannedList.length);
}
