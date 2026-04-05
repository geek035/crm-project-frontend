import { IndividualCreateFormValueModel } from '../model/individual-create-form-value.model';

export function mapToIndividualCreateFormValue<
  T extends Record<keyof IndividualCreateFormValueModel, unknown>,
>(value: T): IndividualCreateFormValueModel {
  return {
    firstName: String(value.firstName),
    secondName: String(value.secondName),
    surname: value.surname === null ? value.surname : String(value.surname),
    birthdate:
      value.birthdate === null ? value.birthdate : new Date(value.birthdate as string | Date),
    email: String(value.email),
    phoneNumber: String(value.phoneNumber),
  };
}
