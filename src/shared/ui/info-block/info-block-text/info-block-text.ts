import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { InfoBlockBase } from '../info-block-base/info-block-base';
import { InfoBlockStateWrapper } from '../info-block-state-wrapper/info-block-state-wrapper';

@Component({
  selector: 'crm-info-block-text',
  imports: [InfoBlockStateWrapper],
  templateUrl: './info-block-text.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockText extends InfoBlockBase {
  readonly accessibility = input<'none' | 'term'>('term');
}
