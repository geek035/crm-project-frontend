import { IndividualFormValueModel } from '../model/individual-create-form-value.model';

export function isIndividualFormFieldsValid(
  formValue: IndividualFormValueModel,
): formValue is IndividualFormValueModel<true> {
  return (
    !!formValue.firstName &&
    !!formValue.secondName &&
    !!formValue.email &&
    !!formValue.phoneNumber &&
    formValue.birthdate instanceof Date
  );
}
