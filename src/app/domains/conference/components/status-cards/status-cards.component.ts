import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-status-cards',
  template: `
    <div class="status-cards">
      <div>OK: --</div>
      <div>Missing: --</div>
      <div>Extra: --</div>
    </div>
  `
})
export class StatusCardsComponent {}
