/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  forwardRef,
  inject,
  input,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { of } from 'rxjs';

import { watchSource } from '@shared/lib';

import { MultiselectInput } from './multiselect.model';

@Component({
  selector: 'crm-multiselect',
  imports: [FormsModule, MultiSelectModule],
  templateUrl: './multiselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Multiselect), multi: true },
  ],
})
export class Multiselect<T> implements ControlValueAccessor, OnInit {
  private readonly injector = inject(Injector);

  readonly optionLabel = input<string | undefined>('description');
  readonly optionValue = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly query = input.required<MultiselectInput<T>['query']>();

  readonly value = signal<T | null>(null);
  readonly disabled = signal(false);

  readonly defaultOptionLabel = 'description';

  readonly loading = signal(false);
  options = toSignal(of<T[]>([]));

  onTouched = () => {};
  private onChange: (_: T[] | null) => void = () => {};

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      this.options = toSignal(this.query()().pipe(watchSource(this.loading)), {
        initialValue: [],
      });
    });
  }

  handleModelChange(value: T[] | null): void {
    const toUpdate = !value || !value.length ? null : value;
    this.onChange(toUpdate);
  }

  writeValue(value: T): void {
    this.value.set(value);
  }

  registerOnChange(fn: (_: T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
