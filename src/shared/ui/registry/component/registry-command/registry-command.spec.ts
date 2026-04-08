import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryCommand } from './registry-command';

describe('RegistryCommand', () => {
  let component: RegistryCommand<unknown>;
  let fixture: ComponentFixture<RegistryCommand<unknown>>;

  const command = {};
  const selectedValue = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryCommand],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistryCommand, {
      bindings: [
        inputBinding('command', () => command),
        inputBinding('selectedValue', () => selectedValue),
      ],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
