import { DealClientTypeCode } from './deal-client-type-code.enum';
import { DealCurrencyCode } from './deal-currency-code.enum';
import { DealLossReasonCode } from './deal-loss-reason-code.enum';
import { DealPriorityCode } from './deal-priority-code.enum';
import { DealProductCode } from './deal-product-code.enum';
import { DealSourceCode } from './deal-source-code.enum';
import { DealStageCode } from './deal-stage-code.enum';
import { DealStatusCode } from './deal-status-code.enum';

export interface DealCreateDTO {
  number: string;
  clientTypeCode: DealClientTypeCode;
  clientID: string;
  title: string;
  description: string | null;
  productCode: DealProductCode;
  amount: number;
  currencyCode: DealCurrencyCode;
  priorityCode: DealPriorityCode;
  sourceCode: DealSourceCode;
  expectedCloseDate: Date | null;
}

export interface DealUpdateDTO {
  title: string;
  description: string | null;
  priorityCode: DealPriorityCode;
  sourceCode: DealSourceCode;
  expectedCloseDate: Date | null;
}

export interface DealChangeStageDTO {
  stageCode: DealStageCode;
  closeInfo: DealLossReasonCode | null;
}

export interface DealChangeStatusDTO {
  statusCode: DealStatusCode;
  closeInfo: DealLossReasonCode | null;
}
