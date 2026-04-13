import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { BreadcrumbsService } from '@shared/ui/breadcrumbs';
import { InfoBlockFullnamePipe } from '@shared/ui/info-block';

import { IndividualCardPage } from './individual-card-page.component';
import { IndividualCardController } from './individual-card-page.controller';

describe(IndividualCardPage.name, () => {
  let component: IndividualCardPage;
  let fixture: ComponentFixture<IndividualCardPage>;

  const controller = { individual: signal(null), error: signal(null), state: signal(null) };
  const messageService = {};
  const breadcrumbService = { setBreadcrumbByToken: vitest.fn() };
  const router = { url: 'fakeURL' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualCardPage],
      providers: [
        { provide: IndividualCardController, useValue: controller },
        { provide: MessageService, useValue: messageService },
        { provide: BreadcrumbsService, useValue: breadcrumbService },
        { provide: Router, useValue: router },
      ],
    })
      .overrideComponent(IndividualCardPage, {
        set: { imports: [InfoBlockFullnamePipe], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(IndividualCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
