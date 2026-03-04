import { Injectable, Signal, linkedSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { RegistryConfigModel, RegistryContentModel } from '../model/registry-config.model';
import { RegistryLoadParamsModel } from '../model/registry-state.model';

@Injectable()
export abstract class RegistryConfigService<T> {
  protected abstract config: Signal<RegistryConfigModel<T>>;
  abstract requestData(params: RegistryLoadParamsModel): Observable<RegistryContentModel<T>>;

  private readonly _registrySettings = linkedSignal(() => this.config());
  get registrySettings(): Signal<RegistryConfigModel<T>> {
    return this._registrySettings;
  }

  query<S extends keyof RegistryConfigModel<T>>(slice: S): RegistryConfigModel<T>[S] {
    return this.registrySettings()[slice];
  }

  update<S extends keyof RegistryConfigModel<T>>(
    value: Record<S, RegistryConfigModel<T>[S]>,
  ): void {
    this._registrySettings.set({ ...this.config(), ...value });
  }
}
