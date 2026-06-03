import { Route } from '@angular/router';

import { DEAL_CARD_URL } from '@features/deals-navigation';

import { BreadcrumbModel } from '@shared/model';

import { DEAL_CARD_BREADCRUMB_TOKEN } from '../lib/deal-card-breadcrumb-token.const';
import { DealCardPage } from '../ui/deal-card-page/deal-card-page';

const breadcrumbs: BreadcrumbModel[] = [{ mapToken: DEAL_CARD_BREADCRUMB_TOKEN }];

export const DEAL_CARD_PAGE_ROUTE: Route = {
  path: DEAL_CARD_URL,
  component: DealCardPage,
  data: { breadcrumbs },
};
