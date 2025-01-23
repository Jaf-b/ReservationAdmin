import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EditsalleComponent } from '../../../shared/editsalle/editsalle.component';

@Component({
  selector: 'app-manage-image',
  imports: [MatIconModule, MatDividerModule, MatButtonModule],
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
        <button mat-icon-button (click)="EditSalle()">
          <mat-icon class="mat-18">edit</mat-icon>
        </button>
      </div>
    </div>
    <mat-divider />
  `,
  styles: ``,
})
export class ManageImageComponent {
  dialog = inject(MatDialog);

  EditSalle = () => {
    this.dialog.open(EditsalleComponent, {
      width: '35rem',
    });
  };
}
