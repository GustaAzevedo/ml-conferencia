import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent {
  // Nomes das colunas definem tanto os cabeçalhos quanto as chaves lidas em cada linha.
  @Input() columns: string[] = [];
  // Objetos arbitrários para que o componente permaneça genérico.
  @Input() rows: any[] = [];
}
