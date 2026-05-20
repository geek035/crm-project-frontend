import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { CompanyForm } from './company-form';

describe('CompanyForm', () => {
  let component: CompanyForm;
  let fixture: ComponentFixture<CompanyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyForm],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
