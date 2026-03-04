import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

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
    rowsPerPageOptions: [5, 10],
    contextMenu: [{ label: 'Меню' }],
    commands: {
      general: [
        { link: true, routerLink: '/', 'label': 'link' },
        { label: 'example', command: () => console.log('example') },
      ],
      specific: [{ label: 'specific' }],
    },
    columns: [
      { field: 'id', header: 'id' },
      { field: 'firstName', header: 'firstName', filter: { type: RegistryFilterType.Text } },
      { field: 'secondName', header: 'secondName' },
      { field: 'secondName', header: 'secondName' },
      { field: 'secondName', header: 'secondName' },
      { field: 'secondName', header: 'secondName' },
      { field: 'secondName', header: 'secondName' },
    ],
    stateSaving: {
      key: 'clients-page-registry',
      storage: 'session',
    },
  });

  override requestData(): Observable<RegistryContentModel<ClientModel>> {
    return this.clientAPI.getClients().pipe(map((content) => ({ total: content.length, content })));
  }
}
