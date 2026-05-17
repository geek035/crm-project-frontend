import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import {
  CompanyCreateFormValueModel,
  CompanyForm,
  mapToCompanyFormValue,
} from '@features/company-form';

import { CompanyDTO } from '@entities/company';

import { CRMErrorModel } from '@shared/model';
import { CRM_TOAST_KEY } from '@shared/ui';

import { CompanyUpdateDialogController } from './company-update-dialog.controller';

@Component({
  selector: 'crm-company-update-dialog',
  imports: [CompanyForm, DialogModule, ButtonModule],
  providers: [CompanyUpdateDialogController],
  templateUrl: './company-update-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyUpdateDialog {
  private readonly controller = inject(CompanyUpdateDialogController);
  private readonly messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly model = input.required<CompanyDTO>();
  readonly visible = model(false);
  readonly updated = output<CompanyDTO>();

  readonly state = this.controller.state;
  readonly initialValue = computed(() => mapToCompanyFormValue(this.model()));

  constructor() {
    effect(() => {
      const state = this.state();

      if (state.state === 'error' && state.error) {
        this.showError(state.error);
      }
    });
  }

  handleFormSubmit(value: CompanyCreateFormValueModel<true>): void {
    const { id } = this.model();

    this.controller
      .updateCompany(id, value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((company) => {
        this.updated.emit(company);
        this.visible.set(false);
      });
  }

  private showError(error: CRMErrorModel): void {
    this.messageService.add({
      severity: 'error',
      sticky: true,
      key: CRM_TOAST_KEY,
      summary: error.title,
      detail: error.message,
    });
  }
}
