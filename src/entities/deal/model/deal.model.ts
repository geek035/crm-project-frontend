import { DirectoryEntryDTO } from '@shared/model';

import { DealClientTypeCode } from './deal-client-type-code.enum';
import { DealCurrencyCode } from './deal-currency-code.enum';
import { DealLossReasonCode } from './deal-loss-reason-code.enum';
import { DealPriorityCode } from './deal-priority-code.enum';
import { DealProductCode } from './deal-product-code.enum';
import { DealSourceCode } from './deal-source-code.enum';
import { DealStageCode } from './deal-stage-code.enum';
import { DealStatusCode } from './deal-status-code.enum';

export interface DealDTO {
  id: string;
  number: string;
  clientType: DirectoryEntryDTO<DealClientTypeCode>;
  individualID: string;
  companyID: string;
  title: string;
  description: string;
  product: DirectoryEntryDTO<DealProductCode>;
  amount: number;
  currency: DirectoryEntryDTO<DealCurrencyCode>;
  stage: DirectoryEntryDTO<DealStageCode>;
  status: DirectoryEntryDTO<DealStatusCode>;
  probability: number;
  priority: DirectoryEntryDTO<DealPriorityCode>;
  source: DirectoryEntryDTO<DealSourceCode>;
  expectedCloseDate: string;
  actualCloseDate: string;
  lossReason: DirectoryEntryDTO<DealLossReasonCode>;
}
