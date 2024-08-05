import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		importProvidersFrom(IonicModule.forRoot()),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
  ],
});