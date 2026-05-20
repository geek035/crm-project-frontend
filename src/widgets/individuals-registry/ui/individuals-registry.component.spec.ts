import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { IndividualsRegistry } from './individuals-registry.component';

describe(IndividualsRegistry.name, () => {
  let component: IndividualsRegistry;
  let fixture: ComponentFixture<IndividualsRegistry>;

  const messageService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualsRegistry],
      providers: [provideRouter([]), { provide: MessageService, useValue: messageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualsRegistry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
