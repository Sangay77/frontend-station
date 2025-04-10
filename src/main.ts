import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import {provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes'; // Import your routes
import { FormsModule } from '@angular/forms';
import { loggingInterceptor } from './app/_helpers/auth-interceptor.service';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),  // Import HttpClientModule
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient(withInterceptors([loggingInterceptor])),
  ]
}).catch(err => console.error(err));
