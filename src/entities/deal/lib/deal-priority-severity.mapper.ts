import { Tag } from 'primeng/tag';

import { DealPriorityCode } from '../model/deal-priority-code.enum';
import { DealDTO } from '../model/deal.model';

export const mapDealPrioritySeverity = (deal: DealDTO): Tag['severity'] => {
  switch (deal.priority.code) {
    case DealPriorityCode.LOW:
      return 'secondary';

    case DealPriorityCode.NORMAL:
      return 'info';

    case DealPriorityCode.HIGH:
      return 'warn';

    case DealPriorityCode.URGENT:
      return 'danger';
  }
};
