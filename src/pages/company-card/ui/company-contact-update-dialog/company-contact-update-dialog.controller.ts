import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { CompanyContactManagerService } from '@features/company-contact-manager';

import {
  CompanyContactDTO,
  CompanyContactRoleCode,
  CompanyContactStatusCode,
} from '@entities/company-contact';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

@Injectable()
export class CompanyContactUpdateDialogController {
  private readonly companyContactManager = inject(CompanyContactManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'pending' });
  get state() {
    return this._state;
  }

  updateRole(
    companyID: string,
    contact: CompanyContactDTO,
    roleCode: CompanyContactRoleCode,
  ): Observable<CompanyContactDTO> {
    try {
      return this.companyContactManager
        .updateRole<CompanyContactDTO>(companyID, contact, roleCode, {
          apiProcessor: watchSource((loading) => this.setLoading(loading)),
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

  updateStatus(
    companyID: string,
    contact: CompanyContactDTO,
    statusCode: CompanyContactStatusCode,
  ): Observable<CompanyContactDTO> {
    try {
      return this.companyContactManager
        .updateStatus<CompanyContactDTO>(companyID, contact, statusCode, {
          apiProcessor: watchSource((loading) => this.setLoading(loading)),
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
