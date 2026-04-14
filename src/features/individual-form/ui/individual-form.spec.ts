import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { FormStateSaverService } from '@shared/ui';

import { IndividualForm } from './individual-form';

describe('IndividualForm', () => {
  let component: IndividualForm;
  let fixture: ComponentFixture<IndividualForm>;

  const messageService = { add: vitest.fn() };
  const formStateSaver = {
    isFormStateSaved: vitest.fn(),
    saveFormState: vitest.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualForm, ReactiveFormsModule],
      providers: [
        { provide: FormStateSaverService, useValue: formStateSaver },
        { provide: MessageService, useValue: messageService },
      ],
    })
      .overrideComponent(IndividualForm, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(IndividualForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
