import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';

import { CompanyDTO } from '@entities/company';

import { BreadcrumbModel, CRMErrorModel } from '@shared/model';
import { CRM_TOAST_KEY } from '@shared/ui';
import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import { InfoBlockEmptyPipe, InfoBlockState } from '@shared/ui/info-block';

import { COMPANY_CARD_BREADCRUMB_TOKEN } from '../../lib/company-card-breadcrumb-token.const';
import { CompanyContacts } from '../company-contacts/company-contacts';
import { CompanyGeneralInfo } from '../company-general-info/company-general-info';
import { CompanyCardController } from './company-card-page.controller';

@Component({
  selector: 'crm-company-card-page',
  providers: [CompanyCardController],
  imports: [
    CompanyGeneralInfo,
    CompanyContacts,
    InfoBlockState,
    InfoBlockEmptyPipe,
    ButtonModule,
    TooltipModule,
    TabsModule,
  ],
  templateUrl: './company-card-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardPage {
  private readonly controller = inject(CompanyCardController);
  private readonly messageService = inject(MessageService);
  private readonly breadcrumbsService = inject(BreadcrumbsService);
  private readonly router = inject(Router);

  readonly company = this.controller.company;
  readonly state = this.controller.state;
  readonly error = this.controller.error;

  constructor() {
    effect(() => {
      const error = this.error();

      if (error) {
        this.showError(error);
      }
    });

    effect(() => {
      const company = this.company();
      const url = this.router.url;
      const label =
        company?.commercialName ||
        company?.officialName ||
        (!company ? '...' : 'Неизвестная компания');
      const breadcrumb: BreadcrumbModel = {
        label,
        url,
        mapToken: COMPANY_CARD_BREADCRUMB_TOKEN,
      };

      this.breadcrumbsService.setBreadcrumbByToken(breadcrumb);
    });
  }

  refreshCompany(): void {
    this.controller.update();
  }

  handleCompanyUpdate(company: CompanyDTO): void {
    this.controller.update(company);
    this.messageService.add({
      severity: 'success',
      key: CRM_TOAST_KEY,
      summary: 'Успешно',
      detail: 'Данные о компании успешно обновлены',
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
