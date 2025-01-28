import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { APP_NAME, IS_MEDIUM } from '../../constant.app';
import { MatDivider } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { user, User } from '@angular/fire/auth';
import { LoginService } from '../../core/services/firebase/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { WindowsService } from '../../core/services/utilities/windows.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/firebase/storage.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { SalleDataForm } from '../../core/models/model.ts/models';
import { FieldValue, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-registration',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDivider,
    MatStepperModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
  ],
  templateUrl: 'registration.component.html',
  styles: `
    .equipement,.employee{
      margin-bottom:1rem;
    }
    .divider{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin: 1rem 0;
      mat-divider{
        width:35%;
      }
    }
    .big{
    max-width:30rem;
    margin:2rem auto
   }.small{
    max-width:350px;
    margin:2rem auto;
   }
  `,
})
export default class RegistrationComponent {
  @ViewChild('stepper') stepper: any;
  userInfo: any;
  loading = false;
  storage = inject(StorageService);
  fs = inject(FirestoreService);
  displayImg!: string;
  isLoggin = false;
  appname = APP_NAME;
  currentWidth = inject(WindowsService).width;
  mediumWidth = IS_MEDIUM;
  auth = inject(LoginService);
  authSub!: Subscription;
  emailSet = signal('');
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  imgArray: any[] = [];
  RegistrationForm = this.fb.nonNullable.group({
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

    image: ['', Validators.required],
  });

  add = (params: string) => {
    if (params == 'em') {
      const control = this.fb.nonNullable.control('', Validators.email);
      this.RegistrationForm.controls.employee.push(control);
    } else {
      const control = this.fb.nonNullable.control('');
      this.RegistrationForm.controls.equipement.push(control);
    }
  };
  remove = (params: string, index: number) => {
    if (params == 'em') {
      this.RegistrationForm.controls.employee.removeAt(index);
    } else {
      this.RegistrationForm.controls.equipement.removeAt(index);
    }
  };

  loginWithGoogle = async () => {
    try {
      await this.auth.loginWithgoogle();
    } catch (e) {
      this.snackBar.open("Une erreur s'est produite", 'fermer', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  };
  emailFormSubmit(form: NgForm) {
    const email = form.value.email;
    const ActionCodeSettings = {
      url: `${location.origin}${this.router.url}`,
      handleCodeInApp: true,
    };
    this.auth.sendAuthLink(email, ActionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
    this.emailSet.set(email);
    form.reset();
  }
  resetState = () => this.emailSet.set('');
  ngOnInit(): void {
    this.authSub = this.auth.authsTate.subscribe(async (user: User | null) => {
      if (this.router.url.includes('?apiKey=')) {
        this.auth.LoginWithEmailLink();
      }
      if (user) {
        if (await this.fs.SalleExist(user.uid)) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/registration']);
          this.stepper.next();
          this.isLoggin = true;
          this.snackBar.open('Aucune salle detectée', 'ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
        this.userInfo = {
          ownerName: user.displayName,
          ownerEmail: user.email,
          ownerPicture: user.photoURL,
          ownerID: user.uid,
        };
      }
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
  AddtoStorage = async (file: any) => {
    const files = file[0];
    const fullpath: any = localStorage!.getItem('pathReference');
    try {
      this.loading = true;
      if (fullpath) {
        this.storage.DeleteImgToStorage();
      }
      const path = await this.storage.AddImagetoStorage(files);
      this.displayImg = path;
      this.imgArray.push(path);
      console.log(this.imgArray);
      console.log(path);
      this.loading = false;
    } catch (e) {}
  };
  nextStep() {
    this.stepper.next();
  }
  id = this.fs.createID('SalleData');
  AddDocsToStorage() {
    const data: SalleDataForm<FieldValue> = {
      ownerID: this.userInfo.ownerID,
      id: this.id,
      user: this.userInfo,
      brandName: this.RegistrationForm.controls.brandName.getRawValue(),
      price: this.RegistrationForm.controls.price.getRawValue(),
      NbrePlace: this.RegistrationForm.controls.NbrePlace.getRawValue(),
      description: this.RegistrationForm.controls.description.getRawValue(),
      Adresse: this.RegistrationForm.controls.Adresse.getRawValue(),
      equipement: this.RegistrationForm.controls.equipement.getRawValue(),
      employee: this.RegistrationForm.controls.employee.getRawValue(),
      image: this.displayImg,
      createAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    };
    this.loading = true;
    this.fs.setDataToFirestore(data).then((e) => {
      this.loading = false;
      this.router.navigate(['/']);
    });
  }
}
