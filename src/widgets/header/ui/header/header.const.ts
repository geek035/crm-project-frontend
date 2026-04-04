import { MenuItem } from 'primeng/api';

import { INDIVIDUALS_URL } from '@features/individuals-navigation';

export const HEADER_INTERNAL_ITEMS: MenuItem[] = [
  { label: 'Физ. лица', routerLink: INDIVIDUALS_URL },
];
