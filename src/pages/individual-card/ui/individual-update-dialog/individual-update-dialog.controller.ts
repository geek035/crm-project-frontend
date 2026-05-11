import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { IndividualFormValueModel } from '@features/individual-form';
import { IndividualManagerService } from '@features/individual-manager';

import { IndividualModel } from '@entities/individual';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class IndividualUpdateDialogController {
  readonly individualManager = inject(IndividualManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'pending' });
  get state() {
    return this._state;
  }

  updateIndividual(
    id: IndividualModel['id'],
    value: IndividualFormValueModel<true>,
  ): Observable<IndividualModel> {
    try {
      return this.individualManager
        .updateIndividual(id, value, {
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

  private setLoading(loading: boolean) {
    const state: CRMStateModel = loading ? { state: 'loading' } : { state: 'pending' };
    this._state.set(state);
  }

  private handleError(error: Error): void {
    console.error(error);

    const crmError = new CRMErrorModel(error.message, 'Необработанная ошибка');
    this._state.set({ state: 'error', error: crmError });
  }
}
