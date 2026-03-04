import { MenuItem } from 'primeng/api';
import { ButtonProps } from 'primeng/button';
import { ColumnFilter } from 'primeng/table';

import { AutocompleteInput } from '@shared/ui';

export enum RegistryFilterType {
  Text = 'text',
  Select = 'select',
  Autocomplete = 'autocomplete',
}

type RegistryCommandModel<T> =
  | { link: true; label: string; routerLink: string }
  | ({ link?: false } & Partial<
      Pick<
        ButtonProps,
        'ariaLabel' | 'badge' | 'icon' | 'label' | 'variant' | 'severity' | 'badgeSeverity'
      > & {
        variant: 'outlined' | 'text' | undefined;
        badgeSeverity:
          | 'success'
          | 'info'
          | 'warn'
          | 'danger'
          | 'help'
          | 'primary'
          | 'secondary'
          | 'contrast'
          | null
          | undefined;
        command: (value: T | null) => void;
      }
    >);

type RegistryFilterModel =
  | ({ type: RegistryFilterType.Text } & Partial<Pick<ColumnFilter, 'placeholder' | 'ariaLabel'>>)
  | ({ type: RegistryFilterType.Autocomplete } & Partial<AutocompleteInput<unknown>>);

export interface RegistryConfigModel<T> {
  dataKey?: string;
  rowsPerPageOptions?: number[];
  showSearch?: boolean;
  columns: { field: keyof T; header: string; filter?: RegistryFilterModel }[];
  contextMenu?: MenuItem[];
  commands?: {
    general?: RegistryCommandModel<T>[];
    specific?: RegistryCommandModel<T>[];
  };
  stateSaving?: {
    key: string;
    storage: 'session' | 'local';
  };
}

export interface RegistryContentModel<T> {
  total: number;
  content: T[];
}
