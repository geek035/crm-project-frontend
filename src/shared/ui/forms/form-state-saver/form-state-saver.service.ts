import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, filter, map } from 'rxjs';

import { NotBrowserError } from '@shared/lib';

@Injectable({ providedIn: 'root' })
export class FormStateSaverService {
  private readonly platformID = inject(PLATFORM_ID);

  isFormStateSaved(key: string): boolean {
    return !!this.getItem(key);
  }

  getFormState<T>(key: string): Record<keyof T, unknown> | null {
    return this.getItem(key);
  }

  clearFormState(key: string): void {
    this.cleanItem(key);
  }

  saveFormState<T>(key: string, form: AbstractControl): Observable<T | null> {
    if (!isPlatformBrowser(this.platformID)) {
      throw new NotBrowserError();
    }

    return form.valueChanges.pipe(
      filter(() => this.isFormEmpty(form.value)),
      map((value) => {
        this.cleanItem(key);
        this.setItem(key, value);

        return this.getItem(key);
      }),
    );
  }

  private getItem<T>(key: string): T | null {
    const json = sessionStorage.getItem(key);

    return !json ? null : JSON.parse(json);
  }

  private cleanItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  private setItem<T>(key: string, value: T): void {
    const json = JSON.stringify(value);
    sessionStorage.setItem(key, json);
  }

  private isFormEmpty<T extends object>(formValue: T): boolean {
    return !!Object.values(formValue).find((fieldValue) => !!fieldValue);
  }
}
