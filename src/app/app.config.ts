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

const devProvider: EnvironmentProviders[] = isDevMode()
  ? [provideCheckNoChangesConfig({ exhaustive: true, interval: 1000 })]
  : [];
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    ...devProvider,
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
