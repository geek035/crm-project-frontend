import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { IndividualManagerService } from '@features/individual-manager';

import { BACKEND_DATE_FORMAT } from '@shared/lib';
import { BreadcrumbModel, CRMErrorModel } from '@shared/model';
import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import {
  InfoBlockEmptyPipe,
  InfoBlockFullnamePipe,
  InfoBlockLinkPipe,
  InfoBlockState,
  InfoBlockStateWrapper,
  getEntityFullname,
} from '@shared/ui/info-block';

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
    RouterModule,
    CardModule,
  ],
  templateUrl: './individual-card-page.component.html',
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

  showError(error: CRMErrorModel): void {
    this.messageService.add({
      severity: 'error',
      sticky: true,
      summary: error?.title,
      detail: error?.message,
    });
  }
}
