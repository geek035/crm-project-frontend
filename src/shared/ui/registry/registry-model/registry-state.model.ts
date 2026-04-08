import { CRMErrorModel, FilterCriterionModel, SortCriterionModel } from '@shared/model';

export type RegistryUIStateModel =
  | { status: 'initial' }
  | { status: 'loading' }
  | { status: 'success' }
  | { status: 'error'; error: CRMErrorModel };

export interface RegistryPaginationStateModel {
  rows: 5 | 10 | 20;
}

export interface RegistryLoadParamsModel {
  pageSize: number;
  pageNumber: number;
  sort: SortCriterionModel[];
  filters: FilterCriterionModel[];
}
