import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-reservation',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div>
      <h1 mat-dialog-title>Supression</h1>
      <mat-dialog-content>
        <mat-icon>warning</mat-icon>
        <span><b>Voulez-vous réelement supprimer cette reservation</b></span>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button type="button" mat-button matDialogClose>Annuler</button>
        <button
          class="alert-warn"
          type="button"
          mat-flat-button
          (click)="removeReservation()"
        >
          confirmer
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: ``,
})
export class DeleteReservationComponent implements OnInit {
  id!: string;
  matDialogRef = inject(MatDialog);
  snackbar = inject(MatSnackBar);
  constructor(@Inject(MAT_DIALOG_DATA) private data: string) {}
  fs = inject(FirestoreService);
  removeReservation() {
    this.fs.DeleteReservation(this.id);
    this.matDialogRef.closeAll();
    this.snackbar.open('effacer avec succès', 'ok', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  ngOnInit() {
    if (this.data) {
      this.id = this.data;
    }
  }
}
