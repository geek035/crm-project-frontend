import { DirectoryEntryDTO, RegisteredAddressDTO } from '@shared/model';

import { CompanyClientSegmentCode } from './company-client-segment-code.model';
import { CompanyLifecycleStatusCode } from './company-lifecycle-status-code.model';

export interface CompanyDTO {
  id: string;
  officialName: string;
  commercialName: string;
  inn: string;
  kpp: string;
  clientSegment: DirectoryEntryDTO<CompanyClientSegmentCode>;
  lifecycleStatus: DirectoryEntryDTO<CompanyLifecycleStatusCode>;
  registeredAddress: RegisteredAddressDTO;
}
