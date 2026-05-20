import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { CompanyCreatePage } from './company-create-page';
import { CompanyCreatePageController } from './company-create-page.controller';

describe('CompanyCreatePage', () => {
  let component: CompanyCreatePage;
  let fixture: ComponentFixture<CompanyCreatePage>;

  const controller = {
    loading: signal(false),
    error: signal(null),
  };
  const messageService = { add: vitest.fn() };
  const router = { navigateByUrl: vitest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyCreatePage],
      providers: [
        { provide: CompanyCreatePageController, useValue: controller },
        { provide: MessageService, useValue: messageService },
        { provide: Router, useValue: router },
      ],
    })
      .overrideComponent(CompanyCreatePage, {
        set: { imports: [], providers: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
