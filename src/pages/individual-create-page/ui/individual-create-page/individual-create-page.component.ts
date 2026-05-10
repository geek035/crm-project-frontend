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

import { IndividualForm, IndividualFormValueModel } from '@features/individual-form';
import { IndividualManagerService } from '@features/individual-manager';
import { getIndividualCardURL } from '@features/individuals-navigation';

import { IndividualModel } from '@entities/individual';

import { CRM_TOAST_KEY } from '@shared/ui';

import { IndividualCreatePageController } from './individual-create-page.controller';

@Component({
  selector: 'crm-individual-create-page',
  providers: [IndividualCreatePageController, IndividualManagerService],
  imports: [IndividualForm, ToastModule],
  templateUrl: './individual-create-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualCreatePage {
  private readonly individualForm = viewChild(IndividualForm);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  private readonly controller = inject(IndividualCreatePageController);

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
          summary: error?.title,
        });
      }
    });
  }

  handleSubmit(formValue: IndividualFormValueModel): void {
    this.controller
      .addIndividual(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        this.individualForm()?.clearForm();
        this.messageService.add({
          key: CRM_TOAST_KEY,
          severity: 'success',
          detail: 'Физическое лицо успешно создано',
        });

        this.gotoIndividualCard(id);
      });
  }

  gotoIndividualCard(id: IndividualModel['id']): void {
    this.router.navigateByUrl(`/${getIndividualCardURL(id)}`);
  }
}
