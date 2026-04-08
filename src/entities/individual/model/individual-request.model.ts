import { FilterCriterionModel, SortCriterionModel } from '@shared/model';

export interface IndividualsQueryDTO {
  pageNumber: number;
  pageSize: number;
  sort: SortCriterionModel[];
  filters: FilterCriterionModel[];
}

export interface IndividualAddDTO {
  firstName: string;
  secondName: string;
  surname: string | null;
  email: string;
  phoneNumber: string;
  birthdate: string;
}
