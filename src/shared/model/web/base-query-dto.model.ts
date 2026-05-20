import { FilterCriterionModel } from './filter-criterion.model';
import { SortCriterionModel } from './sort-criterion.model';

export interface BaseQueryDTO {
  pageNumber: number;
  pageSize: number;
  sort: SortCriterionModel[];
  filters: FilterCriterionModel[];
}
