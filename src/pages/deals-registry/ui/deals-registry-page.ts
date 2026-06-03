import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DealsRegistry } from '@widgets/deals-registry';

@Component({
  selector: 'crm-deals-registry-page',
  imports: [DealsRegistry],
  templateUrl: './deals-registry-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealsRegistryPage {}
