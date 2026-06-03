import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { DealManagerService } from '@features/deal-manager';

import { DealDTO, DealUpdateDTO } from '@entities/deal';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class DealUpdateDialogController {
  private readonly dealManager = inject(DealManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'pending' });
  get state() {
    return this._state;
  }

  updateDeal(id: DealDTO['id'], value: DealUpdateDTO): Observable<DealDTO> {
    try {
      return this.dealManager
        .updateDeal<DealDTO>(id, value, {
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
