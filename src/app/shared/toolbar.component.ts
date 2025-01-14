import { Component, computed, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { APP_NAME, IS_MEDIUM } from '../constant.app';
import { MatButtonModule } from '@angular/material/button';
import { WindowsService } from '../core/services/utilities/windows.service';
import {
  ThemeMode,
  ThemeService,
} from '../core/services/utilities/theme.service';
import { LoginService } from '../core/services/firebase/login.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
  ],
  template: `
    <mat-toolbar>
      <div class="right_container">
        @if(w() < Medium){
        <button mat-icon-button (click)="toggleDrawer()">
          <mat-icon class="mat-18">menu</mat-icon>
        </button>
        }

        <span
          ><b>{{ title }}</b></span
        >
      </div>
      <div class="left-container">
        <button mat-icon-button>
          <mat-icon>notifications</mat-icon>
        </button>
        <img
          [src]="(user$ | async)?.photoURL ?? 'assets/avatar.png'"
          width="38px"
          height="38px"
          [matMenuTriggerFor]="menuRef"
        />
      </div>
    </mat-toolbar>
    <mat-divider></mat-divider>
    <mat-menu #menuRef="matMenu">
      <button mat-menu-item [matMenuTriggerFor]="menuRef2">Theme</button>
      <button mat-menu-item (click)="logout()">Deconnexion</button>
    </mat-menu>
    <mat-menu #menuRef2="matMenu">
      <button mat-menu-item (click)="switchTheme('light-theme')">
        Mode Claire
      </button>
      <button mat-menu-item (click)="switchTheme('dark-theme')">
        Mode sombre
      </button>
      <button mat-menu-item (click)="switchTheme('device-theme')">
        Thème de l'appareil
      </button>
    </mat-menu>
  `,
  styles: `

  mat-toolbar{
    justify-content : space-between;
    align-items:center;
  }
  .right_container,
  .left-container{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    img{
    border-radius:100%;
    cursor:pointer;
  }
  }

  `,
})
export class ToolbarComponent {
  title = APP_NAME;
  Medium = IS_MEDIUM;
  w = inject(WindowsService).width;
  ts = inject(ThemeService);
  state = inject(WindowsService);
  auth = inject(LoginService);
  user$ = this.auth.user;
  router = inject(Router);
  toggleDrawer = () => this.state.is_OPEN.update((value) => !value);

  switchTheme(theme: ThemeMode) {
    this.ts.setTheme(theme);
  }
  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
