import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { IndividualManagerService } from '@features/individual-manager';

import { BreadcrumbModel, CRMErrorModel } from '@shared/model';
import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import {
  InfoBlockDate,
  InfoBlockFullnamePipe,
  InfoBlockGrid,
  InfoBlockLink,
  InfoBlockText,
  getEntityFullname,
} from '@shared/ui/info-block';

import { IndividualCardController } from './individual-card-page.controller';

@Component({
  selector: 'crm-individual-card',
  providers: [IndividualManagerService, IndividualCardController],
  imports: [
    InfoBlockFullnamePipe,
    InfoBlockGrid,
    InfoBlockText,
    InfoBlockDate,
    InfoBlockLink,
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
      const label = getEntityFullname(individual) ?? 'Загрузка...';
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
