import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { ApplicationsPage } from './applications-page';

describe('ApplicationsPage', () => {
  let component: ApplicationsPage;
  let fixture: ComponentFixture<ApplicationsPage>;

  const messageService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsPage],
      providers: [{ provide: MessageService, useValue: messageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
