import { Route } from '@angular/router';

import { COMPANY_CREATE_URL } from '@features/companies-navigation';

import { BreadcrumbModel } from '@shared/model';

import { CompanyCreatePage } from '../ui/company-create-page';

const breadcrumbs: BreadcrumbModel[] = [{ label: 'Создать' }];

export const COMPANY_CREATE_ROUTE: Route = {
  path: COMPANY_CREATE_URL,
  data: { breadcrumbs },
  component: CompanyCreatePage,
};
