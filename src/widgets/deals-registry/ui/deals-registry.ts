import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DealManagerService } from '@features/deal-manager';

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
export class DealsRegistry {}
