import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesRegistryPage } from './companies-registry-page';

describe('CompaniesRegistryPage', () => {
  let component: CompaniesRegistryPage;
  let fixture: ComponentFixture<CompaniesRegistryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesRegistryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CompaniesRegistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
