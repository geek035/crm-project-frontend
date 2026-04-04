import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IndividualModel } from '@entities/individual';

@Component({
  selector: 'crm-individual-card',
  imports: [],
  templateUrl: './individual-card-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualCardPage {
  private readonly individual: IndividualModel | null = null;
}
