import { NO_ERRORS_SCHEMA, inputBinding, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  CompanyAPIService,
  CompanyClientSegmentCode,
  CompanyLifecycleStatusCode,
} from '@entities/company';

import { CRMStateModel } from '@shared/model';

import { CompanyLifecycleUpdateDialog } from './company-lifecycle-update-dialog';
import { CompanyLifecycleUpdateDialogController } from './company-lifecycle-update-dialog.controller';

describe(CompanyLifecycleUpdateDialog.name, () => {
  let component: CompanyLifecycleUpdateDialog;
  let fixture: ComponentFixture<CompanyLifecycleUpdateDialog>;

  const controller = {
    state: signal<CRMStateModel>({ state: 'pending' }),
    reset: vitest.fn(),
  };
  const companyAPI = { getLifecycleStatuses: vitest.fn(() => of([])) };
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLifecycleUpdateDialog],
      providers: [
        { provide: CompanyLifecycleUpdateDialogController, useValue: controller },
        { provide: CompanyAPIService, useValue: companyAPI },
      ],
    })
      .overrideComponent(CompanyLifecycleUpdateDialog, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyLifecycleUpdateDialog, {
      bindings: [inputBinding('model', company)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
