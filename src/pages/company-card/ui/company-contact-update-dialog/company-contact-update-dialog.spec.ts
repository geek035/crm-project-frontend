import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  CompanyContactAPIService,
  CompanyContactRoleCode,
  CompanyContactStatusCode,
} from '@entities/company-contact';

import { CompanyContactUpdateDialog } from './company-contact-update-dialog';
import { CompanyContactUpdateDialogController } from './company-contact-update-dialog.controller';

describe(CompanyContactUpdateDialog.name, () => {
  let component: CompanyContactUpdateDialog;
  let fixture: ComponentFixture<CompanyContactUpdateDialog>;

  const controller = {
    state: signal({ state: 'pending' }),
    updateRole: vitest.fn(),
    updateStatus: vitest.fn(),
    reset: vitest.fn(),
  };
  const companyContactAPI = {
    getRoles: vitest.fn(() => of([])),
    getStatuses: vitest.fn(() => of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyContactUpdateDialog],
      providers: [
        { provide: CompanyContactUpdateDialogController, useValue: controller },
        { provide: CompanyContactAPIService, useValue: companyContactAPI },
      ],
    })
      .overrideComponent(CompanyContactUpdateDialog, {
        set: {
          imports: [],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyContactUpdateDialog);
    fixture.componentRef.setInput('companyID', 'company-id');
    fixture.componentRef.setInput('mode', 'role');
    fixture.componentRef.setInput('contact', {
      id: 'contact-id',
      individual: {
        id: 'individual-id',
        firstName: 'Иван',
        secondName: 'Иванович',
        surname: 'Иванов',
        email: 'ivan@example.com',
        phoneNumber: '+70000000000',
      },
      role: { code: CompanyContactRoleCode.CEO, description: 'CEO' },
      status: { code: CompanyContactStatusCode.ACTIVE, description: 'Активен' },
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
