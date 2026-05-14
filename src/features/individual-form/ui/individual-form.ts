import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { DATE_PRIMENG_FORMAT, DATE_PRIMENG_PLACEHOLDER, PHONE_NUMBER_REGEXP } from '@shared/lib';
import { FormMessageError, FormRestoreSuggestion, FormStateSaverService } from '@shared/ui';

import { isIndividualFormFieldsValid } from '../lib/individual-form-is-valid';
import { mapToIndividualFormValue } from '../lib/individual-form-value.mapper';
import { IndividualFormValueModel } from '../model/individual-create-form-value.model';

@Component({
  selector: 'crm-individual-form',
  exportAs: 'individualForm',
  imports: [
    ReactiveFormsModule,
    FormMessageError,
    FormRestoreSuggestion,
    CardModule,
    ButtonModule,
    MessageModule,
    FloatLabelModule,
    InputTextModule,
    DatePickerModule,
    ToastModule,
  ],
  templateUrl: './individual-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualForm implements AfterViewInit, OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly formStateSaver = inject(FormStateSaverService);

  readonly initialValue = input<Partial<IndividualFormValueModel> | null>(null);
  readonly loading = input(false);
  readonly submitLabel = input('Подтвердить');
  readonly customSubmitButton = input(false);
  readonly formSubmit = output<IndividualFormValueModel<true>>();

  readonly dateFormat = DATE_PRIMENG_FORMAT;
  readonly datePlaceholder = DATE_PRIMENG_PLACEHOLDER;

  readonly individualFormKey = 'individual-create-form';
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

  ngOnInit(): void {
    const initialFormValue = this.initialValue();

    if (initialFormValue) {
      this.individualForm.patchValue(initialFormValue);
    }
  }

  ngAfterViewInit(): void {
    this.subscribeToSaveFormState();
  }

  handleSubmit(): void {
    const formValue = this.individualForm.getRawValue();

    if (this.individualForm.valid && isIndividualFormFieldsValid(formValue)) {
      this.formSubmit.emit(formValue);
    }
  }

  restoreForm(): void {
    const savedValue = this.formStateSaver.getFormState<IndividualFormValueModel>(
      this.individualFormKey,
    );

    if (savedValue) {
      const restoreValue = mapToIndividualFormValue(savedValue);
      this.individualForm.patchValue(restoreValue);
    }
  }

  clearForm(): void {
    this.individualForm.reset();
    this.formStateSaver.clearFormState(this.individualFormKey);
  }

  private subscribeToSaveFormState(): void {
    this.formStateSaver
      .saveFormState(this.individualFormKey, this.individualForm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
