import { NO_ERRORS_SCHEMA, inputBinding, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

import { DealStateUpdateDialog } from './deal-state-update-dialog';
import { DealStateUpdateDialogController } from './deal-state-update-dialog.controller';

describe(DealStateUpdateDialog.name, () => {
  let component: DealStateUpdateDialog;
  let fixture: ComponentFixture<DealStateUpdateDialog>;

  const controller = { state: signal<CRMStateModel>({ state: 'initial' }) };
  const kind = signal<'stage' | 'status'>('stage');
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
  const dealAPI = {
    getStages: () => of([]),
    getStatuses: () => of([]),
    getLossReasons: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealStateUpdateDialog],
      providers: [
        { provide: DealStateUpdateDialogController, useValue: controller },
        { provide: DealAPIService, useValue: dealAPI },
      ],
    })
      .overrideComponent(DealStateUpdateDialog, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DealStateUpdateDialog, {
      bindings: [inputBinding('model', deal), inputBinding('kind', kind)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
