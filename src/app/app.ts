import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { Header } from '@widgets/header';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'content-center',
  },
})
export class App {
  private readonly document = inject(DOCUMENT);

  toggleDarkMode(): void {
    const root = this.document.querySelector('html');
    root?.classList.toggle('crm-dark');
  }
}
