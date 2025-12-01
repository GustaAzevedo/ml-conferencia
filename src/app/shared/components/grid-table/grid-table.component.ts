import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-grid-table',
  template: `
    <div class="grid-table">
      <table>
        <thead>
          <tr>
            <th *ngFor="let c of columns">{{ c }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let c of columns">{{ row[c] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`.grid-table { width: 100%; overflow: auto; } table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #ddd; }`]
})
export class GridTableComponent {
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
}
