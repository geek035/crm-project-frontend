import { Route } from '@angular/router';

import { DEALS_URL } from '@features/deals-navigation';

import { DealsRegistryPage } from '../ui/deals-registry-page';

export const DEALS_REGISTRY_PAGE_ROUTE: Route = {
  path: DEALS_URL,
  component: DealsRegistryPage,
};
