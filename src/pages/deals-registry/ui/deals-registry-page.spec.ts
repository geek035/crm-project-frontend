import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsRegistryPage } from './deals-registry-page';

describe('DealsRegistryPage', () => {
  let component: DealsRegistryPage;
  let fixture: ComponentFixture<DealsRegistryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsRegistryPage],
    })
      .overrideComponent(DealsRegistryPage, {
        set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DealsRegistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
