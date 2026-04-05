import { WritableSignal, isSignal } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, defer, finalize } from 'rxjs';

export function watchSource<T>(
  loading$: Subject<boolean> | WritableSignal<boolean>,
): MonoTypeOperatorFunction<T> {
  const setValue = (value: boolean) =>
    isSignal(loading$) ? loading$.set(value) : loading$.next(value);

  return (source$) =>
    defer(() => {
      setValue(true);

      return source$.pipe(finalize(() => setValue(false)));
    });
}
