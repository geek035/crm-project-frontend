import { Injectable, Signal, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, filter, switchMap, take } from 'rxjs';

import { getIndividualCardURL } from '@features/individuals-navigation';

import {
  CompanyContactAPIService,
  CompanyContactDTO,
  mapCompanyContactRoleSeverity,
  mapCompanyContactStatusSeverity,
} from '@entities/company-contact';

import { getEntityFullname } from '@shared/ui/info-block';
import {
  RegistryColumnType,
  RegistryCommandType,
  RegistryConfigModel,
  RegistryConfigService,
  RegistryContentModel,
  RegistryLoadParamsModel,
} from '@shared/ui/registry';

import { CompanyCardController } from '../ui/company-card-page/company-card-page.controller';
import { CompanyContactsController } from '../ui/company-contacts/company-contacts.controller';

export type CompanyContactCustomFields = 'fio';

@Injectable()
export class CompanyContactsRegistryConfigService extends RegistryConfigService<
  CompanyContactDTO,
  CompanyContactCustomFields
> {
  private readonly controller = inject(CompanyCardController);
  private readonly contactsController = inject(CompanyContactsController);
  private readonly companyContactsAPI = inject(CompanyContactAPIService);

  private readonly company$ = toObservable(this.controller.company);

  protected override config: Signal<
    RegistryConfigModel<CompanyContactDTO, CompanyContactCustomFields>
  > = signal({
    commands: {
      general: [
        {
          type: RegistryCommandType.BUTTON,
          icon: 'pi pi-user-plus',
          label: 'Создать',
          command: () => this.contactsController.openCreateDialog(),
        },
      ],
      specific: [
        {
          type: RegistryCommandType.BUTTON,
          icon: 'pi pi-trash',
          label: 'Удалить',
          severity: 'danger',
          command: (contact) => this.contactsController.deleteContact(contact),
        },
      ],
    },
    columns: [
      {
        field: 'fio',
        header: 'ФИО',
        type: RegistryColumnType.LINK,
        routerLink: (contact) => `/${getIndividualCardURL(contact.individual.id)}`,
        get: (contact) => getEntityFullname(contact.individual) ?? '-',
      },
      {
        field: 'role',
        header: 'Роль',
        type: RegistryColumnType.TAG,
        get: (contact) => contact.role.description,
        getSeverity: mapCompanyContactRoleSeverity,
      },
      {
        field: 'status',
        header: 'Статус',
        type: RegistryColumnType.TAG,
        get: (contact) => contact.status.description,
        getSeverity: mapCompanyContactStatusSeverity,
      },
    ],
  });

  override requestData(
    params: RegistryLoadParamsModel,
  ): Observable<RegistryContentModel<CompanyContactDTO>> {
    return this.company$.pipe(
      filter(Boolean),
      take(1),
      switchMap(({ id }) => this.companyContactsAPI.queryContacts(id, params)),
    );
  }
}
