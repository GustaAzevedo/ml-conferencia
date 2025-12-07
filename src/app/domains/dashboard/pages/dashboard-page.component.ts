import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { StatusCardsComponent } from '../../conference/components/status-cards/status-cards.component';
import { ConferenceStore } from '../../conference/state/conference.store';
import { ISSUE_REASON_LABELS, ISSUE_REASON_ORDER, IssueReason } from '../../conference/models/official-entry.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [CommonModule, StatusCardsComponent, MatCardModule, MatListModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  private readonly store = inject(ConferenceStore);

  private readonly issueColorTokens: Record<IssueReason, { color: string; fill: string }> = {
    'produto-danificado': {
      color: 'var(--ml-color-critical)',
      fill: 'var(--ml-color-critical-soft)'
    },
    'destinatario-ausente': {
      color: 'var(--ml-color-attention)',
      fill: 'var(--ml-color-attention-soft)'
    },
    'endereco-incorreto': {
      color: 'var(--ml-color-info)',
      fill: 'var(--ml-color-info-soft)'
    },
    'nao-classificado': {
      color: 'var(--ml-color-primary)',
      fill: 'var(--ml-color-primary-soft)'
    }
  };

  // Dashboard consome os mesmos totais derivados expostos pelo store.
  readonly totals = this.store.totals;
  readonly issueTotals = this.store.issueTotals;

  // Métricas auxiliares mantêm o template limpo e evitam cálculos repetidos.
  readonly officialCount = computed(() => this.store.state().officialList.length);
  readonly scannedCount = computed(() => this.store.state().scannedList.length);

  readonly issueBreakdown = ISSUE_REASON_ORDER.map((reason) => ({
    reason,
    label: ISSUE_REASON_LABELS[reason],
    color: this.issueColorTokens[reason].color,
    fill: this.issueColorTokens[reason].fill
  }));
}
