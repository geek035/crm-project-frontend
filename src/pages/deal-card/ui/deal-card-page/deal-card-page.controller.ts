import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  EMPTY,
  ReplaySubject,
  catchError,
  distinctUntilChanged,
  filter,
  map,
  merge,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

import { CompanyManagerService } from '@features/company-manager';
import { DealManagerService } from '@features/deal-manager';
import { IndividualManagerService } from '@features/individual-manager';

import { CompanyDTO } from '@entities/company';
import { DealDTO } from '@entities/deal';
import { IndividualModel } from '@entities/individual';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class DealCardController {
  private readonly dealManager = inject(DealManagerService);
  private readonly companyManager = inject(CompanyManagerService);
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

  private dealID: DealDTO['id'] | null = null;

  private readonly dealID$ = new ReplaySubject<DealDTO['id']>();
  private readonly dealModel$ = new ReplaySubject<DealDTO>();
  private readonly dealRouteID$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
    tap((id) => (this.dealID = id)),
  );

  private readonly deal$ = merge(
    merge(this.dealRouteID$, this.dealID$).pipe(
      filter(Boolean),
      switchMap((id) =>
        this.dealManager.getDealByID(id).pipe(
          watchSource((loading) => this.setLoading(loading)),
          catchError((error: Error) => {
            console.error(error);
            this.setError(error);

            return EMPTY;
          }),
        ),
      ),
    ),
    this.dealModel$,
  ).pipe(shareReplay(1));

  private readonly _deal = toSignal(this.deal$, { initialValue: null });
  get deal(): Signal<DealDTO | null> {
    return this._deal;
  }

  private readonly company$ = this.deal$.pipe(
    map((deal) => deal.companyID),
    distinctUntilChanged(),
    switchMap((id) =>
      id
        ? this.companyManager.getCompanyByID(id).pipe(
            catchError((error: Error) => {
              console.error(error);
              this.setError(error, false);

              return of(null);
            }),
          )
        : of(null),
    ),
    shareReplay(1),
  );

  private readonly _company = toSignal(this.company$, { initialValue: null });
  get company(): Signal<CompanyDTO | null> {
    return this._company;
  }

  private readonly individual$ = this.deal$.pipe(
    map((deal) => deal.individualID),
    distinctUntilChanged(),
    switchMap((id) =>
      id
        ? this.individualManager.getIndividualByID(id).pipe(
            catchError((error: Error) => {
              console.error(error);
              this.setError(error, false);

              return of(null);
            }),
          )
        : of(null),
    ),
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

  setError(error?: Error, updateState = true): void {
    const message = error?.message ?? 'Произошла непредвиденная ошибка';
    const crmError = new CRMErrorModel(message);

    if (updateState) {
      this._state.set({ state: 'error', error: crmError });
    }

    this._error.set(crmError);
  }

  update(model?: DealDTO): void {
    if (model) {
      this.dealModel$.next(model);
    } else if (this.dealID) {
      this.dealID$.next(this.dealID);
    }
  }
}
