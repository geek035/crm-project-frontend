import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ru } from 'primelocale/ru.json';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { httpErrorInterceptor } from '@shared/api';

import { CRMPreset } from './app.preset';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    providePrimeNG({
      translation: ru,
      theme: {
        preset: CRMPreset,
        options: {
          darkModeSelector: '.crm-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
  ],
};
