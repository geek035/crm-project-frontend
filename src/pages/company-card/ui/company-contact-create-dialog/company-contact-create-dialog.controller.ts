import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, CRMStateModel } from '@shared/model';

import { CompanyContactCreateCommand } from '../../model/commands/company-contact-create-command.model';
import { CompanyContactManagerService } from '../../model/company-contact-manager.service';

@Injectable()
export class CompanyContactCreateDialogController {
  private readonly companyContactManager = inject(CompanyContactManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'pending' });
  get state() {
    return this._state;
  }

  addContact(companyID: string, value: CompanyContactCreateCommand): Observable<string> {
    try {
      return this.companyContactManager
        .addContact(companyID, value, {
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
