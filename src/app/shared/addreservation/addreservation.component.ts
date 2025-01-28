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
  constructor(@Inject(MAT_DIALOG_DATA) private data: waitingTable) {}
  ngOnInit(): void {
    if (this.data) {
      this.id = this.data.id;
      this.message = 'Reservation Modifier avec Succès';
      this.title = 'Modifier une Reservation';
      this.AddReservationForm.patchValue(this.data);
      this.AddReservationForm.controls.Fullname.patchValue(
        this.data.nomComplet
      );
      this.AddReservationForm.controls.dateReservation.patchValue(
        this.data.DateReservation
      );
      this.AddReservationForm.controls.duree.patchValue(this.data.duree);
      this.AddReservationForm.controls.email.patchValue(this.data.adresseMail);
      this.AddReservationForm.controls.modePaiement.patchValue(
        this.data.paiement
      );
      this.AddReservationForm.controls.price.patchValue(this.data.prix);
    } else {
      this.id = this.fs.createID('Reservation');
      this.message = 'Reservation Ajouter avec Succès';
    }
    const localStorageData = localStorage.getItem('UserInfo');
    if (localStorageData) {
      const data: User = JSON.parse(localStorageData);
      this.userInfo = {
        ownerName: data.displayName,
        ownerEmail: data.email,
        ownerPicture: data.photoURL,
        ownerID: data.uid,
      };
    }
  }

  fb = inject(FormBuilder);
  fs = inject(FirestoreService);
  message!: string;
  id!: string;
  title: 'Ajouter une reservation' | 'Modifier une Reservation' =
    'Ajouter une reservation';
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
      status: 'Encours',
      paiement: this.AddReservationForm.controls.modePaiement.getRawValue(),
      prix: this.AddReservationForm.controls.price.getRawValue(),
    };
    this.fs.setReservationToFirestore(data);
    this.matDialog.closeAll();
    this.snackbar.open(this.message, 'ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
