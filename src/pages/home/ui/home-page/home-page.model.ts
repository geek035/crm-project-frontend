import { DealDTO, DealProductCode, DealStageCode } from '@entities/deal';

export interface HomeBreakdownItem<TCode extends string> {
  code: TCode;
  label: string;
  total: number;
  barWidth: number;
}

export interface HomeDashboardModel {
  totals: {
    clients: number;
    companies: number;
    individuals: number;
    deals: number;
    openDeals: number;
    urgentDeals: number;
  };
  stages: HomeBreakdownItem<DealStageCode>[];
  products: HomeBreakdownItem<DealProductCode>[];
  attentionDeals: DealDTO[];
}

export interface HomeMetricModel {
  label: string;
  value: number;
  icon: string;
  routerLink?: string;
}

export interface HomeProcessStepModel {
  label: string;
  detail: string;
  icon: string;
  routerLink: string;
}
