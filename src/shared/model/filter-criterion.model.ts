export enum CRMFilterMatchMode {
  STARTS_WITH = 'startsWith',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  ENDS_WITH = 'endsWith',
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
}

export interface FilterCriterionModel<T = unknown> {
  field: string;
  value: T;
  matchMode: CRMFilterMatchMode;
}

export function isCRMFilterMatchMode(
  value: string | null | undefined,
): value is CRMFilterMatchMode {
  return !!value && Object.values(CRMFilterMatchMode).some((mode) => mode === value);
}
