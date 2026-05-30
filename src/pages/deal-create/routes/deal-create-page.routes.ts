import { Route } from '@angular/router';

import { DEAL_CREATE_URL } from '@features/deals-navigation';

import { BreadcrumbModel } from '@shared/model';

import { DealCreatePage } from '../ui/deal-create-page';

const breadcrumbs: BreadcrumbModel[] = [{ label: 'Создать' }];

export const DEAL_CREATE_ROUTE: Route = {
  path: DEAL_CREATE_URL,
  data: { breadcrumbs },
  component: DealCreatePage,
};
