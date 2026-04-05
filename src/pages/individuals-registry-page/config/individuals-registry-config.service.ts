import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  RegistryConfigModel,
  RegistryConfigService,
  RegistryContentModel,
  RegistryFilterType,
} from '@widgets/registry';

import { INDIVIDUAL_CREATE_URL } from '@features/individuals-navigation';

import { IndividualAPIService, IndividualModel } from '@entities/individual';

@Injectable()
export class IndividualsRegistryConfigService extends RegistryConfigService<IndividualModel> {
  private readonly individualAPI = inject(IndividualAPIService);

  override config: Signal<RegistryConfigModel<IndividualModel>> = signal({
    rowsPerPageOptions: [5, 10],
    contextMenu: [{ label: 'Меню' }],
    commands: {
      general: [{ link: true, routerLink: `/${INDIVIDUAL_CREATE_URL}`, label: 'Создать' }],
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
      key: 'individuals-page-registry',
      storage: 'session',
    },
  });

  override requestData(): Observable<RegistryContentModel<IndividualModel>> {
    return this.individualAPI
      .getIndividuals()
      .pipe(map((content) => ({ total: content.length, content })));
  }
}
