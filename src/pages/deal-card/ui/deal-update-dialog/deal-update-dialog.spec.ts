import { NO_ERRORS_SCHEMA, inputBinding, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import {
  DealAPIService,
  DealClientTypeCode,
  DealCurrencyCode,
  DealLossReasonCode,
  DealPriorityCode,
  DealProductCode,
  DealSourceCode,
  DealStageCode,
  DealStatusCode,
} from '@entities/deal';

import { CRMStateModel } from '@shared/model';

import { DealUpdateDialog } from './deal-update-dialog';
import { DealUpdateDialogController } from './deal-update-dialog.controller';

describe(DealUpdateDialog.name, () => {
  let component: DealUpdateDialog;
  let fixture: ComponentFixture<DealUpdateDialog>;

  const controller = { state: signal<CRMStateModel>({ state: 'initial' }) };
  const deal = signal({
    id: 'deal-id',
    number: 'D-001',
    clientType: { code: DealClientTypeCode.COMPANY, description: 'Компания' },
    individualID: '',
    companyID: 'company-id',
    title: 'Поставка оборудования',
    description: 'Описание сделки',
    product: { code: DealProductCode.LOAN, description: 'Кредит' },
    amount: 1000,
    currency: { code: DealCurrencyCode.RUB, description: 'Рубль' },
    stage: { code: DealStageCode.LEAD, description: 'Новая' },
    status: { code: DealStatusCode.OPEN, description: 'Открыта' },
    probability: 10,
    priority: { code: DealPriorityCode.NORMAL, description: 'Средний' },
    source: { code: DealSourceCode.WEBSITE, description: 'Сайт' },
    expectedCloseDate: '30.05.2026',
    actualCloseDate: '',
    lossReason: { code: DealLossReasonCode.OTHER, description: '' },
  });
  const messageService = {};
  const dealAPI = {
    getPriorities: () => of([]),
    getSources: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealUpdateDialog],
      providers: [
        { provide: DealUpdateDialogController, useValue: controller },
        { provide: DealAPIService, useValue: dealAPI },
        { provide: MessageService, useValue: messageService },
      ],
    })
      .overrideComponent(DealUpdateDialog, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DealUpdateDialog, {
      bindings: [inputBinding('model', deal)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
