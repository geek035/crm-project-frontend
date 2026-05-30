import { Injectable, Signal, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

import { DealManagerService } from '@features/deal-manager';

import { DealCreateDTO, DealDTO } from '@entities/deal';

import { watchSource } from '@shared/lib';
import { CRMErrorModel } from '@shared/model';

@Injectable()
export class DealCreatePageController {
  private readonly dealManager = inject(DealManagerService);

  private readonly _loading = signal(false);
  get loading(): Signal<boolean> {
    return this._loading;
  }

  private readonly _error = signal<CRMErrorModel | null>(null);
  get error(): Signal<CRMErrorModel | null> {
    return this._error;
  }

  createDeal(payload: DealCreateDTO): Observable<DealDTO['id']> {
    return this.dealManager
      .createDeal(payload, {
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
