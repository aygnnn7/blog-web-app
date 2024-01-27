import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BaseService } from './services/base.service';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideClientHydration(), 
    provideAnimations(), 
    importProvidersFrom(HttpClientModule),
    {
      provide: BaseService,
      useClass: BaseService, 
      deps: [HttpClient]
    }
  ]
};
