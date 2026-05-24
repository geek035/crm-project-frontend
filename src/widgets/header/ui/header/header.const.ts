import { MenuItem } from 'primeng/api';

import { COMPANIES_URL } from '@features/companies-navigation';
import { DEALS_URL } from '@features/deals-navigation';
import { INDIVIDUALS_URL } from '@features/individuals-navigation';

export const HEADER_INTERNAL_ITEMS: MenuItem[] = [
  { label: 'Физ. лица', routerLink: INDIVIDUALS_URL },
  { label: 'Компании', routerLink: COMPANIES_URL },
  { label: 'Сделки', routerLink: DEALS_URL },
];
