import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  EMPTY,
  ReplaySubject,
  catchError,
  filter,
  map,
  merge,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

import { CompanyAPIService, CompanyDTO } from '@entities/company';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class CompanyCardController {
  private readonly companyAPI = inject(CompanyAPIService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly _error = signal<CRMErrorModel | null>(null);
  get error(): Signal<CRMErrorModel | null> {
    return this._error;
  }

  private readonly _state = signal<CRMStateModel>({ state: 'initial' });
  get state(): Signal<CRMStateModel> {
    return this._state;
  }

  private companyID: CompanyDTO['id'] | null = null;

  private readonly companyID$ = new ReplaySubject<CompanyDTO['id']>();
  private readonly companyModel$ = new ReplaySubject<CompanyDTO>();
  private readonly companyRouteID$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
    tap((id) => (this.companyID = id)),
  );

  private readonly company$ = merge(
    merge(this.companyRouteID$, this.companyID$).pipe(
      filter(Boolean),
      switchMap((id) =>
        this.companyAPI.getCompanyByID(id).pipe(watchSource((loading) => this.setLoading(loading))),
      ),
    ),
    this.companyModel$,
  ).pipe(
    catchError((error: Error) => {
      console.error(error);
      this.setError(error);

      return EMPTY;
    }),
    shareReplay(1),
  );

  private readonly _company = toSignal(this.company$, { initialValue: null });
  get company(): Signal<CompanyDTO | null> {
    return this._company;
  }

  setLoading(value: boolean): void {
    if (value && this._state().state === 'initial') {
      return;
    }

    const state: CRMStateModel = value ? { state: 'loading' } : { state: 'success' };
    this._state.set(state);
  }

  setError(error?: Error): void {
    const message = error?.message ?? 'Произошла непредвиденная ошибка';
    const crmError = new CRMErrorModel(message);

    this._state.set({ state: 'error', error: crmError });
    this._error.set(crmError);
  }

  update(model?: CompanyDTO): void {
    if (model) {
      this.companyModel$.next(model);
    } else if (this.companyID) {
      this.companyID$.next(this.companyID);
    }
  }
}
