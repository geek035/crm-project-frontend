import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Multiselect } from './multiselect';

describe('Multiselect', () => {
  let component: Multiselect<unknown>;
  let fixture: ComponentFixture<Multiselect<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Multiselect],
    }).compileComponents();

    fixture = TestBed.createComponent(Multiselect, {
      bindings: [inputBinding('query', () => () => of([]))],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
