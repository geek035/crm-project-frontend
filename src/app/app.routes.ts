import { Routes } from '@angular/router';

import { COMPANIES_REGISTRY_PAGE_ROUTE } from '@pages/companies-registry';
import { INDIVIDUAL_CARD_PAGE_ROUTE } from '@pages/individual-card';
import { INDIVIDUAL_CREATE_ROUTE } from '@pages/individual-create';
import { INDIVIDUALS_REGISTRY_PAGE_ROUTE } from '@pages/individuals-registry';

import { getCompaniesRoutes } from '@features/companies-navigation';
import { getIndividualsRoutes } from '@features/individuals-navigation';

export const routes: Routes = [
  getIndividualsRoutes([
    INDIVIDUAL_CARD_PAGE_ROUTE,
    INDIVIDUAL_CREATE_ROUTE,
    INDIVIDUALS_REGISTRY_PAGE_ROUTE,
  ]),
  getCompaniesRoutes([COMPANIES_REGISTRY_PAGE_ROUTE]),
];
