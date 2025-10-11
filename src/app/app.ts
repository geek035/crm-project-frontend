import { Component, DOCUMENT, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);

  toggleDarkMode(): void {
    const root = this.document.querySelector('html');
    root?.classList.toggle('crm-dark');
  }
}
