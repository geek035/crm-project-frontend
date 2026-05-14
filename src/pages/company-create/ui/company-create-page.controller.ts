import { Injectable, Signal, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { CompanyCreateFormValueModel } from '@features/company-form';
import { CompanyManagerService } from '@features/company-manager';

import { CompanyDTO } from '@entities/company';

import { watchSource } from '@shared/lib';
import { CRMErrorModel } from '@shared/model';

@Injectable()
export class CompanyCreatePageController {
  private readonly companyManager = inject(CompanyManagerService);

  private readonly _loading = signal(false);
  get loading(): Signal<boolean> {
    return this._loading;
  }

  private readonly _error = signal<CRMErrorModel | null>(null);
  get error(): Signal<CRMErrorModel | null> {
    return this._error;
  }

  createCompany(formValue: CompanyCreateFormValueModel<true>): Observable<CompanyDTO['id']> {
    return this.companyManager
      .createCompany(formValue, {
        postprocessor: watchSource(this._loading),
      })
      .pipe(
        catchError((error: Error) => {
          this.handleError(error);
          return EMPTY;
        }),
      );
  }

  private handleError(error: Error): void {
    const message = error.message || 'Произошла непредвиденная ошибка';

    console.error(error);
    this._error.set(new CRMErrorModel(message));
  }
}
