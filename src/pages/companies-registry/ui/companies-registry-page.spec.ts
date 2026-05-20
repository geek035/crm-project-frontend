import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesRegistryPage } from './companies-registry-page';

describe('CompaniesRegistryPage', () => {
  let component: CompaniesRegistryPage;
  let fixture: ComponentFixture<CompaniesRegistryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesRegistryPage],
    })
      .overrideComponent(CompaniesRegistryPage, {
        set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompaniesRegistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
