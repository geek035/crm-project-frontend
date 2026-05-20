import { Route } from '@angular/router';

import { COMPANIES_URL } from '@features/companies-navigation';

import { CompaniesRegistryPage } from '../ui/companies-registry-page';

export const COMPANIES_REGISTRY_PAGE_ROUTE: Route = {
  path: COMPANIES_URL,
  component: CompaniesRegistryPage,
};
