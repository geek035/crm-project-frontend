import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { getCompanyCardURL } from '@features/companies-navigation';
import { getIndividualCardURL } from '@features/individuals-navigation';

import { CompanyDTO } from '@entities/company';
import {
  DealClientTypeCode,
  DealDTO,
  mapDealPrioritySeverity,
  mapDealStageSeverity,
  mapDealStatusSeverity,
} from '@entities/deal';
import { IndividualModel } from '@entities/individual';

import { BACKEND_DATE_FORMAT } from '@shared/lib';
import {
  InfoBlockEmptyPipe,
  InfoBlockLinkPipe,
  InfoBlockState,
  InfoBlockStateWrapper,
  getEntityFullname,
} from '@shared/ui/info-block';

import { DealCardController } from '../deal-card-page/deal-card-page.controller';

@Component({
  selector: 'crm-deal-general-info',
  templateUrl: './deal-general-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    InfoBlockState,
    InfoBlockStateWrapper,
    InfoBlockEmptyPipe,
    InfoBlockLinkPipe,
    CardModule,
    TagModule,
  ],
})
export class DealGeneralInfo {
  private readonly controller = inject(DealCardController);
  private readonly moneyFormatter = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  readonly deal = this.controller.deal;
  readonly company = this.controller.company;
  readonly individual = this.controller.individual;
  readonly state = this.controller.state;
  readonly error = this.controller.error;
  readonly dateFormat = BACKEND_DATE_FORMAT;

  readonly clientType = DealClientTypeCode;

  readonly getPrioritySeverity = mapDealPrioritySeverity;
  readonly getStageSeverity = mapDealStageSeverity;
  readonly getStatusSeverity = mapDealStatusSeverity;

  getCompanyCardRouterLink(id: DealDTO['companyID'] | null | undefined): string | null {
    return id ? `/${getCompanyCardURL(id)}` : null;
  }

  getIndividualCardRouterLink(id: DealDTO['individualID'] | null | undefined): string | null {
    return id ? `/${getIndividualCardURL(id)}` : null;
  }

  formatAmount(deal: DealDTO): string {
    return `${this.moneyFormatter.format(deal.amount)} ${deal.currency.description}`;
  }

  formatProbability(deal: DealDTO): string {
    return `${deal.probability}%`;
  }

  getCompanyName(company: CompanyDTO): string {
    return company.commercialName || company.officialName || 'Компания';
  }

  getIndividualName(individual: IndividualModel): string {
    return getEntityFullname(individual) ?? 'Физ. лицо';
  }
}
