import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { DealCreatePage } from './deal-create-page';
import { DealCreatePageController } from './deal-create-page.controller';

describe(DealCreatePage.name, () => {
  let component: DealCreatePage;
  let fixture: ComponentFixture<DealCreatePage>;

  const controller = {
    loading: signal(false),
    error: signal(null),
    createDeal: vitest.fn(),
  };
  const messageService = { add: vitest.fn() };
  const router = { navigateByUrl: vitest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealCreatePage],
      providers: [
        { provide: DealCreatePageController, useValue: controller },
        { provide: MessageService, useValue: messageService },
        { provide: Router, useValue: router },
      ],
    })
      .overrideComponent(DealCreatePage, {
        set: {
          imports: [],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DealCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
