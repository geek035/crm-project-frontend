import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { Header } from '@widgets/header';

import { CRM_TOAST_KEY } from '@shared/ui';

@Component({
  selector: 'crm-root',
  imports: [RouterOutlet, Header, ButtonModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'content-center',
  },
})
export class App {
  private readonly document = inject(DOCUMENT);

  readonly crmToastKey = CRM_TOAST_KEY;

  toggleDarkMode(): void {
    const root = this.document.querySelector('html');
    root?.classList.toggle('crm-dark');
  }
}
