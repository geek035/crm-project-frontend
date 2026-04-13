import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { CRMStateModel } from '@shared/model';

import { InfoBlockGrid } from '../info-block-grid/info-block-grid';

@Component({
  selector: 'crm-info-block-base',
  imports: [],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class InfoBlockBase {
  protected readonly infoBlockGrid = inject(InfoBlockGrid, { optional: true });

  readonly state = input<CRMStateModel | null>(null);
  readonly label = input<string>();
  readonly value = input<string | null | undefined>(null);
}
