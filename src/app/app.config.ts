import {
  ApplicationConfig,
  EnvironmentProviders,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideCheckNoChangesConfig,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHighcharts } from 'highcharts-angular';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Enable strict change detection checks in dev mode to catch "ExpressionChanged..." errors early
const devProvider: EnvironmentProviders[] = isDevMode()
  ? [provideCheckNoChangesConfig({ exhaustive: true, interval: 1000 })]
  : [];
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    // ...devProvider,
    provideRouter(routes),
    provideHighcharts({
      instance: () => import('highcharts'),
    }),
    provideClientHydration(withEventReplay()),
  ],
};
