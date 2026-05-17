import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsRegistryConfigService } from '../../config/company-contacts-registry-config.service';
import { CompanyContacts } from './company-contacts';
import { CompanyContactsController } from './company-contacts.controller';

describe(CompanyContacts.name, () => {
  let component: CompanyContacts;
  let fixture: ComponentFixture<CompanyContacts>;

  const controller = {
    companyID: signal(null),
    createDialogVisible: signal(false),
    deletedRevision: signal(0),
  };
  const registryConfig = { refresh: vitest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyContacts],
      providers: [
        { provide: CompanyContactsController, useValue: controller },
        { provide: CompanyContactsRegistryConfigService, useValue: registryConfig },
      ],
    })
      .overrideComponent(CompanyContacts, {
        set: {
          imports: [],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyContacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
