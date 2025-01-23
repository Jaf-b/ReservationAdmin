import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-image',
  imports: [MatIconModule, MatDividerModule],
  template: `
    <div
      style="display: flex;justify-content:space-between;align-items:center;padding:1rem"
    >
      <div style="flex:3;display:flex;flex-direction:column">
        <span style="font-size:30px;font-weight:bold"
          >Salle de l'hotel Residence</span
        >
        <div class="stars" style="color: yellow;">
          <mat-icon class="mat-18">star</mat-icon>
          <mat-icon class="mat-18">star</mat-icon>
          <mat-icon class="mat-18">star</mat-icon>
          <mat-icon class="mat-18">star</mat-icon>
          <mat-icon class="mat-18">star</mat-icon>
        </div>
        <span>P.E Lumumba</span>
      </div>
      <div>
        <mat-icon class="mat-18">edit</mat-icon>
      </div>
    </div>
    <mat-divider />
  `,
  styles: ``,
})
export class ManageImageComponent {}
