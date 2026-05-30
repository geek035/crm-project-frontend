import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { catchError, of } from 'rxjs';

import { CompaniesRegistry } from '@widgets/companies-registry';
import { IndividualsRegistry } from '@widgets/individuals-registry';

import { CompanyManagerService } from '@features/company-manager';
import { IndividualManagerService } from '@features/individual-manager';

import { CompanyDTO } from '@entities/company';
import { DealAPIService, DealClientTypeCode, DealCreateDTO } from '@entities/deal';
import { IndividualModel } from '@entities/individual';

import { DATE_PRIMENG_FORMAT, DATE_PRIMENG_PLACEHOLDER, watchSource } from '@shared/lib';
import { CRMErrorModel, FormControlsOF } from '@shared/model';
import { FormMessageError, FormRestoreSuggestion, FormStateSaverService } from '@shared/ui';

import {
  isDealCreateFormValid,
  mapToDealCreateDTO,
  mapToDealCreateFormValue,
} from '../../lib/deal-create-form.mapper';
import { DealCreateFormValueModel } from '../../model/deal-create-form.model';

@Component({
  selector: 'crm-deal-create-form',
  imports: [
    ReactiveFormsModule,
    CompaniesRegistry,
    IndividualsRegistry,
    FormMessageError,
    FormRestoreSuggestion,
    CardModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TabsModule,
    TooltipModule,
  ],
  templateUrl: './deal-create-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CompanyManagerService, IndividualManagerService],
})
export class DealCreateForm implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly formStateSaver = inject(FormStateSaverService);
  private readonly dealAPI = inject(DealAPIService);
  private readonly companyManager = inject(CompanyManagerService);
  private readonly individualManager = inject(IndividualManagerService);

  readonly formSubmit = output<DealCreateDTO>();
  readonly loadError = output<CRMErrorModel>();
  readonly loading = input(false);

  readonly selectedCompany = signal<CompanyDTO | null>(null);
  readonly selectedIndividual = signal<IndividualModel | null>(null);
  readonly clientTab = signal<'companies' | 'individuals'>('companies');

  readonly productsLoading = signal(false);
  readonly products = toSignal(
    this.dealAPI.getProducts().pipe(
      watchSource(this.productsLoading),
      catchError((error: Error) => this.handleDictionaryLoadError(error)),
    ),
    { initialValue: [] },
  );

  readonly currenciesLoading = signal(false);
  readonly currencies = toSignal(
    this.dealAPI.getCurrencies().pipe(
      watchSource(this.currenciesLoading),
      catchError((error: Error) => this.handleDictionaryLoadError(error)),
    ),
    { initialValue: [] },
  );

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

  readonly dateFormat = DATE_PRIMENG_FORMAT;
  readonly datePlaceholder = DATE_PRIMENG_PLACEHOLDER;
  readonly dealFormKey = 'deal-create-form';

  readonly dealForm = this.formBuilder.group<FormControlsOF<DealCreateFormValueModel>>({
    number: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    clientTypeCode: this.formBuilder.control(null, { validators: [Validators.required] }),
    clientID: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    title: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.maxLength(255)],
    }),
    description: this.formBuilder.control(null, { validators: [Validators.maxLength(2000)] }),
    productCode: this.formBuilder.control(null, { validators: [Validators.required] }),
    amount: this.formBuilder.control(null, {
      validators: [Validators.required, Validators.min(0)],
      updateOn: 'blur',
    }),
    currencyCode: this.formBuilder.control(null, { validators: [Validators.required] }),
    priorityCode: this.formBuilder.control(null, { validators: [Validators.required] }),
    sourceCode: this.formBuilder.control(null, { validators: [Validators.required] }),
    expectedCloseDate: this.formBuilder.control(null),
  });

  readonly dealControls = this.dealForm.controls;

  ngAfterViewInit(): void {
    this.subscribeToSaveFormState();
  }

  handleCompanySelection(company: CompanyDTO | null): void {
    this.selectedCompany.set(company);

    if (company) {
      this.clientTab.set('companies');
      this.selectedIndividual.set(null);
      this.patchClient(company.id, DealClientTypeCode.COMPANY);
    } else if (this.dealControls.clientTypeCode.value === DealClientTypeCode.COMPANY) {
      this.clearClient();
    }
  }

  handleIndividualSelection(individual: IndividualModel | null): void {
    this.selectedIndividual.set(individual);

    if (individual) {
      this.clientTab.set('individuals');
      this.selectedCompany.set(null);
      this.patchClient(individual.id, DealClientTypeCode.INDIVIDUAL);
    } else if (this.dealControls.clientTypeCode.value === DealClientTypeCode.INDIVIDUAL) {
      this.clearClient();
    }
  }

  handleSubmit(): void {
    const formValue = this.dealForm.getRawValue();

    if (this.dealForm.invalid || !isDealCreateFormValid(formValue)) {
      this.dealForm.markAllAsTouched();
      this.dealForm.updateValueAndValidity();
      return;
    }

    this.formSubmit.emit(mapToDealCreateDTO(formValue));
  }

  restoreForm(): void {
    const savedValue = this.formStateSaver.getFormState<DealCreateFormValueModel>(this.dealFormKey);

    if (savedValue) {
      this.dealForm.patchValue(mapToDealCreateFormValue(savedValue));
      this.restoreClientSelection(savedValue);
    }
  }

  clearForm(): void {
    this.dealForm.reset();
    this.selectedCompany.set(null);
    this.selectedIndividual.set(null);
    this.formStateSaver.clearFormState(this.dealFormKey);
  }

  private patchClient(id: string, type: DealClientTypeCode): void {
    this.dealControls.clientID.setValue(id);
    this.dealControls.clientTypeCode.setValue(type);
    this.dealControls.clientID.markAsDirty();
    this.dealControls.clientTypeCode.markAsDirty();
    this.dealControls.clientID.updateValueAndValidity();
    this.dealControls.clientTypeCode.updateValueAndValidity();
  }

  private clearClient(): void {
    this.dealControls.clientID.reset();
    this.dealControls.clientTypeCode.reset();
  }

  private restoreClientSelection(value: DealCreateFormValueModel): void {
    if (!value.clientID || !value.clientTypeCode) {
      this.selectedCompany.set(null);
      this.selectedIndividual.set(null);
      return;
    }

    if (value.clientTypeCode === DealClientTypeCode.COMPANY) {
      this.clientTab.set('companies');
      this.selectedIndividual.set(null);
      this.companyManager
        .getCompanyByID(value.clientID)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error: Error) => this.handleClientLoadError(error)),
        )
        .subscribe((company) => this.selectedCompany.set(company));
      return;
    }

    this.clientTab.set('individuals');
    this.selectedCompany.set(null);
    this.individualManager
      .getIndividualByID(value.clientID)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: Error) => this.handleClientLoadError(error)),
      )
      .subscribe((individual) => this.selectedIndividual.set(individual));
  }

  private subscribeToSaveFormState(): void {
    this.formStateSaver
      .saveFormState(this.dealFormKey, this.dealForm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private handleDictionaryLoadError(error: Error) {
    const message = error.message || 'Не удалось получить данные справочника';

    console.error(error);
    this.loadError.emit(new CRMErrorModel(message));

    return of([]);
  }

  private handleClientLoadError(error: Error) {
    const message = error.message || 'Не удалось восстановить выбранного клиента';

    console.error(error);
    this.loadError.emit(new CRMErrorModel(message));

    return of(null);
  }
}
