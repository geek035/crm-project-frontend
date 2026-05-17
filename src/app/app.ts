import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { Header } from '@widgets/header';

import { CRM_TOAST_KEY, ConfirmationDialog, ConfirmationDialogService } from '@shared/ui';

@Component({
  selector: 'crm-root',
  imports: [RouterOutlet, Header, ButtonModule, ToastModule, ConfirmationDialog],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'content-center',
  },
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly confirmationDialogService = inject(ConfirmationDialogService);

  readonly crmToastKey = CRM_TOAST_KEY;
  readonly confirmationRequest = this.confirmationDialogService.request;

  toggleDarkMode(): void {
    const root = this.document.querySelector('html');
    root?.classList.toggle('crm-dark');
  }

  handleConfirmation(confirmed: boolean): void {
    this.confirmationDialogService.resolve(confirmed);
  }
}
