import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { APP_NAME } from '../../constant.app';
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
import { User } from '@angular/fire/auth';
import { LoginService } from '../../core/services/firebase/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

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
  `,
})
export default class RegistrationComponent {
  isLoggin = false;
  appname = APP_NAME;
  auth = inject(LoginService);
  authSub!: Subscription;
  emailSet = signal('');
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  RegistrationForm = this.fb.nonNullable.group({
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
  addImg = () => {
    const control = this.fb.nonNullable.control('');
    this.RegistrationForm.controls.image.push(control);
  };
  removeImg = (index: number) => {
    this.RegistrationForm.controls.image.removeAt(index);
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
    this.authSub = this.auth.authsTate.subscribe((user: User | null) => {
      if (this.router.url.includes('?apiKey=')) {
        this.auth.LoginWithEmailLink();
      }
      if (user) {
        this.router.navigate(['/']);
        this.isLoggin = true;
      }
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
