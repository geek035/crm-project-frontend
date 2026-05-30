import { Component, input, model } from '@angular/core';
import { CardModule } from 'primeng/card';

import { IndividualManagerService } from '@features/individual-manager';

import { IndividualModel } from '@entities/individual';

import { Registry, RegistryConfigService } from '@shared/ui/registry';

import { IndividualsRegistryConfigService } from '../config/individuals-registry-config.service';

@Component({
  selector: 'crm-individuals-registry',
  imports: [CardModule, Registry],
  templateUrl: './individuals-registry.component.html',
  providers: [
    IndividualManagerService,
    IndividualsRegistryConfigService,
    { provide: RegistryConfigService, useExisting: IndividualsRegistryConfigService },
  ],
})
export class IndividualsRegistry {
  readonly selectedValue = model<IndividualModel | null>(null);
  readonly showCommands = input(true);
  readonly useFullPageClass = input(true);
  readonly stateSavingEnabled = input(true);
}
