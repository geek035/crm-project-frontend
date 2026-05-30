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
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Observable, catchError, combineLatest, filter, of, switchMap, tap } from 'rxjs';

import { watchSource } from '@shared/lib';
import { DirectoryEntryDTO } from '@shared/model';

import { CompanyContactAPIService } from '../../api/company-contact-api.service';
import { CompanyContactDTO } from '../../model/company-contact-dto.model';
import { CompanyContactRoleCode } from '../../model/company-contact-role-code.enum';
import { CompanyContactStatusCode } from '../../model/company-contact-status-code';
import { CompanyContactUpdateDialogController } from './company-contact-update-dialog.controller';
import {
  CompanyContactUpdateMode,
  CompanyContactUpdateValue,
} from './company-contact-update-dialog.model';

type CompanyContactUpdateOption = DirectoryEntryDTO<CompanyContactUpdateValue>;

@Component({
  selector: 'crm-company-contact-update-dialog',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule,
    SelectModule,
  ],
  providers: [CompanyContactUpdateDialogController],
  templateUrl: './company-contact-update-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyContactUpdateDialog {
  private readonly controller = inject(CompanyContactUpdateDialogController);
  private readonly companyContactAPI = inject(CompanyContactAPIService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly companyID = input.required<string>();
  readonly contact = input.required<CompanyContactDTO>();
  readonly mode = input.required<CompanyContactUpdateMode>();
  readonly visible = model(false);
  readonly updated = output<CompanyContactDTO>();

  readonly state = this.controller.state;
  readonly optionsLoading = signal(false);
  readonly optionsError = signal<string | null>(null);

  readonly dialogHeader = computed(() =>
    this.mode() === 'role' ? 'Обновление роли контакта' : 'Обновление статуса контакта',
  );
  readonly fieldLabel = computed(() => (this.mode() === 'role' ? 'Роль' : 'Статус'));
  readonly selectInputID = computed(() =>
    this.mode() === 'role' ? 'company-contact-update-role' : 'company-contact-update-status',
  );

  readonly formID = 'company-contact-update-form';
  readonly updateForm = this.formBuilder.group({
    value: this.formBuilder.control<CompanyContactUpdateValue | null>(null, [Validators.required]),
  });
  readonly updateControls = this.updateForm.controls;

  readonly options = toSignal(
    combineLatest([
      toObservable(this.companyID),
      toObservable(this.mode),
      toObservable(this.visible),
    ]).pipe(
      filter(([, , visible]) => visible),
      switchMap(([companyID, mode]) =>
        this.getOptions(companyID, mode).pipe(
          tap(() => this.optionsError.set(null)),
          watchSource(this.optionsLoading),
          catchError((error: Error) => {
            console.error(error);
            this.optionsError.set(
              error.message ||
                (mode === 'role'
                  ? 'Не удалось загрузить роли контактов'
                  : 'Не удалось загрузить статусы контактов'),
            );

            return of([]);
          }),
        ),
      ),
    ),
    { initialValue: [] as CompanyContactUpdateOption[] },
  );

  constructor() {
    effect(() => {
      if (!this.visible()) {
        return;
      }

      untracked(() => {
        const contact = this.contact();
        const mode = this.mode();
        const value = mode === 'role' ? contact.role.code : contact.status.code;

        this.updateControls.value.setValue(value);
        this.controller.reset();
        this.optionsError.set(null);
      });
    });
  }

  handleSubmit(): void {
    this.updateForm.markAllAsTouched();

    if (this.updateForm.invalid) {
      return;
    }

    const { value } = this.updateForm.getRawValue();
    const request$ =
      this.mode() === 'role'
        ? this.controller.updateRole(
            this.companyID(),
            this.contact(),
            value as CompanyContactRoleCode,
          )
        : this.controller.updateStatus(
            this.companyID(),
            this.contact(),
            value as CompanyContactStatusCode,
          );

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((contact) => {
      this.updated.emit(contact);
      this.visible.set(false);
    });
  }

  resetForm(): void {
    this.updateForm.reset();
    this.optionsError.set(null);
    this.controller.reset();
  }

  private getOptions(
    companyID: string,
    mode: CompanyContactUpdateMode,
  ): Observable<CompanyContactUpdateOption[]> {
    return mode === 'role'
      ? this.companyContactAPI.getRoles(companyID)
      : this.companyContactAPI.getStatuses(companyID);
  }
}
