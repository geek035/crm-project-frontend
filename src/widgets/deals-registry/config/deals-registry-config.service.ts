import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { DealManagerService } from '@features/deal-manager';
import { DEAL_CREATE_URL, getDealCardURL } from '@features/deals-navigation';

import {
  DealAPIService,
  DealDTO,
  mapDealPrioritySeverity,
  mapDealStageSeverity,
  mapDealStatusSeverity,
} from '@entities/deal';

import { BACKEND_DATE_FORMAT } from '@shared/lib';
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

import { mapDealsQueryFilter } from '../api/deals-query-filter.mapper';

type DealsRegistryOwner =
  | { type: 'all' }
  | { type: 'company'; id: DealDTO['companyID'] }
  | { type: 'individual'; id: DealDTO['individualID'] };

@Injectable()
export class DealsRegistryConfigService extends RegistryConfigService<DealDTO> {
  private readonly dealAPI = inject(DealAPIService);
  private readonly dealManager = inject(DealManagerService);
  private readonly moneyFormatter = new Intl.NumberFormat('ru-RU');
  private readonly owner = signal<DealsRegistryOwner>({ type: 'all' });

  protected override config = signal<RegistryConfigModel<DealDTO>>({
    rowsPerPageOptions: [5, 10],
    commands: {
      general: [
        {
          type: RegistryCommandType.LINK,
          routerLink: `/${DEAL_CREATE_URL}`,
          label: 'Создать',
        },
      ],
      specific: [
        {
          type: RegistryCommandType.LINK,
          label: 'Открыть карточку',
          routerLink: (deal) => (deal ? `/${getDealCardURL(deal.id)}` : null),
        },
      ],
    },
    columns: [
      {
        field: 'number',
        header: 'Номер',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'title',
        header: 'Название',
        type: RegistryColumnType.TEXT,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'clientType',
        header: 'Клиент',
        type: RegistryColumnType.TAG,
        get: (item) => item.clientType.description,
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.dealAPI.getClientTypes(),
        },
      },
      {
        field: 'product',
        header: 'Продукт',
        type: RegistryColumnType.TAG,
        get: (item) => item.product.description,
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.dealAPI.getProducts(),
        },
      },
      {
        field: 'amount',
        header: 'Сумма',
        type: RegistryColumnType.TEXT,
        get: (item) => this.moneyFormatter.format(item.amount),
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'currency',
        header: 'Валюта',
        type: RegistryColumnType.TAG,
        get: (item) => item.currency.description,
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.dealAPI.getCurrencies(),
        },
      },
      {
        field: 'stage',
        header: 'Этап',
        type: RegistryColumnType.TAG,
        get: (item) => item.stage.description,
        getSeverity: (item) => mapDealStageSeverity(item),
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.dealAPI.getStages(),
        },
      },
      {
        field: 'status',
        header: 'Статус',
        type: RegistryColumnType.TAG,
        get: (item) => item.status.description,
        getSeverity: (item) => mapDealStatusSeverity(item),
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.dealAPI.getStatuses(),
        },
      },
      {
        field: 'probability',
        header: 'Вероятность',
        type: RegistryColumnType.TEXT,
        get: (item) => `${item.probability}%`,
        filter: { type: RegistryFilterType.TEXT },
      },
      {
        field: 'priority',
        header: 'Приоритет',
        type: RegistryColumnType.TAG,
        get: (item) => item.priority.description,
        getSeverity: (item) => mapDealPrioritySeverity(item),
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.dealAPI.getPriorities(),
        },
      },
      {
        field: 'source',
        header: 'Источник',
        type: RegistryColumnType.TAG,
        get: (item) => item.source.description,
        filter: {
          type: RegistryFilterType.MULTISELECT,
          optionValue: 'code',
          query: () => this.dealAPI.getSources(),
        },
      },
      {
        field: 'expectedCloseDate',
        header: 'Плановое закрытие',
        type: RegistryColumnType.DATE,
        format: BACKEND_DATE_FORMAT,
        filter: { type: RegistryFilterType.TEXT },
      },
    ],
    stateSaving: {
      key: 'deals-registry',
      storage: 'session',
    },
  });

  override requestData(params: RegistryLoadParamsModel): Observable<RegistryContentModel<DealDTO>> {
    const mappedFilters = params.filters.map((criterion) => ({
      ...criterion,
      field: mapDealsQueryFilter(criterion.field),
    }));

    const mappedParams: BaseQueryDTO = {
      ...params,
      filters: mappedFilters,
    };

    const owner = this.owner();

    switch (owner.type) {
      case 'company':
        return this.dealAPI.findByCompanyID(owner.id, mappedParams);
      case 'individual':
        return this.dealAPI.findByIndividualID(owner.id, mappedParams);
      case 'all':
        return this.dealManager.getDeals(mappedParams);
    }
  }

  setCompanyID(id: DealDTO['companyID']): void {
    this.setOwner({ type: 'company', id });
  }

  setIndividualID(id: DealDTO['individualID']): void {
    this.setOwner({ type: 'individual', id });
  }

  setAllDeals(): void {
    this.setOwner({ type: 'all' });
  }

  private setOwner(owner: DealsRegistryOwner): void {
    const currentOwner = this.owner();

    if (this.isSameOwner(currentOwner, owner)) {
      return;
    }

    this.owner.set(owner);
    this.refresh();
  }

  private isSameOwner(currentOwner: DealsRegistryOwner, owner: DealsRegistryOwner): boolean {
    if (currentOwner.type !== owner.type) {
      return false;
    }

    if (currentOwner.type === 'all' || owner.type === 'all') {
      return true;
    }

    return currentOwner.id === owner.id;
  }
}
