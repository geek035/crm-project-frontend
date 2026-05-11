import { Route } from '@angular/router';

import { INDIVIDUAL_CARD_URL } from '@features/individuals-navigation';

import { BreadcrumbModel } from '@shared/model';

import { INDIVIDUAL_CARD_BREADCRUMB_TOKEN } from '../lib/individual-card-breadcrumb-token.const';
import { IndividualCardPage } from '../ui/individual-card-page/individual-card-page.component';

const breadcrumbs: BreadcrumbModel[] = [{ mapToken: INDIVIDUAL_CARD_BREADCRUMB_TOKEN }];

export const INDIVIDUAL_CARD_PAGE_ROUTE: Route = {
  path: INDIVIDUAL_CARD_URL,
  component: IndividualCardPage,
  data: { breadcrumbs },
};
