import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesRegistry } from './companies-registry';

describe('CompaniesRegistry', () => {
  let component: CompaniesRegistry;
  let fixture: ComponentFixture<CompaniesRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesRegistry],
    }).compileComponents();

    fixture = TestBed.createComponent(CompaniesRegistry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
