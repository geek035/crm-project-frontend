import { Route } from '@angular/router';

import { INDIVIDUAL_CREATE_URL } from '@features/individuals-navigation';

import { BreadcrumbModel } from '@shared/model';

import { IndividualCreatePage } from '../ui/individual-create-page/individual-create-page.component';

const breadcrumbs: BreadcrumbModel[] = [{ label: 'Создать' }];

export const INDIVIDUAL_CREATE_ROUTE: Route = {
  path: INDIVIDUAL_CREATE_URL,
  data: { breadcrumbs },
  component: IndividualCreatePage,
};
