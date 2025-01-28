import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { User } from '@angular/fire/auth';
import { waitingTable } from '../../core/models/model.ts/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { mindate } from '../../core/models/model.ts/Validators';
@Component({
  selector: 'app-addreservation',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './addreservation.component.html',
  styles: `
    mat-form-field{
      width:47%;
    }
  `,
})
export class AddreservationComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: User) {}
  ngOnInit(): void {
    if (this.data) {
      this.userInfo = {
        ownerName: this.data.displayName,
        ownerEmail: this.data.email,
        ownerPicture: this.data.photoURL,
        ownerID: this.data.uid,
      };
    }
  }

  fb = inject(FormBuilder);
  fs = inject(FirestoreService);
  salleName: any = localStorage.getItem('salleName');
  matDialog = inject(MatDialog);
  snackbar = inject(MatSnackBar);
  userInfo: any;
  AddReservationForm = this.fb.nonNullable.group({
    Fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    price: ['5000', [Validators.required, Validators.pattern(/^\d+$/)]],
    dateReservation: ['', [Validators.required, mindate]],
    duree: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    modePaiement: ['', Validators.required],
  });

  id = this.fs.createID('Reservation');
  AddReservation() {
    const data: waitingTable = {
      ownerID: this.userInfo.ownerID,
      salleName: this.salleName,
      id: this.id,
      user: this.userInfo,
      nomComplet: this.AddReservationForm.controls.Fullname.getRawValue(),
      adresseMail: this.AddReservationForm.controls.email.getRawValue(),
      DateReservation:
        this.AddReservationForm.controls.dateReservation.getRawValue(),
      duree: this.AddReservationForm.controls.duree.getRawValue(),
      status: 'En Cours',
      paiement: this.AddReservationForm.controls.modePaiement.getRawValue(),
      prix: this.AddReservationForm.controls.price.getRawValue(),
    };
    console.log(data);

    // this.fs.setReservationToFirestore(data);
    this.matDialog.closeAll();
    this.snackbar.open('Ajouter avec succès', 'ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
