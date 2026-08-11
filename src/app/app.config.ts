import {
  ApplicationConfig,
  EnvironmentProviders,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideCheckNoChangesConfig,
} from '@angular/core';
import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from '../../routes/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideHighcharts } from 'highcharts-angular';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

/**
 * Dev-only: enables strict periodic change detection checks
 * to catch unintended state changes after render.
 */
const devProvider: EnvironmentProviders[] = isDevMode()
  ? [provideCheckNoChangesConfig({ exhaustive: true, interval: 1000 })]
  : [];

export const appConfig: ApplicationConfig = {
  providers: [
    // provideBrowserGlobalErrorListeners(),
    // provideRouter(routes), provideClientHydration()
    ...devProvider,
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideHighcharts({
      instance: () => import('highcharts'),
    }),
    provideTransloco({
      config: {
        availableLangs: ['en' , 'ar'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
