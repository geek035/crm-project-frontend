import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { FormStateSaverService } from '@shared/ui';

import { IndividualCreatePage } from './individual-create-page.component';
import { IndividualCreatePageController } from './individual-create-page.controller';

describe('IndividualCreatePage', () => {
  let component: IndividualCreatePage;
  let fixture: ComponentFixture<IndividualCreatePage>;

  const router = {};
  const messageService = { add: vitest.fn() };
  const formStateSaver = {
    isFormStateSaved: vitest.fn(),
    saveFormState: vitest.fn().mockReturnValue(of(null)),
  };
  const controller = { loading: signal(false) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualCreatePage, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: MessageService, useValue: messageService },
        { provide: FormStateSaverService, useValue: formStateSaver },
        { provide: IndividualCreatePageController, useValue: controller },
      ],
    })
      .overrideComponent(IndividualCreatePage, {
        set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(IndividualCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
