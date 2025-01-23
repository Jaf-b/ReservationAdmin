import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-addreservation',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addreservation.component.html',
  styles: `
    mat-form-field{
      width:47%;
    }
  `,
})
export class AddreservationComponent {
  fb = inject(FormBuilder);
  AddReservationForm = this.fb.group({
    Fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    dateReservation: ['', [Validators.required]],
    duree: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    modePaiement: ['', Validators.required],
  });

  AddReservation() {}
}
