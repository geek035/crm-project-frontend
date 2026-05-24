import { Route } from '@angular/router';

import { DealDTO } from '@entities/deal';

import { BreadcrumbModel } from '@shared/model';

export const DEALS_URL = 'deals';
export const DEAL_CREATE_URL = `${DEALS_URL}/create`;
export const DEAL_CARD_URL = `${DEALS_URL}/card/:id`;

export const getDealCardURL = (id: DealDTO['id']) => `${DEALS_URL}/card/${id}`;

export function getDealsRoutes(childRoutes: Route[]): Route {
  const breadcrumbs: BreadcrumbModel[] = [{ label: 'Сделки' }];
  const children = childRoutes.map((route) => mapChildRoute(route));

  return {
    path: DEALS_URL,
    data: { breadcrumbs },
    children,
  };
}

function mapChildRoute(route: Route) {
  const segments = route.path?.split('/');
  segments?.shift();

  return {
    ...route,
    path: segments?.join('/'),
  };
}
