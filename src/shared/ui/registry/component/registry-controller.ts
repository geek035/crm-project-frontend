import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterMetadata } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ReplaySubject, catchError, of, switchMap, tap } from 'rxjs';

import { isNotNullOrUndefined } from '@shared/lib';
import {
  CRMErrorModel,
  FilterCriterionModel,
  SortCriterionDirection,
  SortCriterionModel,
  isCRMFilterMatchMode,
} from '@shared/model';

import { RegistryConfigService } from '../registry-config/registry-config.service';
import { RegistryConfigModel, RegistryContentModel } from '../registry-model/registry-config.model';
import {
  RegistryLoadParamsModel,
  RegistryUIStateModel,
} from '../registry-model/registry-state.model';

@Injectable()
export class RegistryController<T> {
  private readonly configService = inject(RegistryConfigService<T>);

  private readonly _state = signal<RegistryUIStateModel>({ status: 'initial' });
  get state(): Signal<RegistryUIStateModel> {
    return this._state;
  }

  private readonly _generalSettings = computed(() => {
    const { dataKey, rowsPerPageOptions, showSearch, defaultSortField } =
      this.configService.registrySettings();

    return { dataKey, rowsPerPageOptions, showSearch, defaultSortField };
  });

  get generalSettings(): typeof this._generalSettings {
    return this._generalSettings;
  }

  private readonly _columns = computed(() => this.configService.registrySettings()['columns']);
  get columns(): Signal<RegistryConfigModel<T>['columns']> {
    return this._columns;
  }

  private readonly _commands = computed(() => this.configService.registrySettings()['commands']);
  get commands(): Signal<RegistryConfigModel<T>['commands']> {
    return this._commands;
  }

  private readonly _contextMenu = computed(
    () => this.configService.registrySettings()['contextMenu'],
  );

  get contextMenu(): Signal<RegistryConfigModel<T>['contextMenu']> {
    return this._contextMenu;
  }

  private readonly _stateSaving = computed(
    () => this.configService.registrySettings()['stateSaving'],
  );

  get stateSaving(): Signal<RegistryConfigModel<T>['stateSaving']> {
    console.log(this._stateSaving());
    return this._stateSaving;
  }

  private readonly params$ = new ReplaySubject<RegistryLoadParamsModel>(1);
  private readonly data$ = this.params$.pipe(
    tap(() => this._state().status !== 'initial' && this._state.set({ status: 'loading' })),
    switchMap((params) => this.configService.requestData(params)),
    tap(() => this._state.set({ status: 'success' })),
    catchError((error: Error) => {
      const crmError = new CRMErrorModel(error.message, 'Произошла непредвиденная ошибка');

      this._state.set({ status: 'error', error: crmError });
      console.error(error);

      return of<RegistryContentModel<T>>({ total: 0, data: [] });
    }),
  );

  private readonly _data = toSignal(this.data$, {
    initialValue: { total: 5, data: new Array(5).fill(0) },
  });
  get data(): Signal<RegistryContentModel<T>> {
    return this._data;
  }

  load(tableLazyLoadEvent: TableLazyLoadEvent): void {
    if (
      isNotNullOrUndefined(tableLazyLoadEvent.first) &&
      isNotNullOrUndefined(tableLazyLoadEvent.rows)
    ) {
      const pageNumber = Math.floor(tableLazyLoadEvent.first / tableLazyLoadEvent.rows);
      const params: RegistryLoadParamsModel = {
        filters: this.mapTableFilters(tableLazyLoadEvent.filters),
        pageSize: tableLazyLoadEvent.rows,
        sort: this.mapTableSort(tableLazyLoadEvent.sortField, tableLazyLoadEvent.sortOrder),
        pageNumber,
      };

      this.params$.next(params);
    }
  }

  private mapTableSort(
    sortField: string | string[] | null | undefined,
    sortOrder?: number | undefined | null,
  ): SortCriterionModel[] {
    if (!sortField || Array.isArray(sortField) || !isNotNullOrUndefined(sortOrder)) {
      return [];
    }

    return [
      {
        field: sortField,
        direction: sortOrder > 0 ? SortCriterionDirection.ASC : SortCriterionDirection.DESC,
      },
    ];
  }

  private mapTableFilters(
    filters: Record<string, FilterMetadata | FilterMetadata[] | undefined> | undefined,
  ): FilterCriterionModel[] {
    if (!filters) {
      return [];
    }

    return Object.entries(filters)
      .map<FilterCriterionModel | null>(([field, filter]) =>
        !filter || Array.isArray(filter) || !filter.value || !isCRMFilterMatchMode(filter.matchMode)
          ? null
          : {
              field,
              value: filter.value,
              matchMode: filter.matchMode,
            },
      )
      .filter<FilterCriterionModel>((value) => !!value);
  }
}
