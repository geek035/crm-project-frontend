import { Routes } from '@angular/router';

import { BreadcrumbModel } from '@widgets/header';

import { INDIVIDUALS_REGISTRY_PAGE_URL } from '@shared/routes';

const breadcrumbs: BreadcrumbModel[] = [{ label: 'Клиенты' }];

export const INDIVIDUALS_REGISTRY_PAGE_ROUTES: Routes = [
  {
    path: INDIVIDUALS_REGISTRY_PAGE_URL,
    data: { breadcrumbs },
    loadComponent: () =>
      import('../ui/individuals-registry-page/individuals-registry-page').then(
        (c) => c.IndividualsRegistryPage,
      ),
  },
];
