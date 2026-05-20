import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCardController } from '../company-card-page/company-card-page.controller';
import { CompanyGeneralInfo } from './company-general-info';

describe('CompanyGeneralInfo', () => {
  let component: CompanyGeneralInfo;
  let fixture: ComponentFixture<CompanyGeneralInfo>;

  const controller = {
    company: signal(null),
    state: signal({ state: 'initial' }),
    error: signal(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyGeneralInfo],
      providers: [{ provide: CompanyCardController, useValue: controller }],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyGeneralInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
