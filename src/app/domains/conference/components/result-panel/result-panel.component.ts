import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-result-panel',
  template: `
    <div class="result-panel">
      <h3>Result Panel (placeholder)</h3>
    </div>
  `
})
export class ResultPanelComponent {}
