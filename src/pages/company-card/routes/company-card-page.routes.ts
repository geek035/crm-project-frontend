import { Route } from '@angular/router';

import { COMPANY_CARD_URL } from '@features/companies-navigation';

import { BreadcrumbModel } from '@shared/model';

import { COMPANY_CARD_BREADCRUMB_TOKEN } from '../lib/company-card-breadcrumb-token.const';
import { CompanyCardPage } from '../ui/company-card-page/company-card-page';

const breadcrumbs: BreadcrumbModel[] = [{ mapToken: COMPANY_CARD_BREADCRUMB_TOKEN }];

export const COMPANY_CARD_PAGE_ROUTE: Route = {
  path: COMPANY_CARD_URL,
  component: CompanyCardPage,
  data: { breadcrumbs },
};
