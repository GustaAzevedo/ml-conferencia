import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-scan-input',
  template: `
    <div class="scan-input">
      <label>Scan input (placeholder)</label>
      <input />
    </div>
  `
})
export class ScanInputComponent {}
