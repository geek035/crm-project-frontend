import { Injectable, Signal, signal } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';

export interface ConfirmationDialogRequest {
  header: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogService {
  private readonly _request = signal<ConfirmationDialogRequest | null>(null);
  get request(): Signal<ConfirmationDialogRequest | null> {
    return this._request;
  }

  private result$?: Subject<boolean>;

  confirm(request: ConfirmationDialogRequest): Observable<boolean> {
    this.result$?.complete();
    this.result$ = new Subject<boolean>();
    this._request.set(request);

    return this.result$.asObservable().pipe(take(1));
  }

  resolve(confirmed: boolean): void {
    this.result$?.next(confirmed);
    this.result$?.complete();
    this.result$ = undefined;
    this._request.set(null);
  }
}
