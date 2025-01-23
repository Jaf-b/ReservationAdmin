import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CdkStepper } from '@angular/cdk/stepper';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'gestion-de-reservation-6dc1f',
        appId: '1:527335921204:web:ddbd1d68eb46b31ae81c61',
        storageBucket: 'gestion-de-reservation-6dc1f.firebasestorage.app',
        apiKey: 'AIzaSyAyHWpl1B272oPdGU5tEfMv3kzCP5KauUs',
        authDomain: 'gestion-de-reservation-6dc1f.firebaseapp.com',
        messagingSenderId: '527335921204',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
