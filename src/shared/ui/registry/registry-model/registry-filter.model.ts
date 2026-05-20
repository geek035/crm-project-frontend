import { ColumnFilter } from 'primeng/table';

import { MultiselectInput } from '@shared/ui/controls/multiselect/multiselect.model';

import { AutocompleteInput } from '../../controls/autocomplete/autocomplete.model';

export enum RegistryFilterType {
  TEXT = 'text',
  SELECT = 'select',
  AUTOCOMPLETE = 'autocomplete',
  MULTISELECT = 'multiselect',
}

export type RegistryFilterModel<T> =
  | ({ type: RegistryFilterType.TEXT } & Partial<Pick<ColumnFilter, 'placeholder' | 'ariaLabel'>>)
  | ({ type: RegistryFilterType.AUTOCOMPLETE } & AutocompleteInput<T>)
  | ({ type: RegistryFilterType.MULTISELECT } & MultiselectInput);
