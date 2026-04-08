import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryColumnItem } from './registry-column-item';

describe('RegistryColumn', () => {
  let component: RegistryColumnItem<unknown>;
  let fixture: ComponentFixture<RegistryColumnItem<unknown>>;

  const column = {};
  const item = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryColumnItem],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistryColumnItem, {
      bindings: [inputBinding('column', () => column), inputBinding('item', () => item)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
