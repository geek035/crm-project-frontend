import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { CompanyManagerService } from '@features/company-manager';

import { CompanyDTO } from '@entities/company';

import { Registry, RegistryConfigService } from '@shared/ui/registry';

import { CompaniesRegistryConfigService } from '../config/companies-registry-config.service';

@Component({
  selector: 'crm-companies-registry',
  imports: [Registry],
  templateUrl: './companies-registry.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CompanyManagerService,
    CompaniesRegistryConfigService,
    { provide: RegistryConfigService, useExisting: CompaniesRegistryConfigService },
  ],
})
export class CompaniesRegistry {
  readonly selectedValue = model<CompanyDTO | null>(null);
  readonly showCommands = input(true);
  readonly useFullPageClass = input(true);
  readonly stateSavingEnabled = input(true);
}
