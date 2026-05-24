export { DealClientTypeCode } from './model/deal-client-type-code.enum';
export { DealCurrencyCode } from './model/deal-currency-code.enum';
export { DealPriorityCode } from './model/deal-priority-code.enum';
export { DealProductCode } from './model/deal-product-code.enum';
export { DealSourceCode } from './model/deal-source-code.enum';
export { DealStageCode } from './model/deal-stage-code.enum';
export { DealStatusCode } from './model/deal-status-code.enum';

export type { DealDTO } from './model/deal.model';

export { mapDealPrioritySeverity } from './lib/deal-priority-severity.mapper';
export { mapDealStageSeverity } from './lib/deal-stage-severity.mapper';
export { mapDealStatusSeverity } from './lib/deal-status-severity.mapper';

export { DealAPIService } from './api/deal-api.service';
