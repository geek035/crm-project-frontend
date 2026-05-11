import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CompaniesRegistry } from '@widgets/companies-registry';

@Component({
  selector: 'crm-companies-registry-page',
  imports: [CompaniesRegistry],
  templateUrl: './companies-registry-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesRegistryPage {}
