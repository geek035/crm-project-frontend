import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlockEmptyPipe } from '@shared/ui/info-block';

import { DealCardController } from '../deal-card-page/deal-card-page.controller';
import { DealGeneralInfo } from './deal-general-info';

describe(DealGeneralInfo.name, () => {
  let component: DealGeneralInfo;
  let fixture: ComponentFixture<DealGeneralInfo>;

  const controller = {
    deal: signal(null),
    company: signal(null),
    individual: signal(null),
    state: signal({ state: 'initial' }),
    error: signal(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealGeneralInfo],
      providers: [{ provide: DealCardController, useValue: controller }],
    })
      .overrideComponent(DealGeneralInfo, {
        set: {
          imports: [InfoBlockEmptyPipe, DatePipe],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DealGeneralInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
