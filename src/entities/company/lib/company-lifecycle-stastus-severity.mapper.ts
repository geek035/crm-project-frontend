import { Tag } from 'primeng/tag';

import { CompanyDTO } from '../model/company-dto.model';
import { CompanyLifecycleStatusCode } from '../model/company-lifecycle-status-code.model';

export const mapCompanyLifecycleStatusSeverity = (company: CompanyDTO): Tag['severity'] => {
  switch (company.lifecycleStatus.code) {
    case CompanyLifecycleStatusCode.PROSPECT:
      return 'info';

    case CompanyLifecycleStatusCode.ACTIVE:
      return 'success';

    case CompanyLifecycleStatusCode.INACTIVE:
      return 'warn';

    case CompanyLifecycleStatusCode.ARCHIVED:
      return 'danger';
  }
};
