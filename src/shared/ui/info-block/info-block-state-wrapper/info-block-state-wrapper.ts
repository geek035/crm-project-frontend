import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { CRMStateModel } from '@shared/model';

@Component({
  selector: 'crm-info-block-state-wrapper',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockStateWrapper {
  readonly state = input<CRMStateModel | null>(null);

  private readonly _sharedState = computed(() => this.state());
  get sharedState() {
    return this._sharedState;
  }
}
