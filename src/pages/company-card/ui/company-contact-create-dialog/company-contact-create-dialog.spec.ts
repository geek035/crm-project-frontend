import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CompanyContactAPIService } from '../../api/company-contact-api.service';
import { CompanyContactCreateDialog } from './company-contact-create-dialog';
import { CompanyContactCreateDialogController } from './company-contact-create-dialog.controller';

describe(CompanyContactCreateDialog.name, () => {
  let component: CompanyContactCreateDialog;
  let fixture: ComponentFixture<CompanyContactCreateDialog>;

  const controller = {
    state: signal({ state: 'pending' }),
    addContact: vitest.fn(),
    reset: vitest.fn(),
  };
  const companyContactAPI = { getRoles: vitest.fn(() => of([])) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyContactCreateDialog],
      providers: [
        { provide: CompanyContactCreateDialogController, useValue: controller },
        { provide: CompanyContactAPIService, useValue: companyContactAPI },
      ],
    })
      .overrideComponent(CompanyContactCreateDialog, {
        set: {
          imports: [],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyContactCreateDialog);
    fixture.componentRef.setInput('companyID', 'company-id');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
