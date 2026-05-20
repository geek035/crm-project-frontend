import { NO_ERRORS_SCHEMA, inputBinding, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { CompanyClientSegmentCode, CompanyLifecycleStatusCode } from '@entities/company';

import { CRMStateModel } from '@shared/model';

import { CompanyUpdateDialog } from './company-update-dialog';
import { CompanyUpdateDialogController } from './company-update-dialog.controller';

describe(CompanyUpdateDialog.name, () => {
  let component: CompanyUpdateDialog;
  let fixture: ComponentFixture<CompanyUpdateDialog>;

  const controller = { state: signal<CRMStateModel>({ state: 'initial' }) };
  const company = signal({
    id: 'company-id',
    officialName: 'ООО Ромашка',
    commercialName: 'Ромашка',
    inn: '1234567890',
    kpp: '123456789',
    clientSegment: { code: CompanyClientSegmentCode.MEDIUM_BUSINESS, description: 'Средний' },
    lifecycleStatus: { code: CompanyLifecycleStatusCode.ACTIVE, description: 'Активна' },
    registeredAddress: {
      country: 'Россия',
      region: 'Москва',
      city: 'Москва',
      street: 'Тверская',
      building: '1',
      office: '2',
      postalCode: '123456',
    },
  });
  const messageService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyUpdateDialog],
      providers: [
        { provide: CompanyUpdateDialogController, useValue: controller },
        { provide: MessageService, useValue: messageService },
      ],
    })
      .overrideComponent(CompanyUpdateDialog, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyUpdateDialog, {
      bindings: [inputBinding('model', company)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
