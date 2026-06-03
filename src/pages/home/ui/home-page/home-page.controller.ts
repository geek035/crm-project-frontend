import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, defer, forkJoin, map, of, shareReplay } from 'rxjs';

import { CompanyManagerService } from '@features/company-manager';
import { DealManagerService } from '@features/deal-manager';
import { IndividualManagerService } from '@features/individual-manager';

import { CompanyDTO } from '@entities/company';
import { DealDTO, DealProductCode, DealStageCode, DealStatusCode } from '@entities/deal';
import { IndividualModel } from '@entities/individual';

import { watchSource } from '@shared/lib';
import {
  BaseQueryDTO,
  CRMErrorModel,
  CRMFilterMatchMode,
  CRMStateModel,
  FilterCriterionModel,
  PageModel,
  SortCriterionDirection,
} from '@shared/model';

import {
  HOME_ATTENTION_PRIORITIES,
  HOME_PRODUCT_LABELS,
  HOME_PRODUCT_ORDER,
  HOME_STAGE_LABELS,
  HOME_STAGE_ORDER,
} from './home-page.const';
import { HomeBreakdownItem, HomeDashboardModel } from './home-page.model';

@Injectable()
export class HomePageController {
  private readonly companyManager = inject(CompanyManagerService);
  private readonly individualManager = inject(IndividualManagerService);
  private readonly dealManager = inject(DealManagerService);

  private readonly _state = signal<CRMStateModel>({ state: 'initial' });
  get state(): Signal<CRMStateModel> {
    return this._state;
  }

  private readonly _error = signal<CRMErrorModel | null>(null);
  get error(): Signal<CRMErrorModel | null> {
    return this._error;
  }

  private readonly dashboard$ = defer(() =>
    forkJoin({
      companies: this.getCompaniesTotal(),
      individuals: this.getIndividualsTotal(),
      deals: this.getDealsTotal(),
      openDeals: this.getOpenDealsTotal(),
      urgentDeals: this.getUrgentDealsTotal(),
      stages: this.getStagesBreakdown(),
      products: this.getProductsBreakdown(),
      attentionDeals: this.getAttentionDeals(),
    }),
  ).pipe(
    map(
      ({
        companies,
        individuals,
        deals,
        openDeals,
        urgentDeals,
        stages,
        products,
        attentionDeals,
      }) => ({
        totals: {
          clients: companies + individuals,
          companies,
          individuals,
          deals,
          openDeals,
          urgentDeals,
        },
        stages,
        products,
        attentionDeals,
      }),
    ),
    watchSource((loading) => this.setLoading(loading)),
    catchError((error: Error) => {
      console.error(error);
      this.setError(error);

      return of(this.createEmptyDashboard());
    }),
    shareReplay(1),
  );

  private readonly _dashboard = toSignal(this.dashboard$, { initialValue: null });
  get dashboard(): Signal<HomeDashboardModel | null> {
    return this._dashboard;
  }

  private getCompaniesTotal(): Observable<number> {
    return this.companyManager
      .getCompanies<PageModel<CompanyDTO>>(this.createQuery({ pageSize: 1 }))
      .pipe(map((page) => page.total));
  }

  private getIndividualsTotal(): Observable<number> {
    return this.individualManager
      .getIndividuals<PageModel<IndividualModel>>(this.createQuery({ pageSize: 1 }))
      .pipe(map((page) => page.total));
  }

  private getDealsTotal(filters: FilterCriterionModel[] = []): Observable<number> {
    return this.dealManager
      .getDeals<PageModel<DealDTO>>(this.createQuery({ pageSize: 1, filters }))
      .pipe(map((page) => page.total));
  }

  private getOpenDealsTotal(): Observable<number> {
    return this.getDealsTotal([this.createCodeFilter('status.code', DealStatusCode.OPEN)]);
  }

  private getUrgentDealsTotal(): Observable<number> {
    return this.getDealsTotal([
      this.createCodeFilter('status.code', DealStatusCode.OPEN),
      this.createCodeFilter('priority.code', HOME_ATTENTION_PRIORITIES),
    ]);
  }

  private getStagesBreakdown(): Observable<HomeBreakdownItem<DealStageCode>[]> {
    return this.getBreakdown(
      HOME_STAGE_ORDER,
      (stage) => HOME_STAGE_LABELS[stage],
      (stage) => this.getDealsTotal([this.createCodeFilter('stage.code', stage)]),
    );
  }

  private getProductsBreakdown(): Observable<HomeBreakdownItem<DealProductCode>[]> {
    return this.getBreakdown(
      HOME_PRODUCT_ORDER,
      (product) => HOME_PRODUCT_LABELS[product],
      (product) => this.getDealsTotal([this.createCodeFilter('product.code', product)]),
    );
  }

  private getAttentionDeals(): Observable<DealDTO[]> {
    return this.dealManager
      .getDeals<PageModel<DealDTO>>(
        this.createQuery({
          pageSize: 5,
          filters: [
            this.createCodeFilter('status.code', DealStatusCode.OPEN),
            this.createCodeFilter('priority.code', HOME_ATTENTION_PRIORITIES),
          ],
          sort: [{ field: 'expectedCloseDate', direction: SortCriterionDirection.ASC }],
        }),
      )
      .pipe(map((page) => page.data));
  }

  private getBreakdown<TCode extends string>(
    codes: TCode[],
    getLabel: (code: TCode) => string,
    getTotal: (code: TCode) => Observable<number>,
  ): Observable<HomeBreakdownItem<TCode>[]> {
    return forkJoin(
      codes.map((code) =>
        getTotal(code).pipe(
          map((total) => ({
            code,
            label: getLabel(code),
            total,
            barWidth: 0,
          })),
        ),
      ),
    ).pipe(map((items) => this.normalizeBars(items)));
  }

  private normalizeBars<TCode extends string>(
    items: HomeBreakdownItem<TCode>[],
  ): HomeBreakdownItem<TCode>[] {
    const max = Math.max(...items.map((item) => item.total), 0);

    if (!max) {
      return items;
    }

    return items.map((item) => ({
      ...item,
      barWidth: item.total ? Math.max(Math.round((item.total / max) * 100), 8) : 0,
    }));
  }

  private createQuery(params: Partial<BaseQueryDTO> = {}): BaseQueryDTO {
    return {
      pageNumber: 0,
      pageSize: 10,
      sort: [],
      filters: [],
      ...params,
    };
  }

  private createCodeFilter<T extends string>(
    field: string,
    value: T | T[],
  ): FilterCriterionModel<T | T[]> {
    return {
      field,
      value,
      matchMode: Array.isArray(value) ? CRMFilterMatchMode.IN : CRMFilterMatchMode.EQUALS,
    };
  }

  private setLoading(value: boolean): void {
    if (value) {
      this._state.set({ state: 'loading' });

      return;
    }

    if (this._state().state !== 'error') {
      this._state.set({ state: 'success' });
    }
  }

  private setError(error?: Error, updateState = true): void {
    const crmError = new CRMErrorModel(
      error?.message ?? 'Не удалось получить данные рабочего стола',
      'Ошибка загрузки',
    );

    if (updateState) {
      this._state.set({ state: 'error', error: crmError });
    }

    this._error.set(crmError);
  }

  private createEmptyDashboard(): HomeDashboardModel {
    return {
      totals: {
        clients: 0,
        companies: 0,
        individuals: 0,
        deals: 0,
        openDeals: 0,
        urgentDeals: 0,
      },
      stages: this.normalizeBars(
        HOME_STAGE_ORDER.map((code) => ({
          code,
          label: HOME_STAGE_LABELS[code],
          total: 0,
          barWidth: 0,
        })),
      ),
      products: this.normalizeBars(
        HOME_PRODUCT_ORDER.map((code) => ({
          code,
          label: HOME_PRODUCT_LABELS[code],
          total: 0,
          barWidth: 0,
        })),
      ),
      attentionDeals: [],
    };
  }
}
