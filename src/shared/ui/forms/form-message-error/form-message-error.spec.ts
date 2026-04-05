import { NO_ERRORS_SCHEMA, inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FormMessageError } from './form-message-error';

describe('FormMessageError', () => {
  let component: FormMessageError;
  let fixture: ComponentFixture<FormMessageError>;

  const control = { statusChanges: of(null) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMessageError],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(FormMessageError, { set: { imports: [], schemas: [NO_ERRORS_SCHEMA] } })
      .compileComponents();

    fixture = TestBed.createComponent(FormMessageError, {
      bindings: [inputBinding('control', () => control)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
