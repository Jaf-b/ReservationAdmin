import { MatMenuModule } from '@angular/material/menu';
import { Component, computed, inject, input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WindowsService } from '../core/services/utilities/windows.service';
import { IS_MEDIUM } from '../constant.app';
@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    RouterLinkActive,
    RouterOutlet,
    MatIconModule,
  ],
  template: `
    <mat-drawer-container autosize>
      <mat-drawer
        #drawer
        [mode]="w() <= Medium ? 'over' : 'side'"
        [opened]="w() <= Medium ? isToggleDrawer() : true"
      >
        <div>
          <a
            class="mat-mdc-menu-item-text"
            mat-menu-item
            routerLink="/home/acceuil"
            routerLinkActive="active-link"
            (click)="toggleDrawer()"
            routerLin
          >
            <mat-icon>home</mat-icon>
            <span> <b>Acceuil</b> </span>
          </a>
          <a
            mat-menu-item
            routerLink="/home/reservation/"
            (click)="toggleDrawer()"
            routerLinkActive="active-link"
          >
            <mat-icon>view_cozy</mat-icon>
            <span><b>Reservation</b></span>
          </a>
        </div>
      </mat-drawer>

      <mat-drawer-content class="sidenav-content">
        <router-outlet />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: `

    mat-drawer-container {
      height: calc(100vh - 65px);
      display: flex;
      flex-direction: column;
    }

    mat-drawer {
      width: 220px;
      border-right: 1px solid var(--mat-sys-outline-variant);
      border-radius: 0%;
    }

    .active-link {
      background-color: var(--mat-sys-outline-variant);
    }
     .active {
      background-color: var(--mat-sys-outline-variant);
    }
  `,
})
export class SidenavComponent {
  w = inject(WindowsService).width;
  Medium = IS_MEDIUM;

  is_OPEN = inject(WindowsService).is_OPEN();
  state = inject(WindowsService);
  isToggleDrawer = this.state.is_OPEN;
  toggleDrawer = () => this.state.is_OPEN.update((value) => !value);
}
