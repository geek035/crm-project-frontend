import {
  DealClientTypeCode,
  DealCurrencyCode,
  DealPriorityCode,
  DealProductCode,
  DealSourceCode,
} from '@entities/deal';

export interface DealCreateFormValueModel<T extends boolean = boolean> {
  number: string;
  clientTypeCode: T extends true ? DealClientTypeCode : DealClientTypeCode | null;
  clientID: string;
  title: string;
  description: string | null;
  productCode: T extends true ? DealProductCode : DealProductCode | null;
  amount: T extends true ? number : number | null;
  currencyCode: T extends true ? DealCurrencyCode : DealCurrencyCode | null;
  priorityCode: T extends true ? DealPriorityCode : DealPriorityCode | null;
  sourceCode: T extends true ? DealSourceCode : DealSourceCode | null;
  expectedCloseDate: Date | null;
}
