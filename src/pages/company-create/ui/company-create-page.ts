import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { getCompanyCardURL } from '@features/companies-navigation';
import { CompanyCreateFormValueModel, CompanyForm } from '@features/company-form';
import { CompanyManagerService } from '@features/company-manager';

import { CompanyDTO } from '@entities/company';

import { CRM_TOAST_KEY } from '@shared/ui';

import { CompanyCreatePageController } from './company-create-page.controller';

@Component({
  selector: 'crm-company-create-page',
  providers: [CompanyCreatePageController, CompanyManagerService],
  imports: [CompanyForm, ToastModule],
  templateUrl: './company-create-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCreatePage {
  private readonly companyForm = viewChild(CompanyForm);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  private readonly controller = inject(CompanyCreatePageController);

  readonly loading = this.controller.loading;

  constructor() {
    effect(() => {
      const error = this.controller.error();

      if (error) {
        this.messageService.add({
          closable: true,
          sticky: true,
          severity: 'error',
          detail: error?.message,
          summary: error?.title || 'Ошибка',
        });
      }
    });
  }

  handleSubmit(formValue: CompanyCreateFormValueModel<true>): void {
    this.controller
      .createCompany(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        this.companyForm()?.clearForm();
        this.messageService.add({
          key: CRM_TOAST_KEY,
          severity: 'success',
          detail: 'Компания успешно создана',
        });

        this.gotoCompanyCard(id);
      });
  }

  gotoCompanyCard(id: CompanyDTO['id']): void {
    this.router.navigateByUrl(`/${getCompanyCardURL(id)}`);
  }
}
