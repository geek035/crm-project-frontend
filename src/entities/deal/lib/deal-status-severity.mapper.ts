import { Tag } from 'primeng/tag';

import { DealStatusCode } from '../model/deal-status-code.enum';
import { DealDTO } from '../model/deal.model';

export const mapDealStatusSeverity = (deal: DealDTO): Tag['severity'] => {
  switch (deal.status.code) {
    case DealStatusCode.OPEN:
      return 'info';

    case DealStatusCode.SUCCESS:
      return 'success';

    case DealStatusCode.FAILED:
    case DealStatusCode.CANCELLED:
      return 'danger';
  }
};
