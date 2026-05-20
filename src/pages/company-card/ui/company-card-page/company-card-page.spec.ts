import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import { InfoBlockEmptyPipe } from '@shared/ui/info-block';

import { CompanyCardPage } from './company-card-page';
import { CompanyCardController } from './company-card-page.controller';

describe(CompanyCardPage.name, () => {
  let component: CompanyCardPage;
  let fixture: ComponentFixture<CompanyCardPage>;

  const controller = {
    company: signal(null),
    error: signal(null),
    state: signal({ state: 'initial' }),
    update: vitest.fn(),
  };
  const messageService = { add: vitest.fn() };
  const breadcrumbService = { setBreadcrumbByToken: vitest.fn() };
  const router = { url: 'fakeURL' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyCardPage],
      providers: [
        { provide: CompanyCardController, useValue: controller },
        { provide: MessageService, useValue: messageService },
        { provide: BreadcrumbsService, useValue: breadcrumbService },
        { provide: Router, useValue: router },
      ],
    })
      .overrideComponent(CompanyCardPage, {
        set: {
          imports: [InfoBlockEmptyPipe],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
