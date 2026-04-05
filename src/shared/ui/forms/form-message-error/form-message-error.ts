import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';

import { hasControlErrors } from '../has-control-errors/has-control-errors';
import { isInvalidControl } from '../is-invalid-control/is-invalid-control';
import { MapErrorsToMessagePipe } from '../map-error-to-message/map-errors-to-message-pipe';

@Component({
  selector: 'crm-form-message-error',
  imports: [MapErrorsToMessagePipe, MessageModule],
  templateUrl: './form-message-error.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMessageError implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly control = input.required<AbstractControl>();
  readonly defaultErrors = input<string[]>([]);
  readonly customErrors = input<string[]>([]);

  readonly controlErrors = signal<string[]>([]);
  readonly controlInvalid = signal(false);
  readonly controlHasErrors = signal(false);

  private readonly errors = computed(() => [...this.defaultErrors(), ...this.customErrors()]);

  ngOnInit(): void {
    this.control()
      .statusChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        return isInvalidControl(this.control()) && hasControlErrors(this.control(), this.errors())
          ? this.handleControlErrorState()
          : this.resetControlErrorState();
      });
  }

  private resetControlErrorState(): void {
    this.controlInvalid.set(false);
    this.controlHasErrors.set(false);
    this.controlErrors.set([]);
  }

  private handleControlErrorState(): void {
    const controlErrors = this.control().errors;

    if (controlErrors) {
      const errorsToShow = Object.keys(controlErrors).filter((error) =>
        this.defaultErrors().includes(error),
      );

      this.controlInvalid.set(true);
      this.controlHasErrors.set(true);
      this.controlErrors.set(errorsToShow);
    }
  }
}
