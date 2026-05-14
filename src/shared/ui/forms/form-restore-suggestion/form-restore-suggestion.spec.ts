import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRestoreSuggestion } from './form-restore-suggestion';

describe('FormRestoreSuggestion', () => {
  let component: FormRestoreSuggestion;
  let fixture: ComponentFixture<FormRestoreSuggestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRestoreSuggestion],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRestoreSuggestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
