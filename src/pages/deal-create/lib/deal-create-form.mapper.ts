import { DealCreateDTO } from '@entities/deal';

import { DealCreateFormValueModel } from '../model/deal-create-form.model';

export function isDealCreateFormValid(
  value: DealCreateFormValueModel,
): value is DealCreateFormValueModel<true> {
  return (
    !!value.clientTypeCode &&
    !!value.clientID &&
    !!value.productCode &&
    value.amount !== null &&
    !!value.currencyCode &&
    !!value.priorityCode &&
    !!value.sourceCode
  );
}

export function mapToDealCreateDTO(formValue: DealCreateFormValueModel<true>): DealCreateDTO {
  return {
    ...formValue,
    description: formValue.description || null,
  };
}

export function mapToDealCreateFormValue(
  value: Partial<DealCreateFormValueModel>,
): Partial<DealCreateFormValueModel> {
  return {
    ...value,
    expectedCloseDate: value.expectedCloseDate ? new Date(value.expectedCloseDate) : null,
  };
}
