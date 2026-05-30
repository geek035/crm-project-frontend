import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

import { DealsRegistry } from '@widgets/deals-registry';

import { IndividualManagerService } from '@features/individual-manager';

import { IndividualModel } from '@entities/individual';

import { BACKEND_DATE_FORMAT } from '@shared/lib';
import { BreadcrumbModel, CRMErrorModel } from '@shared/model';
import { CRM_TOAST_KEY } from '@shared/ui';
import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import {
  InfoBlockEmptyPipe,
  InfoBlockFullnamePipe,
  InfoBlockLinkPipe,
  InfoBlockState,
  InfoBlockStateWrapper,
  getEntityFullname,
} from '@shared/ui/info-block';

import { IndividualUpdateDialog } from '../individual-update-dialog/individual-update-dialog';
import { IndividualCardController } from './individual-card-page.controller';

@Component({
  selector: 'crm-individual-card',
  providers: [IndividualManagerService, IndividualCardController],
  imports: [
    CommonModule,
    InfoBlockFullnamePipe,
    InfoBlockState,
    InfoBlockStateWrapper,
    InfoBlockLinkPipe,
    InfoBlockEmptyPipe,
    IndividualUpdateDialog,
    DealsRegistry,
    RouterModule,
    CardModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './individual-card-page.component.html',
  styleUrl: './individual-card-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualCardPage {
  private readonly controller = inject(IndividualCardController);
  private readonly messageService = inject(MessageService);
  private readonly breadcrumbsService = inject(BreadcrumbsService);
  private readonly router = inject(Router);

  readonly individual = this.controller.individual;
  readonly state = this.controller.state;
  readonly error = this.controller.error;

  readonly updateDialogOpened = signal(false);

  readonly dateFormat = BACKEND_DATE_FORMAT;

  constructor() {
    effect(() => {
      const error = this.error();

      if (error) {
        this.showError(error);
      }
    });

    effect(() => {
      const individual = this.individual();

      const url = this.router.url;
      const label = !individual
        ? '...'
        : (getEntityFullname(individual) ?? 'Неизвестное физ. лицо');
      const breadcrumb: BreadcrumbModel = { label, url };
      this.breadcrumbsService.setBreadcrumbByToken(breadcrumb);
    });
  }

  openUpdateDialog(): void {
    this.updateDialogOpened.set(true);
  }

  handleIndividualUpdate(individual: IndividualModel): void {
    this.controller.update(individual);
    this.messageService.add({
      severity: 'success',
      key: CRM_TOAST_KEY,
      summary: 'Успешно',
      detail: 'Данные о физ. лице успешно обновлены',
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
