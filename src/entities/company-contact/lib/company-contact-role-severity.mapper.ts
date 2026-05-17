import { Tag } from 'primeng/tag';

import { CompanyContactDTO } from '../model/company-contact-dto.model';
import { CompanyContactRoleCode } from '../model/company-contact-role-code.enum';

export const mapCompanyContactRoleSeverity = (contact: CompanyContactDTO): Tag['severity'] => {
  switch (contact.role.code) {
    case CompanyContactRoleCode.OWNER:
    case CompanyContactRoleCode.CEO:
      return 'success';

    case CompanyContactRoleCode.FINANCE_DIRECTOR:
    case CompanyContactRoleCode.ACCOUNTANT:
    case CompanyContactRoleCode.TREASURER:
      return 'info';

    case CompanyContactRoleCode.OPERATIONS_MANAGER:
      return 'warn';

    case CompanyContactRoleCode.AUTHORIZED_REPRESENTATIVE:
      return 'secondary';
  }
};
