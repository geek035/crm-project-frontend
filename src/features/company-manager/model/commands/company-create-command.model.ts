import { CompanyClientSegmentCode } from '@entities/company';

import { DirectoryEntryDTO } from '@shared/model';

export interface CompanyCreateCommand {
  officialName: string;
  commercialName: string;
  inn: string;
  kpp: string;
  clientSegment: DirectoryEntryDTO<CompanyClientSegmentCode>;
  registeredAddress: {
    country: string;
    region: string;
    city: string;
    street: string;
    building: string;
    office: string | null;
    postalCode: string;
  };
}
