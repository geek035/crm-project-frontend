import { CompanyCreateFormValueModel } from '../model/company-create-form.model';

export function mapToCompanyFormValue<T extends Record<keyof CompanyCreateFormValueModel, unknown>>(
  value: T,
): CompanyCreateFormValueModel {
  const registeredAddress =
    value.registeredAddress as CompanyCreateFormValueModel['registeredAddress'];

  return {
    officialName: String(value.officialName),
    commercialName: String(value.commercialName),
    inn: String(value.inn),
    kpp: String(value.kpp),
    clientSegment: value.clientSegment as CompanyCreateFormValueModel['clientSegment'],
    registeredAddress: {
      country: String(registeredAddress.country),
      region: String(registeredAddress.region),
      city: String(registeredAddress.city),
      street: String(registeredAddress.street),
      building: String(registeredAddress.building),
      office:
        registeredAddress.office === null
          ? registeredAddress.office
          : String(registeredAddress.office),
      postalCode: String(registeredAddress.postalCode),
    },
  };
}
