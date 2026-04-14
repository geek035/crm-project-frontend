import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

import { CRMStateModel } from '@shared/model';

import { InfoBlockStateWrapper } from '../info-block-state-wrapper/info-block-state-wrapper';

@Component({
  selector: 'crm-info-block-state',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './info-block-state.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockState {
  private readonly stateWrapper = inject(InfoBlockStateWrapper, { optional: true });

  readonly state = input<CRMStateModel | null>(null);

  readonly currentState = computed<CRMStateModel>(
    () => this.state() || this.stateWrapper?.sharedState() || { state: 'initial' },
  );

  constructor() {
    effect(() => {
      console.log(this.state());
    });
  }
}
