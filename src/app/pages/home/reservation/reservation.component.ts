import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDivider } from '@angular/material/divider';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [RouterOutlet, MatDivider, MatTabsModule, RouterLink],
  template: `
    <header>
      <h2 style="margin-left: 1rem;">Gestion de Reservation</h2>
    </header>
    <mat-divider />
    <nav mat-tab-nav-bar mat-stretch-tabs="false" [tabPanel]="tabpanel">
      @for (link of links; track link) {
      <a
        mat-tab-link
        (click)="activeLink = link.url"
        [active]="activeLink == link.url"
        [routerLink]="link.url"
      >
        {{ link.title }}
      </a>
      }
    </nav>
    <mat-tab-nav-panel #tabpanel></mat-tab-nav-panel>
    <router-outlet />
  `,
  styles: `

  `,
})
export default class ReservationComponent {
  links = [
    {
      url: 'waiting',
      title: 'En attente de Confirmation',
    },
    {
      url: 'confirmed',
      title: 'Reservation confirmée',
    },
  ];
  private route = inject(Router);
  activeLink = this.route.url.replace(`/reservation/`, '');
}
