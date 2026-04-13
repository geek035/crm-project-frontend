import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { CRMStateModel } from '@shared/model';

import {
  INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_PROVIDER,
  INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_TOKEN,
  InfoBlockGridAvailableColumnsCount,
} from './info-block-grid.provider';

@Component({
  selector: 'crm-info-block-grid',
  imports: [CommonModule],
  templateUrl: './info-block-grid.html',
  styles: ``,
  providers: [INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockGrid {
  private readonly colsDefaultCount = inject(INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_TOKEN);

  readonly colsSpan = input<InfoBlockGridAvailableColumnsCount>(this.colsDefaultCount);
  readonly state = input<CRMStateModel>({ state: 'initial' });
}
