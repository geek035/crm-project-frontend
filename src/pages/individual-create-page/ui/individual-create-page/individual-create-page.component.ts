import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { IndividualManagerService } from '@features/individual-manager';
import { getIndividualCardURL } from '@features/individuals-navigation';

import { IndividualModel } from '@entities/individual';

import { DATE_PRIMENG_FORMAT, DATE_PRIMENG_PLACEHOLDER, PHONE_NUMBER_REGEXP } from '@shared/lib';
import { CRM_TOAST_KEY, FormMessageError, FormStateSaverService } from '@shared/ui';

import { mapToIndividualCreateFormValue } from '../../lib/individual-create-form-value.mapper';
import { IndividualCreatePageController } from './individual-create-page.controller';

@Component({
  selector: 'crm-individual-create-page',
  providers: [IndividualCreatePageController, IndividualManagerService],
  imports: [
    FormMessageError,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    FluidModule,
    DatePickerModule,
    TooltipModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './individual-create-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualCreatePage implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly formStateSaver = inject(FormStateSaverService);
  private readonly controller = inject(IndividualCreatePageController);

  readonly dateFormat = DATE_PRIMENG_FORMAT;
  readonly datePlaceholder = DATE_PRIMENG_PLACEHOLDER;

  readonly loading = this.controller.loading;

  readonly individualFormKey = 'individual-form-create';
  readonly individualForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required]],
    secondName: ['', [Validators.required]],
    surname: new FormControl<string | null>(null),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
      updateOn: 'blur',
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required, Validators.pattern(PHONE_NUMBER_REGEXP)],
      nonNullable: true,
      updateOn: 'blur',
    }),
    birthdate: new FormControl<Date | null>(null, [Validators.required]),
  });

  readonly individualControls = this.individualForm.controls;

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

  ngAfterViewInit(): void {
    this.subscribeToSaveFormState();

    queueMicrotask(() => {
      this.suggestRestoreForm();
    });
  }

  handleSubmit(): void {
    const formValue = this.individualForm.getRawValue();

    if (this.individualForm.valid && this.controller.isFormFieldsValid(formValue)) {
      this.controller
        .addIndividual(formValue)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((id) => {
          this.formStateSaver.clearFormState(this.individualFormKey);
          this.messageService.add({
            key: CRM_TOAST_KEY,
            severity: 'success',
            detail: 'Физическое лицо успешно создано',
          });

          this.gotoIndividualCard(id);
        });
    }
  }

  gotoIndividualCard(id: IndividualModel['id']): void {
    this.router.navigateByUrl(`/${getIndividualCardURL(id)}`);
  }

  restoreForm(): void {
    const savedValue = this.formStateSaver.getFormState<typeof this.individualForm.value>(
      this.individualFormKey,
    );

    if (savedValue) {
      const restoreValue = mapToIndividualCreateFormValue(savedValue);
      this.individualForm.patchValue(restoreValue);
    }
  }

  clearForm(): void {
    this.individualForm.reset();
    this.formStateSaver.clearFormState(this.individualFormKey);
  }

  private suggestRestoreForm(): void {
    if (this.formStateSaver.isFormStateSaved(this.individualFormKey)) {
      this.messageService.add({
        key: this.individualFormKey,
        sticky: true,
        severity: 'contrast',
        summary: 'Нашли данные',
        detail: 'Нашли сохраненную форму. Восстановить данные?',
      });
    }
  }

  private subscribeToSaveFormState(): void {
    this.formStateSaver
      .saveFormState(this.individualFormKey, this.individualForm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
