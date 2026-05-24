import { Tag } from 'primeng/tag';

import { DealStageCode } from '../model/deal-stage-code.enum';
import { DealDTO } from '../model/deal.model';

export const mapDealStageSeverity = (deal: DealDTO): Tag['severity'] => {
  switch (deal.stage.code) {
    case DealStageCode.LEAD:
    case DealStageCode.QUALIFICATION:
      return 'info';

    case DealStageCode.OFFER_PREPARATION:
    case DealStageCode.CLIENT_APPROVAL:
    case DealStageCode.BANK_REVIEW:
    case DealStageCode.DOCUMENT_SIGNING:
      return 'warn';

    case DealStageCode.WON:
      return 'success';

    case DealStageCode.LOST:
    case DealStageCode.CANCELLED:
      return 'danger';
  }
};
