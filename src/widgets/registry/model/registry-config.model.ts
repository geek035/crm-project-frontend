import { ColumnFilter } from 'primeng/table';

import { AutocompleteInput } from '@shared/ui';

export enum RegistryFilterType {
  Text = 'text',
  Select = 'select',
  Autocomplete = 'autocomplete',
}

type RegistryFilterModel =
  | ({ type: RegistryFilterType.Text } & Partial<Pick<ColumnFilter, 'placeholder' | 'ariaLabel'>>)
  | ({ type: RegistryFilterType.Autocomplete } & Partial<AutocompleteInput<unknown>>);

export interface RegistryConfigModel<T> {
  columns: { field: keyof T; header: string; filter?: RegistryFilterModel }[];
}

export interface RegistryContentModel<T> {
  total: number;
  content: T[];
}
