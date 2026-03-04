import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { RegistryConfigService } from '@widgets/registry/config/registry-config.service';

import { Registry } from './registry';

describe('Registry', () => {
  let component: Registry<unknown>;
  let fixture: ComponentFixture<Registry<unknown>>;
  const registryConfig = { registrySettings: vi.fn(), requestData: () => of([]) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registry],
      providers: [{ provide: RegistryConfigService, useValue: registryConfig }],
    }).compileComponents();

    registryConfig.registrySettings.mockReturnValue({ columns: [] });

    fixture = TestBed.createComponent(Registry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
