import { Tag } from 'primeng/tag';

import { CompanyContactDTO } from '../model/company-contact-dto.model';
import { CompanyContactStatusCode } from '../model/company-contact-status-code';

export const mapCompanyContactStatusSeverity = (contact: CompanyContactDTO): Tag['severity'] => {
  switch (contact.status.code) {
    case CompanyContactStatusCode.ACTIVE:
      return 'success';

    case CompanyContactStatusCode.INACTIVE:
      return 'warn';

    case CompanyContactStatusCode.DISMISSED:
      return 'danger';

    case CompanyContactStatusCode.TEMPORARY_UNAVAILABLE:
      return 'info';
  }
};
