import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'details',
    loadComponent: () =>
      import('./app/word-details/word-details.component').then(
        (m) => m.WordDetailsComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));
