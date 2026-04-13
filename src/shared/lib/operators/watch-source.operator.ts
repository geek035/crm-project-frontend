import { WritableSignal, isWritableSignal } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, defer, finalize } from 'rxjs';

export function watchSource<T>(
  loading$: Subject<boolean> | WritableSignal<boolean> | ((loading: boolean) => void),
): MonoTypeOperatorFunction<T> {
  const setValue = (value: boolean) =>
    isWritableSignal(loading$)
      ? loading$.set(value)
      : loading$ instanceof Subject
        ? loading$.next(value)
        : loading$(value);

  return (source$) =>
    defer(() => {
      setValue(true);

      return source$.pipe(finalize(() => setValue(false)));
    });
}
