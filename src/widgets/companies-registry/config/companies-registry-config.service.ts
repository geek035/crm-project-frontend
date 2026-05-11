import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { COMPANIES_CREATE_URL, getCompanyCardURL } from '@features/companies-navigation';
import { CompanyManagerService } from '@features/company-manager';

import {
  CompanyAPIService,
  CompanyDTO,
  mapCompanyClientSegmentSeverity,
  mapCompanyLifecycleStatusSeverity,
} from '@entities/company';

import { BaseQueryDTO } from '@shared/model';
import {
  RegistryColumnType,
  RegistryCommandType,
  RegistryConfigModel,
  RegistryConfigService,
  RegistryContentModel,
  RegistryFilterType,
  RegistryLoadParamsModel,
} from '@shared/ui/registry';

import { mapCompaniesQueryFilter } from '../api/companies-query-filter.mapper';

@Injectable()
export class CompaniesRegistryConfigService extends RegistryConfigService<CompanyDTO> {
  private readonly companyAPI = inject(CompanyAPIService);
  private readonly companyManager = inject(CompanyManagerService);

  protected override config = signal<RegistryConfigModel<CompanyDTO>>({
    rowsPerPageOptions: [5, 10],
    commands: {
      general: [
        {
          type: RegistryCommandType.LINK,
          routerLink: `/${COMPANIES_CREATE_URL}`,
          label: 'Создать',
        },
      ],
      specific: [
        {
          type: RegistryCommandType.LINK,
          label: 'Открыть карточку',
          routerLink: (company) => (company ? `/${getCompanyCardURL(company.id)}` : null),
        },
      ],
    },
    columns: [
      {
        field: 'commercialName',
        header: 'Коммерческое название',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'officialName',
        header: 'Официальное название',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'inn',
        header: 'ИНН',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'clientSegment',
        header: 'Сегмент',
        type: RegistryColumnType.TAG,
        getValue: (item) => item.clientSegment.description,
        getSeverity: (item) => mapCompanyClientSegmentSeverity(item),
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.companyAPI.getClientSegments(),
        },
      },
      {
        field: 'lifecycleStatus',
        header: 'Статус',
        type: RegistryColumnType.TAG,
        getValue: (item) => item.lifecycleStatus.description,
        getSeverity: (item) => mapCompanyLifecycleStatusSeverity(item),
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.companyAPI.getLifecycleStatuses(),
        },
      },
    ],
    stateSaving: {
      key: 'companies-registry',
      storage: 'session',
    },
  });

  override requestData(
    params: RegistryLoadParamsModel,
  ): Observable<RegistryContentModel<CompanyDTO>> {
    const mappedFilters = params.filters.map((criterion) => ({
      ...criterion,
      field: mapCompaniesQueryFilter(criterion.field),
    }));

    const mappedParams: BaseQueryDTO = {
      ...params,
      filters: mappedFilters,
    };

    return this.companyManager.getIndividuals(mappedParams);
  }
}
