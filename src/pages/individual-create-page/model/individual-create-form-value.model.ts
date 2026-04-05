export interface IndividualCreateFormValueModel<V extends boolean = boolean> {
  firstName: string;
  secondName: string;
  surname: string | null;
  email: string;
  phoneNumber: string;
  birthdate: V extends true ? Date : Date | null;
}
