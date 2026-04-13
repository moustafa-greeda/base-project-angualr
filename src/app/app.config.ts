import {
  ApplicationConfig,
  EnvironmentProviders,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideCheckNoChangesConfig,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHighcharts } from 'highcharts-angular';

/**
 * Dev-only: enables strict periodic change detection checks
 * to catch unintended state changes after render.
 */
const devProvider: EnvironmentProviders[] = isDevMode()
  ? [provideCheckNoChangesConfig({ exhaustive: true, interval: 1000 })]
  : [];

export const appConfig: ApplicationConfig = {
  providers: [
    ...devProvider,
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideHighcharts({
      instance: () => import('highcharts'),
    }),
  ],
};
