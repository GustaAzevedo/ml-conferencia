import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-import-panel',
  template: `
    <div class="import-panel">
      <h3>Import Panel (placeholder)</h3>
      <p>Drop or select a file to import IDs.</p>
    </div>
  `
})
export class ImportPanelComponent {}
