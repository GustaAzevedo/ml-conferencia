import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-scan-input',
  templateUrl: './scan-input.component.html',
  styleUrls: ['./scan-input.component.scss']
})
export class ScanInputComponent {
  // Placeholder customizável exibido no campo de entrada.
  @Input() placeholder = 'Bipe ou digite o código do pacote';

  // Emite o código capturado localmente para que o container repasse ao fluxo do scanner.
  @Output() codeCaptured = new EventEmitter<string>();

  // Envia o valor digitado e limpa o controle para simular um bip físico.
  submitFrom(input: HTMLInputElement) {
    const value = input.value.trim();
    if (value) {
      this.codeCaptured.emit(value);
      input.value = '';
    }
  }
}
