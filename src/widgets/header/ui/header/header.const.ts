import { MenuItem } from 'primeng/api';

import { INDIVIDUALS_REGISTRY_PAGE_URL } from '@shared/routes';

export const HEADER_INTERNAL_ITEMS: MenuItem[] = [
  { label: 'Клиенты', routerLink: INDIVIDUALS_REGISTRY_PAGE_URL },
];
