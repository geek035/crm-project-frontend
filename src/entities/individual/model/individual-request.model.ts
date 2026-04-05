export interface GetIndidvidualsParamsDTO {
  textSearch: string;
}

export interface IndividualAddDTO {
  firstName: string;
  secondName: string;
  surname: string | null;
  email: string;
  phoneNumber: string;
  birthdate: string;
}
