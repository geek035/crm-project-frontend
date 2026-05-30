import { DirectoryEntryDTO } from '@shared/model';

import { CompanyContactRoleCode } from './company-contact-role-code.enum';
import { CompanyContactStatusCode } from './company-contact-status-code';

export interface CompanyContactDTO {
  id: string;
  individual: {
    id: string;
    firstName: string;
    secondName: string;
    surname: string;
    email: string;
    phoneNumber: string;
  };
  role: DirectoryEntryDTO<CompanyContactRoleCode>;
  status: DirectoryEntryDTO<CompanyContactStatusCode>;
}
