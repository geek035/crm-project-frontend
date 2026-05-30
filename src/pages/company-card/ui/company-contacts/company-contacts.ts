import { ChangeDetectionStrategy, Component, effect, inject, untracked } from '@angular/core';

import { Registry, RegistryConfigService } from '@shared/ui/registry';

import { CompanyContactsRegistryConfigService } from '../../config/company-contacts-registry-config.service';
import { CompanyContactManagerService } from '../../model/company-contact-manager.service';
import { CompanyContactCreateDialog } from '../company-contact-create-dialog/company-contact-create-dialog';
import { CompanyContactUpdateDialog } from '../company-contact-update-dialog/company-contact-update-dialog';
import { CompanyContactsController } from './company-contacts.controller';

@Component({
  selector: 'crm-company-contacts',
  imports: [Registry, CompanyContactCreateDialog, CompanyContactUpdateDialog],
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
  readonly updateDialogVisible = this.controller.updateDialogVisible;
  readonly updateDialogMode = this.controller.updateDialogMode;
  readonly updateDialogContact = this.controller.updateDialogContact;

  constructor() {
    effect(() => {
      if (this.controller.contactsChangedRevision() > 0) {
        untracked(() => this.registryConfig.refresh());
      }
    });
  }

  handleContactChanged(): void {
    this.registryConfig.refresh();
  }

  handleUpdateDialogVisibilityChange(visible: boolean): void {
    this.controller.handleUpdateDialogVisibilityChange(visible);
  }
}
