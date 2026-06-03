import { Routes } from '@angular/router';

import { COMPANIES_REGISTRY_PAGE_ROUTE } from '@pages/companies-registry';
import { COMPANY_CARD_PAGE_ROUTE } from '@pages/company-card';
import { COMPANY_CREATE_ROUTE } from '@pages/company-create';
import { DEAL_CARD_PAGE_ROUTE } from '@pages/deal-card';
import { DEAL_CREATE_ROUTE } from '@pages/deal-create';
import { DEALS_REGISTRY_PAGE_ROUTE } from '@pages/deals-registry';
import { HOME_PAGE_ROUTE } from '@pages/home';
import { INDIVIDUAL_CARD_PAGE_ROUTE } from '@pages/individual-card';
import { INDIVIDUAL_CREATE_ROUTE } from '@pages/individual-create';
import { INDIVIDUALS_REGISTRY_PAGE_ROUTE } from '@pages/individuals-registry';

import { getCompaniesRoutes } from '@features/companies-navigation';
import { getDealsRoutes } from '@features/deals-navigation';
import { getIndividualsRoutes } from '@features/individuals-navigation';

export const routes: Routes = [
  HOME_PAGE_ROUTE,
  getIndividualsRoutes([
    INDIVIDUAL_CARD_PAGE_ROUTE,
    INDIVIDUAL_CREATE_ROUTE,
    INDIVIDUALS_REGISTRY_PAGE_ROUTE,
  ]),
  getCompaniesRoutes([
    COMPANY_CARD_PAGE_ROUTE,
    COMPANY_CREATE_ROUTE,
    COMPANIES_REGISTRY_PAGE_ROUTE,
  ]),
  getDealsRoutes([DEAL_CARD_PAGE_ROUTE, DEAL_CREATE_ROUTE, DEALS_REGISTRY_PAGE_ROUTE]),
];
