import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BACKEND_DATE_FORMAT } from '@shared/lib';

import { InfoBlockBase } from '../info-block-base/info-block-base';
import { InfoBlockStateWrapper } from '../info-block-state-wrapper/info-block-state-wrapper';

@Component({
  selector: 'crm-info-block-date',
  imports: [CommonModule, InfoBlockStateWrapper],
  templateUrl: './info-block-date.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockDate extends InfoBlockBase {
  readonly accessibility = input<'none' | 'term'>('term');
  readonly format = input<string>(BACKEND_DATE_FORMAT);
}
