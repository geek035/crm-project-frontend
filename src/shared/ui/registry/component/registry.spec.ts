import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { Subject, of } from 'rxjs';
import { vi } from 'vitest';

import { RegistryConfigService } from '../registry-config/registry-config.service';
import { Registry } from './registry';

describe('Registry', () => {
  let component: Registry<unknown>;
  let fixture: ComponentFixture<Registry<unknown>>;
  let refreshes$: Subject<void>;
  const registryConfig = {
    registrySettings: vi.fn(),
    refreshes: new Subject<void>(),
    requestData: () => of([]),
  };

  const messageService = {};

  beforeEach(async () => {
    refreshes$ = new Subject<void>();
    registryConfig.refreshes = refreshes$;

    await TestBed.configureTestingModule({
      imports: [Registry],
      providers: [
        { provide: RegistryConfigService, useValue: registryConfig },
        { provide: MessageService, useValue: messageService },
      ],
    }).compileComponents();

    registryConfig.registrySettings.mockReturnValue({ columns: [] });

    fixture = TestBed.createComponent(Registry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear selected value after registry refresh', () => {
    component.selectedValue.set({});

    refreshes$.next();

    expect(component.selectedValue()).toBeNull();
  });
});
