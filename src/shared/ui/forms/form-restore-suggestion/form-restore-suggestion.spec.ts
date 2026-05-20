import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { FormRestoreSuggestion } from './form-restore-suggestion';

describe('FormRestoreSuggestion', () => {
  let component: FormRestoreSuggestion;
  let fixture: ComponentFixture<FormRestoreSuggestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRestoreSuggestion],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRestoreSuggestion, {
      bindings: [inputBinding('formKey', () => 'test-form')],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
