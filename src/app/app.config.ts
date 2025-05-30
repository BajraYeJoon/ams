import { provideAnimations } from '@angular/platform-browser/animations';
import {
  type ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
// import { providePrimeNG } from 'primeng/config';
// import Lara from '@primeng/themes/nora';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    // providePrimeNG({
    //   theme: {
    //     preset: Lara,
    //   },
    // }),
  ],
};
