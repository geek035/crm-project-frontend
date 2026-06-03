import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import { InfoBlockEmptyPipe } from '@shared/ui/info-block';

import { DealCardPage } from './deal-card-page';
import { DealCardController } from './deal-card-page.controller';

describe(DealCardPage.name, () => {
  let component: DealCardPage;
  let fixture: ComponentFixture<DealCardPage>;

  const controller = {
    deal: signal(null),
    error: signal(null),
    state: signal({ state: 'initial' }),
    update: vitest.fn(),
  };
  const messageService = { add: vitest.fn() };
  const breadcrumbService = { setBreadcrumbByToken: vitest.fn() };
  const router = { url: 'fakeURL' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealCardPage],
      providers: [
        { provide: DealCardController, useValue: controller },
        { provide: MessageService, useValue: messageService },
        { provide: BreadcrumbsService, useValue: breadcrumbService },
        { provide: Router, useValue: router },
      ],
    })
      .overrideComponent(DealCardPage, {
        set: {
          imports: [InfoBlockEmptyPipe],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DealCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
