import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  provideFirestore,
} from '@angular/fire/firestore';
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
        apiKey: 'AIzaSyCkY20t0F4GqU9LbyV79Yiue_rlrutNxvc',
        authDomain: 'reservationsalle-e1692.firebaseapp.com',
        databaseURL:
          'https://reservationsalle-e1692-default-rtdb.firebaseio.com',
        projectId: 'reservationsalle-e1692',
        storageBucket: 'reservationsalle-e1692.appspot.com',
        messagingSenderId: '507980630667',
        appId: '1:507980630667:web:bbca534ca4aba6505ae28e',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    ),
    provideStorage(() => getStorage()),
  ],
};
