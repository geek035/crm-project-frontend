import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { CompanyManagerService } from '@features/company-manager';
import { DealManagerService } from '@features/deal-manager';
import { IndividualManagerService } from '@features/individual-manager';

import { DealDTO } from '@entities/deal';

import { BreadcrumbModel, CRMErrorModel } from '@shared/model';
import { CRM_TOAST_KEY } from '@shared/ui';
import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import { InfoBlockEmptyPipe, InfoBlockState } from '@shared/ui/info-block';

import { DEAL_CARD_BREADCRUMB_TOKEN } from '../../lib/deal-card-breadcrumb-token.const';
import { DealGeneralInfo } from '../deal-general-info/deal-general-info';
import { DealUpdateDialog } from '../deal-update-dialog/deal-update-dialog';
import { DealCardController } from './deal-card-page.controller';

@Component({
  selector: 'crm-deal-card-page',
  providers: [
    DealManagerService,
    CompanyManagerService,
    IndividualManagerService,
    DealCardController,
  ],
  imports: [
    DealGeneralInfo,
    DealUpdateDialog,
    InfoBlockState,
    InfoBlockEmptyPipe,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './deal-card-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealCardPage {
  private readonly controller = inject(DealCardController);
  private readonly messageService = inject(MessageService);
  private readonly breadcrumbsService = inject(BreadcrumbsService);
  private readonly router = inject(Router);

  readonly deal = this.controller.deal;
  readonly state = this.controller.state;
  readonly error = this.controller.error;
  readonly updateDialogOpened = signal(false);

  constructor() {
    effect(() => {
      const error = this.error();

      if (error) {
        this.showError(error);
      }
    });

    effect(() => {
      const deal = this.deal();
      const url = this.router.url;
      const label = deal?.number || deal?.title || (!deal ? '...' : 'Неизвестная сделка');
      const breadcrumb: BreadcrumbModel = {
        label,
        url,
        mapToken: DEAL_CARD_BREADCRUMB_TOKEN,
      };

      this.breadcrumbsService.setBreadcrumbByToken(breadcrumb);
    });
  }

  refreshDeal(): void {
    this.controller.update();
  }

  openUpdateDialog(): void {
    this.updateDialogOpened.set(true);
  }

  handleDealUpdate(deal: DealDTO): void {
    this.controller.update(deal);
    this.messageService.add({
      severity: 'success',
      key: CRM_TOAST_KEY,
      summary: 'Успешно',
      detail: 'Данные сделки успешно обновлены',
    });
  }

  private showError(error: CRMErrorModel): void {
    this.messageService.add({
      severity: 'error',
      sticky: true,
      key: CRM_TOAST_KEY,
      summary: error?.title,
      detail: error?.message,
    });
  }
}
