import { Route } from '@angular/router';

import { CompanyDTO } from '@entities/company';

import { BreadcrumbModel } from '@shared/model';

export const COMPANIES_URL = 'companies';
export const COMPANY_CREATE_URL = `${COMPANIES_URL}/create`;
export const COMPANY_CARD_URL = `${COMPANIES_URL}/card/:id`;

export const getCompanyCardURL = (id: CompanyDTO['id']) => `${COMPANIES_URL}/card/${id}`;

export function getCompaniesRoutes(childRoutes: Route[]): Route {
  const breadcrumbs: BreadcrumbModel[] = [{ label: 'Компании' }];
  const children = childRoutes.map((route) => mapChildRoute(route));

  return {
    path: COMPANIES_URL,
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
