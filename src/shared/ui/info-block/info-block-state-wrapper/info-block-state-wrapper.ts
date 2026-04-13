import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

import { CRMStateModel } from '@shared/model';

import { InfoBlockGrid } from '../info-block-grid/info-block-grid';

@Component({
  selector: 'crm-info-block-state-wrapper',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './info-block-state-wrapper.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockStateWrapper {
  protected readonly infoBlockGrid = inject(InfoBlockGrid, { optional: true });

  readonly state = input<CRMStateModel | null>(null);

  readonly currentState = computed<CRMStateModel>(
    () => this.state() || this.infoBlockGrid?.state() || { state: 'initial' },
  );
}
