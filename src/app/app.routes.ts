import { Routes } from '@angular/router';

import { INDIVIDUAL_CARD_PAGE_ROUTE } from '@pages/individual-card-page';
import { INDIVIDUAL_CREATE_ROUTE } from '@pages/individual-create-page';
import { INDIVIDUALS_REGISTRY_PAGE_ROUTE } from '@pages/individuals-registry-page';

import { getIndividualsRoutes } from '@features/individuals-navigation';

export const routes: Routes = [
  getIndividualsRoutes([
    INDIVIDUAL_CARD_PAGE_ROUTE,
    INDIVIDUAL_CREATE_ROUTE,
    INDIVIDUALS_REGISTRY_PAGE_ROUTE,
  ]),
];
