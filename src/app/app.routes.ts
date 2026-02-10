import { Routes } from '@angular/router';

import { ClientsPage } from '@pages/clients';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clients' },
  { path: 'clients', component: ClientsPage },
  { path: 'foo', component: ClientsPage },
];
