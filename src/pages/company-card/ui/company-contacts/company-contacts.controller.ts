import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { EMPTY, catchError } from 'rxjs';

import { CompanyContactManagerService } from '@features/company-contact-manager';

import { CompanyContactDTO } from '@entities/company-contact';

import { watchSource } from '@shared/lib';
import { CRM_TOAST_KEY } from '@shared/ui';

import { CompanyCardController } from '../company-card-page/company-card-page.controller';
import { CompanyContactUpdateMode } from '../company-contact-update-dialog/company-contact-update-dialog.model';

@Injectable()
export class CompanyContactsController {
  private readonly companyCardController = inject(CompanyCardController);
  private readonly companyContactManager = inject(CompanyContactManagerService);
  private readonly messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly companyID = computed(() => this.companyCardController.company()?.id ?? null);
  readonly createDialogVisible = signal(false);
  readonly updateDialogVisible = signal(false);
  readonly updateDialogMode = signal<CompanyContactUpdateMode>('role');
  readonly updateDialogContact = signal<CompanyContactDTO | null>(null);
  readonly loading = signal(false);
  readonly contactsChangedRevision = signal(0);

  openCreateDialog(): void {
    this.createDialogVisible.set(true);
  }

  openRoleUpdateDialog(contact: CompanyContactDTO | null): void {
    this.openUpdateDialog(contact, 'role');
  }

  openStatusUpdateDialog(contact: CompanyContactDTO | null): void {
    this.openUpdateDialog(contact, 'status');
  }

  handleUpdateDialogVisibilityChange(visible: boolean): void {
    this.updateDialogVisible.set(visible);

    if (!visible) {
      this.updateDialogContact.set(null);
    }
  }

  deleteContact(contact: CompanyContactDTO | null): void {
    const companyID = this.companyID();

    if (!companyID || !contact || this.loading()) {
      return;
    }

    this.companyContactManager
      .deleteContact(companyID, contact, { apiProcessor: watchSource(this.loading) })
      .pipe(
        catchError((error: Error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            sticky: true,
            key: CRM_TOAST_KEY,
            summary: 'Не удалось удалить контакт',
            detail: error.message,
          });

          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.contactsChangedRevision.update((revision) => revision + 1);
        this.messageService.add({
          severity: 'success',
          key: CRM_TOAST_KEY,
          summary: 'Успешно',
          detail: 'Контакт компании удален',
        });
      });
  }

  private openUpdateDialog(
    contact: CompanyContactDTO | null,
    mode: CompanyContactUpdateMode,
  ): void {
    if (!contact) {
      return;
    }

    this.updateDialogContact.set(contact);
    this.updateDialogMode.set(mode);
    this.updateDialogVisible.set(true);
  }
}
