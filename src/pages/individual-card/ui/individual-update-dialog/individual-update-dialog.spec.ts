import { NO_ERRORS_SCHEMA, inputBinding, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { CRMStateModel } from '@shared/model';

import { IndividualUpdateDialog } from './individual-update-dialog';
import { IndividualUpdateDialogController } from './individual-update-dialog.controller';

describe('IndividualUpdateDialog', () => {
  let component: IndividualUpdateDialog;
  let fixture: ComponentFixture<IndividualUpdateDialog>;

  const controller = { state: signal<CRMStateModel>({ state: 'initial' }) };
  const individual = signal({});
  const messageService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualUpdateDialog],
      providers: [
        { provide: IndividualUpdateDialogController, useValue: controller },
        { provide: MessageService, useValue: messageService },
      ],
    })
      .overrideComponent(IndividualUpdateDialog, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(IndividualUpdateDialog, {
      bindings: [inputBinding('model', individual)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
