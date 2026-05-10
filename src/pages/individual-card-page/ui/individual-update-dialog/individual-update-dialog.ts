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
  IndividualForm,
  IndividualFormValueModel,
  mapToIndividualFormValue,
} from '@features/individual-form';

import { IndividualModel } from '@entities/individual';

import { CRMErrorModel } from '@shared/model';
import { CRM_TOAST_KEY } from '@shared/ui';

import { IndividualUpdateDialogController } from './individual-update-dialog.controller';

@Component({
  selector: 'crm-individual-update-dialog',
  imports: [IndividualForm, DialogModule, ButtonModule],
  providers: [IndividualUpdateDialogController],
  templateUrl: './individual-update-dialog.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualUpdateDialog {
  private readonly controller = inject(IndividualUpdateDialogController);
  private readonly messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly model = input.required<IndividualModel>();
  readonly visible = model(false);
  readonly updated = output<IndividualModel>();

  readonly state = this.controller.state;

  readonly initialValue = computed(() => mapToIndividualFormValue(this.model()));

  constructor() {
    effect(() => {
      const state = this.state();

      if (state.state === 'error' && state.error) {
        this.showError(state.error);
      }
    });
  }

  handleFormSubmit(value: IndividualFormValueModel<true>): void {
    const { id } = this.model();

    this.controller
      .updateIndividual(id, value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((individual) => {
        this.updated.emit(individual);
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
