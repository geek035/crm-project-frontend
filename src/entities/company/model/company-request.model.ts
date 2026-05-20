import { RegisteredAddressDTO } from '@shared/model';

import { CompanyClientSegmentCode } from './company-client-segment-code.model';
import { CompanyLifecycleStatusCode } from './company-lifecycle-status-code.model';

export interface CompanyCreateDTO {
  officialName: string;
  commercialName: string;
  inn: string;
  kpp: string;
  clientSegmentCode: string;
  registeredAddress: RegisteredAddressDTO;
}

export interface CompanyUpdateDTO {
  officialName: string;
  commercialName: string;
  inn: string;
  kpp: string;
  clientSegmentCode: CompanyClientSegmentCode;
  registeredAddress: RegisteredAddressDTO;
}

export interface CompanyUpdateLifecycleDTO {
  lifecycleCode: CompanyLifecycleStatusCode;
}
