export enum SortCriterionDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortCriterionModel {
  field: string;
  direction: SortCriterionDirection;
}
