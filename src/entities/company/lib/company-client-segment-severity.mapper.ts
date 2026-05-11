import { Tag } from 'primeng/tag';

import { CompanyClientSegmentCode } from '../model/company-client-segment-code.model';
import { CompanyDTO } from '../model/company-dto.model';

export const mapCompanyClientSegmentSeverity = (company: CompanyDTO): Tag['severity'] => {
  switch (company.clientSegment.code) {
    case CompanyClientSegmentCode.MICRO:
    case CompanyClientSegmentCode.SMALL_BUSINESS:
      return 'secondary';

    case CompanyClientSegmentCode.MEDIUM_BUSINESS:
      return 'info';

    case CompanyClientSegmentCode.PARTNER:
      return 'success';
  }
};
