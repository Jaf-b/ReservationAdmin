import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import {
  FieldPath,
  FieldValue,
  serverTimestamp,
} from '@angular/fire/firestore';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { SalleDataForm } from '../../core/models/model.ts/models';
import { StorageService } from '../../core/services/firebase/storage.service';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatProgressBarModule,
  ],
  templateUrl: 'editsalle.component.html',
  styles: ``,
})
export class EditsalleComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: SalleDataForm<FieldPath>[]
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.displayImg = this.data[0].image;
      this.EditForm.controls.brandName.patchValue(this.data[0].brandName);
      this.EditForm.controls.description.patchValue(this.data[0].description);
      this.EditForm.controls.Adresse.patchValue(this.data[0].Adresse);
      // display equipement
      this.remove('eqpment', 0);
      this.data[0].equipement.forEach((e) => {
        const formControl = this.fb.nonNullable.control(e);
        this.EditForm.controls.equipement.push(formControl);
      });
      //display employee
      this.remove('em', 0);
      this.data[0].employee.forEach((e) => {
        const formControl = this.fb.nonNullable.control(e);
        this.EditForm.controls.employee.push(formControl);
      });
      this.EditForm.controls.price.patchValue(this.data[0].price);
      this.EditForm.controls.NbrePlace.patchValue(this.data[0].NbrePlace);
    }
  }

  fb = inject(FormBuilder);
  loading = false;
  displayImg!: string;
  storage = inject(StorageService);
  matDialog = inject(MatDialog);
  fs = inject(FirestoreService);
  snackbar = inject(MatSnackBar);
  isLoggin = false;
  EditForm = this.fb.nonNullable.group({
    brandName: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    NbrePlace: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    description: ['', Validators.required],
    Adresse: ['', Validators.required],
    equipement: this.fb.nonNullable.array([
      this.fb.nonNullable.control('', Validators.required),
    ]),
    employee: this.fb.nonNullable.array([
      this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    ]),
    image: [''],
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
  async changeImgToStorage(imgUrl: string, file: any) {
    const files = file[0];
    const pathRef = this.storage.getRef(imgUrl).fullPath;
    window.localStorage.setItem('pathReference', pathRef);
    const fullpath = localStorage!.getItem('pathReference');
    try {
      this.loading = true;
      if (fullpath) {
        this.storage.DeleteImgToStorage();
      }
      const path = await this.storage.AddImagetoStorage(files);
      this.displayImg = path;
      console.log(path);
      this.loading = false;
    } catch (e) {}
  }
  EditSalle() {
    const salleInfo: SalleDataForm<FieldValue> = {
      ownerID: this.data[0].ownerID,
      id: this.data[0].id,
      user: this.data[0].user,
      brandName: this.EditForm.controls.brandName.getRawValue(),
      price: this.EditForm.controls.price.getRawValue(),
      NbrePlace: this.EditForm.controls.NbrePlace.getRawValue(),
      description: this.EditForm.controls.description.getRawValue(),
      Adresse: this.EditForm.controls.Adresse.getRawValue(),
      equipement: this.EditForm.controls.equipement.getRawValue(),
      employee: this.EditForm.controls.employee.getRawValue(),
      image: this.displayImg,
      createAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    };
    this.fs.setDataToFirestore(salleInfo).then((e) => {
      this.loading = false;
      this.matDialog.closeAll();
      this.snackbar.open('Salle de Fête Modifier', 'ok', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }
}
