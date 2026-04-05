import { Injectable, Signal, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { IndividualManagerService } from '@features/individual-manager';

import { IndividualModel } from '@entities/individual';

import { watchSource } from '@shared/lib';
import { CRMErrorModel, NotValidDateError } from '@shared/model';

import { IndividualCreateFormValueModel } from '../../model/individual-create-form-value.model';

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

  addIndividual(
    formValue: IndividualCreateFormValueModel<true>,
  ): Observable<IndividualModel['id']> {
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

  isFormFieldsValid(
    formValue: IndividualCreateFormValueModel,
  ): formValue is IndividualCreateFormValueModel<true> {
    return (
      !!formValue.firstName &&
      !!formValue.secondName &&
      !!formValue.email &&
      !!formValue.phoneNumber &&
      formValue.birthdate instanceof Date
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
