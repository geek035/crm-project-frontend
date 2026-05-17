import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGeneralInfo } from './company-general-info';

describe('CompanyGeneralInfo', () => {
  let component: CompanyGeneralInfo;
  let fixture: ComponentFixture<CompanyGeneralInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyGeneralInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyGeneralInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
