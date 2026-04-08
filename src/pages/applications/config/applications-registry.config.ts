import { Injectable, Signal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  RegistryConfigModel,
  RegistryConfigService,
  RegistryContentModel,
} from '@shared/ui/registry';

@Injectable()
export class ApplicationsRegistryConfigService<T> extends RegistryConfigService<T> {
  protected config: Signal<RegistryConfigModel<T>> = signal({ columns: [] });

  requestData(): Observable<RegistryContentModel<T>> {
    const data: RegistryContentModel<T> = { total: 0, data: [] };
    return of(data);
  }
}
