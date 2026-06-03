import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { catchError, of } from 'rxjs';

import {
  DealAPIService,
  DealDTO,
  DealPriorityCode,
  DealSourceCode,
  DealUpdateDTO,
} from '@entities/deal';

import { DATE_PRIMENG_FORMAT, DATE_PRIMENG_PLACEHOLDER, watchSource } from '@shared/lib';
import { CRMErrorModel, FormControlsOF } from '@shared/model';
import {
  CRM_TOAST_KEY,
  FormMessageError,
  FormRestoreSuggestion,
  FormStateSaverService,
} from '@shared/ui';

import { DealUpdateDialogController } from './deal-update-dialog.controller';

interface DealUpdateFormValueModel<T extends boolean = boolean> {
  title: string;
  description: string | null;
  priorityCode: T extends true ? DealPriorityCode : DealPriorityCode | null;
  sourceCode: T extends true ? DealSourceCode : DealSourceCode | null;
  expectedCloseDate: Date | null;
}

@Component({
  selector: 'crm-deal-update-dialog',
  imports: [
    ReactiveFormsModule,
    FormMessageError,
    FormRestoreSuggestion,
    ButtonModule,
    DatePickerModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TooltipModule,
  ],
  providers: [DealUpdateDialogController],
  templateUrl: './deal-update-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealUpdateDialog implements AfterViewInit {
  private readonly controller = inject(DealUpdateDialogController);
  private readonly dealAPI = inject(DealAPIService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly formStateSaver = inject(FormStateSaverService);
  private readonly messageService = inject(MessageService);

  readonly model = input.required<DealDTO>();
  readonly visible = model(false);
  readonly updated = output<DealDTO>();

  readonly state = this.controller.state;
  readonly dateFormat = DATE_PRIMENG_FORMAT;
  readonly datePlaceholder = DATE_PRIMENG_PLACEHOLDER;
  readonly dealFormKey = computed(() => `deal-update-form-${this.model().id}`);

  readonly prioritiesLoading = signal(false);
  readonly priorities = toSignal(
    this.dealAPI.getPriorities().pipe(
      watchSource(this.prioritiesLoading),
      catchError((error: Error) => this.handleDictionaryLoadError(error)),
    ),
    { initialValue: [] },
  );

  readonly sourcesLoading = signal(false);
  readonly sources = toSignal(
    this.dealAPI.getSources().pipe(
      watchSource(this.sourcesLoading),
      catchError((error: Error) => this.handleDictionaryLoadError(error)),
    ),
    { initialValue: [] },
  );

  readonly dealForm = this.formBuilder.group<FormControlsOF<DealUpdateFormValueModel>>({
    title: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.maxLength(255)],
    }),
    description: this.formBuilder.control(null, { validators: [Validators.maxLength(2000)] }),
    priorityCode: this.formBuilder.control(null, { validators: [Validators.required] }),
    sourceCode: this.formBuilder.control(null, { validators: [Validators.required] }),
    expectedCloseDate: this.formBuilder.control(null),
  });

  readonly dealControls = this.dealForm.controls;

  constructor() {
    effect(() => {
      this.dealForm.patchValue(this.mapToFormValue(this.model()));
      this.dealForm.markAsPristine();
    });

    effect(() => {
      const state = this.state();

      if (state.state === 'error' && state.error) {
        this.showError(state.error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.subscribeToSaveFormState();
  }

  handleSubmit(): void {
    const formValue = this.dealForm.getRawValue();

    if (this.dealForm.invalid || !this.isFormValueValid(formValue)) {
      this.dealForm.markAllAsTouched();
      this.dealForm.updateValueAndValidity();
      return;
    }

    const { id } = this.model();

    this.controller
      .updateDeal(id, this.mapToDTO(formValue))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((deal) => {
        this.formStateSaver.clearFormState(this.dealFormKey());
        this.updated.emit(deal);
        this.visible.set(false);
      });
  }

  restoreForm(): void {
    const savedValue = this.formStateSaver.getFormState<Partial<DealUpdateFormValueModel>>(
      this.dealFormKey(),
    );

    if (savedValue) {
      this.dealForm.patchValue({
        ...savedValue,
        expectedCloseDate: this.parseDate(savedValue.expectedCloseDate),
      });
    }
  }

  clearForm(): void {
    this.dealForm.reset();
    this.formStateSaver.clearFormState(this.dealFormKey());
  }

  private subscribeToSaveFormState(): void {
    this.formStateSaver
      .saveFormState(this.dealFormKey(), this.dealForm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private isFormValueValid(
    value: DealUpdateFormValueModel,
  ): value is DealUpdateFormValueModel<true> {
    return !!value.priorityCode && !!value.sourceCode;
  }

  private mapToDTO(formValue: DealUpdateFormValueModel<true>): DealUpdateDTO {
    return {
      ...formValue,
      description: formValue.description || null,
    };
  }

  private mapToFormValue(deal: DealDTO): DealUpdateFormValueModel {
    return {
      title: deal.title,
      description: deal.description || null,
      priorityCode: deal.priority.code,
      sourceCode: deal.source.code,
      expectedCloseDate: this.parseDate(deal.expectedCloseDate),
    };
  }

  private parseDate(value: Date | string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return value;
    }

    const [day, month, year] = value.split('.');

    if (day && month && year) {
      return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
  }

  private handleDictionaryLoadError(error: Error) {
    const message = error.message || 'Не удалось получить данные справочника';

    console.error(error);
    this.showError(new CRMErrorModel(message));

    return of([]);
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
