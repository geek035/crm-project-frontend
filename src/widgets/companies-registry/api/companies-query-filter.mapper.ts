export const mapCompaniesQueryFilter = (field: string): string => {
  switch (field) {
    case 'clientSegment':
    case 'lifecycleStatus':
      return `${field}.code`;
    default:
      return field;
  }
};
