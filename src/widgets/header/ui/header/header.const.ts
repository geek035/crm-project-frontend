import { MenuItem } from 'primeng/api';

import { CLIENTS_PAGE_URL } from '@shared/routes';

export const HEADER_INTERNAL_ITEMS: MenuItem[] = [
  { label: 'Клиенты', routerLink: CLIENTS_PAGE_URL },
];
