import { importProvidersFrom, Provider } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { CONFIG_TOKEN } from './app/core/injection-tokens/config.token';
import { ErrorPrintInterceptor } from './app/core/interceptors/error-print.interceptor';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorPrintInterceptor,
    multi: true,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    interceptors,
    {
      provide: CONFIG_TOKEN,
      useValue: environment,
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
