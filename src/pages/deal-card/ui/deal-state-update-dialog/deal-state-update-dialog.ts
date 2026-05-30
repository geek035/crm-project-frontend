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
import { Observable, catchError, filter, of, startWith, switchMap, tap } from 'rxjs';

import {
  DealAPIService,
  DealDTO,
  DealLossReasonCode,
  DealStageCode,
  DealStatusCode,
} from '@entities/deal';

import { watchSource } from '@shared/lib';
import { DirectoryEntryDTO } from '@shared/model';

import { DealStateUpdateDialogController } from './deal-state-update-dialog.controller';

type DealStateUpdateKind = 'stage' | 'status';
type DealStateCode = DealStageCode | DealStatusCode;

@Component({
  selector: 'crm-deal-state-update-dialog',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    MessageModule,
    SelectModule,
  ],
  providers: [DealStateUpdateDialogController],
  templateUrl: './deal-state-update-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealStateUpdateDialog {
  private readonly controller = inject(DealStateUpdateDialogController);
  private readonly dealAPI = inject(DealAPIService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  readonly model = input.required<DealDTO>();
  readonly kind = input.required<DealStateUpdateKind>();
  readonly visible = model(false);
  readonly updated = output<DealDTO>();

  readonly state = this.controller.state;
  readonly optionsLoading = signal(false);
  readonly optionsError = signal<string | null>(null);

  readonly formID = computed(() => `deal-${this.kind()}-update-form`);
  readonly title = computed(() =>
    this.kind() === 'stage' ? 'Обновление этапа сделки' : 'Обновление статуса сделки',
  );
  readonly label = computed(() => (this.kind() === 'stage' ? 'Этап' : 'Статус'));
  readonly invalidMessage = computed(() =>
    this.kind() === 'stage' ? 'Выберите этап сделки' : 'Выберите статус сделки',
  );
  readonly selectID = computed(() => `deal-${this.kind()}-update-code`);
  readonly closeInfoID = computed(() => `deal-${this.kind()}-update-close-info`);
  readonly closeInfoInvalidMessage = computed(() =>
    this.kind() === 'stage'
      ? 'Выберите причину отмены или проигрыша'
      : 'Выберите причину отмены или неуспешного завершения',
  );

  readonly stateForm = this.formBuilder.group({
    code: this.formBuilder.control<DealStateCode | null>(null, [Validators.required]),
    closeInfo: this.formBuilder.control<DealLossReasonCode | null>(null),
  });
  readonly stateControls = this.stateForm.controls;
  readonly selectedCode = toSignal(
    this.stateControls.code.valueChanges.pipe(startWith(this.stateControls.code.value)),
    { initialValue: null },
  );
  readonly closeInfoRequired = computed(() => this.isCloseInfoRequired(this.selectedCode()));

  readonly options = toSignal(
    toObservable(this.visible).pipe(
      filter(Boolean),
      switchMap(() => this.loadOptions()),
    ),
    { initialValue: [] },
  );
  readonly lossReasonsLoading = signal(false);
  readonly lossReasonsError = signal<string | null>(null);
  readonly lossReasons = toSignal(
    toObservable(this.visible).pipe(
      filter(Boolean),
      switchMap(() => this.loadLossReasons()),
    ),
    { initialValue: [] },
  );

  constructor() {
    effect(() => {
      if (!this.visible()) {
        return;
      }

      const deal = this.model();
      const kind = this.kind();

      untracked(() => {
        this.stateControls.code.setValue(kind === 'stage' ? deal.stage.code : deal.status.code);
        this.stateControls.closeInfo.reset();
        this.stateForm.markAsPristine();
        this.controller.reset();
        this.optionsError.set(null);
        this.lossReasonsError.set(null);
      });
    });

    effect(() => {
      const closeInfoRequired = this.closeInfoRequired();

      untracked(() => {
        if (closeInfoRequired) {
          this.stateControls.closeInfo.setValidators([Validators.required]);
        } else {
          this.stateControls.closeInfo.clearValidators();
          this.stateControls.closeInfo.setValue(null, { emitEvent: false });
        }

        this.stateControls.closeInfo.updateValueAndValidity({ emitEvent: false });
      });
    });
  }

  handleSubmit(): void {
    this.stateForm.markAllAsTouched();

    if (this.stateForm.invalid) {
      return;
    }

    const { id } = this.model();
    const { code, closeInfo } = this.stateForm.getRawValue();

    const request$ =
      this.kind() === 'stage'
        ? this.controller.changeStage(id, {
            stageCode: code as DealStageCode,
            closeInfo: this.closeInfoRequired() ? closeInfo : null,
          })
        : this.controller.changeStatus(id, {
            statusCode: code as DealStatusCode,
            closeInfo: this.closeInfoRequired() ? closeInfo : null,
          });

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((deal) => {
      this.updated.emit(deal);
      this.visible.set(false);
    });
  }

  resetForm(): void {
    this.stateForm.reset();
    this.optionsError.set(null);
    this.lossReasonsError.set(null);
    this.controller.reset();
  }

  private loadOptions(): Observable<DirectoryEntryDTO<DealStateCode>[]> {
    const source$: Observable<DirectoryEntryDTO<DealStateCode>[]> =
      this.kind() === 'stage' ? this.dealAPI.getStages() : this.dealAPI.getStatuses();

    return source$.pipe(
      tap(() => this.optionsError.set(null)),
      watchSource(this.optionsLoading),
      catchError((error: Error) => {
        console.error(error);
        this.optionsError.set(error.message || `Не удалось загрузить справочник "${this.label()}"`);

        return of([]);
      }),
    );
  }

  private loadLossReasons(): Observable<DirectoryEntryDTO<DealLossReasonCode>[]> {
    return this.dealAPI.getLossReasons().pipe(
      tap(() => this.lossReasonsError.set(null)),
      watchSource(this.lossReasonsLoading),
      catchError((error: Error) => {
        console.error(error);
        this.lossReasonsError.set(error.message || 'Не удалось загрузить причины закрытия сделки');

        return of([]);
      }),
    );
  }

  private isCloseInfoRequired(code: DealStateCode | null): boolean {
    return (
      code === DealStageCode.CANCELLED ||
      code === DealStageCode.LOST ||
      code === DealStatusCode.CANCELLED ||
      code === DealStatusCode.FAILED
    );
  }
}
