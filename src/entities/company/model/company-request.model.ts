import { RegisteredAddressDTO } from '@shared/model';

export interface CompanyCreateDTO {
  officialName: string;
  commercialName: string;
  inn: string;
  kpp: string;
  clientSegmentCode: string;
  registeredAddress: RegisteredAddressDTO;
}
