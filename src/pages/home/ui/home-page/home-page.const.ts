import { DealPriorityCode, DealProductCode, DealStageCode } from '@entities/deal';

export const HOME_STAGE_LABELS: Record<DealStageCode, string> = {
  [DealStageCode.LEAD]: 'Лид',
  [DealStageCode.QUALIFICATION]: 'Квалификация',
  [DealStageCode.OFFER_PREPARATION]: 'Подготовка предложения',
  [DealStageCode.CLIENT_APPROVAL]: 'Согласование с клиентом',
  [DealStageCode.BANK_REVIEW]: 'Рассмотрение банком',
  [DealStageCode.DOCUMENT_SIGNING]: 'Подписание документов',
  [DealStageCode.WON]: 'Выиграно',
  [DealStageCode.LOST]: 'Проиграно',
  [DealStageCode.CANCELLED]: 'Отменено',
};

export const HOME_STAGE_ORDER: DealStageCode[] = [
  DealStageCode.LEAD,
  DealStageCode.QUALIFICATION,
  DealStageCode.OFFER_PREPARATION,
  DealStageCode.CLIENT_APPROVAL,
  DealStageCode.BANK_REVIEW,
  DealStageCode.DOCUMENT_SIGNING,
  DealStageCode.WON,
  DealStageCode.LOST,
  DealStageCode.CANCELLED,
];

export const HOME_PRODUCT_LABELS: Record<DealProductCode, string> = {
  [DealProductCode.CURRENT_ACCOUNT]: 'Расчетный счет',
  [DealProductCode.LOAN]: 'Кредит',
  [DealProductCode.DEPOSIT]: 'Депозит',
  [DealProductCode.SALARY_PROJECT]: 'Зарплатный проект',
  [DealProductCode.ACQUIRING]: 'Эквайринг',
  [DealProductCode.BANK_GUARANTEE]: 'Банковская гарантия',
  [DealProductCode.LEASING]: 'Лизинг',
};

export const HOME_PRODUCT_ORDER: DealProductCode[] = [
  DealProductCode.CURRENT_ACCOUNT,
  DealProductCode.LOAN,
  DealProductCode.DEPOSIT,
  DealProductCode.SALARY_PROJECT,
  DealProductCode.ACQUIRING,
  DealProductCode.BANK_GUARANTEE,
  DealProductCode.LEASING,
];

export const HOME_ATTENTION_PRIORITIES: DealPriorityCode[] = [
  DealPriorityCode.HIGH,
  DealPriorityCode.URGENT,
];
