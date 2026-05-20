import { Injectable, Signal, linkedSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { RegistryConfigModel, RegistryContentModel } from '../registry-model/registry-config.model';
import { RegistryLoadParamsModel } from '../registry-model/registry-state.model';

@Injectable()
export abstract class RegistryConfigService<T, TAdditional = keyof T> {
  protected abstract config: Signal<RegistryConfigModel<T, TAdditional>>;
  abstract requestData(params: RegistryLoadParamsModel): Observable<RegistryContentModel<T>>;

  private readonly _refresh = new Subject<void>();
  readonly refreshes = this._refresh.asObservable();

  private readonly _registrySettings = linkedSignal(() => this.config());
  get registrySettings(): Signal<RegistryConfigModel<T, TAdditional>> {
    return this._registrySettings;
  }

  query<S extends keyof RegistryConfigModel<T, TAdditional>>(
    slice: S,
  ): RegistryConfigModel<T, TAdditional>[S] {
    return this.registrySettings()[slice];
  }

  update<S extends keyof RegistryConfigModel<T, TAdditional>>(
    value: Record<S, RegistryConfigModel<T, TAdditional>[S]>,
  ): void {
    this._registrySettings.set({ ...this.config(), ...value });
  }

  refresh(): void {
    this._refresh.next();
  }
}
