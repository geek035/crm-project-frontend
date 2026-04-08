import { ColumnFilter } from 'primeng/table';

import { AutocompleteInput } from '../../controls/autocomplete/autocomplete.model';

export enum RegistryFilterType {
  TEXT = 'text',
  SELECT = 'select',
  AUTOCOMPLETE = 'autocomplete',
}

export type RegistryFilterModel =
  | ({ type: RegistryFilterType.TEXT } & Partial<Pick<ColumnFilter, 'placeholder' | 'ariaLabel'>>)
  | ({ type: RegistryFilterType.AUTOCOMPLETE } & AutocompleteInput<unknown>);
