import { CompanyClientSegmentCode } from '@entities/company';

import { DirectoryEntryDTO } from '@shared/model';

export interface CompanyCreateFormValueModel<T extends boolean = boolean> {
  officialName: string;
  commercialName: string;
  inn: string;
  kpp: string;
  clientSegment: T extends true
    ? DirectoryEntryDTO<CompanyClientSegmentCode>
    : DirectoryEntryDTO<CompanyClientSegmentCode> | null;
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
