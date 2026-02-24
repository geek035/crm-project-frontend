import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, delay, map } from 'rxjs';

import {
  RegistryConfigModel,
  RegistryConfigService,
  RegistryContentModel,
  RegistryFilterType,
} from '@widgets/registry';

import { ClientAPIService, ClientModel } from '@entities/client';

@Injectable()
export class ClientsPageRegistryConfigService extends RegistryConfigService<ClientModel> {
  private readonly clientAPI = inject(ClientAPIService);

  override config: Signal<RegistryConfigModel<ClientModel>> = signal({
    columns: [
      { field: 'id', header: 'id' },
      { field: 'firstName', header: 'firstName', filter: { type: RegistryFilterType.Text } },
      { field: 'secondName', header: 'secondName', filter: { type: RegistryFilterType.Text } },
      { field: 'secondName', header: 'secondName', filter: { type: RegistryFilterType.Text } },
      { field: 'secondName', header: 'secondName', filter: { type: RegistryFilterType.Text } },
      { field: 'secondName', header: 'secondName', filter: { type: RegistryFilterType.Text } },
      { field: 'secondName', header: 'secondName', filter: { type: RegistryFilterType.Text } },
    ],
  });

  override requestData(): Observable<RegistryContentModel<ClientModel>> {
    return this.clientAPI.getClients().pipe(
      map((content) => ({ total: content.length, content })),
      delay(3000),
    );
  }
}
