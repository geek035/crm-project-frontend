import { Route } from '@angular/router';

import { INDIVIDUALS_URL } from '@features/individuals-navigation';

import { IndividualsRegistryPage } from '../ui/individuals-registry-page/individuals-registry-page';

export const INDIVIDUALS_REGISTRY_PAGE_ROUTE: Route = {
  path: INDIVIDUALS_URL,
  component: IndividualsRegistryPage,
};
