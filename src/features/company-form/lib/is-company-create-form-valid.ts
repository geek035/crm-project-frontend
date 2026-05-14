import { CompanyCreateFormValueModel } from '../model/company-create-form.model';

export function isCompanyCreateFormValid(
  value: CompanyCreateFormValueModel,
): value is CompanyCreateFormValueModel<true> {
  return !!value.clientSegment;
}
