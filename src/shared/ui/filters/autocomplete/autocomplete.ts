/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';

import { AutocompleteInput } from './autocomplete.model';

@Component({
  selector: 'crm-autocomplete',
  imports: [CommonModule, FormsModule, AutoCompleteModule],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Autocomplete), multi: true },
  ],
})
export class Autocomplete<T> implements ControlValueAccessor {
  readonly query = input<AutocompleteInput<T>['query']>(() => of([]));
  readonly optionalLabel = input<AutocompleteInput<T>['optionLabel'] | undefined>(undefined);
  readonly optionalValue = input<AutocompleteInput<T>['optionValue'] | undefined>(undefined);

  private readonly query$ = new BehaviorSubject<string | null>(null);
  readonly suggestions = toSignal(
    this.query$.pipe(
      map((q) => (q ?? '').trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) => this.query()(q).pipe(catchError(() => of([] as T[])))),
      shareReplay({ bufferSize: 1, refCount: true }),
    ),
    { initialValue: [] },
  );

  value: T | null = null;
  disabled = false;

  handleComplete({ query }: AutoCompleteCompleteEvent): void {
    this.query$.next(query);
  }

  onTouched = () => {};
  private onChange: (_: T) => void = () => {};

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (_: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
