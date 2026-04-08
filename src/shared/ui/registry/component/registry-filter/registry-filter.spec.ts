import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryFilter } from './registry-filter';

describe('RegistryFilter', () => {
  let component: RegistryFilter<unknown>;
  let fixture: ComponentFixture<RegistryFilter<unknown>>;

  const column = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistryFilter, {
      bindings: [inputBinding('column', () => column)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
