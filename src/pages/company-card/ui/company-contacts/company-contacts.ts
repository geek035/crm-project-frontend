import { ChangeDetectionStrategy, Component, effect, inject, untracked } from '@angular/core';

import { CompanyContactManagerService } from '@features/company-contact-manager';

import { Registry, RegistryConfigService } from '@shared/ui/registry';

import { CompanyContactsRegistryConfigService } from '../../config/company-contacts-registry-config.service';
import { CompanyContactCreateDialog } from '../company-contact-create-dialog/company-contact-create-dialog';
import { CompanyContactsController } from './company-contacts.controller';

@Component({
  selector: 'crm-company-contacts',
  imports: [Registry, CompanyContactCreateDialog],
  templateUrl: './company-contacts.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CompanyContactManagerService,
    CompanyContactsController,
    CompanyContactsRegistryConfigService,
    { provide: RegistryConfigService, useExisting: CompanyContactsRegistryConfigService },
  ],
})
export class CompanyContacts {
  private readonly controller = inject(CompanyContactsController);
  private readonly registryConfig = inject(CompanyContactsRegistryConfigService);

  readonly companyID = this.controller.companyID;
  readonly createDialogVisible = this.controller.createDialogVisible;

  constructor() {
    effect(() => {
      if (this.controller.deletedRevision() > 0) {
        untracked(() => this.registryConfig.refresh());
      }
    });
  }

  handleContactCreated(): void {
    this.registryConfig.refresh();
  }
}
