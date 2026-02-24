import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ApplicationsRegistryConfigService } from '@pages/applications/config/applications-registry.config';

import { Registry, RegistryConfigService } from '@widgets/registry';

@Component({
  selector: 'crm-applications-page',
  imports: [Registry],
  templateUrl: './applications-page.html',
  styleUrl: './applications-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ApplicationsRegistryConfigService,
    { provide: RegistryConfigService, useExisting: ApplicationsRegistryConfigService },
  ],
})
export class ApplicationsPage {}
