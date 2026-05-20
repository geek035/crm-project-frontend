import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import {
  mapCompanyClientSegmentSeverity,
  mapCompanyLifecycleStatusSeverity,
} from '@entities/company';

import { InfoBlockEmptyPipe, InfoBlockState, InfoBlockStateWrapper } from '@shared/ui/info-block';

import { CompanyCardController } from '../company-card-page/company-card-page.controller';

@Component({
  selector: 'crm-company-general-info',
  templateUrl: './company-general-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InfoBlockState, InfoBlockStateWrapper, InfoBlockEmptyPipe, CardModule, TagModule],
})
export class CompanyGeneralInfo {
  private readonly controller = inject(CompanyCardController);

  readonly company = this.controller.company;
  readonly state = this.controller.state;
  readonly error = this.controller.error;

  readonly getClientSegmentSeverity = mapCompanyClientSegmentSeverity;
  readonly getLifecycleStatusSeverity = mapCompanyLifecycleStatusSeverity;
}
