import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { catchError, of } from 'rxjs';

import { CompanyAPIService } from '@entities/company';

import { watchSource } from '@shared/lib';
import { FormControlsOF } from '@shared/model';
import { FormMessageError, FormRestoreSuggestion, FormStateSaverService } from '@shared/ui';

import { isCompanyCreateFormValid } from '../lib/is-company-create-form-valid';
import { CompanyCreateFormValueModel } from '../model/company-create-form.model';

@Component({
  selector: 'crm-company-form',
  imports: [
    ReactiveFormsModule,
    FormMessageError,
    FormRestoreSuggestion,
    CardModule,
    ButtonModule,
    MessageModule,
    FloatLabelModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './company-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyForm implements OnInit, AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly formStateSaver = inject(FormStateSaverService);
  private readonly companyAPI = inject(CompanyAPIService);

  readonly initialValue = input<Partial<CompanyCreateFormValueModel> | null>(null);
  readonly loading = input(false);
  readonly submitLabel = input('Подтвердить');
  readonly customSubmitButton = input(false);
  readonly formSubmit = output<CompanyCreateFormValueModel<true>>();

  readonly clientSegmentsLoading = signal(false);
  readonly clientSegments = toSignal(
    this.companyAPI.getClientSegments().pipe(
      watchSource(this.clientSegmentsLoading),
      catchError(() => of([])),
    ),
    { initialValue: [] },
  );

  readonly companyFormKey = 'company-create-form';
  readonly companyForm = this.formBuilder.nonNullable.group<
    FormControlsOF<CompanyCreateFormValueModel>
  >({
    officialName: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    commercialName: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    inn: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
      updateOn: 'blur',
    }),
    kpp: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.pattern(/^\d{9}$/)],
      updateOn: 'blur',
    }),
    clientSegment: this.formBuilder.nonNullable.control(null, {
      validators: [Validators.required],
    }),
    registeredAddress: this.formBuilder.nonNullable.group<
      FormControlsOF<CompanyCreateFormValueModel['registeredAddress']>
    >({
      country: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
      region: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
      city: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
      street: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
      building: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
      office: this.formBuilder.control(null),
      postalCode: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.pattern(/^\d{6}$/)],
        updateOn: 'blur',
      }),
    }),
  });

  readonly companyControls = this.companyForm.controls;
  readonly registeredAddressControls = this.companyControls.registeredAddress.controls;

  ngOnInit(): void {
    const initialFormValue = this.initialValue();

    if (initialFormValue) {
      this.companyForm.patchValue(initialFormValue);
    }
  }

  ngAfterViewInit(): void {
    this.subscribeToSaveFormState();
  }

  handleSubmit(): void {
    const formValue = this.companyForm.getRawValue();

    if (this.companyForm.valid && isCompanyCreateFormValid(formValue)) {
      this.formSubmit.emit(formValue);
    }
  }

  restoreForm(): void {
    const savedValue = this.formStateSaver.getFormState<CompanyCreateFormValueModel>(
      this.companyFormKey,
    );

    if (savedValue) {
      this.companyForm.patchValue(savedValue);
    }
  }

  clearForm(): void {
    this.companyForm.reset();
    this.formStateSaver.clearFormState(this.companyFormKey);
  }

  private subscribeToSaveFormState(): void {
    this.formStateSaver
      .saveFormState(this.companyFormKey, this.companyForm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
