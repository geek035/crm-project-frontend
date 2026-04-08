import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { IndividualManagerService } from '@features/individual-manager';
import { INDIVIDUAL_CREATE_URL, getIndividualCardURL } from '@features/individuals-navigation';

import { IndividualModel } from '@entities/individual';

import {
  RegistryColumnType,
  RegistryCommandType,
  RegistryConfigModel,
  RegistryConfigService,
  RegistryContentModel,
  RegistryFilterType,
  RegistryLoadParamsModel,
} from '@shared/ui/registry';

@Injectable()
export class IndividualsRegistryConfigService extends RegistryConfigService<IndividualModel> {
  private readonly individualManager = inject(IndividualManagerService);

  override config = signal<RegistryConfigModel<IndividualModel>>({
    rowsPerPageOptions: [5, 10],
    commands: {
      general: [
        {
          type: RegistryCommandType.LINK,
          routerLink: `/${INDIVIDUAL_CREATE_URL}`,
          label: 'Создать',
        },
      ],
      specific: [
        {
          type: RegistryCommandType.LINK,
          label: 'Открыть карточку',
          routerLink: (individual) =>
            individual ? `/${getIndividualCardURL(individual.id)}` : null,
        },
      ],
    },
    columns: [
      {
        field: 'firstName',
        header: 'Имя',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'secondName',
        header: 'Фамилия',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'surname',
        header: 'Отчество',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'email',
        header: 'Email',
        type: RegistryColumnType.EMAIL,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'phoneNumber',
        header: 'Номер телефона',
        type: RegistryColumnType.PHONE,
        filter: { type: RegistryFilterType.TEXT },
      },
    ],
    stateSaving: {
      key: 'individuals-page-registry',
      storage: 'session',
    },
  });

  override requestData(
    params: RegistryLoadParamsModel,
  ): Observable<RegistryContentModel<IndividualModel>> {
    return this.individualManager.getIndividuals(params);
  }
}
