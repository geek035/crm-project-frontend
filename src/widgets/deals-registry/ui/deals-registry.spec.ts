import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsRegistry } from './deals-registry';

describe('DealsRegistry', () => {
  let component: DealsRegistry;
  let fixture: ComponentFixture<DealsRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsRegistry],
    })
      .overrideComponent(DealsRegistry, {
        set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DealsRegistry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
