import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { CompanyCreateFormValueModel } from '@features/company-form';
import { CompanyManagerService } from '@features/company-manager';

import { CompanyDTO } from '@entities/company';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class CompanyUpdateDialogController {
  private readonly companyManager = inject(CompanyManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'pending' });
  get state() {
    return this._state;
  }

  updateCompany(
    id: CompanyDTO['id'],
    value: CompanyCreateFormValueModel<true>,
  ): Observable<CompanyDTO> {
    try {
      return this.companyManager
        .updateCompany<CompanyDTO>(id, value, {
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
