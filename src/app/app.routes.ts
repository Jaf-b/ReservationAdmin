import { Routes } from '@angular/router';
import { APP_NAME } from './constant.app';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
export const routes: Routes = [
  {
    path: 'login',
    title: `Connexion - ${APP_NAME}`,
    loadComponent: () => import('./pages/auth/login.component'),
    ...canActivate(redirectToHome),
  },
  {
    path: 'home',
    title: `Home - ${APP_NAME}`,
    loadComponent: () => import('./pages/home/home.component'),
    ...canActivate(redirectToLogin),
    children: [
      {
        path: 'reservation',
        title: `Reservation - ${APP_NAME}`,
        loadComponent: () =>
          import('./pages/home/reservation/reservation.component'),
        children: [
          {
            path: 'waiting',
            title: `Reservation - Encours - ${APP_NAME}`,
            loadComponent: () =>
              import('./pages/home/reservation/waiting-reservation.component'),
          },
          {
            path: 'confirmed',
            title: `Reservation - confirmer - ${APP_NAME}`,
            loadComponent: () =>
              import(
                './pages/home/reservation/confirmed-reservation.component'
              ),
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: 'waiting',
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'waiting',
          },
        ],
      },
      {
        path: 'acceuil',
        title: `Acceuil - ${APP_NAME}`,
        loadComponent: () => import('./pages/home/acceuil/acceuil.component'),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'acceuil',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'acceuil',
      },
    ],
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
