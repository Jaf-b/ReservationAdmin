import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-editsalle',
  imports: [
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: 'editsalle.component.html',
  styles: ``,
})
export class EditsalleComponent {
  fb = inject(FormBuilder);
  EditForm = this.fb.nonNullable.group({
    brandName: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    description: ['', Validators.required],
    equipement: this.fb.nonNullable.array([
      this.fb.nonNullable.control('', Validators.required),
    ]),
    employee: this.fb.nonNullable.array([
      this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    ]),
    image: this.fb.nonNullable.array([
      this.fb.nonNullable.control('', Validators.required),
    ]),
  });
  add = (params: string) => {
    if (params == 'em') {
      const control = this.fb.nonNullable.control('', Validators.email);
      this.EditForm.controls.employee.push(control);
    } else {
      const control = this.fb.nonNullable.control('');
      this.EditForm.controls.equipement.push(control);
    }
  };
  remove = (params: string, index: number) => {
    if (params == 'em') {
      this.EditForm.controls.employee.removeAt(index);
    } else {
      this.EditForm.controls.equipement.removeAt(index);
    }
  };
  addImg = () => {
    const control = this.fb.nonNullable.control('');
    this.EditForm.controls.image.push(control);
  };
  removeImg = (index: number) => {
    this.EditForm.controls.image.removeAt(index);
  };
}
