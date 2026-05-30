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

import { DealManagerService } from '@features/deal-manager';
import { getDealCardURL } from '@features/deals-navigation';

import { DealCreateDTO, DealDTO } from '@entities/deal';

import { CRMErrorModel } from '@shared/model';
import { CRM_TOAST_KEY } from '@shared/ui';

import { DealCreateForm } from './deal-create-form/deal-create-form';
import { DealCreatePageController } from './deal-create-page.controller';

@Component({
  selector: 'crm-deal-create-page',
  providers: [DealCreatePageController, DealManagerService],
  imports: [DealCreateForm, ToastModule],
  templateUrl: './deal-create-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealCreatePage {
  private readonly dealForm = viewChild(DealCreateForm);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  private readonly controller = inject(DealCreatePageController);

  readonly loading = this.controller.loading;

  constructor() {
    effect(() => {
      const error = this.controller.error();

      if (error) {
        this.showError(error);
      }
    });
  }

  handleSubmit(formValue: DealCreateDTO): void {
    this.controller
      .createDeal(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        this.dealForm()?.clearForm();
        this.messageService.add({
          key: CRM_TOAST_KEY,
          severity: 'success',
          detail: 'Сделка успешно создана',
        });

        this.gotoDealCard(id);
      });
  }

  handleLoadError(error: CRMErrorModel): void {
    this.showError(error);
  }

  gotoDealCard(id: DealDTO['id']): void {
    this.router.navigateByUrl(`/${getDealCardURL(id)}`);
  }

  private showError(error: CRMErrorModel): void {
    this.messageService.add({
      key: CRM_TOAST_KEY,
      closable: true,
      sticky: true,
      severity: 'error',
      detail: error?.message,
      summary: error?.title || 'Ошибка',
    });
  }
}
