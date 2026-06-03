import { Route } from '@angular/router';

import { HomePage } from '../ui/home-page/home-page';

export const HOME_PAGE_ROUTE: Route = {
  path: '',
  pathMatch: 'full',
  component: HomePage,
};
