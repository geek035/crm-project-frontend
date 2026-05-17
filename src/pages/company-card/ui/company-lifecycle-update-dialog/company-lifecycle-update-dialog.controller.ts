import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { CompanyManagerService } from '@features/company-manager';

import { CompanyDTO, CompanyLifecycleStatusCode } from '@entities/company';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class CompanyLifecycleUpdateDialogController {
  private readonly companyManager = inject(CompanyManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'pending' });
  get state() {
    return this._state;
  }

  updateLifecycle(
    id: CompanyDTO['id'],
    lifecycleCode: CompanyLifecycleStatusCode,
  ): Observable<CompanyDTO> {
    try {
      return this.companyManager
        .updateLifecycle<CompanyDTO>(id, lifecycleCode, {
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
