export const mapDealsQueryFilter = (field: string): string => {
  switch (field) {
    case 'clientType':
    case 'product':
    case 'currency':
    case 'stage':
    case 'status':
    case 'priority':
    case 'source':
    case 'lossReason':
      return `${field}.code`;
    default:
      return field;
  }
};
