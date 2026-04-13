import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  EMPTY,
  ReplaySubject,
  catchError,
  concat,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';

import { IndividualManagerService } from '@features/individual-manager';

import { IndividualModel } from '@entities/individual';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class IndividualCardController {
  private readonly individualManager = inject(IndividualManagerService);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly _error = signal<CRMErrorModel | null>(null);
  get error(): Signal<CRMErrorModel | null> {
    return this._error;
  }

  private readonly _state = signal<CRMStateModel>({ state: 'initial' });
  get state(): Signal<CRMStateModel> {
    return this._state;
  }

  private readonly individualID$ = new ReplaySubject<IndividualModel['id']>();
  private readonly individualRouteID$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
  );

  private readonly individual$ = concat(this.individualRouteID$, this.individualID$).pipe(
    filter(Boolean),
    switchMap((id) =>
      this.individualManager
        .getIndividualByID(id)
        .pipe(watchSource((loading) => this.setLoading(loading))),
    ),
    catchError((error: Error) => {
      console.error(error);
      this.setError();

      return EMPTY;
    }),
    shareReplay(1),
  );

  private readonly _individual = toSignal(this.individual$, { initialValue: null });
  get individual(): Signal<IndividualModel | null> {
    return this._individual;
  }

  setLoading(value: boolean): void {
    if (value && this._state().state === 'initial') {
      return;
    }

    const state: CRMStateModel = value ? { state: 'loading' } : { state: 'success' };
    this._state.set(state);
  }

  setError(error?: Error) {
    const message = error?.message ?? 'Произошла непредвиденная ошибка';
    const crmError = new CRMErrorModel(message);

    this._state.set({ state: 'error', error: crmError });
    this._error.set(crmError);
  }
}
