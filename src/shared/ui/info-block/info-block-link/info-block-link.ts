import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

import { InfoBlockBase } from '../info-block-base/info-block-base';
import { InfoBlockStateWrapper } from '../info-block-state-wrapper/info-block-state-wrapper';
import { InfoBlockLinkPipe } from './info-block-link-pipe';
import { InfoBlockLinkType } from './info-block-link.model';

@Component({
  selector: 'crm-info-block-link',
  imports: [CommonModule, InfoBlockStateWrapper, InfoBlockLinkPipe, SkeletonModule],
  templateUrl: './info-block-link.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockLink extends InfoBlockBase {
  readonly accessibility = input<'link' | 'link-term'>('link-term');
  readonly disabled = input(false);
  readonly link = input<string | null>(null);
  readonly type = input<InfoBlockLinkType>('default');

  readonly currentLink = computed(() => (this.disabled() ? null : this.link() || this.value()));
}
