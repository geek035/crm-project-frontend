import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { Registry, RegistryConfigService } from '@widgets/registry';

import { IndividualsRegistryConfigService } from '../../config/individuals-registry-config.service';

@Component({
  selector: 'crm-individuals-registry',
  imports: [CardModule, Registry],
  templateUrl: './individuals-registry.component.html',
  providers: [
    IndividualsRegistryConfigService,
    { provide: RegistryConfigService, useExisting: IndividualsRegistryConfigService },
  ],
})
export class IndividualsRegistry {}
