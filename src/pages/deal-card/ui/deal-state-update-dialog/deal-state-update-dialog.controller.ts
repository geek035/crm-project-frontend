import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { DealManagerService } from '@features/deal-manager';

import { DealChangeStageDTO, DealChangeStatusDTO, DealDTO } from '@entities/deal';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class DealStateUpdateDialogController {
  private readonly dealManager = inject(DealManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'pending' });
  get state() {
    return this._state;
  }

  changeStage(id: DealDTO['id'], payload: DealChangeStageDTO): Observable<DealDTO> {
    try {
      return this.dealManager
        .changeStage<DealDTO>(id, payload, {
          postprocessor: watchSource((loading) => this.setLoading(loading)),
        })
        .pipe(
          catchError((error: Error) => {
            this.handleError(error);
            return EMPTY;
          }),
        );
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.handleError(error);
      }

      return EMPTY;
    }
  }

  changeStatus(id: DealDTO['id'], payload: DealChangeStatusDTO): Observable<DealDTO> {
    try {
      return this.dealManager
        .changeStatus<DealDTO>(id, payload, {
          postprocessor: watchSource((loading) => this.setLoading(loading)),
        })
        .pipe(
          catchError((error: Error) => {
            this.handleError(error);
            return EMPTY;
          }),
        );
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.handleError(error);
      }

      return EMPTY;
    }
  }

  reset(): void {
    this._state.set({ state: 'pending' });
  }

  private setLoading(loading: boolean): void {
    const state: CRMStateModel = loading ? { state: 'loading' } : { state: 'pending' };
    this._state.set(state);
  }

  private handleError(error: Error): void {
    console.error(error);

    const crmError = new CRMErrorModel(error.message, 'Необработанная ошибка');
    this._state.set({ state: 'error', error: crmError });
  }
}
