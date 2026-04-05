import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IndividualManagerService } from '@features/individual-manager';

import { IndividualModel } from '@entities/individual';

@Component({
  selector: 'crm-individual-card',
  providers: [IndividualManagerService],
  imports: [],
  templateUrl: './individual-card-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualCardPage {
  private readonly individual: IndividualModel | null = null;
}
