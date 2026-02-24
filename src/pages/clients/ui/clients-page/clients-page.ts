import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';

import { ClientsPageRegistryConfigService } from '@pages/clients/config/clients-page-registry-config.service';

import { Registry, RegistryConfigService } from '@widgets/registry';

import { ClientsPageController } from './clients-page.controller';

@Component({
  selector: 'crm-clients-page',
  imports: [CardModule, Registry],
  templateUrl: './clients-page.html',
  providers: [
    ClientsPageController,
    ClientsPageRegistryConfigService,
    { provide: RegistryConfigService, useExisting: ClientsPageRegistryConfigService },
  ],
})
export class ClientsPage {
  private readonly controller = inject(ClientsPageController);
}
