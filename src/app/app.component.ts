import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Título exibido no shell para branding e acessibilidade.
  title = 'ml-conferencia';

  // Mapa de navegação que alimenta os links exibidos no menu do shell.
  readonly navLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Importação', path: '/importacao' },
    { label: 'Scanner', path: '/scanner' }
  ];
}
