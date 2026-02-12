import { Routes } from '@angular/router';

import { CLIENT_PAGE_ROUTES, ClientsPage } from '@pages/clients';

export const routes: Routes = [
  ...CLIENT_PAGE_ROUTES,
  { path: 'foo', component: ClientsPage },
  { path: '', pathMatch: 'full', redirectTo: 'clients' },
];
