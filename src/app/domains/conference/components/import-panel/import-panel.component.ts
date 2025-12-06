import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-import-panel',
  templateUrl: './import-panel.component.html',
  styleUrls: ['./import-panel.component.scss']
})
export class ImportPanelComponent {
  // Estados de carregamento e erro são informados pelo container para feedback ao operador.
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;

  // Emite o arquivo escolhido para que a página faça o parsing.
  @Output() fileSelected = new EventEmitter<File>();

  // Trata o change do input nativo e garante o envio apenas do primeiro arquivo.
  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);
    if (file) {
      this.fileSelected.emit(file);
      input.value = '';
    }
  }
}
