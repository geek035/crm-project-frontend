import { Routes } from '@angular/router';

import { BreadcrumbModel } from '@widgets/header';

import { CLIENTS_PAGE_URL } from '@shared/routes';

const breadcrumbs: BreadcrumbModel[] = [{ label: 'Клиенты' }];

export const CLIENT_PAGE_ROUTES: Routes = [
  {
    path: CLIENTS_PAGE_URL,
    data: { breadcrumbs },
    loadComponent: () =>
      import('../ui/clients-page/clients-page').then((component) => component.ClientsPage),
  },
];
