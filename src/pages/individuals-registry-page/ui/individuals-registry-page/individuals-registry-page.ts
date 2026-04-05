import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IndividualsRegistry } from '../individuals-registry/individuals-registry.component';

@Component({
  selector: 'crm-individuals-registry-page',
  imports: [IndividualsRegistry],
  templateUrl: './individuals-registry-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualsRegistryPage {}
