import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
import { catchError, filter, of, switchMap, tap } from 'rxjs';

import { CompanyAPIService, CompanyDTO, CompanyLifecycleStatusCode } from '@entities/company';

import { watchSource } from '@shared/lib';

import { CompanyLifecycleUpdateDialogController } from './company-lifecycle-update-dialog.controller';

@Component({
  selector: 'crm-company-lifecycle-update-dialog',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule,
    SelectModule,
  ],
  providers: [CompanyLifecycleUpdateDialogController],
  templateUrl: './company-lifecycle-update-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyLifecycleUpdateDialog {
  private readonly controller = inject(CompanyLifecycleUpdateDialogController);
  private readonly companyAPI = inject(CompanyAPIService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly model = input.required<CompanyDTO>();
  readonly visible = model(false);
  readonly updated = output<CompanyDTO>();

  readonly state = this.controller.state;
  readonly statusesLoading = signal(false);
  readonly statusesError = signal<string | null>(null);

  readonly formID = 'company-lifecycle-update-form';
  readonly lifecycleForm = this.formBuilder.group({
    lifecycleCode: this.formBuilder.control<CompanyLifecycleStatusCode | null>(null, [
      Validators.required,
    ]),
  });
  readonly lifecycleControls = this.lifecycleForm.controls;

  readonly statuses = toSignal(
    toObservable(this.visible).pipe(
      filter(Boolean),
      switchMap(() =>
        this.companyAPI.getLifecycleStatuses().pipe(
          tap(() => this.statusesError.set(null)),
          watchSource(this.statusesLoading),
          catchError((error: Error) => {
            console.error(error);
            this.statusesError.set(
              error.message || 'Не удалось загрузить статусы жизненного цикла компании',
            );

            return of([]);
          }),
        ),
      ),
    ),
    { initialValue: [] },
  );

  constructor() {
    effect(() => {
      if (!this.visible()) {
        return;
      }

      untracked(() => {
        this.lifecycleControls.lifecycleCode.setValue(this.model().lifecycleStatus.code);
        this.controller.reset();
        this.statusesError.set(null);
      });
    });
  }

  handleSubmit(): void {
    this.lifecycleForm.markAllAsTouched();

    if (this.lifecycleForm.invalid) {
      return;
    }

    const { id } = this.model();
    const { lifecycleCode } = this.lifecycleForm.getRawValue();

    this.controller
      .updateLifecycle(id, lifecycleCode as CompanyLifecycleStatusCode)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((company) => {
        this.updated.emit(company);
        this.visible.set(false);
      });
  }

  resetForm(): void {
    this.lifecycleForm.reset();
    this.statusesError.set(null);
    this.controller.reset();
  }
}
