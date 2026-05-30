import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';

import { DealManagerService } from '@features/deal-manager';

import { DealDTO } from '@entities/deal';

import { Registry, RegistryConfigService } from '@shared/ui/registry';

import { DealsRegistryConfigService } from '../config/deals-registry-config.service';

@Component({
  selector: 'crm-deals-registry',
  imports: [Registry],
  templateUrl: './deals-registry.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DealManagerService,
    DealsRegistryConfigService,
    { provide: RegistryConfigService, useExisting: DealsRegistryConfigService },
  ],
})
export class DealsRegistry {
  private readonly registryConfig = inject(DealsRegistryConfigService);

  readonly companyID = input<DealDTO['companyID'] | null>(null);
  readonly individualID = input<DealDTO['individualID'] | null>(null);
  readonly showCommands = input(true);
  readonly useFullPageClass = input(true);
  readonly stateSavingEnabled = input(true);

  constructor() {
    effect(() => {
      const companyID = this.companyID();
      const individualID = this.individualID();

      if (companyID !== null) {
        this.registryConfig.setCompanyID(companyID);
      } else if (individualID !== null) {
        this.registryConfig.setIndividualID(individualID);
      } else {
        this.registryConfig.setAllDeals();
      }
    });
  }
}
