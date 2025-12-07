import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  selector: 'app-import-panel',
  templateUrl: './import-panel.component.html',
  styleUrls: ['./import-panel.component.scss']
})
export class ImportPanelComponent {
  // Estados de carregamento e erro são informados pelo container para feedback ao operador.
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;
  lastFileName: string | null = null;
  private pendingFile: File | null = null;
  showValidationError = false;

  // Emite o arquivo escolhido para que a página faça o parsing.
  @Output() fileSelected = new EventEmitter<File>();

  // Trata o change do input nativo e garante o envio apenas do primeiro arquivo.
  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);
    if (file) {
      this.lastFileName = file.name;
      this.pendingFile = file;
      this.showValidationError = false;
      input.value = '';
    }
  }

  confirmImport() {
    if (!this.pendingFile) {
      this.showValidationError = true;
      return;
    }

    this.showValidationError = false;
    this.fileSelected.emit(this.pendingFile);
    this.pendingFile = null;
    this.lastFileName = null;
  }

  clearSelection() {
    this.pendingFile = null;
    this.lastFileName = null;
    this.showValidationError = false;
  }
}
