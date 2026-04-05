import { Route } from '@angular/router';

import { IndividualModel } from '@entities/individual';

import { BreadcrumbModel } from '@shared/model';

export const INDIVIDUALS_URL = 'individuals';
export const INDIVIDUAL_CREATE_URL = `${INDIVIDUALS_URL}/create`;
export const INDIVIDUAL_CARD_URL = `${INDIVIDUALS_URL}/card/:id`;

export const getIndividualCardURL = (id: IndividualModel['id']) => `${INDIVIDUALS_URL}/card/${id}`;

export function getIndividualsRoutes(childRoutes: Route[]): Route {
  const breadcrumbs: BreadcrumbModel[] = [{ label: 'Физ. лица' }];
  const children = childRoutes.map((route) => mapChildRoute(route));

  return {
    path: INDIVIDUALS_URL,
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
