import { Injectable, Signal, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { IndividualFormValueModel } from '@features/individual-form';
import { IndividualManagerService } from '@features/individual-manager';

import { IndividualModel } from '@entities/individual';

import { NotValidDateError, watchSource } from '@shared/lib';
import { CRMErrorModel } from '@shared/model';

@Injectable()
export class IndividualCreatePageController {
  private readonly individualManager = inject(IndividualManagerService);

  private readonly _loading = signal(false);
  get loading(): Signal<boolean> {
    return this._loading;
  }

  private readonly _error = signal<CRMErrorModel | null>(null);
  get error(): Signal<CRMErrorModel | null> {
    return this._error;
  }

  addIndividual(formValue: IndividualFormValueModel<true>): Observable<IndividualModel['id']> {
    return this.individualManager
      .addIndividual(formValue, {
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
    let message = 'Произошла непредвиденная ошибка';

    console.error(error);

    if (error instanceof NotValidDateError) {
      message = error.message;
    }

    this._error.set(new CRMErrorModel(message));
  }
}
