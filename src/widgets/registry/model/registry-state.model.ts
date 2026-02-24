import { TableLazyLoadEvent } from 'primeng/table';

export type RegistryUIStateModel =
  | { status: 'initial' }
  | { status: 'loading' }
  | { status: 'success' }
  | { status: 'error'; error: Error };

export interface RegistryPaginationStateModel {
  rows: 5 | 10 | 20;
}

export type RegistryLoadParamsModel = TableLazyLoadEvent;
