import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesRegistry } from './companies-registry';

describe('CompaniesRegistry', () => {
  let component: CompaniesRegistry;
  let fixture: ComponentFixture<CompaniesRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesRegistry],
    })
      .overrideComponent(CompaniesRegistry, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompaniesRegistry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
