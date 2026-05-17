import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { catchError, combineLatest, filter, of, switchMap, tap } from 'rxjs';

import { IndividualsRegistry } from '@widgets/individuals-registry';

import {
  CompanyContactCreateCommand,
  CompanyContactManagerService,
} from '@features/company-contact-manager';

import { CompanyContactAPIService, CompanyContactRoleCode } from '@entities/company-contact';
import { IndividualModel } from '@entities/individual';

import { watchSource } from '@shared/lib';

import { CompanyContactCreateDialogController } from './company-contact-create-dialog.controller';

@Component({
  selector: 'crm-company-contact-create-dialog',
  imports: [
    ReactiveFormsModule,
    IndividualsRegistry,
    DialogModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule,
    SelectModule,
  ],
  providers: [CompanyContactManagerService, CompanyContactCreateDialogController],
  templateUrl: './company-contact-create-dialog.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyContactCreateDialog {
  private readonly controller = inject(CompanyContactCreateDialogController);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly companyContactAPI = inject(CompanyContactAPIService);

  readonly companyID = input.required<string>();
  readonly visible = model(false);
  readonly created = output<string>();

  readonly selectedIndividual = signal<IndividualModel | null>(null);
  readonly state = this.controller.state;
  readonly rolesLoading = signal(false);
  readonly rolesError = signal<string | null>(null);
  readonly roles = toSignal(
    combineLatest([toObservable(this.companyID), toObservable(this.visible)]).pipe(
      filter(([, visible]) => visible),
      switchMap(([companyID]) =>
        this.companyContactAPI.getRoles(companyID).pipe(
          tap(() => this.rolesError.set(null)),
          watchSource(this.rolesLoading),
          catchError((error: Error) => {
            console.error(error);
            this.rolesError.set(error.message || 'Не удалось загрузить роли контактов');

            return of([]);
          }),
        ),
      ),
    ),
    { initialValue: [] },
  );

  readonly formID = 'company-contact-create-form';
  readonly contactForm = this.formBuilder.nonNullable.group({
    individualID: ['', [Validators.required]],
    roleCode: this.formBuilder.control<CompanyContactRoleCode | null>(null, [Validators.required]),
  });
  readonly contactControls = this.contactForm.controls;

  handleIndividualSelection(individual: IndividualModel | null): void {
    this.selectedIndividual.set(individual);
    this.contactControls.individualID.setValue(individual?.id ?? '');
  }

  handleSubmit(): void {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      return;
    }

    const value = this.contactForm.getRawValue() as CompanyContactCreateCommand;

    this.controller
      .addContact(this.companyID(), value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((contactID) => {
        this.created.emit(contactID);
        this.visible.set(false);
        this.resetForm();
      });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.selectedIndividual.set(null);
    this.rolesError.set(null);
    this.controller.reset();
  }
}
